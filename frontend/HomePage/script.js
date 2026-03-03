// Simple interactivity for the search interface

// Get search input and submit button
const searchInput = document.querySelector('.search-input');
const submitButton = document.querySelector('.submit-btn');
const searchBox = document.querySelector('.search-box');

// Make entire search box clickable to focus input
searchBox.addEventListener('click', function(e) {
    // Don't focus if clicking the submit button or search engine dropdown
    if (!e.target.closest('.submit-btn') && !e.target.closest('.search-engine-dropdown')) {
        searchInput.focus();
    }
});

// Handle search input focus
searchInput.addEventListener('focus', function() {
    document.querySelector('.search-box').style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
});

searchInput.addEventListener('blur', function() {
    document.querySelector('.search-box').style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
});

// Suggestions functionality
const suggestionsDropdown = document.getElementById('suggestionsDropdown');
let selectedSuggestionIndex = -1;
let suggestions = [];

// Common search patterns for fallback
const commonSearches = {
    'what': ['what is', 'what are', 'what does', 'what time', 'what day'],
    'how': ['how to', 'how do', 'how does', 'how much', 'how many'],
    'why': ['why is', 'why are', 'why do', 'why does', 'why not'],
    'when': ['when is', 'when are', 'when do', 'when does', 'when will'],
    'where': ['where is', 'where are', 'where do', 'where does', 'where can'],
    'who': ['who is', 'who are', 'who do', 'who does', 'who can']
};

// Fetch suggestions based on search engine
async function fetchSuggestions(query, engine) {
    if (!query || query.length < 2) {
        return [];
    }

    // Always return fallback suggestions immediately for now
    // This ensures suggestions always show up
    const fallback = getFallbackSuggestions(query);
    
    // Try to fetch from API in background (non-blocking)
    try {
        if (engine === 'duckduckgo') {
            // Use JSONP for DuckDuckGo
            return new Promise((resolve) => {
                // Return fallback immediately
                resolve(fallback);
                
                // Try to get real suggestions in background
                const script = document.createElement('script');
                const callbackName = 'ddgCallback_' + Date.now();
                window[callbackName] = function(data) {
                    delete window[callbackName];
                    if (script.parentNode) {
                        document.body.removeChild(script);
                    }
                    const apiSuggestions = data.map(item => item.phrase || item).slice(0, 8);
                    if (apiSuggestions.length > 0) {
                        displaySuggestions(apiSuggestions);
                    }
                };
                script.src = `https://duckduckgo.com/ac/?q=${encodeURIComponent(query)}&callback=${callbackName}`;
                script.onerror = () => {
                    if (script.parentNode) {
                        document.body.removeChild(script);
                    }
                    delete window[callbackName];
                };
                document.body.appendChild(script);
                
                setTimeout(() => {
                    if (script.parentNode) {
                        document.body.removeChild(script);
                        delete window[callbackName];
                    }
                }, 2000);
            });
        } else {
            // For other engines, try CORS proxy
            fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}`)}`)
                .then(response => response.json())
                .then(data => {
                    try {
                        const content = JSON.parse(data.contents);
                        if (content && content[1] && content[1].length > 0) {
                            displaySuggestions(content[1].slice(0, 8));
                        }
                    } catch (e) {
                        // Ignore parse errors
                    }
                })
                .catch(() => {
                    // Ignore fetch errors
                });
            
            return fallback;
        }
    } catch (error) {
        console.log('Error in fetchSuggestions:', error);
        return fallback;
    }
}

// Get fallback suggestions based on query patterns
function getFallbackSuggestions(query) {
    const queryLower = query.toLowerCase().trim();
    const suggestions = [];
    
    // Check for common patterns
    for (const [key, values] of Object.entries(commonSearches)) {
        if (queryLower.startsWith(key)) {
            values.forEach(val => {
                if (val.startsWith(queryLower) && val !== queryLower) {
                    suggestions.push(val);
                }
            });
        }
    }
    
    // Add some generic suggestions
    if (suggestions.length < 5) {
        const generic = [
            query + ' meaning',
            query + ' definition',
            query + ' explanation',
            'what is ' + query,
            'how to ' + query
        ];
        generic.forEach(s => {
            if (!suggestions.includes(s) && s !== query) {
                suggestions.push(s);
            }
        });
    }
    
    return suggestions.slice(0, 8);
}

