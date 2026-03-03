/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 92976:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/////////////////////////////////////////////////////////////////////////////////
/* UAParser.js v1.0.36
   Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
   MIT License *//*
   Detect Browser, Engine, OS, CPU, and Device type/model from User-Agent data.
   Supports browser & node.js environment. 
   Demo   : https://faisalman.github.io/ua-parser-js
   Source : https://github.com/faisalman/ua-parser-js */
/////////////////////////////////////////////////////////////////////////////////

(function (window, undefined) {

    'use strict';

    //////////////
    // Constants
    /////////////


    var LIBVERSION  = '1.0.36',
        EMPTY       = '',
        UNKNOWN     = '?',
        FUNC_TYPE   = 'function',
        UNDEF_TYPE  = 'undefined',
        OBJ_TYPE    = 'object',
        STR_TYPE    = 'string',
        MAJOR       = 'major',
        MODEL       = 'model',
        NAME        = 'name',
        TYPE        = 'type',
        VENDOR      = 'vendor',
        VERSION     = 'version',
        ARCHITECTURE= 'architecture',
        CONSOLE     = 'console',
        MOBILE      = 'mobile',
        TABLET      = 'tablet',
        SMARTTV     = 'smarttv',
        WEARABLE    = 'wearable',
        EMBEDDED    = 'embedded',
        UA_MAX_LENGTH = 350;

    var AMAZON  = 'Amazon',
        APPLE   = 'Apple',
        ASUS    = 'ASUS',
        BLACKBERRY = 'BlackBerry',
        BROWSER = 'Browser',
        CHROME  = 'Chrome',
        EDGE    = 'Edge',
        FIREFOX = 'Firefox',
        GOOGLE  = 'Google',
        HUAWEI  = 'Huawei',
        LG      = 'LG',
        MICROSOFT = 'Microsoft',
        MOTOROLA  = 'Motorola',
        OPERA   = 'Opera',
        SAMSUNG = 'Samsung',
        SHARP   = 'Sharp',
        SONY    = 'Sony',
        VIERA   = 'Viera',
        XIAOMI  = 'Xiaomi',
        ZEBRA   = 'Zebra',
        FACEBOOK    = 'Facebook',
        CHROMIUM_OS = 'Chromium OS',
        MAC_OS  = 'Mac OS';

    ///////////
    // Helper
    //////////

    var extend = function (regexes, extensions) {
            var mergedRegexes = {};
            for (var i in regexes) {
                if (extensions[i] && extensions[i].length % 2 === 0) {
                    mergedRegexes[i] = extensions[i].concat(regexes[i]);
                } else {
                    mergedRegexes[i] = regexes[i];
                }
            }
            return mergedRegexes;
        },
        enumerize = function (arr) {
            var enums = {};
            for (var i=0; i<arr.length; i++) {
                enums[arr[i].toUpperCase()] = arr[i];
            }
            return enums;
        },
        has = function (str1, str2) {
            return typeof str1 === STR_TYPE ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
        },
        lowerize = function (str) {
            return str.toLowerCase();
        },
        majorize = function (version) {
            return typeof(version) === STR_TYPE ? version.replace(/[^\d\.]/g, EMPTY).split('.')[0] : undefined;
        },
        trim = function (str, len) {
            if (typeof(str) === STR_TYPE) {
                str = str.replace(/^\s\s*/, EMPTY);
                return typeof(len) === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
            }
    };

    ///////////////
    // Map helper
    //////////////

    var rgxMapper = function (ua, arrays) {

            var i = 0, j, k, p, q, matches, match;

            // loop through all regexes maps
            while (i < arrays.length && !matches) {

                var regex = arrays[i],       // even sequence (0,2,4,..)
                    props = arrays[i + 1];   // odd sequence (1,3,5,..)
                j = k = 0;

                // try matching uastring with regexes
                while (j < regex.length && !matches) {

                    if (!regex[j]) { break; }
                    matches = regex[j++].exec(ua);

                    if (!!matches) {
                        for (p = 0; p < props.length; p++) {
                            match = matches[++k];
                            q = props[p];
                            // check if given property is actually array
                            if (typeof q === OBJ_TYPE && q.length > 0) {
                                if (q.length === 2) {
                                    if (typeof q[1] == FUNC_TYPE) {
                                        // assign modified match
                                        this[q[0]] = q[1].call(this, match);
                                    } else {
                                        // assign given value, ignore regex match
                                        this[q[0]] = q[1];
                                    }
                                } else if (q.length === 3) {
                                    // check whether function or regex
                                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                                        // call function (usually string mapper)
                                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                                    } else {
                                        // sanitize match using given regex
                                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                                    }
                                } else if (q.length === 4) {
                                        this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                                }
                            } else {
                                this[q] = match ? match : undefined;
                            }
                        }
                    }
                }
                i += 2;
            }
        },

        strMapper = function (str, map) {

            for (var i in map) {
                // check if current value is array
                if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
                    for (var j = 0; j < map[i].length; j++) {
                        if (has(map[i][j], str)) {
                            return (i === UNKNOWN) ? undefined : i;
                        }
                    }
                } else if (has(map[i], str)) {
                    return (i === UNKNOWN) ? undefined : i;
                }
            }
            return str;
    };

    ///////////////
    // String map
    //////////////

    // Safari < 3.0
    var oldSafariMap = {
            '1.0'   : '/8',
            '1.2'   : '/1',
            '1.3'   : '/3',
            '2.0'   : '/412',
            '2.0.2' : '/416',
            '2.0.3' : '/417',
            '2.0.4' : '/419',
            '?'     : '/'
        },
        windowsVersionMap = {
            'ME'        : '4.90',
            'NT 3.11'   : 'NT3.51',
            'NT 4.0'    : 'NT4.0',
            '2000'      : 'NT 5.0',
            'XP'        : ['NT 5.1', 'NT 5.2'],
            'Vista'     : 'NT 6.0',
            '7'         : 'NT 6.1',
            '8'         : 'NT 6.2',
            '8.1'       : 'NT 6.3',
            '10'        : ['NT 6.4', 'NT 10.0'],
            'RT'        : 'ARM'
    };

    //////////////
    // Regex map
    /////////////

    var regexes = {

        browser : [[

            /\b(?:crmo|crios)\/([\w\.]+)/i                                      // Chrome for Android/iOS
            ], [VERSION, [NAME, 'Chrome']], [
            /edg(?:e|ios|a)?\/([\w\.]+)/i                                       // Microsoft Edge
            ], [VERSION, [NAME, 'Edge']], [

            // Presto based
            /(opera mini)\/([-\w\.]+)/i,                                        // Opera Mini
            /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,                 // Opera Mobi/Tablet
            /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i                           // Opera
            ], [NAME, VERSION], [
            /opios[\/ ]+([\w\.]+)/i                                             // Opera mini on iphone >= 8.0
            ], [VERSION, [NAME, OPERA+' Mini']], [
            /\bopr\/([\w\.]+)/i                                                 // Opera Webkit
            ], [VERSION, [NAME, OPERA]], [

            // Mixed
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,      // Lunascape/Maxthon/Netfront/Jasmine/Blazer
            // Trident based
            /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,               // Avant/IEMobile/SlimBrowser
            /(ba?idubrowser)[\/ ]?([\w\.]+)/i,                                  // Baidu Browser
            /(?:ms|\()(ie) ([\w\.]+)/i,                                         // Internet Explorer

            // Webkit/KHTML based                                               // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
            /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
                                                                                // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ, aka ShouQ
            /(heytap|ovi)browser\/([\d\.]+)/i,                                  // Heytap/Ovi
            /(weibo)__([\d\.]+)/i                                               // Weibo
            ], [NAME, VERSION], [
            /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i                 // UCBrowser
            ], [VERSION, [NAME, 'UC'+BROWSER]], [
            /microm.+\bqbcore\/([\w\.]+)/i,                                     // WeChat Desktop for Windows Built-in Browser
            /\bqbcore\/([\w\.]+).+microm/i
            ], [VERSION, [NAME, 'WeChat(Win) Desktop']], [
            /micromessenger\/([\w\.]+)/i                                        // WeChat
            ], [VERSION, [NAME, 'WeChat']], [
            /konqueror\/([\w\.]+)/i                                             // Konqueror
            ], [VERSION, [NAME, 'Konqueror']], [
            /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i                       // IE11
            ], [VERSION, [NAME, 'IE']], [
            /ya(?:search)?browser\/([\w\.]+)/i                                  // Yandex
            ], [VERSION, [NAME, 'Yandex']], [
            /(avast|avg)\/([\w\.]+)/i                                           // Avast/AVG Secure Browser
            ], [[NAME, /(.+)/, '$1 Secure '+BROWSER], VERSION], [
            /\bfocus\/([\w\.]+)/i                                               // Firefox Focus
            ], [VERSION, [NAME, FIREFOX+' Focus']], [
            /\bopt\/([\w\.]+)/i                                                 // Opera Touch
            ], [VERSION, [NAME, OPERA+' Touch']], [
            /coc_coc\w+\/([\w\.]+)/i                                            // Coc Coc Browser
            ], [VERSION, [NAME, 'Coc Coc']], [
            /dolfin\/([\w\.]+)/i                                                // Dolphin
            ], [VERSION, [NAME, 'Dolphin']], [
            /coast\/([\w\.]+)/i                                                 // Opera Coast
            ], [VERSION, [NAME, OPERA+' Coast']], [
            /miuibrowser\/([\w\.]+)/i                                           // MIUI Browser
            ], [VERSION, [NAME, 'MIUI '+BROWSER]], [
            /fxios\/([-\w\.]+)/i                                                // Firefox for iOS
            ], [VERSION, [NAME, FIREFOX]], [
            /\bqihu|(qi?ho?o?|360)browser/i                                     // 360
            ], [[NAME, '360 '+BROWSER]], [
            /(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i
            ], [[NAME, /(.+)/, '$1 '+BROWSER], VERSION], [                      // Oculus/Samsung/Sailfish/Huawei Browser
            /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
            ], [[NAME, /_/g, ' '], VERSION], [
            /(electron)\/([\w\.]+) safari/i,                                    // Electron-based App
            /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,                   // Tesla
            /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i            // QQBrowser/Baidu App/2345 Browser
            ], [NAME, VERSION], [
            /(metasr)[\/ ]?([\w\.]+)/i,                                         // SouGouBrowser
            /(lbbrowser)/i,                                                     // LieBao Browser
            /\[(linkedin)app\]/i                                                // LinkedIn App for iOS & Android
            ], [NAME], [

            // WebView
            /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i       // Facebook App for iOS & Android
            ], [[NAME, FACEBOOK], VERSION], [
            /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,                             // Kakao App
            /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,                                  // Naver InApp
            /safari (line)\/([\w\.]+)/i,                                        // Line App for iOS
            /\b(line)\/([\w\.]+)\/iab/i,                                        // Line App for Android
            /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i                     // Chromium/Instagram/Snapchat
            ], [NAME, VERSION], [
            /\bgsa\/([\w\.]+) .*safari\//i                                      // Google Search Appliance on iOS
            ], [VERSION, [NAME, 'GSA']], [
            /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i                        // TikTok
            ], [VERSION, [NAME, 'TikTok']], [

            /headlesschrome(?:\/([\w\.]+)| )/i                                  // Chrome Headless
            ], [VERSION, [NAME, CHROME+' Headless']], [

            / wv\).+(chrome)\/([\w\.]+)/i                                       // Chrome WebView
            ], [[NAME, CHROME+' WebView'], VERSION], [

            /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i           // Android Browser
            ], [VERSION, [NAME, 'Android '+BROWSER]], [

            /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i       // Chrome/OmniWeb/Arora/Tizen/Nokia
            ], [NAME, VERSION], [

            /version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i                      // Mobile Safari
            ], [VERSION, [NAME, 'Mobile Safari']], [
            /version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i                // Safari & Safari Mobile
            ], [VERSION, NAME], [
            /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i                      // Safari < 3.0
            ], [NAME, [VERSION, strMapper, oldSafariMap]], [

            /(webkit|khtml)\/([\w\.]+)/i
            ], [NAME, VERSION], [

            // Gecko based
            /(navigator|netscape\d?)\/([-\w\.]+)/i                              // Netscape
            ], [[NAME, 'Netscape'], VERSION], [
            /mobile vr; rv:([\w\.]+)\).+firefox/i                               // Firefox Reality
            ], [VERSION, [NAME, FIREFOX+' Reality']], [
            /ekiohf.+(flow)\/([\w\.]+)/i,                                       // Flow
            /(swiftfox)/i,                                                      // Swiftfox
            /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                                                                                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror/Klar
            /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
            /(firefox)\/([\w\.]+)/i,                                            // Other Firefox-based
            /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,                         // Mozilla

            // Other
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                                                                                // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir/Obigo/Mosaic/Go/ICE/UP.Browser
            /(links) \(([\w\.]+)/i,                                             // Links
            /panasonic;(viera)/i                                                // Panasonic Viera
            ], [NAME, VERSION], [
            
            /(cobalt)\/([\w\.]+)/i                                              // Cobalt
            ], [NAME, [VERSION, /master.|lts./, ""]]
        ],

        cpu : [[

            /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i                     // AMD64 (x64)
            ], [[ARCHITECTURE, 'amd64']], [

            /(ia32(?=;))/i                                                      // IA32 (quicktime)
            ], [[ARCHITECTURE, lowerize]], [

            /((?:i[346]|x)86)[;\)]/i                                            // IA32 (x86)
            ], [[ARCHITECTURE, 'ia32']], [

            /\b(aarch64|arm(v?8e?l?|_?64))\b/i                                 // ARM64
            ], [[ARCHITECTURE, 'arm64']], [

            /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i                                   // ARMHF
            ], [[ARCHITECTURE, 'armhf']], [

            // PocketPC mistakenly identified as PowerPC
            /windows (ce|mobile); ppc;/i
            ], [[ARCHITECTURE, 'arm']], [

            /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i                            // PowerPC
            ], [[ARCHITECTURE, /ower/, EMPTY, lowerize]], [

            /(sun4\w)[;\)]/i                                                    // SPARC
            ], [[ARCHITECTURE, 'sparc']], [

            /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
                                                                                // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
            ], [[ARCHITECTURE, lowerize]]
        ],

        device : [[

            //////////////////////////
            // MOBILES & TABLETS
            /////////////////////////

            // Samsung
            /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
            ], [MODEL, [VENDOR, SAMSUNG], [TYPE, TABLET]], [
            /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
            /samsung[- ]([-\w]+)/i,
            /sec-(sgh\w+)/i
            ], [MODEL, [VENDOR, SAMSUNG], [TYPE, MOBILE]], [

            // Apple
            /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i                          // iPod/iPhone
            ], [MODEL, [VENDOR, APPLE], [TYPE, MOBILE]], [
            /\((ipad);[-\w\),; ]+apple/i,                                       // iPad
            /applecoremedia\/[\w\.]+ \((ipad)/i,
            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
            ], [MODEL, [VENDOR, APPLE], [TYPE, TABLET]], [
            /(macintosh);/i
            ], [MODEL, [VENDOR, APPLE]], [

            // Sharp
            /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
            ], [MODEL, [VENDOR, SHARP], [TYPE, MOBILE]], [

            // Huawei
            /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
            ], [MODEL, [VENDOR, HUAWEI], [TYPE, TABLET]], [
            /(?:huawei|honor)([-\w ]+)[;\)]/i,
            /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
            ], [MODEL, [VENDOR, HUAWEI], [TYPE, MOBILE]], [

            // Xiaomi
            /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,                  // Xiaomi POCO
            /\b; (\w+) build\/hm\1/i,                                           // Xiaomi Hongmi 'numeric' models
            /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,                             // Xiaomi Hongmi
            /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,                   // Xiaomi Redmi
            /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i // Xiaomi Mi
            ], [[MODEL, /_/g, ' '], [VENDOR, XIAOMI], [TYPE, MOBILE]], [
            /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i                        // Mi Pad tablets
            ],[[MODEL, /_/g, ' '], [VENDOR, XIAOMI], [TYPE, TABLET]], [

            // OPPO
            /; (\w+) bui.+ oppo/i,
            /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
            ], [MODEL, [VENDOR, 'OPPO'], [TYPE, MOBILE]], [

            // Vivo
            /vivo (\w+)(?: bui|\))/i,
            /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
            ], [MODEL, [VENDOR, 'Vivo'], [TYPE, MOBILE]], [

            // Realme
            /\b(rmx[12]\d{3})(?: bui|;|\))/i
            ], [MODEL, [VENDOR, 'Realme'], [TYPE, MOBILE]], [

            // Motorola
            /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
            /\bmot(?:orola)?[- ](\w*)/i,
            /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
            ], [MODEL, [VENDOR, MOTOROLA], [TYPE, MOBILE]], [
            /\b(mz60\d|xoom[2 ]{0,2}) build\//i
            ], [MODEL, [VENDOR, MOTOROLA], [TYPE, TABLET]], [

            // LG
            /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
            ], [MODEL, [VENDOR, LG], [TYPE, TABLET]], [
            /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
            /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
            /\blg-?([\d\w]+) bui/i
            ], [MODEL, [VENDOR, LG], [TYPE, MOBILE]], [

            // Lenovo
            /(ideatab[-\w ]+)/i,
            /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
            ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [

            // Nokia
            /(?:maemo|nokia).*(n900|lumia \d+)/i,
            /nokia[-_ ]?([-\w\.]*)/i
            ], [[MODEL, /_/g, ' '], [VENDOR, 'Nokia'], [TYPE, MOBILE]], [

            // Google
            /(pixel c)\b/i                                                      // Google Pixel C
            ], [MODEL, [VENDOR, GOOGLE], [TYPE, TABLET]], [
            /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i                         // Google Pixel
            ], [MODEL, [VENDOR, GOOGLE], [TYPE, MOBILE]], [

            // Sony
            /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
            ], [MODEL, [VENDOR, SONY], [TYPE, MOBILE]], [
            /sony tablet [ps]/i,
            /\b(?:sony)?sgp\w+(?: bui|\))/i
            ], [[MODEL, 'Xperia Tablet'], [VENDOR, SONY], [TYPE, TABLET]], [

            // OnePlus
            / (kb2005|in20[12]5|be20[12][59])\b/i,
            /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
            ], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [

            // Amazon
            /(alexa)webm/i,
            /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,                             // Kindle Fire without Silk / Echo Show
            /(kf[a-z]+)( bui|\)).+silk\//i                                      // Kindle Fire HD
            ], [MODEL, [VENDOR, AMAZON], [TYPE, TABLET]], [
            /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i                     // Fire Phone
            ], [[MODEL, /(.+)/g, 'Fire Phone $1'], [VENDOR, AMAZON], [TYPE, MOBILE]], [

            // BlackBerry
            /(playbook);[-\w\),; ]+(rim)/i                                      // BlackBerry PlayBook
            ], [MODEL, VENDOR, [TYPE, TABLET]], [
            /\b((?:bb[a-f]|st[hv])100-\d)/i,
            /\(bb10; (\w+)/i                                                    // BlackBerry 10
            ], [MODEL, [VENDOR, BLACKBERRY], [TYPE, MOBILE]], [

            // Asus
            /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
            ], [MODEL, [VENDOR, ASUS], [TYPE, TABLET]], [
            / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
            ], [MODEL, [VENDOR, ASUS], [TYPE, MOBILE]], [

            // HTC
            /(nexus 9)/i                                                        // HTC Nexus 9
            ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [
            /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,                         // HTC

            // ZTE
            /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
            /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i         // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
            ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [

            // Acer
            /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
            ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [

            // Meizu
            /droid.+; (m[1-5] note) bui/i,
            /\bmz-([-\w]{2,})/i
            ], [MODEL, [VENDOR, 'Meizu'], [TYPE, MOBILE]], [

            // MIXED
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,
                                                                                // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
            /(hp) ([\w ]+\w)/i,                                                 // HP iPAQ
            /(asus)-?(\w+)/i,                                                   // Asus
            /(microsoft); (lumia[\w ]+)/i,                                      // Microsoft Lumia
            /(lenovo)[-_ ]?([-\w]+)/i,                                          // Lenovo
            /(jolla)/i,                                                         // Jolla
            /(oppo) ?([\w ]+) bui/i                                             // OPPO
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /(kobo)\s(ereader|touch)/i,                                         // Kobo
            /(archos) (gamepad2?)/i,                                            // Archos
            /(hp).+(touchpad(?!.+tablet)|tablet)/i,                             // HP TouchPad
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /(nook)[\w ]+build\/(\w+)/i,                                        // Nook
            /(dell) (strea[kpr\d ]*[\dko])/i,                                   // Dell Streak
            /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,                                  // Le Pan Tablets
            /(trinity)[- ]*(t\d{3}) bui/i,                                      // Trinity Tablets
            /(gigaset)[- ]+(q\w{1,9}) bui/i,                                    // Gigaset Tablets
            /(vodafone) ([\w ]+)(?:\)| bui)/i                                   // Vodafone
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /(surface duo)/i                                                    // Surface Duo
            ], [MODEL, [VENDOR, MICROSOFT], [TYPE, TABLET]], [
            /droid [\d\.]+; (fp\du?)(?: b|\))/i                                 // Fairphone
            ], [MODEL, [VENDOR, 'Fairphone'], [TYPE, MOBILE]], [
            /(u304aa)/i                                                         // AT&T
            ], [MODEL, [VENDOR, 'AT&T'], [TYPE, MOBILE]], [
            /\bsie-(\w*)/i                                                      // Siemens
            ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [
            /\b(rct\w+) b/i                                                     // RCA Tablets
            ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [
            /\b(venue[\d ]{2,7}) b/i                                            // Dell Venue Tablets
            ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [
            /\b(q(?:mv|ta)\w+) b/i                                              // Verizon Tablet
            ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [
            /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i                       // Barnes & Noble Tablet
            ], [MODEL, [VENDOR, 'Barnes & Noble'], [TYPE, TABLET]], [
            /\b(tm\d{3}\w+) b/i
            ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [
            /\b(k88) b/i                                                        // ZTE K Series Tablet
            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [
            /\b(nx\d{3}j) b/i                                                   // ZTE Nubia
            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [
            /\b(gen\d{3}) b.+49h/i                                              // Swiss GEN Mobile
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [
            /\b(zur\d{3}) b/i                                                   // Swiss ZUR Tablet
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [
            /\b((zeki)?tb.*\b) b/i                                              // Zeki Tablets
            ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [
            /\b([yr]\d{2}) b/i,
            /\b(dragon[- ]+touch |dt)(\w{5}) b/i                                // Dragon Touch Tablet
            ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [
            /\b(ns-?\w{0,9}) b/i                                                // Insignia Tablets
            ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [
            /\b((nxa|next)-?\w{0,9}) b/i                                        // NextBook Tablets
            ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [
            /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i                  // Voice Xtreme Phones
            ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [
            /\b(lvtel\-)?(v1[12]) b/i                                           // LvTel Phones
            ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [
            /\b(ph-1) /i                                                        // Essential PH-1
            ], [MODEL, [VENDOR, 'Essential'], [TYPE, MOBILE]], [
            /\b(v(100md|700na|7011|917g).*\b) b/i                               // Envizen Tablets
            ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [
            /\b(trio[-\w\. ]+) b/i                                              // MachSpeed Tablets
            ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [
            /\btu_(1491) b/i                                                    // Rotor Tablets
            ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [
            /(shield[\w ]+) b/i                                                 // Nvidia Shield Tablets
            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, TABLET]], [
            /(sprint) (\w+)/i                                                   // Sprint Phones
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /(kin\.[onetw]{3})/i                                                // Microsoft Kin
            ], [[MODEL, /\./g, ' '], [VENDOR, MICROSOFT], [TYPE, MOBILE]], [
            /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i             // Zebra
            ], [MODEL, [VENDOR, ZEBRA], [TYPE, TABLET]], [
            /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
            ], [MODEL, [VENDOR, ZEBRA], [TYPE, MOBILE]], [

            ///////////////////
            // SMARTTVS
            ///////////////////

            /smart-tv.+(samsung)/i                                              // Samsung
            ], [VENDOR, [TYPE, SMARTTV]], [
            /hbbtv.+maple;(\d+)/i
            ], [[MODEL, /^/, 'SmartTV'], [VENDOR, SAMSUNG], [TYPE, SMARTTV]], [
            /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i        // LG SmartTV
            ], [[VENDOR, LG], [TYPE, SMARTTV]], [
            /(apple) ?tv/i                                                      // Apple TV
            ], [VENDOR, [MODEL, APPLE+' TV'], [TYPE, SMARTTV]], [
            /crkey/i                                                            // Google Chromecast
            ], [[MODEL, CHROME+'cast'], [VENDOR, GOOGLE], [TYPE, SMARTTV]], [
            /droid.+aft(\w+)( bui|\))/i                                         // Fire TV
            ], [MODEL, [VENDOR, AMAZON], [TYPE, SMARTTV]], [
            /\(dtv[\);].+(aquos)/i,
            /(aquos-tv[\w ]+)\)/i                                               // Sharp
            ], [MODEL, [VENDOR, SHARP], [TYPE, SMARTTV]],[
            /(bravia[\w ]+)( bui|\))/i                                              // Sony
            ], [MODEL, [VENDOR, SONY], [TYPE, SMARTTV]], [
            /(mitv-\w{5}) bui/i                                                 // Xiaomi
            ], [MODEL, [VENDOR, XIAOMI], [TYPE, SMARTTV]], [
            /Hbbtv.*(technisat) (.*);/i                                         // TechniSAT
            ], [VENDOR, MODEL, [TYPE, SMARTTV]], [
            /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,                          // Roku
            /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i         // HbbTV devices
            ], [[VENDOR, trim], [MODEL, trim], [TYPE, SMARTTV]], [
            /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i                   // SmartTV from Unidentified Vendors
            ], [[TYPE, SMARTTV]], [

            ///////////////////
            // CONSOLES
            ///////////////////

            /(ouya)/i,                                                          // Ouya
            /(nintendo) ([wids3utch]+)/i                                        // Nintendo
            ], [VENDOR, MODEL, [TYPE, CONSOLE]], [
            /droid.+; (shield) bui/i                                            // Nvidia
            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [
            /(playstation [345portablevi]+)/i                                   // Playstation
            ], [MODEL, [VENDOR, SONY], [TYPE, CONSOLE]], [
            /\b(xbox(?: one)?(?!; xbox))[\); ]/i                                // Microsoft Xbox
            ], [MODEL, [VENDOR, MICROSOFT], [TYPE, CONSOLE]], [

            ///////////////////
            // WEARABLES
            ///////////////////

            /((pebble))app/i                                                    // Pebble
            ], [VENDOR, MODEL, [TYPE, WEARABLE]], [
            /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i                              // Apple Watch
            ], [MODEL, [VENDOR, APPLE], [TYPE, WEARABLE]], [
            /droid.+; (glass) \d/i                                              // Google Glass
            ], [MODEL, [VENDOR, GOOGLE], [TYPE, WEARABLE]], [
            /droid.+; (wt63?0{2,3})\)/i
            ], [MODEL, [VENDOR, ZEBRA], [TYPE, WEARABLE]], [
            /(quest( 2| pro)?)/i                                                // Oculus Quest
            ], [MODEL, [VENDOR, FACEBOOK], [TYPE, WEARABLE]], [

            ///////////////////
            // EMBEDDED
            ///////////////////

            /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i                              // Tesla
            ], [VENDOR, [TYPE, EMBEDDED]], [
            /(aeobc)\b/i                                                        // Echo Dot
            ], [MODEL, [VENDOR, AMAZON], [TYPE, EMBEDDED]], [

            ////////////////////
            // MIXED (GENERIC)
            ///////////////////

            /droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i           // Android Phones from Unidentified Vendors
            ], [MODEL, [TYPE, MOBILE]], [
            /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i       // Android Tablets from Unidentified Vendors
            ], [MODEL, [TYPE, TABLET]], [
            /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i                      // Unidentifiable Tablet
            ], [[TYPE, TABLET]], [
            /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i    // Unidentifiable Mobile
            ], [[TYPE, MOBILE]], [
            /(android[-\w\. ]{0,9});.+buil/i                                    // Generic Android Device
            ], [MODEL, [VENDOR, 'Generic']]
        ],

        engine : [[

            /windows.+ edge\/([\w\.]+)/i                                       // EdgeHTML
            ], [VERSION, [NAME, EDGE+'HTML']], [

            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i                         // Blink
            ], [VERSION, [NAME, 'Blink']], [

            /(presto)\/([\w\.]+)/i,                                             // Presto
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
            /ekioh(flow)\/([\w\.]+)/i,                                          // Flow
            /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,                           // KHTML/Tasman/Links
            /(icab)[\/ ]([23]\.[\d\.]+)/i,                                      // iCab
            /\b(libweb)/i
            ], [NAME, VERSION], [

            /rv\:([\w\.]{1,9})\b.+(gecko)/i                                     // Gecko
            ], [VERSION, NAME]
        ],

        os : [[

            // Windows
            /microsoft (windows) (vista|xp)/i                                   // Windows (iTunes)
            ], [NAME, VERSION], [
            /(windows) nt 6\.2; (arm)/i,                                        // Windows RT
            /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,            // Windows Phone
            /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i
            ], [NAME, [VERSION, strMapper, windowsVersionMap]], [
            /(win(?=3|9|n)|win 9x )([nt\d\.]+)/i
            ], [[NAME, 'Windows'], [VERSION, strMapper, windowsVersionMap]], [

            // iOS/macOS
            /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,              // iOS
            /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
            /cfnetwork\/.+darwin/i
            ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [
            /(mac os x) ?([\w\. ]*)/i,
            /(macintosh|mac_powerpc\b)(?!.+haiku)/i                             // Mac OS
            ], [[NAME, MAC_OS], [VERSION, /_/g, '.']], [

            // Mobile OSes
            /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i                    // Android-x86/HarmonyOS
            ], [VERSION, NAME], [                                               // Android/WebOS/QNX/Bada/RIM/Maemo/MeeGo/Sailfish OS
            /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
            /(blackberry)\w*\/([\w\.]*)/i,                                      // Blackberry
            /(tizen|kaios)[\/ ]([\w\.]+)/i,                                     // Tizen/KaiOS
            /\((series40);/i                                                    // Series 40
            ], [NAME, VERSION], [
            /\(bb(10);/i                                                        // BlackBerry 10
            ], [VERSION, [NAME, BLACKBERRY]], [
            /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i         // Symbian
            ], [VERSION, [NAME, 'Symbian']], [
            /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i // Firefox OS
            ], [VERSION, [NAME, FIREFOX+' OS']], [
            /web0s;.+rt(tv)/i,
            /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i                              // WebOS
            ], [VERSION, [NAME, 'webOS']], [
            /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i                              // watchOS
            ], [VERSION, [NAME, 'watchOS']], [

            // Google Chromecast
            /crkey\/([\d\.]+)/i                                                 // Google Chromecast
            ], [VERSION, [NAME, CHROME+'cast']], [
            /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i                                  // Chromium OS
            ], [[NAME, CHROMIUM_OS], VERSION],[

            // Smart TVs
            /panasonic;(viera)/i,                                               // Panasonic Viera
            /(netrange)mmh/i,                                                   // Netrange
            /(nettv)\/(\d+\.[\w\.]+)/i,                                         // NetTV

            // Console
            /(nintendo|playstation) ([wids345portablevuch]+)/i,                 // Nintendo/Playstation
            /(xbox); +xbox ([^\);]+)/i,                                         // Microsoft Xbox (360, One, X, S, Series X, Series S)

            // Other
            /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,                            // Joli/Palm
            /(mint)[\/\(\) ]?(\w*)/i,                                           // Mint
            /(mageia|vectorlinux)[; ]/i,                                        // Mageia/VectorLinux
            /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                                                                                // Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire
            /(hurd|linux) ?([\w\.]*)/i,                                         // Hurd/Linux
            /(gnu) ?([\w\.]*)/i,                                                // GNU
            /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, // FreeBSD/NetBSD/OpenBSD/PC-BSD/GhostBSD/DragonFly
            /(haiku) (\w+)/i                                                    // Haiku
            ], [NAME, VERSION], [
            /(sunos) ?([\w\.\d]*)/i                                             // Solaris
            ], [[NAME, 'Solaris'], VERSION], [
            /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,                              // Solaris
            /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,                                  // AIX
            /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, // BeOS/OS2/AmigaOS/MorphOS/OpenVMS/Fuchsia/HP-UX/SerenityOS
            /(unix) ?([\w\.]*)/i                                                // UNIX
            ], [NAME, VERSION]
        ]
    };

    /////////////////
    // Constructor
    ////////////////

    var UAParser = function (ua, extensions) {

        if (typeof ua === OBJ_TYPE) {
            extensions = ua;
            ua = undefined;
        }

        if (!(this instanceof UAParser)) {
            return new UAParser(ua, extensions).getResult();
        }

        var _navigator = (typeof window !== UNDEF_TYPE && window.navigator) ? window.navigator : undefined;
        var _ua = ua || ((_navigator && _navigator.userAgent) ? _navigator.userAgent : EMPTY);
        var _uach = (_navigator && _navigator.userAgentData) ? _navigator.userAgentData : undefined;
        var _rgxmap = extensions ? extend(regexes, extensions) : regexes;
        var _isSelfNav = _navigator && _navigator.userAgent == _ua;

        this.getBrowser = function () {
            var _browser = {};
            _browser[NAME] = undefined;
            _browser[VERSION] = undefined;
            rgxMapper.call(_browser, _ua, _rgxmap.browser);
            _browser[MAJOR] = majorize(_browser[VERSION]);
            // Brave-specific detection
            if (_isSelfNav && _navigator && _navigator.brave && typeof _navigator.brave.isBrave == FUNC_TYPE) {
                _browser[NAME] = 'Brave';
            }
            return _browser;
        };
        this.getCPU = function () {
            var _cpu = {};
            _cpu[ARCHITECTURE] = undefined;
            rgxMapper.call(_cpu, _ua, _rgxmap.cpu);
            return _cpu;
        };
        this.getDevice = function () {
            var _device = {};
            _device[VENDOR] = undefined;
            _device[MODEL] = undefined;
            _device[TYPE] = undefined;
            rgxMapper.call(_device, _ua, _rgxmap.device);
            if (_isSelfNav && !_device[TYPE] && _uach && _uach.mobile) {
                _device[TYPE] = MOBILE;
            }
            // iPadOS-specific detection: identified as Mac, but has some iOS-only properties
            if (_isSelfNav && _device[MODEL] == 'Macintosh' && _navigator && typeof _navigator.standalone !== UNDEF_TYPE && _navigator.maxTouchPoints && _navigator.maxTouchPoints > 2) {
                _device[MODEL] = 'iPad';
                _device[TYPE] = TABLET;
            }
            return _device;
        };
        this.getEngine = function () {
            var _engine = {};
            _engine[NAME] = undefined;
            _engine[VERSION] = undefined;
            rgxMapper.call(_engine, _ua, _rgxmap.engine);
            return _engine;
        };
        this.getOS = function () {
            var _os = {};
            _os[NAME] = undefined;
            _os[VERSION] = undefined;
            rgxMapper.call(_os, _ua, _rgxmap.os);
            if (_isSelfNav && !_os[NAME] && _uach && _uach.platform != 'Unknown') {
                _os[NAME] = _uach.platform  
                                    .replace(/chrome os/i, CHROMIUM_OS)
                                    .replace(/macos/i, MAC_OS);           // backward compatibility
            }
            return _os;
        };
        this.getResult = function () {
            return {
                ua      : this.getUA(),
                browser : this.getBrowser(),
                engine  : this.getEngine(),
                os      : this.getOS(),
                device  : this.getDevice(),
                cpu     : this.getCPU()
            };
        };
        this.getUA = function () {
            return _ua;
        };
        this.setUA = function (ua) {
            _ua = (typeof ua === STR_TYPE && ua.length > UA_MAX_LENGTH) ? trim(ua, UA_MAX_LENGTH) : ua;
            return this;
        };
        this.setUA(_ua);
        return this;
    };

    UAParser.VERSION = LIBVERSION;
    UAParser.BROWSER =  enumerize([NAME, VERSION, MAJOR]);
    UAParser.CPU = enumerize([ARCHITECTURE]);
    UAParser.DEVICE = enumerize([MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED]);
    UAParser.ENGINE = UAParser.OS = enumerize([NAME, VERSION]);

    ///////////
    // Export
    //////////

    // check js environment
    if (typeof(exports) !== UNDEF_TYPE) {
        // nodejs env
        if ("object" !== UNDEF_TYPE && module.exports) {
            exports = module.exports = UAParser;
        }
        exports.UAParser = UAParser;
    } else {
        // requirejs env (optional)
        if ("function" === FUNC_TYPE && __webpack_require__.amdO) {
            !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
                return UAParser;
            }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        } else if (typeof window !== UNDEF_TYPE) {
            // browser env
            window.UAParser = UAParser;
        }
    }

    // jQuery/Zepto specific (optional)
    // Note:
    //   In AMD env the global scope should be kept clean, but jQuery is an exception.
    //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
    //   and we should catch that.
    var $ = typeof window !== UNDEF_TYPE && (window.jQuery || window.Zepto);
    if ($ && !$.ua) {
        var parser = new UAParser();
        $.ua = parser.getResult();
        $.ua.get = function () {
            return parser.getUA();
        };
        $.ua.set = function (ua) {
            parser.setUA(ua);
            var result = parser.getResult();
            for (var prop in result) {
                $.ua[prop] = result[prop];
            }
        };
    }

})(typeof window === 'object' ? window : this);


/***/ }),

/***/ 7967:
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (module) {
  /* webextension-polyfill - v0.12.0 - Tue May 14 2024 18:01:29 */
  /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */
  /* vim: set sts=2 sw=2 et tw=80: */
  /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
  "use strict";

  if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id)) {
    throw new Error("This script should only be loaded in a browser extension.");
  }
  if (!(globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)) {
    const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";

    // Wrapping the bulk of this polyfill in a one-time-use function is a minor
    // optimization for Firefox. Since Spidermonkey does not fully parse the
    // contents of a function until the first time it's called, and since it will
    // never actually need to be called, this allows the polyfill to be included
    // in Firefox nearly for free.
    const wrapAPIs = extensionAPIs => {
      // NOTE: apiMetadata is associated to the content of the api-metadata.json file
      // at build time by replacing the following "include" with the content of the
      // JSON file.
      const apiMetadata = {
        "alarms": {
          "clear": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "clearAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "get": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "bookmarks": {
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getChildren": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getRecent": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getSubTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTree": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "browserAction": {
          "disable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "enable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "getBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getBadgeText": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "openPopup": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setBadgeText": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "browsingData": {
          "remove": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "removeCache": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCookies": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeDownloads": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFormData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeHistory": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeLocalStorage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePasswords": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePluginData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "settings": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "commands": {
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "contextMenus": {
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "cookies": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAllCookieStores": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "set": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "devtools": {
          "inspectedWindow": {
            "eval": {
              "minArgs": 1,
              "maxArgs": 2,
              "singleCallbackArg": false
            }
          },
          "panels": {
            "create": {
              "minArgs": 3,
              "maxArgs": 3,
              "singleCallbackArg": true
            },
            "elements": {
              "createSidebarPane": {
                "minArgs": 1,
                "maxArgs": 1
              }
            }
          }
        },
        "downloads": {
          "cancel": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "download": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "erase": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFileIcon": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "open": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "pause": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFile": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "resume": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "extension": {
          "isAllowedFileSchemeAccess": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "isAllowedIncognitoAccess": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "history": {
          "addUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "deleteRange": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getVisits": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "i18n": {
          "detectLanguage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAcceptLanguages": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "identity": {
          "launchWebAuthFlow": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "idle": {
          "queryState": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "management": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getSelf": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setEnabled": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "uninstallSelf": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "notifications": {
          "clear": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPermissionLevel": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "pageAction": {
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "hide": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "permissions": {
          "contains": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "request": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "runtime": {
          "getBackgroundPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPlatformInfo": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "openOptionsPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "requestUpdateCheck": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "sendMessage": {
            "minArgs": 1,
            "maxArgs": 3
          },
          "sendNativeMessage": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "setUninstallURL": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "sessions": {
          "getDevices": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getRecentlyClosed": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "restore": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "storage": {
          "local": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "managed": {
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            }
          },
          "sync": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          }
        },
        "tabs": {
          "captureVisibleTab": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "detectLanguage": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "discard": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "duplicate": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "executeScript": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getZoom": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getZoomSettings": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "goBack": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "goForward": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "highlight": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "insertCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "query": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "reload": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "sendMessage": {
            "minArgs": 2,
            "maxArgs": 3
          },
          "setZoom": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "setZoomSettings": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "update": {
            "minArgs": 1,
            "maxArgs": 2
          }
        },
        "topSites": {
          "get": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "webNavigation": {
          "getAllFrames": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFrame": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "webRequest": {
          "handlerBehaviorChanged": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "windows": {
          "create": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getLastFocused": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        }
      };
      if (Object.keys(apiMetadata).length === 0) {
        throw new Error("api-metadata.json has not been included in browser-polyfill");
      }

      /**
       * A WeakMap subclass which creates and stores a value for any key which does
       * not exist when accessed, but behaves exactly as an ordinary WeakMap
       * otherwise.
       *
       * @param {function} createItem
       *        A function which will be called in order to create the value for any
       *        key which does not exist, the first time it is accessed. The
       *        function receives, as its only argument, the key being created.
       */
      class DefaultWeakMap extends WeakMap {
        constructor(createItem, items = undefined) {
          super(items);
          this.createItem = createItem;
        }
        get(key) {
          if (!this.has(key)) {
            this.set(key, this.createItem(key));
          }
          return super.get(key);
        }
      }

      /**
       * Returns true if the given object is an object with a `then` method, and can
       * therefore be assumed to behave as a Promise.
       *
       * @param {*} value The value to test.
       * @returns {boolean} True if the value is thenable.
       */
      const isThenable = value => {
        return value && typeof value === "object" && typeof value.then === "function";
      };

      /**
       * Creates and returns a function which, when called, will resolve or reject
       * the given promise based on how it is called:
       *
       * - If, when called, `chrome.runtime.lastError` contains a non-null object,
       *   the promise is rejected with that value.
       * - If the function is called with exactly one argument, the promise is
       *   resolved to that value.
       * - Otherwise, the promise is resolved to an array containing all of the
       *   function's arguments.
       *
       * @param {object} promise
       *        An object containing the resolution and rejection functions of a
       *        promise.
       * @param {function} promise.resolve
       *        The promise's resolution function.
       * @param {function} promise.reject
       *        The promise's rejection function.
       * @param {object} metadata
       *        Metadata about the wrapped method which has created the callback.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function}
       *        The generated callback function.
       */
      const makeCallback = (promise, metadata) => {
        return (...callbackArgs) => {
          if (extensionAPIs.runtime.lastError) {
            promise.reject(new Error(extensionAPIs.runtime.lastError.message));
          } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
            promise.resolve(callbackArgs[0]);
          } else {
            promise.resolve(callbackArgs);
          }
        };
      };
      const pluralizeArguments = numArgs => numArgs == 1 ? "argument" : "arguments";

      /**
       * Creates a wrapper function for a method with the given name and metadata.
       *
       * @param {string} name
       *        The name of the method which is being wrapped.
       * @param {object} metadata
       *        Metadata about the method being wrapped.
       * @param {integer} metadata.minArgs
       *        The minimum number of arguments which must be passed to the
       *        function. If called with fewer than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxArgs
       *        The maximum number of arguments which may be passed to the
       *        function. If called with more than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function(object, ...*)}
       *       The generated wrapper function.
       */
      const wrapAsyncFunction = (name, metadata) => {
        return function asyncFunctionWrapper(target, ...args) {
          if (args.length < metadata.minArgs) {
            throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
          }
          if (args.length > metadata.maxArgs) {
            throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
          }
          return new Promise((resolve, reject) => {
            if (metadata.fallbackToNoCallback) {
              // This API method has currently no callback on Chrome, but it return a promise on Firefox,
              // and so the polyfill will try to call it with a callback first, and it will fallback
              // to not passing the callback if the first call fails.
              try {
                target[name](...args, makeCallback({
                  resolve,
                  reject
                }, metadata));
              } catch (cbError) {
                console.warn(`${name} API method doesn't seem to support the callback parameter, ` + "falling back to call it without a callback: ", cbError);
                target[name](...args);

                // Update the API method metadata, so that the next API calls will not try to
                // use the unsupported callback anymore.
                metadata.fallbackToNoCallback = false;
                metadata.noCallback = true;
                resolve();
              }
            } else if (metadata.noCallback) {
              target[name](...args);
              resolve();
            } else {
              target[name](...args, makeCallback({
                resolve,
                reject
              }, metadata));
            }
          });
        };
      };

      /**
       * Wraps an existing method of the target object, so that calls to it are
       * intercepted by the given wrapper function. The wrapper function receives,
       * as its first argument, the original `target` object, followed by each of
       * the arguments passed to the original method.
       *
       * @param {object} target
       *        The original target object that the wrapped method belongs to.
       * @param {function} method
       *        The method being wrapped. This is used as the target of the Proxy
       *        object which is created to wrap the method.
       * @param {function} wrapper
       *        The wrapper function which is called in place of a direct invocation
       *        of the wrapped method.
       *
       * @returns {Proxy<function>}
       *        A Proxy object for the given method, which invokes the given wrapper
       *        method in its place.
       */
      const wrapMethod = (target, method, wrapper) => {
        return new Proxy(method, {
          apply(targetMethod, thisObj, args) {
            return wrapper.call(thisObj, target, ...args);
          }
        });
      };
      let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);

      /**
       * Wraps an object in a Proxy which intercepts and wraps certain methods
       * based on the given `wrappers` and `metadata` objects.
       *
       * @param {object} target
       *        The target object to wrap.
       *
       * @param {object} [wrappers = {}]
       *        An object tree containing wrapper functions for special cases. Any
       *        function present in this object tree is called in place of the
       *        method in the same location in the `target` object tree. These
       *        wrapper methods are invoked as described in {@see wrapMethod}.
       *
       * @param {object} [metadata = {}]
       *        An object tree containing metadata used to automatically generate
       *        Promise-based wrapper functions for asynchronous. Any function in
       *        the `target` object tree which has a corresponding metadata object
       *        in the same location in the `metadata` tree is replaced with an
       *        automatically-generated wrapper function, as described in
       *        {@see wrapAsyncFunction}
       *
       * @returns {Proxy<object>}
       */
      const wrapObject = (target, wrappers = {}, metadata = {}) => {
        let cache = Object.create(null);
        let handlers = {
          has(proxyTarget, prop) {
            return prop in target || prop in cache;
          },
          get(proxyTarget, prop, receiver) {
            if (prop in cache) {
              return cache[prop];
            }
            if (!(prop in target)) {
              return undefined;
            }
            let value = target[prop];
            if (typeof value === "function") {
              // This is a method on the underlying object. Check if we need to do
              // any wrapping.

              if (typeof wrappers[prop] === "function") {
                // We have a special-case wrapper for this method.
                value = wrapMethod(target, target[prop], wrappers[prop]);
              } else if (hasOwnProperty(metadata, prop)) {
                // This is an async method that we have metadata for. Create a
                // Promise wrapper for it.
                let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                value = wrapMethod(target, target[prop], wrapper);
              } else {
                // This is a method that we don't know or care about. Return the
                // original method, bound to the underlying object.
                value = value.bind(target);
              }
            } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
              // This is an object that we need to do some wrapping for the children
              // of. Create a sub-object wrapper for it with the appropriate child
              // metadata.
              value = wrapObject(value, wrappers[prop], metadata[prop]);
            } else if (hasOwnProperty(metadata, "*")) {
              // Wrap all properties in * namespace.
              value = wrapObject(value, wrappers[prop], metadata["*"]);
            } else {
              // We don't need to do any wrapping for this property,
              // so just forward all access to the underlying object.
              Object.defineProperty(cache, prop, {
                configurable: true,
                enumerable: true,
                get() {
                  return target[prop];
                },
                set(value) {
                  target[prop] = value;
                }
              });
              return value;
            }
            cache[prop] = value;
            return value;
          },
          set(proxyTarget, prop, value, receiver) {
            if (prop in cache) {
              cache[prop] = value;
            } else {
              target[prop] = value;
            }
            return true;
          },
          defineProperty(proxyTarget, prop, desc) {
            return Reflect.defineProperty(cache, prop, desc);
          },
          deleteProperty(proxyTarget, prop) {
            return Reflect.deleteProperty(cache, prop);
          }
        };

        // Per contract of the Proxy API, the "get" proxy handler must return the
        // original value of the target if that value is declared read-only and
        // non-configurable. For this reason, we create an object with the
        // prototype set to `target` instead of using `target` directly.
        // Otherwise we cannot return a custom object for APIs that
        // are declared read-only and non-configurable, such as `chrome.devtools`.
        //
        // The proxy handlers themselves will still use the original `target`
        // instead of the `proxyTarget`, so that the methods and properties are
        // dereferenced via the original targets.
        let proxyTarget = Object.create(target);
        return new Proxy(proxyTarget, handlers);
      };

      /**
       * Creates a set of wrapper functions for an event object, which handles
       * wrapping of listener functions that those messages are passed.
       *
       * A single wrapper is created for each listener function, and stored in a
       * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
       * retrieve the original wrapper, so that  attempts to remove a
       * previously-added listener work as expected.
       *
       * @param {DefaultWeakMap<function, function>} wrapperMap
       *        A DefaultWeakMap object which will create the appropriate wrapper
       *        for a given listener function when one does not exist, and retrieve
       *        an existing one when it does.
       *
       * @returns {object}
       */
      const wrapEvent = wrapperMap => ({
        addListener(target, listener, ...args) {
          target.addListener(wrapperMap.get(listener), ...args);
        },
        hasListener(target, listener) {
          return target.hasListener(wrapperMap.get(listener));
        },
        removeListener(target, listener) {
          target.removeListener(wrapperMap.get(listener));
        }
      });
      const onRequestFinishedWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }

        /**
         * Wraps an onRequestFinished listener function so that it will return a
         * `getContent()` property which returns a `Promise` rather than using a
         * callback API.
         *
         * @param {object} req
         *        The HAR entry object representing the network request.
         */
        return function onRequestFinished(req) {
          const wrappedReq = wrapObject(req, {} /* wrappers */, {
            getContent: {
              minArgs: 0,
              maxArgs: 0
            }
          });
          listener(wrappedReq);
        };
      });
      const onMessageWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }

        /**
         * Wraps a message listener function so that it may send responses based on
         * its return value, rather than by returning a sentinel value and calling a
         * callback. If the listener function returns a Promise, the response is
         * sent when the promise either resolves or rejects.
         *
         * @param {*} message
         *        The message sent by the other end of the channel.
         * @param {object} sender
         *        Details about the sender of the message.
         * @param {function(*)} sendResponse
         *        A callback which, when called with an arbitrary argument, sends
         *        that value as a response.
         * @returns {boolean}
         *        True if the wrapped listener returned a Promise, which will later
         *        yield a response. False otherwise.
         */
        return function onMessage(message, sender, sendResponse) {
          let didCallSendResponse = false;
          let wrappedSendResponse;
          let sendResponsePromise = new Promise(resolve => {
            wrappedSendResponse = function (response) {
              didCallSendResponse = true;
              resolve(response);
            };
          });
          let result;
          try {
            result = listener(message, sender, wrappedSendResponse);
          } catch (err) {
            result = Promise.reject(err);
          }
          const isResultThenable = result !== true && isThenable(result);

          // If the listener didn't returned true or a Promise, or called
          // wrappedSendResponse synchronously, we can exit earlier
          // because there will be no response sent from this listener.
          if (result !== true && !isResultThenable && !didCallSendResponse) {
            return false;
          }

          // A small helper to send the message if the promise resolves
          // and an error if the promise rejects (a wrapped sendMessage has
          // to translate the message into a resolved promise or a rejected
          // promise).
          const sendPromisedResult = promise => {
            promise.then(msg => {
              // send the message value.
              sendResponse(msg);
            }, error => {
              // Send a JSON representation of the error if the rejected value
              // is an instance of error, or the object itself otherwise.
              let message;
              if (error && (error instanceof Error || typeof error.message === "string")) {
                message = error.message;
              } else {
                message = "An unexpected error occurred";
              }
              sendResponse({
                __mozWebExtensionPolyfillReject__: true,
                message
              });
            }).catch(err => {
              // Print an error on the console if unable to send the response.
              console.error("Failed to send onMessage rejected reply", err);
            });
          };

          // If the listener returned a Promise, send the resolved value as a
          // result, otherwise wait the promise related to the wrappedSendResponse
          // callback to resolve and send it as a response.
          if (isResultThenable) {
            sendPromisedResult(result);
          } else {
            sendPromisedResult(sendResponsePromise);
          }

          // Let Chrome know that the listener is replying.
          return true;
        };
      });
      const wrappedSendMessageCallback = ({
        reject,
        resolve
      }, reply) => {
        if (extensionAPIs.runtime.lastError) {
          // Detect when none of the listeners replied to the sendMessage call and resolve
          // the promise to undefined as in Firefox.
          // See https://github.com/mozilla/webextension-polyfill/issues/130
          if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
            resolve();
          } else {
            reject(new Error(extensionAPIs.runtime.lastError.message));
          }
        } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
          // Convert back the JSON representation of the error into
          // an Error instance.
          reject(new Error(reply.message));
        } else {
          resolve(reply);
        }
      };
      const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
        if (args.length < metadata.minArgs) {
          throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
        }
        if (args.length > metadata.maxArgs) {
          throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
        }
        return new Promise((resolve, reject) => {
          const wrappedCb = wrappedSendMessageCallback.bind(null, {
            resolve,
            reject
          });
          args.push(wrappedCb);
          apiNamespaceObj.sendMessage(...args);
        });
      };
      const staticWrappers = {
        devtools: {
          network: {
            onRequestFinished: wrapEvent(onRequestFinishedWrappers)
          }
        },
        runtime: {
          onMessage: wrapEvent(onMessageWrappers),
          onMessageExternal: wrapEvent(onMessageWrappers),
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 1,
            maxArgs: 3
          })
        },
        tabs: {
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 2,
            maxArgs: 3
          })
        }
      };
      const settingMetadata = {
        clear: {
          minArgs: 1,
          maxArgs: 1
        },
        get: {
          minArgs: 1,
          maxArgs: 1
        },
        set: {
          minArgs: 1,
          maxArgs: 1
        }
      };
      apiMetadata.privacy = {
        network: {
          "*": settingMetadata
        },
        services: {
          "*": settingMetadata
        },
        websites: {
          "*": settingMetadata
        }
      };
      return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
    };

    // The build process adds a UMD wrapper around this file, which makes the
    // `module` variable available.
    module.exports = wrapAPIs(chrome);
  } else {
    module.exports = globalThis.browser;
  }
});


/***/ }),

