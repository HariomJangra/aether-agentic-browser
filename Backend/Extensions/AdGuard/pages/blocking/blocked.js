(self["webpackChunkbrowser_extension"] = self["webpackChunkbrowser_extension"] || []).push([[560],{

/***/ 59840:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tl: () => (/* binding */ translate)
/* harmony export */ });
/* unused harmony exports Translator, validator */
function _defineProperty(obj, key, value) {
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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

var NODE_TYPES;

(function (NODE_TYPES) {
  NODE_TYPES["PLACEHOLDER"] = "placeholder";
  NODE_TYPES["TEXT"] = "text";
  NODE_TYPES["TAG"] = "tag";
  NODE_TYPES["VOID_TAG"] = "void_tag";
})(NODE_TYPES || (NODE_TYPES = {}));

var isTextNode = function isTextNode(node) {
  return node.type === NODE_TYPES.TEXT;
};
var isTagNode = function isTagNode(node) {
  return node.type === NODE_TYPES.TAG;
};
var isPlaceholderNode = function isPlaceholderNode(node) {
  return node.type === NODE_TYPES.PLACEHOLDER;
};
var isVoidTagNode = function isVoidTagNode(node) {
  return node.type === NODE_TYPES.VOID_TAG;
};
var placeholderNode = function placeholderNode(value) {
  return {
    type: NODE_TYPES.PLACEHOLDER,
    value: value
  };
};
var textNode = function textNode(str) {
  return {
    type: NODE_TYPES.TEXT,
    value: str
  };
};
var tagNode = function tagNode(tagName, children) {
  var value = tagName.trim();
  return {
    type: NODE_TYPES.TAG,
    value: value,
    children: children
  };
};
var voidTagNode = function voidTagNode(tagName) {
  var value = tagName.trim();
  return {
    type: NODE_TYPES.VOID_TAG,
    value: value
  };
};
/**
 * Checks if target is node
 * @param target
 */

var isNode = function isNode(target) {
  if (typeof target === 'string') {
    return false;
  }

  return !!target.type;
};

var STATE;

(function (STATE) {
  /**
   * Parser function switches to the text state when parses simple text,
   * or content between open and close tags
   */
  STATE["TEXT"] = "text";
  /**
   * Parser function switches to the tag state when meets open tag brace ("<"), and switches back,
   * when meets closing tag brace (">")
   */

  STATE["TAG"] = "tag";
  /**
   * Parser function switches to the placeholder state when meets in the text
   * open placeholders brace ("{") and switches back to the text state,
   * when meets close placeholder brace ("}")
   */

  STATE["PLACEHOLDER"] = "placeholder";
})(STATE || (STATE = {}));

var CONTROL_CHARS = {
  TAG_OPEN_BRACE: '<',
  TAG_CLOSE_BRACE: '>',
  CLOSING_TAG_MARK: '/',
  PLACEHOLDER_MARK: '%'
};
/**
 * Checks if text length is enough to create text node
 * If text node created, then if stack is not empty it is pushed into stack,
 * otherwise into result
 * @param context
 */

var createTextNodeIfPossible = function createTextNodeIfPossible(context) {
  var text = context.text;

  if (text.length > 0) {
    var node = textNode(text);

    if (context.stack.length > 0) {
      context.stack.push(node);
    } else {
      context.result.push(node);
    }
  }

  context.text = '';
};
/**
 * Checks if lastFromStack tag has any attributes
 * @param lastFromStack
 */


var hasAttributes = function hasAttributes(lastFromStack) {
  // e.g. "a class" or "a href='#'"
  var tagStrParts = lastFromStack.split(' ');
  return tagStrParts.length > 1;
};
/**
 * Handles text state
 */


var textStateHandler = function textStateHandler(context) {
  var currChar = context.currChar,
      currIdx = context.currIdx; // switches to the tag state

  if (currChar === CONTROL_CHARS.TAG_OPEN_BRACE) {
    context.lastTextStateChangeIdx = currIdx;
    return STATE.TAG;
  } // switches to the placeholder state


  if (currChar === CONTROL_CHARS.PLACEHOLDER_MARK) {
    context.lastTextStateChangeIdx = currIdx;
    return STATE.PLACEHOLDER;
  } // remains in the text state


  context.text += currChar;
  return STATE.TEXT;
};
/**
 * Handles placeholder state
 * @param context
 */


var placeholderStateHandler = function placeholderStateHandler(context) {
  var currChar = context.currChar,
      currIdx = context.currIdx,
      lastTextStateChangeIdx = context.lastTextStateChangeIdx,
      placeholder = context.placeholder,
      stack = context.stack,
      result = context.result,
      str = context.str;

  if (currChar === CONTROL_CHARS.PLACEHOLDER_MARK) {
    // if distance between current index and last state change equal to 1,
    // it means that placeholder mark was escaped by itself e.g. "%%",
    // so we return to the text state
    if (currIdx - lastTextStateChangeIdx === 1) {
      context.text += str.substring(lastTextStateChangeIdx, currIdx);
      return STATE.TEXT;
    }

    createTextNodeIfPossible(context);
    var node = placeholderNode(placeholder); // push node to the appropriate stack

    if (stack.length > 0) {
      stack.push(node);
    } else {
      result.push(node);
    }

    context.placeholder = '';
    return STATE.TEXT;
  }

  context.placeholder += currChar;
  return STATE.PLACEHOLDER;
};
/**
 * Switches current state to the tag state and returns tag state handler
 */


var tagStateHandler = function tagStateHandler(context) {
  var currChar = context.currChar,
      text = context.text,
      stack = context.stack,
      result = context.result,
      lastTextStateChangeIdx = context.lastTextStateChangeIdx,
      currIdx = context.currIdx,
      str = context.str;
  var tag = context.tag; // if found tag end ">"

  if (currChar === CONTROL_CHARS.TAG_CLOSE_BRACE) {
    // if the tag is close tag e.g. </a>
    if (tag.indexOf(CONTROL_CHARS.CLOSING_TAG_MARK) === 0) {
      // remove slash from tag
      tag = tag.substring(1);
      var children = [];

      if (text.length > 0) {
        children.push(textNode(text));
        context.text = '';
      }

      var pairTagFound = false; // looking for the pair to the close tag

      while (!pairTagFound && stack.length > 0) {
        var lastFromStack = stack.pop(); // if tag from stack equal to close tag

        if (lastFromStack === tag) {
          // create tag node
          var node = tagNode(tag, children); // and add it to the appropriate stack

          if (stack.length > 0) {
            stack.push(node);
          } else {
            result.push(node);
          }

          children = [];
          pairTagFound = true;
        } else if (isNode(lastFromStack)) {
          // add nodes between close tag and open tag to the children
          children.unshift(lastFromStack);
        } else {
          if (typeof lastFromStack === 'string' && hasAttributes(lastFromStack)) {
            throw new Error("Tags in string should not have attributes: ".concat(str));
          } else {
            throw new Error("String has unbalanced tags: ".concat(str));
          }
        }

        if (stack.length === 0 && children.length > 0) {
          throw new Error("String has unbalanced tags: ".concat(str));
        }
      }

      context.tag = '';
      return STATE.TEXT;
    } // if the tag is void tag e.g. <img/>


    if (tag.lastIndexOf(CONTROL_CHARS.CLOSING_TAG_MARK) === tag.length - 1) {
      tag = tag.substring(0, tag.length - 1);
      createTextNodeIfPossible(context);

      var _node = voidTagNode(tag); // add node to the appropriate stack


      if (stack.length > 0) {
        stack.push(_node);
      } else {
        result.push(_node);
      }

      context.tag = '';
      return STATE.TEXT;
    }

    createTextNodeIfPossible(context);
    stack.push(tag);
    context.tag = '';
    return STATE.TEXT;
  } // If we meet open tag "<" it means that we wrongly moved into tag state


  if (currChar === CONTROL_CHARS.TAG_OPEN_BRACE) {
    context.text += str.substring(lastTextStateChangeIdx, currIdx);
    context.lastTextStateChangeIdx = currIdx;
    context.tag = '';
    return STATE.TAG;
  }

  context.tag += currChar;
  return STATE.TAG;
};
/**
 * Parses string into AST (abstract syntax tree) and returns it
 * e.g.
 * parse("String to <a>translate</a>") ->
 * ```
 *      [
 *           { type: 'text', value: 'String to ' },
 *           { type: 'tag', value: 'a', children: [{ type: 'text', value: 'translate' }] }
 *      ];
 * ```
 * Empty string is parsed into empty AST (abstract syntax tree): "[]"
 * If founds unbalanced tags, it throws error about it
 *
 * @param {string} str - message in simplified ICU like syntax without plural support
 */


var parser = function parser() {
  var _STATE_HANDLERS;

  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var context = {
    /**
     * Stack is used to keep and search nested tag nodes
     */
    stack: [],

    /**
     * Result is stack where function allocates nodes
     */
    result: [],

    /**
     * Current char index
     */
    currIdx: 0,

    /**
     * Saves index of the last state change from the text state,
     * used to restore parsed text if we moved into other state wrongly
     */
    lastTextStateChangeIdx: 0,

    /**
     * Accumulated tag value
     */
    tag: '',

    /**
     * Accumulated text value
     */
    text: '',

    /**
     * Accumulated placeholder value
     */
    placeholder: '',

    /**
     * Parsed string
     */
    str: str
  };
  var STATE_HANDLERS = (_STATE_HANDLERS = {}, _defineProperty(_STATE_HANDLERS, STATE.TEXT, textStateHandler), _defineProperty(_STATE_HANDLERS, STATE.PLACEHOLDER, placeholderStateHandler), _defineProperty(_STATE_HANDLERS, STATE.TAG, tagStateHandler), _STATE_HANDLERS); // Start from text state

  var currentState = STATE.TEXT;

  while (context.currIdx < str.length) {
    context.currChar = str[context.currIdx];
    var currentStateHandler = STATE_HANDLERS[currentState];
    currentState = currentStateHandler(context);
    context.currIdx += 1;
  }

  var result = context.result,
      text = context.text,
      stack = context.stack,
      lastTextStateChangeIdx = context.lastTextStateChangeIdx; // Means that tag or placeholder nodes were not closed, so we consider them as text

  if (currentState !== STATE.TEXT) {
    var restText = str.substring(lastTextStateChangeIdx);

    if ((restText + text).length > 0) {
      result.push(textNode(text + restText));
    }
  } else {
    // eslint-disable-next-line no-lonely-if
    if (text.length > 0) {
      result.push(textNode(text));
    }
  }

  if (stack.length > 0) {
    throw new Error("String has unbalanced tags: ".concat(context.str));
  }

  return result;
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * Helper functions used by default to assemble strings from tag nodes
 * @param tagName
 * @param children
 */

var createStringElement = function createStringElement(tagName, children) {
  if (children) {
    return "<".concat(tagName, ">").concat(children, "</").concat(tagName, ">");
  }

  return "<".concat(tagName, "/>");
};
/**
 * Creates map with default values for tag converters
 */


var createDefaultValues = function createDefaultValues() {
  return {
    p: function p(children) {
      return createStringElement('p', children);
    },
    b: function b(children) {
      return createStringElement('b', children);
    },
    strong: function strong(children) {
      return createStringElement('strong', children);
    },
    tt: function tt(children) {
      return createStringElement('tt', children);
    },
    s: function s(children) {
      return createStringElement('s', children);
    },
    i: function i(children) {
      return createStringElement('i', children);
    }
  };
};
/**
 * This function accepts an AST (abstract syntax tree) which is a result
 * of the parser function call, and converts tree nodes into array of strings replacing node
 * values with provided values.
 * Values is a map with functions or strings, where each key is related to placeholder value
 * or tag value
 * e.g.
 * string "text <tag>tag text</tag> %placeholder%" is parsed into next AST
 *
 *      [
 *          { type: 'text', value: 'text ' },
 *          {
 *              type: 'tag',
 *              value: 'tag',
 *              children: [{ type: 'text', value: 'tag text' }],
 *          },
 *          { type: 'text', value: ' ' },
 *          { type: 'placeholder', value: 'placeholder' }
 *      ];
 *
 * this AST after format and next values
 *
 *      {
 *          // here used template strings, but it can be react components as well
 *          tag: (chunks) => `<b>${chunks}</b>`,
 *          placeholder: 'placeholder text'
 *      }
 *
 * will return next array
 *
 * [ 'text ', '<b>tag text</b>', ' ', 'placeholder text' ]
 *
 * as you can see, <tag> was replaced by <b>, and placeholder was replaced by placeholder text
 *
 * @param ast - AST (abstract syntax tree)
 * @param values
 */


var format = function format() {
  var ast = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var result = [];

  var tmplValues = _objectSpread(_objectSpread({}, createDefaultValues()), values);

  var i = 0;

  while (i < ast.length) {
    var currentNode = ast[i]; // if current node is text node, there is nothing to change, append value to the result

    if (isTextNode(currentNode)) {
      result.push(currentNode.value);
    } else if (isTagNode(currentNode)) {
      var children = _toConsumableArray(format(currentNode.children, tmplValues));

      var value = tmplValues[currentNode.value];

      if (value) {
        // TODO consider using strong typing
        if (typeof value === 'function') {
          result.push(value(children.join('')));
        } else {
          result.push(value);
        }
      } else {
        throw new Error("Value ".concat(currentNode.value, " wasn't provided"));
      }
    } else if (isVoidTagNode(currentNode)) {
      var _value = tmplValues[currentNode.value]; // TODO consider using strong typing

      if (_value && typeof _value === 'string') {
        result.push(_value);
      } else {
        throw new Error("Value ".concat(currentNode.value, " wasn't provided"));
      }
    } else if (isPlaceholderNode(currentNode)) {
      var _value2 = tmplValues[currentNode.value]; // TODO consider using strong typing

      if (_value2 && typeof _value2 === 'string') {
        result.push(_value2);
      } else {
        throw new Error("Value ".concat(currentNode.value, " wasn't provided"));
      }
    }

    i += 1;
  }

  return result;
};
/**
 * Function gets AST (abstract syntax tree) or string and formats messages,
 * replacing values accordingly
 * e.g.
 *      const message = formatter('<a>some text</a>', {
 *          a: (chunks) => `<a href="#">${chunks}</a>`,
 *      });
 *      console.log(message); // ['<a href="#">some text</a>']
 * @param message
 * @param [values]
 */


var formatter = function formatter(message, values) {
  var ast = parser(message);
  var preparedValues = {}; // convert values to strings if not a function

  if (values) {
    Object.keys(values).forEach(function (key) {
      var value = values[key]; // TODO consider using strong typing

      if (typeof value === 'function') {
        preparedValues[key] = value;
      } else {
        preparedValues[key] = String(value);
      }
    });
  }

  return format(ast, preparedValues);
};

var _pluralFormsCount;

var AvailableLocales;

(function (AvailableLocales) {
  AvailableLocales["az"] = "az";
  AvailableLocales["bo"] = "bo";
  AvailableLocales["dz"] = "dz";
  AvailableLocales["id"] = "id";
  AvailableLocales["ja"] = "ja";
  AvailableLocales["jv"] = "jv";
  AvailableLocales["ka"] = "ka";
  AvailableLocales["km"] = "km";
  AvailableLocales["kn"] = "kn";
  AvailableLocales["ko"] = "ko";
  AvailableLocales["ms"] = "ms";
  AvailableLocales["th"] = "th";
  AvailableLocales["tr"] = "tr";
  AvailableLocales["vi"] = "vi";
  AvailableLocales["zh"] = "zh";
  AvailableLocales["zh_cn"] = "zh_cn";
  AvailableLocales["zh_tw"] = "zh_tw";
  AvailableLocales["af"] = "af";
  AvailableLocales["bn"] = "bn";
  AvailableLocales["bg"] = "bg";
  AvailableLocales["ca"] = "ca";
  AvailableLocales["da"] = "da";
  AvailableLocales["de"] = "de";
  AvailableLocales["el"] = "el";
  AvailableLocales["en"] = "en";
  AvailableLocales["eo"] = "eo";
  AvailableLocales["es"] = "es";
  AvailableLocales["et"] = "et";
  AvailableLocales["eu"] = "eu";
  AvailableLocales["fa"] = "fa";
  AvailableLocales["fi"] = "fi";
  AvailableLocales["fo"] = "fo";
  AvailableLocales["fur"] = "fur";
  AvailableLocales["fy"] = "fy";
  AvailableLocales["gl"] = "gl";
  AvailableLocales["gu"] = "gu";
  AvailableLocales["ha"] = "ha";
  AvailableLocales["he"] = "he";
  AvailableLocales["hu"] = "hu";
  AvailableLocales["is"] = "is";
  AvailableLocales["it"] = "it";
  AvailableLocales["ku"] = "ku";
  AvailableLocales["lb"] = "lb";
  AvailableLocales["ml"] = "ml";
  AvailableLocales["mn"] = "mn";
  AvailableLocales["mr"] = "mr";
  AvailableLocales["nah"] = "nah";
  AvailableLocales["nb"] = "nb";
  AvailableLocales["ne"] = "ne";
  AvailableLocales["nl"] = "nl";
  AvailableLocales["nn"] = "nn";
  AvailableLocales["no"] = "no";
  AvailableLocales["oc"] = "oc";
  AvailableLocales["om"] = "om";
  AvailableLocales["or"] = "or";
  AvailableLocales["pa"] = "pa";
  AvailableLocales["pap"] = "pap";
  AvailableLocales["ps"] = "ps";
  AvailableLocales["pt"] = "pt";
  AvailableLocales["pt_pt"] = "pt_pt";
  AvailableLocales["pt_br"] = "pt_br";
  AvailableLocales["so"] = "so";
  AvailableLocales["sq"] = "sq";
  AvailableLocales["sv"] = "sv";
  AvailableLocales["sw"] = "sw";
  AvailableLocales["ta"] = "ta";
  AvailableLocales["te"] = "te";
  AvailableLocales["tk"] = "tk";
  AvailableLocales["ur"] = "ur";
  AvailableLocales["zu"] = "zu";
  AvailableLocales["am"] = "am";
  AvailableLocales["bh"] = "bh";
  AvailableLocales["fil"] = "fil";
  AvailableLocales["fr"] = "fr";
  AvailableLocales["gun"] = "gun";
  AvailableLocales["hi"] = "hi";
  AvailableLocales["hy"] = "hy";
  AvailableLocales["ln"] = "ln";
  AvailableLocales["mg"] = "mg";
  AvailableLocales["nso"] = "nso";
  AvailableLocales["xbr"] = "xbr";
  AvailableLocales["ti"] = "ti";
  AvailableLocales["wa"] = "wa";
  AvailableLocales["be"] = "be";
  AvailableLocales["bs"] = "bs";
  AvailableLocales["hr"] = "hr";
  AvailableLocales["ru"] = "ru";
  AvailableLocales["sr"] = "sr";
  AvailableLocales["uk"] = "uk";
  AvailableLocales["cs"] = "cs";
  AvailableLocales["sk"] = "sk";
  AvailableLocales["ga"] = "ga";
  AvailableLocales["lt"] = "lt";
  AvailableLocales["sl"] = "sl";
  AvailableLocales["mk"] = "mk";
  AvailableLocales["mt"] = "mt";
  AvailableLocales["lv"] = "lv";
  AvailableLocales["pl"] = "pl";
  AvailableLocales["cy"] = "cy";
  AvailableLocales["ro"] = "ro";
  AvailableLocales["ar"] = "ar";
  AvailableLocales["sr_latn"] = "sr_latn";
})(AvailableLocales || (AvailableLocales = {}));

var getPluralFormId = function getPluralFormId(locale, number) {
  var _supportedForms;

  if (number === 0) {
    return 0;
  }

  var slavNum = number % 10 === 1 && number % 100 !== 11 ? 1 : number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20) ? 2 : 3;
  var supportedForms = (_supportedForms = {}, _defineProperty(_supportedForms, AvailableLocales.az, 1), _defineProperty(_supportedForms, AvailableLocales.bo, 1), _defineProperty(_supportedForms, AvailableLocales.dz, 1), _defineProperty(_supportedForms, AvailableLocales.id, 1), _defineProperty(_supportedForms, AvailableLocales.ja, 1), _defineProperty(_supportedForms, AvailableLocales.jv, 1), _defineProperty(_supportedForms, AvailableLocales.ka, 1), _defineProperty(_supportedForms, AvailableLocales.km, 1), _defineProperty(_supportedForms, AvailableLocales.kn, 1), _defineProperty(_supportedForms, AvailableLocales.ko, 1), _defineProperty(_supportedForms, AvailableLocales.ms, 1), _defineProperty(_supportedForms, AvailableLocales.th, 1), _defineProperty(_supportedForms, AvailableLocales.tr, 1), _defineProperty(_supportedForms, AvailableLocales.vi, 1), _defineProperty(_supportedForms, AvailableLocales.zh, 1), _defineProperty(_supportedForms, AvailableLocales.zh_tw, 1), _defineProperty(_supportedForms, AvailableLocales.zh_cn, 1), _defineProperty(_supportedForms, AvailableLocales.af, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.bn, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.bg, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.ca, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.da, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.de, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.el, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.en, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.eo, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.es, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.et, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.eu, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.fa, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.fi, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.fo, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.fur, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.fy, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.gl, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.gu, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.ha, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.he, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.hu, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.is, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.it, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.ku, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.lb, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.ml, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.mn, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.mr, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.nah, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.nb, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.ne, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.nl, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.nn, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.no, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.oc, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.om, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.or, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.pa, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.pap, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.ps, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.pt, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.pt_pt, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.pt_br, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.so, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.sq, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.sv, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.sw, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.ta, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.te, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.tk, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.ur, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.zu, number === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.am, number === 0 || number === 1 ? 0 : 1), _defineProperty(_supportedForms, AvailableLocales.bh, number === 0 || number === 1 ? 0 : 1), _defineProperty(_supportedForms, AvailableLocales.fil, number === 0 || number === 1 ? 0 : 1), _defineProperty(_supportedForms, AvailableLocales.fr, number === 0 || number >= 2 ? 2 : 1), _defineProperty(_supportedForms, AvailableLocales.gun, number === 0 || number === 1 ? 0 : 1), _defineProperty(_supportedForms, AvailableLocales.hi, number === 0 || number === 1 ? 0 : 1), _defineProperty(_supportedForms, AvailableLocales.hy, number === 0 || number === 1 ? 0 : 1), _defineProperty(_supportedForms, AvailableLocales.ln, number === 0 || number === 1 ? 0 : 1), _defineProperty(_supportedForms, AvailableLocales.mg, number === 0 || number === 1 ? 0 : 1), _defineProperty(_supportedForms, AvailableLocales.nso, number === 0 || number === 1 ? 0 : 1), _defineProperty(_supportedForms, AvailableLocales.xbr, number === 0 || number === 1 ? 0 : 1), _defineProperty(_supportedForms, AvailableLocales.ti, number === 0 || number === 1 ? 0 : 1), _defineProperty(_supportedForms, AvailableLocales.wa, number === 0 || number === 1 ? 0 : 1), _defineProperty(_supportedForms, AvailableLocales.be, slavNum), _defineProperty(_supportedForms, AvailableLocales.bs, slavNum), _defineProperty(_supportedForms, AvailableLocales.hr, slavNum), _defineProperty(_supportedForms, AvailableLocales.ru, slavNum), _defineProperty(_supportedForms, AvailableLocales.sr, slavNum), _defineProperty(_supportedForms, AvailableLocales.sr_latn, slavNum), _defineProperty(_supportedForms, AvailableLocales.uk, slavNum), _defineProperty(_supportedForms, AvailableLocales.cs, number === 1 ? 1 : number >= 2 && number <= 4 ? 2 : 3), _defineProperty(_supportedForms, AvailableLocales.sk, number === 1 ? 1 : number >= 2 && number <= 4 ? 2 : 3), _defineProperty(_supportedForms, AvailableLocales.ga, number === 1 ? 1 : number === 2 ? 2 : 3), _defineProperty(_supportedForms, AvailableLocales.lt, number % 10 === 1 && number % 100 !== 11 ? 1 : number % 10 >= 2 && (number % 100 < 10 || number % 100 >= 20) ? 2 : 3), _defineProperty(_supportedForms, AvailableLocales.sl, number % 100 === 1 ? 1 : number % 100 === 2 ? 2 : number % 100 === 3 || number % 100 === 4 ? 3 : 4), _defineProperty(_supportedForms, AvailableLocales.mk, number % 10 === 1 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.mt, number === 1 ? 1 : number === 0 || number % 100 > 1 && number % 100 < 11 ? 2 : number % 100 > 10 && number % 100 < 20 ? 3 : 4), _defineProperty(_supportedForms, AvailableLocales.lv, number === 0 ? 0 : number % 10 === 1 && number % 100 !== 11 ? 1 : 2), _defineProperty(_supportedForms, AvailableLocales.pl, number === 1 ? 1 : number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 12 || number % 100 > 14) ? 2 : 3), _defineProperty(_supportedForms, AvailableLocales.cy, number === 1 ? 0 : number === 2 ? 1 : number === 8 || number === 11 ? 2 : 3), _defineProperty(_supportedForms, AvailableLocales.ro, number === 1 ? 1 : number === 1 || number % 100 > 0 && number % 100 < 20 ? 2 : 3), _defineProperty(_supportedForms, AvailableLocales.ar, number === 0 ? 0 : number === 1 ? 1 : number === 2 ? 2 : number % 100 >= 3 && number % 100 <= 10 ? 3 : number % 100 >= 11 && number % 100 <= 99 ? 4 : 5), _supportedForms);
  return supportedForms[locale];
};

var pluralFormsCount = (_pluralFormsCount = {}, _defineProperty(_pluralFormsCount, AvailableLocales.az, 2), _defineProperty(_pluralFormsCount, AvailableLocales.bo, 2), _defineProperty(_pluralFormsCount, AvailableLocales.dz, 2), _defineProperty(_pluralFormsCount, AvailableLocales.id, 2), _defineProperty(_pluralFormsCount, AvailableLocales.ja, 2), _defineProperty(_pluralFormsCount, AvailableLocales.jv, 2), _defineProperty(_pluralFormsCount, AvailableLocales.ka, 2), _defineProperty(_pluralFormsCount, AvailableLocales.km, 2), _defineProperty(_pluralFormsCount, AvailableLocales.kn, 2), _defineProperty(_pluralFormsCount, AvailableLocales.ko, 2), _defineProperty(_pluralFormsCount, AvailableLocales.ms, 2), _defineProperty(_pluralFormsCount, AvailableLocales.th, 2), _defineProperty(_pluralFormsCount, AvailableLocales.tr, 2), _defineProperty(_pluralFormsCount, AvailableLocales.vi, 2), _defineProperty(_pluralFormsCount, AvailableLocales.zh, 2), _defineProperty(_pluralFormsCount, AvailableLocales.zh_cn, 2), _defineProperty(_pluralFormsCount, AvailableLocales.zh_tw, 2), _defineProperty(_pluralFormsCount, AvailableLocales.af, 3), _defineProperty(_pluralFormsCount, AvailableLocales.bn, 3), _defineProperty(_pluralFormsCount, AvailableLocales.bg, 3), _defineProperty(_pluralFormsCount, AvailableLocales.ca, 3), _defineProperty(_pluralFormsCount, AvailableLocales.da, 3), _defineProperty(_pluralFormsCount, AvailableLocales.de, 3), _defineProperty(_pluralFormsCount, AvailableLocales.el, 3), _defineProperty(_pluralFormsCount, AvailableLocales.en, 3), _defineProperty(_pluralFormsCount, AvailableLocales.eo, 3), _defineProperty(_pluralFormsCount, AvailableLocales.es, 3), _defineProperty(_pluralFormsCount, AvailableLocales.et, 3), _defineProperty(_pluralFormsCount, AvailableLocales.eu, 3), _defineProperty(_pluralFormsCount, AvailableLocales.fa, 3), _defineProperty(_pluralFormsCount, AvailableLocales.fi, 3), _defineProperty(_pluralFormsCount, AvailableLocales.fo, 3), _defineProperty(_pluralFormsCount, AvailableLocales.fur, 3), _defineProperty(_pluralFormsCount, AvailableLocales.fy, 3), _defineProperty(_pluralFormsCount, AvailableLocales.gl, 3), _defineProperty(_pluralFormsCount, AvailableLocales.gu, 3), _defineProperty(_pluralFormsCount, AvailableLocales.ha, 3), _defineProperty(_pluralFormsCount, AvailableLocales.he, 3), _defineProperty(_pluralFormsCount, AvailableLocales.hu, 3), _defineProperty(_pluralFormsCount, AvailableLocales.is, 3), _defineProperty(_pluralFormsCount, AvailableLocales.it, 3), _defineProperty(_pluralFormsCount, AvailableLocales.ku, 3), _defineProperty(_pluralFormsCount, AvailableLocales.lb, 3), _defineProperty(_pluralFormsCount, AvailableLocales.ml, 3), _defineProperty(_pluralFormsCount, AvailableLocales.mn, 3), _defineProperty(_pluralFormsCount, AvailableLocales.mr, 3), _defineProperty(_pluralFormsCount, AvailableLocales.nah, 3), _defineProperty(_pluralFormsCount, AvailableLocales.nb, 3), _defineProperty(_pluralFormsCount, AvailableLocales.ne, 3), _defineProperty(_pluralFormsCount, AvailableLocales.nl, 3), _defineProperty(_pluralFormsCount, AvailableLocales.nn, 3), _defineProperty(_pluralFormsCount, AvailableLocales.no, 3), _defineProperty(_pluralFormsCount, AvailableLocales.oc, 3), _defineProperty(_pluralFormsCount, AvailableLocales.om, 3), _defineProperty(_pluralFormsCount, AvailableLocales.or, 3), _defineProperty(_pluralFormsCount, AvailableLocales.pa, 3), _defineProperty(_pluralFormsCount, AvailableLocales.pap, 3), _defineProperty(_pluralFormsCount, AvailableLocales.ps, 3), _defineProperty(_pluralFormsCount, AvailableLocales.pt, 3), _defineProperty(_pluralFormsCount, AvailableLocales.pt_pt, 3), _defineProperty(_pluralFormsCount, AvailableLocales.pt_br, 3), _defineProperty(_pluralFormsCount, AvailableLocales.so, 3), _defineProperty(_pluralFormsCount, AvailableLocales.sq, 3), _defineProperty(_pluralFormsCount, AvailableLocales.sv, 3), _defineProperty(_pluralFormsCount, AvailableLocales.sw, 3), _defineProperty(_pluralFormsCount, AvailableLocales.ta, 3), _defineProperty(_pluralFormsCount, AvailableLocales.te, 3), _defineProperty(_pluralFormsCount, AvailableLocales.tk, 3), _defineProperty(_pluralFormsCount, AvailableLocales.ur, 3), _defineProperty(_pluralFormsCount, AvailableLocales.zu, 3), _defineProperty(_pluralFormsCount, AvailableLocales.am, 2), _defineProperty(_pluralFormsCount, AvailableLocales.bh, 2), _defineProperty(_pluralFormsCount, AvailableLocales.fil, 2), _defineProperty(_pluralFormsCount, AvailableLocales.fr, 3), _defineProperty(_pluralFormsCount, AvailableLocales.gun, 2), _defineProperty(_pluralFormsCount, AvailableLocales.hi, 2), _defineProperty(_pluralFormsCount, AvailableLocales.hy, 2), _defineProperty(_pluralFormsCount, AvailableLocales.ln, 2), _defineProperty(_pluralFormsCount, AvailableLocales.mg, 2), _defineProperty(_pluralFormsCount, AvailableLocales.nso, 2), _defineProperty(_pluralFormsCount, AvailableLocales.xbr, 2), _defineProperty(_pluralFormsCount, AvailableLocales.ti, 2), _defineProperty(_pluralFormsCount, AvailableLocales.wa, 2), _defineProperty(_pluralFormsCount, AvailableLocales.be, 4), _defineProperty(_pluralFormsCount, AvailableLocales.bs, 4), _defineProperty(_pluralFormsCount, AvailableLocales.hr, 4), _defineProperty(_pluralFormsCount, AvailableLocales.ru, 4), _defineProperty(_pluralFormsCount, AvailableLocales.sr, 4), _defineProperty(_pluralFormsCount, AvailableLocales.sr_latn, 4), _defineProperty(_pluralFormsCount, AvailableLocales.uk, 4), _defineProperty(_pluralFormsCount, AvailableLocales.cs, 4), _defineProperty(_pluralFormsCount, AvailableLocales.sk, 4), _defineProperty(_pluralFormsCount, AvailableLocales.ga, 4), _defineProperty(_pluralFormsCount, AvailableLocales.lt, 4), _defineProperty(_pluralFormsCount, AvailableLocales.sl, 5), _defineProperty(_pluralFormsCount, AvailableLocales.mk, 3), _defineProperty(_pluralFormsCount, AvailableLocales.mt, 5), _defineProperty(_pluralFormsCount, AvailableLocales.lv, 3), _defineProperty(_pluralFormsCount, AvailableLocales.pl, 4), _defineProperty(_pluralFormsCount, AvailableLocales.cy, 4), _defineProperty(_pluralFormsCount, AvailableLocales.ro, 4), _defineProperty(_pluralFormsCount, AvailableLocales.ar, 6), _pluralFormsCount);
var PLURAL_STRING_DELIMITER = '|';
/**
 * Returns string plural forms which are separated by `|`.
 *
 * @param str Message.
 *
 * @returns Array of plural forms.
 */

var getForms = function getForms(str) {
  return str.split(PLURAL_STRING_DELIMITER);
};
/**
 * Checks whether the string has correct number of plural forms.
 *
 * @param str Translated string.
 * @param locale Locale.
 * @param key Optional, base key.
 *
 * @throws Error if the number of plural forms is incorrect.
 */

var checkForms = function checkForms(str, locale, key) {
  var givenCount = getForms(str).length;
  var requiredCount = pluralFormsCount[locale];

  if (givenCount !== requiredCount) {
    var prefix = typeof key !== 'undefined' ? "Invalid plural string \"".concat(key, "\" for locale '").concat(locale, "'") : "Invalid plural string for locale '".concat(locale, "'");
    throw new Error("".concat(prefix, ": required ").concat(requiredCount, ", given ").concat(givenCount, " in string \"").concat(str, "\""));
  }
};
/**
 * Checks whether plural forms are present in base string
 * by checking the presence of the vertical bar `|`.
 *
 * @param baseStr Base string.
 *
 * @returns True if `baseStr` contains `|`, false otherwise.
 */


var hasPluralForm = function hasPluralForm(baseStr) {
  return baseStr.includes(PLURAL_STRING_DELIMITER);
};
/**
 * Checks if plural forms are valid.
 *
 * @param targetStr Translated message with plural forms.
 * @param locale Locale.
 * @param key Optional, message key, used for clearer log message.
 *
 * @returns True if plural forms are valid, false otherwise.
 */

var isPluralFormValid = function isPluralFormValid(targetStr, locale, key) {
  try {
    checkForms(targetStr, locale, key);
    return true;
  } catch (error) {
    return false;
  }
};
/**
 * Returns plural form corresponding to number
 * @param str
 * @param number
 * @param locale - current locale
 * @param key - message key
 */

var getForm = function getForm(str, number, locale, key) {
  checkForms(str, locale, key);
  var forms = getForms(str);
  var currentForm = getPluralFormId(locale, number);
  return forms[currentForm].trim();
};

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var defaultMessageConstructor = function defaultMessageConstructor(formatted) {
  return formatted.join('');
};

var Translator = /*#__PURE__*/function () {
  function Translator(i18n, // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messageConstructor, values) {
    _classCallCheck(this, Translator);

    this.i18n = i18n;
    this.messageConstructor = messageConstructor || defaultMessageConstructor;
    this.values = values || {};
  }
  /**
   * Retrieves message and translates it, substituting parameters where necessary
   * @param key - translation message key
   * @param params - values used to substitute placeholders and tags
   */


  _createClass(Translator, [{
    key: "getMessage",
    value: function getMessage(key) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var message = this.i18n.getMessage(key);

      if (!message) {
        message = this.i18n.getBaseMessage(key);

        if (!message) {
          throw new Error("Was unable to find message for key: \"".concat(key, "\""));
        }
      }

      var formatted = formatter(message, _objectSpread$1(_objectSpread$1({}, this.values), params));
      return this.messageConstructor(formatted);
    }
    /**
     * Retrieves correct plural form and translates it
     * @param key - translation message key
     * @param number - plural form number
     * @param params - values used to substitute placeholders or tags if necessary,
     * if params has "count" property it will be overridden by number (plural form number)
     */

  }, {
    key: "getPlural",
    value: function getPlural(key, number) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var message = this.i18n.getMessage(key);
      var language = this.i18n.getUILanguage();

      if (!message) {
        message = this.i18n.getBaseMessage(key);

        if (!message) {
          throw new Error("Was unable to find message for key: \"".concat(key, "\""));
        }

        language = this.i18n.getBaseUILanguage();
      }

      var form = getForm(message, number, language, key);
      var formatted = formatter(form, _objectSpread$1(_objectSpread$1(_objectSpread$1({}, this.values), params), {}, {
        count: number
      }));
      return this.messageConstructor(formatted);
    }
  }]);

  return Translator;
}();

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * Creates translation function for strings used in the React components
 * We do not import React directly, because translator module can be used
 * in the modules without React too
 *
 * e.g.
 * const translateReact = createReactTranslator(getMessage, React);
 * in locales folder you should have messages.json file
 * ```
 * message:
 *     "popup_auth_agreement_consent": {
 *          "message": "You agree to our <eula>EULA</eula>",
 *      },
 * ```
 *
 * this message can be retrieved and translated into react components next way:
 *
 * const component = translateReact('popup_auth_agreement_consent', {
 *          eula: (chunks) => (
 *              <button
 *                  className="auth__privacy-link"
 *                  onClick={handleEulaClick}
 *              >
 *                  {chunks}
 *              </button>
 *          ),
 *       });
 *
 * Note how functions in the values argument can be used with handlers
 *
 * @param i18n - object with methods which get translated message by key and return current locale
 * @param React - instance of react library
 */