// Display suggestions
function displaySuggestions(suggestionsList) {
    if (!suggestionsDropdown) {
        console.error('Suggestions dropdown not found');
        return;
    }
    
    suggestionsDropdown.innerHTML = '';
    suggestions = (suggestionsList || []).slice(0, 8); // Limit to 8 suggestions
    
    if (suggestions.length === 0) {
        suggestionsDropdown.classList.remove('active');
        return;
    }
    
    console.log('Displaying', suggestions.length, 'suggestions');

    suggestions.forEach((suggestion, index) => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.setAttribute('data-index', index);
        
        const icon = document.createElement('svg');
        icon.className = 'suggestion-icon';
        icon.viewBox = '0 0 24 24';
        icon.fill = 'none';
        icon.stroke = 'currentColor';
        icon.strokeWidth = '2';
        icon.innerHTML = '<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>';
        
        const text = document.createElement('span');
        text.textContent = suggestion;
        
        item.appendChild(icon);
        item.appendChild(text);
        
        item.addEventListener('click', function() {
            searchInput.value = suggestion;
            handleSearch();
        });
        
        suggestionsDropdown.appendChild(item);
    });
    
    suggestionsDropdown.classList.add('active');
    selectedSuggestionIndex = -1;
}

// Handle input for suggestions
let suggestionTimeout;
searchInput.addEventListener('input', function() {
    const query = this.value.trim();
    
    clearTimeout(suggestionTimeout);
    
    if (query.length < 2) {
        suggestionsDropdown.classList.remove('active');
        return;
    }
    
    suggestionTimeout = setTimeout(async () => {
        const engine = currentEngine || 'google';
        console.log('Fetching suggestions for:', query, 'engine:', engine);
        const suggestionsList = await fetchSuggestions(query, engine);
        console.log('Got suggestions:', suggestionsList);
        displaySuggestions(suggestionsList);
    }, 300); // Debounce 300ms
});

// Handle keyboard navigation in suggestions
searchInput.addEventListener('keydown', function(e) {
    // Handle Enter key for search
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        
        // Check if suggestions are active and an item is selected
        if (suggestionsDropdown && suggestionsDropdown.classList.contains('active') && 
            suggestions.length > 0 && selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
            // Use the selected suggestion
            searchInput.value = suggestions[selectedSuggestionIndex];
            suggestionsDropdown.classList.remove('active');
        }
        
        // Always perform search when Enter is pressed
        handleSearch();
        return;
    }
    
    // Only handle arrow keys and escape if suggestions are active
    if (!suggestionsDropdown || !suggestionsDropdown.classList.contains('active') || suggestions.length === 0) {
        return;
    }

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedSuggestionIndex = Math.min(selectedSuggestionIndex + 1, suggestions.length - 1);
        updateSelectedSuggestion();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedSuggestionIndex = Math.max(selectedSuggestionIndex - 1, -1);
        updateSelectedSuggestion();
    } else if (e.key === 'Escape') {
        suggestionsDropdown.classList.remove('active');
        selectedSuggestionIndex = -1;
    }
});

// Update selected suggestion visual
function updateSelectedSuggestion() {
    const items = suggestionsDropdown.querySelectorAll('.suggestion-item');
    items.forEach((item, index) => {
        if (index === selectedSuggestionIndex) {
            item.classList.add('selected');
            item.scrollIntoView({ block: 'nearest' });
        } else {
            item.classList.remove('selected');
        }
    });
}

// Close suggestions when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-box') && !e.target.closest('.suggestions-dropdown')) {
        suggestionsDropdown.classList.remove('active');
    }
});

// Handle submit button click
submitButton.addEventListener('click', function(e) {
    e.stopPropagation();
    handleSearch();
});

// Search engine URLs mapping
const searchEngineUrls = {
    google: 'https://www.google.com/search?q=',
    bing: 'https://www.bing.com/search?q=',
    duckduckgo: 'https://duckduckgo.com/?q=',
    yahoo: 'https://search.yahoo.com/search?p=',
    brave: 'https://search.brave.com/search?q='
};