/***/ 2786:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isCallable = __webpack_require__(33901);
var tryToString = __webpack_require__(56383);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 55034:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isPossiblePrototype = __webpack_require__(26493);

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (isPossiblePrototype(argument)) return argument;
  throw new $TypeError("Can't set " + $String(argument) + ' as a prototype');
};


/***/ }),

/***/ 9693:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var wellKnownSymbol = __webpack_require__(25723);
var create = __webpack_require__(66736);
var defineProperty = (__webpack_require__(9609).f);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] === undefined) {
  defineProperty(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ 93263:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isObject = __webpack_require__(34186);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ 5865:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIndexedObject = __webpack_require__(42173);
var toAbsoluteIndex = __webpack_require__(63458);
var lengthOfArrayLike = __webpack_require__(47294);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 11822:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(2599);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};


/***/ }),

/***/ 13302:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var aCallable = __webpack_require__(2786);
var toObject = __webpack_require__(76573);
var IndexedObject = __webpack_require__(98119);
var lengthOfArrayLike = __webpack_require__(47294);

var $TypeError = TypeError;

var REDUCE_EMPTY = 'Reduce of empty array with no initial value';

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = lengthOfArrayLike(O);
    aCallable(callbackfn);
    if (length === 0 && argumentsLength < 2) throw new $TypeError(REDUCE_EMPTY);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw new $TypeError(REDUCE_EMPTY);
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};