var createReactTranslator = function createReactTranslator(i18n, react, defaults) {
  /**
   * Helps to build nodes without values
   *
   * @param tagName
   * @param children
   */
  var createReactElement = function createReactElement(tagName, children) {
    if (children) {
      return react.createElement(tagName, null, react.Children.toArray(children));
    }

    return react.createElement(tagName, null);
  };
  /**
   * Function creates default values to be used if user didn't provide function values for tags
   */


  var createDefaultValues = function createDefaultValues() {
    // eslint-disable-next-line @typescript-eslint/ban-types
    var externalDefaults = {};

    if (defaults) {
      defaults.tags.forEach(function (t) {
        externalDefaults[t.key] = function (children) {
          return createReactElement(t.createdTag, children);
        };
      });
    }

    if (defaults !== null && defaults !== void 0 && defaults.override) {
      return externalDefaults;
    }

    return _objectSpread$2({
      p: function p(children) {
        return createReactElement('p', children);
      },
      b: function b(children) {
        return createReactElement('b', children);
      },
      strong: function strong(children) {
        return createReactElement('strong', children);
      },
      tt: function tt(children) {
        return createReactElement('tt', children);
      },
      s: function s(children) {
        return createReactElement('s', children);
      },
      i: function i(children) {
        return createReactElement('i', children);
      }
    }, externalDefaults);
  };

  var reactMessageConstructor = function reactMessageConstructor(formatted) {
    var reactChildren = react.Children.toArray(formatted); // if there is only strings in the array we join them

    if (reactChildren.every(function (child) {
      return typeof child === 'string';
    })) {
      return reactChildren.join('');
    }

    return reactChildren;
  };

  var defaultValues = createDefaultValues();
  return new Translator(i18n, reactMessageConstructor, defaultValues);
};

var r,
    f;

function A(n, l) {
  return l = l || [], null == n || "boolean" == typeof n || (Array.isArray(n) ? n.some(function (n) {
    A(n, l);
  }) : l.push(n)), l;
}

r = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f = 0;

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * Creates translation function for strings used in the Preact components
 * We do not import Preact directly, because translator module can be used
 * in the modules without Preact too
 *
 * e.g.
 * const translatePreact = createPreactTranslator(getMessage, Preact);
 * in locales folder you should have messages.json file
 * ```
 * message:
 *     "popup_auth_agreement_consent": {
 *          "message": "You agree to our <eula>EULA</eula>",
 *      },
 * ```
 *
 * this message can be retrieved and translated into preact components next way:
 *
 * const component = translatePreact('popup_auth_agreement_consent', {
 *          eula: (chunks) => (
 *              <button
 *                  className="auth__privacy-link"
 *                  onClick={handleEulaClick}
 *              >
 *                  {chunks}
 *              </button>
 *          ),
 *       });
 *
 * Note how functions in the values argument can be used with handlers
 *
 * @param i18n - object with methods which get translated message by key and return current locale
 * @param Preact - instance of preact library
 */

var createPreactTranslator = function createPreactTranslator(i18n, preact, defaults) {
  /**
   * Helps to build nodes without values
   *
   * @param tagName
   * @param children
   */
  var createPreactElement = function createPreactElement(tagName, children) {
    if (children) {
      return preact.createElement(tagName, null, A(children));
    }

    return preact.createElement(tagName, null);
  };
  /**
   * Function creates default values to be used if user didn't provide function values for tags
   */


  var createDefaultValues = function createDefaultValues() {
    // eslint-disable-next-line @typescript-eslint/ban-types
    var externalDefaults = {};

    if (defaults) {
      defaults.tags.forEach(function (t) {
        externalDefaults[t.key] = function (children) {
          return createPreactElement(t.createdTag, children);
        };
      });
    }

    if (defaults !== null && defaults !== void 0 && defaults.override) {
      return externalDefaults;
    }

    return _objectSpread$3({
      p: function p(children) {
        return createPreactElement('p', children);
      },
      b: function b(children) {
        return createPreactElement('b', children);
      },
      strong: function strong(children) {
        return createPreactElement('strong', children);
      },
      tt: function tt(children) {
        return createPreactElement('tt', children);
      },
      s: function s(children) {
        return createPreactElement('s', children);
      },
      i: function i(children) {
        return createPreactElement('i', children);
      }
    }, externalDefaults);
  };

  var preactMessageConstructor = function preactMessageConstructor(formatted) {
    var preactChildren = A(formatted); // if there is only strings in the array we join them

    if (preactChildren.every(function (child) {
      return typeof child === 'string';
    })) {
      return preactChildren.join('');
    }

    return preactChildren;
  };

  var defaultValues = createDefaultValues();
  return new Translator(i18n, preactMessageConstructor, defaultValues);
};

/**
 * Creates translator instance strings, by default for simple strings
 * @param i18n - function which returns translated message by key
 * @param messageConstructor - function that will collect messages
 * @param values - map with default values for tag converters
 */

var createTranslator = function createTranslator(i18n, messageConstructor, values) {
  return new Translator(i18n, messageConstructor, values);
};

var translate = {
  createTranslator: createTranslator,
  createReactTranslator: createReactTranslator,
  createPreactTranslator: createPreactTranslator
};

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/**
 * Compares two AST (abstract syntax tree) structures,
 * view tests for examples
 * @param baseAst
 * @param targetAst
 */

var areAstStructuresSame = function areAstStructuresSame(baseAst, targetAst) {
  var textNodeFilter = function textNodeFilter(node) {
    return !isTextNode(node);
  };

  var filteredBaseAst = baseAst.filter(textNodeFilter);
  var filteredTargetAst = targetAst.filter(textNodeFilter); // if AST structures have different lengths, they are not equal

  if (filteredBaseAst.length !== filteredTargetAst.length) {
    return false;
  }

  var _loop = function _loop(i) {
    var baseNode = filteredBaseAst[i];
    var targetNode = filteredTargetAst.find(function (node) {
      return node.type === baseNode.type && node.value === baseNode.value;
    });

    if (!targetNode) {
      return {
        v: false
      };
    }

    if (targetNode.children && baseNode.children) {
      var areChildrenSame = areAstStructuresSame(baseNode.children, targetNode.children);

      if (!areChildrenSame) {
        return {
          v: false
        };
      }
    }
  };

  for (var i = 0; i < filteredBaseAst.length; i += 1) {
    var _ret = _loop(i);

    if (_typeof(_ret) === "object") return _ret.v;
  }

  return true;
};
/**
 * Validates translation against base string by AST (abstract syntax tree) structure.
 *
 * @param baseMessage Base message.
 * @param translatedMessage Translated message.
 * @param locale Locale of `translatedMessage`.
 *
 * @returns True if translated message is valid, false otherwise:
 * - if base message has no plural forms, it will return true if AST structures are same;
 * - if base message has plural forms, first of all
 *   the function checks if the number of plural forms is correct for the `locale`,
 *   and then it validates AST plural forms structures for base and translated messages.
 *
 * @throws Error for invalid tags in base or translated messages,
 * or if translated message has invalid plural forms.
 */


var isTranslationValid = function isTranslationValid(baseMessage, translatedMessage, locale) {
  if (hasPluralForm(baseMessage)) {
    var isPluralFormsValid = isPluralFormValid(translatedMessage, locale);

    if (!isPluralFormsValid) {
      throw new Error('Invalid plural forms');
    }

    var baseForms = getForms(baseMessage);
    var translatedForms = getForms(translatedMessage); // check a zero form structures of base and translated messages

    if (!isTranslationValid(baseForms[0], translatedForms[0], locale)) {
      return false;
    } // and check other forms structures of translated messages against the first form of base message


    for (var i = 1; i < translatedForms.length; i += 1) {
      if (!isTranslationValid(baseForms[1], translatedForms[i], locale)) {
        return false;
      }
    } // if no errors, return true after all checks


    return true;
  }

  var baseMessageAst = parser(baseMessage);
  var translatedMessageAst = parser(translatedMessage);
  return areAstStructuresSame(baseMessageAst, translatedMessageAst);
};
var validator = {
  isTranslationValid: isTranslationValid,
  isPluralFormValid: isPluralFormValid
};




/***/ }),

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

/***/ 21049:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";

// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.40.0/node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__(90767);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.40.0/node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(10474);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.40.0/node_modules/core-js/modules/es.error.cause.js
var es_error_cause = __webpack_require__(59952);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.40.0/node_modules/core-js/modules/web.url-search-params.delete.js
var web_url_search_params_delete = __webpack_require__(4659);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.40.0/node_modules/core-js/modules/web.url-search-params.has.js
var web_url_search_params_has = __webpack_require__(43526);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.40.0/node_modules/core-js/modules/web.url-search-params.size.js
var web_url_search_params_size = __webpack_require__(9561);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.40.0/node_modules/core-js/modules/es.array.reduce.js
var es_array_reduce = __webpack_require__(51472);
;// ./Extension/pages/blocking/blocked/imported-script.js







(function polyfill() {
    const relList = document.createElement("link").relList;
    if (relList && relList.supports && relList.supports("modulepreload")) {
        return;
    }
    for (const link of document.querySelectorAll('link[rel="modulepreload"]')){
        processPreload(link);
    }
    new MutationObserver((mutations)=>{
        for (const mutation of mutations){
            if (mutation.type !== "childList") {
                continue;
            }
            for (const node of mutation.addedNodes){
                if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
            }
        }
    }).observe(document, {
        childList: true,
        subtree: true
    });
    function getFetchOpts(link) {
        const fetchOpts = {};
        if (link.integrity) fetchOpts.integrity = link.integrity;
        if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
        if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
        else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
        else fetchOpts.credentials = "same-origin";
        return fetchOpts;
    }
    function processPreload(link) {
        if (link.ep) return;
        link.ep = true;
        const fetchOpts = getFetchOpts(link);
        fetch(link.href, fetchOpts);
    }
})();
window.APP_NAME = "browser_extension";
window.PAGE_TYPE = "blocked";
class ThemeManager {
    _isThemeSupported(theme) {
        return Object.values(this._THEMES).includes(theme);
    }
    _storeTheme(theme) {
        if (this._isThemeSupported(theme)) {
            try {
                localStorage.setItem(this._STORAGE_KEY, theme);
            } catch  {}
        }
    }
    _setPageTheme(theme) {
        const changed = this._theme !== theme;
        if (theme === this._THEMES.dark || theme === this._THEMES.light) {
            document.documentElement.dataset.theme = theme;
            this._theme = theme;
            if (changed) {
                this._changeCallbacks.forEach((cb)=>cb(theme));
            }
        }
    }
    _detectSystemTheme() {
        const isSystemDarkMode = this._matchMedia.matches;
        const storedTheme = this.getStoredTheme();
        const isStoredDarkTheme = storedTheme === this._THEMES.dark;
        const isAutoTheme = storedTheme === this._THEMES.auto;
        if (isStoredDarkTheme || isAutoTheme && isSystemDarkMode) {
            this._setPageTheme(this._THEMES.dark);
        } else {
            this._setPageTheme(this._THEMES.light);
        }
    }
    getThemes() {
        return this._THEMES;
    }
    listenForDarkMode(event) {
        if (this.getStoredTheme() === this._THEMES.auto) {
            this._setPageTheme(event.matches ? this._THEMES.dark : this._THEMES.light);
        }
    }
    onThemeChange(cb) {
        this._changeCallbacks.push(cb);
    }
    // return the theme from storage. possible values for theme are: 'dark', 'light', and 'auto'.
    getStoredTheme() {
        try {
            const theme = localStorage.getItem(this._STORAGE_KEY);
            return this._isThemeSupported(theme) ? theme : this._THEMES.auto;
        } catch  {
            return this._THEMES.auto;
        }
    }
    // the switchTheme method switches the current theme to the given one. possible `theme` values are: 'dark', 'light' and 'auto'.
    switchTheme(theme) {
        if (this._isThemeSupported(theme)) {
            this._storeTheme(theme);
            if (theme === this._THEMES.auto) {
                this._detectSystemTheme(theme);
            } else {
                this._setPageTheme(theme);
            }
        }
    }
    // returns only dark/light - the current body color, not the selected preset
    getCurrentTheme() {
        if (typeof this._theme === "undefined") {
            throw new Error("call the init method first");
        }
        return this._theme;
    }
    // the init method adds the dark modifier to <html /> if required.
    init() {
        this._detectSystemTheme();
    }
    constructor(){
        this._matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
        this._matchMedia.addEventListener("change", this.listenForDarkMode.bind(this));
        this._STORAGE_KEY = "theme-name";
        this._THEMES = Object.freeze({
            auto: "auto",
            light: "light",
            dark: "dark"
        });
        this._changeCallbacks = [];
        this._theme = void 0;
    }
}
window.themeManager = new ThemeManager();
window.themeManager.init();
window.locales = {
    "ar": {
        "adgAccessBlockedTitle": "تم حظره بواسطة AdGuard",
        "extAccessBlockedDesc": "تم حظر الوصول إلى <strong id='adgAccessBlockedHost'></strong> بواسطة قاعدة الفلترة",
        "filter": "فلتر",
        "rule": "قاعدة",
        "proceedAnyway": "المتابعة على أية حال",
        "copy": "نسخ",
        "close": "إغلاق",
        "backBtn": "الرجوع للخلف",
        "adgAccessBlockedFaqTitle1": "كيفية إلغاء حظر هذا الموقع؟",
        "adgAccessBlockedFaqDesc1": "يمكنك <button type='button' id='adgAccessAllowToWhiteList'>إضافة هذا الموقع إلى القائمة المسموح بها</button>"
    },
    "cs": {
        "adgAccessBlockedTitle": "Přístup blokován AdGuardem",
        "extAccessBlockedDesc": "Přístup k <strong id='adgAccessBlockedHost'></strong> byl zablokován pravidlem filtrování",
        "filter": "Filtr",
        "rule": "Pravidlo",
        "proceedAnyway": "Přesto pokračovat",
        "copy": "Kopírovat",
        "close": "Zavřít",
        "backBtn": "Zpět",
        "adgAccessBlockedFaqTitle1": "Jak odblokovat tuto webovou stránku?",
        "adgAccessBlockedFaqDesc1": "Můžete <button type='button' id='adgAccessAllowToWhiteList'>přidat tuto webovou stránku na seznam povolených</button>"
    },
    "da": {
        "adgAccessBlockedTitle": "Adgang blokeret af AdGuard",
        "extAccessBlockedDesc": "Adgang til <strong id='adgAccessBlockedHost'></strong> blokeret af en filtreringsregel",
        "filter": "Filter",
        "rule": "Regel",
        "proceedAnyway": "Fortsæt alligevel",
        "copy": "Kopiér",
        "close": "Luk",
        "backBtn": "Gå tilbage",
        "adgAccessBlockedFaqTitle1": "Hvordan afblokeres dette websted?",
        "adgAccessBlockedFaqDesc1": "Man kan <button type='button' id='adgAccessAllowToWhiteList'>føje dette websted til hvidlisten</button>"
    },
    "de": {
        "adgAccessBlockedTitle": "Zugriff durch AdGuard blockiert",
        "extAccessBlockedDesc": "Der Zugriff auf <strong id='adgAccessBlockedHost'></strong> wurde durch eine Filterregel blockiert",
        "filter": "Filter",
        "rule": "Regel",
        "proceedAnyway": "Trotzdem fortfahren",
        "copy": "Kopieren",
        "close": "Schließen",
        "backBtn": "Zurück",
        "adgAccessBlockedFaqTitle1": "Wie entsperre ich diese Website?",
        "adgAccessBlockedFaqDesc1": "Sie können <button type='button' id='adgAccessAllowToWhiteList'>diese Website zur Liste der zulässigen Websites hinzufügen</button>"
    },
    "en": {
        "adgAccessBlockedTitle": "Access blocked by AdGuard",
        "extAccessBlockedDesc": "Access to <strong id='adgAccessBlockedHost'></strong> was blocked by a filtering rule",
        "filter": "Filter",
        "rule": "Rule",
        "proceedAnyway": "Proceed anyway",
        "copy": "Copy",
        "close": "Close",
        "backBtn": "Go back",
        "adgAccessBlockedFaqTitle1": "How to unblock this website?",
        "adgAccessBlockedFaqDesc1": "You can <button type='button' id='adgAccessAllowToWhiteList'>add this website to allowlist</button>"
    },
    "es": {
        "adgAccessBlockedTitle": "Acceso bloqueado por AdGuard",
        "extAccessBlockedDesc": "El acceso a <strong id='adgAccessBlockedHost'></strong> fue bloqueado por una regla de filtrado",
        "filter": "Filtro",
        "rule": "Regla",
        "proceedAnyway": "Continuar así mismo",
        "copy": "Copiar",
        "close": "Cerrar",
        "backBtn": "Volver",
        "adgAccessBlockedFaqTitle1": "¿Cómo desbloquear este sitio web?",
        "adgAccessBlockedFaqDesc1": "Puedes <button type='button' id='adgAccessAllowToWhiteList'>agregar este sitio web a la lista de permitidos</button>"
    },
    "fa": {
        "adgAccessBlockedTitle": "دسترسی به <strong>مسدود شده</strong> توسط AdGuard",
        "extAccessBlockedDesc": "دسترسی به <strong id='adgAccessBlockedHost'></strong> توسط یک رویه‌های پالایش مسدود شده است",
        "filter": "فیلتر",
        "rule": "رویه",
        "proceedAnyway": "در هر صورت ادامه یابد",
        "copy": "روگرفت",
        "close": "بستن",
        "backBtn": "برگرد",
        "adgAccessBlockedFaqTitle1": "چگونه می‌توان این تارنما را رفع انسداد کرد؟",
        "adgAccessBlockedFaqDesc1": "شما می‌توانید <button type='button' id='adgAccessAllowToWhiteList'>این تارنما را به فهرست سفید اضافه کنید</button>"
    },
    "fi": {
        "adgAccessBlockedTitle": "AdGuard esti pääsyn",
        "extAccessBlockedDesc": "Pääsy <strong id='adgAccessBlockedHost'></strong> estettiin suodatussäännöllä",
        "filter": "Suodatin",
        "rule": "Sääntö",
        "proceedAnyway": "Jatka silti",
        "copy": "Kopioi",
        "close": "Sulje",
        "backBtn": "Palaa takaisin",
        "adgAccessBlockedFaqTitle1": "Miten sallia tämä verkkosivusto?",
        "adgAccessBlockedFaqDesc1": "Voit <button type='button' id='adgAccessAllowToWhiteList'>lisätä tämän verkkosivuston hyväksyntäluetteloon</button>"
    },
    "fr": {
        "adgAccessBlockedTitle": "Accès bloqué par AdGuard",
        "extAccessBlockedDesc": "L'accès à <strong id='adgAccessBlockedHost'></strong> a été bloqué par une règle de filtrage",
        "filter": "Filtre",
        "rule": "Règle",
        "proceedAnyway": "Procéder malgré tout",
        "copy": "Copier",
        "close": "Fermer",
        "backBtn": "Retour",
        "adgAccessBlockedFaqTitle1": "Comment débloquer ce site web ?",
        "adgAccessBlockedFaqDesc1": "Vous pouvez <button type='button' id='adgAccessAllowToWhiteList'>ajouter ce site web à la liste d'autorisation</button>"
    },
    "id": {
        "adgAccessBlockedTitle": "Akses terblokir oleh AdGuard",
        "extAccessBlockedDesc": "Akses ke <strong id='adgAccessBlockedHost'></strong> diblokir oleh aturan pemfilteran",
        "filter": "Pemfilteran",
        "rule": "Aturan",
        "proceedAnyway": "Bagaimana pun juga lanjutkan",
        "copy": "Salin",
        "close": "Tutup",
        "backBtn": "Kembali",
        "adgAccessBlockedFaqTitle1": "Bagaimana cara membuka blokir situs ini?",
        "adgAccessBlockedFaqDesc1": "Anda dapat <button type='button' id='adgAccessAllowToWhiteList'>menambahkan situs web ini ke daftar izinkan</button>"
    },
    "it": {
        "adgAccessBlockedTitle": "Accesso bloccato da AdGuard",
        "extAccessBlockedDesc": "L'accesso a <strong id='adgAccessBlockedHost'></strong> è stato bloccato da una regola di filtraggio",
        "filter": "Filtro",
        "rule": "Regola",
        "proceedAnyway": "Procedi comunque",
        "copy": "Copia",
        "close": "Chiudi",
        "backBtn": "Torna indietro",
        "adgAccessBlockedFaqTitle1": "Come sbloccare questo sito web?",
        "adgAccessBlockedFaqDesc1": "Puoi <button type='button' id='adgAccessAllowToWhiteList'>aggiungere questo sito web alla lista consentita</button>"
    },
    "ja": {
        "adgAccessBlockedTitle": "AdGuard によってアクセスがブロックされています",
        "extAccessBlockedDesc": "フィルタリングルールによって <strong id='adgAccessBlockedHost'></strong> へのアクセスがブロックされました。",
        "filter": "フィルタ",
        "rule": "ルール",
        "proceedAnyway": "そのままリンクを開く",
        "copy": "コピー",
        "close": "閉じる",
        "backBtn": "戻る",
        "adgAccessBlockedFaqTitle1": "このウェブサイトのブロックを解除する方法は？",
        "adgAccessBlockedFaqDesc1": "<button type='button' id='adgAccessAllowToWhiteList'>このウェブサイトをホワイトリストに追加する</button>ことができます。"
    },
    "ko": {
        "adgAccessBlockedTitle": "AdGuard에 의해 차단됨",
        "extAccessBlockedDesc": "<strong id='adgAccessBlockedHost'></strong> 에 대한 액세스가 필터링 규칙에 의해 차단되었습니다.",
        "filter": "필터",
        "rule": "규칙",
        "proceedAnyway": "그래도 계속 진행",
        "copy": "복사",
        "close": "닫기",
        "backBtn": "뒤로 가기",
        "adgAccessBlockedFaqTitle1": "이 웹사이트 차단을 해제하는 방법은 무엇인가요?",
        "adgAccessBlockedFaqDesc1": "<button type='button' id='adgAccessAllowToWhiteList'>이 웹사이트를 허용 목록</button>에 추가할 수 있습니다."
    },
    "lt": {
        "adgAccessBlockedTitle": "Prieiga užblokuota AdGuard",
        "extAccessBlockedDesc": "Prieiga prie <strong id='adgAccessBlockedHost'></strong> buvo užblokuota pagal filtravimo taisyklę",
        "filter": "Filtras",
        "rule": "Taisyklė",
        "proceedAnyway": "Tęsti vis tiek",
        "copy": "Kopijuoti",
        "close": "Uždaryti",
        "backBtn": "Grįžti atgal",
        "adgAccessBlockedFaqTitle1": "Kaip atblokuoti šią svetainę?",
        "adgAccessBlockedFaqDesc1": "Galite <button type='button' id='adgAccessAllowToWhiteList'>pridėti šią svetainę į leidžiamų sąrašą</button>"
    },
    "pl": {
        "adgAccessBlockedTitle": "Dostęp zablokowany przez AdGuard",
        "extAccessBlockedDesc": "Dostęp do <strong id='adgAccessBlockedHost'></strong> został zablokowany przez regułę filtrowania",
        "filter": "Filtr",
        "rule": "Reguła",
        "proceedAnyway": "Mimo wszystko kontynuuj",
        "copy": "Kopiuj",
        "close": "Zamknij",
        "backBtn": "Wróć",
        "adgAccessBlockedFaqTitle1": "Jak odblokować tę stronę?",
        "adgAccessBlockedFaqDesc1": "Możesz <button type='button' id='adgAccessAllowToWhiteList'>dodać tę witrynę do listy dozwolonych</button>"
    },
    "pt-BR": {
        "adgAccessBlockedTitle": "Acesso bloqueado pelo AdGuard",
        "extAccessBlockedDesc": "O acesso a <strong id='adgAccessBlockedHost'></strong> foi bloqueado por uma regra de filtragem",
        "filter": "Filtro",
        "rule": "Regra",
        "proceedAnyway": "Continuar mesmo assim",
        "copy": "Copiar",
        "close": "Fechar",
        "backBtn": "Voltar",
        "adgAccessBlockedFaqTitle1": "Como desbloquear este site?",
        "adgAccessBlockedFaqDesc1": "Você pode <button type='button' id='adgAccessAllowToWhiteList'>adicionar este site à lista de permissões</button>"
    },
    "pt-PT": {
        "adgAccessBlockedTitle": "Acesso bloqueado pelo AdGuard",
        "extAccessBlockedDesc": "O acesso a <strong id='adgAccessBlockedHost'></strong> foi bloqueado por uma regra de filtragem",
        "filter": "Filtro",
        "rule": "Regra",
        "proceedAnyway": "Continuar mesmo assim",
        "copy": "Copiar",
        "close": "Fechar",
        "backBtn": "Voltar",
        "adgAccessBlockedFaqTitle1": "Como desbloquear este sítio Web?",
        "adgAccessBlockedFaqDesc1": "Pode <button type='button' id='adgAccessAllowToWhiteList'>adicionar este sítio Web à lista de permissões</button>"
    },
    "ru": {
        "adgAccessBlockedTitle": "Доступ заблокирован AdGuard",
        "extAccessBlockedDesc": "Доступ к <strong id='adgAccessBlockedHost'></strong> был заблокирован правилом фильтрации",
        "filter": "Фильтр",
        "rule": "Правило",
        "proceedAnyway": "Всё равно перейти",
        "copy": "Скопировать",
        "close": "Закрыть",
        "backBtn": "Назад",
        "adgAccessBlockedFaqTitle1": "Как разблокировать сайт?",
        "adgAccessBlockedFaqDesc1": "Вы можете <button type='button' id='adgAccessAllowToWhiteList'>добавить этот сайт в белый список</button>"
    },
    "sk": {
        "adgAccessBlockedTitle": "Prístup bol zablokovaný aplikáciou AdGuard",
        "extAccessBlockedDesc": "Prístup k <strong id='adgAccessBlockedHost'></strong> bol zablokovaný filtračným pravidlom",
        "filter": "Filter",
        "rule": "Pravidlo",
        "proceedAnyway": "Aj tak pokračovať",
        "copy": "Kopírovať",
        "close": "Zavrieť",
        "backBtn": "Naspäť",
        "adgAccessBlockedFaqTitle1": "Ako odblokovať túto webovú stránku?",
        "adgAccessBlockedFaqDesc1": "Môžete <button type='button' id='adgAccessAllowToWhiteList'>pridať túto webovú stránku do zoznamu povolených</button>"
    },
    "sl": {
        "adgAccessBlockedTitle": "Dostop blokira AdGuard",
        "extAccessBlockedDesc": "Dostop do <strong id='adgAccessBlockedHost'></strong> je bil blokiran s pravilom filtriranja",
        "filter": "Filtriraj",
        "rule": "Pravilo",
        "proceedAnyway": "Vseeno nadaljuj",
        "copy": "Kopiraj",
        "close": "Zapri",
        "backBtn": "Pojdi nazaj",
        "adgAccessBlockedFaqTitle1": "Kako znova omogočiti to spletno stran?",
        "adgAccessBlockedFaqDesc1": "Lahko <button type='button' id='adgAccessAllowToWhiteList'>dodate to spletno stran na dovoljen seznam</button>"
    },
    "sv": {
        "adgAccessBlockedTitle": "Åtkomst blockerad av AdGuard",
        "extAccessBlockedDesc": "Åtkomst till <strong id='adgAccessBlockedHost'></strong> blockerades av en filtreringsregel",
        "filter": "Filter",
        "rule": "Regel",
        "proceedAnyway": "Fortsätt ändå",
        "copy": "Kopiera",
        "close": "Stäng",
        "backBtn": "Gå tillbaka",
        "adgAccessBlockedFaqTitle1": "Hur avblockerar jag den här webbplatsen?",
        "adgAccessBlockedFaqDesc1": "Du kan <button type='button' id='adgAccessAllowToWhiteList'>lägga till den här webbplatsen i tillåtlistan</button>"
    },
    "tr": {
        "adgAccessBlockedTitle": "AdGuard tarafından erişim engellendi",
        "extAccessBlockedDesc": "<strong id='adgAccessBlockedHost'></strong> erişimi bir filtreleme kuralı tarafından engellendi",
        "filter": "Filtre",
        "rule": "Kural",
        "proceedAnyway": "Yine de devam et",
        "copy": "Kopyala",
        "close": "Kapat",
        "backBtn": "Geri dön",
        "adgAccessBlockedFaqTitle1": "Bu sitenin engeli nasıl kaldırılır?",
        "adgAccessBlockedFaqDesc1": "<button type='button' id='adgAccessAllowToWhiteList'>Bu siteyi izin listesine ekleyebilirsiniz</button>"
    },
    "uk": {
        "adgAccessBlockedTitle": "Доступ заблоковано AdGuard",
        "extAccessBlockedDesc": "Доступ до <strong id='adgAccessBlockedHost'></strong> заблоковано правилом фільтрації",
        "filter": "Фільтр",
        "rule": "Правило",
        "proceedAnyway": "Все одно продовжити",
        "copy": "Копіювати",
        "close": "Закрити",
        "backBtn": "Назад",
        "adgAccessBlockedFaqTitle1": "Як розблокувати сайт?",
        "adgAccessBlockedFaqDesc1": "Ви можете <button type='button' id='adgAccessAllowToWhiteList'>додати цей сайт до білого списку</button>"
    },
    "zh-CN": {
        "adgAccessBlockedTitle": "AdGuard 禁止访问",
        "extAccessBlockedDesc": "启用的过滤规则禁止访问 <strong id='adgAccessBlockedHost'></strong>",
        "filter": "过滤器",
        "rule": "规则",
        "proceedAnyway": "继续访问",
        "copy": "复制",
        "close": "关闭",
        "backBtn": "返回",
        "adgAccessBlockedFaqTitle1": "如何解除对此网站的拦截？",
        "adgAccessBlockedFaqDesc1": "您可以<button type='button' id='adgAccessAllowToWhiteList'>将此网站添加到白名单</button>"
    },
    "zh-TW": {
        "adgAccessBlockedTitle": "AdGuard 禁止存取",
        "extAccessBlockedDesc": "啟用的過濾規則禁止存取 <strong id='adgAccessBlockedHost'></strong>",
        "filter": "過濾器",
        "rule": "規則",
        "proceedAnyway": "仍要繼續",
        "copy": "複製",
        "close": "關閉",
        "backBtn": "返回",
        "adgAccessBlockedFaqTitle1": "如何解除對此網站的封鎖？",
        "adgAccessBlockedFaqDesc1": "您可以<button type='button' id='adgAccessAllowToWhiteList'>將此網站新增到允許清單</button>"
    }
};
let config = null;
const getConfig = ()=>{
    if (config) {
        return config;
    }
    config = {
        appName: window.APP_NAME,
        pageType: window.PAGE_TYPE,
        host: window.location.host
    };
    return config;
};
const getLocale = ()=>{
    const debugQueryParams = new URLSearchParams(window.location.search);
    const debugQueryLocale = debugQueryParams.get("_locale");
    if (debugQueryLocale) {
        return debugQueryLocale;
    }
    return navigator.language;
};
const resolveDictionary = ()=>{
    if (!window.locales || typeof window.locales !== "object") {
        console.error("Localization dictionaries not found in window.locales");
        return {};
    }
    const locale = getLocale();
    if (window.locales[locale]) {
        return window.locales[locale];
    }
    const lang = locale.split("-")[0];
    if (window.locales[lang]) {
        return window.locales[lang];
    }
    return window.locales["en"];
};
let dictionary = null;
const getDictionary = ()=>{
    if (dictionary) {
        return dictionary;
    }
    dictionary = resolveDictionary();
    return dictionary;
};
let placeholders = null;
const getPlaceholders = ()=>{
    if (placeholders) {
        return placeholders;
    }
    const config2 = getConfig();
    placeholders = {
        host: config2.host,
        reports_url: `https://link.adtidy.org/forward.html?action=site_report_page&domain=${config2.host}&from=${config2.pageType}&app=${config2.appName}`,
        dns_reports_new_issue_url: `https://link.adtidy.org/forward.html?action=report_issue&from=${config2.pageType}&app=${config2.appName}`,
        common_reports_new_issue_url: `https://link.adtidy.org/forward.html?action=report&from=${config2.pageType}&app=${config2.appName}`,
        adg_website_url: `https://link.adtidy.org/forward.html?action=adguard_site&from=${config2.pageType}&app=${config2.appName}`,
        vpn_website_url: `https://link.adtidy.org/forward.html?action=vpn_site&from=${config2.pageType}&app=${config2.appName}`,
        dns_website_url: `https://link.adtidy.org/forward.html?action=dns_site&from=${config2.pageType}&app=${config2.appName}`,
        dns_domain: "adguard-dns.io",
        user_rules_url: `https://link.adtidy.org/forward.html?action=dns_site_user_rules&from=${config2.pageType}&app=${config2.appName}`,
        locations_count: 65,
        users_count: "100",
        vpn_product_name: "AdGuard VPN"
    };
    return placeholders;
};
const translate = (id)=>{
    const dict = getDictionary();
    var _dict_id;
    return (_dict_id = dict[id]) !== null && _dict_id !== void 0 ? _dict_id : id;
};
const replacePlaceholders = (text)=>{
    if (!text) {
        return "";
    }
    const placeholders2 = getPlaceholders();
    return Object.entries(placeholders2).reduce((acc, [key, value])=>{
        return acc.replace(new RegExp(`%${key}%`, "g"), value);
    }, text);
};
const translateNode = (node)=>{
    if (!node || !node.dataset) {
        return;
    }
    const id = node.dataset.id;
    if (!id) {
        return;
    }
    const translated = replacePlaceholders(translate(id));
    if (node.tagName === "INPUT") {
        node.placeholder = translated;
    } else {
        node.innerHTML = translated;
    }
};
const initTranslations = ()=>{
    document.querySelectorAll("[data-id]").forEach(translateNode);
};
initTranslations();
function openModal(modal) {
    modal.classList.add("active");
}
function closeModal(modal) {
    modal.classList.remove("active");
}
function handleModalOpen(element, callback) {
    const modalId = element.dataset.modalId;
    const modal = document.getElementById(modalId);
    element.addEventListener("click", ()=>{
        if (modal) {
            callback();
            openModal(modal);
        }
    });
}
function initModals() {
    const modals = document.querySelectorAll(".js-modal");
    modals.forEach((modal)=>{
        modal.addEventListener("click", (event)=>{
            if (event.target === modal) {
                closeModal(modal);
            }
        });
        const closeButtons = modal.querySelectorAll(".js-modal-close");
        closeButtons.forEach((button)=>{
            button.addEventListener("click", (e)=>{
                closeModal(modal);
            });
        });
    });
}
initModals();
const notify = document.querySelector(".js-notify");
const notifySuccessText = document.querySelector(".js-notify-copy-text");
const notifyFailedText = document.querySelector(".js-notify-fail-text");
let notifyTimeout;
function closeNotify() {
    if (!notify) return;
    notify.classList.remove("active");
    if (notifyTimeout) {
        clearTimeout(notifyTimeout);
    }
}
function openNotify({ copied }) {
    if (!notify) return;
    notify.classList.remove("active");
    requestAnimationFrame(()=>{
        if (notifySuccessText && notifyFailedText) {
            notifySuccessText.style.display = copied ? "block" : "none";
            notifyFailedText.style.display = copied ? "none" : "block";
        }
        notify.classList.add("active");
    });
    if (notifyTimeout) {
        clearTimeout(notifyTimeout);
    }
    notifyTimeout = setTimeout(()=>{
        closeNotify();
    }, 3e3);
}
const notifyCloseButton = document.querySelector(".js-notify-close");
if (notifyCloseButton) {
    notifyCloseButton.addEventListener("click", closeNotify);
}
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(()=>openNotify({
            copied: true
        })).catch(()=>openNotify({
            copied: false
        }));
}
function handleCopy(copyButtons2) {
    copyButtons2.forEach((el)=>{
        const copyField = document.querySelector(`.${el.dataset.copyFieldClassname}`);
        el.addEventListener("click", ()=>{
            const text = copyField ? copyField.textContent : "";
            copyToClipboard(text);
        });
    });
}
const blockedUrlFieldText = document.getElementById("adgAccessBlockedUrl");
const blockingRuleFieldText = document.getElementById("adgAccessBlockingRule");
const openUrlModalButton = document.querySelector(".js-button-url-modal");
const modalUrlField = document.querySelector(".js-modal-url-field");
const openRuleModalButton = document.querySelector(".js-button-rule-modal");
const modalBlockingRuleField = document.querySelector(".js-modal-rule-field");
function handleAccessBlockedModals() {
    if (openUrlModalButton) {
        handleModalOpen(openUrlModalButton, ()=>{
            if (blockedUrlFieldText && blockedUrlFieldText.textContent && modalUrlField) {
                modalUrlField.textContent = blockedUrlFieldText.textContent;
            }
        });
    }
    if (openRuleModalButton) {
        handleModalOpen(openRuleModalButton, ()=>{
            if (blockingRuleFieldText && blockingRuleFieldText.textContent && modalBlockingRuleField) {
                modalBlockingRuleField.textContent = blockingRuleFieldText.textContent;
            }
        });
    }
}
handleAccessBlockedModals();
const copyButtons = document.querySelectorAll(".js-copy-button");
handleCopy(copyButtons);

