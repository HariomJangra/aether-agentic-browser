#pragma once

#include "MainWindow.g.h"
#include <map> 

namespace winrt::Agentic_Browser::implementation
{
    struct MainWindow : MainWindowT<MainWindow>
    {
        MainWindow();

        void CreateNewTab(winrt::hstring const& initialUrl);

        void TabView_AddTabButtonClick(
            Microsoft::UI::Xaml::Controls::TabView const& sender,
            winrt::Windows::Foundation::IInspectable const&);

        void TabView_TabCloseRequested(
            Microsoft::UI::Xaml::Controls::TabView const& sender,
            Microsoft::UI::Xaml::Controls::TabViewTabCloseRequestedEventArgs const& args);

        winrt::fire_and_forget Tabs_SelectionChanged( 
            winrt::Windows::Foundation::IInspectable const& sender,
            Microsoft::UI::Xaml::Controls::SelectionChangedEventArgs const& args);


        void HoverCardPopup_Opened(
            winrt::Windows::Foundation::IInspectable const& sender,
            winrt::Windows::Foundation::IInspectable const& e);

    private:
        std::map<Microsoft::UI::Xaml::Controls::TabViewItem,Microsoft::UI::Xaml::Media::Imaging::BitmapImage> m_tabPreviews;

        Microsoft::UI::Xaml::Controls::TabViewItem m_activeTab{ nullptr };
    };
}

namespace winrt::Agentic_Browser::factory_implementation
{
    struct MainWindow : MainWindowT<MainWindow, implementation::MainWindow>
    {
    };
}