/***/ }),

/***/ 632:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(54936);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 45123:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(2980);
var isCallable = __webpack_require__(33901);
var classofRaw = __webpack_require__(632);
var wellKnownSymbol = __webpack_require__(25723);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 81988:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var hasOwn = __webpack_require__(30217);
var ownKeys = __webpack_require__(49951);
var getOwnPropertyDescriptorModule = __webpack_require__(84987);
var definePropertyModule = __webpack_require__(9609);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 98515:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(72468);
var definePropertyModule = __webpack_require__(9609);
var createPropertyDescriptor = __webpack_require__(57692);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 57692:
/***/ ((module) => {

"use strict";

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 43954:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var makeBuiltIn = __webpack_require__(57171);
var defineProperty = __webpack_require__(9609);

module.exports = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty.f(target, name, descriptor);
};


/***/ }),

/***/ 44432:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isCallable = __webpack_require__(33901);
var definePropertyModule = __webpack_require__(9609);
var makeBuiltIn = __webpack_require__(57171);
var defineGlobalProperty = __webpack_require__(47473);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ 47473:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(34760);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(globalThis, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    globalThis[key] = value;
  } return value;
};


/***/ }),

/***/ 72468:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(2599);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});


/***/ }),

/***/ 55391:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(34760);
var isObject = __webpack_require__(34186);

var document = globalThis.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 77343:
/***/ ((module) => {

"use strict";

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 9273:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ENVIRONMENT = __webpack_require__(55327);

module.exports = ENVIRONMENT === 'NODE';


/***/ }),

/***/ 74623:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(34760);

var navigator = globalThis.navigator;
var userAgent = navigator && navigator.userAgent;

module.exports = userAgent ? String(userAgent) : '';


/***/ }),

/***/ 6839:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(34760);
var userAgent = __webpack_require__(74623);

var process = globalThis.process;
var Deno = globalThis.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 55327:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* global Bun, Deno -- detection */
var globalThis = __webpack_require__(34760);
var userAgent = __webpack_require__(74623);
var classof = __webpack_require__(632);

var userAgentStartsWith = function (string) {
  return userAgent.slice(0, string.length) === string;
};

module.exports = (function () {
  if (userAgentStartsWith('Bun/')) return 'BUN';
  if (userAgentStartsWith('Cloudflare-Workers')) return 'CLOUDFLARE';
  if (userAgentStartsWith('Deno/')) return 'DENO';
  if (userAgentStartsWith('Node.js/')) return 'NODE';
  if (globalThis.Bun && typeof Bun.version == 'string') return 'BUN';
  if (globalThis.Deno && typeof Deno.version == 'object') return 'DENO';
  if (classof(globalThis.process) === 'process') return 'NODE';
  if (globalThis.window && globalThis.document) return 'BROWSER';
  return 'REST';
})();


/***/ }),

/***/ 96345:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(54936);

var $Error = Error;
var replace = uncurryThis(''.replace);

var TEST = (function (arg) { return String(new $Error(arg).stack); })('zxcasd');
// eslint-disable-next-line redos/no-vulnerable, sonarjs/slow-regex -- safe
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

module.exports = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};


/***/ }),

/***/ 15827:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var createNonEnumerableProperty = __webpack_require__(98515);
var clearErrorStack = __webpack_require__(96345);
var ERROR_STACK_INSTALLABLE = __webpack_require__(11179);

// non-standard V8
var captureStackTrace = Error.captureStackTrace;

module.exports = function (error, C, stack, dropEntries) {
  if (ERROR_STACK_INSTALLABLE) {
    if (captureStackTrace) captureStackTrace(error, C);
    else createNonEnumerableProperty(error, 'stack', clearErrorStack(stack, dropEntries));
  }
};


/***/ }),

/***/ 11179:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(2599);
var createPropertyDescriptor = __webpack_require__(57692);

module.exports = !fails(function () {
  var error = new Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));
  return error.stack !== 7;
});


/***/ }),

/***/ 79214:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(34760);
var getOwnPropertyDescriptor = (__webpack_require__(84987).f);
var createNonEnumerableProperty = __webpack_require__(98515);
var defineBuiltIn = __webpack_require__(44432);
var defineGlobalProperty = __webpack_require__(47473);
var copyConstructorProperties = __webpack_require__(81988);
var isForced = __webpack_require__(46612);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = globalThis;
  } else if (STATIC) {
    target = globalThis[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = globalThis[TARGET] && globalThis[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 2599:
/***/ ((module) => {

"use strict";

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 78881:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_BIND = __webpack_require__(10592);

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-function-prototype-bind, es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ 10592:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(2599);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 12341:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_BIND = __webpack_require__(10592);

var call = Function.prototype.call;
// eslint-disable-next-line es/no-function-prototype-bind -- safe
module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 23942:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(72468);
var hasOwn = __webpack_require__(30217);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 76298:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(54936);
var aCallable = __webpack_require__(2786);

module.exports = function (object, key, method) {
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
  } catch (error) { /* empty */ }
};


/***/ }),

/***/ 54936:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_BIND = __webpack_require__(10592);

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
// eslint-disable-next-line es/no-function-prototype-bind -- safe
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 19631:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(34760);
var isCallable = __webpack_require__(33901);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(globalThis[namespace]) : globalThis[namespace] && globalThis[namespace][method];
};


/***/ }),

/***/ 67734:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var aCallable = __webpack_require__(2786);
var isNullOrUndefined = __webpack_require__(46013);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ 34760:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  check(typeof this == 'object' && this) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 30217:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(54936);
var toObject = __webpack_require__(76573);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 45149:
/***/ ((module) => {

"use strict";

module.exports = {};


/***/ }),

/***/ 3733:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(19631);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ 65125:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(72468);
var fails = __webpack_require__(2599);
var createElement = __webpack_require__(55391);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});


/***/ }),

/***/ 98119:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(54936);
var fails = __webpack_require__(2599);
var classof = __webpack_require__(632);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ 88359:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isCallable = __webpack_require__(33901);
var isObject = __webpack_require__(34186);
var setPrototypeOf = __webpack_require__(45407);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ 37858:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(54936);
var isCallable = __webpack_require__(33901);
var store = __webpack_require__(99781);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 68424:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isObject = __webpack_require__(34186);
var createNonEnumerableProperty = __webpack_require__(98515);

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
module.exports = function (O, options) {
  if (isObject(options) && 'cause' in options) {
    createNonEnumerableProperty(O, 'cause', options.cause);
  }
};


/***/ }),

/***/ 37813:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_WEAK_MAP = __webpack_require__(51366);
var globalThis = __webpack_require__(34760);
var isObject = __webpack_require__(34186);
var createNonEnumerableProperty = __webpack_require__(98515);
var hasOwn = __webpack_require__(30217);
var shared = __webpack_require__(99781);
var sharedKey = __webpack_require__(41279);
var hiddenKeys = __webpack_require__(45149);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = globalThis.TypeError;
var WeakMap = globalThis.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 33901:
/***/ ((module) => {

"use strict";

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
module.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 46612:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(2599);
var isCallable = __webpack_require__(33901);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 46013:
/***/ ((module) => {

"use strict";

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ 34186:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isCallable = __webpack_require__(33901);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 26493:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isObject = __webpack_require__(34186);

module.exports = function (argument) {
  return isObject(argument) || argument === null;
};


/***/ }),

/***/ 28595:
/***/ ((module) => {

"use strict";

module.exports = false;


/***/ }),

/***/ 32813:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(19631);
var isCallable = __webpack_require__(33901);
var isPrototypeOf = __webpack_require__(44657);
var USE_SYMBOL_AS_UID = __webpack_require__(79816);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ 47294:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toLength = __webpack_require__(72406);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 57171:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(54936);
var fails = __webpack_require__(2599);
var isCallable = __webpack_require__(33901);
var hasOwn = __webpack_require__(30217);
var DESCRIPTORS = __webpack_require__(72468);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(23942).CONFIGURABLE);
var inspectSource = __webpack_require__(37858);
var InternalStateModule = __webpack_require__(37813);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 93149:
/***/ ((module) => {

"use strict";

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ 92867:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toString = __webpack_require__(93207);

module.exports = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};


/***/ }),

/***/ 66736:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(93263);
var definePropertiesModule = __webpack_require__(82201);
var enumBugKeys = __webpack_require__(77343);
var hiddenKeys = __webpack_require__(45149);
var html = __webpack_require__(3733);
var documentCreateElement = __webpack_require__(55391);
var sharedKey = __webpack_require__(41279);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  // eslint-disable-next-line no-useless-assignment -- avoid memory leak
  activeXDocument = null;
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};


/***/ }),

/***/ 82201:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(72468);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(20102);
var definePropertyModule = __webpack_require__(9609);
var anObject = __webpack_require__(93263);
var toIndexedObject = __webpack_require__(42173);
var objectKeys = __webpack_require__(20600);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ 9609:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(72468);
var IE8_DOM_DEFINE = __webpack_require__(65125);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(20102);
var anObject = __webpack_require__(93263);
var toPropertyKey = __webpack_require__(89153);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 84987:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(72468);
var call = __webpack_require__(12341);
var propertyIsEnumerableModule = __webpack_require__(72349);
var createPropertyDescriptor = __webpack_require__(57692);
var toIndexedObject = __webpack_require__(42173);
var toPropertyKey = __webpack_require__(89153);
var hasOwn = __webpack_require__(30217);
var IE8_DOM_DEFINE = __webpack_require__(65125);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 55384:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var internalObjectKeys = __webpack_require__(29340);
var enumBugKeys = __webpack_require__(77343);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 19965:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 44657:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(54936);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 29340:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(54936);
var hasOwn = __webpack_require__(30217);
var toIndexedObject = __webpack_require__(42173);
var indexOf = (__webpack_require__(5865).indexOf);
var hiddenKeys = __webpack_require__(45149);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 20600:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var internalObjectKeys = __webpack_require__(29340);
var enumBugKeys = __webpack_require__(77343);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ 72349:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 45407:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable no-proto -- safe */
var uncurryThisAccessor = __webpack_require__(76298);
var isObject = __webpack_require__(34186);
var requireObjectCoercible = __webpack_require__(98654);
var aPossiblePrototype = __webpack_require__(55034);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    requireObjectCoercible(O);
    aPossiblePrototype(proto);
    if (!isObject(O)) return O;
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 67718:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var call = __webpack_require__(12341);
var isCallable = __webpack_require__(33901);
var isObject = __webpack_require__(34186);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw new $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 49951:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(19631);
var uncurryThis = __webpack_require__(54936);
var getOwnPropertyNamesModule = __webpack_require__(55384);
var getOwnPropertySymbolsModule = __webpack_require__(19965);
var anObject = __webpack_require__(93263);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 96728:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineProperty = (__webpack_require__(9609).f);

module.exports = function (Target, Source, key) {
  key in Target || defineProperty(Target, key, {
    configurable: true,
    get: function () { return Source[key]; },
    set: function (it) { Source[key] = it; }
  });
};


/***/ }),

/***/ 98654:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isNullOrUndefined = __webpack_require__(46013);

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 41279:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var shared = __webpack_require__(16889);
var uid = __webpack_require__(64232);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 99781:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var IS_PURE = __webpack_require__(28595);
var globalThis = __webpack_require__(34760);
var defineGlobalProperty = __webpack_require__(47473);

var SHARED = '__core-js_shared__';
var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

(store.versions || (store.versions = [])).push({
  version: '3.40.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2025 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.40.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 16889:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var store = __webpack_require__(99781);

module.exports = function (key, value) {
  return store[key] || (store[key] = value || {});
};


/***/ }),

/***/ 36647:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(6839);
var fails = __webpack_require__(2599);
var globalThis = __webpack_require__(34760);

var $String = globalThis.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 63458:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIntegerOrInfinity = __webpack_require__(71939);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 42173:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(98119);
var requireObjectCoercible = __webpack_require__(98654);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 71939:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var trunc = __webpack_require__(93149);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ 72406:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIntegerOrInfinity = __webpack_require__(71939);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  var len = toIntegerOrInfinity(argument);
  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 76573:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var requireObjectCoercible = __webpack_require__(98654);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 44321:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var call = __webpack_require__(12341);
var isObject = __webpack_require__(34186);
var isSymbol = __webpack_require__(32813);
var getMethod = __webpack_require__(67734);
var ordinaryToPrimitive = __webpack_require__(67718);
var wellKnownSymbol = __webpack_require__(25723);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw new $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 89153:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toPrimitive = __webpack_require__(44321);
var isSymbol = __webpack_require__(32813);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 2980:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var wellKnownSymbol = __webpack_require__(25723);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 93207:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classof = __webpack_require__(45123);

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),

/***/ 56383:
/***/ ((module) => {

"use strict";

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 64232:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(54936);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 79816:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(36647);

module.exports = NATIVE_SYMBOL &&
  !Symbol.sham &&
  typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 20102:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(72468);
var fails = __webpack_require__(2599);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});


/***/ }),

/***/ 51366:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(34760);
var isCallable = __webpack_require__(33901);

var WeakMap = globalThis.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),

/***/ 25723:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(34760);
var shared = __webpack_require__(16889);
var hasOwn = __webpack_require__(30217);
var uid = __webpack_require__(64232);
var NATIVE_SYMBOL = __webpack_require__(36647);
var USE_SYMBOL_AS_UID = __webpack_require__(79816);

var Symbol = globalThis.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 1361:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(19631);
var hasOwn = __webpack_require__(30217);
var createNonEnumerableProperty = __webpack_require__(98515);
var isPrototypeOf = __webpack_require__(44657);
var setPrototypeOf = __webpack_require__(45407);
var copyConstructorProperties = __webpack_require__(81988);
var proxyAccessor = __webpack_require__(96728);
var inheritIfRequired = __webpack_require__(88359);
var normalizeStringArgument = __webpack_require__(92867);
var installErrorCause = __webpack_require__(68424);
var installErrorStack = __webpack_require__(15827);
var DESCRIPTORS = __webpack_require__(72468);
var IS_PURE = __webpack_require__(28595);

module.exports = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var STACK_TRACE_LIMIT = 'stackTraceLimit';
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (!IS_PURE && hasOwn(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn('Error');

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty(result, 'message', message);
    installErrorStack(result, WrappedError, result.stack, 2);
    if (this && isPrototypeOf(OriginalErrorPrototype, this)) inheritIfRequired(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf) setPrototypeOf(WrappedError, BaseError);
    else copyConstructorProperties(WrappedError, BaseError, { name: true });
  } else if (DESCRIPTORS && STACK_TRACE_LIMIT in OriginalError) {
    proxyAccessor(WrappedError, OriginalError, STACK_TRACE_LIMIT);
    proxyAccessor(WrappedError, OriginalError, 'prepareStackTrace');
  }

  copyConstructorProperties(WrappedError, OriginalError);

  if (!IS_PURE) try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty(OriginalErrorPrototype, 'name', ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) { /* empty */ }

  return WrappedError;
};


/***/ }),

/***/ 90767:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(79214);
var $includes = (__webpack_require__(5865).includes);
var fails = __webpack_require__(2599);
var addToUnscopables = __webpack_require__(9693);

// FF99+ bug
var BROKEN_ON_SPARSE = fails(function () {
  // eslint-disable-next-line es/no-array-prototype-includes -- detection
  return !Array(1).includes();
});

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ 51472:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(79214);
var $reduce = (__webpack_require__(13302).left);
var arrayMethodIsStrict = __webpack_require__(11822);
var CHROME_VERSION = __webpack_require__(6839);
var IS_NODE = __webpack_require__(9273);

// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;
var FORCED = CHROME_BUG || !arrayMethodIsStrict('reduce');

// `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce
$({ target: 'Array', proto: true, forced: FORCED }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var length = arguments.length;
    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 59952:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable no-unused-vars -- required for functions `.length` */
var $ = __webpack_require__(79214);
var globalThis = __webpack_require__(34760);
var apply = __webpack_require__(78881);
var wrapErrorConstructorWithCause = __webpack_require__(1361);

var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly = globalThis[WEB_ASSEMBLY];

// eslint-disable-next-line es/no-error-cause -- feature detection
var FORCED = new Error('e', { cause: 7 }).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED);
  $({ global: true, constructor: true, arity: 1, forced: FORCED }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly && WebAssembly[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED);
    $({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED }, O);
  }
};