// EXTERNAL MODULE: ./Extension/src/pages/services/messenger.ts
var messenger = __webpack_require__(87912);
// EXTERNAL MODULE: ./Extension/src/common/logger.ts
var logger = __webpack_require__(9659);
// EXTERNAL MODULE: ./Extension/src/pages/helpers.ts
var helpers = __webpack_require__(32111);
// EXTERNAL MODULE: ./Extension/src/common/settings.ts
var settings = __webpack_require__(49426);
;// ./Extension/pages/blocking/helpers.ts
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
 * Minimal value of `window.history.length` for a blocked page in MV3 —
 * when a new tab is opened (+1) and the blocked page is shown after redirection (+1).
 * That's why it is not usual `1` but `2`.
 */ const MIN_BLOCKED_PAGE_HISTORY_LENGTH_MV3 = 2;
/**
 * Map of AppearanceTheme to BlockingPagesSupportedTheme.
 */ const themeMap = new Map([
    [
        settings/* AppearanceTheme */.i0.System,
        "auto"
    ],
    [
        settings/* AppearanceTheme */.i0.Light,
        "light"
    ],
    [
        settings/* AppearanceTheme */.i0.Dark,
        "dark"
    ]
]);
/**
 * Updates the theme on the blocking page.
 *
 * @param theme Extension theme.
 */ const updateTheme = (theme)=>{
    var _themeMap_get;
    const blockingPageTheme = (_themeMap_get = themeMap.get(theme)) !== null && _themeMap_get !== void 0 ? _themeMap_get : "auto";
    window.themeManager.switchTheme(blockingPageTheme);
};
/**
 * Parses 'window.location.search' value passed as `locationSearch`.
 *
 * @param locationSearch Value of `window.location.search` to parse.
 *
 * @returns Object with parsed search parameters.
 */ const getParams = (locationSearch)=>{
    const urlSearchParams = new URLSearchParams(locationSearch);
    return Object.fromEntries(urlSearchParams.entries());
};
/**
 * Finds element by id on the page.
 *
 * @param elementId Id of the element to find.
 *
 * @returns Found element.
 *
 * @throws Error if element with id `elementId` is not found.
 */ const getElementById = (elementId)=>{
    const element = document.getElementById(elementId);
    if (!element) {
        throw new Error(`Element with id "${elementId}" not found`);
    }
    return element;
};
/**
 * Updates the text content of an element with the given ID.
 *
 * @param elementId The ID of the element to update.
 * @param text The text to set in the element.
 */ const updatePlaceholder = (elementId, text)=>{
    const element = getElementById(elementId);
    element.textContent = text;
};
/**
 * Goes back for MV2.
 */ const goBackMv2 = ()=>{
    window.history.back();
};
/**
 * Goes back for MV3.
 */ const goBackMv3 = ()=>{
    if (window.history.length > MIN_BLOCKED_PAGE_HISTORY_LENGTH_MV3) {
        try {
            window.history.go(-MIN_BLOCKED_PAGE_HISTORY_LENGTH_MV3);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.debug(`Error while going back: ${e instanceof Error ? e.message : e}`);
        }
    } else {
        window.close();
    }
};
/**
 * Adds listener to handle "Go back" button click.
 *
 * @param id The ID of the "Go back" button.
 */ const addGoBackButtonListener = (id)=>{
    const backBtn = getElementById(id);
    if (true) {
        backBtn.addEventListener('click', goBackMv3);
    } else {}
};

// EXTERNAL MODULE: ./Extension/src/common/translators/translator.ts
var translator = __webpack_require__(14717);
;// ./Extension/pages/blocking/blocked/loader.ts
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
const LOADER_ID = 'adg-loader-overlay';
/**
 * Creates a loader overlay element.
 *
 * @returns The created loader element
 */ const createLoader = ()=>{
    // Create main loader container with class 'loader'
    const loader = document.createElement('div');
    loader.id = LOADER_ID;
    loader.className = 'loader';
    loader.style.cursor = 'not-allowed';
    loader.style.zIndex = '9999';
    // The loader will automatically use CSS variables that respond to theme changes
    // Create background div with class 'loader__background'
    const background = document.createElement('div');
    background.className = 'loader__background';
    background.style.position = 'fixed';
    background.style.top = '0';
    background.style.left = '0';
    background.style.width = '100%';
    background.style.height = '100%';
    background.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    background.style.display = 'flex';
    background.style.justifyContent = 'center';
    background.style.alignItems = 'center';
    // Create container div with class 'loader__container'
    const container = document.createElement('div');
    container.className = 'loader__container';
    // Use CSS variables for theme-aware colors - make sure it's not transparent
    container.style.backgroundColor = 'var(--default-page-background)';
    container.style.height = '88px';
    container.style.minWidth = '243px';
    container.style.borderRadius = '8px';
    // Ensure container is not transparent
    container.style.opacity = '1';
    // Create content div with class 'loader__content'
    const content = document.createElement('div');
    content.className = 'loader__content';
    content.style.display = 'flex';
    content.style.justifyContent = 'center';
    content.style.alignItems = 'center';
    content.style.padding = '32px';
    const spinner = document.createElement('div');
    spinner.className = 'loader__spinner';
    spinner.style.width = '20px';
    spinner.style.height = '20px';
    spinner.style.border = '1px solid var(--product-primary-50)';
    spinner.style.borderRadius = '50%';
    spinner.style.borderTopColor = 'transparent';
    spinner.style.animation = 'adg-spin 1s linear infinite';
    const text = document.createElement('div');
    text.className = 'loader__text';
    text.style.fontSize = '16px';
    text.style.lineHeight = '21px';
    text.style.color = 'var(--default-labels)';
    text.style.paddingLeft = '16px';
    text.textContent = translator/* translator */.N.getMessage('options_loader_applying_changes');
    if (!document.getElementById('adg-loader-keyframes')) {
        const style = document.createElement('style');
        style.id = 'adg-loader-keyframes';
        style.textContent = `
            @keyframes adg-spin {
                to { transform: rotate(360deg); }
            }`;
        document.head.appendChild(style);
    }
    // Assemble the loader structure
    content.appendChild(spinner);
    content.appendChild(text);
    container.appendChild(content);
    background.appendChild(container);
    loader.appendChild(background);
    document.body.appendChild(loader);
    return loader;
};
/**
 * Shows or hides a loader overlay while waiting for a response.
 * This implementation matches the style of the Loader component from
 * src/pages/common/components/Loader/Loader.tsx and respects the current theme.
 *
 * @param show Whether to show the loader.
 */ const toggleLoader = (show)=>{
    // Check if loader already exists
    let loader = document.getElementById(LOADER_ID);
    // If loader should be hidden and it exists, hide it and return
    if (!show && loader) {
        loader.style.display = 'none';
        return;
    }
    // If loader should be shown and it doesn't exist, create it
    if (!loader) {
        loader = createLoader();
    } else {
        // Show existing loader
        loader.style.display = 'block';
    }
};

;// ./Extension/pages/blocking/blocked/page-handler.ts
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
 * Id of the "Proceed Anyway" button.
 */ const BLOCKED_PROCEED_ANYWAY_BTN_ID = 'adgAccessBlockedProceed';
/**
 * Id of the "Go Back" button.
 */ const BLOCKED_GO_BACK_BTN_ID = 'blockedPageBackBtn';
/**
 * Id of the "Add this site to Allowlist" button.
 */ const ADD_TO_ALLOWLIST_BTN_ID = 'adgAccessAllowToWhiteList';
/**
 * Id of the current host placeholder.
 */ const PLACEHOLDER_HOST_ID = 'adgAccessBlockedHost';
/**
 * Id of the "URL" placeholder.
 */ const PLACEHOLDER_URL_ID = 'adgAccessBlockedUrl';
/**
 * Id of the "Filter" placeholder to display filter name.
 */ const PLACEHOLDER_FILTER_ID = 'adgAccessBlockingFilterName';
/**
 * Id of the "Rule" placeholder.
 */ const PLACEHOLDER_RULE_ID = 'adgAccessBlockingRule';
/**
 * Updates the theme of the page.
 *
 * @param theme The theme to set.
 */ const page_handler_updateTheme = (theme)=>{
    // @ts-ignore
    window.themeManager.switchTheme(theme);
};
/**
 * Updates the placeholders of the page.
 *
 * @param data Data to set in the placeholders.
 * @param data.url URL to set in the placeholder.
 * @param data.filterName Filter name to set in the placeholder.
 * @param data.rule Rule to set in the placeholder.
 */ const updatePlaceholders = ({ url, filterName, rule })=>{
    updatePlaceholder(PLACEHOLDER_HOST_ID, new URL(url).host);
    updatePlaceholder(PLACEHOLDER_URL_ID, url);
    updatePlaceholder(PLACEHOLDER_FILTER_ID, filterName);
    updatePlaceholder(PLACEHOLDER_RULE_ID, rule);
};
/**
 * Adds listener to handle "Proceed Anyway" button click.
 *
 * @param url URL to add to trusted.
 */ const addProceedAnywayListener = async (url)=>{
    const proceedAnywayBtn = getElementById(BLOCKED_PROCEED_ANYWAY_BTN_ID);
    proceedAnywayBtn.addEventListener('click', async (e)=>{
        e.preventDefault();
        // Show the loader while waiting for the response in MV3
        toggleLoader(true);
        try {
            await messenger/* messenger */.ee.addUrlToTrusted(url);
            // Redirect to the trusted URL after successful response
            window.location.href = url;
        } catch (error) {
            logger/* logger */.v.info('[ext.page-handler]: Error adding URL to trusted:', error);
        }
    });
};
/**
 * Adds listener to handle "Add this site to allowlist" button click.
 *
 * Handles adding a domain (based on `url`) to the allowlist and proceeding to the page by `url`.
 *
 * @param url URL of blocked request.
 */ const addAddToAllowlistListener = async (url)=>{
    const addToAllowlistBtn = getElementById(ADD_TO_ALLOWLIST_BTN_ID);
    addToAllowlistBtn.addEventListener('click', async (e)=>{
        e.preventDefault();
        // Show the loader while waiting for the response in MV3
        toggleLoader(true);
        try {
            await messenger/* messenger */.ee.addAllowlistDomainForUrl(url);
            window.location.href = url;
        } catch (error) {
            logger/* logger */.v.info('[ext.page-handler]: Error adding domain to allowlist:', error);
        }
    });
};
/**
 * Runs the initialization of the blocked page handler:
 * - updates theme on the page;
 * - updates placeholders for url, filter name and rule;
 * - adds listener to handle "Proceed Anyway" button click;
 * - adds listener to handle "Go Back" button click (if needed).
 *
 * @param data Data to run the initialization.
 * @param data.response Data to initialize the page.
 * @param data.url URL of blocked page.
 * @param data.filterId Filter id of the rule that blocked the page.
 * @param data.rule Rule that blocked the page.
 */ const runInit = ({ response, url, filterId, rule })=>{
    const { filtersMetadata, theme } = response;
    let filterName = (0,helpers/* getFilterName */.mJ)(Number(filterId), filtersMetadata);
    if (!filterName) {
        logger/* logger */.v.debug(`[ext.page-handler]: cannot get filter name for filterId "${filterId}", filterId will be displayed instead.`);
        filterName = filterId;
    }
    page_handler_updateTheme(theme);
    updatePlaceholders({
        url,
        filterName,
        rule
    });
    addProceedAnywayListener(url);
    addAddToAllowlistListener(url);
    addGoBackButtonListener(BLOCKED_GO_BACK_BTN_ID);
};
/**
 * Initializes the blocked by rules page handler.
 */ const initBlockedPageHandler = async ()=>{
    const { url, filterId, rule } = getParams(window.location.search);
    if (!url) {
        logger/* logger */.v.error(`[ext.page-handler]: cannot parse "url" param in page url: ${window.location.href}`);
        return;
    }
    if (!filterId) {
        logger/* logger */.v.error(`[ext.page-handler]: cannot parse "filterId" param in page url: ${window.location.href}`);
        return;
    }
    if (!rule) {
        logger/* logger */.v.error(`[ext.page-handler]: cannot parse "rule" param in page url: ${window.location.href}`);
        return;
    }
    const response = await messenger/* messenger */.ee.initializeBlockingPageScript();
    if (document.readyState === 'loading') {
        const listener = ()=>{
            runInit({
                response,
                url,
                filterId,
                rule
            });
            document.removeEventListener('DOMContentLoaded', listener);
        };
        document.addEventListener('DOMContentLoaded', listener);
    } else {
        runInit({
            response,
            url,
            filterId,
            rule
        });
    }
};

;// ./Extension/pages/blocking/blocked/index.ts
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

initBlockedPageHandler();


/***/ }),

/***/ 84425:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

/***/ 22221:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ BrowserStorage)
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
        _define_property(this, "storage", void 0);
        this.storage = storage;
    }
}


/***/ }),

/***/ 44851:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ HybridStorage)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(51472);
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(72968);
/* harmony import */ var superjson__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(85744);
/* harmony import */ var idb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(44199);
/* harmony import */ var _browser_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22221);
/* harmony import */ var _idb_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(27904);
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
        return storage instanceof _idb_storage__WEBPACK_IMPORTED_MODULE_3__/* .IDBStorage */ .l;
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
            this.storage = new _idb_storage__WEBPACK_IMPORTED_MODULE_3__/* .IDBStorage */ .l();
        } else {
            this.storage = new _browser_storage__WEBPACK_IMPORTED_MODULE_4__/* .BrowserStorage */ .s(this.fallbackStorage);
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
                const testDbName = `${HybridStorage.TEST_IDB_NAME_PREFIX}${(0,nanoid__WEBPACK_IMPORTED_MODULE_5__/* .nanoid */ .Ak)()}`;
                const testDb = await (0,idb__WEBPACK_IMPORTED_MODULE_2__/* .openDB */ .P2)(testDbName, HybridStorage.TEST_IDB_VERSION);
                testDb.close();
                await (0,idb__WEBPACK_IMPORTED_MODULE_2__/* .deleteDB */ .MR)(testDbName);
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
            const serialized = superjson__WEBPACK_IMPORTED_MODULE_1__/* .SuperJSON */ .mb.serialize(value);
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
     */ _define_property(this, "storage", null);
        /**
     * The storage area to use when IndexedDB is not supported.
     */ _define_property(this, "fallbackStorage", void 0);
        this.fallbackStorage = fallbackStorage;
    }
}
/**
     * A flag indicating whether IndexedDB support has already been checked.
     */ _define_property(HybridStorage, "isIDBCapabilityChecked", false);
/**
     * A promise that resolves to whether IndexedDB is supported in the environment.
     * This promise is used to cache the result of the support check to prevent multiple checks.
     */ _define_property(HybridStorage, "idbCapabilityCheckerPromise", null);
/**
     * A flag that stores the result of the IndexedDB support check.
     * If true, IndexedDB is supported in the environment.
     */ _define_property(HybridStorage, "idbSupported", false);
/**
     * Prefix for the test IndexedDB database name.
     * This test database is used to check if IndexedDB is supported in the current environment.
     */ _define_property(HybridStorage, "TEST_IDB_NAME_PREFIX", 'test_');
/**
     * Version number for the test IndexedDB database.
     */ _define_property(HybridStorage, "TEST_IDB_VERSION", 1);
/**
     * The key used to store metadata in SuperJSON-serialized data.
     */ _define_property(HybridStorage, "SUPERJSON_META_KEY", 'meta');
/**
     * Serializes the given data using SuperJSON.
     *
     * @param data The data to serialize.
     *
     * @returns The serialized data.
     */ _define_property(HybridStorage, "serialize", (data)=>superjson__WEBPACK_IMPORTED_MODULE_1__/* .SuperJSON */ .mb.serialize(data));
/**
     * Deserializes the given data using SuperJSON.
     *
     * @param data The data to deserialize.
     *
     * @returns The deserialized data.
     */ _define_property(HybridStorage, "deserialize", (data)=>superjson__WEBPACK_IMPORTED_MODULE_1__/* .SuperJSON */ .mb.deserialize(data));


/***/ }),

/***/ 27904:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ IDBStorage)
/* harmony export */ });
/* harmony import */ var idb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(44199);
/* harmony import */ var _common_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9659);
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
            this.db = await (0,idb__WEBPACK_IMPORTED_MODULE_0__/* .openDB */ .P2)(this.name, this.version, {
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
            _common_logger__WEBPACK_IMPORTED_MODULE_1__/* .logger */ .v.error('[ext.IDBStorage.setMultiple]: error while setting multiple keys in the storage:', e);
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
            _common_logger__WEBPACK_IMPORTED_MODULE_1__/* .logger */ .v.error('[ext.IDBStorage.removeMultiple]: error while removing multiple keys from the storage:', e);
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
     */ _define_property(this, "db", null);
        /**
     * Promise to get IndexedDB database.
     */ _define_property(this, "dbGetterPromise", null);
        /**
     * The name of the database.
     */ _define_property(this, "name", void 0);
        /**
     * The version of the database. Used for upgrades.
     */ _define_property(this, "version", void 0);
        /**
     * The name of the store within the database.
     */ _define_property(this, "store", void 0);
        this.name = name;
        this.version = version;
        this.store = store;
    }
}
/**
     * The default name of the store within the database.
     */ _define_property(IDBStorage, "DEFAULT_STORE_NAME", 'defaultStore');
/**
     * The default version of the database.
     */ _define_property(IDBStorage, "DEFAULT_IDB_VERSION", 1);
/**
     * The default name of the database.
     */ _define_property(IDBStorage, "DEFAULT_IDB_NAME", 'adguardIDB');


/***/ }),

/***/ 54497:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ browserStorage)
/* harmony export */ });
/* unused harmony export hybridStorage */
/* harmony import */ var core_js_modules_web_self_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91219);
/* harmony import */ var core_js_modules_web_self_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_self_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7967);
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _browser_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22221);
/* harmony import */ var _hybrid_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(44851);
/* harmony import */ var _idb_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(27904);
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
 */ const browserStorage = new _browser_storage__WEBPACK_IMPORTED_MODULE_4__/* .BrowserStorage */ .s((webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().storage).local);
/**
 * Storage instance for accessing `IndexedDB` with fallback to `browser.storage.local`.
 */ const hybridStorage = new _hybrid_storage__WEBPACK_IMPORTED_MODULE_2__/* .HybridStorage */ .w((webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().storage).local);
// Expose storage instances to the global scope for debugging purposes,
// because it's hard to access them from the console in the background
// page or impossible from Application tab -> IndexedDB (showing empty page).
if (false) {}


/***/ }),