// Search function
function handleSearch() {
    const query = searchInput.value.trim();
    if (query) {
        // Clear the search input
        searchInput.value = '';
        
        // Get the current search engine
        const engine = currentEngine || 'google';
        const searchUrl = searchEngineUrls[engine];
        
        if (searchUrl) {
            // Encode the query and redirect to search engine in same tab
            const encodedQuery = encodeURIComponent(query);
            window.location.href = searchUrl + encodedQuery;
        } else {
            // Fallback to Google if engine not found
            window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(query);
        }
    }
}

// Service Buttons Management
const servicesContainer = document.getElementById('servicesContainer');
let services = [];
let editingIndex = -1;

// Default services
const defaultServices = [
    { url: 'https://youtube.com', name: 'Youtube', icon: null },
    { url: 'https://chat.openai.com', name: 'ChatGPT', icon: null },
    { url: 'https://gemini.google.com', name: 'Gemini', icon: null },
    { url: 'https://github.com', name: 'Github', icon: null }
];

// Load services from localStorage or use defaults
function loadServices() {
    const saved = localStorage.getItem('services');
    if (saved) {
        services = JSON.parse(saved);
    } else {
        services = JSON.parse(JSON.stringify(defaultServices));
    }
    renderServices();
}

// Save services to localStorage
function saveServices() {
    localStorage.setItem('services', JSON.stringify(services));
}

// Get favicon from URL
function getFaviconUrl(url) {
    try {
        const urlObj = new URL(url);
        return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`;
    } catch (e) {
        return `https://www.google.com/s2/favicons?domain=${url}&sz=32`;
    }
}

// Render service buttons
function renderServices() {
    servicesContainer.innerHTML = '';
    
    services.forEach((service, index) => {
        const button = document.createElement('button');
        button.className = 'service-btn';
        button.setAttribute('data-index', index);
        
        const icon = document.createElement('img');
        icon.className = 'service-icon';
        icon.src = service.icon || getFaviconUrl(service.url);
        icon.alt = service.name;
        icon.onerror = function() {
            this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>';
        };
        
        const name = document.createElement('span');
        name.textContent = service.name;
        
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>';
        editBtn.onclick = (e) => {
            e.stopPropagation();
            openEditModal(index);
        };
        
        button.appendChild(icon);
        button.appendChild(name);
        button.appendChild(editBtn);
        
        button.onclick = function(e) {
            if (!e.target.closest('.edit-btn')) {
                window.location.href = service.url;
            }
        };
        
        servicesContainer.appendChild(button);
    });
}

// Edit Modal
const editModal = document.getElementById('editModal');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');
const serviceUrlInput = document.getElementById('serviceUrl');
const serviceNameInput = document.getElementById('serviceName');

function openEditModal(index) {
    editingIndex = index;
    const service = services[index] || { url: '', name: '' };
    serviceUrlInput.value = service.url;
    serviceNameInput.value = service.name;
    editModal.classList.add('active');
    serviceUrlInput.focus();
}

function closeEditModal() {
    editModal.classList.remove('active');
    editingIndex = -1;
    serviceUrlInput.value = '';
    serviceNameInput.value = '';
}

closeModal.addEventListener('click', closeEditModal);
cancelBtn.addEventListener('click', closeEditModal);

// Auto-update name and favicon when URL changes
serviceUrlInput.addEventListener('input', async function() {
    const url = this.value.trim();
    if (url && !url.startsWith('http')) {
        this.value = 'https://' + url;
    }
    
    // Auto-fetch favicon and suggest name
    if (url) {
        try {
            const urlObj = new URL(url.startsWith('http') ? url : 'https://' + url);
            const domain = urlObj.hostname.replace('www.', '');
            const suggestedName = domain.split('.')[0];
            if (!serviceNameInput.value || serviceNameInput.value === services[editingIndex]?.name) {
                serviceNameInput.value = suggestedName.charAt(0).toUpperCase() + suggestedName.slice(1);
            }
        } catch (e) {
            // Invalid URL, ignore
        }
    }
});