// https://tc39.es/ecma262/#sec-nativeerror
exportGlobalErrorCauseWrapper('Error', function (init) {
  return function Error(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('EvalError', function (init) {
  return function EvalError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('RangeError', function (init) {
  return function RangeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
  return function ReferenceError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
  return function SyntaxError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('TypeError', function (init) {
  return function TypeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('URIError', function (init) {
  return function URIError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
  return function CompileError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
  return function LinkError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
  return function RuntimeError(message) { return apply(init, this, arguments); };
});


/***/ }),

/***/ 91219:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(79214);
var globalThis = __webpack_require__(34760);
var defineBuiltInAccessor = __webpack_require__(43954);
var DESCRIPTORS = __webpack_require__(72468);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var INCORRECT_VALUE = globalThis.self !== globalThis;

// `self` getter
// https://html.spec.whatwg.org/multipage/window-object.html#dom-self
try {
  if (DESCRIPTORS) {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var descriptor = Object.getOwnPropertyDescriptor(globalThis, 'self');
    // some engines have `self`, but with incorrect descriptor
    // https://github.com/denoland/deno/issues/15765
    if (INCORRECT_VALUE || !descriptor || !descriptor.get || !descriptor.enumerable) {
      defineBuiltInAccessor(globalThis, 'self', {
        get: function self() {
          return globalThis;
        },
        set: function self(value) {
          if (this !== globalThis) throw new $TypeError('Illegal invocation');
          defineProperty(globalThis, 'self', {
            value: value,
            writable: true,
            configurable: true,
            enumerable: true
          });
        },
        configurable: true,
        enumerable: true
      });
    }
  } else $({ global: true, simple: true, forced: INCORRECT_VALUE }, {
    self: globalThis
  });
} catch (error) { /* empty */ }


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd options */
/******/ 	(() => {
/******/ 		__webpack_require__.amdO = {};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/.pnpm/ua-parser-js@1.0.36/node_modules/ua-parser-js/src/ua-parser.js
var ua_parser = __webpack_require__(92976);
var ua_parser_default = /*#__PURE__*/__webpack_require__.n(ua_parser);
// EXTERNAL MODULE: ./node_modules/.pnpm/webextension-polyfill@0.12.0/node_modules/webextension-polyfill/dist/browser-polyfill.js
var browser_polyfill = __webpack_require__(7967);
var browser_polyfill_default = /*#__PURE__*/__webpack_require__.n(browser_polyfill);
;// ./constants.ts
/**
 * Copyright (c) 2015-2025 Adguard Software Ltd.
 *
 * @file
 * This file is part of AdGuard Browser Extension (https://github.com/AdguardTeam/AdguardBrowserExtension).
 *
 * AdGuard Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * AdGuard Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with AdGuard Browser Extension. If not, see <http://www.gnu.org/licenses/>.
 */ const WEB_ACCESSIBLE_RESOURCES_OUTPUT = 'web-accessible-resources';
const WEB_ACCESSIBLE_RESOURCES_OUTPUT_REDIRECTS = (/* unused pure expression or super */ null && (`${WEB_ACCESSIBLE_RESOURCES_OUTPUT}/redirects`));
// IMPORTANT! If you will add new directory for output files, please configure check
// function in tools/bundle-size/check.ts for new directory.
const BACKGROUND_OUTPUT = 'pages/background';
const OPTIONS_OUTPUT = 'pages/options';
const POPUP_OUTPUT = 'pages/popup';
const FILTERING_LOG_OUTPUT = 'pages/filtering-log';
const POST_INSTALL_OUTPUT = 'pages/post-install';
const FULLSCREEN_USER_RULES_OUTPUT = 'pages/fullscreen-user-rules';
const BLOCKING_BLOCKED_OUTPUT = 'pages/blocking/blocked';
const BLOCKING_SAFEBROWSING_OUTPUT = 'pages/blocking/safebrowsing';
const SUBSCRIBE_OUTPUT = 'pages/subscribe';
const CONTENT_SCRIPT_START_OUTPUT = 'pages/content-script-start';
const CONTENT_SCRIPT_END_OUTPUT = 'pages/content-script-end';
const THANKYOU_OUTPUT = 'pages/thankyou';
const ASSISTANT_INJECT_OUTPUT = 'pages/assistant-inject';
const GPC_SCRIPT_OUTPUT = 'pages/gpc';
const HIDE_DOCUMENT_REFERRER_OUTPUT = 'pages/hide-document-referrer';
const DEVTOOLS_OUTPUT = 'pages/devtools';
const DEVTOOLS_ELEMENT_SIDEBAR_OUTPUT = 'pages/devtools-elements-sidebar';
const SHARED_EDITOR_OUTPUT = 'shared/editor';
const REACT_VENDOR_OUTPUT = 'vendors/react';
const MOBX_VENDOR_OUTPUT = 'vendors/mobx';
const XSTATE_VENDOR_OUTPUT = 'vendors/xstate';
const TSURLFILTER_VENDOR_OUTPUT = 'vendors/tsurlfilter';
const TSURLFILTER_DECLARATIVE_CONVERTER_VENDOR_OUTPUT = 'vendors/tsurlfilter-declarative-converter';
const AGTREE_VENDOR_OUTPUT = 'vendors/agtree';
const CSS_TOKENIZER_VENDOR_OUTPUT = 'vendors/css-tokenizer';
const TSWEBEXTENSION_VENDOR_OUTPUT = 'vendors/tswebextension';
const TEXT_ENCODING_POLYFILL_VENDOR_OUTPUT = 'vendors/text-encoding-polyfill';
const SCRIPTLETS_VENDOR_OUTPUT = 'vendors/scriptlets';
// Placed here to use in the node environment and in the browser
// Important: extensions '.js' used for correct work of Cloudflare cache, but
// real format of these files is JSON.
// See AG-1901 for details.
const REMOTE_METADATA_FILE_NAME = 'filters.js';
const REMOTE_I18N_METADATA_FILE_NAME = 'filters_i18n.js';
// But locally we prefer to use '.json' extension.
const LOCAL_METADATA_FILE_NAME = 'filters.json';
const LOCAL_I18N_METADATA_FILE_NAME = 'filters_i18n.json';
const INDEX_HTML_FILE_NAME = 'index.html';
/**
 * List of AdGuard filters IDs.
 *
 * `12` is absent because Safari filter if obsolete and not used anymore.
 */ const ADGUARD_FILTERS_IDS = (/* unused pure expression or super */ null && ([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    224
]));
/**
 * Environment types for build target.
 */ var BuildTargetEnv = /*#__PURE__*/ function(BuildTargetEnv) {
    BuildTargetEnv["Dev"] = "dev";
    BuildTargetEnv["Beta"] = "beta";
    BuildTargetEnv["Release"] = "release";
    return BuildTargetEnv;
}({});
/**
 * IDs of the extension in Chrome Web Store for each build target environment.
 *
 * @type {Record<BuildTargetEnv, string>}
 */ const ExtensionsIds = {
    ["release"]: 'bgnkhhnnamicmpeenaelnjfhikgbkllg',
    ["beta"]: 'apjcbfpjihpedihablmalmbbhjpklbdf',
    ["dev"]: ''
};
/**
 * Minimum supported browser versions.
 *
 * IMPORTANT! Update browser compatibility in the README.md file when changing the versions.
 */ const MIN_SUPPORTED_VERSION = {
    CHROMIUM_MV2: 79,
    CHROMIUM_MV3: 121,
    FIREFOX: 78,
    FIREFOX_MOBILE: 113,
    OPERA: 67,
    EDGE_CHROMIUM: 80
};

;// ./Extension/src/common/user-agent.ts
/**
 * Copyright (c) 2015-2025 Adguard Software Ltd.
 *
 * @file
 * This file is part of AdGuard Browser Extension (https://github.com/AdguardTeam/AdguardBrowserExtension).
 *
 * AdGuard Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * AdGuard Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with AdGuard Browser Extension. If not, see <http://www.gnu.org/licenses/>.
 */ function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}



/**
 * Helper class for user agent data.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/User-Agent_Client_Hints_API#browser_compatibility
 */ class UserAgent {
    /**
     * Returns current browser name.
     *
     * @returns user agent browser name.
     */ static getBrowserName() {
        return UserAgent.isFirefoxMobile ? 'Firefox Mobile' : UserAgent.parser.getBrowser().name;
    }
    /**
     * Returns current OS name.
     *
     * @returns OS name as string if possible to detect, undefined otherwise.
     */ static getSystemName() {
        return UserAgent.parser.getOS().name;
    }
    /**
     * Returns current OS version.
     *
     * @returns OS version as string if possible to detect, undefined otherwise.
     */ static getSystemVersion() {
        return UserAgent.parser.getOS().version;
    }
    /**
     * Returns current platform version.
     * Uses NavigatorUAData.getHighEntropyValues() to get platform version.
     *
     * @returns Actual platform version as string if possible to detect, undefined otherwise.
     */ static async getPlatformVersion() {
        let platformVersion;
        try {
            // @ts-ignore
            const ua = await navigator.userAgentData.getHighEntropyValues([
                UserAgent.PLATFORM_VERSION
            ]);
            platformVersion = ua[UserAgent.PLATFORM_VERSION];
        } catch (e) {
        // do nothing
        }
        return platformVersion;
    }
    /**
     * Returns actual Windows version if it is parsed from user agent as Windows 10.
     *
     * @see {@link https://learn.microsoft.com/en-us/microsoft-edge/web-platform/how-to-detect-win11#sample-code-for-detecting-windows-11}.
     *
     * @returns Actual Windows version.
     */ static async getActualWindowsVersion(version) {
        let actualVersion = version;
        const platformVersion = await UserAgent.getPlatformVersion();
        if (typeof platformVersion !== 'undefined') {
            const rawMajorPlatformVersion = platformVersion.split('.')[0];
            const majorPlatformVersion = rawMajorPlatformVersion && parseInt(rawMajorPlatformVersion, 10);
            if (!majorPlatformVersion || Number.isNaN(majorPlatformVersion)) {
                return actualVersion;
            }
            if (majorPlatformVersion >= UserAgent.MIN_WINDOWS_11_PLATFORM_VERSION) {
                actualVersion = UserAgent.WINDOWS_11_OS_VERSION;
            }
        }
        return actualVersion;
    }
    /**
     * Returns actual MacOS version if it is possible to detect, otherwise returns passed `version`.
     *
     * @param version MacOS version parsed from user agent.
     *
     * @returns Actual MacOS version.
     */ static async getActualMacosVersion(version) {
        let actualVersion = version;
        const platformVersion = await UserAgent.getPlatformVersion();
        if (typeof platformVersion !== 'undefined') {
            actualVersion = platformVersion;
        }
        return actualVersion;
    }
    /**
     * Returns current system info — OS name and version.
     *
     * @returns System info as string if possible to detect, undefined otherwise.
     */ static async getSystemInfo() {
        let systemInfo = '';
        const osName = UserAgent.getSystemName();
        let osVersion = UserAgent.getSystemVersion();
        if (typeof osName !== 'undefined') {
            systemInfo += osName;
        }
        if (typeof osVersion !== 'undefined') {
            // windows 11 is parsed as windows 10 from user agent
            if (UserAgent.isWindows && osVersion === UserAgent.WINDOWS_10_OS_VERSION) {
                osVersion = await UserAgent.getActualWindowsVersion(osVersion);
            } else if (UserAgent.isMacOs) {
                // mac os version can be parsed from user agent as 10.15.7
                // so it also might be more specific version like 13.5.2
                osVersion = await UserAgent.getActualMacosVersion(osVersion);
            }
            systemInfo += ` ${osVersion}`;
        }
        if (systemInfo.length === 0) {
            return undefined;
        }
        return systemInfo;
    }
    /**
     * Check if the current platform is Android.
     * This method is more accurate than using UserAgent string,
     * because it uses the browser API to get the platform info.
     *
     * @returns True if the current platform is Android.
     */ static async getIsAndroid() {
        try {
            const { os } = await browser_polyfill_default().runtime.getPlatformInfo();
            return os === UserAgent.ANDROID_OS_NAME;
        } catch  {
            // If runtime.getPlatformInfo() is not supported, we fallback to the UserAgent string.
            return UserAgent.isAndroid;
        }
    }
    /**
     * Check if the current browser is as given.
     *
     * @param browserName Browser Name.
     *
     * @returns true, if current browser has specified name.
     */ static isTargetBrowser(browserName) {
        return UserAgent.parser.getBrowser().name === browserName;
    }
    /**
     * Check if current platform is as given.
     *
     * @param platformName Platform name.
     *
     * @returns true, if current browser has specified name.
     */ static isTargetPlatform(platformName) {
        return UserAgent.getSystemName() === platformName;
    }
    /**
     * Check if current engine is as given.
     *
     * @param engineName Engine name.
     *
     * @returns true, if current engine has specified name.
     */ static isTargetEngine(engineName) {
        return UserAgent.parser.getEngine().name === engineName;
    }
    static isTargetDeviceType(deviceType) {
        return UserAgent.parser.getDevice().type === deviceType;
    }
    /**
     * Returns a major browser version.
     *
     * @returns browser version number or undefined.
     */ static getVersion() {
        var _browser_version;
        const browser = this.parser.getBrowser();
        const versionNumber = Number((_browser_version = browser.version) === null || _browser_version === void 0 ? void 0 : _browser_version.split('.')[0]);
        return Number.isNaN(versionNumber) ? undefined : versionNumber;
    }
}
_define_property(UserAgent, "WINDOWS_10_OS_VERSION", '10');
_define_property(UserAgent, "WINDOWS_11_OS_VERSION", '11');
_define_property(UserAgent, "PLATFORM_VERSION", 'platformVersion');
_define_property(UserAgent, "MIN_WINDOWS_11_PLATFORM_VERSION", 13);
_define_property(UserAgent, "ANDROID_OS_NAME", 'android');
_define_property(UserAgent, "parser", new (ua_parser_default())(navigator.userAgent));
_define_property(UserAgent, "version", UserAgent.getVersion());
_define_property(UserAgent, "isChrome", UserAgent.isTargetBrowser('Chrome'));
_define_property(UserAgent, "isFirefox", UserAgent.isTargetBrowser('Firefox'));
_define_property(UserAgent, "isOpera", UserAgent.isTargetBrowser('Opera'));
_define_property(UserAgent, "isYandex", UserAgent.isTargetBrowser('Yandex'));
_define_property(UserAgent, "isEdge", UserAgent.isTargetBrowser('Edge'));
_define_property(UserAgent, "isEdgeChromium", UserAgent.isEdge && !!(UserAgent.version && UserAgent.version >= 79));
_define_property(UserAgent, "isMacOs", UserAgent.isTargetPlatform('Mac OS'));
_define_property(UserAgent, "isWindows", UserAgent.isTargetPlatform('Windows'));
_define_property(UserAgent, "isAndroid", UserAgent.isTargetPlatform('Android'));
_define_property(UserAgent, "isChromium", UserAgent.isTargetEngine('Blink'));
_define_property(UserAgent, "isMobileDevice", UserAgent.isTargetDeviceType('mobile'));
_define_property(UserAgent, "isFirefoxMobile", UserAgent.isFirefox && UserAgent.isMobileDevice);
_define_property(UserAgent, "isOculus", UserAgent.isTargetBrowser('Oculus Browser'));
_define_property(UserAgent, "isSupportedBrowser", UserAgent.isChrome && Number(UserAgent.version) >= MIN_SUPPORTED_VERSION.CHROMIUM_MV2 || UserAgent.isEdgeChromium && Number(UserAgent.version) >= MIN_SUPPORTED_VERSION.EDGE_CHROMIUM || UserAgent.isFirefox && Number(UserAgent.version) >= MIN_SUPPORTED_VERSION.FIREFOX || UserAgent.isFirefoxMobile && Number(UserAgent.version) >= MIN_SUPPORTED_VERSION.FIREFOX_MOBILE || UserAgent.isOpera && Number(UserAgent.version) >= MIN_SUPPORTED_VERSION.OPERA);
_define_property(UserAgent, "browserName", UserAgent.getBrowserName());

// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.40.0/node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__(90767);
;// ./node_modules/.pnpm/nanoid@3.3.6/node_modules/nanoid/index.browser.js

let random = bytes => crypto.getRandomValues(new Uint8Array(bytes))
let customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1
  let step = -~((1.6 * mask * defaultSize) / alphabet.length)
  return (size = defaultSize) => {
    let id = ''
    while (true) {
      let bytes = getRandom(step)
      let j = step
      while (j--) {
        id += alphabet[bytes[j] & mask] || ''
        if (id.length === size) return id
      }
    }
  }
}
let customAlphabet = (alphabet, size = 21) =>
  customRandom(alphabet, size, random)
let nanoid = (size = 21) =>
  crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
    byte &= 63
    if (byte < 36) {
      id += byte.toString(36)
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase()
    } else if (byte > 62) {
      id += '-'
    } else {
      id += '_'
    }
    return id
  }, '')


// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.40.0/node_modules/core-js/modules/web.self.js
var web_self = __webpack_require__(91219);
;// ./node_modules/.pnpm/@adguard+logger@2.0.0/node_modules/@adguard/logger/dist/es/index.mjs
/**
 * Checks if error has message.
 *
 * @param error Error object.
 *
 * @returns True if error has message.
 */
function isErrorWithMessage(error) {
    return (typeof error === 'object'
        && error !== null
        && 'message' in error
        && typeof error.message === 'string');
}
/**
 * Converts error to the error with a message.
 *
 * @param maybeError Possible error.
 *
 * @returns Error with a message.
 */
function toErrorWithMessage(maybeError) {
    if (isErrorWithMessage(maybeError)) {
        return maybeError;
    }
    try {
        return new Error(JSON.stringify(maybeError));
    }
    catch {
        // fallback in case there's an error stringifying the maybeError
        // like with circular references, for example.
        return new Error(String(maybeError));
    }
}
/**
 * Converts an error object to an error with a message. This method might be helpful to handle thrown errors.
 *
 * @param error Error object.
 *
 * @returns Message of the error.
 */
function getErrorMessage(error) {
    return toErrorWithMessage(error).message;
}

/**
 * Pads a number with leading zeros.
 *
 * @param num The number to pad.
 * @param size The number of digits to pad to.
 *
 * @returns The padded number.
 */
const pad = (num, size = 2) => {
    return num.toString().padStart(size, '0');
};
/**
 * Formats a date into an ISO 8601-like string with milliseconds.
 *
 * @param {Date|number} date The date object or timestamp to format.
 *
 * @returns {string} The formatted date string.
 */
const formatTime = (date) => {
    const d = (date instanceof Date) ? date : new Date(date);
    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1); // Months are 0-based
    const day = pad(d.getDate());
    const hour = pad(d.getHours());
    const minute = pad(d.getMinutes());
    const second = pad(d.getSeconds());
    const millisecond = pad(d.getMilliseconds(), 3); // Milliseconds are 3 digits
    return `${year}-${month}-${day}T${hour}:${minute}:${second}:${millisecond}`;
};

/**
 * String presentation of log levels, for convenient users usage.
 * Ordered in the same way as LogLevelNumeric.
 *
 * First three levels will be shown to users, and the last two are for developers.
 */
var LogLevel;
(function (LogLevel) {
    /**
     * For errors.
     */
    LogLevel["Error"] = "error";
    /**
     * For not critical errors.
     */
    LogLevel["Warn"] = "warn";
    /**
     * For important information.
     * Use for general operational messages.
     */
    LogLevel["Info"] = "info";
    /**
     * For debugging purposes, e.g. Inside conditions, loops or some edge cases.
     */
    LogLevel["Debug"] = "debug";
    /**
     * For ultra-detailed, step-by-step traces (like stack traces or flow tracking).
     */
    LogLevel["Verbose"] = "verbose";
})(LogLevel || (LogLevel = {}));
/**
 * Log levels map, which maps number level to string level.
 * Ordered in the same way as LogLevelNumeric.
 */
const levelMapNumToString = {
    [1 /* LogLevelNumeric.Error */]: LogLevel.Error,
    [2 /* LogLevelNumeric.Warn */]: LogLevel.Warn,
    [3 /* LogLevelNumeric.Info */]: LogLevel.Info,
    [4 /* LogLevelNumeric.Debug */]: LogLevel.Debug,
    [5 /* LogLevelNumeric.Verbose */]: LogLevel.Verbose,
};
/**
 * Log levels map, which maps string level to number level.
 */
const levelMapStringToNum = Object.entries(levelMapNumToString)
    .reduce((acc, [key, value]) => {
    // Here, key is originally a string since Object.entries() returns [string, string][].
    // We need to cast the key to LogLevelNumeric correctly without causing type mismatches.
    const numericKey = Number(key);
    if (!Number.isNaN(numericKey)) {
        acc[value] = numericKey;
    }
    return acc;
}, {});
/**
 * Methods supported by console. Used to manage levels.
 * Ordered in the same way as LogLevelNumeric.
 */
var LogMethod;
(function (LogMethod) {
    LogMethod["Error"] = "error";
    LogMethod["Warn"] = "warn";
    LogMethod["Info"] = "info";
    LogMethod["Debug"] = "debug";
    LogMethod["Trace"] = "trace";
})(LogMethod || (LogMethod = {}));
/**
 * Simple logger with log levels.
 */
class Logger {
    currentLevelValue = 3 /* LogLevelNumeric.Info */;
    writer;
    /**
     * Constructor.
     *
     * @param writer Writer object.
     */
    constructor(writer = console) {
        this.writer = writer;
        // bind the logging methods to avoid losing context
        this.error = this.error.bind(this);
        this.warn = this.warn.bind(this);
        this.info = this.info.bind(this);
        this.debug = this.debug.bind(this);
        this.trace = this.trace.bind(this);
    }
    /**
     * Print error messages.
     * Use when something went wrong.
     *
     * @param args Printed arguments.
     */
    error(...args) {
        this.print(1 /* LogLevelNumeric.Error */, LogMethod.Error, args);
    }
    /**
     * Print warn messages.
     * Use when Something might go wrong.
     *
     * @param args Printed arguments.
     */
    warn(...args) {
        this.print(2 /* LogLevelNumeric.Warn */, LogMethod.Warn, args);
    }
    /**
     * Print messages you want to disclose to users.
     * Use for general operational messages.
     *
     * @param args Printed arguments.
     */
    info(...args) {
        this.print(3 /* LogLevelNumeric.Info */, LogMethod.Info, args);
    }
    /**
     * Print debug messages. Usually used for technical information.
     *
     * @param args Printed arguments.
     */
    debug(...args) {
        this.print(4 /* LogLevelNumeric.Debug */, LogMethod.Debug, args);
    }
    /**
     * Print trace messages.
     * Ultra-detailed, step-by-step traces (like stack traces or flow tracking).
     *
     * @param args Printed arguments.
     */
    trace(...args) {
        this.print(5 /* LogLevelNumeric.Verbose */, LogMethod.Trace, args);
    }
    /**
     * Getter for log level.
     *
     * @returns Logger level.
     */
    get currentLevel() {
        return levelMapNumToString[this.currentLevelValue];
    }
    /**
     * Setter for log level. With this method log level can be updated dynamically.
     *
     * @param logLevel Logger level.
     *
     * @throws Error if log level is not supported.
     */
    set currentLevel(logLevel) {
        const level = levelMapStringToNum[logLevel];
        if (level === undefined) {
            throw new Error(`Logger supports only the following levels: ${[Object.values(LogLevel).join(', ')]}`);
        }
        this.currentLevelValue = level;
    }
    /**
     * Converts error to string, and adds stack trace.
     *
     * @param error Error to print.
     *
     * @returns Error message.
     */
    static errorToString(error) {
        const message = getErrorMessage(error);
        return `${message}\nStack trace:\n${error.stack}`;
    }
    /**
     * Prints error message with stack trace.
     * It prints the message with the stack trace in a collapsed group.
     * This is useful for debugging purposes, as it allows to see the stack trace
     * without cluttering the console with too many messages.
     *
     * @param formattedTime Formatted time.
     * @param formattedArgs Formatted arguments.
     */
    printWithStackTrace(formattedTime, formattedArgs) {
        // If grouping is not supported, print just expanded trace, but this
        // leads to a lot of dirty logs in the console, since the stack trace
        // will be printed for every message.
        if (!this.writer.groupCollapsed || !this.writer.groupEnd) {
            // Print expanded trace
            this.writer.trace(formattedTime, ...formattedArgs);
            return;
        }
        // Print collapsed trace to make logs more readable and access to stack
        // trace by clicking on the group.
        this.writer.groupCollapsed(formattedTime, ...formattedArgs);
        this.writer.trace();
        this.writer.groupEnd();
    }
    /**
     * Wrapper over log methods.
     *
     * @param level Logger level.
     * @param method Logger method.
     * @param args Printed arguments.
     */
    print(level, method, args) {
        // Skip writing if the basic conditions are not met.
        if (this.currentLevelValue < level) {
            return;
        }
        // Do not print if no arguments are passed.
        if (!args || args.length === 0 || !args[0]) {
            return;
        }
        const formattedArgs = args.map((value) => {
            if (value instanceof Error) {
                return Logger.errorToString(value);
            }
            if (value && typeof value.message === 'string') {
                return value.message;
            }
            if (typeof value === 'object' && value !== null) {
                return JSON.stringify(value);
            }
            return String(value);
        });
        const formattedTime = `${formatTime(new Date())}:`;
        /**
         * If current log level is Debug or Verbose, print all channels with stack
         * trace via using writer.trace method to help identify the location of the
         * log.
         *
         * Exception is Error method, because it is already contains build-in
         * stack trace.
         */
        if (this.currentLevelValue >= levelMapStringToNum[LogLevel.Debug]
            && method !== LogMethod.Error) {
            this.printWithStackTrace(formattedTime, formattedArgs);
            return;
        }
        // Otherwise just print with requested method of writer.
        this.writer[method](formattedTime, ...formattedArgs);
    }
}



;// ./Extension/src/background/storages/browser-storage.ts
/**
 * Copyright (c) 2015-2025 Adguard Software Ltd.
 *
 * @file
 * This file is part of AdGuard Browser Extension (https://github.com/AdguardTeam/AdguardBrowserExtension).
 *
 * AdGuard Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * AdGuard Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with AdGuard Browser Extension. If not, see <http://www.gnu.org/licenses/>.
 */ function browser_storage_define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
/**
 * Wrapper for StorageArea with dev-friendly interface.
 *
 * @template Data The type of the value stored in the storage.
 */ class BrowserStorage {
    /**
     * Sets data to storage.
     *
     * @param key Storage key.
     * @param value Storage value.
     */ async set(key, value) {
        await this.storage.set({
            [key]: value
        });
    }
    /**
     * Returns data from storage.
     *
     * @param key Storage key.
     *
     * @returns Storage value.
     */ async get(key) {
        return this.storage.get(key).then((data)=>data[key]);
    }
    /**
     * Removes data from storage.
     *
     * @param key Storage key.
     */ async remove(key) {
        await this.storage.remove(key);
    }
    /**
     * Sets multiple key-value pairs in the storage.
     *
     * @param data The key-value pairs to set.
     *
     * @returns True if all operations were successful, false otherwise.
     *
     * @example
     * ```ts
     * const storage = new Storage();
     * await storage.setMultiple({
     *    key1: 'value1',
     *    key2: 'value2',
     * });
     * ```
     */ // TODO: Implement some kind of transaction to ensure atomicity, if possible
    // Note: We only use this method for Firefox if "Never Remember History" is enabled
    async setMultiple(data) {
        try {
            await this.storage.set(data);
            return true;
        } catch (e) {
            return false;
        }
    }
    /**
     * Removes multiple key-value pairs from the storage.
     *
     * @param keys The keys to remove.
     *
     * @returns True if all operations were successful, false otherwise.
     */ async removeMultiple(keys) {
        await this.storage.remove(keys);
        return true;
    }
    /**
     * Get the entire contents of the storage.
     *
     * @returns Promise that resolves with the entire contents of the storage.
     */ async entries() {
        return this.storage.get(null);
    }
    /**
     * Get all keys from the storage.
     *
     * @returns Promise that resolves with all keys from the storage.
     */ async keys() {
        return Object.keys(await this.entries());
    }
    /**
     * Checks if the storage has a key.
     *
     * @param key The key to check.
     *
     * @returns True if the key exists, false otherwise.
     */ async has(key) {
        return this.storage.get(key).then((data)=>key in data);
    }
    /**
     * Clears the storage.
     */ async clear() {
        await this.storage.clear();
    }
    /**
     * Constructs an instance of the BrowserStorage class.
     *
     * @param storage The storage area to use.
     */ constructor(storage){
        browser_storage_define_property(this, "storage", void 0);
        this.storage = storage;
    }
}

// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.40.0/node_modules/core-js/modules/es.array.reduce.js
var es_array_reduce = __webpack_require__(51472);
;// ./node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/double-indexed-kv.js
class DoubleIndexedKV {
    constructor() {
        this.keyToValue = new Map();
        this.valueToKey = new Map();
    }
    set(key, value) {
        this.keyToValue.set(key, value);
        this.valueToKey.set(value, key);
    }
    getByKey(key) {
        return this.keyToValue.get(key);
    }
    getByValue(value) {
        return this.valueToKey.get(value);
    }
    clear() {
        this.keyToValue.clear();
        this.valueToKey.clear();
    }
}

;// ./node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/registry.js

class Registry {
    constructor(generateIdentifier) {
        this.generateIdentifier = generateIdentifier;
        this.kv = new DoubleIndexedKV();
    }
    register(value, identifier) {
        if (this.kv.getByValue(value)) {
            return;
        }
        if (!identifier) {
            identifier = this.generateIdentifier(value);
        }
        this.kv.set(identifier, value);
    }
    clear() {
        this.kv.clear();
    }
    getIdentifier(value) {
        return this.kv.getByValue(value);
    }
    getValue(identifier) {
        return this.kv.getByKey(identifier);
    }
}

;// ./node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/class-registry.js

class ClassRegistry extends Registry {
    constructor() {
        super(c => c.name);
        this.classToAllowedProps = new Map();
    }
    register(value, options) {
        if (typeof options === 'object') {
            if (options.allowProps) {
                this.classToAllowedProps.set(value, options.allowProps);
            }
            super.register(value, options.identifier);
        }
        else {
            super.register(value, options);
        }
    }
    getAllowedProps(value) {
        return this.classToAllowedProps.get(value);
    }
}

;// ./node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/util.js
function valuesOfObj(record) {
    if ('values' in Object) {
        // eslint-disable-next-line es5/no-es6-methods
        return Object.values(record);
    }
    const values = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const key in record) {
        if (record.hasOwnProperty(key)) {
            values.push(record[key]);
        }
    }
    return values;
}
function find(record, predicate) {
    const values = valuesOfObj(record);
    if ('find' in values) {
        // eslint-disable-next-line es5/no-es6-methods
        return values.find(predicate);
    }
    const valuesNotNever = values;
    for (let i = 0; i < valuesNotNever.length; i++) {
        const value = valuesNotNever[i];
        if (predicate(value)) {
            return value;
        }
    }
    return undefined;
}
function forEach(record, run) {
    Object.entries(record).forEach(([key, value]) => run(value, key));
}
function includes(arr, value) {
    return arr.indexOf(value) !== -1;
}
function findArr(record, predicate) {
    for (let i = 0; i < record.length; i++) {
        const value = record[i];
        if (predicate(value)) {
            return value;
        }
    }
    return undefined;
}

;// ./node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/custom-transformer-registry.js

class CustomTransformerRegistry {
    constructor() {
        this.transfomers = {};
    }
    register(transformer) {
        this.transfomers[transformer.name] = transformer;
    }
    findApplicable(v) {
        return find(this.transfomers, transformer => transformer.isApplicable(v));
    }
    findByName(name) {
        return this.transfomers[name];
    }
}

;// ./node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/is.js
const getType = (payload) => Object.prototype.toString.call(payload).slice(8, -1);
const isUndefined = (payload) => typeof payload === 'undefined';
const isNull = (payload) => payload === null;
const isPlainObject = (payload) => {
    if (typeof payload !== 'object' || payload === null)
        return false;
    if (payload === Object.prototype)
        return false;
    if (Object.getPrototypeOf(payload) === null)
        return true;
    return Object.getPrototypeOf(payload) === Object.prototype;
};
const isEmptyObject = (payload) => isPlainObject(payload) && Object.keys(payload).length === 0;
const isArray = (payload) => Array.isArray(payload);
const isString = (payload) => typeof payload === 'string';
const isNumber = (payload) => typeof payload === 'number' && !isNaN(payload);
const isBoolean = (payload) => typeof payload === 'boolean';
const isRegExp = (payload) => payload instanceof RegExp;
const isMap = (payload) => payload instanceof Map;
const isSet = (payload) => payload instanceof Set;
const isSymbol = (payload) => getType(payload) === 'Symbol';
const isDate = (payload) => payload instanceof Date && !isNaN(payload.valueOf());
const isError = (payload) => payload instanceof Error;
const isNaNValue = (payload) => typeof payload === 'number' && isNaN(payload);
const isPrimitive = (payload) => isBoolean(payload) ||
    isNull(payload) ||
    isUndefined(payload) ||
    isNumber(payload) ||
    isString(payload) ||
    isSymbol(payload);
const isBigint = (payload) => typeof payload === 'bigint';
const isInfinite = (payload) => payload === Infinity || payload === -Infinity;
const isTypedArray = (payload) => ArrayBuffer.isView(payload) && !(payload instanceof DataView);
const isURL = (payload) => payload instanceof URL;

;// ./node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/pathstringifier.js
const escapeKey = (key) => key.replace(/\./g, '\\.');
const stringifyPath = (path) => path
    .map(String)
    .map(escapeKey)
    .join('.');
const parsePath = (string) => {
    const result = [];
    let segment = '';
    for (let i = 0; i < string.length; i++) {
        let char = string.charAt(i);
        const isEscapedDot = char === '\\' && string.charAt(i + 1) === '.';
        if (isEscapedDot) {
            segment += '.';
            i++;
            continue;
        }
        const isEndOfSegment = char === '.';
        if (isEndOfSegment) {
            result.push(segment);
            segment = '';
            continue;
        }
        segment += char;
    }
    const lastSegment = segment;
    result.push(lastSegment);
    return result;
};

;// ./node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/transformer.js


function simpleTransformation(isApplicable, annotation, transform, untransform) {
    return {
        isApplicable,
        annotation,
        transform,
        untransform,
    };
}
const simpleRules = [
    simpleTransformation(isUndefined, 'undefined', () => null, () => undefined),
    simpleTransformation(isBigint, 'bigint', v => v.toString(), v => {
        if (typeof BigInt !== 'undefined') {
            return BigInt(v);
        }
        console.error('Please add a BigInt polyfill.');
        return v;
    }),
    simpleTransformation(isDate, 'Date', v => v.toISOString(), v => new Date(v)),
    simpleTransformation(isError, 'Error', (v, superJson) => {
        const baseError = {
            name: v.name,
            message: v.message,
        };
        superJson.allowedErrorProps.forEach(prop => {
            baseError[prop] = v[prop];
        });
        return baseError;
    }, (v, superJson) => {
        const e = new Error(v.message);
        e.name = v.name;
        e.stack = v.stack;
        superJson.allowedErrorProps.forEach(prop => {
            e[prop] = v[prop];
        });
        return e;
    }),
    simpleTransformation(isRegExp, 'regexp', v => '' + v, regex => {
        const body = regex.slice(1, regex.lastIndexOf('/'));
        const flags = regex.slice(regex.lastIndexOf('/') + 1);
        return new RegExp(body, flags);
    }),
    simpleTransformation(isSet, 'set', 
    // (sets only exist in es6+)
    // eslint-disable-next-line es5/no-es6-methods
    v => [...v.values()], v => new Set(v)),
    simpleTransformation(isMap, 'map', v => [...v.entries()], v => new Map(v)),
    simpleTransformation((v) => isNaNValue(v) || isInfinite(v), 'number', v => {
        if (isNaNValue(v)) {
            return 'NaN';
        }
        if (v > 0) {
            return 'Infinity';
        }
        else {
            return '-Infinity';
        }
    }, Number),
    simpleTransformation((v) => v === 0 && 1 / v === -Infinity, 'number', () => {
        return '-0';
    }, Number),
    simpleTransformation(isURL, 'URL', v => v.toString(), v => new URL(v)),
];
function compositeTransformation(isApplicable, annotation, transform, untransform) {
    return {
        isApplicable,
        annotation,
        transform,
        untransform,
    };
}
const symbolRule = compositeTransformation((s, superJson) => {
    if (isSymbol(s)) {
        const isRegistered = !!superJson.symbolRegistry.getIdentifier(s);
        return isRegistered;
    }
    return false;
}, (s, superJson) => {
    const identifier = superJson.symbolRegistry.getIdentifier(s);
    return ['symbol', identifier];
}, v => v.description, (_, a, superJson) => {
    const value = superJson.symbolRegistry.getValue(a[1]);
    if (!value) {
        throw new Error('Trying to deserialize unknown symbol');
    }
    return value;
});
const constructorToName = [
    Int8Array,
    Uint8Array,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
    Uint8ClampedArray,
].reduce((obj, ctor) => {
    obj[ctor.name] = ctor;
    return obj;
}, {});
const typedArrayRule = compositeTransformation(isTypedArray, v => ['typed-array', v.constructor.name], v => [...v], (v, a) => {
    const ctor = constructorToName[a[1]];
    if (!ctor) {
        throw new Error('Trying to deserialize unknown typed array');
    }
    return new ctor(v);
});
function isInstanceOfRegisteredClass(potentialClass, superJson) {
    if (potentialClass?.constructor) {
        const isRegistered = !!superJson.classRegistry.getIdentifier(potentialClass.constructor);
        return isRegistered;
    }
    return false;
}
const classRule = compositeTransformation(isInstanceOfRegisteredClass, (clazz, superJson) => {
    const identifier = superJson.classRegistry.getIdentifier(clazz.constructor);
    return ['class', identifier];
}, (clazz, superJson) => {
    const allowedProps = superJson.classRegistry.getAllowedProps(clazz.constructor);
    if (!allowedProps) {
        return { ...clazz };
    }
    const result = {};
    allowedProps.forEach(prop => {
        result[prop] = clazz[prop];
    });
    return result;
}, (v, a, superJson) => {
    const clazz = superJson.classRegistry.getValue(a[1]);
    if (!clazz) {
        throw new Error('Trying to deserialize unknown class - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564');
    }
    return Object.assign(Object.create(clazz.prototype), v);
});
const customRule = compositeTransformation((value, superJson) => {
    return !!superJson.customTransformerRegistry.findApplicable(value);
}, (value, superJson) => {
    const transformer = superJson.customTransformerRegistry.findApplicable(value);
    return ['custom', transformer.name];
}, (value, superJson) => {
    const transformer = superJson.customTransformerRegistry.findApplicable(value);
    return transformer.serialize(value);
}, (v, a, superJson) => {
    const transformer = superJson.customTransformerRegistry.findByName(a[1]);
    if (!transformer) {
        throw new Error('Trying to deserialize unknown custom value');
    }
    return transformer.deserialize(v);
});
const compositeRules = [classRule, symbolRule, customRule, typedArrayRule];
const transformValue = (value, superJson) => {
    const applicableCompositeRule = findArr(compositeRules, rule => rule.isApplicable(value, superJson));
    if (applicableCompositeRule) {
        return {
            value: applicableCompositeRule.transform(value, superJson),
            type: applicableCompositeRule.annotation(value, superJson),
        };
    }
    const applicableSimpleRule = findArr(simpleRules, rule => rule.isApplicable(value, superJson));
    if (applicableSimpleRule) {
        return {
            value: applicableSimpleRule.transform(value, superJson),
            type: applicableSimpleRule.annotation,
        };
    }
    return undefined;
};
const simpleRulesByAnnotation = {};
simpleRules.forEach(rule => {
    simpleRulesByAnnotation[rule.annotation] = rule;
});
const untransformValue = (json, type, superJson) => {
    if (isArray(type)) {
        switch (type[0]) {
            case 'symbol':
                return symbolRule.untransform(json, type, superJson);
            case 'class':
                return classRule.untransform(json, type, superJson);
            case 'custom':
                return customRule.untransform(json, type, superJson);
            case 'typed-array':
                return typedArrayRule.untransform(json, type, superJson);
            default:
                throw new Error('Unknown transformation: ' + type);
        }
    }
    else {
        const transformation = simpleRulesByAnnotation[type];
        if (!transformation) {
            throw new Error('Unknown transformation: ' + type);
        }
        return transformation.untransform(json, superJson);
    }
};

;// ./node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/accessDeep.js


const getNthKey = (value, n) => {
    const keys = value.keys();
    while (n > 0) {
        keys.next();
        n--;
    }
    return keys.next().value;
};
function validatePath(path) {
    if (includes(path, '__proto__')) {
        throw new Error('__proto__ is not allowed as a property');
    }
    if (includes(path, 'prototype')) {
        throw new Error('prototype is not allowed as a property');
    }
    if (includes(path, 'constructor')) {
        throw new Error('constructor is not allowed as a property');
    }
}
const getDeep = (object, path) => {
    validatePath(path);
    for (let i = 0; i < path.length; i++) {
        const key = path[i];
        if (isSet(object)) {
            object = getNthKey(object, +key);
        }
        else if (isMap(object)) {
            const row = +key;
            const type = +path[++i] === 0 ? 'key' : 'value';
            const keyOfRow = getNthKey(object, row);
            switch (type) {
                case 'key':
                    object = keyOfRow;
                    break;
                case 'value':
                    object = object.get(keyOfRow);
                    break;
            }
        }
        else {
            object = object[key];
        }
    }
    return object;
};
const setDeep = (object, path, mapper) => {
    validatePath(path);
    if (path.length === 0) {
        return mapper(object);
    }
    let parent = object;
    for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (isArray(parent)) {
            const index = +key;
            parent = parent[index];
        }
        else if (isPlainObject(parent)) {
            parent = parent[key];
        }
        else if (isSet(parent)) {
            const row = +key;
            parent = getNthKey(parent, row);
        }
        else if (isMap(parent)) {
            const isEnd = i === path.length - 2;
            if (isEnd) {
                break;
            }
            const row = +key;
            const type = +path[++i] === 0 ? 'key' : 'value';
            const keyOfRow = getNthKey(parent, row);
            switch (type) {
                case 'key':
                    parent = keyOfRow;
                    break;
                case 'value':
                    parent = parent.get(keyOfRow);
                    break;
            }
        }
    }
    const lastKey = path[path.length - 1];
    if (isArray(parent)) {
        parent[+lastKey] = mapper(parent[+lastKey]);
    }
    else if (isPlainObject(parent)) {
        parent[lastKey] = mapper(parent[lastKey]);
    }
    if (isSet(parent)) {
        const oldValue = getNthKey(parent, +lastKey);
        const newValue = mapper(oldValue);
        if (oldValue !== newValue) {
            parent.delete(oldValue);
            parent.add(newValue);
        }
    }
    if (isMap(parent)) {
        const row = +path[path.length - 2];
        const keyToRow = getNthKey(parent, row);
        const type = +lastKey === 0 ? 'key' : 'value';
        switch (type) {
            case 'key': {
                const newKey = mapper(keyToRow);
                parent.set(newKey, parent.get(keyToRow));
                if (newKey !== keyToRow) {
                    parent.delete(keyToRow);
                }
                break;
            }
            case 'value': {
                parent.set(keyToRow, mapper(parent.get(keyToRow)));
                break;
            }
        }
    }
    return object;
};

;// ./node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/plainer.js






function traverse(tree, walker, origin = []) {
    if (!tree) {
        return;
    }
    if (!isArray(tree)) {
        forEach(tree, (subtree, key) => traverse(subtree, walker, [...origin, ...parsePath(key)]));
        return;
    }
    const [nodeValue, children] = tree;
    if (children) {
        forEach(children, (child, key) => {
            traverse(child, walker, [...origin, ...parsePath(key)]);
        });
    }
    walker(nodeValue, origin);
}
function applyValueAnnotations(plain, annotations, superJson) {
    traverse(annotations, (type, path) => {
        plain = setDeep(plain, path, v => untransformValue(v, type, superJson));
    });
    return plain;
}
function applyReferentialEqualityAnnotations(plain, annotations) {
    function apply(identicalPaths, path) {
        const object = getDeep(plain, parsePath(path));
        identicalPaths.map(parsePath).forEach(identicalObjectPath => {
            plain = setDeep(plain, identicalObjectPath, () => object);
        });
    }
    if (isArray(annotations)) {
        const [root, other] = annotations;
        root.forEach(identicalPath => {
            plain = setDeep(plain, parsePath(identicalPath), () => plain);
        });
        if (other) {
            forEach(other, apply);
        }
    }
    else {
        forEach(annotations, apply);
    }
    return plain;
}
const isDeep = (object, superJson) => isPlainObject(object) ||
    isArray(object) ||
    isMap(object) ||
    isSet(object) ||
    isInstanceOfRegisteredClass(object, superJson);
function addIdentity(object, path, identities) {
    const existingSet = identities.get(object);
    if (existingSet) {
        existingSet.push(path);
    }
    else {
        identities.set(object, [path]);
    }
}
function generateReferentialEqualityAnnotations(identitites, dedupe) {
    const result = {};
    let rootEqualityPaths = undefined;
    identitites.forEach(paths => {
        if (paths.length <= 1) {
            return;
        }
        // if we're not deduping, all of these objects continue existing.
        // putting the shortest path first makes it easier to parse for humans
        // if we're deduping though, only the first entry will still exist, so we can't do this optimisation.
        if (!dedupe) {
            paths = paths
                .map(path => path.map(String))
                .sort((a, b) => a.length - b.length);
        }
        const [representativePath, ...identicalPaths] = paths;
        if (representativePath.length === 0) {
            rootEqualityPaths = identicalPaths.map(stringifyPath);
        }
        else {
            result[stringifyPath(representativePath)] = identicalPaths.map(stringifyPath);
        }
    });
    if (rootEqualityPaths) {
        if (isEmptyObject(result)) {
            return [rootEqualityPaths];
        }
        else {
            return [rootEqualityPaths, result];
        }
    }
    else {
        return isEmptyObject(result) ? undefined : result;
    }
}
const walker = (object, identities, superJson, dedupe, path = [], objectsInThisPath = [], seenObjects = new Map()) => {
    const primitive = isPrimitive(object);
    if (!primitive) {
        addIdentity(object, path, identities);
        const seen = seenObjects.get(object);
        if (seen) {
            // short-circuit result if we've seen this object before
            return dedupe
                ? {
                    transformedValue: null,
                }
                : seen;
        }
    }
    if (!isDeep(object, superJson)) {
        const transformed = transformValue(object, superJson);
        const result = transformed
            ? {
                transformedValue: transformed.value,
                annotations: [transformed.type],
            }
            : {
                transformedValue: object,
            };
        if (!primitive) {
            seenObjects.set(object, result);
        }
        return result;
    }
    if (includes(objectsInThisPath, object)) {
        // prevent circular references
        return {
            transformedValue: null,
        };
    }
    const transformationResult = transformValue(object, superJson);
    const transformed = transformationResult?.value ?? object;
    const transformedValue = isArray(transformed) ? [] : {};
    const innerAnnotations = {};
    forEach(transformed, (value, index) => {
        if (index === '__proto__' ||
            index === 'constructor' ||
            index === 'prototype') {
            throw new Error(`Detected property ${index}. This is a prototype pollution risk, please remove it from your object.`);
        }
        const recursiveResult = walker(value, identities, superJson, dedupe, [...path, index], [...objectsInThisPath, object], seenObjects);
        transformedValue[index] = recursiveResult.transformedValue;
        if (isArray(recursiveResult.annotations)) {
            innerAnnotations[index] = recursiveResult.annotations;
        }
        else if (isPlainObject(recursiveResult.annotations)) {
            forEach(recursiveResult.annotations, (tree, key) => {
                innerAnnotations[escapeKey(index) + '.' + key] = tree;
            });
        }
    });
    const result = isEmptyObject(innerAnnotations)
        ? {
            transformedValue,
            annotations: !!transformationResult
                ? [transformationResult.type]
                : undefined,
        }
        : {
            transformedValue,
            annotations: !!transformationResult
                ? [transformationResult.type, innerAnnotations]
                : innerAnnotations,
        };
    if (!primitive) {
        seenObjects.set(object, result);
    }
    return result;
};

;// ./node_modules/.pnpm/is-what@4.1.16/node_modules/is-what/dist/index.js
function dist_getType(payload) {
  return Object.prototype.toString.call(payload).slice(8, -1);
}

function isAnyObject(payload) {
  return dist_getType(payload) === "Object";
}

function dist_isArray(payload) {
  return dist_getType(payload) === "Array";
}

function isBlob(payload) {
  return dist_getType(payload) === "Blob";
}

function dist_isBoolean(payload) {
  return dist_getType(payload) === "Boolean";
}

function dist_isDate(payload) {
  return dist_getType(payload) === "Date" && !isNaN(payload);
}

function isEmptyArray(payload) {
  return dist_isArray(payload) && payload.length === 0;
}

function dist_isPlainObject(payload) {
  if (dist_getType(payload) !== "Object")
    return false;
  const prototype = Object.getPrototypeOf(payload);
  return !!prototype && prototype.constructor === Object && prototype === Object.prototype;
}

function dist_isEmptyObject(payload) {
  return dist_isPlainObject(payload) && Object.keys(payload).length === 0;
}

function isEmptyString(payload) {
  return payload === "";
}

function dist_isError(payload) {
  return dist_getType(payload) === "Error" || payload instanceof Error;
}

function isFile(payload) {
  return dist_getType(payload) === "File";
}

function isFullArray(payload) {
  return dist_isArray(payload) && payload.length > 0;
}

function isFullObject(payload) {
  return dist_isPlainObject(payload) && Object.keys(payload).length > 0;
}

function dist_isString(payload) {
  return dist_getType(payload) === "String";
}

function isFullString(payload) {
  return dist_isString(payload) && payload !== "";
}

function isFunction(payload) {
  return typeof payload === "function";
}

function isType(payload, type) {
  if (!(type instanceof Function)) {
    throw new TypeError("Type must be a function");
  }
  if (!Object.prototype.hasOwnProperty.call(type, "prototype")) {
    throw new TypeError("Type is not a class");
  }
  const name = type.name;
  return dist_getType(payload) === name || Boolean(payload && payload.constructor === type);
}

function isInstanceOf(value, classOrClassName) {
  if (typeof classOrClassName === "function") {
    for (let p = value; p; p = Object.getPrototypeOf(p)) {
      if (isType(p, classOrClassName)) {
        return true;
      }
    }
    return false;
  } else {
    for (let p = value; p; p = Object.getPrototypeOf(p)) {
      if (dist_getType(p) === classOrClassName) {
        return true;
      }
    }
    return false;
  }
}

function dist_isMap(payload) {
  return dist_getType(payload) === "Map";
}

function dist_isNaNValue(payload) {
  return dist_getType(payload) === "Number" && isNaN(payload);
}

function dist_isNumber(payload) {
  return dist_getType(payload) === "Number" && !isNaN(payload);
}

function isNegativeNumber(payload) {
  return dist_isNumber(payload) && payload < 0;
}

function dist_isNull(payload) {
  return dist_getType(payload) === "Null";
}

function isOneOf(a, b, c, d, e) {
  return (value) => a(value) || b(value) || !!c && c(value) || !!d && d(value) || !!e && e(value);
}

function dist_isUndefined(payload) {
  return dist_getType(payload) === "Undefined";
}

const isNullOrUndefined = isOneOf(dist_isNull, dist_isUndefined);

function isObject(payload) {
  return dist_isPlainObject(payload);
}

function isObjectLike(payload) {
  return isAnyObject(payload);
}

function isPositiveNumber(payload) {
  return dist_isNumber(payload) && payload > 0;
}

function dist_isSymbol(payload) {
  return dist_getType(payload) === "Symbol";
}

function dist_isPrimitive(payload) {
  return dist_isBoolean(payload) || dist_isNull(payload) || dist_isUndefined(payload) || dist_isNumber(payload) || dist_isString(payload) || dist_isSymbol(payload);
}

function isPromise(payload) {
  return dist_getType(payload) === "Promise";
}

function dist_isRegExp(payload) {
  return dist_getType(payload) === "RegExp";
}

function dist_isSet(payload) {
  return dist_getType(payload) === "Set";
}

function isWeakMap(payload) {
  return dist_getType(payload) === "WeakMap";
}

function isWeakSet(payload) {
  return dist_getType(payload) === "WeakSet";
}



;// ./node_modules/.pnpm/copy-anything@3.0.5/node_modules/copy-anything/dist/index.js


function assignProp(carry, key, newVal, originalObject, includeNonenumerable) {
  const propType = {}.propertyIsEnumerable.call(originalObject, key) ? "enumerable" : "nonenumerable";
  if (propType === "enumerable")
    carry[key] = newVal;
  if (includeNonenumerable && propType === "nonenumerable") {
    Object.defineProperty(carry, key, {
      value: newVal,
      enumerable: false,
      writable: true,
      configurable: true
    });
  }
}
function copy(target, options = {}) {
  if (dist_isArray(target)) {
    return target.map((item) => copy(item, options));
  }
  if (!dist_isPlainObject(target)) {
    return target;
  }
  const props = Object.getOwnPropertyNames(target);
  const symbols = Object.getOwnPropertySymbols(target);
  return [...props, ...symbols].reduce((carry, key) => {
    if (dist_isArray(options.props) && !options.props.includes(key)) {
      return carry;
    }
    const val = target[key];
    const newVal = copy(val, options);
    assignProp(carry, key, newVal, target, options.nonenumerable);
    return carry;
  }, {});
}



;// ./node_modules/.pnpm/superjson@2.2.1/node_modules/superjson/dist/index.js





class SuperJSON {
    /**
     * @param dedupeReferentialEqualities  If true, SuperJSON will make sure only one instance of referentially equal objects are serialized and the rest are replaced with `null`.
     */
    constructor({ dedupe = false, } = {}) {
        this.classRegistry = new ClassRegistry();
        this.symbolRegistry = new Registry(s => s.description ?? '');
        this.customTransformerRegistry = new CustomTransformerRegistry();
        this.allowedErrorProps = [];
        this.dedupe = dedupe;
    }
    serialize(object) {
        const identities = new Map();
        const output = walker(object, identities, this, this.dedupe);
        const res = {
            json: output.transformedValue,
        };
        if (output.annotations) {
            res.meta = {
                ...res.meta,
                values: output.annotations,
            };
        }
        const equalityAnnotations = generateReferentialEqualityAnnotations(identities, this.dedupe);
        if (equalityAnnotations) {
            res.meta = {
                ...res.meta,
                referentialEqualities: equalityAnnotations,
            };
        }
        return res;
    }
    deserialize(payload) {
        const { json, meta } = payload;
        let result = copy(json);
        if (meta?.values) {
            result = applyValueAnnotations(result, meta.values, this);
        }
        if (meta?.referentialEqualities) {
            result = applyReferentialEqualityAnnotations(result, meta.referentialEqualities);
        }
        return result;
    }
    stringify(object) {
        return JSON.stringify(this.serialize(object));
    }
    parse(string) {
        return this.deserialize(JSON.parse(string));
    }
    registerClass(v, options) {
        this.classRegistry.register(v, options);
    }
    registerSymbol(v, identifier) {
        this.symbolRegistry.register(v, identifier);
    }
    registerCustom(transformer, name) {
        this.customTransformerRegistry.register({
            name,
            ...transformer,
        });
    }
    allowErrorProps(...props) {
        this.allowedErrorProps.push(...props);
    }
}
SuperJSON.defaultInstance = new SuperJSON();
SuperJSON.serialize = SuperJSON.defaultInstance.serialize.bind(SuperJSON.defaultInstance);
SuperJSON.deserialize = SuperJSON.defaultInstance.deserialize.bind(SuperJSON.defaultInstance);
SuperJSON.stringify = SuperJSON.defaultInstance.stringify.bind(SuperJSON.defaultInstance);
SuperJSON.parse = SuperJSON.defaultInstance.parse.bind(SuperJSON.defaultInstance);
SuperJSON.registerClass = SuperJSON.defaultInstance.registerClass.bind(SuperJSON.defaultInstance);
SuperJSON.registerSymbol = SuperJSON.defaultInstance.registerSymbol.bind(SuperJSON.defaultInstance);
SuperJSON.registerCustom = SuperJSON.defaultInstance.registerCustom.bind(SuperJSON.defaultInstance);
SuperJSON.allowErrorProps = SuperJSON.defaultInstance.allowErrorProps.bind(SuperJSON.defaultInstance);

const serialize = SuperJSON.serialize;
const deserialize = SuperJSON.deserialize;
const stringify = SuperJSON.stringify;
const parse = SuperJSON.parse;
const registerClass = SuperJSON.registerClass;
const registerCustom = SuperJSON.registerCustom;
const registerSymbol = SuperJSON.registerSymbol;
const allowErrorProps = SuperJSON.allowErrorProps;

;// ./node_modules/.pnpm/idb@8.0.2/node_modules/idb/build/index.js
const instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);

let idbProxyableTypes;
let cursorAdvanceMethods;
// This is a function to prevent it throwing up in node environments.
function getIdbProxyableTypes() {
    return (idbProxyableTypes ||
        (idbProxyableTypes = [
            IDBDatabase,
            IDBObjectStore,
            IDBIndex,
            IDBCursor,
            IDBTransaction,
        ]));
}
// This is a function to prevent it throwing up in node environments.
function getCursorAdvanceMethods() {
    return (cursorAdvanceMethods ||
        (cursorAdvanceMethods = [
            IDBCursor.prototype.advance,
            IDBCursor.prototype.continue,
            IDBCursor.prototype.continuePrimaryKey,
        ]));
}
const transactionDoneMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
function promisifyRequest(request) {
    const promise = new Promise((resolve, reject) => {
        const unlisten = () => {
            request.removeEventListener('success', success);
            request.removeEventListener('error', error);
        };
        const success = () => {
            resolve(wrap(request.result));
            unlisten();
        };
        const error = () => {
            reject(request.error);
            unlisten();
        };
        request.addEventListener('success', success);
        request.addEventListener('error', error);
    });
    // This mapping exists in reverseTransformCache but doesn't exist in transformCache. This
    // is because we create many promises from a single IDBRequest.
    reverseTransformCache.set(promise, request);
    return promise;
}
function cacheDonePromiseForTransaction(tx) {
    // Early bail if we've already created a done promise for this transaction.
    if (transactionDoneMap.has(tx))
        return;
    const done = new Promise((resolve, reject) => {
        const unlisten = () => {
            tx.removeEventListener('complete', complete);
            tx.removeEventListener('error', error);
            tx.removeEventListener('abort', error);
        };
        const complete = () => {
            resolve();
            unlisten();
        };
        const error = () => {
            reject(tx.error || new DOMException('AbortError', 'AbortError'));
            unlisten();
        };
        tx.addEventListener('complete', complete);
        tx.addEventListener('error', error);
        tx.addEventListener('abort', error);
    });
    // Cache it for later retrieval.
    transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
    get(target, prop, receiver) {
        if (target instanceof IDBTransaction) {
            // Special handling for transaction.done.
            if (prop === 'done')
                return transactionDoneMap.get(target);
            // Make tx.store return the only store in the transaction, or undefined if there are many.
            if (prop === 'store') {
                return receiver.objectStoreNames[1]
                    ? undefined
                    : receiver.objectStore(receiver.objectStoreNames[0]);
            }
        }
        // Else transform whatever we get back.
        return wrap(target[prop]);
    },
    set(target, prop, value) {
        target[prop] = value;
        return true;
    },
    has(target, prop) {
        if (target instanceof IDBTransaction &&
            (prop === 'done' || prop === 'store')) {
            return true;
        }
        return prop in target;
    },
};
function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
    // Due to expected object equality (which is enforced by the caching in `wrap`), we
    // only create one new func per func.
    // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
    // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
    // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
    // with real promises, so each advance methods returns a new promise for the cursor object, or
    // undefined if the end of the cursor has been reached.
    if (getCursorAdvanceMethods().includes(func)) {
        return function (...args) {
            // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
            // the original object.
            func.apply(unwrap(this), args);
            return wrap(this.request);
        };
    }
    return function (...args) {
        // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
        // the original object.
        return wrap(func.apply(unwrap(this), args));
    };
}
function transformCachableValue(value) {
    if (typeof value === 'function')
        return wrapFunction(value);
    // This doesn't return, it just creates a 'done' promise for the transaction,
    // which is later returned for transaction.done (see idbObjectHandler).
    if (value instanceof IDBTransaction)
        cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes()))
        return new Proxy(value, idbProxyTraps);
    // Return the same value back if we're not going to transform it.
    return value;
}
function wrap(value) {
    // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
    // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
    if (value instanceof IDBRequest)
        return promisifyRequest(value);
    // If we've already transformed this value before, reuse the transformed value.
    // This is faster, but it also provides object equality.
    if (transformCache.has(value))
        return transformCache.get(value);
    const newValue = transformCachableValue(value);
    // Not all types are transformed.
    // These may be primitive types, so they can't be WeakMap keys.
    if (newValue !== value) {
        transformCache.set(value, newValue);
        reverseTransformCache.set(newValue, value);
    }
    return newValue;
}
const unwrap = (value) => reverseTransformCache.get(value);