/***/ 33926:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 9659:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v: () => (/* binding */ logger)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(90767);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_self_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(91219);
/* harmony import */ var core_js_modules_web_self_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_self_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _adguard_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52421);
/* harmony import */ var _background_storages_shared_instances__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54497);
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
 * Extended logger with persistent log level setting.
 * Extends the base Logger class with browser storage integration
 * for saving and retrieving log level preferences.
 */ class ExtendedLogger extends _adguard_logger__WEBPACK_IMPORTED_MODULE_2__/* .Logger */ .Vy {
    /**
     * Checks if the current log level is verbose (Debug or Verbose).
     *
     * This method is useful for determining if detailed logging should
     * be enabled across the application in different modules. Some kind of
     * "single point of truth".
     *
     * @returns True if current log level is Debug or Verbose, false otherwise.
     */ isVerbose() {
        return this.currentLevel === _adguard_logger__WEBPACK_IMPORTED_MODULE_2__/* .LogLevel */ .$b.Debug || this.currentLevel === _adguard_logger__WEBPACK_IMPORTED_MODULE_2__/* .LogLevel */ .$b.Verbose;
    }
    /**
     * Sets log with persistent value, which will be saved, if
     * browser.storage.local is available.
     *
     * @param level Log level to set.
     */ setLogLevel(level) {
        this.currentLevel = level;
        _background_storages_shared_instances__WEBPACK_IMPORTED_MODULE_3__/* .browserStorage */ .g.set(ExtendedLogger.LOG_LEVEL_LOCAL_STORAGE_KEY, level).catch((error)=>{
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
        return typeof value === 'string' && Object.values(_adguard_logger__WEBPACK_IMPORTED_MODULE_2__/* .LogLevel */ .$b).includes(value);
    }
    /**
     * Initializes the logger by loading the saved log level from browser storage.
     * Falls back to the default log level if retrieval fails or the stored level is invalid.
     *
     * @returns Promise that resolves when initialization is complete.
     */ async init() {
        try {
            const logLevel = await _background_storages_shared_instances__WEBPACK_IMPORTED_MODULE_3__/* .browserStorage */ .g.get(ExtendedLogger.LOG_LEVEL_LOCAL_STORAGE_KEY);
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
     */ _define_property(ExtendedLogger, "LOG_LEVEL_LOCAL_STORAGE_KEY", 'log-level');
/**
     * Default log level based on the build configuration.
     */ _define_property(ExtendedLogger, "DEFAULT_LOG_LEVEL",  true ? _adguard_logger__WEBPACK_IMPORTED_MODULE_2__/* .LogLevel */ .$b.Info : 0);
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



/***/ }),

/***/ 35977:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

/***/ 33043:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ i18n)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59952);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7967);
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__);
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

const BASE_LOCALE = 'en';
const baseMessages = __webpack_require__(21987);
const uiLanguage = webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().i18n.getUILanguage();
/**
 * Retrieves the localized message for the given key.
 *
 * @param key - The key corresponding to the message in the localization files
 *
 * @returns The localized message, or an empty string if the message is the same as the base locale (indicating no
 * translation)
 *
 * @throws {Error} If there is no such key in the messages
 */ const getMessage = (key)=>{
    const receivedMessage = webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().i18n.getMessage(key);
    if (uiLanguage !== BASE_LOCALE) {
        var _baseMessages_key;
        const baseMessage = (_baseMessages_key = baseMessages[key]) === null || _baseMessages_key === void 0 ? void 0 : _baseMessages_key.message;
        if (!baseMessage) {
            throw new Error(`There is no such key "${key}" in the messages`);
        }
        // The same strings mean that the message is not translated.
        // We return an empty string for @adguard/translator to fall back to the base message and base locale.
        // Without this, browser.i18n.getMessage returns the base locale message and the wrong UI language,
        // and @adguard/translator fails on plural forms validations.
        if (receivedMessage === baseMessage) {
            return '';
        }
    }
    return receivedMessage;
};
const i18n = {
    getMessage,
    /**
     * Retrieves the UI language, truncated to a 2-letter code.
     * This is because react translator supports only 2-letter codes.
     *
     * @returns The 2-letter UI language code
     */ getUILanguage: ()=>{
        return uiLanguage.substring(0, 2);
    },
    getBaseMessage: (key)=>{
        // thus we can test the base messages with keys without translations
        if (false) {}
        return webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().i18n.getMessage(key);
    },
    getBaseUILanguage: ()=>BASE_LOCALE
};


/***/ }),

/***/ 14717:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ translator)
/* harmony export */ });
/* harmony import */ var _adguard_translate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59840);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33043);
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
 * Retrieves localized message by key, formats it and converts into string
 */ const translator = _adguard_translate__WEBPACK_IMPORTED_MODULE_0__/* .translate */ .Tl.createTranslator(_i18n__WEBPACK_IMPORTED_MODULE_1__/* .i18n */ .R);


/***/ }),

/***/ 90852:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ UserAgent)
/* harmony export */ });
/* harmony import */ var ua_parser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(92976);
/* harmony import */ var ua_parser_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ua_parser_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7967);
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(71723);
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
            const { os } = await webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().runtime.getPlatformInfo();
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
_define_property(UserAgent, "parser", new (ua_parser_js__WEBPACK_IMPORTED_MODULE_0___default())(navigator.userAgent));
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
_define_property(UserAgent, "isSupportedBrowser", UserAgent.isChrome && Number(UserAgent.version) >= _constants__WEBPACK_IMPORTED_MODULE_2__/* .MIN_SUPPORTED_VERSION */ .DV.CHROMIUM_MV2 || UserAgent.isEdgeChromium && Number(UserAgent.version) >= _constants__WEBPACK_IMPORTED_MODULE_2__/* .MIN_SUPPORTED_VERSION */ .DV.EDGE_CHROMIUM || UserAgent.isFirefox && Number(UserAgent.version) >= _constants__WEBPACK_IMPORTED_MODULE_2__/* .MIN_SUPPORTED_VERSION */ .DV.FIREFOX || UserAgent.isFirefoxMobile && Number(UserAgent.version) >= _constants__WEBPACK_IMPORTED_MODULE_2__/* .MIN_SUPPORTED_VERSION */ .DV.FIREFOX_MOBILE || UserAgent.isOpera && Number(UserAgent.version) >= _constants__WEBPACK_IMPORTED_MODULE_2__/* .MIN_SUPPORTED_VERSION */ .DV.OPERA);
_define_property(UserAgent, "browserName", UserAgent.getBrowserName());


/***/ }),

/***/ 52299:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 41459:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 32111:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 87912:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 71723:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DV: () => (/* binding */ MIN_SUPPORTED_VERSION)
/* harmony export */ });
/* unused harmony exports WEB_ACCESSIBLE_RESOURCES_OUTPUT, WEB_ACCESSIBLE_RESOURCES_OUTPUT_REDIRECTS, BACKGROUND_OUTPUT, OPTIONS_OUTPUT, POPUP_OUTPUT, FILTERING_LOG_OUTPUT, POST_INSTALL_OUTPUT, FULLSCREEN_USER_RULES_OUTPUT, BLOCKING_BLOCKED_OUTPUT, BLOCKING_SAFEBROWSING_OUTPUT, SUBSCRIBE_OUTPUT, CONTENT_SCRIPT_START_OUTPUT, CONTENT_SCRIPT_END_OUTPUT, THANKYOU_OUTPUT, ASSISTANT_INJECT_OUTPUT, GPC_SCRIPT_OUTPUT, HIDE_DOCUMENT_REFERRER_OUTPUT, DEVTOOLS_OUTPUT, DEVTOOLS_ELEMENT_SIDEBAR_OUTPUT, SHARED_EDITOR_OUTPUT, REACT_VENDOR_OUTPUT, MOBX_VENDOR_OUTPUT, XSTATE_VENDOR_OUTPUT, TSURLFILTER_VENDOR_OUTPUT, TSURLFILTER_DECLARATIVE_CONVERTER_VENDOR_OUTPUT, AGTREE_VENDOR_OUTPUT, CSS_TOKENIZER_VENDOR_OUTPUT, TSWEBEXTENSION_VENDOR_OUTPUT, TEXT_ENCODING_POLYFILL_VENDOR_OUTPUT, SCRIPTLETS_VENDOR_OUTPUT, REMOTE_METADATA_FILE_NAME, REMOTE_I18N_METADATA_FILE_NAME, LOCAL_METADATA_FILE_NAME, LOCAL_I18N_METADATA_FILE_NAME, INDEX_HTML_FILE_NAME, ADGUARD_FILTERS_IDS, BuildTargetEnv, ExtensionsIds */
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

/***/ 17303:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

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

/***/ 56381:
/***/ ((module) => {

"use strict";

var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
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

/***/ 52176:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classof = __webpack_require__(632);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) === 'Array';
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

/***/ 34356:
/***/ ((module) => {

"use strict";

var $TypeError = TypeError;

module.exports = function (passed, required) {
  if (passed < required) throw new $TypeError('Not enough arguments');
  return passed;
};


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

/***/ 10474:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

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


/***/ }),

/***/ 4659:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

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

"use strict";

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

"use strict";

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

/***/ 52421:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $b: () => (/* binding */ LogLevel),
/* harmony export */   Vy: () => (/* binding */ Logger),
/* harmony export */   u1: () => (/* binding */ getErrorMessage)
/* harmony export */ });
/* unused harmony export LogMethod */
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




/***/ }),

/***/ 16731:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ copy)
/* harmony export */ });
/* harmony import */ var is_what__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(79075);


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
  if ((0,is_what__WEBPACK_IMPORTED_MODULE_0__/* .isArray */ .cy)(target)) {
    return target.map((item) => copy(item, options));
  }
  if (!(0,is_what__WEBPACK_IMPORTED_MODULE_0__/* .isPlainObject */ .Qd)(target)) {
    return target;
  }
  const props = Object.getOwnPropertyNames(target);
  const symbols = Object.getOwnPropertySymbols(target);
  return [...props, ...symbols].reduce((carry, key) => {
    if ((0,is_what__WEBPACK_IMPORTED_MODULE_0__/* .isArray */ .cy)(options.props) && !options.props.includes(key)) {
      return carry;
    }
    const val = target[key];
    const newVal = copy(val, options);
    assignProp(carry, key, newVal, target, options.nonenumerable);
    return carry;
  }, {});
}




/***/ }),

/***/ 44199:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MR: () => (/* binding */ deleteDB),
/* harmony export */   P2: () => (/* binding */ openDB)
/* harmony export */ });
/* unused harmony exports unwrap, wrap */
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




/***/ }),

/***/ 79075:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Qd: () => (/* binding */ isPlainObject),
/* harmony export */   cy: () => (/* binding */ isArray)
/* harmony export */ });
/* unused harmony exports getType, isAnyObject, isBlob, isBoolean, isDate, isEmptyArray, isEmptyObject, isEmptyString, isError, isFile, isFullArray, isFullObject, isFullString, isFunction, isInstanceOf, isMap, isNaNValue, isNegativeNumber, isNull, isNullOrUndefined, isNumber, isObject, isObjectLike, isOneOf, isPositiveNumber, isPrimitive, isPromise, isRegExp, isSet, isString, isSymbol, isType, isUndefined, isWeakMap, isWeakSet */
function getType(payload) {
  return Object.prototype.toString.call(payload).slice(8, -1);
}

function isAnyObject(payload) {
  return getType(payload) === "Object";
}

function isArray(payload) {
  return getType(payload) === "Array";
}

function isBlob(payload) {
  return getType(payload) === "Blob";
}

function isBoolean(payload) {
  return getType(payload) === "Boolean";
}

function isDate(payload) {
  return getType(payload) === "Date" && !isNaN(payload);
}

function isEmptyArray(payload) {
  return isArray(payload) && payload.length === 0;
}

function isPlainObject(payload) {
  if (getType(payload) !== "Object")
    return false;
  const prototype = Object.getPrototypeOf(payload);
  return !!prototype && prototype.constructor === Object && prototype === Object.prototype;
}

function isEmptyObject(payload) {
  return isPlainObject(payload) && Object.keys(payload).length === 0;
}

function isEmptyString(payload) {
  return payload === "";
}

function isError(payload) {
  return getType(payload) === "Error" || payload instanceof Error;
}

function isFile(payload) {
  return getType(payload) === "File";
}

function isFullArray(payload) {
  return isArray(payload) && payload.length > 0;
}

function isFullObject(payload) {
  return isPlainObject(payload) && Object.keys(payload).length > 0;
}

function isString(payload) {
  return getType(payload) === "String";
}

function isFullString(payload) {
  return isString(payload) && payload !== "";
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
  return getType(payload) === name || Boolean(payload && payload.constructor === type);
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
      if (getType(p) === classOrClassName) {
        return true;
      }
    }
    return false;
  }
}

function isMap(payload) {
  return getType(payload) === "Map";
}

function isNaNValue(payload) {
  return getType(payload) === "Number" && isNaN(payload);
}

function isNumber(payload) {
  return getType(payload) === "Number" && !isNaN(payload);
}

function isNegativeNumber(payload) {
  return isNumber(payload) && payload < 0;
}

function isNull(payload) {
  return getType(payload) === "Null";
}

function isOneOf(a, b, c, d, e) {
  return (value) => a(value) || b(value) || !!c && c(value) || !!d && d(value) || !!e && e(value);
}

function isUndefined(payload) {
  return getType(payload) === "Undefined";
}

const isNullOrUndefined = isOneOf(isNull, isUndefined);

function isObject(payload) {
  return isPlainObject(payload);
}

function isObjectLike(payload) {
  return isAnyObject(payload);
}

function isPositiveNumber(payload) {
  return isNumber(payload) && payload > 0;
}

function isSymbol(payload) {
  return getType(payload) === "Symbol";
}

function isPrimitive(payload) {
  return isBoolean(payload) || isNull(payload) || isUndefined(payload) || isNumber(payload) || isString(payload) || isSymbol(payload);
}

function isPromise(payload) {
  return getType(payload) === "Promise";
}

function isRegExp(payload) {
  return getType(payload) === "RegExp";
}

function isSet(payload) {
  return getType(payload) === "Set";
}

function isWeakMap(payload) {
  return getType(payload) === "WeakMap";
}

function isWeakSet(payload) {
  return getType(payload) === "WeakSet";
}




/***/ }),

/***/ 72968:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ak: () => (/* binding */ nanoid)
/* harmony export */ });
/* unused harmony exports customAlphabet, customRandom, random */

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



/***/ }),

/***/ 3046:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ getDeep),
/* harmony export */   v: () => (/* binding */ setDeep)
/* harmony export */ });
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17894);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85434);


const getNthKey = (value, n) => {
    const keys = value.keys();
    while (n > 0) {
        keys.next();
        n--;
    }
    return keys.next().value;
};
function validatePath(path) {
    if ((0,_util_js__WEBPACK_IMPORTED_MODULE_0__/* .includes */ .mK)(path, '__proto__')) {
        throw new Error('__proto__ is not allowed as a property');
    }
    if ((0,_util_js__WEBPACK_IMPORTED_MODULE_0__/* .includes */ .mK)(path, 'prototype')) {
        throw new Error('prototype is not allowed as a property');
    }
    if ((0,_util_js__WEBPACK_IMPORTED_MODULE_0__/* .includes */ .mK)(path, 'constructor')) {
        throw new Error('constructor is not allowed as a property');
    }
}
const getDeep = (object, path) => {
    validatePath(path);
    for (let i = 0; i < path.length; i++) {
        const key = path[i];
        if ((0,_is_js__WEBPACK_IMPORTED_MODULE_1__/* .isSet */ .vM)(object)) {
            object = getNthKey(object, +key);
        }
        else if ((0,_is_js__WEBPACK_IMPORTED_MODULE_1__/* .isMap */ .jh)(object)) {
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
        if ((0,_is_js__WEBPACK_IMPORTED_MODULE_1__/* .isArray */ .cy)(parent)) {
            const index = +key;
            parent = parent[index];
        }
        else if ((0,_is_js__WEBPACK_IMPORTED_MODULE_1__/* .isPlainObject */ .Qd)(parent)) {
            parent = parent[key];
        }
        else if ((0,_is_js__WEBPACK_IMPORTED_MODULE_1__/* .isSet */ .vM)(parent)) {
            const row = +key;
            parent = getNthKey(parent, row);
        }
        else if ((0,_is_js__WEBPACK_IMPORTED_MODULE_1__/* .isMap */ .jh)(parent)) {
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
    if ((0,_is_js__WEBPACK_IMPORTED_MODULE_1__/* .isArray */ .cy)(parent)) {
        parent[+lastKey] = mapper(parent[+lastKey]);
    }
    else if ((0,_is_js__WEBPACK_IMPORTED_MODULE_1__/* .isPlainObject */ .Qd)(parent)) {
        parent[lastKey] = mapper(parent[lastKey]);
    }
    if ((0,_is_js__WEBPACK_IMPORTED_MODULE_1__/* .isSet */ .vM)(parent)) {
        const oldValue = getNthKey(parent, +lastKey);
        const newValue = mapper(oldValue);
        if (oldValue !== newValue) {
            parent.delete(oldValue);
            parent.add(newValue);
        }
    }
    if ((0,_is_js__WEBPACK_IMPORTED_MODULE_1__/* .isMap */ .jh)(parent)) {
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


/***/ }),

/***/ 11486:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ ClassRegistry)
/* harmony export */ });
/* harmony import */ var _registry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11665);

class ClassRegistry extends _registry_js__WEBPACK_IMPORTED_MODULE_0__/* .Registry */ .O {
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


/***/ }),

/***/ 43747:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ CustomTransformerRegistry)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85434);

class CustomTransformerRegistry {
    constructor() {
        this.transfomers = {};
    }
    register(transformer) {
        this.transfomers[transformer.name] = transformer;
    }
    findApplicable(v) {
        return (0,_util_js__WEBPACK_IMPORTED_MODULE_0__/* .find */ .I6)(this.transfomers, transformer => transformer.isApplicable(v));
    }
    findByName(name) {
        return this.transfomers[name];
    }
}


/***/ }),

/***/ 87613:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ DoubleIndexedKV)
/* harmony export */ });
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


/***/ }),

/***/ 85744:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mb: () => (/* binding */ SuperJSON)
/* harmony export */ });
/* unused harmony exports default, serialize, deserialize, stringify, parse, registerClass, registerCustom, registerSymbol, allowErrorProps */
/* harmony import */ var _class_registry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11486);
/* harmony import */ var _registry_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11665);
/* harmony import */ var _custom_transformer_registry_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(43747);
/* harmony import */ var _plainer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67379);
/* harmony import */ var copy_anything__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(16731);





class SuperJSON {
    /**
     * @param dedupeReferentialEqualities  If true, SuperJSON will make sure only one instance of referentially equal objects are serialized and the rest are replaced with `null`.
     */
    constructor({ dedupe = false, } = {}) {
        this.classRegistry = new _class_registry_js__WEBPACK_IMPORTED_MODULE_0__/* .ClassRegistry */ ._();
        this.symbolRegistry = new _registry_js__WEBPACK_IMPORTED_MODULE_2__/* .Registry */ .O(s => s.description ?? '');
        this.customTransformerRegistry = new _custom_transformer_registry_js__WEBPACK_IMPORTED_MODULE_3__/* .CustomTransformerRegistry */ .u();
        this.allowedErrorProps = [];
        this.dedupe = dedupe;
    }
    serialize(object) {
        const identities = new Map();
        const output = (0,_plainer_js__WEBPACK_IMPORTED_MODULE_1__/* .walker */ .jc)(object, identities, this, this.dedupe);
        const res = {
            json: output.transformedValue,
        };
        if (output.annotations) {
            res.meta = {
                ...res.meta,
                values: output.annotations,
            };
        }
        const equalityAnnotations = (0,_plainer_js__WEBPACK_IMPORTED_MODULE_1__/* .generateReferentialEqualityAnnotations */ .b$)(identities, this.dedupe);
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
        let result = (0,copy_anything__WEBPACK_IMPORTED_MODULE_4__/* .copy */ .C)(json);
        if (meta?.values) {
            result = (0,_plainer_js__WEBPACK_IMPORTED_MODULE_1__/* .applyValueAnnotations */ .m7)(result, meta.values, this);
        }
        if (meta?.referentialEqualities) {
            result = (0,_plainer_js__WEBPACK_IMPORTED_MODULE_1__/* .applyReferentialEqualityAnnotations */ .Kc)(result, meta.referentialEqualities);
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


/***/ }),

/***/ 17894:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $P: () => (/* binding */ isDate),
/* harmony export */   Bm: () => (/* binding */ isSymbol),
/* harmony export */   Dh: () => (/* binding */ isInfinite),
/* harmony export */   OH: () => (/* binding */ isBigint),
/* harmony export */   Qd: () => (/* binding */ isPlainObject),
/* harmony export */   RI: () => (/* binding */ isEmptyObject),
/* harmony export */   XS: () => (/* binding */ isNaNValue),
/* harmony export */   b0: () => (/* binding */ isUndefined),
/* harmony export */   bJ: () => (/* binding */ isError),
/* harmony export */   cy: () => (/* binding */ isArray),
/* harmony export */   gd: () => (/* binding */ isRegExp),
/* harmony export */   iu: () => (/* binding */ isTypedArray),
/* harmony export */   jh: () => (/* binding */ isMap),
/* harmony export */   mv: () => (/* binding */ isURL),
/* harmony export */   sO: () => (/* binding */ isPrimitive),
/* harmony export */   vM: () => (/* binding */ isSet)
/* harmony export */ });
/* unused harmony exports isNull, isString, isNumber, isBoolean */
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


/***/ }),

/***/ 14699:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FU: () => (/* binding */ stringifyPath),
/* harmony export */   Rr: () => (/* binding */ parsePath),
/* harmony export */   jv: () => (/* binding */ escapeKey)
/* harmony export */ });
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


/***/ }),

/***/ 67379:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Kc: () => (/* binding */ applyReferentialEqualityAnnotations),
/* harmony export */   b$: () => (/* binding */ generateReferentialEqualityAnnotations),
/* harmony export */   jc: () => (/* binding */ walker),
/* harmony export */   m7: () => (/* binding */ applyValueAnnotations)
/* harmony export */ });
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17894);
/* harmony import */ var _pathstringifier_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14699);
/* harmony import */ var _transformer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32095);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(85434);
/* harmony import */ var _accessDeep_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3046);






function traverse(tree, walker, origin = []) {
    if (!tree) {
        return;
    }
    if (!(0,_is_js__WEBPACK_IMPORTED_MODULE_1__/* .isArray */ .cy)(tree)) {
        (0,_util_js__WEBPACK_IMPORTED_MODULE_2__/* .forEach */ .jJ)(tree, (subtree, key) => traverse(subtree, walker, [...origin, ...(0,_pathstringifier_js__WEBPACK_IMPORTED_MODULE_3__/* .parsePath */ .Rr)(key)]));
        return;
    }
    const [nodeValue, children] = tree;
    if (children) {
        (0,_util_js__WEBPACK_IMPORTED_MODULE_2__/* .forEach */ .jJ)(children, (child, key) => {
            traverse(child, walker, [...origin, ...(0,_pathstringifier_js__WEBPACK_IMPORTED_MODULE_3__/* .parsePath */ .Rr)(key)]);
        });
    }
    walker(nodeValue, origin);
}
function applyValueAnnotations(plain, annotations, superJson) {
    traverse(annotations, (type, path) => {
        plain = (0,_accessDeep_js__WEBPACK_IMPORTED_MODULE_4__/* .setDeep */ .v)(plain, path, v => (0,_transformer_js__WEBPACK_IMPORTED_MODULE_0__/* .untransformValue */ .xp)(v, type, superJson));
    });
    return plain;
}
function applyReferentialEqualityAnnotations(plain, annotations) {
    function apply(identicalPaths, path) {
        const object = (0,_accessDeep_js__WEBPACK_IMPORTED_MODULE_4__/* .getDeep */ .b)(plain, (0,_pathstringifier_js__WEBPACK_IMPORTED_MODULE_3__/* .parsePath */ .Rr)(path));
        identicalPaths.map(_pathstringifier_js__WEBPACK_IMPORTED_MODULE_3__/* .parsePath */ .Rr).forEach(identicalObjectPath => {
            plain = (0,_accessDeep_js__WEBPACK_IMPORTED_MODULE_4__/* .setDeep */ .v)(plain, identicalObjectPath, () => object);
        });
    }
    if ((0,_is_js__WEBPACK_IMPORTED_MODULE_1__/* .isArray */ .cy)(annotations)) {
        const [root, other] = annotations;
        root.forEach(identicalPath => {
            plain = (0,_accessDeep_js__WEBPACK_IMPORTED_MODULE_4__/* .setDeep */ .v)(plain, (0,_pathstringifier_js__WEBPACK_IMPORTED_MODULE_3__/* .parsePath */ .Rr)(identicalPath), () => plain);
        });
        if (other) {
            (0,_util_js__WEBPACK_IMPORTED_MODULE_2__/* .forEach */ .jJ)(other, apply);
        }
    }
    else {
        (0,_util_js__WEBPACK_IMPORTED_MODULE_2__/* .forEach */ .jJ)(annotations, apply);
    }
    return plain;
}
const isDeep = (object, superJson) => (0,_is_js__WEBPACK_IMPORTED_MODULE_1__/* .isPlainObject */ .Qd)(object) ||
    (0,_is_js__WEBPACK_IMPORTED_MODULE_1__/* .isArray */ .cy)(object) ||
    (0,_is_js__WEBPACK_IMPORTED_MODULE_1__/* .isMap */ .jh)(object) ||
    (0,_is_js__WEBPACK_IMPORTED_MODULE_1__/* .isSet */ .vM)(object) ||
    (0,_transformer_js__WEBPACK_IMPORTED_MODULE_0__/* .isInstanceOfRegisteredClass */ .TT)(object, superJson);
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
            rootEqualityPaths = identicalPaths.map(_pathstringifier_js__WEBPACK_IMPORTED_MODULE_3__/* .stringifyPath */ .FU);
        }
        else {
            result[(0,_pathstringifier_js__WEBPACK_IMPORTED_MODULE_3__/* .stringifyPath */ .FU)(representativePath)] = identicalPaths.map(_pathstringifier_js__WEBPACK_IMPORTED_MODULE_3__/* .stringifyPath */ .FU);
        }
    });
    if (rootEqualityPaths) {
        if ((0,_is_js__WEBPACK_IMPORTED_MODULE_1__/* .isEmptyObject */ .RI)(result)) {
            return [rootEqualityPaths];
        }
        else {
            return [rootEqualityPaths, result];
        }
    }
    else {
        return (0,_is_js__WEBPACK_IMPORTED_MODULE_1__/* .isEmptyObject */ .RI)(result) ? undefined : result;
    }
}
const walker = (object, identities, superJson, dedupe, path = [], objectsInThisPath = [], seenObjects = new Map()) => {
    const primitive = (0,_is_js__WEBPACK_IMPORTED_MODULE_1__/* .isPrimitive */ .sO)(object);
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
        const transformed = (0,_transformer_js__WEBPACK_IMPORTED_MODULE_0__/* .transformValue */ .oV)(object, superJson);
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
    if ((0,_util_js__WEBPACK_IMPORTED_MODULE_2__/* .includes */ .mK)(objectsInThisPath, object)) {
        // prevent circular references
        return {
            transformedValue: null,
        };
    }
    const transformationResult = (0,_transformer_js__WEBPACK_IMPORTED_MODULE_0__/* .transformValue */ .oV)(object, superJson);
    const transformed = transformationResult?.value ?? object;
    const transformedValue = (0,_is_js__WEBPACK_IMPORTED_MODULE_1__/* .isArray */ .cy)(transformed) ? [] : {};
    const innerAnnotations = {};
    (0,_util_js__WEBPACK_IMPORTED_MODULE_2__/* .forEach */ .jJ)(transformed, (value, index) => {
        if (index === '__proto__' ||
            index === 'constructor' ||
            index === 'prototype') {
            throw new Error(`Detected property ${index}. This is a prototype pollution risk, please remove it from your object.`);
        }
        const recursiveResult = walker(value, identities, superJson, dedupe, [...path, index], [...objectsInThisPath, object], seenObjects);
        transformedValue[index] = recursiveResult.transformedValue;
        if ((0,_is_js__WEBPACK_IMPORTED_MODULE_1__/* .isArray */ .cy)(recursiveResult.annotations)) {
            innerAnnotations[index] = recursiveResult.annotations;
        }
        else if ((0,_is_js__WEBPACK_IMPORTED_MODULE_1__/* .isPlainObject */ .Qd)(recursiveResult.annotations)) {
            (0,_util_js__WEBPACK_IMPORTED_MODULE_2__/* .forEach */ .jJ)(recursiveResult.annotations, (tree, key) => {
                innerAnnotations[(0,_pathstringifier_js__WEBPACK_IMPORTED_MODULE_3__/* .escapeKey */ .jv)(index) + '.' + key] = tree;
            });
        }
    });
    const result = (0,_is_js__WEBPACK_IMPORTED_MODULE_1__/* .isEmptyObject */ .RI)(innerAnnotations)
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


/***/ }),

/***/ 11665:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ Registry)
/* harmony export */ });
/* harmony import */ var _double_indexed_kv_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(87613);

class Registry {
    constructor(generateIdentifier) {
        this.generateIdentifier = generateIdentifier;
        this.kv = new _double_indexed_kv_js__WEBPACK_IMPORTED_MODULE_0__/* .DoubleIndexedKV */ .Q();
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


/***/ }),

/***/ 32095:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TT: () => (/* binding */ isInstanceOfRegisteredClass),
/* harmony export */   oV: () => (/* binding */ transformValue),
/* harmony export */   xp: () => (/* binding */ untransformValue)
/* harmony export */ });
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17894);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(85434);