// Save service
saveBtn.addEventListener('click', function() {
    const url = serviceUrlInput.value.trim();
    const name = serviceNameInput.value.trim();
    
    if (!url) {
        alert('Please enter a URL');
        return;
    }
    
    if (!name) {
        alert('Please enter a name');
        return;
    }
    
    // Ensure URL has protocol
    let finalUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        finalUrl = 'https://' + url;
    }
    
    const faviconUrl = getFaviconUrl(finalUrl);
    
    if (editingIndex >= 0) {
        // Update existing
        services[editingIndex] = {
            url: finalUrl,
            name: name,
            icon: faviconUrl
        };
    } else {
        // Add new
        services.push({
            url: finalUrl,
            name: name,
            icon: faviconUrl
        });
    }
    
    saveServices();
    renderServices();
    closeEditModal();
});

// Close modal when clicking outside
editModal.addEventListener('click', function(e) {
    if (e.target === editModal) {
        closeEditModal();
    }
});

// Initialize
loadServices();

// Search Engine Dropdown Functionality
const searchEngineBtn = document.getElementById('searchEngineBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const dropdownItems = document.querySelectorAll('.dropdown-item');
const engineName = document.querySelector('.engine-name');
let currentEngine = 'google';
const SEARCH_ENGINE_STORAGE_KEY = 'selectedSearchEngine';

// Toggle dropdown
searchEngineBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    const dropdown = this.closest('.search-engine-dropdown');
    dropdown.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-engine-dropdown')) {
        document.querySelector('.search-engine-dropdown').classList.remove('active');
    }
});

// Engine icon mapping
const engineIcons = {
    google: '<image href="https://img.icons8.com/?size=100&id=17949&amp;format=png&amp;color=000000" x="0" y="0" width="24" height="24" preserveAspectRatio="xMidYMid meet" />',
    bing: '<image href="https://img.icons8.com/?size=100&id=pOADWgX6vV63&amp;format=png&amp;color=000000" x="0" y="0" width="24" height="24" preserveAspectRatio="xMidYMid meet" />',
    duckduckgo: '<image href="https://img.icons8.com/?size=100&id=63778&amp;format=png&amp;color=000000" x="0" y="0" width="24" height="24" preserveAspectRatio="xMidYMid meet" />',
    yahoo: '<image href="https://img.icons8.com/?size=100&id=G3F1h1aX2vpT&amp;format=png&amp;color=000000" x="0" y="0" width="24" height="24" preserveAspectRatio="xMidYMid meet" />',
    brave: '<image href="https://img.icons8.com/?size=100&id=ZAPJV5FAO4PW&amp;format=png&amp;color=000000" x="0" y="0" width="24" height="24" preserveAspectRatio="xMidYMid meet" />'
};

// Update button icon
function updateEngineIcon(engine) {
    const iconBtn = document.getElementById('engineIconBtn');
    if (iconBtn && engineIcons[engine]) {
        iconBtn.innerHTML = engineIcons[engine];
    }
}

function setCurrentEngine(engine, { persist } = { persist: true }) {
    if (!engine || !searchEngineUrls[engine] || !engineIcons[engine]) {
        return;
    }

    currentEngine = engine;

    const item = document.querySelector(`.dropdown-item[data-engine="${engine}"]`);
    if (item) {
        const label = item.querySelector('span');
        if (label) {
            engineName.textContent = label.textContent;
        }
    }

    updateEngineIcon(engine);

    if (persist) {
        try {
            localStorage.setItem(SEARCH_ENGINE_STORAGE_KEY, engine);
        } catch {
            // Ignore storage errors (private mode, disabled storage, etc.)
        }
    }
}

// Handle search engine selection
dropdownItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.stopPropagation();
        const engine = this.getAttribute('data-engine');
        setCurrentEngine(engine, { persist: true });
        document.querySelector('.search-engine-dropdown').classList.remove('active');
        console.log('Selected search engine:', engine);
    });
});

// Initialize from saved engine (fallback to Google)
try {
    const savedEngine = localStorage.getItem(SEARCH_ENGINE_STORAGE_KEY);
    if (savedEngine) {
        setCurrentEngine(savedEngine, { persist: false });
    }
} catch {
    // Ignore storage errors
}

// Ensure we always have a valid initial state
setCurrentEngine(currentEngine || 'google', { persist: false });