/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */
function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
    const request = indexedDB.open(name, version);
    const openPromise = wrap(request);
    if (upgrade) {
        request.addEventListener('upgradeneeded', (event) => {
            upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
        });
    }
    if (blocked) {
        request.addEventListener('blocked', (event) => blocked(
        // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
        event.oldVersion, event.newVersion, event));
    }
    openPromise
        .then((db) => {
        if (terminated)
            db.addEventListener('close', () => terminated());
        if (blocking) {
            db.addEventListener('versionchange', (event) => blocking(event.oldVersion, event.newVersion, event));
        }
    })
        .catch(() => { });
    return openPromise;
}
/**
 * Delete a database.
 *
 * @param name Name of the database.
 */
function deleteDB(name, { blocked } = {}) {
    const request = indexedDB.deleteDatabase(name);
    if (blocked) {
        request.addEventListener('blocked', (event) => blocked(
        // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
        event.oldVersion, event));
    }
    return wrap(request).then(() => undefined);
}

const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
const writeMethods = ['put', 'add', 'delete', 'clear'];
const cachedMethods = new Map();
function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase &&
        !(prop in target) &&
        typeof prop === 'string')) {
        return;
    }
    if (cachedMethods.get(prop))
        return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, '');
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) ||
        !(isWrite || readMethods.includes(targetFuncName))) {
        return;
    }
    const method = async function (storeName, ...args) {
        // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
        const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
        let target = tx.store;
        if (useIndex)
            target = target.index(args.shift());
        // Must reject if op rejects.
        // If it's a write operation, must reject if tx.done rejects.
        // Must reject with op rejection first.
        // Must resolve with op value.
        // Must handle both promises (no unhandled rejections)
        return (await Promise.all([
            target[targetFuncName](...args),
            isWrite && tx.done,
        ]))[0];
    };
    cachedMethods.set(prop, method);
    return method;
}
replaceTraps((oldTraps) => ({
    ...oldTraps,
    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop),
}));