function simpleTransformation(isApplicable, annotation, transform, untransform) {
    return {
        isApplicable,
        annotation,
        transform,
        untransform,
    };
}
const simpleRules = [
    simpleTransformation(_is_js__WEBPACK_IMPORTED_MODULE_0__/* .isUndefined */ .b0, 'undefined', () => null, () => undefined),
    simpleTransformation(_is_js__WEBPACK_IMPORTED_MODULE_0__/* .isBigint */ .OH, 'bigint', v => v.toString(), v => {
        if (typeof BigInt !== 'undefined') {
            return BigInt(v);
        }
        console.error('Please add a BigInt polyfill.');
        return v;
    }),
    simpleTransformation(_is_js__WEBPACK_IMPORTED_MODULE_0__/* .isDate */ .$P, 'Date', v => v.toISOString(), v => new Date(v)),
    simpleTransformation(_is_js__WEBPACK_IMPORTED_MODULE_0__/* .isError */ .bJ, 'Error', (v, superJson) => {
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
    simpleTransformation(_is_js__WEBPACK_IMPORTED_MODULE_0__/* .isRegExp */ .gd, 'regexp', v => '' + v, regex => {
        const body = regex.slice(1, regex.lastIndexOf('/'));
        const flags = regex.slice(regex.lastIndexOf('/') + 1);
        return new RegExp(body, flags);
    }),
    simpleTransformation(_is_js__WEBPACK_IMPORTED_MODULE_0__/* .isSet */ .vM, 'set', 
    // (sets only exist in es6+)
    // eslint-disable-next-line es5/no-es6-methods
    v => [...v.values()], v => new Set(v)),
    simpleTransformation(_is_js__WEBPACK_IMPORTED_MODULE_0__/* .isMap */ .jh, 'map', v => [...v.entries()], v => new Map(v)),
    simpleTransformation((v) => (0,_is_js__WEBPACK_IMPORTED_MODULE_0__/* .isNaNValue */ .XS)(v) || (0,_is_js__WEBPACK_IMPORTED_MODULE_0__/* .isInfinite */ .Dh)(v), 'number', v => {
        if ((0,_is_js__WEBPACK_IMPORTED_MODULE_0__/* .isNaNValue */ .XS)(v)) {
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
    simpleTransformation(_is_js__WEBPACK_IMPORTED_MODULE_0__/* .isURL */ .mv, 'URL', v => v.toString(), v => new URL(v)),
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
    if ((0,_is_js__WEBPACK_IMPORTED_MODULE_0__/* .isSymbol */ .Bm)(s)) {
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
const typedArrayRule = compositeTransformation(_is_js__WEBPACK_IMPORTED_MODULE_0__/* .isTypedArray */ .iu, v => ['typed-array', v.constructor.name], v => [...v], (v, a) => {
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
    const applicableCompositeRule = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__/* .findArr */ .Zy)(compositeRules, rule => rule.isApplicable(value, superJson));
    if (applicableCompositeRule) {
        return {
            value: applicableCompositeRule.transform(value, superJson),
            type: applicableCompositeRule.annotation(value, superJson),
        };
    }
    const applicableSimpleRule = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__/* .findArr */ .Zy)(simpleRules, rule => rule.isApplicable(value, superJson));
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
    if ((0,_is_js__WEBPACK_IMPORTED_MODULE_0__/* .isArray */ .cy)(type)) {
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


/***/ }),

/***/ 85434:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I6: () => (/* binding */ find),
/* harmony export */   Zy: () => (/* binding */ findArr),
/* harmony export */   jJ: () => (/* binding */ forEach),
/* harmony export */   mK: () => (/* binding */ includes)
/* harmony export */ });
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


/***/ }),

/***/ 3290:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (/* binding */ z),
/* harmony export */   G: () => (/* binding */ ZodError),
/* harmony export */   Ie: () => (/* binding */ custom),
/* harmony export */   Ik: () => (/* binding */ objectType),
/* harmony export */   L5: () => (/* binding */ unknownType),
/* harmony export */   YO: () => (/* binding */ arrayType),
/* harmony export */   Yj: () => (/* binding */ stringType),
/* harmony export */   ai: () => (/* binding */ numberType),
/* harmony export */   eq: () => (/* binding */ ZodIssueCode),
/* harmony export */   g1: () => (/* binding */ recordType),
/* harmony export */   z: () => (/* binding */ z),
/* harmony export */   zM: () => (/* binding */ booleanType)
/* harmony export */ });
/* unused harmony exports BRAND, DIRTY, EMPTY_PATH, INVALID, NEVER, OK, ParseStatus, Schema, ZodAny, ZodArray, ZodBigInt, ZodBoolean, ZodBranded, ZodCatch, ZodDate, ZodDefault, ZodDiscriminatedUnion, ZodEffects, ZodEnum, ZodFirstPartyTypeKind, ZodFunction, ZodIntersection, ZodLazy, ZodLiteral, ZodMap, ZodNaN, ZodNativeEnum, ZodNever, ZodNull, ZodNullable, ZodNumber, ZodObject, ZodOptional, ZodParsedType, ZodPipeline, ZodPromise, ZodReadonly, ZodRecord, ZodSchema, ZodSet, ZodString, ZodSymbol, ZodTransformer, ZodTuple, ZodType, ZodUndefined, ZodUnion, ZodUnknown, ZodVoid, addIssueToContext, any, bigint, coerce, date, datetimeRegex, defaultErrorMap, discriminatedUnion, effect, enum, function, getErrorMap, getParsedType, instanceof, intersection, isAborted, isAsync, isDirty, isValid, late, lazy, literal, makeIssue, map, nan, nativeEnum, never, null, nullable, objectUtil, oboolean, onumber, optional, ostring, pipeline, preprocess, promise, quotelessJson, set, setErrorMap, strictObject, symbol, transformer, tuple, undefined, union, util, void */
var util;
(function (util) {
    util.assertEqual = (val) => val;
    function assertIs(_arg) { }
    util.assertIs = assertIs;
    function assertNever(_x) {
        throw new Error();
    }
    util.assertNever = assertNever;
    util.arrayToEnum = (items) => {
        const obj = {};
        for (const item of items) {
            obj[item] = item;
        }
        return obj;
    };
    util.getValidEnumValues = (obj) => {
        const validKeys = util.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
        const filtered = {};
        for (const k of validKeys) {
            filtered[k] = obj[k];
        }
        return util.objectValues(filtered);
    };
    util.objectValues = (obj) => {
        return util.objectKeys(obj).map(function (e) {
            return obj[e];
        });
    };
    util.objectKeys = typeof Object.keys === "function" // eslint-disable-line ban/ban
        ? (obj) => Object.keys(obj) // eslint-disable-line ban/ban
        : (object) => {
            const keys = [];
            for (const key in object) {
                if (Object.prototype.hasOwnProperty.call(object, key)) {
                    keys.push(key);
                }
            }
            return keys;
        };
    util.find = (arr, checker) => {
        for (const item of arr) {
            if (checker(item))
                return item;
        }
        return undefined;
    };
    util.isInteger = typeof Number.isInteger === "function"
        ? (val) => Number.isInteger(val) // eslint-disable-line ban/ban
        : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
    function joinValues(array, separator = " | ") {
        return array
            .map((val) => (typeof val === "string" ? `'${val}'` : val))
            .join(separator);
    }
    util.joinValues = joinValues;
    util.jsonStringifyReplacer = (_, value) => {
        if (typeof value === "bigint") {
            return value.toString();
        }
        return value;
    };
})(util || (util = {}));
var objectUtil;
(function (objectUtil) {
    objectUtil.mergeShapes = (first, second) => {
        return {
            ...first,
            ...second, // second overwrites first
        };
    };
})(objectUtil || (objectUtil = {}));
const ZodParsedType = util.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
]);
const getParsedType = (data) => {
    const t = typeof data;
    switch (t) {
        case "undefined":
            return ZodParsedType.undefined;
        case "string":
            return ZodParsedType.string;
        case "number":
            return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
        case "boolean":
            return ZodParsedType.boolean;
        case "function":
            return ZodParsedType.function;
        case "bigint":
            return ZodParsedType.bigint;
        case "symbol":
            return ZodParsedType.symbol;
        case "object":
            if (Array.isArray(data)) {
                return ZodParsedType.array;
            }
            if (data === null) {
                return ZodParsedType.null;
            }
            if (data.then &&
                typeof data.then === "function" &&
                data.catch &&
                typeof data.catch === "function") {
                return ZodParsedType.promise;
            }
            if (typeof Map !== "undefined" && data instanceof Map) {
                return ZodParsedType.map;
            }
            if (typeof Set !== "undefined" && data instanceof Set) {
                return ZodParsedType.set;
            }
            if (typeof Date !== "undefined" && data instanceof Date) {
                return ZodParsedType.date;
            }
            return ZodParsedType.object;
        default:
            return ZodParsedType.unknown;
    }
};

const ZodIssueCode = util.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite",
]);
const quotelessJson = (obj) => {
    const json = JSON.stringify(obj, null, 2);
    return json.replace(/"([^"]+)":/g, "$1:");
};
class ZodError extends Error {
    get errors() {
        return this.issues;
    }
    constructor(issues) {
        super();
        this.issues = [];
        this.addIssue = (sub) => {
            this.issues = [...this.issues, sub];
        };
        this.addIssues = (subs = []) => {
            this.issues = [...this.issues, ...subs];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
            // eslint-disable-next-line ban/ban
            Object.setPrototypeOf(this, actualProto);
        }
        else {
            this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
    }
    format(_mapper) {
        const mapper = _mapper ||
            function (issue) {
                return issue.message;
            };
        const fieldErrors = { _errors: [] };
        const processError = (error) => {
            for (const issue of error.issues) {
                if (issue.code === "invalid_union") {
                    issue.unionErrors.map(processError);
                }
                else if (issue.code === "invalid_return_type") {
                    processError(issue.returnTypeError);
                }
                else if (issue.code === "invalid_arguments") {
                    processError(issue.argumentsError);
                }
                else if (issue.path.length === 0) {
                    fieldErrors._errors.push(mapper(issue));
                }
                else {
                    let curr = fieldErrors;
                    let i = 0;
                    while (i < issue.path.length) {
                        const el = issue.path[i];
                        const terminal = i === issue.path.length - 1;
                        if (!terminal) {
                            curr[el] = curr[el] || { _errors: [] };
                            // if (typeof el === "string") {
                            //   curr[el] = curr[el] || { _errors: [] };
                            // } else if (typeof el === "number") {
                            //   const errorArray: any = [];
                            //   errorArray._errors = [];
                            //   curr[el] = curr[el] || errorArray;
                            // }
                        }
                        else {
                            curr[el] = curr[el] || { _errors: [] };
                            curr[el]._errors.push(mapper(issue));
                        }
                        curr = curr[el];
                        i++;
                    }
                }
            }
        };
        processError(this);
        return fieldErrors;
    }
    static assert(value) {
        if (!(value instanceof ZodError)) {
            throw new Error(`Not a ZodError: ${value}`);
        }
    }
    toString() {
        return this.message;
    }
    get message() {
        return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
        return this.issues.length === 0;
    }
    flatten(mapper = (issue) => issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues) {
            if (sub.path.length > 0) {
                fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
                fieldErrors[sub.path[0]].push(mapper(sub));
            }
            else {
                formErrors.push(mapper(sub));
            }
        }
        return { formErrors, fieldErrors };
    }
    get formErrors() {
        return this.flatten();
    }
}
ZodError.create = (issues) => {
    const error = new ZodError(issues);
    return error;
};

const errorMap = (issue, _ctx) => {
    let message;
    switch (issue.code) {
        case ZodIssueCode.invalid_type:
            if (issue.received === ZodParsedType.undefined) {
                message = "Required";
            }
            else {
                message = `Expected ${issue.expected}, received ${issue.received}`;
            }
            break;
        case ZodIssueCode.invalid_literal:
            message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
            break;
        case ZodIssueCode.unrecognized_keys:
            message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
            break;
        case ZodIssueCode.invalid_union:
            message = `Invalid input`;
            break;
        case ZodIssueCode.invalid_union_discriminator:
            message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
            break;
        case ZodIssueCode.invalid_enum_value:
            message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
            break;
        case ZodIssueCode.invalid_arguments:
            message = `Invalid function arguments`;
            break;
        case ZodIssueCode.invalid_return_type:
            message = `Invalid function return type`;
            break;
        case ZodIssueCode.invalid_date:
            message = `Invalid date`;
            break;
        case ZodIssueCode.invalid_string:
            if (typeof issue.validation === "object") {
                if ("includes" in issue.validation) {
                    message = `Invalid input: must include "${issue.validation.includes}"`;
                    if (typeof issue.validation.position === "number") {
                        message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
                    }
                }
                else if ("startsWith" in issue.validation) {
                    message = `Invalid input: must start with "${issue.validation.startsWith}"`;
                }
                else if ("endsWith" in issue.validation) {
                    message = `Invalid input: must end with "${issue.validation.endsWith}"`;
                }
                else {
                    util.assertNever(issue.validation);
                }
            }
            else if (issue.validation !== "regex") {
                message = `Invalid ${issue.validation}`;
            }
            else {
                message = "Invalid";
            }
            break;
        case ZodIssueCode.too_small:
            if (issue.type === "array")
                message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
            else if (issue.type === "string")
                message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
            else if (issue.type === "number")
                message = `Number must be ${issue.exact
                    ? `exactly equal to `
                    : issue.inclusive
                        ? `greater than or equal to `
                        : `greater than `}${issue.minimum}`;
            else if (issue.type === "date")
                message = `Date must be ${issue.exact
                    ? `exactly equal to `
                    : issue.inclusive
                        ? `greater than or equal to `
                        : `greater than `}${new Date(Number(issue.minimum))}`;
            else
                message = "Invalid input";
            break;
        case ZodIssueCode.too_big:
            if (issue.type === "array")
                message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
            else if (issue.type === "string")
                message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
            else if (issue.type === "number")
                message = `Number must be ${issue.exact
                    ? `exactly`
                    : issue.inclusive
                        ? `less than or equal to`
                        : `less than`} ${issue.maximum}`;
            else if (issue.type === "bigint")
                message = `BigInt must be ${issue.exact
                    ? `exactly`
                    : issue.inclusive
                        ? `less than or equal to`
                        : `less than`} ${issue.maximum}`;
            else if (issue.type === "date")
                message = `Date must be ${issue.exact
                    ? `exactly`
                    : issue.inclusive
                        ? `smaller than or equal to`
                        : `smaller than`} ${new Date(Number(issue.maximum))}`;
            else
                message = "Invalid input";
            break;
        case ZodIssueCode.custom:
            message = `Invalid input`;
            break;
        case ZodIssueCode.invalid_intersection_types:
            message = `Intersection results could not be merged`;
            break;
        case ZodIssueCode.not_multiple_of:
            message = `Number must be a multiple of ${issue.multipleOf}`;
            break;
        case ZodIssueCode.not_finite:
            message = "Number must be finite";
            break;
        default:
            message = _ctx.defaultError;
            util.assertNever(issue);
    }
    return { message };
};

let overrideErrorMap = errorMap;
function setErrorMap(map) {
    overrideErrorMap = map;
}
function getErrorMap() {
    return overrideErrorMap;
}

const makeIssue = (params) => {
    const { data, path, errorMaps, issueData } = params;
    const fullPath = [...path, ...(issueData.path || [])];
    const fullIssue = {
        ...issueData,
        path: fullPath,
    };
    if (issueData.message !== undefined) {
        return {
            ...issueData,
            path: fullPath,
            message: issueData.message,
        };
    }
    let errorMessage = "";
    const maps = errorMaps
        .filter((m) => !!m)
        .slice()
        .reverse();
    for (const map of maps) {
        errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
    }
    return {
        ...issueData,
        path: fullPath,
        message: errorMessage,
    };
};
const EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
    const overrideMap = getErrorMap();
    const issue = makeIssue({
        issueData: issueData,
        data: ctx.data,
        path: ctx.path,
        errorMaps: [
            ctx.common.contextualErrorMap, // contextual error map is first priority
            ctx.schemaErrorMap, // then schema-bound map if available
            overrideMap, // then global override map
            overrideMap === errorMap ? undefined : errorMap, // then global default map
        ].filter((x) => !!x),
    });
    ctx.common.issues.push(issue);
}
class ParseStatus {
    constructor() {
        this.value = "valid";
    }
    dirty() {
        if (this.value === "valid")
            this.value = "dirty";
    }
    abort() {
        if (this.value !== "aborted")
            this.value = "aborted";
    }
    static mergeArray(status, results) {
        const arrayValue = [];
        for (const s of results) {
            if (s.status === "aborted")
                return INVALID;
            if (s.status === "dirty")
                status.dirty();
            arrayValue.push(s.value);
        }
        return { status: status.value, value: arrayValue };
    }
    static async mergeObjectAsync(status, pairs) {
        const syncPairs = [];
        for (const pair of pairs) {
            const key = await pair.key;
            const value = await pair.value;
            syncPairs.push({
                key,
                value,
            });
        }
        return ParseStatus.mergeObjectSync(status, syncPairs);
    }
    static mergeObjectSync(status, pairs) {
        const finalObject = {};
        for (const pair of pairs) {
            const { key, value } = pair;
            if (key.status === "aborted")
                return INVALID;
            if (value.status === "aborted")
                return INVALID;
            if (key.status === "dirty")
                status.dirty();
            if (value.status === "dirty")
                status.dirty();
            if (key.value !== "__proto__" &&
                (typeof value.value !== "undefined" || pair.alwaysSet)) {
                finalObject[key.value] = value.value;
            }
        }
        return { status: status.value, value: finalObject };
    }
}
const INVALID = Object.freeze({
    status: "aborted",
});
const DIRTY = (value) => ({ status: "dirty", value });
const OK = (value) => ({ status: "valid", value });
const isAborted = (x) => x.status === "aborted";
const isDirty = (x) => x.status === "dirty";
const isValid = (x) => x.status === "valid";
const isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var errorUtil;
(function (errorUtil) {
    errorUtil.errToObj = (message) => typeof message === "string" ? { message } : message || {};
    errorUtil.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
})(errorUtil || (errorUtil = {}));

