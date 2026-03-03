"use strict";
(self["webpackChunkbrowser_extension"] = self["webpackChunkbrowser_extension"] || []).push([[715],{

/***/ 33385:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59653);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39830);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".loader {\n    cursor: not-allowed;\n}\n\n    .loader__background {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background-color: rgba(0, 0, 0, 0.5);\n        display: flex;\n        justify-content: center;\n        align-items: center;\n    }\n\n    .loader__container {\n        background-color: var(--fills-backgrounds-page-background-default);\n        height: 88px;\n        min-width: 243px;\n        border-radius: 8px;\n    }\n\n    .loader__content {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        padding: 32px;\n    }\n\n    .loader__text {\n        font-size: 16px;\n        line-height: 24px;\n        color: var(--text-description-description-default);\n        padding-left: 16px;\n    }\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 15510:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59653);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39830);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".checkbox {\n    position: relative;\n    height: 100%;\n}\n\n    .checkbox__in {\n        position: absolute;\n        right: 14px;\n        top: -3px;\n        height: 20px;\n        width: 40px;\n        overflow: hidden;\n        clip: rect(1px, 1px, 1px, 1px);\n    }\n\n    .checkbox__in:focus-visible + .checkbox__label:after {\n            outline: 2px solid var(--outline);\n        }\n\n    .checkbox__in:checked + .checkbox__label:after {\n                background-color: var(--stroke-icons-product-icon-default);\n            }\n\n    .checkbox__in:checked + .checkbox__label:before {\n                transform: translate(22px, 2px);\n            }\n\n    @media (min-width: 640px) {\n\n    .checkbox__in:checked + .checkbox__label:before {\n                    transform: translate(38px, 18px)\n            }\n                }\n\n    .checkbox__label {\n        cursor: pointer;\n        display: flex;\n        align-items: flex-start;\n        justify-content: flex-end;\n        position: relative;\n        width: 40px;\n        height: 20px;\n        font-size: 0;\n        border-radius: 8px;\n        transition: 0.3s ease background-color;\n    }\n\n    @media (min-width: 640px) {\n\n    .checkbox__label {\n            width: 72px;\n            height: 100%;\n            padding: 0 16px\n    }\n        }\n\n    .checkbox__label:hover {\n            background-color: var(--fills-backgrounds-page-background-hovered);\n        }\n\n    .checkbox__label--actions:hover {\n                background-color: transparent !important;\n            }\n\n    .checkbox__label:before {\n            content: \"\";\n            position: absolute;\n            top: 0;\n            left: 0;\n            transform: translate(2px, 2px);\n            z-index: 1;\n            width: 16px;\n            height: 16px;\n            border-radius: 50%;\n            background-color: var(--gray-0);\n            transition: var(--t3) transform;\n        }\n\n    @media (min-width: 640px) {\n\n    .checkbox__label:before {\n                top: -16px;\n                transform: translate(18px, 18px)\n        }\n            }\n\n    .checkbox__label:after {\n            content: \"\";\n            font-size: 0;\n            display: block;\n            width: 40px;\n            height: 20px;\n            border-radius: 10px;\n            background-color: var(--fills-switch-dns-adg-switch-off-default);\n            cursor: pointer;\n        }\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 47422:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59653);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39830);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".popover {\n    display: inline-block;\n}\n\n    .popover--coming-soon {\n        cursor: help;\n        display: flex;\n    }\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 606:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59653);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39830);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".tooltip {\n    white-space: nowrap;\n    visibility: hidden;\n    opacity: 0;\n    padding: 8px 16px;\n    color: var(--text-main-text-main-default);\n    background-color: var(--fills-menus-dropdown-menu-background-default);\n    font-size: 12px;\n    line-height: 130%;\n    box-shadow: var(--small-light-shadow-br);\n    border-radius: 4px;\n}\n\n    .tooltip--fixed-width {\n        white-space: break-spaces;\n        width: -moz-max-content;\n        width: max-content;\n        max-width: 188px;\n    }\n\n    .tooltip--on {\n        visibility: visible;\n        opacity: 1;\n    }\n\n    .tooltip--off {\n        visibility: hidden;\n        opacity: 0;\n    }\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 98481:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59653);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39830);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".button {\n    cursor: pointer;\n    text-decoration: none;\n    text-align: center;\n    display: inline-block;\n    border: 0;\n    background-color: transparent;\n    padding: 0;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n    .button--l {\n        font-size: 16px;\n        font-weight: 600;\n        line-height: 24px;\n        padding: 16px;\n        border-radius: 8px;\n        max-height: 56px;\n    }\n\n    @media (max-width: 640px) {\n\n    .button--l {\n            max-width: 100%\n    }\n        }\n\n    .button:disabled {\n        opacity: 0.5;\n        cursor: default;\n        /*\n         * Do not add \"pointer-events: none;\" to disabled buttons,\n         * otherwise button title will not be displayed on hover\n         * if button text is too long\n         */\n    }\n\n    .button--green-bg {\n        color: var(--text-buttons-primary-default);\n        background-color: var(--fills-buttons-main-button-default);\n        transition: 0.3s ease background-color;\n    }\n\n    .button--green-bg:hover {\n            background-color: var(--fills-buttons-main-button-hovered);\n        }\n\n    .button--green-bg:hover:disabled {\n                background-color: var(--fills-buttons-main-button-default);\n            }\n\n    .button--red-bg {\n        color: var(--text-buttons-primary-default);\n        background-color: var(--fills-buttons-danger-button-default);\n        transition: 0.3s ease background-color;\n    }\n\n    .button--red-bg:hover {\n            background-color: var(--fills-buttons-danger-button-hovered);\n        }\n\n    .button--transparent {\n        box-shadow: 0 0 0 1px var(--stroke-buttons-secondary-default);\n        color: var(--text-main-text-main-default);\n        background-color: transparent;\n        transition: var(--t3) box-shadow, var(--t3) color;\n    }\n\n    .button--transparent:hover {\n            box-shadow: 0 0 0 1px var(--gray-50);\n            color: var(--gray-50);\n        }\n\n    .button--transparent:hover:disabled {\n                box-shadow: 0 0 0 1px var(--stroke-buttons-secondary-default);\n                color: var(--text-main-text-main-default);\n            }\n\n    .button--link {\n        overflow: visible;\n        font-size: inherit;\n        line-height: inherit;\n    }\n\n    .button--link--green {\n            color: var(--text-links-link-default);\n        }\n\n    .button--link--green:hover {\n                color: var(--text-links-link-hovered);\n            }\n\n    .button--link--red {\n            color: var(--text-links-error-link-default);\n        }\n\n    .button--link--red:hover {\n                color: var(--text-links-error-link-hovered);\n            }\n\n    .button--link--underlined {\n            text-decoration: underline;\n        }\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 41506:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59653);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39830);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n    font-family: 'Roboto Flex';\n    src: url('../../../../assets/fonts/Roboto-Flex-Regular.woff2') format('woff2 supports variations'),\n       url('../../../../assets/fonts/Roboto-Flex-Regular.woff2') format('woff2-variations');\n    font-weight: 100 1000;\n    font-stretch: 25% 151%;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 90018:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59653);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39830);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".icon {\n    /* 'display' property for 'icon' class should be set in specific page style files */\n}\n\n    .icon--48 {\n        width: 48px;\n        height: 48px;\n    }\n\n    .icon--24 {\n        width: 24px;\n        height: 24px;\n    }\n\n    .icon--18 {\n        width: 18px;\n        height: 18px;\n    }\n\n    .icon--logo {\n        width: 104px;\n        height: 24px;\n        color: var(--fills-logo-key-color-default);\n    }\n\n    .icon--select {\n        width: 14px;\n        height: 8px;\n    }\n\n    @media (max-width: 640px) {\n\n    .icon--select {\n            width: 10px;\n            height: 6px\n    }\n        }\n\n    .icon--gray-default {\n        color: var(--stroke-icons-gray-icons-default);\n    }\n\n    .icon--green-default {\n        color: var(--stroke-icons-product-icon-default);\n    }\n\n    .icon--red-default {\n        color: var(--stroke-icons-error-icon-default);\n    }\n\n    .icon--loading {\n        pointer-events: none;\n        animation: loader-spin 1s infinite linear;\n        animation-fill-mode: forwards;\n    }\n\n    @keyframes loader-spin {\n        from {\n            -webkit-transform: rotate(0deg);\n        }\n        to {\n            -webkit-transform: rotate(360deg);\n        }\n    }\n\n.logo {\n    width: 104px;\n    height: 24px;\n    background-image: url(\"../../../assets/images/logo.svg\");\n    background-repeat: no-repeat;\n    background-size: contain;\n    display: inline-block;\n    vertical-align: middle;\n}\n\n@media (prefers-color-scheme: dark) {\n\n.logo {\n        background-image: url(\"../../../assets/images/logo-dark.svg\")\n}\n    }\n\n.light-mode .logo {\n        background-image: url(\"../../../assets/images/logo.svg\");\n    }\n\n.dark-mode .logo {\n        background-image: url(\"../../../assets/images/logo-dark.svg\");\n    }\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 18040:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59653);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39830);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n    /* Other variables */\n    --popup-width: 320px;\n    --popup-height: 600px;\n    --popup-default-height: 600px; /* Size of popup in desktop browsers */\n    --t3: 0.3s ease;\n\n    /* z-index */\n    /* 4 reserved by Ace Editor */\n    --z-idx-options-sidebar: 5;\n    --z-idx-options-skip-to-content: 6;\n    --z-idx-options-notifications: 10;\n    --z-idx-options-modals: 11;\n\n    /* Shadows */\n    --shadow-color: rgba(0, 0, 0, 0.1);\n    --small-light-shadow-br: 4px 4px 8px 0px var(--shadow-color);\n    --big-light-shadow-br: 8px 8px 24px 0px var(--shadow-color);\n    --big-light-shadow-tr: -8px 8px 24px 0px var(--shadow-color);\n\n    /* Base colors */\n\n    /* Product Primary */\n    --product-primary-0: #f7fbf8;\n    --product-primary-10: #e4f1e7;\n    --product-primary-20: #bbddc3;\n    --product-primary-30: #94c9a1;\n    --product-primary-40: #76be87;\n    --product-primary-50: #67b279;\n    --product-primary-60: #589968;\n    --product-primary-70: #487c54;\n    --product-primary-80: #3d6947;\n    --product-primary-90: #315439;\n    --product-primary-100: #243e2a;\n    --product-tertiary-50: #7884cb;\n\n    /* Gray */\n    --gray-0: #ffffff;\n    --gray-10: #f6f6f6;\n    --gray-20: #e4e4e4;\n    --gray-30: #d2d2d2;\n    --gray-40: #c0c0c0;\n    --gray-50: #a4a4a4;\n    --gray-60: #7f7f7f;\n    --gray-70: #5b5b5b;\n    --gray-80: #3d3d3d;\n    --gray-90: #1f1f1f;\n    --gray-100: #000000;\n\n    /* Red */\n    --red-0: #fff9f7;\n    --red-10: #feeae3;\n    --red-20: #fccab9;\n    --red-30: #faa98f;\n    --red-40: #f78560;\n    --red-50: #f67247;\n    --red-60: #df6740;\n    --red-70: #b55434;\n    --red-80: #99472c;\n    --red-90: #7b3923;\n    --red-100: #5b2a1a;\n\n    /* Orange */\n    --orange-0: #fdf9f3;\n    --orange-10: #f9ecd8;\n    --orange-20: #efd19e;\n    --orange-30: #e6b564;\n    --orange-40: #db9726;\n    --orange-50: #d58500;\n    --orange-60: #c47a00;\n    --orange-70: #a06400;\n    --orange-80: #875400;\n    --orange-90: #6c4300;\n    --orange-100: #503200;\n\n    /* Context colors */\n\n    /* vars that DO NOT change depend on the mode — same for light and dark mode */\n    --fills-buttons-danger-button-default: var(--red-50);\n    --fills-buttons-danger-button-hovered: var(--red-60);\n    --fills-buttons-danger-button-pressed: var(--red-70);\n    --fills-buttons-main-button-default: var(--product-primary-50);\n    --fills-buttons-main-button-hovered: var(--product-primary-60);\n    --fills-buttons-main-button-pressed: var(--product-primary-70);\n    --fills-logo-white-color-default: var(--gray-0);\n    --fills-snacks-mobile-snacks-default: var(--gray-100);\n    --fills-backgrounds-dialog-background-default: var(--gray-100);\n    --stroke-dividers-item-divider-green-default: var(--product-primary-50);\n    --stroke-dividers-item-divider-orange-default: var(--orange-50);\n    --stroke-buttons-secondary-green-default: var(--product-primary-50);\n    --stroke-buttons-secondary-red-default: var(--red-50);\n    --stroke-icons-attention-icon-default: var(--orange-50);\n    --stroke-icons-black-icons-disabled: var(--gray-50);\n    --stroke-icons-error-icon-default: var(--red-50);\n    --stroke-icons-error-icon-hovered: var(--red-60);\n    --stroke-icons-error-icon-pressed: var(--red-70);\n    --stroke-icons-product-icon-default: var(--product-primary-50);\n    --stroke-icons-product-icon-hovered: var(--product-primary-60);\n    --stroke-icons-product-icon-pressed: var(--product-primary-70);\n    --stroke-icons-product-tertiary-icon-default: var(--product-tertiary-50);\n    --stroke-inputs-error-input-stroke-default: var(--red-50);\n    --stroke-inputs-active-input-stroke-default: var(--gray-50);\n    --text-buttons-primary-default: var(--gray-0);\n    --text-buttons-secondary-green-default: var(--product-primary-50);\n    --text-buttons-secondary-red-default: var(--red-50);\n    --text-links-attention-link-default: var(--orange-50);\n    --text-links-error-link-default: var(--red-50);\n    --text-links-error-link-hovered: var(--red-60);\n    --text-links-link-default: var(--product-primary-50);\n    --text-links-link-hovered: var(--product-primary-60);\n\n    /* vars that DO NOT change depend on the mode — same for light and dark mode (not specified in design) */\n    --editor-comment: #338033;\n    --editor-highlight: #ffff00;\n\n    /* vars that change depend on the mode */\n    --fills-backgrounds-cards-background-default: var(--gray-0);\n    --fills-backgrounds-page-background-default: var(--gray-0);\n    --fills-backgrounds-page-background-hovered: var(--gray-10);\n    --fills-backgrounds-page-background-pressed: var(--gray-20);\n    --fills-backgrounds-page-background-additional-default: var(--gray-10);\n    --fills-backgrounds-page-background-additional-hovered: var(--gray-20);\n    --fills-backgrounds-recent-activity-request-allowlisted-default: var(--product-primary-10);\n    --fills-backgrounds-recent-activity-request-allowlisted-hovered: var(--product-primary-20);\n    --fills-backgrounds-recent-activity-request-allowlisted-pressed: var(--product-primary-30);\n    --fills-backgrounds-recent-activity-request-blocked-default: var(--red-10);\n    --fills-backgrounds-recent-activity-request-blocked-hovered: var(--red-20);\n    --fills-backgrounds-recent-activity-request-blocked-pressed: var(--red-30);\n    --fills-backgrounds-recent-activity-request-changed-default: var(--orange-10);\n    --fills-backgrounds-recent-activity-request-changed-hovered: var(--orange-20);\n    --fills-backgrounds-recent-activity-request-changed-pressed: var(--orange-30);\n    --fills-buttons-main-button-default-inactive: var(--gray-50);\n    --fills-inputs-input-background-default: var(--gray-10);\n    --fills-inputs-input-background-disabled: var(--gray-10);\n    --fills-logo-key-color-default: var(--gray-90);\n    --fills-menus-dropdown-menu-background-default: var(--gray-0);\n    --fills-menus-dropdown-menu-background-hovered: var(--gray-10);\n    --fills-menus-dropdown-menu-background-pressed: var(--gray-20);\n    --fills-switch-dns-adg-switch-off-default: var(--gray-40);\n    --stroke-buttons-secondary-default: var(--gray-80);\n    --stroke-dividers-item-divider-default: var(--gray-30);\n    --stroke-icons-gray-icons-default: var(--gray-60);\n    --stroke-icons-gray-icons-disabled: var(--gray-30);\n    --stroke-inputs-inactive-input-stroke-disabled: var(--gray-20);\n    --stroke-inputs-inactive-input-stroke-default: var(--gray-30);\n    --text-description-description-default: var(--gray-70);\n    --text-lables-labels-default: var(--gray-70);\n    --text-main-text-main-default: var(--gray-80);\n    --text-placeholder-placeholder-disabled: var(--gray-40);\n\n    /* vars that change depend on the mode (not specified in design) */\n    --outline: #005ecc;\n    --editor-selection: #b5d5ff;\n    --editor-syntax-blue: #4141e2;\n    --editor-syntax-yellow: #795e26;\n    --editor-syntax-pink: #9e45b4;\n    --editor-syntax-red: #a31515;\n    --scrollbar-track: rgba(246, 246, 246, 0.3); /* gray-10 with opacity 0.3 */\n    --scrollbar-thumb: var(--gray-30);\n}\n\n    @media (prefers-color-scheme: dark) {:root {\n        --fills-backgrounds-cards-background-default: var(--gray-80);\n        --fills-backgrounds-page-background-default: var(--gray-90);\n        --fills-backgrounds-page-background-hovered: var(--gray-80);\n        --fills-backgrounds-page-background-pressed: var(--gray-70);\n        --fills-backgrounds-page-background-additional-default: var(--gray-80);\n        --fills-backgrounds-page-background-additional-hovered: var(--gray-70);\n        --fills-backgrounds-recent-activity-request-allowlisted-default: var(--product-primary-100);\n        --fills-backgrounds-recent-activity-request-allowlisted-hovered: var(--product-primary-90);\n        --fills-backgrounds-recent-activity-request-allowlisted-pressed: var(--product-primary-80);\n        --fills-backgrounds-recent-activity-request-blocked-default: var(--red-100);\n        --fills-backgrounds-recent-activity-request-blocked-hovered: var(--red-90);\n        --fills-backgrounds-recent-activity-request-blocked-pressed: var(--red-80);\n        --fills-backgrounds-recent-activity-request-changed-default: var(--orange-100);\n        --fills-backgrounds-recent-activity-request-changed-hovered: var(--orange-90);\n        --fills-backgrounds-recent-activity-request-changed-pressed: var(--orange-80);\n        --fills-buttons-main-button-default-inactive: var(--gray-60);\n        --fills-inputs-input-background-default: var(--gray-80);\n        --fills-inputs-input-background-disabled: var(--gray-80);\n        --fills-logo-key-color-default: var(--gray-10);\n        --fills-menus-dropdown-menu-background-default: var(--gray-80);\n        --fills-menus-dropdown-menu-background-hovered: var(--gray-70);\n        --fills-menus-dropdown-menu-background-pressed: var(--gray-60);\n        --fills-switch-dns-adg-switch-off-default: var(--gray-70);\n        --stroke-buttons-secondary-default: var(--gray-20);\n        --stroke-dividers-item-divider-default: var(--gray-70);\n        --stroke-icons-gray-icons-default: var(--gray-40);\n        --stroke-icons-gray-icons-disabled: var(--gray-70);\n        --stroke-inputs-inactive-input-stroke-disabled: var(--gray-80);\n        --stroke-inputs-inactive-input-stroke-default: var(--gray-70);\n        --text-description-description-default: var(--gray-30);\n        --text-lables-labels-default: var(--gray-30);\n        --text-main-text-main-default: var(--gray-20);\n        --text-placeholder-placeholder-disabled: var(--gray-60);\n\n        /* This colors not specified in design */\n        --outline: #99c9ff;\n        --editor-selection: #556a86;\n        --editor-syntax-blue: #4093d6;\n        --editor-syntax-yellow: #dbdb84;\n        --editor-syntax-pink: #c46cbd;\n        --editor-syntax-red: #cf8263;\n        --scrollbar-track: rgba(61, 61, 61, 0.3); /* gray-80 with opacity 0.3 */\n        --scrollbar-thumb: var(--gray-70)\n}\n    }\n\n.dark-mode {\n    --fills-backgrounds-cards-background-default: var(--gray-80);\n    --fills-backgrounds-page-background-default: var(--gray-90);\n    --fills-backgrounds-page-background-hovered: var(--gray-80);\n    --fills-backgrounds-page-background-pressed: var(--gray-70);\n    --fills-backgrounds-page-background-additional-default: var(--gray-80);\n    --fills-backgrounds-page-background-additional-hovered: var(--gray-70);\n    --fills-backgrounds-recent-activity-request-allowlisted-default: var(--product-primary-100);\n    --fills-backgrounds-recent-activity-request-allowlisted-hovered: var(--product-primary-90);\n    --fills-backgrounds-recent-activity-request-allowlisted-pressed: var(--product-primary-80);\n    --fills-backgrounds-recent-activity-request-blocked-default: var(--red-100);\n    --fills-backgrounds-recent-activity-request-blocked-hovered: var(--red-90);\n    --fills-backgrounds-recent-activity-request-blocked-pressed: var(--red-80);\n    --fills-backgrounds-recent-activity-request-changed-default: var(--orange-100);\n    --fills-backgrounds-recent-activity-request-changed-hovered: var(--orange-90);\n    --fills-backgrounds-recent-activity-request-changed-pressed: var(--orange-80);\n    --fills-buttons-main-button-default-inactive: var(--gray-60);\n    --fills-inputs-input-background-default: var(--gray-80);\n    --fills-inputs-input-background-disabled: var(--gray-80);\n    --fills-logo-key-color-default: var(--gray-10);\n    --fills-menus-dropdown-menu-background-default: var(--gray-80);\n    --fills-menus-dropdown-menu-background-hovered: var(--gray-70);\n    --fills-menus-dropdown-menu-background-pressed: var(--gray-60);\n    --fills-switch-dns-adg-switch-off-default: var(--gray-70);\n    --stroke-buttons-secondary-default: var(--gray-20);\n    --stroke-dividers-item-divider-default: var(--gray-70);\n    --stroke-icons-gray-icons-default: var(--gray-40);\n    --stroke-icons-gray-icons-disabled: var(--gray-70);\n    --stroke-inputs-inactive-input-stroke-disabled: var(--gray-80);\n    --stroke-inputs-inactive-input-stroke-default: var(--gray-70);\n    --text-description-description-default: var(--gray-30);\n    --text-lables-labels-default: var(--gray-30);\n    --text-main-text-main-default: var(--gray-20);\n    --text-placeholder-placeholder-disabled: var(--gray-60);\n\n    /* This colors not specified in design */\n    --outline: #99c9ff;\n    --editor-selection: #556a86;\n    --editor-syntax-blue: #4093d6;\n    --editor-syntax-yellow: #dbdb84;\n    --editor-syntax-pink: #c46cbd;\n    --editor-syntax-red: #cf8263;\n    --scrollbar-track: rgba(61, 61, 61, 0.3); /* gray-80 with opacity 0.3 */\n    --scrollbar-thumb: var(--gray-70);\n}\n\n.light-mode {\n    --fills-backgrounds-cards-background-default: var(--gray-0);\n    --fills-backgrounds-page-background-default: var(--gray-0);\n    --fills-backgrounds-page-background-hovered: var(--gray-10);\n    --fills-backgrounds-page-background-pressed: var(--gray-20);\n    --fills-backgrounds-page-background-additional-default: var(--gray-10);\n    --fills-backgrounds-page-background-additional-hovered: var(--gray-20);\n    --fills-backgrounds-recent-activity-request-allowlisted-default: var(--product-primary-10);\n    --fills-backgrounds-recent-activity-request-allowlisted-hovered: var(--product-primary-20);\n    --fills-backgrounds-recent-activity-request-allowlisted-pressed: var(--product-primary-30);\n    --fills-backgrounds-recent-activity-request-blocked-default: var(--red-10);\n    --fills-backgrounds-recent-activity-request-blocked-hovered: var(--red-20);\n    --fills-backgrounds-recent-activity-request-blocked-pressed: var(--red-30);\n    --fills-backgrounds-recent-activity-request-changed-default: var(--orange-10);\n    --fills-backgrounds-recent-activity-request-changed-hovered: var(--orange-20);\n    --fills-backgrounds-recent-activity-request-changed-pressed: var(--orange-30);\n    --fills-buttons-main-button-default-inactive: var(--gray-50);\n    --fills-inputs-input-background-default: var(--gray-10);\n    --fills-inputs-input-background-disabled: var(--gray-10);\n    --fills-logo-key-color-default: var(--gray-90);\n    --fills-menus-dropdown-menu-background-default: var(--gray-0);\n    --fills-menus-dropdown-menu-background-hovered: var(--gray-10);\n    --fills-menus-dropdown-menu-background-pressed: var(--gray-20);\n    --fills-switch-dns-adg-switch-off-default: var(--gray-40);\n    --stroke-buttons-secondary-default: var(--gray-80);\n    --stroke-dividers-item-divider-default: var(--gray-30);\n    --stroke-icons-gray-icons-default: var(--gray-60);\n    --stroke-icons-gray-icons-disabled: var(--gray-30);\n    --stroke-inputs-inactive-input-stroke-disabled: var(--gray-20);\n    --stroke-inputs-inactive-input-stroke-default: var(--gray-30);\n    --text-description-description-default: var(--gray-70);\n    --text-lables-labels-default: var(--gray-70);\n    --text-main-text-main-default: var(--gray-80);\n    --text-placeholder-placeholder-disabled: var(--gray-40);\n\n    /* This colors not specified in design */\n    --outline: #005ecc;\n    --editor-selection: #b5d5ff;\n    --editor-syntax-blue: #4141e2;\n    --editor-syntax-yellow: #795e26;\n    --editor-syntax-pink: #9e45b4;\n    --editor-syntax-red: #a31515;\n    --scrollbar-track: rgba(246, 246, 246, 0.3); /* gray-10 with opacity 0.3 */\n    --scrollbar-thumb: var(--gray-30);\n}\n\n.android {\n    /* In android browsers popup size is dynamic, so we need to adjust its size */\n    --popup-width: 100%;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 29016:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59653);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39830);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@keyframes notify-show {\n    0% {\n        transform: translateY(-100%);\n        opacity: 0;\n    }\n\n    100% {\n        transform: translateY(0);\n        opacity: 1;\n    }\n}\n\n@keyframes notify-hide {\n    0% {\n        transform: translateY(0);\n        opacity: 1;\n    }\n\n    100% {\n        transform: translateY(100%);\n        opacity: 0;\n    }\n}\n\n.notifications {\n    position: fixed;\n    z-index: var(--z-idx-options-notifications);\n    bottom: 68px;\n    right: 22px;\n}\n\n.notification {\n    padding: 12px;\n    max-width: 360px;\n    display: flex;\n    align-items: flex-start;\n    border-radius: 4px;\n    background-color: var(--fills-snacks-mobile-snacks-default);\n    color: var(--text-buttons-primary-default);\n    animation: notify-show 0.3s ease-in;\n}\n\n.notification--error > svg {\n        color: var(--stroke-icons-error-icon-default);\n    }\n\n.notification--success > svg {\n        color: var(--stroke-icons-product-icon-default);\n    }\n\n.notification--close {\n        animation: notify-hide 1s ease-out;\n    }\n\n.notification__content,\n    .notification__content button {\n        font-size: 16px;\n        font-weight: 400;\n        line-height: 1.3;\n        text-align: left;\n    }\n\n.notification__content {\n        padding: 0 12px;\n        width: 100%;\n    }\n\n.notification__content p {\n            margin: 0;\n            word-break: break-word;\n        }\n\n.notification__content button {\n            padding: 0;\n            margin-top: 8px;\n            color: var(--text-links-link-default);\n            background: transparent;\n            border: none;\n            cursor: pointer;\n        }\n\n.notification__btn-close {\n        cursor: pointer;\n        padding: 0;\n        background: transparent;\n        outline: none;\n        border: none;\n    }\n\n.notification + .notification {\n    margin-top: 16px;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 33814:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59653);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39830);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".editor__label {\n    position: absolute;\n    top: -24px;\n    left: 0;\n    right: 0;\n    max-width: 200px;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-weight: 300;\n    font-size: 12px;\n    line-height: 22px;\n}\n\n    @media (max-width: 500px) {.editor__label {\n        right: 0;\n        padding-left: 12px\n}\n    }\n\n    .editor__label .editor__icon {\n        display: none;\n        position: absolute;\n        right: 0;\n        top: 2px;\n    }\n\n    .editor__label--saved {\n        padding-right: 20px;\n    }\n\n    .editor__label--saved .editor__icon {\n            display: block;\n        }\n\n.editor__open {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    text-align: center;\n    padding: 125px 16px;\n    border-radius: 8px;\n    background: var(--fills-backgrounds-page-background-additional-default);\n}\n\n.editor__open-text {\n        line-height: 1.3;\n    }\n\n.editor__open-title {\n        font-weight: 600;\n        margin-bottom: 4px;\n    }\n\n.editor__open-subtitle {\n        font-size: 14px;\n        color:  ;\n        color: var(--text-description-description-default,);\n    }\n\n.editor__open .button {\n        margin-top: 24px;\n        padding: 16px 48px;\n    }\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 56717:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59653);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39830);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".button--s {\n        font-size: 16px;\n        line-height: 22px;\n        padding: 5px 28px;\n        border-radius: 4px;\n        max-height: 32px;\n    }\n\n    .button--m {\n        font-size: 16px;\n        line-height: 24px;\n        padding: 12px 24px;\n        border-radius: 8px;\n        max-height: 56px;\n    }\n\n    .button--add-custom-filter {\n        margin: 16px;\n        min-width: 222px;\n    }\n\n    .button--empty-custom-filter {\n        display: block;\n        margin: 0 auto;\n        min-width: 222px;\n    }\n\n    .button--compare {\n        width: 100%;\n        padding: 12px 24px;\n        word-break: break-word;\n    }\n\n    .button__img {\n        margin-right: 7px;\n    }\n\n    .button__label {\n        line-height: 26px;\n        max-height: 26px;\n        overflow: hidden;\n    }\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 36268:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59653);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39830);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n    box-sizing: border-box;\n}\n\n:root {\n    color-scheme: light dark;\n}\n\nhtml,\n.root {\n    height: 100%;\n}\n\nbody {\n    font-family: 'Roboto Flex', 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Ubuntu, Arial, sans-serif;\n    font-optical-sizing: none;\n    margin: 0;\n    height: 100%;\n    font-size: 16px;\n    color: var(--text-main-text-main-default);\n    background-color: var(--fills-backgrounds-page-background-default);\n}\n\n.options {\n    overflow-y: scroll;\n}\n\nh2,\nh3 {\n    margin: 0;\n    font-size: inherit;\n}\n\na:focus-visible {\n        outline: 2px solid var(--outline);\n    }\n\nbutton,\ninput,\ntextarea,\nselect {\n    font-family: inherit;\n}\n\nbutton:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible {\n        outline: 2px solid var(--outline);\n    }\n\n/* custom checkbox */\nlabel.checkbox-label {\n    cursor: pointer;\n    color: var(--text-main-text-main-default);\n    display: flex;\n    align-items: center;\n    flex-shrink: 0;\n}\nlabel.checkbox-label input[type=\"checkbox\"] {\n        display: none;\n    }\nlabel.checkbox-label input[type=\"checkbox\"]:checked + .custom-checkbox {\n                background-color: var(--stroke-icons-product-icon-default);\n                border-color: var(--stroke-icons-product-icon-default);\n            }\nlabel.checkbox-label input[type=\"checkbox\"]:checked + .custom-checkbox .icon {\n                    display: block;\n                }\nlabel.checkbox-label .custom-checkbox {\n        min-width: 20px;\n        width: 20px;\n        height: 20px;\n        background-color: transparent;\n        border: 2px solid var(--stroke-icons-gray-icons-default);\n        border-radius: 2px;\n        margin-right: 12px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n        font-size: 16px;\n        line-height: 24px;\n    }\nlabel.checkbox-label .custom-checkbox .icon {\n            display: none;\n        }\n\n.inner {\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: space-between;\n}\n\n.content {\n    position: relative;\n    padding: 40px 16px;\n    width: 100%;\n    max-width: 100%;\n}\n\n@media (min-width: 640px) {\n\n.content {\n        max-width: 672px\n}\n    }\n\n.content__btn {\n        margin-left: 15px;\n    }\n\n.skip-to-content-btn {\n    z-index: var(--z-idx-options-skip-to-content);\n    position: fixed;\n    top: 8px;\n    left: 8px;\n    pointer-events: none;\n    opacity: 0;\n}\n\n.skip-to-content-btn:focus-visible {\n        pointer-events: auto;\n        opacity: 1;\n    }\n\n.wrapper {\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n}\n\n.page {\n    flex: 1 0 auto;\n    display: flex;\n}\n\n.links-menu {\n    flex-direction: column;\n    align-items: flex-start;\n    display: flex;\n}\n\n.links-menu--section {\n        margin-left: 16px;\n    }\n\n.links-menu button {\n        background: none;\n        border: none;\n        padding: 0;\n    }\n\n.links-menu a {\n        text-decoration: none;\n    }\n\n.links-menu__item {\n        margin: 16px 0;\n        font-size: 16px;\n        line-height: 21px;\n        font-weight: 600;\n        cursor: pointer;\n    }\n\n.footer {\n    width: 100%;\n    flex: 0 0 auto;\n}\n\n.disabled {\n    opacity: .5;\n    pointer-events: none;\n    cursor: help;\n}\n\n.title {\n    color: var(--text-main-text-main-default);\n    font-size: 24px;\n    font-weight: 700;\n    padding: 0;\n    padding-right: 8px;\n    margin-top: -5px;\n    line-height: 1.2;\n}\n\n.title__container {\n        position: relative;\n        display: flex;\n        justify-content: space-between;\n        padding: 32px 16px 16px;\n    }\n\n.title__container--sub > .title__inner {\n            padding-top: 0;\n        }\n\n.title__container--control {\n            border-radius: 8px;\n            cursor: pointer;\n            transition: var(--t3) background-color;\n        }\n\n.title__container--control .checkbox__label:hover {\n                background-color: transparent;\n            }\n\n@media (min-width: 1024px) {\n\n.title__container--control:hover {\n                    background-color: var(--fills-backgrounds-page-background-hovered)\n            }\n                }\n\n.title__container--reversed {\n            flex-direction: row-reverse;\n        }\n\n@media (min-width: 640px) {\n\n.title {\n        padding-right: 16px\n}\n\n        .title__container {\n            padding: 16px 0 16px 16px;\n        }\n\n            .title__container--small {\n                padding: 16px;\n            }\n\n            .title__container--back {\n                padding: 0 16px 16px 16px;\n            }\n\n                .title__container--back .title__inner {\n                    padding-top: 16px;\n                }\n\n                .title__container--back .checkbox__in {\n                    /* 16px (label padding) - 3px (default margin) */\n                    top: 13px;\n                }\n\n                .title__container--back .checkbox__label {\n                    padding: 16px;\n                }\n\n                    .title__container--back .checkbox__label:before {\n                        top: 0;\n                    }\n\n            .title__container--sub > .title__inner {\n                padding-top: 0;\n            }\n\n            .title__container--about {\n                padding: 16px 0 16px 16px;\n            }\n\n            .title__container--custom {\n              padding-bottom: 9px;\n            }\n    }\n\n.title__desc {\n        font-size: 16px;\n        font-weight: 400;\n        line-height: 1.3;\n        padding-top: 12px;\n        color: var(--text-description-description-default);\n    }\n\n.title__desc--back {\n            cursor: pointer;\n        }\n\n.title--back-btn {\n        background-color: transparent;\n        border: 0;\n        cursor: pointer;\n    }\n\n.title--sub {\n        font-size: 20px;\n        padding-top: 32px;\n    }\n\n.subtitle {\n    padding: 0 15px;\n    color: var(--text-description-description-default);\n    font-size: 20px;\n    font-weight: normal;\n    line-height: 28px;\n    margin: 0 0 8px;\n}\n\n.desc {\n    font-size: 16px;\n    margin-bottom: 20px;\n    color: var(--text-description-description-default);\n    line-height: 22px;\n    padding-left: 15px;\n}\n\n.desc--link {\n        color: var(--text-links-link-default);\n    }\n\n.settings__group--disabled {\n        opacity: 0.5;\n        pointer-events: none;\n    }\n\n.settings__group__links {\n        display: flex;\n        flex-direction: row;\n        padding: 8px 16px 24px;\n    }\n\n.settings__group__links--custom {\n          padding-bottom: 8px;\n        }\n\n.link_with_icon {\n    margin-right: 32px;\n}\n\n.link_with_icon:last-child {\n        margin-right: 0;\n    }\n\n.link_with_icon__link {\n        text-decoration: none;\n    }\n\n.link_with_icon__text {\n        color: var(--text-main-text-main-default);\n        font-size: 14px;\n        font-weight: 600;\n        margin-left: 12px;\n    }\n\n.actions {\n    padding: 32px 0 32px 16px;\n    display: inline-block;\n    align-items: center;\n}\n\n.actions--grid {\n        display: grid;\n        grid-gap: 16px;\n    }\n\n.actions--buttons {\n        grid-template-columns: 1fr 1fr 1fr;\n    }\n\n.actions--icons {\n        grid-template-columns: 1fr 1fr;\n    }\n\n.actions--allowlist {\n        width: 618px;\n    }\n\n@media (max-width: 640px) {\n\n.actions--allowlist {\n            width: 100%\n    }\n        }\n\n.actions--user-rules {\n        grid-gap: 32px;\n        grid-template-columns: 504px 64px;\n    }\n\n@media (max-width: 640px) {\n\n.actions--user-rules {\n            width: 100%;\n            grid-template-columns: 6fr 1fr\n    }\n        }\n\n.actions--fullscreen-user-rules {\n        grid-template-columns: 6fr 6fr 1fr;\n        padding: 28px 40px;\n    }\n\n@media (max-width: 640px) {\n\n.actions--fullscreen-user-rules {\n            grid-template-columns: 1fr 6fr 1fr\n    }\n        }\n\n.actions__saving {\n        position: relative;\n    }\n\n.actions__btn {\n        position: relative;\n    }\n\n.actions__btn--icon {\n            background-color: transparent;\n            border: 0;\n            padding: 0;\n            cursor: pointer;\n            width: auto;\n        }\n\n.actions__btn--icon:hover {\n                background-color: var(--fills-backgrounds-page-background-hovered);\n            }\n\n.actions__btn--active .icon {\n                background-color: var(--fills-backgrounds-page-background-pressed);\n            }\n\n.actions__btn--saving {\n            width: 100%;\n        }\n\n.actions__input-file {\n        display: none;\n    }\n\n.actions__label {\n        cursor: pointer;\n        display: flex;\n        justify-content: flex-start;\n        align-content: center;\n        min-height: 40px;\n        width: -moz-fit-content;\n        width: fit-content;\n    }\n\n.actions__title {\n        display: none;\n        font-weight: 700;\n        font-size: 24px;\n        line-height: 28px;\n        margin: auto 8px auto 0;\n    }\n\n@media (min-width: 640px) {\n\n.actions__title {\n            display: block\n    }\n        }\n\n.actions__control {\n        margin: auto 0;\n    }\n\nselect:focus {\n    outline: none;\n}\n\n.ReactModal__Overlay {\n    z-index: var(--z-idx-options-modals);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: rgba(0, 0, 0, 0.5)!important;\n}\n\n.ReactModal__Content--after-open {\n    position: static!important;\n    min-width: 300px;\n    background-color: var(--fills-backgrounds-page-background-default)!important;\n    border: none !important;\n}\n\n.ReactModal__Content--after-open:has(.modal--scrollable) {\n        height: 100%;\n    }\n\n@media (min-height: 1090px) {\n\n.ReactModal__Content--after-open:has(.modal--scrollable) {\n            height: auto\n    }\n        }\n\n@media (min-width: 640px) {\n\n.ReactModal__Content--after-open {\n        width: 600px\n}\n\n        .ReactModal__Content--after-open:has(.modal--scrollable) {\n            max-height: 80%;\n        }\n    }\n\n.ace_content {\n    color: var(--text-main-text-main-default)!important;\n    background-color: var(--fills-backgrounds-page-background-default)!important;\n}\n\n\n.light-mode {\n    color-scheme: light;\n}\n\n.dark-mode {\n    color-scheme: dark;\n}\n\n.sr-only {\n    position: absolute;\n    width: 1px;\n    height: 1px;\n    padding: 0;\n    margin: -1px;\n    overflow: hidden;\n    clip: rect(0, 0, 0, 0);\n    white-space: nowrap;\n    border-width: 0;\n}\n\n.warning {\n    color: var(--text-links-attention-link-default);\n    line-height: 1.3;\n}\n\n.warning a {\n        color: var(--text-links-attention-link-default);\n    }\n\n.section-warning {\n    font-size: 16px;\n    padding: 4px 16px 16px;\n}\n\n.section-warning--link {\n        margin-left: 4px;\n    }\n\n.custom-group-warning {\n    font-size: 14px;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 11436:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59653);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39830);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".modal {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    max-height: 100%;\n    padding: 0;\n    max-width: 600px;\n    min-width: 330px;\n    overflow-y: auto;\n    background-color: var(--fills-backgrounds-page-background-default);\n}\n\n    .modal__header {\n        display: flex;\n        justify-content: space-between;\n        align-items: flex-start;\n        width: 100%;\n    }\n\n    .modal__title {\n        font-size: 24px;\n        line-height: 28px;\n        font-weight: 700;\n        margin-bottom: 12px;\n        width: 100%;\n    }\n\n    .modal__subtitle {\n        font-size: 16px;\n        line-height: 24px;\n        font-weight: 400;\n        width: 100%;\n    }\n\n    .modal__subtitle--one-line {\n            text-overflow: ellipsis;\n            overflow: hidden;\n            white-space: nowrap;\n        }\n\n    .modal__close {\n        margin-top: -18px;\n        margin-right: -18px;\n    }\n\n    .modal__close .icon {\n            width: 24px;\n            height: 24px;\n            color: var(--stroke-icons-gray-icons-default);\n        }\n\n    .modal__content {\n        width: 100%;\n        padding: 32px 32px 0;\n        overflow-x: hidden;\n\n        background:\n            /* shadow cover bottom */\n            linear-gradient(\n                rgba(255, 255, 255, 0),\n                var(--fills-backgrounds-page-background-default) 50%\n            ) center bottom,\n\n            /* shadow bottom */\n            linear-gradient(\n                rgba(0, 0, 0, 0),\n                rgba(0, 0, 0, 0.1)\n            ) center bottom;\n\n        background-repeat: no-repeat;\n        background-size: 100% 24px, 100% 16px;\n        background-attachment: local, scroll;\n    }\n\n    .modal--scrollable {\n        overflow-y: hidden;\n    }\n\n    /* show scrollbar only for scrollable content. AG-34984 */\n\n    .modal--scrollable .modal__content {\n            overflow-y: auto;\n            scrollbar-width: thin;\n            scrollbar-color: var(--stroke-inputs-inactive-input-stroke-default) var(--fills-backgrounds-page-background-default);\n        }\n\n    .modal--scrollable .modal__subtitle {\n            margin-bottom: 12px;\n        }\n\n    .modal__actions {\n        width: 100%;\n        padding: 24px 32px 32px;\n        display: flex;\n        align-items: center;\n    }\n\n    .modal__actions--centered {\n            width: 100%;\n            justify-content: center;\n        }\n\n    .modal__desc {\n        font-size: 14px;\n        line-height: 22px;\n    }\n\n    .modal__btn {\n        width: 50%;\n        max-width: 300px;\n        margin: 0 24px 0 0;\n    }\n\n    .modal__btn--confirm {\n            min-width: 100px;\n        }\n\n    .modal__btn:last-child {\n            margin-right: 0;\n        }\n\n    .modal__filter {\n        font-size: 16px;\n        line-height: 24px;\n    }\n\n    .modal__filter--info {\n            font-size: 16px;\n            line-height: 24px;\n            padding: 20px 0 24px;\n        }\n\n    .modal__filter--info-item {\n                margin-right: 4px;\n            }\n\n    .modal__filter--info-item--url {\n                    color: var(--text-main-text-main-default);\n                    word-break: break-all;\n                }\n\n    .modal__filter--trusted label.checkbox-label:focus-within {\n                    outline: 2px solid var(--outline);\n                }\n\n    .modal__filter--trusted label.checkbox-label input[type=\"checkbox\"] {\n                    display: block;\n                }\n\n    .modal__filter--trusted-desc {\n                color: var(--text-description-description-default);\n                font-size: 14px;\n                line-height: 18px;\n                padding-left: 32px;\n            }\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 79009:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59653);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39830);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".setting {\n    display: flex;\n    justify-content: space-between;\n    align-items: initial;\n    position: relative;\n    padding: 16px;\n    min-height: 52px;\n}\n\n    .setting.group {\n        padding: 16px;\n    }\n\n    @media (min-width: 640px) {\n\n    .setting.group {\n            justify-content: flex-start;\n            padding: 0 16px 0 0\n    }\n        }\n\n    .setting--disabled .input__in {\n            pointer-events: none;\n            cursor: default;\n            opacity: 0.5;\n        }\n\n    .setting__area {\n        display: flex;\n        width: 80%;\n        border: 0;\n        border-radius: 8px;\n        padding: 2px 6px;\n        cursor: pointer;\n        outline: none;\n        text-align: left;\n        background-color: transparent;\n        transition: 0.3s ease background-color;\n    }\n\n    @media (min-width: 640px) {\n\n    .setting__area {\n            padding: 16px 0 16px 16px\n    }\n\n            .setting__area_group {\n                flex-grow: 1;\n                border-radius: 8px;\n            }\n        }\n\n    @media (min-width: 640px) {\n\n    .setting__area__custom-group-warning {\n                padding: 16px\n        }\n            }\n\n    .setting__area__custom-group-warning:hover {\n                cursor: default;\n            }\n\n    .setting__area:hover {\n            background-color: var(--fills-backgrounds-page-background-hovered);\n        }\n\n    .setting__inline-control {\n        margin-left: 16px;\n        height: auto;\n    }\n\n    @media (min-width: 640px) {\n            .setting__inline-control_group {\n                margin-left: 0;\n            }\n\n                .setting__inline-control_group .checkbox__in {\n                    /* 16px (label padding) - 3px (default margin) */\n                    top: 13px;\n                }\n\n                .setting__inline-control_group .checkbox__label {\n                    padding: 16px;\n                }\n\n                    .setting__inline-control_group .checkbox__label:before {\n                        top: 0;\n                    }\n        }\n\n    .setting__container {\n        display: flex;\n    }\n\n    .setting__container--vertical {\n            flex-direction: column;\n            width: 100%;\n        }\n\n    .setting__container--horizontal {\n            flex-direction: row;\n            justify-content: space-between;\n            width: 100%;\n        }\n\n    .setting__container--inline {\n            display: block;\n        }\n\n    .setting--reversed .setting__container--horizontal {\n            flex-direction: row-reverse;\n        }\n\n    .setting__info {\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n        max-width: 530px;\n    }\n\n    @media (max-width: 640px) {\n\n    .setting__info {\n            min-width: 40%\n    }\n        }\n\n    .setting__info__custom-group-warning {\n            width: 100%;\n            padding-right: 32px;\n        }\n\n    .setting__title {\n        font-weight: 500;\n        font-size: 16px;\n        color: var(--text-main-text-main-default);\n        line-height: 24px;\n        word-break: break-word;\n    }\n\n    .setting__title--search {\n            line-height: 24px;\n        }\n\n    .setting__desc {\n        color: var(--text-description-description-default);\n        font-size: 14px;\n        line-height: 1.3;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        word-break: break-word;\n    }\n\n    .setting__desc a {\n            color: var(--text-links-link-default);\n            text-decoration: underline;\n        }\n\n    .setting__desc a:focus-visible {\n                outline: none;\n                box-shadow: inset 0 0 0 1px var(--outline);\n            }\n\n    .setting__desc-item {\n        margin-bottom: 13px;\n    }\n\n    .setting__desc-item:last-child {\n            margin-bottom: 0;\n        }\n\n    /* TODO: check if used, and remove if not */\n\n    .setting__tags {\n        display: flex;\n        font-size: 13px;\n        flex-wrap: wrap;\n    }\n\n    .setting__icon {\n        color: var(--stroke-icons-product-icon-default);\n        margin-right: 20px;\n    }\n\n    .setting__back {\n        color: var(--stroke-icons-gray-icons-default);\n        position: absolute;\n        padding-top: 14px;\n        left: -18px;\n        top: 33px;\n    }\n\n    @media (min-width: 640px) {\n\n    .setting__back {\n            top: 0\n    }\n        }\n\n    .setting__alert-desc,\n    .setting__alert-link {\n        color: var(--text-links-error-link-default);\n    }\n\n    .setting__checkbox {\n        display: none;\n    }\n\n.setting-checkbox {\n    display: block;\n    border-radius: 8px;\n    cursor: pointer;\n    transition: var(--t3) background-color;\n    width: 100%;\n}\n\n.setting-checkbox--button {\n        background-color: transparent;\n        border: 0;\n        text-align: left;\n        padding: 0;\n        width: 100%;\n    }\n\n.setting-checkbox.disabled {\n        opacity: .5;\n        pointer-events: none;\n    }\n\n.setting-checkbox:hover {\n        background-color: var(--fills-backgrounds-page-background-hovered);\n    }\n\n.setting-checkbox .checkbox__label:hover {\n        background-color: transparent;\n    }\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 23567:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59653);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39830);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_common_styles_fonts_pcss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(41506);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_common_styles_vars_pcss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18040);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_common_styles_icons_pcss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(90018);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_common_styles_buttons_pcss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(98481);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_common_pcss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(36268);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_button_pcss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(56717);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_setting_pcss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(79009);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_modal_pcss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(11436);
// Imports










var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_common_styles_fonts_pcss__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A);
___CSS_LOADER_EXPORT___.i(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_common_styles_vars_pcss__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A);
___CSS_LOADER_EXPORT___.i(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_common_styles_icons_pcss__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A);
___CSS_LOADER_EXPORT___.i(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_common_styles_buttons_pcss__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A);
___CSS_LOADER_EXPORT___.i(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_common_pcss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A);
___CSS_LOADER_EXPORT___.i(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_button_pcss__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A);
___CSS_LOADER_EXPORT___.i(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_setting_pcss__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A);
___CSS_LOADER_EXPORT___.i(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_modal_pcss__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 84246:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  PA: () => (/* binding */ mobxreact_esm_observer)
});

// UNUSED EXPORTS: MobXProviderContext, Observer, PropTypes, Provider, disposeOnUnmount, enableStaticRendering, inject, isUsingStaticRendering, observerBatching, useAsObservableSource, useLocalObservable, useLocalStore, useObserver, useStaticRendering

// EXTERNAL MODULE: ./node_modules/.pnpm/mobx@6.9.0/node_modules/mobx/dist/mobx.esm.js
var mobx_esm = __webpack_require__(47938);
// EXTERNAL MODULE: ./node_modules/.pnpm/react@17.0.2/node_modules/react/index.js
var react = __webpack_require__(91445);
;// ./node_modules/.pnpm/mobx-react-lite@3.4.3_mobx@6.9.0_react-dom@17.0.2_react@17.0.2__react@17.0.2/node_modules/mobx-react-lite/es/utils/assertEnvironment.js


if (!react.useState) {
    throw new Error("mobx-react-lite requires React with Hooks support");
}
if (!mobx_esm/* makeObservable */.Gn) {
    throw new Error("mobx-react-lite@3 requires mobx at least version 6 to be available");
}

// EXTERNAL MODULE: ./node_modules/.pnpm/react-dom@17.0.2_react@17.0.2/node_modules/react-dom/index.js
var react_dom = __webpack_require__(55101);
;// ./node_modules/.pnpm/mobx-react-lite@3.4.3_mobx@6.9.0_react-dom@17.0.2_react@17.0.2__react@17.0.2/node_modules/mobx-react-lite/es/utils/reactBatchedUpdates.js


;// ./node_modules/.pnpm/mobx-react-lite@3.4.3_mobx@6.9.0_react-dom@17.0.2_react@17.0.2__react@17.0.2/node_modules/mobx-react-lite/es/utils/observerBatching.js

function defaultNoopBatch(callback) {
    callback();
}
function observerBatching(reactionScheduler) {
    if (!reactionScheduler) {
        reactionScheduler = defaultNoopBatch;
        if (false) {}
    }
    (0,mobx_esm/* configure */.jK)({ reactionScheduler: reactionScheduler });
}
var isObserverBatched = function () {
    if (false) {}
    return true;
};

;// ./node_modules/.pnpm/mobx-react-lite@3.4.3_mobx@6.9.0_react-dom@17.0.2_react@17.0.2__react@17.0.2/node_modules/mobx-react-lite/es/utils/printDebugValue.js

function printDebugValue(v) {
    return (0,mobx_esm/* getDependencyTree */.yl)(v);
}

;// ./node_modules/.pnpm/mobx-react-lite@3.4.3_mobx@6.9.0_react-dom@17.0.2_react@17.0.2__react@17.0.2/node_modules/mobx-react-lite/es/utils/UniversalFinalizationRegistry.js
var REGISTRY_FINALIZE_AFTER = 10000;
var REGISTRY_SWEEP_INTERVAL = 10000;
var TimerBasedFinalizationRegistry = /** @class */ (function () {
    function TimerBasedFinalizationRegistry(finalize) {
        var _this = this;
        Object.defineProperty(this, "finalize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: finalize
        });
        Object.defineProperty(this, "registrations", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "sweepTimeout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // Bound so it can be used directly as setTimeout callback.
        Object.defineProperty(this, "sweep", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: function (maxAge) {
                if (maxAge === void 0) { maxAge = REGISTRY_FINALIZE_AFTER; }
                // cancel timeout so we can force sweep anytime
                clearTimeout(_this.sweepTimeout);
                _this.sweepTimeout = undefined;
                var now = Date.now();
                _this.registrations.forEach(function (registration, token) {
                    if (now - registration.registeredAt >= maxAge) {
                        _this.finalize(registration.value);
                        _this.registrations.delete(token);
                    }
                });
                if (_this.registrations.size > 0) {
                    _this.scheduleSweep();
                }
            }
        });
        // Bound so it can be exported directly as clearTimers test utility.
        Object.defineProperty(this, "finalizeAllImmediately", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: function () {
                _this.sweep(0);
            }
        });
    }
    // Token is actually required with this impl
    Object.defineProperty(TimerBasedFinalizationRegistry.prototype, "register", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (target, value, token) {
            this.registrations.set(token, {
                value: value,
                registeredAt: Date.now()
            });
            this.scheduleSweep();
        }
    });
    Object.defineProperty(TimerBasedFinalizationRegistry.prototype, "unregister", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (token) {
            this.registrations.delete(token);
        }
    });
    Object.defineProperty(TimerBasedFinalizationRegistry.prototype, "scheduleSweep", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            if (this.sweepTimeout === undefined) {
                this.sweepTimeout = setTimeout(this.sweep, REGISTRY_SWEEP_INTERVAL);
            }
        }
    });
    return TimerBasedFinalizationRegistry;
}());

var UniversalFinalizationRegistry = typeof FinalizationRegistry !== "undefined"
    ? FinalizationRegistry
    : TimerBasedFinalizationRegistry;

;// ./node_modules/.pnpm/mobx-react-lite@3.4.3_mobx@6.9.0_react-dom@17.0.2_react@17.0.2__react@17.0.2/node_modules/mobx-react-lite/es/utils/observerFinalizationRegistry.js

var observerFinalizationRegistry = new UniversalFinalizationRegistry(function (adm) {
    var _a;
    (_a = adm.reaction) === null || _a === void 0 ? void 0 : _a.dispose();
    adm.reaction = null;
});

;// ./node_modules/.pnpm/mobx-react-lite@3.4.3_mobx@6.9.0_react-dom@17.0.2_react@17.0.2__react@17.0.2/node_modules/mobx-react-lite/es/staticRendering.js
var globalIsUsingStaticRendering = false;
function staticRendering_enableStaticRendering(enable) {
    globalIsUsingStaticRendering = enable;
}
function isUsingStaticRendering() {
    return globalIsUsingStaticRendering;
}

;// ./node_modules/.pnpm/mobx-react-lite@3.4.3_mobx@6.9.0_react-dom@17.0.2_react@17.0.2__react@17.0.2/node_modules/mobx-react-lite/es/useObserver.js
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};





function observerComponentNameFor(baseComponentName) {
    return "observer".concat(baseComponentName);
}
/**
 * We use class to make it easier to detect in heap snapshots by name
 */
var ObjectToBeRetainedByReact = /** @class */ (function () {
    function ObjectToBeRetainedByReact() {
    }
    return ObjectToBeRetainedByReact;
}());
function objectToBeRetainedByReactFactory() {
    return new ObjectToBeRetainedByReact();
}
function useObserver(fn, baseComponentName) {
    if (baseComponentName === void 0) { baseComponentName = "observed"; }
    if (isUsingStaticRendering()) {
        return fn();
    }
    var _a = __read(react.useState(objectToBeRetainedByReactFactory), 1), objectRetainedByReact = _a[0];
    // Force update, see #2982
    var _b = __read(react.useState(), 2), setState = _b[1];
    var forceUpdate = function () { return setState([]); };
    // StrictMode/ConcurrentMode/Suspense may mean that our component is
    // rendered and abandoned multiple times, so we need to track leaked
    // Reactions.
    var admRef = react.useRef(null);
    if (!admRef.current) {
        // First render
        admRef.current = {
            reaction: null,
            mounted: false,
            changedBeforeMount: false
        };
    }
    var adm = admRef.current;
    if (!adm.reaction) {
        // First render or component was not committed and reaction was disposed by registry
        adm.reaction = new mobx_esm/* Reaction */.qT(observerComponentNameFor(baseComponentName), function () {
            // Observable has changed, meaning we want to re-render
            // BUT if we're a component that hasn't yet got to the useEffect()
            // stage, we might be a component that _started_ to render, but
            // got dropped, and we don't want to make state changes then.
            // (It triggers warnings in StrictMode, for a start.)
            if (adm.mounted) {
                // We have reached useEffect(), so we're mounted, and can trigger an update
                forceUpdate();
            }
            else {
                // We haven't yet reached useEffect(), so we'll need to trigger a re-render
                // when (and if) useEffect() arrives.
                adm.changedBeforeMount = true;
            }
        });
        observerFinalizationRegistry.register(objectRetainedByReact, adm, adm);
    }
    react.useDebugValue(adm.reaction, printDebugValue);
    react.useEffect(function () {
        observerFinalizationRegistry.unregister(adm);
        adm.mounted = true;
        if (adm.reaction) {
            if (adm.changedBeforeMount) {
                // Got a change before mount, force an update
                adm.changedBeforeMount = false;
                forceUpdate();
            }
        }
        else {
            // The reaction we set up in our render has been disposed.
            // This can be due to bad timings of renderings, e.g. our
            // component was paused for a _very_ long time, and our
            // reaction got cleaned up
            // Re-create the reaction
            adm.reaction = new mobx_esm/* Reaction */.qT(observerComponentNameFor(baseComponentName), function () {
                // We've definitely already been mounted at this point
                forceUpdate();
            });
            forceUpdate();
        }
        return function () {
            adm.reaction.dispose();
            adm.reaction = null;
            adm.mounted = false;
            adm.changedBeforeMount = false;
        };
    }, []);
    // render the original component, but have the
    // reaction track the observables, so that rendering
    // can be invalidated (see above) once a dependency changes
    var rendering;
    var exception;
    adm.reaction.track(function () {
        try {
            rendering = fn();
        }
        catch (e) {
            exception = e;
        }
    });
    if (exception) {
        throw exception; // re-throw any exceptions caught during rendering
    }
    return rendering;
}

;// ./node_modules/.pnpm/mobx-react-lite@3.4.3_mobx@6.9.0_react-dom@17.0.2_react@17.0.2__react@17.0.2/node_modules/mobx-react-lite/es/observer.js



var warnObserverOptionsDeprecated = true;
var hasSymbol = typeof Symbol === "function" && Symbol.for;
// Using react-is had some issues (and operates on elements, not on types), see #608 / #609
var ReactForwardRefSymbol = hasSymbol
    ? Symbol.for("react.forward_ref")
    : typeof react.forwardRef === "function" && (0,react.forwardRef)(function (props) { return null; })["$$typeof"];
var ReactMemoSymbol = hasSymbol
    ? Symbol.for("react.memo")
    : typeof react.memo === "function" && (0,react.memo)(function (props) { return null; })["$$typeof"];
// n.b. base case is not used for actual typings or exported in the typing files
function observer(baseComponent, 
// TODO remove in next major
options) {
    var _a;
    if (false) {}
    if (ReactMemoSymbol && baseComponent["$$typeof"] === ReactMemoSymbol) {
        throw new Error("[mobx-react-lite] You are trying to use `observer` on a function component wrapped in either another `observer` or `React.memo`. The observer already applies 'React.memo' for you.");
    }
    // The working of observer is explained step by step in this talk: https://www.youtube.com/watch?v=cPF4iBedoF0&feature=youtu.be&t=1307
    if (isUsingStaticRendering()) {
        return baseComponent;
    }
    var useForwardRef = (_a = options === null || options === void 0 ? void 0 : options.forwardRef) !== null && _a !== void 0 ? _a : false;
    var render = baseComponent;
    var baseComponentName = baseComponent.displayName || baseComponent.name;
    // If already wrapped with forwardRef, unwrap,
    // so we can patch render and apply memo
    if (ReactForwardRefSymbol && baseComponent["$$typeof"] === ReactForwardRefSymbol) {
        useForwardRef = true;
        render = baseComponent["render"];
        if (typeof render !== "function") {
            throw new Error("[mobx-react-lite] `render` property of ForwardRef was not a function");
        }
    }
    var observerComponent = function (props, ref) {
        return useObserver(function () { return render(props, ref); }, baseComponentName);
    };
    // Don't set `displayName` for anonymous components,
    // so the `displayName` can be customized by user, see #3192.
    if (baseComponentName !== "") {
        ;
        observerComponent.displayName = baseComponentName;
    }
    // Support legacy context: `contextTypes` must be applied before `memo`
    if (baseComponent.contextTypes) {
        ;
        observerComponent.contextTypes = baseComponent.contextTypes;
    }
    if (useForwardRef) {
        // `forwardRef` must be applied prior `memo`
        // `forwardRef(observer(cmp))` throws:
        // "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))"
        observerComponent = (0,react.forwardRef)(observerComponent);
    }
    // memo; we are not interested in deep updates
    // in props; we assume that if deep objects are changed,
    // this is in observables, which would have been tracked anyway
    observerComponent = (0,react.memo)(observerComponent);
    copyStaticProperties(baseComponent, observerComponent);
    if (false) {}
    return observerComponent;
}
// based on https://github.com/mridgway/hoist-non-react-statics/blob/master/src/index.js
var hoistBlackList = {
    $$typeof: true,
    render: true,
    compare: true,
    type: true,
    // Don't redefine `displayName`,
    // it's defined as getter-setter pair on `memo` (see #3192).
    displayName: true
};
function copyStaticProperties(base, target) {
    Object.keys(base).forEach(function (key) {
        if (!hoistBlackList[key]) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(base, key));
        }
    });
}

;// ./node_modules/.pnpm/mobx-react-lite@3.4.3_mobx@6.9.0_react-dom@17.0.2_react@17.0.2__react@17.0.2/node_modules/mobx-react-lite/es/ObserverComponent.js

function ObserverComponent(_a) {
    var children = _a.children, render = _a.render;
    var component = children || render;
    if (typeof component !== "function") {
        return null;
    }
    return useObserver(component);
}
if (false) {}
ObserverComponent.displayName = "Observer";

function ObserverPropsCheck(props, key, componentName, location, propFullName) {
    var extraKey = key === "children" ? "render" : "children";
    var hasProp = typeof props[key] === "function";
    var hasExtraProp = typeof props[extraKey] === "function";
    if (hasProp && hasExtraProp) {
        return new Error("MobX Observer: Do not use children and render in the same time in`" + componentName);
    }
    if (hasProp || hasExtraProp) {
        return null;
    }
    return new Error("Invalid prop `" +
        propFullName +
        "` of type `" +
        typeof props[key] +
        "` supplied to" +
        " `" +
        componentName +
        "`, expected `function`.");
}

;// ./node_modules/.pnpm/mobx-react-lite@3.4.3_mobx@6.9.0_react-dom@17.0.2_react@17.0.2__react@17.0.2/node_modules/mobx-react-lite/es/useLocalObservable.js


function useLocalObservable(initializer, annotations) {
    return useState(function () { return observable(initializer(), annotations, { autoBind: true }); })[0];
}

;// ./node_modules/.pnpm/mobx-react-lite@3.4.3_mobx@6.9.0_react-dom@17.0.2_react@17.0.2__react@17.0.2/node_modules/mobx-react-lite/es/useAsObservableSource.js
var useAsObservableSource_read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};



function useAsObservableSource_useAsObservableSource(current) {
    if (false)
        {}
    var _a = useAsObservableSource_read(useState(function () { return observable(current, {}, { deep: false }); }), 1), res = _a[0];
    runInAction(function () {
        Object.assign(res, current);
    });
    return res;
}

;// ./node_modules/.pnpm/mobx-react-lite@3.4.3_mobx@6.9.0_react-dom@17.0.2_react@17.0.2__react@17.0.2/node_modules/mobx-react-lite/es/useLocalStore.js




function useLocalStore(initializer, current) {
    if (false)
        {}
    var source = current && useAsObservableSource(current);
    return useState(function () { return observable(initializer(source), undefined, { autoBind: true }); })[0];
}

;// ./node_modules/.pnpm/mobx-react-lite@3.4.3_mobx@6.9.0_react-dom@17.0.2_react@17.0.2__react@17.0.2/node_modules/mobx-react-lite/es/index.js
var _a;







observerBatching(react_dom.unstable_batchedUpdates);






var clearTimers = (_a = observerFinalizationRegistry["finalizeAllImmediately"]) !== null && _a !== void 0 ? _a : (function () { });
function es_useObserver(fn, baseComponentName) {
    if (baseComponentName === void 0) { baseComponentName = "observed"; }
    if (false) {}
    return useObserverOriginal(fn, baseComponentName);
}

function useStaticRendering(enable) {
    if (false) {}
    enableStaticRendering(enable);
}

;// ./node_modules/.pnpm/mobx-react@7.6.0_mobx@6.9.0_react-dom@17.0.2_react@17.0.2__react@17.0.2/node_modules/mobx-react/dist/mobxreact.esm.js





var symbolId = 0;

function createSymbol(name) {
  if (typeof Symbol === "function") {
    return Symbol(name);
  }

  var symbol = "__$mobx-react " + name + " (" + symbolId + ")";
  symbolId++;
  return symbol;
}

var createdSymbols = {};
function newSymbol(name) {
  if (!createdSymbols[name]) {
    createdSymbols[name] = createSymbol(name);
  }

  return createdSymbols[name];
}
function shallowEqual(objA, objB) {
  //From: https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (var i = 0; i < keysA.length; i++) {
    if (!Object.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

function is(x, y) {
  // From: https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
} // based on https://github.com/mridgway/hoist-non-react-statics/blob/master/src/index.js


var mobxreact_esm_hoistBlackList = {
  $$typeof: 1,
  render: 1,
  compare: 1,
  type: 1,
  childContextTypes: 1,
  contextType: 1,
  contextTypes: 1,
  defaultProps: 1,
  getDefaultProps: 1,
  getDerivedStateFromError: 1,
  getDerivedStateFromProps: 1,
  mixins: 1,
  displayName: 1,
  propTypes: 1
};
function mobxreact_esm_copyStaticProperties(base, target) {
  var protoProps = Object.getOwnPropertyNames(Object.getPrototypeOf(base));
  Object.getOwnPropertyNames(base).forEach(function (key) {
    if (!mobxreact_esm_hoistBlackList[key] && protoProps.indexOf(key) === -1) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(base, key));
    }
  });
}
/**
 * Helper to set `prop` to `this` as non-enumerable (hidden prop)
 * @param target
 * @param prop
 * @param value
 */

function setHiddenProp(target, prop, value) {
  if (!Object.hasOwnProperty.call(target, prop)) {
    Object.defineProperty(target, prop, {
      enumerable: false,
      configurable: true,
      writable: true,
      value: value
    });
  } else {
    target[prop] = value;
  }
}
/**
 * Utilities for patching componentWillUnmount, to make sure @disposeOnUnmount works correctly icm with user defined hooks
 * and the handler provided by mobx-react
 */

var mobxMixins = /*#__PURE__*/newSymbol("patchMixins");
var mobxPatchedDefinition = /*#__PURE__*/newSymbol("patchedDefinition");

function getMixins(target, methodName) {
  var mixins = target[mobxMixins] = target[mobxMixins] || {};
  var methodMixins = mixins[methodName] = mixins[methodName] || {};
  methodMixins.locks = methodMixins.locks || 0;
  methodMixins.methods = methodMixins.methods || [];
  return methodMixins;
}

function wrapper(realMethod, mixins) {
  var _this = this;

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  // locks are used to ensure that mixins are invoked only once per invocation, even on recursive calls
  mixins.locks++;

  try {
    var retVal;

    if (realMethod !== undefined && realMethod !== null) {
      retVal = realMethod.apply(this, args);
    }

    return retVal;
  } finally {
    mixins.locks--;

    if (mixins.locks === 0) {
      mixins.methods.forEach(function (mx) {
        mx.apply(_this, args);
      });
    }
  }
}

function wrapFunction(realMethod, mixins) {
  var fn = function fn() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    wrapper.call.apply(wrapper, [this, realMethod, mixins].concat(args));
  };

  return fn;
}

function patch(target, methodName, mixinMethod) {
  var mixins = getMixins(target, methodName);

  if (mixins.methods.indexOf(mixinMethod) < 0) {
    mixins.methods.push(mixinMethod);
  }

  var oldDefinition = Object.getOwnPropertyDescriptor(target, methodName);

  if (oldDefinition && oldDefinition[mobxPatchedDefinition]) {
    // already patched definition, do not repatch
    return;
  }

  var originalMethod = target[methodName];
  var newDefinition = createDefinition(target, methodName, oldDefinition ? oldDefinition.enumerable : undefined, mixins, originalMethod);
  Object.defineProperty(target, methodName, newDefinition);
}

function createDefinition(target, methodName, enumerable, mixins, originalMethod) {
  var _ref;

  var wrappedFunc = wrapFunction(originalMethod, mixins);
  return _ref = {}, _ref[mobxPatchedDefinition] = true, _ref.get = function get() {
    return wrappedFunc;
  }, _ref.set = function set(value) {
    if (this === target) {
      wrappedFunc = wrapFunction(value, mixins);
    } else {
      // when it is an instance of the prototype/a child prototype patch that particular case again separately
      // since we need to store separate values depending on wether it is the actual instance, the prototype, etc
      // e.g. the method for super might not be the same as the method for the prototype which might be not the same
      // as the method for the instance
      var newDefinition = createDefinition(this, methodName, enumerable, mixins, value);
      Object.defineProperty(this, methodName, newDefinition);
    }
  }, _ref.configurable = true, _ref.enumerable = enumerable, _ref;
}

var mobxAdminProperty = mobx_esm/* $mobx */.BQ || "$mobx"; // BC

var mobxObserverProperty = /*#__PURE__*/newSymbol("isMobXReactObserver");
var mobxIsUnmounted = /*#__PURE__*/newSymbol("isUnmounted");
var skipRenderKey = /*#__PURE__*/newSymbol("skipRender");
var isForcingUpdateKey = /*#__PURE__*/newSymbol("isForcingUpdate");
function makeClassComponentObserver(componentClass) {
  var target = componentClass.prototype;

  if (componentClass[mobxObserverProperty]) {
    var displayName = getDisplayName(target);
    console.warn("The provided component class (" + displayName + ")\n                has already been declared as an observer component.");
  } else {
    componentClass[mobxObserverProperty] = true;
  }

  if (target.componentWillReact) {
    throw new Error("The componentWillReact life-cycle event is no longer supported");
  }

  if (componentClass["__proto__"] !== react.PureComponent) {
    if (!target.shouldComponentUpdate) {
      target.shouldComponentUpdate = observerSCU;
    } else if (target.shouldComponentUpdate !== observerSCU) {
      // n.b. unequal check, instead of existence check, as @observer might be on superclass as well
      throw new Error("It is not allowed to use shouldComponentUpdate in observer based components.");
    }
  } // this.props and this.state are made observable, just to make sure @computed fields that
  // are defined inside the component, and which rely on state or props, re-compute if state or props change
  // (otherwise the computed wouldn't update and become stale on props change, since props are not observable)
  // However, this solution is not without it's own problems: https://github.com/mobxjs/mobx-react/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Aobservable-props-or-not+


  makeObservableProp(target, "props");
  makeObservableProp(target, "state");

  if (componentClass.contextType) {
    makeObservableProp(target, "context");
  }

  var originalRender = target.render;

  if (typeof originalRender !== "function") {
    var _displayName = getDisplayName(target);

    throw new Error("[mobx-react] class component (" + _displayName + ") is missing `render` method." + "\n`observer` requires `render` being a function defined on prototype." + "\n`render = () => {}` or `render = function() {}` is not supported.");
  }

  target.render = function () {
    this.render = isUsingStaticRendering() ? originalRender : createReactiveRender.call(this, originalRender);
    return this.render();
  };

  patch(target, "componentDidMount", function () {
    this[mobxIsUnmounted] = false;

    if (!this.render[mobxAdminProperty]) {
      // Reaction is re-created automatically during render, but a component can re-mount and skip render #3395.
      // To re-create the reaction and re-subscribe to relevant observables we have to force an update.
      react.Component.prototype.forceUpdate.call(this);
    }
  });
  patch(target, "componentWillUnmount", function () {
    if (isUsingStaticRendering()) {
      return;
    }

    var reaction = this.render[mobxAdminProperty];

    if (reaction) {
      reaction.dispose(); // Forces reaction to be re-created on next render

      this.render[mobxAdminProperty] = null;
    } else {
      // Render may have been hot-swapped and/or overridden by a subclass.
      var _displayName2 = getDisplayName(this);

      console.warn("The reactive render of an observer class component (" + _displayName2 + ")\n                was overridden after MobX attached. This may result in a memory leak if the\n                overridden reactive render was not properly disposed.");
    }

    this[mobxIsUnmounted] = true;
  });
  return componentClass;
} // Generates a friendly name for debugging

function getDisplayName(comp) {
  return comp.displayName || comp.name || comp.constructor && (comp.constructor.displayName || comp.constructor.name) || "<component>";
}

function createReactiveRender(originalRender) {
  var _this = this;

  /**
   * If props are shallowly modified, react will render anyway,
   * so atom.reportChanged() should not result in yet another re-render
   */
  setHiddenProp(this, skipRenderKey, false);
  /**
   * forceUpdate will re-assign this.props. We don't want that to cause a loop,
   * so detect these changes
   */

  setHiddenProp(this, isForcingUpdateKey, false);
  var initialName = getDisplayName(this);
  var boundOriginalRender = originalRender.bind(this);
  var isRenderingPending = false;

  var createReaction = function createReaction() {
    var reaction = new mobx_esm/* Reaction */.qT(initialName + ".render()", function () {
      if (!isRenderingPending) {
        // N.B. Getting here *before mounting* means that a component constructor has side effects (see the relevant test in misc.test.tsx)
        // This unidiomatic React usage but React will correctly warn about this so we continue as usual
        // See #85 / Pull #44
        isRenderingPending = true;

        if (_this[mobxIsUnmounted] !== true) {
          var hasError = true;

          try {
            setHiddenProp(_this, isForcingUpdateKey, true);

            if (!_this[skipRenderKey]) {
              react.Component.prototype.forceUpdate.call(_this);
            }

            hasError = false;
          } finally {
            setHiddenProp(_this, isForcingUpdateKey, false);

            if (hasError) {
              reaction.dispose(); // Forces reaction to be re-created on next render

              _this.render[mobxAdminProperty] = null;
            }
          }
        }
      }
    });
    reaction["reactComponent"] = _this;
    return reaction;
  };

  function reactiveRender() {
    var _reactiveRender$mobxA;

    isRenderingPending = false; // Create reaction lazily to support re-mounting #3395

    var reaction = (_reactiveRender$mobxA = reactiveRender[mobxAdminProperty]) != null ? _reactiveRender$mobxA : reactiveRender[mobxAdminProperty] = createReaction();
    var exception = undefined;
    var rendering = undefined;
    reaction.track(function () {
      try {
        // TODO@major
        // Optimization: replace with _allowStateChangesStart/End (not available in mobx@6.0.0)
        rendering = (0,mobx_esm/* _allowStateChanges */.vx)(false, boundOriginalRender);
      } catch (e) {
        exception = e;
      }
    });

    if (exception) {
      throw exception;
    }

    return rendering;
  }

  return reactiveRender;
}

function observerSCU(nextProps, nextState) {
  if (isUsingStaticRendering()) {
    console.warn("[mobx-react] It seems that a re-rendering of a React component is triggered while in static (server-side) mode. Please make sure components are rendered only once server-side.");
  } // update on any state changes (as is the default)


  if (this.state !== nextState) {
    return true;
  } // update if props are shallowly not equal, inspired by PureRenderMixin
  // we could return just 'false' here, and avoid the `skipRender` checks etc
  // however, it is nicer if lifecycle events are triggered like usually,
  // so we return true here if props are shallowly modified.


  return !shallowEqual(this.props, nextProps);
}

function makeObservableProp(target, propName) {
  var valueHolderKey = newSymbol("reactProp_" + propName + "_valueHolder");
  var atomHolderKey = newSymbol("reactProp_" + propName + "_atomHolder");

  function getAtom() {
    if (!this[atomHolderKey]) {
      setHiddenProp(this, atomHolderKey, (0,mobx_esm/* createAtom */.MN)("reactive " + propName));
    }

    return this[atomHolderKey];
  }

  Object.defineProperty(target, propName, {
    configurable: true,
    enumerable: true,
    get: function get() {
      var prevReadState = false; // Why this check? BC?
      // @ts-expect-error

      if (mobx_esm/* _allowStateReadsStart */.f2 && mobx_esm/* _allowStateReadsEnd */.w6) {
        prevReadState = (0,mobx_esm/* _allowStateReadsStart */.f2)(true);
      }

      getAtom.call(this).reportObserved(); // Why this check? BC?
      // @ts-expect-error

      if (mobx_esm/* _allowStateReadsStart */.f2 && mobx_esm/* _allowStateReadsEnd */.w6) {
        (0,mobx_esm/* _allowStateReadsEnd */.w6)(prevReadState);
      }

      return this[valueHolderKey];
    },
    set: function set(v) {
      if (!this[isForcingUpdateKey] && !shallowEqual(this[valueHolderKey], v)) {
        setHiddenProp(this, valueHolderKey, v);
        setHiddenProp(this, skipRenderKey, true);
        getAtom.call(this).reportChanged();
        setHiddenProp(this, skipRenderKey, false);
      } else {
        setHiddenProp(this, valueHolderKey, v);
      }
    }
  });
}

/**
 * Observer function / decorator
 */

function mobxreact_esm_observer(component) {
  if (component["isMobxInjector"] === true) {
    console.warn("Mobx observer: You are trying to use `observer` on a component that already has `inject`. Please apply `observer` before applying `inject`");
  }

  if (Object.prototype.isPrototypeOf.call(react.Component, component) || Object.prototype.isPrototypeOf.call(react.PureComponent, component)) {
    // Class component
    return makeClassComponentObserver(component);
  } else {
    // Function component
    return observer(component);
  }
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _excluded = ["children"];
var MobXProviderContext = /*#__PURE__*/react.createContext({});
function Provider(props) {
  var children = props.children,
      stores = _objectWithoutPropertiesLoose(props, _excluded);

  var parentValue = react.useContext(MobXProviderContext);
  var mutableProviderRef = react.useRef(_extends({}, parentValue, stores));
  var value = mutableProviderRef.current;

  if (false) { var newValue; }

  return react.createElement(MobXProviderContext.Provider, {
    value: value
  }, children);
}
Provider.displayName = "MobXProvider";

/**
 * Store Injection
 */

function createStoreInjector(grabStoresFn, component, injectNames, makeReactive) {
  // Support forward refs
  var Injector = React__default.forwardRef(function (props, ref) {
    var newProps = _extends({}, props);

    var context = React__default.useContext(MobXProviderContext);
    Object.assign(newProps, grabStoresFn(context || {}, newProps) || {});

    if (ref) {
      newProps.ref = ref;
    }

    return React__default.createElement(component, newProps);
  });
  if (makeReactive) Injector = mobxreact_esm_observer(Injector);
  Injector["isMobxInjector"] = true; // assigned late to suppress observer warning
  // Static fields from component should be visible on the generated Injector

  mobxreact_esm_copyStaticProperties(component, Injector);
  Injector["wrappedComponent"] = component;
  Injector.displayName = getInjectName(component, injectNames);
  return Injector;
}

function getInjectName(component, injectNames) {
  var displayName;
  var componentName = component.displayName || component.name || component.constructor && component.constructor.name || "Component";
  if (injectNames) displayName = "inject-with-" + injectNames + "(" + componentName + ")";else displayName = "inject(" + componentName + ")";
  return displayName;
}

function grabStoresByName(storeNames) {
  return function (baseStores, nextProps) {
    storeNames.forEach(function (storeName) {
      if (storeName in nextProps // prefer props over stores
      ) return;
      if (!(storeName in baseStores)) throw new Error("MobX injector: Store '" + storeName + "' is not available! Make sure it is provided by some Provider");
      nextProps[storeName] = baseStores[storeName];
    });
    return nextProps;
  };
}
/**
 * higher order component that injects stores to a child.
 * takes either a varargs list of strings, which are stores read from the context,
 * or a function that manually maps the available stores from the context to props:
 * storesToProps(mobxStores, props, context) => newProps
 */


function inject() {
  for (var _len = arguments.length, storeNames = new Array(_len), _key = 0; _key < _len; _key++) {
    storeNames[_key] = arguments[_key];
  }

  if (typeof arguments[0] === "function") {
    var grabStoresFn = arguments[0];
    return function (componentClass) {
      return createStoreInjector(grabStoresFn, componentClass, grabStoresFn.name, true);
    };
  } else {
    return function (componentClass) {
      return createStoreInjector(grabStoresByName(storeNames), componentClass, storeNames.join("-"), false);
    };
  }
}

var protoStoreKey = /*#__PURE__*/(/* unused pure expression or super */ null && (newSymbol("disposeOnUnmountProto")));
var instStoreKey = /*#__PURE__*/(/* unused pure expression or super */ null && (newSymbol("disposeOnUnmountInst")));

function runDisposersOnWillUnmount() {
  var _this = this;
  [].concat(this[protoStoreKey] || [], this[instStoreKey] || []).forEach(function (propKeyOrFunction) {
    var prop = typeof propKeyOrFunction === "string" ? _this[propKeyOrFunction] : propKeyOrFunction;

    if (prop !== undefined && prop !== null) {
      if (Array.isArray(prop)) prop.map(function (f) {
        return f();
      });else prop();
    }
  });
}

function disposeOnUnmount(target, propertyKeyOrFunction) {
  if (Array.isArray(propertyKeyOrFunction)) {
    return propertyKeyOrFunction.map(function (fn) {
      return disposeOnUnmount(target, fn);
    });
  }

  var c = Object.getPrototypeOf(target).constructor;
  var c2 = Object.getPrototypeOf(target.constructor); // Special case for react-hot-loader

  var c3 = Object.getPrototypeOf(Object.getPrototypeOf(target));

  if (!(c === React__default.Component || c === React__default.PureComponent || c2 === React__default.Component || c2 === React__default.PureComponent || c3 === React__default.Component || c3 === React__default.PureComponent)) {
    throw new Error("[mobx-react] disposeOnUnmount only supports direct subclasses of React.Component or React.PureComponent.");
  }

  if (typeof propertyKeyOrFunction !== "string" && typeof propertyKeyOrFunction !== "function" && !Array.isArray(propertyKeyOrFunction)) {
    throw new Error("[mobx-react] disposeOnUnmount only works if the parameter is either a property key or a function.");
  } // decorator's target is the prototype, so it doesn't have any instance properties like props


  var isDecorator = typeof propertyKeyOrFunction === "string"; // add property key / function we want run (disposed) to the store

  var componentWasAlreadyModified = !!target[protoStoreKey] || !!target[instStoreKey];
  var store = isDecorator ? // decorators are added to the prototype store
  target[protoStoreKey] || (target[protoStoreKey] = []) : // functions are added to the instance store
  target[instStoreKey] || (target[instStoreKey] = []);
  store.push(propertyKeyOrFunction); // tweak the component class componentWillUnmount if not done already

  if (!componentWasAlreadyModified) {
    patch(target, "componentWillUnmount", runDisposersOnWillUnmount);
  } // return the disposer as is if invoked as a non decorator


  if (typeof propertyKeyOrFunction !== "string") {
    return propertyKeyOrFunction;
  }
}

function createChainableTypeChecker(validator) {
  function checkType(isRequired, props, propName, componentName, location, propFullName) {
    for (var _len = arguments.length, rest = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
      rest[_key - 6] = arguments[_key];
    }

    return (0,mobx_esm/* untracked */.O8)(function () {
      componentName = componentName || "<<anonymous>>";
      propFullName = propFullName || propName;

      if (props[propName] == null) {
        if (isRequired) {
          var actual = props[propName] === null ? "null" : "undefined";
          return new Error("The " + location + " `" + propFullName + "` is marked as required " + "in `" + componentName + "`, but its value is `" + actual + "`.");
        }

        return null;
      } else {
        // @ts-ignore rest arg is necessary for some React internals - fails tests otherwise
        return validator.apply(void 0, [props, propName, componentName, location, propFullName].concat(rest));
      }
    });
  }

  var chainedCheckType = checkType.bind(null, false); // Add isRequired to satisfy Requirable

  chainedCheckType.isRequired = checkType.bind(null, true);
  return chainedCheckType;
} // Copied from React.PropTypes


function isSymbol(propType, propValue) {
  // Native Symbol.
  if (propType === "symbol") {
    return true;
  } // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'


  if (propValue["@@toStringTag"] === "Symbol") {
    return true;
  } // Fallback for non-spec compliant Symbols which are polyfilled.


  if (typeof Symbol === "function" && propValue instanceof Symbol) {
    return true;
  }

  return false;
} // Copied from React.PropTypes


function getPropType(propValue) {
  var propType = typeof propValue;

  if (Array.isArray(propValue)) {
    return "array";
  }

  if (propValue instanceof RegExp) {
    // Old webkits (at least until Android 4.0) return 'function' rather than
    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
    // passes PropTypes.object.
    return "object";
  }

  if (isSymbol(propType, propValue)) {
    return "symbol";
  }

  return propType;
} // This handles more types than `getPropType`. Only used for error messages.
// Copied from React.PropTypes


function getPreciseType(propValue) {
  var propType = getPropType(propValue);

  if (propType === "object") {
    if (propValue instanceof Date) {
      return "date";
    } else if (propValue instanceof RegExp) {
      return "regexp";
    }
  }

  return propType;
}

function createObservableTypeCheckerCreator(allowNativeType, mobxType) {
  return createChainableTypeChecker(function (props, propName, componentName, location, propFullName) {
    return (0,mobx_esm/* untracked */.O8)(function () {
      if (allowNativeType) {
        if (getPropType(props[propName]) === mobxType.toLowerCase()) return null;
      }

      var mobxChecker;

      switch (mobxType) {
        case "Array":
          mobxChecker = mobx_esm/* isObservableArray */.Fq;
          break;

        case "Object":
          mobxChecker = mobx_esm/* isObservableObject */.OB;
          break;

        case "Map":
          mobxChecker = mobx_esm/* isObservableMap */.uz;
          break;

        default:
          throw new Error("Unexpected mobxType: " + mobxType);
      }

      var propValue = props[propName];

      if (!mobxChecker(propValue)) {
        var preciseType = getPreciseType(propValue);
        var nativeTypeExpectationMessage = allowNativeType ? " or javascript `" + mobxType.toLowerCase() + "`" : "";
        return new Error("Invalid prop `" + propFullName + "` of type `" + preciseType + "` supplied to" + " `" + componentName + "`, expected `mobx.Observable" + mobxType + "`" + nativeTypeExpectationMessage + ".");
      }

      return null;
    });
  });
}

function createObservableArrayOfTypeChecker(allowNativeType, typeChecker) {
  return createChainableTypeChecker(function (props, propName, componentName, location, propFullName) {
    for (var _len2 = arguments.length, rest = new Array(_len2 > 5 ? _len2 - 5 : 0), _key2 = 5; _key2 < _len2; _key2++) {
      rest[_key2 - 5] = arguments[_key2];
    }

    return (0,mobx_esm/* untracked */.O8)(function () {
      if (typeof typeChecker !== "function") {
        return new Error("Property `" + propFullName + "` of component `" + componentName + "` has " + "invalid PropType notation.");
      } else {
        var error = createObservableTypeCheckerCreator(allowNativeType, "Array")(props, propName, componentName, location, propFullName);
        if (error instanceof Error) return error;
        var propValue = props[propName];

        for (var i = 0; i < propValue.length; i++) {
          error = typeChecker.apply(void 0, [propValue, i, componentName, location, propFullName + "[" + i + "]"].concat(rest));
          if (error instanceof Error) return error;
        }

        return null;
      }
    });
  });
}

var observableArray = /*#__PURE__*/createObservableTypeCheckerCreator(false, "Array");
var observableArrayOf = /*#__PURE__*/createObservableArrayOfTypeChecker.bind(null, false);
var observableMap = /*#__PURE__*/createObservableTypeCheckerCreator(false, "Map");
var observableObject = /*#__PURE__*/createObservableTypeCheckerCreator(false, "Object");
var arrayOrObservableArray = /*#__PURE__*/createObservableTypeCheckerCreator(true, "Array");
var arrayOrObservableArrayOf = /*#__PURE__*/createObservableArrayOfTypeChecker.bind(null, true);
var objectOrObservableObject = /*#__PURE__*/createObservableTypeCheckerCreator(true, "Object");
var PropTypes = {
  observableArray: observableArray,
  observableArrayOf: observableArrayOf,
  observableMap: observableMap,
  observableObject: observableObject,
  arrayOrObservableArray: arrayOrObservableArray,
  arrayOrObservableArrayOf: arrayOrObservableArrayOf,
  objectOrObservableObject: objectOrObservableObject
};

if (!react.Component) throw new Error("mobx-react requires React to be available");
if (!mobx_esm/* observable */.sH) throw new Error("mobx-react requires mobx to be available");




/***/ }),

/***/ 35513:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74234);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(81083);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(47481);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19202);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(24366);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(22355);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_styles_pcss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(33814);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_styles_pcss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_styles_pcss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_styles_pcss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_styles_pcss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ }),

/***/ 92848:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74234);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(81083);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(47481);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19202);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(24366);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(22355);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_styles_pcss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23567);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_pnpm_style_loader_3_3_2_webpack_5_97_1_swc_core_1_11_21_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_styles_pcss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_styles_pcss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_styles_pcss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _node_modules_pnpm_css_loader_6_7_3_webpack_5_97_1_swc_core_1_11_21_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_pnpm_postcss_loader_8_1_1_postcss_8_4_49_typescript_5_6_3_webpack_5_97_1_swc_core_1_11_21_node_modules_postcss_loader_dist_cjs_js_styles_pcss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ }),

/***/ 84425:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v: () => (/* binding */ SchemaPreprocessor)
/* harmony export */ });
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3290);
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
 * In some cases we want to preprocessing input before validation
 * For example, cast loaded filter metadata item id field from string to number before validation:
 *
 * { filterId: "1", ... } -> { filterId: 1, ... }.
 */ class SchemaPreprocessor {
    /**
     * If {@link value} is string, cast it to number, else returns original value.
     *
     * @param value Preprocessed value.
     *
     * @returns Number value, if string passed, else returns original value.
     */ static castStringToNumber(value) {
        if (typeof value === 'string') {
            return Number(JSON.parse(value));
        }
        return value;
    }
    /**
     * If {@link value} is string, cast it to boolean, else returns original value.
     *
     * @param value Preprocessed value.
     *
     * @returns Boolean value, if string passed, else returns original value.
     */ static castStringToBoolean(value) {
        if (typeof value === 'string') {
            try {
                return Boolean(JSON.parse(value));
            } catch (e) {
                return value;
            }
        }
        return value;
    }
}
/**
     * Runtime {@link zod} validator with {@link SchemaPreprocessor.castStringToBoolean} preprocessor.
     */ _define_property(SchemaPreprocessor, "booleanValidator", zod__WEBPACK_IMPORTED_MODULE_0__/* ["default"].preprocess */ .Ay.preprocess(SchemaPreprocessor.castStringToBoolean, zod__WEBPACK_IMPORTED_MODULE_0__/* ["default"].boolean */ .Ay.boolean()));
/**
     * Runtime {@link zod} validator with {@link SchemaPreprocessor.castStringToNumber} preprocessor.
     */ _define_property(SchemaPreprocessor, "numberValidator", zod__WEBPACK_IMPORTED_MODULE_0__/* ["default"].preprocess */ .Ay.preprocess(SchemaPreprocessor.castStringToNumber, zod__WEBPACK_IMPORTED_MODULE_0__/* ["default"].number */ .Ay.number()));


/***/ }),

/***/ 66419:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ SettingOption)
/* harmony export */ });
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
 * Separate file with only enum to exclude imports of zod to other files.
 */ var SettingOption = /*#__PURE__*/ function(SettingOption) {
    // General settings.
    SettingOption["AppearanceTheme"] = "appearance-theme";
    SettingOption["DisableShowPageStats"] = "disable-show-page-statistic";
    SettingOption["DisableDetectFilters"] = "detect-filters-disabled";
    SettingOption["DisableSafebrowsing"] = "safebrowsing-disabled";
    SettingOption["FiltersUpdatePeriod"] = "filters-update-period";
    // Is filtering disabled or not.
    SettingOption["DisableFiltering"] = "adguard-disabled";
    // Extension specific settings.
    SettingOption["UseOptimizedFilters"] = "use-optimized-filters";
    SettingOption["DisableCollectHits"] = "hits-count-disabled";
    SettingOption["AllowAnonymizedUsageData"] = "allow-anonymized-usage-data";
    SettingOption["DisableShowContextMenu"] = "context-menu-disabled";
    // Flag used to show link to comparison of desktop and browser extension versions.
    SettingOption["DisableShowAdguardPromoInfo"] = "show-info-about-adguard-disabled";
    SettingOption["DisableShowAppUpdatedNotification"] = "show-app-updated-disabled";
    SettingOption["HideRateBlock"] = "hide-rate-block";
    SettingOption["UserRulesEditorWrap"] = "user-rules-editor-wrap";
    // Allowlist section.
    SettingOption["AllowlistDomains"] = "allowlist-domains";
    SettingOption["InvertedAllowlistDomains"] = "block-list-domains";
    SettingOption["AllowlistEnabled"] = "allowlist-enabled";
    SettingOption["DefaultAllowlistMode"] = "default-allowlist-mode";
    // Tracking protection (formerly Stealth mode).
    SettingOption["DisableStealthMode"] = "stealth-disable-stealth-mode";
    SettingOption["HideReferrer"] = "stealth-hide-referrer";
    SettingOption["HideSearchQueries"] = "stealth-hide-search-queries";
    SettingOption["SendDoNotTrack"] = "stealth-send-do-not-track";
    SettingOption["RemoveXClientData"] = "stealth-remove-x-client";
    SettingOption["BlockWebRTC"] = "stealth-block-webrtc";
    SettingOption["SelfDestructThirdPartyCookies"] = "stealth-block-third-party-cookies";
    SettingOption["SelfDestructThirdPartyCookiesTime"] = "stealth-block-third-party-cookies-time";
    SettingOption["SelfDestructFirstPartyCookies"] = "stealth-block-first-party-cookies";
    SettingOption["SelfDestructFirstPartyCookiesTime"] = "stealth-block-first-party-cookies-time";
    // Filters' statuses and states.
    SettingOption["FiltersState"] = "filters-state";
    SettingOption["FiltersVersion"] = "filters-version";
    SettingOption["GroupsState"] = "groups-state";
    SettingOption["UserFilterEnabled"] = "user-filter-enabled";
    // Filters metadata.
    SettingOption["Metadata"] = "filters-metadata";
    SettingOption["I18nMetadata"] = "filters-i18n-metadata";
    SettingOption["CustomFilters"] = "custom-filters";
    return SettingOption;
}({});


/***/ }),

/***/ 98352:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GZ: () => (/* reexport safe */ _enum__WEBPACK_IMPORTED_MODULE_1__.G)
/* harmony export */ });
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(82619);
/* harmony import */ var _enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(66419);
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



/***/ }),

/***/ 82619:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony exports appearanceValidator, settingsValidator */
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3290);
/* harmony import */ var _preprocessor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(84425);
/* harmony import */ var _enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(66419);
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


const appearanceValidator = zod__WEBPACK_IMPORTED_MODULE_2__/* ["default"]["enum"] */ .Ay["enum"]([
    'system',
    'dark',
    'light'
]);
/**
 * Setting options may be stringified, use preprocessors for correct type casting.
 */ const settingsValidator = zod__WEBPACK_IMPORTED_MODULE_2__/* ["default"].object */ .Ay.object({
    // ----- General settings section -----
    /**
     * See {@link GeneralSettingsConfig[GeneralSettingsOption.AppearanceTheme]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.AppearanceTheme]: appearanceValidator,
    /**
     * See {@link GeneralSettingsConfig[GeneralSettingsOption.ShowBlockedAdsCount]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.DisableShowPageStats]: _preprocessor__WEBPACK_IMPORTED_MODULE_0__/* .SchemaPreprocessor */ .v.booleanValidator,
    /**
     * See {@link GeneralSettingsConfig[GeneralSettingsOption.AutodetectFilters]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.DisableDetectFilters]: _preprocessor__WEBPACK_IMPORTED_MODULE_0__/* .SchemaPreprocessor */ .v.booleanValidator,
    /**
     * See {@link GeneralSettingsConfig[GeneralSettingsOption.SafebrowsingEnabled]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.DisableSafebrowsing]: _preprocessor__WEBPACK_IMPORTED_MODULE_0__/* .SchemaPreprocessor */ .v.booleanValidator,
    /**
     * See {@link GeneralSettingsConfig[GeneralSettingsOption.FiltersUpdatePeriod]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.FiltersUpdatePeriod]: _preprocessor__WEBPACK_IMPORTED_MODULE_0__/* .SchemaPreprocessor */ .v.numberValidator,
    // ----- General settings section -----
    // ----- Extension specific settings section -----
    /**
     * See {@link ExtensionSpecificSettingsConfig[ExtensionSpecificSettingsOption.UseOptimizedFilters]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.UseOptimizedFilters]: _preprocessor__WEBPACK_IMPORTED_MODULE_0__/* .SchemaPreprocessor */ .v.booleanValidator,
    /**
     * See {@link ExtensionSpecificSettingsConfig[ExtensionSpecificSettingsOption.CollectHitsCount]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.DisableCollectHits]: _preprocessor__WEBPACK_IMPORTED_MODULE_0__/* .SchemaPreprocessor */ .v.booleanValidator,
    /**
     * See {@link ExtensionSpecificSettingsConfig[ExtensionSpecificSettingsOption.AllowAnonymizedUsageData]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.AllowAnonymizedUsageData]: _preprocessor__WEBPACK_IMPORTED_MODULE_0__/* .SchemaPreprocessor */ .v.booleanValidator,
    /**
     * See {@link ExtensionSpecificSettingsConfig[ExtensionSpecificSettingsOption.ShowContextMenu]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.DisableShowContextMenu]: _preprocessor__WEBPACK_IMPORTED_MODULE_0__/* .SchemaPreprocessor */ .v.booleanValidator,
    /**
     * See {@link ExtensionSpecificSettingsConfig[ExtensionSpecificSettingsOption.ShowInfoAboutAdguard]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.DisableShowAdguardPromoInfo]: _preprocessor__WEBPACK_IMPORTED_MODULE_0__/* .SchemaPreprocessor */ .v.booleanValidator,
    /**
     * See {@link ExtensionSpecificSettingsConfig[ExtensionSpecificSettingsOption.ShowAppUpdatedInfo]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.DisableShowAppUpdatedNotification]: _preprocessor__WEBPACK_IMPORTED_MODULE_0__/* .SchemaPreprocessor */ .v.booleanValidator,
    /**
     * See {@link ExtensionSpecificSettingsConfig[ExtensionSpecificSettingsOption.HideRateAdguard]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.HideRateBlock]: _preprocessor__WEBPACK_IMPORTED_MODULE_0__/* .SchemaPreprocessor */ .v.booleanValidator,
    /**
     * See {@link ExtensionSpecificSettingsConfig[ExtensionSpecificSettingsOption.UserRulesEditorWrap]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.UserRulesEditorWrap]: _preprocessor__WEBPACK_IMPORTED_MODULE_0__/* .SchemaPreprocessor */ .v.booleanValidator,
    // ----- Extension specific settings section -----
    // ----- Allowlist section -----
    /**
     * See {@link AllowlistConfig[AllowlistOption.Domains]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.AllowlistDomains]: zod__WEBPACK_IMPORTED_MODULE_2__/* ["default"].string */ .Ay.string(),
    /**
     * See {@link AllowlistConfig[AllowlistOption.InvertedDomains]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.InvertedAllowlistDomains]: zod__WEBPACK_IMPORTED_MODULE_2__/* ["default"].string */ .Ay.string(),
    /**
     * See {@link AllowlistConfig[AllowlistOption.Enabled]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.AllowlistEnabled]: _preprocessor__WEBPACK_IMPORTED_MODULE_0__/* .SchemaPreprocessor */ .v.booleanValidator,
    /**
     * See {@link AllowlistConfig[AllowlistOption.Inverted]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.DefaultAllowlistMode]: _preprocessor__WEBPACK_IMPORTED_MODULE_0__/* .SchemaPreprocessor */ .v.booleanValidator,
    // ----- Allowlist section -----
    // ----- Stealth section -----
    /**
     * See {@link StealthConfig[StealthOption.DisableStealthMode]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.DisableStealthMode]: _preprocessor__WEBPACK_IMPORTED_MODULE_0__/* .SchemaPreprocessor */ .v.booleanValidator,
    /**
     * See {@link StealthConfig[StealthOption.HideReferrer]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.HideReferrer]: _preprocessor__WEBPACK_IMPORTED_MODULE_0__/* .SchemaPreprocessor */ .v.booleanValidator,
    /**
     * See {@link StealthConfig[StealthOption.HideSearchQueries]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.HideSearchQueries]: _preprocessor__WEBPACK_IMPORTED_MODULE_0__/* .SchemaPreprocessor */ .v.booleanValidator,
    /**
     * See {@link StealthConfig[StealthOption.SendDoNotTrack]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.SendDoNotTrack]: _preprocessor__WEBPACK_IMPORTED_MODULE_0__/* .SchemaPreprocessor */ .v.booleanValidator,
    /**
     * See {@link StealthConfig[StealthOption.BlockWebRTC]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.BlockWebRTC]: _preprocessor__WEBPACK_IMPORTED_MODULE_0__/* .SchemaPreprocessor */ .v.booleanValidator,
    /**
     * See {@link StealthConfig[StealthOption.RemoveXClientData]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.RemoveXClientData]: _preprocessor__WEBPACK_IMPORTED_MODULE_0__/* .SchemaPreprocessor */ .v.booleanValidator,
    /**
     * See {@link StealthConfig[StealthOption.SelfDestructThirdPartyCookies]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.SelfDestructThirdPartyCookies]: _preprocessor__WEBPACK_IMPORTED_MODULE_0__/* .SchemaPreprocessor */ .v.booleanValidator,
    /**
     * See {@link StealthConfig[StealthOption.SelfDestructThirdPartyCookiesTime]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.SelfDestructThirdPartyCookiesTime]: zod__WEBPACK_IMPORTED_MODULE_2__/* ["default"].number */ .Ay.number(),
    /**
     * See {@link StealthConfig[StealthOption.SelfDestructFirstPartyCookies]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.SelfDestructFirstPartyCookies]: _preprocessor__WEBPACK_IMPORTED_MODULE_0__/* .SchemaPreprocessor */ .v.booleanValidator,
    /**
     * See {@link StealthConfig[StealthOption.SelfDestructFirstPartyCookiesTime]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.SelfDestructFirstPartyCookiesTime]: zod__WEBPACK_IMPORTED_MODULE_2__/* ["default"].number */ .Ay.number(),
    // ----- Stealth section -----
    // ----- Statuses section -----
    /**
     * See {@link UserFilterConfig[UserFilterOption.Enabled]}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.UserFilterEnabled]: _preprocessor__WEBPACK_IMPORTED_MODULE_0__/* .SchemaPreprocessor */ .v.booleanValidator,
    /**
     * See {@link FilterStateStorageData}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.FiltersState]: zod__WEBPACK_IMPORTED_MODULE_2__/* ["default"].string */ .Ay.string().optional(),
    /**
     * See {@link FilterVersionStorageData}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.FiltersVersion]: zod__WEBPACK_IMPORTED_MODULE_2__/* ["default"].string */ .Ay.string().optional(),
    /**
     * See {@link GroupStateStorageData}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.GroupsState]: zod__WEBPACK_IMPORTED_MODULE_2__/* ["default"].string */ .Ay.string().optional(),
    // ----- Statuses section -----
    // ----- Metadata section -----
    /**
     * See {@link Metadata}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.Metadata]: zod__WEBPACK_IMPORTED_MODULE_2__/* ["default"].string */ .Ay.string().optional(),
    /**
     * See {@link I18nMetadata}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.I18nMetadata]: zod__WEBPACK_IMPORTED_MODULE_2__/* ["default"].string */ .Ay.string().optional(),
    /**
     * See {@link CustomFilterMetadataStorageData}.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.CustomFilters]: zod__WEBPACK_IMPORTED_MODULE_2__/* ["default"].string */ .Ay.string().optional(),
    // ----- Metadata section -----
    /**
     * Is filtering enabled or not. Is needed for fast toggling filtering
     * without reload entire extension.
     */ [_enum__WEBPACK_IMPORTED_MODULE_1__/* .SettingOption */ .G.DisableFiltering]: _preprocessor__WEBPACK_IMPORTED_MODULE_0__/* .SchemaPreprocessor */ .v.booleanValidator
});


/***/ }),

/***/ 33926:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $1: () => (/* binding */ NavigationTag),
/* harmony export */   Cb: () => (/* binding */ MIN_UPDATE_DISPLAY_DURATION_MS),
/* harmony export */   DY: () => (/* binding */ NotifierType),
/* harmony export */   Eg: () => (/* binding */ TOTAL_BLOCKED_STATS_GROUP_ID),
/* harmony export */   FF: () => (/* binding */ BACKGROUND_TAB_ID),
/* harmony export */   Fx: () => (/* binding */ TRUSTED_TAG_KEYWORD),
/* harmony export */   GE: () => (/* binding */ FiltersUpdateTime),
/* harmony export */   JP: () => (/* binding */ NEWLINE_CHAR_UNIX),
/* harmony export */   Nq: () => (/* binding */ RECOMMENDED_TAG_ID),
/* harmony export */   SG: () => (/* binding */ CHROME_EXTENSIONS_SETTINGS_URL),
/* harmony export */   UA: () => (/* binding */ NOTIFICATION_TTL_MS),
/* harmony export */   WC: () => (/* binding */ NEWLINE_CHAR_REGEX),
/* harmony export */   Xu: () => (/* binding */ CUSTOM_FILTERS_START_ID),
/* harmony export */   gD: () => (/* binding */ ExtensionUpdateFSMState),
/* harmony export */   gU: () => (/* binding */ SCROLLBAR_WIDTH),
/* harmony export */   ge: () => (/* binding */ AntibannerGroupsId),
/* harmony export */   iR: () => (/* binding */ WASTE_CHARACTERS),
/* harmony export */   j8: () => (/* binding */ AntiBannerFiltersId),
/* harmony export */   rv: () => (/* binding */ USER_SCRIPTS_API_MIN_CHROME_VERSION_REQUIRED),
/* harmony export */   xG: () => (/* binding */ TRUSTED_TAG_ID)
/* harmony export */ });
/* unused harmony exports APP_SCHEMA_VERSION, CLIENT_ID_KEY, APP_VERSION_KEY, SCHEMA_VERSION_KEY, ADGUARD_SETTINGS_KEY, PAGE_STATISTIC_KEY, TRUSTED_DOCUMENTS_CACHE_KEY, SB_LRU_CACHE_KEY, SB_SUSPENDED_CACHE_KEY, VIEWED_NOTIFICATIONS_KEY, LAST_NOTIFICATION_TIME_KEY, FILTERING_LOG_WINDOW_STATE, HIT_STATISTIC_KEY, ANNOYANCES_CONSENT_KEY, RULES_LIMITS_KEY, MANUAL_EXTENSION_UPDATE_KEY, CONTENT_SCRIPT_INJECTION_FLAG, AUTO_UPDATE_STATE_KEY_MV3, AUTO_UPDATE_CONFIG_KEY_MV3, TELEMETRY_SYNTHETIC_ID_KEY, SEPARATE_ANNOYANCE_FILTER_IDS, KEEP_ALIVE_PORT_NAME, CUSTOM_FILTERS_GROUP_DISPLAY_NUMBER, OPTIONS_PAGE, FILTER_LIST_EXTENSION, EXTENSION_INITIALIZED_EVENT, emptyPreprocessedFilterList, USER_SCRIPTS_API_WARNING_RECHECK_DELAY_MS, ExtensionUpdateFSMEvent */
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
 * Current version of app storage data schema.
 *
 * Schema version is used on extension version update.
 *
 * Note: Do not to be confused with the protocol version of the imported config.
 */ const APP_SCHEMA_VERSION = 13;
const CLIENT_ID_KEY = 'client-id';
const APP_VERSION_KEY = 'app-version';
const SCHEMA_VERSION_KEY = 'schema-version';
const ADGUARD_SETTINGS_KEY = 'adguard-settings';
const PAGE_STATISTIC_KEY = 'page-statistic';
const TRUSTED_DOCUMENTS_CACHE_KEY = 'trusted-documents';
const SB_LRU_CACHE_KEY = 'sb-lru-cache';
const SB_SUSPENDED_CACHE_KEY = 'safebrowsing-suspended-from';
const VIEWED_NOTIFICATIONS_KEY = 'viewed-notifications';
const LAST_NOTIFICATION_TIME_KEY = 'viewed-notification-time';
const FILTERING_LOG_WINDOW_STATE = 'filtering-log-window-state';
const HIT_STATISTIC_KEY = 'filters-hit-count';
const ANNOYANCES_CONSENT_KEY = 'annoyances-consent';
const RULES_LIMITS_KEY = 'rules-limits';
const MANUAL_EXTENSION_UPDATE_KEY = 'manual-extension-update';
/**
 * Storage key to prevent double injection of content scripts after extension update.
 * Set before extension reload, checked and cleared after reload.
 */ const CONTENT_SCRIPT_INJECTION_FLAG = 'content-script-injection-flag';
/**
 * Storage key for auto-update state data, used only in MV3.
 */ const AUTO_UPDATE_STATE_KEY_MV3 = 'auto-update-state-mv3';
/**
 * Storage key for auto-update configuration override, used only in MV3 for testing.
 */ const AUTO_UPDATE_CONFIG_KEY_MV3 = 'auto-update-config-mv3';
/**
 * Storage key for telemetry synthetic ID.
 */ const TELEMETRY_SYNTHETIC_ID_KEY = 'telemetry-synthetic-id';
/**
 * Filter ids used in the code on the background page and filtering log page.
 */ var AntiBannerFiltersId = /*#__PURE__*/ function(AntiBannerFiltersId) {
    AntiBannerFiltersId[AntiBannerFiltersId["StealthModeFilterId"] = -1] = "StealthModeFilterId";
    AntiBannerFiltersId[AntiBannerFiltersId["UserFilterId"] = 0] = "UserFilterId";
    AntiBannerFiltersId[AntiBannerFiltersId["EnglishFilterId"] = 2] = "EnglishFilterId";
    AntiBannerFiltersId[AntiBannerFiltersId["TrackingFilterId"] = 3] = "TrackingFilterId";
    AntiBannerFiltersId[AntiBannerFiltersId["SocialFilterId"] = 4] = "SocialFilterId";
    AntiBannerFiltersId[AntiBannerFiltersId["SearchAndSelfPromoFilterId"] = 10] = "SearchAndSelfPromoFilterId";
    AntiBannerFiltersId[AntiBannerFiltersId["AnnoyancesCombinedFilterId"] = 14] = "AnnoyancesCombinedFilterId";
    AntiBannerFiltersId[AntiBannerFiltersId["DnsFilterId"] = 15] = "DnsFilterId";
    AntiBannerFiltersId[AntiBannerFiltersId["UrlTrackingFilterId"] = 17] = "UrlTrackingFilterId";
    AntiBannerFiltersId[AntiBannerFiltersId["AnnoyancesCookieNoticesFilterId"] = 18] = "AnnoyancesCookieNoticesFilterId";
    AntiBannerFiltersId[AntiBannerFiltersId["AnnoyancesPopupsFilterId"] = 19] = "AnnoyancesPopupsFilterId";
    AntiBannerFiltersId[AntiBannerFiltersId["AnnoyancesMobileAppBannersFilterId"] = 20] = "AnnoyancesMobileAppBannersFilterId";
    AntiBannerFiltersId[AntiBannerFiltersId["AnnoyancesOtherAnnoyancesFilterId"] = 21] = "AnnoyancesOtherAnnoyancesFilterId";
    AntiBannerFiltersId[AntiBannerFiltersId["AnnoyancesWidgetsFilterId"] = 22] = "AnnoyancesWidgetsFilterId";
    AntiBannerFiltersId[AntiBannerFiltersId["QuickFixesFilterId"] = 24] = "QuickFixesFilterId";
    AntiBannerFiltersId[AntiBannerFiltersId["AllowlistFilterId"] = 100] = "AllowlistFilterId";
    AntiBannerFiltersId[AntiBannerFiltersId["MobileAdsFilterId"] = 11] = "MobileAdsFilterId";
    return AntiBannerFiltersId;
}({});
/**
 * AdGuard Annoyances filter has been splitted into 5 other filters:
 * Cookie Notices, Popups, Mobile App Banners, Other Annoyances
 * and Widgets - which we should enabled instead of the Annoyances filter.
 */ const SEPARATE_ANNOYANCE_FILTER_IDS = (/* unused pure expression or super */ null && ([
    18,
    19,
    20,
    21,
    22
]));
/**
 * Group ids used in the code on the multiple entry points.
 */ var AntibannerGroupsId = /*#__PURE__*/ function(AntibannerGroupsId) {
    /**
     * Custom filters group identifier.
     */ AntibannerGroupsId[AntibannerGroupsId["CustomFiltersGroupId"] = 0] = "CustomFiltersGroupId";
    AntibannerGroupsId[AntibannerGroupsId["AdBlockingFiltersGroupId"] = 1] = "AdBlockingFiltersGroupId";
    AntibannerGroupsId[AntibannerGroupsId["PrivacyFiltersGroupId"] = 2] = "PrivacyFiltersGroupId";
    AntibannerGroupsId[AntibannerGroupsId["SocialFiltersGroupId"] = 3] = "SocialFiltersGroupId";
    AntibannerGroupsId[AntibannerGroupsId["AnnoyancesFiltersGroupId"] = 4] = "AnnoyancesFiltersGroupId";
    AntibannerGroupsId[AntibannerGroupsId["SecurityFiltersGroupId"] = 5] = "SecurityFiltersGroupId";
    /**
     * Other filters group identifier.
     */ AntibannerGroupsId[AntibannerGroupsId["OtherFiltersGroupId"] = 6] = "OtherFiltersGroupId";
    /**
     * Language-specific group identifier.
     */ AntibannerGroupsId[AntibannerGroupsId["LanguageFiltersGroupId"] = 7] = "LanguageFiltersGroupId";
    return AntibannerGroupsId;
}({});
/**
 * Recommended filters tag ID.
 *
 * @see https://github.com/AdguardTeam/FiltersRegistry/blob/4528f7ae6b38aec90111a27efb0a7e0958d0cf37/tags/metadata.json#L40
 */ const RECOMMENDED_TAG_ID = 10;
/**
 * Enum with the list of the messages which are sent from the background
 * to notify UI about some events, e.g. some field in settings was updated.
 */ var NotifierType = /*#__PURE__*/ function(NotifierType) {
    NotifierType["RequestFilterUpdated"] = "event.request.filter.updated";
    NotifierType["UserFilterUpdated"] = "event.user.filter.updated";
    NotifierType["CustomFilterAdded"] = "event.custom.filter.added";
    NotifierType["UpdateAllowlistFilterRules"] = "event.update.allowlist.filter.rules";
    NotifierType["SettingUpdated"] = "event.update.setting.value";
    NotifierType["FiltersUpdateCheckReady"] = "event.update.filters.check";
    NotifierType["ExtensionUpdateStateChange"] = "event.update.extension.state.change";
    // Filtering log events.
    NotifierType["TabAdded"] = "log.tab.added";
    NotifierType["TabClose"] = "log.tab.close";
    NotifierType["TabUpdate"] = "log.tab.update";
    NotifierType["TabReset"] = "log.tab.reset";
    // Fullscreen user rules events
    NotifierType["FullscreenUserRulesEditorUpdated"] = "event.user.rules.editor.updated";
    return NotifierType;
}({});
const KEEP_ALIVE_PORT_NAME = 'keep-alive';
var NavigationTag = /*#__PURE__*/ function(NavigationTag) {
    NavigationTag["Regular"] = "regular";
    NavigationTag["Party"] = "party";
    return NavigationTag;
}({});
/**
 * Trusted tag for custom filters
 */ const TRUSTED_TAG_KEYWORD = 'trusted';
/**
 * Trusted tag id for custom filters.
 */ const TRUSTED_TAG_ID = 999;
/**
 * Custom filters group display number
 */ const CUSTOM_FILTERS_GROUP_DISPLAY_NUMBER = 99;
/**
 * Custom filters identifiers starts from this number
 */ const CUSTOM_FILTERS_START_ID = 1000;
// Unnecessary characters that will be replaced
const WASTE_CHARACTERS = /[.*+?^${}()|[\]\\]/g;
// Custom scrollbar width
const SCROLLBAR_WIDTH = 12;
const BACKGROUND_TAB_ID = -1;
const TOTAL_BLOCKED_STATS_GROUP_ID = 'total';
/**
 *  Time interval between filter updates.
 */ var FiltersUpdateTime = /*#__PURE__*/ function(FiltersUpdateTime) {
    FiltersUpdateTime[FiltersUpdateTime["Disabled"] = 0] = "Disabled";
    FiltersUpdateTime[FiltersUpdateTime["OneHour"] = 3600000] = "OneHour";
    FiltersUpdateTime[FiltersUpdateTime["SixHours"] = 21600000] = "SixHours";
    FiltersUpdateTime[FiltersUpdateTime["TwelveHours"] = 43200000] = "TwelveHours";
    FiltersUpdateTime[FiltersUpdateTime["TwentyFourHours"] = 86400000] = "TwentyFourHours";
    FiltersUpdateTime[FiltersUpdateTime["FortyEightHours"] = 172800000] = "FortyEightHours";
    FiltersUpdateTime[FiltersUpdateTime["Default"] = -1] = "Default";
    return FiltersUpdateTime;
}({});
const NEWLINE_CHAR_UNIX = '\n';
const NEWLINE_CHAR_REGEX = /\r?\n/;
const OPTIONS_PAGE = 'pages/options.html';
const FILTER_LIST_EXTENSION = '.txt';
/**
 * Special event name for extension initialization, needed for run automatic
 * integration tests.
 */ const EXTENSION_INITIALIZED_EVENT = 'initialized';
/**
 * This is just a syntax sugar for setting default value if we not have
 * preprocessed list for user rules or for custom filters.
 */ const emptyPreprocessedFilterList = {
    filterList: [],
    sourceMap: {},
    rawFilterList: '',
    conversionMap: {}
};
/**
 * Chrome's extensions settings page url.
 */ const CHROME_EXTENSIONS_SETTINGS_URL = 'chrome://extensions';
/**
 * Time-to-live for notifications in milliseconds.
 */ const NOTIFICATION_TTL_MS = 4000;
/**
 * Minimum Chrome versions required for different toggles which enables usage of User Scripts API.
 *
 * User scripts API with needed 'execute' method is supported from Chrome 135 and higher.
 * But prior to 138 it can be enabled only via Developer mode toggle.
 * And for 138 and higher it can be enabled via User Scripts API toggle in the extensions details.
 *
 * @see https://developer.chrome.com/docs/extensions/reference/api/userScripts
 */ const USER_SCRIPTS_API_MIN_CHROME_VERSION_REQUIRED = {
    /**
     * Minimum Chrome version where Developer mode should be enabled.
     *
     * @see https://developer.chrome.com/docs/extensions/reference/api/userScripts#chrome_versions_prior_to_138_developer_mode_toggle
     */ DEV_MODE_TOGGLE: 135,
    /**
     * Minimum Chrome version where User Scripts API toggle should be enabled.
     *
     * @see https://developer.chrome.com/docs/extensions/reference/api/userScripts#chrome_versions_138_and_newer_allow_user_scripts_toggle
     */ ALLOW_USER_SCRIPTS_TOGGLE: 138
};
/**
 * Delay in milliseconds before rechecking the state of the User Scripts API permission.
 *
 * Needed to update the state of the warning when the user grants or revokes the permission.
 */ const USER_SCRIPTS_API_WARNING_RECHECK_DELAY_MS = 2000;
/**
 * States for the extension update finite state machine (FSM).
 */ var ExtensionUpdateFSMState = /*#__PURE__*/ function(ExtensionUpdateFSMState) {
    /**
     * Idle state.
     */ ExtensionUpdateFSMState["Idle"] = "Idle";
    /**
     * Checking for updates state.
     */ ExtensionUpdateFSMState["Checking"] = "Checking";
    /**
     * Available updates state.
     */ ExtensionUpdateFSMState["Available"] = "Available";
    /**
     * Updating state.
     */ ExtensionUpdateFSMState["Updating"] = "Updating";
    /**
     * Not available updates state.
     *
     * It means that the extension is already up-to-date.
     */ ExtensionUpdateFSMState["NotAvailable"] = "NotAvailable";
    /**
     * Update failed state.
     */ ExtensionUpdateFSMState["Failed"] = "Failed";
    /**
     * Update success state.
     */ ExtensionUpdateFSMState["Success"] = "Success";
    return ExtensionUpdateFSMState;
}({});
/**
 * Events for the extension update finite state machine (FSM).
 *
 * Note: there is no event for successful update, because it is not needed —
 * the extension is reloaded automatically after the update
 * and needed notification is shown based on the storage value (set before the update).
 * For more details, see `ExtensionUpdateService.handleExtensionReloadOnUpdate()`.
 */ var ExtensionUpdateFSMEvent = /*#__PURE__*/ function(ExtensionUpdateFSMEvent) {
    /**
     * Event to initialize the state machine.
     */ ExtensionUpdateFSMEvent["Init"] = "Init";
    /**
     * Event to check for updates.
     */ ExtensionUpdateFSMEvent["Check"] = "Check";
    /**
     * Event for no available updates after the check.
     */ ExtensionUpdateFSMEvent["NoUpdateAvailable"] = "NoUpdateAvailable";
    /**
     * Event for available updates after the check.
     */ ExtensionUpdateFSMEvent["UpdateAvailable"] = "UpdateAvailable";
    /**
     * Event to start the update.
     */ ExtensionUpdateFSMEvent["Update"] = "Update";
    /**
     * Event for failed update.
     */ ExtensionUpdateFSMEvent["UpdateFailed"] = "UpdateFailed";
    return ExtensionUpdateFSMEvent;
}({});
/**
 * Time duration for showing update state change. Needed for smoother user experience.
 */ const MIN_UPDATE_DISPLAY_DURATION_MS = 2 * 1000;


/***/ }),

/***/ 21399:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ CustomFilterUtils)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33926);
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
 * Extracted to common helper class because it is used in background and options pages
 */ class CustomFilterUtils {
    /**
     * Check if filter is custom.
     *
     * @param filterId Filter id.
     *
     * @returns True, if filter is custom, else returns false.
     */ static isCustomFilter(filterId) {
        return filterId >= _constants__WEBPACK_IMPORTED_MODULE_0__/* .CUSTOM_FILTERS_START_ID */ .Xu;
    }
}


/***/ }),

/***/ 63258:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S9: () => (/* binding */ ForwardFrom),
/* harmony export */   u2: () => (/* binding */ ForwardAction),
/* harmony export */   w8: () => (/* binding */ Forward)
/* harmony export */ });
/* unused harmony export ForwardApp */
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
 * IMPORTANT: do not change the values as tds is already configured for that specific strings.
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
var ForwardAction = /*#__PURE__*/ function(ForwardAction) {
    ForwardAction["UninstallExtension"] = "adguard_uninstal_ext";
    // used for thank you page
    ForwardAction["ThankYou"] = "thank_you_page";
    // used for thank you page for MV3
    ForwardAction["ThankYouMv3"] = "thank_you_page_mv3";
    // used for "More information" on the page blocked by Safebrowsing
    ForwardAction["SiteReport"] = "site_report_page";
    // used for "Report an issue" in popup or context menu on the page
    ForwardAction["IssueReport"] = "report";
    // used for "Report a bug" on options page in General section
    ForwardAction["BugReport"] = "bug_report";
    ForwardAction["BugReportMv3"] = "bug_report_mv3";
    ForwardAction["Privacy"] = "privacy";
    ForwardAction["Acknowledgments"] = "acknowledgments";
    ForwardAction["Github"] = "github_options";
    ForwardAction["Website"] = "adguard_site";
    ForwardAction["Discuss"] = "discuss";
    ForwardAction["Compare"] = "compare";
    ForwardAction["Changelog"] = "github_version_popup";
    ForwardAction["GlobalPrivacyControl"] = "global_privacy_control";
    ForwardAction["DoNotTrack"] = "do_not_track";
    ForwardAction["HowToCreateRules"] = "userfilter_description";
    ForwardAction["FilterPolicy"] = "filter_policy";
    ForwardAction["AdguardSite"] = "adguard_site";
    ForwardAction["SelfPromotion"] = "self_promotion";
    ForwardAction["ProtectionWorks"] = "protection_works";
    ForwardAction["CollectHitsLearnMore"] = "filter_rules";
    ForwardAction["OperaStore"] = "opera_store";
    ForwardAction["FirefoxStore"] = "firefox_store";
    /**
     * Main supported release version — "AdGuard AdBlocker".
     */ ForwardAction["ChromeStore"] = "chrome_store";
    // TODO: can be removed in few months after v5.0 MV3 release
    // since it will no longer be used
    /**
     * Supported MV3 beta version.
     *
     * Previously known as "AdGuard AdBlocker MV3 Experimental",
     * currently — "AdGuard AdBlocker (MV3 Beta)".
     */ ForwardAction["ChromeMv3Store"] = "chrome_mv3_store";
    /**
     * Supported MV2 release version.
     *
     * Previously known as "AdGuard AdBlocker (Beta)".
     */ ForwardAction["ChromeMv2Store"] = "chrome_mv2_store";
    ForwardAction["EdgeStore"] = "edge_store";
    ForwardAction["IOS"] = "ios_about";
    ForwardAction["Android"] = "android_about";
    ForwardAction["GetTheApp"] = "get_the_app";
    ForwardAction["GithubVersion"] = "github_version_popup";
    ForwardAction["GithubVersionBeta"] = "github_version_popup_beta";
    ForwardAction["LearnAboutAdGuard"] = "learn_about_adguard";
    ForwardAction["FilteringLogAssumedRule"] = "filtering_log_assumed_rule";
    ForwardAction["NewYear25"] = "new_year_25";
    // TODO: Delete from here and TDS after release v5.2.
    ForwardAction["CustomFiltersMv3Disabled"] = "custom_mv3_disabled";
    // IMPORTANT: do not change the value as tds is already configured for that specific string.
    ForwardAction["UserScriptsApiRequired"] = "developer_mode_required";
    return ForwardAction;
}({});
/**
 * All pages from which a user can be forwarded.
 */ var ForwardFrom = /*#__PURE__*/ function(ForwardFrom) {
    ForwardFrom["Background"] = "background";
    ForwardFrom["Options"] = "options_screen";
    ForwardFrom["OptionsFooter"] = "options_screen_footer";
    ForwardFrom["ContextMenu"] = "context_menu";
    ForwardFrom["Popup"] = "popup";
    ForwardFrom["Safebrowsing"] = "safebrowsing";
    ForwardFrom["Adblocker"] = "adblocked";
    ForwardFrom["VersionPopup"] = "version_popup";
    ForwardFrom["FilteringLog"] = "filtering_log";
    return ForwardFrom;
}({});
var ForwardApp = /*#__PURE__*/ function(ForwardApp) {
    ForwardApp["BrowserExtension"] = "browser_extension";
    return ForwardApp;
}({});
/**
 * Class for creating forward links
 */ class Forward {
    static get(params) {
        const queryString = Object.entries({
            ...Forward.defaultParams,
            ...params
        }).map(([key, value])=>`${key}=${value}`).join('&');
        return `${Forward.url}?${queryString}`;
    }
}
_define_property(Forward, "url", 'https://link.adtidy.org/forward.html');
_define_property(Forward, "defaultParams", {
    app: "browser_extension"
});


/***/ }),

/***/ 35977:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ MessageType),
/* harmony export */   z: () => (/* binding */ APP_MESSAGE_HANDLER_NAME)
/* harmony export */ });
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
 */ const APP_MESSAGE_HANDLER_NAME = 'app';
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


/***/ }),

/***/ 94572:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Et: () => (/* reexport safe */ _message_handler__WEBPACK_IMPORTED_MODULE_2__.Et),
/* harmony export */   Go: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.G),
/* harmony export */   oL: () => (/* reexport safe */ _message_handler__WEBPACK_IMPORTED_MODULE_2__.oL),
/* harmony export */   zk: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.z)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35977);
/* harmony import */ var _send_message__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(63842);
/* harmony import */ var _message_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(63526);
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





/***/ }),

/***/ 63526:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Et: () => (/* binding */ messageHasTypeField),
/* harmony export */   oL: () => (/* binding */ messageHasTypeAndDataFields)
/* harmony export */ });
/* unused harmony export MessageHandler */
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59952);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7967);
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(35977);
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
        _define_property(this, "listeners", new Map());
        this.handleMessage = this.handleMessage.bind(this);
    }
}


/***/ }),

/***/ 63842:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony exports sendMessage, sendTabMessage */
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7967);
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(35977);
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


/***/ }),

/***/ 49426:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i0: () => (/* binding */ AppearanceTheme)
/* harmony export */ });
/* unused harmony exports DEFAULT_FILTERS_UPDATE_PERIOD, DEFAULT_FIRST_PARTY_COOKIES_SELF_DESTRUCT_MIN, DEFAULT_THIRD_PARTY_COOKIES_SELF_DESTRUCT_MIN, DEFAULT_ALLOWLIST, DEFAULT_INVERTED_ALLOWLIST, defaultSettings */
/* harmony import */ var _background_schema_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(98352);
/* harmony import */ var _user_agent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(90852);
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

var AppearanceTheme = /*#__PURE__*/ function(AppearanceTheme) {
    AppearanceTheme["System"] = "system";
    AppearanceTheme["Dark"] = "dark";
    AppearanceTheme["Light"] = "light";
    return AppearanceTheme;
}({});
const DEFAULT_FILTERS_UPDATE_PERIOD = -1;
const DEFAULT_FIRST_PARTY_COOKIES_SELF_DESTRUCT_MIN = 4320;
const DEFAULT_THIRD_PARTY_COOKIES_SELF_DESTRUCT_MIN = 2880;
const DEFAULT_ALLOWLIST = [];
const DEFAULT_INVERTED_ALLOWLIST = [];
const defaultSettings = {
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.DisableShowAdguardPromoInfo]: !(_user_agent__WEBPACK_IMPORTED_MODULE_1__/* .UserAgent */ .B.isWindows || _user_agent__WEBPACK_IMPORTED_MODULE_1__/* .UserAgent */ .B.isMacOs) || _user_agent__WEBPACK_IMPORTED_MODULE_1__/* .UserAgent */ .B.isEdge,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.DisableSafebrowsing]: true,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.DisableCollectHits]: true,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.AllowAnonymizedUsageData]: false,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.DefaultAllowlistMode]: true,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.AllowlistEnabled]: true,
    // TODO: consider ditching optimized filters for mobile mv3 builds if (or when) they become available
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.UseOptimizedFilters]: _user_agent__WEBPACK_IMPORTED_MODULE_1__/* .UserAgent */ .B.isAndroid,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.DisableDetectFilters]: false,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.DisableShowAppUpdatedNotification]: false,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.FiltersUpdatePeriod]: DEFAULT_FILTERS_UPDATE_PERIOD,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.DisableStealthMode]: true,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.HideReferrer]: true,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.HideSearchQueries]: true,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.SendDoNotTrack]: true,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.RemoveXClientData]: _user_agent__WEBPACK_IMPORTED_MODULE_1__/* .UserAgent */ .B.isChrome,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.BlockWebRTC]: false,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.SelfDestructThirdPartyCookies]: true,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.SelfDestructThirdPartyCookiesTime]: DEFAULT_THIRD_PARTY_COOKIES_SELF_DESTRUCT_MIN,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.SelfDestructFirstPartyCookies]: false,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.SelfDestructFirstPartyCookiesTime]: DEFAULT_FIRST_PARTY_COOKIES_SELF_DESTRUCT_MIN,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.AppearanceTheme]: "system",
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.UserFilterEnabled]: true,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.HideRateBlock]: false,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.UserRulesEditorWrap]: false,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.DisableFiltering]: false,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.DisableShowPageStats]: false,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.DisableShowContextMenu]: false,
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.AllowlistDomains]: JSON.stringify(DEFAULT_ALLOWLIST),
    [_background_schema_settings__WEBPACK_IMPORTED_MODULE_0__/* .SettingOption */ .GZ.InvertedAllowlistDomains]: JSON.stringify(DEFAULT_INVERTED_ALLOWLIST)
};


/***/ }),

/***/ 10584:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pM: () => (/* binding */ addMinDurationTime),
/* harmony export */   yJ: () => (/* binding */ sleepIfNecessary),
/* harmony export */   yy: () => (/* binding */ sleep)
/* harmony export */ });
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
 * Sleeps given period of milliseconds
 *
 * @param ms - milliseconds
 */ async function sleep(ms) {
    return new Promise((resolve)=>{
        setTimeout(resolve, ms);
    });
}
/**
 * Sleeps necessary period of time if minimum duration didn't pass since entry time
 *
 * @param entryTimeMs
 * @param minDurationMs
 */ async function sleepIfNecessary(entryTimeMs, minDurationMs) {
    if (Date.now() - entryTimeMs < minDurationMs) {
        await sleep(minDurationMs - (Date.now() - entryTimeMs));
    }
}
/**
 * Executes async function with at least required time
 *
 * @param fn - function to execute
 * @param minDurationMs - minimum executing time
 */ function addMinDurationTime(fn, minDurationMs) {
    return async (...args)=>{
        const start = Date.now();
        try {
            const response = await fn(...args);
            await sleepIfNecessary(start, minDurationMs);
            return response;
        } catch (e) {
            await sleepIfNecessary(start, minDurationMs);
            throw e;
        }
    };
}


/***/ }),

/***/ 4182:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  c: () => (/* reexport */ AttachmentPortal)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/react@17.0.2/node_modules/react/index.js
var react = __webpack_require__(91445);
// EXTERNAL MODULE: ./node_modules/.pnpm/react-dom@17.0.2_react@17.0.2/node_modules/react-dom/index.js
var react_dom = __webpack_require__(55101);
;// ./Extension/src/pages/common/components/AttachmentPortal/AttachmentPortal.tsx
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

const TOOLTIP_EDGE_PADDING = 4; // px
const getCssString = (position, visible)=>{
    const { x, y } = position;
    let css = `z-index:999;position:absolute;top:${y}px;left:${x}px;`;
    if (!visible) {
        css += 'visibility:hidden;';
    }
    return css;
};
const AttachmentPortal = ({ rootId, position, children })=>{
    const parent = document.getElementById(rootId);
    const ref = (0,react.useRef)(document.createElement('div'));
    (0,react.useEffect)(()=>{
        const el = ref.current;
        el.setAttribute('style', getCssString(position, false));
        parent === null || parent === void 0 ? void 0 : parent.appendChild(el);
        const rect = el.getBoundingClientRect();
        const offsetEdge = {
            top: rect.y,
            right: window.innerWidth - rect.right,
            bottom: window.innerHeight - rect.bottom,
            left: rect.x
        };
        const nextPosition = {
            ...position
        };
        if (offsetEdge.right < TOOLTIP_EDGE_PADDING) {
            nextPosition.x = rect.x + offsetEdge.right - TOOLTIP_EDGE_PADDING;
        }
        if (offsetEdge.left < TOOLTIP_EDGE_PADDING) {
            nextPosition.x = rect.x - offsetEdge.left + TOOLTIP_EDGE_PADDING;
        }
        if (offsetEdge.top < TOOLTIP_EDGE_PADDING) {
            nextPosition.y = rect.y - offsetEdge.top + TOOLTIP_EDGE_PADDING;
        }
        if (offsetEdge.bottom < TOOLTIP_EDGE_PADDING) {
            nextPosition.y = rect.y + offsetEdge.bottom - TOOLTIP_EDGE_PADDING;
        }
        el.setAttribute('style', getCssString(nextPosition, true));
        return ()=>{
            parent === null || parent === void 0 ? void 0 : parent.removeChild(el);
        };
    }, [
        ref,
        parent,
        position
    ]);
    return /*#__PURE__*/ (0,react_dom.createPortal)(children, ref.current);
};

;// ./Extension/src/pages/common/components/AttachmentPortal/index.ts
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


/***/ }),

/***/ 52849:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A3: () => (/* binding */ SavingFSMState),
/* harmony export */   gq: () => (/* binding */ CURSOR_POSITION_AFTER_INSERT),
/* harmony export */   s0: () => (/* binding */ createSavingService),
/* harmony export */   xo: () => (/* binding */ SavingFSMEvent)
/* harmony export */ });
/* harmony import */ var xstate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13015);
/* harmony import */ var xstate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54661);
/* harmony import */ var xstate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29530);
/* harmony import */ var _common_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9659);
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
 * Possible states of the saving state machine.
 */ var SavingFSMState = /*#__PURE__*/ function(SavingFSMState) {
    SavingFSMState["Idle"] = "idle";
    SavingFSMState["Saving"] = "saving";
    SavingFSMState["Saved"] = "saved";
    return SavingFSMState;
}({});
/**
 * Possible events of the saving state machine.
 */ var SavingFSMEvent = /*#__PURE__*/ function(SavingFSMEvent) {
    SavingFSMEvent["Save"] = "save";
    return SavingFSMEvent;
}({});
const SAVED_DISPLAY_TIMEOUT_MS = 1000;
const SAVE_DATA_ACTOR_NAME = 'saveDataActor';
// TODO: Maybe we can remove this service?
const createSavingService = ({ id, services })=>{
    const workflow = (0,xstate__WEBPACK_IMPORTED_MODULE_1__/* .setup */ .mj)({
        actors: {
            [SAVE_DATA_ACTOR_NAME]: (0,xstate__WEBPACK_IMPORTED_MODULE_2__/* .fromPromise */ .Sx)(async ({ input })=>{
                await services.saveData(input);
            })
        }
    }).createMachine({
        id,
        initial: "idle",
        states: {
            ["idle"]: {
                on: {
                    ["save"]: "saving"
                }
            },
            ["saving"]: {
                invoke: {
                    src: SAVE_DATA_ACTOR_NAME,
                    input: ({ event })=>({
                            event
                        }),
                    onDone: {
                        target: "saved"
                    },
                    onError: {
                        target: "saved",
                        actions: ({ event })=>{
                            const { error } = event;
                            _common_logger__WEBPACK_IMPORTED_MODULE_0__/* .logger */ .v.error('[ext.savingFSM]: failed to save data: ', error);
                        }
                    }
                }
            },
            ["saved"]: {
                after: {
                    [SAVED_DISPLAY_TIMEOUT_MS]: "idle"
                }
            }
        }
    });
    const actor = (0,xstate__WEBPACK_IMPORTED_MODULE_3__.A)(workflow);
    actor.subscribe((snapshot)=>{
        _common_logger__WEBPACK_IMPORTED_MODULE_0__/* .logger */ .v.trace('[ext.savingFSM]: current state: ', {
            id,
            currentState: snapshot.value
        });
    });
    return actor.start();
};
/**
 * undefined, 0 - Select all
 * -1 - At the beginning
 * 1 - At the end
 * see https://ace.c9.io/api/classes/src_editor.Editor.html#setValue
 */ const CURSOR_POSITION_AFTER_INSERT = 1;


/***/ }),

/***/ 14145:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  a: () => (/* reexport */ Loader)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/react@17.0.2/node_modules/react/index.js
var react = __webpack_require__(91445);
// EXTERNAL MODULE: ./Extension/src/common/translators/translator.ts
var translator = __webpack_require__(14717);
// EXTERNAL MODULE: ./Extension/src/pages/common/components/AttachmentPortal/index.ts + 1 modules
var AttachmentPortal = __webpack_require__(4182);
// EXTERNAL MODULE: ./Extension/src/pages/common/components/ui/Icon.tsx
var Icon = __webpack_require__(70687);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(74234);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(81083);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(47481);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(19202);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(24366);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(22355);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/.pnpm/css-loader@6.7.3_webpack@5.97.1_@swc+core@1.11.21_/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/.pnpm/postcss-loader@8.1.1_postcss@8.4.49_typescript@5.6.3_webpack@5.97.1_@swc+core@1.11.21_/node_modules/postcss-loader/dist/cjs.js!./Extension/src/pages/common/components/Loader/loader.pcss
var loader = __webpack_require__(33385);
;// ./Extension/src/pages/common/components/Loader/loader.pcss

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(loader/* default */.A, options);




       /* harmony default export */ const Loader_loader = (loader/* default */.A && loader/* default */.A.locals ? loader/* default */.A.locals : undefined);

;// ./Extension/src/pages/common/components/Loader/Loader.tsx
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




const Loader = ({ showLoader })=>{
    const LOADER_POSITION = {
        x: 0,
        y: 0
    };
    if (!showLoader) {
        return null;
    }
    return /*#__PURE__*/ react.createElement(AttachmentPortal/* AttachmentPortal */.c, {
        rootId: "root-portal",
        position: LOADER_POSITION
    }, /*#__PURE__*/ react.createElement("div", {
        className: "loader"
    }, /*#__PURE__*/ react.createElement("div", {
        className: "loader__background"
    }, /*#__PURE__*/ react.createElement("div", {
        className: "loader__container"
    }, /*#__PURE__*/ react.createElement("div", {
        className: "loader__content"
    }, /*#__PURE__*/ react.createElement(Icon/* Icon */.I, {
        id: "#loading",
        className: "icon--24",
        animationCondition: showLoader,
        animationClassName: "icon--loading"
    }), /*#__PURE__*/ react.createElement("div", {
        className: "loader__text"
    }, translator/* translator */.N.getMessage('options_loader_applying_changes')))))));
};

;// ./Extension/src/pages/common/components/Loader/index.ts
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


/***/ }),

/***/ 70260:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  v: () => (/* reexport */ SavingButton)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/react@17.0.2/node_modules/react/index.js
var react = __webpack_require__(91445);
// EXTERNAL MODULE: ./node_modules/.pnpm/classnames@2.3.2/node_modules/classnames/index.js
var node_modules_classnames = __webpack_require__(55184);
// EXTERNAL MODULE: ./Extension/src/pages/common/components/Editor/savingFSM.ts
var savingFSM = __webpack_require__(52849);
// EXTERNAL MODULE: ./Extension/src/common/translators/translator.ts
var translators_translator = __webpack_require__(14717);
// EXTERNAL MODULE: ./Extension/src/pages/common/components/ui/Icon.tsx
var ui_Icon = __webpack_require__(70687);
// EXTERNAL MODULE: ./Extension/src/common/user-agent.ts
var user_agent = __webpack_require__(90852);
;// ./Extension/src/pages/common/components/SavingButton/SavingButton.tsx
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





const renderSavingState = (savingRulesState)=>{
    const indicatorTextMap = {
        [SavingFSMState.Idle]: null,
        [SavingFSMState.Saved]: translator.getMessage('options_editor_indicator_saved'),
        [SavingFSMState.Saving]: translator.getMessage('options_editor_indicator_saving')
    };
    const indicatorText = indicatorTextMap[savingRulesState];
    if (!indicatorText) {
        return null;
    }
    const indicatorClassnames = classnames('editor__label', {
        'editor__label--saved': savingRulesState === SavingFSMState.Saved
    });
    return /*#__PURE__*/ React.createElement("div", {
        className: indicatorClassnames
    }, /*#__PURE__*/ React.createElement(Icon, {
        id: "#tick",
        className: "icon--18 icon--green-default editor__icon",
        "aria-hidden": "true"
    }), indicatorText);
};
const SavingButton = ({ onClick, savingState, contentChanged })=>{
    return /*#__PURE__*/ react.createElement("div", {
        className: "actions__saving"
    },  false && 0, /*#__PURE__*/ react.createElement("button", {
        type: "button",
        className: "button button--l button--green-bg actions__btn actions__btn--saving",
        onClick: onClick,
        title: translators_translator/* translator */.N.getMessage('options_editor_save'),
        disabled: !contentChanged,
        "aria-keyshortcuts": user_agent/* UserAgent */.B.isMacOs ? 'Meta+S' : 'Ctrl+S'
    }, translators_translator/* translator */.N.getMessage('options_editor_save')));
};

;// ./Extension/src/pages/common/components/SavingButton/index.ts
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


/***/ }),

/***/ 30166:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ addMinDelayLoader)
/* harmony export */ });
/* harmony import */ var _common_sleep_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10584);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(52299);
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
 * Checks if the extension is MV3, and
 * - if so it returns a new callback and shows a loader for at least {@link MIN_LOADER_SHOWING_TIME_MS},
 * - otherwise (for MV2) it returns the callback as it is.
 *
 * @param setShowLoaderCb Callback to set the loader visibility.
 * @param callback Async callback to run.
 *
 * @returns Async callback with the loader showing for at least {@link MIN_LOADER_SHOWING_TIME_MS}.
 */ const addMinDelayLoader = (setShowLoaderCb, callback)=>{
    if (false) {}
    const callbackWithMinDuration = (0,_common_sleep_utils__WEBPACK_IMPORTED_MODULE_0__/* .addMinDurationTime */ .pM)(callback, _constants__WEBPACK_IMPORTED_MODULE_1__/* .MIN_LOADER_SHOWING_TIME_MS */ .kG);
    return async (...args)=>{
        setShowLoaderCb(true);
        try {
            const response = await callbackWithMinDuration(...args);
            setShowLoaderCb(false);
            return response;
        } catch (e) {
            setShowLoaderCb(false);
            throw e;
        }
    };
};


/***/ }),

/***/ 55596:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  S: () => (/* reexport */ Checkbox)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.40.0/node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__(90767);
// EXTERNAL MODULE: ./node_modules/.pnpm/react@17.0.2/node_modules/react/index.js
var react = __webpack_require__(91445);
// EXTERNAL MODULE: ./node_modules/.pnpm/classnames@2.3.2/node_modules/classnames/index.js
var classnames = __webpack_require__(55184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/.pnpm/@adguard+logger@2.0.0/node_modules/@adguard/logger/dist/es/index.mjs
var es = __webpack_require__(52421);
// EXTERNAL MODULE: ./Extension/src/common/logger.ts
var logger = __webpack_require__(9659);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(74234);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(81083);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(47481);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(19202);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(24366);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(22355);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/.pnpm/css-loader@6.7.3_webpack@5.97.1_@swc+core@1.11.21_/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/.pnpm/postcss-loader@8.1.1_postcss@8.4.49_typescript@5.6.3_webpack@5.97.1_@swc+core@1.11.21_/node_modules/postcss-loader/dist/cjs.js!./Extension/src/pages/common/components/ui/Checkbox/checkbox.pcss
var Checkbox_checkbox = __webpack_require__(15510);
;// ./Extension/src/pages/common/components/ui/Checkbox/checkbox.pcss

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(Checkbox_checkbox/* default */.A, options);




       /* harmony default export */ const ui_Checkbox_checkbox = (Checkbox_checkbox/* default */.A && Checkbox_checkbox/* default */.A.locals ? Checkbox_checkbox/* default */.A.locals : undefined);

;// ./Extension/src/pages/common/components/ui/Checkbox/Checkbox.tsx
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
 * Checkbox component that supports both optimistic and pessimistic state updates.
 * - When `optimistic` is true, the checkbox state updates immediately upon user interaction.
 * - When `optimistic` is false, the checkbox state updates only after the handler completes.
 *
 * @param props CheckboxProps
 */ const Checkbox = (props)=>{
    const { id, handler, inverted = false, label = '', labelId, value = false, className, disabled, optimistic = true } = props;
    const computedValue = inverted ? !value : value;
    const [state, setState] = (0,react.useState)(computedValue);
    const [pending, setPending] = (0,react.useState)(false);
    (0,react.useEffect)(()=>{
        setState(computedValue);
    }, [
        computedValue
    ]);
    const changeHandler = async (e)=>{
        const newValue = !state;
        if (optimistic) {
            setState(newValue);
        } else {
            setPending(true);
        }
        try {
            const { target: { name: targetId, checked: data } } = e;
            await handler({
                id: targetId,
                data: inverted ? !data : data
            });
            if (!optimistic) {
                setState(newValue);
            }
        } catch (error) {
            // TODO: Dirty hack, need to refactor. Maybe pass some new prop like 'revertOnError'?
            if (!(0,es/* getErrorMessage */.u1)(error).includes('[revert-checkbox]')) {
                logger/* logger */.v.error('[ext.Checkbox]: handler execution failed:', error);
            }
            if (optimistic) {
                setState(!newValue); // revert state on error
            }
        } finally{
            if (!optimistic) {
                setPending(false);
            }
        }
    };
    return /*#__PURE__*/ react.createElement("div", {
        className: "checkbox"
    }, /*#__PURE__*/ react.createElement("input", {
        type: "checkbox",
        name: String(id),
        checked: state,
        onChange: changeHandler,
        id: String(id),
        className: "checkbox__in",
        tabIndex: 0,
        disabled: disabled || pending,
        "aria-labelledby": labelId
    }), /*#__PURE__*/ react.createElement("label", {
        htmlFor: String(id),
        className: classnames_default()('checkbox__label', className),
        // We hide from Screen Readers if labelId is provided to avoid duplication
        "aria-hidden": !!labelId
    }, label));
};


;// ./Extension/src/pages/common/components/ui/Checkbox/index.ts
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


/***/ }),

/***/ 88852:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  F: () => (/* binding */ Icons)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/react@17.0.2/node_modules/react/index.js
var react = __webpack_require__(91445);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(74234);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(81083);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(47481);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(19202);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(24366);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(22355);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/.pnpm/css-loader@6.7.3_webpack@5.97.1_@swc+core@1.11.21_/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/.pnpm/postcss-loader@8.1.1_postcss@8.4.49_typescript@5.6.3_webpack@5.97.1_@swc+core@1.11.21_/node_modules/postcss-loader/dist/cjs.js!./Extension/src/pages/common/styles/icons.pcss
var icons = __webpack_require__(90018);
;// ./Extension/src/pages/common/styles/icons.pcss

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(icons/* default */.A, options);




       /* harmony default export */ const styles_icons = (icons/* default */.A && icons/* default */.A.locals ? icons/* default */.A.locals : undefined);

;// ./Extension/src/pages/common/components/ui/Icons.tsx
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
 */ /* eslint-disable max-len */ 

const Icons = ()=>{
    return /*#__PURE__*/ react.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        display: "none"
    }, /*#__PURE__*/ react.createElement("symbol", {
        id: "arrow-left",
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/ react.createElement("g", {
        fill: "none",
        fillRule: "evenodd"
    }, /*#__PURE__*/ react.createElement("path", {
        stroke: "currentColor",
        d: "m15 18-6-6 6-6",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }))), /*#__PURE__*/ react.createElement("symbol", {
        id: "cross",
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/ react.createElement("path", {
        stroke: "currentColor",
        d: "M6.42857 6.42857L17.6043 17.6043",
        strokeWidth: "1.5",
        strokeLinecap: "round"
    }), /*#__PURE__*/ react.createElement("path", {
        stroke: "currentColor",
        d: "M6.42871 17.5714L17.6045 6.39563",
        strokeWidth: "1.5",
        strokeLinecap: "round"
    })), /*#__PURE__*/ react.createElement("symbol", {
        id: "checked",
        viewBox: "0 0 20 20"
    }, /*#__PURE__*/ react.createElement("g", {
        fill: "none",
        fillRule: "evenodd"
    }, /*#__PURE__*/ react.createElement("rect", {
        fill: "#67b279",
        width: "20",
        height: "20",
        rx: "2"
    }), /*#__PURE__*/ react.createElement("path", {
        stroke: "#fff",
        d: "m5.05 9.04 4.47 4.47 5.43-7.02",
        strokeWidth: "1.5",
        strokeLinecap: "round"
    }))), /*#__PURE__*/ react.createElement("symbol", {
        id: "magnifying",
        viewBox: "0 0 24 24"
    }, /*#__PURE__*/ react.createElement("circle", {
        cx: "9.5",
        cy: "9.5",
        r: "5.5",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.5"
    }), /*#__PURE__*/ react.createElement("path", {
        d: "M14 14L19 19",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round"
    })), /*#__PURE__*/ react.createElement("symbol", {
        id: "tick",
        viewBox: "0 0 24 24"
    }, /*#__PURE__*/ react.createElement("g", {
        fill: "none",
        fillRule: "evenodd"
    }, /*#__PURE__*/ react.createElement("path", {
        stroke: "currentColor",
        d: "m5 12 6 6 8-9",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }))), /*#__PURE__*/ react.createElement("symbol", {
        id: "trash",
        viewBox: "0 0 24 24"
    }, /*#__PURE__*/ react.createElement("g", {
        fill: "none",
        fillRule: "evenodd",
        stroke: "currentColor"
    }, /*#__PURE__*/ react.createElement("path", {
        clipRule: "evenodd",
        d: "M7 9h10l-.7633 10.0755c-.0395.5215-.4742.9245-.9971.9245H8.76044c-.52298 0-.95763-.403-.99714-.9245L7 9Z",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }), /*#__PURE__*/ react.createElement("path", {
        d: "M6 6.5h12M14 6V4h-4v2",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }), /*#__PURE__*/ react.createElement("path", {
        clipRule: "evenodd",
        d: "M13.5 12v5-5ZM10.5 12v5-5Z",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }))), /*#__PURE__*/ react.createElement("symbol", {
        id: "reload",
        viewBox: "0 0 24 24"
    }, /*#__PURE__*/ react.createElement("g", {
        fill: "none",
        fillRule: "evenodd"
    }, /*#__PURE__*/ react.createElement("path", {
        stroke: "currentColor",
        d: "M6 6.99999C9.6 1.79999 19.5 3.49996 20 12v1.5M18 16.9999c-3.6 5.2-13.5 3.5001-14-5V11",
        strokeWidth: "1.5",
        strokeLinecap: "round"
    }), /*#__PURE__*/ react.createElement("path", {
        stroke: "currentColor",
        d: "m22 12-2 2-2-2M2 12l2-2 2 2",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }))), /*#__PURE__*/ react.createElement("symbol", {
        id: "select",
        viewBox: "0 0 14 8"
    }, /*#__PURE__*/ react.createElement("path", {
        d: "m6 10 6 6 6-6",
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeWidth: "1.5",
        transform: "translate(-5 -9)"
    })), /*#__PURE__*/ react.createElement("symbol", {
        id: "extend",
        viewBox: "0 0 24 24"
    }, /*#__PURE__*/ react.createElement("rect", {
        width: "24",
        height: "24",
        fill: "none"
    }), /*#__PURE__*/ react.createElement("path", {
        d: "M6 10V6H10M6 14V18H10M18 10V6H14M18 14V18H14",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    })), /*#__PURE__*/ react.createElement("symbol", {
        id: "line-break-on",
        viewBox: "0 0 24 24"
    }, /*#__PURE__*/ react.createElement("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M4.08 4.74a.75.75 0 0 0 0 1.5h15.54a.75.75 0 0 0 0-1.5H4.08ZM4 8.96a.75.75 0 0 0 0 1.5h11.54a3.25 3.25 0 0 1 .02 6.48l.73-.73a.75.75 0 0 0-1.06-1.06L13.3 17.1c-.3.29-.3.76 0 1.06l1.94 1.94a.75.75 0 0 0 1.06-1.06l-.6-.6a4.75 4.75 0 0 0-.15-9.49H4Zm-.67 4.78c0-.41.34-.75.75-.75h6.8a.75.75 0 0 1 0 1.5h-6.8a.75.75 0 0 1-.75-.75Zm0 3.89c0-.42.34-.75.75-.75h6.8a.75.75 0 0 1 0 1.5h-6.8a.75.75 0 0 1-.75-.75Z"
    })), /*#__PURE__*/ react.createElement("symbol", {
        id: "line-break-off",
        viewBox: "0 0 24 24"
    }, /*#__PURE__*/ react.createElement("path", {
        stroke: "currentColor",
        d: "M4 6h16M4 18h16M4 14h16M4 10h16",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    })), /*#__PURE__*/ react.createElement("symbol", {
        id: "info",
        viewBox: "0 0 24 24"
    }, /*#__PURE__*/ react.createElement("circle", {
        stroke: "currentColor",
        fill: "none",
        cx: "12",
        cy: "12",
        r: "9",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }), /*#__PURE__*/ react.createElement("path", {
        stroke: "currentColor",
        d: "M12 16V10",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }), /*#__PURE__*/ react.createElement("path", {
        stroke: "currentColor",
        d: "M11.997 7.59552C12.009 7.59745 11.997 7.40446 11.997 7.40446",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    })), /*#__PURE__*/ react.createElement("symbol", {
        id: "reduce",
        viewBox: "0 0 24 24"
    }, /*#__PURE__*/ react.createElement("g", {
        fill: "none",
        fillRule: "evenodd"
    }, /*#__PURE__*/ react.createElement("path", {
        stroke: "currentColor",
        d: "M10 6v4H6M10 18v-4H6M14 6v4h4M14 18v-4h4",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }))), /*#__PURE__*/ react.createElement("symbol", {
        id: "cross",
        width: "24",
        height: "24"
    }, /*#__PURE__*/ react.createElement("path", {
        stroke: "currentColor",
        d: "M6.429 6.796 17.604 18.61M6.429 18.576 17.605 6.76"
    })), /*#__PURE__*/ react.createElement("symbol", {
        id: "question",
        width: "24",
        height: "24"
    }, /*#__PURE__*/ react.createElement("g", {
        fill: "none",
        fillRule: "evenodd"
    }, /*#__PURE__*/ react.createElement("path", {
        stroke: "currentColor",
        clipRule: "evenodd",
        d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }), /*#__PURE__*/ react.createElement("path", {
        stroke: "currentColor",
        d: "M10 9.3c.02-.82 1-1.52 2-1.52s1.6.39 2 1.22c.32.7.01 1.55-1.06 2.28-.87.56-1.14 1.13-1.14 2.18M11.8 15.9v-.2",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }))), /*#__PURE__*/ react.createElement("symbol", {
        id: "no-filters-found",
        viewBox: "0 0 48 51"
    }, /*#__PURE__*/ react.createElement("g", {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, /*#__PURE__*/ react.createElement("path", {
        d: "M31.631 18.31a15.16 15.16 0 0 1-4.196 12.723c-5.872 5.999-15.504 6.099-21.503.226-6-5.872-6.108-15.505-.227-21.503 4.377-4.477 10.838-5.673 16.33-3.553M27.436 31.033 47 50.172"
    }), /*#__PURE__*/ react.createElement("path", {
        d: "M31.522 15.564a7.023 7.023 0 1 0 0-14.046 7.023 7.023 0 0 0 0 14.046ZM27.752 4.645l7.54 7.539M27.752 12.157l7.54-7.54"
    }))), /*#__PURE__*/ react.createElement("symbol", {
        id: "no-filters-yet",
        viewBox: "0 0 63 35"
    }, /*#__PURE__*/ react.createElement("g", {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, /*#__PURE__*/ react.createElement("path", {
        d: "M54.5 36.886a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"
    }), /*#__PURE__*/ react.createElement("path", {
        d: "M54.5 26.776v4.67-4.67Z"
    }), /*#__PURE__*/ react.createElement("path", {
        d: "M54.5 26.776v4.67"
    }), /*#__PURE__*/ react.createElement("path", {
        d: "M54.491 33.31v.152-.152Z"
    }), /*#__PURE__*/ react.createElement("path", {
        d: "M54.491 33.31v.152M9.802 10.302V31.84h35.34M52.277 20.591v-9.985M9.802 1.5h42.475M35.086 1.5v30.34"
    }), /*#__PURE__*/ react.createElement("path", {
        d: "m35.283 1.5-8.801 8.802H1L9.802 1.5"
    }), /*#__PURE__*/ react.createElement("path", {
        d: "m34.978 1.805 8.802 8.801h17.594L52.277 1.5"
    }))), /*#__PURE__*/ react.createElement("symbol", {
        id: "loading",
        viewBox: "0 0 24 24"
    }, /*#__PURE__*/ react.createElement("path", {
        fill: "none",
        stroke: "#67B279",
        d: "M6.29054 5.04252c.11374-.09345.22981-.18417.34812-.27205M8.55511 3.68292c.2649-.10985.53619-.20741.81315-.29197.14206-.04337.28562-.08333.43057-.11976M12 3c4.9706 0 9 4.02944 9 9 0 4.9706-4.0294 9-9 9-2.48528 0-4.73528-1.0074-6.36396-2.636-.829-.829-1.49703-1.819-1.95318-2.9191"
    })), /*#__PURE__*/ react.createElement("symbol", {
        id: "update-available",
        viewBox: "0 0 24 24"
    }, /*#__PURE__*/ react.createElement("g", {
        fill: "none",
        fillRule: "evenodd"
    }, /*#__PURE__*/ react.createElement("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "1.5",
        d: "m12 4 7 10.49h-3.5V20h-7v-5.51H5L12 4Z",
        clipRule: "evenodd"
    }))));
};


/***/ }),

/***/ 80858:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ Popover)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/react@17.0.2/node_modules/react/index.js
var react = __webpack_require__(91445);
// EXTERNAL MODULE: ./Extension/src/pages/common/components/AttachmentPortal/index.ts + 1 modules
var AttachmentPortal = __webpack_require__(4182);
// EXTERNAL MODULE: ./Extension/src/pages/common/components/ui/Tooltip/index.ts + 2 modules
var Tooltip = __webpack_require__(83355);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(74234);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(81083);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(47481);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(19202);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(24366);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(22355);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/.pnpm/css-loader@6.7.3_webpack@5.97.1_@swc+core@1.11.21_/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/.pnpm/postcss-loader@8.1.1_postcss@8.4.49_typescript@5.6.3_webpack@5.97.1_@swc+core@1.11.21_/node_modules/postcss-loader/dist/cjs.js!./Extension/src/pages/common/components/ui/Popover/popover.pcss
var popover = __webpack_require__(47422);
;// ./Extension/src/pages/common/components/ui/Popover/popover.pcss

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(popover/* default */.A, options);




       /* harmony default export */ const Popover_popover = (popover/* default */.A && popover/* default */.A.locals ? popover/* default */.A.locals : undefined);

;// ./Extension/src/pages/common/components/ui/Popover/Popover.tsx
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
 * Default delay before showing popover.
 */ const POPOVER_SHOW_DELAY_MS = 500;
/**
 * Wrap child container for handle tooltips rendering in overlay on hover
 */ const Popover = ({ text, delay, comingSoon, fixedWidth, children, ...props })=>{
    const defaultTooltip = {
        visible: false,
        position: null
    };
    const [tooltip, setTooltip] = (0,react.useState)(defaultTooltip);
    const timer = (0,react.useRef)();
    // clear timer on unmounting
    (0,react.useEffect)(()=>{
        return ()=>{
            clearTimeout(timer.current);
        };
    }, []);
    const handleMouseEnter = (e)=>{
        const { left, bottom } = e.currentTarget.getBoundingClientRect();
        timer.current = setTimeout(()=>{
            setTooltip({
                visible: true,
                position: {
                    x: left + window.scrollX,
                    y: bottom + window.scrollY
                }
            });
        }, delay || POPOVER_SHOW_DELAY_MS);
    };
    const handleMouseLeave = ()=>{
        clearTimeout(timer.current);
        setTooltip({
            visible: false,
            position: null
        });
    };
    const popoverClassName = comingSoon ? 'popover popover--coming-soon' : 'popover';
    return /*#__PURE__*/ react.createElement("div", {
        className: popoverClassName,
        ...props,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave
    }, tooltip.visible && tooltip.position && /*#__PURE__*/ react.createElement(AttachmentPortal/* AttachmentPortal */.c, {
        rootId: "root-portal",
        position: tooltip.position
    }, /*#__PURE__*/ react.createElement(Tooltip/* Tooltip */.m, {
        text: text,
        visible: tooltip.visible,
        fixedWidth: true
    })), children);
};


/***/ }),

/***/ 86816:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* reexport safe */ _Popover__WEBPACK_IMPORTED_MODULE_0__.A)
/* harmony export */ });
/* harmony import */ var _Popover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(80858);
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


/***/ }),

/***/ 83355:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  m: () => (/* reexport */ Tooltip)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/react@17.0.2/node_modules/react/index.js
var react = __webpack_require__(91445);
// EXTERNAL MODULE: ./node_modules/.pnpm/classnames@2.3.2/node_modules/classnames/index.js
var classnames = __webpack_require__(55184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(74234);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(81083);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(47481);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(19202);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(24366);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(22355);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/.pnpm/css-loader@6.7.3_webpack@5.97.1_@swc+core@1.11.21_/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/.pnpm/postcss-loader@8.1.1_postcss@8.4.49_typescript@5.6.3_webpack@5.97.1_@swc+core@1.11.21_/node_modules/postcss-loader/dist/cjs.js!./Extension/src/pages/common/components/ui/Tooltip/tooltip.pcss
var tooltip = __webpack_require__(606);
;// ./Extension/src/pages/common/components/ui/Tooltip/tooltip.pcss

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(tooltip/* default */.A, options);




       /* harmony default export */ const Tooltip_tooltip = (tooltip/* default */.A && tooltip/* default */.A.locals ? tooltip/* default */.A.locals : undefined);

;// ./Extension/src/pages/common/components/ui/Tooltip/Tooltip.tsx
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


const Tooltip = ({ text, visible, fixedWidth })=>{
    return /*#__PURE__*/ react.createElement("div", {
        className: classnames_default()('tooltip', {
            'tooltip--on': visible,
            'tooltip--off': !visible,
            'tooltip--fixed-width': fixedWidth
        })
    }, text);
};

;// ./Extension/src/pages/common/components/ui/Tooltip/index.ts
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


/***/ }),

/***/ 52299:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VD: () => (/* binding */ FILE_WRONG_EXTENSION_CAUSE),
/* harmony export */   it: () => (/* binding */ TIME_TO_REMOVE_NOTIFICATION_MS),
/* harmony export */   kG: () => (/* binding */ MIN_LOADER_SHOWING_TIME_MS),
/* harmony export */   ph: () => (/* binding */ MIN_USER_RULES_REMOVAL_DISPLAY_DURATION_MS)
/* harmony export */ });
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
 */ const MIN_USER_RULES_REMOVAL_DISPLAY_DURATION_MS = 1500;
/**
 * Minimal delay for showing loader. Needed in mv3 for smoother user experience.
 */ const MIN_LOADER_SHOWING_TIME_MS = 500;
/**
 * Error cause identifier for when a file has an incorrect extension.
 */ const FILE_WRONG_EXTENSION_CAUSE = 'fileWrongExtension';
/**
 * Timeout for closing the notification, same as in the styles animation.
 */ const TIME_TO_REMOVE_NOTIFICATION_MS = 300;


/***/ }),

/***/ 92557:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ usePreventUnload)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91445);
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
 * The main use case for this hook is to trigger a browser-generated confirmation
 * dialog depending on `blockCondition` flag that asks users to confirm if they really
 * want to leave the page when they try to close or reload it,
 * or navigate somewhere else (by manually typing url in search bar).
 * This is intended to help prevent loss of unsaved data.
 *
 * @param shouldPreventUnload If true, blocks unload of page and show browser-generated dialog.
 * @param browserDialogMessage Custom message for browser-generated dialog (Browser support list: https://caniuse.com/mdn-api_beforeunloadevent_returnvalue). Keep in mind that some browsers can support custom messages, but in fact can ignore that value.
 */ const usePreventUnload = (shouldPreventUnload, browserDialogMessage)=>{
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const onBeforeUnload = (e)=>{
            if (!shouldPreventUnload) {
                return;
            }
            e.preventDefault();
            e.returnValue = browserDialogMessage;
            return browserDialogMessage;
        };
        window.addEventListener('beforeunload', onBeforeUnload);
        return ()=>{
            window.removeEventListener('beforeunload', onBeforeUnload);
        };
    }, [
        shouldPreventUnload,
        browserDialogMessage
    ]);
};


/***/ }),

/***/ 41159:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  F: () => (/* reexport */ TelemetryStore),
  p: () => (/* reexport */ useTelemetryPageViewEvent)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/mobx@6.9.0/node_modules/mobx/dist/mobx.esm.js
var mobx_esm = __webpack_require__(47938);
// EXTERNAL MODULE: ./Extension/src/common/logger.ts
var logger = __webpack_require__(9659);
// EXTERNAL MODULE: ./Extension/src/pages/services/messenger.ts
var messenger = __webpack_require__(87912);
;// ./Extension/src/pages/common/telemetry/TelemetryStore.ts
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
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}



/**
 * Telemetry store.
 *
 * This store is integrated into both popup and option page's
 * global stores. This is why it's located in the common folder.
 */ class TelemetryStore {
    /**
     * Gets whether anonymized usage data is allowed.
     */ get isAnonymizedUsageDataAllowed() {
        return this.allowAnonymizedUsageData;
    }
    constructor(){
        /**
     * Is anonymized usage data allowed.
     */ _define_property(this, "allowAnonymizedUsageData", false);
        /**
     * ID of the current page.
     */ _define_property(this, "pageId", null);
        /**
     * Sets the "is anonymized usage data allowed" setting.
     *
     * NOTE: This method should be called only on initialization
     * and when value is changed from background, never call it directly.
     *
     * @param isAnonymizedUsageDataAllowed Is anonymized usage data allowed.
     */ _define_property(this, "setIsAnonymizedUsageDataAllowed", (isAnonymizedUsageDataAllowed)=>{
            this.allowAnonymizedUsageData = isAnonymizedUsageDataAllowed;
        });
        /**
     * Sets the page ID.
     *
     * @param pageId Page ID.
     */ _define_property(this, "setPageId", (pageId)=>{
            // Guard against multiple calls, allow to set page ID only once or to `null`
            if (this.pageId && pageId) {
                logger/* logger */.v.error(`[ext.TelemetryStore]: Cannot set page ID: already set to '${this.pageId}'`);
                return;
            }
            this.pageId = pageId;
        });
        /**
     * Removes previously added opened page from telemetry service.
     *
     * Note: This method should be called only from options page,
     * for popup page we have separate handling based on background connection,
     * since popup page does not fires unload event.
     */ _define_property(this, "removeOpenedPage", async ()=>{
            try {
                if (!this.pageId) {
                    return;
                }
                // Delete from store first to prevent race condition
                const { pageId } = this;
                (0,mobx_esm/* runInAction */.h5)(()=>{
                    this.pageId = null;
                });
                await messenger/* messenger */.ee.removeTelemetryOpenedPage(pageId);
            } catch (e) {
                logger/* logger */.v.debug('[ext.TelemetryStore]: Failed to remove opened page from telemetry service', e);
            }
        });
        /**
     * Sends a message to the background to send a page view telemetry event if telemetry is enabled.
     *
     * NOTE: Do not await this function, as it is not necessary to wait for the response.
     *
     * @param screenName Name of the screen.
     */ _define_property(this, "sendPageViewEvent", async (screenName)=>{
            try {
                if (!this.isAnonymizedUsageDataAllowed) {
                    return;
                }
                if (!this.pageId) {
                    logger/* logger */.v.error(`[ext.TelemetryStore]: Cannot send page view telemetry event: missing page ID for screen '${screenName}'`);
                    return;
                }
                await messenger/* messenger */.ee.sendTelemetryPageViewEvent(screenName, this.pageId);
            } catch (e) {
                logger/* logger */.v.debug('[ext.TelemetryStore]: Failed to send page view telemetry event', e);
            }
        });
        /**
     * Sends a message to the background to send a custom telemetry event if telemetry is enabled.
     *
     * NOTE: Do not await this function, as it is not necessary to wait for the response.
     *
     * @param eventName Name of the custom telemetry event.
     * @param screenName Name of the screen where the event occurred.
     */ _define_property(this, "sendCustomEvent", async (eventName, screenName)=>{
            try {
                if (!this.isAnonymizedUsageDataAllowed) {
                    return;
                }
                await messenger/* messenger */.ee.sendTelemetryCustomEvent(screenName, eventName);
            } catch (e) {
                logger/* logger */.v.debug('[ext.TelemetryStore]: Failed to send custom telemetry event', e);
            }
        });
    }
}
_ts_decorate([
    mobx_esm/* observable */.sH
], TelemetryStore.prototype, "allowAnonymizedUsageData", void 0);
_ts_decorate([
    mobx_esm/* computed */.EW
], TelemetryStore.prototype, "isAnonymizedUsageDataAllowed", null);
_ts_decorate([
    mobx_esm/* observable */.sH
], TelemetryStore.prototype, "pageId", void 0);
_ts_decorate([
    mobx_esm/* action */.XI
], TelemetryStore.prototype, "setIsAnonymizedUsageDataAllowed", void 0);
_ts_decorate([
    mobx_esm/* action */.XI
], TelemetryStore.prototype, "setPageId", void 0);
_ts_decorate([
    mobx_esm/* action */.XI
], TelemetryStore.prototype, "removeOpenedPage", void 0);

// EXTERNAL MODULE: ./node_modules/.pnpm/react@17.0.2/node_modules/react/index.js
var react = __webpack_require__(91445);
;// ./Extension/src/pages/common/telemetry/useTelemetryPageViewEvent.ts
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
 * Hook that sends a page view telemetry event when the component is mounted.
 *
 * The event is sent once on component mount with the specified screen name.
 * The backend tracks screen navigation using pageId from the telemetry store.
 *
 * @param telemetryStore Telemetry store instance.
 * @param screenName Name of the screen to be logged in telemetry.
 */ function useTelemetryPageViewEvent(telemetryStore, screenName) {
    (0,react.useEffect)(()=>{
        if (!telemetryStore.pageId) {
            return;
        }
        telemetryStore.sendPageViewEvent(screenName);
    }, [
        telemetryStore,
        screenName,
        telemetryStore.pageId,
        telemetryStore.isAnonymizedUsageDataAllowed
    ]);
}

;// ./Extension/src/pages/common/telemetry/index.ts
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



/***/ }),

/***/ 41459:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ NotificationType)
/* harmony export */ });
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
 * Notification type.
 */ var NotificationType = /*#__PURE__*/ function(NotificationType) {
    /**
     * Notification type for loading state. The icon should be animated.
     */ NotificationType["Loading"] = "loading";
    /**
     * Notification type for success state.
     */ NotificationType["Success"] = "success";
    /**
     * Notification type for error state.
     */ NotificationType["Error"] = "error";
    return NotificationType;
}({});


/***/ }),

/***/ 98864:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ getFirstNonDisabledElement)
/* harmony export */ });
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
 * Retrieves first non-disabled element from parent element
 *
 * @param root Root element to search for descendant elements
 * @param selectors Descendants selector
 *
 * @returns First non-disabled element or null if not found
 */ function getFirstNonDisabledElement(root, selectors) {
    const elements = root.querySelectorAll(selectors);
    for(let i = 0; i < elements.length; i += 1){
        const element = elements[i];
        if (element instanceof HTMLElement && (!('disabled' in element) || !element.disabled)) {
            return element;
        }
    }
    return null;
}


/***/ }),

/***/ 53472:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Rz: () => (/* binding */ exportData),
/* harmony export */   m6: () => (/* binding */ ExportTypes)
/* harmony export */ });
/* unused harmony export getExportedSettingsFilename */
/* harmony import */ var core_js_modules_web_url_search_params_delete_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4659);
/* harmony import */ var core_js_modules_web_url_search_params_delete_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url_search_params_delete_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_url_search_params_has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43526);
/* harmony import */ var core_js_modules_web_url_search_params_has_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url_search_params_has_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_url_search_params_size_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9561);
/* harmony import */ var core_js_modules_web_url_search_params_size_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url_search_params_size_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(81660);
/* harmony import */ var _services_messenger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(87912);
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
 * Export types.
 *
 * @readonly
 * @enum {string}
 */ var ExportTypes = /*#__PURE__*/ function(ExportTypes) {
    ExportTypes["UserFilter"] = "user_filter";
    ExportTypes["Allowlist"] = "allow_list";
    ExportTypes["Settings"] = "settings";
    return ExportTypes;
}({});
const exportMetadata = {
    ["user_filter"]: {
        name: 'user_rules',
        getData: ()=>_services_messenger__WEBPACK_IMPORTED_MODULE_3__/* .messenger */ .ee.getUserRules(),
        ext: 'txt'
    },
    ["allow_list"]: {
        name: 'allowlist',
        getData: ()=>_services_messenger__WEBPACK_IMPORTED_MODULE_3__/* .messenger */ .ee.getAllowlistDomains(),
        ext: 'txt'
    },
    ["settings"]: {
        name: 'settings',
        getData: ()=>_services_messenger__WEBPACK_IMPORTED_MODULE_3__/* .messenger */ .ee.loadSettingsJson(),
        ext: 'json'
    }
};
/**
 * Generates filename for exported `type`.
 *
 * @param type Type of export
 * @param appVersion App version
 *
 * @returns Filename
 */ const getExportedSettingsFilename = (type, appVersion)=>{
    const { name, ext } = exportMetadata[type];
    const product = `adg_ext_${name}`;
    const currentTimeString = (0,date_fns__WEBPACK_IMPORTED_MODULE_4__/* .format */ .GP)(Date.now(), 'ddMMyy-HHmmss');
    return `${product}_${appVersion}_${currentTimeString}.${ext}`;
};
/**
 * Exports data to file and downloads it in browser.
 *
 * @param type Type of export
 */ const exportData = async (type)=>{
    const { getData } = exportMetadata[type];
    const { content, appVersion } = await getData();
    const filename = getExportedSettingsFilename(type, appVersion);
    const blob = new Blob([
        content
    ]);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
};


/***/ }),

/***/ 32111:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gt: () => (/* binding */ containsIgnoreCase),
/* harmony export */   K2: () => (/* binding */ updateFilterDescription),
/* harmony export */   UK: () => (/* binding */ isVerticalScroll),
/* harmony export */   WI: () => (/* binding */ measureTextWidth),
/* harmony export */   i_: () => (/* binding */ handleFileUpload),
/* harmony export */   lW: () => (/* binding */ copyToClipboard),
/* harmony export */   mJ: () => (/* binding */ getFilterName),
/* harmony export */   w5: () => (/* binding */ findChunks),
/* harmony export */   wh: () => (/* binding */ passiveEventSupported)
/* harmony export */ });
/* unused harmony export getFilenameExtension */
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59952);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10474);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(33926);
/* harmony import */ var _common_translators_translator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14717);
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(52299);
/* harmony import */ var _common_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(41459);
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





const getFilenameExtension = (filename)=>{
    if (!filename) {
        return undefined;
    }
    const parts = filename.split('.');
    if (parts.length < 2) {
        return undefined;
    }
    return parts[parts.length - 1];
};
/**
 * Handles file upload
 *
 * @param file File to upload.
 * @param requiredExtension Required file extension.
 *
 * @returns Promise that resolves with file content as string if file is uploaded successfully,
 * and rejects with error message otherwise.
 */ const handleFileUpload = (file, requiredExtension)=>{
    return new Promise((resolve, reject)=>{
        if (getFilenameExtension(file.name) !== requiredExtension) {
            reject(new Error(_common_translators_translator__WEBPACK_IMPORTED_MODULE_3__/* .translator */ .N.getMessage('options_popup_import_settings_wrong_file_ext', {
                extension: requiredExtension
            }), {
                cause: _common_constants__WEBPACK_IMPORTED_MODULE_5__/* .FILE_WRONG_EXTENSION_CAUSE */ .VD
            }));
        }
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = (event)=>{
            if (event.target) {
                // @ts-ignore
                resolve(event.target.result);
            }
        };
        reader.onerror = ()=>{
            reject(new Error(_common_translators_translator__WEBPACK_IMPORTED_MODULE_3__/* .translator */ .N.getMessage('options_popup_import_error_file_description')));
        };
    });
};
const indexOfIgnoreCase = (str, searchString)=>{
    return str.toLowerCase().indexOf(searchString.toLowerCase());
};
const containsIgnoreCase = (str, searchString)=>{
    return !!(str && searchString && indexOfIgnoreCase(str, searchString) >= 0);
};
const findChunks = (str, searchString, chunks = [])=>{
    const ind = indexOfIgnoreCase(str, searchString);
    if (ind > -1) {
        chunks.push(str.slice(0, ind));
        chunks.push(str.slice(ind, ind + searchString.length));
        const restStr = str.slice(ind + searchString.length);
        if (containsIgnoreCase(restStr, searchString)) {
            findChunks(restStr, searchString, chunks);
        } else {
            chunks.push(restStr);
        }
    }
    return chunks.filter((i)=>!!i);
};
const passiveEventSupported = (()=>{
    let passiveSupported = null;
    return ()=>{
        // memoize support to avoid adding multiple test events
        if (typeof passiveSupported === 'boolean') {
            return passiveSupported;
        }
        let supported = false;
        try {
            const options = {
                get passive () {
                    supported = true;
                    return false;
                }
            };
            // @ts-ignore
            window.addEventListener('test', null, options);
            // @ts-ignore
            window.removeEventListener('test', null, options);
        } catch (err) {
            supported = false;
        }
        passiveSupported = supported;
        return passiveSupported;
    };
})();
const copyToClipboard = (text)=>{
    const textarea = document.createElement('textarea');
    textarea.innerText = text;
    // @ts-ignore
    textarea.style = `
        position: absolute;
        display: hidden;
        width: 0;
        height: 0;
    `;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
};
const measureTextWidth = (text)=>{
    const el = document.createElement('p');
    el.innerText = text;
    // @ts-ignore
    el.style = `
        position: absolute;
        display: hidden;
        height: 0;
        white-space: nowrap;
        font-family: Roboto, "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, Arial, sans-serif;
        font-size: 14px;
    `;
    document.body.appendChild(el);
    const pxLength = el.clientWidth;
    el.remove();
    return pxLength;
};
/**
 * Calculates the angle of radius vector of the scroll motion
 * and detect whether scroll is vertical
 *
 * @param deltaY Wheel event deltaY value.
 * @param  deltaX Wheel event deltaX value.
 *
 * @returns True if scroll is vertical, false otherwise.
 */ const isVerticalScroll = (()=>{
    const degToRad = (deg)=>deg * (Math.PI / 180);
    const deg60ToRad = degToRad(60);
    const deg90ToRad = degToRad(90);
    const deg120ToRad = degToRad(120);
    const deg240ToRad = degToRad(240);
    const deg270ToRad = degToRad(270);
    const deg300ToRad = degToRad(300);
    return (deltaY, deltaX)=>{
        if (deltaY === 0) {
            return false;
        }
        let angle = Math.atan(deltaX / deltaY);
        angle = deltaY > 0 ? angle + deg90ToRad : angle + deg270ToRad;
        return angle > deg60ToRad && angle < deg120ToRad || angle > deg240ToRad && angle < deg300ToRad;
    };
})();
/**
 * Checks the length of the array with filters and returns the contents for notification.
 *
 * @param updatedFilters Array with updated filters.
 *
 * @returns Object with title and description describing error if `updatedFilters` is not provided,
 * otherwise description with information about updated filters.
 */ const updateFilterDescription = (updatedFilters)=>{
    if (!updatedFilters) {
        return {
            type: _common_types__WEBPACK_IMPORTED_MODULE_4__/* .NotificationType */ ._.Error,
            text: _common_translators_translator__WEBPACK_IMPORTED_MODULE_3__/* .translator */ .N.getMessage('options_popup_update_error')
        };
    }
    const filterNames = updatedFilters.map((filter)=>filter.name).join(', ');
    // no updated filters
    let text = `${filterNames} ${_common_translators_translator__WEBPACK_IMPORTED_MODULE_3__/* .translator */ .N.getMessage('options_popup_update_not_found')}`;
    if (updatedFilters.length === 1) {
        text = `${filterNames} ${_common_translators_translator__WEBPACK_IMPORTED_MODULE_3__/* .translator */ .N.getMessage('options_popup_update_filter')}`;
    } else if (updatedFilters.length > 1) {
        text = `${filterNames} ${_common_translators_translator__WEBPACK_IMPORTED_MODULE_3__/* .translator */ .N.getMessage('options_popup_update_filters')}`;
    }
    return {
        type: _common_types__WEBPACK_IMPORTED_MODULE_4__/* .NotificationType */ ._.Success,
        text
    };
};
/**
 * Returns filter name for filterId.
 *
 * @param filterId Filter id.
 * @param filtersMetadata Filters metadata.
 *
 * @returns Filter name for filterId.
 */ const getFilterName = (filterId, filtersMetadata)=>{
    if (filterId === undefined || !filtersMetadata) {
        return null;
    }
    if (filterId === _common_constants__WEBPACK_IMPORTED_MODULE_2__/* .AntiBannerFiltersId */ .j8.UserFilterId) {
        return _common_translators_translator__WEBPACK_IMPORTED_MODULE_3__/* .translator */ .N.getMessage('options_userfilter');
    }
    if (filterId === _common_constants__WEBPACK_IMPORTED_MODULE_2__/* .AntiBannerFiltersId */ .j8.AllowlistFilterId) {
        return _common_translators_translator__WEBPACK_IMPORTED_MODULE_3__/* .translator */ .N.getMessage('options_allowlist');
    }
    const filterMetadata = filtersMetadata.find((el)=>el.filterId === filterId);
    return filterMetadata ? filterMetadata.name : null;
};


/***/ }),

/***/ 86176:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Yq: () => (/* binding */ formatDate),
  WO: () => (/* binding */ sortFilters),
  o7: () => (/* binding */ sortGroupsOnSearch),
  vm: () => (/* binding */ updateFilters),
  eq: () => (/* binding */ updateGroups)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.40.0/node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(10474);
// EXTERNAL MODULE: ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/sortBy.js + 14 modules
var sortBy = __webpack_require__(32836);
// EXTERNAL MODULE: ./Extension/src/common/constants.ts
var constants = __webpack_require__(33926);
// EXTERNAL MODULE: ./Extension/src/common/custom-filter-utils.ts
var custom_filter_utils = __webpack_require__(21399);
;// ./Extension/src/common/common-filter-utils.ts
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
 */ // types import from background does not affect on bundle size


/**
 * Extracted to common helper class to avoid bundling of background filter api code
 * into pages where only this helper is used, e.g., fullscreen-user-rules.js.
 */ class CommonFilterUtils {
    /**
     * Checks if filter is built-in: not custom, not user-rules, not allowlist
     * and not quick fixes filter (used only for MV3 version).
     *
     * @param filterId Filter id.
     *
     * @returns True, if filter is common, else returns false.
     */ static isCommonFilter(filterId) {
        return !custom_filter_utils/* CustomFilterUtils */.D.isCustomFilter(filterId) && filterId !== constants/* AntiBannerFiltersId */.j8.UserFilterId && filterId !== constants/* AntiBannerFiltersId */.j8.AllowlistFilterId;
    // TODO: revert if Quick Fixes filter is back
    // && filterId !== AntiBannerFiltersId.QuickFixesFilterId;
    }
    /**
     * Checks whether the filter is a regular filter.
     *
     * It is needed only for proper types checking instead of type castings.
     *
     * @param filter Filter metadata.
     *
     * @returns True if filter is a regular filter, false otherwise.
     */ static isRegularFilterMetadata(filter) {
        return CommonFilterUtils.isCommonFilter(filter.filterId);
    }
}

;// ./Extension/src/pages/options/components/Filters/helpers.ts
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

// but code import does, so only common code must be imported

/**
 * Sorts filters by enabled status and displayNumber.
 * It also filters out deprecated filters.
 *
 * @param filters Filters to sort.
 *
 * @returns Sorted filters.
 */ const sortFilters = (filters)=>{
    const sorted = [
        ...filters
    ].sort((a, b)=>{
        // sort by enabled
        const enabledA = !!a.enabled;
        const enabledB = !!b.enabled;
        if (enabledA !== enabledB) {
            return Number(enabledB) - Number(enabledA);
        }
        // sort by groupId
        if (a.groupId !== b.groupId) {
            return a.groupId - b.groupId;
        }
        // sort by display number
        if (a.displayNumber && b.displayNumber) {
            return a.displayNumber - b.displayNumber;
        }
        if (a.displayNumber) {
            return 1;
        }
        if (b.displayNumber) {
            return -1;
        }
        return 0;
    })// do not display deprecated filters
    .filter((filter)=>{
        // only _regular_ filters can be deprecated, not custom ones
        return CommonFilterUtils.isRegularFilterMetadata(filter) ? !filter.deprecated : true;
    });
    return sorted;
};
/**
 * Updates filters state without changing order
 *
 * @param currentFilters
 * @param newFilters
 *
 * @returns Filters with updated state.
 */ const updateFilters = (currentFilters, newFilters)=>{
    const updatedFilters = [
        ...currentFilters
    ];
    newFilters.forEach((newFilter)=>{
        const currentFilterIdx = currentFilters.findIndex((currentFilter)=>{
            return currentFilter.filterId === newFilter.filterId;
        });
        if (currentFilterIdx < 0) {
            updatedFilters.push(newFilter);
        } else {
            updatedFilters[currentFilterIdx] = newFilter;
        }
    });
    return updatedFilters;
};
/**
 * Updates groups state without changing order
 *
 * @param currentGroups
 * @param newGroups
 *
 * @returns Groups with updated state.
 */ const updateGroups = (currentGroups, newGroups)=>{
    const updatedGroups = [
        ...currentGroups
    ];
    newGroups.forEach((newGroup)=>{
        const currentGroupIdx = currentGroups.findIndex((currentGroup)=>{
            return currentGroup.groupId === newGroup.groupId;
        });
        if (currentGroupIdx < 0) {
            updatedGroups.push(newGroup);
        } else {
            updatedGroups[currentGroupIdx] = newGroup;
        }
    });
    return updatedGroups;
};
const sortGroupsOnSearch = (groups)=>{
    const sortedGroups = (0,sortBy/* default */.A)(groups, 'displayNumber').sort((a, b)=>{
        // enabled first
        if (a.enabled && !b.enabled) {
            return -1;
        }
        if (!a.enabled && b.enabled) {
            return 1;
        }
        return 0;
    });
    return sortedGroups;
};
/**
 * Formats `date` to string.
 *
 * @param dateMs Date to format.
 *
 * @returns Formatted date.
 */ const formatDate = (dateMs)=>{
    const dateObj = new Date(dateMs);
    const formatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return dateObj.toLocaleDateString('default', formatOptions);
};


/***/ }),

/***/ 7161:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  $: () => (/* reexport */ Notifications)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/mobx-react@7.6.0_mobx@6.9.0_react-dom@17.0.2_react@17.0.2__react@17.0.2/node_modules/mobx-react/dist/mobxreact.esm.js + 14 modules
var mobxreact_esm = __webpack_require__(84246);
// EXTERNAL MODULE: ./node_modules/.pnpm/react@17.0.2/node_modules/react/index.js
var react = __webpack_require__(91445);
// EXTERNAL MODULE: ./Extension/src/pages/options/stores/RootStore.ts + 2 modules
var RootStore = __webpack_require__(47681);
// EXTERNAL MODULE: ./node_modules/.pnpm/classnames@2.3.2/node_modules/classnames/index.js
var classnames = __webpack_require__(55184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./Extension/src/common/constants.ts
var constants = __webpack_require__(33926);
// EXTERNAL MODULE: ./Extension/src/pages/common/constants.ts
var common_constants = __webpack_require__(52299);
// EXTERNAL MODULE: ./Extension/src/pages/common/components/ui/Icon.tsx
var Icon = __webpack_require__(70687);
// EXTERNAL MODULE: ./Extension/src/pages/common/types.ts
var types = __webpack_require__(41459);
// EXTERNAL MODULE: ./Extension/src/common/translators/translator.ts
var translator = __webpack_require__(14717);
;// ./Extension/src/pages/options/components/Notifications/Notification.tsx
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
 * Notification component.
 *
 * @param props Notification component props
 */ const Notification = (props)=>{
    const [notificationIsClosed, setNotificationIsClosed] = (0,react.useState)(false);
    const [shouldCloseOnTimeout, setShouldCloseOnTimeout] = (0,react.useState)(true);
    const { uiStore } = (0,react.useContext)(RootStore/* rootStore */.a);
    const { id, text, type, button } = props;
    (0,react.useEffect)(()=>{
        const closeTimeout = setTimeout(()=>{
            if (shouldCloseOnTimeout) {
                setNotificationIsClosed(true);
            }
        }, constants/* NOTIFICATION_TTL_MS */.UA);
        const removeTimeout = setTimeout(()=>{
            if (shouldCloseOnTimeout) {
                uiStore.removeNotification(id);
            }
        }, constants/* NOTIFICATION_TTL_MS */.UA + common_constants/* TIME_TO_REMOVE_NOTIFICATION_MS */.it);
        return ()=>{
            clearTimeout(closeTimeout);
            clearTimeout(removeTimeout);
        };
    }, [
        id,
        uiStore,
        shouldCloseOnTimeout
    ]);
    const notificationClassnames = classnames_default()(`notification notification--${type}`, {
        'notification--close': notificationIsClosed
    });
    const removeOnClickTimeoutRef = (0,react.useRef)();
    (0,react.useEffect)(()=>{
        return ()=>{
            clearTimeout(removeOnClickTimeoutRef.current);
        };
    }, []);
    /**
     * Handles close button click:
     * 1. marks notification as closed,
     * 2. removes notification from UI store after a delay.
     */ const handleCloseClick = ()=>{
        setNotificationIsClosed(true);
        removeOnClickTimeoutRef.current = window.setTimeout(()=>{
            uiStore.removeNotification(id);
        }, common_constants/* TIME_TO_REMOVE_NOTIFICATION_MS */.it);
    };
    /**
     * Handles mouse over event which prevents notification from closing.
     */ const handleMouseOver = ()=>{
        setShouldCloseOnTimeout(false);
    };
    return /*#__PURE__*/ react.createElement("div", {
        className: notificationClassnames,
        onMouseEnter: handleMouseOver
    }, /*#__PURE__*/ react.createElement(Icon/* Icon */.I, {
        id: type === types/* NotificationType */._.Success ? '#tick' : '#info',
        className: "icon--24",
        "aria-hidden": "true"
    }), /*#__PURE__*/ react.createElement("div", {
        role: "status",
        className: "notification__content",
        "aria-live": "assertive"
    }, /*#__PURE__*/ react.createElement("p", null, text), button && /*#__PURE__*/ react.createElement("button", {
        type: "button",
        role: "link",
        onClick: ()=>{
            handleCloseClick();
            button.onClick();
        },
        title: button.title
    }, button.title)), /*#__PURE__*/ react.createElement("button", {
        type: "button",
        className: "notification__btn-close",
        onClick: handleCloseClick,
        "aria-label": translator/* translator */.N.getMessage('close_button_title')
    }, /*#__PURE__*/ react.createElement(Icon/* Icon */.I, {
        id: "#cross",
        className: "icon--24 icon--gray-default",
        "aria-hidden": "true"
    })));
};

// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(74234);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(81083);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(47481);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(19202);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(24366);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@3.3.2_webpack@5.97.1_@swc+core@1.11.21_/node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(22355);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/.pnpm/css-loader@6.7.3_webpack@5.97.1_@swc+core@1.11.21_/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/.pnpm/postcss-loader@8.1.1_postcss@8.4.49_typescript@5.6.3_webpack@5.97.1_@swc+core@1.11.21_/node_modules/postcss-loader/dist/cjs.js!./Extension/src/pages/options/components/Notifications/notifications.pcss
var notifications = __webpack_require__(29016);
;// ./Extension/src/pages/options/components/Notifications/notifications.pcss

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(notifications/* default */.A, options);




       /* harmony default export */ const Notifications_notifications = (notifications/* default */.A && notifications/* default */.A.locals ? notifications/* default */.A.locals : undefined);

;// ./Extension/src/pages/options/components/Notifications/Notifications.tsx
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




const Notifications = (0,mobxreact_esm/* observer */.PA)(()=>{
    const { uiStore } = (0,react.useContext)(RootStore/* rootStore */.a);
    const { notifications } = uiStore;
    if (notifications.length === 0) {
        return null;
    }
    /**
     * Reverse notifications to correct transition for change position
     * of notification. If we use normal, not reversed order, new notification
     * will push old notifications (up or down) on the Y axis without transition.
     */ const reversedNotifications = notifications.slice().reverse();
    return /*#__PURE__*/ react.createElement("div", {
        className: "notifications"
    }, reversedNotifications.map((notification)=>/*#__PURE__*/ react.createElement(Notification, {
            key: notification.id,
            ...notification
        })));
});

;// ./Extension/src/pages/options/components/Notifications/index.ts
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


/***/ }),

/***/ 51678:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ getDynamicWarningMessage),
/* harmony export */   E: () => (/* binding */ getStaticWarningMessage)
/* harmony export */ });
/* harmony import */ var _common_translators_translator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14717);
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
 * Returns a warning message based on the data.
 *
 * @param data Result of limits check of static rules.
 *
 * @returns Warning message or null if the data is invalid.
 */ const getStaticWarningMessage = (data)=>{
    const { filtersCount, rulesCount, rulesRegexpsCount } = data;
    if (filtersCount) {
        if (filtersCount.expected !== undefined && filtersCount.current !== undefined) {
            return _common_translators_translator__WEBPACK_IMPORTED_MODULE_0__/* .translator */ .N.getMessage('options_all_limits_exceeded_warning', {
                current: filtersCount.current,
                expected: filtersCount.expected
            });
        }
        if (filtersCount.maximum !== undefined && filtersCount.current !== undefined) {
            return _common_translators_translator__WEBPACK_IMPORTED_MODULE_0__/* .translator */ .N.getMessage('options_limits_warning_static_filters', {
                current: filtersCount.current,
                maximum: filtersCount.maximum
            });
        }
    }
    if (rulesCount) {
        return _common_translators_translator__WEBPACK_IMPORTED_MODULE_0__/* .translator */ .N.getMessage('options_limits_warning_static_rules', {
            current: rulesCount.current,
            maximum: rulesCount.maximum
        });
    }
    if (rulesRegexpsCount) {
        return _common_translators_translator__WEBPACK_IMPORTED_MODULE_0__/* .translator */ .N.getMessage('options_limits_warning_static_regex_rules', {
            current: rulesRegexpsCount.current,
            maximum: rulesRegexpsCount.maximum
        });
    }
    return null;
};
/**
 * Returns a warning message based on the data.
 *
 * @param data Result of limits check of dynamic rules.
 *
 * @returns Warning message or null if the data is invalid.
 */ const getDynamicWarningMessage = (data)=>{
    const { rulesCount, rulesRegexpsCount, rulesUnsafeCount } = data;
    if (rulesCount) {
        return _common_translators_translator__WEBPACK_IMPORTED_MODULE_0__/* .translator */ .N.getMessage('options_limits_warning_dynamic_rules', {
            current: rulesCount.current,
            maximum: rulesCount.maximum
        });
    }
    if (rulesRegexpsCount) {
        return _common_translators_translator__WEBPACK_IMPORTED_MODULE_0__/* .translator */ .N.getMessage('options_limits_warning_dynamic_regex_rules', {
            current: rulesRegexpsCount.current,
            maximum: rulesRegexpsCount.maximum
        });
    }
    if (rulesUnsafeCount) {
        return _common_translators_translator__WEBPACK_IMPORTED_MODULE_0__/* .translator */ .N.getMessage('options_limits_warning_dynamic_unsafe_rules', {
            current: rulesUnsafeCount.current,
            maximum: rulesUnsafeCount.maximum
        });
    }
    return null;
};


/***/ }),

/***/ 11752:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  O: () => (/* binding */ optionsStorage)
});

// EXTERNAL MODULE: ./Extension/src/common/logger.ts
var logger = __webpack_require__(9659);
;// ./Extension/src/pages/options/options-storage/OptionsStorage.ts
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
 * Module used to keep options page settings, which do not need extension level persistence
 */ class OptionsStorage {
    /**
     * Set item to storage.
     *
     * @param key Key
     * @param value Value
     */ setItem(key, value) {
        try {
            this.storage.setItem(key, JSON.stringify(value));
        } catch (e) {
            logger/* logger */.v.error('[ext.OptionsStorage.setItem]: error: ', e);
        }
    }
    /**
     * Get item from storage.
     *
     * @param key Key
     */ getItem(key) {
        let storedValue = null;
        const item = this.storage.getItem(key);
        if (item !== null) {
            try {
                storedValue = JSON.parse(item);
            } catch (e) {
                logger/* logger */.v.error('[ext.OptionsStorage.getItem]: error: ', e);
            }
        }
        return storedValue === null ? this.DEFAULTS[key] : storedValue;
    }
    constructor(){
        _define_property(this, "KEYS", {
            /**
         * Allowlist editor wrap setting
         */ ALLOWLIST_EDITOR_WRAP: 'allowlist-editor-wrap',
            /**
         * Filtering log columns widths
         */ COLUMNS_WIDTHS_PX: 'columns-widths-px',
            /**
         * Filtering log columns widths
         */ COLUMNS_DATA: 'columns-data',
            /**
         * Request modal width
         */ REQUEST_INFO_MODAL_WIDTH: 'request-info-modal-width'
        });
        _define_property(this, "DEFAULTS", {
            [this.KEYS.ALLOWLIST_EDITOR_WRAP]: false,
            [this.KEYS.REQUEST_INFO_MODAL_WIDTH]: null,
            [this.KEYS.COLUMNS_DATA]: {
                status: {
                    width: 260
                },
                url: {
                    width: 260
                },
                type: {
                    width: 100
                },
                rule: {
                    width: 260
                },
                filter: {
                    width: 260
                },
                source: {
                    width: 200
                }
            }
        });
        /**
     * Storage object
     */ _define_property(this, "storage", void 0);
        this.storage = localStorage;
    }
}

;// ./Extension/src/pages/options/options-storage/index.ts
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
const optionsStorage = new OptionsStorage();


/***/ }),

/***/ 47681:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  a: () => (/* binding */ rootStore)
});

// UNUSED EXPORTS: RootStore

// EXTERNAL MODULE: ./node_modules/.pnpm/react@17.0.2/node_modules/react/index.js
var react = __webpack_require__(91445);
// EXTERNAL MODULE: ./node_modules/.pnpm/mobx@6.9.0/node_modules/mobx/dist/mobx.esm.js
var mobx_esm = __webpack_require__(47938);
// EXTERNAL MODULE: ./Extension/src/pages/common/telemetry/index.ts + 2 modules
var telemetry = __webpack_require__(41159);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.40.0/node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__(90767);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.40.0/node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(10474);
// EXTERNAL MODULE: ./Extension/src/common/constants.ts
var constants = __webpack_require__(33926);
// EXTERNAL MODULE: ./Extension/src/common/logger.ts
var logger = __webpack_require__(9659);
// EXTERNAL MODULE: ./Extension/src/common/forward.ts
var forward = __webpack_require__(63258);
// EXTERNAL MODULE: ./Extension/src/common/sleep-utils.ts
var sleep_utils = __webpack_require__(10584);
// EXTERNAL MODULE: ./Extension/src/common/translators/translator.ts
var translator = __webpack_require__(14717);
// EXTERNAL MODULE: ./Extension/src/common/user-agent.ts
var user_agent = __webpack_require__(90852);
// EXTERNAL MODULE: ./Extension/src/pages/common/components/Editor/savingFSM.ts
var savingFSM = __webpack_require__(52849);
// EXTERNAL MODULE: ./Extension/src/pages/common/types.ts
var types = __webpack_require__(41459);
// EXTERNAL MODULE: ./Extension/src/pages/services/messenger.ts
var messenger = __webpack_require__(87912);
// EXTERNAL MODULE: ./Extension/src/pages/options/components/Filters/Search/constants.js
var Search_constants = __webpack_require__(7453);
// EXTERNAL MODULE: ./Extension/src/pages/options/components/Filters/helpers.ts + 1 modules
var helpers = __webpack_require__(86176);
// EXTERNAL MODULE: ./Extension/src/pages/options/options-storage/index.ts + 1 modules
var options_storage = __webpack_require__(11752);
;// ./Extension/src/pages/options/stores/SettingsStore.js
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
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}















/**
 * Sometimes the options page might be opened before the background page or
 * service worker is ready to provide data.
 *
 * In this case, we need to retry getting data from the background.
 * https://github.com/AdguardTeam/AdguardBrowserExtension/issues/2712
 *
 * @param {Function} fetchFunction Function to fetch data from
 * the background page or service worker.
 *
 * @returns Data for the options page from the background page.
 */ const fetchDataWithRetry = async (fetchFunction)=>{
    /**
     * Delay between retries in milliseconds
     */ const RETRY_DELAY_MS = 500;
    /**
     * Total number of retries.
     */ const TOTAL_RETRY_TIMES = 10;
    /**
     * Inner function to retry getting data from the background service.
     *
     * @param retryTimes {number} - number of retries left
     */ const innerRetry = async (retryTimes)=>{
        if (retryTimes === 0) {
            logger/* logger */.v.error('[ext.SettingsStore]: failed to get from the background service.');
            return null;
        }
        try {
            const data = await fetchFunction();
            if (!data) {
                await (0,sleep_utils/* sleep */.yy)(RETRY_DELAY_MS);
                // eslint-disable-next-line @typescript-eslint/return-await
                return innerRetry(retryTimes - 1);
            }
            return data;
        } catch (e) {
            logger/* logger */.v.warn('[ext.SettingsStore]: failed to get from the background service, will retry fetch. error: ', e);
            await (0,sleep_utils/* sleep */.yy)(RETRY_DELAY_MS);
            return innerRetry(retryTimes - 1);
        }
    };
    return innerRetry(TOTAL_RETRY_TIMES);
};
const DEFAULT_RULES_LIMITS = {
    dynamicRulesEnabledCount: 0,
    dynamicRulesMaximumCount: 0,
    dynamicRulesUnsafeEnabledCount: 0,
    dynamicRulesUnsafeMaximumCount: 0,
    dynamicRulesRegexpsEnabledCount: 0,
    dynamicRulesRegexpsMaximumCount: 0,
    staticFiltersEnabledCount: 0,
    staticFiltersMaximumCount: 0,
    staticRulesEnabledCount: 0,
    staticRulesMaximumCount: 0,
    staticRulesRegexpsEnabledCount: 0,
    staticRulesRegexpsMaxCount: 0,
    expectedEnabledFilters: [],
    actuallyEnabledFilters: [],
    areFilterLimitsExceeded: false
};
/**
 * @typedef {import('../../common/messages/constants').CustomFilterSubscriptionData} CustomFilterSubscriptionData
 */ class SettingsStore {
    async getRulesLimitsCounters() {
        // This method should only be called for MV3-based extensions
        // AG-40166
        if (false) {}
        const rulesLimits = await fetchDataWithRetry(messenger/* messenger */.ee.getRulesLimitsCounters.bind(messenger/* messenger */.ee));
        // Will use default rules limits if the background service is not ready.
        if (!rulesLimits) {
            return;
        }
        (0,mobx_esm/* runInAction */.h5)(()=>{
            this.rulesLimits = rulesLimits;
        });
    }
    async checkLimitations() {
        const currentLimitsMv3 = await messenger/* messenger */.ee.getCurrentLimits();
        this.uiStore.setStaticFiltersLimitsWarning(currentLimitsMv3.staticFiltersData);
        this.uiStore.setDynamicRulesLimitsWarning(currentLimitsMv3.dynamicRulesData);
        if (this.uiStore.dynamicRulesLimitsWarning) {
            this.uiStore.addRuleLimitsNotification(this.uiStore.dynamicRulesLimitsWarning);
        }
        return currentLimitsMv3;
    }
    async requestOptionsData(firstRender) {
        // do not re-render options page if the annoyances consent modal is open.
        // it is needed to prevent switch disabling due to the actual state while the modal is shown
        if (this.isAnnoyancesConsentModalOpen) {
            return;
        }
        let data = null;
        if (firstRender) {
            // on first render background service might not be ready to provide data, so we need to get it with retry
            data = await fetchDataWithRetry(messenger/* messenger */.ee.getOptionsData.bind(messenger/* messenger */.ee));
        } else {
            data = await messenger/* messenger */.ee.getOptionsData();
        }
        (0,mobx_esm/* runInAction */.h5)(()=>{
            this.settings = data.settings;
            // on first render we sort filters to show enabled on the top
            // filter should remain on the same place event after being enabled or disabled
            if (firstRender) {
                this.setFilters((0,helpers/* sortFilters */.WO)(data.filtersMetadata.filters));
            } else {
                // on the next filters updates, we update filters keeping order
                /**
                 * TODO: Updating filters on background service response can cause filter enable
                 * state mismatch, because we toggle switches on frontend side first, but cannot determine when
                 * action in background service is completed and final result of user action.
                 * It seems that we need to use a new approach with atomic updates instead of global
                 * state synchronization to avoid this kind of problems. This task can be split into two parts:
                 * - Moving specific logic from the background to the settings page.
                 * - Integrate a transparent transaction model with simple collision resolution to prevent
                 * race conditions.
                 */ this.setFilters((0,helpers/* updateFilters */.vm)(this.filters, data.filtersMetadata.filters));
            }
            // do not rerender groups on its turning on/off while searching
            if (this.isSearching) {
                this.setGroups((0,helpers/* updateGroups */.eq)(this.categories, data.filtersMetadata.categories));
            } else {
                this.setGroups(data.filtersMetadata.categories);
            }
            this.rulesCount = data.filtersInfo.rulesCount;
            this.appVersion = data.appVersion;
            this.libVersions = data.libVersions;
            this.constants = data.constants;
            this.setAllowAcceptableAds(data.filtersMetadata.filters);
            this.setBlockKnownTrackers(data.filtersMetadata.filters);
            this.setStripTrackingParameters(data.filtersMetadata.filters);
            this.isChrome = data.environmentOptions.isChrome;
            this.optionsReadyToRender = true;
            this.fullscreenUserRulesEditorIsOpen = data.fullscreenUserRulesEditorIsOpen;
            // telemetry
            const anonymizedUsageDataAllowed = data.settings.values[data.settings.names.AllowAnonymizedUsageData];
            this.telemetryStore.setIsAnonymizedUsageDataAllowed(anonymizedUsageDataAllowed);
            // Handle MV3-specific options
            const { mv3SpecificOptions } = data;
            if (!mv3SpecificOptions) {
                // Early exit for MV2 or when mv3SpecificOptions is absent
                this.setIsExtensionUpdateAvailable(false);
                return;
            }
            const { isExtensionUpdateAvailable, isExtensionReloadedOnUpdate, isSuccessfulExtensionUpdate } = mv3SpecificOptions;
            this.setIsExtensionUpdateAvailable(isExtensionUpdateAvailable);
            // notification about successful or failed update should be shown after the options page is opened.
            // and it cannot be done by notifier (from the background page)
            // because event may be dispatched before the options page is opened,
            // i.e. listener may not be registered yet.
            if (isExtensionReloadedOnUpdate) {
                if (isSuccessfulExtensionUpdate) {
                    this.uiStore.addNotification({
                        type: types/* NotificationType */._.Success,
                        text: translator/* translator */.N.getMessage('update_success_text')
                    });
                } else {
                    this.uiStore.addNotification({
                        type: types/* NotificationType */._.Error,
                        text: translator/* translator */.N.getMessage('update_failed_text'),
                        button: {
                            title: translator/* translator */.N.getMessage('update_failed_try_again_btn'),
                            onClick: this.checkUpdatesMV3
                        }
                    });
                }
            }
        });
        return data;
    }
    setSelectedGroupId(dirtyGroupId) {
        const groupId = Number.parseInt(dirtyGroupId, 10);
        if (Number.isNaN(groupId)) {
            this.selectedGroupId = null;
        } else {
            const groupExists = this.categories.find((category)=>category.groupId === groupId);
            if (groupExists) {
                this.selectedGroupId = groupId;
            } else {
                this.selectedGroupId = null;
            }
        }
    }
    async updateSetting(settingId, value, ignoreBackground = false) {
        this.settings.values[settingId] = value;
        if (!ignoreBackground) {
            await messenger/* messenger */.ee.changeUserSetting(settingId, value);
        }
    }
    async setFilterRelatedSettingState(filterId, optionKey, enabled) {
        const prevValue = this[optionKey];
        this[optionKey] = enabled;
        try {
            const relatedFilter = this.filters.find((f)=>f.filterId === filterId);
            if (enabled) {
                await messenger/* messenger */.ee.enableFilter(filterId);
                await this.updateGroupSetting(relatedFilter.groupId, enabled);
            } else {
                await messenger/* messenger */.ee.disableFilter(filterId);
            }
            relatedFilter.enabled = enabled;
            this.refreshFilter(relatedFilter);
        } catch (e) {
            (0,mobx_esm/* runInAction */.h5)(()=>{
                this[optionKey] = prevValue;
            });
        }
    }
    async setAllowAcceptableAdsState(enabled) {
        const { SearchAndSelfPromoFilterId } = this.constants.AntiBannerFiltersId;
        await this.setFilterRelatedSettingState(SearchAndSelfPromoFilterId, this.KEYS.ALLOW_ACCEPTABLE_ADS, !enabled);
    }
    async setBlockKnownTrackersState(enabled) {
        const { TrackingFilterId } = this.constants.AntiBannerFiltersId;
        await this.setFilterRelatedSettingState(TrackingFilterId, this.KEYS.BLOCK_KNOWN_TRACKERS, enabled);
    }
    async setStripTrackingParametersState(enabled) {
        const { UrlTrackingFilterId } = this.constants.AntiBannerFiltersId;
        await this.setFilterRelatedSettingState(UrlTrackingFilterId, this.KEYS.STRIP_TRACKING_PARAMETERS, enabled);
    }
    setSetting(filtersId, settingKey, filters) {
        const relatedFilter = filters.find((f)=>f.filterId === filtersId);
        this[settingKey] = !!relatedFilter.enabled;
    }
    setAllowAcceptableAds(filters) {
        const { SearchAndSelfPromoFilterId } = this.constants.AntiBannerFiltersId;
        this.setSetting(SearchAndSelfPromoFilterId, this.KEYS.ALLOW_ACCEPTABLE_ADS, filters);
    }
    setBlockKnownTrackers(filters) {
        const { TrackingFilterId } = this.constants.AntiBannerFiltersId;
        this.setSetting(TrackingFilterId, this.KEYS.BLOCK_KNOWN_TRACKERS, filters);
    }
    setStripTrackingParameters(filters) {
        const { UrlTrackingFilterId } = this.constants.AntiBannerFiltersId;
        this.setSetting(UrlTrackingFilterId, this.KEYS.STRIP_TRACKING_PARAMETERS, filters);
    }
    isFilterEnabled(filterId) {
        const filter = this.filters.find((f)=>f.filterId === filterId);
        return filter.enabled;
    }
    isCategoryEnabled(categoryId) {
        const category = this.categories.find((c)=>c.groupId === categoryId);
        return category.enabled;
    }
    /**
     * Checks whether the group is touched.
     *
     * @param {number} groupId Group id.
     *
     * @returns {boolean} True if the group is touched, false otherwise.
     */ isGroupTouched(groupId) {
        return this.categories.some((c)=>c.groupId === groupId && c.touched);
    }
    isAllowAcceptableAdsFilterEnabled() {
        const { SearchAndSelfPromoFilterId } = this.constants.AntiBannerFiltersId;
        return this.isFilterEnabled(SearchAndSelfPromoFilterId);
    }
    isBlockKnownTrackersFilterEnabled() {
        const { TrackingFilterId } = this.constants.AntiBannerFiltersId;
        return this.isFilterEnabled(TrackingFilterId);
    }
    isStripTrackingParametersFilterEnabled() {
        const { UrlTrackingFilterId } = this.constants.AntiBannerFiltersId;
        return this.isFilterEnabled(UrlTrackingFilterId);
    }
    /**
     * List of annoyances filters.
     */ get annoyancesFilters() {
        const annoyancesGroup = this.categories.find((group)=>{
            return group.groupId === constants/* AntibannerGroupsId */.ge.AnnoyancesFiltersGroupId;
        });
        return annoyancesGroup.filters;
    }
    /**
     * List of recommended annoyances filters
     * which are only AdGuard annoyances filters.
     */ get recommendedAnnoyancesFilters() {
        return this.annoyancesFilters.filter((filter)=>{
            return filter.tags.includes(constants/* RECOMMENDED_TAG_ID */.Nq);
        });
    }
    /**
     * Used to display the last check time under all rules count.
     *
     * @returns {number} the latest check time of all filters.
     */ get latestCheckTime() {
        return Math.max(...this.filters.map(({ lastScheduledCheckTime, lastCheckTime })=>Math.max(lastScheduledCheckTime || 0, lastCheckTime || 0)));
    }
    async updateGroupSetting(groupId, enabled) {
        const recommendedFiltersIds = await messenger/* messenger */.ee.updateGroupStatus(groupId, enabled);
        await this.getRulesLimitsCounters();
        (0,mobx_esm/* runInAction */.h5)(()=>{
            if (groupId === constants/* AntibannerGroupsId */.ge.OtherFiltersGroupId && this.isAllowAcceptableAdsFilterEnabled()) {
                this.allowAcceptableAds = enabled;
            } else if (groupId === constants/* AntibannerGroupsId */.ge.PrivacyFiltersGroupId) {
                if (this.isBlockKnownTrackersFilterEnabled()) {
                    this.blockKnownTrackers = enabled;
                }
                if (this.isStripTrackingParametersFilterEnabled()) {
                    this.stripTrackingParameters = enabled;
                }
            }
            this.categories.forEach((group)=>{
                if (group.groupId === groupId) {
                    if (enabled) {
                        // eslint-disable-next-line no-param-reassign
                        group.enabled = true;
                    } else {
                        // eslint-disable-next-line no-param-reassign
                        delete group.enabled;
                    }
                }
            });
            if (Array.isArray(recommendedFiltersIds)) {
                recommendedFiltersIds.forEach((id)=>{
                    this.setFilterEnabledState(id, true);
                });
            }
        });
    }
    updateGroupStateUI(groupId, enabled) {
        this.categories.forEach((category)=>{
            if (category.groupId === groupId) {
                if (enabled) {
                    category.enabled = true;
                } else {
                    delete category.enabled;
                }
            }
        });
    }
    updateFilterStateUI(filterId, enabled) {
        this.filters.forEach((filter)=>{
            if (filter.filterId === filterId) {
                if (enabled) {
                    filter.enabled = true;
                } else {
                    delete filter.enabled;
                }
            }
        });
    }
    setFiltersToGetConsentFor(filters) {
        this.filtersToGetConsentFor = filters;
    }
    refreshFilters(updatedFilters) {
        if (updatedFilters && updatedFilters.length) {
            updatedFilters.forEach((filter)=>this.refreshFilter(filter));
        }
    }
    refreshFilter(filter) {
        if (!filter) {
            return;
        }
        const idx = this.filters.findIndex((f)=>f.filterId === filter.filterId);
        if (idx !== -1) {
            Object.keys(filter).forEach((key)=>{
                this.filters[idx][key] = filter[key];
            });
        }
    }
    async updateFilterSetting(filterId, enabled) {
        /**
         * Optimistically set the enabled property to true.
         * The verified state of the filter will be emitted after the engine update.
         */ // do not update filter state for mv3 optimistically
        if (false) {}
        try {
            const groupId = enabled ? await messenger/* messenger */.ee.enableFilter(filterId) : await messenger/* messenger */.ee.disableFilter(filterId);
            // update allow acceptable ads setting
            if (filterId === this.constants.AntiBannerFiltersId.SearchAndSelfPromoFilterId) {
                this.allowAcceptableAds = enabled;
            } else if (filterId === this.constants.AntiBannerFiltersId.TrackingFilterId) {
                this.blockKnownTrackers = enabled;
            } else if (filterId === this.constants.AntiBannerFiltersId.UrlTrackingFilterId) {
                this.stripTrackingParameters = enabled;
            }
            if (groupId) {
                const group = this.categories.find((group)=>group.groupId === groupId);
                if (group) {
                    group.enabled = true;
                    // if any filter in group is enabled, the group is considered as touched
                    group.touched = true;
                }
            }
            if (true) {
                this.setFilterEnabledState(filterId, enabled);
            }
        } catch (e) {
            logger/* logger */.v.error('[ext.SettingsStore.updateFilterSetting]: failed to update filter setting: ', e);
            this.setFilterEnabledState(filterId, !enabled);
        }
    }
    setFiltersUpdating(value) {
        this.filtersUpdating = value;
    }
    async updateFiltersMV2() {
        this.setFiltersUpdating(true);
        try {
            const filtersUpdates = await messenger/* messenger */.ee.updateFiltersMV2();
            this.refreshFilters(filtersUpdates);
            setTimeout(()=>{
                this.setFiltersUpdating(false);
            }, constants/* MIN_UPDATE_DISPLAY_DURATION_MS */.Cb);
            return filtersUpdates;
        } catch (error) {
            this.setFiltersUpdating(false);
            throw error;
        }
    }
    // eslint-disable-next-line class-methods-use-this
    async checkUpdatesMV3() {
        const start = Date.now();
        try {
            await messenger/* messenger */.ee.checkUpdatesMV3();
        } catch (error) {
            logger/* logger */.v.debug('[ext.SettingsStore.checkUpdatesMV3]: failed to check updates on options page: ', error);
        }
        // Ensure minimum duration for smooth UI experience
        await (0,sleep_utils/* sleepIfNecessary */.yJ)(start, constants/* MIN_UPDATE_DISPLAY_DURATION_MS */.Cb);
    }
    // eslint-disable-next-line class-methods-use-this
    async updateExtensionMV3() {
        const start = Date.now();
        try {
            await messenger/* messenger */.ee.updateExtensionMV3({
                from: forward/* ForwardFrom */.S9.Options
            });
        } catch (error) {
            logger/* logger */.v.debug('[ext.SettingsStore.updateExtensionMV3]: failed to update extension on options page: ', error);
        }
        // Ensure minimum duration for smooth UI experience before extension reload
        await (0,sleep_utils/* sleepIfNecessary */.yJ)(start, constants/* MIN_UPDATE_DISPLAY_DURATION_MS */.Cb);
    }
    setIsExtensionUpdateAvailable(isAvailable) {
        this.isExtensionUpdateAvailable = isAvailable;
    }
    setIsExtensionCheckingUpdateOrUpdating(isChecking) {
        this.isExtensionCheckingUpdateOrUpdating = isChecking;
    }
    /**
     * Adds a custom filter but does not enable it.
     *
     * @param {CustomFilterSubscriptionData} filter Custom filter data.
     *
     * @returns {Promise<number>} Custom filter id.
     */ async addCustomFilter(filter) {
        const newFilter = await messenger/* messenger */.ee.addCustomFilter(filter);
        if (!newFilter) {
            return;
        }
        (0,mobx_esm/* runInAction */.h5)(()=>{
            /**
             * This was added because sometimes the filter might already be in the list.
             * It happens in the case where a filter was added and the engine fired an
             * event that it was updated and the options page already fetched options data.
             */ if (!this.filters.some((f)=>f.filterId === newFilter.filterId)) {
                this.filters.push(newFilter);
            }
            if (this.searchSelect !== Search_constants/* SEARCH_FILTERS */.F.ALL) {
                this.setSearchSelect(Search_constants/* SEARCH_FILTERS */.F.ALL);
            }
        });
        return newFilter.filterId;
    }
    async removeCustomFilter(filterId) {
        await messenger/* messenger */.ee.removeCustomFilter(filterId);
        (0,mobx_esm/* runInAction */.h5)(()=>{
            this.setFilters(this.filters.filter((filter)=>filter.filterId !== filterId));
            this.setVisibleFilters(this.visibleFilters.filter((filter)=>{
                return filter.filterId !== filterId;
            }));
        });
    }
    get isSearching() {
        return this.searchSelect !== Search_constants/* SEARCH_FILTERS */.F.ALL || this.searchInput;
    }
    get filtersToRender() {
        const searchInputString = this.searchInput.replace(constants/* WASTE_CHARACTERS */.iR, '\\$&');
        const searchQuery = new RegExp(searchInputString, 'ig');
        let selectedFilters;
        if (this.isSearching) {
            selectedFilters = this.visibleFilters;
        } else {
            selectedFilters = this.filters;
        }
        return selectedFilters.filter((filter)=>{
            // If selected group of filters, prevent showing filters from
            // other groups.
            if (Number.isInteger(this.selectedGroupId) && filter.groupId !== this.selectedGroupId) {
                return false;
            }
            const nameIsMatching = filter.name.match(searchQuery);
            if (nameIsMatching) {
                return true;
            }
            if (filter.tagsDetails) {
                const tagKeywordIsMatching = filter.tagsDetails.some((tag)=>`#${tag.keyword}`.match(searchQuery));
                if (tagKeywordIsMatching) {
                    return true;
                }
            }
            // AG-10491
            if (filter.trusted) {
                const trustedTagMatching = `#${constants/* TRUSTED_TAG_KEYWORD */.Fx}`.match(searchQuery);
                if (trustedTagMatching) {
                    return true;
                }
            }
            return false;
        });
    }
    get appearanceTheme() {
        if (!this.settings) {
            return null;
        }
        return this.settings.values[this.settings.names.AppearanceTheme];
    }
    get showAdguardPromoInfo() {
        if (!this.settings) {
            return null;
        }
        return !this.settings.values[this.settings.names.DisableShowAdguardPromoInfo];
    }
    async hideAdguardPromoInfo() {
        await this.updateSetting(this.settings.names.DisableShowAdguardPromoInfo, true);
    }
    get allowlistEditorWrapState() {
        if (this.allowlistEditorWrap === null) {
            this.allowlistEditorWrap = options_storage/* optionsStorage */.O.getItem(options_storage/* optionsStorage */.O.KEYS.ALLOWLIST_EDITOR_WRAP);
        }
        return this.allowlistEditorWrap;
    }
    toggleAllowlistEditorWrap() {
        this.allowlistEditorWrap = !this.allowlistEditorWrap;
        options_storage/* optionsStorage */.O.setItem(options_storage/* optionsStorage */.O.KEYS.ALLOWLIST_EDITOR_WRAP, this.allowlistEditorWrap);
    }
    get footerRateShowState() {
        return !this.settings.values[this.settings.names.HideRateBlock];
    }
    async hideFooterRateShow() {
        await this.updateSetting(this.settings.names.HideRateBlock, true);
    }
    setFullscreenUserRulesEditorState(isOpen) {
        this.fullscreenUserRulesEditorIsOpen = isOpen;
    }
    get isFullscreenUserRulesEditorOpen() {
        return this.fullscreenUserRulesEditorIsOpen;
    }
    get userFilterEnabledSettingId() {
        return this.settings.names.UserFilterEnabled;
    }
    get userFilterEnabled() {
        return this.settings.values[this.userFilterEnabledSettingId];
    }
    setAllowlistSizeReset(value) {
        this.allowlistSizeReset = value;
    }
    get isUpdateFiltersButtonActive() {
        return this.filters.some((filter)=>filter.enabled && this.isCategoryEnabled(filter.groupId));
    }
    get shouldShowFilterPolicy() {
        if (this.filterIdSelectedForConsent) {
            return this.recommendedAnnoyancesFilters.some((f)=>f.filterId === this.filterIdSelectedForConsent);
        }
        // consent modal for group
        return true;
    }
    constructor(rootStore){
        _define_property(this, "KEYS", {
            ALLOW_ACCEPTABLE_ADS: 'allowAcceptableAds',
            BLOCK_KNOWN_TRACKERS: 'blockKnownTrackers',
            STRIP_TRACKING_PARAMETERS: 'stripTrackingParameters'
        });
        _define_property(this, "savingAllowlistService", (0,savingFSM/* createSavingService */.s0)({
            id: 'allowlist',
            services: {
                saveData: async ({ event })=>{
                    /**
                 * If saveAllowlist executes faster than MIN_EXECUTION_TIME_REQUIRED_MS we increase
                 * execution time for smoother user experience.
                 *
                 * TODO: Can we remove this and set minDelayLoader when we call
                 * saveAllowlist as in the user rules section?
                 */ const MIN_EXECUTION_TIME_REQUIRED_MS = 500;
                    const { value, callback } = event;
                    const start = Date.now();
                    await messenger/* messenger */.ee.saveAllowlist(value);
                    const end = Date.now();
                    const timePassed = end - start;
                    if (timePassed < MIN_EXECUTION_TIME_REQUIRED_MS) {
                        // TODO: consider using sleepIfNecessary
                        await (0,sleep_utils/* sleep */.yy)(MIN_EXECUTION_TIME_REQUIRED_MS - timePassed);
                    }
                    await callback();
                }
            }
        }));
        _define_property(this, "settings", null);
        _define_property(this, "optionsReadyToRender", false);
        _define_property(this, "appVersion", null);
        _define_property(this, "libVersions", null);
        _define_property(this, "filters", []);
        _define_property(this, "categories", []);
        _define_property(this, "visibleFilters", []);
        _define_property(this, "rulesCount", 0);
        _define_property(this, "allowAcceptableAds", null);
        _define_property(this, "blockKnownTrackers", null);
        _define_property(this, "stripTrackingParameters", null);
        _define_property(this, "allowlist", '');
        _define_property(this, "savingAllowlistState", this.savingAllowlistService.getSnapshot().value);
        _define_property(this, "filtersUpdating", false);
        /**
     * Whether the extension update is available after the checking.
     */ _define_property(this, "isExtensionUpdateAvailable", false);
        /**
     * Whether the extension update is checking or is updating now.
     */ _define_property(this, "isExtensionCheckingUpdateOrUpdating", false);
        _define_property(this, "selectedGroupId", null);
        _define_property(this, "isChrome", null);
        _define_property(this, "currentChromeVersion", user_agent/* UserAgent */.B.isChromium ? Number(user_agent/* UserAgent */.B.version) : null);
        _define_property(this, "searchInput", '');
        _define_property(this, "searchSelect", Search_constants/* SEARCH_FILTERS */.F.ALL);
        _define_property(this, "allowlistEditorContentChanged", false);
        _define_property(this, "allowlistEditorWrap", null);
        _define_property(this, "fullscreenUserRulesEditorIsOpen", false);
        _define_property(this, "allowlistSizeReset", false);
        _define_property(this, "filtersToGetConsentFor", []);
        _define_property(this, "isAnnoyancesConsentModalOpen", false);
        _define_property(this, "filterIdSelectedForConsent", null);
        _define_property(this, "rulesLimits", DEFAULT_RULES_LIMITS);
        _define_property(this, "setFilterEnabledState", (rawFilterId, enabled)=>{
            const filterId = parseInt(rawFilterId, 10);
            this.filters.forEach((filter)=>{
                if (filter.filterId === filterId) {
                    // eslint-disable-next-line no-param-reassign
                    filter.enabled = !!enabled;
                }
            });
            this.visibleFilters.forEach((filter)=>{
                if (filter.filterId === filterId) {
                    // eslint-disable-next-line no-param-reassign
                    filter.enabled = !!enabled;
                }
            });
        });
        _define_property(this, "setAllowlist", (allowlist)=>{
            this.allowlist = allowlist;
        });
        _define_property(this, "getAllowlist", async ()=>{
            try {
                const { content } = await messenger/* messenger */.ee.getAllowlist();
                this.setAllowlist(content);
            } catch (e) {
                logger/* logger */.v.error('[ext.SettingsStore]: failed to get allowlist: ', e);
            }
        });
        _define_property(this, "saveAllowlist", async (value)=>{
            return new Promise((resolve, reject)=>{
                try {
                    this.savingAllowlistService.send({
                        type: savingFSM/* SavingFSMEvent */.xo.Save,
                        value,
                        callback: resolve
                    });
                } catch (e) {
                    reject(e);
                }
            });
        });
        _define_property(this, "setAllowlistEditorContentChangedState", (state)=>{
            this.allowlistEditorContentChanged = state;
        });
        _define_property(this, "setSearchInput", (value)=>{
            this.searchInput = value;
            this.sortFilters();
            this.sortSearchGroups();
            this.selectVisibleFilters();
        });
        _define_property(this, "setSearchSelect", (value)=>{
            this.searchSelect = value;
            this.sortFilters();
            this.sortSearchGroups();
            this.selectVisibleFilters();
        });
        /**
     * We do not sort filters on every filters data update for better UI experience
     * Filters sort happens when user exits from filters group, or changes search filters
     */ _define_property(this, "sortFilters", ()=>{
            this.setFilters((0,helpers/* sortFilters */.WO)(this.filters));
        });
        _define_property(this, "setFilters", (filters)=>{
            this.filters = filters;
        });
        _define_property(this, "setVisibleFilters", (visibleFilters)=>{
            this.visibleFilters = visibleFilters;
        });
        /**
     * We do not sort groups while search on every groups data update for better UI experience
     * Groups sort happens only when user changes search filters
     */ _define_property(this, "sortSearchGroups", ()=>{
            this.setGroups((0,helpers/* sortGroupsOnSearch */.o7)(this.categories));
        });
        _define_property(this, "setGroups", (categories)=>{
            this.categories = categories;
        });
        /**
     * We use visibleFilters for better UI experience, in order not to hide filter
     * when user enables/disables filter when he has chosen search filters
     * We update visibleFilters when search filters are updated
     *
     */ _define_property(this, "selectVisibleFilters", ()=>{
            this.visibleFilters = this.filters.filter((filter)=>{
                let searchMod;
                switch(this.searchSelect){
                    case Search_constants/* SEARCH_FILTERS */.F.ENABLED:
                        searchMod = filter.enabled;
                        break;
                    case Search_constants/* SEARCH_FILTERS */.F.DISABLED:
                        searchMod = !filter.enabled;
                        break;
                    default:
                        searchMod = true;
                }
                return searchMod;
            });
        });
        _define_property(this, "setIsAnnoyancesConsentModalOpen", (value)=>{
            this.isAnnoyancesConsentModalOpen = value;
        });
        _define_property(this, "setFilterIdSelectedForConsent", (filterId)=>{
            this.filterIdSelectedForConsent = filterId;
            this.updateFilterStateUI(filterId, true);
        });
        _define_property(this, "handleFilterConsentCancel", ()=>{
            if (this.filterIdSelectedForConsent) {
                this.updateFilterStateUI(this.filterIdSelectedForConsent, false);
                this.filterIdSelectedForConsent = null;
                return;
            }
            // handle modal for group
            this.updateGroupStateUI(constants/* AntibannerGroupsId */.ge.AnnoyancesFiltersGroupId, false);
        });
        _define_property(this, "handleFilterConsentConfirm", async ()=>{
            if (this.filterIdSelectedForConsent) {
                await this.updateFilterSetting(this.filterIdSelectedForConsent, true);
                await messenger/* messenger */.ee.setConsentedFilters([
                    this.filterIdSelectedForConsent
                ]);
                this.filterIdSelectedForConsent = null;
                return;
            }
            // handle consent modal for group
            await this.updateGroupSetting(constants/* AntibannerGroupsId */.ge.AnnoyancesFiltersGroupId, true);
            await messenger/* messenger */.ee.setConsentedFilters(this.recommendedAnnoyancesFilters.map((f)=>f.filterId));
        });
        (0,mobx_esm/* makeObservable */.Gn)(this);
        this.rootStore = rootStore;
        this.uiStore = rootStore.uiStore;
        this.telemetryStore = rootStore.telemetryStore;
        this.updateSetting = this.updateSetting.bind(this);
        this.updateFilterSetting = this.updateFilterSetting.bind(this);
        this.updateGroupSetting = this.updateGroupSetting.bind(this);
        this.setAllowAcceptableAdsState = this.setAllowAcceptableAdsState.bind(this);
        this.checkUpdatesMV3 = this.checkUpdatesMV3.bind(this);
        this.savingAllowlistService.subscribe((state)=>{
            (0,mobx_esm/* runInAction */.h5)(()=>{
                this.savingAllowlistState = state.value;
                if (state.value === savingFSM/* SavingFSMState */.A3.Saving) {
                    this.allowlistEditorContentChanged = false;
                }
            });
        });
    }
}
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "settings", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "optionsReadyToRender", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "appVersion", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "libVersions", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "filters", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "categories", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "visibleFilters", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "rulesCount", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "allowAcceptableAds", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "blockKnownTrackers", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "stripTrackingParameters", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "allowlist", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "savingAllowlistState", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "filtersUpdating", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "isExtensionUpdateAvailable", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "isExtensionCheckingUpdateOrUpdating", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "selectedGroupId", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "isChrome", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "currentChromeVersion", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "searchInput", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "searchSelect", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "allowlistEditorContentChanged", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "allowlistEditorWrap", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "fullscreenUserRulesEditorIsOpen", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "allowlistSizeReset", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "filtersToGetConsentFor", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "isAnnoyancesConsentModalOpen", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "filterIdSelectedForConsent", void 0);
_ts_decorate([
    mobx_esm/* observable */.sH
], SettingsStore.prototype, "rulesLimits", void 0);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "getRulesLimitsCounters", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "checkLimitations", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "requestOptionsData", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "setSelectedGroupId", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "updateSetting", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "setAllowAcceptableAdsState", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "setBlockKnownTrackersState", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "setStripTrackingParametersState", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "setAllowAcceptableAds", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "setBlockKnownTrackers", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "setStripTrackingParameters", null);
_ts_decorate([
    mobx_esm/* computed */.EW
], SettingsStore.prototype, "annoyancesFilters", null);
_ts_decorate([
    mobx_esm/* computed */.EW
], SettingsStore.prototype, "recommendedAnnoyancesFilters", null);
_ts_decorate([
    mobx_esm/* computed */.EW
], SettingsStore.prototype, "latestCheckTime", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "updateGroupSetting", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "updateGroupStateUI", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "updateFilterStateUI", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "setFiltersToGetConsentFor", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "refreshFilters", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "refreshFilter", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "setFilterEnabledState", void 0);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "updateFilterSetting", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "setFiltersUpdating", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "updateFiltersMV2", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "checkUpdatesMV3", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "setIsExtensionUpdateAvailable", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "setIsExtensionCheckingUpdateOrUpdating", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "addCustomFilter", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "removeCustomFilter", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "setAllowlist", void 0);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "getAllowlist", void 0);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "setAllowlistEditorContentChangedState", void 0);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "setSearchInput", void 0);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "setSearchSelect", void 0);
_ts_decorate([
    mobx_esm/* computed */.EW
], SettingsStore.prototype, "isSearching", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "sortFilters", void 0);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "setFilters", void 0);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "setVisibleFilters", void 0);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "sortSearchGroups", void 0);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "setGroups", void 0);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "selectVisibleFilters", void 0);
_ts_decorate([
    mobx_esm/* computed */.EW
], SettingsStore.prototype, "filtersToRender", null);
_ts_decorate([
    mobx_esm/* computed */.EW
], SettingsStore.prototype, "appearanceTheme", null);
_ts_decorate([
    mobx_esm/* computed */.EW
], SettingsStore.prototype, "showAdguardPromoInfo", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "hideAdguardPromoInfo", null);
_ts_decorate([
    mobx_esm/* computed */.EW
], SettingsStore.prototype, "allowlistEditorWrapState", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "toggleAllowlistEditorWrap", null);
_ts_decorate([
    mobx_esm/* computed */.EW
], SettingsStore.prototype, "footerRateShowState", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "hideFooterRateShow", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "setFullscreenUserRulesEditorState", null);
_ts_decorate([
    mobx_esm/* computed */.EW
], SettingsStore.prototype, "isFullscreenUserRulesEditorOpen", null);
_ts_decorate([
    mobx_esm/* computed */.EW
], SettingsStore.prototype, "userFilterEnabledSettingId", null);
_ts_decorate([
    mobx_esm/* computed */.EW
], SettingsStore.prototype, "userFilterEnabled", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "setAllowlistSizeReset", null);
_ts_decorate([
    mobx_esm/* computed */.EW
], SettingsStore.prototype, "isUpdateFiltersButtonActive", null);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "setIsAnnoyancesConsentModalOpen", void 0);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "setFilterIdSelectedForConsent", void 0);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "handleFilterConsentCancel", void 0);
_ts_decorate([
    mobx_esm/* action */.XI
], SettingsStore.prototype, "handleFilterConsentConfirm", void 0);
_ts_decorate([
    mobx_esm/* computed */.EW
], SettingsStore.prototype, "shouldShowFilterPolicy", null);
/* harmony default export */ const stores_SettingsStore = (SettingsStore);

// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.40.0/node_modules/core-js/modules/es.error.cause.js
var es_error_cause = __webpack_require__(59952);
// EXTERNAL MODULE: ./node_modules/.pnpm/nanoid@3.3.6/node_modules/nanoid/index.browser.js
var index_browser = __webpack_require__(72968);
// EXTERNAL MODULE: ./Extension/src/pages/options/components/Warnings/messages.ts
var messages = __webpack_require__(51678);
;// ./Extension/src/pages/options/stores/UiStore.ts
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
 */ function UiStore_define_property(obj, key, value) {
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
function UiStore_ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}







// TODO: Maybe not import from components folder here?

class UiStore {
    addNotification(params) {
        const isNotificationAlreadyPresent = this.notifications.some((notification)=>{
            return notification.type === params.type && notification.text === params.text;
        });
        if (isNotificationAlreadyPresent) {
            return null;
        }
        const id = (0,index_browser/* nanoid */.Ak)();
        this.notifications.push({
            id,
            ...params
        });
        return id;
    }
    /**
     * Adds an error notification about rule limits exceeded.
     *
     * The notification will have a button to open the rules limits tab.
     *
     * @param text Notification text.
     */ addRuleLimitsNotification(text) {
        const button = {
            title: translator/* translator */.N.getMessage('options_rule_limits'),
            onClick: messenger/* messenger */.ee.openRulesLimitsTab
        };
        this.addNotification({
            type: types/* NotificationType */._.Error,
            text,
            button
        });
    }
    removeNotification(id) {
        this.notifications = this.notifications.filter((notification)=>notification.id !== id);
    }
    /**
     * Sets the loader visibility state. **Used for mv3**
     *
     * @param value Loader visibility state. Default value is false.
     */ setShowLoader(value = false) {
        this.showLoader = value;
    }
    /**
     * Sets a specific limit warning message to be displayed about static filters.
     *
     * @param data Result of limits check of static rules.
     *
     * @throws Error if the warning type is incorrect.
     */ setStaticFiltersLimitsWarning(data) {
        if (!data) {
            this.staticFiltersLimitsWarning = null;
            return;
        }
        if (data.type !== 'static') {
            throw new Error('Incorrect warning type');
        }
        this.staticFiltersLimitsWarning = (0,messages/* getStaticWarningMessage */.E)(data);
    }
    /**
     * Sets a specific limit warning message to be displayed about dynamic section with user rules.
     *
     * @param data Result of limits check of dynamic rules.
     *
     * @throws Error if the warning type is incorrect.
     */ setDynamicRulesLimitsWarning(data) {
        if (!data) {
            this.dynamicRulesLimitsWarning = null;
            return;
        }
        if (data.type !== 'dynamic') {
            throw new Error('Incorrect warning type');
        }
        this.dynamicRulesLimitsWarning = (0,messages/* getDynamicWarningMessage */.$)(data);
    }
    constructor(rootStore){
        /**
     * Root store instance. Added in advance, even though it is not used.
     */ UiStore_define_property(this, "rootStore", void 0);
        /**
     * Notifications list
     */ UiStore_define_property(this, "notifications", []);
        /**
     * Loader visibility state. **Used for mv3**.
     */ UiStore_define_property(this, "showLoader", false);
        /**
     * Specific limits warning message to be displayed about static filters.
     */ UiStore_define_property(this, "staticFiltersLimitsWarning", null);
        /**
     * Specific limits warning message to be displayed about dynamic section with user rules.
     */ UiStore_define_property(this, "dynamicRulesLimitsWarning", null);
        /**
     * Sidebar visibility state. **Used only on mobile**.
     */ UiStore_define_property(this, "isSidebarOpen", false);
        /**
     * Opens the sidebar.
     */ UiStore_define_property(this, "openSidebar", ()=>{
            this.isSidebarOpen = true;
        });
        /**
     * Closes the sidebar.
     */ UiStore_define_property(this, "closeSidebar", ()=>{
            this.isSidebarOpen = false;
        });
        this.rootStore = rootStore;
        (0,mobx_esm/* makeObservable */.Gn)(this);
        this.setShowLoader = this.setShowLoader.bind(this);
        this.setStaticFiltersLimitsWarning = this.setStaticFiltersLimitsWarning.bind(this);
        this.setDynamicRulesLimitsWarning = this.setDynamicRulesLimitsWarning.bind(this);
    }
}
UiStore_ts_decorate([
    mobx_esm/* observable */.sH
], UiStore.prototype, "notifications", void 0);
UiStore_ts_decorate([
    mobx_esm/* observable */.sH
], UiStore.prototype, "showLoader", void 0);
UiStore_ts_decorate([
    mobx_esm/* observable */.sH
], UiStore.prototype, "staticFiltersLimitsWarning", void 0);
UiStore_ts_decorate([
    mobx_esm/* observable */.sH
], UiStore.prototype, "dynamicRulesLimitsWarning", void 0);
UiStore_ts_decorate([
    mobx_esm/* observable */.sH
], UiStore.prototype, "isSidebarOpen", void 0);
UiStore_ts_decorate([
    mobx_esm/* action */.XI
], UiStore.prototype, "addNotification", null);
UiStore_ts_decorate([
    mobx_esm/* action */.XI
], UiStore.prototype, "addRuleLimitsNotification", null);
UiStore_ts_decorate([
    mobx_esm/* action */.XI
], UiStore.prototype, "removeNotification", null);
UiStore_ts_decorate([
    mobx_esm/* action */.XI
], UiStore.prototype, "setShowLoader", null);
UiStore_ts_decorate([
    mobx_esm/* action */.XI
], UiStore.prototype, "setStaticFiltersLimitsWarning", null);
UiStore_ts_decorate([
    mobx_esm/* action */.XI
], UiStore.prototype, "setDynamicRulesLimitsWarning", null);
UiStore_ts_decorate([
    mobx_esm/* action */.XI
], UiStore.prototype, "openSidebar", void 0);
UiStore_ts_decorate([
    mobx_esm/* action */.XI
], UiStore.prototype, "closeSidebar", void 0);
/* harmony default export */ const stores_UiStore = (UiStore);

;// ./Extension/src/pages/options/stores/RootStore.ts
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
 */ function RootStore_define_property(obj, key, value) {
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





// Do not allow property change outside of store actions
(0,mobx_esm/* configure */.jK)({
    enforceActions: 'observed'
});
class RootStore {
    constructor(){
        RootStore_define_property(this, "uiStore", void 0);
        RootStore_define_property(this, "settingsStore", void 0);
        RootStore_define_property(this, "telemetryStore", void 0);
        // uiStore and telemetryStore should be initialized before settingsStore
        // because settingsStore uses these stores
        this.uiStore = new stores_UiStore(this);
        this.telemetryStore = new telemetry/* TelemetryStore */.F();
        this.settingsStore = new stores_SettingsStore(this);
    }
}
const rootStore = (0,react.createContext)(new RootStore());


/***/ }),

/***/ 87912:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   YW: () => (/* binding */ Page),
/* harmony export */   e0: () => (/* binding */ Messenger),
/* harmony export */   ee: () => (/* binding */ messenger)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(90767);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7967);
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(72968);
/* harmony import */ var _common_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9659);
/* harmony import */ var _common_messages__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(94572);
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
        const response = await webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().runtime.sendMessage({
            handlerName: _common_messages__WEBPACK_IMPORTED_MODULE_3__/* .APP_MESSAGE_HANDLER_NAME */ .zk,
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
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.UpdateListeners);
    }
    /**
     * Sends a message to the background page to get the settings data for
     * the options page with some additional info.
     *
     * @returns Promise that resolves with the settings data for
     * the options page with some additional info.
     */ async getOptionsData() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.GetOptionsData);
    }
    /**
     * Sends a message to the background page to change the user setting.
     *
     * @param settingId Setting identifier.
     * @param value Setting value.
     *
     * @returns Promise that resolves after the message is sent.
     */ async changeUserSetting(settingId, value) {
        await this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.ChangeUserSettings, {
            key: settingId,
            value
        });
    }
    /**
     * Sends a message to the background page to open the extension store.
     *
     * @returns Promise that resolves after the message is sent.
     */ async openExtensionStore() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.OpenExtensionStore);
    }
    /**
     * Sends a message to the background page to open the compare page.
     *
     * @returns Promise that resolves after the message is sent.
     */ async openComparePage() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.OpenComparePage);
    }
    /**
     * Sends a message to the background page to open the Chrome extensions settings page.
     *
     * @returns Promise that resolves after the message is sent.
     */ async openChromeExtensionsPage() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.OpenChromeExtensionsSettingsPage);
    }
    /**
     * Sends a message to the background page to open the extension details page.
     *
     * @returns Promise that resolves after the message is sent.
     */ async openExtensionDetailsPage() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.OpenExtensionDetailsPage);
    }
    /**
     * Sends a message to the background page to enable a filter by filter id.
     *
     * @param filterId Filter identifier.
     *
     * @returns Promise that resolves after the message is sent.
     */ async enableFilter(filterId) {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.AddAndEnableFilter, {
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
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.DisableFilter, {
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
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.ApplySettingsJson, {
            json
        });
    }
    /**
     * Sends a message to the background page to open the filtering log.
     *
     * @returns Promise that resolves after the message is sent.
     */ async openFilteringLog() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.OpenFilteringLog);
    }
    /**
     * Sends a message to the background page to reset the blocked ads statistics.
     *
     * @returns Promise that resolves after the message is sent.
     */ async resetStatistics() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.ResetBlockedAdsCount);
    }
    /**
     * Sends a message to the background page to set the filtering log window state.
     *
     * @param windowState State of the filtering log window.
     *
     * @returns Promise that resolves after the message is sent.
     */ async setFilteringLogWindowState(windowState) {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.SetFilteringLogWindowState, {
            windowState
        });
    }
    /**
     * Sends a message to the background page to reset the settings.
     *
     * @returns Promise that resolves after the message is sent.
     */ async resetSettings() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.ResetSettings);
    }
    /**
     * Sends a message to the background page to get the user rules.
     *
     * @returns Promise that resolves with the user rules.
     */ async getUserRules() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.GetUserRules);
    }
    /**
     * Sends a message to the background page to save user rules.
     *
     * @param value User rules value to save.
     *
     * @returns Promise that resolves after the message is sent.
     */ async saveUserRules(value) {
        await this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.SaveUserRules, {
            value
        });
    }
    /**
     * Sends a message to the background page to open user rules editor in fullscreen.
     *
     * @returns Promise that resolves after the message is sent.
     */ async openFullscreenUserRules() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.OpenFullscreenUserRules);
    }
    /**
     * Sends a message to the background page to get the allowlist domains.
     *
     * @returns Promise that resolves with the list of allowlist domains.
     */ async getAllowlist() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.GetAllowlistDomains);
    }
    /**
     * Sends a message to the background page to save the allowlist domains.
     *
     * @param value Allowlist domains value to save.
     *
     * @returns Promise that resolves after the message is sent.
     */ async saveAllowlist(value) {
        await this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.SaveAllowlistDomains, {
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
        await this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.SetNotificationViewed, {
            withDelay
        });
    }
    /**
     * Sends a message to the background page to update filters.
     *
     * @returns Promise that resolves with the list of filters.
     */ async updateFiltersMV2() {
        if (true) {
            _common_logger__WEBPACK_IMPORTED_MODULE_2__/* .logger */ .v.warn('[ext.Messenger.updateFiltersMV2]: filters update is not supported in MV3');
            return [];
        }
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.CheckFiltersUpdate);
    }
    /**
     * Sends a message to the background page to check for extension updates.
     */ async checkUpdatesMV3() {
        if (false) {}
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.CheckExtensionUpdateMv3);
    }
    /**
     * Sends a message to the background page to update extension.
     */ async updateExtensionMV3({ from }) {
        if (false) {}
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.UpdateExtensionMv3, {
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
        const type = enabled ? _common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.EnableFiltersGroup : _common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.DisableFiltersGroup;
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
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.SetConsentedFilters, {
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
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.GetIsConsentedFilter, {
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
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.LoadCustomFilterInfo, {
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
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.SubscribeToCustomFilter, {
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
        await this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.RemoveAntiBannerFilter, {
            filterId
        });
    }
    /**
     * Sends a message to the background page to check if the application is initialized.
     *
     * @returns Promise that resolves to a boolean value:
     * true if the application is initialized, false otherwise.
     */ async getIsAppInitialized() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.GetIsAppInitialized);
    }
    /**
     * Sends a message to the background to get the tab info for the popup.
     *
     * @param tabId Tab ID.
     *
     * @returns Promise that resolves with the tab info or undefined.
     */ async getTabInfoForPopup(tabId) {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.GetTabInfoForPopup, {
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
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.ChangeApplicationFilteringPaused, {
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
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.UpdateFullscreenUserRulesTheme, {
            theme
        });
    }
    /**
     * Sends a message to the background page to open the rules limits tab.
     *
     * @returns Promise that resolves after the tab is opened.
     */ async openRulesLimitsTab() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.OpenRulesLimitsTab);
    }
    /**
     * Sends a message to the background page to open the settings tab.
     *
     * @returns Promise that resolves after the tab is opened.
     */ async openSettingsTab() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.OpenSettingsTab);
    }
    /**
     * Sends a message to the background page to open the assistant.
     *
     * @returns Promise that resolves after the assistant is opened.
     */ async openAssistant() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.OpenAssistant);
    }
    /**
     * Sends a message to the background page to open the abuse reporting tab for a site.
     *
     * @param url The URL of the site to report abuse for.
     * @param from The source of the request.
     *
     * @returns Promise that resolves after the tab is opened.
     */ async openAbuseSite(url, from) {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.OpenAbuseTab, {
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
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.OpenSiteReportTab, {
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
        const [currentTab] = await webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().tabs.query({
            active: true,
            currentWindow: true
        });
        if (!(currentTab === null || currentTab === void 0 ? void 0 : currentTab.id)) {
            _common_logger__WEBPACK_IMPORTED_MODULE_2__/* .logger */ .v.warn('[ext.Messenger.resetUserRulesForPage]: cannot get current tab id');
            return;
        }
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.ResetUserRulesForPage, {
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
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.RemoveAllowlistDomain, {
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
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.AddAllowlistDomainForTabId, {
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
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.AddAllowlistDomainForUrl, {
            url
        });
    }
    /**
     * Works only in MV2, since MV3 doesn't support filtering log yet.
     *
     * @returns Promise that resolves after the filtering log page is opened.
     */ async onOpenFilteringLogPage() {
        await this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.OnOpenFilteringLogPage);
    }
    /**
     * Sends a message to the background page to get filtering log data.
     *
     * @returns Promise that resolves with filtering log data.
     */ async getFilteringLogData() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.GetFilteringLogData);
    }
    /**
     * Sends a message to the background page to close the filtering log page.
     *
     * @returns Promise that resolves after the page is closed.
     */ async onCloseFilteringLogPage() {
        await this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.OnCloseFilteringLogPage);
    }
    /**
     * Sends a message to the background page to get filtering info by tab ID.
     *
     * @param tabId The ID of the tab.
     *
     * @returns Promise that resolves with filtering info about the tab.
     */ async getFilteringInfoByTabId(tabId) {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.GetFilteringInfoByTabId, {
            tabId
        });
    }
    /**
     * Sends a message to the background page to synchronize the list of open tabs.
     *
     * @returns Promise that resolves with an array of filtering info about open tabs.
     */ async synchronizeOpenTabs() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.SynchronizeOpenTabs);
    }
    /**
     * Sends a message to the background page to clear events by tab ID.
     *
     * @param tabId The ID of the tab.
     * @param ignorePreserveLog Optional flag to ignore the preserve log state.
     *
     * @returns Promise that resolves after the events are cleared.
     */ async clearEventsByTabId(tabId, ignorePreserveLog) {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.ClearEventsByTabId, {
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
        await this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.RefreshPage, {
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
        await this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.AddUserRule, {
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
        await this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.RemoveUserRule, {
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
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.SetPreserveLogState, {
            state
        });
    }
    /**
     * Sends a message to the background page to get the editor storage content.
     *
     * @returns Promise that resolves with the editor storage content.
     */ async getEditorStorageContent() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.GetEditorStorageContent);
    }
    /**
     * Sends a message to the background page to set the editor storage content.
     *
     * @param content Content to be stored in the editor.
     *
     * @returns Promise that resolves after the message is sent.
     */ async setEditorStorageContent(content) {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.SetEditorStorageContent, {
            content
        });
    }
    /**
     * Sends a message to the background page to get the rules limits counters for MV3.
     *
     * @returns Promise that resolves with the rules limits counters for MV3.
     */ async getRulesLimitsCounters() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.GetRulesLimitsCountersMv3);
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
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.CanEnableStaticFilterMv3, {
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
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.CanEnableStaticGroupMv3, {
            groupId
        });
    }
    /**
     * Sends a message to the background page to get the current static filters limits.
     *
     * @returns Promise that resolves with the current static filters limits.
     */ async getCurrentLimits() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.CurrentLimitsMv3);
    }
    /**
     * Sends a message to the background page to check if the request filter is ready.
     *
     * @returns Promise that resolves to a boolean indicating if the request filter is ready.
     */ async checkRequestFilterReady() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.CheckRequestFilterReady);
    }
    /**
     * Sends a message to the background page to add a URL to the trusted list.
     *
     * @param url URL to be added to the trusted list.
     *
     * @returns Promise that resolves after the message is sent.
     */ async addUrlToTrusted(url) {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.AddUrlToTrusted, {
            url
        });
    }
    /**
     * Sends a message to the background page to get user rules editor data.
     *
     * @returns Promise that resolves with the user rules editor data.
     */ async getUserRulesEditorData() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.GetUserRulesEditorData);
    }
    /**
     * Sends a message to the background page to restore filters in MV3.
     *
     * @returns Promise that resolves after the message is sent.
     */ async restoreFiltersMv3() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.RestoreFiltersMv3);
    }
    /**
     * Sends a message to the background page to clear the rules limits warning in MV3.
     *
     * @returns Promise that resolves after the message is sent.
     */ async clearRulesLimitsWarningMv3() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.ClearRulesLimitsWarningMv3);
    }
    /**
     * Sends a message to the background page to get the allowlist domains.
     *
     * @returns Promise that resolves with the allowlist domains.
     */ async getAllowlistDomains() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.GetAllowlistDomains);
    }
    /**
     * Sends a message to the background page to load the settings JSON.
     *
     * @returns Promise that resolves with the loaded settings JSON.
     */ async loadSettingsJson() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.LoadSettingsJson);
    }
    /**
     * Sends a message to the background page to open the thank you page.
     *
     * @returns Promise that resolves after the message is sent.
     */ async openThankyouPage() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.OpenThankyouPage);
    }
    /**
     * Sends a message to the background page to initialize the frame script.
     *
     * @returns Promise that resolves with the initialization data for the frame script.
     */ async initializeFrameScript() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.InitializeFrameScript);
    }
    /**
     * Sends a message to the background page to initialize the blocking page script.
     *
     * @returns Promise that resolves with the initialization data for the blocking page script.
     */ async initializeBlockingPageScript() {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.InitializeBlockingPageScript);
    }
    /**
     * Sends a message to the background page to mark url as trusted and ignore
     * safebrowsing checks for it.
     *
     * @returns Promise that resolves with the initialization data for the frame script.
     */ async openSafebrowsingTrusted(url) {
        return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.OpenSafebrowsingTrusted, {
            url
        });
    }
    /**
     * Creates an instance of the Messenger class.
     */ constructor(){
        _define_property(this, "onMessage", (webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().runtime).onMessage);
        /**
     * Method subscribes to notifier module events.
     *
     * @param events List of events to which subscribe.
     * @param callback Callback called when event fires.
     * @param onUnloadCallback Callback used to remove listener on unload.
     *
     * @returns Function to remove listener on unload.
     */ _define_property(this, "createEventListener", async (events, callback, onUnloadCallback)=>{
            let listenerId;
            const response = await this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.CreateEventListener, {
                events
            });
            listenerId = response.listenerId;
            const onUpdateListeners = async ()=>{
                const updatedResponse = await this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.CreateEventListener, {
                    events
                });
                listenerId = updatedResponse.listenerId;
            };
            const messageHandler = (message)=>{
                if (!(0,_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .messageHasTypeField */ .Et)(message)) {
                    _common_logger__WEBPACK_IMPORTED_MODULE_2__/* .logger */ .v.error('[ext.Messenger]: received message in Messenger.createEventListener has no type field:', message);
                    return undefined;
                }
                if (message.type === _common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.NotifyListeners) {
                    if (!(0,_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .messageHasTypeAndDataFields */ .oL)(message)) {
                        _common_logger__WEBPACK_IMPORTED_MODULE_2__/* .logger */ .v.error('[ext.Messenger]: received message with type MessageType.NotifyListeners has no data:', message);
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
                if (message.type === _common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.UpdateListeners) {
                    onUpdateListeners();
                }
            };
            const onUnload = ()=>{
                if (!listenerId) {
                    return;
                }
                webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().runtime.onMessage.removeListener(messageHandler);
                window.removeEventListener('beforeunload', onUnload);
                window.removeEventListener('unload', onUnload);
                this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.RemoveListener, {
                    listenerId
                });
                listenerId = null;
                if (typeof onUnloadCallback === 'function') {
                    onUnloadCallback();
                }
            };
            webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().runtime.onMessage.addListener(messageHandler);
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
     */ _define_property(this, "sendTelemetryPageViewEvent", async (screenName, pageId)=>{
            return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.SendTelemetryPageViewEvent, {
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
     */ _define_property(this, "sendTelemetryCustomEvent", async (screenName, eventName)=>{
            return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.SendTelemetryCustomEvent, {
                screenName,
                eventName
            });
        });
        /**
     * Adds opened page to telemetry tracking.
     *
     * @returns Promise that resolves with the page ID.
     */ _define_property(this, "addTelemetryOpenedPage", async ()=>{
            return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.AddTelemetryOpenedPage);
        });
        /**
     * Removes opened page from telemetry tracking.
     *
     * @param pageId Page ID to remove.
     *
     * @returns Promise that resolves after the message is sent.
     */ _define_property(this, "removeTelemetryOpenedPage", async (pageId)=>{
            return this.sendMessage(_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.RemoveTelemetryOpenedPage, {
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
     */ _define_property(Messenger, "createLongLivedConnection", (page, events, callback)=>{
    let port;
    let forceDisconnected = false;
    const portId = `${page}_${(0,nanoid__WEBPACK_IMPORTED_MODULE_4__/* .nanoid */ .Ak)()}`;
    const connect = ()=>{
        port = webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().runtime.connect({
            name: portId
        });
        port.postMessage({
            type: _common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.AddLongLivedConnection,
            data: {
                events
            }
        });
        port.onMessage.addListener((message)=>{
            if (!(0,_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .messageHasTypeField */ .Et)(message)) {
                _common_logger__WEBPACK_IMPORTED_MODULE_2__/* .logger */ .v.error('[ext.Messenger]: received message in Messenger.createLongLivedConnection has no type field:', message);
                return;
            }
            if (message.type === _common_messages__WEBPACK_IMPORTED_MODULE_3__/* .MessageType */ .Go.NotifyListeners) {
                if (!(0,_common_messages__WEBPACK_IMPORTED_MODULE_3__/* .messageHasTypeAndDataFields */ .oL)(message)) {
                    _common_logger__WEBPACK_IMPORTED_MODULE_2__/* .logger */ .v.error('[ext.Messenger]: received message with type MessageType.NotifyListeners has no data:', message);
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
            if ((webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().runtime).lastError) {
                _common_logger__WEBPACK_IMPORTED_MODULE_2__/* .logger */ .v.error('[ext.Messenger]: received error on disconnect:', (webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().runtime).lastError.message);
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



/***/ }),

/***/ 17303:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(72468);
var isArray = __webpack_require__(52176);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
    throw new $TypeError('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};


/***/ }),

/***/ 56381:
/***/ ((module) => {


var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};


/***/ }),

/***/ 52176:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var classof = __webpack_require__(632);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) === 'Array';
};


/***/ }),

/***/ 34356:
/***/ ((module) => {


var $TypeError = TypeError;

module.exports = function (passed, required) {
  if (passed < required) throw new $TypeError('Not enough arguments');
  return passed;
};


/***/ }),

/***/ 10474:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(79214);
var toObject = __webpack_require__(76573);
var lengthOfArrayLike = __webpack_require__(47294);
var setArrayLength = __webpack_require__(17303);
var doesNotExceedSafeInteger = __webpack_require__(56381);
var fails = __webpack_require__(2599);

var INCORRECT_TO_LENGTH = fails(function () {
  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
});

// V8 <= 121 and Safari <= 15.4; FF < 23 throws InternalError
// https://bugs.chromium.org/p/v8/issues/detail?id=12681
var properErrorOnNonWritableLength = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).push();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

// `Array.prototype.push` method
// https://tc39.es/ecma262/#sec-array.prototype.push
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength(O, len);
    return len;
  }
});


/***/ }),

/***/ 4659:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var defineBuiltIn = __webpack_require__(44432);
var uncurryThis = __webpack_require__(54936);
var toString = __webpack_require__(93207);
var validateArgumentsLength = __webpack_require__(34356);

var $URLSearchParams = URLSearchParams;
var URLSearchParamsPrototype = $URLSearchParams.prototype;
var append = uncurryThis(URLSearchParamsPrototype.append);
var $delete = uncurryThis(URLSearchParamsPrototype['delete']);
var forEach = uncurryThis(URLSearchParamsPrototype.forEach);
var push = uncurryThis([].push);
var params = new $URLSearchParams('a=1&a=2&b=3');

params['delete']('a', 1);
// `undefined` case is a Chromium 117 bug
// https://bugs.chromium.org/p/v8/issues/detail?id=14222
params['delete']('b', undefined);

if (params + '' !== 'a=2') {
  defineBuiltIn(URLSearchParamsPrototype, 'delete', function (name /* , value */) {
    var length = arguments.length;
    var $value = length < 2 ? undefined : arguments[1];
    if (length && $value === undefined) return $delete(this, name);
    var entries = [];
    forEach(this, function (v, k) { // also validates `this`
      push(entries, { key: k, value: v });
    });
    validateArgumentsLength(length, 1);
    var key = toString(name);
    var value = toString($value);
    var index = 0;
    var dindex = 0;
    var found = false;
    var entriesLength = entries.length;
    var entry;
    while (index < entriesLength) {
      entry = entries[index++];
      if (found || entry.key === key) {
        found = true;
        $delete(this, entry.key);
      } else dindex++;
    }
    while (dindex < entriesLength) {
      entry = entries[dindex++];
      if (!(entry.key === key && entry.value === value)) append(this, entry.key, entry.value);
    }
  }, { enumerable: true, unsafe: true });
}


/***/ }),

/***/ 43526:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var defineBuiltIn = __webpack_require__(44432);
var uncurryThis = __webpack_require__(54936);
var toString = __webpack_require__(93207);
var validateArgumentsLength = __webpack_require__(34356);

var $URLSearchParams = URLSearchParams;
var URLSearchParamsPrototype = $URLSearchParams.prototype;
var getAll = uncurryThis(URLSearchParamsPrototype.getAll);
var $has = uncurryThis(URLSearchParamsPrototype.has);
var params = new $URLSearchParams('a=1');

// `undefined` case is a Chromium 117 bug
// https://bugs.chromium.org/p/v8/issues/detail?id=14222
if (params.has('a', 2) || !params.has('a', undefined)) {
  defineBuiltIn(URLSearchParamsPrototype, 'has', function has(name /* , value */) {
    var length = arguments.length;
    var $value = length < 2 ? undefined : arguments[1];
    if (length && $value === undefined) return $has(this, name);
    var values = getAll(this, name); // also validates `this`
    validateArgumentsLength(length, 1);
    var value = toString($value);
    var index = 0;
    while (index < values.length) {
      if (values[index++] === value) return true;
    } return false;
  }, { enumerable: true, unsafe: true });
}


/***/ }),

/***/ 9561:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(72468);
var uncurryThis = __webpack_require__(54936);
var defineBuiltInAccessor = __webpack_require__(43954);

var URLSearchParamsPrototype = URLSearchParams.prototype;
var forEach = uncurryThis(URLSearchParamsPrototype.forEach);

// `URLSearchParams.prototype.size` getter
// https://github.com/whatwg/url/pull/734
if (DESCRIPTORS && !('size' in URLSearchParamsPrototype)) {
  defineBuiltInAccessor(URLSearchParamsPrototype, 'size', {
    get: function size() {
      var count = 0;
      forEach(this, function () { count++; });
      return count;
    },
    configurable: true,
    enumerable: true
  });
}


/***/ }),

/***/ 73766:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ addLeadingZeros)
/* harmony export */ });
function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}


/***/ }),

/***/ 41591:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ getDefaultOptions)
/* harmony export */ });
/* unused harmony export setDefaultOptions */
let defaultOptions = {};

function getDefaultOptions() {
  return defaultOptions;
}

function setDefaultOptions(newOptions) {
  defaultOptions = newOptions;
}


/***/ }),

/***/ 36559:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ formatters)
/* harmony export */ });
/* harmony import */ var _getDayOfYear_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(80121);
/* harmony import */ var _getISOWeek_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(30366);
/* harmony import */ var _getISOWeekYear_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28851);
/* harmony import */ var _getWeek_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(80291);
/* harmony import */ var _getWeekYear_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(87462);
/* harmony import */ var _addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73766);
/* harmony import */ var _lightFormatters_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11281);









const dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night",
};

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
 * |  p! | Long localized time            |  P! | Long localized date            |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 * - `P` is long localized date format
 * - `p` is long localized time format
 */

const formatters = {
  // Era
  G: function (date, token, localize) {
    const era = date.getFullYear() > 0 ? 1 : 0;
    switch (token) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return localize.era(era, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return localize.era(era, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return localize.era(era, { width: "wide" });
    }
  },

  // Year
  y: function (date, token, localize) {
    // Ordinal number
    if (token === "yo") {
      const signedYear = date.getFullYear();
      // Returns 1 for 1 BC (which is year 0 in JavaScript)
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize.ordinalNumber(year, { unit: "year" });
    }

    return _lightFormatters_js__WEBPACK_IMPORTED_MODULE_0__/* .lightFormatters */ .C.y(date, token);
  },

  // Local week-numbering year
  Y: function (date, token, localize, options) {
    const signedWeekYear = (0,_getWeekYear_js__WEBPACK_IMPORTED_MODULE_1__/* .getWeekYear */ .h)(date, options);
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;

    // Two digit year
    if (token === "YY") {
      const twoDigitYear = weekYear % 100;
      return (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_2__/* .addLeadingZeros */ .F)(twoDigitYear, 2);
    }

    // Ordinal number
    if (token === "Yo") {
      return localize.ordinalNumber(weekYear, { unit: "year" });
    }

    // Padding
    return (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_2__/* .addLeadingZeros */ .F)(weekYear, token.length);
  },

  // ISO week-numbering year
  R: function (date, token) {
    const isoWeekYear = (0,_getISOWeekYear_js__WEBPACK_IMPORTED_MODULE_3__/* .getISOWeekYear */ .p)(date);

    // Padding
    return (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_2__/* .addLeadingZeros */ .F)(isoWeekYear, token.length);
  },

  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function (date, token) {
    const year = date.getFullYear();
    return (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_2__/* .addLeadingZeros */ .F)(year, token.length);
  },

  // Quarter
  Q: function (date, token, localize) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "Q":
        return String(quarter);
      // 01, 02, 03, 04
      case "QQ":
        return (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_2__/* .addLeadingZeros */ .F)(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return localize.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return localize.quarter(quarter, {
          width: "abbreviated",
          context: "formatting",
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return localize.quarter(quarter, {
          width: "narrow",
          context: "formatting",
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return localize.quarter(quarter, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Stand-alone quarter
  q: function (date, token, localize) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "q":
        return String(quarter);
      // 01, 02, 03, 04
      case "qq":
        return (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_2__/* .addLeadingZeros */ .F)(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return localize.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return localize.quarter(quarter, {
          width: "abbreviated",
          context: "standalone",
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return localize.quarter(quarter, {
          width: "narrow",
          context: "standalone",
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return localize.quarter(quarter, {
          width: "wide",
          context: "standalone",
        });
    }
  },

  // Month
  M: function (date, token, localize) {
    const month = date.getMonth();
    switch (token) {
      case "M":
      case "MM":
        return _lightFormatters_js__WEBPACK_IMPORTED_MODULE_0__/* .lightFormatters */ .C.M(date, token);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return localize.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return localize.month(month, {
          width: "abbreviated",
          context: "formatting",
        });
      // J, F, ..., D
      case "MMMMM":
        return localize.month(month, {
          width: "narrow",
          context: "formatting",
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return localize.month(month, { width: "wide", context: "formatting" });
    }
  },

  // Stand-alone month
  L: function (date, token, localize) {
    const month = date.getMonth();
    switch (token) {
      // 1, 2, ..., 12
      case "L":
        return String(month + 1);
      // 01, 02, ..., 12
      case "LL":
        return (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_2__/* .addLeadingZeros */ .F)(month + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return localize.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return localize.month(month, {
          width: "abbreviated",
          context: "standalone",
        });
      // J, F, ..., D
      case "LLLLL":
        return localize.month(month, {
          width: "narrow",
          context: "standalone",
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return localize.month(month, { width: "wide", context: "standalone" });
    }
  },

  // Local week of year
  w: function (date, token, localize, options) {
    const week = (0,_getWeek_js__WEBPACK_IMPORTED_MODULE_4__/* .getWeek */ .N)(date, options);

    if (token === "wo") {
      return localize.ordinalNumber(week, { unit: "week" });
    }

    return (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_2__/* .addLeadingZeros */ .F)(week, token.length);
  },

  // ISO week of year
  I: function (date, token, localize) {
    const isoWeek = (0,_getISOWeek_js__WEBPACK_IMPORTED_MODULE_5__/* .getISOWeek */ .s)(date);

    if (token === "Io") {
      return localize.ordinalNumber(isoWeek, { unit: "week" });
    }

    return (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_2__/* .addLeadingZeros */ .F)(isoWeek, token.length);
  },

  // Day of the month
  d: function (date, token, localize) {
    if (token === "do") {
      return localize.ordinalNumber(date.getDate(), { unit: "date" });
    }

    return _lightFormatters_js__WEBPACK_IMPORTED_MODULE_0__/* .lightFormatters */ .C.d(date, token);
  },

  // Day of year
  D: function (date, token, localize) {
    const dayOfYear = (0,_getDayOfYear_js__WEBPACK_IMPORTED_MODULE_6__/* .getDayOfYear */ .F)(date);

    if (token === "Do") {
      return localize.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
    }

    return (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_2__/* .addLeadingZeros */ .F)(dayOfYear, token.length);
  },

  // Day of week
  E: function (date, token, localize) {
    const dayOfWeek = date.getDay();
    switch (token) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "EEEEE":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "EEEEEE":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "EEEE":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Local day of week
  e: function (date, token, localize, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(localDayOfWeek);
      // Padded numerical value
      case "ee":
        return (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_2__/* .addLeadingZeros */ .F)(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "eee":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "eeeee":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "eeeeee":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "eeee":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Stand-alone local day of week
  c: function (date, token, localize, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (same as in `e`)
      case "c":
        return String(localDayOfWeek);
      // Padded numerical value
      case "cc":
        return (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_2__/* .addLeadingZeros */ .F)(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "ccc":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone",
        });
      // T
      case "ccccc":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "standalone",
        });
      // Tu
      case "cccccc":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "standalone",
        });
      // Tuesday
      case "cccc":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "standalone",
        });
    }
  },

  // ISO day of week
  i: function (date, token, localize) {
    const dayOfWeek = date.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      // 2
      case "i":
        return String(isoDayOfWeek);
      // 02
      case "ii":
        return (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_2__/* .addLeadingZeros */ .F)(isoDayOfWeek, token.length);
      // 2nd
      case "io":
        return localize.ordinalNumber(isoDayOfWeek, { unit: "day" });
      // Tue
      case "iii":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "iiiii":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "iiiiii":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "iiii":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // AM or PM
  a: function (date, token, localize) {
    const hours = date.getHours();
    const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";

    switch (token) {
      case "a":
      case "aa":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "aaa":
        return localize
          .dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting",
          })
          .toLowerCase();
      case "aaaaa":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "aaaa":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // AM, PM, midnight, noon
  b: function (date, token, localize) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }

    switch (token) {
      case "b":
      case "bb":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "bbb":
        return localize
          .dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting",
          })
          .toLowerCase();
      case "bbbbb":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "bbbb":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // in the morning, in the afternoon, in the evening, at night
  B: function (date, token, localize) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }

    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "BBBBB":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "BBBB":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Hour [1-12]
  h: function (date, token, localize) {
    if (token === "ho") {
      let hours = date.getHours() % 12;
      if (hours === 0) hours = 12;
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return _lightFormatters_js__WEBPACK_IMPORTED_MODULE_0__/* .lightFormatters */ .C.h(date, token);
  },

  // Hour [0-23]
  H: function (date, token, localize) {
    if (token === "Ho") {
      return localize.ordinalNumber(date.getHours(), { unit: "hour" });
    }

    return _lightFormatters_js__WEBPACK_IMPORTED_MODULE_0__/* .lightFormatters */ .C.H(date, token);
  },

  // Hour [0-11]
  K: function (date, token, localize) {
    const hours = date.getHours() % 12;

    if (token === "Ko") {
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_2__/* .addLeadingZeros */ .F)(hours, token.length);
  },

  // Hour [1-24]
  k: function (date, token, localize) {
    let hours = date.getHours();
    if (hours === 0) hours = 24;

    if (token === "ko") {
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_2__/* .addLeadingZeros */ .F)(hours, token.length);
  },

  // Minute
  m: function (date, token, localize) {
    if (token === "mo") {
      return localize.ordinalNumber(date.getMinutes(), { unit: "minute" });
    }

    return _lightFormatters_js__WEBPACK_IMPORTED_MODULE_0__/* .lightFormatters */ .C.m(date, token);
  },

  // Second
  s: function (date, token, localize) {
    if (token === "so") {
      return localize.ordinalNumber(date.getSeconds(), { unit: "second" });
    }

    return _lightFormatters_js__WEBPACK_IMPORTED_MODULE_0__/* .lightFormatters */ .C.s(date, token);
  },

  // Fraction of second
  S: function (date, token) {
    return _lightFormatters_js__WEBPACK_IMPORTED_MODULE_0__/* .lightFormatters */ .C.S(date, token);
  },

  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    if (timezoneOffset === 0) {
      return "Z";
    }

    switch (token) {
      // Hours and optional minutes
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX": // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX": // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Hours and optional minutes
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx": // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx": // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (GMT)
  O: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (specific non-location)
  z: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },

  // Seconds timestamp
  t: function (date, token, _localize) {
    const timestamp = Math.trunc(+date / 1000);
    return (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_2__/* .addLeadingZeros */ .F)(timestamp, token.length);
  },

  // Milliseconds timestamp
  T: function (date, token, _localize) {
    return (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_2__/* .addLeadingZeros */ .F)(+date, token.length);
  },
};

function formatTimezoneShort(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return sign + String(hours) + delimiter + (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_2__/* .addLeadingZeros */ .F)(minutes, 2);
}

function formatTimezoneWithOptionalMinutes(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? "-" : "+";
    return sign + (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_2__/* .addLeadingZeros */ .F)(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, delimiter);
}

function formatTimezone(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_2__/* .addLeadingZeros */ .F)(Math.trunc(absOffset / 60), 2);
  const minutes = (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_2__/* .addLeadingZeros */ .F)(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}


/***/ }),

/***/ 11281:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ lightFormatters)
/* harmony export */ });
/* harmony import */ var _addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(73766);


/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* |                                |
 * |  d  | Day of month                   |  D  |                                |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  m  | Minute                         |  M  | Month                          |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  y  | Year (abs)                     |  Y  |                                |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 */

const lightFormatters = {
  // Year
  y(date, token) {
    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
    // |----------|-------|----|-------|-------|-------|
    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

    const signedYear = date.getFullYear();
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    return (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_0__/* .addLeadingZeros */ .F)(token === "yy" ? year % 100 : year, token.length);
  },

  // Month
  M(date, token) {
    const month = date.getMonth();
    return token === "M" ? String(month + 1) : (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_0__/* .addLeadingZeros */ .F)(month + 1, 2);
  },

  // Day of the month
  d(date, token) {
    return (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_0__/* .addLeadingZeros */ .F)(date.getDate(), token.length);
  },

  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";

    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },

  // Hour [1-12]
  h(date, token) {
    return (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_0__/* .addLeadingZeros */ .F)(date.getHours() % 12 || 12, token.length);
  },

  // Hour [0-23]
  H(date, token) {
    return (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_0__/* .addLeadingZeros */ .F)(date.getHours(), token.length);
  },

  // Minute
  m(date, token) {
    return (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_0__/* .addLeadingZeros */ .F)(date.getMinutes(), token.length);
  },

  // Second
  s(date, token) {
    return (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_0__/* .addLeadingZeros */ .F)(date.getSeconds(), token.length);
  },

  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length;
    const milliseconds = date.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3),
    );
    return (0,_addLeadingZeros_js__WEBPACK_IMPORTED_MODULE_0__/* .addLeadingZeros */ .F)(fractionalSeconds, token.length);
  },
};


/***/ }),

/***/ 61777:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ longFormatters)
/* harmony export */ });
const dateLongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case "P":
      return formatLong.date({ width: "short" });
    case "PP":
      return formatLong.date({ width: "medium" });
    case "PPP":
      return formatLong.date({ width: "long" });
    case "PPPP":
    default:
      return formatLong.date({ width: "full" });
  }
};

const timeLongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case "p":
      return formatLong.time({ width: "short" });
    case "pp":
      return formatLong.time({ width: "medium" });
    case "ppp":
      return formatLong.time({ width: "long" });
    case "pppp":
    default:
      return formatLong.time({ width: "full" });
  }
};

const dateTimeLongFormatter = (pattern, formatLong) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || [];
  const datePattern = matchResult[1];
  const timePattern = matchResult[2];

  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong);
  }

  let dateTimeFormat;

  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong.dateTime({ width: "short" });
      break;
    case "PP":
      dateTimeFormat = formatLong.dateTime({ width: "medium" });
      break;
    case "PPP":
      dateTimeFormat = formatLong.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong.dateTime({ width: "full" });
      break;
  }

  return dateTimeFormat
    .replace("{{date}}", dateLongFormatter(datePattern, formatLong))
    .replace("{{time}}", timeLongFormatter(timePattern, formatLong));
};

const longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter,
};


/***/ }),

/***/ 36089:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ getTimezoneOffsetInMilliseconds)
/* harmony export */ });
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38714);


/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  const _date = (0,_toDate_js__WEBPACK_IMPORTED_MODULE_0__/* .toDate */ .a)(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds(),
    ),
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}


/***/ }),

/***/ 61650:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ normalizeDates)
/* harmony export */ });
/* harmony import */ var _constructFrom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65594);


function normalizeDates(context, ...dates) {
  const normalize = _constructFrom_js__WEBPACK_IMPORTED_MODULE_0__/* .constructFrom */ .w.bind(
    null,
    context || dates.find((date) => typeof date === "object"),
  );
  return dates.map(normalize);
}


/***/ }),

/***/ 35072:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ss: () => (/* binding */ warnOrThrowProtectedError),
/* harmony export */   ef: () => (/* binding */ isProtectedDayOfYearToken),
/* harmony export */   xM: () => (/* binding */ isProtectedWeekYearToken)
/* harmony export */ });
const dayOfYearTokenRE = /^D+$/;
const weekYearTokenRE = /^Y+$/;

const throwTokens = ["D", "DD", "YY", "YYYY"];

function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token);
}

function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token);
}

function warnOrThrowProtectedError(token, format, input) {
  const _message = message(token, format, input);
  console.warn(_message);
  if (throwTokens.includes(token)) throw new RangeError(_message);
}

function message(token, format, input) {
  const subject = token[0] === "Y" ? "years" : "days of the month";
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}


/***/ }),

/***/ 91658:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _P: () => (/* binding */ constructFromSymbol),
/* harmony export */   my: () => (/* binding */ millisecondsInWeek),
/* harmony export */   w4: () => (/* binding */ millisecondsInDay)
/* harmony export */ });
/* unused harmony exports daysInWeek, daysInYear, maxTime, minTime, millisecondsInMinute, millisecondsInHour, millisecondsInSecond, minutesInYear, minutesInMonth, minutesInDay, minutesInHour, monthsInQuarter, monthsInYear, quartersInYear, secondsInHour, secondsInMinute, secondsInDay, secondsInWeek, secondsInYear, secondsInMonth, secondsInQuarter */
/**
 * @module constants
 * @summary Useful constants
 * @description
 * Collection of useful date constants.
 *
 * The constants could be imported from `date-fns/constants`:
 *
 * ```ts
 * import { maxTime, minTime } from "./constants/date-fns/constants";
 *
 * function isAllowedTime(time) {
 *   return time <= maxTime && time >= minTime;
 * }
 * ```
 */

/**
 * @constant
 * @name daysInWeek
 * @summary Days in 1 week.
 */
const daysInWeek = 7;

/**
 * @constant
 * @name daysInYear
 * @summary Days in 1 year.
 *
 * @description
 * How many days in a year.
 *
 * One years equals 365.2425 days according to the formula:
 *
 * > Leap year occurs every 4 years, except for years that are divisible by 100 and not divisible by 400.
 * > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
 */
const daysInYear = 365.2425;

/**
 * @constant
 * @name maxTime
 * @summary Maximum allowed time.
 *
 * @example
 * import { maxTime } from "./constants/date-fns/constants";
 *
 * const isValid = 8640000000000001 <= maxTime;
 * //=> false
 *
 * new Date(8640000000000001);
 * //=> Invalid Date
 */
const maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1000;

/**
 * @constant
 * @name minTime
 * @summary Minimum allowed time.
 *
 * @example
 * import { minTime } from "./constants/date-fns/constants";
 *
 * const isValid = -8640000000000001 >= minTime;
 * //=> false
 *
 * new Date(-8640000000000001)
 * //=> Invalid Date
 */
const minTime = -maxTime;

/**
 * @constant
 * @name millisecondsInWeek
 * @summary Milliseconds in 1 week.
 */
const millisecondsInWeek = 604800000;

/**
 * @constant
 * @name millisecondsInDay
 * @summary Milliseconds in 1 day.
 */
const millisecondsInDay = 86400000;

/**
 * @constant
 * @name millisecondsInMinute
 * @summary Milliseconds in 1 minute
 */
const millisecondsInMinute = 60000;

/**
 * @constant
 * @name millisecondsInHour
 * @summary Milliseconds in 1 hour
 */
const millisecondsInHour = 3600000;

/**
 * @constant
 * @name millisecondsInSecond
 * @summary Milliseconds in 1 second
 */
const millisecondsInSecond = 1000;

/**
 * @constant
 * @name minutesInYear
 * @summary Minutes in 1 year.
 */
const minutesInYear = 525600;

/**
 * @constant
 * @name minutesInMonth
 * @summary Minutes in 1 month.
 */
const minutesInMonth = 43200;

/**
 * @constant
 * @name minutesInDay
 * @summary Minutes in 1 day.
 */
const minutesInDay = 1440;

/**
 * @constant
 * @name minutesInHour
 * @summary Minutes in 1 hour.
 */
const minutesInHour = 60;

/**
 * @constant
 * @name monthsInQuarter
 * @summary Months in 1 quarter.
 */
const monthsInQuarter = 3;

/**
 * @constant
 * @name monthsInYear
 * @summary Months in 1 year.
 */
const monthsInYear = 12;

/**
 * @constant
 * @name quartersInYear
 * @summary Quarters in 1 year
 */
const quartersInYear = 4;

/**
 * @constant
 * @name secondsInHour
 * @summary Seconds in 1 hour.
 */
const secondsInHour = 3600;

/**
 * @constant
 * @name secondsInMinute
 * @summary Seconds in 1 minute.
 */
const secondsInMinute = 60;

/**
 * @constant
 * @name secondsInDay
 * @summary Seconds in 1 day.
 */
const secondsInDay = secondsInHour * 24;

/**
 * @constant
 * @name secondsInWeek
 * @summary Seconds in 1 week.
 */
const secondsInWeek = secondsInDay * 7;

/**
 * @constant
 * @name secondsInYear
 * @summary Seconds in 1 year.
 */
const secondsInYear = secondsInDay * daysInYear;

/**
 * @constant
 * @name secondsInMonth
 * @summary Seconds in 1 month
 */
const secondsInMonth = secondsInYear / 12;

/**
 * @constant
 * @name secondsInQuarter
 * @summary Seconds in 1 quarter.
 */
const secondsInQuarter = secondsInMonth * 3;

/**
 * @constant
 * @name constructFromSymbol
 * @summary Symbol enabling Date extensions to inherit properties from the reference date.
 *
 * The symbol is used to enable the `constructFrom` function to construct a date
 * using a reference date and a value. It allows to transfer extra properties
 * from the reference date to the new date. It's useful for extensions like
 * [`TZDate`](https://github.com/date-fns/tz) that accept a time zone as
 * a constructor argument.
 */
const constructFromSymbol = Symbol.for("constructDateFrom");


/***/ }),

/***/ 65594:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ constructFrom)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91658);


/**
 * @name constructFrom
 * @category Generic Helpers
 * @summary Constructs a date using the reference date and the value
 *
 * @description
 * The function constructs a new date using the constructor from the reference
 * date and the given value. It helps to build generic functions that accept
 * date extensions.
 *
 * It defaults to `Date` if the passed reference date is a number or a string.
 *
 * Starting from v3.7.0, it allows to construct a date using `[Symbol.for("constructDateFrom")]`
 * enabling to transfer extra properties from the reference date to the new date.
 * It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
 * that accept a time zone as a constructor argument.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The reference date to take constructor from
 * @param value - The value to create the date
 *
 * @returns Date initialized using the given date and value
 *
 * @example
 * import { constructFrom } from "./constructFrom/date-fns";
 *
 * // A function that clones a date preserving the original type
 * function cloneDate<DateType extends Date>(date: DateType): DateType {
 *   return constructFrom(
 *     date, // Use constructor from the given date
 *     date.getTime() // Use the date value to create a new date
 *   );
 * }
 */
function constructFrom(date, value) {
  if (typeof date === "function") return date(value);

  if (date && typeof date === "object" && _constants_js__WEBPACK_IMPORTED_MODULE_0__/* .constructFromSymbol */ ._P in date)
    return date[_constants_js__WEBPACK_IMPORTED_MODULE_0__/* .constructFromSymbol */ ._P](value);

  if (date instanceof Date) return new date.constructor(value);

  return new Date(value);
}

// Fallback for modularized imports:
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (constructFrom)));


/***/ }),

/***/ 26634:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ differenceInCalendarDays)
/* harmony export */ });
/* harmony import */ var _lib_getTimezoneOffsetInMilliseconds_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(36089);
/* harmony import */ var _lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61650);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(91658);
/* harmony import */ var _startOfDay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(70330);





/**
 * The {@link differenceInCalendarDays} function options.
 */

/**
 * @name differenceInCalendarDays
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - The options object
 *
 * @returns The number of calendar days
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInCalendarDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */
function differenceInCalendarDays(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0,_lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeDates */ .x)(
    options?.in,
    laterDate,
    earlierDate,
  );

  const laterStartOfDay = (0,_startOfDay_js__WEBPACK_IMPORTED_MODULE_1__/* .startOfDay */ .o)(laterDate_);
  const earlierStartOfDay = (0,_startOfDay_js__WEBPACK_IMPORTED_MODULE_1__/* .startOfDay */ .o)(earlierDate_);

  const laterTimestamp =
    +laterStartOfDay - (0,_lib_getTimezoneOffsetInMilliseconds_js__WEBPACK_IMPORTED_MODULE_2__/* .getTimezoneOffsetInMilliseconds */ .G)(laterStartOfDay);
  const earlierTimestamp =
    +earlierStartOfDay - (0,_lib_getTimezoneOffsetInMilliseconds_js__WEBPACK_IMPORTED_MODULE_2__/* .getTimezoneOffsetInMilliseconds */ .G)(earlierStartOfDay);

  // Round the number of days to the nearest integer because the number of
  // milliseconds in a day is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round((laterTimestamp - earlierTimestamp) / _constants_js__WEBPACK_IMPORTED_MODULE_3__/* .millisecondsInDay */ .w4);
}

// Fallback for modularized imports:
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (differenceInCalendarDays)));


/***/ }),

/***/ 81660:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GP: () => (/* binding */ format)
/* harmony export */ });
/* unused harmony export formatDate */
/* harmony import */ var _lib_defaultLocale_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14464);
/* harmony import */ var _lib_defaultOptions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41591);
/* harmony import */ var _lib_format_formatters_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(36559);
/* harmony import */ var _lib_format_longFormatters_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(61777);
/* harmony import */ var _lib_protectedTokens_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(35072);
/* harmony import */ var _isValid_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(70465);
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(38714);








// Rexports of internal for libraries to use.
// See: https://github.com/date-fns/date-fns/issues/3638#issuecomment-1877082874


// This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
const formattingTokensRegExp =
  /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

// This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

const escapedStringRegExp = /^'([^]*?)'?$/;
const doubleQuoteRegExp = /''/g;
const unescapedLatinCharacterRegExp = /[a-zA-Z]/;



/**
 * The {@link format} function options.
 */

/**
 * @name format
 * @alias formatDate
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format. The result may vary by locale.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 * (see the last example)
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 7 below the table).
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   | Notes |
 * |---------------------------------|---------|-----------------------------------|-------|
 * | Era                             | G..GGG  | AD, BC                            |       |
 * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 | GGGGG   | A, B                              |       |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
 * |                                 | yy      | 44, 01, 00, 17                    | 5     |
 * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
 * |                                 | yyyyy   | ...                               | 3,5   |
 * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
 * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
 * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
 * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
 * |                                 | YYYYY   | ...                               | 3,5   |
 * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
 * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
 * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
 * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
 * |                                 | RRRRR   | ...                               | 3,5,7 |
 * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
 * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
 * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
 * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
 * |                                 | uuuuu   | ...                               | 3,5   |
 * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
 * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | QQ      | 01, 02, 03, 04                    |       |
 * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
 * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | qq      | 01, 02, 03, 04                    |       |
 * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
 * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | MM      | 01, 02, ..., 12                   |       |
 * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 | MMMM    | January, February, ..., December  | 2     |
 * |                                 | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
 * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | LL      | 01, 02, ..., 12                   |       |
 * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 | LLLL    | January, February, ..., December  | 2     |
 * |                                 | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | w       | 1, 2, ..., 53                     |       |
 * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
 * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | II      | 01, 02, ..., 53                   | 7     |
 * | Day of month                    | d       | 1, 2, ..., 31                     |       |
 * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
 * |                                 | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
 * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
 * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
 * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 | DDDD    | ...                               | 3     |
 * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
 * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
 * |                                 | ii      | 01, 02, ..., 07                   | 7     |
 * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
 * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
 * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
 * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
 * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | ee      | 02, 03, ..., 01                   |       |
 * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | cc      | 02, 03, ..., 01                   |       |
 * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          | a..aa   | AM, PM                            |       |
 * |                                 | aaa     | am, pm                            |       |
 * |                                 | aaaa    | a.m., p.m.                        | 2     |
 * |                                 | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
 * |                                 | bbb     | am, pm, noon, midnight            |       |
 * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
 * |                                 | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
 * |                                 | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
 * |                                 | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
 * |                                 | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
 * |                                 | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          | m       | 0, 1, ..., 59                     |       |
 * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | mm      | 00, 01, ..., 59                   |       |
 * | Second                          | s       | 0, 1, ..., 59                     |       |
 * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | ss      | 00, 01, ..., 59                   |       |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
 * |                                 | SS      | 00, 01, ..., 99                   |       |
 * |                                 | SSS     | 000, 001, ..., 999                |       |
 * |                                 | SSSS    | ...                               | 3     |
 * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
 * |                                 | XX      | -0800, +0530, Z                   |       |
 * |                                 | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
 * |                                 | xx      | -0800, +0530, +0000               |       |
 * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
 * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
 * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
 * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
 * | Seconds timestamp               | t       | 512969520                         | 7     |
 * |                                 | tt      | ...                               | 3,7   |
 * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
 * |                                 | TT      | ...                               | 3,7   |
 * | Long localized date             | P       | 04/29/1453                        | 7     |
 * |                                 | PP      | Apr 29, 1453                      | 7     |
 * |                                 | PPP     | April 29th, 1453                  | 7     |
 * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
 * | Long localized time             | p       | 12:00 AM                          | 7     |
 * |                                 | pp      | 12:00:00 AM                       | 7     |
 * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
 * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
 * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
 * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
 * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
 * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
 *    the output will be the same as default pattern for this unit, usually
 *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
 *    are marked with "2" in the last column of the table.
 *
 *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
 *
 * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
 *    The output will be padded with zeros to match the length of the pattern.
 *
 *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
 *
 * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 5. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` always returns the last two digits of a year,
 *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
 *
 *    | Year | `yy` | `uu` |
 *    |------|------|------|
 *    | 1    |   01 |   01 |
 *    | 14   |   14 |   14 |
 *    | 376  |   76 |  376 |
 *    | 1453 |   53 | 1453 |
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [getISOWeekYear](https://date-fns.org/docs/getISOWeekYear)
 *    and [getWeekYear](https://date-fns.org/docs/getWeekYear)).
 *
 * 6. Specific non-location timezones are currently unavailable in `date-fns`,
 *    so right now these tokens fall back to GMT timezones.
 *
 * 7. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `t`: seconds timestamp
 *    - `T`: milliseconds timestamp
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * @param date - The original date
 * @param format - The string of tokens
 * @param options - An object with options
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 * @throws `options.locale` must contain `localize` property
 * @throws `options.locale` must contain `formatLong` property
 * @throws use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws format string contains an unescaped latin alphabet character
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * import { eoLocale } from 'date-fns/locale/eo'
 * const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
 *   locale: eoLocale
 * })
 * //=> '2-a de julio 2014'
 *
 * @example
 * // Escape string by single quote characters:
 * const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
 * //=> "3 o'clock"
 */
function format(date, formatStr, options) {
  const defaultOptions = (0,_lib_defaultOptions_js__WEBPACK_IMPORTED_MODULE_0__/* .getDefaultOptions */ .q)();
  const locale = options?.locale ?? defaultOptions.locale ?? _lib_defaultLocale_js__WEBPACK_IMPORTED_MODULE_1__/* .enUS */ .c;

  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const originalDate = (0,_toDate_js__WEBPACK_IMPORTED_MODULE_2__/* .toDate */ .a)(date, options?.in);

  if (!(0,_isValid_js__WEBPACK_IMPORTED_MODULE_3__/* .isValid */ .f)(originalDate)) {
    throw new RangeError("Invalid time value");
  }

  let parts = formatStr
    .match(longFormattingTokensRegExp)
    .map((substring) => {
      const firstCharacter = substring[0];
      if (firstCharacter === "p" || firstCharacter === "P") {
        const longFormatter = _lib_format_longFormatters_js__WEBPACK_IMPORTED_MODULE_4__/* .longFormatters */ .m[firstCharacter];
        return longFormatter(substring, locale.formatLong);
      }
      return substring;
    })
    .join("")
    .match(formattingTokensRegExp)
    .map((substring) => {
      // Replace two single quote characters with one single quote character
      if (substring === "''") {
        return { isToken: false, value: "'" };
      }

      const firstCharacter = substring[0];
      if (firstCharacter === "'") {
        return { isToken: false, value: cleanEscapedString(substring) };
      }

      if (_lib_format_formatters_js__WEBPACK_IMPORTED_MODULE_5__/* .formatters */ ._[firstCharacter]) {
        return { isToken: true, value: substring };
      }

      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" +
            firstCharacter +
            "`",
        );
      }

      return { isToken: false, value: substring };
    });

  // invoke localize preprocessor (only for french locales at the moment)
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts);
  }

  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale,
  };

  return parts
    .map((part) => {
      if (!part.isToken) return part.value;

      const token = part.value;

      if (
        (!options?.useAdditionalWeekYearTokens &&
          (0,_lib_protectedTokens_js__WEBPACK_IMPORTED_MODULE_6__/* .isProtectedWeekYearToken */ .xM)(token)) ||
        (!options?.useAdditionalDayOfYearTokens &&
          (0,_lib_protectedTokens_js__WEBPACK_IMPORTED_MODULE_6__/* .isProtectedDayOfYearToken */ .ef)(token))
      ) {
        (0,_lib_protectedTokens_js__WEBPACK_IMPORTED_MODULE_6__/* .warnOrThrowProtectedError */ .Ss)(token, formatStr, String(date));
      }

      const formatter = _lib_format_formatters_js__WEBPACK_IMPORTED_MODULE_5__/* .formatters */ ._[token[0]];
      return formatter(originalDate, token, locale.localize, formatterOptions);
    })
    .join("");
}

function cleanEscapedString(input) {
  const matched = input.match(escapedStringRegExp);

  if (!matched) {
    return input;
  }

  return matched[1].replace(doubleQuoteRegExp, "'");
}

// Fallback for modularized imports:
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (format)));


/***/ }),

/***/ 80121:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ getDayOfYear)
/* harmony export */ });
/* harmony import */ var _differenceInCalendarDays_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26634);
/* harmony import */ var _startOfYear_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(89855);
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38714);




/**
 * The {@link getDayOfYear} function options.
 */

/**
 * @name getDayOfYear
 * @category Day Helpers
 * @summary Get the day of the year of the given date.
 *
 * @description
 * Get the day of the year of the given date.
 *
 * @param date - The given date
 * @param options - The options
 *
 * @returns The day of year
 *
 * @example
 * // Which day of the year is 2 July 2014?
 * const result = getDayOfYear(new Date(2014, 6, 2))
 * //=> 183
 */
function getDayOfYear(date, options) {
  const _date = (0,_toDate_js__WEBPACK_IMPORTED_MODULE_0__/* .toDate */ .a)(date, options?.in);
  const diff = (0,_differenceInCalendarDays_js__WEBPACK_IMPORTED_MODULE_1__/* .differenceInCalendarDays */ .m)(_date, (0,_startOfYear_js__WEBPACK_IMPORTED_MODULE_2__/* .startOfYear */ .D)(_date));
  const dayOfYear = diff + 1;
  return dayOfYear;
}

// Fallback for modularized imports:
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (getDayOfYear)));


/***/ }),

/***/ 30366:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ getISOWeek)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(91658);
/* harmony import */ var _startOfISOWeek_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(75025);
/* harmony import */ var _startOfISOWeekYear_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(70568);
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38714);





/**
 * The {@link getISOWeek} function options.
 */

/**
 * @name getISOWeek
 * @category ISO Week Helpers
 * @summary Get the ISO week of the given date.
 *
 * @description
 * Get the ISO week of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 * @param options - The options
 *
 * @returns The ISO week
 *
 * @example
 * // Which week of the ISO-week numbering year is 2 January 2005?
 * const result = getISOWeek(new Date(2005, 0, 2))
 * //=> 53
 */
function getISOWeek(date, options) {
  const _date = (0,_toDate_js__WEBPACK_IMPORTED_MODULE_0__/* .toDate */ .a)(date, options?.in);
  const diff = +(0,_startOfISOWeek_js__WEBPACK_IMPORTED_MODULE_1__/* .startOfISOWeek */ .b)(_date) - +(0,_startOfISOWeekYear_js__WEBPACK_IMPORTED_MODULE_2__/* .startOfISOWeekYear */ .w)(_date);

  // Round the number of weeks to the nearest integer because the number of
  // milliseconds in a week is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round(diff / _constants_js__WEBPACK_IMPORTED_MODULE_3__/* .millisecondsInWeek */ .my) + 1;
}

// Fallback for modularized imports:
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (getISOWeek)));


/***/ }),

/***/ 28851:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ getISOWeekYear)
/* harmony export */ });
/* harmony import */ var _constructFrom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65594);
/* harmony import */ var _startOfISOWeek_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(75025);
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38714);




/**
 * The {@link getISOWeekYear} function options.
 */

/**
 * @name getISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the ISO week-numbering year of the given date.
 *
 * @description
 * Get the ISO week-numbering year of the given date,
 * which always starts 3 days before the year's first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 *
 * @returns The ISO week-numbering year
 *
 * @example
 * // Which ISO-week numbering year is 2 January 2005?
 * const result = getISOWeekYear(new Date(2005, 0, 2))
 * //=> 2004
 */
function getISOWeekYear(date, options) {
  const _date = (0,_toDate_js__WEBPACK_IMPORTED_MODULE_0__/* .toDate */ .a)(date, options?.in);
  const year = _date.getFullYear();

  const fourthOfJanuaryOfNextYear = (0,_constructFrom_js__WEBPACK_IMPORTED_MODULE_1__/* .constructFrom */ .w)(_date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = (0,_startOfISOWeek_js__WEBPACK_IMPORTED_MODULE_2__/* .startOfISOWeek */ .b)(fourthOfJanuaryOfNextYear);

  const fourthOfJanuaryOfThisYear = (0,_constructFrom_js__WEBPACK_IMPORTED_MODULE_1__/* .constructFrom */ .w)(_date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = (0,_startOfISOWeek_js__WEBPACK_IMPORTED_MODULE_2__/* .startOfISOWeek */ .b)(fourthOfJanuaryOfThisYear);

  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// Fallback for modularized imports:
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (getISOWeekYear)));


/***/ }),

/***/ 80291:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ getWeek)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(91658);
/* harmony import */ var _startOfWeek_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26970);
/* harmony import */ var _startOfWeekYear_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(96071);
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38714);





/**
 * The {@link getWeek} function options.
 */

/**
 * @name getWeek
 * @category Week Helpers
 * @summary Get the local week index of the given date.
 *
 * @description
 * Get the local week index of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The week
 *
 * @example
 * // Which week of the local week numbering year is 2 January 2005 with default options?
 * const result = getWeek(new Date(2005, 0, 2))
 * //=> 2
 *
 * @example
 * // Which week of the local week numbering year is 2 January 2005,
 * // if Monday is the first day of the week,
 * // and the first week of the year always contains 4 January?
 * const result = getWeek(new Date(2005, 0, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> 53
 */
function getWeek(date, options) {
  const _date = (0,_toDate_js__WEBPACK_IMPORTED_MODULE_0__/* .toDate */ .a)(date, options?.in);
  const diff = +(0,_startOfWeek_js__WEBPACK_IMPORTED_MODULE_1__/* .startOfWeek */ .k)(_date, options) - +(0,_startOfWeekYear_js__WEBPACK_IMPORTED_MODULE_2__/* .startOfWeekYear */ .b)(_date, options);

  // Round the number of weeks to the nearest integer because the number of
  // milliseconds in a week is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round(diff / _constants_js__WEBPACK_IMPORTED_MODULE_3__/* .millisecondsInWeek */ .my) + 1;
}

// Fallback for modularized imports:
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (getWeek)));


/***/ }),

/***/ 87462:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ getWeekYear)
/* harmony export */ });
/* harmony import */ var _lib_defaultOptions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41591);
/* harmony import */ var _constructFrom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(65594);
/* harmony import */ var _startOfWeek_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(26970);
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38714);





/**
 * The {@link getWeekYear} function options.
 */

/**
 * @name getWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Get the local week-numbering year of the given date.
 *
 * @description
 * Get the local week-numbering year of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @param date - The given date
 * @param options - An object with options.
 *
 * @returns The local week-numbering year
 *
 * @example
 * // Which week numbering year is 26 December 2004 with the default settings?
 * const result = getWeekYear(new Date(2004, 11, 26))
 * //=> 2005
 *
 * @example
 * // Which week numbering year is 26 December 2004 if week starts on Saturday?
 * const result = getWeekYear(new Date(2004, 11, 26), { weekStartsOn: 6 })
 * //=> 2004
 *
 * @example
 * // Which week numbering year is 26 December 2004 if the first week contains 4 January?
 * const result = getWeekYear(new Date(2004, 11, 26), { firstWeekContainsDate: 4 })
 * //=> 2004
 */
function getWeekYear(date, options) {
  const _date = (0,_toDate_js__WEBPACK_IMPORTED_MODULE_0__/* .toDate */ .a)(date, options?.in);
  const year = _date.getFullYear();

  const defaultOptions = (0,_lib_defaultOptions_js__WEBPACK_IMPORTED_MODULE_1__/* .getDefaultOptions */ .q)();
  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const firstWeekOfNextYear = (0,_constructFrom_js__WEBPACK_IMPORTED_MODULE_2__/* .constructFrom */ .w)(options?.in || date, 0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = (0,_startOfWeek_js__WEBPACK_IMPORTED_MODULE_3__/* .startOfWeek */ .k)(firstWeekOfNextYear, options);

  const firstWeekOfThisYear = (0,_constructFrom_js__WEBPACK_IMPORTED_MODULE_2__/* .constructFrom */ .w)(options?.in || date, 0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = (0,_startOfWeek_js__WEBPACK_IMPORTED_MODULE_3__/* .startOfWeek */ .k)(firstWeekOfThisYear, options);

  if (+_date >= +startOfNextYear) {
    return year + 1;
  } else if (+_date >= +startOfThisYear) {
    return year;
  } else {
    return year - 1;
  }
}

// Fallback for modularized imports:
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (getWeekYear)));


/***/ }),

/***/ 66231:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ isDate)
/* harmony export */ });
/**
 * @name isDate
 * @category Common Helpers
 * @summary Is the given value a date?
 *
 * @description
 * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
 *
 * @param value - The value to check
 *
 * @returns True if the given value is a date
 *
 * @example
 * // For a valid date:
 * const result = isDate(new Date())
 * //=> true
 *
 * @example
 * // For an invalid date:
 * const result = isDate(new Date(NaN))
 * //=> true
 *
 * @example
 * // For some value:
 * const result = isDate('2014-02-31')
 * //=> false
 *
 * @example
 * // For an object:
 * const result = isDate({})
 * //=> false
 */
function isDate(value) {
  return (
    value instanceof Date ||
    (typeof value === "object" &&
      Object.prototype.toString.call(value) === "[object Date]")
  );
}

// Fallback for modularized imports:
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (isDate)));


/***/ }),

/***/ 70465:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ isValid)
/* harmony export */ });
/* harmony import */ var _isDate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(66231);
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38714);



/**
 * @name isValid
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Argument is converted to Date using `toDate`. See [toDate](https://date-fns.org/docs/toDate)
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @param date - The date to check
 *
 * @returns The date is valid
 *
 * @example
 * // For the valid date:
 * const result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertible into a date:
 * const result = isValid(1393804800000)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * const result = isValid(new Date(''))
 * //=> false
 */
function isValid(date) {
  return !((!(0,_isDate_js__WEBPACK_IMPORTED_MODULE_0__/* .isDate */ .$)(date) && typeof date !== "number") || isNaN(+(0,_toDate_js__WEBPACK_IMPORTED_MODULE_1__/* .toDate */ .a)(date)));
}

// Fallback for modularized imports:
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (isValid)));


/***/ }),

/***/ 33826:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ buildFormatLongFn)
/* harmony export */ });
function buildFormatLongFn(args) {
  return (options = {}) => {
    // TODO: Remove String()
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}


/***/ }),

/***/ 46188:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ buildLocalizeFn)
/* harmony export */ });
/**
 * The localize function argument callback which allows to convert raw value to
 * the actual type.
 *
 * @param value - The value to convert
 *
 * @returns The converted value
 */

/**
 * The map of localized values for each width.
 */

/**
 * The index type of the locale unit value. It types conversion of units of
 * values that don't start at 0 (i.e. quarters).
 */

/**
 * Converts the unit value to the tuple of values.
 */

/**
 * The tuple of localized era values. The first element represents BC,
 * the second element represents AD.
 */

/**
 * The tuple of localized quarter values. The first element represents Q1.
 */

/**
 * The tuple of localized day values. The first element represents Sunday.
 */

/**
 * The tuple of localized month values. The first element represents January.
 */

function buildLocalizeFn(args) {
  return (value, options) => {
    const context = options?.context ? String(options.context) : "standalone";

    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = options?.width ? String(options.width) : defaultWidth;

      valuesArray =
        args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = options?.width ? String(options.width) : args.defaultWidth;

      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;

    // @ts-expect-error - For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
    return valuesArray[index];
  };
}


/***/ }),

/***/ 92302:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ buildMatchFn)
/* harmony export */ });
function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;

    const matchPattern =
      (width && args.matchPatterns[width]) ||
      args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);

    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];

    const parsePatterns =
      (width && args.parsePatterns[width]) ||
      args.parsePatterns[args.defaultParseWidth];

    const key = Array.isArray(parsePatterns)
      ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString))
      : // [TODO] -- I challenge you to fix the type
        findKey(parsePatterns, (pattern) => pattern.test(matchedString));

    let value;

    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback
      ? // [TODO] -- I challenge you to fix the type
        options.valueCallback(value)
      : value;

    const rest = string.slice(matchedString.length);

    return { value, rest };
  };
}

function findKey(object, predicate) {
  for (const key in object) {
    if (
      Object.prototype.hasOwnProperty.call(object, key) &&
      predicate(object[key])
    ) {
      return key;
    }
  }
  return undefined;
}

function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return undefined;
}


/***/ }),

/***/ 29682:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ buildMatchPatternFn)
/* harmony export */ });
function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    const matchedString = matchResult[0];

    const parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    let value = args.valueCallback
      ? args.valueCallback(parseResult[0])
      : parseResult[0];

    // [TODO] I challenge you to fix the type
    value = options.valueCallback ? options.valueCallback(value) : value;

    const rest = string.slice(matchedString.length);

    return { value, rest };
  };
}


/***/ }),

/***/ 14464:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ enUS)
/* harmony export */ });
/* harmony import */ var _en_US_lib_formatDistance_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43194);
/* harmony import */ var _en_US_lib_formatLong_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8971);
/* harmony import */ var _en_US_lib_formatRelative_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(98933);
/* harmony import */ var _en_US_lib_localize_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(33493);
/* harmony import */ var _en_US_lib_match_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(97153);






/**
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp](https://github.com/kossnocorp)
 * @author Lesha Koss [@leshakoss](https://github.com/leshakoss)
 */
const enUS = {
  code: "en-US",
  formatDistance: _en_US_lib_formatDistance_js__WEBPACK_IMPORTED_MODULE_0__/* .formatDistance */ .B,
  formatLong: _en_US_lib_formatLong_js__WEBPACK_IMPORTED_MODULE_1__/* .formatLong */ .s,
  formatRelative: _en_US_lib_formatRelative_js__WEBPACK_IMPORTED_MODULE_2__/* .formatRelative */ .o,
  localize: _en_US_lib_localize_js__WEBPACK_IMPORTED_MODULE_3__/* .localize */ .k,
  match: _en_US_lib_match_js__WEBPACK_IMPORTED_MODULE_4__/* .match */ .Y,
  options: {
    weekStartsOn: 0 /* Sunday */,
    firstWeekContainsDate: 1,
  },
};

// Fallback for modularized imports:
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (enUS)));


/***/ }),

/***/ 43194:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ formatDistance)
/* harmony export */ });
const formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds",
  },

  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds",
  },

  halfAMinute: "half a minute",

  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes",
  },

  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes",
  },

  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours",
  },

  xHours: {
    one: "1 hour",
    other: "{{count}} hours",
  },

  xDays: {
    one: "1 day",
    other: "{{count}} days",
  },

  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks",
  },

  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks",
  },

  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months",
  },

  xMonths: {
    one: "1 month",
    other: "{{count}} months",
  },

  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years",
  },

  xYears: {
    one: "1 year",
    other: "{{count}} years",
  },

  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years",
  },

  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years",
  },
};

const formatDistance = (token, count, options) => {
  let result;

  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }

  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }

  return result;
};


/***/ }),

/***/ 8971:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ formatLong)
/* harmony export */ });
/* harmony import */ var _lib_buildFormatLongFn_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33826);


const dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy",
};

const timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a",
};

const dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}",
};

const formatLong = {
  date: (0,_lib_buildFormatLongFn_js__WEBPACK_IMPORTED_MODULE_0__/* .buildFormatLongFn */ .k)({
    formats: dateFormats,
    defaultWidth: "full",
  }),

  time: (0,_lib_buildFormatLongFn_js__WEBPACK_IMPORTED_MODULE_0__/* .buildFormatLongFn */ .k)({
    formats: timeFormats,
    defaultWidth: "full",
  }),

  dateTime: (0,_lib_buildFormatLongFn_js__WEBPACK_IMPORTED_MODULE_0__/* .buildFormatLongFn */ .k)({
    formats: dateTimeFormats,
    defaultWidth: "full",
  }),
};


/***/ }),

/***/ 98933:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ formatRelative)
/* harmony export */ });
const formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P",
};

const formatRelative = (token, _date, _baseDate, _options) =>
  formatRelativeLocale[token];


/***/ }),

/***/ 33493:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ localize)
/* harmony export */ });
/* harmony import */ var _lib_buildLocalizeFn_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46188);


const eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"],
};

const quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
};

// Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.
const monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],

  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

const dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
};

const dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
};

const formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
};

const ordinalNumber = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);

  // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`.
  //
  // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'.

  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};

const localize = {
  ordinalNumber,

  era: (0,_lib_buildLocalizeFn_js__WEBPACK_IMPORTED_MODULE_0__/* .buildLocalizeFn */ .o)({
    values: eraValues,
    defaultWidth: "wide",
  }),

  quarter: (0,_lib_buildLocalizeFn_js__WEBPACK_IMPORTED_MODULE_0__/* .buildLocalizeFn */ .o)({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1,
  }),

  month: (0,_lib_buildLocalizeFn_js__WEBPACK_IMPORTED_MODULE_0__/* .buildLocalizeFn */ .o)({
    values: monthValues,
    defaultWidth: "wide",
  }),

  day: (0,_lib_buildLocalizeFn_js__WEBPACK_IMPORTED_MODULE_0__/* .buildLocalizeFn */ .o)({
    values: dayValues,
    defaultWidth: "wide",
  }),

  dayPeriod: (0,_lib_buildLocalizeFn_js__WEBPACK_IMPORTED_MODULE_0__/* .buildLocalizeFn */ .o)({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide",
  }),
};


/***/ }),

/***/ 97153:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ match)
/* harmony export */ });
/* harmony import */ var _lib_buildMatchFn_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(92302);
/* harmony import */ var _lib_buildMatchPatternFn_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29682);



const matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
const parseOrdinalNumberPattern = /\d+/i;

const matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i,
};
const parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i],
};

const matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i,
};
const parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i],
};

const matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
};
const parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i,
  ],

  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i,
  ],
};

const matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
};
const parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
};

const matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
};
const parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i,
  },
};

const match = {
  ordinalNumber: (0,_lib_buildMatchPatternFn_js__WEBPACK_IMPORTED_MODULE_0__/* .buildMatchPatternFn */ .K)({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10),
  }),

  era: (0,_lib_buildMatchFn_js__WEBPACK_IMPORTED_MODULE_1__/* .buildMatchFn */ .A)({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any",
  }),

  quarter: (0,_lib_buildMatchFn_js__WEBPACK_IMPORTED_MODULE_1__/* .buildMatchFn */ .A)({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1,
  }),

  month: (0,_lib_buildMatchFn_js__WEBPACK_IMPORTED_MODULE_1__/* .buildMatchFn */ .A)({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any",
  }),

  day: (0,_lib_buildMatchFn_js__WEBPACK_IMPORTED_MODULE_1__/* .buildMatchFn */ .A)({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any",
  }),

  dayPeriod: (0,_lib_buildMatchFn_js__WEBPACK_IMPORTED_MODULE_1__/* .buildMatchFn */ .A)({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any",
  }),
};


/***/ }),

/***/ 70330:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ startOfDay)
/* harmony export */ });
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38714);


/**
 * The {@link startOfDay} function options.
 */

/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(date, options) {
  const _date = (0,_toDate_js__WEBPACK_IMPORTED_MODULE_0__/* .toDate */ .a)(date, options?.in);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (startOfDay)));


/***/ }),

/***/ 75025:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ startOfISOWeek)
/* harmony export */ });
/* harmony import */ var _startOfWeek_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26970);


/**
 * The {@link startOfISOWeek} function options.
 */

/**
 * @name startOfISOWeek
 * @category ISO Week Helpers
 * @summary Return the start of an ISO week for the given date.
 *
 * @description
 * Return the start of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of an ISO week
 *
 * @example
 * // The start of an ISO week for 2 September 2014 11:55:00:
 * const result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfISOWeek(date, options) {
  return (0,_startOfWeek_js__WEBPACK_IMPORTED_MODULE_0__/* .startOfWeek */ .k)(date, { ...options, weekStartsOn: 1 });
}

// Fallback for modularized imports:
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (startOfISOWeek)));


/***/ }),

/***/ 70568:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ startOfISOWeekYear)
/* harmony export */ });
/* harmony import */ var _constructFrom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65594);
/* harmony import */ var _getISOWeekYear_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28851);
/* harmony import */ var _startOfISOWeek_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(75025);




/**
 * The {@link startOfISOWeekYear} function options.
 */

/**
 * @name startOfISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the start of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the start of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of an ISO week-numbering year
 *
 * @example
 * // The start of an ISO week-numbering year for 2 July 2005:
 * const result = startOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfISOWeekYear(date, options) {
  const year = (0,_getISOWeekYear_js__WEBPACK_IMPORTED_MODULE_0__/* .getISOWeekYear */ .p)(date, options);
  const fourthOfJanuary = (0,_constructFrom_js__WEBPACK_IMPORTED_MODULE_1__/* .constructFrom */ .w)(options?.in || date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return (0,_startOfISOWeek_js__WEBPACK_IMPORTED_MODULE_2__/* .startOfISOWeek */ .b)(fourthOfJanuary);
}

// Fallback for modularized imports:
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (startOfISOWeekYear)));


/***/ }),

/***/ 26970:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ startOfWeek)
/* harmony export */ });
/* harmony import */ var _lib_defaultOptions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41591);
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38714);



/**
 * The {@link startOfWeek} function options.
 */

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(date, options) {
  const defaultOptions = (0,_lib_defaultOptions_js__WEBPACK_IMPORTED_MODULE_0__/* .getDefaultOptions */ .q)();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = (0,_toDate_js__WEBPACK_IMPORTED_MODULE_1__/* .toDate */ .a)(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (startOfWeek)));


/***/ }),

/***/ 96071:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ startOfWeekYear)
/* harmony export */ });
/* harmony import */ var _lib_defaultOptions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41591);
/* harmony import */ var _constructFrom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(65594);
/* harmony import */ var _getWeekYear_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(87462);
/* harmony import */ var _startOfWeek_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(26970);





/**
 * The {@link startOfWeekYear} function options.
 */

/**
 * @name startOfWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Return the start of a local week-numbering year for the given date.
 *
 * @description
 * Return the start of a local week-numbering year.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week-numbering year
 *
 * @example
 * // The start of an a week-numbering year for 2 July 2005 with default settings:
 * const result = startOfWeekYear(new Date(2005, 6, 2))
 * //=> Sun Dec 26 2004 00:00:00
 *
 * @example
 * // The start of a week-numbering year for 2 July 2005
 * // if Monday is the first day of week
 * // and 4 January is always in the first week of the year:
 * const result = startOfWeekYear(new Date(2005, 6, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfWeekYear(date, options) {
  const defaultOptions = (0,_lib_defaultOptions_js__WEBPACK_IMPORTED_MODULE_0__/* .getDefaultOptions */ .q)();
  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const year = (0,_getWeekYear_js__WEBPACK_IMPORTED_MODULE_1__/* .getWeekYear */ .h)(date, options);
  const firstWeek = (0,_constructFrom_js__WEBPACK_IMPORTED_MODULE_2__/* .constructFrom */ .w)(options?.in || date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = (0,_startOfWeek_js__WEBPACK_IMPORTED_MODULE_3__/* .startOfWeek */ .k)(firstWeek, options);
  return _date;
}

// Fallback for modularized imports:
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (startOfWeekYear)));


/***/ }),

/***/ 89855:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ startOfYear)
/* harmony export */ });
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38714);


/**
 * The {@link startOfYear} function options.
 */

/**
 * @name startOfYear
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The start of a year
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
function startOfYear(date, options) {
  const date_ = (0,_toDate_js__WEBPACK_IMPORTED_MODULE_0__/* .toDate */ .a)(date, options?.in);
  date_.setFullYear(date_.getFullYear(), 0, 1);
  date_.setHours(0, 0, 0, 0);
  return date_;
}

// Fallback for modularized imports:
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (startOfYear)));


/***/ }),

/***/ 38714:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ toDate)
/* harmony export */ });
/* harmony import */ var _constructFrom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65594);


/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * Starting from v3.7.0, it clones a date using `[Symbol.for("constructDateFrom")]`
 * enabling to transfer extra properties from the reference date to the new date.
 * It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
 * that accept a time zone as a constructor argument.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument, context) {
  // [TODO] Get rid of `toDate` or `constructFrom`?
  return (0,_constructFrom_js__WEBPACK_IMPORTED_MODULE_0__/* .constructFrom */ .w)(context || argument, argument);
}

// Fallback for modularized imports:
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (toDate)));


/***/ }),

/***/ 32836:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ lodash_es_sortBy)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_arrayPush.js
var _arrayPush = __webpack_require__(56069);
// EXTERNAL MODULE: ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_Symbol.js
var _Symbol = __webpack_require__(26710);
// EXTERNAL MODULE: ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isArguments.js
var isArguments = __webpack_require__(63479);
// EXTERNAL MODULE: ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isArray.js
var isArray = __webpack_require__(68058);
;// ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_isFlattenable.js




/** Built-in value references. */
var spreadableSymbol = _Symbol/* default */.A ? _Symbol/* default */.A.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return (0,isArray/* default */.A)(value) || (0,isArguments/* default */.A)(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/* harmony default export */ const _isFlattenable = (isFlattenable);

;// ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseFlatten.js



/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = _isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        (0,_arrayPush/* default */.A)(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/* harmony default export */ const _baseFlatten = (baseFlatten);

// EXTERNAL MODULE: ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_arrayMap.js
var _arrayMap = __webpack_require__(3323);
// EXTERNAL MODULE: ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseGet.js
var _baseGet = __webpack_require__(9047);
// EXTERNAL MODULE: ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseIteratee.js + 22 modules
var _baseIteratee = __webpack_require__(37037);
// EXTERNAL MODULE: ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseEach.js + 4 modules
var _baseEach = __webpack_require__(57914);
// EXTERNAL MODULE: ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isArrayLike.js
var isArrayLike = __webpack_require__(89413);
;// ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseMap.js



/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = (0,isArrayLike/* default */.A)(collection) ? Array(collection.length) : [];

  (0,_baseEach/* default */.A)(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

/* harmony default export */ const _baseMap = (baseMap);

;// ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseSortBy.js
/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(array, comparer) {
  var length = array.length;

  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}

/* harmony default export */ const _baseSortBy = (baseSortBy);

// EXTERNAL MODULE: ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseUnary.js
var _baseUnary = __webpack_require__(82752);
// EXTERNAL MODULE: ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isSymbol.js
var isSymbol = __webpack_require__(13911);
;// ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_compareAscending.js


/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = (0,isSymbol/* default */.A)(value);

    var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = (0,isSymbol/* default */.A)(other);

    if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
        (valIsNull && othIsDefined && othIsReflexive) ||
        (!valIsDefined && othIsReflexive) ||
        !valIsReflexive) {
      return 1;
    }
    if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
        (othIsNull && valIsDefined && valIsReflexive) ||
        (!othIsDefined && valIsReflexive) ||
        !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}

/* harmony default export */ const _compareAscending = (compareAscending);

;// ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_compareMultiple.js


/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = _compareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order = orders[index];
      return result * (order == 'desc' ? -1 : 1);
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index;
}

/* harmony default export */ const _compareMultiple = (compareMultiple);

// EXTERNAL MODULE: ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/identity.js
var identity = __webpack_require__(74985);
;// ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseOrderBy.js










/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection, iteratees, orders) {
  if (iteratees.length) {
    iteratees = (0,_arrayMap/* default */.A)(iteratees, function(iteratee) {
      if ((0,isArray/* default */.A)(iteratee)) {
        return function(value) {
          return (0,_baseGet/* default */.A)(value, iteratee.length === 1 ? iteratee[0] : iteratee);
        }
      }
      return iteratee;
    });
  } else {
    iteratees = [identity/* default */.A];
  }

  var index = -1;
  iteratees = (0,_arrayMap/* default */.A)(iteratees, (0,_baseUnary/* default */.A)(_baseIteratee/* default */.A));

  var result = _baseMap(collection, function(value, key, collection) {
    var criteria = (0,_arrayMap/* default */.A)(iteratees, function(iteratee) {
      return iteratee(value);
    });
    return { 'criteria': criteria, 'index': ++index, 'value': value };
  });

  return _baseSortBy(result, function(object, other) {
    return _compareMultiple(object, other, orders);
  });
}

/* harmony default export */ const _baseOrderBy = (baseOrderBy);

;// ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_apply.js
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/* harmony default export */ const _apply = (apply);

;// ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_overRest.js


/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return _apply(func, this, otherArgs);
  };
}

/* harmony default export */ const _overRest = (overRest);

;// ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/constant.js
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

/* harmony default export */ const lodash_es_constant = (constant);

// EXTERNAL MODULE: ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_defineProperty.js
var _defineProperty = __webpack_require__(30864);
;// ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseSetToString.js




/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !_defineProperty/* default */.A ? identity/* default */.A : function(func, string) {
  return (0,_defineProperty/* default */.A)(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': lodash_es_constant(string),
    'writable': true
  });
};

/* harmony default export */ const _baseSetToString = (baseSetToString);

;// ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_shortOut.js
/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

/* harmony default export */ const _shortOut = (shortOut);

;// ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_setToString.js



/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = _shortOut(_baseSetToString);

/* harmony default export */ const _setToString = (setToString);

;// ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseRest.js




/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return _setToString(_overRest(func, start, identity/* default */.A), func + '');
}

/* harmony default export */ const _baseRest = (baseRest);

// EXTERNAL MODULE: ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_isIterateeCall.js
var _isIterateeCall = __webpack_require__(86971);
;// ./node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/sortBy.js





/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order of
 * equal elements. The iteratees are invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {...(Function|Function[])} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 30 },
 *   { 'user': 'barney', 'age': 34 }
 * ];
 *
 * _.sortBy(users, [function(o) { return o.user; }]);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 30]]
 *
 * _.sortBy(users, ['user', 'age']);
 * // => objects for [['barney', 34], ['barney', 36], ['fred', 30], ['fred', 48]]
 */
var sortBy = _baseRest(function(collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var length = iteratees.length;
  if (length > 1 && (0,_isIterateeCall/* default */.A)(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && (0,_isIterateeCall/* default */.A)(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return _baseOrderBy(collection, _baseFlatten(iteratees, 1), []);
});

/* harmony default export */ const lodash_es_sortBy = (sortBy);


/***/ }),

/***/ 73311:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _debounce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19820);
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(75344);



/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if ((0,_isObject_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return (0,_debounce_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (throttle);


/***/ }),

/***/ 45366:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/.pnpm/react@17.0.2/node_modules/react/index.js
var react = __webpack_require__(91445);
// EXTERNAL MODULE: ./node_modules/.pnpm/react-dom@17.0.2_react@17.0.2/node_modules/react-dom/index.js
var react_dom = __webpack_require__(55101);
// EXTERNAL MODULE: ./Extension/src/common/translators/i18n.ts
var i18n = __webpack_require__(33043);
// EXTERNAL MODULE: ./Extension/src/common/translators/translator.ts
var translator = __webpack_require__(14717);
// EXTERNAL MODULE: ./node_modules/.pnpm/mobx-react@7.6.0_mobx@6.9.0_react-dom@17.0.2_react@17.0.2__react@17.0.2/node_modules/mobx-react/dist/mobxreact.esm.js + 14 modules
var mobxreact_esm = __webpack_require__(84246);
// EXTERNAL MODULE: ./Extension/src/pages/common/components/Loader/index.ts + 2 modules
var Loader = __webpack_require__(14145);
// EXTERNAL MODULE: ./Extension/src/pages/common/components/UserRulesEditor/index.js + 4 modules
var UserRulesEditor = __webpack_require__(91015);
// EXTERNAL MODULE: ./Extension/src/pages/options/components/Notifications/index.ts + 3 modules
var Notifications = __webpack_require__(7161);
// EXTERNAL MODULE: ./Extension/src/common/constants.ts
var constants = __webpack_require__(33926);
// EXTERNAL MODULE: ./Extension/src/pages/options/stores/RootStore.ts + 2 modules
var RootStore = __webpack_require__(47681);
// EXTERNAL MODULE: ./Extension/src/pages/services/messenger.ts
var messenger = __webpack_require__(87912);
// EXTERNAL MODULE: ./Extension/src/common/logger.ts
var logger = __webpack_require__(9659);
// EXTERNAL MODULE: ./node_modules/.pnpm/mobx@6.9.0/node_modules/mobx/dist/mobx.esm.js
var mobx_esm = __webpack_require__(47938);
;// ./Extension/src/pages/fullscreen-user-rules/stores/FullscreenUserRulesStore.js
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
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}



class FullscreenUserRulesStore {
    async getFullscreenUserRulesData() {
        const { settings } = await messenger/* messenger */.ee.getUserRulesEditorData();
        (0,mobx_esm/* runInAction */.h5)(()=>{
            this.settings = settings;
        });
    }
    get appearanceTheme() {
        if (!this.settings) {
            return null;
        }
        return this.settings.values[this.settings.names.AppearanceTheme];
    }
    constructor(){
        _define_property(this, "settings", null);
        (0,mobx_esm/* makeObservable */.Gn)(this);
    }
}
_ts_decorate([
    mobx_esm/* observable */.sH
], FullscreenUserRulesStore.prototype, "settings", void 0);
_ts_decorate([
    mobx_esm/* action */.XI
], FullscreenUserRulesStore.prototype, "getFullscreenUserRulesData", null);
_ts_decorate([
    mobx_esm/* computed */.EW
], FullscreenUserRulesStore.prototype, "appearanceTheme", null);
const fullscreenUserRulesStore = /*#__PURE__*/ (0,react.createContext)(new FullscreenUserRulesStore());

// EXTERNAL MODULE: ./Extension/src/pages/common/hooks/useAppearanceTheme.js
var useAppearanceTheme = __webpack_require__(82930);
// EXTERNAL MODULE: ./Extension/src/pages/common/components/ui/Icons.tsx + 1 modules
var Icons = __webpack_require__(88852);
// EXTERNAL MODULE: ./Extension/src/pages/options/styles/styles.pcss
var styles = __webpack_require__(92848);
// EXTERNAL MODULE: ./Extension/src/pages/options/components/UserRules/styles.pcss
var UserRules_styles = __webpack_require__(35513);
;// ./Extension/src/pages/fullscreen-user-rules/components/fullscreen-user-rules/FullscreenUserRules.tsx
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













const FullscreenUserRules = (0,mobxreact_esm/* observer */.PA)(()=>{
    const store = (0,react.useContext)(fullscreenUserRulesStore);
    const { uiStore: { showLoader } } = (0,react.useContext)(RootStore/* rootStore */.a);
    (0,useAppearanceTheme/* useAppearanceTheme */.H)(store.appearanceTheme);
    // append message listeners
    (0,react.useEffect)(()=>{
        store.getFullscreenUserRulesData();
        let removeListenerCallback = ()=>{};
        (async ()=>{
            const events = [
                constants/* NotifierType */.DY.SettingUpdated
            ];
            const { onUnload } = messenger/* Messenger */.e0.createLongLivedConnection(messenger/* Page */.YW.FullscreenUserRules, events, async (message)=>{
                const { type } = message;
                switch(type){
                    case constants/* NotifierType */.DY.SettingUpdated:
                        {
                            await store.getFullscreenUserRulesData();
                            break;
                        }
                    default:
                        {
                            logger/* logger */.v.warn('[ext.FullscreenUserRules]: there is no listener for type:', type);
                            break;
                        }
                }
            });
            removeListenerCallback = onUnload;
        })();
        return ()=>{
            removeListenerCallback();
        };
    }, [
        store
    ]);
    return /*#__PURE__*/ react.createElement(react.Fragment, null, /*#__PURE__*/ react.createElement(Loader/* Loader */.a, {
        showLoader: showLoader
    }), /*#__PURE__*/ react.createElement(Icons/* Icons */.F, null), /*#__PURE__*/ react.createElement(Notifications/* Notifications */.$, null), /*#__PURE__*/ react.createElement(UserRulesEditor/* UserRulesEditor */.u, {
        fullscreen: true
    }));
});

;// ./Extension/src/pages/fullscreen-user-rules/components/fullscreen-user-rules/index.ts
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

;// ./Extension/src/pages/fullscreen-user-rules/index.jsx
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




const fullscreenUserRulesPage = {
    init: ()=>{
        document.title = translator/* translator */.N.getMessage('fullscreen_user_rules_title');
        document.documentElement.lang = i18n/* i18n */.R.getUILanguage();
        react_dom.render(/*#__PURE__*/ react.createElement(FullscreenUserRules, null), document.getElementById('root'));
    }
};

;// ./Extension/pages/fullscreen-user-rules/index.js
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
fullscreenUserRulesPage.init();


/***/ }),

/***/ 91276:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ userRulesEditorStore)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91445);
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(47938);
/* harmony import */ var _services_messenger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(87912);
/* harmony import */ var _Editor_savingFSM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52849);
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
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}




class UserRulesEditorStore {
    async requestSettingsData() {
        const data = await _services_messenger__WEBPACK_IMPORTED_MODULE_1__/* .messenger */ .ee.getOptionsData();
        (0,mobx__WEBPACK_IMPORTED_MODULE_3__/* .runInAction */ .h5)(()=>{
            this.settings = data.settings;
        });
    }
    async updateSetting(settingId, value) {
        if (this.settings) {
            this.settings.values[settingId] = value;
        }
        await _services_messenger__WEBPACK_IMPORTED_MODULE_1__/* .messenger */ .ee.changeUserSetting(settingId, value);
    }
    async toggleUserRulesEditorWrapMode() {
        this.userRulesEditorWrap = !this.userRulesEditorWrap;
        if (this.settings) {
            await this.updateSetting(this.settings.names.UserRulesEditorWrap, this.userRulesEditorWrap);
        }
    }
    setUserRulesEditorWrapMode(value) {
        this.userRulesEditorWrap = value;
    }
    get userRulesEditorWrapState() {
        if (this.settings) {
            this.setUserRulesEditorWrapMode(this.settings.values[this.settings.names.UserRulesEditorWrap]);
        }
        return this.userRulesEditorWrap;
    }
    get userFilterEnabledSettingId() {
        return this.settings.names.UserFilterEnabled;
    }
    get userFilterEnabled() {
        if (this.settings) {
            return this.settings.values[this.userFilterEnabledSettingId];
        }
        return false;
    }
    getCursorPosition() {
        return this.cursorPosition;
    }
    saveUserRules(value) {
        return new Promise((resolve, reject)=>{
            try {
                this.savingService.send({
                    type: _Editor_savingFSM__WEBPACK_IMPORTED_MODULE_2__/* .SavingFSMEvent */ .xo.Save,
                    value,
                    callback: resolve
                });
            } catch (e) {
                reject(e);
            }
        });
    }
    constructor(){
        _define_property(this, "settings", null);
        _define_property(this, "userRulesEditorContentChanged", false);
        _define_property(this, "userRulesEditorWrap", null);
        _define_property(this, "userRulesExportAvailable", false);
        _define_property(this, "userRulesEditorPrefsDropped", false);
        _define_property(this, "specificLimitWarningData", null);
        _define_property(this, "cursorPosition", null);
        _define_property(this, "savingService", (0,_Editor_savingFSM__WEBPACK_IMPORTED_MODULE_2__/* .createSavingService */ .s0)({
            id: 'userRules',
            services: {
                saveData: async ({ event })=>{
                    const { value, callback } = event;
                    await _services_messenger__WEBPACK_IMPORTED_MODULE_1__/* .messenger */ .ee.saveUserRules(value);
                    await callback();
                }
            }
        }));
        _define_property(this, "savingUserRulesState", this.savingService.getSnapshot().value);
        _define_property(this, "setUserRulesEditorContentChangedState", (state)=>{
            this.userRulesEditorContentChanged = state;
        });
        _define_property(this, "setUserRulesExportAvailableState", (state)=>{
            this.userRulesExportAvailable = state;
        });
        _define_property(this, "setUserRulesEditorPrefsDropped", (state)=>{
            this.userRulesEditorPrefsDropped = state;
        });
        _define_property(this, "setCursorPosition", (position)=>{
            this.cursorPosition = position;
        });
        (0,mobx__WEBPACK_IMPORTED_MODULE_3__/* .makeObservable */ .Gn)(this);
        this.updateSetting = this.updateSetting.bind(this);
        this.savingService.subscribe((state)=>{
            (0,mobx__WEBPACK_IMPORTED_MODULE_3__/* .runInAction */ .h5)(()=>{
                this.savingUserRulesState = state.value;
                if (state.value === _Editor_savingFSM__WEBPACK_IMPORTED_MODULE_2__/* .SavingFSMState */ .A3.Saving) {
                    this.userRulesEditorContentChanged = false;
                }
            });
        });
    }
}
_ts_decorate([
    mobx__WEBPACK_IMPORTED_MODULE_3__/* .observable */ .sH
], UserRulesEditorStore.prototype, "settings", void 0);
_ts_decorate([
    mobx__WEBPACK_IMPORTED_MODULE_3__/* .observable */ .sH
], UserRulesEditorStore.prototype, "userRulesEditorContentChanged", void 0);
_ts_decorate([
    mobx__WEBPACK_IMPORTED_MODULE_3__/* .observable */ .sH
], UserRulesEditorStore.prototype, "userRulesEditorWrap", void 0);
_ts_decorate([
    mobx__WEBPACK_IMPORTED_MODULE_3__/* .observable */ .sH
], UserRulesEditorStore.prototype, "userRulesExportAvailable", void 0);
_ts_decorate([
    mobx__WEBPACK_IMPORTED_MODULE_3__/* .observable */ .sH
], UserRulesEditorStore.prototype, "userRulesEditorPrefsDropped", void 0);
_ts_decorate([
    mobx__WEBPACK_IMPORTED_MODULE_3__/* .observable */ .sH
], UserRulesEditorStore.prototype, "specificLimitWarningData", void 0);
_ts_decorate([
    mobx__WEBPACK_IMPORTED_MODULE_3__/* .observable */ .sH
], UserRulesEditorStore.prototype, "cursorPosition", void 0);
_ts_decorate([
    mobx__WEBPACK_IMPORTED_MODULE_3__/* .observable */ .sH
], UserRulesEditorStore.prototype, "savingUserRulesState", void 0);
_ts_decorate([
    mobx__WEBPACK_IMPORTED_MODULE_3__/* .action */ .XI
], UserRulesEditorStore.prototype, "requestSettingsData", null);
_ts_decorate([
    mobx__WEBPACK_IMPORTED_MODULE_3__/* .action */ .XI
], UserRulesEditorStore.prototype, "setUserRulesEditorContentChangedState", void 0);
_ts_decorate([
    mobx__WEBPACK_IMPORTED_MODULE_3__/* .action */ .XI
], UserRulesEditorStore.prototype, "setUserRulesExportAvailableState", void 0);
_ts_decorate([
    mobx__WEBPACK_IMPORTED_MODULE_3__/* .action */ .XI
], UserRulesEditorStore.prototype, "setUserRulesEditorPrefsDropped", void 0);
_ts_decorate([
    mobx__WEBPACK_IMPORTED_MODULE_3__/* .action */ .XI
], UserRulesEditorStore.prototype, "setCursorPosition", void 0);
_ts_decorate([
    mobx__WEBPACK_IMPORTED_MODULE_3__/* .action */ .XI
], UserRulesEditorStore.prototype, "updateSetting", null);
_ts_decorate([
    mobx__WEBPACK_IMPORTED_MODULE_3__/* .action */ .XI
], UserRulesEditorStore.prototype, "toggleUserRulesEditorWrapMode", null);
_ts_decorate([
    mobx__WEBPACK_IMPORTED_MODULE_3__/* .action */ .XI
], UserRulesEditorStore.prototype, "setUserRulesEditorWrapMode", null);
_ts_decorate([
    mobx__WEBPACK_IMPORTED_MODULE_3__/* .computed */ .EW
], UserRulesEditorStore.prototype, "userRulesEditorWrapState", null);
_ts_decorate([
    mobx__WEBPACK_IMPORTED_MODULE_3__/* .computed */ .EW
], UserRulesEditorStore.prototype, "userFilterEnabledSettingId", null);
_ts_decorate([
    mobx__WEBPACK_IMPORTED_MODULE_3__/* .computed */ .EW
], UserRulesEditorStore.prototype, "userFilterEnabled", null);
const userRulesEditorStore = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(new UserRulesEditorStore());


/***/ }),

/***/ 91015:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  u: () => (/* reexport */ UserRulesEditor)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.40.0/node_modules/core-js/modules/es.error.cause.js
var es_error_cause = __webpack_require__(59952);
// EXTERNAL MODULE: ./node_modules/.pnpm/react@17.0.2/node_modules/react/index.js
var react = __webpack_require__(91445);
// EXTERNAL MODULE: ./node_modules/.pnpm/mobx-react@7.6.0_mobx@6.9.0_react-dom@17.0.2_react@17.0.2__react@17.0.2/node_modules/mobx-react/dist/mobxreact.esm.js + 14 modules
var mobxreact_esm = __webpack_require__(84246);
// EXTERNAL MODULE: ./node_modules/.pnpm/ace-builds@1.17.0/node_modules/ace-builds/src-noconflict/ace.js
var ace = __webpack_require__(81734);
// EXTERNAL MODULE: ./node_modules/.pnpm/classnames@2.3.2/node_modules/classnames/index.js
var classnames = __webpack_require__(55184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/.pnpm/@adguard+tsurlfilter@3.5.2_@adguard+re2-wasm@1.2.0/node_modules/@adguard/tsurlfilter/dist/es/simple-regex-B580PFrk.js
var simple_regex_B580PFrk = __webpack_require__(25940);
// EXTERNAL MODULE: ./Extension/src/pages/common/components/Editor/index.ts + 6 modules
var Editor = __webpack_require__(25059);
// EXTERNAL MODULE: ./Extension/src/common/translators/translator.ts
var translator = __webpack_require__(14717);
// EXTERNAL MODULE: ./Extension/src/pages/common/components/ui/Checkbox/index.ts + 2 modules
var Checkbox = __webpack_require__(55596);
// EXTERNAL MODULE: ./Extension/src/pages/services/messenger.ts
var messenger = __webpack_require__(87912);
// EXTERNAL MODULE: ./Extension/src/common/constants.ts
var constants = __webpack_require__(33926);
// EXTERNAL MODULE: ./Extension/src/pages/common/utils/dom.ts
var dom = __webpack_require__(98864);
// EXTERNAL MODULE: ./Extension/src/pages/helpers.ts
var helpers = __webpack_require__(32111);
// EXTERNAL MODULE: ./Extension/src/common/logger.ts
var logger = __webpack_require__(9659);
// EXTERNAL MODULE: ./Extension/src/pages/common/utils/export.ts
var utils_export = __webpack_require__(53472);
// EXTERNAL MODULE: ./Extension/src/pages/common/components/helpers.ts
var components_helpers = __webpack_require__(30166);
// EXTERNAL MODULE: ./Extension/src/pages/options/stores/RootStore.ts + 2 modules
var RootStore = __webpack_require__(47681);
// EXTERNAL MODULE: ./Extension/src/pages/common/constants.ts
var common_constants = __webpack_require__(52299);
// EXTERNAL MODULE: ./Extension/src/pages/common/hooks/usePreventUnload.ts
var usePreventUnload = __webpack_require__(92557);
// EXTERNAL MODULE: ./Extension/src/pages/common/types.ts
var types = __webpack_require__(41459);
// EXTERNAL MODULE: ./Extension/src/pages/common/components/Editor/savingFSM.ts
var savingFSM = __webpack_require__(52849);
// EXTERNAL MODULE: ./Extension/src/pages/common/components/ui/Popover/index.ts
var Popover = __webpack_require__(86816);
// EXTERNAL MODULE: ./Extension/src/pages/common/components/ui/Icon.tsx
var Icon = __webpack_require__(70687);
// EXTERNAL MODULE: ./Extension/src/pages/common/components/UserRulesEditor/UserRulesEditorStore.js
var UserRulesEditorStore = __webpack_require__(91276);
;// ./Extension/src/pages/common/components/UserRulesEditor/ToggleWrapButton.jsx
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
 * This button is extracted in the separate file
 * to stop editor re-renderings on wrap mode changes
 */ const ToggleWrapButton = (0,mobxreact_esm/* observer */.PA)(({ onClick })=>{
    const store = (0,react.useContext)(UserRulesEditorStore/* userRulesEditorStore */.D);
    const lineBreakClassNames = classnames_default()('button actions__btn actions__btn--icon', {
        'actions__btn--active': store.userRulesEditorWrapState
    });
    const iconId = store.userRulesEditorWrapState ? '#line-break-on' : '#line-break-off';
    const tooltipText = store.userRulesEditorWrapState ? translator/* translator */.N.getMessage('options_userfilter_line_break_on') : translator/* translator */.N.getMessage('options_userfilter_line_break_off');
    return /*#__PURE__*/ react.createElement(Popover/* Popover */.A, {
        text: tooltipText
    }, /*#__PURE__*/ react.createElement("button", {
        type: "button",
        role: "switch",
        className: lineBreakClassNames,
        onClick: onClick,
        "aria-checked": store.userRulesEditorWrapState,
        "aria-label": translator/* translator */.N.getMessage('options_userfilter_line_break')
    }, /*#__PURE__*/ react.createElement(Icon/* Icon */.I, {
        id: iconId,
        className: "icon--24 icon--gray-default",
        "aria-hidden": "true"
    })));
});

;// ./Extension/src/pages/common/components/UserRulesEditor/ToggleFullscreenButton.tsx
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



const ToggleFullscreenButton = ({ fullscreen, onClick })=>{
    const iconId = fullscreen ? '#reduce' : '#extend';
    const tooltipText = fullscreen ? translator/* translator */.N.getMessage('options_editor_close_fullscreen_button_tooltip') : translator/* translator */.N.getMessage('options_editor_open_fullscreen_button_tooltip');
    return /*#__PURE__*/ react.createElement(Popover/* Popover */.A, {
        text: tooltipText
    }, /*#__PURE__*/ react.createElement("button", {
        type: "button",
        className: "button actions__btn actions__btn--icon",
        onClick: onClick,
        "aria-label": tooltipText
    }, /*#__PURE__*/ react.createElement(Icon/* Icon */.I, {
        id: iconId,
        className: "icon--24 icon--gray-default",
        "aria-hidden": "true"
    })));
};

// EXTERNAL MODULE: ./Extension/src/pages/common/components/SavingButton/index.ts + 1 modules
var SavingButton = __webpack_require__(70260);
;// ./Extension/src/pages/common/components/UserRulesEditor/UserRulesSavingButton.tsx
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



const UserRulesSavingButton = (0,mobxreact_esm/* observer */.PA)(({ onClick })=>{
    const store = (0,react.useContext)(UserRulesEditorStore/* userRulesEditorStore */.D);
    return /*#__PURE__*/ react.createElement(SavingButton/* SavingButton */.v, {
        onClick: onClick,
        contentChanged: store.userRulesEditorContentChanged,
        savingState: store.savingUserRulesState
    });
});

;// ./Extension/src/pages/common/components/UserRulesEditor/UserRulesEditor.jsx
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















// TODO: Continue to remove dependency on the root store via adding loader and
// notifications to own 'user-rules-editor' store.









/**
 * This module is placed in the common directory because it is used in the options page
 * and fullscreen-user-rules page
 */ const UserRulesEditor = (0,mobxreact_esm/* observer */.PA)(({ fullscreen })=>{
    const store = (0,react.useContext)(UserRulesEditorStore/* userRulesEditorStore */.D);
    const { uiStore, settingsStore } = (0,react.useContext)(RootStore/* rootStore */.a);
    const editorRef = (0,react.useRef)(null);
    const inputRef = (0,react.useRef)(null);
    const actionsRef = (0,react.useRef)(null);
    const switchId = 'user-filter-switch';
    const switchTitleId = `${switchId}-title`;
    let shouldResetSize = false;
    if (store.userRulesEditorPrefsDropped) {
        store.setUserRulesEditorPrefsDropped(false);
        shouldResetSize = true;
    }
    (0,react.useEffect)(()=>{
        let removeListenerCallback = ()=>{};
        (async ()=>{
            await store.requestSettingsData();
            const events = [
                constants/* NotifierType */.DY.SettingUpdated
            ];
            removeListenerCallback = await messenger/* messenger */.ee.createEventListener(events, async (message)=>{
                const { type } = message;
                switch(type){
                    // This event will be triggered when the user rules status is toggled.
                    case constants/* NotifierType */.DY.SettingUpdated:
                        {
                            await store.requestSettingsData();
                            break;
                        }
                    default:
                        {
                            logger/* logger */.v.debug('[ext.UserRulesEditor]: undefined message type:', type);
                            break;
                        }
                }
            });
        })();
        return ()=>{
            removeListenerCallback();
        };
    }, [
        store
    ]);
    // Get initial storage content and set to the editor
    (0,react.useEffect)(()=>{
        (async ()=>{
            let editorContent = await messenger/* messenger */.ee.getEditorStorageContent();
            // clear editor content from storage after reading it
            await messenger/* messenger */.ee.setEditorStorageContent(null);
            let resetInfoThatContentChanged = false;
            if (!editorContent) {
                const { content } = await messenger/* messenger */.ee.getUserRules();
                editorContent = content;
                resetInfoThatContentChanged = true;
            }
            if (editorRef.current) {
                editorRef.current.editor.setValue(editorContent, savingFSM/* CURSOR_POSITION_AFTER_INSERT */.gq);
                editorRef.current.editor.session.getUndoManager().reset();
            }
            if (resetInfoThatContentChanged) {
                store.setUserRulesEditorContentChangedState(false);
            }
            // initial export button state
            const { userRules } = await messenger/* messenger */.ee.getUserRulesEditorData();
            if (userRules.length > 0) {
                store.setUserRulesExportAvailableState(true);
            } else {
                store.setUserRulesExportAvailableState(false);
            }
        })();
    }, [
        store
    ]);
    /**
     * One of the reasons for request filter to update
     * may be adding user rules from other places like assistant and others
     *
     * @returns {Promise<void>}
     */ const handleUserFilterUpdated = (0,react.useCallback)(async ()=>{
        const { userRules } = await messenger/* messenger */.ee.getUserRulesEditorData();
        if (!store.userRulesEditorContentChanged) {
            if (editorRef.current) {
                editorRef.current.editor.setValue(userRules, savingFSM/* CURSOR_POSITION_AFTER_INSERT */.gq);
                const cursorPosition = store.getCursorPosition();
                if (cursorPosition) {
                    editorRef.current.editor.moveCursorTo(cursorPosition.row, cursorPosition.column);
                    store.setCursorPosition(null);
                }
            }
            store.setUserRulesEditorContentChangedState(false);
            await messenger/* messenger */.ee.setEditorStorageContent(null);
        }
        // disable or enable export button
        if (userRules.length > 0) {
            store.setUserRulesExportAvailableState(true);
        } else {
            store.setUserRulesExportAvailableState(false);
        }
    }, [
        store
    ]);
    // Append listeners
    (0,react.useEffect)(()=>{
        let removeListenerCallback = ()=>{};
        (async ()=>{
            // Subscribe to events of request filter update
            // to have actual user rules in the editor
            const events = [
                constants/* NotifierType */.DY.UserFilterUpdated
            ];
            removeListenerCallback = await messenger/* messenger */.ee.createEventListener(events, async (message)=>{
                const { type } = message;
                switch(type){
                    case constants/* NotifierType */.DY.UserFilterUpdated:
                        {
                            await handleUserFilterUpdated();
                            break;
                        }
                    default:
                        {
                            logger/* logger */.v.debug('[ext.UserRulesEditor]: undefined message type:', type);
                            break;
                        }
                }
            });
        })();
        return ()=>{
            removeListenerCallback();
        };
    }, [
        handleUserFilterUpdated
    ]);
    // save editor content to the storage after close of fullscreen
    (0,react.useEffect)(()=>{
        if (fullscreen) {
            const beforeUnloadListener = async ()=>{
                if (store.userRulesEditorContentChanged) {
                    // send content to the storage only before switching editors
                    const content = editorRef.current.editor.session.getValue();
                    await messenger/* messenger */.ee.setEditorStorageContent(content);
                }
            };
            window.addEventListener('beforeunload', beforeUnloadListener);
        }
    }, [
        store.userRulesEditorContentChanged,
        fullscreen
    ]);
    // set initial wrap mode
    (0,react.useEffect)(()=>{
        editorRef.current.editor.session.setUseWrapMode(store.userRulesEditorWrapState);
    }, [
        store.userRulesEditorWrapState
    ]);
    const isSaving = store.savingUserRulesState === savingFSM/* SavingFSMState */.A3.Saving;
    const hasUnsavedChanges = !isSaving && store.userRulesEditorContentChanged;
    const unsavedChangesTitle = translator/* translator */.N.getMessage('options_editor_leave_title');
    const unsavedChangesSubtitle = translator/* translator */.N.getMessage('options_userfilter_leave_subtitle');
    (0,usePreventUnload/* usePreventUnload */.D)(hasUnsavedChanges, `${unsavedChangesTitle} ${unsavedChangesSubtitle}`);
    const saveUserRules = async (userRules)=>{
        store.setCursorPosition(editorRef.current.editor.getCursorPosition());
        // For MV2 version we don't show loader and don't check limits.
        if (false) {} else {
            uiStore.setShowLoader(true);
            await store.saveUserRules(userRules);
            await settingsStore.checkLimitations();
            uiStore.setShowLoader(false);
        }
        store.setUserRulesEditorContentChangedState(false);
        store.setCursorPosition(null);
    };
    const inputChangeHandler = async (event)=>{
        event.persist();
        const file = event.target.files[0];
        try {
            const rawNewRules = await (0,helpers/* handleFileUpload */.i_)(file, 'txt');
            const trimmedNewRules = rawNewRules.trim();
            if (trimmedNewRules.length < 0) {
                return;
            }
            const oldRulesString = editorRef.current.editor.getValue();
            const oldRules = oldRulesString.split(constants/* NEWLINE_CHAR_UNIX */.JP);
            const newRules = trimmedNewRules.split(constants/* NEWLINE_CHAR_REGEX */.WC);
            const uniqNewRules = newRules.filter((newRule)=>{
                const trimmedNewRule = newRule.trim();
                if (trimmedNewRule.length === 0) {
                    return true;
                }
                const isInOldRules = oldRules.some((oldRule)=>oldRule === trimmedNewRule);
                return !isInOldRules;
            });
            const rulesUnion = [
                ...oldRules,
                ...uniqNewRules
            ];
            const rulesUnionString = rulesUnion.join(constants/* NEWLINE_CHAR_UNIX */.JP).trim();
            if (oldRulesString !== rulesUnionString) {
                editorRef.current.editor.setValue(rulesUnionString, savingFSM/* CURSOR_POSITION_AFTER_INSERT */.gq);
                await saveUserRules(rulesUnionString);
            }
        } catch (e) {
            logger/* logger */.v.debug('[ext.UserRulesEditor]: import error:', e);
            if (e instanceof Error && e.cause === common_constants/* FILE_WRONG_EXTENSION_CAUSE */.VD) {
                uiStore.addNotification({
                    type: types/* NotificationType */._.Error,
                    text: e.message
                });
            } else {
                uiStore.addNotification({
                    type: types/* NotificationType */._.Error,
                    text: (0,translator/* translator */.N)('options_popup_import_error_file_description')
                });
            }
        }
        // eslint-disable-next-line no-param-reassign
        event.target.value = '';
    };
    const importClickHandler = (e)=>{
        e.preventDefault();
        if (!inputRef.current) {
            return;
        }
        inputRef.current.click();
    };
    const saveClickHandler = async ()=>{
        if (!store.userRulesEditorContentChanged) {
            return;
        }
        const value = editorRef.current.editor.getValue();
        await saveUserRules(value);
    };
    const editorChangeHandler = async (value)=>{
        const { content } = await messenger/* messenger */.ee.getUserRules();
        store.setUserRulesEditorContentChangedState(content !== value);
    };
    const focusFirstEnabledAction = ()=>{
        const actionsEl = actionsRef.current;
        if (!actionsEl) {
            return;
        }
        const firstNonDisabledButton = (0,dom/* getFirstNonDisabledElement */.g)(actionsEl, '.actions__btn');
        if (firstNonDisabledButton) {
            // Before focusing on element we need to add info about shortcut
            // so Screen Reader can tell user that editor can be closed with Escape
            firstNonDisabledButton.ariaKeyShortcuts = 'Escape';
            firstNonDisabledButton.focus();
        }
    };
    const shortcuts = [
        {
            name: 'togglecomment',
            bindKey: {
                win: 'Ctrl-/',
                mac: 'Command-/'
            },
            exec: (editor)=>{
                const selection = editor.getSelection();
                const ranges = selection.getAllRanges();
                const rowsSelected = ranges.map((range)=>{
                    const [start, end] = [
                        range.start.row,
                        range.end.row
                    ];
                    return Array.from({
                        length: end - start + 1
                    }, (_, idx)=>idx + start);
                }).flat();
                const allRowsCommented = rowsSelected.every((row)=>{
                    const rowLine = editor.session.getLine(row);
                    return rowLine.trim().startsWith(simple_regex_B580PFrk.S.MASK_COMMENT);
                });
                rowsSelected.forEach((row)=>{
                    const rawLine = editor.session.getLine(row);
                    // if all lines start with comment mark we remove it
                    if (allRowsCommented) {
                        const lineWithRemovedComment = rawLine.replace(simple_regex_B580PFrk.S.MASK_COMMENT, '');
                        editor.session.replace(new ace.Range(row, 0, row), lineWithRemovedComment);
                    // otherwise we add it
                    } else {
                        editor.session.insert({
                            row,
                            column: 0
                        }, simple_regex_B580PFrk.S.MASK_COMMENT);
                    }
                });
            }
        }
    ];
    const exportClickHandler = ()=>{
        (0,utils_export/* exportData */.Rz)(utils_export/* ExportTypes */.m6.UserFilter);
    };
    // We set wrap mode directly in order to avoid editor re-rendering
    // Otherwise editor would remove all unsaved content
    const toggleWrap = async ()=>{
        const toggledWrapMode = !store.userRulesEditorWrapState;
        editorRef.current.editor.session.setUseWrapMode(toggledWrapMode);
        await store.toggleUserRulesEditorWrapMode(toggledWrapMode);
        if (true) {
            await settingsStore.checkLimitations();
        }
    };
    const toggleFullscreen = async ()=>{
        if (fullscreen) {
            await closeEditorFullscreen();
        } else {
            await openEditorFullscreen();
        }
    };
    const openEditorFullscreen = async ()=>{
        // send dirty content to the storage only before switching editors
        if (store.userRulesEditorContentChanged) {
            const content = editorRef.current.editor.session.getValue();
            await messenger/* messenger */.ee.setEditorStorageContent(content);
        }
        await messenger/* messenger */.ee.openFullscreenUserRules();
    };
    const closeEditorFullscreen = async ()=>{
        // send dirty content to the storage only before switching editors
        if (store.userRulesEditorContentChanged) {
            const content = editorRef.current.editor.session.getValue();
            await messenger/* messenger */.ee.setEditorStorageContent(content);
        }
        window.close();
    };
    const handleUserRulesToggle = async ({ id, data })=>{
        await (0,components_helpers/* addMinDelayLoader */.C)(uiStore.setShowLoader, store.updateSetting)(id, data);
    };
    return /*#__PURE__*/ react.createElement(react.Fragment, null, /*#__PURE__*/ react.createElement(Editor/* Editor */.K, {
        name: "user-rules",
        editorRef: editorRef,
        shortcuts: shortcuts,
        fullscreen: fullscreen,
        shouldResetSize: shouldResetSize,
        onChange: editorChangeHandler,
        onSave: saveClickHandler,
        onExit: focusFirstEnabledAction,
        highlightRules: true
    }), !fullscreen && hasUnsavedChanges && /*#__PURE__*/ react.createElement(Editor/* EditorLeaveModal */.S, {
        title: unsavedChangesTitle,
        subtitle: unsavedChangesSubtitle
    }), /*#__PURE__*/ react.createElement("div", {
        ref: actionsRef,
        className: classnames_default()('actions actions--grid', {
            'actions--fullscreen-user-rules': fullscreen,
            'actions--user-rules': !fullscreen
        })
    }, fullscreen && /*#__PURE__*/ react.createElement("label", {
        className: "actions__label",
        htmlFor: switchId
    }, /*#__PURE__*/ react.createElement("div", {
        id: switchTitleId,
        className: "actions__title",
        "aria-hidden": "true"
    }, translator/* translator */.N.getMessage('fullscreen_user_rules_title')), /*#__PURE__*/ react.createElement("div", {
        className: "actions__control"
    }, /*#__PURE__*/ react.createElement(Checkbox/* Checkbox */.S, {
        id: switchId,
        handler: handleUserRulesToggle,
        value: store.userFilterEnabled,
        className: "checkbox__label--actions",
        labelId: switchTitleId
    }))), /*#__PURE__*/ react.createElement("div", {
        className: "actions--grid actions--buttons"
    }, /*#__PURE__*/ react.createElement(UserRulesSavingButton, {
        onClick: saveClickHandler
    }), /*#__PURE__*/ react.createElement("input", {
        type: "file",
        accept: "text/plain",
        ref: inputRef,
        onChange: inputChangeHandler,
        className: "actions__input-file"
    }), /*#__PURE__*/ react.createElement("button", {
        type: "button",
        className: "button button--l button--transparent actions__btn",
        onClick: importClickHandler,
        title: translator/* translator */.N.getMessage('options_userfilter_import')
    }, translator/* translator */.N.getMessage('options_userfilter_import')), /*#__PURE__*/ react.createElement("button", {
        type: "button",
        className: "button button--l button--transparent actions__btn",
        onClick: exportClickHandler,
        disabled: !store.userRulesExportAvailable,
        title: translator/* translator */.N.getMessage('options_userfilter_export')
    }, translator/* translator */.N.getMessage('options_userfilter_export'))), /*#__PURE__*/ react.createElement("div", {
        className: "actions--grid actions--icons"
    }, /*#__PURE__*/ react.createElement(ToggleWrapButton, {
        onClick: toggleWrap
    }), /*#__PURE__*/ react.createElement(ToggleFullscreenButton, {
        fullscreen: fullscreen,
        onClick: toggleFullscreen
    }))));
});

;// ./Extension/src/pages/common/components/UserRulesEditor/index.js
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


/***/ }),

/***/ 82930:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ useAppearanceTheme)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91445);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73311);
/* harmony import */ var _common_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(49426);
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


const useAppearanceTheme = (appearanceTheme)=>{
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(()=>{
        const STORAGE_KEY = 'appearance_theme';
        const DARK_THEME_CLASS = 'dark-mode';
        const LIGHT_THEME_CLASS = 'light-mode';
        const SET_TO_STORAGE_TIMEOUT = 500;
        const throttledSetToStorage = (0,lodash_es__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)((mode)=>{
            localStorage.setItem(STORAGE_KEY, mode);
        }, SET_TO_STORAGE_TIMEOUT);
        let theme = appearanceTheme;
        if (!theme) {
            theme = localStorage.getItem(STORAGE_KEY);
        } else {
            throttledSetToStorage(theme);
        }
        switch(theme){
            case _common_settings__WEBPACK_IMPORTED_MODULE_1__/* .AppearanceTheme */ .i0.Dark:
                {
                    document.documentElement.classList.add(DARK_THEME_CLASS);
                    document.documentElement.classList.remove(LIGHT_THEME_CLASS);
                    break;
                }
            case _common_settings__WEBPACK_IMPORTED_MODULE_1__/* .AppearanceTheme */ .i0.Light:
                {
                    document.documentElement.classList.add(LIGHT_THEME_CLASS);
                    document.documentElement.classList.remove(DARK_THEME_CLASS);
                    break;
                }
            default:
                {
                    document.documentElement.classList.remove(DARK_THEME_CLASS);
                    document.documentElement.classList.remove(LIGHT_THEME_CLASS);
                }
        }
    }, [
        appearanceTheme
    ]);
};


/***/ }),

/***/ 7453:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ SEARCH_FILTERS),
/* harmony export */   T: () => (/* binding */ TABLET_SCREEN_WIDTH)
/* harmony export */ });
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
 */ const SEARCH_FILTERS = {
    ALL: 'all',
    ENABLED: 'enabled',
    DISABLED: 'disabled'
};
const TABLET_SCREEN_WIDTH = 1024;


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [940,859,728,737,533,53,436,36,869,840,92], () => (__webpack_exec__(45366)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);