const advanceMethodProps = ['continue', 'continuePrimaryKey', 'advance'];
const methodMap = {};
const advanceResults = new WeakMap();
const ittrProxiedCursorToOriginalProxy = new WeakMap();
const cursorIteratorTraps = {
    get(target, prop) {
        if (!advanceMethodProps.includes(prop))
            return target[prop];
        let cachedFunc = methodMap[prop];
        if (!cachedFunc) {
            cachedFunc = methodMap[prop] = function (...args) {
                advanceResults.set(this, ittrProxiedCursorToOriginalProxy.get(this)[prop](...args));
            };
        }
        return cachedFunc;
    },
};
async function* iterate(...args) {
    // tslint:disable-next-line:no-this-assignment
    let cursor = this;
    if (!(cursor instanceof IDBCursor)) {
        cursor = await cursor.openCursor(...args);
    }
    if (!cursor)
        return;
    cursor = cursor;
    const proxiedCursor = new Proxy(cursor, cursorIteratorTraps);
    ittrProxiedCursorToOriginalProxy.set(proxiedCursor, cursor);
    // Map this double-proxy back to the original, so other cursor methods work.
    reverseTransformCache.set(proxiedCursor, unwrap(cursor));
    while (cursor) {
        yield proxiedCursor;
        // If one of the advancing methods was not called, call continue().
        cursor = await (advanceResults.get(proxiedCursor) || cursor.continue());
        advanceResults.delete(proxiedCursor);
    }
}
function isIteratorProp(target, prop) {
    return ((prop === Symbol.asyncIterator &&
        instanceOfAny(target, [IDBIndex, IDBObjectStore, IDBCursor])) ||
        (prop === 'iterate' && instanceOfAny(target, [IDBIndex, IDBObjectStore])));
}
replaceTraps((oldTraps) => ({
    ...oldTraps,
    get(target, prop, receiver) {
        if (isIteratorProp(target, prop))
            return iterate;
        return oldTraps.get(target, prop, receiver);
    },
    has(target, prop) {
        return isIteratorProp(target, prop) || oldTraps.has(target, prop);
    },
}));



;// ./Extension/src/background/storages/idb-storage.ts
/**
 * Copyright (c) 2015-2025 Adguard Software Ltd.
 *
 * @file
 * This file is part of AdGuard Browser Extension (https://github.com/AdguardTeam/AdguardBrowserExtension).
 *
 * AdGuard Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * AdGuard Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with AdGuard Browser Extension. If not, see <http://www.gnu.org/licenses/>.
 */ function idb_storage_define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}


/**
 * Provides a storage mechanism using IndexedDB. This class implements the
 * StorageInterface with asynchronous methods to interact with the database.
 *
 * @template Data The type of the value stored in the storage.
 */ class IDBStorage {
    /**
     * Ensures the database is opened before any operations. If the database
     * is not already opened, it opens the database.
     *
     * @returns The opened database instance.
     */ async getOpenedDb() {
        if (this.db) {
            return this.db;
        }
        if (this.dbGetterPromise) {
            return this.dbGetterPromise;
        }
        this.dbGetterPromise = (async ()=>{
            this.db = await openDB(this.name, this.version, {
                upgrade: (db)=>{
                    // Make sure the store exists
                    if (!db.objectStoreNames.contains(this.store)) {
                        db.createObjectStore(this.store);
                    }
                }
            });
            this.dbGetterPromise = null;
            return this.db;
        })();
        return this.dbGetterPromise;
    }
    /**
     * Retrieves a value by key from the store.
     *
     * @param key The key of the value to retrieve.
     *
     * @returns The value associated with the key.
     */ async get(key) {
        const db = await this.getOpenedDb();
        return db.get(this.store, key);
    }
    /**
     * Sets a value in the store with the specified key.
     *
     * @param key The key under which to store the value.
     * @param value The value to store.
     */ async set(key, value) {
        const db = await this.getOpenedDb();
        await db.put(this.store, value, key);
    }
    /**
     * Removes a value from the store by key.
     *
     * @param key The key of the value to remove.
     */ async remove(key) {
        const db = await this.getOpenedDb();
        await db.delete(this.store, key);
    }
    /**
     * Atomic set operation for multiple key-value pairs.
     * This method is using transaction to ensure atomicity, if any of the operations fail,
     * the entire operation is rolled back. This helps to prevent data corruption / inconsistency.
     *
     * @param data The key-value pairs to set.
     *
     * @returns True if all operations were successful, false otherwise.
     *
     * @example
     * ```ts
     * const storage = new IDBStorage();
     * await storage.setMultiple({
     *    key1: 'value1',
     *    key2: 'value2',
     * });
     * ```
     */ async setMultiple(data) {
        const db = await this.getOpenedDb();
        const tx = db.transaction(this.store, 'readwrite');
        try {
            await Promise.all(Object.entries(data).map(([key, value])=>tx.store.put(value, key)));
            await tx.done;
        } catch (e) {
            logger.error('[ext.IDBStorage.setMultiple]: error while setting multiple keys in the storage:', e);
            tx.abort();
            return false;
        }
        return true;
    }
    /**
     * Removes multiple key-value pairs from the storage.
     *
     * @param keys The keys to remove.
     *
     * @returns True if all operations were successful, false otherwise.
     */ async removeMultiple(keys) {
        const db = await this.getOpenedDb();
        const tx = db.transaction(this.store, 'readwrite');
        try {
            await Promise.all(keys.map((key)=>tx.store.delete(key)));
            await tx.done;
        } catch (e) {
            logger.error('[ext.IDBStorage.removeMultiple]: error while removing multiple keys from the storage:', e);
            tx.abort();
            return false;
        }
        return true;
    }
    /**
     * Get the entire contents of the storage.
     *
     * @returns Promise that resolves with the entire contents of the storage.
     */ async entries() {
        const db = await this.getOpenedDb();
        const entries = {};
        const tx = db.transaction(this.store, 'readonly');
        // eslint-disable-next-line no-restricted-syntax
        for await (const cursor of tx.store){
            const key = String(cursor.key);
            entries[key] = cursor.value;
        }
        return entries;
    }
    /**
     * Get all keys in the storage.
     *
     * @returns Promise that resolves with all keys in the storage.
     */ async keys() {
        const db = await this.getOpenedDb();
        const idbKeys = await db.getAllKeys(this.store);
        return idbKeys.map((key)=>key.toString());
    }
    /**
     * Check if a key exists in the storage.
     *
     * @param key The key to check.
     *
     * @returns True if the key exists, false otherwise.
     */ async has(key) {
        const db = await this.getOpenedDb();
        const idbKey = await db.getKey(this.store, key);
        return idbKey !== undefined;
    }
    /**
     * Clears the storage.
     */ async clear() {
        const db = await this.getOpenedDb();
        await db.clear(this.store);
    }
    /**
     * Constructs an instance of the IDBStorage class.
     *
     * @param [name=IDBStorage.DEFAULT_IDB_NAME] The name of the database.
     * @param [version=1] The version of the database.
     * @param [store=IDBStorage.DEFAULT_STORE_NAME] The name of the store within the database.
     */ constructor(name = IDBStorage.DEFAULT_IDB_NAME, version = IDBStorage.DEFAULT_IDB_VERSION, store = IDBStorage.DEFAULT_STORE_NAME){
        /**
     * Holds the instance of the IndexedDB database.
     */ idb_storage_define_property(this, "db", null);
        /**
     * Promise to get IndexedDB database.
     */ idb_storage_define_property(this, "dbGetterPromise", null);
        /**
     * The name of the database.
     */ idb_storage_define_property(this, "name", void 0);
        /**
     * The version of the database. Used for upgrades.
     */ idb_storage_define_property(this, "version", void 0);
        /**
     * The name of the store within the database.
     */ idb_storage_define_property(this, "store", void 0);
        this.name = name;
        this.version = version;
        this.store = store;
    }
}
/**
     * The default name of the store within the database.
     */ idb_storage_define_property(IDBStorage, "DEFAULT_STORE_NAME", 'defaultStore');
/**
     * The default version of the database.
     */ idb_storage_define_property(IDBStorage, "DEFAULT_IDB_VERSION", 1);
/**
     * The default name of the database.
     */ idb_storage_define_property(IDBStorage, "DEFAULT_IDB_NAME", 'adguardIDB');

;// ./Extension/src/background/storages/hybrid-storage.ts
/* eslint-disable @typescript-eslint/no-explicit-any */ /**
 * Copyright (c) 2015-2025 Adguard Software Ltd.
 *
 * @file
 * This file is part of AdGuard Browser Extension (https://github.com/AdguardTeam/AdguardBrowserExtension).
 *
 * AdGuard Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * AdGuard Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with AdGuard Browser Extension. If not, see <http://www.gnu.org/licenses/>.
 */ /**
 * This file implements a hybrid storage solution that abstracts over different storage mechanisms,
 * providing a unified API for storage operations. It automatically chooses between IndexedDB storage and
 * a fallback storage mechanism based on the environment's capabilities.
 */ function hybrid_storage_define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}






/**
 * Implements a hybrid storage mechanism that can switch between IndexedDB and a fallback storage
 * based on browser capabilities and environment constraints. This class adheres to the StorageInterface,
 * allowing for asynchronous get and set operations.
 *
 * @template Data The type of the value stored in the storage.
 */ class HybridStorage {
    /**
     * Checks if the given storage is an instance of IDBStorage.
     *
     * @param storage The storage instance to check.
     *
     * @returns True if the storage is an instance of IDBStorage, false otherwise.
     */ static isIdbStorage(storage) {
        return storage instanceof IDBStorage;
    }
    /**
     * Determines the appropriate storage mechanism to use. If IndexedDB is supported, it uses IDBStorage;
     * otherwise, it falls back to a generic Storage mechanism. This selection is made once and cached
     * for subsequent operations.
     *
     * @returns The storage instance to be used for data operations.
     */ async getStorage() {
        if (this.storage) {
            return this.storage;
        }
        if (await HybridStorage.isIDBSupported()) {
            this.storage = new IDBStorage();
        } else {
            this.storage = new BrowserStorage(this.fallbackStorage);
        }
        return this.storage;
    }
    /**
     * Checks if the given value is a SuperJSONResult.
     *
     * @param value The value to check.
     *
     * @returns True if the value is a SuperJSONResult, false otherwise.
     */ static isSuperJSONResult(value) {
        return typeof value === 'object' && value !== null && HybridStorage.SUPERJSON_META_KEY in value;
    }
    /**
     * Checks if IndexedDB is supported in the current environment.
     * This is determined by trying to open a test database; if successful, IndexedDB is supported.
     * The result of this check is cached to prevent multiple checks.
     *
     * @returns True if IndexedDB is supported, false otherwise.
     */ static async isIDBSupported() {
        if (HybridStorage.isIDBCapabilityChecked) {
            return HybridStorage.idbSupported;
        }
        if (HybridStorage.idbCapabilityCheckerPromise) {
            return HybridStorage.idbCapabilityCheckerPromise;
        }
        HybridStorage.idbCapabilityCheckerPromise = (async ()=>{
            try {
                const testDbName = `${HybridStorage.TEST_IDB_NAME_PREFIX}${nanoid()}`;
                const testDb = await openDB(testDbName, HybridStorage.TEST_IDB_VERSION);
                testDb.close();
                await deleteDB(testDbName);
                HybridStorage.idbSupported = true;
            } catch (e) {
                HybridStorage.idbSupported = false;
            }
            HybridStorage.isIDBCapabilityChecked = true;
            return HybridStorage.idbSupported;
        })();
        return HybridStorage.idbCapabilityCheckerPromise;
    }
    /**
     * Asynchronously sets a value for a given key in the selected storage mechanism.
     *
     * @param key The key under which the value is stored.
     * @param value The value to be stored.
     *
     * @returns A promise that resolves when the operation is complete.
     */ async set(key, value) {
        const storage = await this.getStorage();
        // If the selected storage mechanism is IndexedDB, we store the value as is,
        // as IndexedDB can store complex objects.
        if (HybridStorage.isIdbStorage(storage)) {
            return storage.set(key, value);
        }
        const serialized = HybridStorage.serialize(value);
        // If the serialized value contains a meta key, it means that the value provided
        // contains special data that are not JSON-serializable and require SuperJSON serialization,
        // like typed arrays, dates, and other complex objects.
        // In this case, we store the SuperJSON-serialized value.
        if (HybridStorage.SUPERJSON_META_KEY in serialized) {
            return storage.set(key, serialized);
        }
        // If the serialized value does not contain a meta key, it means that the value
        // provided was a primitive value or a plain object that is JSON-serializable,
        // and it does not contain any special data that requires SuperJSON serialization.
        // In this case, we store the value as is.
        return storage.set(key, value);
    }
    /**
     * Asynchronously retrieves the value for a given key from the selected storage mechanism.
     *
     * @param key The key whose value is to be retrieved.
     *
     * @returns A promise that resolves with the retrieved value, or undefined if the key does not exist.
     */ async get(key) {
        const storage = await this.getStorage();
        // If the selected storage mechanism is IndexedDB, we return the value as is,
        // as IndexedDB can store complex objects.
        if (HybridStorage.isIdbStorage(storage)) {
            return storage.get(key);
        }
        const value = await storage.get(key);
        // Do not attempt to deserialize undefined values.
        if (value === undefined) {
            return undefined;
        }
        // If the value is a SuperJSON-serialized object, we need to deserialize it.
        if (HybridStorage.isSuperJSONResult(value)) {
            return HybridStorage.deserialize(value);
        }
        // Otherwise, we return the value as is.
        return value;
    }
    /**
     * Asynchronously removes the value for a given key from the selected storage mechanism.
     *
     * @param key The key whose value is to be removed.
     */ async remove(key) {
        const storage = await this.getStorage();
        await storage.remove(key);
    }
    /**
     * Atomic set operation for multiple key-value pairs.
     * This method are using transaction to ensure atomicity, if any of the operations fail,
     * the entire operation is rolled back. This helps to prevent data corruption / inconsistency.
     *
     * @param data The key-value pairs to set.
     *
     * @returns True if all operations were successful, false otherwise.
     *
     * @example
     * ```ts
     * const storage = new HybridStorage();
     * await storage.setMultiple({
     *    key1: 'value1',
     *    key2: 'value2',
     * });
     * ```
     */ async setMultiple(data) {
        const storage = await this.getStorage();
        if (HybridStorage.isIdbStorage(storage)) {
            var _ref;
            return (_ref = await storage.setMultiple(data)) !== null && _ref !== void 0 ? _ref : false;
        }
        const cloneData = Object.entries(data).reduce((acc, [key, value])=>{
            const serialized = SuperJSON.serialize(value);
            // If the serialized value contains a meta key, it means that the value provided
            // contains special data that are not JSON-serializable and require SuperJSON serialization,
            // like typed arrays, dates, and other complex objects.
            // In this case, we store the SuperJSON-serialized value.
            if (HybridStorage.SUPERJSON_META_KEY in serialized) {
                acc[key] = serialized;
                return acc;
            }
            // If the serialized value does not contain a meta key, it means that the value
            // provided was a primitive value or a plain object that is JSON-serializable,
            // and it does not contain any special data that requires SuperJSON serialization.
            // In this case, we store the value as is.
            acc[key] = value;
            return acc;
        }, {});
        var _ref1;
        return (_ref1 = await storage.setMultiple(cloneData)) !== null && _ref1 !== void 0 ? _ref1 : false;
    }
    /**
     * Removes multiple key-value pairs from the storage.
     *
     * @param keys The keys to remove.
     *
     * @returns True if all operations were successful, false otherwise.
     */ async removeMultiple(keys) {
        const storage = await this.getStorage();
        var _ref;
        return (_ref = await storage.removeMultiple(keys)) !== null && _ref !== void 0 ? _ref : false;
    }
    /**
     * Get the entire contents of the storage.
     *
     * @returns Promise that resolves with the entire contents of the storage.
     */ async entries() {
        const storage = await this.getStorage();
        if (HybridStorage.isIdbStorage(storage)) {
            return storage.entries();
        }
        const entries = await storage.entries();
        return Object.entries(entries).reduce((acc, [key, value])=>{
            acc[key] = HybridStorage.isSuperJSONResult(value) ? HybridStorage.deserialize(value) : value;
            return acc;
        }, {});
    }
    /**
     * Get all keys from the storage.
     *
     * @returns Promise that resolves with all keys from the storage.
     */ async keys() {
        const storage = await this.getStorage();
        return storage.keys();
    }
    /**
     * Check if a key exists in the storage.
     *
     * @param key The key to check.
     *
     * @returns True if the key exists, false otherwise.
     */ async has(key) {
        const storage = await this.getStorage();
        return storage.has(key);
    }
    /**
     * Clears the storage.
     */ async clear() {
        const storage = await this.getStorage();
        await storage.clear();
    }
    /**
     * Constructs an instance of the HybridStorage class.
     *
     * @param fallbackStorage The storage area to use when IndexedDB is not supported.
     */ constructor(fallbackStorage){
        /**
     * Holds the instance of the selected storage mechanism.
     *
     * @note We use SuperJSON to serialize and deserialize the data when using the fallback storage mechanism,
     * because it only supports storing JSON-serializable data.
     */ hybrid_storage_define_property(this, "storage", null);
        /**
     * The storage area to use when IndexedDB is not supported.
     */ hybrid_storage_define_property(this, "fallbackStorage", void 0);
        this.fallbackStorage = fallbackStorage;
    }
}
/**
     * A flag indicating whether IndexedDB support has already been checked.
     */ hybrid_storage_define_property(HybridStorage, "isIDBCapabilityChecked", false);
/**
     * A promise that resolves to whether IndexedDB is supported in the environment.
     * This promise is used to cache the result of the support check to prevent multiple checks.
     */ hybrid_storage_define_property(HybridStorage, "idbCapabilityCheckerPromise", null);
/**
     * A flag that stores the result of the IndexedDB support check.
     * If true, IndexedDB is supported in the environment.
     */ hybrid_storage_define_property(HybridStorage, "idbSupported", false);
/**
     * Prefix for the test IndexedDB database name.
     * This test database is used to check if IndexedDB is supported in the current environment.
     */ hybrid_storage_define_property(HybridStorage, "TEST_IDB_NAME_PREFIX", 'test_');
/**
     * Version number for the test IndexedDB database.
     */ hybrid_storage_define_property(HybridStorage, "TEST_IDB_VERSION", 1);
/**
     * The key used to store metadata in SuperJSON-serialized data.
     */ hybrid_storage_define_property(HybridStorage, "SUPERJSON_META_KEY", 'meta');
/**
     * Serializes the given data using SuperJSON.
     *
     * @param data The data to serialize.
     *
     * @returns The serialized data.
     */ hybrid_storage_define_property(HybridStorage, "serialize", (data)=>SuperJSON.serialize(data));
/**
     * Deserializes the given data using SuperJSON.
     *
     * @param data The data to deserialize.
     *
     * @returns The deserialized data.
     */ hybrid_storage_define_property(HybridStorage, "deserialize", (data)=>SuperJSON.deserialize(data));

;// ./Extension/src/background/storages/shared-instances.ts
/**
 * Copyright (c) 2015-2025 Adguard Software Ltd.
 *
 * @file
 * This file is part of AdGuard Browser Extension (https://github.com/AdguardTeam/AdguardBrowserExtension).
 *
 * AdGuard Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * AdGuard Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with AdGuard Browser Extension. If not, see <http://www.gnu.org/licenses/>.
 */ 




/**
 * Storage instance for accessing `browser.storage.local`.
 */ const browserStorage = new BrowserStorage((browser_polyfill_default()).storage.local);