var _ZodEnum_cache, _ZodNativeEnum_cache;
class ParseInputLazyPath {
    constructor(parent, value, path, key) {
        this._cachedPath = [];
        this.parent = parent;
        this.data = value;
        this._path = path;
        this._key = key;
    }
    get path() {
        if (!this._cachedPath.length) {
            if (this._key instanceof Array) {
                this._cachedPath.push(...this._path, ...this._key);
            }
            else {
                this._cachedPath.push(...this._path, this._key);
            }
        }
        return this._cachedPath;
    }
}
const handleResult = (ctx, result) => {
    if (isValid(result)) {
        return { success: true, data: result.value };
    }
    else {
        if (!ctx.common.issues.length) {
            throw new Error("Validation failed but no issues detected.");
        }
        return {
            success: false,
            get error() {
                if (this._error)
                    return this._error;
                const error = new ZodError(ctx.common.issues);
                this._error = error;
                return this._error;
            },
        };
    }
};
function processCreateParams(params) {
    if (!params)
        return {};
    const { errorMap, invalid_type_error, required_error, description } = params;
    if (errorMap && (invalid_type_error || required_error)) {
        throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    }
    if (errorMap)
        return { errorMap: errorMap, description };
    const customMap = (iss, ctx) => {
        var _a, _b;
        const { message } = params;
        if (iss.code === "invalid_enum_value") {
            return { message: message !== null && message !== void 0 ? message : ctx.defaultError };
        }
        if (typeof ctx.data === "undefined") {
            return { message: (_a = message !== null && message !== void 0 ? message : required_error) !== null && _a !== void 0 ? _a : ctx.defaultError };
        }
        if (iss.code !== "invalid_type")
            return { message: ctx.defaultError };
        return { message: (_b = message !== null && message !== void 0 ? message : invalid_type_error) !== null && _b !== void 0 ? _b : ctx.defaultError };
    };
    return { errorMap: customMap, description };
}
class ZodType {
    get description() {
        return this._def.description;
    }
    _getType(input) {
        return getParsedType(input.data);
    }
    _getOrReturnCtx(input, ctx) {
        return (ctx || {
            common: input.parent.common,
            data: input.data,
            parsedType: getParsedType(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent,
        });
    }
    _processInputParams(input) {
        return {
            status: new ParseStatus(),
            ctx: {
                common: input.parent.common,
                data: input.data,
                parsedType: getParsedType(input.data),
                schemaErrorMap: this._def.errorMap,
                path: input.path,
                parent: input.parent,
            },
        };
    }
    _parseSync(input) {
        const result = this._parse(input);
        if (isAsync(result)) {
            throw new Error("Synchronous parse encountered promise.");
        }
        return result;
    }
    _parseAsync(input) {
        const result = this._parse(input);
        return Promise.resolve(result);
    }
    parse(data, params) {
        const result = this.safeParse(data, params);
        if (result.success)
            return result.data;
        throw result.error;
    }
    safeParse(data, params) {
        var _a;
        const ctx = {
            common: {
                issues: [],
                async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
                contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
            },
            path: (params === null || params === void 0 ? void 0 : params.path) || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: getParsedType(data),
        };
        const result = this._parseSync({ data, path: ctx.path, parent: ctx });
        return handleResult(ctx, result);
    }
    "~validate"(data) {
        var _a, _b;
        const ctx = {
            common: {
                issues: [],
                async: !!this["~standard"].async,
            },
            path: [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: getParsedType(data),
        };
        if (!this["~standard"].async) {
            try {
                const result = this._parseSync({ data, path: [], parent: ctx });
                return isValid(result)
                    ? {
                        value: result.value,
                    }
                    : {
                        issues: ctx.common.issues,
                    };
            }
            catch (err) {
                if ((_b = (_a = err === null || err === void 0 ? void 0 : err.message) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.includes("encountered")) {
                    this["~standard"].async = true;
                }
                ctx.common = {
                    issues: [],
                    async: true,
                };
            }
        }
        return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result)
            ? {
                value: result.value,
            }
            : {
                issues: ctx.common.issues,
            });
    }
    async parseAsync(data, params) {
        const result = await this.safeParseAsync(data, params);
        if (result.success)
            return result.data;
        throw result.error;
    }
    async safeParseAsync(data, params) {
        const ctx = {
            common: {
                issues: [],
                contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
                async: true,
            },
            path: (params === null || params === void 0 ? void 0 : params.path) || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: getParsedType(data),
        };
        const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
        const result = await (isAsync(maybeAsyncResult)
            ? maybeAsyncResult
            : Promise.resolve(maybeAsyncResult));
        return handleResult(ctx, result);
    }
    refine(check, message) {
        const getIssueProperties = (val) => {
            if (typeof message === "string" || typeof message === "undefined") {
                return { message };
            }
            else if (typeof message === "function") {
                return message(val);
            }
            else {
                return message;
            }
        };
        return this._refinement((val, ctx) => {
            const result = check(val);
            const setError = () => ctx.addIssue({
                code: ZodIssueCode.custom,
                ...getIssueProperties(val),
            });
            if (typeof Promise !== "undefined" && result instanceof Promise) {
                return result.then((data) => {
                    if (!data) {
                        setError();
                        return false;
                    }
                    else {
                        return true;
                    }
                });
            }
            if (!result) {
                setError();
                return false;
            }
            else {
                return true;
            }
        });
    }
    refinement(check, refinementData) {
        return this._refinement((val, ctx) => {
            if (!check(val)) {
                ctx.addIssue(typeof refinementData === "function"
                    ? refinementData(val, ctx)
                    : refinementData);
                return false;
            }
            else {
                return true;
            }
        });
    }
    _refinement(refinement) {
        return new ZodEffects({
            schema: this,
            typeName: ZodFirstPartyTypeKind.ZodEffects,
            effect: { type: "refinement", refinement },
        });
    }
    superRefine(refinement) {
        return this._refinement(refinement);
    }
    constructor(def) {
        /** Alias of safeParseAsync */
        this.spa = this.safeParseAsync;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.brand = this.brand.bind(this);
        this.default = this.default.bind(this);
        this.catch = this.catch.bind(this);
        this.describe = this.describe.bind(this);
        this.pipe = this.pipe.bind(this);
        this.readonly = this.readonly.bind(this);
        this.isNullable = this.isNullable.bind(this);
        this.isOptional = this.isOptional.bind(this);
        this["~standard"] = {
            version: 1,
            vendor: "zod",
            validate: (data) => this["~validate"](data),
        };
    }
    optional() {
        return ZodOptional.create(this, this._def);
    }
    nullable() {
        return ZodNullable.create(this, this._def);
    }
    nullish() {
        return this.nullable().optional();
    }
    array() {
        return ZodArray.create(this);
    }
    promise() {
        return ZodPromise.create(this, this._def);
    }
    or(option) {
        return ZodUnion.create([this, option], this._def);
    }
    and(incoming) {
        return ZodIntersection.create(this, incoming, this._def);
    }
    transform(transform) {
        return new ZodEffects({
            ...processCreateParams(this._def),
            schema: this,
            typeName: ZodFirstPartyTypeKind.ZodEffects,
            effect: { type: "transform", transform },
        });
    }
    default(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodDefault({
            ...processCreateParams(this._def),
            innerType: this,
            defaultValue: defaultValueFunc,
            typeName: ZodFirstPartyTypeKind.ZodDefault,
        });
    }
    brand() {
        return new ZodBranded({
            typeName: ZodFirstPartyTypeKind.ZodBranded,
            type: this,
            ...processCreateParams(this._def),
        });
    }
    catch(def) {
        const catchValueFunc = typeof def === "function" ? def : () => def;
        return new ZodCatch({
            ...processCreateParams(this._def),
            innerType: this,
            catchValue: catchValueFunc,
            typeName: ZodFirstPartyTypeKind.ZodCatch,
        });
    }
    describe(description) {
        const This = this.constructor;
        return new This({
            ...this._def,
            description,
        });
    }
    pipe(target) {
        return ZodPipeline.create(this, target);
    }
    readonly() {
        return ZodReadonly.create(this);
    }
    isOptional() {
        return this.safeParse(undefined).success;
    }
    isNullable() {
        return this.safeParse(null).success;
    }
}
const cuidRegex = /^c[^\s-]{8,}$/i;
const cuid2Regex = /^[0-9a-z]+$/;
const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
// const uuidRegex =
//   /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
const nanoidRegex = /^[a-z0-9_-]{21}$/i;
const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
const durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
// from https://stackoverflow.com/a/46181/1550155
// old version: too slow, didn't support unicode
// const emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
//old email regex
// const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((?!-)([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{1,})[^-<>()[\].,;:\s@"]$/i;
// eslint-disable-next-line
// const emailRegex =
//   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\])|(\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z]{2,})+))$/;
// const emailRegex =
//   /^[a-zA-Z0-9\.\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
// const emailRegex =
//   /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
const emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
// const emailRegex =
//   /^[a-z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9\-]+)*$/i;
// from https://thekevinscott.com/emojis-in-javascript/#writing-a-regular-expression
const _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
let emojiRegex;
// faster, simpler, safer
const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
// const ipv6Regex =
// /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
const ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
// https://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
// https://base64.guru/standards/base64url
const base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
// simple
// const dateRegexSource = `\\d{4}-\\d{2}-\\d{2}`;
// no leap year validation
// const dateRegexSource = `\\d{4}-((0[13578]|10|12)-31|(0[13-9]|1[0-2])-30|(0[1-9]|1[0-2])-(0[1-9]|1\\d|2\\d))`;
// with leap year validation
const dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
const dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
    let secondsRegexSource = `[0-5]\\d`;
    if (args.precision) {
        secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
    }
    else if (args.precision == null) {
        secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
    }
    const secondsQuantifier = args.precision ? "+" : "?"; // require seconds if precision is nonzero
    return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
    return new RegExp(`^${timeRegexSource(args)}$`);
}
// Adapted from https://stackoverflow.com/a/3143231
function datetimeRegex(args) {
    let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
    const opts = [];
    opts.push(args.local ? `Z?` : `Z`);
    if (args.offset)
        opts.push(`([+-]\\d{2}:?\\d{2})`);
    regex = `${regex}(${opts.join("|")})`;
    return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
    if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
        return true;
    }
    if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
        return true;
    }
    return false;
}
function isValidJWT(jwt, alg) {
    if (!jwtRegex.test(jwt))
        return false;
    try {
        const [header] = jwt.split(".");
        // Convert base64url to base64
        const base64 = header
            .replace(/-/g, "+")
            .replace(/_/g, "/")
            .padEnd(header.length + ((4 - (header.length % 4)) % 4), "=");
        const decoded = JSON.parse(atob(base64));
        if (typeof decoded !== "object" || decoded === null)
            return false;
        if (!decoded.typ || !decoded.alg)
            return false;
        if (alg && decoded.alg !== alg)
            return false;
        return true;
    }
    catch (_a) {
        return false;
    }
}
function isValidCidr(ip, version) {
    if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
        return true;
    }
    if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
        return true;
    }
    return false;
}
class ZodString extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = String(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.string) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.string,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const status = new ParseStatus();
        let ctx = undefined;
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                if (input.data.length < check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_small,
                        minimum: check.value,
                        type: "string",
                        inclusive: true,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                if (input.data.length > check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_big,
                        maximum: check.value,
                        type: "string",
                        inclusive: true,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "length") {
                const tooBig = input.data.length > check.value;
                const tooSmall = input.data.length < check.value;
                if (tooBig || tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    if (tooBig) {
                        addIssueToContext(ctx, {
                            code: ZodIssueCode.too_big,
                            maximum: check.value,
                            type: "string",
                            inclusive: true,
                            exact: true,
                            message: check.message,
                        });
                    }
                    else if (tooSmall) {
                        addIssueToContext(ctx, {
                            code: ZodIssueCode.too_small,
                            minimum: check.value,
                            type: "string",
                            inclusive: true,
                            exact: true,
                            message: check.message,
                        });
                    }
                    status.dirty();
                }
            }
            else if (check.kind === "email") {
                if (!emailRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "email",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "emoji") {
                if (!emojiRegex) {
                    emojiRegex = new RegExp(_emojiRegex, "u");
                }
                if (!emojiRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "emoji",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "uuid") {
                if (!uuidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "uuid",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "nanoid") {
                if (!nanoidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "nanoid",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "cuid") {
                if (!cuidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "cuid",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "cuid2") {
                if (!cuid2Regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "cuid2",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "ulid") {
                if (!ulidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "ulid",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "url") {
                try {
                    new URL(input.data);
                }
                catch (_a) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "url",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "regex") {
                check.regex.lastIndex = 0;
                const testResult = check.regex.test(input.data);
                if (!testResult) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "regex",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "trim") {
                input.data = input.data.trim();
            }
            else if (check.kind === "includes") {
                if (!input.data.includes(check.value, check.position)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: { includes: check.value, position: check.position },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "toLowerCase") {
                input.data = input.data.toLowerCase();
            }
            else if (check.kind === "toUpperCase") {
                input.data = input.data.toUpperCase();
            }
            else if (check.kind === "startsWith") {
                if (!input.data.startsWith(check.value)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: { startsWith: check.value },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "endsWith") {
                if (!input.data.endsWith(check.value)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: { endsWith: check.value },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "datetime") {
                const regex = datetimeRegex(check);
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: "datetime",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "date") {
                const regex = dateRegex;
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: "date",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "time") {
                const regex = timeRegex(check);
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: "time",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "duration") {
                if (!durationRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "duration",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "ip") {
                if (!isValidIP(input.data, check.version)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "ip",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "jwt") {
                if (!isValidJWT(input.data, check.alg)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "jwt",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "cidr") {
                if (!isValidCidr(input.data, check.version)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "cidr",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "base64") {
                if (!base64Regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "base64",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "base64url") {
                if (!base64urlRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "base64url",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                util.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    _regex(regex, validation, message) {
        return this.refinement((data) => regex.test(data), {
            validation,
            code: ZodIssueCode.invalid_string,
            ...errorUtil.errToObj(message),
        });
    }
    _addCheck(check) {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    email(message) {
        return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
    }
    url(message) {
        return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
    }
    emoji(message) {
        return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
    }
    uuid(message) {
        return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
    }
    nanoid(message) {
        return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
    }
    cuid(message) {
        return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
    }
    cuid2(message) {
        return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
    }
    ulid(message) {
        return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
    }
    base64(message) {
        return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
    }
    base64url(message) {
        // base64url encoding is a modification of base64 that can safely be used in URLs and filenames
        return this._addCheck({
            kind: "base64url",
            ...errorUtil.errToObj(message),
        });
    }
    jwt(options) {
        return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
    }
    ip(options) {
        return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
    }
    cidr(options) {
        return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
    }
    datetime(options) {
        var _a, _b;
        if (typeof options === "string") {
            return this._addCheck({
                kind: "datetime",
                precision: null,
                offset: false,
                local: false,
                message: options,
            });
        }
        return this._addCheck({
            kind: "datetime",
            precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
            offset: (_a = options === null || options === void 0 ? void 0 : options.offset) !== null && _a !== void 0 ? _a : false,
            local: (_b = options === null || options === void 0 ? void 0 : options.local) !== null && _b !== void 0 ? _b : false,
            ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message),
        });
    }
    date(message) {
        return this._addCheck({ kind: "date", message });
    }
    time(options) {
        if (typeof options === "string") {
            return this._addCheck({
                kind: "time",
                precision: null,
                message: options,
            });
        }
        return this._addCheck({
            kind: "time",
            precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
            ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message),
        });
    }
    duration(message) {
        return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
    }
    regex(regex, message) {
        return this._addCheck({
            kind: "regex",
            regex: regex,
            ...errorUtil.errToObj(message),
        });
    }
    includes(value, options) {
        return this._addCheck({
            kind: "includes",
            value: value,
            position: options === null || options === void 0 ? void 0 : options.position,
            ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message),
        });
    }
    startsWith(value, message) {
        return this._addCheck({
            kind: "startsWith",
            value: value,
            ...errorUtil.errToObj(message),
        });
    }
    endsWith(value, message) {
        return this._addCheck({
            kind: "endsWith",
            value: value,
            ...errorUtil.errToObj(message),
        });
    }
    min(minLength, message) {
        return this._addCheck({
            kind: "min",
            value: minLength,
            ...errorUtil.errToObj(message),
        });
    }
    max(maxLength, message) {
        return this._addCheck({
            kind: "max",
            value: maxLength,
            ...errorUtil.errToObj(message),
        });
    }
    length(len, message) {
        return this._addCheck({
            kind: "length",
            value: len,
            ...errorUtil.errToObj(message),
        });
    }
    /**
     * Equivalent to `.min(1)`
     */
    nonempty(message) {
        return this.min(1, errorUtil.errToObj(message));
    }
    trim() {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "trim" }],
        });
    }
    toLowerCase() {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "toLowerCase" }],
        });
    }
    toUpperCase() {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "toUpperCase" }],
        });
    }
    get isDatetime() {
        return !!this._def.checks.find((ch) => ch.kind === "datetime");
    }
    get isDate() {
        return !!this._def.checks.find((ch) => ch.kind === "date");
    }
    get isTime() {
        return !!this._def.checks.find((ch) => ch.kind === "time");
    }
    get isDuration() {
        return !!this._def.checks.find((ch) => ch.kind === "duration");
    }
    get isEmail() {
        return !!this._def.checks.find((ch) => ch.kind === "email");
    }
    get isURL() {
        return !!this._def.checks.find((ch) => ch.kind === "url");
    }
    get isEmoji() {
        return !!this._def.checks.find((ch) => ch.kind === "emoji");
    }
    get isUUID() {
        return !!this._def.checks.find((ch) => ch.kind === "uuid");
    }
    get isNANOID() {
        return !!this._def.checks.find((ch) => ch.kind === "nanoid");
    }
    get isCUID() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid");
    }
    get isCUID2() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid2");
    }
    get isULID() {
        return !!this._def.checks.find((ch) => ch.kind === "ulid");
    }
    get isIP() {
        return !!this._def.checks.find((ch) => ch.kind === "ip");
    }
    get isCIDR() {
        return !!this._def.checks.find((ch) => ch.kind === "cidr");
    }
    get isBase64() {
        return !!this._def.checks.find((ch) => ch.kind === "base64");
    }
    get isBase64url() {
        // base64url encoding is a modification of base64 that can safely be used in URLs and filenames
        return !!this._def.checks.find((ch) => ch.kind === "base64url");
    }
    get minLength() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxLength() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
}
ZodString.create = (params) => {
    var _a;
    return new ZodString({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodString,
        coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
        ...processCreateParams(params),
    });
};
// https://stackoverflow.com/questions/3966484/why-does-modulus-operator-return-fractional-number-in-javascript/31711034#31711034
function floatSafeRemainder(val, step) {
    const valDecCount = (val.toString().split(".")[1] || "").length;
    const stepDecCount = (step.toString().split(".")[1] || "").length;
    const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
    const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
    const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
    return (valInt % stepInt) / Math.pow(10, decCount);
}
class ZodNumber extends ZodType {
    constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
        this.step = this.multipleOf;
    }
    _parse(input) {
        if (this._def.coerce) {
            input.data = Number(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.number) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.number,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        let ctx = undefined;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
            if (check.kind === "int") {
                if (!util.isInteger(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_type,
                        expected: "integer",
                        received: "float",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "min") {
                const tooSmall = check.inclusive
                    ? input.data < check.value
                    : input.data <= check.value;
                if (tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_small,
                        minimum: check.value,
                        type: "number",
                        inclusive: check.inclusive,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                const tooBig = check.inclusive
                    ? input.data > check.value
                    : input.data >= check.value;
                if (tooBig) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_big,
                        maximum: check.value,
                        type: "number",
                        inclusive: check.inclusive,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "multipleOf") {
                if (floatSafeRemainder(input.data, check.value) !== 0) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.not_multiple_of,
                        multipleOf: check.value,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "finite") {
                if (!Number.isFinite(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.not_finite,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                util.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
    }
    gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
    }
    lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
    }
    lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
        return new ZodNumber({
            ...this._def,
            checks: [
                ...this._def.checks,
                {
                    kind,
                    value,
                    inclusive,
                    message: errorUtil.toString(message),
                },
            ],
        });
    }
    _addCheck(check) {
        return new ZodNumber({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    int(message) {
        return this._addCheck({
            kind: "int",
            message: errorUtil.toString(message),
        });
    }
    positive(message) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: false,
            message: errorUtil.toString(message),
        });
    }
    negative(message) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: false,
            message: errorUtil.toString(message),
        });
    }
    nonpositive(message) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: true,
            message: errorUtil.toString(message),
        });
    }
    nonnegative(message) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: true,
            message: errorUtil.toString(message),
        });
    }
    multipleOf(value, message) {
        return this._addCheck({
            kind: "multipleOf",
            value: value,
            message: errorUtil.toString(message),
        });
    }
    finite(message) {
        return this._addCheck({
            kind: "finite",
            message: errorUtil.toString(message),
        });
    }
    safe(message) {
        return this._addCheck({
            kind: "min",
            inclusive: true,
            value: Number.MIN_SAFE_INTEGER,
            message: errorUtil.toString(message),
        })._addCheck({
            kind: "max",
            inclusive: true,
            value: Number.MAX_SAFE_INTEGER,
            message: errorUtil.toString(message),
        });
    }
    get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
    get isInt() {
        return !!this._def.checks.find((ch) => ch.kind === "int" ||
            (ch.kind === "multipleOf" && util.isInteger(ch.value)));
    }
    get isFinite() {
        let max = null, min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "finite" ||
                ch.kind === "int" ||
                ch.kind === "multipleOf") {
                return true;
            }
            else if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
            else if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return Number.isFinite(min) && Number.isFinite(max);
    }
}
ZodNumber.create = (params) => {
    return new ZodNumber({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodNumber,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams(params),
    });
};
class ZodBigInt extends ZodType {
    constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
    }
    _parse(input) {
        if (this._def.coerce) {
            try {
                input.data = BigInt(input.data);
            }
            catch (_a) {
                return this._getInvalidInput(input);
            }
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.bigint) {
            return this._getInvalidInput(input);
        }
        let ctx = undefined;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                const tooSmall = check.inclusive
                    ? input.data < check.value
                    : input.data <= check.value;
                if (tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_small,
                        type: "bigint",
                        minimum: check.value,
                        inclusive: check.inclusive,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                const tooBig = check.inclusive
                    ? input.data > check.value
                    : input.data >= check.value;
                if (tooBig) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_big,
                        type: "bigint",
                        maximum: check.value,
                        inclusive: check.inclusive,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "multipleOf") {
                if (input.data % check.value !== BigInt(0)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.not_multiple_of,
                        multipleOf: check.value,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                util.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    _getInvalidInput(input) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.bigint,
            received: ctx.parsedType,
        });
        return INVALID;
    }
    gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
    }
    gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
    }
    lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
    }
    lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
        return new ZodBigInt({
            ...this._def,
            checks: [
                ...this._def.checks,
                {
                    kind,
                    value,
                    inclusive,
                    message: errorUtil.toString(message),
                },
            ],
        });
    }
    _addCheck(check) {
        return new ZodBigInt({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    positive(message) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: false,
            message: errorUtil.toString(message),
        });
    }
    negative(message) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: false,
            message: errorUtil.toString(message),
        });
    }
    nonpositive(message) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: true,
            message: errorUtil.toString(message),
        });
    }
    nonnegative(message) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: true,
            message: errorUtil.toString(message),
        });
    }
    multipleOf(value, message) {
        return this._addCheck({
            kind: "multipleOf",
            value,
            message: errorUtil.toString(message),
        });
    }
    get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
}
ZodBigInt.create = (params) => {
    var _a;
    return new ZodBigInt({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodBigInt,
        coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
        ...processCreateParams(params),
    });
};
class ZodBoolean extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = Boolean(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.boolean) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.boolean,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodBoolean.create = (params) => {
    return new ZodBoolean({
        typeName: ZodFirstPartyTypeKind.ZodBoolean,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams(params),
    });
};
class ZodDate extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = new Date(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.date) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.date,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        if (isNaN(input.data.getTime())) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_date,
            });
            return INVALID;
        }
        const status = new ParseStatus();
        let ctx = undefined;
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                if (input.data.getTime() < check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_small,
                        message: check.message,
                        inclusive: true,
                        exact: false,
                        minimum: check.value,
                        type: "date",
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                if (input.data.getTime() > check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_big,
                        message: check.message,
                        inclusive: true,
                        exact: false,
                        maximum: check.value,
                        type: "date",
                    });
                    status.dirty();
                }
            }
            else {
                util.assertNever(check);
            }
        }
        return {
            status: status.value,
            value: new Date(input.data.getTime()),
        };
    }
    _addCheck(check) {
        return new ZodDate({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    min(minDate, message) {
        return this._addCheck({
            kind: "min",
            value: minDate.getTime(),
            message: errorUtil.toString(message),
        });
    }
    max(maxDate, message) {
        return this._addCheck({
            kind: "max",
            value: maxDate.getTime(),
            message: errorUtil.toString(message),
        });
    }
    get minDate() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min != null ? new Date(min) : null;
    }
    get maxDate() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max != null ? new Date(max) : null;
    }
}
ZodDate.create = (params) => {
    return new ZodDate({
        checks: [],
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        typeName: ZodFirstPartyTypeKind.ZodDate,
        ...processCreateParams(params),
    });
};
class ZodSymbol extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.symbol) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.symbol,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodSymbol.create = (params) => {
    return new ZodSymbol({
        typeName: ZodFirstPartyTypeKind.ZodSymbol,
        ...processCreateParams(params),
    });
};
class ZodUndefined extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.undefined,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodUndefined.create = (params) => {
    return new ZodUndefined({
        typeName: ZodFirstPartyTypeKind.ZodUndefined,
        ...processCreateParams(params),
    });
};
class ZodNull extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.null) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.null,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodNull.create = (params) => {
    return new ZodNull({
        typeName: ZodFirstPartyTypeKind.ZodNull,
        ...processCreateParams(params),
    });
};
class ZodAny extends ZodType {
    constructor() {
        super(...arguments);
        // to prevent instances of other classes from extending ZodAny. this causes issues with catchall in ZodObject.
        this._any = true;
    }
    _parse(input) {
        return OK(input.data);
    }
}
ZodAny.create = (params) => {
    return new ZodAny({
        typeName: ZodFirstPartyTypeKind.ZodAny,
        ...processCreateParams(params),
    });
};
class ZodUnknown extends ZodType {
    constructor() {
        super(...arguments);
        // required
        this._unknown = true;
    }
    _parse(input) {
        return OK(input.data);
    }
}
ZodUnknown.create = (params) => {
    return new ZodUnknown({
        typeName: ZodFirstPartyTypeKind.ZodUnknown,
        ...processCreateParams(params),
    });
};
class ZodNever extends ZodType {
    _parse(input) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.never,
            received: ctx.parsedType,
        });
        return INVALID;
    }
}
ZodNever.create = (params) => {
    return new ZodNever({
        typeName: ZodFirstPartyTypeKind.ZodNever,
        ...processCreateParams(params),
    });
};
class ZodVoid extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.void,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodVoid.create = (params) => {
    return new ZodVoid({
        typeName: ZodFirstPartyTypeKind.ZodVoid,
        ...processCreateParams(params),
    });
};
class ZodArray extends ZodType {
    _parse(input) {
        const { ctx, status } = this._processInputParams(input);
        const def = this._def;
        if (ctx.parsedType !== ZodParsedType.array) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.array,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        if (def.exactLength !== null) {
            const tooBig = ctx.data.length > def.exactLength.value;
            const tooSmall = ctx.data.length < def.exactLength.value;
            if (tooBig || tooSmall) {
                addIssueToContext(ctx, {
                    code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
                    minimum: (tooSmall ? def.exactLength.value : undefined),
                    maximum: (tooBig ? def.exactLength.value : undefined),
                    type: "array",
                    inclusive: true,
                    exact: true,
                    message: def.exactLength.message,
                });
                status.dirty();
            }
        }
        if (def.minLength !== null) {
            if (ctx.data.length < def.minLength.value) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.too_small,
                    minimum: def.minLength.value,
                    type: "array",
                    inclusive: true,
                    exact: false,
                    message: def.minLength.message,
                });
                status.dirty();
            }
        }
        if (def.maxLength !== null) {
            if (ctx.data.length > def.maxLength.value) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.too_big,
                    maximum: def.maxLength.value,
                    type: "array",
                    inclusive: true,
                    exact: false,
                    message: def.maxLength.message,
                });
                status.dirty();
            }
        }
        if (ctx.common.async) {
            return Promise.all([...ctx.data].map((item, i) => {
                return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
            })).then((result) => {
                return ParseStatus.mergeArray(status, result);
            });
        }
        const result = [...ctx.data].map((item, i) => {
            return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
        });
        return ParseStatus.mergeArray(status, result);
    }
    get element() {
        return this._def.type;
    }
    min(minLength, message) {
        return new ZodArray({
            ...this._def,
            minLength: { value: minLength, message: errorUtil.toString(message) },
        });
    }
    max(maxLength, message) {
        return new ZodArray({
            ...this._def,
            maxLength: { value: maxLength, message: errorUtil.toString(message) },
        });
    }
    length(len, message) {
        return new ZodArray({
            ...this._def,
            exactLength: { value: len, message: errorUtil.toString(message) },
        });
    }
    nonempty(message) {
        return this.min(1, message);
    }
}
ZodArray.create = (schema, params) => {
    return new ZodArray({
        type: schema,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: ZodFirstPartyTypeKind.ZodArray,
        ...processCreateParams(params),
    });
};
function deepPartialify(schema) {
    if (schema instanceof ZodObject) {
        const newShape = {};
        for (const key in schema.shape) {
            const fieldSchema = schema.shape[key];
            newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
        }
        return new ZodObject({
            ...schema._def,
            shape: () => newShape,
        });
    }
    else if (schema instanceof ZodArray) {
        return new ZodArray({
            ...schema._def,
            type: deepPartialify(schema.element),
        });
    }
    else if (schema instanceof ZodOptional) {
        return ZodOptional.create(deepPartialify(schema.unwrap()));
    }
    else if (schema instanceof ZodNullable) {
        return ZodNullable.create(deepPartialify(schema.unwrap()));
    }
    else if (schema instanceof ZodTuple) {
        return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
    }
    else {
        return schema;
    }
}
class ZodObject extends ZodType {
    constructor() {
        super(...arguments);
        this._cached = null;
        /**
         * @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
         * If you want to pass through unknown properties, use `.passthrough()` instead.
         */
        this.nonstrict = this.passthrough;
        // extend<
        //   Augmentation extends ZodRawShape,
        //   NewOutput extends util.flatten<{
        //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
        //       ? Augmentation[k]["_output"]
        //       : k extends keyof Output
        //       ? Output[k]
        //       : never;
        //   }>,
        //   NewInput extends util.flatten<{
        //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
        //       ? Augmentation[k]["_input"]
        //       : k extends keyof Input
        //       ? Input[k]
        //       : never;
        //   }>
        // >(
        //   augmentation: Augmentation
        // ): ZodObject<
        //   extendShape<T, Augmentation>,
        //   UnknownKeys,
        //   Catchall,
        //   NewOutput,
        //   NewInput
        // > {
        //   return new ZodObject({
        //     ...this._def,
        //     shape: () => ({
        //       ...this._def.shape(),
        //       ...augmentation,
        //     }),
        //   }) as any;
        // }
        /**
         * @deprecated Use `.extend` instead
         *  */
        this.augment = this.extend;
    }
    _getCached() {
        if (this._cached !== null)
            return this._cached;
        const shape = this._def.shape();
        const keys = util.objectKeys(shape);
        return (this._cached = { shape, keys });
    }
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.object) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.object,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const { status, ctx } = this._processInputParams(input);
        const { shape, keys: shapeKeys } = this._getCached();
        const extraKeys = [];
        if (!(this._def.catchall instanceof ZodNever &&
            this._def.unknownKeys === "strip")) {
            for (const key in ctx.data) {
                if (!shapeKeys.includes(key)) {
                    extraKeys.push(key);
                }
            }
        }
        const pairs = [];
        for (const key of shapeKeys) {
            const keyValidator = shape[key];
            const value = ctx.data[key];
            pairs.push({
                key: { status: "valid", value: key },
                value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
                alwaysSet: key in ctx.data,
            });
        }
        if (this._def.catchall instanceof ZodNever) {
            const unknownKeys = this._def.unknownKeys;
            if (unknownKeys === "passthrough") {
                for (const key of extraKeys) {
                    pairs.push({
                        key: { status: "valid", value: key },
                        value: { status: "valid", value: ctx.data[key] },
                    });
                }
            }
            else if (unknownKeys === "strict") {
                if (extraKeys.length > 0) {
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.unrecognized_keys,
                        keys: extraKeys,
                    });
                    status.dirty();
                }
            }
            else if (unknownKeys === "strip") ;
            else {
                throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
            }
        }
        else {
            // run catchall validation
            const catchall = this._def.catchall;
            for (const key of extraKeys) {
                const value = ctx.data[key];
                pairs.push({
                    key: { status: "valid", value: key },
                    value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key) //, ctx.child(key), value, getParsedType(value)
                    ),
                    alwaysSet: key in ctx.data,
                });
            }
        }
        if (ctx.common.async) {
            return Promise.resolve()
                .then(async () => {
                const syncPairs = [];
                for (const pair of pairs) {
                    const key = await pair.key;
                    const value = await pair.value;
                    syncPairs.push({
                        key,
                        value,
                        alwaysSet: pair.alwaysSet,
                    });
                }
                return syncPairs;
            })
                .then((syncPairs) => {
                return ParseStatus.mergeObjectSync(status, syncPairs);
            });
        }
        else {
            return ParseStatus.mergeObjectSync(status, pairs);
        }
    }
    get shape() {
        return this._def.shape();
    }
    strict(message) {
        errorUtil.errToObj;
        return new ZodObject({
            ...this._def,
            unknownKeys: "strict",
            ...(message !== undefined
                ? {
                    errorMap: (issue, ctx) => {
                        var _a, _b, _c, _d;
                        const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
                        if (issue.code === "unrecognized_keys")
                            return {
                                message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError,
                            };
                        return {
                            message: defaultError,
                        };
                    },
                }
                : {}),
        });
    }
    strip() {
        return new ZodObject({
            ...this._def,
            unknownKeys: "strip",
        });
    }
    passthrough() {
        return new ZodObject({
            ...this._def,
            unknownKeys: "passthrough",
        });
    }
    // const AugmentFactory =
    //   <Def extends ZodObjectDef>(def: Def) =>
    //   <Augmentation extends ZodRawShape>(
    //     augmentation: Augmentation
    //   ): ZodObject<
    //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
    //     Def["unknownKeys"],
    //     Def["catchall"]
    //   > => {
    //     return new ZodObject({
    //       ...def,
    //       shape: () => ({
    //         ...def.shape(),
    //         ...augmentation,
    //       }),
    //     }) as any;
    //   };
    extend(augmentation) {
        return new ZodObject({
            ...this._def,
            shape: () => ({
                ...this._def.shape(),
                ...augmentation,
            }),
        });
    }
    /**
     * Prior to zod@1.0.12 there was a bug in the
     * inferred type of merged objects. Please
     * upgrade if you are experiencing issues.
     */
    merge(merging) {
        const merged = new ZodObject({
            unknownKeys: merging._def.unknownKeys,
            catchall: merging._def.catchall,
            shape: () => ({
                ...this._def.shape(),
                ...merging._def.shape(),
            }),
            typeName: ZodFirstPartyTypeKind.ZodObject,
        });
        return merged;
    }
    // merge<
    //   Incoming extends AnyZodObject,
    //   Augmentation extends Incoming["shape"],
    //   NewOutput extends {
    //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
    //       ? Augmentation[k]["_output"]
    //       : k extends keyof Output
    //       ? Output[k]
    //       : never;
    //   },
    //   NewInput extends {
    //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
    //       ? Augmentation[k]["_input"]
    //       : k extends keyof Input
    //       ? Input[k]
    //       : never;
    //   }
    // >(
    //   merging: Incoming
    // ): ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"],
    //   NewOutput,
    //   NewInput
    // > {
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    setKey(key, schema) {
        return this.augment({ [key]: schema });
    }
    // merge<Incoming extends AnyZodObject>(
    //   merging: Incoming
    // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
    // ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"]
    // > {
    //   // const mergedShape = objectUtil.mergeShapes(
    //   //   this._def.shape(),
    //   //   merging._def.shape()
    //   // );
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    catchall(index) {
        return new ZodObject({
            ...this._def,
            catchall: index,
        });
    }
    pick(mask) {
        const shape = {};
        util.objectKeys(mask).forEach((key) => {
            if (mask[key] && this.shape[key]) {
                shape[key] = this.shape[key];
            }
        });
        return new ZodObject({
            ...this._def,
            shape: () => shape,
        });
    }
    omit(mask) {
        const shape = {};
        util.objectKeys(this.shape).forEach((key) => {
            if (!mask[key]) {
                shape[key] = this.shape[key];
            }
        });
        return new ZodObject({
            ...this._def,
            shape: () => shape,
        });
    }
    /**
     * @deprecated
     */
    deepPartial() {
        return deepPartialify(this);
    }
    partial(mask) {
        const newShape = {};
        util.objectKeys(this.shape).forEach((key) => {
            const fieldSchema = this.shape[key];
            if (mask && !mask[key]) {
                newShape[key] = fieldSchema;
            }
            else {
                newShape[key] = fieldSchema.optional();
            }
        });
        return new ZodObject({
            ...this._def,
            shape: () => newShape,
        });
    }
    required(mask) {
        const newShape = {};
        util.objectKeys(this.shape).forEach((key) => {
            if (mask && !mask[key]) {
                newShape[key] = this.shape[key];
            }
            else {
                const fieldSchema = this.shape[key];
                let newField = fieldSchema;
                while (newField instanceof ZodOptional) {
                    newField = newField._def.innerType;
                }
                newShape[key] = newField;
            }
        });
        return new ZodObject({
            ...this._def,
            shape: () => newShape,
        });
    }
    keyof() {
        return createZodEnum(util.objectKeys(this.shape));
    }
}
ZodObject.create = (shape, params) => {
    return new ZodObject({
        shape: () => shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
ZodObject.strictCreate = (shape, params) => {
    return new ZodObject({
        shape: () => shape,
        unknownKeys: "strict",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
ZodObject.lazycreate = (shape, params) => {
    return new ZodObject({
        shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
class ZodUnion extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const options = this._def.options;
        function handleResults(results) {
            // return first issue-free validation if it exists
            for (const result of results) {
                if (result.result.status === "valid") {
                    return result.result;
                }
            }
            for (const result of results) {
                if (result.result.status === "dirty") {
                    // add issues from dirty option
                    ctx.common.issues.push(...result.ctx.common.issues);
                    return result.result;
                }
            }
            // return invalid
            const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_union,
                unionErrors,
            });
            return INVALID;
        }
        if (ctx.common.async) {
            return Promise.all(options.map(async (option) => {
                const childCtx = {
                    ...ctx,
                    common: {
                        ...ctx.common,
                        issues: [],
                    },
                    parent: null,
                };
                return {
                    result: await option._parseAsync({
                        data: ctx.data,
                        path: ctx.path,
                        parent: childCtx,
                    }),
                    ctx: childCtx,
                };
            })).then(handleResults);
        }
        else {
            let dirty = undefined;
            const issues = [];
            for (const option of options) {
                const childCtx = {
                    ...ctx,
                    common: {
                        ...ctx.common,
                        issues: [],
                    },
                    parent: null,
                };
                const result = option._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: childCtx,
                });
                if (result.status === "valid") {
                    return result;
                }
                else if (result.status === "dirty" && !dirty) {
                    dirty = { result, ctx: childCtx };
                }
                if (childCtx.common.issues.length) {
                    issues.push(childCtx.common.issues);
                }
            }
            if (dirty) {
                ctx.common.issues.push(...dirty.ctx.common.issues);
                return dirty.result;
            }
            const unionErrors = issues.map((issues) => new ZodError(issues));
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_union,
                unionErrors,
            });
            return INVALID;
        }
    }
    get options() {
        return this._def.options;
    }
}
ZodUnion.create = (types, params) => {
    return new ZodUnion({
        options: types,
        typeName: ZodFirstPartyTypeKind.ZodUnion,
        ...processCreateParams(params),
    });
};
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
//////////                                 //////////
//////////      ZodDiscriminatedUnion      //////////
//////////                                 //////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
const getDiscriminator = (type) => {
    if (type instanceof ZodLazy) {
        return getDiscriminator(type.schema);
    }
    else if (type instanceof ZodEffects) {
        return getDiscriminator(type.innerType());
    }
    else if (type instanceof ZodLiteral) {
        return [type.value];
    }
    else if (type instanceof ZodEnum) {
        return type.options;
    }
    else if (type instanceof ZodNativeEnum) {
        // eslint-disable-next-line ban/ban
        return util.objectValues(type.enum);
    }
    else if (type instanceof ZodDefault) {
        return getDiscriminator(type._def.innerType);
    }
    else if (type instanceof ZodUndefined) {
        return [undefined];
    }
    else if (type instanceof ZodNull) {
        return [null];
    }
    else if (type instanceof ZodOptional) {
        return [undefined, ...getDiscriminator(type.unwrap())];
    }
    else if (type instanceof ZodNullable) {
        return [null, ...getDiscriminator(type.unwrap())];
    }
    else if (type instanceof ZodBranded) {
        return getDiscriminator(type.unwrap());
    }
    else if (type instanceof ZodReadonly) {
        return getDiscriminator(type.unwrap());
    }
    else if (type instanceof ZodCatch) {
        return getDiscriminator(type._def.innerType);
    }
    else {
        return [];
    }
};
class ZodDiscriminatedUnion extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.object,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const discriminator = this.discriminator;
        const discriminatorValue = ctx.data[discriminator];
        const option = this.optionsMap.get(discriminatorValue);
        if (!option) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_union_discriminator,
                options: Array.from(this.optionsMap.keys()),
                path: [discriminator],
            });
            return INVALID;
        }
        if (ctx.common.async) {
            return option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
        }
        else {
            return option._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
        }
    }
    get discriminator() {
        return this._def.discriminator;
    }
    get options() {
        return this._def.options;
    }
    get optionsMap() {
        return this._def.optionsMap;
    }
    /**
     * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
     * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
     * have a different value for each object in the union.
     * @param discriminator the name of the discriminator property
     * @param types an array of object schemas
     * @param params
     */
    static create(discriminator, options, params) {
        // Get all the valid discriminator values
        const optionsMap = new Map();
        // try {
        for (const type of options) {
            const discriminatorValues = getDiscriminator(type.shape[discriminator]);
            if (!discriminatorValues.length) {
                throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
            }
            for (const value of discriminatorValues) {
                if (optionsMap.has(value)) {
                    throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
                }
                optionsMap.set(value, type);
            }
        }
        return new ZodDiscriminatedUnion({
            typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
            discriminator,
            options,
            optionsMap,
            ...processCreateParams(params),
        });
    }
}
function mergeValues(a, b) {
    const aType = getParsedType(a);
    const bType = getParsedType(b);
    if (a === b) {
        return { valid: true, data: a };
    }
    else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
        const bKeys = util.objectKeys(b);
        const sharedKeys = util
            .objectKeys(a)
            .filter((key) => bKeys.indexOf(key) !== -1);
        const newObj = { ...a, ...b };
        for (const key of sharedKeys) {
            const sharedValue = mergeValues(a[key], b[key]);
            if (!sharedValue.valid) {
                return { valid: false };
            }
            newObj[key] = sharedValue.data;
        }
        return { valid: true, data: newObj };
    }
    else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
        if (a.length !== b.length) {
            return { valid: false };
        }
        const newArray = [];
        for (let index = 0; index < a.length; index++) {
            const itemA = a[index];
            const itemB = b[index];
            const sharedValue = mergeValues(itemA, itemB);
            if (!sharedValue.valid) {
                return { valid: false };
            }
            newArray.push(sharedValue.data);
        }
        return { valid: true, data: newArray };
    }
    else if (aType === ZodParsedType.date &&
        bType === ZodParsedType.date &&
        +a === +b) {
        return { valid: true, data: a };
    }
    else {
        return { valid: false };
    }
}
class ZodIntersection extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const handleParsed = (parsedLeft, parsedRight) => {
            if (isAborted(parsedLeft) || isAborted(parsedRight)) {
                return INVALID;
            }
            const merged = mergeValues(parsedLeft.value, parsedRight.value);
            if (!merged.valid) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.invalid_intersection_types,
                });
                return INVALID;
            }
            if (isDirty(parsedLeft) || isDirty(parsedRight)) {
                status.dirty();
            }
            return { status: status.value, value: merged.data };
        };
        if (ctx.common.async) {
            return Promise.all([
                this._def.left._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                }),
                this._def.right._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                }),
            ]).then(([left, right]) => handleParsed(left, right));
        }
        else {
            return handleParsed(this._def.left._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            }), this._def.right._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            }));
        }
    }
}
ZodIntersection.create = (left, right, params) => {
    return new ZodIntersection({
        left: left,
        right: right,
        typeName: ZodFirstPartyTypeKind.ZodIntersection,
        ...processCreateParams(params),
    });
};
class ZodTuple extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.array) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.array,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: this._def.items.length,
                inclusive: true,
                exact: false,
                type: "array",
            });
            return INVALID;
        }
        const rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: this._def.items.length,
                inclusive: true,
                exact: false,
                type: "array",
            });
            status.dirty();
        }
        const items = [...ctx.data]
            .map((item, itemIndex) => {
            const schema = this._def.items[itemIndex] || this._def.rest;
            if (!schema)
                return null;
            return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
        })
            .filter((x) => !!x); // filter nulls
        if (ctx.common.async) {
            return Promise.all(items).then((results) => {
                return ParseStatus.mergeArray(status, results);
            });
        }
        else {
            return ParseStatus.mergeArray(status, items);
        }
    }
    get items() {
        return this._def.items;
    }
    rest(rest) {
        return new ZodTuple({
            ...this._def,
            rest,
        });
    }
}
ZodTuple.create = (schemas, params) => {
    if (!Array.isArray(schemas)) {
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    }
    return new ZodTuple({
        items: schemas,
        typeName: ZodFirstPartyTypeKind.ZodTuple,
        rest: null,
        ...processCreateParams(params),
    });
};
class ZodRecord extends ZodType {
    get keySchema() {
        return this._def.keyType;
    }
    get valueSchema() {
        return this._def.valueType;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.object,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const pairs = [];
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        for (const key in ctx.data) {
            pairs.push({
                key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
                value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
                alwaysSet: key in ctx.data,
            });
        }
        if (ctx.common.async) {
            return ParseStatus.mergeObjectAsync(status, pairs);
        }
        else {
            return ParseStatus.mergeObjectSync(status, pairs);
        }
    }
    get element() {
        return this._def.valueType;
    }
    static create(first, second, third) {
        if (second instanceof ZodType) {
            return new ZodRecord({
                keyType: first,
                valueType: second,
                typeName: ZodFirstPartyTypeKind.ZodRecord,
                ...processCreateParams(third),
            });
        }
        return new ZodRecord({
            keyType: ZodString.create(),
            valueType: first,
            typeName: ZodFirstPartyTypeKind.ZodRecord,
            ...processCreateParams(second),
        });
    }
}
class ZodMap extends ZodType {
    get keySchema() {
        return this._def.keyType;
    }
    get valueSchema() {
        return this._def.valueType;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.map) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.map,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        const pairs = [...ctx.data.entries()].map(([key, value], index) => {
            return {
                key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
                value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"])),
            };
        });
        if (ctx.common.async) {
            const finalMap = new Map();
            return Promise.resolve().then(async () => {
                for (const pair of pairs) {
                    const key = await pair.key;
                    const value = await pair.value;
                    if (key.status === "aborted" || value.status === "aborted") {
                        return INVALID;
                    }
                    if (key.status === "dirty" || value.status === "dirty") {
                        status.dirty();
                    }
                    finalMap.set(key.value, value.value);
                }
                return { status: status.value, value: finalMap };
            });
        }
        else {
            const finalMap = new Map();
            for (const pair of pairs) {
                const key = pair.key;
                const value = pair.value;
                if (key.status === "aborted" || value.status === "aborted") {
                    return INVALID;
                }
                if (key.status === "dirty" || value.status === "dirty") {
                    status.dirty();
                }
                finalMap.set(key.value, value.value);
            }
            return { status: status.value, value: finalMap };
        }
    }
}
ZodMap.create = (keyType, valueType, params) => {
    return new ZodMap({
        valueType,
        keyType,
        typeName: ZodFirstPartyTypeKind.ZodMap,
        ...processCreateParams(params),
    });
};
class ZodSet extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.set) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.set,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const def = this._def;
        if (def.minSize !== null) {
            if (ctx.data.size < def.minSize.value) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.too_small,
                    minimum: def.minSize.value,
                    type: "set",
                    inclusive: true,
                    exact: false,
                    message: def.minSize.message,
                });
                status.dirty();
            }
        }
        if (def.maxSize !== null) {
            if (ctx.data.size > def.maxSize.value) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.too_big,
                    maximum: def.maxSize.value,
                    type: "set",
                    inclusive: true,
                    exact: false,
                    message: def.maxSize.message,
                });
                status.dirty();
            }
        }
        const valueType = this._def.valueType;
        function finalizeSet(elements) {
            const parsedSet = new Set();
            for (const element of elements) {
                if (element.status === "aborted")
                    return INVALID;
                if (element.status === "dirty")
                    status.dirty();
                parsedSet.add(element.value);
            }
            return { status: status.value, value: parsedSet };
        }
        const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
        if (ctx.common.async) {
            return Promise.all(elements).then((elements) => finalizeSet(elements));
        }
        else {
            return finalizeSet(elements);
        }
    }
    min(minSize, message) {
        return new ZodSet({
            ...this._def,
            minSize: { value: minSize, message: errorUtil.toString(message) },
        });
    }
    max(maxSize, message) {
        return new ZodSet({
            ...this._def,
            maxSize: { value: maxSize, message: errorUtil.toString(message) },
        });
    }
    size(size, message) {
        return this.min(size, message).max(size, message);
    }
    nonempty(message) {
        return this.min(1, message);
    }
}
ZodSet.create = (valueType, params) => {
    return new ZodSet({
        valueType,
        minSize: null,
        maxSize: null,
        typeName: ZodFirstPartyTypeKind.ZodSet,
        ...processCreateParams(params),
    });
};
class ZodFunction extends ZodType {
    constructor() {
        super(...arguments);
        this.validate = this.implement;
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.function) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.function,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        function makeArgsIssue(args, error) {
            return makeIssue({
                data: args,
                path: ctx.path,
                errorMaps: [
                    ctx.common.contextualErrorMap,
                    ctx.schemaErrorMap,
                    getErrorMap(),
                    errorMap,
                ].filter((x) => !!x),
                issueData: {
                    code: ZodIssueCode.invalid_arguments,
                    argumentsError: error,
                },
            });
        }
        function makeReturnsIssue(returns, error) {
            return makeIssue({
                data: returns,
                path: ctx.path,
                errorMaps: [
                    ctx.common.contextualErrorMap,
                    ctx.schemaErrorMap,
                    getErrorMap(),
                    errorMap,
                ].filter((x) => !!x),
                issueData: {
                    code: ZodIssueCode.invalid_return_type,
                    returnTypeError: error,
                },
            });
        }
        const params = { errorMap: ctx.common.contextualErrorMap };
        const fn = ctx.data;
        if (this._def.returns instanceof ZodPromise) {
            // Would love a way to avoid disabling this rule, but we need
            // an alias (using an arrow function was what caused 2651).
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const me = this;
            return OK(async function (...args) {
                const error = new ZodError([]);
                const parsedArgs = await me._def.args
                    .parseAsync(args, params)
                    .catch((e) => {
                    error.addIssue(makeArgsIssue(args, e));
                    throw error;
                });
                const result = await Reflect.apply(fn, this, parsedArgs);
                const parsedReturns = await me._def.returns._def.type
                    .parseAsync(result, params)
                    .catch((e) => {
                    error.addIssue(makeReturnsIssue(result, e));
                    throw error;
                });
                return parsedReturns;
            });
        }
        else {
            // Would love a way to avoid disabling this rule, but we need
            // an alias (using an arrow function was what caused 2651).
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const me = this;
            return OK(function (...args) {
                const parsedArgs = me._def.args.safeParse(args, params);
                if (!parsedArgs.success) {
                    throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
                }
                const result = Reflect.apply(fn, this, parsedArgs.data);
                const parsedReturns = me._def.returns.safeParse(result, params);
                if (!parsedReturns.success) {
                    throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
                }
                return parsedReturns.data;
            });
        }
    }
    parameters() {
        return this._def.args;
    }
    returnType() {
        return this._def.returns;
    }
    args(...items) {
        return new ZodFunction({
            ...this._def,
            args: ZodTuple.create(items).rest(ZodUnknown.create()),
        });
    }
    returns(returnType) {
        return new ZodFunction({
            ...this._def,
            returns: returnType,
        });
    }
    implement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
    }
    strictImplement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
    }
    static create(args, returns, params) {
        return new ZodFunction({
            args: (args
                ? args
                : ZodTuple.create([]).rest(ZodUnknown.create())),
            returns: returns || ZodUnknown.create(),
            typeName: ZodFirstPartyTypeKind.ZodFunction,
            ...processCreateParams(params),
        });
    }
}
class ZodLazy extends ZodType {
    get schema() {
        return this._def.getter();
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const lazySchema = this._def.getter();
        return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
    }
}
ZodLazy.create = (getter, params) => {
    return new ZodLazy({
        getter: getter,
        typeName: ZodFirstPartyTypeKind.ZodLazy,
        ...processCreateParams(params),
    });
};
class ZodLiteral extends ZodType {
    _parse(input) {
        if (input.data !== this._def.value) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                received: ctx.data,
                code: ZodIssueCode.invalid_literal,
                expected: this._def.value,
            });
            return INVALID;
        }
        return { status: "valid", value: input.data };
    }
    get value() {
        return this._def.value;
    }
}
ZodLiteral.create = (value, params) => {
    return new ZodLiteral({
        value: value,
        typeName: ZodFirstPartyTypeKind.ZodLiteral,
        ...processCreateParams(params),
    });
};
function createZodEnum(values, params) {
    return new ZodEnum({
        values,
        typeName: ZodFirstPartyTypeKind.ZodEnum,
        ...processCreateParams(params),
    });
}
class ZodEnum extends ZodType {
    constructor() {
        super(...arguments);
        _ZodEnum_cache.set(this, void 0);
    }
    _parse(input) {
        if (typeof input.data !== "string") {
            const ctx = this._getOrReturnCtx(input);
            const expectedValues = this._def.values;
            addIssueToContext(ctx, {
                expected: util.joinValues(expectedValues),
                received: ctx.parsedType,
                code: ZodIssueCode.invalid_type,
            });
            return INVALID;
        }
        if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f")) {
            __classPrivateFieldSet(this, _ZodEnum_cache, new Set(this._def.values), "f");
        }
        if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f").has(input.data)) {
            const ctx = this._getOrReturnCtx(input);
            const expectedValues = this._def.values;
            addIssueToContext(ctx, {
                received: ctx.data,
                code: ZodIssueCode.invalid_enum_value,
                options: expectedValues,
            });
            return INVALID;
        }
        return OK(input.data);
    }
    get options() {
        return this._def.values;
    }
    get enum() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    get Values() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    get Enum() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    extract(values, newDef = this._def) {
        return ZodEnum.create(values, {
            ...this._def,
            ...newDef,
        });
    }
    exclude(values, newDef = this._def) {
        return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
            ...this._def,
            ...newDef,
        });
    }
}
_ZodEnum_cache = new WeakMap();
ZodEnum.create = createZodEnum;
class ZodNativeEnum extends ZodType {
    constructor() {
        super(...arguments);
        _ZodNativeEnum_cache.set(this, void 0);
    }
    _parse(input) {
        const nativeEnumValues = util.getValidEnumValues(this._def.values);
        const ctx = this._getOrReturnCtx(input);
        if (ctx.parsedType !== ZodParsedType.string &&
            ctx.parsedType !== ZodParsedType.number) {
            const expectedValues = util.objectValues(nativeEnumValues);
            addIssueToContext(ctx, {
                expected: util.joinValues(expectedValues),
                received: ctx.parsedType,
                code: ZodIssueCode.invalid_type,
            });
            return INVALID;
        }
        if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f")) {
            __classPrivateFieldSet(this, _ZodNativeEnum_cache, new Set(util.getValidEnumValues(this._def.values)), "f");
        }
        if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f").has(input.data)) {
            const expectedValues = util.objectValues(nativeEnumValues);
            addIssueToContext(ctx, {
                received: ctx.data,
                code: ZodIssueCode.invalid_enum_value,
                options: expectedValues,
            });
            return INVALID;
        }
        return OK(input.data);
    }
    get enum() {
        return this._def.values;
    }
}
_ZodNativeEnum_cache = new WeakMap();
ZodNativeEnum.create = (values, params) => {
    return new ZodNativeEnum({
        values: values,
        typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
        ...processCreateParams(params),
    });
};
class ZodPromise extends ZodType {
    unwrap() {
        return this._def.type;
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.promise &&
            ctx.common.async === false) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.promise,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const promisified = ctx.parsedType === ZodParsedType.promise
            ? ctx.data
            : Promise.resolve(ctx.data);
        return OK(promisified.then((data) => {
            return this._def.type.parseAsync(data, {
                path: ctx.path,
                errorMap: ctx.common.contextualErrorMap,
            });
        }));
    }
}
ZodPromise.create = (schema, params) => {
    return new ZodPromise({
        type: schema,
        typeName: ZodFirstPartyTypeKind.ZodPromise,
        ...processCreateParams(params),
    });
};
class ZodEffects extends ZodType {
    innerType() {
        return this._def.schema;
    }
    sourceType() {
        return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects
            ? this._def.schema.sourceType()
            : this._def.schema;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const effect = this._def.effect || null;
        const checkCtx = {
            addIssue: (arg) => {
                addIssueToContext(ctx, arg);
                if (arg.fatal) {
                    status.abort();
                }
                else {
                    status.dirty();
                }
            },
            get path() {
                return ctx.path;
            },
        };
        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
        if (effect.type === "preprocess") {
            const processed = effect.transform(ctx.data, checkCtx);
            if (ctx.common.async) {
                return Promise.resolve(processed).then(async (processed) => {
                    if (status.value === "aborted")
                        return INVALID;
                    const result = await this._def.schema._parseAsync({
                        data: processed,
                        path: ctx.path,
                        parent: ctx,
                    });
                    if (result.status === "aborted")
                        return INVALID;
                    if (result.status === "dirty")
                        return DIRTY(result.value);
                    if (status.value === "dirty")
                        return DIRTY(result.value);
                    return result;
                });
            }
            else {
                if (status.value === "aborted")
                    return INVALID;
                const result = this._def.schema._parseSync({
                    data: processed,
                    path: ctx.path,
                    parent: ctx,
                });
                if (result.status === "aborted")
                    return INVALID;
                if (result.status === "dirty")
                    return DIRTY(result.value);
                if (status.value === "dirty")
                    return DIRTY(result.value);
                return result;
            }
        }
        if (effect.type === "refinement") {
            const executeRefinement = (acc) => {
                const result = effect.refinement(acc, checkCtx);
                if (ctx.common.async) {
                    return Promise.resolve(result);
                }
                if (result instanceof Promise) {
                    throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
                }
                return acc;
            };
            if (ctx.common.async === false) {
                const inner = this._def.schema._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (inner.status === "aborted")
                    return INVALID;
                if (inner.status === "dirty")
                    status.dirty();
                // return value is ignored
                executeRefinement(inner.value);
                return { status: status.value, value: inner.value };
            }
            else {
                return this._def.schema
                    ._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx })
                    .then((inner) => {
                    if (inner.status === "aborted")
                        return INVALID;
                    if (inner.status === "dirty")
                        status.dirty();
                    return executeRefinement(inner.value).then(() => {
                        return { status: status.value, value: inner.value };
                    });
                });
            }
        }
        if (effect.type === "transform") {
            if (ctx.common.async === false) {
                const base = this._def.schema._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (!isValid(base))
                    return base;
                const result = effect.transform(base.value, checkCtx);
                if (result instanceof Promise) {
                    throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
                }
                return { status: status.value, value: result };
            }
            else {
                return this._def.schema
                    ._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx })
                    .then((base) => {
                    if (!isValid(base))
                        return base;
                    return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
                });
            }
        }
        util.assertNever(effect);
    }
}
ZodEffects.create = (schema, effect, params) => {
    return new ZodEffects({
        schema,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect,
        ...processCreateParams(params),
    });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
    return new ZodEffects({
        schema,
        effect: { type: "preprocess", transform: preprocess },
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        ...processCreateParams(params),
    });
};
class ZodOptional extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.undefined) {
            return OK(undefined);
        }
        return this._def.innerType._parse(input);
    }
    unwrap() {
        return this._def.innerType;
    }
}
ZodOptional.create = (type, params) => {
    return new ZodOptional({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodOptional,
        ...processCreateParams(params),
    });
};
class ZodNullable extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.null) {
            return OK(null);
        }
        return this._def.innerType._parse(input);
    }
    unwrap() {
        return this._def.innerType;
    }
}
ZodNullable.create = (type, params) => {
    return new ZodNullable({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodNullable,
        ...processCreateParams(params),
    });
};
class ZodDefault extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        let data = ctx.data;
        if (ctx.parsedType === ZodParsedType.undefined) {
            data = this._def.defaultValue();
        }
        return this._def.innerType._parse({
            data,
            path: ctx.path,
            parent: ctx,
        });
    }
    removeDefault() {
        return this._def.innerType;
    }
}
ZodDefault.create = (type, params) => {
    return new ZodDefault({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodDefault,
        defaultValue: typeof params.default === "function"
            ? params.default
            : () => params.default,
        ...processCreateParams(params),
    });
};
class ZodCatch extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        // newCtx is used to not collect issues from inner types in ctx
        const newCtx = {
            ...ctx,
            common: {
                ...ctx.common,
                issues: [],
            },
        };
        const result = this._def.innerType._parse({
            data: newCtx.data,
            path: newCtx.path,
            parent: {
                ...newCtx,
            },
        });
        if (isAsync(result)) {
            return result.then((result) => {
                return {
                    status: "valid",
                    value: result.status === "valid"
                        ? result.value
                        : this._def.catchValue({
                            get error() {
                                return new ZodError(newCtx.common.issues);
                            },
                            input: newCtx.data,
                        }),
                };
            });
        }
        else {
            return {
                status: "valid",
                value: result.status === "valid"
                    ? result.value
                    : this._def.catchValue({
                        get error() {
                            return new ZodError(newCtx.common.issues);
                        },
                        input: newCtx.data,
                    }),
            };
        }
    }
    removeCatch() {
        return this._def.innerType;
    }
}
ZodCatch.create = (type, params) => {
    return new ZodCatch({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodCatch,
        catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
        ...processCreateParams(params),
    });
};
class ZodNaN extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.nan) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.nan,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return { status: "valid", value: input.data };
    }
}
ZodNaN.create = (params) => {
    return new ZodNaN({
        typeName: ZodFirstPartyTypeKind.ZodNaN,
        ...processCreateParams(params),
    });
};
const BRAND = Symbol("zod_brand");
class ZodBranded extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const data = ctx.data;
        return this._def.type._parse({
            data,
            path: ctx.path,
            parent: ctx,
        });
    }
    unwrap() {
        return this._def.type;
    }
}
class ZodPipeline extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.common.async) {
            const handleAsync = async () => {
                const inResult = await this._def.in._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (inResult.status === "aborted")
                    return INVALID;
                if (inResult.status === "dirty") {
                    status.dirty();
                    return DIRTY(inResult.value);
                }
                else {
                    return this._def.out._parseAsync({
                        data: inResult.value,
                        path: ctx.path,
                        parent: ctx,
                    });
                }
            };
            return handleAsync();
        }
        else {
            const inResult = this._def.in._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
            if (inResult.status === "aborted")
                return INVALID;
            if (inResult.status === "dirty") {
                status.dirty();
                return {
                    status: "dirty",
                    value: inResult.value,
                };
            }
            else {
                return this._def.out._parseSync({
                    data: inResult.value,
                    path: ctx.path,
                    parent: ctx,
                });
            }
        }
    }
    static create(a, b) {
        return new ZodPipeline({
            in: a,
            out: b,
            typeName: ZodFirstPartyTypeKind.ZodPipeline,
        });
    }
}
class ZodReadonly extends ZodType {
    _parse(input) {
        const result = this._def.innerType._parse(input);
        const freeze = (data) => {
            if (isValid(data)) {
                data.value = Object.freeze(data.value);
            }
            return data;
        };
        return isAsync(result)
            ? result.then((data) => freeze(data))
            : freeze(result);
    }
    unwrap() {
        return this._def.innerType;
    }
}
ZodReadonly.create = (type, params) => {
    return new ZodReadonly({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodReadonly,
        ...processCreateParams(params),
    });
};
////////////////////////////////////////
////////////////////////////////////////
//////////                    //////////
//////////      z.custom      //////////
//////////                    //////////
////////////////////////////////////////
////////////////////////////////////////
function cleanParams(params, data) {
    const p = typeof params === "function"
        ? params(data)
        : typeof params === "string"
            ? { message: params }
            : params;
    const p2 = typeof p === "string" ? { message: p } : p;
    return p2;
}
function custom(check, _params = {}, 
/**
 * @deprecated
 *
 * Pass `fatal` into the params object instead:
 *
 * ```ts
 * z.string().custom((val) => val.length > 5, { fatal: false })
 * ```
 *
 */
fatal) {
    if (check)
        return ZodAny.create().superRefine((data, ctx) => {
            var _a, _b;
            const r = check(data);
            if (r instanceof Promise) {
                return r.then((r) => {
                    var _a, _b;
                    if (!r) {
                        const params = cleanParams(_params, data);
                        const _fatal = (_b = (_a = params.fatal) !== null && _a !== void 0 ? _a : fatal) !== null && _b !== void 0 ? _b : true;
                        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
                    }
                });
            }
            if (!r) {
                const params = cleanParams(_params, data);
                const _fatal = (_b = (_a = params.fatal) !== null && _a !== void 0 ? _a : fatal) !== null && _b !== void 0 ? _b : true;
                ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
            }
            return;
        });
    return ZodAny.create();
}
const late = {
    object: ZodObject.lazycreate,
};
var ZodFirstPartyTypeKind;
(function (ZodFirstPartyTypeKind) {
    ZodFirstPartyTypeKind["ZodString"] = "ZodString";
    ZodFirstPartyTypeKind["ZodNumber"] = "ZodNumber";
    ZodFirstPartyTypeKind["ZodNaN"] = "ZodNaN";
    ZodFirstPartyTypeKind["ZodBigInt"] = "ZodBigInt";
    ZodFirstPartyTypeKind["ZodBoolean"] = "ZodBoolean";
    ZodFirstPartyTypeKind["ZodDate"] = "ZodDate";
    ZodFirstPartyTypeKind["ZodSymbol"] = "ZodSymbol";
    ZodFirstPartyTypeKind["ZodUndefined"] = "ZodUndefined";
    ZodFirstPartyTypeKind["ZodNull"] = "ZodNull";
    ZodFirstPartyTypeKind["ZodAny"] = "ZodAny";
    ZodFirstPartyTypeKind["ZodUnknown"] = "ZodUnknown";
    ZodFirstPartyTypeKind["ZodNever"] = "ZodNever";
    ZodFirstPartyTypeKind["ZodVoid"] = "ZodVoid";
    ZodFirstPartyTypeKind["ZodArray"] = "ZodArray";
    ZodFirstPartyTypeKind["ZodObject"] = "ZodObject";
    ZodFirstPartyTypeKind["ZodUnion"] = "ZodUnion";
    ZodFirstPartyTypeKind["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
    ZodFirstPartyTypeKind["ZodIntersection"] = "ZodIntersection";
    ZodFirstPartyTypeKind["ZodTuple"] = "ZodTuple";
    ZodFirstPartyTypeKind["ZodRecord"] = "ZodRecord";
    ZodFirstPartyTypeKind["ZodMap"] = "ZodMap";
    ZodFirstPartyTypeKind["ZodSet"] = "ZodSet";
    ZodFirstPartyTypeKind["ZodFunction"] = "ZodFunction";
    ZodFirstPartyTypeKind["ZodLazy"] = "ZodLazy";
    ZodFirstPartyTypeKind["ZodLiteral"] = "ZodLiteral";
    ZodFirstPartyTypeKind["ZodEnum"] = "ZodEnum";
    ZodFirstPartyTypeKind["ZodEffects"] = "ZodEffects";
    ZodFirstPartyTypeKind["ZodNativeEnum"] = "ZodNativeEnum";
    ZodFirstPartyTypeKind["ZodOptional"] = "ZodOptional";
    ZodFirstPartyTypeKind["ZodNullable"] = "ZodNullable";
    ZodFirstPartyTypeKind["ZodDefault"] = "ZodDefault";
    ZodFirstPartyTypeKind["ZodCatch"] = "ZodCatch";
    ZodFirstPartyTypeKind["ZodPromise"] = "ZodPromise";
    ZodFirstPartyTypeKind["ZodBranded"] = "ZodBranded";
    ZodFirstPartyTypeKind["ZodPipeline"] = "ZodPipeline";
    ZodFirstPartyTypeKind["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
const instanceOfType = (
// const instanceOfType = <T extends new (...args: any[]) => any>(
cls, params = {
    message: `Input not instance of ${cls.name}`,
}) => custom((data) => data instanceof cls, params);
const stringType = ZodString.create;
const numberType = ZodNumber.create;
const nanType = ZodNaN.create;
const bigIntType = ZodBigInt.create;
const booleanType = ZodBoolean.create;
const dateType = ZodDate.create;
const symbolType = ZodSymbol.create;
const undefinedType = ZodUndefined.create;
const nullType = ZodNull.create;
const anyType = ZodAny.create;
const unknownType = ZodUnknown.create;
const neverType = ZodNever.create;
const voidType = ZodVoid.create;
const arrayType = ZodArray.create;
const objectType = ZodObject.create;
const strictObjectType = ZodObject.strictCreate;
const unionType = ZodUnion.create;
const discriminatedUnionType = ZodDiscriminatedUnion.create;
const intersectionType = ZodIntersection.create;
const tupleType = ZodTuple.create;
const recordType = ZodRecord.create;
const mapType = ZodMap.create;
const setType = ZodSet.create;
const functionType = ZodFunction.create;
const lazyType = ZodLazy.create;
const literalType = ZodLiteral.create;
const enumType = ZodEnum.create;
const nativeEnumType = ZodNativeEnum.create;
const promiseType = ZodPromise.create;
const effectsType = ZodEffects.create;
const optionalType = ZodOptional.create;
const nullableType = ZodNullable.create;
const preprocessType = ZodEffects.createWithPreprocess;
const pipelineType = ZodPipeline.create;
const ostring = () => stringType().optional();
const onumber = () => numberType().optional();
const oboolean = () => booleanType().optional();
const coerce = {
    string: ((arg) => ZodString.create({ ...arg, coerce: true })),
    number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
    boolean: ((arg) => ZodBoolean.create({
        ...arg,
        coerce: true,
    })),
    bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
    date: ((arg) => ZodDate.create({ ...arg, coerce: true })),
};
const NEVER = INVALID;

var z = /*#__PURE__*/Object.freeze({
    __proto__: null,
    defaultErrorMap: errorMap,
    setErrorMap: setErrorMap,
    getErrorMap: getErrorMap,
    makeIssue: makeIssue,
    EMPTY_PATH: EMPTY_PATH,
    addIssueToContext: addIssueToContext,
    ParseStatus: ParseStatus,
    INVALID: INVALID,
    DIRTY: DIRTY,
    OK: OK,
    isAborted: isAborted,
    isDirty: isDirty,
    isValid: isValid,
    isAsync: isAsync,
    get util () { return util; },
    get objectUtil () { return objectUtil; },
    ZodParsedType: ZodParsedType,
    getParsedType: getParsedType,
    ZodType: ZodType,
    datetimeRegex: datetimeRegex,
    ZodString: ZodString,
    ZodNumber: ZodNumber,
    ZodBigInt: ZodBigInt,
    ZodBoolean: ZodBoolean,
    ZodDate: ZodDate,
    ZodSymbol: ZodSymbol,
    ZodUndefined: ZodUndefined,
    ZodNull: ZodNull,
    ZodAny: ZodAny,
    ZodUnknown: ZodUnknown,
    ZodNever: ZodNever,
    ZodVoid: ZodVoid,
    ZodArray: ZodArray,
    ZodObject: ZodObject,
    ZodUnion: ZodUnion,
    ZodDiscriminatedUnion: ZodDiscriminatedUnion,
    ZodIntersection: ZodIntersection,
    ZodTuple: ZodTuple,
    ZodRecord: ZodRecord,
    ZodMap: ZodMap,
    ZodSet: ZodSet,
    ZodFunction: ZodFunction,
    ZodLazy: ZodLazy,
    ZodLiteral: ZodLiteral,
    ZodEnum: ZodEnum,
    ZodNativeEnum: ZodNativeEnum,
    ZodPromise: ZodPromise,
    ZodEffects: ZodEffects,
    ZodTransformer: ZodEffects,
    ZodOptional: ZodOptional,
    ZodNullable: ZodNullable,
    ZodDefault: ZodDefault,
    ZodCatch: ZodCatch,
    ZodNaN: ZodNaN,
    BRAND: BRAND,
    ZodBranded: ZodBranded,
    ZodPipeline: ZodPipeline,
    ZodReadonly: ZodReadonly,
    custom: custom,
    Schema: ZodType,
    ZodSchema: ZodType,
    late: late,
    get ZodFirstPartyTypeKind () { return ZodFirstPartyTypeKind; },
    coerce: coerce,
    any: anyType,
    array: arrayType,
    bigint: bigIntType,
    boolean: booleanType,
    date: dateType,
    discriminatedUnion: discriminatedUnionType,
    effect: effectsType,
    'enum': enumType,
    'function': functionType,
    'instanceof': instanceOfType,
    intersection: intersectionType,
    lazy: lazyType,
    literal: literalType,
    map: mapType,
    nan: nanType,
    nativeEnum: nativeEnumType,
    never: neverType,
    'null': nullType,
    nullable: nullableType,
    number: numberType,
    object: objectType,
    oboolean: oboolean,
    onumber: onumber,
    optional: optionalType,
    ostring: ostring,
    pipeline: pipelineType,
    preprocess: preprocessType,
    promise: promiseType,
    record: recordType,
    set: setType,
    strictObject: strictObjectType,
    string: stringType,
    symbol: symbolType,
    transformer: effectsType,
    tuple: tupleType,
    'undefined': undefinedType,
    union: unionType,
    unknown: unknownType,
    'void': voidType,
    NEVER: NEVER,
    ZodIssueCode: ZodIssueCode,
    quotelessJson: quotelessJson,
    ZodError: ZodError
});




/***/ }),

/***/ 21987:
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"options_clipboard_permission_warning":{"message":"To copy and paste rules, allow AdGuard to access the clipboard. <a>Allow</a>"},"options_popup_title_placeholder":{"message":"Enter a filter name"},"options_filters_list_search_display_option_all_filters":{"message":"All filters"},"options_filters_list_search_display_option_enabled":{"message":"Enabled"},"options_filters_list_search_display_option_disabled":{"message":"Disabled"},"options_filters_empty_title":{"message":"Nothing found"},"options_filters_of_group":{"message":"Filters of \\"%groupName%\\" group"},"options_antibanner_custom_filter_already_exists":{"message":"This custom filter has already been added"},"options_filters_annoyances_consent_title":{"message":"Please read carefully before enabling annoyance filters"},"options_filters_annoyances_consent_description":{"message":"You are about to enable one or more annoyance filters. They block elements that are either unrelated to website content or related but annoying to your user experience. Website owners may consider these elements mandatory: if you block them, you may be violating their terms; some functionality of websites may not be available or may not work properly. You understand and agree that you are solely responsible to comply with the terms of use of websites you visit and that AdGuard is not responsible for your compliance with the terms of use of websites you visit."},"options_filters_annoyances_consent_question":{"message":"Enable these filters?"},"options_filters_annoyances_consent_filter_policy":{"message":"For details on what AdGuard\'s annoyance filters block, see <a>Filter policy</a>"},"options_filters_annoyances_consent_enable_button":{"message":"Enable"},"popup_header_cta_link":{"message":"How to enhance protection"},"popup_header_update_filters":{"message":"Check for filter updates"},"options_popup_import_settings_wrong_file_ext":{"message":"The file extension must be %extension%"},"popup_resume_protection_button":{"message":"Resume"},"popup_adguard_for_ios":{"message":"AdGuard for iOS"},"popup_adguard_for_android":{"message":"AdGuard for Android"},"options_filters_filter_version":{"message":"version:"},"options_filters_filter_link":{"message":"Go to homepage"},"options_filters_filter_updated":{"message":"updated:"},"options_filters_filter_tags":{"message":"Filter tags"},"options_filters_back_button":{"message":"Go back"},"options_popup_version_update_disable_notification":{"message":"Disable notifications"},"popup_adguard_footer_title":{"message":"Protect your mobile device"},"options_popup_call_to_action":{"message":"Enter the valid URL or file path of the filter into the field above."},"options_popup_description":{"message":"You will be subscribed to that filter."},"options_popup_url_title":{"message":"New filter subscription"},"options_popup_url_placeholder":{"message":"Enter URL or file path"},"options_popup_next_button":{"message":"Next"},"options_popup_checking_filter":{"message":"Checking your filter"},"options_popup_check_false_title":{"message":"Error"},"options_popup_check_false_description":{"message":"Error while adding your custom filter."},"options_add_custom_filter_modal_title":{"message":"Add custom filter"},"options_add_custom_filter_modal_checking_filter":{"message":"Checking your filter..."},"options_add_custom_filter_modal_error_title":{"message":"Failed to add custom filter"},"options_add_custom_filter_modal_error_subtitle":{"message":"Please try again or contact support"},"options_add_custom_filter_modal_add_button":{"message":"Add"},"options_add_custom_filter_modal_filter_name":{"message":"Filter name:"},"options_add_custom_filter_modal_filter_trusted":{"message":"Trusted"},"options_add_custom_filter_modal_filter_trusted_description":{"message":"Some filter rules can significantly alter your browsing experience and compromise your privacy. Make sure to only use filters from developers you trust"},"options_popup_try_again_button":{"message":"Try again"},"options_popup_filter_title":{"message":"Title:"},"options_popup_filter_description":{"message":"Description:"},"options_popup_filter_version":{"message":"Version:"},"options_popup_filter_rules_count":{"message":"Rules count:"},"options_popup_filter_homepage":{"message":"Homepage:"},"options_popup_filter_url":{"message":"URL:"},"options_popup_subscribe_button":{"message":"Subscribe"},"name":{"message":"AdGuard AdBlocker"},"description":{"message":"Unmatched adblock extension against advertising and pop-ups. Blocks ads on Facebook, YouTube and all other websites.","description":"TEXT MAX LENGTH: 132"},"background_tab_title":{"message":"Background tab"},"options_allowlist":{"message":"Allowlist"},"options_allowlist_desc":{"message":"AdGuard does not filter websites from the allowlist"},"options_allowlist_invert":{"message":"Invert allowlist"},"options_allowlist_invert_desc":{"message":"Unblock ads everywhere except for the allowlist"},"options_allowlist_alert_invert":{"message":"Allowlist is inverted. Ads are blocked only on websites added to it. <a>Disable</a>"},"options_allowlist_leave_subtitle":{"message":"Your changes to Allowlist will be lost"},"options_userfilter":{"message":"User rules"},"filtering_log_modified_rules":{"message":"Modified rules: %rules_count%"},"filtering_log_stealth_rules":{"message":"Tracking protection rules: %rules_count%"},"filtering_log_privacy_applied_rules":{"message":"Tracking protection applied"},"filtering_log_in_allowlist":{"message":"The site is allowed"},"filtering_log_hide_referrer":{"message":"Referer hidden from third-parties"},"filtering_log_hide_search_queries":{"message":"Your search queries hidden"},"filtering_log_remove_client_data":{"message":"X-Client-Data header removed"},"filtering_log_send_not_track":{"message":"Do-Not-Track header sent"},"options_select_update_period_default":{"message":"Default"},"options_select_update_period_48h":{"message":"48 hours"},"options_select_update_period_24h":{"message":"24 hours"},"options_select_update_period_12h":{"message":"12 hours"},"options_select_update_period_6h":{"message":"6 hours"},"options_select_update_period_1h":{"message":"1 hour"},"options_select_update_period_disabled":{"message":"Disabled"},"options_filters":{"message":"Filters"},"options_antibanner_rules_count":{"message":"Filter rules count: %rules_count%"},"options_antibanner_custom_group":{"message":"Custom"},"options_antibanner_custom_group_description":{"message":"Use third-party filters with AdGuard"},"options_filters_enabled_per_group":{"message":"Enabled: %current% of %total%"},"options_filters_enabled":{"message":"Enabled:"},"options_filters_enabled_and_more":{"message":"%enabled% and %more% more"},"options_filters_enabled_and_last":{"message":"%enabled% and %last%"},"options_filters_no_enabled":{"message":"No filters enabled"},"options_filters_filter_trusted_tag_desc":{"message":"You chose to trust this filter."},"options_filters_info_mv3_total_rules":{"message":"Total rules: %num%"},"options_add_custom_filter":{"message":"Add custom filter"},"options_empty_custom_filter":{"message":"You don\'t have any custom filters yet"},"options_loader_applying_changes":{"message":"Applying changes..."},"options_editor_indicator_saving":{"message":"Saving..."},"options_editor_indicator_saved":{"message":"Saved"},"options_popup_import_error_required_privacy_permission":{"message":"To import this settings file, allow AdGuard to change your privacy-related settings."},"options_popup_import_success_title":{"message":"Settings imported"},"options_popup_import_error_title":{"message":"Failed to import settings"},"options_popup_import_error_file_description":{"message":"Something went wrong."},"options_popup_trusted_filter_title":{"message":"Trusted"},"options_popup_trusted_filter_description":{"message":"Trusted filters can use powerful filtering rules modifiers which can be dangerous in the wrong hands. Do not check this box unless you fully trust it."},"popup_site_filtering_state_secure_page":{"message":"Secure page"},"popup_site_filtering_state_loading":{"message":"Loading..."},"popup_site_filtering_state_enabling":{"message":"Enabling protection..."},"popup_site_filtering_state_enabled":{"message":"Protection is enabled"},"popup_site_filtering_state_disabling":{"message":"Disabling protection..."},"popup_site_filtering_state_disabled":{"message":"Protection is disabled"},"popup_site_filtering_state_pausing":{"message":"Pausing protection..."},"popup_site_filtering_state_paused":{"message":"Protection is paused"},"popup_site_filtering_state_resuming":{"message":"Resuming protection..."},"popup_site_filtering_state_subtitle_all_websites":{"message":"for all websites"},"popup_site_exception_information":{"message":"Filtering is disabled because it can interfere with this website\'s operation."},"popup_tab_current_website":{"message":"Current website"},"popup_tab_blocked_count":{"message":"Blocked: %num%"},"popup_tab_blocked_all_count":{"message":"Total blocked: %num%"},"popup_statistics_total":{"message":"Total"},"popup_statistics_category_label":{"message":"Statistics category"},"popup_statistics_all_categories":{"message":"All"},"popup_statistics_category_advertising":{"message":"Advertising"},"popup_statistics_category_trackers":{"message":"Trackers"},"popup_statistics_category_social_media":{"message":"Social media"},"popup_statistics_category_cdn":{"message":"CDN"},"popup_statistics_category_other":{"message":"Other"},"popup_statistics_week_days_mon":{"message":"Mon"},"popup_statistics_week_days_tue":{"message":"Tue"},"popup_statistics_week_days_wed":{"message":"Wed"},"popup_statistics_week_days_thu":{"message":"Thu"},"popup_statistics_week_days_fri":{"message":"Fri"},"popup_statistics_week_days_sat":{"message":"Sat"},"popup_statistics_week_days_sun":{"message":"Sun"},"popup_statistics_months_jan":{"message":"Jan"},"popup_statistics_months_feb":{"message":"Feb"},"popup_statistics_months_mar":{"message":"Mar"},"popup_statistics_months_apr":{"message":"Apr"},"popup_statistics_months_may":{"message":"May"},"popup_statistics_months_jun":{"message":"Jun"},"popup_statistics_months_jul":{"message":"Jul"},"popup_statistics_months_aug":{"message":"Aug"},"popup_statistics_months_sep":{"message":"Sep"},"popup_statistics_months_oct":{"message":"Oct"},"popup_statistics_months_nov":{"message":"Nov"},"popup_statistics_months_dec":{"message":"Dec"},"options_popup_updating_filters":{"message":"Updating filters..."},"options_popup_update_title_error":{"message":"Error updating filters"},"options_popup_update_not_found":{"message":"No updates found"},"options_popup_update_error":{"message":"Failed to get updates. Please try again later."},"options_popup_update_filter":{"message":"was updated."},"options_popup_update_filters":{"message":"were updated."},"options_popup_version_update_title_text":{"message":"AdGuard extension has been updated to version %current_version%"},"options_popup_version_update_description_minor":{"message":"This version contains mostly bugfixes and minor improvements."},"options_popup_version_update_description_major":{"message":"This is a major extension upgrade that brings a lot of new features and improvements."},"options_popup_version_update_changelog_text":{"message":"What\'s new in this version?"},"options_popup_version_update_offer":{"message":"Did you know that AdGuard capabilities are not limited to this browser?"},"options_popup_version_update_offer_button_text":{"message":"LEARN MORE"},"popup_block_site_ads_option":{"message":"Block ads manually"},"popup_security_report":{"message":"Check website security"},"popup_reset_page_user_rules":{"message":"Delete user rules for this website"},"popup_open_settings":{"message":"Open AdGuard settings"},"popup_protection_button":{"message":"AdGuard protection"},"context_block_site_ads":{"message":"Block ads manually"},"context_security_report":{"message":"Check website security"},"context_complaint_website":{"message":"Report an issue"},"context_site_filtering_disabled":{"message":"AdGuard can\'t filter this page"},"context_disable_protection":{"message":"Pause AdGuard protection"},"context_enable_protection":{"message":"Resume AdGuard protection"},"context_site_protection_disabled":{"message":"AdGuard protection is paused"},"context_open_settings":{"message":"AdGuard settings"},"context_open_log":{"message":"Filtering log"},"context_site_exception":{"message":"This website is in the exceptions"},"context_site_filtering_on":{"message":"Enable filtering on this website"},"context_site_filtering_off":{"message":"Disable filtering on this website"},"context_update_antibanner_filters":{"message":"Check for filter updates"},"alert_popup_filter_enabled_title":{"message":"Auto-activation of the filters"},"alert_popup_filter_enabled_desc":{"message":"%filter_name% has been activated automatically."},"filters_download_title":{"message":"Filters database is loading..."},"filters_download_loading":{"message":"Please wait while filters database is loading..."},"post_install_loading":{"message":"Loading extension..."},"filtering_modal_element":{"message":"Element:"},"filtering_modal_cookie":{"message":"Cookie:"},"filtering_modal_important":{"message":"Give a higher priority to the rule"},"filtering_log_title":{"message":"Filtering log"},"filtering_log_search_string":{"message":"Filter log records"},"filtering_log_search_tabs_placeholder":{"message":"Search in tabs"},"filtering_log_preserve_log_off":{"message":"Do not record log"},"filtering_log_preserve_log_on":{"message":"Record log"},"filtering_refresh_tab_short":{"message":"Refresh"},"filtering_clear_log_events":{"message":"Clear log"},"filtering_type_all":{"message":"All"},"filtering_type_other":{"message":"Other"},"filtering_table_status":{"message":"Status"},"filtering_table_type":{"message":"Type"},"filtering_table_rule":{"message":"Filtering rule"},"filtering_table_source":{"message":"Source"},"filtering_table_filter":{"message":"Filter"},"filtering_table_action":{"message":"Action"},"filtering_table_open_details":{"message":"Open details"},"filtering_table_empty_reload_page_desc":{"message":"Nothing found. <reset>Disable filters</reset> or <refresh>reload the page</refresh> to view log records."},"filtering_modal_info_title":{"message":"Request details"},"filtering_modal_preview_title":{"message":"Preview"},"filtering_modal_type":{"message":"Type:"},"filtering_modal_source":{"message":"Source:"},"filtering_modal_rule":{"message":"Rule:"},"filtering_modal_rules":{"message":"Rules:"},"filtering_modal_privacy":{"message":"Tracking protection:"},"filtering_modal_filter":{"message":"Filter:"},"filtering_modal_block":{"message":"Block"},"filtering_modal_block_again":{"message":"Block again"},"filtering_modal_unblock":{"message":"Unblock"},"filtering_modal_remove_user":{"message":"Delete rule"},"filtering_modal_preview_request_button":{"message":"Preview"},"filtering_modal_remove_allowlist":{"message":"Remove from the Allowlist"},"filtering_modal_add_title":{"message":"Adding a rule"},"filtering_modal_status_text_desc":{"message":"Status:"},"filtering_modal_status_text_error":{"message":"Failed to load preview. Please try again"},"filtering_modal_status_text_loading":{"message":"Loading..."},"filtering_modal_filtering_status_text_desc":{"message":"Filtering status:"},"filtering_modal_rule_text_desc":{"message":"Rule text:"},"filtering_modal_patterns_desc":{"message":"Patterns:"},"filtering_modal_options_desc":{"message":"Options:"},"filtering_modal_apply_domains":{"message":"Apply the rule to all websites"},"filtering_modal_third_party":{"message":"Apply to third-party requests only"},"filtering_modal_remove_param":{"message":"Remove query parameters"},"filtering_modal_add_rule":{"message":"Add a rule"},"filtering_modal_exception_title":{"message":"Add an exception"},"filtering_modal_open_in_new_tab":{"message":"Open in a new tab"},"filtering_modal_show_full_url":{"message":"Show full URL"},"filtering_modal_hide_full_url":{"message":"Hide full URL"},"filtering_modal_show_full_rule":{"message":"Show full rule"},"filtering_modal_hide_full_rule":{"message":"Hide full rule"},"filtering_modal_show_full_element":{"message":"Show full element"},"filtering_modal_hide_full_element":{"message":"Hide full element"},"filtering_modal_copy_to_clipboard":{"message":"Copy to clipboard"},"filtering_modal_copied":{"message":"Copied"},"filtering_modal_converted_to":{"message":"Converted to:"},"filtering_log_filter_regular":{"message":"Regular"},"filtering_log_filter_allowed":{"message":"Allowed"},"filtering_log_filter_blocked":{"message":"Blocked"},"filtering_log_filter_modified":{"message":"Modified"},"filtering_log_filter_user_rules":{"message":"User rules"},"filtering_log_status_processed":{"message":"Processed"},"filtering_log_status_allowed":{"message":"Allowed"},"filtering_log_status_blocked":{"message":"Blocked"},"filtering_log_status_modified":{"message":"Modified"},"options_skip_to_main_content":{"message":"Skip to main content"},"options_navigation":{"message":"Navigation"},"options_settings":{"message":"AdGuard Settings"},"options_general_settings":{"message":"General"},"options_block_acceptable_ads":{"message":"Block search ads and websites\' self-promotion"},"options_block_acceptable_ads_desc":{"message":"Remove self-promotional ads from websites and contextual ads from search results. <a>Learn more</a>"},"options_show_blocked_ads_count_title":{"message":"Indicate the number of blocked ads on the AdGuard extension icon"},"options_enable_autodetect_filter":{"message":"Activate the most appropriate filters automatically"},"options_enable_autodetect_filter_desc":{"message":"Language-specific filters will turn on depending on the site language"},"options_select_theme":{"message":"Theme"},"options_theme_selector_system":{"message":"System default"},"options_theme_selector_light":{"message":"Light"},"options_theme_selector_dark":{"message":"Dark"},"options_export_settings":{"message":"Export settings"},"options_import_settings":{"message":"Import settings"},"options_report_bug":{"message":"Report a bug"},"options_leave_feedback":{"message":"Leave feedback"},"options_privacy":{"message":"Tracking protection"},"options_update_antibanner_filters":{"message":"Check for filter updates"},"options_check_update_progress":{"message":"Checking..."},"options_set_update_interval":{"message":"Auto-update filters"},"options_set_update_interval_desc":{"message":"For more effective blocking, the filters need to be updated regularly"},"options_userfilter_export":{"message":"Export"},"options_editor_save":{"message":"Save"},"options_editor_leave_title":{"message":"Leave without saving?"},"options_editor_leave_confirm":{"message":"Yes, leave"},"options_editor_leave_cancel":{"message":"Back to editing"},"options_userfilter_import":{"message":"Import"},"options_userfilter_description_key":{"message":"You can add your own rules here. This option is recommended for advanced users familiar with HTML/CSS. Read the <a>filter rules tutorial</a> to learn how to write your own filter rules."},"options_userfilter_subtitle_key":{"message":"Fine-tune ad blocking with your own filtering rules"},"options_userfilter_line_break":{"message":"Line break"},"options_userfilter_line_break_off":{"message":"Line break: Disabled"},"options_userfilter_line_break_on":{"message":"Line break: Enabled"},"options_userfilter_leave_subtitle":{"message":"Your changes to the rules will be lost"},"options_open_changelog":{"message":"Changelog"},"options_safebrowsing_enabled":{"message":"Phishing and malware protection"},"options_safebrowsing_enabled_desc":{"message":"Enable AdGuard Browsing Security module that detects potentially malicious and phishing sites by checking them against an online database. <a>Read more</a>"},"options_site":{"message":"Official Website"},"options_discuss":{"message":"Discuss AdGuard"},"options_do_you_like_question":{"message":"Do you like AdGuard?"},"options_footer_like_us_cta":{"message":"Rate it!"},"options_miscellaneous_settings":{"message":"Additional settings"},"options_rule_syntax":{"message":"Rule syntax"},"options_rule_limits":{"message":"Rule limits"},"options_rule_limits_description":{"message":"Chrome limits the number of rules that can be applied"},"options_rule_limits_dynamic":{"message":"Dynamic rules"},"options_rule_limits_dynamic_user_rules":{"message":"User-added rules, such as <user_rules>user rules</user_rules>, <allowlist>allowlisted websites</allowlist>, and <custom_filters>custom filters</custom_filters>"},"options_rule_limits_dynamic_user_rules_no_custom_filters":{"message":"User-added rules, such as <user_rules>user rules</user_rules> and <allowlist>allowlisted websites</allowlist>"},"options_rule_limits_dynamic_unsafe":{"description":"Note: First dollar sign is used to escape the second one, so eventually only one dollar sign will be displayed","message":"Unsafe dynamic rules (used for some advanced modifiers, such as $$redirect or $$cookie) — included in user-added rules"},"options_rule_limits_dynamic_regex":{"message":"Regex rules — included in user-added rules"},"options_rule_limits_static_rulesets":{"message":"Static rulesets"},"options_rule_limits_static_rulesets_builtin":{"message":"<a>Built-in filters</a>, such as Block annoyances or Language-specific filters"},"options_rule_limits_static_rules":{"message":"Static rules"},"options_rule_limits_static_rules_all":{"message":"Rules from <a>built-in filters</a>"},"options_rule_limits_static_rules_regex":{"message":"Regex rules — included in the above"},"options_rule_limits_numbers":{"message":"%current% of %maximum%"},"options_rule_limits_warning_title":{"message":"The browser has modified the list of active filters"},"options_rule_limits_warning_explanation_title":{"message":"What happened?"},"options_rule_limits_warning_explanation_description":{"message":"The limit of active built-in rules was exceeded after an update or adding a new extension. As per Manifest V3, your Chrome browser reacted by disabling all the extension\'s built-in filters except the default ones."},"options_rule_limits_warning_list_enabled_before_title":{"message":"Filters enabled before the update"},"options_rule_limits_warning_list_enabled_now_title":{"message":"Filters enabled now"},"options_rule_limits_warning_actions_title":{"message":"Your possible actions"},"options_rule_limits_warning_actions_delete_filters":{"message":"Option 1. Delete unnecessary ad-blocking extensions from your browser. To reactivate the filters mentioned in the \\"Filters enabled before the update\\" section, click <a>reactivate filters.</a>"},"options_rule_limits_warning_actions_install_app":{"message":"Option 2. Install the AdGuard Ad Blocker app: it has no restrictions on filtering rules. <a>Get the AdGuard app</a>"},"options_rule_limits_warning_actions_close_warning_one_filter":{"message":"Option 3. If you\'re satisfied with the currently enabled default filter, <a>close this warning.</a>"},"options_rule_limits_warning_actions_close_warning_multiple_filters":{"message":"Option 3. If you\'re satisfied with the currently enabled default filters, <a>close this warning.</a>"},"options_all_limits_exceeded_warning":{"message":"You\'ve reached the limit of active built-in rules. Your browser has modified the list of active built-in filters. The number of filters enabled has changed from %expected% to %current%."},"options_limits_warning_static_filters":{"message":"You\'ve reached the limit of active built-in filters. %maximum% of %current% filters are enabled. To activate new rules, disable some built-in filters."},"options_limits_warning_static_rules":{"message":"You\'ve reached the limit of active built-in rules. %maximum% of %current% rules are enabled. To activate new rules, disable some built-in filters."},"options_limits_warning_static_regex_rules":{"message":"You\'ve reached the limit of active built-in regex rules. %maximum% of %current% regex rules are enabled. To activate new rules, disable some built-in filters."},"options_limits_warning_dynamic_rules":{"message":"You\'ve reached the limit of user-added rules. %maximum% of %current% rules are enabled."},"options_limits_warning_dynamic_unsafe_rules":{"message":"You\'ve reached the limit of user-added unsafe rules. %maximum% of %current% unsafe rules are enabled."},"options_limits_warning_dynamic_regex_rules":{"message":"You\'ve reached the limit of user-added regex rules. %maximum% of %current% regex rules are enabled."},"options_developer_mode_required":{"message":"Your browser restricts <external-link>some types of rules</external-link>. To apply all rules, enable <b>Developer mode</b> in your browser’s <settings-link>extension settings</settings-link>","description":"Note: <settings-link> and <external-link> are just <a> tags, so it would be rendered as a link."},"options_allow_user_scripts_required":{"message":"Your browser restricts <external-link>some types of rules</external-link>. To apply all rules, enable <b>Allow user scripts</b> in your browser’s <settings-link>extension settings</settings-link>","description":"Note: <settings-link> and <external-link> are just <a> tags, so it would be rendered as a link."},"options_custom_group_developer_mode_required":{"message":"To use custom filters, enable <b>Developer mode</b> in your browser’s <settings-link>extension settings</settings-link>","description":"Note: <settings-link> and <external-link> are just <a> tags, so it would be rendered as a link."},"options_custom_group_allow_user_scripts_required":{"message":"To use custom filters, enable <b>Allow user scripts</b> in your browser’s <settings-link>extension settings</settings-link>","description":"Note: <settings-link> and <external-link> are just <a> tags, so it would be rendered as a link."},"options_show_adguard_full_version_title":{"message":"Show information on the AdGuard full version"},"options_show_app_updated_notification":{"message":"Notify about extension updates"},"options_open_log":{"message":"Open filtering log"},"options_reset_stats":{"message":"Clear statistics"},"options_reset_stats_done":{"message":"Statistics have been reset"},"options_reset_settings":{"message":"Reset settings"},"options_reset_settings_done":{"message":"Settings have been reset"},"options_reset_settings_error":{"message":"Error while resetting settings"},"options_collect_hit_stats_title":{"message":"Help with the development of AdGuard filters"},"options_collect_hit_stats_desc":{"message":"Send <a>anonymous stats on ad filter usage</a> to help AdGuard improve its filters"},"options_show_context_menu_title":{"message":"Add AdGuard item to the browser\'s context menu"},"options_use_optimized_filters":{"message":"Use optimized filters"},"options_use_optimized_filters_desc":{"message":"Uses shorter versions of filters with only the most popular rules to save traffic. Better suited to mobile browsers"},"options_privacy_title":{"message":"Tracking protection"},"options_privacy_desc":{"message":"Protect your identity and sensitive personal information from thousands of online trackers by blocking the most popular tracking methods"},"options_hide_referrer_title":{"message":"Hide Referer from third parties"},"options_hide_referrer_desc":{"message":"Prevent third parties from knowing what website you are visiting"},"options_hide_search_queries_title":{"message":"Hide your search queries"},"options_hide_search_queries_desc":{"message":"Hide the queries for websites visited from a search engine"},"options_send_not_track_title":{"message":"Ask websites not to track you"},"options_send_not_track_desc":{"message":"Send the <gpc>Global Privacy Control</gpc> and <dnt>Do Not Track</dnt> signals to the websites you visit"},"options_stripped_tracking_parameters":{"message":"Tracking parameters removed"},"options_modified_first_party_cookie":{"message":"First-party cookie modified"},"options_modified_third_party_cookie":{"message":"Third-party cookie modified"},"options_remove_client_data_title":{"message":"Remove X-Client-Data header"},"options_remove_client_data_desc":{"message":"Block Google Chrome from sending its version and modifications information to Google domains"},"options_disable_webrtc_title":{"message":"Disable WebRTC"},"options_disable_webrtc_desc":{"message":"WebRTC can leak your IP address even if you use a proxy or a VPN. Disabling WebRTC can break some websites"},"options_strip_tracking_params_title":{"message":"Remove tracking parameters"},"options_strip_tracking_params_description":{"message":"Remove parameters from web requests with AdGuard URL Tracking filter"},"options_block_known_trackers_title":{"message":"Block trackers"},"options_block_known_trackers_description":{"message":"Block trackers and web analytics tools with AdGuard Tracking Protection filter"},"options_third_party_title":{"message":"Self-destruction of third-party cookies"},"options_third_party_desc":{"message":"Limit the lifetime of third-party cookies (minutes)"},"options_first_party_title":{"message":"Self-destruction of first-party cookies (not recommended)"},"options_first_party_desc":{"message":"Limit the lifetime of first-party cookies (minutes)"},"options_anonymized_usage_data_title":{"message":"Send anonymized extension usage data"},"options_anonymized_usage_data_description":{"message":"Sends anonymous stats on extension usage to AdGuard. <button>Learn more</button>"},"options_anonymized_usage_data_modal_title":{"message":"Extension usage data"},"options_anonymized_usage_data_modal_intro":{"message":"This data includes:"},"options_anonymized_usage_data_modal_list_item_screens":{"message":"Names of screens you interact with"},"options_anonymized_usage_data_modal_list_item_buttons":{"message":"Names of buttons you click"},"options_anonymized_usage_data_modal_list_item_session_ids":{"message":"Session identifiers"},"options_anonymized_usage_data_modal_reason":{"message":"We need this information to analyze and improve the functionality of AdGuard"},"options_anonymized_usage_data_modal_privacy_note":{"message":"This data is anonymous and only used internally. We never share it with third parties"},"options_anonymized_usage_data_modal_got_it_button":{"message":"Got it"},"popup_abuse_site":{"message":"Report an issue"},"popup_open_filtering_log":{"message":"Open filtering log"},"popup_tabs":{"message":"Tabs"},"popup_tab_actions":{"message":"Actions"},"popup_tab_statistics":{"message":"Statistics"},"popup_statistics_time_label":{"message":"Statistics time period"},"popup_statistics_time_day":{"message":"Last day"},"popup_statistics_time_week":{"message":"Last week"},"popup_statistics_time_month":{"message":"Last month"},"popup_statistics_time_year":{"message":"Last year"},"popup_switch_button":{"message":"Protection for current website"},"popup_limits_exceeded_warning":{"message":"Your browser has modified the list of active built-in filters"},"snack_on_websites_limits_exceeded_warning":{"message":"Rule limit exceeded in AdGuard Browser Extension. Please check your filters and disable the ones you don\'t need"},"short_name":{"message":"AdGuard"},"options_about":{"message":"About"},"options_privacy_policy":{"message":"Privacy Policy"},"options_acknowledgment":{"message":"Acknowledgments"},"options_github":{"message":"GitHub"},"options_about_version":{"message":"Version"},"options_about_libs":{"message":"Used libraries"},"options_copyright":{"message":"All rights reserved."},"options_remove_filter_confirm_modal_title":{"message":"Remove this filter?"},"options_remove_filter_confirm_modal_ok_button":{"message":"Remove"},"options_nav_better_than_extension":{"message":"Why is the AdGuard app better than the extension?"},"options_nav_compare":{"message":"Compare"},"options_filters_search":{"message":"Search"},"options_filters_search_filter":{"message":"Search filter"},"options_about_title":{"message":"AdGuard Browser extension"},"group_description_adblocking":{"message":"Configure ad blocking here to deal with annoying banners, pop-ups, video ads and such, once and for all"},"group_description_stealth":{"message":"Protect your identity and sensitive personal info from thousands of online trackers by blocking all known popular tracking methods"},"group_description_social":{"message":"Hide unwanted \\"Like\\"/\\"Share\\" buttons and other social media widgets"},"group_description_annoyances":{"message":"Remove pop-up windows and other annoying notifications like cookie notices"},"group_description_security":{"message":"Protect yourself from malware, phishing and other online threats"},"group_description_miscellaneous":{"message":"More settings to configure your web surfing with AdGuard even further"},"group_description_custom":{"message":"Create your own filters to fine-tune web filtering to your preference."},"group_description_lang":{"message":"Don\'t limit yourself — block ads on websites in any languages"},"fullscreen_user_rules_title":{"message":"User rules"},"options_user_rules_editor_stub_title":{"message":"Editor opened in another window"},"options_user_rules_editor_stub_subtitle":{"message":"Your rules will appear here after you close it"},"options_user_rules_editor_stub_go_to_editor_button":{"message":"Go to editor"},"options_editor_open_fullscreen_button_tooltip":{"message":"Open Editor in a new window"},"options_editor_close_fullscreen_button_tooltip":{"message":"Exit the window mode"},"options_clear_stats_confirm_modal_title":{"message":"Clear statistics?"},"options_clear_stats_confirm_modal_clear_button":{"message":"Clear"},"options_reset_settings_confirm_modal_title":{"message":"Reset settings?"},"options_reset_settings_confirm_modal_clear_button":{"message":"Reset"},"options_confirm_modal_cancel_button":{"message":"Cancel"},"filtering_log_details_modal_beautify_button":{"message":"Beautify"},"filtering_log_details_modal_back_button":{"message":"Back to request"},"filtering_log_details_modal_try_again":{"message":"Try again"},"filtering_log_tag_request_source":{"message":"Request source"},"filtering_log_tag_tooltip_first_party":{"message":"First-party requests"},"filtering_log_tag_tooltip_third_party":{"message":"Third-party requests"},"filtering_log_tag_request_status":{"message":"Request status"},"filtering_log_tag_tooltip_regular":{"message":"Requests processed without filtering"},"filtering_log_tag_tooltip_allowed":{"message":"Allowed and unblocked requests"},"filtering_log_tag_tooltip_blocked":{"message":"Blocked requests"},"filtering_log_tag_tooltip_modified":{"message":"Modified requests"},"filtering_log_tag_tooltip_user_rules":{"message":"Requests affected by user rules"},"filtering_log_tag_request_type":{"message":"Request type"},"filtering_log_tag_tooltip_html":{"message":"Documents and subdocuments"},"filtering_log_tag_tooltip_css":{"message":"Stylesheets"},"filtering_log_tag_tooltip_js":{"message":"Scripts"},"filtering_log_tag_tooltip_xhr":{"message":"XMLHttpRequests and fetch requests"},"filtering_log_tag_tooltip_img":{"message":"Images"},"filtering_log_tag_tooltip_media":{"message":"Media"},"filtering_log_tag_tooltip_other":{"message":"Fonts, pings, WebRTC, WebSocket..."},"filtering_log_badge_tooltip_third_party":{"message":"Third-party request"},"filtering_log_badge_tooltip_http_req_method":{"message":"HTTP request method"},"filtering_log_badge_tooltip_http_status_code":{"message":"HTTP status code"},"filtering_log_assumed_rule_description":{"message":"This is an assumed rule. For details, see our <a>Knowledge base</a>"},"options_stealth_general_title":{"message":"General"},"options_stealth_cookies_title":{"message":"Cookies"},"options_stealth_miscellaneous_title":{"message":"Miscellaneous"},"options_coming_soon":{"message":"Coming soon"},"blocking_pages_malware":{"message":"This web page at <strong>%host%</strong> has been reported as a malware page and has been blocked based on your security preferences."},"blocking_pages_phishing":{"message":"This web page at <strong>%host%</strong> has been reported as a phishing page and has been blocked based on your security preferences."},"blocking_pages_advanced_button":{"message":"Advanced"},"blocking_pages_more_info_button":{"message":"More information"},"blocking_pages_page_title":{"message":"Access denied"},"blocking_pages_safe_header_title":{"message":"AdGuard has blocked access to this page"},"blocking_pages_rule_header_title":{"message":"Blocked by AdGuard"},"blocking_pages_rule_content_title":{"message":"AdGuard has prevented this page from loading due to the following filter rule"},"blocking_pages_btn_go_back":{"message":"Go back"},"blocking_pages_btn_proceed":{"message":"Proceed anyway"},"text_collapser_show_default":{"message":"Show full text"},"text_collapser_hide_default":{"message":"Hide full text"},"close_button_title":{"message":"Close"},"clear_button_title":{"message":"Clear"},"update_check":{"message":"Check for updates"},"update_checking_in_progress":{"message":"Checking for updates..."},"update_available_title":{"message":"Updates available"},"update_available_desc":{"message":"To effectively block ads, keep your extension and filters up to date"},"update_available_update_btn":{"message":"Update"},"update_installing_in_progress_title":{"message":"Updating extension and filters..."},"update_installing_in_progress_desc":{"message":"The extension will restart after the update"},"update_not_needed":{"message":"Your extension and filters are up to date"},"update_failed_text":{"message":"Failed to complete the update"},"update_success_text":{"message":"Extension and filters updated"},"update_failed_try_again_btn":{"message":"Try again"},"filtering_modal_applied_rules":{"message":"| Applied rule: | Applied rules:","description":"WARNING: correct number of plural forms is required"},"filtering_modal_assumed_rules":{"message":"| Assumed rule: | Assumed rules:","description":"WARNING: correct number of plural forms is required"},"filtering_modal_original_rules":{"message":"| Original rule: | Original rules:","description":"WARNING: correct number of plural forms is required"},"filtering_modal_declarative_rule":{"message":"DNR rule:"}}');

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(21049));
/******/ }
]);