/**
 * Storage instance for accessing `IndexedDB` with fallback to `browser.storage.local`.
 */ const hybridStorage = new HybridStorage((browser_polyfill_default()).storage.local);
// Expose storage instances to the global scope for debugging purposes,
// because it's hard to access them from the console in the background
// page or impossible from Application tab -> IndexedDB (showing empty page).
if (false) {}

;// ./Extension/src/common/logger.ts
/**
 * @file
 *
 * This file is part of AdGuard Browser Extension (https://github.com/AdguardTeam/AdguardBrowserExtension).
 *
 * AdGuard Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * AdGuard Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with AdGuard Browser Extension. If not, see <http://www.gnu.org/licenses/>.
 */ function logger_define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}




/**
 * Extended logger with persistent log level setting.
 * Extends the base Logger class with browser storage integration
 * for saving and retrieving log level preferences.
 */ class ExtendedLogger extends Logger {
    /**
     * Checks if the current log level is verbose (Debug or Verbose).
     *
     * This method is useful for determining if detailed logging should
     * be enabled across the application in different modules. Some kind of
     * "single point of truth".
     *
     * @returns True if current log level is Debug or Verbose, false otherwise.
     */ isVerbose() {
        return this.currentLevel === LogLevel.Debug || this.currentLevel === LogLevel.Verbose;
    }
    /**
     * Sets log with persistent value, which will be saved, if
     * browser.storage.local is available.
     *
     * @param level Log level to set.
     */ setLogLevel(level) {
        this.currentLevel = level;
        browserStorage.set(ExtendedLogger.LOG_LEVEL_LOCAL_STORAGE_KEY, level).catch((error)=>{
            // eslint-disable-next-line max-len
            this.error('[ext.ExtendedLogger.setLogLevel]: failed to save log level in browser.storage.local: ', error);
        });
    }
    /**
     * Validates if the provided value is a valid LogLevel.
     *
     * @param value Value to validate.
     *
     * @returns {boolean} True if the value is a valid LogLevel, false otherwise.
     */ static isValidLogLevel(value) {
        return typeof value === 'string' && Object.values(LogLevel).includes(value);
    }
    /**
     * Initializes the logger by loading the saved log level from browser storage.
     * Falls back to the default log level if retrieval fails or the stored level is invalid.
     *
     * @returns Promise that resolves when initialization is complete.
     */ async init() {
        try {
            const logLevel = await browserStorage.get(ExtendedLogger.LOG_LEVEL_LOCAL_STORAGE_KEY);
            if (!ExtendedLogger.isValidLogLevel(logLevel)) {
                // Print a warning only if the log level is valuable.
                if (logLevel !== null && logLevel !== undefined) {
                    // eslint-disable-next-line max-len
                    this.warn('[ext.ExtendedLogger.init]: log level from browser.storage.local is not valid. Value: ', logLevel);
                }
                return;
            }
            try {
                this.setLogLevel(logLevel);
            } catch (e) {
                // eslint-disable-next-line max-len
                this.warn('[ext.ExtendedLogger.init]: failed to set log level from browser.storage.local, will set to default level. Error: ', e);
                this.setLogLevel(ExtendedLogger.DEFAULT_LOG_LEVEL);
            }
        } catch (error) {
            // eslint-disable-next-line max-len
            this.warn('[ext.ExtendedLogger.init]: failed to get log level from browser.storage.local: ', error);
        }
    }
    /**
     * Creates a new instance of ExtendedLogger.
     * Initializes the logger with the default log level based on build configuration.
     */ constructor(){
        super();
        this.currentLevel = ExtendedLogger.DEFAULT_LOG_LEVEL;
    }
}
/**
     * Key for storing the current log level in browser storage.
     */ logger_define_property(ExtendedLogger, "LOG_LEVEL_LOCAL_STORAGE_KEY", 'log-level');
/**
     * Default log level based on the build configuration.
     */ logger_define_property(ExtendedLogger, "DEFAULT_LOG_LEVEL",  true ? LogLevel.Info : 0);
const logger = new ExtendedLogger();
// Expose logger to the window object,
// to have possibility to switch log level from the console.
// Example: adguard.logger.setCurrentLevel('trace');
// eslint-disable-next-line no-restricted-globals
Object.assign(self, {
    adguard: {
        ...self.adguard,
        logger
    }
});


;// ./Extension/src/common/messages/constants.ts
/**
 * Copyright (c) 2015-2025 Adguard Software Ltd.
 *
 * @file
 * This file is part of AdGuard Browser Extension (https://github.com/AdguardTeam/AdguardBrowserExtension).
 *
 * AdGuard Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * AdGuard Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with AdGuard Browser Extension. If not, see <http://www.gnu.org/licenses/>.
 */ /**
 * Important: do not use z.inferOf, because it brings a lot of side effects with
 * many dependencies to the bundle.
 *
 * Also please try, if possible, to not import here external modules
 * other that types.
 */ const constants_APP_MESSAGE_HANDLER_NAME = 'app';
/**
 * Message types used for message passing between extension contexts
 * (popup, filtering log, content scripts, background)
 */ var MessageType = /*#__PURE__*/ function(MessageType) {
    MessageType["CreateEventListener"] = "createEventListener";
    MessageType["RemoveListener"] = "removeListener";
    MessageType["OpenExtensionStore"] = "openExtensionStore";
    MessageType["AddAndEnableFilter"] = "addAndEnableFilter";
    MessageType["ApplySettingsJson"] = "applySettingsJson";
    MessageType["OpenFilteringLog"] = "openFilteringLog";
    MessageType["OpenFullscreenUserRules"] = "openFullscreenUserRules";
    MessageType["UpdateFullscreenUserRulesTheme"] = "updateFullscreenUserRulesTheme";
    MessageType["ResetBlockedAdsCount"] = "resetBlockedAdsCount";
    MessageType["ResetSettings"] = "resetSettings";
    MessageType["GetUserRules"] = "getUserRules";
    MessageType["SaveUserRules"] = "saveUserRules";
    MessageType["GetAllowlistDomains"] = "getAllowlistDomains";
    MessageType["SaveAllowlistDomains"] = "saveAllowlistDomains";
    MessageType["CheckFiltersUpdate"] = "checkFiltersUpdate";
    MessageType["CheckExtensionUpdateMv3"] = "checkExtensionUpdateMv3";
    MessageType["UpdateExtensionMv3"] = "updateExtensionMv3";
    MessageType["DisableFiltersGroup"] = "disableFiltersGroup";
    MessageType["DisableFilter"] = "disableFilter";
    MessageType["LoadCustomFilterInfo"] = "loadCustomFilterInfo";
    MessageType["SubscribeToCustomFilter"] = "subscribeToCustomFilter";
    MessageType["RemoveAntiBannerFilter"] = "removeAntiBannerFilter";
    MessageType["GetIsAppInitialized"] = "getIsAppInitialized";
    MessageType["GetTabInfoForPopup"] = "getTabInfoForPopup";
    MessageType["ChangeApplicationFilteringPaused"] = "changeApplicationFilteringPaused";
    MessageType["OpenRulesLimitsTab"] = "openRulesLimitsTab";
    MessageType["OpenSettingsTab"] = "openSettingsTab";
    MessageType["OpenAssistant"] = "openAssistant";
    MessageType["OpenAbuseTab"] = "openAbuseTab";
    MessageType["OpenSiteReportTab"] = "openSiteReportTab";
    MessageType["OpenComparePage"] = "openComparePage";
    MessageType["OpenChromeExtensionsSettingsPage"] = "openChromeExtensionsSettingsPage";
    MessageType["OpenExtensionDetailsPage"] = "openExtensionDetailsPage";
    MessageType["ResetUserRulesForPage"] = "resetUserRulesForPage";
    MessageType["RemoveAllowlistDomain"] = "removeAllowlistDomain";
    MessageType["AddAllowlistDomainForTabId"] = "addAllowlistDomainForTabId";
    MessageType["AddAllowlistDomainForUrl"] = "addAllowlistDomainForUrl";
    MessageType["OnOpenFilteringLogPage"] = "onOpenFilteringLogPage";
    MessageType["GetFilteringLogData"] = "getFilteringLogData";
    MessageType["InitializeFrameScript"] = "initializeFrameScript";
    MessageType["InitializeBlockingPageScript"] = "initializeBlockingPageScript";
    MessageType["OnCloseFilteringLogPage"] = "onCloseFilteringLogPage";
    MessageType["GetFilteringInfoByTabId"] = "getFilteringInfoByTabId";
    MessageType["SynchronizeOpenTabs"] = "synchronizeOpenTabs";
    MessageType["ClearEventsByTabId"] = "clearEventsByTabId";
    MessageType["RefreshPage"] = "refreshPage";
    MessageType["AddUserRule"] = "addUserRule";
    MessageType["RemoveUserRule"] = "removeUserRule";
    MessageType["EnableFiltersGroup"] = "enableFiltersGroup";
    MessageType["NotifyListeners"] = "notifyListeners";
    MessageType["AddLongLivedConnection"] = "addLongLivedConnection";
    MessageType["GetOptionsData"] = "getOptionsData";
    MessageType["ChangeUserSettings"] = "changeUserSetting";
    MessageType["CheckRequestFilterReady"] = "checkRequestFilterReady";
    MessageType["OpenThankyouPage"] = "openThankYouPage";
    MessageType["OpenSafebrowsingTrusted"] = "openSafebrowsingTrusted";
    MessageType["GetSelectorsAndScripts"] = "getSelectorsAndScripts";
    MessageType["CheckPageScriptWrapperRequest"] = "checkPageScriptWrapperRequest";
    MessageType["ProcessShouldCollapse"] = "processShouldCollapse";
    MessageType["ProcessShouldCollapseMany"] = "processShouldCollapseMany";
    MessageType["AddFilteringSubscription"] = "addFilterSubscription";
    MessageType["SetNotificationViewed"] = "setNotificationViewed";
    MessageType["SaveCssHitsStats"] = "saveCssHitStats";
    MessageType["GetCookieRules"] = "getCookieRules";
    MessageType["SaveCookieLogEvent"] = "saveCookieRuleEvent";
    MessageType["LoadSettingsJson"] = "loadSettingsJson";
    MessageType["AddUrlToTrusted"] = "addUrlToTrusted";
    MessageType["SetPreserveLogState"] = "setPreserveLogState";
    MessageType["GetUserRulesEditorData"] = "getUserRulesEditorData";
    MessageType["GetEditorStorageContent"] = "getEditorStorageContent";
    MessageType["SetEditorStorageContent"] = "setEditorStorageContent";
    MessageType["SetFilteringLogWindowState"] = "setFilteringLogWindowState";
    MessageType["AppInitialized"] = "appInitialized";
    MessageType["UpdateTotalBlocked"] = "updateTotalBlocked";
    MessageType["ScriptletCloseWindow"] = "scriptletCloseWindow";
    MessageType["ShowRuleLimitsAlert"] = "showRuleLimitsAlert";
    MessageType["ShowAlertPopup"] = "showAlertPopup";
    MessageType["ShowVersionUpdatedPopup"] = "showVersionUpdatedPopup";
    MessageType["UpdateListeners"] = "updateListeners";
    MessageType["SetConsentedFilters"] = "setConsentedFilters";
    MessageType["GetIsConsentedFilter"] = "getIsConsentedFilter";
    MessageType["SendTelemetryCustomEvent"] = "sendTelemetryCustomEvent";
    MessageType["SendTelemetryPageViewEvent"] = "sendTelemetryPageViewEvent";
    MessageType["AddTelemetryOpenedPage"] = "addTelemetryOpenedPage";
    MessageType["RemoveTelemetryOpenedPage"] = "removeTelemetryOpenedPage";
    MessageType["GetRulesLimitsCountersMv3"] = "getRulesLimitsCountersMv3";
    MessageType["CanEnableStaticFilterMv3"] = "canEnableStaticFilterMv3";
    MessageType["CanEnableStaticGroupMv3"] = "canEnableStaticGroupMv3";
    MessageType["ClearRulesLimitsWarningMv3"] = "clearRulesLimitsWarningMv3";
    MessageType["RestoreFiltersMv3"] = "restoreFiltersMv3";
    MessageType["CurrentLimitsMv3"] = "currentLimitsMv3";
    return MessageType;
}({});

;// ./Extension/src/common/messages/send-message.ts
/**
 * Copyright (c) 2015-2025 Adguard Software Ltd.
 *
 * @file
 * This file is part of AdGuard Browser Extension (https://github.com/AdguardTeam/AdguardBrowserExtension).
 *
 * AdGuard Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * AdGuard Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with AdGuard Browser Extension. If not, see <http://www.gnu.org/licenses/>.
 */ 

/**
 * TODO: Consider moving this file to the background folder, because all messages
 * from the UI should be send via methods of Messenger class instead of using
 * directly sendMessage to proper types checking.
 *
 * {@link sendMessage} sends app message via {@link browser.runtime.sendMessage} and
 * gets response from another extension page message handler
 *
 * @param message - partial {@link Message} record without {@link Message.handlerName} field
 *
 * @returns message handler response
 */ async function sendMessage(message) {
    try {
        return await browser.runtime.sendMessage({
            handlerName: APP_MESSAGE_HANDLER_NAME,
            ...message
        });
    } catch (e) {
    // do nothing
    }
}
/**
 * {@link sendTabMessage} sends message to specified tab via {@link browser.tabs.sendMessage} and
 * gets response from it
 *
 * @param tabId - tab id
 * @param message - partial {@link Message} record without {@link Message.handlerName} field
 *
 * @returns tab message handler response
 */ async function sendTabMessage(tabId, message) {
    return browser.tabs.sendMessage(tabId, {
        handlerName: APP_MESSAGE_HANDLER_NAME,
        ...message
    });
}

// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.40.0/node_modules/core-js/modules/es.error.cause.js
var es_error_cause = __webpack_require__(59952);
;// ./Extension/src/common/messages/message-handler.ts
/**
 * Copyright (c) 2015-2025 Adguard Software Ltd.
 *
 * @file
 * This file is part of AdGuard Browser Extension (https://github.com/AdguardTeam/AdguardBrowserExtension).
 *
 * AdGuard Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * AdGuard Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with AdGuard Browser Extension. If not, see <http://www.gnu.org/licenses/>.
 */ function message_handler_define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}



/**
 * Type guard for messages that have a 'type' field with possible {@link MessageType}.
 *
 * @note Added to no bring here huge zod library.
 *
 * @param message Unknown message.
 *
 * @returns True if message has 'type' field with possible {@link MessageType}.
 */ const messageHasTypeField = (message)=>{
    return typeof message === 'object' && message !== null && 'type' in message;
};
/**
 * Type guard for messages that have a 'type' field and 'data' field and looks like {@link Message}.
 *
 * @note Added to no bring here huge zod library.
 *
 * @param message Unknown message.
 *
 * @returns True if message has 'type' and 'data' fields and looks like {@link Message}.
 */ const messageHasTypeAndDataFields = (message)=>{
    return messageHasTypeField(message) && 'data' in message;
};
/**
 * API for handling Messages via {@link browser.runtime.onMessage}
 */ class MessageHandler {
    init() {
        browser.runtime.onMessage.addListener(this.handleMessage);
    }
    /**
     * Add message listener.
     * Listeners limited to 1 per message type to prevent race
     * condition while response processing.
     *
     * TODO: implement listeners priority execution strategy
     *
     * @param type - {@link ValidMessageTypes}
     * @param listener - {@link MessageListener}
     *
     * @throws error, if message listener already added
     */ addListener(type, listener) {
        if (this.listeners.has(type)) {
            throw new Error(`Message handler: ${type} listener has already been registered`);
        }
        // Cast through unknown to help TS understand that the listener is of
        // the correct type. It will check types at compile time.
        this.listeners.set(type, listener);
    }
    /**
     * Removes message listener.
     *
     * @param type - {@link ValidMessageTypes}
     */ removeListener(type) {
        this.listeners.delete(type);
    }
    /**
     * Removes all listeners
     */ removeListeners() {
        this.listeners.clear();
    }
    /**
     * Check if the message is of type {@link Message}.
     *
     * @param message Message of basic type {@link Message} or {@link EngineMessage}.
     *
     * @returns True if the message is of type {@link Message}.
     */ static isValidMessageType(message) {
        return message.handlerName === APP_MESSAGE_HANDLER_NAME && 'type' in message;
    }
    constructor(){
        message_handler_define_property(this, "listeners", new Map());
        this.handleMessage = this.handleMessage.bind(this);
    }
}

;// ./Extension/src/common/messages/index.ts
/**
 * Copyright (c) 2015-2025 Adguard Software Ltd.
 *
 * @file
 * This file is part of AdGuard Browser Extension (https://github.com/AdguardTeam/AdguardBrowserExtension).
 *
 * AdGuard Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * AdGuard Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with AdGuard Browser Extension. If not, see <http://www.gnu.org/licenses/>.
 */ // Since exports from './constants' are: the MessageType enum and a lot of types,
// and imports there are types only, so it should not affect bundle size
// eslint-disable-next-line no-restricted-syntax




;// ./Extension/src/pages/services/messenger.ts
/**
 * Copyright (c) 2015-2025 Adguard Software Ltd.
 *
 * @file
 * This file is part of AdGuard Browser Extension (https://github.com/AdguardTeam/AdguardBrowserExtension).
 *
 * AdGuard Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * AdGuard Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with AdGuard Browser Extension. If not, see <http://www.gnu.org/licenses/>.
 */ function messenger_define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}





var Page = /*#__PURE__*/ function(Page) {
    Page["FullscreenUserRules"] = "fullscreen-user-rules";
    Page["FilteringLog"] = "filtering-log";
    Page["Popup"] = "popup";
    return Page;
}({});
/**
 * MessengerCommon class, used to communicate with the background page from the UI.
 * Actually, it's a wrapper around the browser.runtime.sendMessage method.
 */ class Messenger {
    /**
     * Sends a message to the background page.
     *
     * All messages described in the {@link MessageType} enum.
     * All answers described in the {@link MessageMap} type.
     *
     * @param type Message type.
     * @param data Message data. Optional because not all messages have data.
     *
     * @returns Promise that resolves with the response from the background page.
     * Type of the response depends on the message type. Go to {@link MessageMap}
     * to see all possible message types and their responses.
     */ // eslint-disable-next-line class-methods-use-this
    async sendMessage(type, data) {
        const response = await browser_polyfill_default().runtime.sendMessage({
            handlerName: constants_APP_MESSAGE_HANDLER_NAME,
            type,
            data
        });
        return response;
    }
    /**
     * Sends a message from background page to update listeners on the UI.
     *
     * @returns Promise that resolves when the message is sent.
     */ async updateListeners() {
        return this.sendMessage(MessageType.UpdateListeners);
    }
    /**
     * Sends a message to the background page to get the settings data for
     * the options page with some additional info.
     *
     * @returns Promise that resolves with the settings data for
     * the options page with some additional info.
     */ async getOptionsData() {
        return this.sendMessage(MessageType.GetOptionsData);
    }
    /**
     * Sends a message to the background page to change the user setting.
     *
     * @param settingId Setting identifier.
     * @param value Setting value.
     *
     * @returns Promise that resolves after the message is sent.
     */ async changeUserSetting(settingId, value) {
        await this.sendMessage(MessageType.ChangeUserSettings, {
            key: settingId,
            value
        });
    }
    /**
     * Sends a message to the background page to open the extension store.
     *
     * @returns Promise that resolves after the message is sent.
     */ async openExtensionStore() {
        return this.sendMessage(MessageType.OpenExtensionStore);
    }
    /**
     * Sends a message to the background page to open the compare page.
     *
     * @returns Promise that resolves after the message is sent.
     */ async openComparePage() {
        return this.sendMessage(MessageType.OpenComparePage);
    }
    /**
     * Sends a message to the background page to open the Chrome extensions settings page.
     *
     * @returns Promise that resolves after the message is sent.
     */ async openChromeExtensionsPage() {
        return this.sendMessage(MessageType.OpenChromeExtensionsSettingsPage);
    }
    /**
     * Sends a message to the background page to open the extension details page.
     *
     * @returns Promise that resolves after the message is sent.
     */ async openExtensionDetailsPage() {
        return this.sendMessage(MessageType.OpenExtensionDetailsPage);
    }
    /**
     * Sends a message to the background page to enable a filter by filter id.
     *
     * @param filterId Filter identifier.
     *
     * @returns Promise that resolves after the message is sent.
     */ async enableFilter(filterId) {
        return this.sendMessage(MessageType.AddAndEnableFilter, {
            filterId
        });
    }
    /**
     * Sends a message to the background page to disable a filter by filter id.
     *
     * @param filterId Filter identifier.
     *
     * @returns Promise that resolves after the message is sent.
     */ async disableFilter(filterId) {
        return this.sendMessage(MessageType.DisableFilter, {
            filterId
        });
    }
    /**
     * Sends a message to the background page to apply settings from a JSON object.
     *
     * @param json JSON object representing the settings to apply.
     *
     * @returns Promise that resolves after the message is sent.
     */ async applySettingsJson(json) {
        return this.sendMessage(MessageType.ApplySettingsJson, {
            json
        });
    }
    /**
     * Sends a message to the background page to open the filtering log.
     *
     * @returns Promise that resolves after the message is sent.
     */ async openFilteringLog() {
        return this.sendMessage(MessageType.OpenFilteringLog);
    }
    /**
     * Sends a message to the background page to reset the blocked ads statistics.
     *
     * @returns Promise that resolves after the message is sent.
     */ async resetStatistics() {
        return this.sendMessage(MessageType.ResetBlockedAdsCount);
    }
    /**
     * Sends a message to the background page to set the filtering log window state.
     *
     * @param windowState State of the filtering log window.
     *
     * @returns Promise that resolves after the message is sent.
     */ async setFilteringLogWindowState(windowState) {
        return this.sendMessage(MessageType.SetFilteringLogWindowState, {
            windowState
        });
    }
    /**
     * Sends a message to the background page to reset the settings.
     *
     * @returns Promise that resolves after the message is sent.
     */ async resetSettings() {
        return this.sendMessage(MessageType.ResetSettings);
    }
    /**
     * Sends a message to the background page to get the user rules.
     *
     * @returns Promise that resolves with the user rules.
     */ async getUserRules() {
        return this.sendMessage(MessageType.GetUserRules);
    }
    /**
     * Sends a message to the background page to save user rules.
     *
     * @param value User rules value to save.
     *
     * @returns Promise that resolves after the message is sent.
     */ async saveUserRules(value) {
        await this.sendMessage(MessageType.SaveUserRules, {
            value
        });
    }
    /**
     * Sends a message to the background page to open user rules editor in fullscreen.
     *
     * @returns Promise that resolves after the message is sent.
     */ async openFullscreenUserRules() {
        return this.sendMessage(MessageType.OpenFullscreenUserRules);
    }
    /**
     * Sends a message to the background page to get the allowlist domains.
     *
     * @returns Promise that resolves with the list of allowlist domains.
     */ async getAllowlist() {
        return this.sendMessage(MessageType.GetAllowlistDomains);
    }
    /**
     * Sends a message to the background page to save the allowlist domains.
     *
     * @param value Allowlist domains value to save.
     *
     * @returns Promise that resolves after the message is sent.
     */ async saveAllowlist(value) {
        await this.sendMessage(MessageType.SaveAllowlistDomains, {
            value
        });
    }
    /**
     * Sends a message to the background page to mark a notification as viewed.
     *
     * @param withDelay Whether the notification should be marked as viewed after a delay.
     *
     * @returns Promise that resolves after the message is sent.
     */ async setNotificationViewed(withDelay) {
        await this.sendMessage(MessageType.SetNotificationViewed, {
            withDelay
        });
    }
    /**
     * Sends a message to the background page to update filters.
     *
     * @returns Promise that resolves with the list of filters.
     */ async updateFiltersMV2() {
        if (true) {
            logger.warn('[ext.Messenger.updateFiltersMV2]: filters update is not supported in MV3');
            return [];
        }
        return this.sendMessage(MessageType.CheckFiltersUpdate);
    }
    /**
     * Sends a message to the background page to check for extension updates.
     */ async checkUpdatesMV3() {
        if (false) {}
        return this.sendMessage(MessageType.CheckExtensionUpdateMv3);
    }
    /**
     * Sends a message to the background page to update extension.
     */ async updateExtensionMV3({ from }) {
        if (false) {}
        return this.sendMessage(MessageType.UpdateExtensionMv3, {
            from
        });
    }
    /**
     * Sends a message to the background page to update the status of a filter group.
     *
     * @param id Group identifier.
     * @param enabled Whether the group should be enabled or disabled.
     *
     * @returns Promise that resolves after the message is sent.
     */ async updateGroupStatus(id, enabled) {
        const type = enabled ? MessageType.EnableFiltersGroup : MessageType.DisableFiltersGroup;
        const groupId = Number.parseInt(id, 10);
        return this.sendMessage(type, {
            groupId
        });
    }
    /**
     * Sends a message to the background page to set consented filters.
     *
     * @param filterIds List of filter identifiers.
     *
     * @returns Promise that resolves after the message is sent.
     */ async setConsentedFilters(filterIds) {
        return this.sendMessage(MessageType.SetConsentedFilters, {
            filterIds
        });
    }
    /**
     * Sends a message to the background page to check if a filter is consented.
     *
     * @param filterId Filter identifier.
     *
     * @returns Promise that resolves with the result of the check.
     */ async getIsConsentedFilter(filterId) {
        return this.sendMessage(MessageType.GetIsConsentedFilter, {
            filterId
        });
    }
    /**
     * Sends a message to the background page to check a custom filter URL.
     *
     * @param url Custom filter URL.
     *
     * @returns Promise that resolves with the result of the check.
     */ async checkCustomUrl(url) {
        return this.sendMessage(MessageType.LoadCustomFilterInfo, {
            url
        });
    }
    /**
     * Sends a message to the background page to add a custom filter.
     *
     * @param {CustomFilterSubscriptionData} filter Custom filter data.
     *
     * @returns {Promise<CustomFilterMetadata>} Custom filter metadata.
     */ async addCustomFilter(filter) {
        return this.sendMessage(MessageType.SubscribeToCustomFilter, {
            filter
        });
    }
    /**
     * Sends a message to the background page to remove a custom filter.
     *
     * @param filterId Custom filter ID.
     *
     * @returns Promise that resolves after the filter is removed.
     */ async removeCustomFilter(filterId) {
        await this.sendMessage(MessageType.RemoveAntiBannerFilter, {
            filterId
        });
    }
    /**
     * Sends a message to the background page to check if the application is initialized.
     *
     * @returns Promise that resolves to a boolean value:
     * true if the application is initialized, false otherwise.
     */ async getIsAppInitialized() {
        return this.sendMessage(MessageType.GetIsAppInitialized);
    }
    /**
     * Sends a message to the background to get the tab info for the popup.
     *
     * @param tabId Tab ID.
     *
     * @returns Promise that resolves with the tab info or undefined.
     */ async getTabInfoForPopup(tabId) {
        return this.sendMessage(MessageType.GetTabInfoForPopup, {
            tabId
        });
    }
    /**
     * Sends a message to the background page to change application filtering state.
     *
     * @param state Application filtering state.
     *
     * @returns Promise that resolves after the state is changed.
     */ async changeApplicationFilteringPaused(state) {
        return this.sendMessage(MessageType.ChangeApplicationFilteringPaused, {
            state
        });
    }
    /**
     * Sends a message to the background page to update the theme of the fullscreen user rules.
     *
     * @param theme Theme to set.
     *
     * @returns Promise that resolves after the theme is updated.
     */ async updateFullscreenUserRulesTheme(theme) {
        return this.sendMessage(MessageType.UpdateFullscreenUserRulesTheme, {
            theme
        });
    }
    /**
     * Sends a message to the background page to open the rules limits tab.
     *
     * @returns Promise that resolves after the tab is opened.
     */ async openRulesLimitsTab() {
        return this.sendMessage(MessageType.OpenRulesLimitsTab);
    }
    /**
     * Sends a message to the background page to open the settings tab.
     *
     * @returns Promise that resolves after the tab is opened.
     */ async openSettingsTab() {
        return this.sendMessage(MessageType.OpenSettingsTab);
    }
    /**
     * Sends a message to the background page to open the assistant.
     *
     * @returns Promise that resolves after the assistant is opened.
     */ async openAssistant() {
        return this.sendMessage(MessageType.OpenAssistant);
    }
    /**
     * Sends a message to the background page to open the abuse reporting tab for a site.
     *
     * @param url The URL of the site to report abuse for.
     * @param from The source of the request.
     *
     * @returns Promise that resolves after the tab is opened.
     */ async openAbuseSite(url, from) {
        return this.sendMessage(MessageType.OpenAbuseTab, {
            url,
            from
        });
    }
    /**
     * Sends a message to the background page to check site security.
     *
     * @param url The URL of the site to check.
     * @param from The source of the request.
     *
     * @returns Promise that resolves with the site security info.
     */ async checkSiteSecurity(url, from) {
        return this.sendMessage(MessageType.OpenSiteReportTab, {
            url,
            from
        });
    }
    /**
     * Sends a message to the background page to reset user rules for a specific page.
     *
     * @param url The URL of the page.
     *
     * @returns Promise that resolves after the user rules are reset.
     */ async resetUserRulesForPage(url) {
        const [currentTab] = await browser_polyfill_default().tabs.query({
            active: true,
            currentWindow: true
        });
        if (!(currentTab === null || currentTab === void 0 ? void 0 : currentTab.id)) {
            logger.warn('[ext.Messenger.resetUserRulesForPage]: cannot get current tab id');
            return;
        }
        return this.sendMessage(MessageType.ResetUserRulesForPage, {
            url,
            tabId: currentTab === null || currentTab === void 0 ? void 0 : currentTab.id
        });
    }
    /**
     * Sends a message to the background page to remove an allowlist domain.
     *
     * @param tabId The ID of the tab.
     * @param tabRefresh Whether the tab should be refreshed.
     *
     * @returns Promise that resolves after the domain is removed.
     */ async removeAllowlistDomain(tabId, tabRefresh) {
        return this.sendMessage(MessageType.RemoveAllowlistDomain, {
            tabId,
            tabRefresh
        });
    }
    /**
     * Sends a message to the background page to add an allowlist domain for a specific tab.
     *
     * @param tabId The ID of the tab.
     *
     * @returns Promise that resolves after the domain is added.
     */ async addAllowlistDomainForTabId(tabId) {
        return this.sendMessage(MessageType.AddAllowlistDomainForTabId, {
            tabId
        });
    }
    /**
     * Sends a message to the background page to add an allowlist domain for a specific URL.
     *
     * Please note that after adding an allowlist domain, the tab will not be reloaded,
     * it should be done separately later if needed.
     *
     * @param url The URL of the page.
     *
     * @returns Promise that resolves after the domain is added.
     */ async addAllowlistDomainForUrl(url) {
        return this.sendMessage(MessageType.AddAllowlistDomainForUrl, {
            url
        });
    }
    /**
     * Works only in MV2, since MV3 doesn't support filtering log yet.
     *
     * @returns Promise that resolves after the filtering log page is opened.
     */ async onOpenFilteringLogPage() {
        await this.sendMessage(MessageType.OnOpenFilteringLogPage);
    }
    /**
     * Sends a message to the background page to get filtering log data.
     *
     * @returns Promise that resolves with filtering log data.
     */ async getFilteringLogData() {
        return this.sendMessage(MessageType.GetFilteringLogData);
    }
    /**
     * Sends a message to the background page to close the filtering log page.
     *
     * @returns Promise that resolves after the page is closed.
     */ async onCloseFilteringLogPage() {
        await this.sendMessage(MessageType.OnCloseFilteringLogPage);
    }
    /**
     * Sends a message to the background page to get filtering info by tab ID.
     *
     * @param tabId The ID of the tab.
     *
     * @returns Promise that resolves with filtering info about the tab.
     */ async getFilteringInfoByTabId(tabId) {
        return this.sendMessage(MessageType.GetFilteringInfoByTabId, {
            tabId
        });
    }
    /**
     * Sends a message to the background page to synchronize the list of open tabs.
     *
     * @returns Promise that resolves with an array of filtering info about open tabs.
     */ async synchronizeOpenTabs() {
        return this.sendMessage(MessageType.SynchronizeOpenTabs);
    }
    /**
     * Sends a message to the background page to clear events by tab ID.
     *
     * @param tabId The ID of the tab.
     * @param ignorePreserveLog Optional flag to ignore the preserve log state.
     *
     * @returns Promise that resolves after the events are cleared.
     */ async clearEventsByTabId(tabId, ignorePreserveLog) {
        return this.sendMessage(MessageType.ClearEventsByTabId, {
            tabId,
            ignorePreserveLog
        });
    }
    /**
     * Sends a message to the background page to refresh the current page by tab ID.
     *
     * @param tabId The ID of the tab.
     *
     * @returns Promise that resolves after the page is refreshed.
     */ async refreshPage(tabId) {
        await this.sendMessage(MessageType.RefreshPage, {
            tabId
        });
    }
    /**
     * Sends a message to the background page to add a user rule.
     *
     * @param ruleText User rule text to be added.
     *
     * @returns Promise that resolves after the message is sent.
     */ async addUserRule(ruleText) {
        await this.sendMessage(MessageType.AddUserRule, {
            ruleText
        });
    }
    /**
     * Sends a message to the background page to remove a user rule.
     *
     * @param ruleText User rule text to be removed.
     *
     * @returns Promise that resolves after the message is sent.
     */ async removeUserRule(ruleText) {
        await this.sendMessage(MessageType.RemoveUserRule, {
            ruleText
        });
    }
    /**
     * Sends a message to the background page to set the preserve log state.
     *
     * @param state State indicating whether to preserve the log.
     *
     * @returns Promise that resolves after the message is sent.
     */ async setPreserveLogState(state) {
        return this.sendMessage(MessageType.SetPreserveLogState, {
            state
        });
    }
    /**
     * Sends a message to the background page to get the editor storage content.
     *
     * @returns Promise that resolves with the editor storage content.
     */ async getEditorStorageContent() {
        return this.sendMessage(MessageType.GetEditorStorageContent);
    }
    /**
     * Sends a message to the background page to set the editor storage content.
     *
     * @param content Content to be stored in the editor.
     *
     * @returns Promise that resolves after the message is sent.
     */ async setEditorStorageContent(content) {
        return this.sendMessage(MessageType.SetEditorStorageContent, {
            content
        });
    }
    /**
     * Sends a message to the background page to get the rules limits counters for MV3.
     *
     * @returns Promise that resolves with the rules limits counters for MV3.
     */ async getRulesLimitsCounters() {
        return this.sendMessage(MessageType.GetRulesLimitsCountersMv3);
    }
    /**
     * Sends a message to the background page to check if it is possible to enable a static filter.
     *
     * @param filterId Filter ID to check.
     *
     * @returns Promise that resolves with the result of the static filter check.
     *
     * @throws Error If the filter is not static.
     */ async canEnableStaticFilter(filterId) {
        return this.sendMessage(MessageType.CanEnableStaticFilterMv3, {
            filterId
        });
    }
    /**
     * Sends a message to the background page to check if all dynamic rules for a user rules' group can be enabled.
     *
     * @param groupId Group identifier to check.
     *
     * @returns Promise that resolves with the result of the static group check.
     */ async canEnableStaticGroup(groupId) {
        return this.sendMessage(MessageType.CanEnableStaticGroupMv3, {
            groupId
        });
    }
    /**
     * Sends a message to the background page to get the current static filters limits.
     *
     * @returns Promise that resolves with the current static filters limits.
     */ async getCurrentLimits() {
        return this.sendMessage(MessageType.CurrentLimitsMv3);
    }
    /**
     * Sends a message to the background page to check if the request filter is ready.
     *
     * @returns Promise that resolves to a boolean indicating if the request filter is ready.
     */ async checkRequestFilterReady() {
        return this.sendMessage(MessageType.CheckRequestFilterReady);
    }
    /**
     * Sends a message to the background page to add a URL to the trusted list.
     *
     * @param url URL to be added to the trusted list.
     *
     * @returns Promise that resolves after the message is sent.
     */ async addUrlToTrusted(url) {
        return this.sendMessage(MessageType.AddUrlToTrusted, {
            url
        });
    }
    /**
     * Sends a message to the background page to get user rules editor data.
     *
     * @returns Promise that resolves with the user rules editor data.
     */ async getUserRulesEditorData() {
        return this.sendMessage(MessageType.GetUserRulesEditorData);
    }
    /**
     * Sends a message to the background page to restore filters in MV3.
     *
     * @returns Promise that resolves after the message is sent.
     */ async restoreFiltersMv3() {
        return this.sendMessage(MessageType.RestoreFiltersMv3);
    }
    /**
     * Sends a message to the background page to clear the rules limits warning in MV3.
     *
     * @returns Promise that resolves after the message is sent.
     */ async clearRulesLimitsWarningMv3() {
        return this.sendMessage(MessageType.ClearRulesLimitsWarningMv3);
    }
    /**
     * Sends a message to the background page to get the allowlist domains.
     *
     * @returns Promise that resolves with the allowlist domains.
     */ async getAllowlistDomains() {
        return this.sendMessage(MessageType.GetAllowlistDomains);
    }
    /**
     * Sends a message to the background page to load the settings JSON.
     *
     * @returns Promise that resolves with the loaded settings JSON.
     */ async loadSettingsJson() {
        return this.sendMessage(MessageType.LoadSettingsJson);
    }
    /**
     * Sends a message to the background page to open the thank you page.
     *
     * @returns Promise that resolves after the message is sent.
     */ async openThankyouPage() {
        return this.sendMessage(MessageType.OpenThankyouPage);
    }
    /**
     * Sends a message to the background page to initialize the frame script.
     *
     * @returns Promise that resolves with the initialization data for the frame script.
     */ async initializeFrameScript() {
        return this.sendMessage(MessageType.InitializeFrameScript);
    }
    /**
     * Sends a message to the background page to initialize the blocking page script.
     *
     * @returns Promise that resolves with the initialization data for the blocking page script.
     */ async initializeBlockingPageScript() {
        return this.sendMessage(MessageType.InitializeBlockingPageScript);
    }
    /**
     * Sends a message to the background page to mark url as trusted and ignore
     * safebrowsing checks for it.
     *
     * @returns Promise that resolves with the initialization data for the frame script.
     */ async openSafebrowsingTrusted(url) {
        return this.sendMessage(MessageType.OpenSafebrowsingTrusted, {
            url
        });
    }
    /**
     * Creates an instance of the Messenger class.
     */ constructor(){
        messenger_define_property(this, "onMessage", (browser_polyfill_default()).runtime.onMessage);
        /**
     * Method subscribes to notifier module events.
     *
     * @param events List of events to which subscribe.
     * @param callback Callback called when event fires.
     * @param onUnloadCallback Callback used to remove listener on unload.
     *
     * @returns Function to remove listener on unload.
     */ messenger_define_property(this, "createEventListener", async (events, callback, onUnloadCallback)=>{
            let listenerId;
            const response = await this.sendMessage(MessageType.CreateEventListener, {
                events
            });
            listenerId = response.listenerId;
            const onUpdateListeners = async ()=>{
                const updatedResponse = await this.sendMessage(MessageType.CreateEventListener, {
                    events
                });
                listenerId = updatedResponse.listenerId;
            };
            const messageHandler = (message)=>{
                if (!messageHasTypeField(message)) {
                    logger.error('[ext.Messenger]: received message in Messenger.createEventListener has no type field:', message);
                    return undefined;
                }
                if (message.type === MessageType.NotifyListeners) {
                    if (!messageHasTypeAndDataFields(message)) {
                        logger.error('[ext.Messenger]: received message with type MessageType.NotifyListeners has no data:', message);
                        return undefined;
                    }
                    const castedMessage = message;
                    const [type, ...data] = castedMessage.data;
                    if (events.includes(type)) {
                        callback({
                            type,
                            data
                        });
                    }
                }
                if (message.type === MessageType.UpdateListeners) {
                    onUpdateListeners();
                }
            };
            const onUnload = ()=>{
                if (!listenerId) {
                    return;
                }
                browser_polyfill_default().runtime.onMessage.removeListener(messageHandler);
                window.removeEventListener('beforeunload', onUnload);
                window.removeEventListener('unload', onUnload);
                this.sendMessage(MessageType.RemoveListener, {
                    listenerId
                });
                listenerId = null;
                if (typeof onUnloadCallback === 'function') {
                    onUnloadCallback();
                }
            };
            browser_polyfill_default().runtime.onMessage.addListener(messageHandler);
            window.addEventListener('beforeunload', onUnload);
            window.addEventListener('unload', onUnload);
            return onUnload;
        });
        /**
     * Sends a message to the background page to send a telemetry page view event.
     *
     * @param screenName Screen name of the page.
     * @param pageId Page ID of the page.
     *
     * @returns Promise that resolves after the message is sent.
     */ messenger_define_property(this, "sendTelemetryPageViewEvent", async (screenName, pageId)=>{
            return this.sendMessage(MessageType.SendTelemetryPageViewEvent, {
                screenName,
                pageId
            });
        });
        /**
     * Sends a message to the background page to send a telemetry custom event.
     *
     * @param screenName Screen name of the page.
     * @param eventName Name of the event.
     *
     * @returns Promise that resolves after the message is sent.
     */ messenger_define_property(this, "sendTelemetryCustomEvent", async (screenName, eventName)=>{
            return this.sendMessage(MessageType.SendTelemetryCustomEvent, {
                screenName,
                eventName
            });
        });
        /**
     * Adds opened page to telemetry tracking.
     *
     * @returns Promise that resolves with the page ID.
     */ messenger_define_property(this, "addTelemetryOpenedPage", async ()=>{
            return this.sendMessage(MessageType.AddTelemetryOpenedPage);
        });
        /**
     * Removes opened page from telemetry tracking.
     *
     * @param pageId Page ID to remove.
     *
     * @returns Promise that resolves after the message is sent.
     */ messenger_define_property(this, "removeTelemetryOpenedPage", async (pageId)=>{
            return this.sendMessage(MessageType.RemoveTelemetryOpenedPage, {
                pageId
            });
        });
        this.resetUserRulesForPage = this.resetUserRulesForPage.bind(this);
        this.updateFiltersMV2 = this.updateFiltersMV2.bind(this);
        this.removeAllowlistDomain = this.removeAllowlistDomain.bind(this);
        this.addAllowlistDomainForTabId = this.addAllowlistDomainForTabId.bind(this);
        this.addAllowlistDomainForUrl = this.addAllowlistDomainForUrl.bind(this);
    }
}
/**
     * Creates long-lived connections between an extension page and the background page.
     *
     * @param page Page name.
     * @param events List of events to which subscribe.
     * @param callback Callback called when event fires.
     *
     * @returns Object with onUnload callback and portId.
     */ messenger_define_property(Messenger, "createLongLivedConnection", (page, events, callback)=>{
    let port;
    let forceDisconnected = false;
    const portId = `${page}_${nanoid()}`;
    const connect = ()=>{
        port = browser_polyfill_default().runtime.connect({
            name: portId
        });
        port.postMessage({
            type: MessageType.AddLongLivedConnection,
            data: {
                events
            }
        });
        port.onMessage.addListener((message)=>{
            if (!messageHasTypeField(message)) {
                logger.error('[ext.Messenger]: received message in Messenger.createLongLivedConnection has no type field:', message);
                return;
            }
            if (message.type === MessageType.NotifyListeners) {
                if (!messageHasTypeAndDataFields(message)) {
                    logger.error('[ext.Messenger]: received message with type MessageType.NotifyListeners has no data:', message);
                    return;
                }
                const castedMessage = message;
                const [type, ...data] = castedMessage.data;
                callback({
                    type,
                    data
                });
            }
        });
        port.onDisconnect.addListener(()=>{
            if ((browser_polyfill_default()).runtime.lastError) {
                logger.error('[ext.Messenger]: received error on disconnect:', (browser_polyfill_default()).runtime.lastError.message);
            }
            // we try to connect again if the background page was terminated
            if (!forceDisconnected) {
                connect();
            }
        });
    };
    connect();
    const onUnload = ()=>{
        if (port) {
            forceDisconnected = true;
            port.disconnect();
        }
    };
    window.addEventListener('beforeunload', onUnload);
    window.addEventListener('unload', onUnload);
    return {
        onUnload,
        portId
    };
});
const messenger = new Messenger();


;// ./Extension/src/pages/thankyou.ts
/**
 * Copyright (c) 2015-2025 Adguard Software Ltd.
 *
 * @file
 * This file is part of AdGuard Browser Extension (https://github.com/AdguardTeam/AdguardBrowserExtension).
 *
 * AdGuard Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * AdGuard Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with AdGuard Browser Extension. If not, see <http://www.gnu.org/licenses/>.
 */ 

const PageController = (response)=>{
    const { userSettings, enabledFilters, constants: { AntiBannerFiltersId } } = response;
    let safebrowsingEnabledCheckbox = null;
    let trackingFilterEnabledCheckbox = null;
    let socialFilterEnabledCheckbox = null;
    let sendStatsCheckbox = null;
    let allowAcceptableAdsCheckbox = null;
    let allowAnonymizedUsageDataCheckbox = null;
    const safebrowsingEnabledChange = (e)=>{
        const checkbox = e.currentTarget;
        messenger.changeUserSetting(userSettings.names.DisableSafebrowsing, !checkbox.checked);
    };
    const trackingFilterEnabledChange = (e)=>{
        const checkbox = e.currentTarget;
        if (checkbox.checked) {
            messenger.enableFilter(AntiBannerFiltersId.TrackingFilterId);
        } else {
            messenger.disableFilter(AntiBannerFiltersId.TrackingFilterId);
        }
    };
    const socialFilterEnabledChange = (e)=>{
        const checkbox = e.currentTarget;
        if (checkbox.checked) {
            messenger.enableFilter(AntiBannerFiltersId.SocialFilterId);
        } else {
            messenger.disableFilter(AntiBannerFiltersId.SocialFilterId);
        }
    };
    const sendStatsCheckboxChange = (e)=>{
        const checkbox = e.currentTarget;
        messenger.changeUserSetting(userSettings.names.DisableCollectHits, !checkbox.checked);
    };
    const allowAcceptableAdsChange = (e)=>{
        const checkbox = e.currentTarget;
        if (checkbox.checked) {
            messenger.enableFilter(AntiBannerFiltersId.SearchAndSelfPromoFilterId);
        } else {
            messenger.disableFilter(AntiBannerFiltersId.SearchAndSelfPromoFilterId);
        }
    };
    const allowAnonymizedUsageDataChange = (e)=>{
        const checkbox = e.currentTarget;
        messenger.changeUserSetting(userSettings.names.AllowAnonymizedUsageData, checkbox.checked);
    };
    const bindEvents = ()=>{
        safebrowsingEnabledCheckbox = document.getElementById('safebrowsingEnabledCheckbox');
        trackingFilterEnabledCheckbox = document.getElementById('trackingFilterEnabledCheckbox');
        socialFilterEnabledCheckbox = document.getElementById('socialFilterEnabledCheckbox');
        // sendSafebrowsingStatsCheckbox - id saved, because it should be changed on thankyou page
        sendStatsCheckbox = document.getElementById('sendSafebrowsingStatsCheckbox');
        allowAcceptableAdsCheckbox = document.getElementById('allowAcceptableAds');
        allowAnonymizedUsageDataCheckbox = document.getElementById('sendAnonymizedData');
        safebrowsingEnabledCheckbox === null || safebrowsingEnabledCheckbox === void 0 ? void 0 : safebrowsingEnabledCheckbox.addEventListener('change', safebrowsingEnabledChange);
        trackingFilterEnabledCheckbox === null || trackingFilterEnabledCheckbox === void 0 ? void 0 : trackingFilterEnabledCheckbox.addEventListener('change', trackingFilterEnabledChange);
        socialFilterEnabledCheckbox === null || socialFilterEnabledCheckbox === void 0 ? void 0 : socialFilterEnabledCheckbox.addEventListener('change', socialFilterEnabledChange);
        if (!UserAgent.isFirefox) {
            // ignore Firefox, see task AG-2322
            sendStatsCheckbox === null || sendStatsCheckbox === void 0 ? void 0 : sendStatsCheckbox.addEventListener('change', sendStatsCheckboxChange);
            // ignore Firefox, see task ADG-11023
            allowAnonymizedUsageDataCheckbox === null || allowAnonymizedUsageDataCheckbox === void 0 ? void 0 : allowAnonymizedUsageDataCheckbox.addEventListener('change', allowAnonymizedUsageDataChange);
        }
        allowAcceptableAdsCheckbox === null || allowAcceptableAdsCheckbox === void 0 ? void 0 : allowAcceptableAdsCheckbox.addEventListener('change', allowAcceptableAdsChange);
        const openExtensionStoreBtns = [].slice.call(document.querySelectorAll('.openExtensionStore'));
        openExtensionStoreBtns.forEach((openExtensionStoreBtn)=>{
            openExtensionStoreBtn.addEventListener('click', (e)=>{
                e.preventDefault();
                messenger.openExtensionStore();
            });
        });
        const openSettingsBtns = [].slice.call(document.querySelectorAll('.openSettings'));
        openSettingsBtns.forEach((openSettingsBtn)=>{
            openSettingsBtn.addEventListener('click', (e)=>{
                e.preventDefault();
                messenger.openSettingsTab();
            });
        });
    };
    const updateCheckbox = (checkbox, enabled)=>{
        if (!checkbox) {
            return;
        }
        if (enabled) {
            checkbox.setAttribute('checked', 'checked');
        } else {
            checkbox.removeAttribute('checked');
        }
    };
    const render = ()=>{
        const trackingFilterEnabled = AntiBannerFiltersId.TrackingFilterId in enabledFilters;
        const socialFilterEnabled = AntiBannerFiltersId.SocialFilterId in enabledFilters;
        const allowAcceptableAdsEnabled = AntiBannerFiltersId.SearchAndSelfPromoFilterId in enabledFilters;
        const collectHitsCount = !userSettings.values[userSettings.names.DisableCollectHits];
        const allowAnonymizedUsageData = userSettings.values[userSettings.names.AllowAnonymizedUsageData];
        if (false) {}
        updateCheckbox(trackingFilterEnabledCheckbox, trackingFilterEnabled);
        updateCheckbox(socialFilterEnabledCheckbox, socialFilterEnabled);
        updateCheckbox(allowAcceptableAdsCheckbox, allowAcceptableAdsEnabled);
        updateCheckbox(sendStatsCheckbox, collectHitsCount);
        updateCheckbox(allowAnonymizedUsageDataCheckbox, allowAnonymizedUsageData);
    };
    const init = ()=>{
        bindEvents();
        render();
    };
    return {
        init
    };
};
let timeoutId;
let counter = 0;
const MAX_WAIT_RETRY = 10;
const RETRY_TIMEOUT_MS = 100;
const init = async ()=>{
    if (typeof messenger === 'undefined') {
        if (counter > MAX_WAIT_RETRY) {
            window.clearTimeout(timeoutId);
            return;
        }
        timeoutId = window.setTimeout(init, RETRY_TIMEOUT_MS);
        counter += 1;
        return;
    }
    window.clearTimeout(timeoutId);
    const response = await messenger.initializeFrameScript();
    const controller = PageController(response);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ()=>{
            controller.init();
        });
    } else {
        controller.init();
    }
};
const thankyou = {
    init
};

;// ./Extension/pages/thankyou/index.js
/**
 * Copyright (c) 2015-2025 Adguard Software Ltd.
 *
 * @file
 * This file is part of AdGuard Browser Extension (https://github.com/AdguardTeam/AdguardBrowserExtension).
 *
 * AdGuard Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * AdGuard Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with AdGuard Browser Extension. If not, see <http://www.gnu.org/licenses/>.
 */ 
thankyou.init();

})();

/******/ })()
;