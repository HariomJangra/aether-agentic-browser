(self["webpackChunkbrowser_extension"] = self["webpackChunkbrowser_extension"] || []).push([[533],{

/***/ 67362:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ 78378:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



const base64 = __webpack_require__(67362)
const ieee754 = __webpack_require__(98319)
const customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null

exports.Buffer = Buffer
__webpack_unused_export__ = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

const K_MAX_LENGTH = 0x7fffffff
__webpack_unused_export__ = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    const arr = new Uint8Array(1)
    const proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  const buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  const valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  const b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  const length = byteLength(string, encoding) | 0
  let buf = createBuffer(length)

  const actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  const length = array.length < 0 ? 0 : checked(array.length) | 0
  const buf = createBuffer(length)
  for (let i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    const copy = new Uint8Array(arrayView)
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  let buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    const len = checked(obj.length) | 0
    const buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  let x = a.length
  let y = b.length

  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  let i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  const buffer = Buffer.allocUnsafe(length)
  let pos = 0
  for (i = 0; i < list.length; ++i) {
    let buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf)
        buf.copy(buffer, pos)
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        )
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos)
    }
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  const len = string.length
  const mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  let loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  const i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  const len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (let i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  const len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (let i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  const len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (let i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  const length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  let str = ''
  const max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  let x = thisEnd - thisStart
  let y = end - start
  const len = Math.min(x, y)

  const thisCopy = this.slice(thisStart, thisEnd)
  const targetCopy = target.slice(start, end)

  for (let i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  let indexSize = 1
  let arrLength = arr.length
  let valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  let i
  if (dir) {
    let foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      let found = true
      for (let j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  const remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  const strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  let i
  for (i = 0; i < length; ++i) {
    const parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  const remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  const res = []

  let i = start
  while (i < end) {
    const firstByte = buf[i]
    let codePoint = null
    let bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1

    if (i + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  const len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  let res = ''
  let i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  const len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  let out = ''
  for (let i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  const bytes = buf.slice(start, end)
  let res = ''
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (let i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  const len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  const newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  let val = this[offset + --byteLength]
  let mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const lo = first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24

  const hi = this[++offset] +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    last * 2 ** 24

  return BigInt(lo) + (BigInt(hi) << BigInt(32))
})

Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const hi = first * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  const lo = this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last

  return (BigInt(hi) << BigInt(32)) + BigInt(lo)
})

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let i = byteLength
  let mul = 1
  let val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = this[offset + 4] +
    this[offset + 5] * 2 ** 8 +
    this[offset + 6] * 2 ** 16 +
    (last << 24) // Overflow

  return (BigInt(val) << BigInt(32)) +
    BigInt(first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24)
})

Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  return (BigInt(val) << BigInt(32)) +
    BigInt(this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last)
})

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let mul = 1
  let i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let i = byteLength - 1
  let mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUint32LE =
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUint32BE =
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function wrtBigUInt64LE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  return offset
}

function wrtBigUInt64BE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset + 7] = lo
  lo = lo >> 8
  buf[offset + 6] = lo
  lo = lo >> 8
  buf[offset + 5] = lo
  lo = lo >> 8
  buf[offset + 4] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset + 3] = hi
  hi = hi >> 8
  buf[offset + 2] = hi
  hi = hi >> 8
  buf[offset + 1] = hi
  hi = hi >> 8
  buf[offset] = hi
  return offset + 8
}

Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = 0
  let mul = 1
  let sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = byteLength - 1
  let mul = 1
  let sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  const len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      const code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  let i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    const bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    const len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// CUSTOM ERRORS
// =============

// Simplified versions from Node, changed for Buffer-only usage
const errors = {}
function E (sym, getMessage, Base) {
  errors[sym] = class NodeError extends Base {
    constructor () {
      super()

      Object.defineProperty(this, 'message', {
        value: getMessage.apply(this, arguments),
        writable: true,
        configurable: true
      })

      // Add the error code to the name to include it in the stack trace.
      this.name = `${this.name} [${sym}]`
      // Access the stack to generate the error message including the error code
      // from the name.
      this.stack // eslint-disable-line no-unused-expressions
      // Reset the name to the actual name.
      delete this.name
    }

    get code () {
      return sym
    }

    set code (value) {
      Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: true,
        value,
        writable: true
      })
    }

    toString () {
      return `${this.name} [${sym}]: ${this.message}`
    }
  }
}

E('ERR_BUFFER_OUT_OF_BOUNDS',
  function (name) {
    if (name) {
      return `${name} is outside of buffer bounds`
    }

    return 'Attempt to access memory outside buffer bounds'
  }, RangeError)
E('ERR_INVALID_ARG_TYPE',
  function (name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`
  }, TypeError)
E('ERR_OUT_OF_RANGE',
  function (str, range, input) {
    let msg = `The value of "${str}" is out of range.`
    let received = input
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input))
    } else if (typeof input === 'bigint') {
      received = String(input)
      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
        received = addNumericalSeparator(received)
      }
      received += 'n'
    }
    msg += ` It must be ${range}. Received ${received}`
    return msg
  }, RangeError)

function addNumericalSeparator (val) {
  let res = ''
  let i = val.length
  const start = val[0] === '-' ? 1 : 0
  for (; i >= start + 4; i -= 3) {
    res = `_${val.slice(i - 3, i)}${res}`
  }
  return `${val.slice(0, i)}${res}`
}

// CHECK FUNCTIONS
// ===============

function checkBounds (buf, offset, byteLength) {
  validateNumber(offset, 'offset')
  if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
    boundsError(offset, buf.length - (byteLength + 1))
  }
}

function checkIntBI (value, min, max, buf, offset, byteLength) {
  if (value > max || value < min) {
    const n = typeof min === 'bigint' ? 'n' : ''
    let range
    if (byteLength > 3) {
      if (min === 0 || min === BigInt(0)) {
        range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`
      } else {
        range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +
                `${(byteLength + 1) * 8 - 1}${n}`
      }
    } else {
      range = `>= ${min}${n} and <= ${max}${n}`
    }
    throw new errors.ERR_OUT_OF_RANGE('value', range, value)
  }
  checkBounds(buf, offset, byteLength)
}

function validateNumber (value, name) {
  if (typeof value !== 'number') {
    throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
  }
}

function boundsError (value, length, type) {
  if (Math.floor(value) !== value) {
    validateNumber(value, type)
    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value)
  }

  if (length < 0) {
    throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
  }

  throw new errors.ERR_OUT_OF_RANGE(type || 'offset',
                                    `>= ${type ? 1 : 0} and <= ${length}`,
                                    value)
}

// HELPER FUNCTIONS
// ================

const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  let codePoint
  const length = string.length
  let leadSurrogate = null
  const bytes = []

  for (let i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  let c, hi, lo
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  let i
  for (i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = (function () {
  const alphabet = '0123456789abcdef'
  const table = new Array(256)
  for (let i = 0; i < 16; ++i) {
    const i16 = i * 16
    for (let j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

// Return not function with Error if BigInt not supported
function defineBigIntMethod (fn) {
  return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
}

function BufferBigIntNotDefined () {
  throw new Error('BigInt not supported')
}


/***/ }),

/***/ 50608:
/***/ (function(module) {

(function webpackUniversalModuleDefinition(root, factory) {
/* istanbul ignore next */
	if(true)
		module.exports = factory();
	else {}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __nested_webpack_require_583__(moduleId) {

/******/ 		// Check if module is in cache
/* istanbul ignore if */
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_583__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__nested_webpack_require_583__.m = modules;

/******/ 	// expose the module cache
/******/ 	__nested_webpack_require_583__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__nested_webpack_require_583__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __nested_webpack_require_583__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __nested_webpack_require_1808__) {

	"use strict";
	/*
	  Copyright JS Foundation and other contributors, https://js.foundation/

	  Redistribution and use in source and binary forms, with or without
	  modification, are permitted provided that the following conditions are met:

	    * Redistributions of source code must retain the above copyright
	      notice, this list of conditions and the following disclaimer.
	    * Redistributions in binary form must reproduce the above copyright
	      notice, this list of conditions and the following disclaimer in the
	      documentation and/or other materials provided with the distribution.

	  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
	  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
	  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
	  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	var comment_handler_1 = __nested_webpack_require_1808__(1);
	var jsx_parser_1 = __nested_webpack_require_1808__(3);
	var parser_1 = __nested_webpack_require_1808__(8);
	var tokenizer_1 = __nested_webpack_require_1808__(15);
	function parse(code, options, delegate) {
	    var commentHandler = null;
	    var proxyDelegate = function (node, metadata) {
	        if (delegate) {
	            delegate(node, metadata);
	        }
	        if (commentHandler) {
	            commentHandler.visit(node, metadata);
	        }
	    };
	    var parserDelegate = (typeof delegate === 'function') ? proxyDelegate : null;
	    var collectComment = false;
	    if (options) {
	        collectComment = (typeof options.comment === 'boolean' && options.comment);
	        var attachComment = (typeof options.attachComment === 'boolean' && options.attachComment);
	        if (collectComment || attachComment) {
	            commentHandler = new comment_handler_1.CommentHandler();
	            commentHandler.attach = attachComment;
	            options.comment = true;
	            parserDelegate = proxyDelegate;
	        }
	    }
	    var isModule = false;
	    if (options && typeof options.sourceType === 'string') {
	        isModule = (options.sourceType === 'module');
	    }
	    var parser;
	    if (options && typeof options.jsx === 'boolean' && options.jsx) {
	        parser = new jsx_parser_1.JSXParser(code, options, parserDelegate);
	    }
	    else {
	        parser = new parser_1.Parser(code, options, parserDelegate);
	    }
	    var program = isModule ? parser.parseModule() : parser.parseScript();
	    var ast = program;
	    if (collectComment && commentHandler) {
	        ast.comments = commentHandler.comments;
	    }
	    if (parser.config.tokens) {
	        ast.tokens = parser.tokens;
	    }
	    if (parser.config.tolerant) {
	        ast.errors = parser.errorHandler.errors;
	    }
	    return ast;
	}
	exports.parse = parse;
	function parseModule(code, options, delegate) {
	    var parsingOptions = options || {};
	    parsingOptions.sourceType = 'module';
	    return parse(code, parsingOptions, delegate);
	}
	exports.parseModule = parseModule;
	function parseScript(code, options, delegate) {
	    var parsingOptions = options || {};
	    parsingOptions.sourceType = 'script';
	    return parse(code, parsingOptions, delegate);
	}
	exports.parseScript = parseScript;
	function tokenize(code, options, delegate) {
	    var tokenizer = new tokenizer_1.Tokenizer(code, options);
	    var tokens;
	    tokens = [];
	    try {
	        while (true) {
	            var token = tokenizer.getNextToken();
	            if (!token) {
	                break;
	            }
	            if (delegate) {
	                token = delegate(token);
	            }
	            tokens.push(token);
	        }
	    }
	    catch (e) {
	        tokenizer.errorHandler.tolerate(e);
	    }
	    if (tokenizer.errorHandler.tolerant) {
	        tokens.errors = tokenizer.errors();
	    }
	    return tokens;
	}
	exports.tokenize = tokenize;
	var syntax_1 = __nested_webpack_require_1808__(2);
	exports.Syntax = syntax_1.Syntax;
	// Sync with *.json manifests.
	exports.version = '4.0.1';


/***/ },
/* 1 */
/***/ function(module, exports, __nested_webpack_require_6456__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var syntax_1 = __nested_webpack_require_6456__(2);
	var CommentHandler = (function () {
	    function CommentHandler() {
	        this.attach = false;
	        this.comments = [];
	        this.stack = [];
	        this.leading = [];
	        this.trailing = [];
	    }
	    CommentHandler.prototype.insertInnerComments = function (node, metadata) {
	        //  innnerComments for properties empty block
	        //  `function a() {/** comments **\/}`
	        if (node.type === syntax_1.Syntax.BlockStatement && node.body.length === 0) {
	            var innerComments = [];
	            for (var i = this.leading.length - 1; i >= 0; --i) {
	                var entry = this.leading[i];
	                if (metadata.end.offset >= entry.start) {
	                    innerComments.unshift(entry.comment);
	                    this.leading.splice(i, 1);
	                    this.trailing.splice(i, 1);
	                }
	            }
	            if (innerComments.length) {
	                node.innerComments = innerComments;
	            }
	        }
	    };
	    CommentHandler.prototype.findTrailingComments = function (metadata) {
	        var trailingComments = [];
	        if (this.trailing.length > 0) {
	            for (var i = this.trailing.length - 1; i >= 0; --i) {
	                var entry_1 = this.trailing[i];
	                if (entry_1.start >= metadata.end.offset) {
	                    trailingComments.unshift(entry_1.comment);
	                }
	            }
	            this.trailing.length = 0;
	            return trailingComments;
	        }
	        var entry = this.stack[this.stack.length - 1];
	        if (entry && entry.node.trailingComments) {
	            var firstComment = entry.node.trailingComments[0];
	            if (firstComment && firstComment.range[0] >= metadata.end.offset) {
	                trailingComments = entry.node.trailingComments;
	                delete entry.node.trailingComments;
	            }
	        }
	        return trailingComments;
	    };
	    CommentHandler.prototype.findLeadingComments = function (metadata) {
	        var leadingComments = [];
	        var target;
	        while (this.stack.length > 0) {
	            var entry = this.stack[this.stack.length - 1];
	            if (entry && entry.start >= metadata.start.offset) {
	                target = entry.node;
	                this.stack.pop();
	            }
	            else {
	                break;
	            }
	        }
	        if (target) {
	            var count = target.leadingComments ? target.leadingComments.length : 0;
	            for (var i = count - 1; i >= 0; --i) {
	                var comment = target.leadingComments[i];
	                if (comment.range[1] <= metadata.start.offset) {
	                    leadingComments.unshift(comment);
	                    target.leadingComments.splice(i, 1);
	                }
	            }
	            if (target.leadingComments && target.leadingComments.length === 0) {
	                delete target.leadingComments;
	            }
	            return leadingComments;
	        }
	        for (var i = this.leading.length - 1; i >= 0; --i) {
	            var entry = this.leading[i];
	            if (entry.start <= metadata.start.offset) {
	                leadingComments.unshift(entry.comment);
	                this.leading.splice(i, 1);
	            }
	        }
	        return leadingComments;
	    };
	    CommentHandler.prototype.visitNode = function (node, metadata) {
	        if (node.type === syntax_1.Syntax.Program && node.body.length > 0) {
	            return;
	        }
	        this.insertInnerComments(node, metadata);
	        var trailingComments = this.findTrailingComments(metadata);
	        var leadingComments = this.findLeadingComments(metadata);
	        if (leadingComments.length > 0) {
	            node.leadingComments = leadingComments;
	        }
	        if (trailingComments.length > 0) {
	            node.trailingComments = trailingComments;
	        }
	        this.stack.push({
	            node: node,
	            start: metadata.start.offset
	        });
	    };
	    CommentHandler.prototype.visitComment = function (node, metadata) {
	        var type = (node.type[0] === 'L') ? 'Line' : 'Block';
	        var comment = {
	            type: type,
	            value: node.value
	        };
	        if (node.range) {
	            comment.range = node.range;
	        }
	        if (node.loc) {
	            comment.loc = node.loc;
	        }
	        this.comments.push(comment);
	        if (this.attach) {
	            var entry = {
	                comment: {
	                    type: type,
	                    value: node.value,
	                    range: [metadata.start.offset, metadata.end.offset]
	                },
	                start: metadata.start.offset
	            };
	            if (node.loc) {
	                entry.comment.loc = node.loc;
	            }
	            node.type = type;
	            this.leading.push(entry);
	            this.trailing.push(entry);
	        }
	    };
	    CommentHandler.prototype.visit = function (node, metadata) {
	        if (node.type === 'LineComment') {
	            this.visitComment(node, metadata);
	        }
	        else if (node.type === 'BlockComment') {
	            this.visitComment(node, metadata);
	        }
	        else if (this.attach) {
	            this.visitNode(node, metadata);
	        }
	    };
	    return CommentHandler;
	}());
	exports.CommentHandler = CommentHandler;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Syntax = {
	    AssignmentExpression: 'AssignmentExpression',
	    AssignmentPattern: 'AssignmentPattern',
	    ArrayExpression: 'ArrayExpression',
	    ArrayPattern: 'ArrayPattern',
	    ArrowFunctionExpression: 'ArrowFunctionExpression',
	    AwaitExpression: 'AwaitExpression',
	    BlockStatement: 'BlockStatement',
	    BinaryExpression: 'BinaryExpression',
	    BreakStatement: 'BreakStatement',
	    CallExpression: 'CallExpression',
	    CatchClause: 'CatchClause',
	    ClassBody: 'ClassBody',
	    ClassDeclaration: 'ClassDeclaration',
	    ClassExpression: 'ClassExpression',
	    ConditionalExpression: 'ConditionalExpression',
	    ContinueStatement: 'ContinueStatement',
	    DoWhileStatement: 'DoWhileStatement',
	    DebuggerStatement: 'DebuggerStatement',
	    EmptyStatement: 'EmptyStatement',
	    ExportAllDeclaration: 'ExportAllDeclaration',
	    ExportDefaultDeclaration: 'ExportDefaultDeclaration',
	    ExportNamedDeclaration: 'ExportNamedDeclaration',
	    ExportSpecifier: 'ExportSpecifier',
	    ExpressionStatement: 'ExpressionStatement',
	    ForStatement: 'ForStatement',
	    ForOfStatement: 'ForOfStatement',
	    ForInStatement: 'ForInStatement',
	    FunctionDeclaration: 'FunctionDeclaration',
	    FunctionExpression: 'FunctionExpression',
	    Identifier: 'Identifier',
	    IfStatement: 'IfStatement',
	    ImportDeclaration: 'ImportDeclaration',
	    ImportDefaultSpecifier: 'ImportDefaultSpecifier',
	    ImportNamespaceSpecifier: 'ImportNamespaceSpecifier',
	    ImportSpecifier: 'ImportSpecifier',
	    Literal: 'Literal',
	    LabeledStatement: 'LabeledStatement',
	    LogicalExpression: 'LogicalExpression',
	    MemberExpression: 'MemberExpression',
	    MetaProperty: 'MetaProperty',
	    MethodDefinition: 'MethodDefinition',
	    NewExpression: 'NewExpression',
	    ObjectExpression: 'ObjectExpression',
	    ObjectPattern: 'ObjectPattern',
	    Program: 'Program',
	    Property: 'Property',
	    RestElement: 'RestElement',
	    ReturnStatement: 'ReturnStatement',
	    SequenceExpression: 'SequenceExpression',
	    SpreadElement: 'SpreadElement',
	    Super: 'Super',
	    SwitchCase: 'SwitchCase',
	    SwitchStatement: 'SwitchStatement',
	    TaggedTemplateExpression: 'TaggedTemplateExpression',
	    TemplateElement: 'TemplateElement',
	    TemplateLiteral: 'TemplateLiteral',
	    ThisExpression: 'ThisExpression',
	    ThrowStatement: 'ThrowStatement',
	    TryStatement: 'TryStatement',
	    UnaryExpression: 'UnaryExpression',
	    UpdateExpression: 'UpdateExpression',
	    VariableDeclaration: 'VariableDeclaration',
	    VariableDeclarator: 'VariableDeclarator',
	    WhileStatement: 'WhileStatement',
	    WithStatement: 'WithStatement',
	    YieldExpression: 'YieldExpression'
	};


/***/ },
/* 3 */
/***/ function(module, exports, __nested_webpack_require_15019__) {

	"use strict";
/* istanbul ignore next */
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var character_1 = __nested_webpack_require_15019__(4);
	var JSXNode = __nested_webpack_require_15019__(5);
	var jsx_syntax_1 = __nested_webpack_require_15019__(6);
	var Node = __nested_webpack_require_15019__(7);
	var parser_1 = __nested_webpack_require_15019__(8);
	var token_1 = __nested_webpack_require_15019__(13);
	var xhtml_entities_1 = __nested_webpack_require_15019__(14);
	token_1.TokenName[100 /* Identifier */] = 'JSXIdentifier';
	token_1.TokenName[101 /* Text */] = 'JSXText';
	// Fully qualified element name, e.g. <svg:path> returns "svg:path"
	function getQualifiedElementName(elementName) {
	    var qualifiedName;
	    switch (elementName.type) {
	        case jsx_syntax_1.JSXSyntax.JSXIdentifier:
	            var id = elementName;
	            qualifiedName = id.name;
	            break;
	        case jsx_syntax_1.JSXSyntax.JSXNamespacedName:
	            var ns = elementName;
	            qualifiedName = getQualifiedElementName(ns.namespace) + ':' +
	                getQualifiedElementName(ns.name);
	            break;
	        case jsx_syntax_1.JSXSyntax.JSXMemberExpression:
	            var expr = elementName;
	            qualifiedName = getQualifiedElementName(expr.object) + '.' +
	                getQualifiedElementName(expr.property);
	            break;
	        /* istanbul ignore next */
	        default:
	            break;
	    }
	    return qualifiedName;
	}
	var JSXParser = (function (_super) {
	    __extends(JSXParser, _super);
	    function JSXParser(code, options, delegate) {
	        return _super.call(this, code, options, delegate) || this;
	    }
	    JSXParser.prototype.parsePrimaryExpression = function () {
	        return this.match('<') ? this.parseJSXRoot() : _super.prototype.parsePrimaryExpression.call(this);
	    };
	    JSXParser.prototype.startJSX = function () {
	        // Unwind the scanner before the lookahead token.
	        this.scanner.index = this.startMarker.index;
	        this.scanner.lineNumber = this.startMarker.line;
	        this.scanner.lineStart = this.startMarker.index - this.startMarker.column;
	    };
	    JSXParser.prototype.finishJSX = function () {
	        // Prime the next lookahead.
	        this.nextToken();
	    };
	    JSXParser.prototype.reenterJSX = function () {
	        this.startJSX();
	        this.expectJSX('}');
	        // Pop the closing '}' added from the lookahead.
	        if (this.config.tokens) {
	            this.tokens.pop();
	        }
	    };
	    JSXParser.prototype.createJSXNode = function () {
	        this.collectComments();
	        return {
	            index: this.scanner.index,
	            line: this.scanner.lineNumber,
	            column: this.scanner.index - this.scanner.lineStart
	        };
	    };
	    JSXParser.prototype.createJSXChildNode = function () {
	        return {
	            index: this.scanner.index,
	            line: this.scanner.lineNumber,
	            column: this.scanner.index - this.scanner.lineStart
	        };
	    };
	    JSXParser.prototype.scanXHTMLEntity = function (quote) {
	        var result = '&';
	        var valid = true;
	        var terminated = false;
	        var numeric = false;
	        var hex = false;
	        while (!this.scanner.eof() && valid && !terminated) {
	            var ch = this.scanner.source[this.scanner.index];
	            if (ch === quote) {
	                break;
	            }
	            terminated = (ch === ';');
	            result += ch;
	            ++this.scanner.index;
	            if (!terminated) {
	                switch (result.length) {
	                    case 2:
	                        // e.g. '&#123;'
	                        numeric = (ch === '#');
	                        break;
	                    case 3:
	                        if (numeric) {
	                            // e.g. '&#x41;'
	                            hex = (ch === 'x');
	                            valid = hex || character_1.Character.isDecimalDigit(ch.charCodeAt(0));
	                            numeric = numeric && !hex;
	                        }
	                        break;
	                    default:
	                        valid = valid && !(numeric && !character_1.Character.isDecimalDigit(ch.charCodeAt(0)));
	                        valid = valid && !(hex && !character_1.Character.isHexDigit(ch.charCodeAt(0)));
	                        break;
	                }
	            }
	        }
	        if (valid && terminated && result.length > 2) {
	            // e.g. '&#x41;' becomes just '#x41'
	            var str = result.substr(1, result.length - 2);
	            if (numeric && str.length > 1) {
	                result = String.fromCharCode(parseInt(str.substr(1), 10));
	            }
	            else if (hex && str.length > 2) {
	                result = String.fromCharCode(parseInt('0' + str.substr(1), 16));
	            }
	            else if (!numeric && !hex && xhtml_entities_1.XHTMLEntities[str]) {
	                result = xhtml_entities_1.XHTMLEntities[str];
	            }
	        }
	        return result;
	    };
	    // Scan the next JSX token. This replaces Scanner#lex when in JSX mode.
	    JSXParser.prototype.lexJSX = function () {
	        var cp = this.scanner.source.charCodeAt(this.scanner.index);
	        // < > / : = { }
	        if (cp === 60 || cp === 62 || cp === 47 || cp === 58 || cp === 61 || cp === 123 || cp === 125) {
	            var value = this.scanner.source[this.scanner.index++];
	            return {
	                type: 7 /* Punctuator */,
	                value: value,
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: this.scanner.index - 1,
	                end: this.scanner.index
	            };
	        }
	        // " '
	        if (cp === 34 || cp === 39) {
	            var start = this.scanner.index;
	            var quote = this.scanner.source[this.scanner.index++];
	            var str = '';
	            while (!this.scanner.eof()) {
	                var ch = this.scanner.source[this.scanner.index++];
	                if (ch === quote) {
	                    break;
	                }
	                else if (ch === '&') {
	                    str += this.scanXHTMLEntity(quote);
	                }
	                else {
	                    str += ch;
	                }
	            }
	            return {
	                type: 8 /* StringLiteral */,
	                value: str,
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: start,
	                end: this.scanner.index
	            };
	        }
	        // ... or .
	        if (cp === 46) {
	            var n1 = this.scanner.source.charCodeAt(this.scanner.index + 1);
	            var n2 = this.scanner.source.charCodeAt(this.scanner.index + 2);
	            var value = (n1 === 46 && n2 === 46) ? '...' : '.';
	            var start = this.scanner.index;
	            this.scanner.index += value.length;
	            return {
	                type: 7 /* Punctuator */,
	                value: value,
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: start,
	                end: this.scanner.index
	            };
	        }
	        // `
	        if (cp === 96) {
	            // Only placeholder, since it will be rescanned as a real assignment expression.
	            return {
	                type: 10 /* Template */,
	                value: '',
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: this.scanner.index,
	                end: this.scanner.index
	            };
	        }
	        // Identifer can not contain backslash (char code 92).
	        if (character_1.Character.isIdentifierStart(cp) && (cp !== 92)) {
	            var start = this.scanner.index;
	            ++this.scanner.index;
	            while (!this.scanner.eof()) {
	                var ch = this.scanner.source.charCodeAt(this.scanner.index);
	                if (character_1.Character.isIdentifierPart(ch) && (ch !== 92)) {
	                    ++this.scanner.index;
	                }
	                else if (ch === 45) {
	                    // Hyphen (char code 45) can be part of an identifier.
	                    ++this.scanner.index;
	                }
	                else {
	                    break;
	                }
	            }
	            var id = this.scanner.source.slice(start, this.scanner.index);
	            return {
	                type: 100 /* Identifier */,
	                value: id,
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: start,
	                end: this.scanner.index
	            };
	        }
	        return this.scanner.lex();
	    };
	    JSXParser.prototype.nextJSXToken = function () {
	        this.collectComments();
	        this.startMarker.index = this.scanner.index;
	        this.startMarker.line = this.scanner.lineNumber;
	        this.startMarker.column = this.scanner.index - this.scanner.lineStart;
	        var token = this.lexJSX();
	        this.lastMarker.index = this.scanner.index;
	        this.lastMarker.line = this.scanner.lineNumber;
	        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
	        if (this.config.tokens) {
	            this.tokens.push(this.convertToken(token));
	        }
	        return token;
	    };
	    JSXParser.prototype.nextJSXText = function () {
	        this.startMarker.index = this.scanner.index;
	        this.startMarker.line = this.scanner.lineNumber;
	        this.startMarker.column = this.scanner.index - this.scanner.lineStart;
	        var start = this.scanner.index;
	        var text = '';
	        while (!this.scanner.eof()) {
	            var ch = this.scanner.source[this.scanner.index];
	            if (ch === '{' || ch === '<') {
	                break;
	            }
	            ++this.scanner.index;
	            text += ch;
	            if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                ++this.scanner.lineNumber;
	                if (ch === '\r' && this.scanner.source[this.scanner.index] === '\n') {
	                    ++this.scanner.index;
	                }
	                this.scanner.lineStart = this.scanner.index;
	            }
	        }
	        this.lastMarker.index = this.scanner.index;
	        this.lastMarker.line = this.scanner.lineNumber;
	        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
	        var token = {
	            type: 101 /* Text */,
	            value: text,
	            lineNumber: this.scanner.lineNumber,
	            lineStart: this.scanner.lineStart,
	            start: start,
	            end: this.scanner.index
	        };
	        if ((text.length > 0) && this.config.tokens) {
	            this.tokens.push(this.convertToken(token));
	        }
	        return token;
	    };
	    JSXParser.prototype.peekJSXToken = function () {
	        var state = this.scanner.saveState();
	        this.scanner.scanComments();
	        var next = this.lexJSX();
	        this.scanner.restoreState(state);
	        return next;
	    };
	    // Expect the next JSX token to match the specified punctuator.
	    // If not, an exception will be thrown.
	    JSXParser.prototype.expectJSX = function (value) {
	        var token = this.nextJSXToken();
	        if (token.type !== 7 /* Punctuator */ || token.value !== value) {
	            this.throwUnexpectedToken(token);
	        }
	    };
	    // Return true if the next JSX token matches the specified punctuator.
	    JSXParser.prototype.matchJSX = function (value) {
	        var next = this.peekJSXToken();
	        return next.type === 7 /* Punctuator */ && next.value === value;
	    };
	    JSXParser.prototype.parseJSXIdentifier = function () {
	        var node = this.createJSXNode();
	        var token = this.nextJSXToken();
	        if (token.type !== 100 /* Identifier */) {
	            this.throwUnexpectedToken(token);
	        }
	        return this.finalize(node, new JSXNode.JSXIdentifier(token.value));
	    };
	    JSXParser.prototype.parseJSXElementName = function () {
	        var node = this.createJSXNode();
	        var elementName = this.parseJSXIdentifier();
	        if (this.matchJSX(':')) {
	            var namespace = elementName;
	            this.expectJSX(':');
	            var name_1 = this.parseJSXIdentifier();
	            elementName = this.finalize(node, new JSXNode.JSXNamespacedName(namespace, name_1));
	        }
	        else if (this.matchJSX('.')) {
	            while (this.matchJSX('.')) {
	                var object = elementName;
	                this.expectJSX('.');
	                var property = this.parseJSXIdentifier();
	                elementName = this.finalize(node, new JSXNode.JSXMemberExpression(object, property));
	            }
	        }
	        return elementName;
	    };
	    JSXParser.prototype.parseJSXAttributeName = function () {
	        var node = this.createJSXNode();
	        var attributeName;
	        var identifier = this.parseJSXIdentifier();
	        if (this.matchJSX(':')) {
	            var namespace = identifier;
	            this.expectJSX(':');
	            var name_2 = this.parseJSXIdentifier();
	            attributeName = this.finalize(node, new JSXNode.JSXNamespacedName(namespace, name_2));
	        }
	        else {
	            attributeName = identifier;
	        }
	        return attributeName;
	    };
	    JSXParser.prototype.parseJSXStringLiteralAttribute = function () {
	        var node = this.createJSXNode();
	        var token = this.nextJSXToken();
	        if (token.type !== 8 /* StringLiteral */) {
	            this.throwUnexpectedToken(token);
	        }
	        var raw = this.getTokenRaw(token);
	        return this.finalize(node, new Node.Literal(token.value, raw));
	    };
	    JSXParser.prototype.parseJSXExpressionAttribute = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('{');
	        this.finishJSX();
	        if (this.match('}')) {
	            this.tolerateError('JSX attributes must only be assigned a non-empty expression');
	        }
	        var expression = this.parseAssignmentExpression();
	        this.reenterJSX();
	        return this.finalize(node, new JSXNode.JSXExpressionContainer(expression));
	    };
	    JSXParser.prototype.parseJSXAttributeValue = function () {
	        return this.matchJSX('{') ? this.parseJSXExpressionAttribute() :
	            this.matchJSX('<') ? this.parseJSXElement() : this.parseJSXStringLiteralAttribute();
	    };
	    JSXParser.prototype.parseJSXNameValueAttribute = function () {
	        var node = this.createJSXNode();
	        var name = this.parseJSXAttributeName();
	        var value = null;
	        if (this.matchJSX('=')) {
	            this.expectJSX('=');
	            value = this.parseJSXAttributeValue();
	        }
	        return this.finalize(node, new JSXNode.JSXAttribute(name, value));
	    };
	    JSXParser.prototype.parseJSXSpreadAttribute = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('{');
	        this.expectJSX('...');
	        this.finishJSX();
	        var argument = this.parseAssignmentExpression();
	        this.reenterJSX();
	        return this.finalize(node, new JSXNode.JSXSpreadAttribute(argument));
	    };
	    JSXParser.prototype.parseJSXAttributes = function () {
	        var attributes = [];
	        while (!this.matchJSX('/') && !this.matchJSX('>')) {
	            var attribute = this.matchJSX('{') ? this.parseJSXSpreadAttribute() :
	                this.parseJSXNameValueAttribute();
	            attributes.push(attribute);
	        }
	        return attributes;
	    };
	    JSXParser.prototype.parseJSXOpeningElement = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('<');
	        var name = this.parseJSXElementName();
	        var attributes = this.parseJSXAttributes();
	        var selfClosing = this.matchJSX('/');
	        if (selfClosing) {
	            this.expectJSX('/');
	        }
	        this.expectJSX('>');
	        return this.finalize(node, new JSXNode.JSXOpeningElement(name, selfClosing, attributes));
	    };
	    JSXParser.prototype.parseJSXBoundaryElement = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('<');
	        if (this.matchJSX('/')) {
	            this.expectJSX('/');
	            var name_3 = this.parseJSXElementName();
	            this.expectJSX('>');
	            return this.finalize(node, new JSXNode.JSXClosingElement(name_3));
	        }
	        var name = this.parseJSXElementName();
	        var attributes = this.parseJSXAttributes();
	        var selfClosing = this.matchJSX('/');
	        if (selfClosing) {
	            this.expectJSX('/');
	        }
	        this.expectJSX('>');
	        return this.finalize(node, new JSXNode.JSXOpeningElement(name, selfClosing, attributes));
	    };
	    JSXParser.prototype.parseJSXEmptyExpression = function () {
	        var node = this.createJSXChildNode();
	        this.collectComments();
	        this.lastMarker.index = this.scanner.index;
	        this.lastMarker.line = this.scanner.lineNumber;
	        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
	        return this.finalize(node, new JSXNode.JSXEmptyExpression());
	    };
	    JSXParser.prototype.parseJSXExpressionContainer = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('{');
	        var expression;
	        if (this.matchJSX('}')) {
	            expression = this.parseJSXEmptyExpression();
	            this.expectJSX('}');
	        }
	        else {
	            this.finishJSX();
	            expression = this.parseAssignmentExpression();
	            this.reenterJSX();
	        }
	        return this.finalize(node, new JSXNode.JSXExpressionContainer(expression));
	    };
	    JSXParser.prototype.parseJSXChildren = function () {
	        var children = [];
	        while (!this.scanner.eof()) {
	            var node = this.createJSXChildNode();
	            var token = this.nextJSXText();
	            if (token.start < token.end) {
	                var raw = this.getTokenRaw(token);
	                var child = this.finalize(node, new JSXNode.JSXText(token.value, raw));
	                children.push(child);
	            }
	            if (this.scanner.source[this.scanner.index] === '{') {
	                var container = this.parseJSXExpressionContainer();
	                children.push(container);
	            }
	            else {
	                break;
	            }
	        }
	        return children;
	    };
	    JSXParser.prototype.parseComplexJSXElement = function (el) {
	        var stack = [];
	        while (!this.scanner.eof()) {
	            el.children = el.children.concat(this.parseJSXChildren());
	            var node = this.createJSXChildNode();
	            var element = this.parseJSXBoundaryElement();
	            if (element.type === jsx_syntax_1.JSXSyntax.JSXOpeningElement) {
	                var opening = element;
	                if (opening.selfClosing) {
	                    var child = this.finalize(node, new JSXNode.JSXElement(opening, [], null));
	                    el.children.push(child);
	                }
	                else {
	                    stack.push(el);
	                    el = { node: node, opening: opening, closing: null, children: [] };
	                }
	            }
	            if (element.type === jsx_syntax_1.JSXSyntax.JSXClosingElement) {
	                el.closing = element;
	                var open_1 = getQualifiedElementName(el.opening.name);
	                var close_1 = getQualifiedElementName(el.closing.name);
	                if (open_1 !== close_1) {
	                    this.tolerateError('Expected corresponding JSX closing tag for %0', open_1);
	                }
	                if (stack.length > 0) {
	                    var child = this.finalize(el.node, new JSXNode.JSXElement(el.opening, el.children, el.closing));
	                    el = stack[stack.length - 1];
	                    el.children.push(child);
	                    stack.pop();
	                }
	                else {
	                    break;
	                }
	            }
	        }
	        return el;
	    };
	    JSXParser.prototype.parseJSXElement = function () {
	        var node = this.createJSXNode();
	        var opening = this.parseJSXOpeningElement();
	        var children = [];
	        var closing = null;
	        if (!opening.selfClosing) {
	            var el = this.parseComplexJSXElement({ node: node, opening: opening, closing: closing, children: children });
	            children = el.children;
	            closing = el.closing;
	        }
	        return this.finalize(node, new JSXNode.JSXElement(opening, children, closing));
	    };
	    JSXParser.prototype.parseJSXRoot = function () {
	        // Pop the opening '<' added from the lookahead.
	        if (this.config.tokens) {
	            this.tokens.pop();
	        }
	        this.startJSX();
	        var element = this.parseJSXElement();
	        this.finishJSX();
	        return element;
	    };
	    JSXParser.prototype.isStartOfExpression = function () {
	        return _super.prototype.isStartOfExpression.call(this) || this.match('<');
	    };
	    return JSXParser;
	}(parser_1.Parser));
	exports.JSXParser = JSXParser;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	// See also tools/generate-unicode-regex.js.
	var Regex = {
	    // Unicode v8.0.0 NonAsciiIdentifierStart:
	    NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
	    // Unicode v8.0.0 NonAsciiIdentifierPart:
	    NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
	};
	exports.Character = {
	    /* tslint:disable:no-bitwise */
	    fromCodePoint: function (cp) {
	        return (cp < 0x10000) ? String.fromCharCode(cp) :
	            String.fromCharCode(0xD800 + ((cp - 0x10000) >> 10)) +
	                String.fromCharCode(0xDC00 + ((cp - 0x10000) & 1023));
	    },
	    // https://tc39.github.io/ecma262/#sec-white-space
	    isWhiteSpace: function (cp) {
	        return (cp === 0x20) || (cp === 0x09) || (cp === 0x0B) || (cp === 0x0C) || (cp === 0xA0) ||
	            (cp >= 0x1680 && [0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(cp) >= 0);
	    },
	    // https://tc39.github.io/ecma262/#sec-line-terminators
	    isLineTerminator: function (cp) {
	        return (cp === 0x0A) || (cp === 0x0D) || (cp === 0x2028) || (cp === 0x2029);
	    },
	    // https://tc39.github.io/ecma262/#sec-names-and-keywords
	    isIdentifierStart: function (cp) {
	        return (cp === 0x24) || (cp === 0x5F) ||
	            (cp >= 0x41 && cp <= 0x5A) ||
	            (cp >= 0x61 && cp <= 0x7A) ||
	            (cp === 0x5C) ||
	            ((cp >= 0x80) && Regex.NonAsciiIdentifierStart.test(exports.Character.fromCodePoint(cp)));
	    },
	    isIdentifierPart: function (cp) {
	        return (cp === 0x24) || (cp === 0x5F) ||
	            (cp >= 0x41 && cp <= 0x5A) ||
	            (cp >= 0x61 && cp <= 0x7A) ||
	            (cp >= 0x30 && cp <= 0x39) ||
	            (cp === 0x5C) ||
	            ((cp >= 0x80) && Regex.NonAsciiIdentifierPart.test(exports.Character.fromCodePoint(cp)));
	    },
	    // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
	    isDecimalDigit: function (cp) {
	        return (cp >= 0x30 && cp <= 0x39); // 0..9
	    },
	    isHexDigit: function (cp) {
	        return (cp >= 0x30 && cp <= 0x39) ||
	            (cp >= 0x41 && cp <= 0x46) ||
	            (cp >= 0x61 && cp <= 0x66); // a..f
	    },
	    isOctalDigit: function (cp) {
	        return (cp >= 0x30 && cp <= 0x37); // 0..7
	    }
	};


/***/ },
/* 5 */
/***/ function(module, exports, __nested_webpack_require_54354__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var jsx_syntax_1 = __nested_webpack_require_54354__(6);
	/* tslint:disable:max-classes-per-file */
	var JSXClosingElement = (function () {
	    function JSXClosingElement(name) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXClosingElement;
	        this.name = name;
	    }
	    return JSXClosingElement;
	}());
	exports.JSXClosingElement = JSXClosingElement;
	var JSXElement = (function () {
	    function JSXElement(openingElement, children, closingElement) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXElement;
	        this.openingElement = openingElement;
	        this.children = children;
	        this.closingElement = closingElement;
	    }
	    return JSXElement;
	}());
	exports.JSXElement = JSXElement;
	var JSXEmptyExpression = (function () {
	    function JSXEmptyExpression() {
	        this.type = jsx_syntax_1.JSXSyntax.JSXEmptyExpression;
	    }
	    return JSXEmptyExpression;
	}());
	exports.JSXEmptyExpression = JSXEmptyExpression;
	var JSXExpressionContainer = (function () {
	    function JSXExpressionContainer(expression) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXExpressionContainer;
	        this.expression = expression;
	    }
	    return JSXExpressionContainer;
	}());
	exports.JSXExpressionContainer = JSXExpressionContainer;
	var JSXIdentifier = (function () {
	    function JSXIdentifier(name) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXIdentifier;
	        this.name = name;
	    }
	    return JSXIdentifier;
	}());
	exports.JSXIdentifier = JSXIdentifier;
	var JSXMemberExpression = (function () {
	    function JSXMemberExpression(object, property) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXMemberExpression;
	        this.object = object;
	        this.property = property;
	    }
	    return JSXMemberExpression;
	}());
	exports.JSXMemberExpression = JSXMemberExpression;
	var JSXAttribute = (function () {
	    function JSXAttribute(name, value) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXAttribute;
	        this.name = name;
	        this.value = value;
	    }
	    return JSXAttribute;
	}());
	exports.JSXAttribute = JSXAttribute;
	var JSXNamespacedName = (function () {
	    function JSXNamespacedName(namespace, name) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXNamespacedName;
	        this.namespace = namespace;
	        this.name = name;
	    }
	    return JSXNamespacedName;
	}());
	exports.JSXNamespacedName = JSXNamespacedName;
	var JSXOpeningElement = (function () {
	    function JSXOpeningElement(name, selfClosing, attributes) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXOpeningElement;
	        this.name = name;
	        this.selfClosing = selfClosing;
	        this.attributes = attributes;
	    }
	    return JSXOpeningElement;
	}());
	exports.JSXOpeningElement = JSXOpeningElement;
	var JSXSpreadAttribute = (function () {
	    function JSXSpreadAttribute(argument) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXSpreadAttribute;
	        this.argument = argument;
	    }
	    return JSXSpreadAttribute;
	}());
	exports.JSXSpreadAttribute = JSXSpreadAttribute;
	var JSXText = (function () {
	    function JSXText(value, raw) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXText;
	        this.value = value;
	        this.raw = raw;
	    }
	    return JSXText;
	}());
	exports.JSXText = JSXText;


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.JSXSyntax = {
	    JSXAttribute: 'JSXAttribute',
	    JSXClosingElement: 'JSXClosingElement',
	    JSXElement: 'JSXElement',
	    JSXEmptyExpression: 'JSXEmptyExpression',
	    JSXExpressionContainer: 'JSXExpressionContainer',
	    JSXIdentifier: 'JSXIdentifier',
	    JSXMemberExpression: 'JSXMemberExpression',
	    JSXNamespacedName: 'JSXNamespacedName',
	    JSXOpeningElement: 'JSXOpeningElement',
	    JSXSpreadAttribute: 'JSXSpreadAttribute',
	    JSXText: 'JSXText'
	};


/***/ },
/* 7 */
/***/ function(module, exports, __nested_webpack_require_58416__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var syntax_1 = __nested_webpack_require_58416__(2);
	/* tslint:disable:max-classes-per-file */
	var ArrayExpression = (function () {
	    function ArrayExpression(elements) {
	        this.type = syntax_1.Syntax.ArrayExpression;
	        this.elements = elements;
	    }
	    return ArrayExpression;
	}());
	exports.ArrayExpression = ArrayExpression;
	var ArrayPattern = (function () {
	    function ArrayPattern(elements) {
	        this.type = syntax_1.Syntax.ArrayPattern;
	        this.elements = elements;
	    }
	    return ArrayPattern;
	}());
	exports.ArrayPattern = ArrayPattern;
	var ArrowFunctionExpression = (function () {
	    function ArrowFunctionExpression(params, body, expression) {
	        this.type = syntax_1.Syntax.ArrowFunctionExpression;
	        this.id = null;
	        this.params = params;
	        this.body = body;
	        this.generator = false;
	        this.expression = expression;
	        this.async = false;
	    }
	    return ArrowFunctionExpression;
	}());
	exports.ArrowFunctionExpression = ArrowFunctionExpression;
	var AssignmentExpression = (function () {
	    function AssignmentExpression(operator, left, right) {
	        this.type = syntax_1.Syntax.AssignmentExpression;
	        this.operator = operator;
	        this.left = left;
	        this.right = right;
	    }
	    return AssignmentExpression;
	}());
	exports.AssignmentExpression = AssignmentExpression;
	var AssignmentPattern = (function () {
	    function AssignmentPattern(left, right) {
	        this.type = syntax_1.Syntax.AssignmentPattern;
	        this.left = left;
	        this.right = right;
	    }
	    return AssignmentPattern;
	}());
	exports.AssignmentPattern = AssignmentPattern;
	var AsyncArrowFunctionExpression = (function () {
	    function AsyncArrowFunctionExpression(params, body, expression) {
	        this.type = syntax_1.Syntax.ArrowFunctionExpression;
	        this.id = null;
	        this.params = params;
	        this.body = body;
	        this.generator = false;
	        this.expression = expression;
	        this.async = true;
	    }
	    return AsyncArrowFunctionExpression;
	}());
	exports.AsyncArrowFunctionExpression = AsyncArrowFunctionExpression;
	var AsyncFunctionDeclaration = (function () {
	    function AsyncFunctionDeclaration(id, params, body) {
	        this.type = syntax_1.Syntax.FunctionDeclaration;
	        this.id = id;
	        this.params = params;
	        this.body = body;
	        this.generator = false;
	        this.expression = false;
	        this.async = true;
	    }
	    return AsyncFunctionDeclaration;
	}());
	exports.AsyncFunctionDeclaration = AsyncFunctionDeclaration;
	var AsyncFunctionExpression = (function () {
	    function AsyncFunctionExpression(id, params, body) {
	        this.type = syntax_1.Syntax.FunctionExpression;
	        this.id = id;
	        this.params = params;
	        this.body = body;
	        this.generator = false;
	        this.expression = false;
	        this.async = true;
	    }
	    return AsyncFunctionExpression;
	}());
	exports.AsyncFunctionExpression = AsyncFunctionExpression;
	var AwaitExpression = (function () {
	    function AwaitExpression(argument) {
	        this.type = syntax_1.Syntax.AwaitExpression;
	        this.argument = argument;
	    }
	    return AwaitExpression;
	}());
	exports.AwaitExpression = AwaitExpression;
	var BinaryExpression = (function () {
	    function BinaryExpression(operator, left, right) {
	        var logical = (operator === '||' || operator === '&&');
	        this.type = logical ? syntax_1.Syntax.LogicalExpression : syntax_1.Syntax.BinaryExpression;
	        this.operator = operator;
	        this.left = left;
	        this.right = right;
	    }
	    return BinaryExpression;
	}());
	exports.BinaryExpression = BinaryExpression;
	var BlockStatement = (function () {
	    function BlockStatement(body) {
	        this.type = syntax_1.Syntax.BlockStatement;
	        this.body = body;
	    }
	    return BlockStatement;
	}());
	exports.BlockStatement = BlockStatement;
	var BreakStatement = (function () {
	    function BreakStatement(label) {
	        this.type = syntax_1.Syntax.BreakStatement;
	        this.label = label;
	    }
	    return BreakStatement;
	}());
	exports.BreakStatement = BreakStatement;
	var CallExpression = (function () {
	    function CallExpression(callee, args) {
	        this.type = syntax_1.Syntax.CallExpression;
	        this.callee = callee;
	        this.arguments = args;
	    }
	    return CallExpression;
	}());
	exports.CallExpression = CallExpression;
	var CatchClause = (function () {
	    function CatchClause(param, body) {
	        this.type = syntax_1.Syntax.CatchClause;
	        this.param = param;
	        this.body = body;
	    }
	    return CatchClause;
	}());
	exports.CatchClause = CatchClause;
	var ClassBody = (function () {
	    function ClassBody(body) {
	        this.type = syntax_1.Syntax.ClassBody;
	        this.body = body;
	    }
	    return ClassBody;
	}());
	exports.ClassBody = ClassBody;
	var ClassDeclaration = (function () {
	    function ClassDeclaration(id, superClass, body) {
	        this.type = syntax_1.Syntax.ClassDeclaration;
	        this.id = id;
	        this.superClass = superClass;
	        this.body = body;
	    }
	    return ClassDeclaration;
	}());
	exports.ClassDeclaration = ClassDeclaration;
	var ClassExpression = (function () {
	    function ClassExpression(id, superClass, body) {
	        this.type = syntax_1.Syntax.ClassExpression;
	        this.id = id;
	        this.superClass = superClass;
	        this.body = body;
	    }
	    return ClassExpression;
	}());
	exports.ClassExpression = ClassExpression;
	var ComputedMemberExpression = (function () {
	    function ComputedMemberExpression(object, property) {
	        this.type = syntax_1.Syntax.MemberExpression;
	        this.computed = true;
	        this.object = object;
	        this.property = property;
	    }
	    return ComputedMemberExpression;
	}());
	exports.ComputedMemberExpression = ComputedMemberExpression;
	var ConditionalExpression = (function () {
	    function ConditionalExpression(test, consequent, alternate) {
	        this.type = syntax_1.Syntax.ConditionalExpression;
	        this.test = test;
	        this.consequent = consequent;
	        this.alternate = alternate;
	    }
	    return ConditionalExpression;
	}());
	exports.ConditionalExpression = ConditionalExpression;
	var ContinueStatement = (function () {
	    function ContinueStatement(label) {
	        this.type = syntax_1.Syntax.ContinueStatement;
	        this.label = label;
	    }
	    return ContinueStatement;
	}());
	exports.ContinueStatement = ContinueStatement;
	var DebuggerStatement = (function () {
	    function DebuggerStatement() {
	        this.type = syntax_1.Syntax.DebuggerStatement;
	    }
	    return DebuggerStatement;
	}());
	exports.DebuggerStatement = DebuggerStatement;
	var Directive = (function () {
	    function Directive(expression, directive) {
	        this.type = syntax_1.Syntax.ExpressionStatement;
	        this.expression = expression;
	        this.directive = directive;
	    }
	    return Directive;
	}());
	exports.Directive = Directive;
	var DoWhileStatement = (function () {
	    function DoWhileStatement(body, test) {
	        this.type = syntax_1.Syntax.DoWhileStatement;
	        this.body = body;
	        this.test = test;
	    }
	    return DoWhileStatement;
	}());
	exports.DoWhileStatement = DoWhileStatement;
	var EmptyStatement = (function () {
	    function EmptyStatement() {
	        this.type = syntax_1.Syntax.EmptyStatement;
	    }
	    return EmptyStatement;
	}());
	exports.EmptyStatement = EmptyStatement;
	var ExportAllDeclaration = (function () {
	    function ExportAllDeclaration(source) {
	        this.type = syntax_1.Syntax.ExportAllDeclaration;
	        this.source = source;
	    }
	    return ExportAllDeclaration;
	}());
	exports.ExportAllDeclaration = ExportAllDeclaration;
	var ExportDefaultDeclaration = (function () {
	    function ExportDefaultDeclaration(declaration) {
	        this.type = syntax_1.Syntax.ExportDefaultDeclaration;
	        this.declaration = declaration;
	    }
	    return ExportDefaultDeclaration;
	}());
	exports.ExportDefaultDeclaration = ExportDefaultDeclaration;
	var ExportNamedDeclaration = (function () {
	    function ExportNamedDeclaration(declaration, specifiers, source) {
	        this.type = syntax_1.Syntax.ExportNamedDeclaration;
	        this.declaration = declaration;
	        this.specifiers = specifiers;
	        this.source = source;
	    }
	    return ExportNamedDeclaration;
	}());
	exports.ExportNamedDeclaration = ExportNamedDeclaration;
	var ExportSpecifier = (function () {
	    function ExportSpecifier(local, exported) {
	        this.type = syntax_1.Syntax.ExportSpecifier;
	        this.exported = exported;
	        this.local = local;
	    }
	    return ExportSpecifier;
	}());
	exports.ExportSpecifier = ExportSpecifier;
	var ExpressionStatement = (function () {
	    function ExpressionStatement(expression) {
	        this.type = syntax_1.Syntax.ExpressionStatement;
	        this.expression = expression;
	    }
	    return ExpressionStatement;
	}());
	exports.ExpressionStatement = ExpressionStatement;
	var ForInStatement = (function () {
	    function ForInStatement(left, right, body) {
	        this.type = syntax_1.Syntax.ForInStatement;
	        this.left = left;
	        this.right = right;
	        this.body = body;
	        this.each = false;
	    }
	    return ForInStatement;
	}());
	exports.ForInStatement = ForInStatement;
	var ForOfStatement = (function () {
	    function ForOfStatement(left, right, body) {
	        this.type = syntax_1.Syntax.ForOfStatement;
	        this.left = left;
	        this.right = right;
	        this.body = body;
	    }
	    return ForOfStatement;
	}());
	exports.ForOfStatement = ForOfStatement;
	var ForStatement = (function () {
	    function ForStatement(init, test, update, body) {
	        this.type = syntax_1.Syntax.ForStatement;
	        this.init = init;
	        this.test = test;
	        this.update = update;
	        this.body = body;
	    }
	    return ForStatement;
	}());
	exports.ForStatement = ForStatement;
	var FunctionDeclaration = (function () {
	    function FunctionDeclaration(id, params, body, generator) {
	        this.type = syntax_1.Syntax.FunctionDeclaration;
	        this.id = id;
	        this.params = params;
	        this.body = body;
	        this.generator = generator;
	        this.expression = false;
	        this.async = false;
	    }
	    return FunctionDeclaration;
	}());
	exports.FunctionDeclaration = FunctionDeclaration;
	var FunctionExpression = (function () {
	    function FunctionExpression(id, params, body, generator) {
	        this.type = syntax_1.Syntax.FunctionExpression;
	        this.id = id;
	        this.params = params;
	        this.body = body;
	        this.generator = generator;
	        this.expression = false;
	        this.async = false;
	    }
	    return FunctionExpression;
	}());
	exports.FunctionExpression = FunctionExpression;
	var Identifier = (function () {
	    function Identifier(name) {
	        this.type = syntax_1.Syntax.Identifier;
	        this.name = name;
	    }
	    return Identifier;
	}());
	exports.Identifier = Identifier;
	var IfStatement = (function () {
	    function IfStatement(test, consequent, alternate) {
	        this.type = syntax_1.Syntax.IfStatement;
	        this.test = test;
	        this.consequent = consequent;
	        this.alternate = alternate;
	    }
	    return IfStatement;
	}());
	exports.IfStatement = IfStatement;
	var ImportDeclaration = (function () {
	    function ImportDeclaration(specifiers, source) {
	        this.type = syntax_1.Syntax.ImportDeclaration;
	        this.specifiers = specifiers;
	        this.source = source;
	    }
	    return ImportDeclaration;
	}());
	exports.ImportDeclaration = ImportDeclaration;
	var ImportDefaultSpecifier = (function () {
	    function ImportDefaultSpecifier(local) {
	        this.type = syntax_1.Syntax.ImportDefaultSpecifier;
	        this.local = local;
	    }
	    return ImportDefaultSpecifier;
	}());
	exports.ImportDefaultSpecifier = ImportDefaultSpecifier;
	var ImportNamespaceSpecifier = (function () {
	    function ImportNamespaceSpecifier(local) {
	        this.type = syntax_1.Syntax.ImportNamespaceSpecifier;
	        this.local = local;
	    }
	    return ImportNamespaceSpecifier;
	}());
	exports.ImportNamespaceSpecifier = ImportNamespaceSpecifier;
	var ImportSpecifier = (function () {
	    function ImportSpecifier(local, imported) {
	        this.type = syntax_1.Syntax.ImportSpecifier;
	        this.local = local;
	        this.imported = imported;
	    }
	    return ImportSpecifier;
	}());
	exports.ImportSpecifier = ImportSpecifier;
	var LabeledStatement = (function () {
	    function LabeledStatement(label, body) {
	        this.type = syntax_1.Syntax.LabeledStatement;
	        this.label = label;
	        this.body = body;
	    }
	    return LabeledStatement;
	}());
	exports.LabeledStatement = LabeledStatement;
	var Literal = (function () {
	    function Literal(value, raw) {
	        this.type = syntax_1.Syntax.Literal;
	        this.value = value;
	        this.raw = raw;
	    }
	    return Literal;
	}());
	exports.Literal = Literal;
	var MetaProperty = (function () {
	    function MetaProperty(meta, property) {
	        this.type = syntax_1.Syntax.MetaProperty;
	        this.meta = meta;
	        this.property = property;
	    }
	    return MetaProperty;
	}());
	exports.MetaProperty = MetaProperty;
	var MethodDefinition = (function () {
	    function MethodDefinition(key, computed, value, kind, isStatic) {
	        this.type = syntax_1.Syntax.MethodDefinition;
	        this.key = key;
	        this.computed = computed;
	        this.value = value;
	        this.kind = kind;
	        this.static = isStatic;
	    }
	    return MethodDefinition;
	}());
	exports.MethodDefinition = MethodDefinition;
	var Module = (function () {
	    function Module(body) {
	        this.type = syntax_1.Syntax.Program;
	        this.body = body;
	        this.sourceType = 'module';
	    }
	    return Module;
	}());
	exports.Module = Module;
	var NewExpression = (function () {
	    function NewExpression(callee, args) {
	        this.type = syntax_1.Syntax.NewExpression;
	        this.callee = callee;
	        this.arguments = args;
	    }
	    return NewExpression;
	}());
	exports.NewExpression = NewExpression;
	var ObjectExpression = (function () {
	    function ObjectExpression(properties) {
	        this.type = syntax_1.Syntax.ObjectExpression;
	        this.properties = properties;
	    }
	    return ObjectExpression;
	}());
	exports.ObjectExpression = ObjectExpression;
	var ObjectPattern = (function () {
	    function ObjectPattern(properties) {
	        this.type = syntax_1.Syntax.ObjectPattern;
	        this.properties = properties;
	    }
	    return ObjectPattern;
	}());
	exports.ObjectPattern = ObjectPattern;
	var Property = (function () {
	    function Property(kind, key, computed, value, method, shorthand) {
	        this.type = syntax_1.Syntax.Property;
	        this.key = key;
	        this.computed = computed;
	        this.value = value;
	        this.kind = kind;
	        this.method = method;
	        this.shorthand = shorthand;
	    }
	    return Property;
	}());
	exports.Property = Property;
	var RegexLiteral = (function () {
	    function RegexLiteral(value, raw, pattern, flags) {
	        this.type = syntax_1.Syntax.Literal;
	        this.value = value;
	        this.raw = raw;
	        this.regex = { pattern: pattern, flags: flags };
	    }
	    return RegexLiteral;
	}());
	exports.RegexLiteral = RegexLiteral;
	var RestElement = (function () {
	    function RestElement(argument) {
	        this.type = syntax_1.Syntax.RestElement;
	        this.argument = argument;
	    }
	    return RestElement;
	}());
	exports.RestElement = RestElement;
	var ReturnStatement = (function () {
	    function ReturnStatement(argument) {
	        this.type = syntax_1.Syntax.ReturnStatement;
	        this.argument = argument;
	    }
	    return ReturnStatement;
	}());
	exports.ReturnStatement = ReturnStatement;
	var Script = (function () {
	    function Script(body) {
	        this.type = syntax_1.Syntax.Program;
	        this.body = body;
	        this.sourceType = 'script';
	    }
	    return Script;
	}());
	exports.Script = Script;
	var SequenceExpression = (function () {
	    function SequenceExpression(expressions) {
	        this.type = syntax_1.Syntax.SequenceExpression;
	        this.expressions = expressions;
	    }
	    return SequenceExpression;
	}());
	exports.SequenceExpression = SequenceExpression;
	var SpreadElement = (function () {
	    function SpreadElement(argument) {
	        this.type = syntax_1.Syntax.SpreadElement;
	        this.argument = argument;
	    }
	    return SpreadElement;
	}());
	exports.SpreadElement = SpreadElement;
	var StaticMemberExpression = (function () {
	    function StaticMemberExpression(object, property) {
	        this.type = syntax_1.Syntax.MemberExpression;
	        this.computed = false;
	        this.object = object;
	        this.property = property;
	    }
	    return StaticMemberExpression;
	}());
	exports.StaticMemberExpression = StaticMemberExpression;
	var Super = (function () {
	    function Super() {
	        this.type = syntax_1.Syntax.Super;
	    }
	    return Super;
	}());
	exports.Super = Super;
	var SwitchCase = (function () {
	    function SwitchCase(test, consequent) {
	        this.type = syntax_1.Syntax.SwitchCase;
	        this.test = test;
	        this.consequent = consequent;
	    }
	    return SwitchCase;
	}());
	exports.SwitchCase = SwitchCase;
	var SwitchStatement = (function () {
	    function SwitchStatement(discriminant, cases) {
	        this.type = syntax_1.Syntax.SwitchStatement;
	        this.discriminant = discriminant;
	        this.cases = cases;
	    }
	    return SwitchStatement;
	}());
	exports.SwitchStatement = SwitchStatement;
	var TaggedTemplateExpression = (function () {
	    function TaggedTemplateExpression(tag, quasi) {
	        this.type = syntax_1.Syntax.TaggedTemplateExpression;
	        this.tag = tag;
	        this.quasi = quasi;
	    }
	    return TaggedTemplateExpression;
	}());
	exports.TaggedTemplateExpression = TaggedTemplateExpression;
	var TemplateElement = (function () {
	    function TemplateElement(value, tail) {
	        this.type = syntax_1.Syntax.TemplateElement;
	        this.value = value;
	        this.tail = tail;
	    }
	    return TemplateElement;
	}());
	exports.TemplateElement = TemplateElement;
	var TemplateLiteral = (function () {
	    function TemplateLiteral(quasis, expressions) {
	        this.type = syntax_1.Syntax.TemplateLiteral;
	        this.quasis = quasis;
	        this.expressions = expressions;
	    }
	    return TemplateLiteral;
	}());
	exports.TemplateLiteral = TemplateLiteral;
	var ThisExpression = (function () {
	    function ThisExpression() {
	        this.type = syntax_1.Syntax.ThisExpression;
	    }
	    return ThisExpression;
	}());
	exports.ThisExpression = ThisExpression;
	var ThrowStatement = (function () {
	    function ThrowStatement(argument) {
	        this.type = syntax_1.Syntax.ThrowStatement;
	        this.argument = argument;
	    }
	    return ThrowStatement;
	}());
	exports.ThrowStatement = ThrowStatement;
	var TryStatement = (function () {
	    function TryStatement(block, handler, finalizer) {
	        this.type = syntax_1.Syntax.TryStatement;
	        this.block = block;
	        this.handler = handler;
	        this.finalizer = finalizer;
	    }
	    return TryStatement;
	}());
	exports.TryStatement = TryStatement;
	var UnaryExpression = (function () {
	    function UnaryExpression(operator, argument) {
	        this.type = syntax_1.Syntax.UnaryExpression;
	        this.operator = operator;
	        this.argument = argument;
	        this.prefix = true;
	    }
	    return UnaryExpression;
	}());
	exports.UnaryExpression = UnaryExpression;
	var UpdateExpression = (function () {
	    function UpdateExpression(operator, argument, prefix) {
	        this.type = syntax_1.Syntax.UpdateExpression;
	        this.operator = operator;
	        this.argument = argument;
	        this.prefix = prefix;
	    }
	    return UpdateExpression;
	}());
	exports.UpdateExpression = UpdateExpression;
	var VariableDeclaration = (function () {
	    function VariableDeclaration(declarations, kind) {
	        this.type = syntax_1.Syntax.VariableDeclaration;
	        this.declarations = declarations;
	        this.kind = kind;
	    }
	    return VariableDeclaration;
	}());
	exports.VariableDeclaration = VariableDeclaration;
	var VariableDeclarator = (function () {
	    function VariableDeclarator(id, init) {
	        this.type = syntax_1.Syntax.VariableDeclarator;
	        this.id = id;
	        this.init = init;
	    }
	    return VariableDeclarator;
	}());
	exports.VariableDeclarator = VariableDeclarator;
	var WhileStatement = (function () {
	    function WhileStatement(test, body) {
	        this.type = syntax_1.Syntax.WhileStatement;
	        this.test = test;
	        this.body = body;
	    }
	    return WhileStatement;
	}());
	exports.WhileStatement = WhileStatement;
	var WithStatement = (function () {
	    function WithStatement(object, body) {
	        this.type = syntax_1.Syntax.WithStatement;
	        this.object = object;
	        this.body = body;
	    }
	    return WithStatement;
	}());
	exports.WithStatement = WithStatement;
	var YieldExpression = (function () {
	    function YieldExpression(argument, delegate) {
	        this.type = syntax_1.Syntax.YieldExpression;
	        this.argument = argument;
	        this.delegate = delegate;
	    }
	    return YieldExpression;
	}());
	exports.YieldExpression = YieldExpression;


/***/ },
/* 8 */
/***/ function(module, exports, __nested_webpack_require_80491__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var assert_1 = __nested_webpack_require_80491__(9);
	var error_handler_1 = __nested_webpack_require_80491__(10);
	var messages_1 = __nested_webpack_require_80491__(11);
	var Node = __nested_webpack_require_80491__(7);
	var scanner_1 = __nested_webpack_require_80491__(12);
	var syntax_1 = __nested_webpack_require_80491__(2);
	var token_1 = __nested_webpack_require_80491__(13);
	var ArrowParameterPlaceHolder = 'ArrowParameterPlaceHolder';
	var Parser = (function () {
	    function Parser(code, options, delegate) {
	        if (options === void 0) { options = {}; }
	        this.config = {
	            range: (typeof options.range === 'boolean') && options.range,
	            loc: (typeof options.loc === 'boolean') && options.loc,
	            source: null,
	            tokens: (typeof options.tokens === 'boolean') && options.tokens,
	            comment: (typeof options.comment === 'boolean') && options.comment,
	            tolerant: (typeof options.tolerant === 'boolean') && options.tolerant
	        };
	        if (this.config.loc && options.source && options.source !== null) {
	            this.config.source = String(options.source);
	        }
	        this.delegate = delegate;
	        this.errorHandler = new error_handler_1.ErrorHandler();
	        this.errorHandler.tolerant = this.config.tolerant;
	        this.scanner = new scanner_1.Scanner(code, this.errorHandler);
	        this.scanner.trackComment = this.config.comment;
	        this.operatorPrecedence = {
	            ')': 0,
	            ';': 0,
	            ',': 0,
	            '=': 0,
	            ']': 0,
	            '||': 1,
	            '&&': 2,
	            '|': 3,
	            '^': 4,
	            '&': 5,
	            '==': 6,
	            '!=': 6,
	            '===': 6,
	            '!==': 6,
	            '<': 7,
	            '>': 7,
	            '<=': 7,
	            '>=': 7,
	            '<<': 8,
	            '>>': 8,
	            '>>>': 8,
	            '+': 9,
	            '-': 9,
	            '*': 11,
	            '/': 11,
	            '%': 11
	        };
	        this.lookahead = {
	            type: 2 /* EOF */,
	            value: '',
	            lineNumber: this.scanner.lineNumber,
	            lineStart: 0,
	            start: 0,
	            end: 0
	        };
	        this.hasLineTerminator = false;
	        this.context = {
	            isModule: false,
	            await: false,
	            allowIn: true,
	            allowStrictDirective: true,
	            allowYield: true,
	            firstCoverInitializedNameError: null,
	            isAssignmentTarget: false,
	            isBindingElement: false,
	            inFunctionBody: false,
	            inIteration: false,
	            inSwitch: false,
	            labelSet: {},
	            strict: false
	        };
	        this.tokens = [];
	        this.startMarker = {
	            index: 0,
	            line: this.scanner.lineNumber,
	            column: 0
	        };
	        this.lastMarker = {
	            index: 0,
	            line: this.scanner.lineNumber,
	            column: 0
	        };
	        this.nextToken();
	        this.lastMarker = {
	            index: this.scanner.index,
	            line: this.scanner.lineNumber,
	            column: this.scanner.index - this.scanner.lineStart
	        };
	    }
	    Parser.prototype.throwError = function (messageFormat) {
	        var values = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            values[_i - 1] = arguments[_i];
	        }
	        var args = Array.prototype.slice.call(arguments, 1);
	        var msg = messageFormat.replace(/%(\d)/g, function (whole, idx) {
	            assert_1.assert(idx < args.length, 'Message reference must be in range');
	            return args[idx];
	        });
	        var index = this.lastMarker.index;
	        var line = this.lastMarker.line;
	        var column = this.lastMarker.column + 1;
	        throw this.errorHandler.createError(index, line, column, msg);
	    };
	    Parser.prototype.tolerateError = function (messageFormat) {
	        var values = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            values[_i - 1] = arguments[_i];
	        }
	        var args = Array.prototype.slice.call(arguments, 1);
	        var msg = messageFormat.replace(/%(\d)/g, function (whole, idx) {
	            assert_1.assert(idx < args.length, 'Message reference must be in range');
	            return args[idx];
	        });
	        var index = this.lastMarker.index;
	        var line = this.scanner.lineNumber;
	        var column = this.lastMarker.column + 1;
	        this.errorHandler.tolerateError(index, line, column, msg);
	    };
	    // Throw an exception because of the token.
	    Parser.prototype.unexpectedTokenError = function (token, message) {
	        var msg = message || messages_1.Messages.UnexpectedToken;
	        var value;
	        if (token) {
	            if (!message) {
	                msg = (token.type === 2 /* EOF */) ? messages_1.Messages.UnexpectedEOS :
	                    (token.type === 3 /* Identifier */) ? messages_1.Messages.UnexpectedIdentifier :
	                        (token.type === 6 /* NumericLiteral */) ? messages_1.Messages.UnexpectedNumber :
	                            (token.type === 8 /* StringLiteral */) ? messages_1.Messages.UnexpectedString :
	                                (token.type === 10 /* Template */) ? messages_1.Messages.UnexpectedTemplate :
	                                    messages_1.Messages.UnexpectedToken;
	                if (token.type === 4 /* Keyword */) {
	                    if (this.scanner.isFutureReservedWord(token.value)) {
	                        msg = messages_1.Messages.UnexpectedReserved;
	                    }
	                    else if (this.context.strict && this.scanner.isStrictModeReservedWord(token.value)) {
	                        msg = messages_1.Messages.StrictReservedWord;
	                    }
	                }
	            }
	            value = token.value;
	        }
	        else {
	            value = 'ILLEGAL';
	        }
	        msg = msg.replace('%0', value);
	        if (token && typeof token.lineNumber === 'number') {
	            var index = token.start;
	            var line = token.lineNumber;
	            var lastMarkerLineStart = this.lastMarker.index - this.lastMarker.column;
	            var column = token.start - lastMarkerLineStart + 1;
	            return this.errorHandler.createError(index, line, column, msg);
	        }
	        else {
	            var index = this.lastMarker.index;
	            var line = this.lastMarker.line;
	            var column = this.lastMarker.column + 1;
	            return this.errorHandler.createError(index, line, column, msg);
	        }
	    };
	    Parser.prototype.throwUnexpectedToken = function (token, message) {
	        throw this.unexpectedTokenError(token, message);
	    };
	    Parser.prototype.tolerateUnexpectedToken = function (token, message) {
	        this.errorHandler.tolerate(this.unexpectedTokenError(token, message));
	    };
	    Parser.prototype.collectComments = function () {
	        if (!this.config.comment) {
	            this.scanner.scanComments();
	        }
	        else {
	            var comments = this.scanner.scanComments();
	            if (comments.length > 0 && this.delegate) {
	                for (var i = 0; i < comments.length; ++i) {
	                    var e = comments[i];
	                    var node = void 0;
	                    node = {
	                        type: e.multiLine ? 'BlockComment' : 'LineComment',
	                        value: this.scanner.source.slice(e.slice[0], e.slice[1])
	                    };
	                    if (this.config.range) {
	                        node.range = e.range;
	                    }
	                    if (this.config.loc) {
	                        node.loc = e.loc;
	                    }
	                    var metadata = {
	                        start: {
	                            line: e.loc.start.line,
	                            column: e.loc.start.column,
	                            offset: e.range[0]
	                        },
	                        end: {
	                            line: e.loc.end.line,
	                            column: e.loc.end.column,
	                            offset: e.range[1]
	                        }
	                    };
	                    this.delegate(node, metadata);
	                }
	            }
	        }
	    };
	    // From internal representation to an external structure
	    Parser.prototype.getTokenRaw = function (token) {
	        return this.scanner.source.slice(token.start, token.end);
	    };
	    Parser.prototype.convertToken = function (token) {
	        var t = {
	            type: token_1.TokenName[token.type],
	            value: this.getTokenRaw(token)
	        };
	        if (this.config.range) {
	            t.range = [token.start, token.end];
	        }
	        if (this.config.loc) {
	            t.loc = {
	                start: {
	                    line: this.startMarker.line,
	                    column: this.startMarker.column
	                },
	                end: {
	                    line: this.scanner.lineNumber,
	                    column: this.scanner.index - this.scanner.lineStart
	                }
	            };
	        }
	        if (token.type === 9 /* RegularExpression */) {
	            var pattern = token.pattern;
	            var flags = token.flags;
	            t.regex = { pattern: pattern, flags: flags };
	        }
	        return t;
	    };
	    Parser.prototype.nextToken = function () {
	        var token = this.lookahead;
	        this.lastMarker.index = this.scanner.index;
	        this.lastMarker.line = this.scanner.lineNumber;
	        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
	        this.collectComments();
	        if (this.scanner.index !== this.startMarker.index) {
	            this.startMarker.index = this.scanner.index;
	            this.startMarker.line = this.scanner.lineNumber;
	            this.startMarker.column = this.scanner.index - this.scanner.lineStart;
	        }
	        var next = this.scanner.lex();
	        this.hasLineTerminator = (token.lineNumber !== next.lineNumber);
	        if (next && this.context.strict && next.type === 3 /* Identifier */) {
	            if (this.scanner.isStrictModeReservedWord(next.value)) {
	                next.type = 4 /* Keyword */;
	            }
	        }
	        this.lookahead = next;
	        if (this.config.tokens && next.type !== 2 /* EOF */) {
	            this.tokens.push(this.convertToken(next));
	        }
	        return token;
	    };
	    Parser.prototype.nextRegexToken = function () {
	        this.collectComments();
	        var token = this.scanner.scanRegExp();
	        if (this.config.tokens) {
	            // Pop the previous token, '/' or '/='
	            // This is added from the lookahead token.
	            this.tokens.pop();
	            this.tokens.push(this.convertToken(token));
	        }
	        // Prime the next lookahead.
	        this.lookahead = token;
	        this.nextToken();
	        return token;
	    };
	    Parser.prototype.createNode = function () {
	        return {
	            index: this.startMarker.index,
	            line: this.startMarker.line,
	            column: this.startMarker.column
	        };
	    };
	    Parser.prototype.startNode = function (token, lastLineStart) {
	        if (lastLineStart === void 0) { lastLineStart = 0; }
	        var column = token.start - token.lineStart;
	        var line = token.lineNumber;
	        if (column < 0) {
	            column += lastLineStart;
	            line--;
	        }
	        return {
	            index: token.start,
	            line: line,
	            column: column
	        };
	    };
	    Parser.prototype.finalize = function (marker, node) {
	        if (this.config.range) {
	            node.range = [marker.index, this.lastMarker.index];
	        }
	        if (this.config.loc) {
	            node.loc = {
	                start: {
	                    line: marker.line,
	                    column: marker.column,
	                },
	                end: {
	                    line: this.lastMarker.line,
	                    column: this.lastMarker.column
	                }
	            };
	            if (this.config.source) {
	                node.loc.source = this.config.source;
	            }
	        }
	        if (this.delegate) {
	            var metadata = {
	                start: {
	                    line: marker.line,
	                    column: marker.column,
	                    offset: marker.index
	                },
	                end: {
	                    line: this.lastMarker.line,
	                    column: this.lastMarker.column,
	                    offset: this.lastMarker.index
	                }
	            };
	            this.delegate(node, metadata);
	        }
	        return node;
	    };
	    // Expect the next token to match the specified punctuator.
	    // If not, an exception will be thrown.
	    Parser.prototype.expect = function (value) {
	        var token = this.nextToken();
	        if (token.type !== 7 /* Punctuator */ || token.value !== value) {
	            this.throwUnexpectedToken(token);
	        }
	    };
	    // Quietly expect a comma when in tolerant mode, otherwise delegates to expect().
	    Parser.prototype.expectCommaSeparator = function () {
	        if (this.config.tolerant) {
	            var token = this.lookahead;
	            if (token.type === 7 /* Punctuator */ && token.value === ',') {
	                this.nextToken();
	            }
	            else if (token.type === 7 /* Punctuator */ && token.value === ';') {
	                this.nextToken();
	                this.tolerateUnexpectedToken(token);
	            }
	            else {
	                this.tolerateUnexpectedToken(token, messages_1.Messages.UnexpectedToken);
	            }
	        }
	        else {
	            this.expect(',');
	        }
	    };
	    // Expect the next token to match the specified keyword.
	    // If not, an exception will be thrown.
	    Parser.prototype.expectKeyword = function (keyword) {
	        var token = this.nextToken();
	        if (token.type !== 4 /* Keyword */ || token.value !== keyword) {
	            this.throwUnexpectedToken(token);
	        }
	    };
	    // Return true if the next token matches the specified punctuator.
	    Parser.prototype.match = function (value) {
	        return this.lookahead.type === 7 /* Punctuator */ && this.lookahead.value === value;
	    };
	    // Return true if the next token matches the specified keyword
	    Parser.prototype.matchKeyword = function (keyword) {
	        return this.lookahead.type === 4 /* Keyword */ && this.lookahead.value === keyword;
	    };
	    // Return true if the next token matches the specified contextual keyword
	    // (where an identifier is sometimes a keyword depending on the context)
	    Parser.prototype.matchContextualKeyword = function (keyword) {
	        return this.lookahead.type === 3 /* Identifier */ && this.lookahead.value === keyword;
	    };
	    // Return true if the next token is an assignment operator
	    Parser.prototype.matchAssign = function () {
	        if (this.lookahead.type !== 7 /* Punctuator */) {
	            return false;
	        }
	        var op = this.lookahead.value;
	        return op === '=' ||
	            op === '*=' ||
	            op === '**=' ||
	            op === '/=' ||
	            op === '%=' ||
	            op === '+=' ||
	            op === '-=' ||
	            op === '<<=' ||
	            op === '>>=' ||
	            op === '>>>=' ||
	            op === '&=' ||
	            op === '^=' ||
	            op === '|=';
	    };
	    // Cover grammar support.
	    //
	    // When an assignment expression position starts with an left parenthesis, the determination of the type
	    // of the syntax is to be deferred arbitrarily long until the end of the parentheses pair (plus a lookahead)
	    // or the first comma. This situation also defers the determination of all the expressions nested in the pair.
	    //
	    // There are three productions that can be parsed in a parentheses pair that needs to be determined
	    // after the outermost pair is closed. They are:
	    //
	    //   1. AssignmentExpression
	    //   2. BindingElements
	    //   3. AssignmentTargets
	    //
	    // In order to avoid exponential backtracking, we use two flags to denote if the production can be
	    // binding element or assignment target.
	    //
	    // The three productions have the relationship:
	    //
	    //   BindingElements ⊆ AssignmentTargets ⊆ AssignmentExpression
	    //
	    // with a single exception that CoverInitializedName when used directly in an Expression, generates
	    // an early error. Therefore, we need the third state, firstCoverInitializedNameError, to track the
	    // first usage of CoverInitializedName and report it when we reached the end of the parentheses pair.
	    //
	    // isolateCoverGrammar function runs the given parser function with a new cover grammar context, and it does not
	    // effect the current flags. This means the production the parser parses is only used as an expression. Therefore
	    // the CoverInitializedName check is conducted.
	    //
	    // inheritCoverGrammar function runs the given parse function with a new cover grammar context, and it propagates
	    // the flags outside of the parser. This means the production the parser parses is used as a part of a potential
	    // pattern. The CoverInitializedName check is deferred.
	    Parser.prototype.isolateCoverGrammar = function (parseFunction) {
	        var previousIsBindingElement = this.context.isBindingElement;
	        var previousIsAssignmentTarget = this.context.isAssignmentTarget;
	        var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
	        this.context.isBindingElement = true;
	        this.context.isAssignmentTarget = true;
	        this.context.firstCoverInitializedNameError = null;
	        var result = parseFunction.call(this);
	        if (this.context.firstCoverInitializedNameError !== null) {
	            this.throwUnexpectedToken(this.context.firstCoverInitializedNameError);
	        }
	        this.context.isBindingElement = previousIsBindingElement;
	        this.context.isAssignmentTarget = previousIsAssignmentTarget;
	        this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError;
	        return result;
	    };
	    Parser.prototype.inheritCoverGrammar = function (parseFunction) {
	        var previousIsBindingElement = this.context.isBindingElement;
	        var previousIsAssignmentTarget = this.context.isAssignmentTarget;
	        var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
	        this.context.isBindingElement = true;
	        this.context.isAssignmentTarget = true;
	        this.context.firstCoverInitializedNameError = null;
	        var result = parseFunction.call(this);
	        this.context.isBindingElement = this.context.isBindingElement && previousIsBindingElement;
	        this.context.isAssignmentTarget = this.context.isAssignmentTarget && previousIsAssignmentTarget;
	        this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError || this.context.firstCoverInitializedNameError;
	        return result;
	    };
	    Parser.prototype.consumeSemicolon = function () {
	        if (this.match(';')) {
	            this.nextToken();
	        }
	        else if (!this.hasLineTerminator) {
	            if (this.lookahead.type !== 2 /* EOF */ && !this.match('}')) {
	                this.throwUnexpectedToken(this.lookahead);
	            }
	            this.lastMarker.index = this.startMarker.index;
	            this.lastMarker.line = this.startMarker.line;
	            this.lastMarker.column = this.startMarker.column;
	        }
	    };
	    // https://tc39.github.io/ecma262/#sec-primary-expression
	    Parser.prototype.parsePrimaryExpression = function () {
	        var node = this.createNode();
	        var expr;
	        var token, raw;
	        switch (this.lookahead.type) {
	            case 3 /* Identifier */:
	                if ((this.context.isModule || this.context.await) && this.lookahead.value === 'await') {
	                    this.tolerateUnexpectedToken(this.lookahead);
	                }
	                expr = this.matchAsyncFunction() ? this.parseFunctionExpression() : this.finalize(node, new Node.Identifier(this.nextToken().value));
	                break;
	            case 6 /* NumericLiteral */:
	            case 8 /* StringLiteral */:
	                if (this.context.strict && this.lookahead.octal) {
	                    this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.StrictOctalLiteral);
	                }
	                this.context.isAssignmentTarget = false;
	                this.context.isBindingElement = false;
	                token = this.nextToken();
	                raw = this.getTokenRaw(token);
	                expr = this.finalize(node, new Node.Literal(token.value, raw));
	                break;
	            case 1 /* BooleanLiteral */:
	                this.context.isAssignmentTarget = false;
	                this.context.isBindingElement = false;
	                token = this.nextToken();
	                raw = this.getTokenRaw(token);
	                expr = this.finalize(node, new Node.Literal(token.value === 'true', raw));
	                break;
	            case 5 /* NullLiteral */:
	                this.context.isAssignmentTarget = false;
	                this.context.isBindingElement = false;
	                token = this.nextToken();
	                raw = this.getTokenRaw(token);
	                expr = this.finalize(node, new Node.Literal(null, raw));
	                break;
	            case 10 /* Template */:
	                expr = this.parseTemplateLiteral();
	                break;
	            case 7 /* Punctuator */:
	                switch (this.lookahead.value) {
	                    case '(':
	                        this.context.isBindingElement = false;
	                        expr = this.inheritCoverGrammar(this.parseGroupExpression);
	                        break;
	                    case '[':
	                        expr = this.inheritCoverGrammar(this.parseArrayInitializer);
	                        break;
	                    case '{':
	                        expr = this.inheritCoverGrammar(this.parseObjectInitializer);
	                        break;
	                    case '/':
	                    case '/=':
	                        this.context.isAssignmentTarget = false;
	                        this.context.isBindingElement = false;
	                        this.scanner.index = this.startMarker.index;
	                        token = this.nextRegexToken();
	                        raw = this.getTokenRaw(token);
	                        expr = this.finalize(node, new Node.RegexLiteral(token.regex, raw, token.pattern, token.flags));
	                        break;
	                    default:
	                        expr = this.throwUnexpectedToken(this.nextToken());
	                }
	                break;
	            case 4 /* Keyword */:
	                if (!this.context.strict && this.context.allowYield && this.matchKeyword('yield')) {
	                    expr = this.parseIdentifierName();
	                }
	                else if (!this.context.strict && this.matchKeyword('let')) {
	                    expr = this.finalize(node, new Node.Identifier(this.nextToken().value));
	                }
	                else {
	                    this.context.isAssignmentTarget = false;
	                    this.context.isBindingElement = false;
	                    if (this.matchKeyword('function')) {
	                        expr = this.parseFunctionExpression();
	                    }
	                    else if (this.matchKeyword('this')) {
	                        this.nextToken();
	                        expr = this.finalize(node, new Node.ThisExpression());
	                    }
	                    else if (this.matchKeyword('class')) {
	                        expr = this.parseClassExpression();
	                    }
	                    else {
	                        expr = this.throwUnexpectedToken(this.nextToken());
	                    }
	                }
	                break;
	            default:
	                expr = this.throwUnexpectedToken(this.nextToken());
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-array-initializer
	    Parser.prototype.parseSpreadElement = function () {
	        var node = this.createNode();
	        this.expect('...');
	        var arg = this.inheritCoverGrammar(this.parseAssignmentExpression);
	        return this.finalize(node, new Node.SpreadElement(arg));
	    };
	    Parser.prototype.parseArrayInitializer = function () {
	        var node = this.createNode();
	        var elements = [];
	        this.expect('[');
	        while (!this.match(']')) {
	            if (this.match(',')) {
	                this.nextToken();
	                elements.push(null);
	            }
	            else if (this.match('...')) {
	                var element = this.parseSpreadElement();
	                if (!this.match(']')) {
	                    this.context.isAssignmentTarget = false;
	                    this.context.isBindingElement = false;
	                    this.expect(',');
	                }
	                elements.push(element);
	            }
	            else {
	                elements.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
	                if (!this.match(']')) {
	                    this.expect(',');
	                }
	            }
	        }
	        this.expect(']');
	        return this.finalize(node, new Node.ArrayExpression(elements));
	    };
	    // https://tc39.github.io/ecma262/#sec-object-initializer
	    Parser.prototype.parsePropertyMethod = function (params) {
	        this.context.isAssignmentTarget = false;
	        this.context.isBindingElement = false;
	        var previousStrict = this.context.strict;
	        var previousAllowStrictDirective = this.context.allowStrictDirective;
	        this.context.allowStrictDirective = params.simple;
	        var body = this.isolateCoverGrammar(this.parseFunctionSourceElements);
	        if (this.context.strict && params.firstRestricted) {
	            this.tolerateUnexpectedToken(params.firstRestricted, params.message);
	        }
	        if (this.context.strict && params.stricted) {
	            this.tolerateUnexpectedToken(params.stricted, params.message);
	        }
	        this.context.strict = previousStrict;
	        this.context.allowStrictDirective = previousAllowStrictDirective;
	        return body;
	    };
	    Parser.prototype.parsePropertyMethodFunction = function () {
	        var isGenerator = false;
	        var node = this.createNode();
	        var previousAllowYield = this.context.allowYield;
	        this.context.allowYield = true;
	        var params = this.parseFormalParameters();
	        var method = this.parsePropertyMethod(params);
	        this.context.allowYield = previousAllowYield;
	        return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
	    };
	    Parser.prototype.parsePropertyMethodAsyncFunction = function () {
	        var node = this.createNode();
	        var previousAllowYield = this.context.allowYield;
	        var previousAwait = this.context.await;
	        this.context.allowYield = false;
	        this.context.await = true;
	        var params = this.parseFormalParameters();
	        var method = this.parsePropertyMethod(params);
	        this.context.allowYield = previousAllowYield;
	        this.context.await = previousAwait;
	        return this.finalize(node, new Node.AsyncFunctionExpression(null, params.params, method));
	    };
	    Parser.prototype.parseObjectPropertyKey = function () {
	        var node = this.createNode();
	        var token = this.nextToken();
	        var key;
	        switch (token.type) {
	            case 8 /* StringLiteral */:
	            case 6 /* NumericLiteral */:
	                if (this.context.strict && token.octal) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictOctalLiteral);
	                }
	                var raw = this.getTokenRaw(token);
	                key = this.finalize(node, new Node.Literal(token.value, raw));
	                break;
	            case 3 /* Identifier */:
	            case 1 /* BooleanLiteral */:
	            case 5 /* NullLiteral */:
	            case 4 /* Keyword */:
	                key = this.finalize(node, new Node.Identifier(token.value));
	                break;
	            case 7 /* Punctuator */:
	                if (token.value === '[') {
	                    key = this.isolateCoverGrammar(this.parseAssignmentExpression);
	                    this.expect(']');
	                }
	                else {
	                    key = this.throwUnexpectedToken(token);
	                }
	                break;
	            default:
	                key = this.throwUnexpectedToken(token);
	        }
	        return key;
	    };
	    Parser.prototype.isPropertyKey = function (key, value) {
	        return (key.type === syntax_1.Syntax.Identifier && key.name === value) ||
	            (key.type === syntax_1.Syntax.Literal && key.value === value);
	    };
	    Parser.prototype.parseObjectProperty = function (hasProto) {
	        var node = this.createNode();
	        var token = this.lookahead;
	        var kind;
	        var key = null;
	        var value = null;
	        var computed = false;
	        var method = false;
	        var shorthand = false;
	        var isAsync = false;
	        if (token.type === 3 /* Identifier */) {
	            var id = token.value;
	            this.nextToken();
	            computed = this.match('[');
	            isAsync = !this.hasLineTerminator && (id === 'async') &&
	                !this.match(':') && !this.match('(') && !this.match('*') && !this.match(',');
	            key = isAsync ? this.parseObjectPropertyKey() : this.finalize(node, new Node.Identifier(id));
	        }
	        else if (this.match('*')) {
	            this.nextToken();
	        }
	        else {
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	        }
	        var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
	        if (token.type === 3 /* Identifier */ && !isAsync && token.value === 'get' && lookaheadPropertyKey) {
	            kind = 'get';
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            this.context.allowYield = false;
	            value = this.parseGetterMethod();
	        }
	        else if (token.type === 3 /* Identifier */ && !isAsync && token.value === 'set' && lookaheadPropertyKey) {
	            kind = 'set';
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            value = this.parseSetterMethod();
	        }
	        else if (token.type === 7 /* Punctuator */ && token.value === '*' && lookaheadPropertyKey) {
	            kind = 'init';
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            value = this.parseGeneratorMethod();
	            method = true;
	        }
	        else {
	            if (!key) {
	                this.throwUnexpectedToken(this.lookahead);
	            }
	            kind = 'init';
	            if (this.match(':') && !isAsync) {
	                if (!computed && this.isPropertyKey(key, '__proto__')) {
	                    if (hasProto.value) {
	                        this.tolerateError(messages_1.Messages.DuplicateProtoProperty);
	                    }
	                    hasProto.value = true;
	                }
	                this.nextToken();
	                value = this.inheritCoverGrammar(this.parseAssignmentExpression);
	            }
	            else if (this.match('(')) {
	                value = isAsync ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction();
	                method = true;
	            }
	            else if (token.type === 3 /* Identifier */) {
	                var id = this.finalize(node, new Node.Identifier(token.value));
	                if (this.match('=')) {
	                    this.context.firstCoverInitializedNameError = this.lookahead;
	                    this.nextToken();
	                    shorthand = true;
	                    var init = this.isolateCoverGrammar(this.parseAssignmentExpression);
	                    value = this.finalize(node, new Node.AssignmentPattern(id, init));
	                }
	                else {
	                    shorthand = true;
	                    value = id;
	                }
	            }
	            else {
	                this.throwUnexpectedToken(this.nextToken());
	            }
	        }
	        return this.finalize(node, new Node.Property(kind, key, computed, value, method, shorthand));
	    };
	    Parser.prototype.parseObjectInitializer = function () {
	        var node = this.createNode();
	        this.expect('{');
	        var properties = [];
	        var hasProto = { value: false };
	        while (!this.match('}')) {
	            properties.push(this.parseObjectProperty(hasProto));
	            if (!this.match('}')) {
	                this.expectCommaSeparator();
	            }
	        }
	        this.expect('}');
	        return this.finalize(node, new Node.ObjectExpression(properties));
	    };
	    // https://tc39.github.io/ecma262/#sec-template-literals
	    Parser.prototype.parseTemplateHead = function () {
	        assert_1.assert(this.lookahead.head, 'Template literal must start with a template head');
	        var node = this.createNode();
	        var token = this.nextToken();
	        var raw = token.value;
	        var cooked = token.cooked;
	        return this.finalize(node, new Node.TemplateElement({ raw: raw, cooked: cooked }, token.tail));
	    };
	    Parser.prototype.parseTemplateElement = function () {
	        if (this.lookahead.type !== 10 /* Template */) {
	            this.throwUnexpectedToken();
	        }
	        var node = this.createNode();
	        var token = this.nextToken();
	        var raw = token.value;
	        var cooked = token.cooked;
	        return this.finalize(node, new Node.TemplateElement({ raw: raw, cooked: cooked }, token.tail));
	    };
	    Parser.prototype.parseTemplateLiteral = function () {
	        var node = this.createNode();
	        var expressions = [];
	        var quasis = [];
	        var quasi = this.parseTemplateHead();
	        quasis.push(quasi);
	        while (!quasi.tail) {
	            expressions.push(this.parseExpression());
	            quasi = this.parseTemplateElement();
	            quasis.push(quasi);
	        }
	        return this.finalize(node, new Node.TemplateLiteral(quasis, expressions));
	    };
	    // https://tc39.github.io/ecma262/#sec-grouping-operator
	    Parser.prototype.reinterpretExpressionAsPattern = function (expr) {
	        switch (expr.type) {
	            case syntax_1.Syntax.Identifier:
	            case syntax_1.Syntax.MemberExpression:
	            case syntax_1.Syntax.RestElement:
	            case syntax_1.Syntax.AssignmentPattern:
	                break;
	            case syntax_1.Syntax.SpreadElement:
	                expr.type = syntax_1.Syntax.RestElement;
	                this.reinterpretExpressionAsPattern(expr.argument);
	                break;
	            case syntax_1.Syntax.ArrayExpression:
	                expr.type = syntax_1.Syntax.ArrayPattern;
	                for (var i = 0; i < expr.elements.length; i++) {
	                    if (expr.elements[i] !== null) {
	                        this.reinterpretExpressionAsPattern(expr.elements[i]);
	                    }
	                }
	                break;
	            case syntax_1.Syntax.ObjectExpression:
	                expr.type = syntax_1.Syntax.ObjectPattern;
	                for (var i = 0; i < expr.properties.length; i++) {
	                    this.reinterpretExpressionAsPattern(expr.properties[i].value);
	                }
	                break;
	            case syntax_1.Syntax.AssignmentExpression:
	                expr.type = syntax_1.Syntax.AssignmentPattern;
	                delete expr.operator;
	                this.reinterpretExpressionAsPattern(expr.left);
	                break;
	            default:
	                // Allow other node type for tolerant parsing.
	                break;
	        }
	    };
	    Parser.prototype.parseGroupExpression = function () {
	        var expr;
	        this.expect('(');
	        if (this.match(')')) {
	            this.nextToken();
	            if (!this.match('=>')) {
	                this.expect('=>');
	            }
	            expr = {
	                type: ArrowParameterPlaceHolder,
	                params: [],
	                async: false
	            };
	        }
	        else {
	            var startToken = this.lookahead;
	            var params = [];
	            if (this.match('...')) {
	                expr = this.parseRestElement(params);
	                this.expect(')');
	                if (!this.match('=>')) {
	                    this.expect('=>');
	                }
	                expr = {
	                    type: ArrowParameterPlaceHolder,
	                    params: [expr],
	                    async: false
	                };
	            }
	            else {
	                var arrow = false;
	                this.context.isBindingElement = true;
	                expr = this.inheritCoverGrammar(this.parseAssignmentExpression);
	                if (this.match(',')) {
	                    var expressions = [];
	                    this.context.isAssignmentTarget = false;
	                    expressions.push(expr);
	                    while (this.lookahead.type !== 2 /* EOF */) {
	                        if (!this.match(',')) {
	                            break;
	                        }
	                        this.nextToken();
	                        if (this.match(')')) {
	                            this.nextToken();
	                            for (var i = 0; i < expressions.length; i++) {
	                                this.reinterpretExpressionAsPattern(expressions[i]);
	                            }
	                            arrow = true;
	                            expr = {
	                                type: ArrowParameterPlaceHolder,
	                                params: expressions,
	                                async: false
	                            };
	                        }
	                        else if (this.match('...')) {
	                            if (!this.context.isBindingElement) {
	                                this.throwUnexpectedToken(this.lookahead);
	                            }
	                            expressions.push(this.parseRestElement(params));
	                            this.expect(')');
	                            if (!this.match('=>')) {
	                                this.expect('=>');
	                            }
	                            this.context.isBindingElement = false;
	                            for (var i = 0; i < expressions.length; i++) {
	                                this.reinterpretExpressionAsPattern(expressions[i]);
	                            }
	                            arrow = true;
	                            expr = {
	                                type: ArrowParameterPlaceHolder,
	                                params: expressions,
	                                async: false
	                            };
	                        }
	                        else {
	                            expressions.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
	                        }
	                        if (arrow) {
	                            break;
	                        }
	                    }
	                    if (!arrow) {
	                        expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
	                    }
	                }
	                if (!arrow) {
	                    this.expect(')');
	                    if (this.match('=>')) {
	                        if (expr.type === syntax_1.Syntax.Identifier && expr.name === 'yield') {
	                            arrow = true;
	                            expr = {
	                                type: ArrowParameterPlaceHolder,
	                                params: [expr],
	                                async: false
	                            };
	                        }
	                        if (!arrow) {
	                            if (!this.context.isBindingElement) {
	                                this.throwUnexpectedToken(this.lookahead);
	                            }
	                            if (expr.type === syntax_1.Syntax.SequenceExpression) {
	                                for (var i = 0; i < expr.expressions.length; i++) {
	                                    this.reinterpretExpressionAsPattern(expr.expressions[i]);
	                                }
	                            }
	                            else {
	                                this.reinterpretExpressionAsPattern(expr);
	                            }
	                            var parameters = (expr.type === syntax_1.Syntax.SequenceExpression ? expr.expressions : [expr]);
	                            expr = {
	                                type: ArrowParameterPlaceHolder,
	                                params: parameters,
	                                async: false
	                            };
	                        }
	                    }
	                    this.context.isBindingElement = false;
	                }
	            }
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-left-hand-side-expressions
	    Parser.prototype.parseArguments = function () {
	        this.expect('(');
	        var args = [];
	        if (!this.match(')')) {
	            while (true) {
	                var expr = this.match('...') ? this.parseSpreadElement() :
	                    this.isolateCoverGrammar(this.parseAssignmentExpression);
	                args.push(expr);
	                if (this.match(')')) {
	                    break;
	                }
	                this.expectCommaSeparator();
	                if (this.match(')')) {
	                    break;
	                }
	            }
	        }
	        this.expect(')');
	        return args;
	    };
	    Parser.prototype.isIdentifierName = function (token) {
	        return token.type === 3 /* Identifier */ ||
	            token.type === 4 /* Keyword */ ||
	            token.type === 1 /* BooleanLiteral */ ||
	            token.type === 5 /* NullLiteral */;
	    };
	    Parser.prototype.parseIdentifierName = function () {
	        var node = this.createNode();
	        var token = this.nextToken();
	        if (!this.isIdentifierName(token)) {
	            this.throwUnexpectedToken(token);
	        }
	        return this.finalize(node, new Node.Identifier(token.value));
	    };
	    Parser.prototype.parseNewExpression = function () {
	        var node = this.createNode();
	        var id = this.parseIdentifierName();
	        assert_1.assert(id.name === 'new', 'New expression must start with `new`');
	        var expr;
	        if (this.match('.')) {
	            this.nextToken();
	            if (this.lookahead.type === 3 /* Identifier */ && this.context.inFunctionBody && this.lookahead.value === 'target') {
	                var property = this.parseIdentifierName();
	                expr = new Node.MetaProperty(id, property);
	            }
	            else {
	                this.throwUnexpectedToken(this.lookahead);
	            }
	        }
	        else {
	            var callee = this.isolateCoverGrammar(this.parseLeftHandSideExpression);
	            var args = this.match('(') ? this.parseArguments() : [];
	            expr = new Node.NewExpression(callee, args);
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	        }
	        return this.finalize(node, expr);
	    };
	    Parser.prototype.parseAsyncArgument = function () {
	        var arg = this.parseAssignmentExpression();
	        this.context.firstCoverInitializedNameError = null;
	        return arg;
	    };
	    Parser.prototype.parseAsyncArguments = function () {
	        this.expect('(');
	        var args = [];
	        if (!this.match(')')) {
	            while (true) {
	                var expr = this.match('...') ? this.parseSpreadElement() :
	                    this.isolateCoverGrammar(this.parseAsyncArgument);
	                args.push(expr);
	                if (this.match(')')) {
	                    break;
	                }
	                this.expectCommaSeparator();
	                if (this.match(')')) {
	                    break;
	                }
	            }
	        }
	        this.expect(')');
	        return args;
	    };
	    Parser.prototype.parseLeftHandSideExpressionAllowCall = function () {
	        var startToken = this.lookahead;
	        var maybeAsync = this.matchContextualKeyword('async');
	        var previousAllowIn = this.context.allowIn;
	        this.context.allowIn = true;
	        var expr;
	        if (this.matchKeyword('super') && this.context.inFunctionBody) {
	            expr = this.createNode();
	            this.nextToken();
	            expr = this.finalize(expr, new Node.Super());
	            if (!this.match('(') && !this.match('.') && !this.match('[')) {
	                this.throwUnexpectedToken(this.lookahead);
	            }
	        }
	        else {
	            expr = this.inheritCoverGrammar(this.matchKeyword('new') ? this.parseNewExpression : this.parsePrimaryExpression);
	        }
	        while (true) {
	            if (this.match('.')) {
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = true;
	                this.expect('.');
	                var property = this.parseIdentifierName();
	                expr = this.finalize(this.startNode(startToken), new Node.StaticMemberExpression(expr, property));
	            }
	            else if (this.match('(')) {
	                var asyncArrow = maybeAsync && (startToken.lineNumber === this.lookahead.lineNumber);
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = false;
	                var args = asyncArrow ? this.parseAsyncArguments() : this.parseArguments();
	                expr = this.finalize(this.startNode(startToken), new Node.CallExpression(expr, args));
	                if (asyncArrow && this.match('=>')) {
	                    for (var i = 0; i < args.length; ++i) {
	                        this.reinterpretExpressionAsPattern(args[i]);
	                    }
	                    expr = {
	                        type: ArrowParameterPlaceHolder,
	                        params: args,
	                        async: true
	                    };
	                }
	            }
	            else if (this.match('[')) {
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = true;
	                this.expect('[');
	                var property = this.isolateCoverGrammar(this.parseExpression);
	                this.expect(']');
	                expr = this.finalize(this.startNode(startToken), new Node.ComputedMemberExpression(expr, property));
	            }
	            else if (this.lookahead.type === 10 /* Template */ && this.lookahead.head) {
	                var quasi = this.parseTemplateLiteral();
	                expr = this.finalize(this.startNode(startToken), new Node.TaggedTemplateExpression(expr, quasi));
	            }
	            else {
	                break;
	            }
	        }
	        this.context.allowIn = previousAllowIn;
	        return expr;
	    };
	    Parser.prototype.parseSuper = function () {
	        var node = this.createNode();
	        this.expectKeyword('super');
	        if (!this.match('[') && !this.match('.')) {
	            this.throwUnexpectedToken(this.lookahead);
	        }
	        return this.finalize(node, new Node.Super());
	    };
	    Parser.prototype.parseLeftHandSideExpression = function () {
	        assert_1.assert(this.context.allowIn, 'callee of new expression always allow in keyword.');
	        var node = this.startNode(this.lookahead);
	        var expr = (this.matchKeyword('super') && this.context.inFunctionBody) ? this.parseSuper() :
	            this.inheritCoverGrammar(this.matchKeyword('new') ? this.parseNewExpression : this.parsePrimaryExpression);
	        while (true) {
	            if (this.match('[')) {
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = true;
	                this.expect('[');
	                var property = this.isolateCoverGrammar(this.parseExpression);
	                this.expect(']');
	                expr = this.finalize(node, new Node.ComputedMemberExpression(expr, property));
	            }
	            else if (this.match('.')) {
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = true;
	                this.expect('.');
	                var property = this.parseIdentifierName();
	                expr = this.finalize(node, new Node.StaticMemberExpression(expr, property));
	            }
	            else if (this.lookahead.type === 10 /* Template */ && this.lookahead.head) {
	                var quasi = this.parseTemplateLiteral();
	                expr = this.finalize(node, new Node.TaggedTemplateExpression(expr, quasi));
	            }
	            else {
	                break;
	            }
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-update-expressions
	    Parser.prototype.parseUpdateExpression = function () {
	        var expr;
	        var startToken = this.lookahead;
	        if (this.match('++') || this.match('--')) {
	            var node = this.startNode(startToken);
	            var token = this.nextToken();
	            expr = this.inheritCoverGrammar(this.parseUnaryExpression);
	            if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
	                this.tolerateError(messages_1.Messages.StrictLHSPrefix);
	            }
	            if (!this.context.isAssignmentTarget) {
	                this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
	            }
	            var prefix = true;
	            expr = this.finalize(node, new Node.UpdateExpression(token.value, expr, prefix));
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	        }
	        else {
	            expr = this.inheritCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
	            if (!this.hasLineTerminator && this.lookahead.type === 7 /* Punctuator */) {
	                if (this.match('++') || this.match('--')) {
	                    if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
	                        this.tolerateError(messages_1.Messages.StrictLHSPostfix);
	                    }
	                    if (!this.context.isAssignmentTarget) {
	                        this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
	                    }
	                    this.context.isAssignmentTarget = false;
	                    this.context.isBindingElement = false;
	                    var operator = this.nextToken().value;
	                    var prefix = false;
	                    expr = this.finalize(this.startNode(startToken), new Node.UpdateExpression(operator, expr, prefix));
	                }
	            }
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-unary-operators
	    Parser.prototype.parseAwaitExpression = function () {
	        var node = this.createNode();
	        this.nextToken();
	        var argument = this.parseUnaryExpression();
	        return this.finalize(node, new Node.AwaitExpression(argument));
	    };
	    Parser.prototype.parseUnaryExpression = function () {
	        var expr;
	        if (this.match('+') || this.match('-') || this.match('~') || this.match('!') ||
	            this.matchKeyword('delete') || this.matchKeyword('void') || this.matchKeyword('typeof')) {
	            var node = this.startNode(this.lookahead);
	            var token = this.nextToken();
	            expr = this.inheritCoverGrammar(this.parseUnaryExpression);
	            expr = this.finalize(node, new Node.UnaryExpression(token.value, expr));
	            if (this.context.strict && expr.operator === 'delete' && expr.argument.type === syntax_1.Syntax.Identifier) {
	                this.tolerateError(messages_1.Messages.StrictDelete);
	            }
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	        }
	        else if (this.context.await && this.matchContextualKeyword('await')) {
	            expr = this.parseAwaitExpression();
	        }
	        else {
	            expr = this.parseUpdateExpression();
	        }
	        return expr;
	    };
	    Parser.prototype.parseExponentiationExpression = function () {
	        var startToken = this.lookahead;
	        var expr = this.inheritCoverGrammar(this.parseUnaryExpression);
	        if (expr.type !== syntax_1.Syntax.UnaryExpression && this.match('**')) {
	            this.nextToken();
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	            var left = expr;
	            var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
	            expr = this.finalize(this.startNode(startToken), new Node.BinaryExpression('**', left, right));
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-exp-operator
	    // https://tc39.github.io/ecma262/#sec-multiplicative-operators
	    // https://tc39.github.io/ecma262/#sec-additive-operators
	    // https://tc39.github.io/ecma262/#sec-bitwise-shift-operators
	    // https://tc39.github.io/ecma262/#sec-relational-operators
	    // https://tc39.github.io/ecma262/#sec-equality-operators
	    // https://tc39.github.io/ecma262/#sec-binary-bitwise-operators
	    // https://tc39.github.io/ecma262/#sec-binary-logical-operators
	    Parser.prototype.binaryPrecedence = function (token) {
	        var op = token.value;
	        var precedence;
	        if (token.type === 7 /* Punctuator */) {
	            precedence = this.operatorPrecedence[op] || 0;
	        }
	        else if (token.type === 4 /* Keyword */) {
	            precedence = (op === 'instanceof' || (this.context.allowIn && op === 'in')) ? 7 : 0;
	        }
	        else {
	            precedence = 0;
	        }
	        return precedence;
	    };
	    Parser.prototype.parseBinaryExpression = function () {
	        var startToken = this.lookahead;
	        var expr = this.inheritCoverGrammar(this.parseExponentiationExpression);
	        var token = this.lookahead;
	        var prec = this.binaryPrecedence(token);
	        if (prec > 0) {
	            this.nextToken();
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	            var markers = [startToken, this.lookahead];
	            var left = expr;
	            var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
	            var stack = [left, token.value, right];
	            var precedences = [prec];
	            while (true) {
	                prec = this.binaryPrecedence(this.lookahead);
	                if (prec <= 0) {
	                    break;
	                }
	                // Reduce: make a binary expression from the three topmost entries.
	                while ((stack.length > 2) && (prec <= precedences[precedences.length - 1])) {
	                    right = stack.pop();
	                    var operator = stack.pop();
	                    precedences.pop();
	                    left = stack.pop();
	                    markers.pop();
	                    var node = this.startNode(markers[markers.length - 1]);
	                    stack.push(this.finalize(node, new Node.BinaryExpression(operator, left, right)));
	                }
	                // Shift.
	                stack.push(this.nextToken().value);
	                precedences.push(prec);
	                markers.push(this.lookahead);
	                stack.push(this.isolateCoverGrammar(this.parseExponentiationExpression));
	            }
	            // Final reduce to clean-up the stack.
	            var i = stack.length - 1;
	            expr = stack[i];
	            var lastMarker = markers.pop();
	            while (i > 1) {
	                var marker = markers.pop();
	                var lastLineStart = lastMarker && lastMarker.lineStart;
	                var node = this.startNode(marker, lastLineStart);
	                var operator = stack[i - 1];
	                expr = this.finalize(node, new Node.BinaryExpression(operator, stack[i - 2], expr));
	                i -= 2;
	                lastMarker = marker;
	            }
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-conditional-operator
	    Parser.prototype.parseConditionalExpression = function () {
	        var startToken = this.lookahead;
	        var expr = this.inheritCoverGrammar(this.parseBinaryExpression);
	        if (this.match('?')) {
	            this.nextToken();
	            var previousAllowIn = this.context.allowIn;
	            this.context.allowIn = true;
	            var consequent = this.isolateCoverGrammar(this.parseAssignmentExpression);
	            this.context.allowIn = previousAllowIn;
	            this.expect(':');
	            var alternate = this.isolateCoverGrammar(this.parseAssignmentExpression);
	            expr = this.finalize(this.startNode(startToken), new Node.ConditionalExpression(expr, consequent, alternate));
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-assignment-operators
	    Parser.prototype.checkPatternParam = function (options, param) {
	        switch (param.type) {
	            case syntax_1.Syntax.Identifier:
	                this.validateParam(options, param, param.name);
	                break;
	            case syntax_1.Syntax.RestElement:
	                this.checkPatternParam(options, param.argument);
	                break;
	            case syntax_1.Syntax.AssignmentPattern:
	                this.checkPatternParam(options, param.left);
	                break;
	            case syntax_1.Syntax.ArrayPattern:
	                for (var i = 0; i < param.elements.length; i++) {
	                    if (param.elements[i] !== null) {
	                        this.checkPatternParam(options, param.elements[i]);
	                    }
	                }
	                break;
	            case syntax_1.Syntax.ObjectPattern:
	                for (var i = 0; i < param.properties.length; i++) {
	                    this.checkPatternParam(options, param.properties[i].value);
	                }
	                break;
	            default:
	                break;
	        }
	        options.simple = options.simple && (param instanceof Node.Identifier);
	    };
	    Parser.prototype.reinterpretAsCoverFormalsList = function (expr) {
	        var params = [expr];
	        var options;
	        var asyncArrow = false;
	        switch (expr.type) {
	            case syntax_1.Syntax.Identifier:
	                break;
	            case ArrowParameterPlaceHolder:
	                params = expr.params;
	                asyncArrow = expr.async;
	                break;
	            default:
	                return null;
	        }
	        options = {
	            simple: true,
	            paramSet: {}
	        };
	        for (var i = 0; i < params.length; ++i) {
	            var param = params[i];
	            if (param.type === syntax_1.Syntax.AssignmentPattern) {
	                if (param.right.type === syntax_1.Syntax.YieldExpression) {
	                    if (param.right.argument) {
	                        this.throwUnexpectedToken(this.lookahead);
	                    }
	                    param.right.type = syntax_1.Syntax.Identifier;
	                    param.right.name = 'yield';
	                    delete param.right.argument;
	                    delete param.right.delegate;
	                }
	            }
	            else if (asyncArrow && param.type === syntax_1.Syntax.Identifier && param.name === 'await') {
	                this.throwUnexpectedToken(this.lookahead);
	            }
	            this.checkPatternParam(options, param);
	            params[i] = param;
	        }
	        if (this.context.strict || !this.context.allowYield) {
	            for (var i = 0; i < params.length; ++i) {
	                var param = params[i];
	                if (param.type === syntax_1.Syntax.YieldExpression) {
	                    this.throwUnexpectedToken(this.lookahead);
	                }
	            }
	        }
	        if (options.message === messages_1.Messages.StrictParamDupe) {
	            var token = this.context.strict ? options.stricted : options.firstRestricted;
	            this.throwUnexpectedToken(token, options.message);
	        }
	        return {
	            simple: options.simple,
	            params: params,
	            stricted: options.stricted,
	            firstRestricted: options.firstRestricted,
	            message: options.message
	        };
	    };
	    Parser.prototype.parseAssignmentExpression = function () {
	        var expr;
	        if (!this.context.allowYield && this.matchKeyword('yield')) {
	            expr = this.parseYieldExpression();
	        }
	        else {
	            var startToken = this.lookahead;
	            var token = startToken;
	            expr = this.parseConditionalExpression();
	            if (token.type === 3 /* Identifier */ && (token.lineNumber === this.lookahead.lineNumber) && token.value === 'async') {
	                if (this.lookahead.type === 3 /* Identifier */ || this.matchKeyword('yield')) {
	                    var arg = this.parsePrimaryExpression();
	                    this.reinterpretExpressionAsPattern(arg);
	                    expr = {
	                        type: ArrowParameterPlaceHolder,
	                        params: [arg],
	                        async: true
	                    };
	                }
	            }
	            if (expr.type === ArrowParameterPlaceHolder || this.match('=>')) {
	                // https://tc39.github.io/ecma262/#sec-arrow-function-definitions
	                this.context.isAssignmentTarget = false;
	                this.context.isBindingElement = false;
	                var isAsync = expr.async;
	                var list = this.reinterpretAsCoverFormalsList(expr);
	                if (list) {
	                    if (this.hasLineTerminator) {
	                        this.tolerateUnexpectedToken(this.lookahead);
	                    }
	                    this.context.firstCoverInitializedNameError = null;
	                    var previousStrict = this.context.strict;
	                    var previousAllowStrictDirective = this.context.allowStrictDirective;
	                    this.context.allowStrictDirective = list.simple;
	                    var previousAllowYield = this.context.allowYield;
	                    var previousAwait = this.context.await;
	                    this.context.allowYield = true;
	                    this.context.await = isAsync;
	                    var node = this.startNode(startToken);
	                    this.expect('=>');
	                    var body = void 0;
	                    if (this.match('{')) {
	                        var previousAllowIn = this.context.allowIn;
	                        this.context.allowIn = true;
	                        body = this.parseFunctionSourceElements();
	                        this.context.allowIn = previousAllowIn;
	                    }
	                    else {
	                        body = this.isolateCoverGrammar(this.parseAssignmentExpression);
	                    }
	                    var expression = body.type !== syntax_1.Syntax.BlockStatement;
	                    if (this.context.strict && list.firstRestricted) {
	                        this.throwUnexpectedToken(list.firstRestricted, list.message);
	                    }
	                    if (this.context.strict && list.stricted) {
	                        this.tolerateUnexpectedToken(list.stricted, list.message);
	                    }
	                    expr = isAsync ? this.finalize(node, new Node.AsyncArrowFunctionExpression(list.params, body, expression)) :
	                        this.finalize(node, new Node.ArrowFunctionExpression(list.params, body, expression));
	                    this.context.strict = previousStrict;
	                    this.context.allowStrictDirective = previousAllowStrictDirective;
	                    this.context.allowYield = previousAllowYield;
	                    this.context.await = previousAwait;
	                }
	            }
	            else {
	                if (this.matchAssign()) {
	                    if (!this.context.isAssignmentTarget) {
	                        this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
	                    }
	                    if (this.context.strict && expr.type === syntax_1.Syntax.Identifier) {
	                        var id = expr;
	                        if (this.scanner.isRestrictedWord(id.name)) {
	                            this.tolerateUnexpectedToken(token, messages_1.Messages.StrictLHSAssignment);
	                        }
	                        if (this.scanner.isStrictModeReservedWord(id.name)) {
	                            this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
	                        }
	                    }
	                    if (!this.match('=')) {
	                        this.context.isAssignmentTarget = false;
	                        this.context.isBindingElement = false;
	                    }
	                    else {
	                        this.reinterpretExpressionAsPattern(expr);
	                    }
	                    token = this.nextToken();
	                    var operator = token.value;
	                    var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
	                    expr = this.finalize(this.startNode(startToken), new Node.AssignmentExpression(operator, expr, right));
	                    this.context.firstCoverInitializedNameError = null;
	                }
	            }
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-comma-operator
	    Parser.prototype.parseExpression = function () {
	        var startToken = this.lookahead;
	        var expr = this.isolateCoverGrammar(this.parseAssignmentExpression);
	        if (this.match(',')) {
	            var expressions = [];
	            expressions.push(expr);
	            while (this.lookahead.type !== 2 /* EOF */) {
	                if (!this.match(',')) {
	                    break;
	                }
	                this.nextToken();
	                expressions.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
	            }
	            expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-block
	    Parser.prototype.parseStatementListItem = function () {
	        var statement;
	        this.context.isAssignmentTarget = true;
	        this.context.isBindingElement = true;
	        if (this.lookahead.type === 4 /* Keyword */) {
	            switch (this.lookahead.value) {
	                case 'export':
	                    if (!this.context.isModule) {
	                        this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalExportDeclaration);
	                    }
	                    statement = this.parseExportDeclaration();
	                    break;
	                case 'import':
	                    if (!this.context.isModule) {
	                        this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalImportDeclaration);
	                    }
	                    statement = this.parseImportDeclaration();
	                    break;
	                case 'const':
	                    statement = this.parseLexicalDeclaration({ inFor: false });
	                    break;
	                case 'function':
	                    statement = this.parseFunctionDeclaration();
	                    break;
	                case 'class':
	                    statement = this.parseClassDeclaration();
	                    break;
	                case 'let':
	                    statement = this.isLexicalDeclaration() ? this.parseLexicalDeclaration({ inFor: false }) : this.parseStatement();
	                    break;
	                default:
	                    statement = this.parseStatement();
	                    break;
	            }
	        }
	        else {
	            statement = this.parseStatement();
	        }
	        return statement;
	    };
	    Parser.prototype.parseBlock = function () {
	        var node = this.createNode();
	        this.expect('{');
	        var block = [];
	        while (true) {
	            if (this.match('}')) {
	                break;
	            }
	            block.push(this.parseStatementListItem());
	        }
	        this.expect('}');
	        return this.finalize(node, new Node.BlockStatement(block));
	    };
	    // https://tc39.github.io/ecma262/#sec-let-and-const-declarations
	    Parser.prototype.parseLexicalBinding = function (kind, options) {
	        var node = this.createNode();
	        var params = [];
	        var id = this.parsePattern(params, kind);
	        if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
	            if (this.scanner.isRestrictedWord(id.name)) {
	                this.tolerateError(messages_1.Messages.StrictVarName);
	            }
	        }
	        var init = null;
	        if (kind === 'const') {
	            if (!this.matchKeyword('in') && !this.matchContextualKeyword('of')) {
	                if (this.match('=')) {
	                    this.nextToken();
	                    init = this.isolateCoverGrammar(this.parseAssignmentExpression);
	                }
	                else {
	                    this.throwError(messages_1.Messages.DeclarationMissingInitializer, 'const');
	                }
	            }
	        }
	        else if ((!options.inFor && id.type !== syntax_1.Syntax.Identifier) || this.match('=')) {
	            this.expect('=');
	            init = this.isolateCoverGrammar(this.parseAssignmentExpression);
	        }
	        return this.finalize(node, new Node.VariableDeclarator(id, init));
	    };
	    Parser.prototype.parseBindingList = function (kind, options) {
	        var list = [this.parseLexicalBinding(kind, options)];
	        while (this.match(',')) {
	            this.nextToken();
	            list.push(this.parseLexicalBinding(kind, options));
	        }
	        return list;
	    };
	    Parser.prototype.isLexicalDeclaration = function () {
	        var state = this.scanner.saveState();
	        this.scanner.scanComments();
	        var next = this.scanner.lex();
	        this.scanner.restoreState(state);
	        return (next.type === 3 /* Identifier */) ||
	            (next.type === 7 /* Punctuator */ && next.value === '[') ||
	            (next.type === 7 /* Punctuator */ && next.value === '{') ||
	            (next.type === 4 /* Keyword */ && next.value === 'let') ||
	            (next.type === 4 /* Keyword */ && next.value === 'yield');
	    };
	    Parser.prototype.parseLexicalDeclaration = function (options) {
	        var node = this.createNode();
	        var kind = this.nextToken().value;
	        assert_1.assert(kind === 'let' || kind === 'const', 'Lexical declaration must be either let or const');
	        var declarations = this.parseBindingList(kind, options);
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.VariableDeclaration(declarations, kind));
	    };
	    // https://tc39.github.io/ecma262/#sec-destructuring-binding-patterns
	    Parser.prototype.parseBindingRestElement = function (params, kind) {
	        var node = this.createNode();
	        this.expect('...');
	        var arg = this.parsePattern(params, kind);
	        return this.finalize(node, new Node.RestElement(arg));
	    };
	    Parser.prototype.parseArrayPattern = function (params, kind) {
	        var node = this.createNode();
	        this.expect('[');
	        var elements = [];
	        while (!this.match(']')) {
	            if (this.match(',')) {
	                this.nextToken();
	                elements.push(null);
	            }
	            else {
	                if (this.match('...')) {
	                    elements.push(this.parseBindingRestElement(params, kind));
	                    break;
	                }
	                else {
	                    elements.push(this.parsePatternWithDefault(params, kind));
	                }
	                if (!this.match(']')) {
	                    this.expect(',');
	                }
	            }
	        }
	        this.expect(']');
	        return this.finalize(node, new Node.ArrayPattern(elements));
	    };
	    Parser.prototype.parsePropertyPattern = function (params, kind) {
	        var node = this.createNode();
	        var computed = false;
	        var shorthand = false;
	        var method = false;
	        var key;
	        var value;
	        if (this.lookahead.type === 3 /* Identifier */) {
	            var keyToken = this.lookahead;
	            key = this.parseVariableIdentifier();
	            var init = this.finalize(node, new Node.Identifier(keyToken.value));
	            if (this.match('=')) {
	                params.push(keyToken);
	                shorthand = true;
	                this.nextToken();
	                var expr = this.parseAssignmentExpression();
	                value = this.finalize(this.startNode(keyToken), new Node.AssignmentPattern(init, expr));
	            }
	            else if (!this.match(':')) {
	                params.push(keyToken);
	                shorthand = true;
	                value = init;
	            }
	            else {
	                this.expect(':');
	                value = this.parsePatternWithDefault(params, kind);
	            }
	        }
	        else {
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            this.expect(':');
	            value = this.parsePatternWithDefault(params, kind);
	        }
	        return this.finalize(node, new Node.Property('init', key, computed, value, method, shorthand));
	    };
	    Parser.prototype.parseObjectPattern = function (params, kind) {
	        var node = this.createNode();
	        var properties = [];
	        this.expect('{');
	        while (!this.match('}')) {
	            properties.push(this.parsePropertyPattern(params, kind));
	            if (!this.match('}')) {
	                this.expect(',');
	            }
	        }
	        this.expect('}');
	        return this.finalize(node, new Node.ObjectPattern(properties));
	    };
	    Parser.prototype.parsePattern = function (params, kind) {
	        var pattern;
	        if (this.match('[')) {
	            pattern = this.parseArrayPattern(params, kind);
	        }
	        else if (this.match('{')) {
	            pattern = this.parseObjectPattern(params, kind);
	        }
	        else {
	            if (this.matchKeyword('let') && (kind === 'const' || kind === 'let')) {
	                this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.LetInLexicalBinding);
	            }
	            params.push(this.lookahead);
	            pattern = this.parseVariableIdentifier(kind);
	        }
	        return pattern;
	    };
	    Parser.prototype.parsePatternWithDefault = function (params, kind) {
	        var startToken = this.lookahead;
	        var pattern = this.parsePattern(params, kind);
	        if (this.match('=')) {
	            this.nextToken();
	            var previousAllowYield = this.context.allowYield;
	            this.context.allowYield = true;
	            var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
	            this.context.allowYield = previousAllowYield;
	            pattern = this.finalize(this.startNode(startToken), new Node.AssignmentPattern(pattern, right));
	        }
	        return pattern;
	    };
	    // https://tc39.github.io/ecma262/#sec-variable-statement
	    Parser.prototype.parseVariableIdentifier = function (kind) {
	        var node = this.createNode();
	        var token = this.nextToken();
	        if (token.type === 4 /* Keyword */ && token.value === 'yield') {
	            if (this.context.strict) {
	                this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
	            }
	            else if (!this.context.allowYield) {
	                this.throwUnexpectedToken(token);
	            }
	        }
	        else if (token.type !== 3 /* Identifier */) {
	            if (this.context.strict && token.type === 4 /* Keyword */ && this.scanner.isStrictModeReservedWord(token.value)) {
	                this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
	            }
	            else {
	                if (this.context.strict || token.value !== 'let' || kind !== 'var') {
	                    this.throwUnexpectedToken(token);
	                }
	            }
	        }
	        else if ((this.context.isModule || this.context.await) && token.type === 3 /* Identifier */ && token.value === 'await') {
	            this.tolerateUnexpectedToken(token);
	        }
	        return this.finalize(node, new Node.Identifier(token.value));
	    };
	    Parser.prototype.parseVariableDeclaration = function (options) {
	        var node = this.createNode();
	        var params = [];
	        var id = this.parsePattern(params, 'var');
	        if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
	            if (this.scanner.isRestrictedWord(id.name)) {
	                this.tolerateError(messages_1.Messages.StrictVarName);
	            }
	        }
	        var init = null;
	        if (this.match('=')) {
	            this.nextToken();
	            init = this.isolateCoverGrammar(this.parseAssignmentExpression);
	        }
	        else if (id.type !== syntax_1.Syntax.Identifier && !options.inFor) {
	            this.expect('=');
	        }
	        return this.finalize(node, new Node.VariableDeclarator(id, init));
	    };
	    Parser.prototype.parseVariableDeclarationList = function (options) {
	        var opt = { inFor: options.inFor };
	        var list = [];
	        list.push(this.parseVariableDeclaration(opt));
	        while (this.match(',')) {
	            this.nextToken();
	            list.push(this.parseVariableDeclaration(opt));
	        }
	        return list;
	    };
	    Parser.prototype.parseVariableStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('var');
	        var declarations = this.parseVariableDeclarationList({ inFor: false });
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.VariableDeclaration(declarations, 'var'));
	    };
	    // https://tc39.github.io/ecma262/#sec-empty-statement
	    Parser.prototype.parseEmptyStatement = function () {
	        var node = this.createNode();
	        this.expect(';');
	        return this.finalize(node, new Node.EmptyStatement());
	    };
	    // https://tc39.github.io/ecma262/#sec-expression-statement
	    Parser.prototype.parseExpressionStatement = function () {
	        var node = this.createNode();
	        var expr = this.parseExpression();
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.ExpressionStatement(expr));
	    };
	    // https://tc39.github.io/ecma262/#sec-if-statement
	    Parser.prototype.parseIfClause = function () {
	        if (this.context.strict && this.matchKeyword('function')) {
	            this.tolerateError(messages_1.Messages.StrictFunction);
	        }
	        return this.parseStatement();
	    };
	    Parser.prototype.parseIfStatement = function () {
	        var node = this.createNode();
	        var consequent;
	        var alternate = null;
	        this.expectKeyword('if');
	        this.expect('(');
	        var test = this.parseExpression();
	        if (!this.match(')') && this.config.tolerant) {
	            this.tolerateUnexpectedToken(this.nextToken());
	            consequent = this.finalize(this.createNode(), new Node.EmptyStatement());
	        }
	        else {
	            this.expect(')');
	            consequent = this.parseIfClause();
	            if (this.matchKeyword('else')) {
	                this.nextToken();
	                alternate = this.parseIfClause();
	            }
	        }
	        return this.finalize(node, new Node.IfStatement(test, consequent, alternate));
	    };
	    // https://tc39.github.io/ecma262/#sec-do-while-statement
	    Parser.prototype.parseDoWhileStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('do');
	        var previousInIteration = this.context.inIteration;
	        this.context.inIteration = true;
	        var body = this.parseStatement();
	        this.context.inIteration = previousInIteration;
	        this.expectKeyword('while');
	        this.expect('(');
	        var test = this.parseExpression();
	        if (!this.match(')') && this.config.tolerant) {
	            this.tolerateUnexpectedToken(this.nextToken());
	        }
	        else {
	            this.expect(')');
	            if (this.match(';')) {
	                this.nextToken();
	            }
	        }
	        return this.finalize(node, new Node.DoWhileStatement(body, test));
	    };
	    // https://tc39.github.io/ecma262/#sec-while-statement
	    Parser.prototype.parseWhileStatement = function () {
	        var node = this.createNode();
	        var body;
	        this.expectKeyword('while');
	        this.expect('(');
	        var test = this.parseExpression();
	        if (!this.match(')') && this.config.tolerant) {
	            this.tolerateUnexpectedToken(this.nextToken());
	            body = this.finalize(this.createNode(), new Node.EmptyStatement());
	        }
	        else {
	            this.expect(')');
	            var previousInIteration = this.context.inIteration;
	            this.context.inIteration = true;
	            body = this.parseStatement();
	            this.context.inIteration = previousInIteration;
	        }
	        return this.finalize(node, new Node.WhileStatement(test, body));
	    };
	    // https://tc39.github.io/ecma262/#sec-for-statement
	    // https://tc39.github.io/ecma262/#sec-for-in-and-for-of-statements
	    Parser.prototype.parseForStatement = function () {
	        var init = null;
	        var test = null;
	        var update = null;
	        var forIn = true;
	        var left, right;
	        var node = this.createNode();
	        this.expectKeyword('for');
	        this.expect('(');
	        if (this.match(';')) {
	            this.nextToken();
	        }
	        else {
	            if (this.matchKeyword('var')) {
	                init = this.createNode();
	                this.nextToken();
	                var previousAllowIn = this.context.allowIn;
	                this.context.allowIn = false;
	                var declarations = this.parseVariableDeclarationList({ inFor: true });
	                this.context.allowIn = previousAllowIn;
	                if (declarations.length === 1 && this.matchKeyword('in')) {
	                    var decl = declarations[0];
	                    if (decl.init && (decl.id.type === syntax_1.Syntax.ArrayPattern || decl.id.type === syntax_1.Syntax.ObjectPattern || this.context.strict)) {
	                        this.tolerateError(messages_1.Messages.ForInOfLoopInitializer, 'for-in');
	                    }
	                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
	                    this.nextToken();
	                    left = init;
	                    right = this.parseExpression();
	                    init = null;
	                }
	                else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword('of')) {
	                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
	                    this.nextToken();
	                    left = init;
	                    right = this.parseAssignmentExpression();
	                    init = null;
	                    forIn = false;
	                }
	                else {
	                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
	                    this.expect(';');
	                }
	            }
	            else if (this.matchKeyword('const') || this.matchKeyword('let')) {
	                init = this.createNode();
	                var kind = this.nextToken().value;
	                if (!this.context.strict && this.lookahead.value === 'in') {
	                    init = this.finalize(init, new Node.Identifier(kind));
	                    this.nextToken();
	                    left = init;
	                    right = this.parseExpression();
	                    init = null;
	                }
	                else {
	                    var previousAllowIn = this.context.allowIn;
	                    this.context.allowIn = false;
	                    var declarations = this.parseBindingList(kind, { inFor: true });
	                    this.context.allowIn = previousAllowIn;
	                    if (declarations.length === 1 && declarations[0].init === null && this.matchKeyword('in')) {
	                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
	                        this.nextToken();
	                        left = init;
	                        right = this.parseExpression();
	                        init = null;
	                    }
	                    else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword('of')) {
	                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
	                        this.nextToken();
	                        left = init;
	                        right = this.parseAssignmentExpression();
	                        init = null;
	                        forIn = false;
	                    }
	                    else {
	                        this.consumeSemicolon();
	                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
	                    }
	                }
	            }
	            else {
	                var initStartToken = this.lookahead;
	                var previousAllowIn = this.context.allowIn;
	                this.context.allowIn = false;
	                init = this.inheritCoverGrammar(this.parseAssignmentExpression);
	                this.context.allowIn = previousAllowIn;
	                if (this.matchKeyword('in')) {
	                    if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
	                        this.tolerateError(messages_1.Messages.InvalidLHSInForIn);
	                    }
	                    this.nextToken();
	                    this.reinterpretExpressionAsPattern(init);
	                    left = init;
	                    right = this.parseExpression();
	                    init = null;
	                }
	                else if (this.matchContextualKeyword('of')) {
	                    if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
	                        this.tolerateError(messages_1.Messages.InvalidLHSInForLoop);
	                    }
	                    this.nextToken();
	                    this.reinterpretExpressionAsPattern(init);
	                    left = init;
	                    right = this.parseAssignmentExpression();
	                    init = null;
	                    forIn = false;
	                }
	                else {
	                    if (this.match(',')) {
	                        var initSeq = [init];
	                        while (this.match(',')) {
	                            this.nextToken();
	                            initSeq.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
	                        }
	                        init = this.finalize(this.startNode(initStartToken), new Node.SequenceExpression(initSeq));
	                    }
	                    this.expect(';');
	                }
	            }
	        }
	        if (typeof left === 'undefined') {
	            if (!this.match(';')) {
	                test = this.parseExpression();
	            }
	            this.expect(';');
	            if (!this.match(')')) {
	                update = this.parseExpression();
	            }
	        }
	        var body;
	        if (!this.match(')') && this.config.tolerant) {
	            this.tolerateUnexpectedToken(this.nextToken());
	            body = this.finalize(this.createNode(), new Node.EmptyStatement());
	        }
	        else {
	            this.expect(')');
	            var previousInIteration = this.context.inIteration;
	            this.context.inIteration = true;
	            body = this.isolateCoverGrammar(this.parseStatement);
	            this.context.inIteration = previousInIteration;
	        }
	        return (typeof left === 'undefined') ?
	            this.finalize(node, new Node.ForStatement(init, test, update, body)) :
	            forIn ? this.finalize(node, new Node.ForInStatement(left, right, body)) :
	                this.finalize(node, new Node.ForOfStatement(left, right, body));
	    };
	    // https://tc39.github.io/ecma262/#sec-continue-statement
	    Parser.prototype.parseContinueStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('continue');
	        var label = null;
	        if (this.lookahead.type === 3 /* Identifier */ && !this.hasLineTerminator) {
	            var id = this.parseVariableIdentifier();
	            label = id;
	            var key = '$' + id.name;
	            if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
	                this.throwError(messages_1.Messages.UnknownLabel, id.name);
	            }
	        }
	        this.consumeSemicolon();
	        if (label === null && !this.context.inIteration) {
	            this.throwError(messages_1.Messages.IllegalContinue);
	        }
	        return this.finalize(node, new Node.ContinueStatement(label));
	    };
	    // https://tc39.github.io/ecma262/#sec-break-statement
	    Parser.prototype.parseBreakStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('break');
	        var label = null;
	        if (this.lookahead.type === 3 /* Identifier */ && !this.hasLineTerminator) {
	            var id = this.parseVariableIdentifier();
	            var key = '$' + id.name;
	            if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
	                this.throwError(messages_1.Messages.UnknownLabel, id.name);
	            }
	            label = id;
	        }
	        this.consumeSemicolon();
	        if (label === null && !this.context.inIteration && !this.context.inSwitch) {
	            this.throwError(messages_1.Messages.IllegalBreak);
	        }
	        return this.finalize(node, new Node.BreakStatement(label));
	    };
	    // https://tc39.github.io/ecma262/#sec-return-statement
	    Parser.prototype.parseReturnStatement = function () {
	        if (!this.context.inFunctionBody) {
	            this.tolerateError(messages_1.Messages.IllegalReturn);
	        }
	        var node = this.createNode();
	        this.expectKeyword('return');
	        var hasArgument = (!this.match(';') && !this.match('}') &&
	            !this.hasLineTerminator && this.lookahead.type !== 2 /* EOF */) ||
	            this.lookahead.type === 8 /* StringLiteral */ ||
	            this.lookahead.type === 10 /* Template */;
	        var argument = hasArgument ? this.parseExpression() : null;
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.ReturnStatement(argument));
	    };
	    // https://tc39.github.io/ecma262/#sec-with-statement
	    Parser.prototype.parseWithStatement = function () {
	        if (this.context.strict) {
	            this.tolerateError(messages_1.Messages.StrictModeWith);
	        }
	        var node = this.createNode();
	        var body;
	        this.expectKeyword('with');
	        this.expect('(');
	        var object = this.parseExpression();
	        if (!this.match(')') && this.config.tolerant) {
	            this.tolerateUnexpectedToken(this.nextToken());
	            body = this.finalize(this.createNode(), new Node.EmptyStatement());
	        }
	        else {
	            this.expect(')');
	            body = this.parseStatement();
	        }
	        return this.finalize(node, new Node.WithStatement(object, body));
	    };
	    // https://tc39.github.io/ecma262/#sec-switch-statement
	    Parser.prototype.parseSwitchCase = function () {
	        var node = this.createNode();
	        var test;
	        if (this.matchKeyword('default')) {
	            this.nextToken();
	            test = null;
	        }
	        else {
	            this.expectKeyword('case');
	            test = this.parseExpression();
	        }
	        this.expect(':');
	        var consequent = [];
	        while (true) {
	            if (this.match('}') || this.matchKeyword('default') || this.matchKeyword('case')) {
	                break;
	            }
	            consequent.push(this.parseStatementListItem());
	        }
	        return this.finalize(node, new Node.SwitchCase(test, consequent));
	    };
	    Parser.prototype.parseSwitchStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('switch');
	        this.expect('(');
	        var discriminant = this.parseExpression();
	        this.expect(')');
	        var previousInSwitch = this.context.inSwitch;
	        this.context.inSwitch = true;
	        var cases = [];
	        var defaultFound = false;
	        this.expect('{');
	        while (true) {
	            if (this.match('}')) {
	                break;
	            }
	            var clause = this.parseSwitchCase();
	            if (clause.test === null) {
	                if (defaultFound) {
	                    this.throwError(messages_1.Messages.MultipleDefaultsInSwitch);
	                }
	                defaultFound = true;
	            }
	            cases.push(clause);
	        }
	        this.expect('}');
	        this.context.inSwitch = previousInSwitch;
	        return this.finalize(node, new Node.SwitchStatement(discriminant, cases));
	    };
	    // https://tc39.github.io/ecma262/#sec-labelled-statements
	    Parser.prototype.parseLabelledStatement = function () {
	        var node = this.createNode();
	        var expr = this.parseExpression();
	        var statement;
	        if ((expr.type === syntax_1.Syntax.Identifier) && this.match(':')) {
	            this.nextToken();
	            var id = expr;
	            var key = '$' + id.name;
	            if (Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
	                this.throwError(messages_1.Messages.Redeclaration, 'Label', id.name);
	            }
	            this.context.labelSet[key] = true;
	            var body = void 0;
	            if (this.matchKeyword('class')) {
	                this.tolerateUnexpectedToken(this.lookahead);
	                body = this.parseClassDeclaration();
	            }
	            else if (this.matchKeyword('function')) {
	                var token = this.lookahead;
	                var declaration = this.parseFunctionDeclaration();
	                if (this.context.strict) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunction);
	                }
	                else if (declaration.generator) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.GeneratorInLegacyContext);
	                }
	                body = declaration;
	            }
	            else {
	                body = this.parseStatement();
	            }
	            delete this.context.labelSet[key];
	            statement = new Node.LabeledStatement(id, body);
	        }
	        else {
	            this.consumeSemicolon();
	            statement = new Node.ExpressionStatement(expr);
	        }
	        return this.finalize(node, statement);
	    };
	    // https://tc39.github.io/ecma262/#sec-throw-statement
	    Parser.prototype.parseThrowStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('throw');
	        if (this.hasLineTerminator) {
	            this.throwError(messages_1.Messages.NewlineAfterThrow);
	        }
	        var argument = this.parseExpression();
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.ThrowStatement(argument));
	    };
	    // https://tc39.github.io/ecma262/#sec-try-statement
	    Parser.prototype.parseCatchClause = function () {
	        var node = this.createNode();
	        this.expectKeyword('catch');
	        this.expect('(');
	        if (this.match(')')) {
	            this.throwUnexpectedToken(this.lookahead);
	        }
	        var params = [];
	        var param = this.parsePattern(params);
	        var paramMap = {};
	        for (var i = 0; i < params.length; i++) {
	            var key = '$' + params[i].value;
	            if (Object.prototype.hasOwnProperty.call(paramMap, key)) {
	                this.tolerateError(messages_1.Messages.DuplicateBinding, params[i].value);
	            }
	            paramMap[key] = true;
	        }
	        if (this.context.strict && param.type === syntax_1.Syntax.Identifier) {
	            if (this.scanner.isRestrictedWord(param.name)) {
	                this.tolerateError(messages_1.Messages.StrictCatchVariable);
	            }
	        }
	        this.expect(')');
	        var body = this.parseBlock();
	        return this.finalize(node, new Node.CatchClause(param, body));
	    };
	    Parser.prototype.parseFinallyClause = function () {
	        this.expectKeyword('finally');
	        return this.parseBlock();
	    };
	    Parser.prototype.parseTryStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('try');
	        var block = this.parseBlock();
	        var handler = this.matchKeyword('catch') ? this.parseCatchClause() : null;
	        var finalizer = this.matchKeyword('finally') ? this.parseFinallyClause() : null;
	        if (!handler && !finalizer) {
	            this.throwError(messages_1.Messages.NoCatchOrFinally);
	        }
	        return this.finalize(node, new Node.TryStatement(block, handler, finalizer));
	    };
	    // https://tc39.github.io/ecma262/#sec-debugger-statement
	    Parser.prototype.parseDebuggerStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('debugger');
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.DebuggerStatement());
	    };
	    // https://tc39.github.io/ecma262/#sec-ecmascript-language-statements-and-declarations
	    Parser.prototype.parseStatement = function () {
	        var statement;
	        switch (this.lookahead.type) {
	            case 1 /* BooleanLiteral */:
	            case 5 /* NullLiteral */:
	            case 6 /* NumericLiteral */:
	            case 8 /* StringLiteral */:
	            case 10 /* Template */:
	            case 9 /* RegularExpression */:
	                statement = this.parseExpressionStatement();
	                break;
	            case 7 /* Punctuator */:
	                var value = this.lookahead.value;
	                if (value === '{') {
	                    statement = this.parseBlock();
	                }
	                else if (value === '(') {
	                    statement = this.parseExpressionStatement();
	                }
	                else if (value === ';') {
	                    statement = this.parseEmptyStatement();
	                }
	                else {
	                    statement = this.parseExpressionStatement();
	                }
	                break;
	            case 3 /* Identifier */:
	                statement = this.matchAsyncFunction() ? this.parseFunctionDeclaration() : this.parseLabelledStatement();
	                break;
	            case 4 /* Keyword */:
	                switch (this.lookahead.value) {
	                    case 'break':
	                        statement = this.parseBreakStatement();
	                        break;
	                    case 'continue':
	                        statement = this.parseContinueStatement();
	                        break;
	                    case 'debugger':
	                        statement = this.parseDebuggerStatement();
	                        break;
	                    case 'do':
	                        statement = this.parseDoWhileStatement();
	                        break;
	                    case 'for':
	                        statement = this.parseForStatement();
	                        break;
	                    case 'function':
	                        statement = this.parseFunctionDeclaration();
	                        break;
	                    case 'if':
	                        statement = this.parseIfStatement();
	                        break;
	                    case 'return':
	                        statement = this.parseReturnStatement();
	                        break;
	                    case 'switch':
	                        statement = this.parseSwitchStatement();
	                        break;
	                    case 'throw':
	                        statement = this.parseThrowStatement();
	                        break;
	                    case 'try':
	                        statement = this.parseTryStatement();
	                        break;
	                    case 'var':
	                        statement = this.parseVariableStatement();
	                        break;
	                    case 'while':
	                        statement = this.parseWhileStatement();
	                        break;
	                    case 'with':
	                        statement = this.parseWithStatement();
	                        break;
	                    default:
	                        statement = this.parseExpressionStatement();
	                        break;
	                }
	                break;
	            default:
	                statement = this.throwUnexpectedToken(this.lookahead);
	        }
	        return statement;
	    };
	    // https://tc39.github.io/ecma262/#sec-function-definitions
	    Parser.prototype.parseFunctionSourceElements = function () {
	        var node = this.createNode();
	        this.expect('{');
	        var body = this.parseDirectivePrologues();
	        var previousLabelSet = this.context.labelSet;
	        var previousInIteration = this.context.inIteration;
	        var previousInSwitch = this.context.inSwitch;
	        var previousInFunctionBody = this.context.inFunctionBody;
	        this.context.labelSet = {};
	        this.context.inIteration = false;
	        this.context.inSwitch = false;
	        this.context.inFunctionBody = true;
	        while (this.lookahead.type !== 2 /* EOF */) {
	            if (this.match('}')) {
	                break;
	            }
	            body.push(this.parseStatementListItem());
	        }
	        this.expect('}');
	        this.context.labelSet = previousLabelSet;
	        this.context.inIteration = previousInIteration;
	        this.context.inSwitch = previousInSwitch;
	        this.context.inFunctionBody = previousInFunctionBody;
	        return this.finalize(node, new Node.BlockStatement(body));
	    };
	    Parser.prototype.validateParam = function (options, param, name) {
	        var key = '$' + name;
	        if (this.context.strict) {
	            if (this.scanner.isRestrictedWord(name)) {
	                options.stricted = param;
	                options.message = messages_1.Messages.StrictParamName;
	            }
	            if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
	                options.stricted = param;
	                options.message = messages_1.Messages.StrictParamDupe;
	            }
	        }
	        else if (!options.firstRestricted) {
	            if (this.scanner.isRestrictedWord(name)) {
	                options.firstRestricted = param;
	                options.message = messages_1.Messages.StrictParamName;
	            }
	            else if (this.scanner.isStrictModeReservedWord(name)) {
	                options.firstRestricted = param;
	                options.message = messages_1.Messages.StrictReservedWord;
	            }
	            else if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
	                options.stricted = param;
	                options.message = messages_1.Messages.StrictParamDupe;
	            }
	        }
	        /* istanbul ignore next */
	        if (typeof Object.defineProperty === 'function') {
	            Object.defineProperty(options.paramSet, key, { value: true, enumerable: true, writable: true, configurable: true });
	        }
	        else {
	            options.paramSet[key] = true;
	        }
	    };
	    Parser.prototype.parseRestElement = function (params) {
	        var node = this.createNode();
	        this.expect('...');
	        var arg = this.parsePattern(params);
	        if (this.match('=')) {
	            this.throwError(messages_1.Messages.DefaultRestParameter);
	        }
	        if (!this.match(')')) {
	            this.throwError(messages_1.Messages.ParameterAfterRestParameter);
	        }
	        return this.finalize(node, new Node.RestElement(arg));
	    };
	    Parser.prototype.parseFormalParameter = function (options) {
	        var params = [];
	        var param = this.match('...') ? this.parseRestElement(params) : this.parsePatternWithDefault(params);
	        for (var i = 0; i < params.length; i++) {
	            this.validateParam(options, params[i], params[i].value);
	        }
	        options.simple = options.simple && (param instanceof Node.Identifier);
	        options.params.push(param);
	    };
	    Parser.prototype.parseFormalParameters = function (firstRestricted) {
	        var options;
	        options = {
	            simple: true,
	            params: [],
	            firstRestricted: firstRestricted
	        };
	        this.expect('(');
	        if (!this.match(')')) {
	            options.paramSet = {};
	            while (this.lookahead.type !== 2 /* EOF */) {
	                this.parseFormalParameter(options);
	                if (this.match(')')) {
	                    break;
	                }
	                this.expect(',');
	                if (this.match(')')) {
	                    break;
	                }
	            }
	        }
	        this.expect(')');
	        return {
	            simple: options.simple,
	            params: options.params,
	            stricted: options.stricted,
	            firstRestricted: options.firstRestricted,
	            message: options.message
	        };
	    };
	    Parser.prototype.matchAsyncFunction = function () {
	        var match = this.matchContextualKeyword('async');
	        if (match) {
	            var state = this.scanner.saveState();
	            this.scanner.scanComments();
	            var next = this.scanner.lex();
	            this.scanner.restoreState(state);
	            match = (state.lineNumber === next.lineNumber) && (next.type === 4 /* Keyword */) && (next.value === 'function');
	        }
	        return match;
	    };
	    Parser.prototype.parseFunctionDeclaration = function (identifierIsOptional) {
	        var node = this.createNode();
	        var isAsync = this.matchContextualKeyword('async');
	        if (isAsync) {
	            this.nextToken();
	        }
	        this.expectKeyword('function');
	        var isGenerator = isAsync ? false : this.match('*');
	        if (isGenerator) {
	            this.nextToken();
	        }
	        var message;
	        var id = null;
	        var firstRestricted = null;
	        if (!identifierIsOptional || !this.match('(')) {
	            var token = this.lookahead;
	            id = this.parseVariableIdentifier();
	            if (this.context.strict) {
	                if (this.scanner.isRestrictedWord(token.value)) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
	                }
	            }
	            else {
	                if (this.scanner.isRestrictedWord(token.value)) {
	                    firstRestricted = token;
	                    message = messages_1.Messages.StrictFunctionName;
	                }
	                else if (this.scanner.isStrictModeReservedWord(token.value)) {
	                    firstRestricted = token;
	                    message = messages_1.Messages.StrictReservedWord;
	                }
	            }
	        }
	        var previousAllowAwait = this.context.await;
	        var previousAllowYield = this.context.allowYield;
	        this.context.await = isAsync;
	        this.context.allowYield = !isGenerator;
	        var formalParameters = this.parseFormalParameters(firstRestricted);
	        var params = formalParameters.params;
	        var stricted = formalParameters.stricted;
	        firstRestricted = formalParameters.firstRestricted;
	        if (formalParameters.message) {
	            message = formalParameters.message;
	        }
	        var previousStrict = this.context.strict;
	        var previousAllowStrictDirective = this.context.allowStrictDirective;
	        this.context.allowStrictDirective = formalParameters.simple;
	        var body = this.parseFunctionSourceElements();
	        if (this.context.strict && firstRestricted) {
	            this.throwUnexpectedToken(firstRestricted, message);
	        }
	        if (this.context.strict && stricted) {
	            this.tolerateUnexpectedToken(stricted, message);
	        }
	        this.context.strict = previousStrict;
	        this.context.allowStrictDirective = previousAllowStrictDirective;
	        this.context.await = previousAllowAwait;
	        this.context.allowYield = previousAllowYield;
	        return isAsync ? this.finalize(node, new Node.AsyncFunctionDeclaration(id, params, body)) :
	            this.finalize(node, new Node.FunctionDeclaration(id, params, body, isGenerator));
	    };
	    Parser.prototype.parseFunctionExpression = function () {
	        var node = this.createNode();
	        var isAsync = this.matchContextualKeyword('async');
	        if (isAsync) {
	            this.nextToken();
	        }
	        this.expectKeyword('function');
	        var isGenerator = isAsync ? false : this.match('*');
	        if (isGenerator) {
	            this.nextToken();
	        }
	        var message;
	        var id = null;
	        var firstRestricted;
	        var previousAllowAwait = this.context.await;
	        var previousAllowYield = this.context.allowYield;
	        this.context.await = isAsync;
	        this.context.allowYield = !isGenerator;
	        if (!this.match('(')) {
	            var token = this.lookahead;
	            id = (!this.context.strict && !isGenerator && this.matchKeyword('yield')) ? this.parseIdentifierName() : this.parseVariableIdentifier();
	            if (this.context.strict) {
	                if (this.scanner.isRestrictedWord(token.value)) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
	                }
	            }
	            else {
	                if (this.scanner.isRestrictedWord(token.value)) {
	                    firstRestricted = token;
	                    message = messages_1.Messages.StrictFunctionName;
	                }
	                else if (this.scanner.isStrictModeReservedWord(token.value)) {
	                    firstRestricted = token;
	                    message = messages_1.Messages.StrictReservedWord;
	                }
	            }
	        }
	        var formalParameters = this.parseFormalParameters(firstRestricted);
	        var params = formalParameters.params;
	        var stricted = formalParameters.stricted;
	        firstRestricted = formalParameters.firstRestricted;
	        if (formalParameters.message) {
	            message = formalParameters.message;
	        }
	        var previousStrict = this.context.strict;
	        var previousAllowStrictDirective = this.context.allowStrictDirective;
	        this.context.allowStrictDirective = formalParameters.simple;
	        var body = this.parseFunctionSourceElements();
	        if (this.context.strict && firstRestricted) {
	            this.throwUnexpectedToken(firstRestricted, message);
	        }
	        if (this.context.strict && stricted) {
	            this.tolerateUnexpectedToken(stricted, message);
	        }
	        this.context.strict = previousStrict;
	        this.context.allowStrictDirective = previousAllowStrictDirective;
	        this.context.await = previousAllowAwait;
	        this.context.allowYield = previousAllowYield;
	        return isAsync ? this.finalize(node, new Node.AsyncFunctionExpression(id, params, body)) :
	            this.finalize(node, new Node.FunctionExpression(id, params, body, isGenerator));
	    };
	    // https://tc39.github.io/ecma262/#sec-directive-prologues-and-the-use-strict-directive
	    Parser.prototype.parseDirective = function () {
	        var token = this.lookahead;
	        var node = this.createNode();
	        var expr = this.parseExpression();
	        var directive = (expr.type === syntax_1.Syntax.Literal) ? this.getTokenRaw(token).slice(1, -1) : null;
	        this.consumeSemicolon();
	        return this.finalize(node, directive ? new Node.Directive(expr, directive) : new Node.ExpressionStatement(expr));
	    };
	    Parser.prototype.parseDirectivePrologues = function () {
	        var firstRestricted = null;
	        var body = [];
	        while (true) {
	            var token = this.lookahead;
	            if (token.type !== 8 /* StringLiteral */) {
	                break;
	            }
	            var statement = this.parseDirective();
	            body.push(statement);
	            var directive = statement.directive;
	            if (typeof directive !== 'string') {
	                break;
	            }
	            if (directive === 'use strict') {
	                this.context.strict = true;
	                if (firstRestricted) {
	                    this.tolerateUnexpectedToken(firstRestricted, messages_1.Messages.StrictOctalLiteral);
	                }
	                if (!this.context.allowStrictDirective) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.IllegalLanguageModeDirective);
	                }
	            }
	            else {
	                if (!firstRestricted && token.octal) {
	                    firstRestricted = token;
	                }
	            }
	        }
	        return body;
	    };
	    // https://tc39.github.io/ecma262/#sec-method-definitions
	    Parser.prototype.qualifiedPropertyName = function (token) {
	        switch (token.type) {
	            case 3 /* Identifier */:
	            case 8 /* StringLiteral */:
	            case 1 /* BooleanLiteral */:
	            case 5 /* NullLiteral */:
	            case 6 /* NumericLiteral */:
	            case 4 /* Keyword */:
	                return true;
	            case 7 /* Punctuator */:
	                return token.value === '[';
	            default:
	                break;
	        }
	        return false;
	    };
	    Parser.prototype.parseGetterMethod = function () {
	        var node = this.createNode();
	        var isGenerator = false;
	        var previousAllowYield = this.context.allowYield;
	        this.context.allowYield = !isGenerator;
	        var formalParameters = this.parseFormalParameters();
	        if (formalParameters.params.length > 0) {
	            this.tolerateError(messages_1.Messages.BadGetterArity);
	        }
	        var method = this.parsePropertyMethod(formalParameters);
	        this.context.allowYield = previousAllowYield;
	        return this.finalize(node, new Node.FunctionExpression(null, formalParameters.params, method, isGenerator));
	    };
	    Parser.prototype.parseSetterMethod = function () {
	        var node = this.createNode();
	        var isGenerator = false;
	        var previousAllowYield = this.context.allowYield;
	        this.context.allowYield = !isGenerator;
	        var formalParameters = this.parseFormalParameters();
	        if (formalParameters.params.length !== 1) {
	            this.tolerateError(messages_1.Messages.BadSetterArity);
	        }
	        else if (formalParameters.params[0] instanceof Node.RestElement) {
	            this.tolerateError(messages_1.Messages.BadSetterRestParameter);
	        }
	        var method = this.parsePropertyMethod(formalParameters);
	        this.context.allowYield = previousAllowYield;
	        return this.finalize(node, new Node.FunctionExpression(null, formalParameters.params, method, isGenerator));
	    };
	    Parser.prototype.parseGeneratorMethod = function () {
	        var node = this.createNode();
	        var isGenerator = true;
	        var previousAllowYield = this.context.allowYield;
	        this.context.allowYield = true;
	        var params = this.parseFormalParameters();
	        this.context.allowYield = false;
	        var method = this.parsePropertyMethod(params);
	        this.context.allowYield = previousAllowYield;
	        return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
	    };
	    // https://tc39.github.io/ecma262/#sec-generator-function-definitions
	    Parser.prototype.isStartOfExpression = function () {
	        var start = true;
	        var value = this.lookahead.value;
	        switch (this.lookahead.type) {
	            case 7 /* Punctuator */:
	                start = (value === '[') || (value === '(') || (value === '{') ||
	                    (value === '+') || (value === '-') ||
	                    (value === '!') || (value === '~') ||
	                    (value === '++') || (value === '--') ||
	                    (value === '/') || (value === '/='); // regular expression literal
	                break;
	            case 4 /* Keyword */:
	                start = (value === 'class') || (value === 'delete') ||
	                    (value === 'function') || (value === 'let') || (value === 'new') ||
	                    (value === 'super') || (value === 'this') || (value === 'typeof') ||
	                    (value === 'void') || (value === 'yield');
	                break;
	            default:
	                break;
	        }
	        return start;
	    };
	    Parser.prototype.parseYieldExpression = function () {
	        var node = this.createNode();
	        this.expectKeyword('yield');
	        var argument = null;
	        var delegate = false;
	        if (!this.hasLineTerminator) {
	            var previousAllowYield = this.context.allowYield;
	            this.context.allowYield = false;
	            delegate = this.match('*');
	            if (delegate) {
	                this.nextToken();
	                argument = this.parseAssignmentExpression();
	            }
	            else if (this.isStartOfExpression()) {
	                argument = this.parseAssignmentExpression();
	            }
	            this.context.allowYield = previousAllowYield;
	        }
	        return this.finalize(node, new Node.YieldExpression(argument, delegate));
	    };
	    // https://tc39.github.io/ecma262/#sec-class-definitions
	    Parser.prototype.parseClassElement = function (hasConstructor) {
	        var token = this.lookahead;
	        var node = this.createNode();
	        var kind = '';
	        var key = null;
	        var value = null;
	        var computed = false;
	        var method = false;
	        var isStatic = false;
	        var isAsync = false;
	        if (this.match('*')) {
	            this.nextToken();
	        }
	        else {
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            var id = key;
	            if (id.name === 'static' && (this.qualifiedPropertyName(this.lookahead) || this.match('*'))) {
	                token = this.lookahead;
	                isStatic = true;
	                computed = this.match('[');
	                if (this.match('*')) {
	                    this.nextToken();
	                }
	                else {
	                    key = this.parseObjectPropertyKey();
	                }
	            }
	            if ((token.type === 3 /* Identifier */) && !this.hasLineTerminator && (token.value === 'async')) {
	                var punctuator = this.lookahead.value;
	                if (punctuator !== ':' && punctuator !== '(' && punctuator !== '*') {
	                    isAsync = true;
	                    token = this.lookahead;
	                    key = this.parseObjectPropertyKey();
	                    if (token.type === 3 /* Identifier */ && token.value === 'constructor') {
	                        this.tolerateUnexpectedToken(token, messages_1.Messages.ConstructorIsAsync);
	                    }
	                }
	            }
	        }
	        var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
	        if (token.type === 3 /* Identifier */) {
	            if (token.value === 'get' && lookaheadPropertyKey) {
	                kind = 'get';
	                computed = this.match('[');
	                key = this.parseObjectPropertyKey();
	                this.context.allowYield = false;
	                value = this.parseGetterMethod();
	            }
	            else if (token.value === 'set' && lookaheadPropertyKey) {
	                kind = 'set';
	                computed = this.match('[');
	                key = this.parseObjectPropertyKey();
	                value = this.parseSetterMethod();
	            }
	        }
	        else if (token.type === 7 /* Punctuator */ && token.value === '*' && lookaheadPropertyKey) {
	            kind = 'init';
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            value = this.parseGeneratorMethod();
	            method = true;
	        }
	        if (!kind && key && this.match('(')) {
	            kind = 'init';
	            value = isAsync ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction();
	            method = true;
	        }
	        if (!kind) {
	            this.throwUnexpectedToken(this.lookahead);
	        }
	        if (kind === 'init') {
	            kind = 'method';
	        }
	        if (!computed) {
	            if (isStatic && this.isPropertyKey(key, 'prototype')) {
	                this.throwUnexpectedToken(token, messages_1.Messages.StaticPrototype);
	            }
	            if (!isStatic && this.isPropertyKey(key, 'constructor')) {
	                if (kind !== 'method' || !method || (value && value.generator)) {
	                    this.throwUnexpectedToken(token, messages_1.Messages.ConstructorSpecialMethod);
	                }
	                if (hasConstructor.value) {
	                    this.throwUnexpectedToken(token, messages_1.Messages.DuplicateConstructor);
	                }
	                else {
	                    hasConstructor.value = true;
	                }
	                kind = 'constructor';
	            }
	        }
	        return this.finalize(node, new Node.MethodDefinition(key, computed, value, kind, isStatic));
	    };
	    Parser.prototype.parseClassElementList = function () {
	        var body = [];
	        var hasConstructor = { value: false };
	        this.expect('{');
	        while (!this.match('}')) {
	            if (this.match(';')) {
	                this.nextToken();
	            }
	            else {
	                body.push(this.parseClassElement(hasConstructor));
	            }
	        }
	        this.expect('}');
	        return body;
	    };
	    Parser.prototype.parseClassBody = function () {
	        var node = this.createNode();
	        var elementList = this.parseClassElementList();
	        return this.finalize(node, new Node.ClassBody(elementList));
	    };
	    Parser.prototype.parseClassDeclaration = function (identifierIsOptional) {
	        var node = this.createNode();
	        var previousStrict = this.context.strict;
	        this.context.strict = true;
	        this.expectKeyword('class');
	        var id = (identifierIsOptional && (this.lookahead.type !== 3 /* Identifier */)) ? null : this.parseVariableIdentifier();
	        var superClass = null;
	        if (this.matchKeyword('extends')) {
	            this.nextToken();
	            superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
	        }
	        var classBody = this.parseClassBody();
	        this.context.strict = previousStrict;
	        return this.finalize(node, new Node.ClassDeclaration(id, superClass, classBody));
	    };
	    Parser.prototype.parseClassExpression = function () {
	        var node = this.createNode();
	        var previousStrict = this.context.strict;
	        this.context.strict = true;
	        this.expectKeyword('class');
	        var id = (this.lookahead.type === 3 /* Identifier */) ? this.parseVariableIdentifier() : null;
	        var superClass = null;
	        if (this.matchKeyword('extends')) {
	            this.nextToken();
	            superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
	        }
	        var classBody = this.parseClassBody();
	        this.context.strict = previousStrict;
	        return this.finalize(node, new Node.ClassExpression(id, superClass, classBody));
	    };
	    // https://tc39.github.io/ecma262/#sec-scripts
	    // https://tc39.github.io/ecma262/#sec-modules
	    Parser.prototype.parseModule = function () {
	        this.context.strict = true;
	        this.context.isModule = true;
	        this.scanner.isModule = true;
	        var node = this.createNode();
	        var body = this.parseDirectivePrologues();
	        while (this.lookahead.type !== 2 /* EOF */) {
	            body.push(this.parseStatementListItem());
	        }
	        return this.finalize(node, new Node.Module(body));
	    };
	    Parser.prototype.parseScript = function () {
	        var node = this.createNode();
	        var body = this.parseDirectivePrologues();
	        while (this.lookahead.type !== 2 /* EOF */) {
	            body.push(this.parseStatementListItem());
	        }
	        return this.finalize(node, new Node.Script(body));
	    };
	    // https://tc39.github.io/ecma262/#sec-imports
	    Parser.prototype.parseModuleSpecifier = function () {
	        var node = this.createNode();
	        if (this.lookahead.type !== 8 /* StringLiteral */) {
	            this.throwError(messages_1.Messages.InvalidModuleSpecifier);
	        }
	        var token = this.nextToken();
	        var raw = this.getTokenRaw(token);
	        return this.finalize(node, new Node.Literal(token.value, raw));
	    };
	    // import {<foo as bar>} ...;
	    Parser.prototype.parseImportSpecifier = function () {
	        var node = this.createNode();
	        var imported;
	        var local;
	        if (this.lookahead.type === 3 /* Identifier */) {
	            imported = this.parseVariableIdentifier();
	            local = imported;
	            if (this.matchContextualKeyword('as')) {
	                this.nextToken();
	                local = this.parseVariableIdentifier();
	            }
	        }
	        else {
	            imported = this.parseIdentifierName();
	            local = imported;
	            if (this.matchContextualKeyword('as')) {
	                this.nextToken();
	                local = this.parseVariableIdentifier();
	            }
	            else {
	                this.throwUnexpectedToken(this.nextToken());
	            }
	        }
	        return this.finalize(node, new Node.ImportSpecifier(local, imported));
	    };
	    // {foo, bar as bas}
	    Parser.prototype.parseNamedImports = function () {
	        this.expect('{');
	        var specifiers = [];
	        while (!this.match('}')) {
	            specifiers.push(this.parseImportSpecifier());
	            if (!this.match('}')) {
	                this.expect(',');
	            }
	        }
	        this.expect('}');
	        return specifiers;
	    };
	    // import <foo> ...;
	    Parser.prototype.parseImportDefaultSpecifier = function () {
	        var node = this.createNode();
	        var local = this.parseIdentifierName();
	        return this.finalize(node, new Node.ImportDefaultSpecifier(local));
	    };
	    // import <* as foo> ...;
	    Parser.prototype.parseImportNamespaceSpecifier = function () {
	        var node = this.createNode();
	        this.expect('*');
	        if (!this.matchContextualKeyword('as')) {
	            this.throwError(messages_1.Messages.NoAsAfterImportNamespace);
	        }
	        this.nextToken();
	        var local = this.parseIdentifierName();
	        return this.finalize(node, new Node.ImportNamespaceSpecifier(local));
	    };
	    Parser.prototype.parseImportDeclaration = function () {
	        if (this.context.inFunctionBody) {
	            this.throwError(messages_1.Messages.IllegalImportDeclaration);
	        }
	        var node = this.createNode();
	        this.expectKeyword('import');
	        var src;
	        var specifiers = [];
	        if (this.lookahead.type === 8 /* StringLiteral */) {
	            // import 'foo';
	            src = this.parseModuleSpecifier();
	        }
	        else {
	            if (this.match('{')) {
	                // import {bar}
	                specifiers = specifiers.concat(this.parseNamedImports());
	            }
	            else if (this.match('*')) {
	                // import * as foo
	                specifiers.push(this.parseImportNamespaceSpecifier());
	            }
	            else if (this.isIdentifierName(this.lookahead) && !this.matchKeyword('default')) {
	                // import foo
	                specifiers.push(this.parseImportDefaultSpecifier());
	                if (this.match(',')) {
	                    this.nextToken();
	                    if (this.match('*')) {
	                        // import foo, * as foo
	                        specifiers.push(this.parseImportNamespaceSpecifier());
	                    }
	                    else if (this.match('{')) {
	                        // import foo, {bar}
	                        specifiers = specifiers.concat(this.parseNamedImports());
	                    }
	                    else {
	                        this.throwUnexpectedToken(this.lookahead);
	                    }
	                }
	            }
	            else {
	                this.throwUnexpectedToken(this.nextToken());
	            }
	            if (!this.matchContextualKeyword('from')) {
	                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
	                this.throwError(message, this.lookahead.value);
	            }
	            this.nextToken();
	            src = this.parseModuleSpecifier();
	        }
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.ImportDeclaration(specifiers, src));
	    };
	    // https://tc39.github.io/ecma262/#sec-exports
	    Parser.prototype.parseExportSpecifier = function () {
	        var node = this.createNode();
	        var local = this.parseIdentifierName();
	        var exported = local;
	        if (this.matchContextualKeyword('as')) {
	            this.nextToken();
	            exported = this.parseIdentifierName();
	        }
	        return this.finalize(node, new Node.ExportSpecifier(local, exported));
	    };
	    Parser.prototype.parseExportDeclaration = function () {
	        if (this.context.inFunctionBody) {
	            this.throwError(messages_1.Messages.IllegalExportDeclaration);
	        }
	        var node = this.createNode();
	        this.expectKeyword('export');
	        var exportDeclaration;
	        if (this.matchKeyword('default')) {
	            // export default ...
	            this.nextToken();
	            if (this.matchKeyword('function')) {
	                // export default function foo () {}
	                // export default function () {}
	                var declaration = this.parseFunctionDeclaration(true);
	                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
	            }
	            else if (this.matchKeyword('class')) {
	                // export default class foo {}
	                var declaration = this.parseClassDeclaration(true);
	                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
	            }
	            else if (this.matchContextualKeyword('async')) {
	                // export default async function f () {}
	                // export default async function () {}
	                // export default async x => x
	                var declaration = this.matchAsyncFunction() ? this.parseFunctionDeclaration(true) : this.parseAssignmentExpression();
	                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
	            }
	            else {
	                if (this.matchContextualKeyword('from')) {
	                    this.throwError(messages_1.Messages.UnexpectedToken, this.lookahead.value);
	                }
	                // export default {};
	                // export default [];
	                // export default (1 + 2);
	                var declaration = this.match('{') ? this.parseObjectInitializer() :
	                    this.match('[') ? this.parseArrayInitializer() : this.parseAssignmentExpression();
	                this.consumeSemicolon();
	                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
	            }
	        }
	        else if (this.match('*')) {
	            // export * from 'foo';
	            this.nextToken();
	            if (!this.matchContextualKeyword('from')) {
	                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
	                this.throwError(message, this.lookahead.value);
	            }
	            this.nextToken();
	            var src = this.parseModuleSpecifier();
	            this.consumeSemicolon();
	            exportDeclaration = this.finalize(node, new Node.ExportAllDeclaration(src));
	        }
	        else if (this.lookahead.type === 4 /* Keyword */) {
	            // export var f = 1;
	            var declaration = void 0;
	            switch (this.lookahead.value) {
	                case 'let':
	                case 'const':
	                    declaration = this.parseLexicalDeclaration({ inFor: false });
	                    break;
	                case 'var':
	                case 'class':
	                case 'function':
	                    declaration = this.parseStatementListItem();
	                    break;
	                default:
	                    this.throwUnexpectedToken(this.lookahead);
	            }
	            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(declaration, [], null));
	        }
	        else if (this.matchAsyncFunction()) {
	            var declaration = this.parseFunctionDeclaration();
	            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(declaration, [], null));
	        }
	        else {
	            var specifiers = [];
	            var source = null;
	            var isExportFromIdentifier = false;
	            this.expect('{');
	            while (!this.match('}')) {
	                isExportFromIdentifier = isExportFromIdentifier || this.matchKeyword('default');
	                specifiers.push(this.parseExportSpecifier());
	                if (!this.match('}')) {
	                    this.expect(',');
	                }
	            }
	            this.expect('}');
	            if (this.matchContextualKeyword('from')) {
	                // export {default} from 'foo';
	                // export {foo} from 'foo';
	                this.nextToken();
	                source = this.parseModuleSpecifier();
	                this.consumeSemicolon();
	            }
	            else if (isExportFromIdentifier) {
	                // export {default}; // missing fromClause
	                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
	                this.throwError(message, this.lookahead.value);
	            }
	            else {
	                // export {foo};
	                this.consumeSemicolon();
	            }
	            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(null, specifiers, source));
	        }
	        return exportDeclaration;
	    };
	    return Parser;
	}());
	exports.Parser = Parser;


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	// Ensure the condition is true, otherwise throw an error.
	// This is only to have a better contract semantic, i.e. another safety net
	// to catch a logic error. The condition shall be fulfilled in normal case.
	// Do NOT use this to enforce a certain condition on any user input.
	Object.defineProperty(exports, "__esModule", { value: true });
	function assert(condition, message) {
	    /* istanbul ignore if */
	    if (!condition) {
	        throw new Error('ASSERT: ' + message);
	    }
	}
	exports.assert = assert;


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	/* tslint:disable:max-classes-per-file */
	Object.defineProperty(exports, "__esModule", { value: true });
	var ErrorHandler = (function () {
	    function ErrorHandler() {
	        this.errors = [];
	        this.tolerant = false;
	    }
	    ErrorHandler.prototype.recordError = function (error) {
	        this.errors.push(error);
	    };
	    ErrorHandler.prototype.tolerate = function (error) {
	        if (this.tolerant) {
	            this.recordError(error);
	        }
	        else {
	            throw error;
	        }
	    };
	    ErrorHandler.prototype.constructError = function (msg, column) {
	        var error = new Error(msg);
	        try {
	            throw error;
	        }
	        catch (base) {
	            /* istanbul ignore else */
	            if (Object.create && Object.defineProperty) {
	                error = Object.create(base);
	                Object.defineProperty(error, 'column', { value: column });
	            }
	        }
	        /* istanbul ignore next */
	        return error;
	    };
	    ErrorHandler.prototype.createError = function (index, line, col, description) {
	        var msg = 'Line ' + line + ': ' + description;
	        var error = this.constructError(msg, col);
	        error.index = index;
	        error.lineNumber = line;
	        error.description = description;
	        return error;
	    };
	    ErrorHandler.prototype.throwError = function (index, line, col, description) {
	        throw this.createError(index, line, col, description);
	    };
	    ErrorHandler.prototype.tolerateError = function (index, line, col, description) {
	        var error = this.createError(index, line, col, description);
	        if (this.tolerant) {
	            this.recordError(error);
	        }
	        else {
	            throw error;
	        }
	    };
	    return ErrorHandler;
	}());
	exports.ErrorHandler = ErrorHandler;


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	// Error messages should be identical to V8.
	exports.Messages = {
	    BadGetterArity: 'Getter must not have any formal parameters',
	    BadSetterArity: 'Setter must have exactly one formal parameter',
	    BadSetterRestParameter: 'Setter function argument must not be a rest parameter',
	    ConstructorIsAsync: 'Class constructor may not be an async method',
	    ConstructorSpecialMethod: 'Class constructor may not be an accessor',
	    DeclarationMissingInitializer: 'Missing initializer in %0 declaration',
	    DefaultRestParameter: 'Unexpected token =',
	    DuplicateBinding: 'Duplicate binding %0',
	    DuplicateConstructor: 'A class may only have one constructor',
	    DuplicateProtoProperty: 'Duplicate __proto__ fields are not allowed in object literals',
	    ForInOfLoopInitializer: '%0 loop variable declaration may not have an initializer',
	    GeneratorInLegacyContext: 'Generator declarations are not allowed in legacy contexts',
	    IllegalBreak: 'Illegal break statement',
	    IllegalContinue: 'Illegal continue statement',
	    IllegalExportDeclaration: 'Unexpected token',
	    IllegalImportDeclaration: 'Unexpected token',
	    IllegalLanguageModeDirective: 'Illegal \'use strict\' directive in function with non-simple parameter list',
	    IllegalReturn: 'Illegal return statement',
	    InvalidEscapedReservedWord: 'Keyword must not contain escaped characters',
	    InvalidHexEscapeSequence: 'Invalid hexadecimal escape sequence',
	    InvalidLHSInAssignment: 'Invalid left-hand side in assignment',
	    InvalidLHSInForIn: 'Invalid left-hand side in for-in',
	    InvalidLHSInForLoop: 'Invalid left-hand side in for-loop',
	    InvalidModuleSpecifier: 'Unexpected token',
	    InvalidRegExp: 'Invalid regular expression',
	    LetInLexicalBinding: 'let is disallowed as a lexically bound name',
	    MissingFromClause: 'Unexpected token',
	    MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
	    NewlineAfterThrow: 'Illegal newline after throw',
	    NoAsAfterImportNamespace: 'Unexpected token',
	    NoCatchOrFinally: 'Missing catch or finally after try',
	    ParameterAfterRestParameter: 'Rest parameter must be last formal parameter',
	    Redeclaration: '%0 \'%1\' has already been declared',
	    StaticPrototype: 'Classes may not have static property named prototype',
	    StrictCatchVariable: 'Catch variable may not be eval or arguments in strict mode',
	    StrictDelete: 'Delete of an unqualified identifier in strict mode.',
	    StrictFunction: 'In strict mode code, functions can only be declared at top level or inside a block',
	    StrictFunctionName: 'Function name may not be eval or arguments in strict mode',
	    StrictLHSAssignment: 'Assignment to eval or arguments is not allowed in strict mode',
	    StrictLHSPostfix: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
	    StrictLHSPrefix: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
	    StrictModeWith: 'Strict mode code may not include a with statement',
	    StrictOctalLiteral: 'Octal literals are not allowed in strict mode.',
	    StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
	    StrictParamName: 'Parameter name eval or arguments is not allowed in strict mode',
	    StrictReservedWord: 'Use of future reserved word in strict mode',
	    StrictVarName: 'Variable name may not be eval or arguments in strict mode',
	    TemplateOctalLiteral: 'Octal literals are not allowed in template strings.',
	    UnexpectedEOS: 'Unexpected end of input',
	    UnexpectedIdentifier: 'Unexpected identifier',
	    UnexpectedNumber: 'Unexpected number',
	    UnexpectedReserved: 'Unexpected reserved word',
	    UnexpectedString: 'Unexpected string',
	    UnexpectedTemplate: 'Unexpected quasi %0',
	    UnexpectedToken: 'Unexpected token %0',
	    UnexpectedTokenIllegal: 'Unexpected token ILLEGAL',
	    UnknownLabel: 'Undefined label \'%0\'',
	    UnterminatedRegExp: 'Invalid regular expression: missing /'
	};


/***/ },
/* 12 */
/***/ function(module, exports, __nested_webpack_require_226595__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var assert_1 = __nested_webpack_require_226595__(9);
	var character_1 = __nested_webpack_require_226595__(4);
	var messages_1 = __nested_webpack_require_226595__(11);
	function hexValue(ch) {
	    return '0123456789abcdef'.indexOf(ch.toLowerCase());
	}
	function octalValue(ch) {
	    return '01234567'.indexOf(ch);
	}
	var Scanner = (function () {
	    function Scanner(code, handler) {
	        this.source = code;
	        this.errorHandler = handler;
	        this.trackComment = false;
	        this.isModule = false;
	        this.length = code.length;
	        this.index = 0;
	        this.lineNumber = (code.length > 0) ? 1 : 0;
	        this.lineStart = 0;
	        this.curlyStack = [];
	    }
	    Scanner.prototype.saveState = function () {
	        return {
	            index: this.index,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart
	        };
	    };
	    Scanner.prototype.restoreState = function (state) {
	        this.index = state.index;
	        this.lineNumber = state.lineNumber;
	        this.lineStart = state.lineStart;
	    };
	    Scanner.prototype.eof = function () {
	        return this.index >= this.length;
	    };
	    Scanner.prototype.throwUnexpectedToken = function (message) {
	        if (message === void 0) { message = messages_1.Messages.UnexpectedTokenIllegal; }
	        return this.errorHandler.throwError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
	    };
	    Scanner.prototype.tolerateUnexpectedToken = function (message) {
	        if (message === void 0) { message = messages_1.Messages.UnexpectedTokenIllegal; }
	        this.errorHandler.tolerateError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
	    };
	    // https://tc39.github.io/ecma262/#sec-comments
	    Scanner.prototype.skipSingleLineComment = function (offset) {
	        var comments = [];
	        var start, loc;
	        if (this.trackComment) {
	            comments = [];
	            start = this.index - offset;
	            loc = {
	                start: {
	                    line: this.lineNumber,
	                    column: this.index - this.lineStart - offset
	                },
	                end: {}
	            };
	        }
	        while (!this.eof()) {
	            var ch = this.source.charCodeAt(this.index);
	            ++this.index;
	            if (character_1.Character.isLineTerminator(ch)) {
	                if (this.trackComment) {
	                    loc.end = {
	                        line: this.lineNumber,
	                        column: this.index - this.lineStart - 1
	                    };
	                    var entry = {
	                        multiLine: false,
	                        slice: [start + offset, this.index - 1],
	                        range: [start, this.index - 1],
	                        loc: loc
	                    };
	                    comments.push(entry);
	                }
	                if (ch === 13 && this.source.charCodeAt(this.index) === 10) {
	                    ++this.index;
	                }
	                ++this.lineNumber;
	                this.lineStart = this.index;
	                return comments;
	            }
	        }
	        if (this.trackComment) {
	            loc.end = {
	                line: this.lineNumber,
	                column: this.index - this.lineStart
	            };
	            var entry = {
	                multiLine: false,
	                slice: [start + offset, this.index],
	                range: [start, this.index],
	                loc: loc
	            };
	            comments.push(entry);
	        }
	        return comments;
	    };
	    Scanner.prototype.skipMultiLineComment = function () {
	        var comments = [];
	        var start, loc;
	        if (this.trackComment) {
	            comments = [];
	            start = this.index - 2;
	            loc = {
	                start: {
	                    line: this.lineNumber,
	                    column: this.index - this.lineStart - 2
	                },
	                end: {}
	            };
	        }
	        while (!this.eof()) {
	            var ch = this.source.charCodeAt(this.index);
	            if (character_1.Character.isLineTerminator(ch)) {
	                if (ch === 0x0D && this.source.charCodeAt(this.index + 1) === 0x0A) {
	                    ++this.index;
	                }
	                ++this.lineNumber;
	                ++this.index;
	                this.lineStart = this.index;
	            }
	            else if (ch === 0x2A) {
	                // Block comment ends with '*/'.
	                if (this.source.charCodeAt(this.index + 1) === 0x2F) {
	                    this.index += 2;
	                    if (this.trackComment) {
	                        loc.end = {
	                            line: this.lineNumber,
	                            column: this.index - this.lineStart
	                        };
	                        var entry = {
	                            multiLine: true,
	                            slice: [start + 2, this.index - 2],
	                            range: [start, this.index],
	                            loc: loc
	                        };
	                        comments.push(entry);
	                    }
	                    return comments;
	                }
	                ++this.index;
	            }
	            else {
	                ++this.index;
	            }
	        }
	        // Ran off the end of the file - the whole thing is a comment
	        if (this.trackComment) {
	            loc.end = {
	                line: this.lineNumber,
	                column: this.index - this.lineStart
	            };
	            var entry = {
	                multiLine: true,
	                slice: [start + 2, this.index],
	                range: [start, this.index],
	                loc: loc
	            };
	            comments.push(entry);
	        }
	        this.tolerateUnexpectedToken();
	        return comments;
	    };
	    Scanner.prototype.scanComments = function () {
	        var comments;
	        if (this.trackComment) {
	            comments = [];
	        }
	        var start = (this.index === 0);
	        while (!this.eof()) {
	            var ch = this.source.charCodeAt(this.index);
	            if (character_1.Character.isWhiteSpace(ch)) {
	                ++this.index;
	            }
	            else if (character_1.Character.isLineTerminator(ch)) {
	                ++this.index;
	                if (ch === 0x0D && this.source.charCodeAt(this.index) === 0x0A) {
	                    ++this.index;
	                }
	                ++this.lineNumber;
	                this.lineStart = this.index;
	                start = true;
	            }
	            else if (ch === 0x2F) {
	                ch = this.source.charCodeAt(this.index + 1);
	                if (ch === 0x2F) {
	                    this.index += 2;
	                    var comment = this.skipSingleLineComment(2);
	                    if (this.trackComment) {
	                        comments = comments.concat(comment);
	                    }
	                    start = true;
	                }
	                else if (ch === 0x2A) {
	                    this.index += 2;
	                    var comment = this.skipMultiLineComment();
	                    if (this.trackComment) {
	                        comments = comments.concat(comment);
	                    }
	                }
	                else {
	                    break;
	                }
	            }
	            else if (start && ch === 0x2D) {
	                // U+003E is '>'
	                if ((this.source.charCodeAt(this.index + 1) === 0x2D) && (this.source.charCodeAt(this.index + 2) === 0x3E)) {
	                    // '-->' is a single-line comment
	                    this.index += 3;
	                    var comment = this.skipSingleLineComment(3);
	                    if (this.trackComment) {
	                        comments = comments.concat(comment);
	                    }
	                }
	                else {
	                    break;
	                }
	            }
	            else if (ch === 0x3C && !this.isModule) {
	                if (this.source.slice(this.index + 1, this.index + 4) === '!--') {
	                    this.index += 4; // `<!--`
	                    var comment = this.skipSingleLineComment(4);
	                    if (this.trackComment) {
	                        comments = comments.concat(comment);
	                    }
	                }
	                else {
	                    break;
	                }
	            }
	            else {
	                break;
	            }
	        }
	        return comments;
	    };
	    // https://tc39.github.io/ecma262/#sec-future-reserved-words
	    Scanner.prototype.isFutureReservedWord = function (id) {
	        switch (id) {
	            case 'enum':
	            case 'export':
	            case 'import':
	            case 'super':
	                return true;
	            default:
	                return false;
	        }
	    };
	    Scanner.prototype.isStrictModeReservedWord = function (id) {
	        switch (id) {
	            case 'implements':
	            case 'interface':
	            case 'package':
	            case 'private':
	            case 'protected':
	            case 'public':
	            case 'static':
	            case 'yield':
	            case 'let':
	                return true;
	            default:
	                return false;
	        }
	    };
	    Scanner.prototype.isRestrictedWord = function (id) {
	        return id === 'eval' || id === 'arguments';
	    };
	    // https://tc39.github.io/ecma262/#sec-keywords
	    Scanner.prototype.isKeyword = function (id) {
	        switch (id.length) {
	            case 2:
	                return (id === 'if') || (id === 'in') || (id === 'do');
	            case 3:
	                return (id === 'var') || (id === 'for') || (id === 'new') ||
	                    (id === 'try') || (id === 'let');
	            case 4:
	                return (id === 'this') || (id === 'else') || (id === 'case') ||
	                    (id === 'void') || (id === 'with') || (id === 'enum');
	            case 5:
	                return (id === 'while') || (id === 'break') || (id === 'catch') ||
	                    (id === 'throw') || (id === 'const') || (id === 'yield') ||
	                    (id === 'class') || (id === 'super');
	            case 6:
	                return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
	                    (id === 'switch') || (id === 'export') || (id === 'import');
	            case 7:
	                return (id === 'default') || (id === 'finally') || (id === 'extends');
	            case 8:
	                return (id === 'function') || (id === 'continue') || (id === 'debugger');
	            case 10:
	                return (id === 'instanceof');
	            default:
	                return false;
	        }
	    };
	    Scanner.prototype.codePointAt = function (i) {
	        var cp = this.source.charCodeAt(i);
	        if (cp >= 0xD800 && cp <= 0xDBFF) {
	            var second = this.source.charCodeAt(i + 1);
	            if (second >= 0xDC00 && second <= 0xDFFF) {
	                var first = cp;
	                cp = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
	            }
	        }
	        return cp;
	    };
	    Scanner.prototype.scanHexEscape = function (prefix) {
	        var len = (prefix === 'u') ? 4 : 2;
	        var code = 0;
	        for (var i = 0; i < len; ++i) {
	            if (!this.eof() && character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
	                code = code * 16 + hexValue(this.source[this.index++]);
	            }
	            else {
	                return null;
	            }
	        }
	        return String.fromCharCode(code);
	    };
	    Scanner.prototype.scanUnicodeCodePointEscape = function () {
	        var ch = this.source[this.index];
	        var code = 0;
	        // At least, one hex digit is required.
	        if (ch === '}') {
	            this.throwUnexpectedToken();
	        }
	        while (!this.eof()) {
	            ch = this.source[this.index++];
	            if (!character_1.Character.isHexDigit(ch.charCodeAt(0))) {
	                break;
	            }
	            code = code * 16 + hexValue(ch);
	        }
	        if (code > 0x10FFFF || ch !== '}') {
	            this.throwUnexpectedToken();
	        }
	        return character_1.Character.fromCodePoint(code);
	    };
	    Scanner.prototype.getIdentifier = function () {
	        var start = this.index++;
	        while (!this.eof()) {
	            var ch = this.source.charCodeAt(this.index);
	            if (ch === 0x5C) {
	                // Blackslash (U+005C) marks Unicode escape sequence.
	                this.index = start;
	                return this.getComplexIdentifier();
	            }
	            else if (ch >= 0xD800 && ch < 0xDFFF) {
	                // Need to handle surrogate pairs.
	                this.index = start;
	                return this.getComplexIdentifier();
	            }
	            if (character_1.Character.isIdentifierPart(ch)) {
	                ++this.index;
	            }
	            else {
	                break;
	            }
	        }
	        return this.source.slice(start, this.index);
	    };
	    Scanner.prototype.getComplexIdentifier = function () {
	        var cp = this.codePointAt(this.index);
	        var id = character_1.Character.fromCodePoint(cp);
	        this.index += id.length;
	        // '\u' (U+005C, U+0075) denotes an escaped character.
	        var ch;
	        if (cp === 0x5C) {
	            if (this.source.charCodeAt(this.index) !== 0x75) {
	                this.throwUnexpectedToken();
	            }
	            ++this.index;
	            if (this.source[this.index] === '{') {
	                ++this.index;
	                ch = this.scanUnicodeCodePointEscape();
	            }
	            else {
	                ch = this.scanHexEscape('u');
	                if (ch === null || ch === '\\' || !character_1.Character.isIdentifierStart(ch.charCodeAt(0))) {
	                    this.throwUnexpectedToken();
	                }
	            }
	            id = ch;
	        }
	        while (!this.eof()) {
	            cp = this.codePointAt(this.index);
	            if (!character_1.Character.isIdentifierPart(cp)) {
	                break;
	            }
	            ch = character_1.Character.fromCodePoint(cp);
	            id += ch;
	            this.index += ch.length;
	            // '\u' (U+005C, U+0075) denotes an escaped character.
	            if (cp === 0x5C) {
	                id = id.substr(0, id.length - 1);
	                if (this.source.charCodeAt(this.index) !== 0x75) {
	                    this.throwUnexpectedToken();
	                }
	                ++this.index;
	                if (this.source[this.index] === '{') {
	                    ++this.index;
	                    ch = this.scanUnicodeCodePointEscape();
	                }
	                else {
	                    ch = this.scanHexEscape('u');
	                    if (ch === null || ch === '\\' || !character_1.Character.isIdentifierPart(ch.charCodeAt(0))) {
	                        this.throwUnexpectedToken();
	                    }
	                }
	                id += ch;
	            }
	        }
	        return id;
	    };
	    Scanner.prototype.octalToDecimal = function (ch) {
	        // \0 is not octal escape sequence
	        var octal = (ch !== '0');
	        var code = octalValue(ch);
	        if (!this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
	            octal = true;
	            code = code * 8 + octalValue(this.source[this.index++]);
	            // 3 digits are only allowed when string starts
	            // with 0, 1, 2, 3
	            if ('0123'.indexOf(ch) >= 0 && !this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
	                code = code * 8 + octalValue(this.source[this.index++]);
	            }
	        }
	        return {
	            code: code,
	            octal: octal
	        };
	    };
	    // https://tc39.github.io/ecma262/#sec-names-and-keywords
	    Scanner.prototype.scanIdentifier = function () {
	        var type;
	        var start = this.index;
	        // Backslash (U+005C) starts an escaped character.
	        var id = (this.source.charCodeAt(start) === 0x5C) ? this.getComplexIdentifier() : this.getIdentifier();
	        // There is no keyword or literal with only one character.
	        // Thus, it must be an identifier.
	        if (id.length === 1) {
	            type = 3 /* Identifier */;
	        }
	        else if (this.isKeyword(id)) {
	            type = 4 /* Keyword */;
	        }
	        else if (id === 'null') {
	            type = 5 /* NullLiteral */;
	        }
	        else if (id === 'true' || id === 'false') {
	            type = 1 /* BooleanLiteral */;
	        }
	        else {
	            type = 3 /* Identifier */;
	        }
	        if (type !== 3 /* Identifier */ && (start + id.length !== this.index)) {
	            var restore = this.index;
	            this.index = start;
	            this.tolerateUnexpectedToken(messages_1.Messages.InvalidEscapedReservedWord);
	            this.index = restore;
	        }
	        return {
	            type: type,
	            value: id,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    // https://tc39.github.io/ecma262/#sec-punctuators
	    Scanner.prototype.scanPunctuator = function () {
	        var start = this.index;
	        // Check for most common single-character punctuators.
	        var str = this.source[this.index];
	        switch (str) {
	            case '(':
	            case '{':
	                if (str === '{') {
	                    this.curlyStack.push('{');
	                }
	                ++this.index;
	                break;
	            case '.':
	                ++this.index;
	                if (this.source[this.index] === '.' && this.source[this.index + 1] === '.') {
	                    // Spread operator: ...
	                    this.index += 2;
	                    str = '...';
	                }
	                break;
	            case '}':
	                ++this.index;
	                this.curlyStack.pop();
	                break;
	            case ')':
	            case ';':
	            case ',':
	            case '[':
	            case ']':
	            case ':':
	            case '?':
	            case '~':
	                ++this.index;
	                break;
	            default:
	                // 4-character punctuator.
	                str = this.source.substr(this.index, 4);
	                if (str === '>>>=') {
	                    this.index += 4;
	                }
	                else {
	                    // 3-character punctuators.
	                    str = str.substr(0, 3);
	                    if (str === '===' || str === '!==' || str === '>>>' ||
	                        str === '<<=' || str === '>>=' || str === '**=') {
	                        this.index += 3;
	                    }
	                    else {
	                        // 2-character punctuators.
	                        str = str.substr(0, 2);
	                        if (str === '&&' || str === '||' || str === '==' || str === '!=' ||
	                            str === '+=' || str === '-=' || str === '*=' || str === '/=' ||
	                            str === '++' || str === '--' || str === '<<' || str === '>>' ||
	                            str === '&=' || str === '|=' || str === '^=' || str === '%=' ||
	                            str === '<=' || str === '>=' || str === '=>' || str === '**') {
	                            this.index += 2;
	                        }
	                        else {
	                            // 1-character punctuators.
	                            str = this.source[this.index];
	                            if ('<>=!+-*%&|^/'.indexOf(str) >= 0) {
	                                ++this.index;
	                            }
	                        }
	                    }
	                }
	        }
	        if (this.index === start) {
	            this.throwUnexpectedToken();
	        }
	        return {
	            type: 7 /* Punctuator */,
	            value: str,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
	    Scanner.prototype.scanHexLiteral = function (start) {
	        var num = '';
	        while (!this.eof()) {
	            if (!character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
	                break;
	            }
	            num += this.source[this.index++];
	        }
	        if (num.length === 0) {
	            this.throwUnexpectedToken();
	        }
	        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
	            this.throwUnexpectedToken();
	        }
	        return {
	            type: 6 /* NumericLiteral */,
	            value: parseInt('0x' + num, 16),
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    Scanner.prototype.scanBinaryLiteral = function (start) {
	        var num = '';
	        var ch;
	        while (!this.eof()) {
	            ch = this.source[this.index];
	            if (ch !== '0' && ch !== '1') {
	                break;
	            }
	            num += this.source[this.index++];
	        }
	        if (num.length === 0) {
	            // only 0b or 0B
	            this.throwUnexpectedToken();
	        }
	        if (!this.eof()) {
	            ch = this.source.charCodeAt(this.index);
	            /* istanbul ignore else */
	            if (character_1.Character.isIdentifierStart(ch) || character_1.Character.isDecimalDigit(ch)) {
	                this.throwUnexpectedToken();
	            }
	        }
	        return {
	            type: 6 /* NumericLiteral */,
	            value: parseInt(num, 2),
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    Scanner.prototype.scanOctalLiteral = function (prefix, start) {
	        var num = '';
	        var octal = false;
	        if (character_1.Character.isOctalDigit(prefix.charCodeAt(0))) {
	            octal = true;
	            num = '0' + this.source[this.index++];
	        }
	        else {
	            ++this.index;
	        }
	        while (!this.eof()) {
	            if (!character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
	                break;
	            }
	            num += this.source[this.index++];
	        }
	        if (!octal && num.length === 0) {
	            // only 0o or 0O
	            this.throwUnexpectedToken();
	        }
	        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index)) || character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	            this.throwUnexpectedToken();
	        }
	        return {
	            type: 6 /* NumericLiteral */,
	            value: parseInt(num, 8),
	            octal: octal,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    Scanner.prototype.isImplicitOctalLiteral = function () {
	        // Implicit octal, unless there is a non-octal digit.
	        // (Annex B.1.1 on Numeric Literals)
	        for (var i = this.index + 1; i < this.length; ++i) {
	            var ch = this.source[i];
	            if (ch === '8' || ch === '9') {
	                return false;
	            }
	            if (!character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
	                return true;
	            }
	        }
	        return true;
	    };
	    Scanner.prototype.scanNumericLiteral = function () {
	        var start = this.index;
	        var ch = this.source[start];
	        assert_1.assert(character_1.Character.isDecimalDigit(ch.charCodeAt(0)) || (ch === '.'), 'Numeric literal must start with a decimal digit or a decimal point');
	        var num = '';
	        if (ch !== '.') {
	            num = this.source[this.index++];
	            ch = this.source[this.index];
	            // Hex number starts with '0x'.
	            // Octal number starts with '0'.
	            // Octal number in ES6 starts with '0o'.
	            // Binary number in ES6 starts with '0b'.
	            if (num === '0') {
	                if (ch === 'x' || ch === 'X') {
	                    ++this.index;
	                    return this.scanHexLiteral(start);
	                }
	                if (ch === 'b' || ch === 'B') {
	                    ++this.index;
	                    return this.scanBinaryLiteral(start);
	                }
	                if (ch === 'o' || ch === 'O') {
	                    return this.scanOctalLiteral(ch, start);
	                }
	                if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
	                    if (this.isImplicitOctalLiteral()) {
	                        return this.scanOctalLiteral(ch, start);
	                    }
	                }
	            }
	            while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                num += this.source[this.index++];
	            }
	            ch = this.source[this.index];
	        }
	        if (ch === '.') {
	            num += this.source[this.index++];
	            while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                num += this.source[this.index++];
	            }
	            ch = this.source[this.index];
	        }
	        if (ch === 'e' || ch === 'E') {
	            num += this.source[this.index++];
	            ch = this.source[this.index];
	            if (ch === '+' || ch === '-') {
	                num += this.source[this.index++];
	            }
	            if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                    num += this.source[this.index++];
	                }
	            }
	            else {
	                this.throwUnexpectedToken();
	            }
	        }
	        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
	            this.throwUnexpectedToken();
	        }
	        return {
	            type: 6 /* NumericLiteral */,
	            value: parseFloat(num),
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    // https://tc39.github.io/ecma262/#sec-literals-string-literals
	    Scanner.prototype.scanStringLiteral = function () {
	        var start = this.index;
	        var quote = this.source[start];
	        assert_1.assert((quote === '\'' || quote === '"'), 'String literal must starts with a quote');
	        ++this.index;
	        var octal = false;
	        var str = '';
	        while (!this.eof()) {
	            var ch = this.source[this.index++];
	            if (ch === quote) {
	                quote = '';
	                break;
	            }
	            else if (ch === '\\') {
	                ch = this.source[this.index++];
	                if (!ch || !character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                    switch (ch) {
	                        case 'u':
	                            if (this.source[this.index] === '{') {
	                                ++this.index;
	                                str += this.scanUnicodeCodePointEscape();
	                            }
	                            else {
	                                var unescaped_1 = this.scanHexEscape(ch);
	                                if (unescaped_1 === null) {
	                                    this.throwUnexpectedToken();
	                                }
	                                str += unescaped_1;
	                            }
	                            break;
	                        case 'x':
	                            var unescaped = this.scanHexEscape(ch);
	                            if (unescaped === null) {
	                                this.throwUnexpectedToken(messages_1.Messages.InvalidHexEscapeSequence);
	                            }
	                            str += unescaped;
	                            break;
	                        case 'n':
	                            str += '\n';
	                            break;
	                        case 'r':
	                            str += '\r';
	                            break;
	                        case 't':
	                            str += '\t';
	                            break;
	                        case 'b':
	                            str += '\b';
	                            break;
	                        case 'f':
	                            str += '\f';
	                            break;
	                        case 'v':
	                            str += '\x0B';
	                            break;
	                        case '8':
	                        case '9':
	                            str += ch;
	                            this.tolerateUnexpectedToken();
	                            break;
	                        default:
	                            if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
	                                var octToDec = this.octalToDecimal(ch);
	                                octal = octToDec.octal || octal;
	                                str += String.fromCharCode(octToDec.code);
	                            }
	                            else {
	                                str += ch;
	                            }
	                            break;
	                    }
	                }
	                else {
	                    ++this.lineNumber;
	                    if (ch === '\r' && this.source[this.index] === '\n') {
	                        ++this.index;
	                    }
	                    this.lineStart = this.index;
	                }
	            }
	            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                break;
	            }
	            else {
	                str += ch;
	            }
	        }
	        if (quote !== '') {
	            this.index = start;
	            this.throwUnexpectedToken();
	        }
	        return {
	            type: 8 /* StringLiteral */,
	            value: str,
	            octal: octal,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    // https://tc39.github.io/ecma262/#sec-template-literal-lexical-components
	    Scanner.prototype.scanTemplate = function () {
	        var cooked = '';
	        var terminated = false;
	        var start = this.index;
	        var head = (this.source[start] === '`');
	        var tail = false;
	        var rawOffset = 2;
	        ++this.index;
	        while (!this.eof()) {
	            var ch = this.source[this.index++];
	            if (ch === '`') {
	                rawOffset = 1;
	                tail = true;
	                terminated = true;
	                break;
	            }
	            else if (ch === '$') {
	                if (this.source[this.index] === '{') {
	                    this.curlyStack.push('${');
	                    ++this.index;
	                    terminated = true;
	                    break;
	                }
	                cooked += ch;
	            }
	            else if (ch === '\\') {
	                ch = this.source[this.index++];
	                if (!character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                    switch (ch) {
	                        case 'n':
	                            cooked += '\n';
	                            break;
	                        case 'r':
	                            cooked += '\r';
	                            break;
	                        case 't':
	                            cooked += '\t';
	                            break;
	                        case 'u':
	                            if (this.source[this.index] === '{') {
	                                ++this.index;
	                                cooked += this.scanUnicodeCodePointEscape();
	                            }
	                            else {
	                                var restore = this.index;
	                                var unescaped_2 = this.scanHexEscape(ch);
	                                if (unescaped_2 !== null) {
	                                    cooked += unescaped_2;
	                                }
	                                else {
	                                    this.index = restore;
	                                    cooked += ch;
	                                }
	                            }
	                            break;
	                        case 'x':
	                            var unescaped = this.scanHexEscape(ch);
	                            if (unescaped === null) {
	                                this.throwUnexpectedToken(messages_1.Messages.InvalidHexEscapeSequence);
	                            }
	                            cooked += unescaped;
	                            break;
	                        case 'b':
	                            cooked += '\b';
	                            break;
	                        case 'f':
	                            cooked += '\f';
	                            break;
	                        case 'v':
	                            cooked += '\v';
	                            break;
	                        default:
	                            if (ch === '0') {
	                                if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                                    // Illegal: \01 \02 and so on
	                                    this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
	                                }
	                                cooked += '\0';
	                            }
	                            else if (character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
	                                // Illegal: \1 \2
	                                this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
	                            }
	                            else {
	                                cooked += ch;
	                            }
	                            break;
	                    }
	                }
	                else {
	                    ++this.lineNumber;
	                    if (ch === '\r' && this.source[this.index] === '\n') {
	                        ++this.index;
	                    }
	                    this.lineStart = this.index;
	                }
	            }
	            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                ++this.lineNumber;
	                if (ch === '\r' && this.source[this.index] === '\n') {
	                    ++this.index;
	                }
	                this.lineStart = this.index;
	                cooked += '\n';
	            }
	            else {
	                cooked += ch;
	            }
	        }
	        if (!terminated) {
	            this.throwUnexpectedToken();
	        }
	        if (!head) {
	            this.curlyStack.pop();
	        }
	        return {
	            type: 10 /* Template */,
	            value: this.source.slice(start + 1, this.index - rawOffset),
	            cooked: cooked,
	            head: head,
	            tail: tail,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    // https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals
	    Scanner.prototype.testRegExp = function (pattern, flags) {
	        // The BMP character to use as a replacement for astral symbols when
	        // translating an ES6 "u"-flagged pattern to an ES5-compatible
	        // approximation.
	        // Note: replacing with '\uFFFF' enables false positives in unlikely
	        // scenarios. For example, `[\u{1044f}-\u{10440}]` is an invalid
	        // pattern that would not be detected by this substitution.
	        var astralSubstitute = '\uFFFF';
	        var tmp = pattern;
	        var self = this;
	        if (flags.indexOf('u') >= 0) {
	            tmp = tmp
	                .replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g, function ($0, $1, $2) {
	                var codePoint = parseInt($1 || $2, 16);
	                if (codePoint > 0x10FFFF) {
	                    self.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
	                }
	                if (codePoint <= 0xFFFF) {
	                    return String.fromCharCode(codePoint);
	                }
	                return astralSubstitute;
	            })
	                .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, astralSubstitute);
	        }
	        // First, detect invalid regular expressions.
	        try {
	            RegExp(tmp);
	        }
	        catch (e) {
	            this.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
	        }
	        // Return a regular expression object for this pattern-flag pair, or
	        // `null` in case the current environment doesn't support the flags it
	        // uses.
	        try {
	            return new RegExp(pattern, flags);
	        }
	        catch (exception) {
	            /* istanbul ignore next */
	            return null;
	        }
	    };
	    Scanner.prototype.scanRegExpBody = function () {
	        var ch = this.source[this.index];
	        assert_1.assert(ch === '/', 'Regular expression literal must start with a slash');
	        var str = this.source[this.index++];
	        var classMarker = false;
	        var terminated = false;
	        while (!this.eof()) {
	            ch = this.source[this.index++];
	            str += ch;
	            if (ch === '\\') {
	                ch = this.source[this.index++];
	                // https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals
	                if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                    this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
	                }
	                str += ch;
	            }
	            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
	            }
	            else if (classMarker) {
	                if (ch === ']') {
	                    classMarker = false;
	                }
	            }
	            else {
	                if (ch === '/') {
	                    terminated = true;
	                    break;
	                }
	                else if (ch === '[') {
	                    classMarker = true;
	                }
	            }
	        }
	        if (!terminated) {
	            this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
	        }
	        // Exclude leading and trailing slash.
	        return str.substr(1, str.length - 2);
	    };
	    Scanner.prototype.scanRegExpFlags = function () {
	        var str = '';
	        var flags = '';
	        while (!this.eof()) {
	            var ch = this.source[this.index];
	            if (!character_1.Character.isIdentifierPart(ch.charCodeAt(0))) {
	                break;
	            }
	            ++this.index;
	            if (ch === '\\' && !this.eof()) {
	                ch = this.source[this.index];
	                if (ch === 'u') {
	                    ++this.index;
	                    var restore = this.index;
	                    var char = this.scanHexEscape('u');
	                    if (char !== null) {
	                        flags += char;
	                        for (str += '\\u'; restore < this.index; ++restore) {
	                            str += this.source[restore];
	                        }
	                    }
	                    else {
	                        this.index = restore;
	                        flags += 'u';
	                        str += '\\u';
	                    }
	                    this.tolerateUnexpectedToken();
	                }
	                else {
	                    str += '\\';
	                    this.tolerateUnexpectedToken();
	                }
	            }
	            else {
	                flags += ch;
	                str += ch;
	            }
	        }
	        return flags;
	    };
	    Scanner.prototype.scanRegExp = function () {
	        var start = this.index;
	        var pattern = this.scanRegExpBody();
	        var flags = this.scanRegExpFlags();
	        var value = this.testRegExp(pattern, flags);
	        return {
	            type: 9 /* RegularExpression */,
	            value: '',
	            pattern: pattern,
	            flags: flags,
	            regex: value,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    Scanner.prototype.lex = function () {
	        if (this.eof()) {
	            return {
	                type: 2 /* EOF */,
	                value: '',
	                lineNumber: this.lineNumber,
	                lineStart: this.lineStart,
	                start: this.index,
	                end: this.index
	            };
	        }
	        var cp = this.source.charCodeAt(this.index);
	        if (character_1.Character.isIdentifierStart(cp)) {
	            return this.scanIdentifier();
	        }
	        // Very common: ( and ) and ;
	        if (cp === 0x28 || cp === 0x29 || cp === 0x3B) {
	            return this.scanPunctuator();
	        }
	        // String literal starts with single quote (U+0027) or double quote (U+0022).
	        if (cp === 0x27 || cp === 0x22) {
	            return this.scanStringLiteral();
	        }
	        // Dot (.) U+002E can also start a floating-point number, hence the need
	        // to check the next character.
	        if (cp === 0x2E) {
	            if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index + 1))) {
	                return this.scanNumericLiteral();
	            }
	            return this.scanPunctuator();
	        }
	        if (character_1.Character.isDecimalDigit(cp)) {
	            return this.scanNumericLiteral();
	        }
	        // Template literals start with ` (U+0060) for template head
	        // or } (U+007D) for template middle or template tail.
	        if (cp === 0x60 || (cp === 0x7D && this.curlyStack[this.curlyStack.length - 1] === '${')) {
	            return this.scanTemplate();
	        }
	        // Possible identifier start in a surrogate pair.
	        if (cp >= 0xD800 && cp < 0xDFFF) {
	            if (character_1.Character.isIdentifierStart(this.codePointAt(this.index))) {
	                return this.scanIdentifier();
	            }
	        }
	        return this.scanPunctuator();
	    };
	    return Scanner;
	}());
	exports.Scanner = Scanner;


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TokenName = {};
	exports.TokenName[1 /* BooleanLiteral */] = 'Boolean';
	exports.TokenName[2 /* EOF */] = '<end>';
	exports.TokenName[3 /* Identifier */] = 'Identifier';
	exports.TokenName[4 /* Keyword */] = 'Keyword';
	exports.TokenName[5 /* NullLiteral */] = 'Null';
	exports.TokenName[6 /* NumericLiteral */] = 'Numeric';
	exports.TokenName[7 /* Punctuator */] = 'Punctuator';
	exports.TokenName[8 /* StringLiteral */] = 'String';
	exports.TokenName[9 /* RegularExpression */] = 'RegularExpression';
	exports.TokenName[10 /* Template */] = 'Template';


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	// Generated by generate-xhtml-entities.js. DO NOT MODIFY!
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.XHTMLEntities = {
	    quot: '\u0022',
	    amp: '\u0026',
	    apos: '\u0027',
	    gt: '\u003E',
	    nbsp: '\u00A0',
	    iexcl: '\u00A1',
	    cent: '\u00A2',
	    pound: '\u00A3',
	    curren: '\u00A4',
	    yen: '\u00A5',
	    brvbar: '\u00A6',
	    sect: '\u00A7',
	    uml: '\u00A8',
	    copy: '\u00A9',
	    ordf: '\u00AA',
	    laquo: '\u00AB',
	    not: '\u00AC',
	    shy: '\u00AD',
	    reg: '\u00AE',
	    macr: '\u00AF',
	    deg: '\u00B0',
	    plusmn: '\u00B1',
	    sup2: '\u00B2',
	    sup3: '\u00B3',
	    acute: '\u00B4',
	    micro: '\u00B5',
	    para: '\u00B6',
	    middot: '\u00B7',
	    cedil: '\u00B8',
	    sup1: '\u00B9',
	    ordm: '\u00BA',
	    raquo: '\u00BB',
	    frac14: '\u00BC',
	    frac12: '\u00BD',
	    frac34: '\u00BE',
	    iquest: '\u00BF',
	    Agrave: '\u00C0',
	    Aacute: '\u00C1',
	    Acirc: '\u00C2',
	    Atilde: '\u00C3',
	    Auml: '\u00C4',
	    Aring: '\u00C5',
	    AElig: '\u00C6',
	    Ccedil: '\u00C7',
	    Egrave: '\u00C8',
	    Eacute: '\u00C9',
	    Ecirc: '\u00CA',
	    Euml: '\u00CB',
	    Igrave: '\u00CC',
	    Iacute: '\u00CD',
	    Icirc: '\u00CE',
	    Iuml: '\u00CF',
	    ETH: '\u00D0',
	    Ntilde: '\u00D1',
	    Ograve: '\u00D2',
	    Oacute: '\u00D3',
	    Ocirc: '\u00D4',
	    Otilde: '\u00D5',
	    Ouml: '\u00D6',
	    times: '\u00D7',
	    Oslash: '\u00D8',
	    Ugrave: '\u00D9',
	    Uacute: '\u00DA',
	    Ucirc: '\u00DB',
	    Uuml: '\u00DC',
	    Yacute: '\u00DD',
	    THORN: '\u00DE',
	    szlig: '\u00DF',
	    agrave: '\u00E0',
	    aacute: '\u00E1',
	    acirc: '\u00E2',
	    atilde: '\u00E3',
	    auml: '\u00E4',
	    aring: '\u00E5',
	    aelig: '\u00E6',
	    ccedil: '\u00E7',
	    egrave: '\u00E8',
	    eacute: '\u00E9',
	    ecirc: '\u00EA',
	    euml: '\u00EB',
	    igrave: '\u00EC',
	    iacute: '\u00ED',
	    icirc: '\u00EE',
	    iuml: '\u00EF',
	    eth: '\u00F0',
	    ntilde: '\u00F1',
	    ograve: '\u00F2',
	    oacute: '\u00F3',
	    ocirc: '\u00F4',
	    otilde: '\u00F5',
	    ouml: '\u00F6',
	    divide: '\u00F7',
	    oslash: '\u00F8',
	    ugrave: '\u00F9',
	    uacute: '\u00FA',
	    ucirc: '\u00FB',
	    uuml: '\u00FC',
	    yacute: '\u00FD',
	    thorn: '\u00FE',
	    yuml: '\u00FF',
	    OElig: '\u0152',
	    oelig: '\u0153',
	    Scaron: '\u0160',
	    scaron: '\u0161',
	    Yuml: '\u0178',
	    fnof: '\u0192',
	    circ: '\u02C6',
	    tilde: '\u02DC',
	    Alpha: '\u0391',
	    Beta: '\u0392',
	    Gamma: '\u0393',
	    Delta: '\u0394',
	    Epsilon: '\u0395',
	    Zeta: '\u0396',
	    Eta: '\u0397',
	    Theta: '\u0398',
	    Iota: '\u0399',
	    Kappa: '\u039A',
	    Lambda: '\u039B',
	    Mu: '\u039C',
	    Nu: '\u039D',
	    Xi: '\u039E',
	    Omicron: '\u039F',
	    Pi: '\u03A0',
	    Rho: '\u03A1',
	    Sigma: '\u03A3',
	    Tau: '\u03A4',
	    Upsilon: '\u03A5',
	    Phi: '\u03A6',
	    Chi: '\u03A7',
	    Psi: '\u03A8',
	    Omega: '\u03A9',
	    alpha: '\u03B1',
	    beta: '\u03B2',
	    gamma: '\u03B3',
	    delta: '\u03B4',
	    epsilon: '\u03B5',
	    zeta: '\u03B6',
	    eta: '\u03B7',
	    theta: '\u03B8',
	    iota: '\u03B9',
	    kappa: '\u03BA',
	    lambda: '\u03BB',
	    mu: '\u03BC',
	    nu: '\u03BD',
	    xi: '\u03BE',
	    omicron: '\u03BF',
	    pi: '\u03C0',
	    rho: '\u03C1',
	    sigmaf: '\u03C2',
	    sigma: '\u03C3',
	    tau: '\u03C4',
	    upsilon: '\u03C5',
	    phi: '\u03C6',
	    chi: '\u03C7',
	    psi: '\u03C8',
	    omega: '\u03C9',
	    thetasym: '\u03D1',
	    upsih: '\u03D2',
	    piv: '\u03D6',
	    ensp: '\u2002',
	    emsp: '\u2003',
	    thinsp: '\u2009',
	    zwnj: '\u200C',
	    zwj: '\u200D',
	    lrm: '\u200E',
	    rlm: '\u200F',
	    ndash: '\u2013',
	    mdash: '\u2014',
	    lsquo: '\u2018',
	    rsquo: '\u2019',
	    sbquo: '\u201A',
	    ldquo: '\u201C',
	    rdquo: '\u201D',
	    bdquo: '\u201E',
	    dagger: '\u2020',
	    Dagger: '\u2021',
	    bull: '\u2022',
	    hellip: '\u2026',
	    permil: '\u2030',
	    prime: '\u2032',
	    Prime: '\u2033',
	    lsaquo: '\u2039',
	    rsaquo: '\u203A',
	    oline: '\u203E',
	    frasl: '\u2044',
	    euro: '\u20AC',
	    image: '\u2111',
	    weierp: '\u2118',
	    real: '\u211C',
	    trade: '\u2122',
	    alefsym: '\u2135',
	    larr: '\u2190',
	    uarr: '\u2191',
	    rarr: '\u2192',
	    darr: '\u2193',
	    harr: '\u2194',
	    crarr: '\u21B5',
	    lArr: '\u21D0',
	    uArr: '\u21D1',
	    rArr: '\u21D2',
	    dArr: '\u21D3',
	    hArr: '\u21D4',
	    forall: '\u2200',
	    part: '\u2202',
	    exist: '\u2203',
	    empty: '\u2205',
	    nabla: '\u2207',
	    isin: '\u2208',
	    notin: '\u2209',
	    ni: '\u220B',
	    prod: '\u220F',
	    sum: '\u2211',
	    minus: '\u2212',
	    lowast: '\u2217',
	    radic: '\u221A',
	    prop: '\u221D',
	    infin: '\u221E',
	    ang: '\u2220',
	    and: '\u2227',
	    or: '\u2228',
	    cap: '\u2229',
	    cup: '\u222A',
	    int: '\u222B',
	    there4: '\u2234',
	    sim: '\u223C',
	    cong: '\u2245',
	    asymp: '\u2248',
	    ne: '\u2260',
	    equiv: '\u2261',
	    le: '\u2264',
	    ge: '\u2265',
	    sub: '\u2282',
	    sup: '\u2283',
	    nsub: '\u2284',
	    sube: '\u2286',
	    supe: '\u2287',
	    oplus: '\u2295',
	    otimes: '\u2297',
	    perp: '\u22A5',
	    sdot: '\u22C5',
	    lceil: '\u2308',
	    rceil: '\u2309',
	    lfloor: '\u230A',
	    rfloor: '\u230B',
	    loz: '\u25CA',
	    spades: '\u2660',
	    clubs: '\u2663',
	    hearts: '\u2665',
	    diams: '\u2666',
	    lang: '\u27E8',
	    rang: '\u27E9'
	};


/***/ },
/* 15 */
/***/ function(module, exports, __nested_webpack_require_277122__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var error_handler_1 = __nested_webpack_require_277122__(10);
	var scanner_1 = __nested_webpack_require_277122__(12);
	var token_1 = __nested_webpack_require_277122__(13);
	var Reader = (function () {
	    function Reader() {
	        this.values = [];
	        this.curly = this.paren = -1;
	    }
	    // A function following one of those tokens is an expression.
	    Reader.prototype.beforeFunctionExpression = function (t) {
	        return ['(', '{', '[', 'in', 'typeof', 'instanceof', 'new',
	            'return', 'case', 'delete', 'throw', 'void',
	            // assignment operators
	            '=', '+=', '-=', '*=', '**=', '/=', '%=', '<<=', '>>=', '>>>=',
	            '&=', '|=', '^=', ',',
	            // binary/unary operators
	            '+', '-', '*', '**', '/', '%', '++', '--', '<<', '>>', '>>>', '&',
	            '|', '^', '!', '~', '&&', '||', '?', ':', '===', '==', '>=',
	            '<=', '<', '>', '!=', '!=='].indexOf(t) >= 0;
	    };
	    // Determine if forward slash (/) is an operator or part of a regular expression
	    // https://github.com/mozilla/sweet.js/wiki/design
	    Reader.prototype.isRegexStart = function () {
	        var previous = this.values[this.values.length - 1];
	        var regex = (previous !== null);
	        switch (previous) {
	            case 'this':
	            case ']':
	                regex = false;
	                break;
	            case ')':
	                var keyword = this.values[this.paren - 1];
	                regex = (keyword === 'if' || keyword === 'while' || keyword === 'for' || keyword === 'with');
	                break;
	            case '}':
	                // Dividing a function by anything makes little sense,
	                // but we have to check for that.
	                regex = false;
	                if (this.values[this.curly - 3] === 'function') {
	                    // Anonymous function, e.g. function(){} /42
	                    var check = this.values[this.curly - 4];
	                    regex = check ? !this.beforeFunctionExpression(check) : false;
	                }
	                else if (this.values[this.curly - 4] === 'function') {
	                    // Named function, e.g. function f(){} /42/
	                    var check = this.values[this.curly - 5];
	                    regex = check ? !this.beforeFunctionExpression(check) : true;
	                }
	                break;
	            default:
	                break;
	        }
	        return regex;
	    };
	    Reader.prototype.push = function (token) {
	        if (token.type === 7 /* Punctuator */ || token.type === 4 /* Keyword */) {
	            if (token.value === '{') {
	                this.curly = this.values.length;
	            }
	            else if (token.value === '(') {
	                this.paren = this.values.length;
	            }
	            this.values.push(token.value);
	        }
	        else {
	            this.values.push(null);
	        }
	    };
	    return Reader;
	}());
	var Tokenizer = (function () {
	    function Tokenizer(code, config) {
	        this.errorHandler = new error_handler_1.ErrorHandler();
	        this.errorHandler.tolerant = config ? (typeof config.tolerant === 'boolean' && config.tolerant) : false;
	        this.scanner = new scanner_1.Scanner(code, this.errorHandler);
	        this.scanner.trackComment = config ? (typeof config.comment === 'boolean' && config.comment) : false;
	        this.trackRange = config ? (typeof config.range === 'boolean' && config.range) : false;
	        this.trackLoc = config ? (typeof config.loc === 'boolean' && config.loc) : false;
	        this.buffer = [];
	        this.reader = new Reader();
	    }
	    Tokenizer.prototype.errors = function () {
	        return this.errorHandler.errors;
	    };
	    Tokenizer.prototype.getNextToken = function () {
	        if (this.buffer.length === 0) {
	            var comments = this.scanner.scanComments();
	            if (this.scanner.trackComment) {
	                for (var i = 0; i < comments.length; ++i) {
	                    var e = comments[i];
	                    var value = this.scanner.source.slice(e.slice[0], e.slice[1]);
	                    var comment = {
	                        type: e.multiLine ? 'BlockComment' : 'LineComment',
	                        value: value
	                    };
	                    if (this.trackRange) {
	                        comment.range = e.range;
	                    }
	                    if (this.trackLoc) {
	                        comment.loc = e.loc;
	                    }
	                    this.buffer.push(comment);
	                }
	            }
	            if (!this.scanner.eof()) {
	                var loc = void 0;
	                if (this.trackLoc) {
	                    loc = {
	                        start: {
	                            line: this.scanner.lineNumber,
	                            column: this.scanner.index - this.scanner.lineStart
	                        },
	                        end: {}
	                    };
	                }
	                var startRegex = (this.scanner.source[this.scanner.index] === '/') && this.reader.isRegexStart();
	                var token = startRegex ? this.scanner.scanRegExp() : this.scanner.lex();
	                this.reader.push(token);
	                var entry = {
	                    type: token_1.TokenName[token.type],
	                    value: this.scanner.source.slice(token.start, token.end)
	                };
	                if (this.trackRange) {
	                    entry.range = [token.start, token.end];
	                }
	                if (this.trackLoc) {
	                    loc.end = {
	                        line: this.scanner.lineNumber,
	                        column: this.scanner.index - this.scanner.lineStart
	                    };
	                    entry.loc = loc;
	                }
	                if (token.type === 9 /* RegularExpression */) {
	                    var pattern = token.pattern;
	                    var flags = token.flags;
	                    entry.regex = { pattern: pattern, flags: flags };
	                }
	                this.buffer.push(entry);
	            }
	        }
	        return this.buffer.shift();
	    };
	    return Tokenizer;
	}());
	exports.Tokenizer = Tokenizer;


/***/ }
/******/ ])
});
;

/***/ }),

/***/ 98319:
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ 97420:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";



var yaml = __webpack_require__(61169);


module.exports = yaml;


/***/ }),

/***/ 61169:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";



var loader = __webpack_require__(36279);
var dumper = __webpack_require__(99897);


function deprecated(name) {
  return function () {
    throw new Error('Function ' + name + ' is deprecated and cannot be used.');
  };
}


module.exports.Type = __webpack_require__(26136);
module.exports.Schema = __webpack_require__(92915);
module.exports.FAILSAFE_SCHEMA = __webpack_require__(29899);
module.exports.JSON_SCHEMA = __webpack_require__(33460);
module.exports.CORE_SCHEMA = __webpack_require__(76421);
module.exports.DEFAULT_SAFE_SCHEMA = __webpack_require__(41893);
module.exports.DEFAULT_FULL_SCHEMA = __webpack_require__(41413);
module.exports.load                = loader.load;
module.exports.loadAll             = loader.loadAll;
module.exports.safeLoad            = loader.safeLoad;
module.exports.safeLoadAll         = loader.safeLoadAll;
module.exports.dump                = dumper.dump;
module.exports.safeDump            = dumper.safeDump;
module.exports.YAMLException = __webpack_require__(9643);

// Deprecated schema names from JS-YAML 2.0.x
module.exports.MINIMAL_SCHEMA = __webpack_require__(29899);
module.exports.SAFE_SCHEMA = __webpack_require__(41893);
module.exports.DEFAULT_SCHEMA = __webpack_require__(41413);

// Deprecated functions from JS-YAML 1.x.x
module.exports.scan           = deprecated('scan');
module.exports.parse          = deprecated('parse');
module.exports.compose        = deprecated('compose');
module.exports.addConstructor = deprecated('addConstructor');


/***/ }),

/***/ 19333:
/***/ ((module) => {

"use strict";



function isNothing(subject) {
  return (typeof subject === 'undefined') || (subject === null);
}


function isObject(subject) {
  return (typeof subject === 'object') && (subject !== null);
}


function toArray(sequence) {
  if (Array.isArray(sequence)) return sequence;
  else if (isNothing(sequence)) return [];

  return [ sequence ];
}


function extend(target, source) {
  var index, length, key, sourceKeys;

  if (source) {
    sourceKeys = Object.keys(source);

    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
      key = sourceKeys[index];
      target[key] = source[key];
    }
  }

  return target;
}


function repeat(string, count) {
  var result = '', cycle;

  for (cycle = 0; cycle < count; cycle += 1) {
    result += string;
  }

  return result;
}


function isNegativeZero(number) {
  return (number === 0) && (Number.NEGATIVE_INFINITY === 1 / number);
}


module.exports.isNothing      = isNothing;
module.exports.isObject       = isObject;
module.exports.toArray        = toArray;
module.exports.repeat         = repeat;
module.exports.isNegativeZero = isNegativeZero;
module.exports.extend         = extend;


/***/ }),

/***/ 99897:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/*eslint-disable no-use-before-define*/

var common              = __webpack_require__(19333);
var YAMLException       = __webpack_require__(9643);
var DEFAULT_FULL_SCHEMA = __webpack_require__(41413);
var DEFAULT_SAFE_SCHEMA = __webpack_require__(41893);

var _toString       = Object.prototype.toString;
var _hasOwnProperty = Object.prototype.hasOwnProperty;

var CHAR_TAB                  = 0x09; /* Tab */
var CHAR_LINE_FEED            = 0x0A; /* LF */
var CHAR_CARRIAGE_RETURN      = 0x0D; /* CR */
var CHAR_SPACE                = 0x20; /* Space */
var CHAR_EXCLAMATION          = 0x21; /* ! */
var CHAR_DOUBLE_QUOTE         = 0x22; /* " */
var CHAR_SHARP                = 0x23; /* # */
var CHAR_PERCENT              = 0x25; /* % */
var CHAR_AMPERSAND            = 0x26; /* & */
var CHAR_SINGLE_QUOTE         = 0x27; /* ' */
var CHAR_ASTERISK             = 0x2A; /* * */
var CHAR_COMMA                = 0x2C; /* , */
var CHAR_MINUS                = 0x2D; /* - */
var CHAR_COLON                = 0x3A; /* : */
var CHAR_EQUALS               = 0x3D; /* = */
var CHAR_GREATER_THAN         = 0x3E; /* > */
var CHAR_QUESTION             = 0x3F; /* ? */
var CHAR_COMMERCIAL_AT        = 0x40; /* @ */
var CHAR_LEFT_SQUARE_BRACKET  = 0x5B; /* [ */
var CHAR_RIGHT_SQUARE_BRACKET = 0x5D; /* ] */
var CHAR_GRAVE_ACCENT         = 0x60; /* ` */
var CHAR_LEFT_CURLY_BRACKET   = 0x7B; /* { */
var CHAR_VERTICAL_LINE        = 0x7C; /* | */
var CHAR_RIGHT_CURLY_BRACKET  = 0x7D; /* } */

var ESCAPE_SEQUENCES = {};

ESCAPE_SEQUENCES[0x00]   = '\\0';
ESCAPE_SEQUENCES[0x07]   = '\\a';
ESCAPE_SEQUENCES[0x08]   = '\\b';
ESCAPE_SEQUENCES[0x09]   = '\\t';
ESCAPE_SEQUENCES[0x0A]   = '\\n';
ESCAPE_SEQUENCES[0x0B]   = '\\v';
ESCAPE_SEQUENCES[0x0C]   = '\\f';
ESCAPE_SEQUENCES[0x0D]   = '\\r';
ESCAPE_SEQUENCES[0x1B]   = '\\e';
ESCAPE_SEQUENCES[0x22]   = '\\"';
ESCAPE_SEQUENCES[0x5C]   = '\\\\';
ESCAPE_SEQUENCES[0x85]   = '\\N';
ESCAPE_SEQUENCES[0xA0]   = '\\_';
ESCAPE_SEQUENCES[0x2028] = '\\L';
ESCAPE_SEQUENCES[0x2029] = '\\P';

var DEPRECATED_BOOLEANS_SYNTAX = [
  'y', 'Y', 'yes', 'Yes', 'YES', 'on', 'On', 'ON',
  'n', 'N', 'no', 'No', 'NO', 'off', 'Off', 'OFF'
];

function compileStyleMap(schema, map) {
  var result, keys, index, length, tag, style, type;

  if (map === null) return {};

  result = {};
  keys = Object.keys(map);

  for (index = 0, length = keys.length; index < length; index += 1) {
    tag = keys[index];
    style = String(map[tag]);

    if (tag.slice(0, 2) === '!!') {
      tag = 'tag:yaml.org,2002:' + tag.slice(2);
    }
    type = schema.compiledTypeMap['fallback'][tag];

    if (type && _hasOwnProperty.call(type.styleAliases, style)) {
      style = type.styleAliases[style];
    }

    result[tag] = style;
  }

  return result;
}

function encodeHex(character) {
  var string, handle, length;

  string = character.toString(16).toUpperCase();

  if (character <= 0xFF) {
    handle = 'x';
    length = 2;
  } else if (character <= 0xFFFF) {
    handle = 'u';
    length = 4;
  } else if (character <= 0xFFFFFFFF) {
    handle = 'U';
    length = 8;
  } else {
    throw new YAMLException('code point within a string may not be greater than 0xFFFFFFFF');
  }

  return '\\' + handle + common.repeat('0', length - string.length) + string;
}

function State(options) {
  this.schema        = options['schema'] || DEFAULT_FULL_SCHEMA;
  this.indent        = Math.max(1, (options['indent'] || 2));
  this.noArrayIndent = options['noArrayIndent'] || false;
  this.skipInvalid   = options['skipInvalid'] || false;
  this.flowLevel     = (common.isNothing(options['flowLevel']) ? -1 : options['flowLevel']);
  this.styleMap      = compileStyleMap(this.schema, options['styles'] || null);
  this.sortKeys      = options['sortKeys'] || false;
  this.lineWidth     = options['lineWidth'] || 80;
  this.noRefs        = options['noRefs'] || false;
  this.noCompatMode  = options['noCompatMode'] || false;
  this.condenseFlow  = options['condenseFlow'] || false;

  this.implicitTypes = this.schema.compiledImplicit;
  this.explicitTypes = this.schema.compiledExplicit;

  this.tag = null;
  this.result = '';

  this.duplicates = [];
  this.usedDuplicates = null;
}

// Indents every line in a string. Empty lines (\n only) are not indented.
function indentString(string, spaces) {
  var ind = common.repeat(' ', spaces),
      position = 0,
      next = -1,
      result = '',
      line,
      length = string.length;

  while (position < length) {
    next = string.indexOf('\n', position);
    if (next === -1) {
      line = string.slice(position);
      position = length;
    } else {
      line = string.slice(position, next + 1);
      position = next + 1;
    }

    if (line.length && line !== '\n') result += ind;

    result += line;
  }

  return result;
}

function generateNextLine(state, level) {
  return '\n' + common.repeat(' ', state.indent * level);
}

function testImplicitResolving(state, str) {
  var index, length, type;

  for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
    type = state.implicitTypes[index];

    if (type.resolve(str)) {
      return true;
    }
  }

  return false;
}

// [33] s-white ::= s-space | s-tab
function isWhitespace(c) {
  return c === CHAR_SPACE || c === CHAR_TAB;
}

// Returns true if the character can be printed without escaping.
// From YAML 1.2: "any allowed characters known to be non-printable
// should also be escaped. [However,] This isn’t mandatory"
// Derived from nb-char - \t - #x85 - #xA0 - #x2028 - #x2029.
function isPrintable(c) {
  return  (0x00020 <= c && c <= 0x00007E)
      || ((0x000A1 <= c && c <= 0x00D7FF) && c !== 0x2028 && c !== 0x2029)
      || ((0x0E000 <= c && c <= 0x00FFFD) && c !== 0xFEFF /* BOM */)
      ||  (0x10000 <= c && c <= 0x10FFFF);
}

// [34] ns-char ::= nb-char - s-white
// [27] nb-char ::= c-printable - b-char - c-byte-order-mark
// [26] b-char  ::= b-line-feed | b-carriage-return
// [24] b-line-feed       ::=     #xA    /* LF */
// [25] b-carriage-return ::=     #xD    /* CR */
// [3]  c-byte-order-mark ::=     #xFEFF
function isNsChar(c) {
  return isPrintable(c) && !isWhitespace(c)
    // byte-order-mark
    && c !== 0xFEFF
    // b-char
    && c !== CHAR_CARRIAGE_RETURN
    && c !== CHAR_LINE_FEED;
}

// Simplified test for values allowed after the first character in plain style.
function isPlainSafe(c, prev) {
  // Uses a subset of nb-char - c-flow-indicator - ":" - "#"
  // where nb-char ::= c-printable - b-char - c-byte-order-mark.
  return isPrintable(c) && c !== 0xFEFF
    // - c-flow-indicator
    && c !== CHAR_COMMA
    && c !== CHAR_LEFT_SQUARE_BRACKET
    && c !== CHAR_RIGHT_SQUARE_BRACKET
    && c !== CHAR_LEFT_CURLY_BRACKET
    && c !== CHAR_RIGHT_CURLY_BRACKET
    // - ":" - "#"
    // /* An ns-char preceding */ "#"
    && c !== CHAR_COLON
    && ((c !== CHAR_SHARP) || (prev && isNsChar(prev)));
}

// Simplified test for values allowed as the first character in plain style.
function isPlainSafeFirst(c) {
  // Uses a subset of ns-char - c-indicator
  // where ns-char = nb-char - s-white.
  return isPrintable(c) && c !== 0xFEFF
    && !isWhitespace(c) // - s-white
    // - (c-indicator ::=
    // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
    && c !== CHAR_MINUS
    && c !== CHAR_QUESTION
    && c !== CHAR_COLON
    && c !== CHAR_COMMA
    && c !== CHAR_LEFT_SQUARE_BRACKET
    && c !== CHAR_RIGHT_SQUARE_BRACKET
    && c !== CHAR_LEFT_CURLY_BRACKET
    && c !== CHAR_RIGHT_CURLY_BRACKET
    // | “#” | “&” | “*” | “!” | “|” | “=” | “>” | “'” | “"”
    && c !== CHAR_SHARP
    && c !== CHAR_AMPERSAND
    && c !== CHAR_ASTERISK
    && c !== CHAR_EXCLAMATION
    && c !== CHAR_VERTICAL_LINE
    && c !== CHAR_EQUALS
    && c !== CHAR_GREATER_THAN
    && c !== CHAR_SINGLE_QUOTE
    && c !== CHAR_DOUBLE_QUOTE
    // | “%” | “@” | “`”)
    && c !== CHAR_PERCENT
    && c !== CHAR_COMMERCIAL_AT
    && c !== CHAR_GRAVE_ACCENT;
}

// Determines whether block indentation indicator is required.
function needIndentIndicator(string) {
  var leadingSpaceRe = /^\n* /;
  return leadingSpaceRe.test(string);
}

var STYLE_PLAIN   = 1,
    STYLE_SINGLE  = 2,
    STYLE_LITERAL = 3,
    STYLE_FOLDED  = 4,
    STYLE_DOUBLE  = 5;

// Determines which scalar styles are possible and returns the preferred style.
// lineWidth = -1 => no limit.
// Pre-conditions: str.length > 0.
// Post-conditions:
//    STYLE_PLAIN or STYLE_SINGLE => no \n are in the string.
//    STYLE_LITERAL => no lines are suitable for folding (or lineWidth is -1).
//    STYLE_FOLDED => a line > lineWidth and can be folded (and lineWidth != -1).
function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
  var i;
  var char, prev_char;
  var hasLineBreak = false;
  var hasFoldableLine = false; // only checked if shouldTrackWidth
  var shouldTrackWidth = lineWidth !== -1;
  var previousLineBreak = -1; // count the first line correctly
  var plain = isPlainSafeFirst(string.charCodeAt(0))
          && !isWhitespace(string.charCodeAt(string.length - 1));

  if (singleLineOnly) {
    // Case: no block styles.
    // Check for disallowed characters to rule out plain and single.
    for (i = 0; i < string.length; i++) {
      char = string.charCodeAt(i);
      if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
      plain = plain && isPlainSafe(char, prev_char);
    }
  } else {
    // Case: block styles permitted.
    for (i = 0; i < string.length; i++) {
      char = string.charCodeAt(i);
      if (char === CHAR_LINE_FEED) {
        hasLineBreak = true;
        // Check if any line can be folded.
        if (shouldTrackWidth) {
          hasFoldableLine = hasFoldableLine ||
            // Foldable line = too long, and not more-indented.
            (i - previousLineBreak - 1 > lineWidth &&
             string[previousLineBreak + 1] !== ' ');
          previousLineBreak = i;
        }
      } else if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
      plain = plain && isPlainSafe(char, prev_char);
    }
    // in case the end is missing a \n
    hasFoldableLine = hasFoldableLine || (shouldTrackWidth &&
      (i - previousLineBreak - 1 > lineWidth &&
       string[previousLineBreak + 1] !== ' '));
  }
  // Although every style can represent \n without escaping, prefer block styles
  // for multiline, since they're more readable and they don't add empty lines.
  // Also prefer folding a super-long line.
  if (!hasLineBreak && !hasFoldableLine) {
    // Strings interpretable as another type have to be quoted;
    // e.g. the string 'true' vs. the boolean true.
    return plain && !testAmbiguousType(string)
      ? STYLE_PLAIN : STYLE_SINGLE;
  }
  // Edge case: block indentation indicator can only have one digit.
  if (indentPerLevel > 9 && needIndentIndicator(string)) {
    return STYLE_DOUBLE;
  }
  // At this point we know block styles are valid.
  // Prefer literal style unless we want to fold.
  return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
}

// Note: line breaking/folding is implemented for only the folded style.
// NB. We drop the last trailing newline (if any) of a returned block scalar
//  since the dumper adds its own newline. This always works:
//    • No ending newline => unaffected; already using strip "-" chomping.
//    • Ending newline    => removed then restored.
//  Importantly, this keeps the "+" chomp indicator from gaining an extra line.
function writeScalar(state, string, level, iskey) {
  state.dump = (function () {
    if (string.length === 0) {
      return "''";
    }
    if (!state.noCompatMode &&
        DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1) {
      return "'" + string + "'";
    }

    var indent = state.indent * Math.max(1, level); // no 0-indent scalars
    // As indentation gets deeper, let the width decrease monotonically
    // to the lower bound min(state.lineWidth, 40).
    // Note that this implies
    //  state.lineWidth ≤ 40 + state.indent: width is fixed at the lower bound.
    //  state.lineWidth > 40 + state.indent: width decreases until the lower bound.
    // This behaves better than a constant minimum width which disallows narrower options,
    // or an indent threshold which causes the width to suddenly increase.
    var lineWidth = state.lineWidth === -1
      ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);

    // Without knowing if keys are implicit/explicit, assume implicit for safety.
    var singleLineOnly = iskey
      // No block styles in flow mode.
      || (state.flowLevel > -1 && level >= state.flowLevel);
    function testAmbiguity(string) {
      return testImplicitResolving(state, string);
    }

    switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)) {
      case STYLE_PLAIN:
        return string;
      case STYLE_SINGLE:
        return "'" + string.replace(/'/g, "''") + "'";
      case STYLE_LITERAL:
        return '|' + blockHeader(string, state.indent)
          + dropEndingNewline(indentString(string, indent));
      case STYLE_FOLDED:
        return '>' + blockHeader(string, state.indent)
          + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
      case STYLE_DOUBLE:
        return '"' + escapeString(string, lineWidth) + '"';
      default:
        throw new YAMLException('impossible error: invalid scalar style');
    }
  }());
}

// Pre-conditions: string is valid for a block scalar, 1 <= indentPerLevel <= 9.
function blockHeader(string, indentPerLevel) {
  var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : '';

  // note the special case: the string '\n' counts as a "trailing" empty line.
  var clip =          string[string.length - 1] === '\n';
  var keep = clip && (string[string.length - 2] === '\n' || string === '\n');
  var chomp = keep ? '+' : (clip ? '' : '-');

  return indentIndicator + chomp + '\n';
}

// (See the note for writeScalar.)
function dropEndingNewline(string) {
  return string[string.length - 1] === '\n' ? string.slice(0, -1) : string;
}

// Note: a long line without a suitable break point will exceed the width limit.
// Pre-conditions: every char in str isPrintable, str.length > 0, width > 0.
function foldString(string, width) {
  // In folded style, $k$ consecutive newlines output as $k+1$ newlines—
  // unless they're before or after a more-indented line, or at the very
  // beginning or end, in which case $k$ maps to $k$.
  // Therefore, parse each chunk as newline(s) followed by a content line.
  var lineRe = /(\n+)([^\n]*)/g;

  // first line (possibly an empty line)
  var result = (function () {
    var nextLF = string.indexOf('\n');
    nextLF = nextLF !== -1 ? nextLF : string.length;
    lineRe.lastIndex = nextLF;
    return foldLine(string.slice(0, nextLF), width);
  }());
  // If we haven't reached the first content line yet, don't add an extra \n.
  var prevMoreIndented = string[0] === '\n' || string[0] === ' ';
  var moreIndented;

  // rest of the lines
  var match;
  while ((match = lineRe.exec(string))) {
    var prefix = match[1], line = match[2];
    moreIndented = (line[0] === ' ');
    result += prefix
      + (!prevMoreIndented && !moreIndented && line !== ''
        ? '\n' : '')
      + foldLine(line, width);
    prevMoreIndented = moreIndented;
  }

  return result;
}

// Greedy line breaking.
// Picks the longest line under the limit each time,
// otherwise settles for the shortest line over the limit.
// NB. More-indented lines *cannot* be folded, as that would add an extra \n.
function foldLine(line, width) {
  if (line === '' || line[0] === ' ') return line;

  // Since a more-indented line adds a \n, breaks can't be followed by a space.
  var breakRe = / [^ ]/g; // note: the match index will always be <= length-2.
  var match;
  // start is an inclusive index. end, curr, and next are exclusive.
  var start = 0, end, curr = 0, next = 0;
  var result = '';

  // Invariants: 0 <= start <= length-1.
  //   0 <= curr <= next <= max(0, length-2). curr - start <= width.
  // Inside the loop:
  //   A match implies length >= 2, so curr and next are <= length-2.
  while ((match = breakRe.exec(line))) {
    next = match.index;
    // maintain invariant: curr - start <= width
    if (next - start > width) {
      end = (curr > start) ? curr : next; // derive end <= length-2
      result += '\n' + line.slice(start, end);
      // skip the space that was output as \n
      start = end + 1;                    // derive start <= length-1
    }
    curr = next;
  }

  // By the invariants, start <= length-1, so there is something left over.
  // It is either the whole string or a part starting from non-whitespace.
  result += '\n';
  // Insert a break if the remainder is too long and there is a break available.
  if (line.length - start > width && curr > start) {
    result += line.slice(start, curr) + '\n' + line.slice(curr + 1);
  } else {
    result += line.slice(start);
  }

  return result.slice(1); // drop extra \n joiner
}

// Escapes a double-quoted string.
function escapeString(string) {
  var result = '';
  var char, nextChar;
  var escapeSeq;

  for (var i = 0; i < string.length; i++) {
    char = string.charCodeAt(i);
    // Check for surrogate pairs (reference Unicode 3.0 section "3.7 Surrogates").
    if (char >= 0xD800 && char <= 0xDBFF/* high surrogate */) {
      nextChar = string.charCodeAt(i + 1);
      if (nextChar >= 0xDC00 && nextChar <= 0xDFFF/* low surrogate */) {
        // Combine the surrogate pair and store it escaped.
        result += encodeHex((char - 0xD800) * 0x400 + nextChar - 0xDC00 + 0x10000);
        // Advance index one extra since we already used that char here.
        i++; continue;
      }
    }
    escapeSeq = ESCAPE_SEQUENCES[char];
    result += !escapeSeq && isPrintable(char)
      ? string[i]
      : escapeSeq || encodeHex(char);
  }

  return result;
}

function writeFlowSequence(state, level, object) {
  var _result = '',
      _tag    = state.tag,
      index,
      length;

  for (index = 0, length = object.length; index < length; index += 1) {
    // Write only valid elements.
    if (writeNode(state, level, object[index], false, false)) {
      if (index !== 0) _result += ',' + (!state.condenseFlow ? ' ' : '');
      _result += state.dump;
    }
  }

  state.tag = _tag;
  state.dump = '[' + _result + ']';
}

function writeBlockSequence(state, level, object, compact) {
  var _result = '',
      _tag    = state.tag,
      index,
      length;

  for (index = 0, length = object.length; index < length; index += 1) {
    // Write only valid elements.
    if (writeNode(state, level + 1, object[index], true, true)) {
      if (!compact || index !== 0) {
        _result += generateNextLine(state, level);
      }

      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        _result += '-';
      } else {
        _result += '- ';
      }

      _result += state.dump;
    }
  }

  state.tag = _tag;
  state.dump = _result || '[]'; // Empty sequence if no valid values.
}

function writeFlowMapping(state, level, object) {
  var _result       = '',
      _tag          = state.tag,
      objectKeyList = Object.keys(object),
      index,
      length,
      objectKey,
      objectValue,
      pairBuffer;

  for (index = 0, length = objectKeyList.length; index < length; index += 1) {

    pairBuffer = '';
    if (index !== 0) pairBuffer += ', ';

    if (state.condenseFlow) pairBuffer += '"';

    objectKey = objectKeyList[index];
    objectValue = object[objectKey];

    if (!writeNode(state, level, objectKey, false, false)) {
      continue; // Skip this pair because of invalid key;
    }

    if (state.dump.length > 1024) pairBuffer += '? ';

    pairBuffer += state.dump + (state.condenseFlow ? '"' : '') + ':' + (state.condenseFlow ? '' : ' ');

    if (!writeNode(state, level, objectValue, false, false)) {
      continue; // Skip this pair because of invalid value.
    }

    pairBuffer += state.dump;

    // Both key and value are valid.
    _result += pairBuffer;
  }

  state.tag = _tag;
  state.dump = '{' + _result + '}';
}

function writeBlockMapping(state, level, object, compact) {
  var _result       = '',
      _tag          = state.tag,
      objectKeyList = Object.keys(object),
      index,
      length,
      objectKey,
      objectValue,
      explicitPair,
      pairBuffer;

  // Allow sorting keys so that the output file is deterministic
  if (state.sortKeys === true) {
    // Default sorting
    objectKeyList.sort();
  } else if (typeof state.sortKeys === 'function') {
    // Custom sort function
    objectKeyList.sort(state.sortKeys);
  } else if (state.sortKeys) {
    // Something is wrong
    throw new YAMLException('sortKeys must be a boolean or a function');
  }

  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = '';

    if (!compact || index !== 0) {
      pairBuffer += generateNextLine(state, level);
    }

    objectKey = objectKeyList[index];
    objectValue = object[objectKey];

    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
      continue; // Skip this pair because of invalid key.
    }

    explicitPair = (state.tag !== null && state.tag !== '?') ||
                   (state.dump && state.dump.length > 1024);

    if (explicitPair) {
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += '?';
      } else {
        pairBuffer += '? ';
      }
    }

    pairBuffer += state.dump;

    if (explicitPair) {
      pairBuffer += generateNextLine(state, level);
    }

    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
      continue; // Skip this pair because of invalid value.
    }

    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
      pairBuffer += ':';
    } else {
      pairBuffer += ': ';
    }

    pairBuffer += state.dump;

    // Both key and value are valid.
    _result += pairBuffer;
  }

  state.tag = _tag;
  state.dump = _result || '{}'; // Empty mapping if no valid pairs.
}

function detectType(state, object, explicit) {
  var _result, typeList, index, length, type, style;

  typeList = explicit ? state.explicitTypes : state.implicitTypes;

  for (index = 0, length = typeList.length; index < length; index += 1) {
    type = typeList[index];

    if ((type.instanceOf  || type.predicate) &&
        (!type.instanceOf || ((typeof object === 'object') && (object instanceof type.instanceOf))) &&
        (!type.predicate  || type.predicate(object))) {

      state.tag = explicit ? type.tag : '?';

      if (type.represent) {
        style = state.styleMap[type.tag] || type.defaultStyle;

        if (_toString.call(type.represent) === '[object Function]') {
          _result = type.represent(object, style);
        } else if (_hasOwnProperty.call(type.represent, style)) {
          _result = type.represent[style](object, style);
        } else {
          throw new YAMLException('!<' + type.tag + '> tag resolver accepts not "' + style + '" style');
        }

        state.dump = _result;
      }

      return true;
    }
  }

  return false;
}

// Serializes `object` and writes it to global `result`.
// Returns true on success, or false on invalid object.
//
function writeNode(state, level, object, block, compact, iskey) {
  state.tag = null;
  state.dump = object;

  if (!detectType(state, object, false)) {
    detectType(state, object, true);
  }

  var type = _toString.call(state.dump);

  if (block) {
    block = (state.flowLevel < 0 || state.flowLevel > level);
  }

  var objectOrArray = type === '[object Object]' || type === '[object Array]',
      duplicateIndex,
      duplicate;

  if (objectOrArray) {
    duplicateIndex = state.duplicates.indexOf(object);
    duplicate = duplicateIndex !== -1;
  }

  if ((state.tag !== null && state.tag !== '?') || duplicate || (state.indent !== 2 && level > 0)) {
    compact = false;
  }

  if (duplicate && state.usedDuplicates[duplicateIndex]) {
    state.dump = '*ref_' + duplicateIndex;
  } else {
    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
      state.usedDuplicates[duplicateIndex] = true;
    }
    if (type === '[object Object]') {
      if (block && (Object.keys(state.dump).length !== 0)) {
        writeBlockMapping(state, level, state.dump, compact);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + state.dump;
        }
      } else {
        writeFlowMapping(state, level, state.dump);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
        }
      }
    } else if (type === '[object Array]') {
      var arrayLevel = (state.noArrayIndent && (level > 0)) ? level - 1 : level;
      if (block && (state.dump.length !== 0)) {
        writeBlockSequence(state, arrayLevel, state.dump, compact);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + state.dump;
        }
      } else {
        writeFlowSequence(state, arrayLevel, state.dump);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
        }
      }
    } else if (type === '[object String]') {
      if (state.tag !== '?') {
        writeScalar(state, state.dump, level, iskey);
      }
    } else {
      if (state.skipInvalid) return false;
      throw new YAMLException('unacceptable kind of an object to dump ' + type);
    }

    if (state.tag !== null && state.tag !== '?') {
      state.dump = '!<' + state.tag + '> ' + state.dump;
    }
  }

  return true;
}

function getDuplicateReferences(object, state) {
  var objects = [],
      duplicatesIndexes = [],
      index,
      length;

  inspectNode(object, objects, duplicatesIndexes);

  for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
    state.duplicates.push(objects[duplicatesIndexes[index]]);
  }
  state.usedDuplicates = new Array(length);
}

function inspectNode(object, objects, duplicatesIndexes) {
  var objectKeyList,
      index,
      length;

  if (object !== null && typeof object === 'object') {
    index = objects.indexOf(object);
    if (index !== -1) {
      if (duplicatesIndexes.indexOf(index) === -1) {
        duplicatesIndexes.push(index);
      }
    } else {
      objects.push(object);

      if (Array.isArray(object)) {
        for (index = 0, length = object.length; index < length; index += 1) {
          inspectNode(object[index], objects, duplicatesIndexes);
        }
      } else {
        objectKeyList = Object.keys(object);

        for (index = 0, length = objectKeyList.length; index < length; index += 1) {
          inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
        }
      }
    }
  }
}

function dump(input, options) {
  options = options || {};

  var state = new State(options);

  if (!state.noRefs) getDuplicateReferences(input, state);

  if (writeNode(state, 0, input, true, true)) return state.dump + '\n';

  return '';
}

function safeDump(input, options) {
  return dump(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
}

module.exports.dump     = dump;
module.exports.safeDump = safeDump;


/***/ }),

/***/ 9643:
/***/ ((module) => {

"use strict";
// YAML error class. http://stackoverflow.com/questions/8458984
//


function YAMLException(reason, mark) {
  // Super constructor
  Error.call(this);

  this.name = 'YAMLException';
  this.reason = reason;
  this.mark = mark;
  this.message = (this.reason || '(unknown reason)') + (this.mark ? ' ' + this.mark.toString() : '');

  // Include stack trace in error object
  if (Error.captureStackTrace) {
    // Chrome and NodeJS
    Error.captureStackTrace(this, this.constructor);
  } else {
    // FF, IE 10+ and Safari 6+. Fallback for others
    this.stack = (new Error()).stack || '';
  }
}


// Inherit from Error
YAMLException.prototype = Object.create(Error.prototype);
YAMLException.prototype.constructor = YAMLException;


YAMLException.prototype.toString = function toString(compact) {
  var result = this.name + ': ';

  result += this.reason || '(unknown reason)';

  if (!compact && this.mark) {
    result += ' ' + this.mark.toString();
  }

  return result;
};


module.exports = YAMLException;


/***/ }),

/***/ 36279:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/*eslint-disable max-len,no-use-before-define*/

var common              = __webpack_require__(19333);
var YAMLException       = __webpack_require__(9643);
var Mark                = __webpack_require__(21617);
var DEFAULT_SAFE_SCHEMA = __webpack_require__(41893);
var DEFAULT_FULL_SCHEMA = __webpack_require__(41413);


var _hasOwnProperty = Object.prototype.hasOwnProperty;


var CONTEXT_FLOW_IN   = 1;
var CONTEXT_FLOW_OUT  = 2;
var CONTEXT_BLOCK_IN  = 3;
var CONTEXT_BLOCK_OUT = 4;


var CHOMPING_CLIP  = 1;
var CHOMPING_STRIP = 2;
var CHOMPING_KEEP  = 3;


var PATTERN_NON_PRINTABLE         = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var PATTERN_FLOW_INDICATORS       = /[,\[\]\{\}]/;
var PATTERN_TAG_HANDLE            = /^(?:!|!!|![a-z\-]+!)$/i;
var PATTERN_TAG_URI               = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;


function _class(obj) { return Object.prototype.toString.call(obj); }

function is_EOL(c) {
  return (c === 0x0A/* LF */) || (c === 0x0D/* CR */);
}

function is_WHITE_SPACE(c) {
  return (c === 0x09/* Tab */) || (c === 0x20/* Space */);
}

function is_WS_OR_EOL(c) {
  return (c === 0x09/* Tab */) ||
         (c === 0x20/* Space */) ||
         (c === 0x0A/* LF */) ||
         (c === 0x0D/* CR */);
}

function is_FLOW_INDICATOR(c) {
  return c === 0x2C/* , */ ||
         c === 0x5B/* [ */ ||
         c === 0x5D/* ] */ ||
         c === 0x7B/* { */ ||
         c === 0x7D/* } */;
}

function fromHexCode(c) {
  var lc;

  if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
    return c - 0x30;
  }

  /*eslint-disable no-bitwise*/
  lc = c | 0x20;

  if ((0x61/* a */ <= lc) && (lc <= 0x66/* f */)) {
    return lc - 0x61 + 10;
  }

  return -1;
}

function escapedHexLen(c) {
  if (c === 0x78/* x */) { return 2; }
  if (c === 0x75/* u */) { return 4; }
  if (c === 0x55/* U */) { return 8; }
  return 0;
}

function fromDecimalCode(c) {
  if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
    return c - 0x30;
  }

  return -1;
}

function simpleEscapeSequence(c) {
  /* eslint-disable indent */
  return (c === 0x30/* 0 */) ? '\x00' :
        (c === 0x61/* a */) ? '\x07' :
        (c === 0x62/* b */) ? '\x08' :
        (c === 0x74/* t */) ? '\x09' :
        (c === 0x09/* Tab */) ? '\x09' :
        (c === 0x6E/* n */) ? '\x0A' :
        (c === 0x76/* v */) ? '\x0B' :
        (c === 0x66/* f */) ? '\x0C' :
        (c === 0x72/* r */) ? '\x0D' :
        (c === 0x65/* e */) ? '\x1B' :
        (c === 0x20/* Space */) ? ' ' :
        (c === 0x22/* " */) ? '\x22' :
        (c === 0x2F/* / */) ? '/' :
        (c === 0x5C/* \ */) ? '\x5C' :
        (c === 0x4E/* N */) ? '\x85' :
        (c === 0x5F/* _ */) ? '\xA0' :
        (c === 0x4C/* L */) ? '\u2028' :
        (c === 0x50/* P */) ? '\u2029' : '';
}

function charFromCodepoint(c) {
  if (c <= 0xFFFF) {
    return String.fromCharCode(c);
  }
  // Encode UTF-16 surrogate pair
  // https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B010000_to_U.2B10FFFF
  return String.fromCharCode(
    ((c - 0x010000) >> 10) + 0xD800,
    ((c - 0x010000) & 0x03FF) + 0xDC00
  );
}

var simpleEscapeCheck = new Array(256); // integer, for fast access
var simpleEscapeMap = new Array(256);
for (var i = 0; i < 256; i++) {
  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
  simpleEscapeMap[i] = simpleEscapeSequence(i);
}


function State(input, options) {
  this.input = input;

  this.filename  = options['filename']  || null;
  this.schema    = options['schema']    || DEFAULT_FULL_SCHEMA;
  this.onWarning = options['onWarning'] || null;
  this.legacy    = options['legacy']    || false;
  this.json      = options['json']      || false;
  this.listener  = options['listener']  || null;

  this.implicitTypes = this.schema.compiledImplicit;
  this.typeMap       = this.schema.compiledTypeMap;

  this.length     = input.length;
  this.position   = 0;
  this.line       = 0;
  this.lineStart  = 0;
  this.lineIndent = 0;

  this.documents = [];

  /*
  this.version;
  this.checkLineBreaks;
  this.tagMap;
  this.anchorMap;
  this.tag;
  this.anchor;
  this.kind;
  this.result;*/

}


function generateError(state, message) {
  return new YAMLException(
    message,
    new Mark(state.filename, state.input, state.position, state.line, (state.position - state.lineStart)));
}

function throwError(state, message) {
  throw generateError(state, message);
}

function throwWarning(state, message) {
  if (state.onWarning) {
    state.onWarning.call(null, generateError(state, message));
  }
}


var directiveHandlers = {

  YAML: function handleYamlDirective(state, name, args) {

    var match, major, minor;

    if (state.version !== null) {
      throwError(state, 'duplication of %YAML directive');
    }

    if (args.length !== 1) {
      throwError(state, 'YAML directive accepts exactly one argument');
    }

    match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);

    if (match === null) {
      throwError(state, 'ill-formed argument of the YAML directive');
    }

    major = parseInt(match[1], 10);
    minor = parseInt(match[2], 10);

    if (major !== 1) {
      throwError(state, 'unacceptable YAML version of the document');
    }

    state.version = args[0];
    state.checkLineBreaks = (minor < 2);

    if (minor !== 1 && minor !== 2) {
      throwWarning(state, 'unsupported YAML version of the document');
    }
  },

  TAG: function handleTagDirective(state, name, args) {

    var handle, prefix;

    if (args.length !== 2) {
      throwError(state, 'TAG directive accepts exactly two arguments');
    }

    handle = args[0];
    prefix = args[1];

    if (!PATTERN_TAG_HANDLE.test(handle)) {
      throwError(state, 'ill-formed tag handle (first argument) of the TAG directive');
    }

    if (_hasOwnProperty.call(state.tagMap, handle)) {
      throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
    }

    if (!PATTERN_TAG_URI.test(prefix)) {
      throwError(state, 'ill-formed tag prefix (second argument) of the TAG directive');
    }

    state.tagMap[handle] = prefix;
  }
};


function captureSegment(state, start, end, checkJson) {
  var _position, _length, _character, _result;

  if (start < end) {
    _result = state.input.slice(start, end);

    if (checkJson) {
      for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
        _character = _result.charCodeAt(_position);
        if (!(_character === 0x09 ||
              (0x20 <= _character && _character <= 0x10FFFF))) {
          throwError(state, 'expected valid JSON character');
        }
      }
    } else if (PATTERN_NON_PRINTABLE.test(_result)) {
      throwError(state, 'the stream contains non-printable characters');
    }

    state.result += _result;
  }
}

function mergeMappings(state, destination, source, overridableKeys) {
  var sourceKeys, key, index, quantity;

  if (!common.isObject(source)) {
    throwError(state, 'cannot merge mappings; the provided source object is unacceptable');
  }

  sourceKeys = Object.keys(source);

  for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
    key = sourceKeys[index];

    if (!_hasOwnProperty.call(destination, key)) {
      destination[key] = source[key];
      overridableKeys[key] = true;
    }
  }
}

function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startPos) {
  var index, quantity;

  // The output is a plain object here, so keys can only be strings.
  // We need to convert keyNode to a string, but doing so can hang the process
  // (deeply nested arrays that explode exponentially using aliases).
  if (Array.isArray(keyNode)) {
    keyNode = Array.prototype.slice.call(keyNode);

    for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
      if (Array.isArray(keyNode[index])) {
        throwError(state, 'nested arrays are not supported inside keys');
      }

      if (typeof keyNode === 'object' && _class(keyNode[index]) === '[object Object]') {
        keyNode[index] = '[object Object]';
      }
    }
  }

  // Avoid code execution in load() via toString property
  // (still use its own toString for arrays, timestamps,
  // and whatever user schema extensions happen to have @@toStringTag)
  if (typeof keyNode === 'object' && _class(keyNode) === '[object Object]') {
    keyNode = '[object Object]';
  }


  keyNode = String(keyNode);

  if (_result === null) {
    _result = {};
  }

  if (keyTag === 'tag:yaml.org,2002:merge') {
    if (Array.isArray(valueNode)) {
      for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
        mergeMappings(state, _result, valueNode[index], overridableKeys);
      }
    } else {
      mergeMappings(state, _result, valueNode, overridableKeys);
    }
  } else {
    if (!state.json &&
        !_hasOwnProperty.call(overridableKeys, keyNode) &&
        _hasOwnProperty.call(_result, keyNode)) {
      state.line = startLine || state.line;
      state.position = startPos || state.position;
      throwError(state, 'duplicated mapping key');
    }
    _result[keyNode] = valueNode;
    delete overridableKeys[keyNode];
  }

  return _result;
}

function readLineBreak(state) {
  var ch;

  ch = state.input.charCodeAt(state.position);

  if (ch === 0x0A/* LF */) {
    state.position++;
  } else if (ch === 0x0D/* CR */) {
    state.position++;
    if (state.input.charCodeAt(state.position) === 0x0A/* LF */) {
      state.position++;
    }
  } else {
    throwError(state, 'a line break is expected');
  }

  state.line += 1;
  state.lineStart = state.position;
}

function skipSeparationSpace(state, allowComments, checkIndent) {
  var lineBreaks = 0,
      ch = state.input.charCodeAt(state.position);

  while (ch !== 0) {
    while (is_WHITE_SPACE(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }

    if (allowComments && ch === 0x23/* # */) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 0x0A/* LF */ && ch !== 0x0D/* CR */ && ch !== 0);
    }

    if (is_EOL(ch)) {
      readLineBreak(state);

      ch = state.input.charCodeAt(state.position);
      lineBreaks++;
      state.lineIndent = 0;

      while (ch === 0x20/* Space */) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }
    } else {
      break;
    }
  }

  if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
    throwWarning(state, 'deficient indentation');
  }

  return lineBreaks;
}

function testDocumentSeparator(state) {
  var _position = state.position,
      ch;

  ch = state.input.charCodeAt(_position);

  // Condition state.position === state.lineStart is tested
  // in parent on each call, for efficiency. No needs to test here again.
  if ((ch === 0x2D/* - */ || ch === 0x2E/* . */) &&
      ch === state.input.charCodeAt(_position + 1) &&
      ch === state.input.charCodeAt(_position + 2)) {

    _position += 3;

    ch = state.input.charCodeAt(_position);

    if (ch === 0 || is_WS_OR_EOL(ch)) {
      return true;
    }
  }

  return false;
}

function writeFoldedLines(state, count) {
  if (count === 1) {
    state.result += ' ';
  } else if (count > 1) {
    state.result += common.repeat('\n', count - 1);
  }
}


function readPlainScalar(state, nodeIndent, withinFlowCollection) {
  var preceding,
      following,
      captureStart,
      captureEnd,
      hasPendingContent,
      _line,
      _lineStart,
      _lineIndent,
      _kind = state.kind,
      _result = state.result,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (is_WS_OR_EOL(ch)      ||
      is_FLOW_INDICATOR(ch) ||
      ch === 0x23/* # */    ||
      ch === 0x26/* & */    ||
      ch === 0x2A/* * */    ||
      ch === 0x21/* ! */    ||
      ch === 0x7C/* | */    ||
      ch === 0x3E/* > */    ||
      ch === 0x27/* ' */    ||
      ch === 0x22/* " */    ||
      ch === 0x25/* % */    ||
      ch === 0x40/* @ */    ||
      ch === 0x60/* ` */) {
    return false;
  }

  if (ch === 0x3F/* ? */ || ch === 0x2D/* - */) {
    following = state.input.charCodeAt(state.position + 1);

    if (is_WS_OR_EOL(following) ||
        withinFlowCollection && is_FLOW_INDICATOR(following)) {
      return false;
    }
  }

  state.kind = 'scalar';
  state.result = '';
  captureStart = captureEnd = state.position;
  hasPendingContent = false;

  while (ch !== 0) {
    if (ch === 0x3A/* : */) {
      following = state.input.charCodeAt(state.position + 1);

      if (is_WS_OR_EOL(following) ||
          withinFlowCollection && is_FLOW_INDICATOR(following)) {
        break;
      }

    } else if (ch === 0x23/* # */) {
      preceding = state.input.charCodeAt(state.position - 1);

      if (is_WS_OR_EOL(preceding)) {
        break;
      }

    } else if ((state.position === state.lineStart && testDocumentSeparator(state)) ||
               withinFlowCollection && is_FLOW_INDICATOR(ch)) {
      break;

    } else if (is_EOL(ch)) {
      _line = state.line;
      _lineStart = state.lineStart;
      _lineIndent = state.lineIndent;
      skipSeparationSpace(state, false, -1);

      if (state.lineIndent >= nodeIndent) {
        hasPendingContent = true;
        ch = state.input.charCodeAt(state.position);
        continue;
      } else {
        state.position = captureEnd;
        state.line = _line;
        state.lineStart = _lineStart;
        state.lineIndent = _lineIndent;
        break;
      }
    }

    if (hasPendingContent) {
      captureSegment(state, captureStart, captureEnd, false);
      writeFoldedLines(state, state.line - _line);
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
    }

    if (!is_WHITE_SPACE(ch)) {
      captureEnd = state.position + 1;
    }

    ch = state.input.charCodeAt(++state.position);
  }

  captureSegment(state, captureStart, captureEnd, false);

  if (state.result) {
    return true;
  }

  state.kind = _kind;
  state.result = _result;
  return false;
}

function readSingleQuotedScalar(state, nodeIndent) {
  var ch,
      captureStart, captureEnd;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x27/* ' */) {
    return false;
  }

  state.kind = 'scalar';
  state.result = '';
  state.position++;
  captureStart = captureEnd = state.position;

  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 0x27/* ' */) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);

      if (ch === 0x27/* ' */) {
        captureStart = state.position;
        state.position++;
        captureEnd = state.position;
      } else {
        return true;
      }

    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;

    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, 'unexpected end of the document within a single quoted scalar');

    } else {
      state.position++;
      captureEnd = state.position;
    }
  }

  throwError(state, 'unexpected end of the stream within a single quoted scalar');
}

function readDoubleQuotedScalar(state, nodeIndent) {
  var captureStart,
      captureEnd,
      hexLength,
      hexResult,
      tmp,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x22/* " */) {
    return false;
  }

  state.kind = 'scalar';
  state.result = '';
  state.position++;
  captureStart = captureEnd = state.position;

  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 0x22/* " */) {
      captureSegment(state, captureStart, state.position, true);
      state.position++;
      return true;

    } else if (ch === 0x5C/* \ */) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);

      if (is_EOL(ch)) {
        skipSeparationSpace(state, false, nodeIndent);

        // TODO: rework to inline fn with no type cast?
      } else if (ch < 256 && simpleEscapeCheck[ch]) {
        state.result += simpleEscapeMap[ch];
        state.position++;

      } else if ((tmp = escapedHexLen(ch)) > 0) {
        hexLength = tmp;
        hexResult = 0;

        for (; hexLength > 0; hexLength--) {
          ch = state.input.charCodeAt(++state.position);

          if ((tmp = fromHexCode(ch)) >= 0) {
            hexResult = (hexResult << 4) + tmp;

          } else {
            throwError(state, 'expected hexadecimal character');
          }
        }

        state.result += charFromCodepoint(hexResult);

        state.position++;

      } else {
        throwError(state, 'unknown escape sequence');
      }

      captureStart = captureEnd = state.position;

    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;

    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, 'unexpected end of the document within a double quoted scalar');

    } else {
      state.position++;
      captureEnd = state.position;
    }
  }

  throwError(state, 'unexpected end of the stream within a double quoted scalar');
}

function readFlowCollection(state, nodeIndent) {
  var readNext = true,
      _line,
      _tag     = state.tag,
      _result,
      _anchor  = state.anchor,
      following,
      terminator,
      isPair,
      isExplicitPair,
      isMapping,
      overridableKeys = {},
      keyNode,
      keyTag,
      valueNode,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch === 0x5B/* [ */) {
    terminator = 0x5D;/* ] */
    isMapping = false;
    _result = [];
  } else if (ch === 0x7B/* { */) {
    terminator = 0x7D;/* } */
    isMapping = true;
    _result = {};
  } else {
    return false;
  }

  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }

  ch = state.input.charCodeAt(++state.position);

  while (ch !== 0) {
    skipSeparationSpace(state, true, nodeIndent);

    ch = state.input.charCodeAt(state.position);

    if (ch === terminator) {
      state.position++;
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = isMapping ? 'mapping' : 'sequence';
      state.result = _result;
      return true;
    } else if (!readNext) {
      throwError(state, 'missed comma between flow collection entries');
    }

    keyTag = keyNode = valueNode = null;
    isPair = isExplicitPair = false;

    if (ch === 0x3F/* ? */) {
      following = state.input.charCodeAt(state.position + 1);

      if (is_WS_OR_EOL(following)) {
        isPair = isExplicitPair = true;
        state.position++;
        skipSeparationSpace(state, true, nodeIndent);
      }
    }

    _line = state.line;
    composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
    keyTag = state.tag;
    keyNode = state.result;
    skipSeparationSpace(state, true, nodeIndent);

    ch = state.input.charCodeAt(state.position);

    if ((isExplicitPair || state.line === _line) && ch === 0x3A/* : */) {
      isPair = true;
      ch = state.input.charCodeAt(++state.position);
      skipSeparationSpace(state, true, nodeIndent);
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      valueNode = state.result;
    }

    if (isMapping) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
    } else if (isPair) {
      _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
    } else {
      _result.push(keyNode);
    }

    skipSeparationSpace(state, true, nodeIndent);

    ch = state.input.charCodeAt(state.position);

    if (ch === 0x2C/* , */) {
      readNext = true;
      ch = state.input.charCodeAt(++state.position);
    } else {
      readNext = false;
    }
  }

  throwError(state, 'unexpected end of the stream within a flow collection');
}

function readBlockScalar(state, nodeIndent) {
  var captureStart,
      folding,
      chomping       = CHOMPING_CLIP,
      didReadContent = false,
      detectedIndent = false,
      textIndent     = nodeIndent,
      emptyLines     = 0,
      atMoreIndented = false,
      tmp,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch === 0x7C/* | */) {
    folding = false;
  } else if (ch === 0x3E/* > */) {
    folding = true;
  } else {
    return false;
  }

  state.kind = 'scalar';
  state.result = '';

  while (ch !== 0) {
    ch = state.input.charCodeAt(++state.position);

    if (ch === 0x2B/* + */ || ch === 0x2D/* - */) {
      if (CHOMPING_CLIP === chomping) {
        chomping = (ch === 0x2B/* + */) ? CHOMPING_KEEP : CHOMPING_STRIP;
      } else {
        throwError(state, 'repeat of a chomping mode identifier');
      }

    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
      if (tmp === 0) {
        throwError(state, 'bad explicit indentation width of a block scalar; it cannot be less than one');
      } else if (!detectedIndent) {
        textIndent = nodeIndent + tmp - 1;
        detectedIndent = true;
      } else {
        throwError(state, 'repeat of an indentation width identifier');
      }

    } else {
      break;
    }
  }

  if (is_WHITE_SPACE(ch)) {
    do { ch = state.input.charCodeAt(++state.position); }
    while (is_WHITE_SPACE(ch));

    if (ch === 0x23/* # */) {
      do { ch = state.input.charCodeAt(++state.position); }
      while (!is_EOL(ch) && (ch !== 0));
    }
  }

  while (ch !== 0) {
    readLineBreak(state);
    state.lineIndent = 0;

    ch = state.input.charCodeAt(state.position);

    while ((!detectedIndent || state.lineIndent < textIndent) &&
           (ch === 0x20/* Space */)) {
      state.lineIndent++;
      ch = state.input.charCodeAt(++state.position);
    }

    if (!detectedIndent && state.lineIndent > textIndent) {
      textIndent = state.lineIndent;
    }

    if (is_EOL(ch)) {
      emptyLines++;
      continue;
    }

    // End of the scalar.
    if (state.lineIndent < textIndent) {

      // Perform the chomping.
      if (chomping === CHOMPING_KEEP) {
        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
      } else if (chomping === CHOMPING_CLIP) {
        if (didReadContent) { // i.e. only if the scalar is not empty.
          state.result += '\n';
        }
      }

      // Break this `while` cycle and go to the funciton's epilogue.
      break;
    }

    // Folded style: use fancy rules to handle line breaks.
    if (folding) {

      // Lines starting with white space characters (more-indented lines) are not folded.
      if (is_WHITE_SPACE(ch)) {
        atMoreIndented = true;
        // except for the first content line (cf. Example 8.1)
        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);

      // End of more-indented block.
      } else if (atMoreIndented) {
        atMoreIndented = false;
        state.result += common.repeat('\n', emptyLines + 1);

      // Just one line break - perceive as the same line.
      } else if (emptyLines === 0) {
        if (didReadContent) { // i.e. only if we have already read some scalar content.
          state.result += ' ';
        }

      // Several line breaks - perceive as different lines.
      } else {
        state.result += common.repeat('\n', emptyLines);
      }

    // Literal style: just add exact number of line breaks between content lines.
    } else {
      // Keep all line breaks except the header line break.
      state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
    }

    didReadContent = true;
    detectedIndent = true;
    emptyLines = 0;
    captureStart = state.position;

    while (!is_EOL(ch) && (ch !== 0)) {
      ch = state.input.charCodeAt(++state.position);
    }

    captureSegment(state, captureStart, state.position, false);
  }

  return true;
}

function readBlockSequence(state, nodeIndent) {
  var _line,
      _tag      = state.tag,
      _anchor   = state.anchor,
      _result   = [],
      following,
      detected  = false,
      ch;

  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }

  ch = state.input.charCodeAt(state.position);

  while (ch !== 0) {

    if (ch !== 0x2D/* - */) {
      break;
    }

    following = state.input.charCodeAt(state.position + 1);

    if (!is_WS_OR_EOL(following)) {
      break;
    }

    detected = true;
    state.position++;

    if (skipSeparationSpace(state, true, -1)) {
      if (state.lineIndent <= nodeIndent) {
        _result.push(null);
        ch = state.input.charCodeAt(state.position);
        continue;
      }
    }

    _line = state.line;
    composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
    _result.push(state.result);
    skipSeparationSpace(state, true, -1);

    ch = state.input.charCodeAt(state.position);

    if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
      throwError(state, 'bad indentation of a sequence entry');
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }

  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = 'sequence';
    state.result = _result;
    return true;
  }
  return false;
}

function readBlockMapping(state, nodeIndent, flowIndent) {
  var following,
      allowCompact,
      _line,
      _pos,
      _tag          = state.tag,
      _anchor       = state.anchor,
      _result       = {},
      overridableKeys = {},
      keyTag        = null,
      keyNode       = null,
      valueNode     = null,
      atExplicitKey = false,
      detected      = false,
      ch;

  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }

  ch = state.input.charCodeAt(state.position);

  while (ch !== 0) {
    following = state.input.charCodeAt(state.position + 1);
    _line = state.line; // Save the current line.
    _pos = state.position;

    //
    // Explicit notation case. There are two separate blocks:
    // first for the key (denoted by "?") and second for the value (denoted by ":")
    //
    if ((ch === 0x3F/* ? */ || ch === 0x3A/* : */) && is_WS_OR_EOL(following)) {

      if (ch === 0x3F/* ? */) {
        if (atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
          keyTag = keyNode = valueNode = null;
        }

        detected = true;
        atExplicitKey = true;
        allowCompact = true;

      } else if (atExplicitKey) {
        // i.e. 0x3A/* : */ === character after the explicit key.
        atExplicitKey = false;
        allowCompact = true;

      } else {
        throwError(state, 'incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line');
      }

      state.position += 1;
      ch = following;

    //
    // Implicit notation case. Flow-style node as the key first, then ":", and the value.
    //
    } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {

      if (state.line === _line) {
        ch = state.input.charCodeAt(state.position);

        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }

        if (ch === 0x3A/* : */) {
          ch = state.input.charCodeAt(++state.position);

          if (!is_WS_OR_EOL(ch)) {
            throwError(state, 'a whitespace character is expected after the key-value separator within a block mapping');
          }

          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
            keyTag = keyNode = valueNode = null;
          }

          detected = true;
          atExplicitKey = false;
          allowCompact = false;
          keyTag = state.tag;
          keyNode = state.result;

        } else if (detected) {
          throwError(state, 'can not read an implicit mapping pair; a colon is missed');

        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true; // Keep the result of `composeNode`.
        }

      } else if (detected) {
        throwError(state, 'can not read a block mapping entry; a multiline key may not be an implicit key');

      } else {
        state.tag = _tag;
        state.anchor = _anchor;
        return true; // Keep the result of `composeNode`.
      }

    } else {
      break; // Reading is done. Go to the epilogue.
    }

    //
    // Common reading code for both explicit and implicit notations.
    //
    if (state.line === _line || state.lineIndent > nodeIndent) {
      if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
        if (atExplicitKey) {
          keyNode = state.result;
        } else {
          valueNode = state.result;
        }
      }

      if (!atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _pos);
        keyTag = keyNode = valueNode = null;
      }

      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
    }

    if (state.lineIndent > nodeIndent && (ch !== 0)) {
      throwError(state, 'bad indentation of a mapping entry');
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }

  //
  // Epilogue.
  //

  // Special case: last mapping's node contains only the key in explicit notation.
  if (atExplicitKey) {
    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
  }

  // Expose the resulting mapping.
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = 'mapping';
    state.result = _result;
  }

  return detected;
}

function readTagProperty(state) {
  var _position,
      isVerbatim = false,
      isNamed    = false,
      tagHandle,
      tagName,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x21/* ! */) return false;

  if (state.tag !== null) {
    throwError(state, 'duplication of a tag property');
  }

  ch = state.input.charCodeAt(++state.position);

  if (ch === 0x3C/* < */) {
    isVerbatim = true;
    ch = state.input.charCodeAt(++state.position);

  } else if (ch === 0x21/* ! */) {
    isNamed = true;
    tagHandle = '!!';
    ch = state.input.charCodeAt(++state.position);

  } else {
    tagHandle = '!';
  }

  _position = state.position;

  if (isVerbatim) {
    do { ch = state.input.charCodeAt(++state.position); }
    while (ch !== 0 && ch !== 0x3E/* > */);

    if (state.position < state.length) {
      tagName = state.input.slice(_position, state.position);
      ch = state.input.charCodeAt(++state.position);
    } else {
      throwError(state, 'unexpected end of the stream within a verbatim tag');
    }
  } else {
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {

      if (ch === 0x21/* ! */) {
        if (!isNamed) {
          tagHandle = state.input.slice(_position - 1, state.position + 1);

          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
            throwError(state, 'named tag handle cannot contain such characters');
          }

          isNamed = true;
          _position = state.position + 1;
        } else {
          throwError(state, 'tag suffix cannot contain exclamation marks');
        }
      }

      ch = state.input.charCodeAt(++state.position);
    }

    tagName = state.input.slice(_position, state.position);

    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
      throwError(state, 'tag suffix cannot contain flow indicator characters');
    }
  }

  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
    throwError(state, 'tag name cannot contain such characters: ' + tagName);
  }

  if (isVerbatim) {
    state.tag = tagName;

  } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
    state.tag = state.tagMap[tagHandle] + tagName;

  } else if (tagHandle === '!') {
    state.tag = '!' + tagName;

  } else if (tagHandle === '!!') {
    state.tag = 'tag:yaml.org,2002:' + tagName;

  } else {
    throwError(state, 'undeclared tag handle "' + tagHandle + '"');
  }

  return true;
}

function readAnchorProperty(state) {
  var _position,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x26/* & */) return false;

  if (state.anchor !== null) {
    throwError(state, 'duplication of an anchor property');
  }

  ch = state.input.charCodeAt(++state.position);
  _position = state.position;

  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }

  if (state.position === _position) {
    throwError(state, 'name of an anchor node must contain at least one character');
  }

  state.anchor = state.input.slice(_position, state.position);
  return true;
}

function readAlias(state) {
  var _position, alias,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x2A/* * */) return false;

  ch = state.input.charCodeAt(++state.position);
  _position = state.position;

  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }

  if (state.position === _position) {
    throwError(state, 'name of an alias node must contain at least one character');
  }

  alias = state.input.slice(_position, state.position);

  if (!_hasOwnProperty.call(state.anchorMap, alias)) {
    throwError(state, 'unidentified alias "' + alias + '"');
  }

  state.result = state.anchorMap[alias];
  skipSeparationSpace(state, true, -1);
  return true;
}

function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
  var allowBlockStyles,
      allowBlockScalars,
      allowBlockCollections,
      indentStatus = 1, // 1: this>parent, 0: this=parent, -1: this<parent
      atNewLine  = false,
      hasContent = false,
      typeIndex,
      typeQuantity,
      type,
      flowIndent,
      blockIndent;

  if (state.listener !== null) {
    state.listener('open', state);
  }

  state.tag    = null;
  state.anchor = null;
  state.kind   = null;
  state.result = null;

  allowBlockStyles = allowBlockScalars = allowBlockCollections =
    CONTEXT_BLOCK_OUT === nodeContext ||
    CONTEXT_BLOCK_IN  === nodeContext;

  if (allowToSeek) {
    if (skipSeparationSpace(state, true, -1)) {
      atNewLine = true;

      if (state.lineIndent > parentIndent) {
        indentStatus = 1;
      } else if (state.lineIndent === parentIndent) {
        indentStatus = 0;
      } else if (state.lineIndent < parentIndent) {
        indentStatus = -1;
      }
    }
  }

  if (indentStatus === 1) {
    while (readTagProperty(state) || readAnchorProperty(state)) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;
        allowBlockCollections = allowBlockStyles;

        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      } else {
        allowBlockCollections = false;
      }
    }
  }

  if (allowBlockCollections) {
    allowBlockCollections = atNewLine || allowCompact;
  }

  if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
    if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
      flowIndent = parentIndent;
    } else {
      flowIndent = parentIndent + 1;
    }

    blockIndent = state.position - state.lineStart;

    if (indentStatus === 1) {
      if (allowBlockCollections &&
          (readBlockSequence(state, blockIndent) ||
           readBlockMapping(state, blockIndent, flowIndent)) ||
          readFlowCollection(state, flowIndent)) {
        hasContent = true;
      } else {
        if ((allowBlockScalars && readBlockScalar(state, flowIndent)) ||
            readSingleQuotedScalar(state, flowIndent) ||
            readDoubleQuotedScalar(state, flowIndent)) {
          hasContent = true;

        } else if (readAlias(state)) {
          hasContent = true;

          if (state.tag !== null || state.anchor !== null) {
            throwError(state, 'alias node should not have any properties');
          }

        } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
          hasContent = true;

          if (state.tag === null) {
            state.tag = '?';
          }
        }

        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else if (indentStatus === 0) {
      // Special case: block sequences are allowed to have same indentation level as the parent.
      // http://www.yaml.org/spec/1.2/spec.html#id2799784
      hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
    }
  }

  if (state.tag !== null && state.tag !== '!') {
    if (state.tag === '?') {
      // Implicit resolving is not allowed for non-scalar types, and '?'
      // non-specific tag is only automatically assigned to plain scalars.
      //
      // We only need to check kind conformity in case user explicitly assigns '?'
      // tag, for example like this: "!<?> [0]"
      //
      if (state.result !== null && state.kind !== 'scalar') {
        throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
      }

      for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
        type = state.implicitTypes[typeIndex];

        if (type.resolve(state.result)) { // `state.result` updated in resolver if matched
          state.result = type.construct(state.result);
          state.tag = type.tag;
          if (state.anchor !== null) {
            state.anchorMap[state.anchor] = state.result;
          }
          break;
        }
      }
    } else if (_hasOwnProperty.call(state.typeMap[state.kind || 'fallback'], state.tag)) {
      type = state.typeMap[state.kind || 'fallback'][state.tag];

      if (state.result !== null && type.kind !== state.kind) {
        throwError(state, 'unacceptable node kind for !<' + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
      }

      if (!type.resolve(state.result)) { // `state.result` updated in resolver if matched
        throwError(state, 'cannot resolve a node with !<' + state.tag + '> explicit tag');
      } else {
        state.result = type.construct(state.result);
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else {
      throwError(state, 'unknown tag !<' + state.tag + '>');
    }
  }

  if (state.listener !== null) {
    state.listener('close', state);
  }
  return state.tag !== null ||  state.anchor !== null || hasContent;
}

function readDocument(state) {
  var documentStart = state.position,
      _position,
      directiveName,
      directiveArgs,
      hasDirectives = false,
      ch;

  state.version = null;
  state.checkLineBreaks = state.legacy;
  state.tagMap = {};
  state.anchorMap = {};

  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    skipSeparationSpace(state, true, -1);

    ch = state.input.charCodeAt(state.position);

    if (state.lineIndent > 0 || ch !== 0x25/* % */) {
      break;
    }

    hasDirectives = true;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;

    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }

    directiveName = state.input.slice(_position, state.position);
    directiveArgs = [];

    if (directiveName.length < 1) {
      throwError(state, 'directive name must not be less than one character in length');
    }

    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }

      if (ch === 0x23/* # */) {
        do { ch = state.input.charCodeAt(++state.position); }
        while (ch !== 0 && !is_EOL(ch));
        break;
      }

      if (is_EOL(ch)) break;

      _position = state.position;

      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }

      directiveArgs.push(state.input.slice(_position, state.position));
    }

    if (ch !== 0) readLineBreak(state);

    if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
      directiveHandlers[directiveName](state, directiveName, directiveArgs);
    } else {
      throwWarning(state, 'unknown document directive "' + directiveName + '"');
    }
  }

  skipSeparationSpace(state, true, -1);

  if (state.lineIndent === 0 &&
      state.input.charCodeAt(state.position)     === 0x2D/* - */ &&
      state.input.charCodeAt(state.position + 1) === 0x2D/* - */ &&
      state.input.charCodeAt(state.position + 2) === 0x2D/* - */) {
    state.position += 3;
    skipSeparationSpace(state, true, -1);

  } else if (hasDirectives) {
    throwError(state, 'directives end mark is expected');
  }

  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
  skipSeparationSpace(state, true, -1);

  if (state.checkLineBreaks &&
      PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
    throwWarning(state, 'non-ASCII line breaks are interpreted as content');
  }

  state.documents.push(state.result);

  if (state.position === state.lineStart && testDocumentSeparator(state)) {

    if (state.input.charCodeAt(state.position) === 0x2E/* . */) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    }
    return;
  }

  if (state.position < (state.length - 1)) {
    throwError(state, 'end of the stream or a document separator is expected');
  } else {
    return;
  }
}


function loadDocuments(input, options) {
  input = String(input);
  options = options || {};

  if (input.length !== 0) {

    // Add tailing `\n` if not exists
    if (input.charCodeAt(input.length - 1) !== 0x0A/* LF */ &&
        input.charCodeAt(input.length - 1) !== 0x0D/* CR */) {
      input += '\n';
    }

    // Strip BOM
    if (input.charCodeAt(0) === 0xFEFF) {
      input = input.slice(1);
    }
  }

  var state = new State(input, options);

  var nullpos = input.indexOf('\0');

  if (nullpos !== -1) {
    state.position = nullpos;
    throwError(state, 'null byte is not allowed in input');
  }

  // Use 0 as string terminator. That significantly simplifies bounds check.
  state.input += '\0';

  while (state.input.charCodeAt(state.position) === 0x20/* Space */) {
    state.lineIndent += 1;
    state.position += 1;
  }

  while (state.position < (state.length - 1)) {
    readDocument(state);
  }

  return state.documents;
}


function loadAll(input, iterator, options) {
  if (iterator !== null && typeof iterator === 'object' && typeof options === 'undefined') {
    options = iterator;
    iterator = null;
  }

  var documents = loadDocuments(input, options);

  if (typeof iterator !== 'function') {
    return documents;
  }

  for (var index = 0, length = documents.length; index < length; index += 1) {
    iterator(documents[index]);
  }
}


function load(input, options) {
  var documents = loadDocuments(input, options);

  if (documents.length === 0) {
    /*eslint-disable no-undefined*/
    return undefined;
  } else if (documents.length === 1) {
    return documents[0];
  }
  throw new YAMLException('expected a single document in the stream, but found more');
}


function safeLoadAll(input, iterator, options) {
  if (typeof iterator === 'object' && iterator !== null && typeof options === 'undefined') {
    options = iterator;
    iterator = null;
  }

  return loadAll(input, iterator, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
}


function safeLoad(input, options) {
  return load(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
}


module.exports.loadAll     = loadAll;
module.exports.load        = load;
module.exports.safeLoadAll = safeLoadAll;
module.exports.safeLoad    = safeLoad;


/***/ }),

/***/ 21617:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";



var common = __webpack_require__(19333);


function Mark(name, buffer, position, line, column) {
  this.name     = name;
  this.buffer   = buffer;
  this.position = position;
  this.line     = line;
  this.column   = column;
}


Mark.prototype.getSnippet = function getSnippet(indent, maxLength) {
  var head, start, tail, end, snippet;

  if (!this.buffer) return null;

  indent = indent || 4;
  maxLength = maxLength || 75;

  head = '';
  start = this.position;

  while (start > 0 && '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(start - 1)) === -1) {
    start -= 1;
    if (this.position - start > (maxLength / 2 - 1)) {
      head = ' ... ';
      start += 5;
      break;
    }
  }

  tail = '';
  end = this.position;

  while (end < this.buffer.length && '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(end)) === -1) {
    end += 1;
    if (end - this.position > (maxLength / 2 - 1)) {
      tail = ' ... ';
      end -= 5;
      break;
    }
  }

  snippet = this.buffer.slice(start, end);

  return common.repeat(' ', indent) + head + snippet + tail + '\n' +
         common.repeat(' ', indent + this.position - start + head.length) + '^';
};


Mark.prototype.toString = function toString(compact) {
  var snippet, where = '';

  if (this.name) {
    where += 'in "' + this.name + '" ';
  }

  where += 'at line ' + (this.line + 1) + ', column ' + (this.column + 1);

  if (!compact) {
    snippet = this.getSnippet();

    if (snippet) {
      where += ':\n' + snippet;
    }
  }

  return where;
};


module.exports = Mark;


/***/ }),

/***/ 92915:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/*eslint-disable max-len*/

var common        = __webpack_require__(19333);
var YAMLException = __webpack_require__(9643);
var Type          = __webpack_require__(26136);


function compileList(schema, name, result) {
  var exclude = [];

  schema.include.forEach(function (includedSchema) {
    result = compileList(includedSchema, name, result);
  });

  schema[name].forEach(function (currentType) {
    result.forEach(function (previousType, previousIndex) {
      if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
        exclude.push(previousIndex);
      }
    });

    result.push(currentType);
  });

  return result.filter(function (type, index) {
    return exclude.indexOf(index) === -1;
  });
}


function compileMap(/* lists... */) {
  var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {}
      }, index, length;

  function collectType(type) {
    result[type.kind][type.tag] = result['fallback'][type.tag] = type;
  }

  for (index = 0, length = arguments.length; index < length; index += 1) {
    arguments[index].forEach(collectType);
  }
  return result;
}


function Schema(definition) {
  this.include  = definition.include  || [];
  this.implicit = definition.implicit || [];
  this.explicit = definition.explicit || [];

  this.implicit.forEach(function (type) {
    if (type.loadKind && type.loadKind !== 'scalar') {
      throw new YAMLException('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
    }
  });

  this.compiledImplicit = compileList(this, 'implicit', []);
  this.compiledExplicit = compileList(this, 'explicit', []);
  this.compiledTypeMap  = compileMap(this.compiledImplicit, this.compiledExplicit);
}


Schema.DEFAULT = null;


Schema.create = function createSchema() {
  var schemas, types;

  switch (arguments.length) {
    case 1:
      schemas = Schema.DEFAULT;
      types = arguments[0];
      break;

    case 2:
      schemas = arguments[0];
      types = arguments[1];
      break;

    default:
      throw new YAMLException('Wrong number of arguments for Schema.create function');
  }

  schemas = common.toArray(schemas);
  types = common.toArray(types);

  if (!schemas.every(function (schema) { return schema instanceof Schema; })) {
    throw new YAMLException('Specified list of super schemas (or a single Schema object) contains a non-Schema object.');
  }

  if (!types.every(function (type) { return type instanceof Type; })) {
    throw new YAMLException('Specified list of YAML types (or a single Type object) contains a non-Type object.');
  }

  return new Schema({
    include: schemas,
    explicit: types
  });
};


module.exports = Schema;


/***/ }),

/***/ 76421:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Standard YAML's Core schema.
// http://www.yaml.org/spec/1.2/spec.html#id2804923
//
// NOTE: JS-YAML does not support schema-specific tag resolution restrictions.
// So, Core schema has no distinctions from JSON schema is JS-YAML.





var Schema = __webpack_require__(92915);


module.exports = new Schema({
  include: [
    __webpack_require__(33460)
  ]
});


/***/ }),

/***/ 41413:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// JS-YAML's default schema for `load` function.
// It is not described in the YAML specification.
//
// This schema is based on JS-YAML's default safe schema and includes
// JavaScript-specific types: !!js/undefined, !!js/regexp and !!js/function.
//
// Also this schema is used as default base schema at `Schema.create` function.





var Schema = __webpack_require__(92915);


module.exports = Schema.DEFAULT = new Schema({
  include: [
    __webpack_require__(41893)
  ],
  explicit: [
    __webpack_require__(34415),
    __webpack_require__(52578),
    __webpack_require__(33611)
  ]
});


/***/ }),

/***/ 41893:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// JS-YAML's default schema for `safeLoad` function.
// It is not described in the YAML specification.
//
// This schema is based on standard YAML's Core schema and includes most of
// extra types described at YAML tag repository. (http://yaml.org/type/)





var Schema = __webpack_require__(92915);


module.exports = new Schema({
  include: [
    __webpack_require__(76421)
  ],
  implicit: [
    __webpack_require__(45803),
    __webpack_require__(61327)
  ],
  explicit: [
    __webpack_require__(10898),
    __webpack_require__(89582),
    __webpack_require__(47650),
    __webpack_require__(73707)
  ]
});


/***/ }),

/***/ 29899:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Standard YAML's Failsafe schema.
// http://www.yaml.org/spec/1.2/spec.html#id2802346





var Schema = __webpack_require__(92915);


module.exports = new Schema({
  explicit: [
    __webpack_require__(84824),
    __webpack_require__(41816),
    __webpack_require__(95757)
  ]
});


/***/ }),

/***/ 33460:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Standard YAML's JSON schema.
// http://www.yaml.org/spec/1.2/spec.html#id2803231
//
// NOTE: JS-YAML does not support schema-specific tag resolution restrictions.
// So, this schema is not such strict as defined in the YAML specification.
// It allows numbers in binary notaion, use `Null` and `NULL` as `null`, etc.





var Schema = __webpack_require__(92915);


module.exports = new Schema({
  include: [
    __webpack_require__(29899)
  ],
  implicit: [
    __webpack_require__(31930),
    __webpack_require__(54043),
    __webpack_require__(61142),
    __webpack_require__(81289)
  ]
});


/***/ }),

/***/ 26136:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var YAMLException = __webpack_require__(9643);

var TYPE_CONSTRUCTOR_OPTIONS = [
  'kind',
  'resolve',
  'construct',
  'instanceOf',
  'predicate',
  'represent',
  'defaultStyle',
  'styleAliases'
];

var YAML_NODE_KINDS = [
  'scalar',
  'sequence',
  'mapping'
];

function compileStyleAliases(map) {
  var result = {};

  if (map !== null) {
    Object.keys(map).forEach(function (style) {
      map[style].forEach(function (alias) {
        result[String(alias)] = style;
      });
    });
  }

  return result;
}

function Type(tag, options) {
  options = options || {};

  Object.keys(options).forEach(function (name) {
    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
      throw new YAMLException('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
    }
  });

  // TODO: Add tag format check.
  this.tag          = tag;
  this.kind         = options['kind']         || null;
  this.resolve      = options['resolve']      || function () { return true; };
  this.construct    = options['construct']    || function (data) { return data; };
  this.instanceOf   = options['instanceOf']   || null;
  this.predicate    = options['predicate']    || null;
  this.represent    = options['represent']    || null;
  this.defaultStyle = options['defaultStyle'] || null;
  this.styleAliases = compileStyleAliases(options['styleAliases'] || null);

  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
    throw new YAMLException('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
  }
}

module.exports = Type;


/***/ }),

/***/ 10898:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/*eslint-disable no-bitwise*/

var NodeBuffer;

try {
  // A trick for browserified version, to not include `Buffer` shim
  var _require = undefined;
  NodeBuffer = (__webpack_require__(78378).Buffer);
} catch (__) {}

var Type       = __webpack_require__(26136);


// [ 64, 65, 66 ] -> [ padding, CR, LF ]
var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';


function resolveYamlBinary(data) {
  if (data === null) return false;

  var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;

  // Convert one by one.
  for (idx = 0; idx < max; idx++) {
    code = map.indexOf(data.charAt(idx));

    // Skip CR/LF
    if (code > 64) continue;

    // Fail on illegal characters
    if (code < 0) return false;

    bitlen += 6;
  }

  // If there are any bits left, source was corrupted
  return (bitlen % 8) === 0;
}

function constructYamlBinary(data) {
  var idx, tailbits,
      input = data.replace(/[\r\n=]/g, ''), // remove CR/LF & padding to simplify scan
      max = input.length,
      map = BASE64_MAP,
      bits = 0,
      result = [];

  // Collect by 6*4 bits (3 bytes)

  for (idx = 0; idx < max; idx++) {
    if ((idx % 4 === 0) && idx) {
      result.push((bits >> 16) & 0xFF);
      result.push((bits >> 8) & 0xFF);
      result.push(bits & 0xFF);
    }

    bits = (bits << 6) | map.indexOf(input.charAt(idx));
  }

  // Dump tail

  tailbits = (max % 4) * 6;

  if (tailbits === 0) {
    result.push((bits >> 16) & 0xFF);
    result.push((bits >> 8) & 0xFF);
    result.push(bits & 0xFF);
  } else if (tailbits === 18) {
    result.push((bits >> 10) & 0xFF);
    result.push((bits >> 2) & 0xFF);
  } else if (tailbits === 12) {
    result.push((bits >> 4) & 0xFF);
  }

  // Wrap into Buffer for NodeJS and leave Array for browser
  if (NodeBuffer) {
    // Support node 6.+ Buffer API when available
    return NodeBuffer.from ? NodeBuffer.from(result) : new NodeBuffer(result);
  }

  return result;
}

function representYamlBinary(object /*, style*/) {
  var result = '', bits = 0, idx, tail,
      max = object.length,
      map = BASE64_MAP;

  // Convert every three bytes to 4 ASCII characters.

  for (idx = 0; idx < max; idx++) {
    if ((idx % 3 === 0) && idx) {
      result += map[(bits >> 18) & 0x3F];
      result += map[(bits >> 12) & 0x3F];
      result += map[(bits >> 6) & 0x3F];
      result += map[bits & 0x3F];
    }

    bits = (bits << 8) + object[idx];
  }

  // Dump tail

  tail = max % 3;

  if (tail === 0) {
    result += map[(bits >> 18) & 0x3F];
    result += map[(bits >> 12) & 0x3F];
    result += map[(bits >> 6) & 0x3F];
    result += map[bits & 0x3F];
  } else if (tail === 2) {
    result += map[(bits >> 10) & 0x3F];
    result += map[(bits >> 4) & 0x3F];
    result += map[(bits << 2) & 0x3F];
    result += map[64];
  } else if (tail === 1) {
    result += map[(bits >> 2) & 0x3F];
    result += map[(bits << 4) & 0x3F];
    result += map[64];
    result += map[64];
  }

  return result;
}

function isBinary(object) {
  return NodeBuffer && NodeBuffer.isBuffer(object);
}

module.exports = new Type('tag:yaml.org,2002:binary', {
  kind: 'scalar',
  resolve: resolveYamlBinary,
  construct: constructYamlBinary,
  predicate: isBinary,
  represent: representYamlBinary
});


/***/ }),

/***/ 54043:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(26136);

function resolveYamlBoolean(data) {
  if (data === null) return false;

  var max = data.length;

  return (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) ||
         (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'));
}

function constructYamlBoolean(data) {
  return data === 'true' ||
         data === 'True' ||
         data === 'TRUE';
}

function isBoolean(object) {
  return Object.prototype.toString.call(object) === '[object Boolean]';
}

module.exports = new Type('tag:yaml.org,2002:bool', {
  kind: 'scalar',
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean,
  represent: {
    lowercase: function (object) { return object ? 'true' : 'false'; },
    uppercase: function (object) { return object ? 'TRUE' : 'FALSE'; },
    camelcase: function (object) { return object ? 'True' : 'False'; }
  },
  defaultStyle: 'lowercase'
});


/***/ }),

/***/ 81289:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var common = __webpack_require__(19333);
var Type   = __webpack_require__(26136);

var YAML_FLOAT_PATTERN = new RegExp(
  // 2.5e4, 2.5 and integers
  '^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?' +
  // .2e4, .2
  // special case, seems not from spec
  '|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?' +
  // 20:59
  '|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*' +
  // .inf
  '|[-+]?\\.(?:inf|Inf|INF)' +
  // .nan
  '|\\.(?:nan|NaN|NAN))$');

function resolveYamlFloat(data) {
  if (data === null) return false;

  if (!YAML_FLOAT_PATTERN.test(data) ||
      // Quick hack to not allow integers end with `_`
      // Probably should update regexp & check speed
      data[data.length - 1] === '_') {
    return false;
  }

  return true;
}

function constructYamlFloat(data) {
  var value, sign, base, digits;

  value  = data.replace(/_/g, '').toLowerCase();
  sign   = value[0] === '-' ? -1 : 1;
  digits = [];

  if ('+-'.indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }

  if (value === '.inf') {
    return (sign === 1) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;

  } else if (value === '.nan') {
    return NaN;

  } else if (value.indexOf(':') >= 0) {
    value.split(':').forEach(function (v) {
      digits.unshift(parseFloat(v, 10));
    });

    value = 0.0;
    base = 1;

    digits.forEach(function (d) {
      value += d * base;
      base *= 60;
    });

    return sign * value;

  }
  return sign * parseFloat(value, 10);
}


var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;

function representYamlFloat(object, style) {
  var res;

  if (isNaN(object)) {
    switch (style) {
      case 'lowercase': return '.nan';
      case 'uppercase': return '.NAN';
      case 'camelcase': return '.NaN';
    }
  } else if (Number.POSITIVE_INFINITY === object) {
    switch (style) {
      case 'lowercase': return '.inf';
      case 'uppercase': return '.INF';
      case 'camelcase': return '.Inf';
    }
  } else if (Number.NEGATIVE_INFINITY === object) {
    switch (style) {
      case 'lowercase': return '-.inf';
      case 'uppercase': return '-.INF';
      case 'camelcase': return '-.Inf';
    }
  } else if (common.isNegativeZero(object)) {
    return '-0.0';
  }

  res = object.toString(10);

  // JS stringifier can build scientific format without dots: 5e-100,
  // while YAML requres dot: 5.e-100. Fix it with simple hack

  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace('e', '.e') : res;
}

function isFloat(object) {
  return (Object.prototype.toString.call(object) === '[object Number]') &&
         (object % 1 !== 0 || common.isNegativeZero(object));
}

module.exports = new Type('tag:yaml.org,2002:float', {
  kind: 'scalar',
  resolve: resolveYamlFloat,
  construct: constructYamlFloat,
  predicate: isFloat,
  represent: representYamlFloat,
  defaultStyle: 'lowercase'
});


/***/ }),

/***/ 61142:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var common = __webpack_require__(19333);
var Type   = __webpack_require__(26136);

function isHexCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) ||
         ((0x41/* A */ <= c) && (c <= 0x46/* F */)) ||
         ((0x61/* a */ <= c) && (c <= 0x66/* f */));
}

function isOctCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x37/* 7 */));
}

function isDecCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */));
}

function resolveYamlInteger(data) {
  if (data === null) return false;

  var max = data.length,
      index = 0,
      hasDigits = false,
      ch;

  if (!max) return false;

  ch = data[index];

  // sign
  if (ch === '-' || ch === '+') {
    ch = data[++index];
  }

  if (ch === '0') {
    // 0
    if (index + 1 === max) return true;
    ch = data[++index];

    // base 2, base 8, base 16

    if (ch === 'b') {
      // base 2
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (ch !== '0' && ch !== '1') return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }


    if (ch === 'x') {
      // base 16
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (!isHexCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }

    // base 8
    for (; index < max; index++) {
      ch = data[index];
      if (ch === '_') continue;
      if (!isOctCode(data.charCodeAt(index))) return false;
      hasDigits = true;
    }
    return hasDigits && ch !== '_';
  }

  // base 10 (except 0) or base 60

  // value should not start with `_`;
  if (ch === '_') return false;

  for (; index < max; index++) {
    ch = data[index];
    if (ch === '_') continue;
    if (ch === ':') break;
    if (!isDecCode(data.charCodeAt(index))) {
      return false;
    }
    hasDigits = true;
  }

  // Should have digits and should not end with `_`
  if (!hasDigits || ch === '_') return false;

  // if !base60 - done;
  if (ch !== ':') return true;

  // base60 almost not used, no needs to optimize
  return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
}

function constructYamlInteger(data) {
  var value = data, sign = 1, ch, base, digits = [];

  if (value.indexOf('_') !== -1) {
    value = value.replace(/_/g, '');
  }

  ch = value[0];

  if (ch === '-' || ch === '+') {
    if (ch === '-') sign = -1;
    value = value.slice(1);
    ch = value[0];
  }

  if (value === '0') return 0;

  if (ch === '0') {
    if (value[1] === 'b') return sign * parseInt(value.slice(2), 2);
    if (value[1] === 'x') return sign * parseInt(value, 16);
    return sign * parseInt(value, 8);
  }

  if (value.indexOf(':') !== -1) {
    value.split(':').forEach(function (v) {
      digits.unshift(parseInt(v, 10));
    });

    value = 0;
    base = 1;

    digits.forEach(function (d) {
      value += (d * base);
      base *= 60;
    });

    return sign * value;

  }

  return sign * parseInt(value, 10);
}

function isInteger(object) {
  return (Object.prototype.toString.call(object)) === '[object Number]' &&
         (object % 1 === 0 && !common.isNegativeZero(object));
}

module.exports = new Type('tag:yaml.org,2002:int', {
  kind: 'scalar',
  resolve: resolveYamlInteger,
  construct: constructYamlInteger,
  predicate: isInteger,
  represent: {
    binary:      function (obj) { return obj >= 0 ? '0b' + obj.toString(2) : '-0b' + obj.toString(2).slice(1); },
    octal:       function (obj) { return obj >= 0 ? '0'  + obj.toString(8) : '-0'  + obj.toString(8).slice(1); },
    decimal:     function (obj) { return obj.toString(10); },
    /* eslint-disable max-len */
    hexadecimal: function (obj) { return obj >= 0 ? '0x' + obj.toString(16).toUpperCase() :  '-0x' + obj.toString(16).toUpperCase().slice(1); }
  },
  defaultStyle: 'decimal',
  styleAliases: {
    binary:      [ 2,  'bin' ],
    octal:       [ 8,  'oct' ],
    decimal:     [ 10, 'dec' ],
    hexadecimal: [ 16, 'hex' ]
  }
});


/***/ }),

/***/ 33611:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var esprima;

// Browserified version does not have esprima
//
// 1. For node.js just require module as deps
// 2. For browser try to require mudule via external AMD system.
//    If not found - try to fallback to window.esprima. If not
//    found too - then fail to parse.
//
try {
  // workaround to exclude package from browserify list.
  var _require = undefined;
  esprima = __webpack_require__(50608);
} catch (_) {
  /* eslint-disable no-redeclare */
  /* global window */
  if (typeof window !== 'undefined') esprima = window.esprima;
}

var Type = __webpack_require__(26136);

function resolveJavascriptFunction(data) {
  if (data === null) return false;

  try {
    var source = '(' + data + ')',
        ast    = esprima.parse(source, { range: true });

    if (ast.type                    !== 'Program'             ||
        ast.body.length             !== 1                     ||
        ast.body[0].type            !== 'ExpressionStatement' ||
        (ast.body[0].expression.type !== 'ArrowFunctionExpression' &&
          ast.body[0].expression.type !== 'FunctionExpression')) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
}

function constructJavascriptFunction(data) {
  /*jslint evil:true*/

  var source = '(' + data + ')',
      ast    = esprima.parse(source, { range: true }),
      params = [],
      body;

  if (ast.type                    !== 'Program'             ||
      ast.body.length             !== 1                     ||
      ast.body[0].type            !== 'ExpressionStatement' ||
      (ast.body[0].expression.type !== 'ArrowFunctionExpression' &&
        ast.body[0].expression.type !== 'FunctionExpression')) {
    throw new Error('Failed to resolve function');
  }

  ast.body[0].expression.params.forEach(function (param) {
    params.push(param.name);
  });

  body = ast.body[0].expression.body.range;

  // Esprima's ranges include the first '{' and the last '}' characters on
  // function expressions. So cut them out.
  if (ast.body[0].expression.body.type === 'BlockStatement') {
    /*eslint-disable no-new-func*/
    return new Function(params, source.slice(body[0] + 1, body[1] - 1));
  }
  // ES6 arrow functions can omit the BlockStatement. In that case, just return
  // the body.
  /*eslint-disable no-new-func*/
  return new Function(params, 'return ' + source.slice(body[0], body[1]));
}

function representJavascriptFunction(object /*, style*/) {
  return object.toString();
}

function isFunction(object) {
  return Object.prototype.toString.call(object) === '[object Function]';
}

module.exports = new Type('tag:yaml.org,2002:js/function', {
  kind: 'scalar',
  resolve: resolveJavascriptFunction,
  construct: constructJavascriptFunction,
  predicate: isFunction,
  represent: representJavascriptFunction
});


/***/ }),

/***/ 52578:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(26136);

function resolveJavascriptRegExp(data) {
  if (data === null) return false;
  if (data.length === 0) return false;

  var regexp = data,
      tail   = /\/([gim]*)$/.exec(data),
      modifiers = '';

  // if regexp starts with '/' it can have modifiers and must be properly closed
  // `/foo/gim` - modifiers tail can be maximum 3 chars
  if (regexp[0] === '/') {
    if (tail) modifiers = tail[1];

    if (modifiers.length > 3) return false;
    // if expression starts with /, is should be properly terminated
    if (regexp[regexp.length - modifiers.length - 1] !== '/') return false;
  }

  return true;
}

function constructJavascriptRegExp(data) {
  var regexp = data,
      tail   = /\/([gim]*)$/.exec(data),
      modifiers = '';

  // `/foo/gim` - tail can be maximum 4 chars
  if (regexp[0] === '/') {
    if (tail) modifiers = tail[1];
    regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
  }

  return new RegExp(regexp, modifiers);
}

function representJavascriptRegExp(object /*, style*/) {
  var result = '/' + object.source + '/';

  if (object.global) result += 'g';
  if (object.multiline) result += 'm';
  if (object.ignoreCase) result += 'i';

  return result;
}

function isRegExp(object) {
  return Object.prototype.toString.call(object) === '[object RegExp]';
}

module.exports = new Type('tag:yaml.org,2002:js/regexp', {
  kind: 'scalar',
  resolve: resolveJavascriptRegExp,
  construct: constructJavascriptRegExp,
  predicate: isRegExp,
  represent: representJavascriptRegExp
});


/***/ }),

/***/ 34415:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(26136);

function resolveJavascriptUndefined() {
  return true;
}

function constructJavascriptUndefined() {
  /*eslint-disable no-undefined*/
  return undefined;
}

function representJavascriptUndefined() {
  return '';
}

function isUndefined(object) {
  return typeof object === 'undefined';
}

module.exports = new Type('tag:yaml.org,2002:js/undefined', {
  kind: 'scalar',
  resolve: resolveJavascriptUndefined,
  construct: constructJavascriptUndefined,
  predicate: isUndefined,
  represent: representJavascriptUndefined
});


/***/ }),

/***/ 95757:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(26136);

module.exports = new Type('tag:yaml.org,2002:map', {
  kind: 'mapping',
  construct: function (data) { return data !== null ? data : {}; }
});


/***/ }),

/***/ 61327:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(26136);

function resolveYamlMerge(data) {
  return data === '<<' || data === null;
}

module.exports = new Type('tag:yaml.org,2002:merge', {
  kind: 'scalar',
  resolve: resolveYamlMerge
});


/***/ }),

/***/ 31930:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(26136);

function resolveYamlNull(data) {
  if (data === null) return true;

  var max = data.length;

  return (max === 1 && data === '~') ||
         (max === 4 && (data === 'null' || data === 'Null' || data === 'NULL'));
}

function constructYamlNull() {
  return null;
}

function isNull(object) {
  return object === null;
}

module.exports = new Type('tag:yaml.org,2002:null', {
  kind: 'scalar',
  resolve: resolveYamlNull,
  construct: constructYamlNull,
  predicate: isNull,
  represent: {
    canonical: function () { return '~';    },
    lowercase: function () { return 'null'; },
    uppercase: function () { return 'NULL'; },
    camelcase: function () { return 'Null'; }
  },
  defaultStyle: 'lowercase'
});


/***/ }),

/***/ 89582:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(26136);

var _hasOwnProperty = Object.prototype.hasOwnProperty;
var _toString       = Object.prototype.toString;

function resolveYamlOmap(data) {
  if (data === null) return true;

  var objectKeys = [], index, length, pair, pairKey, pairHasKey,
      object = data;

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    pairHasKey = false;

    if (_toString.call(pair) !== '[object Object]') return false;

    for (pairKey in pair) {
      if (_hasOwnProperty.call(pair, pairKey)) {
        if (!pairHasKey) pairHasKey = true;
        else return false;
      }
    }

    if (!pairHasKey) return false;

    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
    else return false;
  }

  return true;
}

function constructYamlOmap(data) {
  return data !== null ? data : [];
}

module.exports = new Type('tag:yaml.org,2002:omap', {
  kind: 'sequence',
  resolve: resolveYamlOmap,
  construct: constructYamlOmap
});


/***/ }),

/***/ 47650:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(26136);

var _toString = Object.prototype.toString;

function resolveYamlPairs(data) {
  if (data === null) return true;

  var index, length, pair, keys, result,
      object = data;

  result = new Array(object.length);

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];

    if (_toString.call(pair) !== '[object Object]') return false;

    keys = Object.keys(pair);

    if (keys.length !== 1) return false;

    result[index] = [ keys[0], pair[keys[0]] ];
  }

  return true;
}

function constructYamlPairs(data) {
  if (data === null) return [];

  var index, length, pair, keys, result,
      object = data;

  result = new Array(object.length);

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];

    keys = Object.keys(pair);

    result[index] = [ keys[0], pair[keys[0]] ];
  }

  return result;
}

module.exports = new Type('tag:yaml.org,2002:pairs', {
  kind: 'sequence',
  resolve: resolveYamlPairs,
  construct: constructYamlPairs
});


/***/ }),

/***/ 41816:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(26136);

module.exports = new Type('tag:yaml.org,2002:seq', {
  kind: 'sequence',
  construct: function (data) { return data !== null ? data : []; }
});


/***/ }),

/***/ 73707:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(26136);

var _hasOwnProperty = Object.prototype.hasOwnProperty;

function resolveYamlSet(data) {
  if (data === null) return true;

  var key, object = data;

  for (key in object) {
    if (_hasOwnProperty.call(object, key)) {
      if (object[key] !== null) return false;
    }
  }

  return true;
}

function constructYamlSet(data) {
  return data !== null ? data : {};
}

module.exports = new Type('tag:yaml.org,2002:set', {
  kind: 'mapping',
  resolve: resolveYamlSet,
  construct: constructYamlSet
});


/***/ }),

/***/ 84824:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(26136);

module.exports = new Type('tag:yaml.org,2002:str', {
  kind: 'scalar',
  construct: function (data) { return data !== null ? data : ''; }
});


/***/ }),

/***/ 45803:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(26136);

var YAML_DATE_REGEXP = new RegExp(
  '^([0-9][0-9][0-9][0-9])'          + // [1] year
  '-([0-9][0-9])'                    + // [2] month
  '-([0-9][0-9])$');                   // [3] day

var YAML_TIMESTAMP_REGEXP = new RegExp(
  '^([0-9][0-9][0-9][0-9])'          + // [1] year
  '-([0-9][0-9]?)'                   + // [2] month
  '-([0-9][0-9]?)'                   + // [3] day
  '(?:[Tt]|[ \\t]+)'                 + // ...
  '([0-9][0-9]?)'                    + // [4] hour
  ':([0-9][0-9])'                    + // [5] minute
  ':([0-9][0-9])'                    + // [6] second
  '(?:\\.([0-9]*))?'                 + // [7] fraction
  '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + // [8] tz [9] tz_sign [10] tz_hour
  '(?::([0-9][0-9]))?))?$');           // [11] tz_minute

function resolveYamlTimestamp(data) {
  if (data === null) return false;
  if (YAML_DATE_REGEXP.exec(data) !== null) return true;
  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
  return false;
}

function constructYamlTimestamp(data) {
  var match, year, month, day, hour, minute, second, fraction = 0,
      delta = null, tz_hour, tz_minute, date;

  match = YAML_DATE_REGEXP.exec(data);
  if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);

  if (match === null) throw new Error('Date resolve error');

  // match: [1] year [2] month [3] day

  year = +(match[1]);
  month = +(match[2]) - 1; // JS month starts with 0
  day = +(match[3]);

  if (!match[4]) { // no hour
    return new Date(Date.UTC(year, month, day));
  }

  // match: [4] hour [5] minute [6] second [7] fraction

  hour = +(match[4]);
  minute = +(match[5]);
  second = +(match[6]);

  if (match[7]) {
    fraction = match[7].slice(0, 3);
    while (fraction.length < 3) { // milli-seconds
      fraction += '0';
    }
    fraction = +fraction;
  }

  // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute

  if (match[9]) {
    tz_hour = +(match[10]);
    tz_minute = +(match[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
    if (match[9] === '-') delta = -delta;
  }

  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));

  if (delta) date.setTime(date.getTime() - delta);

  return date;
}

function representYamlTimestamp(object /*, style*/) {
  return object.toISOString();
}

module.exports = new Type('tag:yaml.org,2002:timestamp', {
  kind: 'scalar',
  resolve: resolveYamlTimestamp,
  construct: constructYamlTimestamp,
  instanceOf: Date,
  represent: representYamlTimestamp
});


/***/ }),

/***/ 13066:
/***/ ((module) => {

"use strict";


/** Highest positive signed 32-bit float value */
const maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

/** Bootstring parameters */
const base = 36;
const tMin = 1;
const tMax = 26;
const skew = 38;
const damp = 700;
const initialBias = 72;
const initialN = 128; // 0x80
const delimiter = '-'; // '\x2D'

/** Regular expressions */
const regexPunycode = /^xn--/;
const regexNonASCII = /[^\0-\x7F]/; // Note: U+007F DEL is excluded too.
const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

/** Error messages */
const errors = {
	'overflow': 'Overflow: input needs wider integers to process',
	'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
	'invalid-input': 'Invalid input'
};

/** Convenience shortcuts */
const baseMinusTMin = base - tMin;
const floor = Math.floor;
const stringFromCharCode = String.fromCharCode;

/*--------------------------------------------------------------------------*/

/**
 * A generic error utility function.
 * @private
 * @param {String} type The error type.
 * @returns {Error} Throws a `RangeError` with the applicable error message.
 */
function error(type) {
	throw new RangeError(errors[type]);
}

/**
 * A generic `Array#map` utility function.
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} callback The function that gets called for every array
 * item.
 * @returns {Array} A new array of values returned by the callback function.
 */
function map(array, callback) {
	const result = [];
	let length = array.length;
	while (length--) {
		result[length] = callback(array[length]);
	}
	return result;
}

/**
 * A simple `Array#map`-like wrapper to work with domain name strings or email
 * addresses.
 * @private
 * @param {String} domain The domain name or email address.
 * @param {Function} callback The function that gets called for every
 * character.
 * @returns {String} A new string of characters returned by the callback
 * function.
 */
function mapDomain(domain, callback) {
	const parts = domain.split('@');
	let result = '';
	if (parts.length > 1) {
		// In email addresses, only the domain name should be punycoded. Leave
		// the local part (i.e. everything up to `@`) intact.
		result = parts[0] + '@';
		domain = parts[1];
	}
	// Avoid `split(regex)` for IE8 compatibility. See #17.
	domain = domain.replace(regexSeparators, '\x2E');
	const labels = domain.split('.');
	const encoded = map(labels, callback).join('.');
	return result + encoded;
}

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 * @see `punycode.ucs2.encode`
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode.ucs2
 * @name decode
 * @param {String} string The Unicode input string (UCS-2).
 * @returns {Array} The new array of code points.
 */
function ucs2decode(string) {
	const output = [];
	let counter = 0;
	const length = string.length;
	while (counter < length) {
		const value = string.charCodeAt(counter++);
		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
			// It's a high surrogate, and there is a next character.
			const extra = string.charCodeAt(counter++);
			if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
			} else {
				// It's an unmatched surrogate; only append this code unit, in case the
				// next code unit is the high surrogate of a surrogate pair.
				output.push(value);
				counter--;
			}
		} else {
			output.push(value);
		}
	}
	return output;
}

/**
 * Creates a string based on an array of numeric code points.
 * @see `punycode.ucs2.decode`
 * @memberOf punycode.ucs2
 * @name encode
 * @param {Array} codePoints The array of numeric code points.
 * @returns {String} The new Unicode string (UCS-2).
 */
const ucs2encode = codePoints => String.fromCodePoint(...codePoints);

/**
 * Converts a basic code point into a digit/integer.
 * @see `digitToBasic()`
 * @private
 * @param {Number} codePoint The basic numeric code point value.
 * @returns {Number} The numeric value of a basic code point (for use in
 * representing integers) in the range `0` to `base - 1`, or `base` if
 * the code point does not represent a value.
 */
const basicToDigit = function(codePoint) {
	if (codePoint >= 0x30 && codePoint < 0x3A) {
		return 26 + (codePoint - 0x30);
	}
	if (codePoint >= 0x41 && codePoint < 0x5B) {
		return codePoint - 0x41;
	}
	if (codePoint >= 0x61 && codePoint < 0x7B) {
		return codePoint - 0x61;
	}
	return base;
};

/**
 * Converts a digit/integer into a basic code point.
 * @see `basicToDigit()`
 * @private
 * @param {Number} digit The numeric value of a basic code point.
 * @returns {Number} The basic code point whose value (when used for
 * representing integers) is `digit`, which needs to be in the range
 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
 * used; else, the lowercase form is used. The behavior is undefined
 * if `flag` is non-zero and `digit` has no uppercase form.
 */
const digitToBasic = function(digit, flag) {
	//  0..25 map to ASCII a..z or A..Z
	// 26..35 map to ASCII 0..9
	return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 * @private
 */
const adapt = function(delta, numPoints, firstTime) {
	let k = 0;
	delta = firstTime ? floor(delta / damp) : delta >> 1;
	delta += floor(delta / numPoints);
	for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
		delta = floor(delta / baseMinusTMin);
	}
	return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
 * symbols.
 * @memberOf punycode
 * @param {String} input The Punycode string of ASCII-only symbols.
 * @returns {String} The resulting string of Unicode symbols.
 */
const decode = function(input) {
	// Don't use UCS-2.
	const output = [];
	const inputLength = input.length;
	let i = 0;
	let n = initialN;
	let bias = initialBias;

	// Handle the basic code points: let `basic` be the number of input code
	// points before the last delimiter, or `0` if there is none, then copy
	// the first basic code points to the output.

	let basic = input.lastIndexOf(delimiter);
	if (basic < 0) {
		basic = 0;
	}

	for (let j = 0; j < basic; ++j) {
		// if it's not a basic code point
		if (input.charCodeAt(j) >= 0x80) {
			error('not-basic');
		}
		output.push(input.charCodeAt(j));
	}

	// Main decoding loop: start just after the last delimiter if any basic code
	// points were copied; start at the beginning otherwise.

	for (let index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

		// `index` is the index of the next character to be consumed.
		// Decode a generalized variable-length integer into `delta`,
		// which gets added to `i`. The overflow checking is easier
		// if we increase `i` as we go, then subtract off its starting
		// value at the end to obtain `delta`.
		const oldi = i;
		for (let w = 1, k = base; /* no condition */; k += base) {

			if (index >= inputLength) {
				error('invalid-input');
			}

			const digit = basicToDigit(input.charCodeAt(index++));

			if (digit >= base) {
				error('invalid-input');
			}
			if (digit > floor((maxInt - i) / w)) {
				error('overflow');
			}

			i += digit * w;
			const t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

			if (digit < t) {
				break;
			}

			const baseMinusT = base - t;
			if (w > floor(maxInt / baseMinusT)) {
				error('overflow');
			}

			w *= baseMinusT;

		}

		const out = output.length + 1;
		bias = adapt(i - oldi, out, oldi == 0);

		// `i` was supposed to wrap around from `out` to `0`,
		// incrementing `n` each time, so we'll fix that now:
		if (floor(i / out) > maxInt - n) {
			error('overflow');
		}

		n += floor(i / out);
		i %= out;

		// Insert `n` at position `i` of the output.
		output.splice(i++, 0, n);

	}

	return String.fromCodePoint(...output);
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 * @memberOf punycode
 * @param {String} input The string of Unicode symbols.
 * @returns {String} The resulting Punycode string of ASCII-only symbols.
 */
const encode = function(input) {
	const output = [];

	// Convert the input in UCS-2 to an array of Unicode code points.
	input = ucs2decode(input);

	// Cache the length.
	const inputLength = input.length;

	// Initialize the state.
	let n = initialN;
	let delta = 0;
	let bias = initialBias;

	// Handle the basic code points.
	for (const currentValue of input) {
		if (currentValue < 0x80) {
			output.push(stringFromCharCode(currentValue));
		}
	}

	const basicLength = output.length;
	let handledCPCount = basicLength;

	// `handledCPCount` is the number of code points that have been handled;
	// `basicLength` is the number of basic code points.

	// Finish the basic string with a delimiter unless it's empty.
	if (basicLength) {
		output.push(delimiter);
	}

	// Main encoding loop:
	while (handledCPCount < inputLength) {

		// All non-basic code points < n have been handled already. Find the next
		// larger one:
		let m = maxInt;
		for (const currentValue of input) {
			if (currentValue >= n && currentValue < m) {
				m = currentValue;
			}
		}

		// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
		// but guard against overflow.
		const handledCPCountPlusOne = handledCPCount + 1;
		if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
			error('overflow');
		}

		delta += (m - n) * handledCPCountPlusOne;
		n = m;

		for (const currentValue of input) {
			if (currentValue < n && ++delta > maxInt) {
				error('overflow');
			}
			if (currentValue === n) {
				// Represent delta as a generalized variable-length integer.
				let q = delta;
				for (let k = base; /* no condition */; k += base) {
					const t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
					if (q < t) {
						break;
					}
					const qMinusT = q - t;
					const baseMinusT = base - t;
					output.push(
						stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
					);
					q = floor(qMinusT / baseMinusT);
				}

				output.push(stringFromCharCode(digitToBasic(q, 0)));
				bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
				delta = 0;
				++handledCPCount;
			}
		}

		++delta;
		++n;

	}
	return output.join('');
};

/**
 * Converts a Punycode string representing a domain name or an email address
 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
 * it doesn't matter if you call it on a string that has already been
 * converted to Unicode.
 * @memberOf punycode
 * @param {String} input The Punycoded domain name or email address to
 * convert to Unicode.
 * @returns {String} The Unicode representation of the given Punycode
 * string.
 */
const toUnicode = function(input) {
	return mapDomain(input, function(string) {
		return regexPunycode.test(string)
			? decode(string.slice(4).toLowerCase())
			: string;
	});
};

/**
 * Converts a Unicode string representing a domain name or an email address to
 * Punycode. Only the non-ASCII parts of the domain name will be converted,
 * i.e. it doesn't matter if you call it with a domain that's already in
 * ASCII.
 * @memberOf punycode
 * @param {String} input The domain name or email address to convert, as a
 * Unicode string.
 * @returns {String} The Punycode representation of the given domain name or
 * email address.
 */
const toASCII = function(input) {
	return mapDomain(input, function(string) {
		return regexNonASCII.test(string)
			? 'xn--' + encode(string)
			: string;
	});
};

/*--------------------------------------------------------------------------*/

/** Define the public API */
const punycode = {
	/**
	 * A string representing the current Punycode.js version number.
	 * @memberOf punycode
	 * @type String
	 */
	'version': '2.3.1',
	/**
	 * An object of methods to convert from JavaScript's internal character
	 * representation (UCS-2) to Unicode code points, and back.
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode
	 * @type Object
	 */
	'ucs2': {
		'decode': ucs2decode,
		'encode': ucs2encode
	},
	'decode': decode,
	'encode': encode,
	'toASCII': toASCII,
	'toUnicode': toUnicode
};

module.exports = punycode;


/***/ }),

/***/ 10266:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Redirects),
/* harmony export */   E: () => (/* binding */ getRedirectFilename)
/* harmony export */ });
/* harmony import */ var js_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(97420);


function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
  } : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}

var getErrorMessage = function getErrorMessage(error) {
  var isErrorWithMessage = function isErrorWithMessage(e) {
    return typeof e === "object" && e !== null && "message" in e && typeof e.message === "string";
  };
  if (isErrorWithMessage(error)) {
    return error.message;
  }
  try {
    return new Error(JSON.stringify(error)).message;
  } catch (_unused) {
    return new Error(String(error)).message;
  }
};

function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter((function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    }))), t.push.apply(t, o);
  }
  return t;
}

function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach((function(r) {
      _defineProperty(e, r, t[r]);
    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach((function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    }));
  }
  return e;
}

class Redirects {
  constructor(rawYaml) {
    try {
      var arrOfRedirects = js_yaml__WEBPACK_IMPORTED_MODULE_0__.safeLoad(rawYaml);
      this.redirects = arrOfRedirects.reduce((function(acc, redirect) {
        return _objectSpread(_objectSpread({}, acc), {}, {
          [redirect.title]: redirect
        });
      }), {});
    } catch (e) {
      console.log(`Unable to load YAML into JavaScript: ${getErrorMessage(e)}`);
      throw e;
    }
  }
  getRedirect(title) {
    var _this = this;
    if (Object.prototype.hasOwnProperty.call(this.redirects, title)) {
      return this.redirects[title];
    }
    var values = Object.keys(this.redirects).map((function(key) {
      return _this.redirects[key];
    }));
    return values.find((function(redirect) {
      var {aliases: aliases} = redirect;
      if (!aliases) {
        return false;
      }
      return aliases.includes(title);
    }));
  }
  isBlocking(title) {
    var redirect = this.redirects[title];
    if (redirect) {
      return !!redirect.isBlocking;
    }
    return false;
  }
}

var redirectsMap = {
  "1x1-transparent.gif": "1x1-transparent.gif",
  "1x1.gif": "1x1-transparent.gif",
  "1x1-transparent-gif": "1x1-transparent.gif",
  "2x2-transparent.png": "2x2-transparent.png",
  "2x2.png": "2x2-transparent.png",
  "2x2-transparent-png": "2x2-transparent.png",
  "3x2-transparent.png": "3x2-transparent.png",
  "3x2.png": "3x2-transparent.png",
  "3x2-transparent-png": "3x2-transparent.png",
  "32x32-transparent.png": "32x32-transparent.png",
  "32x32.png": "32x32-transparent.png",
  "32x32-transparent-png": "32x32-transparent.png",
  noopframe: "noopframe.html",
  "noop.html": "noopframe.html",
  "blank-html": "noopframe.html",
  noopcss: "noopcss.css",
  "noop.css": "noopcss.css",
  "blank-css": "noopcss.css",
  noopjs: "noopjs.js",
  "noop.js": "noopjs.js",
  "blank-js": "noopjs.js",
  noopjson: "noopjson.json",
  "noop.json": "noopjson.json",
  nooptext: "nooptext.js",
  "noop.txt": "nooptext.js",
  "blank-text": "nooptext.js",
  empty: "nooptext.js",
  "noopvmap-1.0": "noopvmap01.xml",
  "noop-vmap1.xml": "noopvmap01.xml",
  "noop-vmap1.0.xml": "noopvmap01.xml",
  "noopvast-2.0": "noopvast02.xml",
  "noop-vast2.xml": "noopvast02.xml",
  "noopvast-3.0": "noopvast03.xml",
  "noop-vast3.xml": "noopvast03.xml",
  "noopvast-4.0": "noopvast04.xml",
  "noop-vast4.xml": "noopvast04.xml",
  "noopmp3-0.1s": "noopmp3.mp3",
  "blank-mp3": "noopmp3.mp3",
  "noopmp4-1s": "noopmp4.mp4",
  "noop-1s.mp4": "noopmp4.mp4",
  "blank-mp4": "noopmp4.mp4",
  "click2load.html": "click2load.html",
  "ubo-click2load.html": "click2load.html",
  "amazon-apstag": "amazon-apstag.js",
  "ubo-amazon_apstag.js": "amazon-apstag.js",
  "amazon_apstag.js": "amazon-apstag.js",
  "ati-smarttag": "ati-smarttag.js",
  "didomi-loader": "didomi-loader.js",
  fingerprintjs2: "fingerprintjs2.js",
  "ubo-fingerprint2.js": "fingerprintjs2.js",
  "fingerprint2.js": "fingerprintjs2.js",
  fingerprintjs3: "fingerprintjs3.js",
  "ubo-fingerprint3.js": "fingerprintjs3.js",
  "fingerprint3.js": "fingerprintjs3.js",
  gemius: "gemius.js",
  "google-analytics-ga": "google-analytics-ga.js",
  "ubo-google-analytics_ga.js": "google-analytics-ga.js",
  "google-analytics_ga.js": "google-analytics-ga.js",
  "google-analytics": "google-analytics.js",
  "ubo-google-analytics_analytics.js": "google-analytics.js",
  "google-analytics_analytics.js": "google-analytics.js",
  "googletagmanager-gtm": "google-analytics.js",
  "ubo-googletagmanager_gtm.js": "google-analytics.js",
  "googletagmanager_gtm.js": "google-analytics.js",
  "google-ima3": "google-ima3.js",
  "ubo-google-ima.js": "google-ima3.js",
  "google-ima.js": "google-ima3.js",
  "googlesyndication-adsbygoogle": "googlesyndication-adsbygoogle.js",
  "ubo-googlesyndication_adsbygoogle.js": "googlesyndication-adsbygoogle.js",
  "googlesyndication_adsbygoogle.js": "googlesyndication-adsbygoogle.js",
  "googletagservices-gpt": "googletagservices-gpt.js",
  "ubo-googletagservices_gpt.js": "googletagservices-gpt.js",
  "googletagservices_gpt.js": "googletagservices-gpt.js",
  matomo: "matomo.js",
  "metrika-yandex-tag": "metrika-yandex-tag.js",
  "metrika-yandex-watch": "metrika-yandex-watch.js",
  "naver-wcslog": "naver-wcslog.js",
  noeval: "noeval.js",
  "noeval.js": "noeval.js",
  "silent-noeval.js": "noeval.js",
  "ubo-noeval.js": "noeval.js",
  "ubo-silent-noeval.js": "noeval.js",
  "ubo-noeval": "noeval.js",
  "ubo-silent-noeval": "noeval.js",
  "pardot-1.0": "pardot-1.0.js",
  "prebid-ads": "prebid-ads.js",
  "ubo-prebid-ads.js": "prebid-ads.js",
  "prebid-ads.js": "prebid-ads.js",
  prebid: "prebid.js",
  "prevent-bab": "prevent-bab.js",
  "nobab.js": "prevent-bab.js",
  "ubo-nobab.js": "prevent-bab.js",
  "bab-defuser.js": "prevent-bab.js",
  "ubo-bab-defuser.js": "prevent-bab.js",
  "ubo-nobab": "prevent-bab.js",
  "ubo-bab-defuser": "prevent-bab.js",
  "prevent-bab2": "prevent-bab2.js",
  "nobab2.js": "prevent-bab2.js",
  "prevent-fab-3.2.0": "prevent-fab-3.2.0.js",
  "nofab.js": "prevent-fab-3.2.0.js",
  "ubo-nofab.js": "prevent-fab-3.2.0.js",
  "fuckadblock.js-3.2.0": "prevent-fab-3.2.0.js",
  "ubo-fuckadblock.js-3.2.0": "prevent-fab-3.2.0.js",
  "ubo-nofab": "prevent-fab-3.2.0.js",
  "prevent-popads-net": "prevent-popads-net.js",
  "popads.net.js": "prevent-popads-net.js",
  "ubo-popads.net.js": "prevent-popads-net.js",
  "ubo-popads.net": "prevent-popads-net.js",
  "scorecardresearch-beacon": "scorecardresearch-beacon.js",
  "ubo-scorecardresearch_beacon.js": "scorecardresearch-beacon.js",
  "scorecardresearch_beacon.js": "scorecardresearch-beacon.js",
  "set-popads-dummy": "set-popads-dummy.js",
  "popads-dummy.js": "set-popads-dummy.js",
  "ubo-popads-dummy.js": "set-popads-dummy.js",
  "ubo-popads-dummy": "set-popads-dummy.js"
};

var getRedirectFilename = function getRedirectFilename(name) {
  return redirectsMap[name];
};




/***/ }),

/***/ 68674:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JK: () => (/* binding */ RuleActionType)
/* harmony export */ });
/* unused harmony exports DECLARATIVE_REQUEST_METHOD_MAP, DECLARATIVE_RESOURCE_TYPES_MAP, DeclarativeFilterConverter, DeclarativeRuleValidator, DomainType, EmptyOrNegativeNumberOfRulesError, EmptyResourcesError, Filter, HeaderOperation, IndexedNetworkRuleWithHash, InvalidDeclarativeRuleError, METADATA_RULESET_ID, MaxScannedRulesError, MetadataRuleSet, NegativeNumberOfRulesError, RULESET_NAME_PREFIX, RequestMethod, ResourceType, ResourcesPathError, RuleSet, RulesHashMap, SourceMap, TooManyRegexpRulesError, TooManyRulesError, TooManyUnsafeRulesError, UnavailableFilterSourceError, UnavailableRuleSetSourceError, UnsupportedModifierError, UnsupportedRegexpError */
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3290);
/* harmony import */ var zod_validation_error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(93300);
/* harmony import */ var _adguard_agtree_parser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(10360);
/* harmony import */ var _adguard_agtree_parser__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(29081);
/* harmony import */ var _adguard_agtree_generator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(44621);
/* harmony import */ var _adguard_agtree_generator__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(96823);
/* harmony import */ var _adguard_agtree_converter__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(88612);
/* harmony import */ var cidr_tools__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(47562);
/* harmony import */ var is_cidr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32537);
/* harmony import */ var is_ip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(85183);
/* harmony import */ var tldts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13548);
/* harmony import */ var _adguard_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(52421);
/* harmony import */ var _adguard_scriptlets_validators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(39770);
/* harmony import */ var _adguard_agtree__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(10989);
/* harmony import */ var _adguard_agtree__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(67004);
/* harmony import */ var _adguard_agtree__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(56040);
/* harmony import */ var _adguard_agtree__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(14040);
/* harmony import */ var _adguard_agtree__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(83061);
/* harmony import */ var _adguard_agtree__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(71455);
/* harmony import */ var _adguard_agtree_utils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(44271);
/* harmony import */ var _adguard_scriptlets__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(94784);
/* harmony import */ var _adguard_css_tokenizer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(25651);
/* harmony import */ var punycode_punycode_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13066);
/* harmony import */ var _adguard_scriptlets_redirects__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(10266);




















/**
 * Checks if error has message.
 *
 * @param error Error object.
 *
 * @returns If param is error.
 */
function isErrorWithMessage(error) {
    return (typeof error === 'object'
        && error !== null
        && 'message' in error
        && typeof error.message === 'string');
}
/**
 * Converts error to the error with message.
 *
 * @param maybeError Possible error.
 *
 * @returns Error with message.
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
        // like with circular references for example.
        return new Error(String(maybeError));
    }
}
/**
 * Converts error object to error with message. This method might be helpful to handle thrown errors.
 *
 * @param error Error object.
 *
 * @returns Message of the error.
 */
function getErrorMessage(error) {
    // Special case: pretty print Zod errors
    if (error instanceof zod__WEBPACK_IMPORTED_MODULE_6__/* .ZodError */ .G) {
        return (0,zod_validation_error__WEBPACK_IMPORTED_MODULE_7__/* .fromZodError */ .yu)(error).toString();
    }
    return toErrorWithMessage(error).message;
}

/**
 * RequestType is the request types enumeration.
 * Important: the enumeration is marked as const to avoid side effects when
 * importing it into an extension.
 */
const RequestType = {
    /**
     * No value is set. Syntax sugar to simplify code.
     */
    NotSet: 0,
    /**
     * Main frame.
     */
    Document: 1,
    /**
     * (iframe) $subdocument.
     */
    SubDocument: 2, // 1 << 1
    /**
     * (javascript, etc) $script.
     */
    Script: 4, // 1 << 2
    /**
     * (css) $stylesheet.
     */
    Stylesheet: 8, // 1 << 3
    /**
     * (flash, etc) $object.
     */
    Object: 16, // 1 << 4
    /**
     * (any image) $image.
     */
    Image: 32, // 1 << 5
    /**
     * (ajax/fetch) $xmlhttprequest.
     */
    XmlHttpRequest: 64, // 1 << 6
    /**
     * (video/music) $media.
     */
    Media: 128, // 1 << 7
    /**
     * (any custom font) $font.
     */
    Font: 256, // 1 << 8
    /**
     * (a websocket connection) $websocket.
     */
    WebSocket: 512, // 1 << 9
    /**
     * (navigator.sendBeacon()) $ping.
     */
    Ping: 1024, // 1 << 10
    /**
     * Csp_report.
     */
    CspReport: 2048, // 1 << 11
    /**
     * Any other request type.
     */
    Other: 4096, // 1 << 12
};

var HTTPMethod;
(function (HTTPMethod) {
    HTTPMethod["GET"] = "GET";
    HTTPMethod["POST"] = "POST";
    HTTPMethod["PUT"] = "PUT";
    HTTPMethod["DELETE"] = "DELETE";
    HTTPMethod["PATCH"] = "PATCH";
    HTTPMethod["HEAD"] = "HEAD";
    HTTPMethod["OPTIONS"] = "OPTIONS";
    HTTPMethod["CONNECT"] = "CONNECT";
    HTTPMethod["TRACE"] = "TRACE";
})(HTTPMethod || (HTTPMethod = {}));
/**
 * Method modifier class.
 * Rules with $method modifier will be applied only to requests with specified methods.
 *
 * @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#method-modifier}
 */
class MethodModifier {
    /**
     * Request methods separator.
     */
    static PIPE_SEPARATOR = '|';
    /**
     * List of permitted methods or null.
     */
    permittedValues;
    /**
     * List of restricted methods or null.
     */
    restrictedValues;
    /**
     * Constructor.
     *
     * @param methodsStr Value of the modifier.
     */
    constructor(methodsStr) {
        if (methodsStr === '') {
            throw new SyntaxError('$method modifier value cannot be empty');
        }
        const permittedMethods = [];
        const restrictedMethods = [];
        const parts = methodsStr.toUpperCase().split(MethodModifier.PIPE_SEPARATOR);
        for (let i = 0; i < parts.length; i += 1) {
            let method = parts[i].trim();
            let restricted = false;
            if (method.startsWith('~')) {
                restricted = true;
                method = method.substring(1);
            }
            if (!MethodModifier.isHTTPMethod(method)) {
                throw new SyntaxError(`Invalid $method modifier value: ${method}`);
            }
            if (restricted) {
                restrictedMethods.push(method);
            }
            else {
                permittedMethods.push(method);
            }
        }
        if (restrictedMethods.length > 0 && permittedMethods.length > 0) {
            throw new SyntaxError(`Negated values cannot be mixed with non-negated values: ${methodsStr}`);
        }
        this.restrictedValues = restrictedMethods.length > 0 ? restrictedMethods : null;
        this.permittedValues = permittedMethods.length > 0 ? permittedMethods : null;
    }
    /**
     * Checks if the value is a valid HTTP method.
     *
     * @param value Value to check.
     *
     * @returns True if the value is a valid HTTP method, otherwise false.
     */
    static isHTTPMethod = (value) => value in HTTPMethod;
}

/* eslint-disable jsdoc/require-description-complete-sentence */
/**
 * @file Describes types from declarativeNetRequest,
 * since @types/chrome does not contain actual information.
 *
 * Updated 07/09/2022.
 */
/**
 * https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-DomainType
 */
var DomainType;
(function (DomainType) {
    DomainType["FirstParty"] = "firstParty";
    DomainType["ThirdParty"] = "thirdParty";
})(DomainType || (DomainType = {}));
/**
 * https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-ResourceType
 */
var ResourceType;
(function (ResourceType) {
    ResourceType["MainFrame"] = "main_frame";
    ResourceType["SubFrame"] = "sub_frame";
    ResourceType["Stylesheet"] = "stylesheet";
    ResourceType["Script"] = "script";
    ResourceType["Image"] = "image";
    ResourceType["Font"] = "font";
    ResourceType["Object"] = "object";
    ResourceType["XmlHttpRequest"] = "xmlhttprequest";
    ResourceType["Ping"] = "ping";
    ResourceType["Media"] = "media";
    ResourceType["WebSocket"] = "websocket";
    ResourceType["Other"] = "other";
    // Temporary not using
    // TODO: Add csp_report handler similar to AG-24613 but in declarative way.
    // CspReport = 'csp_report',
    // WebTransport = 'webtransport',
    // WebBundle = 'webbundle',
})(ResourceType || (ResourceType = {}));
/**
 * https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-QueryKeyValue
 */
const QueryKeyValueValidator = zod__WEBPACK_IMPORTED_MODULE_6__.z.strictObject({
    key: zod__WEBPACK_IMPORTED_MODULE_6__.z.string(),
    replaceOnly: zod__WEBPACK_IMPORTED_MODULE_6__.z.boolean().optional(),
    value: zod__WEBPACK_IMPORTED_MODULE_6__.z.string(),
});
/**
 * https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-QueryTransform
 */
const QueryTransformValidator = zod__WEBPACK_IMPORTED_MODULE_6__.z.strictObject({
    addOrReplaceParams: QueryKeyValueValidator.array().optional(),
    removeParams: zod__WEBPACK_IMPORTED_MODULE_6__.z.string().array().optional(),
});
/**
 * https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-URLTransform
 */
const URLTransformValidator = zod__WEBPACK_IMPORTED_MODULE_6__.z.strictObject({
    fragment: zod__WEBPACK_IMPORTED_MODULE_6__.z.string().optional(),
    host: zod__WEBPACK_IMPORTED_MODULE_6__.z.string().optional(),
    password: zod__WEBPACK_IMPORTED_MODULE_6__.z.string().optional(),
    path: zod__WEBPACK_IMPORTED_MODULE_6__.z.string().optional(),
    port: zod__WEBPACK_IMPORTED_MODULE_6__.z.string().optional(),
    query: zod__WEBPACK_IMPORTED_MODULE_6__.z.string().optional(),
    queryTransform: QueryTransformValidator.optional(),
    scheme: zod__WEBPACK_IMPORTED_MODULE_6__.z.string().optional(),
    username: zod__WEBPACK_IMPORTED_MODULE_6__.z.string().optional(),
});
/**
 * https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-Redirect
 */
const RedirectValidator = zod__WEBPACK_IMPORTED_MODULE_6__.z.strictObject({
    extensionPath: zod__WEBPACK_IMPORTED_MODULE_6__.z.string().optional(),
    regexSubstitution: zod__WEBPACK_IMPORTED_MODULE_6__.z.string().optional(),
    transform: URLTransformValidator.optional(),
    url: zod__WEBPACK_IMPORTED_MODULE_6__.z.string().optional(),
});
/**
 * https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-HeaderOperation
 */
var HeaderOperation;
(function (HeaderOperation) {
    HeaderOperation["Append"] = "append";
    HeaderOperation["Set"] = "set";
    HeaderOperation["Remove"] = "remove";
})(HeaderOperation || (HeaderOperation = {}));
/**
 * https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-ModifyHeaderInfo
 */
const ModifyHeaderInfoValidator = zod__WEBPACK_IMPORTED_MODULE_6__.z.strictObject({
    header: zod__WEBPACK_IMPORTED_MODULE_6__.z.string(),
    operation: zod__WEBPACK_IMPORTED_MODULE_6__.z.nativeEnum(HeaderOperation),
    value: zod__WEBPACK_IMPORTED_MODULE_6__.z.string().optional(),
});
/**
 * https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-RuleActionType
 */
var RuleActionType;
(function (RuleActionType) {
    RuleActionType["BLOCK"] = "block";
    RuleActionType["REDIRECT"] = "redirect";
    RuleActionType["ALLOW"] = "allow";
    RuleActionType["UPGRADE_SCHEME"] = "upgradeScheme";
    RuleActionType["MODIFY_HEADERS"] = "modifyHeaders";
    /**
     * For allowAllRequests rules {@link RuleCondition.resourceTypes} may only
     * include the 'sub_frame' and 'main_frame' resource types.
     */
    RuleActionType["ALLOW_ALL_REQUESTS"] = "allowAllRequests";
})(RuleActionType || (RuleActionType = {}));
/**
 * https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-RuleAction
 */
const RuleActionValidator = zod__WEBPACK_IMPORTED_MODULE_6__.z.strictObject({
    redirect: RedirectValidator.optional(),
    requestHeaders: ModifyHeaderInfoValidator.array().optional(),
    responseHeaders: ModifyHeaderInfoValidator.array().optional(),
    type: zod__WEBPACK_IMPORTED_MODULE_6__.z.nativeEnum(RuleActionType),
});
/**
 * https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-RequestMethod
 */
var RequestMethod;
(function (RequestMethod) {
    RequestMethod["Connect"] = "connect";
    RequestMethod["Delete"] = "delete";
    RequestMethod["Get"] = "get";
    RequestMethod["Head"] = "head";
    RequestMethod["Options"] = "options";
    RequestMethod["Patch"] = "patch";
    RequestMethod["Post"] = "post";
    RequestMethod["Put"] = "put";
})(RequestMethod || (RequestMethod = {}));
/**
 * Map {@link HTTPMethod} to declarative {@link RequestMethod}.
 */
const DECLARATIVE_REQUEST_METHOD_MAP = {
    [HTTPMethod.GET]: RequestMethod.Get,
    [HTTPMethod.POST]: RequestMethod.Post,
    [HTTPMethod.PUT]: RequestMethod.Put,
    [HTTPMethod.DELETE]: RequestMethod.Delete,
    [HTTPMethod.PATCH]: RequestMethod.Patch,
    [HTTPMethod.HEAD]: RequestMethod.Head,
    [HTTPMethod.OPTIONS]: RequestMethod.Options,
    [HTTPMethod.CONNECT]: RequestMethod.Connect,
};
/**
 * https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-RuleCondition
 */
const RuleConditionValidator = zod__WEBPACK_IMPORTED_MODULE_6__.z.strictObject({
    domainType: zod__WEBPACK_IMPORTED_MODULE_6__.z.nativeEnum(DomainType).optional(),
    excludedInitiatorDomains: zod__WEBPACK_IMPORTED_MODULE_6__.z.string().array().optional(),
    excludedRequestDomains: zod__WEBPACK_IMPORTED_MODULE_6__.z.string().array().optional(),
    excludedRequestMethods: zod__WEBPACK_IMPORTED_MODULE_6__.z.nativeEnum(RequestMethod).array().optional(),
    excludedResourceTypes: zod__WEBPACK_IMPORTED_MODULE_6__.z.nativeEnum(ResourceType).array().optional(),
    excludedTabIds: zod__WEBPACK_IMPORTED_MODULE_6__.z.number().array().optional(),
    initiatorDomains: zod__WEBPACK_IMPORTED_MODULE_6__.z.string().array().optional(),
    isUrlFilterCaseSensitive: zod__WEBPACK_IMPORTED_MODULE_6__.z.boolean().optional(),
    regexFilter: zod__WEBPACK_IMPORTED_MODULE_6__.z.string().optional(),
    requestDomains: zod__WEBPACK_IMPORTED_MODULE_6__.z.string().array().optional(),
    requestMethods: zod__WEBPACK_IMPORTED_MODULE_6__.z.nativeEnum(RequestMethod).array().optional(),
    /**
     * If none of the `excludedResourceTypes` and `resourceTypes` are specified,
     * all resource types except "main_frame" will be matched.
     */
    resourceTypes: zod__WEBPACK_IMPORTED_MODULE_6__.z.nativeEnum(ResourceType).array().optional(),
    tabIds: zod__WEBPACK_IMPORTED_MODULE_6__.z.number().array().optional(),
    urlFilter: zod__WEBPACK_IMPORTED_MODULE_6__.z.string().optional(),
});
/**
 * https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-Rule
 */
const DeclarativeRuleValidator = zod__WEBPACK_IMPORTED_MODULE_6__.z.strictObject({
    action: RuleActionValidator,
    condition: RuleConditionValidator,
    id: zod__WEBPACK_IMPORTED_MODULE_6__.z.number(),
    priority: zod__WEBPACK_IMPORTED_MODULE_6__.z.number().optional(),
});
/**
 * Map request types to declarative types.
 */
const DECLARATIVE_RESOURCE_TYPES_MAP = {
    [ResourceType.MainFrame]: RequestType.Document,
    [ResourceType.SubFrame]: RequestType.SubDocument,
    [ResourceType.Stylesheet]: RequestType.Stylesheet,
    [ResourceType.Script]: RequestType.Script,
    [ResourceType.Image]: RequestType.Image,
    [ResourceType.Font]: RequestType.Font,
    [ResourceType.Object]: RequestType.Object,
    [ResourceType.XmlHttpRequest]: RequestType.XmlHttpRequest,
    [ResourceType.Ping]: RequestType.Ping,
    // TODO: what should match this resource type?
    // [ResourceType.CSP_REPORT]: RequestType.Document,
    [ResourceType.Media]: RequestType.Media,
    [ResourceType.WebSocket]: RequestType.WebSocket,
    [ResourceType.Other]: RequestType.Other,
};

/**
 * @file Separate file for the `isSafeRule` function, because it can be used
 * outside of the declarative converter to check if a rule is safe, e.g. for
 * passing rules to "skip review" in CWS.
 */
/**
 * List of declarative rule actions which are considered safe.
 *
 * @see {@link https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest#safe_rules}
 */
const SAFE_RULE_ACTIONS = new Set([
    RuleActionType.BLOCK,
    RuleActionType.ALLOW,
    RuleActionType.ALLOW_ALL_REQUESTS,
    RuleActionType.UPGRADE_SCHEME,
]);
/**
 * Checks whether the declarative rule is safe.
 *
 * @see {@link https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest#safe_rules}
 *
 * @param rule Declarative rule to check.
 *
 * @returns True if the rule is safe, otherwise false.
 */
const isSafeRule = (rule) => {
    return SAFE_RULE_ACTIONS.has(rule.action.type);
};

var ErrorStatusCodes;
(function (ErrorStatusCodes) {
    ErrorStatusCodes[ErrorStatusCodes["ComplexRegex"] = 1001] = "ComplexRegex";
    ErrorStatusCodes[ErrorStatusCodes["RuleLimit"] = 1002] = "RuleLimit";
    ErrorStatusCodes[ErrorStatusCodes["RegexpRuleLimit"] = 1003] = "RegexpRuleLimit";
    ErrorStatusCodes[ErrorStatusCodes["RemoveparamRegexpIsNotSupported"] = 1004] = "RemoveparamRegexpIsNotSupported";
    ErrorStatusCodes[ErrorStatusCodes["RemoveparamInversionIsNotSupported"] = 1005] = "RemoveparamInversionIsNotSupported";
})(ErrorStatusCodes || (ErrorStatusCodes = {}));
const EMPTY_STRING = '';
const SEPARATOR = '|';
const SPACE = ' ';
const WILDCARD = '*';
const LF = '\n';
const CR = '\r';
const FF = '\f';
const TAB = '\t';
/**
 * Prefix for ruleset name.
 */
const RULESET_NAME_PREFIX = 'ruleset_';

/**
 * @file Smaller utility functions that cannot be classified in other files here,
 * but it is not worth creating a separate file for them.
 */
/**
 * Helper function to serialize data to JSON and optionally prettify it.
 * Its just helps to keep the code clean and readable.
 *
 * @param data Data to serialize.
 * @param pretty If `true`, the JSON will be prettified with tabs.
 *
 * @returns Serialized JSON.
 */
function serializeJson(data, pretty = false) {
    return JSON.stringify(data, null, pretty ? TAB : undefined);
}

/**
 * Splits the string by the delimiter, ignoring escaped delimiters
 * and without tokenizing.
 * Works for plain strings that don't include string representation of
 * complex entities, e.g $replace modifier values.
 *
 * @param string String to split.
 * @param delimiter Delimiter.
 * @param escapeCharacter Escape character.
 * @param preserveEmptyTokens If true, preserve empty parts.
 * @param shouldUnescape If true, unescape characters.
 *
 * @returns Array of string parts.
 */
function splitByDelimiterWithEscapeCharacter(string, delimiter, escapeCharacter, preserveEmptyTokens, shouldUnescape = true) {
    if (!string) {
        return [];
    }
    if (string.startsWith(delimiter)) {
        // eslint-disable-next-line no-param-reassign
        string = string.substring(1);
    }
    let words = [];
    if (!string.includes(escapeCharacter)) {
        words = string.split(delimiter);
        return words;
    }
    let chars = [];
    const makeWord = () => {
        const word = chars.join('');
        words.push(word);
        chars = [];
    };
    for (let i = 0; i < string.length; i += 1) {
        const char = string.charAt(i);
        const isLastChar = i === (string.length - 1);
        if (char === delimiter) {
            const isEscapedChar = i > 0 && string[i - 1] === escapeCharacter;
            if (isEscapedChar) {
                if (shouldUnescape) {
                    chars.splice(chars.length - 1, 1);
                }
                chars.push(char);
            }
            else {
                makeWord();
            }
            if (isLastChar) {
                makeWord();
            }
        }
        else if (isLastChar) {
            chars.push(char);
            makeWord();
        }
        else {
            chars.push(char);
        }
    }
    return words;
}
/**
 * `djb2` hash algorithm.
 *
 * NOTE: This version uses some bit operands to exclude overflow MAX_SAFE_INTEGER
 * (and moreover, exclude overflow 2^32).
 *
 * @see {@link https://gist.github.com/eplawless/52813b1d8ad9af510d85?permalink_comment_id=3367765#gistcomment-3367765}
 *
 * @param str String to get hash.
 *
 * @returns Hash.
 */
function fastHash(str) {
    if (str.length === 0) {
        return 0;
    }
    // A magic constant that gives good distribution.
    let hash = 5381;
    for (let i = 0; i < str.length; i += 1) {
        hash = hash * 33 ^ str.charCodeAt(i);
    }
    return hash >>> 0;
}
/**
 * `djb2` hash algorithm with sign bit masked off to fit 31 bits.
 *
 * @param str String to get hash.
 *
 * @returns Hash from 0 to 2^31-1.
 */
function fastHash31(str) {
    // Mask off sign bit to keep value in range [0, ..., 2^31‑1].
    return fastHash(str) & 0x7fffffff;
}
/**
 * Replaces all occurrences of find with replace in str.
 *
 * @param str The string in which to replace all occurrences of the find string.
 * @param find The substring to find in the string.
 * @param replace The substring to replace the find string with.
 *
 * @returns The string with all occurrences of find replaced by replace.
 */
function replaceAll(str, find, replace) {
    if (!str) {
        return str;
    }
    return str.split(find).join(replace);
}
/**
 * Checks if arrays are equal.
 *
 * @param left Array.
 * @param right Array.
 *
 * @returns True on equality.
 */
function stringArraysEquals(left, right) {
    if (!left || !right) {
        return !left && !right;
    }
    if (left.length !== right.length) {
        return false;
    }
    for (let i = 0; i < left.length; i += 1) {
        if (left[i] !== right[i]) {
            return false;
        }
    }
    return true;
}
/**
 * Checks if arrays have an intersection.
 *
 * @param left Array.
 * @param right Array.
 *
 * @returns True on intersection.
 */
function stringArraysHaveIntersection(left, right) {
    if (!left || !right) {
        return true;
    }
    for (let i = 0; i < left.length; i += 1) {
        if (right.includes(left[i])) {
            return true;
        }
    }
    return false;
}
/**
 * Checks if string contains spaces.
 *
 * @param str String to check.
 *
 * @returns `true` if string contains spaces, `false` otherwise.
 */
function hasSpaces(str) {
    return str.includes(SPACE);
}
/**
 * Check if the given value is a string.
 *
 * @param value Value to check.
 *
 * @returns `true` if value is a string, `false` otherwise.
 */
function isString(value) {
    return typeof value === 'string';
}
/**
 * Unescapes the specified character in the string.
 *
 * @param str String to escape.
 * @param char Character to escape.
 *
 * @returns The string with the specified character unescaped.
 */
function unescapeChar(str, char) {
    return str.replace(`\\${char}`, char);
}
/**
 * Finds the next line break index in the string starting from the specified index.
 * Supports LF, CR, FF and CRLF line breaks.
 *
 * @param str String to search in.
 * @param startIndex  Start index. Default is 0.
 *
 * @returns A tuple with the line break index and the line break length.
 * If the line break is not found, returns the string length and 0.
 */
function findNextLineBreakIndex(str, startIndex = 0) {
    const { length } = str;
    let offset = startIndex;
    while (offset < length) {
        const char = str[offset];
        if (char === LF || char === FF) {
            return [offset, 1];
        }
        if (char === CR) {
            return str[offset + 1] === LF ? [offset, 2] : [offset, 1];
        }
        offset += 1;
    }
    return [length, 0];
}
/**
 * Finds the next occurrence of a specified character in a string that is not preceded by an escape (`\`).
 *
 * @param str The input string to search within.
 * @param char The character to find in the string.
 * @param [startIndex] The index to start searching from.
 *
 * @returns The index of the next unescaped occurrence of the character, or the length of the string if not found.
 */
const findNextUnescapedIndex = (str, char, startIndex = 0) => {
    let i = str.indexOf(char, startIndex);
    while (i !== -1 && str[i - 1] === '\\') {
        i = str.indexOf(char, i + 1);
    }
    return i === -1 ? str.length : i;
};
/**
 * Determines whether a given Unicode code point corresponds to a numeric digit (0-9).
 *
 * @param codePoint The Unicode code point to check.
 *
 * @returns `true` if the code point represents a numeric character (0-9), otherwise `false`.
 */
const isNumber = (codePoint) => {
    return codePoint >= 48 && codePoint <= 57;
};
/**
 * Determines whether a given Unicode code point corresponds to an alphabetical letter (a-z, A-Z).
 *
 * @param codePoint The Unicode code point to check.
 *
 * @returns `true` if the code point represents an alphabetic character, otherwise `false`.
 */
const isAlpha = (codePoint) => {
    const codePointLower = codePoint | 0x20;
    return codePointLower >= 97 && codePointLower <= 122;
};
/**
 * Determines whether a given Unicode code point corresponds to an alphanumeric character (a-z, A-Z, 0-9).
 *
 * @param codePoint The Unicode code point to check.
 *
 * @returns `true` if the code point represents an alphanumeric character, otherwise `false`.
 */
const isAlphaNumeric = (codePoint) => {
    return isAlpha(codePoint) || isNumber(codePoint);
};

/**
 * Compatibility types are used to configure engine for better support of different libraries
 * For example:
 *  extension doesn't support $app modifier. So if we set in configuration CompatibilityTypes.Extension,
 *  engine would ignore rules with $app modifier.
 */
var CompatibilityTypes;
(function (CompatibilityTypes) {
    CompatibilityTypes[CompatibilityTypes["Extension"] = 1] = "Extension";
    CompatibilityTypes[CompatibilityTypes["CoreLibs"] = 2] = "CoreLibs";
    CompatibilityTypes[CompatibilityTypes["Dns"] = 4] = "Dns";
})(CompatibilityTypes || (CompatibilityTypes = {}));
/**
 * Application configuration class.
 */
class Configuration {
    /**
     * Default configuration.
     */
    defaultConfig = {
        engine: null,
        version: null,
        verbose: false,
        compatibility: null,
    };
    /**
     * {'extension'|'corelibs'} engine application type.
     */
    engine = null;
    /**
     * {string} version.
     */
    version = null;
    /**
     * {boolean} verbose flag.
     */
    verbose = false;
    /**
     * Compatibility flag.
     */
    compatibility = CompatibilityTypes.Extension;
    /**
     * Configuration constructor.
     *
     * @param inputConfig Input configuration.
     */
    constructor(inputConfig) {
        const config = { ...this.defaultConfig, ...inputConfig };
        this.engine = config.engine;
        this.version = config.version;
        this.verbose = config.verbose;
        this.compatibility = config.compatibility;
    }
}
// eslint-disable-next-line import/no-mutable-exports
let config = new Configuration();
/**
 * Checks config is compatible with input level.
 *
 * @param compatibilityLevel Compatibility level to check against.
 *
 * @returns True if compatible, otherwise false.
 */
function isCompatibleWith(compatibilityLevel) {
    if (config.compatibility === null) {
        return false;
    }
    return (config.compatibility & compatibilityLevel) === compatibilityLevel;
}

/**
 * This is a helper class that is used specifically to work with app restrictions.
 *
 * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#app}
 *
 * @example
 * ```adblock
 * ||baddomain.com^$app=org.example.app
 * ||baddomain.com^$app=org.example.app1|org.example.app2
 * ```
 */
class AppModifier {
    /**
     * List of permitted apps or null.
     */
    permittedApps;
    /**
     * List of restricted apps or null.
     */
    restrictedApps;
    /**
     * Parses the `apps` string.
     *
     * @param apps Apps string.
     *
     * @throws An error if the app string is empty or invalid.
     */
    constructor(apps) {
        if (!apps) {
            throw new SyntaxError('$app modifier cannot be empty');
        }
        const permittedApps = [];
        const restrictedApps = [];
        const parts = apps.split(SEPARATOR);
        for (let i = 0; i < parts.length; i += 1) {
            let app = parts[i];
            let restricted = false;
            if (app.startsWith('~')) {
                restricted = true;
                app = app.substring(1).trim();
            }
            if (app === '') {
                throw new SyntaxError(`Empty app specified in "${apps}"`);
            }
            if (restricted) {
                restrictedApps.push(app);
            }
            else {
                permittedApps.push(app);
            }
        }
        this.restrictedApps = restrictedApps.length > 0 ? restrictedApps : null;
        this.permittedApps = permittedApps.length > 0 ? permittedApps : null;
    }
}

/**
 * Cookie modifier class.
 *
 * Learn more about it here:
 * https://github.com/AdguardTeam/AdguardBrowserExtension/issues/961.
 */
class CookieModifier {
    /**
     * Cookie `maxAge` name.
     */
    static MAX_AGE = 'maxAge';
    /**
     * Cookie `sameSite` name.
     */
    static SAME_SITE = 'sameSite';
    /**
     * Option value.
     */
    optionValue;
    /**
     * Regexp value.
     */
    regex;
    /**
     * Cookie name.
     */
    cookieName;
    /**
     * Cookie `sameSite` value.
     */
    sameSite;
    /**
     * Cookie `maxAge` value.
     */
    maxAge;
    /**
     * Constructor.
     *
     * @param value Value of the modifier.
     */
    constructor(value) {
        // Save the source text of the option modifier
        this.optionValue = value || '';
        this.regex = null;
        this.cookieName = null;
        this.sameSite = null;
        this.maxAge = null;
        // Parse cookie name/regex
        const parts = this.optionValue.split(/;/);
        if (parts.length < 1) {
            throw new Error(`Cannot parse ${this.optionValue}`);
        }
        const cookieName = parts[0];
        if (cookieName.startsWith('/') && cookieName.endsWith('/')) {
            const pattern = cookieName.substring(1, cookieName.length - 1);
            // Save regex to be used further for matching cookies
            this.regex = new RegExp(pattern);
        }
        else {
            // Match by cookie name
            this.cookieName = cookieName;
        }
        // Parse other cookie options
        if (parts.length > 1) {
            for (let i = 1; i < parts.length; i += 1) {
                const nameValue = parts[i].split('=');
                const optionName = nameValue[0];
                const optionValue = nameValue[1];
                if (optionName === CookieModifier.MAX_AGE) {
                    this.maxAge = parseInt(optionValue, 10);
                }
                else if (optionName === CookieModifier.SAME_SITE) {
                    this.sameSite = optionValue;
                }
                else {
                    throw new Error(`Unknown $cookie option: ${optionName}`);
                }
            }
        }
    }
    /**
     * Gets modifier value.
     *
     * @returns Modifier value.
     */
    getValue() {
        return this.optionValue;
    }
    /**
     * First cookie name.
     *
     * @returns The first cookie name.
     */
    getCookieName() {
        return this.cookieName;
    }
    /**
     * Max age cookie value.
     *
     * @returns The max age cookie value.
     */
    getMaxAge() {
        return this.maxAge;
    }
    /**
     * Same site cookie value.
     *
     * @returns The same site cookie value.
     */
    getSameSite() {
        return this.sameSite;
    }
    /**
     * Checks if cookie with the specified name matches this option.
     *
     * @param name Cookie name.
     *
     * @returns True if matches, false otherwise.
     */
    matches(name) {
        if (!name) {
            return false;
        }
        if (this.regex) {
            return this.regex.test(name);
        }
        if (this.cookieName) {
            return this.cookieName === name;
        }
        // Empty regex and cookieName means that we must match all cookies
        return true;
    }
    /**
     * Checks if cookie rule has an empty $cookie option.
     *
     * @returns True if $cookie option is empty.
     */
    isEmpty() {
        return !this.regex && !this.cookieName;
    }
    /**
     * Checks if the given modifier is an instance of CookieModifier.
     *
     * @param m The modifier to check.
     *
     * @returns True if the modifier is an instance of CookieModifier, false otherwise.
     */
    static isCookieModifier = (m) => {
        return m instanceof CookieModifier;
    };
}

const CSP_HEADER_NAME = 'Content-Security-Policy';
/**
 * Csp modifier class.
 */
class CspModifier {
    /**
     * Csp directive.
     *
     * @returns The CSP directive.
     */
    cspDirective;
    /**
     * Is allowlist rule.
     */
    isAllowlist;
    /**
     * Constructor.
     *
     * @param value Value of the modifier.
     * @param isAllowlist Whether the rule is an allowlist rule or not.
     */
    constructor(value, isAllowlist) {
        this.cspDirective = value;
        this.isAllowlist = isAllowlist;
        this.validateCspDirective();
    }
    /**
     * Csp directive.
     *
     * @returns The CSP directive.
     */
    getValue() {
        return this.cspDirective;
    }
    /**
     * Validates CSP rule.
     */
    validateCspDirective() {
        /**
         * CSP directive may be empty in case of allowlist rule,
         * it means to disable all $csp rules matching the allowlist rule.
         *
         * @see {@link https://github.com/AdguardTeam/AdguardBrowserExtension/issues/685}
         */
        if (!this.isAllowlist && !this.cspDirective) {
            throw new Error('Invalid $CSP rule: CSP directive must not be empty');
        }
        if (this.cspDirective) {
            /**
             * Forbids report-to and report-uri directives.
             *
             * @see {@link https://github.com/AdguardTeam/AdguardBrowserExtension/issues/685#issue-228287090}
             */
            const cspDirective = this.cspDirective.toLowerCase();
            if (cspDirective.indexOf('report-') >= 0) {
                throw new Error(`Forbidden CSP directive: ${cspDirective}`);
            }
        }
    }
}

/**
 * This is the base class representing double values modifiers.
 */
class BaseValuesModifier {
    /**
     * List of permitted values or null.
     */
    permitted;
    /**
     * List of restricted values or null.
     */
    restricted;
    /**
     * Value.
     */
    value;
    /**
     * Parses the values string.
     *
     * @param values Values string.
     *
     * @throws An error if the string is empty or invalid.
     */
    constructor(values) {
        if (!values) {
            throw new SyntaxError('Modifier cannot be empty');
        }
        this.value = values;
        const permittedValues = [];
        const restrictedValues = [];
        const parts = values.split(SEPARATOR);
        for (let i = 0; i < parts.length; i += 1) {
            let app = parts[i];
            let restricted = false;
            if (app.startsWith('~')) {
                restricted = true;
                app = app.substring(1).trim();
            }
            if (app === '') {
                throw new SyntaxError(`Empty values specified in "${values}"`);
            }
            if (restricted) {
                restrictedValues.push(app);
            }
            else {
                permittedValues.push(app);
            }
        }
        this.restricted = restrictedValues.length > 0 ? restrictedValues : null;
        this.permitted = permittedValues.length > 0 ? permittedValues : null;
    }
    /**
     * Gets list of permitted values.
     *
     * @returns List of permitted values or null if none.
     */
    getPermitted() {
        return this.permitted;
    }
    /**
     * Gets list of restricted values.
     *
     * @returns List of restricted values or null if none.
     */
    getRestricted() {
        return this.restricted;
    }
    /**
     * Gets value.
     *
     * @returns Value.
     */
    getValue() {
        return this.value;
    }
    /**
     * Checks if value matches this modifier.
     *
     * @param value Value to check.
     *
     * @returns True if value matches this modifier, false otherwise.
     */
    match(value) {
        if (!this.restricted && !this.permitted) {
            return true;
        }
        if (this.restricted && this.restricted.includes(value)) {
            return false;
        }
        if (this.permitted) {
            return this.permitted.includes(value);
        }
        return true;
    }
}

// eslint-disable-next-line max-classes-per-file
/**
 * Netmasks class.
 */
class NetmasksCollection {
    /**
     * IPv4 masks.
     */
    ipv4Masks = [];
    /**
     * IPv6 masks.
     */
    ipv6Masks = [];
    /**
     * Returns true if any of the containing masks contains provided value.
     *
     * @param value Value to check.
     *
     * @returns True if any of the containing masks contains provided value.
     */
    contains(value) {
        if (is_ip__WEBPACK_IMPORTED_MODULE_1__.v4(value)) {
            return this.ipv4Masks.some((x) => (0,cidr_tools__WEBPACK_IMPORTED_MODULE_8__/* .contains */ .gR)(x, value));
        }
        return this.ipv6Masks.some((x) => (0,cidr_tools__WEBPACK_IMPORTED_MODULE_8__/* .contains */ .gR)(x, value));
    }
}
/**
 * The client modifier allows specifying clients this rule will be working for.
 * It accepts client names (not ClientIDs), IP addresses, or CIDR ranges.
 */
class ClientModifier extends BaseValuesModifier {
    /**
     * Permitted netmasks.
     */
    permittedNetmasks;
    /**
     * Restricted netmasks.
     */
    restrictedNetmasks;
    /**
     * Constructor.
     *
     * @param value Value of the modifier.
     */
    constructor(value) {
        super(value);
        const permitted = this.getPermitted();
        if (permitted) {
            this.permitted = ClientModifier.stripValues(permitted);
            this.permittedNetmasks = ClientModifier.parseNetmasks(this.permitted);
        }
        const restricted = this.getRestricted();
        if (restricted) {
            this.restricted = ClientModifier.stripValues(restricted);
            this.restrictedNetmasks = ClientModifier.parseNetmasks(this.restricted);
        }
    }
    /**
     * Unquotes and unescapes string.
     *
     * @param values Values to process.
     *
     * @returns Unquoted and unescaped values.
     */
    static stripValues(values) {
        return values.map((v) => {
            if ((v.startsWith('"') && v.endsWith('"'))
                || (v.startsWith('\'') && v.endsWith('\''))) {
                // eslint-disable-next-line no-param-reassign
                v = v.substr(1, v.length - 2);
            }
            return v.replace(/\\/ig, '');
        });
    }
    /**
     * Checks if this modifier matches provided params.
     *
     * @param clientName Client name.
     * @param clientIP Client IP.
     *
     * @returns True if this modifier matches provided params.
     */
    matchAny(clientName, clientIP) {
        if (this.restricted) {
            if (clientName && this.restricted.includes(clientName)) {
                return false;
            }
            if (clientIP && this.restricted.includes(clientIP)) {
                return false;
            }
            return true;
        }
        if (this.restrictedNetmasks) {
            if (clientIP && this.restrictedNetmasks.contains(clientIP)) {
                return false;
            }
            return true;
        }
        if (this.permitted) {
            if (clientName && this.permitted.includes(clientName)) {
                return true;
            }
            if (clientIP && this.permitted.includes(clientIP)) {
                return true;
            }
        }
        if (this.permittedNetmasks) {
            if (clientIP && this.permittedNetmasks.contains(clientIP)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Parses netmasks from client's strings.
     *
     * @param values Values to parse.
     *
     * @returns Parsed netmasks.
     */
    static parseNetmasks(values) {
        const result = new NetmasksCollection();
        values.forEach((x) => {
            const cidrVersion = is_cidr__WEBPACK_IMPORTED_MODULE_0__(x);
            if (cidrVersion === 4) {
                result.ipv4Masks.push(x);
            }
            else if (cidrVersion === 6) {
                result.ipv6Masks.push(x);
            }
        });
        return result;
    }
}

/**
 * The ctag modifier allows to block domains only for specific types of DNS client tags.
 */
class CtagModifier extends BaseValuesModifier {
    /**
     * The list of allowed tags.
     */
    static ALLOWED_TAGS = [
        // By device type:
        'device_audio',
        'device_camera',
        'device_gameconsole',
        'device_laptop',
        'device_nas',
        'device_pc',
        'device_phone',
        'device_printer',
        'device_securityalarm',
        'device_tablet',
        'device_tv',
        'device_other',
        // By operating system:
        'os_android',
        'os_ios',
        'os_linux',
        'os_macos',
        'os_windows',
        'os_other',
        // By user group:
        'user_admin',
        'user_regular',
        'user_child',
    ];
    /**
     * Constructor.
     *
     * @param value Value of the modifier.
     */
    constructor(value) {
        super(value);
        this.validate();
    }
    /**
     * Validates tag values.
     */
    validate() {
        if (!this.getValue()) {
            throw new Error('Invalid rule: Ctag modifier must not be empty');
        }
        const tags = this.permitted ? this.permitted : this.restricted;
        if (tags && tags.some((x) => !CtagModifier.ALLOWED_TAGS.includes(x))) {
            throw new Error('Invalid rule: Invalid ctag modifier');
        }
    }
}

/**
 * The dnsrewrite response modifier allows replacing the content of the response
 * to the DNS request for the matching hosts.
 *
 * TODO: This modifier is not yet implemented.
 *
 * @see {@link https://github.com/AdguardTeam/AdGuardHome/wiki/Hosts-Blocklists#dnsrewrite}
 */
class DnsRewriteModifier {
    /**
     * Value.
     */
    value;
    /**
     * Constructor.
     *
     * @param value Modifier value.
     */
    constructor(value) {
        this.value = value;
    }
    /**
     * Modifier value.
     *
     * @returns The value of the modifier.
     */
    getValue() {
        return this.value;
    }
}

/**
 * The `$dnstype` modifier allows specifying DNS request type on which this rule will be triggered.
 */
class DnsTypeModifier extends BaseValuesModifier {
    /**
     * Constructor.
     *
     * @param value The value used to initialize the modifier.
     */
    constructor(value) {
        super(value);
        if (this.permitted) {
            this.restricted = null;
        }
    }
}

/* eslint-disable prefer-regex-literals */
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/regexp
// should be escaped . * + ? ^ $ { } ( ) | [ ] / \
// except of * | ^
const specialCharacters = ['.', '+', '?', '$', '{', '}', '(', ')', '[', ']', '/', '\\'];
const reSpecialCharacters = new RegExp(`[${specialCharacters.join('\\')}]`, 'g');
const reSpecialCharactersFull = /[.*+?^${}()|[\]\\]/g;
const reEscapedSpecialCharactersFull = /\\[.*+?^${}()|[\]\\]/g;
const protocolMarker = String.raw `:\/\/`;
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#using_special_characters_in_strings
const escapeSequence = {
    n: '\n',
    r: '\r',
    t: '\t',
    b: '\b',
    f: '\f',
    v: '\v',
};
/**
 * Class with static helper methods for working with basic filtering rules patterns.
 *
 * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#basic-rules}
 *
 * @returns The escaped string.
 */
class SimpleRegex {
    /**
     * Matching the beginning of an address. With this character you don't
     * have to specify a particular protocol and subdomain in address mask.
     * It means, `||` stands for `http://*.`, `https://*.`, `ws://*.`, `wss://*.` at once.
     */
    static MASK_START_URL = '||';
    /**
     * REGEX_START_URL corresponds to MASK_START_URL.
     */
    static REGEX_START_URL = '^(http|https|ws|wss)://([a-z0-9-_.]+\\.)?';
    /**
     * A pointer to the beginning or the end of address. The value depends on the
     * character placement in the mask. For example, a rule `swf|` corresponds
     * to `http://example.com/annoyingflash.swf`, but not to `http://example.com/swf/index.html`.
     * `|http://example.org` corresponds to `http://example.org`,
     * but not to `http://domain.com?url=http://example.org`.
     */
    static MASK_PIPE = '|';
    /**
     * REGEX_END_STRING corresponds to MASK_PIPE if it is in the end of a pattern.
     */
    static REGEX_END_STRING = '$';
    /**
     * REGEX_START_STRING corresponds to MASK_PIPE if it is in the beginning of a pattern.
     */
    static REGEX_START_STRING = '^';
    /**
     * Separator character mark. Separator character is any character,
     * but a letter, a digit, or one of the following: _ - .
     */
    static MASK_SEPARATOR = '^';
    /**
     * REGEX_SEPARATOR corresponds to MASK_SEPARATOR.
     */
    static REGEX_SEPARATOR = '([^ a-zA-Z0-9.%_-]|$)';
    /**
     * This is a wildcard character. It is used to represent "any set of characters".
     * This can also be an empty string or a string of any length.
     */
    static MASK_ANY_CHARACTER = '*';
    /**
     * Path separator.
     */
    static MASK_BACKSLASH = '/';
    /**
     * REGEX_ANY_CHARACTER corresponds to MASK_ANY_CHARACTER.
     */
    static REGEX_ANY_CHARACTER = '.*';
    /**
     * Enclose regex in two backslashes to mark a regex rule.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#regular-expressions-support}
     */
    static MASK_REGEX_RULE = '/';
    /**
     *  Regex for matching special characters in modifier regex pattern.
     */
    static reModifierPatternSpecialCharacters = /[[\],\\]/g;
    /**
     * Regex for matching escaped special characters in modifier regex pattern.
     */
    static reModifierPatternEscapedSpecialCharacters = /\\[[\],\\]/g;
    /**
     * If string starts with exclamation mark "!" we consider it as comment.
     */
    static MASK_COMMENT = '!';
    /**
     * Min length of rule shortcut
     * This value has been picked as a result of performance experiments.
     */
    static MIN_SHORTCUT_LENGTH = 3;
    /**
     * Min length of generic rule shortcut.
     */
    static MIN_GENERIC_RULE_LENGTH = 4;
    /**
     * Regex with basic matching pattern special characters.
     */
    static rePatternSpecialCharacters = new RegExp('[*^|]');
    /**
     * Extracts the shortcut from the rule's pattern.
     * Shortcut is the longest substring of the pattern that does not contain
     * any special characters.
     *
     * Please note, that the shortcut is always lower-case!
     *
     * @param pattern Network rule's pattern.
     *
     * @returns The shortcut or the empty string if we could not extract any.
     */
    static extractShortcut(pattern) {
        if (pattern.startsWith(this.MASK_REGEX_RULE) && pattern.endsWith(this.MASK_REGEX_RULE)) {
            return this.extractRegexpShortcut(pattern);
        }
        return this.extractBasicShortcut(pattern);
    }
    /**
     * Searches for the longest substring of the pattern that
     * does not contain any special characters: `*`, `^`, `|`.
     *
     * @param pattern Network rule's pattern.
     *
     * @returns The shortcut or the empty string.
     */
    static extractBasicShortcut(pattern) {
        let longest = '';
        const parts = pattern.split(this.rePatternSpecialCharacters);
        for (const part of parts) {
            if (part.length > longest.length) {
                longest = part;
            }
        }
        return (longest || '').toLowerCase();
    }
    /**
     * Extracts the longest substring from the provided regex pattern that does not
     * contain any special regex symbols or constructs that invalidate it for use
     * as a quick match shortcut.
     * The pattern is expected to be enclosed in forward slashes (e.g., `/example/`),
     * and may optionally contain a protocol marker (`://`),
     * which is ignored to prevent trivial matches like "http".
     *
     * This method discards many complex regex features (e.g., groups, character
     * classes, certain escaped sequences) when forming the shortcut, and always
     * returns the result in lower-case. If no valid substring is found, it returns
     * an empty string.
     *
     * @param pattern The input regex pattern, including the enclosing slashes.
     * For example: `/https?:\\/\\/example\\.com/`.
     *
     * @returns The longest valid substring usable as a shortcut, or an empty string if none is found.
     */
    static extractRegexpShortcut(pattern) {
        const { length } = pattern;
        if (!pattern
            // length should be at least 3: "/x/", "//" does not make sense
            || length < 3
            // regex pattern should start and end with '/'
            || pattern[0] !== '/'
            || pattern[length - 1] !== '/') {
            return '';
        }
        const protocolIndex = pattern.indexOf(protocolMarker);
        /**
         * `i` is our primary index into the pattern;
         * we skip the initial `/` or jump after the protocol marker `://`.
         */
        let i = protocolIndex !== -1
            ? protocolIndex + protocolMarker.length
            : 1;
        let longestToken = '';
        let longestTokenInGroup = '';
        let currentToken = '';
        /**
         * Resets `currentToken` and updates `longestTokenInGroup` if `currentToken` is longer.
         */
        const resetCurrentToken = () => {
            if (currentToken.length > longestTokenInGroup.length) {
                longestTokenInGroup = currentToken;
            }
            currentToken = '';
        };
        /**
         * Resets `longestTokenInGroup` and updates `longestToken` if `longestTokenInGroup` is longer.
         */
        const resetGroupToken = () => {
            if (longestTokenInGroup.length > longestToken.length) {
                longestToken = longestTokenInGroup;
            }
            longestTokenInGroup = '';
        };
        /**
         * Track parenthesis group nesting.
         */
        let groupBalance = 0;
        /**
         * Skip everything up to the closing parenthesis for the current group
         * (including nested groups).
         * This method moves `i` to the position of the closing parenthesis.
         */
        const ignoreCurrentGroup = () => {
            // Ignoring group means we should drop the current token
            currentToken = '';
            longestTokenInGroup = '';
            const startBalance = groupBalance;
            while (i < length) {
                // If `(` is not escaped, increment group count
                if (pattern[i] === '(' && pattern[i - 1] !== '\\') {
                    groupBalance += 1;
                }
                // If `)` is not escaped, decrement group count
                if (pattern[i] === ')' && pattern[i - 1] !== '\\') {
                    groupBalance -= 1;
                    // Once we return to the level before this group started, stop
                    if (groupBalance < startBalance) {
                        break;
                    }
                }
                i += 1;
            }
        };
        while (i < length) {
            const char = pattern[i];
            // 1) Handle escaped sequences
            if (char === '\\') {
                // Skip the backslash
                i += 1;
                const escaped = pattern[i];
                switch (escaped) {
                    // Ignore predefined character classes: \d, \D, \s, \S, \w, \W
                    case 'd':
                    case 'D':
                    case 's':
                    case 'S':
                    case 'w':
                    case 'W':
                    // Ignore special characters: \t, \r, \n, \v, \f, \b, \0
                    // eslint-disable-next-line no-fallthrough
                    case 't':
                    case 'r':
                    case 'n':
                    case 'v':
                    case 'f':
                    case 'b':
                    case '0':
                        resetCurrentToken();
                        i += 1;
                        continue;
                    // Ignore control characters: \cX — control character X
                    case 'c':
                        resetCurrentToken();
                        // skip 'c' and the following character
                        i += 2;
                        continue;
                    // Ignore \xhh
                    case 'x':
                        resetCurrentToken();
                        // skip 'x' and the following 2 characters
                        i += 3;
                        continue;
                    // Ignore \uhhhh
                    case 'u':
                        resetCurrentToken();
                        // skip 'u' and the following 4 characters
                        i += 5;
                        continue;
                    // Ignore named backreference: \k<...>
                    case 'k':
                        resetCurrentToken();
                        // skip 'k'
                        i += 1;
                        if (pattern[i] === '<') {
                            // Skip until the closing '>'
                            i = findNextUnescapedIndex(pattern, '>', i) + 1;
                        }
                        continue;
                    // Special case: add escaped '.' or '/' to the current token
                    case '.':
                    case '/':
                        currentToken += escaped;
                        i += 1;
                        continue;
                    default:
                        resetCurrentToken();
                        i += 1;
                        continue;
                }
            }
            // 2) Handle "regular" characters (i.e., not after a backslash)
            switch (char) {
                // Ignore custom character classes, like [xyz], [^xyz], [\b], [a-z], etc.
                case '[':
                    resetCurrentToken();
                    i = findNextUnescapedIndex(pattern, ']', i) + 1;
                    continue;
                // Ignore disjunctions (alternations), like a|b|c
                // Note: shortcut should be present in all possible tested strings,
                // this is why we ignore disjunctions
                case '|':
                    ignoreCurrentGroup();
                    continue;
                // Ignore specific quantifiers, like x{n}, x{n,}, x{n,m}
                case '{':
                    resetCurrentToken();
                    i = findNextUnescapedIndex(pattern, '}', i) + 1;
                    continue;
                // Handle group open
                case '(':
                    resetCurrentToken();
                    resetGroupToken();
                    groupBalance += 1;
                    // Skip `(`
                    i += 1;
                    // Ignore negative lookahead: (?!...) and negative lookbehind: (?<!...)
                    // Negative lookbehind and lookahead contain data that should not be present in the tested strings,
                    // this is why we ignore them
                    if (pattern.indexOf('?!', i) === i || pattern.indexOf('?<!', i) === i) {
                        ignoreCurrentGroup();
                    }
                    // Ignore name section from named groups: (?<...>
                    if (pattern.indexOf('?<', i) === i) {
                        // Skip until the closing '>'
                        i = findNextUnescapedIndex(pattern, '>', i + 2) + 1;
                    }
                    continue;
                // Handle group close
                case ')':
                    resetCurrentToken();
                    resetGroupToken();
                    groupBalance -= 1;
                    // Skip `)`
                    i += 1;
                    continue;
                // Handle special regex symbols: . * + ? ^ $ /
                case '.':
                case '*':
                case '+':
                case '?':
                case '^':
                case '$':
                case '/':
                    resetCurrentToken();
                    i += 1;
                    continue;
                default:
                    // For performance, let's check if it's a valid token char
                    // Note: isValidRegexpShortcutChar checks for alphanumeric or
                    // escaped '.' or '/'
                    if (isAlphaNumeric(char.charCodeAt(0))) {
                        currentToken += char;
                    }
                    else {
                        // If it's not a valid char for a shortcut, reset
                        resetCurrentToken();
                    }
                    i += 1;
                    break;
            }
        }
        // Finalize the last token
        resetCurrentToken();
        resetGroupToken();
        return longestToken.toLowerCase();
    }
    /**
     * PatternToRegexp is a helper method for creating regular expressions from the simple
     * wildcard-based syntax which is used in basic filters.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#basic-rules}
     *
     * @param pattern Basic rule pattern.
     *
     * @returns Regular expression.
     */
    static patternToRegexp(pattern) {
        if (pattern === this.MASK_START_URL
            || pattern === this.MASK_PIPE
            || pattern === this.MASK_ANY_CHARACTER
            || pattern === '') {
            return this.REGEX_ANY_CHARACTER;
        }
        if (pattern.startsWith(this.MASK_REGEX_RULE) && pattern.endsWith(this.MASK_REGEX_RULE)) {
            // This is a regex rule, just remove the regex markers
            return pattern.substring(this.MASK_REGEX_RULE.length, pattern.length - this.MASK_REGEX_RULE.length);
        }
        // Escape special characters except of * | ^
        let regex = pattern.replace(reSpecialCharacters, '\\$&');
        // Now escape "|" characters but avoid escaping them in the special places
        if (regex.startsWith(this.MASK_START_URL)) {
            regex = regex.substring(0, this.MASK_START_URL.length)
                + replaceAll(regex.substring(this.MASK_START_URL.length, regex.length - this.MASK_PIPE.length), this.MASK_PIPE, `\\${this.MASK_PIPE}`)
                + regex.substring(regex.length - this.MASK_PIPE.length);
        }
        else {
            regex = regex.substring(0, this.MASK_PIPE.length)
                + replaceAll(regex.substring(this.MASK_PIPE.length, regex.length - this.MASK_PIPE.length), this.MASK_PIPE, `\\${this.MASK_PIPE}`)
                + regex.substring(regex.length - this.MASK_PIPE.length);
        }
        // Replace special URL masks
        regex = replaceAll(regex, this.MASK_ANY_CHARACTER, this.REGEX_ANY_CHARACTER);
        regex = replaceAll(regex, this.MASK_SEPARATOR, this.REGEX_SEPARATOR);
        // Replace start URL and pipes
        if (regex.startsWith(this.MASK_START_URL)) {
            regex = this.REGEX_START_URL + regex.substring(this.MASK_START_URL.length);
        }
        else if (regex.startsWith(this.MASK_PIPE)) {
            regex = this.REGEX_START_STRING + regex.substring(this.MASK_PIPE.length);
        }
        if (regex.endsWith(this.MASK_PIPE)) {
            regex = regex.substring(0, regex.length - this.MASK_PIPE.length) + this.REGEX_END_STRING;
        }
        return regex;
    }
    /**
     * Creates RegExp object from string in '/reg_exp/gi' format.
     *
     * @param str The string to escape.
     *
     * @returns The created RegExp object.
     */
    static patternFromString(str) {
        const parts = splitByDelimiterWithEscapeCharacter(str, '/', '\\');
        let modifiers = (parts[1] || '');
        if (modifiers.indexOf('g') < 0) {
            modifiers += 'g';
        }
        return new RegExp(parts[0], modifiers);
    }
    /**
     * Escapes characters with special meaning inside a regular expression.
     *
     * @param str The string to escape.
     * @param searchPattern Pattern for detecting special characters. Optional.
     *
     * @returns The escaped string.
     */
    static escapeRegexSpecials(str, searchPattern = reSpecialCharactersFull) {
        return str.replace(searchPattern, '\\$&');
    }
    /**
     * Unescapes characters with special meaning inside a regular expression.
     *
     * @param str The string to unescape.
     * @param searchPattern Pattern for detecting special characters. Optional.
     *
     * @returns The unescaped string.
     */
    static unescapeRegexSpecials(str, searchPattern = reEscapedSpecialCharactersFull) {
        return str.replace(searchPattern, (match) => match.substring(1));
    }
    /**
     * Check if pattern is Regex.
     *
     * @param str The string to check.
     *
     * @returns True if the string is a regex pattern, false otherwise.
     */
    static isRegexPattern(str) {
        return str.startsWith('/') && str.endsWith('/');
    }
    /**
     * Unescapes special characters in a string.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#using_special_characters_in_strings}
     *
     * @param str The string to unescape.
     *
     * @returns The unescaped string.
     */
    static unescapeSpecials(str) {
        const keys = Object.keys(escapeSequence).join('|');
        const regex = new RegExp(`\\\\(${keys})`, 'g');
        return str.replace(regex, (match, group) => {
            return escapeSequence[group];
        });
    }
}

/**
 * Export logger implementation.
 */
const logger = new _adguard_logger__WEBPACK_IMPORTED_MODULE_3__/* .Logger */ .Vy(console);

/**
 * Pipe separator.
 */
const PIPE_SEPARATOR$1 = '|';
/**
 * This is a helper class that is used specifically to work
 * with domains restrictions.
 *
 * There are two options how you can add a domain restriction:
 * - `$domain` modifier;
 * - domains list for the cosmetic rules.
 *
 * @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#domain-modifier}
 * @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#cosmetic-rules}
 *
 * The only difference between them is that in one case we use `|` as a separator,
 * and in the other case - `,`.
 *
 * @example
 * `||example.org^$domain=example.com|~sub.example.com` -- network rule
 * `example.com,~sub.example.com##banner` -- cosmetic rule
 */
class DomainModifier {
    /**
     * List of permitted domains or null.
     */
    permittedDomains;
    /**
     * List of restricted domains or null.
     */
    restrictedDomains;
    /**
     * Processes domain list node, which means extracting permitted and restricted
     * domains from it.
     *
     * @param domainListNode Domain list node to process.
     *
     * @returns Processed domain list (permitted and restricted domains) ({@link ProcessedDomainList}).
     */
    static processDomainList(domainListNode) {
        const result = {
            permittedDomains: [],
            restrictedDomains: [],
        };
        const { children: domains } = domainListNode;
        for (const { exception, value: domain } of domains) {
            const domainLowerCased = domain.toLowerCase();
            if (!SimpleRegex.isRegexPattern(domain) && domain.includes(WILDCARD) && !domain.endsWith(WILDCARD)) {
                throw new SyntaxError(`Wildcards are only supported for top-level domains: "${domain}"`);
            }
            if (exception) {
                result.restrictedDomains.push(domainLowerCased);
            }
            else {
                result.permittedDomains.push(domainLowerCased);
            }
        }
        return result;
    }
    /**
     * Parses the `domains` string and initializes the object.
     *
     * @param domains Domain list string or AGTree DomainList node.
     * @param separator Separator — `,` or `|`.
     *
     * @throws An error if the domains string is empty or invalid.
     */
    constructor(domains, separator) {
        let processed;
        if (isString(domains)) {
            const node = _adguard_agtree_parser__WEBPACK_IMPORTED_MODULE_9__/* .DomainListParser */ .y.parse(domains.trim(), { ..._adguard_agtree_parser__WEBPACK_IMPORTED_MODULE_10__/* .defaultParserOptions */ .n, isLocIncluded: false }, 0, separator);
            if (node.children.length === 0) {
                throw new SyntaxError('At least one domain must be specified');
            }
            processed = DomainModifier.processDomainList(node);
        }
        else {
            // domain list node stores the separator
            if (separator !== domains.separator) {
                throw new SyntaxError('Separator mismatch');
            }
            processed = DomainModifier.processDomainList(domains);
        }
        // Unescape separator character in domains
        processed.permittedDomains = processed.permittedDomains.map((domain) => unescapeChar(domain, separator));
        processed.restrictedDomains = processed.restrictedDomains.map((domain) => unescapeChar(domain, separator));
        this.restrictedDomains = processed.restrictedDomains.length > 0 ? processed.restrictedDomains : null;
        this.permittedDomains = processed.permittedDomains.length > 0 ? processed.permittedDomains : null;
    }
    /**
     * Checks if the filtering rule is allowed on this domain.
     *
     * @param domain Domain to check.
     *
     * @returns True if the filtering rule is allowed on this domain.
     */
    matchDomain(domain) {
        if (this.hasRestrictedDomains()) {
            if (DomainModifier.isDomainOrSubdomainOfAny(domain, this.restrictedDomains)) {
                // Domain or host is restricted
                // i.e. $domain=~example.org
                return false;
            }
        }
        if (this.hasPermittedDomains()) {
            if (!DomainModifier.isDomainOrSubdomainOfAny(domain, this.permittedDomains)) {
                // Domain is not among permitted
                // i.e. $domain=example.org and we're checking example.com
                return false;
            }
        }
        return true;
    }
    /**
     * Checks if rule has permitted domains.
     *
     * @returns True if the rule has permitted domains.
     */
    hasPermittedDomains() {
        return !!this.permittedDomains && this.permittedDomains.length > 0;
    }
    /**
     * Checks if rule has restricted domains.
     *
     * @returns True if the rule has restricted domains.
     */
    hasRestrictedDomains() {
        return !!this.restrictedDomains && this.restrictedDomains.length > 0;
    }
    /**
     * Gets list of permitted domains.
     *
     * @returns List of permitted domains or null if none.
     */
    getPermittedDomains() {
        return this.permittedDomains;
    }
    /**
     * Gets list of restricted domains.
     *
     * @returns List of restricted domains or null if none.
     */
    getRestrictedDomains() {
        return this.restrictedDomains;
    }
    /**
     * Checks if `domain` is the same or a subdomain
     * of any of `domains`.
     *
     * @param domain Domain to check.
     * @param domains Domains list to check against.
     *
     * @returns True if `domain` is the same or a subdomain of any of `domains`.
     */
    static isDomainOrSubdomainOfAny(domain, domains) {
        for (let i = 0; i < domains.length; i += 1) {
            const d = domains[i];
            if (DomainModifier.isWildcardDomain(d)) {
                if (DomainModifier.matchAsWildcard(d, domain)) {
                    return true;
                }
            }
            if (domain === d || (domain.endsWith(d) && domain.endsWith(`.${d}`))) {
                return true;
            }
            if (SimpleRegex.isRegexPattern(d)) {
                try {
                    /**
                     * Regular expressions are cached internally by the browser
                     * (for instance, they're stored in the CompilationCache in V8/Chromium),
                     * so calling the constructor here should not be a problem.
                     *
                     * TODO: use SimpleRegex.patternFromString(d) after it is refactored to not add 'g' flag.
                     */
                    const domainPattern = new RegExp(d.slice(1, -1));
                    if (domainPattern.test(domain)) {
                        return true;
                    }
                }
                catch {
                    logger.error(`[tsurl.DomainModifier.isDomainOrSubdomainOfAny]: invalid regular expression as domain pattern: "${d}"`);
                }
                continue;
            }
        }
        return false;
    }
    /**
     * Checks if domain ends with wildcard.
     *
     * @param domain Domain string to check.
     *
     * @returns True if domain ends with wildcard.
     */
    static isWildcardDomain(domain) {
        return domain.endsWith('.*');
    }
    /**
     * Checks if domain string does not ends with wildcard and is not regex pattern.
     *
     * @param domain Domain string to check.
     *
     * @returns True if given domain is a wildcard or regexp pattern.
     */
    static isWildcardOrRegexDomain(domain) {
        return DomainModifier.isWildcardDomain(domain) || SimpleRegex.isRegexPattern(domain);
    }
    /**
     * Checks if wildcard matches domain.
     *
     * @param wildcard The wildcard pattern to match against the domain.
     * @param domainNameToCheck The domain name to check against the wildcard pattern.
     *
     * @returns True if wildcard matches domain.
     */
    static matchAsWildcard(wildcard, domainNameToCheck) {
        const wildcardedDomainToCheck = DomainModifier.genTldWildcard(domainNameToCheck);
        if (wildcardedDomainToCheck) {
            return wildcardedDomainToCheck === wildcard
                || (wildcardedDomainToCheck.endsWith(wildcard) && wildcardedDomainToCheck.endsWith(`.${wildcard}`));
        }
        return false;
    }
    /**
     * Generates from domain tld wildcard.
     *
     * @param domainName The domain name to generate the TLD wildcard for.
     *
     * @returns String is empty if tld for provided domain name doesn't exists.
     *
     * @example
     * `google.com` -> `google.*`
     * `youtube.co.uk` -> `youtube.*`
     */
    static genTldWildcard(domainName) {
        // To match eTld like "com.ru" we use allowPrivateDomains wildcard
        // https://github.com/AdguardTeam/AdguardBrowserExtension/issues/2650
        const tld = (0,tldts__WEBPACK_IMPORTED_MODULE_2__/* .getPublicSuffix */ .pj)(domainName, { allowPrivateDomains: true });
        if (tld) {
            // lastIndexOf() is needed not to match the domain, e.g. 'www.chrono24.ch'.
            // https://github.com/AdguardTeam/AdguardBrowserExtension/issues/2312.
            return `${domainName.slice(0, domainName.lastIndexOf(`.${tld}`))}.*`;
        }
        return '';
    }
}

/**
 * Header modifier class.
 * The $header modifier allows matching the HTTP response
 * by a specific header with (optionally) a specific value.
 *
 * @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#header-modifier}
 */
class HeaderModifier {
    /**
     * Colon separator.
     */
    COLON_SEPARATOR = ':';
    /**
     * Forward slash regexp marker.
     */
    FORWARD_SLASH = '/';
    /**
     * Header name to match on request.
     */
    header;
    /**
     * Header value to match on request.
     * Empty string if value is not specified, and, in that case,
     * only header name will be matched.
     */
    value;
    /**
     * Constructor.
     *
     * @param headerStr Header modifier value.
     */
    constructor(headerStr) {
        if (headerStr === '') {
            throw new SyntaxError('$header modifier value cannot be empty');
        }
        const separatorIndex = headerStr.indexOf(this.COLON_SEPARATOR);
        if (separatorIndex === -1) {
            this.header = headerStr;
            this.value = null;
            return;
        }
        this.header = headerStr.slice(0, separatorIndex);
        const rawValue = headerStr.slice(separatorIndex + 1);
        if (rawValue === '') {
            throw new SyntaxError(`Invalid $header modifier value: "${headerStr}"`);
        }
        if (rawValue.startsWith(this.FORWARD_SLASH) && rawValue.endsWith(this.FORWARD_SLASH)) {
            this.value = new RegExp(rawValue.slice(1, -1));
        }
        else {
            this.value = rawValue;
        }
    }
    /**
     * Returns header modifier value.
     *
     * @returns Header modifier value.
     */
    getHeaderModifierValue() {
        return {
            header: this.header,
            value: this.value,
        };
    }
}

const PERMISSIONS_POLICY_HEADER_NAME = 'Permissions-Policy';
const COMMA_SEPARATOR = ',';
const PIPE_SEPARATOR = '|';
/**
 * Permissions modifier class.
 * Allows setting permission policies, effectively blocking specific page functionality.
 *
 * @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#permissions-modifier}
 */
class PermissionsModifier {
    /**
     * Permission Policy directive.
     */
    permissionPolicyDirective;
    /**
     * Regular expression to apply correct separators.
     * It replaces escaped commas and pipe separators with commas.
     */
    static RE_SEPARATOR_REPLACE = new RegExp(`(\\\\${COMMA_SEPARATOR}|\\${PIPE_SEPARATOR})`, 'g');
    /**
     * Constructor.
     *
     * @param permissionPolicyStr The permission policy string to be set.
     * @param isAllowlist Indicates if the permission policy is for an allowlist.
     */
    constructor(permissionPolicyStr, isAllowlist) {
        this.permissionPolicyDirective = permissionPolicyStr
            .replace(PermissionsModifier.RE_SEPARATOR_REPLACE, COMMA_SEPARATOR);
        PermissionsModifier.validatePermissionPolicyDirective(this.permissionPolicyDirective, isAllowlist);
    }
    /**
     * Returns permission policy allowlist string.
     *
     * @returns Permission policy allowlist string.
     */
    getValue() {
        return this.permissionPolicyDirective;
    }
    /**
     * Validates permission policy directive.
     *
     * @param directive The permission policy directive to validate.
     * @param isAllowlist Indicates if the directive is for an allowlist.
     *
     * @throws SyntaxError on invalid permission policy directive.
     */
    static validatePermissionPolicyDirective(directive, isAllowlist) {
        /**
         * $permissions modifier value may be empty only in case of allowlist rule,
         * it means to disable all $permissions rules matching the rule pattern.
         */
        if (!isAllowlist && !directive) {
            throw new SyntaxError('Invalid $permissions rule: permissions directive must not be empty');
        }
    }
}

/**
 * Redirect modifier class.
 */
class RedirectModifier {
    /**
     * Redirect title.
     */
    redirectTitle;
    /**
     * Is redirecting only blocked requests
     * See $redirect-rule options.
     */
    isRedirectingOnlyBlocked = false;
    /**
     * Constructor.
     *
     * @param value Redirect modifier value.
     * @param isAllowlist Is allowlist rule.
     * @param isRedirectingOnlyBlocked Is redirect-rule modifier.
     */
    constructor(value, isAllowlist, isRedirectingOnlyBlocked = false) {
        RedirectModifier.validate(value, isAllowlist);
        this.redirectTitle = value;
        this.isRedirectingOnlyBlocked = isRedirectingOnlyBlocked;
    }
    /**
     * Redirect title.
     *
     * @returns The redirect title.
     */
    getValue() {
        return this.redirectTitle;
    }
    /**
     * Validates redirect rule.
     *
     * @param redirectTitle The title of the redirect.
     * @param isAllowlist Indicates if the rule is an allowlist rule.
     */
    static validate(redirectTitle, isAllowlist) {
        if (isAllowlist && !redirectTitle) {
            return;
        }
        if (!redirectTitle) {
            throw new SyntaxError('Invalid $redirect rule, redirect value must not be empty');
        }
        if (!(0,_adguard_scriptlets_validators__WEBPACK_IMPORTED_MODULE_11__/* .isRedirectResourceCompatibleWithAdg */ .td)(redirectTitle)) {
            throw new SyntaxError('$redirect modifier is invalid');
        }
    }
}

/**
 * Headers filtering modifier class.
 * Rules with $removeheader modifier are intended to remove headers from HTTP requests and responses.
 */
class RemoveHeaderModifier {
    /**
     * List of forbidden headers.
     */
    static FORBIDDEN_HEADERS = [
        'access-control-allow-origin',
        'access-control-allow-credentials',
        'access-control-allow-headers',
        'access-control-allow-methods',
        'access-control-expose-headers',
        'access-control-max-age',
        'access-control-request-headers',
        'access-control-request-method',
        'origin',
        'timing-allow-origin',
        'allow',
        'cross-origin-embedder-policy',
        'cross-origin-opener-policy',
        'cross-origin-resource-policy',
        'content-security-policy',
        'content-security-policy-report-only',
        'expect-ct',
        'feature-policy',
        'origin-isolation',
        'strict-transport-security',
        'upgrade-insecure-requests',
        'x-content-type-options',
        'x-download-options',
        'x-frame-options',
        'x-permitted-cross-domain-policies',
        'x-powered-by',
        'x-xss-protection',
        'public-key-pins',
        'public-key-pins-report-only',
        'sec-websocket-key',
        'sec-websocket-extensions',
        'sec-websocket-accept',
        'sec-websocket-protocol',
        'sec-websocket-version',
        'p3p',
        'sec-fetch-mode',
        'sec-fetch-dest',
        'sec-fetch-site',
        'sec-fetch-user',
        'referrer-policy',
        'content-type',
        'content-length',
        'accept',
        'accept-encoding',
        'host',
        'connection',
        'transfer-encoding',
        'upgrade',
    ];
    /**
     * Request prefix.
     */
    static REQUEST_PREFIX = 'request:';
    /**
     * Prefixed headers are applied to request headers.
     */
    isRequestModifier;
    /**
     * Effective header name to be removed.
     */
    applicableHeaderName;
    /**
     * Value.
     */
    value;
    /**
     * Is rule valid or not.
     */
    valid;
    /**
     * Constructor.
     *
     * @param value Value of the modifier.
     * @param isAllowlist Whether the rule is an allowlist rule or not.
     */
    constructor(value, isAllowlist) {
        this.value = value.toLowerCase();
        if (!isAllowlist && !this.value) {
            throw new SyntaxError('Invalid $removeheader rule, removeheader value must not be empty');
        }
        this.isRequestModifier = this.value.startsWith(RemoveHeaderModifier.REQUEST_PREFIX);
        const headerName = this.isRequestModifier
            ? this.value.substring(RemoveHeaderModifier.REQUEST_PREFIX.length)
            : this.value;
        // Values with ":" are not supported in MV3 declarative rules, e.g. "$removeheader=dnt:1"
        this.valid = RemoveHeaderModifier.isAllowedHeader(headerName) && !headerName.includes(':');
        this.applicableHeaderName = this.valid ? headerName : null;
    }
    /**
     * Modifier value.
     *
     * @returns The value of the modifier.
     */
    getValue() {
        return this.value;
    }
    /**
     * Modifier validity.
     *
     * @returns True if the rule is valid, false otherwise.
     */
    get isValid() {
        return this.valid;
    }
    /**
     * Checks if the given modifier is an instance of RemoveHeaderModifier.
     *
     * @param m The modifier to check.
     *
     * @returns True if the modifier is an instance of RemoveHeaderModifier, false otherwise.
     */
    static isRemoveHeaderModifier = (m) => {
        return m instanceof RemoveHeaderModifier;
    };
    /**
     * Returns effective header name to be removed.
     *
     * @param isRequestHeaders Flag to determine that the header is a *request* header,
     * otherwise *response* header.
     *
     * @returns The applicable header name if valid, otherwise null.
     */
    getApplicableHeaderName(isRequestHeaders) {
        if (!this.applicableHeaderName) {
            return null;
        }
        if (isRequestHeaders !== this.isRequestModifier) {
            return null;
        }
        return this.applicableHeaderName;
    }
    /**
     * Some headers are forbidden to remove.
     *
     * @param headerName Header name to check.
     *
     * @returns True if the header is allowed to be removed, false otherwise.
     */
    static isAllowedHeader(headerName) {
        return !this.FORBIDDEN_HEADERS.includes(headerName);
    }
}

/**
 * Splits url into parts.
 *
 * @param url The URL to be checked.
 *
 * @returns An object containing the path, query, and hash of the URL.
 */
function splitUrl(url) {
    let strippedUrl = url;
    let hash = '';
    const hashIndex = url.indexOf('#');
    if (hashIndex >= 0) {
        hash = url.slice(hashIndex);
        strippedUrl = url.slice(0, hashIndex);
    }
    let query = '';
    const queryIndex = url.indexOf('?');
    if (queryIndex >= 0) {
        query = strippedUrl.slice(queryIndex + 1);
        strippedUrl = strippedUrl.slice(0, queryIndex);
    }
    return {
        path: strippedUrl,
        query,
        hash,
    };
}
/**
 * Normalizes url query parameters.
 *
 * @param query The query string to be normalized.
 *
 * @returns The normalized query string.
 */
function normalizeQuery(query) {
    // Cleanup empty params (p0=0&=2&=3)
    let result = query
        .split('&')
        .filter((x) => x && !x.startsWith('='))
        .join('&');
    // If we've collapsed the URL to the point where there's an '&' against the '?'
    // then we need to get rid of that.
    while (result.charAt(0) === '&') {
        result = result.slice(1);
    }
    return result;
}
/**
 * Removes query params from url by regexp.
 *
 * @param url The URL from which query parameters will be removed.
 * @param regExp The regular expression to match query parameters.
 * @param invert Remove every parameter in url except the ones matched regexp.
 *
 * @returns The URL with the specified query parameters removed.
 */
function cleanUrlParamByRegExp(url, regExp, invert = false) {
    const searchIndex = url.indexOf('?');
    // If no params, nothing to modify
    if (searchIndex === -1) {
        return url;
    }
    const split = splitUrl(url);
    /**
     * We are checking both regular param and decoded param, in case if regexp
     * contains decoded params and url contains encoded params.
     *
     * @see {@link https://github.com/AdguardTeam/AdguardBrowserExtension/issues/3015}
     */
    let modifiedQuery;
    if (invert) {
        modifiedQuery = split.query
            .split('&')
            .filter((x) => x && (x.match(regExp) || decodeURIComponent(x).match(regExp)))
            .join('&');
    }
    else {
        modifiedQuery = split.query
            .split('&')
            .filter((x) => {
            const test = x.includes('=') ? x : `${x}=`;
            return !test.match(regExp) && !decodeURIComponent(test).match(regExp);
        })
            .join('&');
    }
    // Do not normalize if regexp is not applied
    if (modifiedQuery === split.query) {
        return url;
    }
    modifiedQuery = normalizeQuery(modifiedQuery);
    let result = split.path;
    if (modifiedQuery) {
        result += `?${modifiedQuery}`;
    }
    return result + split.hash;
}
/**
 * Extract relative part from hierarchical structured URL.
 *
 * @param url The URL from which the relative part will be extracted.
 *
 * @returns The relative part of the URL or null if not found.
 */
const getRelativeUrl = (url) => {
    const i = url.indexOf('/', url.indexOf('://') + 3);
    return i !== -1 ? url.slice(i) : null;
};

/**
 * Query parameters filtering modifier class.
 * Works with `$removeparam` modifier.
 */
class RemoveParamModifier {
    /**
     * Value of the modifier.
     */
    value;
    /**
     * Is modifier valid for MV3 or not.
     *
     * @returns True if the modifier is valid for MV3, false otherwise.
     */
    mv3Valid = true;
    /**
     * RegExp to apply.
     */
    valueRegExp;
    /**
     * Constructor.
     *
     * @param value The value used to initialize the modifier.
     */
    constructor(value) {
        this.value = value;
        let rawValue = value;
        // TODO: Seems like negation not using in valueRegExp
        if (value.startsWith('~')) {
            rawValue = value.substring(1);
            this.mv3Valid = false;
        }
        if (rawValue.startsWith('/')) {
            this.valueRegExp = SimpleRegex.patternFromString(rawValue);
            this.mv3Valid = false;
        }
        else {
            if (rawValue.includes('|')) {
                throw new Error('Unsupported option in $removeparam: multiple values are not allowed');
            }
            // no need to match "&" in the beginning, because we are splitting by "&"
            // https://github.com/AdguardTeam/AdguardBrowserExtension/issues/3076
            this.valueRegExp = new RegExp(`^${SimpleRegex.escapeRegexSpecials(rawValue)}=[^&#]*$`, 'g');
        }
    }
    /**
     * Modifier value.
     *
     * @returns The value of the modifier.
     */
    getValue() {
        return this.value;
    }
    /**
     * Is modifier valid for MV3 or not.
     *
     * @returns True if the modifier is valid for MV3, false otherwise.
     */
    getMV3Validity() {
        return this.mv3Valid;
    }
    /**
     * Checks if the given modifier is an instance of RemoveParamModifier.
     *
     * @param m The modifier to check.
     *
     * @returns True if the modifier is an instance of RemoveParamModifier, false otherwise.
     */
    static isRemoveParamModifier = (m) => {
        return m instanceof RemoveParamModifier;
    };
    /**
     * Removes query parameters from url.
     *
     * @param url The URL from which query parameters should be removed.
     *
     * @returns The URL with the query parameters removed.
     */
    removeParameters(url) {
        const sepIndex = url.indexOf('?');
        if (sepIndex < 0) {
            return url;
        }
        if (!this.value) {
            return url.substring(0, sepIndex);
        }
        if (sepIndex === url.length - 1) {
            return url;
        }
        if (this.value.startsWith('~')) {
            return cleanUrlParamByRegExp(url, this.valueRegExp, true);
        }
        return cleanUrlParamByRegExp(url, this.valueRegExp);
    }
}

/**
 * Replace modifier class.
 */
class ReplaceModifier {
    /**
     * Replace option value.
     */
    replaceOption;
    /**
     * Replace option apply function.
     */
    replaceApply;
    /**
     * Constructor.
     *
     * @param value Replace modifier value.
     */
    constructor(value) {
        const parsed = ReplaceModifier.parseReplaceOption(value);
        this.replaceOption = parsed.optionText;
        this.replaceApply = parsed.apply;
    }
    /**
     * Parses replace option.
     *
     * @param option Replace option.
     *
     * @returns Parsed replace option.
     */
    static parseReplaceOption(option) {
        if (!option) {
            return {
                apply: (x) => x,
                optionText: '',
            };
        }
        const parts = splitByDelimiterWithEscapeCharacter(option, '/', '\\');
        let modifiers = (parts[2] || '');
        if (modifiers.indexOf('g') < 0) {
            modifiers += 'g';
        }
        const pattern = new RegExp(parts[0], modifiers);
        // unescape replacement alias
        let replacement = parts[1].replace(/\\\$/g, '$');
        replacement = SimpleRegex.unescapeSpecials(replacement);
        const apply = (input) => input.replace(pattern, replacement);
        return {
            apply,
            optionText: option,
        };
    }
    /**
     * Replace content.
     *
     * @returns The replace option value.
     */
    getValue() {
        return this.replaceOption;
    }
    /**
     * Replace apply function.
     *
     * @returns The function to apply the replacement.
     */
    getApplyFunc() {
        return this.replaceApply;
    }
}

/**
 * Array of all stealth options available, even those which are not supported by browser extension.
 */
var UniversalStealthOption;
(function (UniversalStealthOption) {
    UniversalStealthOption["HideSearchQueries"] = "searchqueries";
    UniversalStealthOption["DoNotTrack"] = "donottrack";
    UniversalStealthOption["ThirdPartyCookies"] = "3p-cookie";
    UniversalStealthOption["FirstPartyCookies"] = "1p-cookie";
    UniversalStealthOption["ThirdPartyCache"] = "3p-cache";
    UniversalStealthOption["ThirdPartyAuth"] = "3p-auth";
    UniversalStealthOption["WebRTC"] = "webrtc";
    UniversalStealthOption["Push"] = "push";
    UniversalStealthOption["Location"] = "location";
    UniversalStealthOption["Flash"] = "flash";
    UniversalStealthOption["Java"] = "java";
    UniversalStealthOption["HideReferrer"] = "referrer";
    UniversalStealthOption["UserAgent"] = "useragent";
    UniversalStealthOption["IP"] = "ip";
    UniversalStealthOption["XClientData"] = "xclientdata";
    UniversalStealthOption["DPI"] = "dpi";
})(UniversalStealthOption || (UniversalStealthOption = {}));
/**
 * List of stealth options, supported by browser extension, which can be disabled by $stealth modifier.
 *
 * Following stealth options are initialized on the engine start
 * and can't be disabled via $stealth modifier:
 * - `Block trackers` and `Remove tracking parameters`, as they are applied by a specific
 *   rule lists, initialized on app start;
 * - `Disabling WebRTC`, as it is not being applied on per-request basis.
 */
var StealthOptionName;
(function (StealthOptionName) {
    StealthOptionName["HideSearchQueries"] = "searchqueries";
    StealthOptionName["DoNotTrack"] = "donottrack";
    StealthOptionName["HideReferrer"] = "referrer";
    StealthOptionName["XClientData"] = "xclientdata";
    StealthOptionName["FirstPartyCookies"] = "1p-cookie";
    StealthOptionName["ThirdPartyCookies"] = "3p-cookie";
})(StealthOptionName || (StealthOptionName = {}));
const StealthModifierOptions = new Set(Object.values(StealthOptionName));
const UniversalStealthOptions = new Set(Object.values(UniversalStealthOption));
const StealthOption = {
    NotSet: 0,
    [StealthOptionName.HideSearchQueries]: 1,
    [StealthOptionName.DoNotTrack]: 1 << 1,
    [StealthOptionName.HideReferrer]: 1 << 2,
    [StealthOptionName.XClientData]: 1 << 3,
    [StealthOptionName.FirstPartyCookies]: 1 << 4,
    [StealthOptionName.ThirdPartyCookies]: 1 << 5,
};
/**
 * Stealth modifier class.
 * Rules with $stealth modifier will disable specified stealth options for matched requests.
 *
 * @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#stealth-modifier}
 */
class StealthModifier {
    /**
     * Pipe separator.
     */
    PIPE_SEPARATOR = '|';
    /**
     * Options.
     */
    options = StealthOption.NotSet;
    /**
     * Parses the options string and creates a new stealth modifier instance.
     *
     * @param optionsStr Options string.
     *
     * @throws SyntaxError on inverted stealth options, which are not supported.
     */
    constructor(optionsStr) {
        if (optionsStr.trim().length === 0) {
            return;
        }
        // This prevents parsing invalid syntax as rule without supported options
        if (optionsStr.includes(',')) {
            throw new SyntaxError(`Invalid separator of stealth options used: "${optionsStr}"`);
        }
        const tokens = optionsStr.split(this.PIPE_SEPARATOR);
        for (let i = 0; i < tokens.length; i += 1) {
            const optionName = tokens[i].trim();
            if (optionName === '') {
                continue;
            }
            if (optionName.startsWith('~')) {
                throw new SyntaxError(`Inverted $stealth modifier values are not allowed: "${optionsStr}"`);
            }
            if (!StealthModifier.isValidStealthOption(optionName)) {
                throw new SyntaxError(`Invalid $stealth option in modifier value: "${optionsStr}"`);
            }
            // Skip options which are not supported by browser extension
            if (!StealthModifier.isSupportedStealthOption(optionName)) {
                continue;
            }
            const option = StealthOption[optionName];
            if (this.options & option) {
                // TODO: Change log level to 'warn' after AG-42379
                logger.trace(`[tsurl.StealthModifier.constructor]: duplicate $stealth modifier value "${optionName}" in "${optionsStr}"`);
            }
            this.options |= option;
        }
        if (this.options === StealthOption.NotSet) {
            // TODO: Change log level to 'warn' after AG-42379
            logger.trace(`[tsurl.StealthModifier.constructor]: $stealth modifier does not contain any options supported by browser extension: "${optionsStr}"`);
        }
    }
    /**
     * Checks if the given string is a valid $stealth option, supported by browser extension.
     *
     * @param option Option name.
     *
     * @returns True if the given string is a valid $stealth option.
     */
    static isSupportedStealthOption = (option) => StealthModifierOptions.has(option);
    /**
     * Checks if the given string is a valid $stealth option.
     *
     * @param option Option name.
     *
     * @returns True if the given string is a valid $stealth option.
     */
    static isValidStealthOption = (option) => UniversalStealthOptions.has(option);
    /**
     * Checks if this stealth modifier has values.
     *
     * @returns True if this stealth modifier has at least one value.
     */
    hasValues() {
        return this.options !== StealthOption.NotSet;
    }
    /**
     * Checks if this stealth modifier is disabling the given stealth option.
     *
     * @param optionName Stealth option name.
     *
     * @returns True if this stealth modifier is disabling the given stealth option.
     */
    hasStealthOption(optionName) {
        const option = StealthOption[optionName];
        return !!(option && this.options & option);
    }
}

/**
 * `$to` modifier class.
 * Rules with $to modifier are limited to requests made to the specified domains and their subdomains.
 *
 * @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#to-modifier}
 */
class ToModifier {
    /**
     * Domains separator.
     */
    static PIPE_SEPARATOR = '|';
    /**
     * List of permitted domains or null.
     */
    permittedValues;
    /**
     * List of restricted domains or null.
     */
    restrictedValues;
    /**
     * Constructor.
     *
     * @param domainsStr String with domains separated by `|`.
     */
    constructor(domainsStr) {
        if (!domainsStr) {
            throw new SyntaxError('$to modifier value cannot be empty');
        }
        const permittedDomains = [];
        const restrictedDomains = [];
        const parts = domainsStr.toLowerCase().split(ToModifier.PIPE_SEPARATOR);
        for (let i = 0; i < parts.length; i += 1) {
            let domain = parts[i].trim();
            let restricted = false;
            if (domain.startsWith('~')) {
                restricted = true;
                domain = domain.substring(1);
            }
            if (domain === '') {
                throw new SyntaxError(`Empty domain specified in "${domainsStr}"`);
            }
            if (restricted) {
                restrictedDomains.push(domain);
            }
            else {
                permittedDomains.push(domain);
            }
        }
        this.restrictedValues = restrictedDomains.length > 0 ? restrictedDomains : null;
        this.permittedValues = permittedDomains.length > 0 ? permittedDomains : null;
    }
}

/* eslint-disable no-param-reassign */
/**
 * Counts the number of set bits (1s) in a 32-bit number using Hamming Weight (SWAR) method.
 *
 * @param a Number to count bits in.
 *
 * @returns The number of bits set to 1.
 */
function getBitCount(a) {
    a -= ((a >>> 1) & 0x55555555);
    a = (a & 0x33333333) + ((a >>> 2) & 0x33333333);
    a = (a + (a >>> 4)) & 0x0F0F0F0F;
    a += (a >>> 8);
    a += (a >>> 16);
    return a & 0x3F;
}
/**
 * Count the number of bits enabled in a number based on a bit mask.
 *
 * @param base Base number to check.
 * @param mask Mask to apply.
 *
 * @returns Number of bits set in `base & mask`.
 */
function countEnabledBits(base, mask) {
    return getBitCount(base & mask);
}

const NETWORK_RULE_OPTIONS = {
    THIRD_PARTY: 'third-party',
    FIRST_PARTY: 'first-party',
    MATCH_CASE: 'match-case',
    IMPORTANT: 'important',
    DOMAIN: 'domain',
    DENYALLOW: 'denyallow',
    ELEMHIDE: 'elemhide',
    GENERICHIDE: 'generichide',
    SPECIFICHIDE: 'specifichide',
    GENERICBLOCK: 'genericblock',
    JSINJECT: 'jsinject',
    URLBLOCK: 'urlblock',
    CONTENT: 'content',
    DOCUMENT: 'document',
    DOC: 'doc',
    STEALTH: 'stealth',
    POPUP: 'popup',
    EMPTY: 'empty',
    MP4: 'mp4',
    SCRIPT: 'script',
    STYLESHEET: 'stylesheet',
    SUBDOCUMENT: 'subdocument',
    OBJECT: 'object',
    IMAGE: 'image',
    XMLHTTPREQUEST: 'xmlhttprequest',
    MEDIA: 'media',
    FONT: 'font',
    WEBSOCKET: 'websocket',
    OTHER: 'other',
    PING: 'ping',
    BADFILTER: 'badfilter',
    CSP: 'csp',
    REPLACE: 'replace',
    COOKIE: 'cookie',
    REDIRECT: 'redirect',
    REDIRECTRULE: 'redirect-rule',
    REMOVEPARAM: 'removeparam',
    REMOVEHEADER: 'removeheader',
    JSONPRUNE: 'jsonprune',
    HLS: 'hls',
    REFERRERPOLICY: 'referrerpolicy',
    APP: 'app',
    NETWORK: 'network',
    EXTENSION: 'extension',
    NOOP: '_',
    CLIENT: 'client',
    DNSREWRITE: 'dnsrewrite',
    DNSTYPE: 'dnstype',
    CTAG: 'ctag',
    HEADER: 'header',
    METHOD: 'method',
    TO: 'to',
    PERMISSIONS: 'permissions',
    ALL: 'all',
};
const OPTIONS_DELIMITER = '$';
const MASK_ALLOWLIST = '@@';
const NOT_MARK = '~';

/**
 * Rule pattern class.
 *
 * This class parses rule pattern text to simple fields.
 */
class Pattern {
    /**
     * Original pattern text.
     */
    pattern;
    /**
     * Shortcut string.
     */
    shortcut;
    /**
     * If this pattern already prepared indicator.
     */
    prepared;
    /**
     * Parsed hostname.
     */
    hostname;
    /**
     * Parsed regular expression.
     */
    regex;
    /**
     * Invalid regex flag.
     */
    regexInvalid;
    /**
     * Domain specific pattern flag.
     */
    patternDomainSpecific;
    /**
     * If true, pattern and shortcut are the same.
     * In this case, we don't actually need to use `matchPattern`
     * if shortcut was already matched.
     */
    patternShortcut;
    /**
     * If pattern is match-case regex.
     */
    matchcase;
    /**
     * Constructor.
     *
     * @param pattern Pattern.
     * @param matchcase Flag for case-sensitive matching, default is false.
     */
    constructor(pattern, matchcase = false) {
        this.pattern = pattern;
        this.shortcut = SimpleRegex.extractShortcut(this.pattern);
        this.matchcase = matchcase;
    }
    /**
     * Checks if this rule pattern matches the specified request.
     *
     * @param request Request to check.
     * @param shortcutMatched If true, it means that the request already matches
     * this pattern's shortcut and we don't need to match it again.
     *
     * @returns True if pattern matches.
     */
    matchPattern(request, shortcutMatched) {
        this.prepare();
        if (this.patternShortcut) {
            return shortcutMatched || this.matchShortcut(request.urlLowercase);
        }
        if (this.hostname) {
            // If we have a `||example.org^` rule, it's easier to match
            // against the request's hostname only without matching
            // a regular expression.
            return request.hostname === this.hostname
                || ( // First light check without new string memory allocation
                request.hostname.endsWith(this.hostname)
                    // Strict check
                    && request.hostname.endsWith(`.${this.hostname}`));
        }
        // If the regular expression is invalid, just return false right away.
        if (this.regexInvalid || !this.regex) {
            return false;
        }
        // This is needed for DNS filtering only, not used in browser blocking.
        if (this.shouldMatchHostname(request)) {
            return this.regex.test(request.hostname);
        }
        return this.regex.test(request.url);
    }
    /**
     * Checks if this rule pattern matches the specified relative path string.
     * This method is used in cosmetic rules to implement the $path modifier matching logic.
     *
     * @param path Path to check.
     *
     * @returns True if pattern matches.
     */
    matchPathPattern(path) {
        this.prepare();
        if (this.hostname) {
            return false;
        }
        const pathIsEmptyString = this.pattern === '';
        // No-value $path should match root URL
        if (pathIsEmptyString && path === '/') {
            return true;
        }
        if (!pathIsEmptyString && this.patternShortcut) {
            return this.matchShortcut(path);
        }
        // If the regular expression is invalid, just return false right away.
        if (this.regexInvalid || !this.regex) {
            return false;
        }
        return this.regex.test(path);
    }
    /**
     * Simply checks if shortcut is a substring of the URL.
     *
     * @param str Shortcut to check.
     *
     * @returns True if the shortcut is a substring of the URL.
     */
    matchShortcut(str) {
        return str.indexOf(this.shortcut) >= 0;
    }
    /**
     * Prepares this pattern.
     */
    prepare() {
        if (this.prepared) {
            return;
        }
        this.prepared = true;
        // If shortcut and pattern are the same, we don't need to actually compile
        // a regex and can simply use matchShortcut instead,
        // except for the $match-case modifier
        if (this.pattern === this.shortcut && !this.matchcase) {
            this.patternShortcut = true;
            return;
        }
        // Rules like `/example/*` are rather often in the real-life filters,
        // we might want to process them.
        if (this.pattern.startsWith(this.shortcut)
            && this.pattern.length === this.shortcut.length + 1
            && this.pattern.endsWith('*')) {
            this.patternShortcut = true;
            return;
        }
        if (this.pattern.startsWith(SimpleRegex.MASK_START_URL)
            && this.pattern.endsWith(SimpleRegex.MASK_SEPARATOR)
            && this.pattern.indexOf('*') < 0
            && this.pattern.indexOf('/') < 0) {
            this.hostname = this.pattern.slice(2, this.pattern.length - 1);
            return;
        }
        this.compileRegex();
    }
    /**
     * Compiles this pattern regex.
     */
    compileRegex() {
        const regexText = SimpleRegex.patternToRegexp(this.pattern);
        try {
            let flags = 'i';
            if (this.matchcase) {
                flags = '';
            }
            this.regex = new RegExp(regexText, flags);
        }
        catch (e) {
            this.regexInvalid = true;
        }
    }
    /**
     * Checks if we should match hostnames and not the URL
     * this is important for the cases when we use urlfilter for DNS-level blocking
     * Note, that even though we may work on a DNS-level, we should still sometimes match full URL instead.
     *
     * @param request Request to check.
     *
     * @returns True if the hostname should be matched.
     */
    shouldMatchHostname(request) {
        if (!request.isHostnameRequest) {
            return false;
        }
        return !this.isPatternDomainSpecific();
    }
    /**
     * In case pattern starts with the following it targets some specific domain.
     *
     * @returns True if the pattern targets a specific domain.
     */
    isPatternDomainSpecific() {
        if (this.patternDomainSpecific === undefined) {
            this.patternDomainSpecific = this.pattern.startsWith(SimpleRegex.MASK_START_URL)
                || this.pattern.startsWith('http://')
                || this.pattern.startsWith('https:/')
                || this.pattern.startsWith('://');
        }
        return this.patternDomainSpecific;
    }
}

/* eslint-disable max-classes-per-file */
/**
 * Default rule index for source mapping.
 *
 * It is -1, similar to `Array.indexOf()` return value when element is not found.
 */
const RULE_INDEX_NONE = -1;
/**
 * Rule with index.
 */
// TODO: Consider remove this because rule already has an index field
class IndexedRule {
    /**
     * Rule.
     */
    rule;
    /**
     * Index.
     */
    index;
    /**
     * Constructor.
     *
     * @param rule Rule.
     * @param index Index of the rule.
     */
    constructor(rule, index) {
        this.rule = rule;
        this.index = index;
    }
}

/**
 * NetworkRuleOption is the enumeration of various rule options.
 * In order to save memory, we store some options as a flag.
 *
 * @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#basic-rule-modifiers}
 */
var NetworkRuleOption;
(function (NetworkRuleOption) {
    /**
     * No value is set. Syntax sugar to simplify code.
     */
    NetworkRuleOption[NetworkRuleOption["NotSet"] = 0] = "NotSet";
    /**
     * $third-party modifier.
     */
    NetworkRuleOption[NetworkRuleOption["ThirdParty"] = 1] = "ThirdParty";
    /**
     * $match-case modifier.
     */
    NetworkRuleOption[NetworkRuleOption["MatchCase"] = 2] = "MatchCase";
    /**
     * $important modifier.
     */
    NetworkRuleOption[NetworkRuleOption["Important"] = 4] = "Important";
    // Allowlist rules modifiers
    // Each of them can disable part of the functionality
    /**
     * $elemhide modifier.
     */
    NetworkRuleOption[NetworkRuleOption["Elemhide"] = 8] = "Elemhide";
    /**
     * $generichide modifier.
     */
    NetworkRuleOption[NetworkRuleOption["Generichide"] = 16] = "Generichide";
    /**
     * $specifichide modifier.
     */
    NetworkRuleOption[NetworkRuleOption["Specifichide"] = 32] = "Specifichide";
    /**
     * $genericblock modifier.
     */
    NetworkRuleOption[NetworkRuleOption["Genericblock"] = 64] = "Genericblock";
    /**
     * $jsinject modifier.
     */
    NetworkRuleOption[NetworkRuleOption["Jsinject"] = 128] = "Jsinject";
    /**
     * $urlblock modifier.
     */
    NetworkRuleOption[NetworkRuleOption["Urlblock"] = 256] = "Urlblock";
    /**
     * $content modifier.
     */
    NetworkRuleOption[NetworkRuleOption["Content"] = 512] = "Content";
    /**
     * $extension modifier.
     */
    NetworkRuleOption[NetworkRuleOption["Extension"] = 1024] = "Extension";
    /**
     * $stealth modifier.
     */
    NetworkRuleOption[NetworkRuleOption["Stealth"] = 2048] = "Stealth";
    // Other modifiers
    /**
     * $popup modifier.
     */
    NetworkRuleOption[NetworkRuleOption["Popup"] = 4096] = "Popup";
    /**
     * $csp modifier.
     */
    NetworkRuleOption[NetworkRuleOption["Csp"] = 8192] = "Csp";
    /**
     * $replace modifier.
     */
    NetworkRuleOption[NetworkRuleOption["Replace"] = 16384] = "Replace";
    /**
     * $cookie modifier.
     */
    NetworkRuleOption[NetworkRuleOption["Cookie"] = 32768] = "Cookie";
    /**
     * $redirect modifier.
     */
    NetworkRuleOption[NetworkRuleOption["Redirect"] = 65536] = "Redirect";
    /**
     * $badfilter modifier.
     */
    NetworkRuleOption[NetworkRuleOption["Badfilter"] = 131072] = "Badfilter";
    /**
     * $removeparam modifier.
     */
    NetworkRuleOption[NetworkRuleOption["RemoveParam"] = 262144] = "RemoveParam";
    /**
     * $removeheader modifier.
     */
    NetworkRuleOption[NetworkRuleOption["RemoveHeader"] = 524288] = "RemoveHeader";
    /**
     * $jsonprune modifier.
     */
    NetworkRuleOption[NetworkRuleOption["JsonPrune"] = 1048576] = "JsonPrune";
    /**
     * $hls modifier.
     */
    NetworkRuleOption[NetworkRuleOption["Hls"] = 2097152] = "Hls";
    // Compatibility dependent
    /**
     * $network modifier.
     */
    NetworkRuleOption[NetworkRuleOption["Network"] = 4194304] = "Network";
    /**
     * Dns modifiers.
     */
    NetworkRuleOption[NetworkRuleOption["Client"] = 8388608] = "Client";
    NetworkRuleOption[NetworkRuleOption["DnsRewrite"] = 16777216] = "DnsRewrite";
    NetworkRuleOption[NetworkRuleOption["DnsType"] = 33554432] = "DnsType";
    NetworkRuleOption[NetworkRuleOption["Ctag"] = 67108864] = "Ctag";
    /**
     * $method modifier.
     */
    NetworkRuleOption[NetworkRuleOption["Method"] = 134217728] = "Method";
    /**
     * $to modifier.
     */
    NetworkRuleOption[NetworkRuleOption["To"] = 268435456] = "To";
    /**
     * $permissions modifier.
     */
    NetworkRuleOption[NetworkRuleOption["Permissions"] = 536870912] = "Permissions";
    /**
     * $header modifier.
     */
    NetworkRuleOption[NetworkRuleOption["Header"] = 1073741824] = "Header";
})(NetworkRuleOption || (NetworkRuleOption = {}));
/**
 * NetworkRuleOptions is the enumeration of various rule options groups
 * needed for validation.
 */
var NetworkRuleGroupOptions;
(function (NetworkRuleGroupOptions) {
    /**
     * Allowlist-only modifiers.
     */
    NetworkRuleGroupOptions[NetworkRuleGroupOptions["AllowlistOnly"] = 4088] = "AllowlistOnly";
    /**
     * Options supported by host-level network rules.
     */
    NetworkRuleGroupOptions[NetworkRuleGroupOptions["OptionHostLevelRules"] = 125960196] = "OptionHostLevelRules";
    /**
     * Cosmetic option modifiers.
     */
    NetworkRuleGroupOptions[NetworkRuleGroupOptions["CosmeticOption"] = 696] = "CosmeticOption";
    /**
     * Removeparam compatible modifiers.
     *
     * $removeparam rules are compatible only with content type modifiers ($subdocument, $script, $stylesheet, etc)
     * except $document (using by default) and this list of modifiers.
     */
    NetworkRuleGroupOptions[NetworkRuleGroupOptions["RemoveParamCompatibleOptions"] = 393223] = "RemoveParamCompatibleOptions";
    /**
     * Removeheader compatible modifiers.
     *
     * $removeheader rules are compatible only with content type modifiers ($subdocument, $script, $stylesheet, etc)
     * except $document (using by default) and this list of modifiers.
     */
    NetworkRuleGroupOptions[NetworkRuleGroupOptions["RemoveHeaderCompatibleOptions"] = 1074397191] = "RemoveHeaderCompatibleOptions";
    /**
     * Permissions compatible modifiers.
     *
     * $permissions is compatible with the limited list of modifiers: $domain, $important, and $subdocument.
     */
    NetworkRuleGroupOptions[NetworkRuleGroupOptions["PermissionsCompatibleOptions"] = 537001988] = "PermissionsCompatibleOptions";
    /**
     * Header compatible modifiers.
     *
     * $header is compatible with the limited list of modifiers:
     * - $important
     * - $csp
     * - $removeheader (on response headers)
     * - $third-party
     * - $match-case
     * - $badfilter
     * - $domain
     * - all content type modifiers ($subdocument, $script, $stylesheet, etc).
     */
    NetworkRuleGroupOptions[NetworkRuleGroupOptions["HeaderCompatibleOptions"] = 1074405383] = "HeaderCompatibleOptions";
})(NetworkRuleGroupOptions || (NetworkRuleGroupOptions = {}));
/**
 * Basic network filtering rule.
 *
 * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#basic-rules}
 */
class NetworkRule {
    /**
     * Rule index.
     */
    ruleIndex;
    /**
     * Filter list ID.
     */
    filterListId;
    /**
     * Allowlist flag.
     */
    allowlist;
    /**
     * Rule pattern.
     */
    pattern;
    /**
     * Domains in denyallow modifier providing exceptions for permitted domains.
     *
     * @see {@link https://github.com/AdguardTeam/CoreLibs/issues/1304}
     */
    denyAllowDomains = null;
    /**
     * Flag with all enabled rule options.
     */
    enabledOptions = NetworkRuleOption.NotSet;
    /**
     * Flag with all disabled rule options.
     */
    disabledOptions = NetworkRuleOption.NotSet;
    /**
     * Flag with all permitted request types.
     */
    permittedRequestTypes = RequestType.NotSet;
    /**
     * Flag with all restricted request types.
     */
    restrictedRequestTypes = RequestType.NotSet;
    /**
     * Rule Advanced modifier.
     */
    advancedModifier = null;
    /**
     * Rule Domain modifier.
     */
    domainModifier = null;
    /**
     * Rule App modifier.
     */
    appModifier = null;
    /**
     * Rule Method modifier.
     */
    methodModifier = null;
    /**
     * Rule header modifier.
     */
    headerModifier = null;
    /**
     * Rule To modifier.
     */
    toModifier = null;
    /**
     * Rule Stealth modifier.
     */
    stealthModifier = null;
    /**
     * Rule priority, which is needed when the engine has to choose between
     * several rules matching the query. This value is calculated based on
     * the rule modifiers enabled or disabled and rounded up
     * to the smallest integer greater than or equal to the calculated weight
     * in the {@link calculatePriorityWeight}.
     *
     * @see https://adguard.com/kb/general/ad-filtering/create-own-filters/#priority-category-1
     */
    priorityWeight = 1;
    /**
     * Rules with base modifiers, from category 1, each of them adds 1
     * to the weight of the rule.
     *
     * @see https://adguard.com/kb/general/ad-filtering/create-own-filters/#priority-category-1
     */
    static CATEGORY_1_OPTIONS_MASK = NetworkRuleOption.ThirdParty
        | NetworkRuleOption.MatchCase
        | NetworkRuleOption.DnsRewrite;
    /**
     * The priority weight used in {@link calculatePriorityWeight} for rules
     * with permitted request types and methods.
     * The value 50 is chosen in order to cover (with a margin) all possible
     * combinations and variations of rules from categories with a lower
     * priority (each of them adds 1 to the rule priority).
     *
     * @see https://adguard.com/kb/general/ad-filtering/create-own-filters/#priority-category-2
     */
    static CategoryTwoWeight = 50;
    /**
     * The priority weight used in {@link calculatePriorityWeight} for rules
     * with allowed domains.
     * The value 100 is chosen to cover all possible combinations and variations
     * of rules from categories with a lower priority, for example a rule with
     * one allowed query type will get priority 100 (50 + 50/1), but for allowed
     * domains with any number of domains we will get at least 101 (for 100
     * domains: 100 + 100/100; for 200 100 + 100/200; or even for 10000:
     * 100 + 100/10000) because the resulting weight is rounded up.
     *
     * @see https://adguard.com/kb/general/ad-filtering/create-own-filters/#priority-category-3
     */
    static CategoryThreeWeight = 100;
    /**
     * The priority weight used in {@link calculatePriorityWeight}
     * for $redirect rules.
     *
     * @see https://adguard.com/kb/general/ad-filtering/create-own-filters/#priority-category-6
     */
    static CategoryFourWeight = 10 ** 3;
    /**
     * The priority weight used in {@link calculatePriorityWeight} for rules
     * with specific exceptions.
     *
     * @see https://adguard.com/kb/general/ad-filtering/create-own-filters/#priority-category-4
     */
    static CategoryFiveWeight = 10 ** 4;
    /**
     * Rules with specific exclusions, from category 4, each of them adds
     * {@link SpecificExceptionsWeight} to the weight of the rule.
     *
     * @see https://adguard.com/kb/general/ad-filtering/create-own-filters/#priority-category-4
     */
    static SPECIFIC_EXCLUSIONS_MASK = NetworkRuleOption.Elemhide
        | NetworkRuleOption.Generichide
        | NetworkRuleOption.Specifichide
        | NetworkRuleOption.Content
        | NetworkRuleOption.Urlblock
        | NetworkRuleOption.Genericblock
        | NetworkRuleOption.Jsinject
        | NetworkRuleOption.Extension;
    /**
     * The priority weight used in {@link calculatePriorityWeight} for rules
     * with allowlist mark '@@'.
     *
     * @see https://adguard.com/kb/general/ad-filtering/create-own-filters/#priority-category-5
     */
    static CategorySixWeight = 10 ** 5;
    /**
     * The priority weight used in {@link calculatePriorityWeight}
     * for $important rules.
     *
     * @see https://adguard.com/kb/general/ad-filtering/create-own-filters/#priority-category-7
     */
    static CategorySevenWeight = 10 ** 6;
    /**
     * Separates the rule pattern from the list of modifiers.
     *
     * ```
     * rule = ["@@"] pattern [ "$" modifiers ]
     * modifiers = [modifier0, modifier1[, ...[, modifierN]]]
     * ```
     */
    static OPTIONS_DELIMITER = OPTIONS_DELIMITER;
    /**
     * A marker that is used in rules of exception.
     * To turn off filtering for a request, start your rule with this marker.
     */
    static MASK_ALLOWLIST = MASK_ALLOWLIST;
    /**
     * Mark that negates options.
     */
    static NOT_MARK = NOT_MARK;
    /**
     * Rule options.
     */
    static OPTIONS = NETWORK_RULE_OPTIONS;
    /**
     * Rule options that can be negated.
     */
    static NEGATABLE_OPTIONS = new Set([
        // General options
        NetworkRule.OPTIONS.FIRST_PARTY,
        NetworkRule.OPTIONS.THIRD_PARTY,
        NetworkRule.OPTIONS.MATCH_CASE,
        NetworkRule.OPTIONS.DOCUMENT,
        NetworkRule.OPTIONS.DOC,
        // Content type options
        NetworkRule.OPTIONS.SCRIPT,
        NetworkRule.OPTIONS.STYLESHEET,
        NetworkRule.OPTIONS.SUBDOCUMENT,
        NetworkRule.OPTIONS.OBJECT,
        NetworkRule.OPTIONS.IMAGE,
        NetworkRule.OPTIONS.XMLHTTPREQUEST,
        NetworkRule.OPTIONS.MEDIA,
        NetworkRule.OPTIONS.FONT,
        NetworkRule.OPTIONS.WEBSOCKET,
        NetworkRule.OPTIONS.OTHER,
        NetworkRule.OPTIONS.PING,
        // Dns modifiers
        NetworkRule.OPTIONS.EXTENSION,
    ]);
    /**
     * Advanced option modifier names.
     */
    static ADVANCED_OPTIONS = new Set([
        NetworkRule.OPTIONS.CSP,
        NetworkRule.OPTIONS.REPLACE,
        NetworkRule.OPTIONS.COOKIE,
        NetworkRule.OPTIONS.REDIRECT,
        NetworkRule.OPTIONS.REDIRECTRULE,
        NetworkRule.OPTIONS.REMOVEPARAM,
        NetworkRule.OPTIONS.REMOVEHEADER,
        NetworkRule.OPTIONS.PERMISSIONS,
        NetworkRule.OPTIONS.CLIENT,
        NetworkRule.OPTIONS.DNSREWRITE,
        NetworkRule.OPTIONS.DNSTYPE,
        NetworkRule.OPTIONS.CTAG,
    ]);
    /**
     * Returns the rule index.
     *
     * @returns Rule index.
     */
    getIndex() {
        return this.ruleIndex;
    }
    /**
     * Returns the identifier of the filter from which the rule was received.
     *
     * @returns Identifier of the filter from which the rule was received.
     */
    getFilterListId() {
        return this.filterListId;
    }
    /**
     * Each rule has its own priority, which is necessary when several rules
     * match the request and the filtering system needs to select one of them.
     * Priority is measured as a positive integer.
     * In the case of a conflict between two rules with the same priority value,
     * it is not specified which one of them will be chosen.
     *
     * @returns Rule priority.
     */
    getPriorityWeight() {
        return this.priorityWeight;
    }
    /**
     * Returns rule pattern,
     * which currently is used only in the rule validator module.
     *
     * @returns Rule pattern.
     */
    getPattern() {
        return this.pattern.pattern;
    }
    /**
     * Returns `true` if the rule is "allowlist", e.g. if it disables other
     * rules when the pattern matches the request.
     *
     * @returns True if the rule is an allowlist rule.
     */
    isAllowlist() {
        return this.allowlist;
    }
    /**
     * Checks if the rule is a document-level allowlist rule with $urlblock or
     * $genericblock or $content.
     * This means that the rule is supposed to disable or modify blocking
     * of the page sub-requests.
     * For instance, `@@||example.org^$urlblock` unblocks all sub-requests.
     *
     * @returns True if the rule is a document-level allowlist rule with specific modifiers.
     */
    isDocumentLevelAllowlistRule() {
        if (!this.isAllowlist()) {
            return false;
        }
        return this.isOptionEnabled(NetworkRuleOption.Urlblock)
            || this.isOptionEnabled(NetworkRuleOption.Genericblock)
            || this.isOptionEnabled(NetworkRuleOption.Content);
    }
    /**
     * Checks if the rule completely disables filtering.
     *
     * @returns True if the rule completely disables filtering.
     */
    isFilteringDisabled() {
        if (!this.isAllowlist()) {
            return false;
        }
        return this.isOptionEnabled(NetworkRuleOption.Elemhide)
            && this.isOptionEnabled(NetworkRuleOption.Content)
            && this.isOptionEnabled(NetworkRuleOption.Urlblock)
            && this.isOptionEnabled(NetworkRuleOption.Jsinject);
    }
    /**
     * The longest part of pattern without any special characters.
     * It is used to improve the matching performance.
     *
     * @returns The longest part of the pattern without any special characters.
     */
    getShortcut() {
        return this.pattern.shortcut;
    }
    /**
     * Gets list of permitted domains.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#domain-modifier}
     *
     * @returns List of permitted domains or null if none.
     */
    getPermittedDomains() {
        if (this.domainModifier) {
            return this.domainModifier.getPermittedDomains();
        }
        return null;
    }
    /**
     * Gets list of restricted domains.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#domain-modifier}
     *
     * @returns List of restricted domains or null if none.
     */
    getRestrictedDomains() {
        if (this.domainModifier) {
            return this.domainModifier.getRestrictedDomains();
        }
        return null;
    }
    /**
     * Gets list of denyAllow domains.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#denyallow-modifier}
     *
     * @returns List of denyAllow domains or null if none.
     */
    getDenyAllowDomains() {
        return this.denyAllowDomains;
    }
    /**
     * Get list of permitted $to domains.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#to-modifier}
     *
     * @returns List of permitted $to domains or null if none.
     */
    getPermittedToDomains() {
        if (this.toModifier) {
            return this.toModifier.permittedValues;
        }
        return null;
    }
    /**
     * Get list of restricted $to domains.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#to-modifier}
     *
     * @returns List of restricted $to domains or null if none.
     */
    getRestrictedToDomains() {
        if (this.toModifier) {
            return this.toModifier.restrictedValues;
        }
        return null;
    }
    /**
     * Gets list of permitted domains.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#app}
     *
     * @returns List of permitted domains or null if none.
     */
    getPermittedApps() {
        if (this.appModifier) {
            return this.appModifier.permittedApps;
        }
        return null;
    }
    /**
     * Gets list of restricted domains.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#app}
     *
     * @returns List of restricted domains or null if none.
     */
    getRestrictedApps() {
        if (this.appModifier) {
            return this.appModifier.restrictedApps;
        }
        return null;
    }
    /**
     * Gets list of permitted methods.
     *
     * @see {@link https://kb.adguard.com/general/how-to-create-your-own-ad-filters#method-modifier}
     *
     * @returns List of permitted methods or null if none.
     */
    getRestrictedMethods() {
        if (this.methodModifier) {
            return this.methodModifier.restrictedValues;
        }
        return null;
    }
    /**
     * Gets list of restricted methods.
     *
     * @see {@link https://kb.adguard.com/general/how-to-create-your-own-ad-filters#method-modifier}
     *
     * @returns List of restricted methods or null if none.
     */
    getPermittedMethods() {
        if (this.methodModifier) {
            return this.methodModifier.permittedValues;
        }
        return null;
    }
    /**
     * Flag with all permitted request types.
     * The value {@link RequestType.NotSet} here means "all request types are allowed".
     *
     * @returns The flag with all permitted request types.
     */
    getPermittedRequestTypes() {
        return this.permittedRequestTypes;
    }
    /**
     * Flag with all restricted request types.
     * The value {@link RequestType.NotSet} here means "no type of request is restricted".
     *
     * @returns The flag with all restricted request types.
     */
    getRestrictedRequestTypes() {
        return this.restrictedRequestTypes;
    }
    /**
     * Advanced modifier.
     *
     * @returns The advanced modifier or null if none.
     */
    getAdvancedModifier() {
        return this.advancedModifier;
    }
    /**
     * Stealth modifier.
     *
     * @returns The stealth modifier or null if none.
     */
    getStealthModifier() {
        return this.stealthModifier;
    }
    /**
     * Advanced modifier value.
     *
     * @returns The advanced modifier value or null if none.
     */
    getAdvancedModifierValue() {
        return this.advancedModifier && this.advancedModifier.getValue();
    }
    /**
     * Retrieves the header modifier value.
     *
     * @returns The header modifier value or null if none.
     */
    getHeaderModifierValue() {
        if (!this.headerModifier) {
            return null;
        }
        return this.headerModifier.getHeaderModifierValue();
    }
    /**
     * Returns true if rule's pattern is a regular expression.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#regexp-support}
     *
     * @returns True if the rule pattern is a regular expression.
     */
    isRegexRule() {
        return (this.getPattern().startsWith(SimpleRegex.MASK_REGEX_RULE)
            && this.getPattern().endsWith(SimpleRegex.MASK_REGEX_RULE));
    }
    /**
     * Checks if this filtering rule matches the specified request.
     *
     * @param request Request to check.
     * @param useShortcut The flag to use this rule shortcut.
     *
     * @returns True if the rule matches the request.
     *
     * In case we use Trie in lookup table, we don't need to use shortcut cause we already check if request's url
     * includes full rule shortcut.
     */
    match(request, useShortcut = true) {
        // Regex rules should not be tested by shortcut
        if (useShortcut && !this.matchShortcut(request)) {
            return false;
        }
        if (this.isOptionEnabled(NetworkRuleOption.Method) && !this.matchMethod(request.method)) {
            return false;
        }
        if (this.isOptionEnabled(NetworkRuleOption.ThirdParty) && !request.thirdParty) {
            return false;
        }
        if (this.isOptionDisabled(NetworkRuleOption.ThirdParty) && request.thirdParty) {
            return false;
        }
        if (!this.matchRequestType(request.requestType)) {
            return false;
        }
        if (!this.matchDomainModifier(request)) {
            return false;
        }
        if (this.isOptionEnabled(NetworkRuleOption.RemoveParam)
            || this.isOptionEnabled(NetworkRuleOption.Permissions)) {
            if (!this.matchRequestTypeExplicit(request.requestType)) {
                return false;
            }
        }
        if (!this.matchDenyAllowDomains(request.hostname)) {
            return false;
        }
        if (this.isOptionEnabled(NetworkRuleOption.To) && !this.matchToModifier(request.hostname)) {
            return false;
        }
        if (!this.matchDnsType(request.dnsType)) {
            return false;
        }
        if (!this.matchClientTags(request.clientTags)) {
            return false;
        }
        if (!this.matchClient(request.clientName, request.clientIP)) {
            return false;
        }
        return this.pattern.matchPattern(request, true);
    }
    /**
     * Simply checks if shortcut is a substring of the URL.
     *
     * @param request Request to check.
     *
     * @returns True if the shortcut is a substring of the URL.
     */
    matchShortcut(request) {
        return request.urlLowercase.indexOf(this.getShortcut()) >= 0;
    }
    /**
     * Check if request matches domain modifier by request referrer (general case) or by request target.
     *
     * In some cases the $domain modifier can match not only the referrer domain, but also the target domain.
     * This happens when the following is true (1 AND ((2 AND 3) OR 4):
     *
     * 1) The request has $document request type (not subdocument)
     * 2) The rule's pattern doesn't match any particular domain(s)
     * 3) The rule's pattern doesn't contain regular expressions
     * 4) The $domain modifier contains only excluded domains (e.g., $domain=~example.org|~example.com).
     *
     * When all these conditions are met, the domain modifier will match both the referrer domain and the target domain.
     *
     * @see {@link https://github.com/AdguardTeam/tsurlfilter/issues/45}
     *
     * @param request The request to check.
     *
     * @returns True if the rule matches the domain modifier.
     */
    matchDomainModifier(request) {
        if (!this.domainModifier) {
            return true;
        }
        const { domainModifier } = this;
        const isDocumentType = request.requestType === RequestType.Document;
        const hasOnlyExcludedDomains = !domainModifier.hasPermittedDomains()
            && domainModifier.hasRestrictedDomains();
        const patternIsRegex = this.isRegexRule();
        const patternIsDomainSpecific = this.pattern.isPatternDomainSpecific();
        const matchesTargetByPatternCondition = !patternIsRegex && !patternIsDomainSpecific;
        if (isDocumentType && (hasOnlyExcludedDomains || matchesTargetByPatternCondition)) {
            // check if matches source hostname if exists or if matches target hostname
            return (request.sourceHostname && domainModifier.matchDomain(request.sourceHostname))
                || domainModifier.matchDomain(request.hostname);
        }
        return domainModifier.matchDomain(request.sourceHostname || '');
    }
    /**
     * Checks if the filtering rule is allowed on this domain.
     *
     * @param domain The request's domain.
     *
     * @returns True if the rule must be applied to the request.
     */
    matchDenyAllowDomains(domain) {
        if (!this.denyAllowDomains) {
            return true;
        }
        if (this.denyAllowDomains.length > 0) {
            if (DomainModifier.isDomainOrSubdomainOfAny(domain, this.denyAllowDomains)) {
                return false;
            }
        }
        return true;
    }
    /**
     * Checks if the request domain matches the specified conditions.
     *
     * @param domain The request's domain.
     *
     * @returns True if the request domain matches the permitted domains and does not match the restricted domains.
     */
    matchToModifier(domain) {
        if (!this.toModifier) {
            return true;
        }
        /**
         * The request's domain must be either explicitly permitted or not be included
         * in the list of restricted domains for the rule to apply.
         */
        const permittedDomains = this.getPermittedToDomains();
        const restrictedDomains = this.getRestrictedToDomains();
        let matches = false;
        if (permittedDomains) {
            matches = DomainModifier.isDomainOrSubdomainOfAny(domain, permittedDomains);
        }
        if (restrictedDomains) {
            matches = !DomainModifier.isDomainOrSubdomainOfAny(domain, restrictedDomains);
        }
        return matches;
    }
    /**
     * Return `true` if this rule matches with the tags associated with a client.
     *
     * @param clientTags Client tags.
     *
     * @returns True if the rule matches the client tags.
     */
    matchClientTags(clientTags) {
        const advancedModifier = this.getAdvancedModifier();
        if (!advancedModifier || !(advancedModifier instanceof CtagModifier)) {
            return true;
        }
        if (!clientTags) {
            return false;
        }
        const cTagsModifier = advancedModifier;
        return clientTags.every((x) => cTagsModifier.match(x));
    }
    /**
     * Returns TRUE if the rule matches with the specified client.
     *
     * @param clientName The name of the client.
     * @param clientIP The IP address of the client.
     *
     * @returns True if the rule matches the client.
     */
    matchClient(clientName, clientIP) {
        const advancedModifier = this.getAdvancedModifier();
        if (!advancedModifier || !(advancedModifier instanceof ClientModifier)) {
            return true;
        }
        if (!clientName && !clientIP) {
            return false;
        }
        const modifier = advancedModifier;
        return modifier.matchAny(clientName, clientIP);
    }
    /**
     * Return `true` if this rule matches with the request DNS type.
     *
     * @param dnstype The DNS type to check.
     *
     * @returns True if the rule matches the DNS type.
     */
    matchDnsType(dnstype) {
        const advancedModifier = this.getAdvancedModifier();
        if (!advancedModifier || !(advancedModifier instanceof DnsTypeModifier)) {
            return true;
        }
        if (!dnstype) {
            return false;
        }
        const modifier = advancedModifier;
        return modifier.match(dnstype);
    }
    /**
     * Checks if the request's type matches the rule properties.
     *
     * @param requestType Request type to check.
     *
     * @returns True if the rule must be applied to the request.
     */
    matchRequestType(requestType) {
        if (this.permittedRequestTypes !== RequestType.NotSet) {
            if ((this.permittedRequestTypes & requestType) !== requestType) {
                return false;
            }
        }
        if (this.restrictedRequestTypes !== RequestType.NotSet) {
            if ((this.restrictedRequestTypes & requestType) === requestType) {
                return false;
            }
        }
        return true;
    }
    /**
     * In case of $removeparam, $permissions modifier,
     * we only allow it to target other content types if the rule has an explicit content-type modifier.
     *
     * @param requestType Request type to check.
     *
     * @returns True if the rule must be applied to the request.
     */
    matchRequestTypeExplicit(requestType) {
        if (this.permittedRequestTypes === RequestType.NotSet
            && this.restrictedRequestTypes === RequestType.NotSet
            && requestType !== RequestType.Document
            && requestType !== RequestType.SubDocument) {
            return false;
        }
        return this.matchRequestType(requestType);
    }
    /**
     * Checks if request's method matches with the rule.
     *
     * @param method Request's method.
     *
     * @returns True, if rule must be applied to the request.
     */
    matchMethod(method) {
        if (!method || !MethodModifier.isHTTPMethod(method)) {
            return false;
        }
        /**
         * Request's method must be either explicitly
         * permitted or not be included in list of restricted methods
         * for the rule to apply.
         */
        const permittedMethods = this.getPermittedMethods();
        if (permittedMethods?.includes(method)) {
            return true;
        }
        const restrictedMethods = this.getRestrictedMethods();
        return !!restrictedMethods && !restrictedMethods.includes(method);
    }
    /**
     * Checks if request's response headers matches with
     * the rule's $header modifier value.
     *
     * @param responseHeadersItems Request's response headers.
     *
     * @returns True, if rule must be applied to the request.
     */
    matchResponseHeaders(responseHeadersItems) {
        if (!responseHeadersItems || responseHeadersItems.length === 0) {
            return false;
        }
        const ruleData = this.getHeaderModifierValue();
        if (!ruleData) {
            return false;
        }
        const { header: ruleHeaderName, value: ruleHeaderValue, } = ruleData;
        return responseHeadersItems.some((responseHeadersItem) => {
            const { name: responseHeaderName, value: responseHeaderValue, } = responseHeadersItem;
            // Header name matching is case-insensitive
            if (ruleHeaderName.toLowerCase() !== responseHeaderName.toLowerCase()) {
                return false;
            }
            if (ruleHeaderValue === null) {
                return true;
            }
            // Unlike header name, header value matching is case-sensitive
            if (typeof ruleHeaderValue === 'string') {
                return ruleHeaderValue === responseHeaderValue;
            }
            if (responseHeaderValue && ruleHeaderValue instanceof RegExp) {
                return ruleHeaderValue.test(responseHeaderValue);
            }
            return false;
        });
    }
    /**
     * Checks if a network rule is too general.
     *
     * @param node AST node of the network rule.
     *
     * @returns True if the rule is too general.
     */
    static isTooGeneral(node) {
        return !(node.modifiers?.children?.length) && node.pattern.value.length < 4;
    }
    /**
     * Creates an instance of the {@link NetworkRule}.
     * It parses this rule and extracts the rule pattern (see {@link SimpleRegex}),
     * and rule modifiers.
     *
     * @param node AST node of the network rule.
     * @param filterListId ID of the filter list this rule belongs to.
     * @param ruleIndex Line start index in the source filter list; it will be used to find the original rule text
     * in the filtering log when a rule is applied. Default value is {@link RULE_INDEX_NONE} which means that
     * the rule does not have source index.
     *
     * @throws Error if it fails to parse the rule.
     */
    constructor(node, filterListId, ruleIndex = RULE_INDEX_NONE) {
        this.ruleIndex = ruleIndex;
        this.filterListId = filterListId;
        this.allowlist = node.exception;
        const pattern = node.pattern.value;
        if (pattern && hasSpaces(pattern)) {
            throw new SyntaxError('Rule has spaces, seems to be an host rule');
        }
        if (node.modifiers?.children?.length) {
            this.loadOptions(node.modifiers);
        }
        if (NetworkRule.isTooGeneral(node)) {
            throw new SyntaxError(`Rule is too general: ${_adguard_agtree_generator__WEBPACK_IMPORTED_MODULE_12__/* .RuleGenerator */ .u.generate(node)}`);
        }
        this.calculatePriorityWeight();
        this.pattern = new Pattern(pattern, this.isOptionEnabled(NetworkRuleOption.MatchCase));
    }
    /**
     * Parses the options string and saves them.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#basic-rules-modifiers}
     *
     * @param options Modifier list node.
     *
     * @throws An error if there is an unsupported modifier.
     */
    loadOptions(options) {
        for (const option of options.children) {
            let value = EMPTY_STRING;
            if (option.value && option.value.value) {
                value = option.value.value;
            }
            this.loadOption(option.name.value, value, option.exception);
        }
        this.validateOptions();
    }
    /**
     * Returns true if rule contains (enabled or disabled) specified option.
     * Please note, that options have three state: enabled, disabled, undefined.
     *
     * @param option Rule option to check.
     *
     * @returns True if rule contains (enabled or disabled) specified option.
     */
    hasOption(option) {
        return this.isOptionEnabled(option) || this.isOptionDisabled(option);
    }
    /**
     * Returns true if rule has at least one cosmetic option enabled.
     *
     * @returns True if the rule has at least one cosmetic option enabled.
     */
    hasCosmeticOption() {
        return (this.enabledOptions & NetworkRuleGroupOptions.CosmeticOption) !== 0;
    }
    /**
     * Returns true if the specified option is enabled.
     * Please note, that options have three state: enabled, disabled, undefined.
     *
     * @param option Rule option to check.
     *
     * @returns True if the specified option is enabled.
     */
    isOptionEnabled(option) {
        return (this.enabledOptions & option) === option;
    }
    /**
     * Returns true if one and only option is enabled.
     *
     * @param option Rule option to check.
     *
     * @returns True if the specified option is enabled.
     */
    isSingleOptionEnabled(option) {
        return this.enabledOptions === option;
    }
    /**
     * Returns true if the specified option is disabled.
     * Please note, that options have three state: enabled, disabled, undefined.
     *
     * @param option Rule option to check.
     *
     * @returns True if the specified option is disabled.
     */
    isOptionDisabled(option) {
        return (this.disabledOptions & option) === option;
    }
    /**
     * Checks if the rule has higher priority that the specified rule:
     * `allowlist + $important` > `$important` > `redirect` > `allowlist` > `basic rules`.
     *
     * @param r Rule to compare with.
     *
     * @returns True if the rule has higher priority than `r`.
     */
    isHigherPriority(r) {
        return this.priorityWeight > r.priorityWeight;
    }
    /**
     * Returns true if the rule is considered "generic"
     * "generic" means that the rule is not restricted to a limited set of domains
     * Please note that it might be forbidden on some domains, though.
     *
     * @returns True if the rule is considered "generic".
     */
    isGeneric() {
        return !this.domainModifier?.hasPermittedDomains();
    }
    /**
     * Returns true if this rule negates the specified rule.
     * Only makes sense when this rule has a `badfilter` modifier.
     *
     * @param specifiedRule Rule to check.
     *
     * @returns True if this rule negates the specified rule.
     */
    negatesBadfilter(specifiedRule) {
        if (!this.isOptionEnabled(NetworkRuleOption.Badfilter)) {
            return false;
        }
        if (this.allowlist !== specifiedRule.allowlist) {
            return false;
        }
        if (this.pattern.pattern !== specifiedRule.pattern.pattern) {
            return false;
        }
        if (this.permittedRequestTypes !== specifiedRule.permittedRequestTypes) {
            return false;
        }
        if (this.restrictedRequestTypes !== specifiedRule.restrictedRequestTypes) {
            return false;
        }
        if ((this.enabledOptions ^ NetworkRuleOption.Badfilter) !== specifiedRule.enabledOptions) {
            return false;
        }
        if (this.disabledOptions !== specifiedRule.disabledOptions) {
            return false;
        }
        if (!stringArraysEquals(this.getRestrictedDomains(), specifiedRule.getRestrictedDomains())) {
            return false;
        }
        if (!stringArraysHaveIntersection(this.getPermittedDomains(), specifiedRule.getPermittedDomains())) {
            return false;
        }
        return true;
    }
    /**
     * Checks if this rule can be used for hosts-level blocking.
     *
     * @returns True if the rule can be used for hosts-level blocking.
     */
    isHostLevelNetworkRule() {
        if (this.domainModifier?.hasPermittedDomains() || this.domainModifier?.hasRestrictedDomains()) {
            return false;
        }
        if (this.permittedRequestTypes !== 0 && this.restrictedRequestTypes !== 0) {
            return false;
        }
        if (this.disabledOptions !== NetworkRuleOption.NotSet) {
            return false;
        }
        if (this.enabledOptions !== NetworkRuleOption.NotSet) {
            return ((this.enabledOptions
                & NetworkRuleGroupOptions.OptionHostLevelRules)
                | (this.enabledOptions
                    ^ NetworkRuleGroupOptions.OptionHostLevelRules)) === NetworkRuleGroupOptions.OptionHostLevelRules;
        }
        return true;
    }
    /**
     * Enables or disables the specified option.
     *
     * @param option Option to enable or disable.
     * @param enabled True to enable, false to disable.
     * @param skipRestrictions Skip options allowlist/blacklist restrictions.
     *
     * @throws An error if the option we're trying to enable cannot be.
     * For instance, you cannot enable $elemhide for blacklist rules.
     */
    setOptionEnabled(option, enabled, skipRestrictions = false) {
        if (!skipRestrictions) {
            if (!this.allowlist && (option & NetworkRuleGroupOptions.AllowlistOnly) === option) {
                throw new SyntaxError(`Modifier ${NetworkRuleOption[option]} cannot be used in blacklist rule`);
            }
        }
        if (enabled) {
            this.enabledOptions |= option;
        }
        else {
            this.disabledOptions |= option;
        }
    }
    /**
     * Permits or forbids the specified request type.
     * "Permits" means that the rule will match **only** the types that are permitted.
     * "Restricts" means that the rule will match **all but restricted**.
     *
     * @param requestType Request type.
     * @param permitted True if it's permitted (whic).
     */
    setRequestType(requestType, permitted) {
        if (permitted) {
            this.permittedRequestTypes |= requestType;
        }
        else {
            this.restrictedRequestTypes |= requestType;
        }
    }
    /**
     * Sets and validates exceptionally allowed domains presented in $denyallow modifier.
     *
     * @param optionValue Denyallow modifier value.
     */
    setDenyAllowDomains(optionValue) {
        const domainModifier = new DomainModifier(optionValue, PIPE_SEPARATOR$1);
        if (domainModifier.restrictedDomains && domainModifier.restrictedDomains.length > 0) {
            throw new SyntaxError('Invalid modifier: $denyallow domains cannot be negated');
        }
        if (domainModifier.permittedDomains) {
            if (domainModifier.permittedDomains.some(DomainModifier.isWildcardOrRegexDomain)) {
                throw new SyntaxError('Invalid modifier: $denyallow does not support wildcards and regex domains');
            }
        }
        this.denyAllowDomains = domainModifier.permittedDomains;
    }
    /**
     * Loads the specified modifier.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#basic-rules-modifiers}
     *
     * @param optionName Modifier name.
     * @param optionValue Modifier value.
     * @param exception True if the modifier is negated.
     *
     * @throws An error if there is an unsupported modifier.
     */
    loadOption(optionName, optionValue, exception = false) {
        const { OPTIONS, NEGATABLE_OPTIONS } = NetworkRule;
        if (optionName.startsWith(OPTIONS.NOOP)) {
            /**
             * A noop modifier does nothing and can be used to increase some rules readability.
             * It consists of the sequence of underscore characters (_) of any length
             * and can appear in a rule as many times as it's needed.
             */
            if (!optionName.split(OPTIONS.NOOP).some((s) => !!s)) {
                return;
            }
        }
        // TODO: Speed up this by creating a map from names to bit mask positions
        if (exception && !NEGATABLE_OPTIONS.has(optionName)) {
            throw new SyntaxError(`Invalid modifier: '${optionName}' cannot be negated`);
        }
        switch (optionName) {
            // General options
            // $first-party, $~first-party
            case OPTIONS.FIRST_PARTY:
                this.setOptionEnabled(NetworkRuleOption.ThirdParty, exception);
                break;
            // $third-party, $~third-party
            case OPTIONS.THIRD_PARTY:
                this.setOptionEnabled(NetworkRuleOption.ThirdParty, !exception);
                break;
            // $match-case, $~match-case
            case OPTIONS.MATCH_CASE:
                this.setOptionEnabled(NetworkRuleOption.MatchCase, !exception);
                break;
            // $important
            case OPTIONS.IMPORTANT:
                this.setOptionEnabled(NetworkRuleOption.Important, true);
                break;
            // $domain
            case OPTIONS.DOMAIN:
                this.domainModifier = new DomainModifier(optionValue, PIPE_SEPARATOR$1);
                break;
            // $denyallow
            case OPTIONS.DENYALLOW:
                this.setDenyAllowDomains(optionValue);
                break;
            // $method modifier
            case OPTIONS.METHOD: {
                this.setOptionEnabled(NetworkRuleOption.Method, true);
                this.methodModifier = new MethodModifier(optionValue);
                break;
            }
            // $header modifier
            case OPTIONS.HEADER:
                this.setOptionEnabled(NetworkRuleOption.Header, true);
                this.headerModifier = new HeaderModifier(optionValue);
                break;
            // $to modifier
            case OPTIONS.TO: {
                this.setOptionEnabled(NetworkRuleOption.To, true);
                this.toModifier = new ToModifier(optionValue);
                break;
            }
            // Document-level allowlist rules
            // $elemhide
            case OPTIONS.ELEMHIDE:
                this.setOptionEnabled(NetworkRuleOption.Elemhide, true);
                this.setRequestType(RequestType.Document, true);
                this.setRequestType(RequestType.SubDocument, true);
                break;
            // $generichide
            case OPTIONS.GENERICHIDE:
                this.setOptionEnabled(NetworkRuleOption.Generichide, true);
                this.setRequestType(RequestType.Document, true);
                this.setRequestType(RequestType.SubDocument, true);
                break;
            // $specifichide
            case OPTIONS.SPECIFICHIDE:
                this.setOptionEnabled(NetworkRuleOption.Specifichide, true);
                this.setRequestType(RequestType.Document, true);
                this.setRequestType(RequestType.SubDocument, true);
                break;
            // $genericblock
            case OPTIONS.GENERICBLOCK:
                this.setOptionEnabled(NetworkRuleOption.Genericblock, true);
                this.setRequestType(RequestType.Document, true);
                this.setRequestType(RequestType.SubDocument, true);
                break;
            // $jsinject
            case OPTIONS.JSINJECT:
                this.setOptionEnabled(NetworkRuleOption.Jsinject, true);
                this.setRequestType(RequestType.Document, true);
                this.setRequestType(RequestType.SubDocument, true);
                break;
            // $urlblock
            case OPTIONS.URLBLOCK:
                this.setOptionEnabled(NetworkRuleOption.Urlblock, true);
                this.setRequestType(RequestType.Document, true);
                this.setRequestType(RequestType.SubDocument, true);
                break;
            // $content
            case OPTIONS.CONTENT:
                this.setOptionEnabled(NetworkRuleOption.Content, true);
                this.setRequestType(RequestType.Document, true);
                this.setRequestType(RequestType.SubDocument, true);
                break;
            // $document, $doc / $~document, $~doc
            case OPTIONS.DOCUMENT:
            case OPTIONS.DOC:
                if (exception) {
                    this.setRequestType(RequestType.Document, false);
                    break;
                }
                this.setRequestType(RequestType.Document, true);
                // In the case of allowlist rules $document implicitly includes
                // all these modifiers: `$content`, `$elemhide`, `$jsinject`,
                // `$urlblock`.
                if (this.isAllowlist()) {
                    this.setOptionEnabled(NetworkRuleOption.Elemhide, true, true);
                    this.setOptionEnabled(NetworkRuleOption.Jsinject, true, true);
                    this.setOptionEnabled(NetworkRuleOption.Urlblock, true, true);
                    this.setOptionEnabled(NetworkRuleOption.Content, true, true);
                }
                break;
            // $stealth
            case OPTIONS.STEALTH:
                this.setOptionEnabled(NetworkRuleOption.Stealth, true);
                this.stealthModifier = new StealthModifier(optionValue);
                break;
            // $popup
            case OPTIONS.POPUP:
                this.setOptionEnabled(NetworkRuleOption.Popup, true);
                break;
            // Content type options
            // $script, $~script
            case OPTIONS.SCRIPT:
                this.setRequestType(RequestType.Script, !exception);
                break;
            // $stylesheet, $~stylesheet
            case OPTIONS.STYLESHEET:
                this.setRequestType(RequestType.Stylesheet, !exception);
                break;
            // $subdocument, $~subdocument
            case OPTIONS.SUBDOCUMENT:
                this.setRequestType(RequestType.SubDocument, !exception);
                break;
            // $object, $~object
            case OPTIONS.OBJECT:
                this.setRequestType(RequestType.Object, !exception);
                break;
            // $image, $~image
            case OPTIONS.IMAGE:
                this.setRequestType(RequestType.Image, !exception);
                break;
            // $xmlhttprequest, $~xmlhttprequest
            case OPTIONS.XMLHTTPREQUEST:
                this.setRequestType(RequestType.XmlHttpRequest, !exception);
                break;
            // $media, $~media
            case OPTIONS.MEDIA:
                this.setRequestType(RequestType.Media, !exception);
                break;
            // $font, $~font
            case OPTIONS.FONT:
                this.setRequestType(RequestType.Font, !exception);
                break;
            // $websocket, $~websocket
            case OPTIONS.WEBSOCKET:
                this.setRequestType(RequestType.WebSocket, !exception);
                break;
            // $other, $~other
            case OPTIONS.OTHER:
                this.setRequestType(RequestType.Other, !exception);
                break;
            // $ping, $~ping
            case OPTIONS.PING:
                this.setRequestType(RequestType.Ping, !exception);
                break;
            // Special modifiers
            // $badfilter
            case OPTIONS.BADFILTER:
                this.setOptionEnabled(NetworkRuleOption.Badfilter, true);
                break;
            // $csp
            case OPTIONS.CSP:
                this.setOptionEnabled(NetworkRuleOption.Csp, true);
                this.advancedModifier = new CspModifier(optionValue, this.isAllowlist());
                break;
            // $replace
            case OPTIONS.REPLACE:
                this.setOptionEnabled(NetworkRuleOption.Replace, true);
                this.advancedModifier = new ReplaceModifier(optionValue);
                break;
            // $cookie
            case OPTIONS.COOKIE:
                this.setOptionEnabled(NetworkRuleOption.Cookie, true);
                this.advancedModifier = new CookieModifier(optionValue);
                break;
            // $redirect
            case OPTIONS.REDIRECT:
                this.setOptionEnabled(NetworkRuleOption.Redirect, true);
                this.advancedModifier = new RedirectModifier(optionValue, this.isAllowlist());
                break;
            // $redirect-rule
            case OPTIONS.REDIRECTRULE:
                this.setOptionEnabled(NetworkRuleOption.Redirect, true);
                this.advancedModifier = new RedirectModifier(optionValue, this.isAllowlist(), true);
                break;
            // $removeparam
            case OPTIONS.REMOVEPARAM:
                this.setOptionEnabled(NetworkRuleOption.RemoveParam, true);
                this.advancedModifier = new RemoveParamModifier(optionValue);
                break;
            // $removeheader
            case OPTIONS.REMOVEHEADER:
                this.setOptionEnabled(NetworkRuleOption.RemoveHeader, true);
                this.advancedModifier = new RemoveHeaderModifier(optionValue, this.isAllowlist());
                break;
            // $permissions
            case OPTIONS.PERMISSIONS:
                this.setOptionEnabled(NetworkRuleOption.Permissions, true);
                this.advancedModifier = new PermissionsModifier(optionValue, this.isAllowlist());
                break;
            // $jsonprune
            // simple validation of jsonprune rules for compiler
            // https://github.com/AdguardTeam/FiltersCompiler/issues/168
            case OPTIONS.JSONPRUNE:
                if (isCompatibleWith(CompatibilityTypes.Extension)) {
                    throw new SyntaxError('Extension does not support $jsonprune modifier yet');
                }
                this.setOptionEnabled(NetworkRuleOption.JsonPrune, true);
                // TODO: should be properly implemented later
                // https://github.com/AdguardTeam/tsurlfilter/issues/71
                break;
            // $hls
            // simple validation of hls rules for compiler
            // https://github.com/AdguardTeam/FiltersCompiler/issues/169
            case OPTIONS.HLS:
                if (isCompatibleWith(CompatibilityTypes.Extension)) {
                    throw new SyntaxError('Extension does not support $hls modifier yet');
                }
                this.setOptionEnabled(NetworkRuleOption.Hls, true);
                // TODO: should be properly implemented later
                // https://github.com/AdguardTeam/tsurlfilter/issues/72
                break;
            // $referrerpolicy
            // simple validation of referrerpolicy rules for compiler
            // https://github.com/AdguardTeam/FiltersCompiler/issues/191
            case OPTIONS.REFERRERPOLICY:
                if (isCompatibleWith(CompatibilityTypes.Extension)) {
                    throw new SyntaxError('Extension does not support $referrerpolicy modifier');
                }
                // do nothing as $referrerpolicy is supported by CoreLibs-based apps only.
                // it is needed for proper rule conversion performed by FiltersCompiler
                // so rules with $referrerpolicy modifier is not marked as invalid
                break;
            // Dns modifiers
            // $client
            case OPTIONS.CLIENT:
                if (isCompatibleWith(CompatibilityTypes.Extension)) {
                    throw new SyntaxError('Extension doesn\'t support $client modifier');
                }
                this.setOptionEnabled(NetworkRuleOption.Client, true);
                this.advancedModifier = new ClientModifier(optionValue);
                break;
            // $dnsrewrite
            case OPTIONS.DNSREWRITE:
                if (isCompatibleWith(CompatibilityTypes.Extension)) {
                    throw new SyntaxError('Extension doesn\'t support $dnsrewrite modifier');
                }
                this.setOptionEnabled(NetworkRuleOption.DnsRewrite, true);
                this.advancedModifier = new DnsRewriteModifier(optionValue);
                break;
            // $dnstype
            case OPTIONS.DNSTYPE:
                if (isCompatibleWith(CompatibilityTypes.Extension)) {
                    throw new SyntaxError('Extension doesn\'t support $dnstype modifier');
                }
                this.setOptionEnabled(NetworkRuleOption.DnsType, true);
                this.advancedModifier = new DnsTypeModifier(optionValue);
                break;
            // $ctag
            case OPTIONS.CTAG:
                if (isCompatibleWith(CompatibilityTypes.Extension)) {
                    throw new SyntaxError('Extension doesn\'t support $ctag modifier');
                }
                this.setOptionEnabled(NetworkRuleOption.Ctag, true);
                this.advancedModifier = new CtagModifier(optionValue);
                break;
            // $app
            case OPTIONS.APP:
                if (isCompatibleWith(CompatibilityTypes.Extension)) {
                    throw new SyntaxError('Extension doesn\'t support $app modifier');
                }
                this.appModifier = new AppModifier(optionValue);
                break;
            // $network
            case OPTIONS.NETWORK:
                if (isCompatibleWith(CompatibilityTypes.Extension)) {
                    throw new SyntaxError('Extension doesn\'t support $network modifier');
                }
                this.setOptionEnabled(NetworkRuleOption.Network, true);
                break;
            // $extension, $~extension
            case OPTIONS.EXTENSION:
                if (isCompatibleWith(CompatibilityTypes.Extension)) {
                    throw new SyntaxError('Extension doesn\'t support $extension modifier');
                }
                this.setOptionEnabled(NetworkRuleOption.Extension, !exception);
                break;
            // $all
            case OPTIONS.ALL:
                if (this.isAllowlist()) {
                    throw new SyntaxError('Rule with $all modifier can not be allowlist rule');
                }
                // Set all request types
                Object.values(RequestType).forEach((type) => {
                    this.setRequestType(type, true);
                });
                this.setOptionEnabled(NetworkRuleOption.Popup, true);
                break;
            // $empty and $mp4
            // Deprecated in favor of $redirect
            case OPTIONS.EMPTY:
            case OPTIONS.MP4:
                // Do nothing.
                break;
            default: {
                // clear empty values
                const modifierView = [optionName, optionValue]
                    .filter((i) => i)
                    .join('=');
                throw new SyntaxError(`Unknown modifier: ${modifierView}`);
            }
        }
    }
    /**
     * To calculate priority, we've categorized modifiers into different groups.
     * These groups are ranked based on their priority, from lowest to highest.
     * A modifier that significantly narrows the scope of a rule adds more
     * weight to its total priority. Conversely, if a rule applies to a broader
     * range of requests, its priority decreases.
     *
     * It's worth noting that there are cases where a single-parameter modifier
     * has a higher priority than multi-parameter ones. For instance, in
     * the case of `$domain=example.com|example.org`, a rule that includes two
     * domains has a slightly broader effective area than a rule with one
     * specified domain, therefore its priority is lower.
     *
     * The base priority weight of any rule is 1. If the calculated priority
     * is a floating-point number, it will be **rounded up** to the smallest
     * integer greater than or equal to the calculated weight.
     *
     * @see {@link NetworkRule.PermittedRequestTypeWeight}
     * @see {@link NetworkRule.PermittedDomainWeight}
     * @see {@link NetworkRule.SpecificExceptionsWeight}
     * @see {@link NetworkRule.AllowlistRuleWeight}
     * @see {@link NetworkRule.RedirectRuleWeight}
     * @see {@link NetworkRule.ImportantRuleWeight}
     * @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#priority-counting}
     */
    calculatePriorityWeight() {
        // Base modifiers, category 1.
        this.priorityWeight += countEnabledBits(this.enabledOptions, NetworkRule.CATEGORY_1_OPTIONS_MASK);
        this.priorityWeight += countEnabledBits(this.disabledOptions, NetworkRule.CATEGORY_1_OPTIONS_MASK);
        /**
         * When dealing with a negated domain, app, method, or content-type,
         * we add a point for the existence of the modifier itself, regardless
         * of the quantity of negated domains or content-types. This is because
         * the rule's scope is already infinitely broad. Put simply,
         * by prohibiting multiple domains, content-types, methods or apps,
         * the scope of the rule becomes only minimally smaller.
         */
        if (this.denyAllowDomains && this.denyAllowDomains.length > 0) {
            this.priorityWeight += 1;
        }
        const { domainModifier } = this;
        if (domainModifier?.hasRestrictedDomains()) {
            this.priorityWeight += 1;
        }
        if (this.methodModifier?.restrictedValues && this.methodModifier.restrictedValues.length > 0) {
            this.priorityWeight += 1;
        }
        if (this.restrictedRequestTypes !== RequestType.NotSet) {
            this.priorityWeight += 1;
        }
        // $to modifier is basically a replacement for a regular expression
        // See https://github.com/AdguardTeam/KnowledgeBase/pull/196#discussion_r1221401215
        if (this.toModifier) {
            this.priorityWeight += 1;
        }
        /**
         * Category 2: permitted request types, methods, headers, $popup.
         * Specified content-types add `50 + 50 / number_of_content_types`,
         * for example: `||example.com^$image,script` will add
         * `50 + 50 / 2 = 50 + 25 = 75` to the total weight of the rule.
         * The `$popup` also belongs to this category, because it implicitly
         * adds the modifier `$document`.
         * Similarly, specific exceptions add `$document,subdocument`.
         *
         * @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#priority-category-2}
         */
        if (this.permittedRequestTypes !== RequestType.NotSet) {
            const numberOfPermittedRequestTypes = getBitCount(this.permittedRequestTypes);
            // More permitted request types mean less priority weight.
            const relativeWeight = NetworkRule.CategoryTwoWeight / numberOfPermittedRequestTypes;
            this.priorityWeight += NetworkRule.CategoryTwoWeight + relativeWeight;
        }
        if (this.methodModifier?.permittedValues && this.methodModifier.permittedValues.length > 0) {
            // More permitted request methods mean less priority weight.
            const relativeWeight = NetworkRule.CategoryTwoWeight / this.methodModifier.permittedValues.length;
            this.priorityWeight += NetworkRule.CategoryTwoWeight + relativeWeight;
        }
        if (this.headerModifier) {
            // $header modifier in the rule adds 50
            this.priorityWeight += NetworkRule.CategoryTwoWeight;
        }
        /**
         * Category 3: permitted domains.
         * Specified domains through `$domain` and specified applications
         * through `$app` add `100 + 100 / number_domains (or number_applications)`,
         * for example:
         * `||example.com^$domain=example.com|example.org|example.net`
         * will add `100 + 100 / 3 = 134.3 = 134` or
         * `||example.com^$app=org.example.app1|org.example.app2`
         * will add `100 + 100 / 2 = 151`.
         */
        if (domainModifier?.hasPermittedDomains()) {
            // More permitted domains mean less priority weight.
            const relativeWeight = NetworkRule.CategoryThreeWeight / domainModifier.getPermittedDomains().length;
            this.priorityWeight += NetworkRule.CategoryThreeWeight + relativeWeight;
        }
        // Category 4: redirect rules.
        if (this.isOptionEnabled(NetworkRuleOption.Redirect)) {
            this.priorityWeight += NetworkRule.CategoryFourWeight;
        }
        // Category 5: specific exceptions.
        this.priorityWeight += NetworkRule.CategoryFiveWeight * countEnabledBits(this.enabledOptions, NetworkRule.SPECIFIC_EXCLUSIONS_MASK);
        // Category 6: allowlist rules.
        if (this.isAllowlist()) {
            this.priorityWeight += NetworkRule.CategorySixWeight;
        }
        // Category 7: important rules.
        if (this.isOptionEnabled(NetworkRuleOption.Important)) {
            this.priorityWeight += NetworkRule.CategorySevenWeight;
        }
        // Round up to avoid overlap between different categories of rules.
        this.priorityWeight = Math.ceil(this.priorityWeight);
    }
    /**
     * Validates rule options.
     */
    validateOptions() {
        if (this.advancedModifier instanceof RemoveParamModifier) {
            this.validateRemoveParamRule();
        }
        else if (this.advancedModifier instanceof RemoveHeaderModifier) {
            this.validateRemoveHeaderRule();
        }
        else if (this.advancedModifier instanceof PermissionsModifier) {
            this.validatePermissionsRule();
        }
        else if (this.headerModifier instanceof HeaderModifier) {
            this.validateHeaderRule();
        }
        else if (this.toModifier !== null) {
            this.validateToRule();
        }
        else if (this.denyAllowDomains !== null) {
            this.validateDenyallowRule();
        }
    }
    /**
     * Validates $header rule.
     *
     * $header is compatible with the limited list of modifiers:
     * - $important
     * - $csp
     * - $removeheader (on response headers)
     * - $third-party
     * - $match-case
     * - $badfilter
     * - $domain
     * - all content type modifiers ($subdocument, $script, $stylesheet, etc).
     *
     * The rules with any other modifiers are considered invalid and will be discarded.
     */
    validateHeaderRule() {
        if ((this.enabledOptions | NetworkRuleGroupOptions.HeaderCompatibleOptions)
            !== NetworkRuleGroupOptions.HeaderCompatibleOptions) {
            throw new SyntaxError('$header rules are not compatible with some other modifiers');
        }
        if (this.advancedModifier && this.isOptionEnabled(NetworkRuleOption.RemoveHeader)) {
            const removeHeaderValue = this.getAdvancedModifierValue();
            if (!removeHeaderValue || removeHeaderValue.includes('request:')) {
                const message = '$header rules are only compatible with response headers removal of $removeheader.';
                throw new SyntaxError(message);
            }
        }
    }
    /**
     * $permissions rules are not compatible with any other
     * modifiers except $domain, $important, and $subdocument.
     * The rules with any other modifiers are considered invalid and will be discarded.
     */
    validatePermissionsRule() {
        if ((this.enabledOptions | NetworkRuleGroupOptions.PermissionsCompatibleOptions)
            !== NetworkRuleGroupOptions.PermissionsCompatibleOptions) {
            throw new SyntaxError('$permissions rules are not compatible with some other modifiers');
        }
    }
    /**
     * $removeparam rules are not compatible with any other modifiers except $domain,
     * $third-party, $app, $important, $match-case and permitted content type modifiers ($script, $stylesheet, etc).
     * The rules with any other modifiers are considered invalid and will be discarded.
     */
    validateRemoveParamRule() {
        if ((this.enabledOptions | NetworkRuleGroupOptions.RemoveParamCompatibleOptions)
            !== NetworkRuleGroupOptions.RemoveParamCompatibleOptions) {
            throw new SyntaxError('$removeparam rules are not compatible with some other modifiers');
        }
    }
    /**
     * $removeheader rules are not compatible with any other modifiers except $domain,
     * $third-party, $app, $important, $match-case and permitted content type modifiers ($script, $stylesheet, etc).
     * The rules with any other modifiers are considered invalid and will be discarded.
     */
    validateRemoveHeaderRule() {
        if ((this.enabledOptions | NetworkRuleGroupOptions.RemoveHeaderCompatibleOptions)
            !== NetworkRuleGroupOptions.RemoveHeaderCompatibleOptions) {
            throw new SyntaxError('$removeheader rules are not compatible with some other modifiers');
        }
        if (this.headerModifier && this.isOptionEnabled(NetworkRuleOption.Header)) {
            const removeHeaderValue = this.getAdvancedModifierValue();
            if (!removeHeaderValue || removeHeaderValue.includes('request:')) {
                const message = 'Request headers removal of $removeheaders is not compatible with $header rules.';
                throw new SyntaxError(message);
            }
        }
    }
    /**
     * $to rules are not compatible $denyallow - these rules considered invalid
     * and will be discarded.
     */
    validateToRule() {
        if (this.denyAllowDomains) {
            throw new SyntaxError('modifier $to is not compatible with $denyallow modifier');
        }
    }
    /**
     * $denyallow rules are not compatible $to - these rules considered invalid
     * and will be discarded.
     */
    validateDenyallowRule() {
        if (this.toModifier) {
            throw new SyntaxError('modifier $to is not compatible with $denyallow modifier');
        }
    }
}

/**
 * Helper function to create an allowlist rule node for a given domain.
 *
 * @param domain Domain to create an allowlist rule for.
 *
 * @returns Allowlist rule node or null.
 */
const createAllowlistRuleNode = (domain) => {
    const domainToUse = domain.startsWith('www.') ? domain.substring(4) : domain;
    if (!domainToUse) {
        return null;
    }
    let pattern;
    // Special case: Wildcard TLD + N domain
    if (domainToUse.startsWith('*.')) {
        pattern = `${SimpleRegex.MASK_START_URL}${domainToUse.slice(2)}`;
    }
    else {
        // In other cases we use regexp to match domain and it`s 'www' subdomain strictly.
        let regexp = '';
        // transform allowlist domain special characters
        for (let i = 0; i < domainToUse.length; i += 1) {
            const char = domainToUse[i];
            // transform wildcard to regexp equivalent
            if (char === '*') {
                regexp += '.*';
                // escape domain separator
            }
            else if (char === '.') {
                regexp += String.raw `\.`;
            }
            else {
                regexp += char;
            }
        }
        pattern = String.raw `///(www\.)?${regexp}/`;
    }
    const node = {
        category: _adguard_agtree__WEBPACK_IMPORTED_MODULE_13__/* .RuleCategory */ .$O.Network,
        type: _adguard_agtree__WEBPACK_IMPORTED_MODULE_13__/* .NetworkRuleType */ .vY.NetworkRule,
        syntax: _adguard_agtree_utils__WEBPACK_IMPORTED_MODULE_14__/* .AdblockSyntax */ .YG.Common,
        exception: true,
        pattern: {
            type: 'Value',
            value: pattern,
        },
        modifiers: {
            type: 'ModifierList',
            children: [
                {
                    type: 'Modifier',
                    name: {
                        type: 'Value',
                        value: 'document',
                    },
                },
                {
                    type: 'Modifier',
                    name: {
                        type: 'Value',
                        value: 'important',
                    },
                },
            ],
        },
    };
    return node;
};

/**
 * @file Known CSS / Extended CSS elements.
 */
/**
 * Supported Extended CSS pseudo-classes.
 *
 * These pseudo-classes are not supported by browsers natively, so we need Extended CSS library to support them.
 *
 * Please keep this list sorted alphabetically.
 */
const SUPPORTED_EXT_CSS_PSEUDO_CLASSES = new Set([
    /**
     * Pseudo-classes :is(), and :not() may use native implementation.
     *
     * @see {@link https://github.com/AdguardTeam/ExtendedCss#extended-css-is}
     * @see {@link https://github.com/AdguardTeam/ExtendedCss#extended-css-not}
     */
    /**
     * :has() should also be conditionally considered as extended and should not be in this list,
     * for details check: https://github.com/AdguardTeam/ExtendedCss#extended-css-has,
     * but there is a bug with content blocker in safari:
     * for details check: https://bugs.webkit.org/show_bug.cgi?id=248868.
     *
     * TODO: remove 'has' later.
     */
    '-abp-contains', // alias for 'contains'
    '-abp-has', // alias for 'has'
    'contains',
    'has', // some browsers support 'has' natively
    'has-text', // alias for 'contains'
    'if',
    'if-not',
    'matches-attr',
    'matches-css',
    'matches-css-after', // deprecated, replaced by 'matches-css'
    'matches-css-before', // deprecated, replaced by 'matches-css'
    'matches-property',
    'nth-ancestor',
    'remove',
    'upward',
    'xpath',
]);
/**
 * Supported native CSS pseudo-classes.
 *
 * These pseudo-classes are supported by browsers natively, so we don't need Extended CSS library to support them.
 *
 * The problem with pseudo-classes is that any unknown pseudo-class makes browser ignore the whole CSS rule,
 * which contains a lot more selectors. So, if CSS selector contains a pseudo-class, we should try to validate it.
 * One more problem with pseudo-classes is that they are actively used in uBlock, hence it may mess AG styles.
 *
 * Please keep this list sorted alphabetically.
 */
const SUPPORTED_CSS_PSEUDO_CLASSES = new Set([
    'active', // https://developer.mozilla.org/en-US/docs/Web/CSS/:active
    'checked', // https://developer.mozilla.org/en-US/docs/Web/CSS/:checked
    'disabled', // https://developer.mozilla.org/en-US/docs/Web/CSS/:disabled
    'empty', // https://developer.mozilla.org/en-US/docs/Web/CSS/:empty
    'enabled', // https://developer.mozilla.org/en-US/docs/Web/CSS/:enabled
    'first-child', // https://developer.mozilla.org/en-US/docs/Web/CSS/:first-child
    'first-of-type', // https://developer.mozilla.org/en-US/docs/Web/CSS/:first-of-type
    'focus', // https://developer.mozilla.org/en-US/docs/Web/CSS/:focus
    'has', // https://developer.mozilla.org/en-US/docs/Web/CSS/:has
    'hover', // https://developer.mozilla.org/en-US/docs/Web/CSS/:hover
    'in-range', // https://developer.mozilla.org/en-US/docs/Web/CSS/:in-range
    'invalid', // https://developer.mozilla.org/en-US/docs/Web/CSS/:invalid
    'is', // https://developer.mozilla.org/en-US/docs/Web/CSS/:is
    'lang', // https://developer.mozilla.org/en-US/docs/Web/CSS/:lang
    'last-child', // https://developer.mozilla.org/en-US/docs/Web/CSS/:last-child
    'last-of-type', // https://developer.mozilla.org/en-US/docs/Web/CSS/:last-of-type
    'link', // https://developer.mozilla.org/en-US/docs/Web/CSS/:link
    'not', // https://developer.mozilla.org/en-US/docs/Web/CSS/:not
    'nth-child', // https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child
    'nth-last-child', // https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-last-child
    'nth-last-of-type', // https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-last-of-type
    'nth-of-type', // https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-of-type
    'only-child', // https://developer.mozilla.org/en-US/docs/Web/CSS/:only-child
    'only-of-type', // https://developer.mozilla.org/en-US/docs/Web/CSS/:only-of-type
    'optional', // https://developer.mozilla.org/en-US/docs/Web/CSS/:optional
    'out-of-range', // https://developer.mozilla.org/en-US/docs/Web/CSS/:out-of-range
    'read-only', // https://developer.mozilla.org/en-US/docs/Web/CSS/:read-only
    'read-write', // https://developer.mozilla.org/en-US/docs/Web/CSS/:read-write
    'required', // https://developer.mozilla.org/en-US/docs/Web/CSS/:required
    'root', // https://developer.mozilla.org/en-US/docs/Web/CSS/:root
    'target', // https://developer.mozilla.org/en-US/docs/Web/CSS/:target
    'valid', // https://developer.mozilla.org/en-US/docs/Web/CSS/:valid
    'visited', // https://developer.mozilla.org/en-US/docs/Web/CSS/:visited
    'where', // https://developer.mozilla.org/en-US/docs/Web/CSS/:where
]);
/**
 * Every Extended CSS pseudo-class should start with this prefix.
 *
 * @see {@link https://github.com/AdguardTeam/ExtendedCss#-backward-compatible-syntax}
 */
const EXT_CSS_ATTRIBUTE_SELECTOR_PREFIX = '-ext-';
/**
 * Supported legacy Extended CSS attribute selectors.
 *
 * Attribute selector way is deprecated and will be removed completely in the future,
 * we replaced it with Extended CSS pseudo-classes. For example, instead of
 * `[-ext-has="a[href]"]` you should use `:has(a[href])`.
 *
 * Please keep this list sorted alphabetically.
 */
const SUPPORTED_EXT_CSS_ATTRIBUTE_SELECTORS = new Set([
    `${EXT_CSS_ATTRIBUTE_SELECTOR_PREFIX}has`,
    `${EXT_CSS_ATTRIBUTE_SELECTOR_PREFIX}contains`,
    `${EXT_CSS_ATTRIBUTE_SELECTOR_PREFIX}has-text`,
    `${EXT_CSS_ATTRIBUTE_SELECTOR_PREFIX}matches-css`,
    `${EXT_CSS_ATTRIBUTE_SELECTOR_PREFIX}matches-css-before`,
    `${EXT_CSS_ATTRIBUTE_SELECTOR_PREFIX}matches-css-after`,
]);
/**
 * Known CSS functions that aren't allowed in CSS injection rules, because they
 * able to load external resources. Please, keep this list sorted.
 */
const FORBIDDEN_CSS_FUNCTIONS = new Set([
    // https://developer.mozilla.org/en-US/docs/Web/CSS/cross-fade
    '-webkit-cross-fade',
    'cross-fade',
    // https://developer.mozilla.org/en-US/docs/Web/CSS/image
    'image',
    // https://developer.mozilla.org/en-US/docs/Web/CSS/image-set
    '-webkit-image-set',
    'image-set',
    // https://developer.mozilla.org/en-US/docs/Web/CSS/url
    'url',
]);

/**
 * @file Declaration list validator.
 */
const REMOVE_PROPERTY = 'remove';
const REMOVE_LENGTH = REMOVE_PROPERTY.length;
/**
 * Check if function name is forbidden. If so, throws an error.
 *
 * @param functionName Function name to check.
 *
 * @throws Error if function name is forbidden.
 */
const checkFunctionName = (functionName) => {
    // function name may contain escaped characters, like '\75' instead of 'u', so we need to decode it
    const decodedFunctionName = (0,_adguard_css_tokenizer__WEBPACK_IMPORTED_MODULE_4__/* .decodeIdent */ .f0)(functionName);
    if (FORBIDDEN_CSS_FUNCTIONS.has(decodedFunctionName)) {
        throw new Error(`Using '${decodedFunctionName}()' is not allowed`);
    }
};
/**
 * Does a basic validation of a declaration list.
 * Checks for unsafe resource loading and determines if the declaration list is an Extended CSS declaration list.
 *
 * @param declarationList Declaration list to validate.
 *
 * @returns Validation result, see {@link CssValidationResult}.
 *
 * @note This is a basic validation for the most necessary things, it does not guarantee that the CSS is completely
 * valid.
 */
const validateDeclarationList = (declarationList) => {
    const result = {
        isValid: true,
        isExtendedCss: false,
    };
    try {
        (0,_adguard_css_tokenizer__WEBPACK_IMPORTED_MODULE_4__/* .tokenizeExtended */ .jz)(declarationList, (token, start, end) => {
            switch (token) {
                // Special case: according to CSS specs, sometimes url() is handled as a separate token type
                case _adguard_css_tokenizer__WEBPACK_IMPORTED_MODULE_4__/* .TokenType */ .ks.Url:
                case _adguard_css_tokenizer__WEBPACK_IMPORTED_MODULE_4__/* .TokenType */ .ks.BadUrl:
                    throw new Error("Using 'url()' is not allowed");
                case _adguard_css_tokenizer__WEBPACK_IMPORTED_MODULE_4__/* .TokenType */ .ks.Function:
                    // we need -1 to exclude closing bracket, because function tokens look like 'func('
                    checkFunctionName(declarationList.slice(start, end - 1));
                    break;
                case _adguard_css_tokenizer__WEBPACK_IMPORTED_MODULE_4__/* .TokenType */ .ks.Ident:
                    // do a fast check before getting the substring
                    if (end - start === REMOVE_LENGTH) {
                        // TODO: Improve this check, and check the whole `remove: true` sequence.
                        // Please note that the `remove : true` case also valid.
                        if ((0,_adguard_css_tokenizer__WEBPACK_IMPORTED_MODULE_4__/* .decodeIdent */ .f0)(declarationList.slice(start, end)) === REMOVE_PROPERTY) {
                            result.isExtendedCss = true;
                        }
                    }
                    break;
                case _adguard_css_tokenizer__WEBPACK_IMPORTED_MODULE_4__/* .TokenType */ .ks.Comment:
                    throw new Error('Comments are not allowed in declaration lists');
                default:
                    break;
            }
        });
    }
    catch (error) {
        result.isValid = false;
        result.errorMessage = getErrorMessage(error);
    }
    return result;
};

/**
 * @file Selector list validator.
 */
/**
 * Does a basic validation of a selector list.
 * Checks for unsupported pseudo-classes and attribute selectors,
 * and determines if the selector is an Extended CSS selector.
 *
 * @param selectorList Selector list to validate.
 *
 * @returns Validation result, see {@link CssValidationResult}.
 *
 * @note This is a basic validation for the most necessary things, it does not guarantee that the CSS is completely
 * valid.
 */
const validateSelectorList = (selectorList) => {
    const result = {
        isValid: true,
        isExtendedCss: false,
    };
    try {
        let prevIsDoubleColon = false;
        let prevToken;
        let prevNonWhitespaceToken;
        (0,_adguard_css_tokenizer__WEBPACK_IMPORTED_MODULE_4__/* .tokenizeExtended */ .jz)(selectorList, (token, start, end) => {
            if ((token === _adguard_css_tokenizer__WEBPACK_IMPORTED_MODULE_4__/* .TokenType */ .ks.Function || token === _adguard_css_tokenizer__WEBPACK_IMPORTED_MODULE_4__/* .TokenType */ .ks.Ident)
                && prevToken === _adguard_css_tokenizer__WEBPACK_IMPORTED_MODULE_4__/* .TokenType */ .ks.Colon
                && !prevIsDoubleColon) {
                // whitespace is NOT allowed between the ':' and the pseudo-class name, like ': active('
                const name = selectorList.slice(start, 
                // function tokens look like 'func(', so we need to remove the last character
                token === _adguard_css_tokenizer__WEBPACK_IMPORTED_MODULE_4__/* .TokenType */ .ks.Function ? end - 1 : end);
                // function name may contain escaped characters, like '\75' instead of 'u', so we need to decode it
                const decodedName = (0,_adguard_css_tokenizer__WEBPACK_IMPORTED_MODULE_4__/* .decodeIdent */ .f0)(name);
                if (SUPPORTED_EXT_CSS_PSEUDO_CLASSES.has(decodedName)) {
                    result.isExtendedCss = true;
                }
                else if (!SUPPORTED_CSS_PSEUDO_CLASSES.has(decodedName)) {
                    throw new Error(`Unsupported pseudo-class: ':${decodedName}'`);
                }
            }
            else if (token === _adguard_css_tokenizer__WEBPACK_IMPORTED_MODULE_4__/* .TokenType */ .ks.Ident && prevNonWhitespaceToken === _adguard_css_tokenizer__WEBPACK_IMPORTED_MODULE_4__/* .TokenType */ .ks.OpenSquareBracket) {
                // whitespace is allowed between the '[' and the attribute name, like '[ attr]'
                const attributeName = selectorList.slice(start, end);
                if (attributeName.startsWith(EXT_CSS_ATTRIBUTE_SELECTOR_PREFIX)) {
                    result.isExtendedCss = true;
                    if (!SUPPORTED_EXT_CSS_ATTRIBUTE_SELECTORS.has(attributeName)) {
                        throw new Error(`Unsupported Extended CSS attribute selector: '${attributeName}'`);
                    }
                }
            }
            else if (token === _adguard_css_tokenizer__WEBPACK_IMPORTED_MODULE_4__/* .TokenType */ .ks.OpenCurlyBracket || token === _adguard_css_tokenizer__WEBPACK_IMPORTED_MODULE_4__/* .TokenType */ .ks.CloseCurlyBracket) {
                throw new Error('Curly brackets are not allowed in selector lists');
            }
            else if (token === _adguard_css_tokenizer__WEBPACK_IMPORTED_MODULE_4__/* .TokenType */ .ks.Comment) {
                throw new Error('Comments are not allowed in selector lists');
            }
            // memorize tokens, we need them later
            if (token === _adguard_css_tokenizer__WEBPACK_IMPORTED_MODULE_4__/* .TokenType */ .ks.Colon) {
                prevIsDoubleColon = prevToken === _adguard_css_tokenizer__WEBPACK_IMPORTED_MODULE_4__/* .TokenType */ .ks.Colon;
            }
            prevToken = token;
            if (token !== _adguard_css_tokenizer__WEBPACK_IMPORTED_MODULE_4__/* .TokenType */ .ks.Whitespace) {
                prevNonWhitespaceToken = token;
            }
        });
    }
    catch (error) {
        result.isValid = false;
        result.errorMessage = getErrorMessage(error);
    }
    return result;
};

/* eslint-disable max-classes-per-file */
/**
 * Represents scriptlet properties parsed from the rule content.
 */
class ScriptletParams {
    /**
     * Scriptlet properties.
     */
    props = null;
    /**
     * ScriptletParams constructor.
     *
     * @param name Scriptlet name.
     * @param args Scriptlet arguments.
     */
    constructor(name, args) {
        if (typeof name !== 'undefined') {
            this.props = {
                name,
                args: args || [],
            };
        }
    }
    /**
     * Gets scriptlet name.
     *
     * @returns Scriptlet name.
     */
    get name() {
        return this.props?.name;
    }
    /**
     * Gets scriptlet arguments.
     *
     * @returns Scriptlet arguments.
     */
    get args() {
        return this.props?.args ?? [];
    }
    /**
     * Gets string representation of scriptlet parameters.
     *
     * @returns String representation of scriptlet parameters.
     */
    toString() {
        const result = [];
        result.push(_adguard_agtree__WEBPACK_IMPORTED_MODULE_15__/* .ADG_SCRIPTLET_MASK */ .x$);
        result.push('(');
        if (this.name) {
            result.push(_adguard_agtree__WEBPACK_IMPORTED_MODULE_16__/* .QuoteUtils */ .Qj.setStringQuoteType(this.name, _adguard_agtree__WEBPACK_IMPORTED_MODULE_16__/* .QuoteType */ .XA.Single));
        }
        if (this.args.length) {
            result.push(', ');
            result.push(this.args.map((arg) => _adguard_agtree__WEBPACK_IMPORTED_MODULE_16__/* .QuoteUtils */ .Qj.setStringQuoteType(arg, _adguard_agtree__WEBPACK_IMPORTED_MODULE_16__/* .QuoteType */ .XA.Single)).join(', '));
        }
        result.push(')');
        return result.join(EMPTY_STRING);
    }
}
/**
 * @typedef {import('./cosmetic-result').CosmeticResult} CosmeticResult
 */
/**
 * Implements a basic cosmetic rule.
 *
 * Cosmetic rules syntax are almost similar and looks like this.
 * ```
 * rule = [domains] "marker" content
 * domains = [domain0, domain1[, ...[, domainN]]]
 * ```
 *
 * The rule type is defined by the `type` property, you can find the list of them
 * in the {@link CosmeticRuleType} enumeration.
 *
 * What matters, though, is what's in the `content` part of it.
 *
 * @example
 * `example.org##.banner` -- element hiding rule
 * `example.org#$#.banner { display: block; }` -- CSS rule
 * `example.org#%#window.x=1;` -- JS rule
 * `example.org#%#//scriptlet('scriptlet-name')` -- Scriptlet rule
 * `example.org$$div[id="test"]` -- HTML filtering rule
 */
class CosmeticRule {
    /**
     * Rule index.
     */
    ruleIndex;
    /**
     * Filter list ID.
     */
    filterListId;
    /**
     * Rule content.
     */
    content;
    /**
     * Rule type.
     */
    type;
    /**
     * Allowlist flag.
     */
    allowlist = false;
    /**
     * Extended CSS flag.
     */
    extendedCss = false;
    /**
     * $domain modifier pattern. It is only set if $domain modifier is specified for this rule.
     */
    domainModifier = null;
    /**
     * $path modifier pattern. It is only set if $path modifier is specified for this rule.
     */
    pathModifier;
    /**
     * $url modifier pattern. It is only set if $url modifier is specified for this rule,
     * but $path and $domain modifiers are not.
     *
     * TODO: add this to test cases.
     */
    urlModifier;
    /**
     * Js script to execute.
     */
    script = undefined;
    /**
     * Object with script code ready to execute and debug, domain values.
     *
     * @private
     */
    scriptData = null;
    /**
     * Object with scriptlet function and params.
     *
     * @private
     */
    scriptletData = null;
    /**
     * Scriptlet parameters.
     */
    scriptletParams;
    /**
     * If the rule contains scriptlet content.
     */
    isScriptlet = false;
    /**
     * Gets rule index.
     *
     * @returns Rule index.
     */
    getIndex() {
        return this.ruleIndex;
    }
    /**
     * Gets filter list id.
     *
     * @returns Filter list id.
     */
    getFilterListId() {
        return this.filterListId;
    }
    /**
     * Returns the rule content.
     *
     * @returns The content of the rule.
     */
    getContent() {
        return this.content;
    }
    /**
     * Cosmetic rule type (always present).
     *
     * @returns The type of the cosmetic rule.
     */
    getType() {
        return this.type;
    }
    /**
     * Allowlist means that this rule is meant to disable other rules,
     * i.e. an exception rule.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#elemhide-exceptions}
     *
     * @returns True if the rule is an allowlist rule, false otherwise.
     */
    isAllowlist() {
        return this.allowlist;
    }
    /**
     * Returns script ready to execute or null
     * Rebuilds scriptlet script if debug or domain params change.
     *
     * @param options Script options.
     *
     * @returns Script code or null.
     */
    getScript(options = {}) {
        const { debug = false, frameUrl } = options;
        const { scriptData } = this;
        if (scriptData && !this.isScriptlet) {
            return scriptData.code;
        }
        if (scriptData && scriptData.debug === debug) {
            if (frameUrl) {
                if (frameUrl === scriptData.frameUrl) {
                    return scriptData.code;
                }
            }
            else {
                return scriptData.code;
            }
        }
        this.initScript(options);
        return this.scriptData?.code ?? null;
    }
    /**
     * Gets list of permitted domains.
     *
     * @returns List of permitted domains or null if no domain modifier is set.
     */
    getPermittedDomains() {
        if (this.domainModifier) {
            return this.domainModifier.getPermittedDomains();
        }
        return null;
    }
    /**
     * Gets list of restricted domains.
     *
     * @returns List of restricted domains or null if no domain modifier is set.
     */
    getRestrictedDomains() {
        if (this.domainModifier) {
            return this.domainModifier.getRestrictedDomains();
        }
        return null;
    }
    /**
     * Returns true if the rule is considered "generic"
     * "generic" means that the rule is not restricted to a limited set of domains
     * Please note that it might be forbidden on some domains, though.
     *
     * @returns True if the rule is generic, false otherwise.
     */
    isGeneric() {
        return !this.domainModifier?.hasPermittedDomains();
    }
    /**
     * Checks if the rule is ExtendedCss.
     *
     * @returns True if the rule is ExtendedCss, false otherwise.
     */
    isExtendedCss() {
        return this.extendedCss;
    }
    /**
     * Processes cosmetic rule modifiers, e.g. `$path`.
     *
     * @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#modifiers-for-non-basic-type-of-rules}
     *
     * @param ruleNode Cosmetic rule node to process.
     *
     * @returns Processed modifiers ({@link ProcessedModifiers}) or `null` if there are no modifiers.
     */
    static processModifiers(ruleNode) {
        // Do nothing if there are no modifiers in the rule node
        if (!ruleNode.modifiers) {
            return null;
        }
        const result = {};
        // We don't allow duplicate modifiers, so we collect them in a set
        const usedModifiers = new Set();
        // Destructure the modifiers array just for convenience
        const { children: modifierNodes } = ruleNode.modifiers;
        // AGTree parser tolerates this case: [$]example.com##.foo
        // However, we should throw an error here if the modifier list is empty
        // (if the modifier list isn't specified at all, then ruleNode.modifiers
        // will be undefined, so we won't get here)
        if (modifierNodes.length < 1) {
            throw new SyntaxError('Modifiers list cannot be be empty');
        }
        for (const modifierNode of modifierNodes) {
            const modifierName = modifierNode.name.value;
            // Check if the modifier is already used
            if (usedModifiers.has(modifierName)) {
                throw new Error(`Duplicated modifier: '${modifierName}'`);
            }
            // Mark the modifier as used by adding it to the set
            usedModifiers.add(modifierName);
            const modifierValue = modifierNode.value?.value || EMPTY_STRING;
            // Every modifier should have a value at the moment, so for simplicity we throw an error here if the
            // modifier value is not present.
            // TODO: Improve this when we decide to add modifiers without values
            if (modifierValue.length < 1 && modifierName !== "path" /* CosmeticRuleModifier.Path */) {
                throw new SyntaxError(`'$${modifierName}' modifier should have a value`);
            }
            // Process the modifier based on its name
            switch (modifierName) {
                case "domain" /* CosmeticRuleModifier.Domain */:
                    if (ruleNode.domains.children.length > 0) {
                        throw new SyntaxError(`'$${modifierName}' modifier is not allowed in a domain-specific rule`);
                    }
                    result.domainModifier = new DomainModifier(modifierValue, _adguard_agtree__WEBPACK_IMPORTED_MODULE_15__/* .PIPE_MODIFIER_SEPARATOR */ .fW);
                    break;
                case "path" /* CosmeticRuleModifier.Path */:
                    result.pathModifier = new Pattern(SimpleRegex.isRegexPattern(modifierValue)
                        // eslint-disable-next-line max-len
                        ? SimpleRegex.unescapeRegexSpecials(modifierValue, SimpleRegex.reModifierPatternEscapedSpecialCharacters)
                        : modifierValue);
                    break;
                case "url" /* CosmeticRuleModifier.Url */:
                    if (ruleNode.domains.children.length > 0) {
                        throw new SyntaxError(`'$${modifierName}' modifier is not allowed in a domain-specific rule`);
                    }
                    result.urlModifier = new Pattern(SimpleRegex.isRegexPattern(modifierValue)
                        // eslint-disable-next-line max-len
                        ? SimpleRegex.unescapeRegexSpecials(modifierValue, SimpleRegex.reModifierPatternEscapedSpecialCharacters)
                        : modifierValue);
                    break;
                // Don't allow unknown modifiers
                default:
                    throw new SyntaxError(`'$${modifierName}' modifier is not supported`);
            }
        }
        // $url modifier can't be used with other modifiers
        // TODO: Extend / change this check if we decide to add more such modifiers
        if (result.urlModifier && usedModifiers.size > 1) {
            throw new SyntaxError(`'$${"url" /* CosmeticRuleModifier.Url */}' modifier cannot be used with other modifiers`);
        }
        return result;
    }
    /**
     * Validates cosmetic rule node.
     *
     * @param ruleNode Cosmetic rule node to validate.
     *
     * @returns Validation result {@link ValidationResult}.
     */
    static validate(ruleNode) {
        const result = {
            isValid: true,
            isExtendedCss: false,
        };
        let scriptletName;
        let selectorListValidationResult;
        const { type: ruleType } = ruleNode;
        try {
            // Common validation: every cosmetic rule has a domain list
            if (ruleNode.domains?.children.length) {
                // Iterate over the domain list and check every domain
                for (const { value: domain } of ruleNode.domains.children) {
                    // Skip validation for regex domain patterns
                    if (!_adguard_agtree__WEBPACK_IMPORTED_MODULE_17__/* .RegExpUtils */ .Lp.isRegexPattern(domain)
                        && !_adguard_agtree__WEBPACK_IMPORTED_MODULE_18__/* .DomainUtils */ .Aw.isValidDomainOrHostname(domain)) {
                        throw new Error(`'${domain}' is not a valid domain name or regexp pattern`);
                    }
                }
            }
            // Type-specific validation
            switch (ruleType) {
                case _adguard_agtree__WEBPACK_IMPORTED_MODULE_13__/* .CosmeticRuleType */ .k9.ElementHidingRule:
                    selectorListValidationResult = validateSelectorList(ruleNode.body.selectorList.value);
                    if (!selectorListValidationResult.isValid) {
                        throw new Error(selectorListValidationResult.errorMessage);
                    }
                    // Detect ExtendedCss and unsupported pseudo-classes
                    result.isExtendedCss = selectorListValidationResult.isExtendedCss;
                    break;
                case _adguard_agtree__WEBPACK_IMPORTED_MODULE_13__/* .CosmeticRuleType */ .k9.CssInjectionRule:
                    selectorListValidationResult = validateSelectorList(ruleNode.body.selectorList.value);
                    if (!selectorListValidationResult.isValid) {
                        throw new Error(selectorListValidationResult.errorMessage);
                    }
                    // Detect ExtendedCss and unsupported pseudo-classes
                    result.isExtendedCss = selectorListValidationResult.isExtendedCss;
                    // AGTree won't allow the following rule:
                    // `#$#selector { remove: true; padding: 0; }`
                    // because it mixes removal and non-removal declarations.
                    if (ruleNode.body.declarationList) {
                        // eslint-disable-next-line max-len
                        const declarationListValidationResult = validateDeclarationList(ruleNode.body.declarationList.value);
                        if (!declarationListValidationResult.isValid) {
                            throw new Error(declarationListValidationResult.errorMessage);
                        }
                        // If the selector list is not ExtendedCss, then we should set this flag based on the
                        // declaration list validation result
                        if (!result.isExtendedCss) {
                            result.isExtendedCss = declarationListValidationResult.isExtendedCss;
                        }
                    }
                    break;
                case _adguard_agtree__WEBPACK_IMPORTED_MODULE_13__/* .CosmeticRuleType */ .k9.ScriptletInjectionRule:
                    // Scriptlet name is the first child of the parameter list
                    // eslint-disable-next-line max-len
                    scriptletName = _adguard_agtree__WEBPACK_IMPORTED_MODULE_16__/* .QuoteUtils */ .Qj.removeQuotes(ruleNode.body.children[0]?.children[0]?.value ?? EMPTY_STRING);
                    // Special case: scriptlet name is empty, e.g. '#%#//scriptlet()'
                    if (scriptletName.length === 0) {
                        break;
                    }
                    // Check if the scriptlet name is valid
                    if (!(0,_adguard_scriptlets_validators__WEBPACK_IMPORTED_MODULE_11__/* .isValidScriptletName */ .GY)(scriptletName)) {
                        throw new Error(`'${scriptletName}' is not a known scriptlet name`);
                    }
                    break;
                case _adguard_agtree__WEBPACK_IMPORTED_MODULE_13__/* .CosmeticRuleType */ .k9.HtmlFilteringRule:
                    // TODO: Validate HTML filtering rules
                    break;
                case _adguard_agtree__WEBPACK_IMPORTED_MODULE_13__/* .CosmeticRuleType */ .k9.JsInjectionRule:
                    // TODO: Validate JS injection rules
                    break;
                default:
                    break;
            }
        }
        catch (error) {
            result.isValid = false;
            result.errorMessage = getErrorMessage(error);
        }
        return result;
    }
    /**
     * Checks if the domain list contains any domains, but returns `false` if only
     * the wildcard domain is specified.
     *
     * @param domainListNode Domain list node to check.
     *
     * @returns `true` if the domain list contains any domains, `false` otherwise.
     */
    static isAnyDomainSpecified(domainListNode) {
        if (domainListNode.children.length > 0) {
            // Skip wildcard domain list (*)
            return !(domainListNode.children.length === 1 && domainListNode.children[0].value === WILDCARD);
        }
        return false;
    }
    /**
     * Creates an instance of the {@link CosmeticRule}.
     * It parses the rule and extracts the permitted/restricted domains,
     * and also the cosmetic rule's content.
     *
     * Depending on the rule type, the content might be transformed in
     * one of the helper classes, or kept as string when it's appropriate.
     *
     * @param node AST node of the cosmetic rule.
     * @param filterListId ID of the filter list this rule belongs to.
     * @param ruleIndex Line start index in the source filter list; it will be used to find the original rule text
     * in the filtering log when a rule is applied. Default value is {@link RULE_INDEX_NONE} which means that
     * the rule does not have source index.
     *
     * @throws Error if it fails to parse the rule.
     */
    constructor(node, filterListId, ruleIndex = RULE_INDEX_NONE) {
        this.ruleIndex = ruleIndex;
        this.filterListId = filterListId;
        this.allowlist = _adguard_agtree__WEBPACK_IMPORTED_MODULE_19__/* .CosmeticRuleSeparatorUtils */ .m.isException(node.separator.value);
        this.type = node.type;
        this.isScriptlet = node.type === _adguard_agtree__WEBPACK_IMPORTED_MODULE_13__/* .CosmeticRuleType */ .k9.ScriptletInjectionRule;
        this.content = _adguard_agtree_generator__WEBPACK_IMPORTED_MODULE_20__/* .CosmeticRuleBodyGenerator */ .H.generate(node);
        // Store the scriptlet parameters. They will be used later, when we initialize the scriptlet,
        // but at this point we need to store them in order to avoid double parsing
        if (node.type === _adguard_agtree__WEBPACK_IMPORTED_MODULE_13__/* .CosmeticRuleType */ .k9.ScriptletInjectionRule) {
            // Transform complex node into a simple array of strings
            const params = node.body.children[0]?.children.map((param) => (param === null ? EMPTY_STRING : _adguard_agtree__WEBPACK_IMPORTED_MODULE_16__/* .QuoteUtils */ .Qj.removeQuotesAndUnescape(param.value))) ?? [];
            this.scriptletParams = new ScriptletParams(params[0] ?? '', params.slice(1));
        }
        else {
            this.scriptletParams = new ScriptletParams();
        }
        const validationResult = CosmeticRule.validate(node);
        // We should throw an error if the validation failed for any reason
        if (!validationResult.isValid) {
            throw new SyntaxError(validationResult.errorMessage);
        }
        // Check if the rule is ExtendedCss
        const isExtendedCssSeparator = _adguard_agtree__WEBPACK_IMPORTED_MODULE_19__/* .CosmeticRuleSeparatorUtils */ .m.isExtendedCssMarker(node.separator.value);
        this.extendedCss = isExtendedCssSeparator || validationResult.isExtendedCss;
        // Process cosmetic rule modifiers
        const processedModifiers = CosmeticRule.processModifiers(node);
        if (processedModifiers) {
            if (processedModifiers.domainModifier) {
                this.domainModifier = processedModifiers.domainModifier;
            }
            if (processedModifiers.pathModifier) {
                this.pathModifier = processedModifiers.pathModifier;
            }
            if (processedModifiers.urlModifier) {
                this.urlModifier = processedModifiers.urlModifier;
            }
        }
        // Process domain list, if at least one domain is specified
        const { domains: domainListNode } = node;
        if (CosmeticRule.isAnyDomainSpecified(domainListNode)) {
            this.domainModifier = new DomainModifier(domainListNode, _adguard_agtree__WEBPACK_IMPORTED_MODULE_15__/* .COMMA_DOMAIN_LIST_SEPARATOR */ .oo);
        }
    }
    /**
     * Match returns true if this rule can be used on the specified request.
     *
     * @param request Request to check.
     *
     * @returns True if the rule matches the request, false otherwise.
     */
    match(request) {
        if (!this.domainModifier
            && !this.pathModifier
            && !this.urlModifier) {
            return true;
        }
        if (this.urlModifier) {
            return this.urlModifier.matchPattern(request, false);
        }
        if (this.domainModifier) {
            if (!this.domainModifier.matchDomain(request.hostname)) {
                return false;
            }
        }
        if (this.pathModifier) {
            const path = getRelativeUrl(request.urlLowercase);
            if (path) {
                return this.pathModifier.matchPathPattern(path);
            }
            return false;
        }
        return true;
    }
    /**
     * Returns the scriptlet's data consisting of the scriptlet function and its arguments.
     * This method is supposed to be used in the manifest V3 extension.
     *
     * @returns The scriptlet data or null if not available.
     */
    getScriptletData() {
        if (this.scriptletData) {
            return this.scriptletData;
        }
        this.initScript();
        return this.scriptletData;
    }
    /**
     * Updates this.scriptData and this.scriptletData when it is necessary in a lazy way.
     *
     * @param options Initialization options for the script.
     */
    initScript(options = {}) {
        const { debug = false, frameUrl } = options;
        const ruleContent = this.getContent();
        if (!this.isScriptlet) {
            this.scriptData = {
                code: ruleContent,
            };
            return;
        }
        // A scriptlet without a name can only be an allowlist scriptlet
        // https://github.com/AdguardTeam/Scriptlets/issues/377
        // or it is considered invalid if the scriptlet was invalid.
        // This does not require finding scriptData and scriptletData.
        if (!this.scriptletParams?.name) {
            return;
        }
        const params = {
            args: this.scriptletParams.args,
            engine: config.engine || EMPTY_STRING,
            name: this.scriptletParams.name,
            verbose: debug,
            domainName: frameUrl,
            version: config.version || EMPTY_STRING,
        };
        this.scriptData = {
            code: _adguard_scriptlets__WEBPACK_IMPORTED_MODULE_21__/* .scriptlets */ .e.invoke(params) ?? null,
            debug,
            frameUrl,
        };
        this.scriptletData = {
            func: _adguard_scriptlets__WEBPACK_IMPORTED_MODULE_21__/* .scriptlets */ .e.getScriptletFunction(params.name),
            params,
        };
    }
}

/**
 * Implements a host rule.
 *
 * HostRule is a structure for simple host-level rules (i.e. /etc/hosts syntax).
 * More details: http://man7.org/linux/man-pages/man5/hosts.5.html.
 * It also supports "just domain" syntax. In this case, the IP will be set to `0.0.0.0`.
 *
 * Rules syntax looks like this.
 * ```
 * IP_address canonical_hostname [aliases...]
 * ```
 *
 * Examples:
 * `192.168.1.13 bar.mydomain.org bar` -- ipv4
 * `ff02::1 ip6-allnodes` -- ipv6
 * `::1 localhost ip6-localhost ip6-loopback` -- ipv6 aliases
 * `example.org` -- "just domain" syntax.
 *
 * @returns True if this rule can be used on the specified hostname.
 */
class HostRule {
    /**
     * Rule index.
     */
    ruleIndex;
    /**
     * Filter list ID.
     */
    filterListId;
    /**
     * Hostnames.
     */
    hostnames = [];
    /**
     * IP address.
     */
    ip = '';
    /**
     * Invalid flag.
     */
    invalid = false;
    /**
     * Constructor.
     *
     * Parses the rule and creates a new HostRule instance.
     *
     * @param node Original rule text.
     * @param filterListId ID of the filter list this rule belongs to.
     * @param ruleIndex Index of the rule.
     *
     * @throws Error if it fails to parse the rule.
     */
    constructor(node, filterListId, ruleIndex = RULE_INDEX_NONE) {
        this.ruleIndex = ruleIndex;
        this.filterListId = filterListId;
        this.ip = node.ip.value;
        if (node.hostnames.children.length === 0) {
            this.invalid = true;
            return;
        }
        this.hostnames = node.hostnames.children.map((hostname) => hostname.value);
    }
    /**
     * Match returns true if this rule can be used on the specified hostname.
     *
     * @param hostname Hostname to check.
     *
     * @returns True if the hostname matches one of the hostnames in the rule.
     */
    match(hostname) {
        return this.hostnames.includes(hostname);
    }
    /**
     * Returns list id.
     *
     * @returns The filter list ID.
     */
    getFilterListId() {
        return this.filterListId;
    }
    /**
     * Returns rule index.
     *
     * @returns The rule index.
     */
    getIndex() {
        return this.ruleIndex;
    }
    /**
     * Returns ip address.
     *
     * @returns IP address.
     */
    getIp() {
        return this.ip;
    }
    /**
     * Returns hostnames.
     *
     * @returns Array of hostnames.
     */
    getHostnames() {
        return this.hostnames;
    }
    /**
     * Checks if the rule is invalid.
     *
     * @returns True if the rule is invalid.
     */
    isInvalid() {
        return this.invalid;
    }
}

/**
 * Rule builder class.
 */
class RuleFactory {
    /**
     * Creates rule of suitable class from text string
     * It returns null if the line is empty or if it is a comment.
     *
     * TODO: Pack `ignore*` parameters and `silent` into one object with flags.
     *
     * @param node Rule node.
     * @param filterListId List id.
     * @param ruleIndex Line start index in the source filter list; it will be used to find the original rule text
     * in the filtering log when a rule is applied. Default value is {@link RULE_INDEX_NONE} which means that
     * the rule does not have source index.
     * @param ignoreNetwork Do not create network rules.
     * @param ignoreCosmetic Do not create cosmetic rules.
     * @param ignoreHost Do not create host rules.
     * @param silent Log the error for `true`, otherwise throw an exception on
     * a rule creation.
     *
     * @returns IRule object or null.
     *
     * @throws Error when `silent` flag is passed as false on rule creation error.
     */
    static createRule(node, filterListId, ruleIndex = RULE_INDEX_NONE, ignoreNetwork = false, ignoreCosmetic = false, ignoreHost = true, silent = true) {
        try {
            switch (node.category) {
                case _adguard_agtree__WEBPACK_IMPORTED_MODULE_13__/* .RuleCategory */ .$O.Invalid:
                case _adguard_agtree__WEBPACK_IMPORTED_MODULE_13__/* .RuleCategory */ .$O.Empty:
                case _adguard_agtree__WEBPACK_IMPORTED_MODULE_13__/* .RuleCategory */ .$O.Comment:
                    return null;
                case _adguard_agtree__WEBPACK_IMPORTED_MODULE_13__/* .RuleCategory */ .$O.Cosmetic:
                    if (ignoreCosmetic) {
                        return null;
                    }
                    return new CosmeticRule(node, filterListId, ruleIndex);
                case _adguard_agtree__WEBPACK_IMPORTED_MODULE_13__/* .RuleCategory */ .$O.Network:
                    if (node.type === _adguard_agtree__WEBPACK_IMPORTED_MODULE_13__/* .NetworkRuleType */ .vY.HostRule) {
                        if (ignoreHost) {
                            return null;
                        }
                        return new HostRule(node, filterListId, ruleIndex);
                    }
                    if (ignoreNetwork) {
                        return null;
                    }
                    return new NetworkRule(node, filterListId, ruleIndex);
                default:
                    // should not happen in normal operation
                    return null;
            }
        }
        catch (e) {
            let msg = `"${getErrorMessage(e)}" in the rule: `;
            try {
                msg += `"${_adguard_agtree_generator__WEBPACK_IMPORTED_MODULE_12__/* .RuleGenerator */ .u.generate(node)}"`;
            }
            catch (generateError) {
                msg += `"${JSON.stringify(node)}" (generate error: ${getErrorMessage(generateError)})`;
            }
            if (silent) {
                logger.debug(`[tsurl.RuleFactory.createRule]: error: ${msg}`);
            }
            else {
                throw new Error(msg);
            }
        }
        return null;
    }
    /**
     * Creates allowlist rule for domain.
     *
     * @param domain Domain name.
     * @param filterListId List id.
     * @param ruleIndex Line start index in the source filter list.
     *
     * @returns Allowlist rule or null.
     */
    static createAllowlistRule(domain, filterListId, ruleIndex = RULE_INDEX_NONE) {
        const node = createAllowlistRuleNode(domain);
        if (!node) {
            return null;
        }
        return new NetworkRule(node, filterListId, ruleIndex);
    }
}

/**
 * Network rule with node.
 */
class NetworkRuleWithNode {
    rule;
    node;
    /**
     * Creates an instance of NetworkRuleWithNode.
     *
     * @param rule Network rule.
     * @param node Network rule node.
     */
    constructor(rule, node) {
        this.rule = rule;
        this.node = node;
    }
    /** @inheritdoc */
    getIndex() {
        return this.rule.getIndex();
    }
    /** @inheritdoc */
    getFilterListId() {
        return this.rule.getFilterListId();
    }
}

/**
 * Network rule with index and hashes for pattern and rule's text.
 *
 * This class is "wrapper" around simple IndexedRule for the needs of DNR converter:
 * pattern hashes are needed to quickly compare two different network rules with the same,
 * while rule's text hash is needed to keep ID of the rule in the filter the same
 * between several runs. Thus is needed to be able to use "skip review" option in CWS.
 */
class IndexedNetworkRuleWithHash extends IndexedRule {
    /**
     * Rule's hash created with {@link fastHash}. Needed to quickly compare
     * two different network rules with the same pattern part for future
     * checking of $badfilter application from one of them to another.
     *
     * Hash is create only from "pattern" part of the rule.
     */
    hash;
    /**
     * Constructor.
     *
     * @param rule Item of {@link NetworkRule}.
     * @param index Rule's index.
     * @param hash Hash of the rule.
     */
    constructor(rule, index, hash) {
        super(rule, index);
        this.hash = hash;
    }
    /**
     * Creates hash for pattern part of the network rule and return it. Needed
     * to quickly compare two different rules with the same pattern part for
     * future checking of $badfilter application from one of them to another.
     *
     * @param networkRule Item of {@link NetworkRule}.
     *
     * @returns Hash for pattern part of the network rule.
     */
    static createRulePatternHash(networkRule) {
        // TODO: Improve this part: maybe use trie-lookup-table and .getShortcut()?
        // or use agtree to collect pattern + all enabled network options without values
        const significantPart = networkRule.getPattern();
        return fastHash(significantPart);
    }
    /**
     * Gets hash for whole text of the network rule and return it. Needed
     * to keep ID of the rule in the filter the same between several runs. Thus
     * is needed to be able to use "skip review" option in CWS.
     *
     * @param salt Salt for hash, needed to make hash unique event if the rule
     * is the same (e.g. for different filters). To keep check simple, we just
     * use numbers.
     *
     * @returns Hash for pattern part of the network rule.
     */
    getRuleTextHash(salt) {
        const textOfNetworkRule = _adguard_agtree_generator__WEBPACK_IMPORTED_MODULE_12__/* .RuleGenerator */ .u.generate(this.rule.node);
        // Append a null-char to not collide with legitimate rule text.
        const trialText = salt === undefined ? textOfNetworkRule : `${textOfNetworkRule}\0${salt}`;
        return fastHash31(trialText);
    }
    /**
     * Create {@link IndexedNetworkRuleWithHash} from rule. If an error
     * was detected during the conversion - return it.
     *
     * @param filterId Filter id.
     * @param index Rule's buffer index in that filter.
     * @param ruleConvertedToAGSyntax Rule which was converted to AG syntax.
     *
     * @throws Error when conversion failed.
     *
     * @returns Item of {@link IndexedNetworkRuleWithHash} or Error.
     */
    static createIndexedNetworkRuleWithHash(filterId, index, ruleConvertedToAGSyntax) {
        // Create indexed network rule from AG rule. These rules will be used in
        // declarative rules, that's why we ignore cosmetic and host rules.
        let networkRule;
        try {
            // Note: for correct throwing error it is important to use setConfiguration(),
            // because it will set compatibility type and future parsing options
            // for network rules will take it into account.
            networkRule = RuleFactory.createRule(ruleConvertedToAGSyntax, filterId, index, false, // convert only network rules
            true, // ignore cosmetic rules
            true, // ignore host rules
            false);
        }
        catch (e) {
            // eslint-disable-next-line max-len
            throw new Error(`Cannot create IRule from filter "${filterId}" and byte offset "${index}": ${getErrorMessage(e)}`);
        }
        /**
         * The converted rule will be null when there was a comment or
         * an ignored cosmetic/host rule.
         */
        if (networkRule === null) {
            return null;
        }
        if (!(networkRule instanceof NetworkRule)) {
            // eslint-disable-next-line max-len
            throw new Error(`Rule from filter "${filterId}" and byte offset "${index}" is not network rule: ${networkRule}`);
        }
        const patternHash = IndexedNetworkRuleWithHash.createRulePatternHash(networkRule);
        const networkRuleWithNode = new NetworkRuleWithNode(networkRule, ruleConvertedToAGSyntax);
        // If rule is not empty - pack to IndexedNetworkRuleWithHash and add it
        // to the result array.
        const indexedNetworkRuleWithHash = new IndexedNetworkRuleWithHash(networkRuleWithNode, index, patternHash);
        if (!indexedNetworkRuleWithHash) {
            // eslint-disable-next-line max-len
            throw new Error(`Cannot create indexed network rule with hash from filter "${filterId}" and byte offset "${index}"`);
        }
        return indexedNetworkRuleWithHash;
    }
    /**
     * Creates {@link IndexedNetworkRuleWithHash} from rule node.
     *
     * @param filterId Filter's id from which rule was extracted.
     * @param ruleIndex Buffer index of rule in that filter.
     * @param node Rule node.
     *
     * @throws Error when rule cannot be converted to AG syntax or when indexed
     * rule cannot be created from the rule which is already converted to AG
     * syntax.
     *
     * @returns Item of {@link IndexedNetworkRuleWithHash}.
     */
    static createFromNode(filterId, ruleIndex, node) {
        // Converts a raw string rule to AG syntax (apply aliases, etc.)
        let rulesConvertedToAGSyntax;
        try {
            const conversionResult = _adguard_agtree_converter__WEBPACK_IMPORTED_MODULE_22__/* .RuleConverter */ .b.convertToAdg(node);
            if (conversionResult.isConverted) {
                rulesConvertedToAGSyntax = conversionResult.result;
            }
            else {
                rulesConvertedToAGSyntax = [node];
            }
        }
        catch (e) {
            // eslint-disable-next-line max-len
            throw new Error(`Unknown error during conversion rule to AG syntax: ${getErrorMessage(e)}`);
        }
        const rules = [];
        const convertedAGRules = rulesConvertedToAGSyntax;
        // Now convert to IRule and then IndexedRule.
        for (let rulesIndex = 0; rulesIndex < convertedAGRules.length; rulesIndex += 1) {
            const ruleConvertedToAGSyntax = convertedAGRules[rulesIndex];
            try {
                const networkIndexedRuleWithHash = IndexedNetworkRuleWithHash.createIndexedNetworkRuleWithHash(filterId, ruleIndex, ruleConvertedToAGSyntax);
                if (networkIndexedRuleWithHash) {
                    rules.push(networkIndexedRuleWithHash);
                }
            }
            catch (e) {
                // eslint-disable-next-line max-len
                throw new Error(`Error during creating indexed rule with hash: ${getErrorMessage(e)}`);
            }
        }
        return rules;
    }
}

/**
 * Describes an error when rule set source is not available.
 */
class UnavailableRuleSetSourceError extends Error {
    ruleSetId;
    /**
     * Describes an error when rule set source is not available.
     *
     * @param message Message of error.
     * @param ruleSetId Rule set id, the source of which is not available.
     * @param cause Basic error, describes why the source is unavailable.
     */
    constructor(message, ruleSetId, cause) {
        super(message, { cause });
        this.name = this.constructor.name;
        this.ruleSetId = ruleSetId;
        // For proper work of the "instanceof" operator
        Object.setPrototypeOf(this, UnavailableRuleSetSourceError.prototype);
    }
}

/**
 * Contains a list of records with source rule ID, converted rule ID
 * and filter ID.
 * Can return the source filter and rule for the provided conversion rule ID.
 */
class SourceMap {
    sources = [];
    /**
     * Needs for fast search for source rule.
     */
    ruleIdMap = new Map();
    /**
     * Needs for fast search for source rule.
     */
    declarativeIdMap = new Map();
    /**
     * Creates new SourceMap from provided list of sources.
     *
     * @param sources List of sources.
     */
    constructor(sources) {
        this.sources = sources;
        // For fast search
        this.sources.forEach((item) => {
            const { sourceRuleIndex, filterId, declarativeRuleId } = item;
            // Fill source rules map.
            const existingSourcePairs = this.ruleIdMap.get(declarativeRuleId);
            const value = {
                sourceRuleIndex,
                filterId,
            };
            const newSourceValue = existingSourcePairs
                ? existingSourcePairs.concat(value)
                : [value];
            this.ruleIdMap.set(declarativeRuleId, newSourceValue);
            // Fill
            const key = SourceMap.getKeyFromSource(value);
            const existingDeclarativeIdsPairs = this.declarativeIdMap.get(key);
            const newDeclarativeIdsValue = existingDeclarativeIdsPairs
                ? existingDeclarativeIdsPairs.concat(declarativeRuleId)
                : [declarativeRuleId];
            this.declarativeIdMap.set(key, newDeclarativeIdsValue);
        });
    }
    /**
     * Creates unique key for provided pair of source rule and filter id.
     *
     * @param source Pair of source rule and filter id.
     *
     * @returns Unique key for dictionary.
     */
    static getKeyFromSource(source) {
        return `${source.filterId}_${source.sourceRuleIndex}`;
    }
    /**
     * Returns source filter id and source text rule id
     * for provided declarative rule id.
     *
     * @param ruleId Converted rule id.
     *
     * @returns List of pairs: source filter id and source rule id.
     */
    getByDeclarativeRuleId(ruleId) {
        return this.ruleIdMap.get(ruleId) || [];
    }
    /**
     * Returns ids of converted declarative rules for provided pairs of source
     * filter id and source text rule.
     *
     * @param source Pair of source rule and filter id.
     *
     * @returns List of ids of converted declarative rules.
     */
    getBySourceRuleIndex(source) {
        const key = SourceMap.getKeyFromSource(source);
        return this.declarativeIdMap.get(key) || [];
    }
    /**
     * Deserializes array of sources from string.
     *
     * @param sourceString The original map that was serialized into a string.
     *
     * @returns List of sources.
     */
    static deserializeSources(sourceString) {
        // TODO: Add validation
        const arr = JSON.parse(sourceString);
        return arr.map((item) => ({
            declarativeRuleId: item[0],
            sourceRuleIndex: item[1],
            filterId: item[2],
        }));
    }
    /**
     * Serializes source map to JSON string.
     *
     * @todo (TODO:) Can use protocol VLQ.
     *
     * @returns JSON string.
     */
    serialize() {
        // Remove fields names to reduce size of serialized string
        const plainArray = this.sources.map(({ declarativeRuleId, sourceRuleIndex, filterId, }) => ([declarativeRuleId, sourceRuleIndex, filterId]));
        return JSON.stringify(plainArray);
    }
}

/**
 * @file Utility functions for working with metadata rules.
 *
 * Metadata rules are declarative rules that do not block anything themselves,
 * but contain additional information. This information is used by the extension to process other rules,
 * conversion maps, and source maps.
 */
/**
 * Metadata rule ID. Always the first rule in the rule set.
 */
const METADATA_RULE_ID = 1;
/**
 * Metadata key in the rule object.
 */
const METADATA_KEY = 'metadata';
/**
 * Dummy rule URL that should not match any request.
 */
const DUMMY_RULE_URL = 'dummy.rule.adguard.com';
/**
 * Creates a declarative rule with metadata.
 *
 * @param content - Metadata rule configuration.
 *
 * @returns Declarative rule object with metadata.
 */
const createMetadataRule = (content) => {
    return {
        id: METADATA_RULE_ID,
        action: {
            type: RuleActionType.BLOCK,
        },
        condition: {
            urlFilter: DUMMY_RULE_URL,
            resourceTypes: [ResourceType.XmlHttpRequest],
        },
        [METADATA_KEY]: content,
    };
};

const serializedRuleSetLazyDataValidator = zod__WEBPACK_IMPORTED_MODULE_6__.z.strictObject({
    sourceMapRaw: zod__WEBPACK_IMPORTED_MODULE_6__.z.string(),
    filterIds: zod__WEBPACK_IMPORTED_MODULE_6__.z.number().array(),
});
const serializedRuleSetDataValidator = zod__WEBPACK_IMPORTED_MODULE_6__.z.strictObject({
    regexpRulesCount: zod__WEBPACK_IMPORTED_MODULE_6__.z.number(),
    unsafeRulesCount: zod__WEBPACK_IMPORTED_MODULE_6__.z.number(),
    rulesCount: zod__WEBPACK_IMPORTED_MODULE_6__.z.number(),
    ruleSetHashMapRaw: zod__WEBPACK_IMPORTED_MODULE_6__.z.string(),
    badFilterRulesRaw: zod__WEBPACK_IMPORTED_MODULE_6__.z.string().array(),
    unsafeRules: DeclarativeRuleValidator.array().optional(),
});
/**
 * Keeps converted declarative rules, counters of rules and source map for them.
 */
class RuleSet {
    /**
     * Id of rule set.
     */
    id;
    /**
     * Array of converted declarative rules.
     */
    declarativeRules = [];
    /**
     * Number of converted declarative rules.
     *
     * This is needed for the lazy version of the rule set,
     * when content not loaded.
     */
    rulesCount = 0;
    /**
     * Converted declarative unsafe rules.
     */
    unsafeRulesCount = 0;
    /**
     * Array with unsafe declarative rules, which can be optionally provided
     * when creating a ruleset.
     *
     * This can be used to store unsafe rules inside metadata rule to use
     * "skip review" feature in CWS.
     *
     * It's marked as optional to keep backward compatibility with old rulesets.
     *
     * {@link https://developer.chrome.com/docs/webstore/skip-review/}.
     *
     * @todo TODO: Mark this field as required in the next major version.
     */
    unsafeRules;
    /**
     * Converted declarative regexp rules.
     */
    regexpRulesCount = 0;
    /**
     * Source map for declarative rules.
     */
    sourceMap;
    /**
     * Dictionary which helps to fast find rule by its hash.
     */
    rulesHashMap;
    /**
     * List of network rules with $badfilter option.
     */
    badFilterRules;
    /**
     * Keeps array of source filter lists
     * TODO: ? May it leads to memory leaks,
     * because one FilterList with its content
     * can be in the several RuleSet's at the same time ?
     */
    filterList = new Map();
    /**
     * The content provider of a rule set, is needed for lazy initialization.
     * If request the source rules from rule set, the content provider will be
     * called to load the source map, filter list and declarative rules list.
     */
    ruleSetContentProvider;
    /**
     * Whether the content is loaded or not.
     */
    initialized = false;
    /**
     * Waiter for initialization, will be resolved when the content is loaded.
     */
    initializerPromise;
    /**
     * Constructor of RuleSet.
     *
     * @param id Id of rule set.
     * @param rulesCount Number of rules.
     * @param unsafeRulesCount Number of unsafe rules.
     * @param regexpRulesCount Number of regexp rules.
     * @param ruleSetContentProvider Rule set content provider.
     * @param badFilterRules List of rules with $badfilter modifier.
     * @param rulesHashMap Dictionary with hashes for all source rules.
     * @param unsafeRules List of unsafe DNR rules.
     */
    constructor(id, rulesCount, unsafeRulesCount, regexpRulesCount, ruleSetContentProvider, badFilterRules, rulesHashMap, unsafeRules) {
        this.id = id;
        this.rulesCount = rulesCount;
        this.unsafeRulesCount = unsafeRulesCount;
        this.regexpRulesCount = regexpRulesCount;
        this.ruleSetContentProvider = ruleSetContentProvider;
        this.badFilterRules = badFilterRules;
        this.rulesHashMap = rulesHashMap;
        this.unsafeRules = unsafeRules;
    }
    /** @inheritdoc */
    getUnsafeRules() {
        return Promise.resolve(this.unsafeRules || []);
    }
    /** @inheritdoc */
    getRulesCount() {
        return this.rulesCount || this.declarativeRules.length;
    }
    /** @inheritdoc */
    getUnsafeRulesCount() {
        return this.unsafeRulesCount;
    }
    /** @inheritdoc */
    getRegexpRulesCount() {
        return this.regexpRulesCount;
    }
    /** @inheritdoc */
    getId() {
        return this.id;
    }
    /**
     * Returns a list of pairs of source text rules and their filter identifiers
     * for a given declarative rule identifier.
     *
     * @param declarativeRuleId {@link DeclarativeRule|declarative rule} Id.
     *
     * @throws An error when filter is not found or filter content is unavailable.
     *
     * @returns Promise with list of source rules.
     */
    async findSourceRules(declarativeRuleId) {
        if (!this.sourceMap) {
            return [];
        }
        const sourcePairs = this.sourceMap.getByDeclarativeRuleId(declarativeRuleId);
        const sourceRules = sourcePairs.map(async ({ filterId, sourceRuleIndex, }) => {
            const filter = this.filterList.get(filterId);
            if (!filter) {
                throw new Error(`Not found filter list with id: ${filterId}`);
            }
            const sourceRule = await filter.getRuleByIndex(sourceRuleIndex);
            return {
                sourceRule,
                filterId,
            };
        });
        return Promise.all(sourceRules);
    }
    /**
     * Run inner lazy deserialization from rule set content provider to load
     * data which is not needed on the creation of rule set:
     * the source map, filter list and declarative rules list.
     */
    async loadContent() {
        if (this.initialized) {
            return;
        }
        if (this.initializerPromise) {
            await this.initializerPromise;
            return;
        }
        const initialize = async () => {
            const { loadSourceMap, loadFilterList, loadDeclarativeRules, } = this.ruleSetContentProvider;
            this.sourceMap = await loadSourceMap();
            this.declarativeRules = await loadDeclarativeRules();
            // TODO: Find a better method to load filters (AG-42364)
            const filtersList = await loadFilterList();
            filtersList.forEach((filter) => {
                this.filterList.set(filter.getId(), filter);
            });
            this.initialized = true;
        };
        this.initializerPromise = initialize().then(() => {
            this.initializerPromise = undefined;
        });
        await this.initializerPromise;
    }
    /** @inheritdoc */
    unloadContent() {
        // If content is not initialized, there is nothing to unload
        if (!this.initialized && !this.initializerPromise) {
            return;
        }
        // If initialization is in progress
        if (this.initializerPromise) {
            this.initializerPromise.finally(() => {
                this.unloadContent();
            });
            return;
        }
        // Safely unload all filters in the filter list
        this.filterList.forEach((filter) => filter.unloadContent());
        // Clear loaded resources
        this.sourceMap = undefined;
        this.declarativeRules = [];
        this.filterList.clear();
        // Mark the content as unloaded
        this.initialized = false;
        this.initializerPromise = undefined;
    }
    /** @inheritdoc */
    async getRulesById(declarativeRuleId) {
        try {
            await this.loadContent();
            const originalRules = await this.findSourceRules(declarativeRuleId);
            return originalRules;
        }
        catch (e) {
            const id = this.getId();
            // eslint-disable-next-line max-len
            const msg = `Cannot extract source rule for given declarativeRuleId ${declarativeRuleId} in rule set '${id}', got error: ${getErrorMessage(e)}`;
            throw new UnavailableRuleSetSourceError(msg, id, e);
        }
    }
    /** @inheritdoc */
    getBadFilterRules() {
        return this.badFilterRules;
    }
    /** @inheritdoc */
    getRulesHashMap() {
        return this.rulesHashMap;
    }
    /** @inheritdoc */
    async getDeclarativeRulesIdsBySourceRuleIndex(source) {
        await this.loadContent();
        if (!this.sourceMap) {
            const { filterId, sourceRuleIndex } = source;
            // eslint-disable-next-line max-len
            throw new Error(`Cannot find declarative rules for filter id - ${filterId}, rule index - ${sourceRuleIndex} because source map is undefined in ruleset: ${this.getId()}`);
        }
        return this.sourceMap.getBySourceRuleIndex(source);
    }
    /** @inheritdoc */
    async getDeclarativeRules() {
        await this.loadContent();
        return this.declarativeRules;
    }
    /**
     * For provided source rule and filter id return network rule.
     * This method is needed for checking the applicability of $badfilter after
     * a fast-check of rules by comparing only hashes. Afterward, we should
     * build the 'full' Network rule from provided source, not just the hash,
     * to determine the applicability of $badfilter.
     *
     * @param source Source rule and filter id.
     *
     * @returns List of {@link NetworkRule | network rules}.
     */
    static getNetworkRuleBySourceRule(source) {
        const { sourceRule, filterId } = source;
        let networkIndexedRulesWithHash = [];
        try {
            networkIndexedRulesWithHash = IndexedNetworkRuleWithHash.createFromNode(filterId, 
            // We don't need line index because this indexedNetworkRulesWithHash
            // will be used only for matching $badfilter rules.
            0, RuleParser.parse(sourceRule));
        }
        catch (e) {
            return [];
        }
        const networkRules = networkIndexedRulesWithHash.map(({ rule }) => rule.rule);
        return networkRules;
    }
    /**
     * Deserializes rule set to primitives values with lazy load.
     *
     * @param id Id of rule set.
     * @param rawData An item of {@link SerializedRuleSetData} for instant
     * creating ruleset. It contains counters for regular declarative and regexp
     * declarative rules, a map of hashes for all rules, and a list of rules
     * with the `$badfilter` modifier.
     * @param loadLazyData An item of {@link SerializedRuleSetLazyData} for lazy
     * loading ruleset data to find and display source rules when declarative
     * filtering log is enabled. It includes a map of sources for all rules,
     * a list of declarative rules, and a list of source filter IDs.
     * @param loadDeclarativeRules Loader for ruleset's declarative rules from
     * raw file as a string.
     * @param filterList List of {@link IFilter}.
     *
     * @returns Deserialized rule set.
     *
     * @throws Error {@link UnavailableRuleSetSourceError} if rule set source
     * is not available.
     */
    static async deserialize(id, rawData, loadLazyData, loadDeclarativeRules, filterList) {
        let data;
        try {
            const objectFromString = JSON.parse(rawData);
            data = serializedRuleSetDataValidator.parse(objectFromString);
        }
        catch (e) {
            // eslint-disable-next-line max-len
            const msg = `Cannot parse serialized ruleset's data with id "${id}", got error: ${getErrorMessage(e)}`;
            throw new UnavailableRuleSetSourceError(msg, id, e);
        }
        /**
         * This variable is used as a singleton for all three functions
         * (`loadSourceMap`, `loadFilterList`, `loadDeclarativeRules`) to load
         * data only once.
         */
        let deserializedLazyData;
        const getLazyData = async () => {
            if (deserializedLazyData !== undefined) {
                return deserializedLazyData;
            }
            try {
                const lazyData = await loadLazyData();
                const objectFromString = JSON.parse(lazyData);
                deserializedLazyData = serializedRuleSetLazyDataValidator.parse(objectFromString);
                return deserializedLazyData;
            }
            catch (e) {
                // eslint-disable-next-line max-len
                const msg = `Cannot parse or load data for lazy metadata for rule set with id "${id}": ${getErrorMessage(e)}`;
                throw new UnavailableRuleSetSourceError(msg, id, e);
            }
        };
        const deserialized = {
            id,
            data,
            ruleSetContentProvider: {
                loadSourceMap: async () => {
                    const { sourceMapRaw } = await getLazyData();
                    const sources = SourceMap.deserializeSources(sourceMapRaw);
                    return new SourceMap(sources);
                },
                loadFilterList: async () => {
                    const { filterIds } = await getLazyData();
                    return filterList.filter((filter) => filterIds.includes(filter.getId()));
                },
                loadDeclarativeRules: async () => {
                    const rawFileContent = await loadDeclarativeRules();
                    const objectFromString = JSON.parse(rawFileContent);
                    const declarativeRules = DeclarativeRuleValidator
                        .array()
                        .parse(objectFromString);
                    return declarativeRules;
                },
            },
        };
        return deserialized;
    }
    /**
     * Helper method to get serialized rule set data.
     *
     * @param unsafeRules Optional list of unsafe rules to add to the serialized
     * output.
     *
     * @returns Serialized rule set data.
     */
    getSerializedRuleSetData(unsafeRules) {
        let { rulesCount } = this;
        // If unsaferRules is provided, we should not count them in
        // the rules count, since they are moved to the metadata rule.
        if (unsafeRules) {
            rulesCount -= unsafeRules.length;
        }
        return {
            regexpRulesCount: this.regexpRulesCount,
            unsafeRulesCount: this.unsafeRulesCount,
            rulesCount,
            ruleSetHashMapRaw: this.rulesHashMap.serialize(),
            badFilterRulesRaw: this.badFilterRules.map((r) => RuleGenerator.generate(r.rule.node)),
            unsafeRules,
        };
    }
    /**
     * Helper method to get serialized rule set lazy data.
     *
     * @returns Serialized rule set lazy data.
     */
    getSerializedRuleSetLazyData() {
        return {
            sourceMapRaw: this.sourceMap?.serialize() || EMPTY_STRING,
            filterIds: Array.from(this.filterList.keys()),
        };
    }
    /** @inheritdoc */
    async serialize() {
        try {
            await this.loadContent();
        }
        catch (e) {
            const id = this.getId();
            // eslint-disable-next-line max-len
            const msg = `Cannot serialize rule set '${id}' because of not available source, got error: ${getErrorMessage(e)}`;
            throw new UnavailableRuleSetSourceError(msg, id, e);
        }
        const serialized = {
            id: this.id,
            data: JSON.stringify(this.getSerializedRuleSetData()),
            lazyData: JSON.stringify(this.getSerializedRuleSetLazyData()),
        };
        return serialized;
    }
    /** @inheritdoc */
    async serializeCompact(prettyPrint = true, unsafeRules) {
        try {
            await this.loadContent();
        }
        catch (e) {
            const id = this.getId();
            // eslint-disable-next-line max-len
            const msg = `Cannot serialize ruleset '${id}' because of not available source, got error: ${getErrorMessage(e)}`;
            throw new UnavailableRuleSetSourceError(msg, id, e);
        }
        // TODO: Improve this code once we introduce multiple filters within a single rule set
        // Also, do not forget to change metadata rule's structure to store preprocessed filter lists in an array
        const filter = this.filterList.values().next().value;
        const content = await filter.getContent();
        // To ensure that unsafe rules are provided and their count is correct,
        // we check if the length of the provided unsafe rules array is equal to
        // the `unsafeRulesCount` property of the rule set.
        if (unsafeRules && unsafeRules.length > 0 && unsafeRules.length !== this.unsafeRulesCount) {
            const id = this.getId();
            // eslint-disable-next-line max-len
            const msg = `Unsafe rules count is not equal to the length of provided unsafe rules array in rule set '${id}'`;
            throw new Error(msg);
        }
        const metadataRule = createMetadataRule({
            metadata: this.getSerializedRuleSetData(unsafeRules),
            lazyMetadata: this.getSerializedRuleSetLazyData(),
            conversionMap: content.conversionMap,
            rawFilterList: content.rawFilterList,
        });
        let declarativeRules = await this.getDeclarativeRules();
        declarativeRules.unshift(metadataRule);
        // Exclude unsafe rules from declarative rules if they are provided.
        if (unsafeRules) {
            const unsafeRulesIds = new Set(unsafeRules.map((rule) => rule.id));
            declarativeRules = declarativeRules.filter((rule) => {
                return !unsafeRulesIds.has(rule.id);
            });
        }
        const result = serializeJson(declarativeRules, prettyPrint);
        return result;
    }
}

/**
 * Describes abstract error when declarative rule is invalid.
 */
class InvalidDeclarativeRuleError extends Error {
    networkRule;
    declarativeRule;
    /**
     * Describes a reason of the error.
     */
    reason;
    /**
     * Describes abstract error when declarative rule is invalid.
     *
     * @param message Message of error.
     * @param networkRule {@link NetworkRuleWithNode}.
     * @param declarativeRule {@link DeclarativeRule}.
     */
    constructor(message, networkRule, declarativeRule) {
        super(message);
        this.name = this.constructor.name;
        this.declarativeRule = declarativeRule;
        this.networkRule = networkRule;
        // For proper work of the "instanceof" operator
        Object.setPrototypeOf(this, InvalidDeclarativeRuleError.prototype);
    }
}

/**
 * Describes error when converted rule contains empty list of resources types.
 */
class EmptyResourcesError extends InvalidDeclarativeRuleError {
    /**
     * Describes error when converted rule contains empty list of resources types.
     *
     * @param message Message of error.
     * @param networkRule {@link NetworkRuleWithNode}.
     * @param declarativeRule {@link DeclarativeRule}.
     */
    constructor(message, networkRule, declarativeRule) {
        super(message, networkRule, declarativeRule);
        this.name = this.constructor.name;
        // For proper work of the "instanceof" operator
        Object.setPrototypeOf(this, EmptyResourcesError.prototype);
    }
}

/**
 * @typedef {import(
 *   '../../grouped-rules-converters/abstract-rule-converter'
 * ).DeclarativeRuleConverter} DeclarativeRuleConverter
 */
/**
 * Describes an error when a source network rule contains some of
 * the unsupported modifiers.
 *
 * @see {@link DeclarativeRuleConverter.checkNetworkRuleConvertible} for more details.
 */
class UnsupportedModifierError extends Error {
    networkRule;
    /**
     * Describes an error when a source network rule contains some of
     * the unsupported modifiers.
     *
     * @param message Message of error.
     * @param networkRule {@link NetworkRule}.
     */
    constructor(message, networkRule) {
        super(message);
        this.name = this.constructor.name;
        this.networkRule = networkRule;
        // For proper work of the "instanceof" operator
        Object.setPrototypeOf(this, UnsupportedModifierError.prototype);
    }
}

/**
 * Describes an error when the converted rule contains an unsupported RE2
 * regexp syntax error.
 *
 * @see https://github.com/google/re2/wiki/Syntax
 */
class UnsupportedRegexpError extends InvalidDeclarativeRuleError {
    /**
     * Describes an error when the converted rule contains an unsupported RE2
     * regexp syntax error.
     *
     * @param message Message of error.
     * @param networkRule {@link NetworkRuleWithNode}.
     * @param declarativeRule {@link DeclarativeRule}.
     * @param reason Describes a reason of the error.
     */
    constructor(message, networkRule, declarativeRule, reason) {
        super(message, networkRule, declarativeRule);
        this.name = this.constructor.name;
        this.reason = reason;
        // For proper work of the "instanceof" operator
        Object.setPrototypeOf(this, UnsupportedRegexpError.prototype);
    }
}

/**
 * Describes error when maximum number of rules is equal or less than 0.
 */
class EmptyOrNegativeNumberOfRulesError extends Error {
    /**
     * Describes error when maximum number of rules is equal or less than 0.
     *
     * @param message Message of error.
     */
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        // For proper work of the "instanceof" operator
        Object.setPrototypeOf(this, EmptyOrNegativeNumberOfRulesError.prototype);
    }
}

/**
 * Describes error when maximum number of rules is less than 0.
 */
class NegativeNumberOfRulesError extends Error {
    /**
     * Describes error when maximum number of rules is less than 0.
     *
     * @param message Message of error.
     */
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        // For proper work of the "instanceof" operator
        Object.setPrototypeOf(this, NegativeNumberOfRulesError.prototype);
    }
}

/**
 * Describes error when the resources path does not start with a slash
 * or it ends with a slash.
 */
class ResourcesPathError extends Error {
    /**
     * Describes error when the resources path does not start with a slash
     * or it ends with a slash.
     *
     * @param message Message of error.
     */
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        // For proper work of the "instanceof" operator
        Object.setPrototypeOf(this, ResourcesPathError.prototype);
    }
}

/**
 * Class for validating network rules.
 */
class NetworkRuleDeclarativeValidator {
    /**
     * Checks if the $redirect values in the provided network rule
     * are supported for conversion to MV3.
     *
     * @param r Network rule.
     * @param name Modifier's name.
     *
     * @returns Error {@link UnsupportedModifierError} or null if rule is supported.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static checkRemoveParamModifierFn(r, name) {
        const removeParam = r.rule.getAdvancedModifier();
        if (!removeParam) {
            return null;
        }
        if (!RemoveParamModifier.isRemoveParamModifier(removeParam)) {
            return null;
        }
        if (!removeParam.getMV3Validity()) {
            return new UnsupportedModifierError('Network rule with $removeparam modifier with negation or regexp is not supported', r.rule);
        }
        return null;
    }
    /**
     * Checks if the provided rule is an allowlist rule.
     *
     * @param r Network rule.
     * @param name Modifier's name.
     *
     * @returns Error {@link UnsupportedModifierError} or null if rule is supported.
     */
    static checkAllowRulesFn(r, name) {
        if (r.rule.isAllowlist()) {
            return new UnsupportedModifierError(`Network allowlist rule with ${name} modifier is not supported`, r.rule);
        }
        return null;
    }
    /**
     * Checks if the specified modifier is included in rule explicitly.
     *
     * @param r Network rule.
     * @param name Modifier's name.
     *
     * @returns Error {@link UnsupportedModifierError} or null if rule is supported.
     */
    static checkHasModifierExplicitlyFn(r, name) {
        let nameToCheck = name;
        // Remove leading dollar sign, if any
        if (nameToCheck.startsWith(OPTIONS_DELIMITER)) {
            nameToCheck = nameToCheck.slice(OPTIONS_DELIMITER.length);
        }
        if (r.node.modifiers?.children.some((m) => m.name.value === nameToCheck)) {
            return new UnsupportedModifierError(`Network rule with explicitly enabled ${name} modifier is not supported`, r.rule);
        }
        return null;
    }
    /**
     * Checks if the $removeparam values in the provided network rule
     * are supported for conversion to MV3.
     *
     * @param r Network rule.
     * @param name Modifier's name.
     *
     * @returns Error {@link UnsupportedModifierError} or null if rule is supported.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static checkRemoveHeaderModifierFn(r, name) {
        const removeHeader = r.rule.getAdvancedModifier();
        if (!removeHeader) {
            return null;
        }
        if (!RemoveHeaderModifier.isRemoveHeaderModifier(removeHeader)) {
            return null;
        }
        if (!removeHeader.isValid) {
            return new UnsupportedModifierError(
            // eslint-disable-next-line max-len
            'Network rule with $removeheader modifier contains some of the unsupported headers', r.rule);
        }
        return null;
    }
    /**
     * Checks if the $method values in the provided network rule
     * are supported for conversion to MV3.
     *
     * @param r Network rule.
     * @param name Modifier's name.
     *
     * @returns Error {@link UnsupportedModifierError} or null if rule is supported.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static checkMethodModifierFn(r, name) {
        const permittedMethods = r.rule.getPermittedMethods();
        const restrictedMethods = r.rule.getRestrictedMethods();
        if (permittedMethods?.some((method) => method === HTTPMethod.TRACE)
            || restrictedMethods?.some((method) => method === HTTPMethod.TRACE)) {
            return new UnsupportedModifierError('Network rule with $method modifier containing \'trace\' method is not supported', r.rule);
        }
        return null;
    }
    /**
     * Checks if the $cookie values in the provided network rule
     * are supported for conversion to MV3.
     *
     * @param r Network rule.
     * @param name Modifier's name.
     *
     * @returns Error {@link UnsupportedModifierError} or null if rule is supported.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static checkCookieModifierFn = (r, name) => {
        const cookieModifier = r.rule.getAdvancedModifier();
        if (!cookieModifier) {
            return null;
        }
        if (!CookieModifier.isCookieModifier(cookieModifier)) {
            return null;
        }
        if (!cookieModifier.isEmpty()) {
            // eslint-disable-next-line max-len
            const msg = 'The use of additional parameters in $cookie (apart from $cookie itself) is not supported';
            return new UnsupportedModifierError(msg, r.rule);
        }
        return null;
    };
    /**
     * Checks if rule is a "document"-allowlist and contains all these
     * `$elemhide,content,urlblock,jsinject` modifiers at the same time.
     * If it is - we allow partially convert this rule, because `$content`
     * is not supported in the MV3 at all and `$jsinject` and `$urlblock`
     * are not implemented yet, but we can support at least allowlist-rule
     * with `$elemhide` modifier (not in the DNR, but with tsurlfilter engine).
     *
     * TODO: Change the description when `$jsinject` and `$urlblock`
     * are implemented.
     *
     * @param r Network rule.
     * @param name Modifier's name.
     *
     * @returns Error {@link UnsupportedModifierError} or null if rule is supported.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static checkDocumentAllowlistFn = (r, name) => {
        if (r.rule.isFilteringDisabled()) {
            return null;
        }
        return new UnsupportedModifierError(`Network rule with "${name}" modifier is not supported`, r.rule);
    };
    /**
     * The $redirect-rule support will be possible to implement after browsers add this feature:
     * https://github.com/w3c/webextensions/issues/493.
     *
     * @param r Network rule.
     * @param name Modifier's name.
     *
     * @returns Error {@link UnsupportedModifierError} or null if rule is supported.
     */
    static checkRedirectModifierFn = (r, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    name) => {
        const isRedirectRule = r.rule.isOptionEnabled(NetworkRuleOption.Redirect)
            && r.rule.getAdvancedModifier().isRedirectingOnlyBlocked;
        if (!isRedirectRule) {
            return null;
        }
        return new UnsupportedModifierError('Network rule with $redirect-rule modifier is not supported', r.rule);
    };
    static optionsValidators = {
        // Supported
        ThirdParty: { name: '$third-party' },
        MatchCase: { name: '$match-case' },
        Important: { name: '$important' },
        To: { name: '$to' },
        Badfilter: { name: '$badfilter' },
        Permissions: { name: '$permissions' },
        // Supported without conversion.
        Elemhide: { name: '$elemhide', skipConversion: true },
        Generichide: { name: '$generichide', skipConversion: true },
        Specifichide: { name: '$specifichide', skipConversion: true },
        // Partially supported.
        Jsinject: { name: '$jsinject', customChecks: [NetworkRuleDeclarativeValidator.checkDocumentAllowlistFn] },
        Urlblock: { name: '$urlblock', customChecks: [NetworkRuleDeclarativeValidator.checkDocumentAllowlistFn] },
        Content: { name: '$content', customChecks: [NetworkRuleDeclarativeValidator.checkDocumentAllowlistFn] },
        // $popup is not supported in MV3, but rule with $all modifier includes $popup, so we should skip it.
        Popup: { name: '$popup', customChecks: [NetworkRuleDeclarativeValidator.checkHasModifierExplicitlyFn] },
        Csp: { name: '$csp', customChecks: [NetworkRuleDeclarativeValidator.checkAllowRulesFn] },
        Redirect: {
            // $redirect and $redirect-rule modifiers are falling under this option
            name: '$redirect',
            customChecks: [
                NetworkRuleDeclarativeValidator.checkAllowRulesFn,
                NetworkRuleDeclarativeValidator.checkRedirectModifierFn,
            ],
        },
        RemoveParam: {
            name: '$removeparam',
            customChecks: [
                NetworkRuleDeclarativeValidator.checkAllowRulesFn,
                NetworkRuleDeclarativeValidator.checkRemoveParamModifierFn,
            ],
        },
        RemoveHeader: {
            name: '$removeheader',
            customChecks: [
                NetworkRuleDeclarativeValidator.checkAllowRulesFn,
                NetworkRuleDeclarativeValidator.checkRemoveHeaderModifierFn,
            ],
        },
        Cookie: {
            name: '$cookie',
            customChecks: [
                NetworkRuleDeclarativeValidator.checkAllowRulesFn,
                NetworkRuleDeclarativeValidator.checkCookieModifierFn,
            ],
        },
        Method: { name: '$method', customChecks: [NetworkRuleDeclarativeValidator.checkMethodModifierFn] },
        // Not supported.
        Header: { name: '$header', notSupported: true },
        // Not supported yet.
        Genericblock: { name: '$genericblock', notSupported: true },
        Stealth: { name: '$stealth', notSupported: true },
        // Will not be supported.
        Replace: { name: '$replace', notSupported: true },
        JsonPrune: { name: '$jsonprune', notSupported: true },
        Hls: { name: '$hls', notSupported: true },
        // DNS modifiers.
        Client: { name: '$client', notSupported: true },
        DnsRewrite: { name: '$dnsrewrite', notSupported: true },
        DnsType: { name: '$dnstype', notSupported: true },
        Ctag: { name: '$ctag', notSupported: true },
        // Desktop modifiers only.
        Network: { name: '$network', notSupported: true },
        Extension: { name: '$extension', notSupported: true },
    };
    /**
     * Checks if a network rule can be converted to a declarative format or not.
     * We skip the following modifiers:
     *
     * All specific exceptions:
     * $genericblock;
     * $jsinject;
     * $urlblock;
     * $content;
     * $extension;
     * $stealth;
     *
     * Following specific exceptions are not require conversion, but they
     * are used in the {@link MatchingResult.getCosmeticOption}:
     * $elemhide
     * $generichide;
     * $specifichide;
     *
     * Other:
     * $header;
     * $popup;
     * $csp;
     * $replace;
     * $cookie - if modifier is not empty and contains any parameters;
     * $redirect - if the rule is a allowlist;
     * $removeparam - if it contains a negation, or regexp,
     * or the rule is a allowlist;
     * $removeheader - if it contains a title from a prohibited list
     * (see {@link RemoveHeaderModifier.FORBIDDEN_HEADERS});
     * $jsonprune;
     * $method - if the modifier contains 'trace' method,
     * $hls;
     * $permissions.
     *
     * @param rule Network rule.
     *
     * @throws Error with type {@link UnsupportedModifierError} if the rule is not
     * convertible.
     *
     * @returns Boolean flag - `false` if the rule does not require conversion
     * and `true` if the rule is convertible.
     */
    static shouldConvertNetworkRule(rule) {
        // Filter NetworkRuleOption.NotSet because this is syntax sugar and
        // not a real valuable option.
        const options = Object.keys(NetworkRuleOption).filter((key) => key !== 'NotSet');
        // Because we don't have public getter of rule's options, we need
        // to iterate over all existing network options and check each of them.
        for (const option of options) {
            const networkOption = NetworkRuleOption[option];
            if (!rule.rule.isOptionEnabled(networkOption)) {
                continue;
            }
            const validator = this.optionsValidators[option];
            if (!validator) {
                throw new Error(`Validator for option "${option}" is not found`);
            }
            const { name, customChecks, skipConversion, notSupported, } = validator;
            if (notSupported) {
                throw new UnsupportedModifierError(`Unsupported option "${name}"`, rule.rule);
            }
            if (skipConversion) {
                if (rule.rule.isSingleOptionEnabled(networkOption)) {
                    return false;
                }
                continue;
            }
            if (customChecks) {
                for (let j = 0; j < customChecks.length; j += 1) {
                    const err = customChecks[j](rule, name);
                    if (err !== null) {
                        throw err;
                    }
                }
            }
        }
        return true;
    }
}

/**
 * Describes error when converted rule contains an empty list of domains, but original contains.
 */
class EmptyDomainsError extends InvalidDeclarativeRuleError {
    /**
     * Describes error when converted rule contains an empty list of domains, but original contains.
     *
     * @param message Message of error.
     * @param networkRule {@link NetworkRuleWithNode}.
     * @param declarativeRule {@link DeclarativeRule}.
     */
    constructor(message, networkRule, declarativeRule) {
        super(message, networkRule, declarativeRule);
        this.name = this.constructor.name;
        // For proper work of the "instanceof" operator
        Object.setPrototypeOf(this, EmptyDomainsError.prototype);
    }
}

/**
 * Check if the regex is supported in a browser extension using the built-in chrome.declarativeNetRequest API.
 *
 * @param regexFilter Regex to check.
 * @returns Promise that resolves to true if the regex is supported, and rejects with an error otherwise.
 */
const regexValidatorExtension = async (regexFilter) => {
    return new Promise((resolve, reject) => {
        if (typeof chrome !== 'undefined' && chrome.declarativeNetRequest) {
            const regexOptions = { regex: regexFilter };
            chrome.declarativeNetRequest.isRegexSupported(regexOptions, (result) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                }
                else if (result.isSupported) {
                    resolve(true);
                }
                else {
                    reject(new Error(result.reason));
                }
            });
        }
        else {
            reject(new Error('chrome.declarativeNetRequest is not available'));
        }
    });
};

/**
 * Class to manage regex validation using a customizable validator function.
 * By default, it uses the Chrome validator, but a custom validator can be set.
 */
class Re2Validator {
    /**
     * The default validator function.
     * By default, it uses the builtin browser validator.
     */
    validator = regexValidatorExtension;
    /**
     * Set a custom validator function.
     *
     * @param validator - The custom validator function to use.
     */
    setValidator(validator) {
        this.validator = validator;
    }
    /**
     * Check if the regex is supported using the current validator function.
     *
     * @param regexFilter - The regex pattern to validate.
     * @returns A promise that resolves to true if the regex is supported, false otherwise.
     */
    async isRegexSupported(regexFilter) {
        return this.validator(regexFilter);
    }
}
/**
 * Singleton instance of the Re2Validator class.
 * Provides a single point of access to manage regex validation.
 */
const re2Validator = new Re2Validator();

/* eslint-disable jsdoc/require-description-complete-sentence */
/* eslint-disable jsdoc/no-multi-asterisks */
/**
 * @file Describes how to convert one {@link NetworkRule} into one or many
 * {@link DeclarativeRule|declarative rules}.
 *
 *      Heir classes                                        DeclarativeRuleConverter
 *
 *                            │                                         │
 *    *override layer*        │              *protected layer*          │              *private layer*
 *                            │                                         │
 *                            │                                         │
 * Subclasses should define   │    Converts a set of indexed rules      │
 * the logic in this method.  │    into declarative rules while         │
 *                            │    handling errors.                     │
 *  ┌─────────────────────┐   │   ┌───────────────────────────┐         │
 *  │                     │   │   │                           │         │
 *  │  abstract convert() ├───┼──►│  protected convertRules() │         │
 *  │                     │   │   │                           │         │
 *  └─────────────────────┘   │   └─────────────┬─────────────┘         │
 *                            │                 │                       │
 *                            │                 │                       │
 *                            │   ┌─────────────▼─────────────┐         │
 *                            │   │                           │         │
 *                            │   │  protected convertRule()  ├─────────┼───────────────────────┐
 *                            │   │                           │         │                       │
 *                            │   └───────────────────────────┘         │                       │
 *                            │   Transforms a single Network Rule      │     ┌─────────────────▼────────────────────┐
 *                            │   into one or several                   │     │                                      │
 *                            │   declarative rules.                    │  ┌──┤ static shouldConvertNetworkRule()    │
 *                            │                                         │  │  │                                      │
 *                            │                                         │  │  └──────────────────────────────────────┘
 *                            │                                         │  │  Checks if network rule conversion
 *                            │                                         │  │  is supported and if it is needed at all.
 *                            │                                         │  │
 *                            │                                         │  │  ┌──────────────────────────┐
 *                            │                                         │  └──►                          │
 *                            │                                         │     │   private getAction()    │
 *                            │                                         │  ┌──┤                          │
 *                            │                                         │  │  └──────────────────────────┘
 *                            │                                         │  │  Generates the action section
 *                            │                                         │  │  of a declarative rule.
 *                            │                                         │  │
 *                            │                                         │  │  ┌────────────────────────────────────┐
 *                            │                                         │  └──►                                    │
 *                            │                                         │     │     private getRedirectAction()    │
 *                            │                                         │     │  static getModifyHeadersAction()   │
 *                            │                                         │     │ static getAddingCspHeadersAction() │
 *                            │                                         │  ┌──┤                                    │
 *                            │                                         │  │  └────────────────────────────────────┘
 *                            │                                         │  │  Modifier-specific methods. A distinct
 *                            │                                         │  │  section will be created for each modifier.
 *                            │                                         │  │
 *                            │                                         │  │  ┌─────────────────────────┐
 *                            │                                         │  └──►                         │
 *                            │                                         │     │  static getCondition()  │
 *                            │                                         │  ┌──┤                         │
 *                            │                                         │  │  └─────────────────────────┘
 *                            │                                         │  │  Generates the condition section
 *                            │                                         │  │  of a declarative rule.
 *                            │                                         │  │
 *                            │                                         │  │  ┌────────────────────────┐
 *                            │                                         │  └──►                        │
 *                            │                                         │     │  static getPriority()  │
 *                            │                                         │  ┌──┤                        │
 *                            │                                         │  │  └────────────────────────┘
 *                            │                                         │  │  Generates the priority of
 *                            │                                         │  │  a declarative rule.
 *                            │                                         │  │
 *                            │                                         │  │  ┌───────────────────────────────────────┐
 *                            │                                         │  └──►                                       │
 *                            │                                         │     │static checkDeclarativeRuleApplicable()│
 *                            │                                         │  ┌──┤                                       │
 *                            │                                         │  │  └───────────────────────────────────────┘
 *                            │                                         │  │  After conversion, checks if the generated
 *                            │                                         │  │  declarative rule contains any unsupported
 *                            │                                         │  │  values.
 *                            │                                         │  │
 *                            │                                         │  │  ┌─────────────────────────────────────┐
 *                            │                                         │  └──►                                     │
 *                            │                                         │     │ static catchErrorDuringConversion() │
 *                            │               ┌─────────────────────────┼─────┤                                     │
 *                            │               │                         │     └─────────────────────────────────────┘
 *                            │   ┌───────────▼────────────────────┐    │     Handles errors during conversion.
 *                            │   │                                │    │
 *                            │   │ protected groupConvertedRules()│    │
 *                            │   │                                │    │
 *                            │   └────────────────────────────────┘    │
 *                            │                                         │
 *                            │   Groups converted declarative rules    │
 *                            │   using the provided grouper-functions. │
 *                            │                                         │
 *                            │   This method is optional and is not    │
 *                            │   used by all derived classes.          │
 *                            │                                         │
 */
/* eslint-enable jsdoc/require-description-complete-sentence */
/* eslint-enable jsdoc/no-multi-asterisks */
/**
 * Contains the generic logic for converting a {@link NetworkRule}
 * into a {@link DeclarativeRule}.
 *
 * Descendant classes must override the {@link DeclarativeRuleConverter.convert} method,
 * where some logic must be defined for each rule type.
 *
 * Also descendant classes can use {@link DeclarativeRuleConverter.convertRules},
 * {@link DeclarativeRuleConverter.convertRule}
 * and {@link DeclarativeRuleConverter.groupConvertedRules} methods, which contains
 * the general logic of transformation and grouping of rules.
 */
class DeclarativeRuleConverter {
    /**
     * String path to web accessible resources,
     * relative to the extension root dir.
     * Should start with leading slash '/'.
     */
    webAccessibleResourcesPath;
    /**
     * Creates an instance of DeclarativeRuleConverter.
     *
     * @param webAccessibleResourcesPath Path to web accessible resources.
     */
    constructor(webAccessibleResourcesPath) {
        this.webAccessibleResourcesPath = webAccessibleResourcesPath;
    }
    /**
     * Gets resource type matching request type.
     *
     * @param requestTypes Request type.
     *
     * @returns List of resource types.
     */
    static getResourceTypes(requestTypes) {
        return Object.entries(DECLARATIVE_RESOURCE_TYPES_MAP)
            // Skips the first element
            .filter(([, requestType]) => (requestTypes & requestType) === requestType)
            .map(([resourceTypeKey]) => resourceTypeKey);
    }
    /**
     * Converts list of tsurlfilter {@link HTTPMethod|methods} to declarative
     * supported http {@link RequestMethod|methods} via excluding 'trace' method.
     *
     * @param methods List of {@link HTTPMethod|methods}.
     *
     * @returns List of {@link RequestMethod|methods}.
     */
    static mapHttpMethodToDeclarativeHttpMethod(methods) {
        return methods
            // Filters unsupported `trace` method
            .filter((m) => m !== HTTPMethod.TRACE)
            // Map tsurlfilter http method to supported declarative http method
            .map((m) => DECLARATIVE_REQUEST_METHOD_MAP[m]);
    }
    /**
     * Checks if the string contains only ASCII characters.
     *
     * @param str String to test.
     *
     * @returns True if string contains only ASCII characters.
     */
    static isASCII(str) {
        // eslint-disable-next-line no-control-regex
        return /^[\x00-\x7F]+$/.test(str);
    }
    /**
     * Converts to ASCII characters only if `str` contains non-ASCII characters.
     *
     * @param str String to convert.
     *
     * @returns A transformed string containing only ASCII characters or
     * the original string.
     *
     * @throws Error if conversion into ASCII fails.
     */
    static prepareASCII(str) {
        let res = str;
        try {
            if (!DeclarativeRuleConverter.isASCII(res)) {
                // for cyrillic domains we need to convert them by isASCII()
                res = punycode_punycode_js__WEBPACK_IMPORTED_MODULE_5__.toASCII(res);
            }
            // after toASCII() some characters can be still non-ASCII
            // e.g. `abc“@` with non-ASCII `“`
            if (!DeclarativeRuleConverter.isASCII(res)) {
                res = punycode_punycode_js__WEBPACK_IMPORTED_MODULE_5__.encode(res);
            }
        }
        catch (e) {
            throw new Error(`Error converting to ASCII: "${str}" due to ${getErrorMessage(e)}`);
        }
        return res;
    }
    /**
     * Removes slashes from the beginning and end of the string.
     * We do that because regexFilter does not support them.
     *
     * @param str String to remove slashes.
     * @returns String without slashes.
     */
    static removeSlashes(str) {
        if (str.startsWith('/') && str.endsWith('/')) {
            return str.substring(1, str.length - 1);
        }
        return str;
    }
    /**
     * Converts a list of strings into strings containing only ASCII characters.
     *
     * @param strings List of strings.
     *
     * @returns List of string containing only ASCII characters.
     */
    static toASCII(strings) {
        return strings.map((s) => {
            return DeclarativeRuleConverter.prepareASCII(s);
        });
    }
    /**
     * Checks if network rule can be converted to {@link RuleActionType.ALLOW_ALL_REQUESTS}.
     *
     * @param rule Network rule.
     *
     * @returns Is rule compatible with {@link RuleActionType.ALLOW_ALL_REQUESTS}.
     */
    static isCompatibleWithAllowAllRequests(rule) {
        const types = DeclarativeRuleConverter.getResourceTypes(rule.getPermittedRequestTypes());
        const allowedRequestTypes = [ResourceType.MainFrame, ResourceType.SubFrame];
        // If found resource type which is incompatible with allowAllRequest field
        if (types.some((type) => !allowedRequestTypes.includes(type))) {
            return false;
        }
        return true;
    }
    /**
     * Rule priority.
     *
     * @see {@link NetworkRule.getPriorityWeight}
     * @see {@link NetworkRule.priorityWeight}
     * @see {@link NetworkRule.calculatePriorityWeight}
     * @see {@link https://adguard.com/kb/en/general/ad-filtering/create-own-filters/#rule-priorities}
     *
     * @param rule Network rule.
     *
     * @returns Priority of the rule or null.
     */
    static getPriority(rule) {
        return rule.getPriorityWeight();
    }
    /**
     * Rule redirect action.
     *
     * @param rule Network rule.
     *
     * @throws Error {@link ResourcesPathError} when a network rule has
     * a $redirect modifier and no path to web-accessible resources
     * is specified.
     *
     * @returns Redirect, which describes where and how the request
     * should be redirected.
     */
    getRedirectAction(rule) {
        if (rule.isOptionEnabled(NetworkRuleOption.Redirect)) {
            const resourcesPath = this.webAccessibleResourcesPath;
            if (!resourcesPath) {
                throw new ResourcesPathError('Empty web accessible resources path');
            }
            const advancedModifier = rule.getAdvancedModifier();
            const redirectTo = advancedModifier;
            const filename = (0,_adguard_scriptlets_redirects__WEBPACK_IMPORTED_MODULE_24__/* .getRedirectFilename */ .E)(redirectTo.getValue());
            return { extensionPath: `${resourcesPath}/${filename}` };
        }
        if (rule.isOptionEnabled(NetworkRuleOption.RemoveParam)) {
            const advancedModifier = rule.getAdvancedModifier();
            const removeParamModifier = advancedModifier;
            const value = removeParamModifier.getValue();
            if (value === '') {
                return { transform: { query: '' } };
            }
            return {
                transform: {
                    queryTransform: {
                        /**
                         * In case if param is encoded URI we need to decode it first:
                         * https://github.com/AdguardTeam/AdguardBrowserExtension/issues/3014.
                         */
                        removeParams: [decodeURIComponent(value)],
                    },
                },
            };
        }
        return {};
    }
    /**
     * Returns rule modify headers action.
     *
     * @param rule Network rule.
     *
     * @returns Modify headers action, which describes which headers should
     * be changed: added, set or deleted.
     */
    static getModifyHeadersAction(rule) {
        if (!rule.isOptionEnabled(NetworkRuleOption.RemoveHeader)) {
            return null;
        }
        const removeHeaderModifier = rule.getAdvancedModifier();
        const removeRequestHeader = removeHeaderModifier.getApplicableHeaderName(true);
        if (removeRequestHeader) {
            return {
                requestHeaders: [{
                        header: removeRequestHeader,
                        operation: HeaderOperation.Remove,
                    }],
            };
        }
        const removeResponseHeader = removeHeaderModifier.getApplicableHeaderName(false);
        if (removeResponseHeader) {
            return {
                responseHeaders: [{
                        header: removeResponseHeader,
                        operation: HeaderOperation.Remove,
                    }],
            };
        }
        return null;
    }
    /**
     * Returns rule modify headers action with removing Cookie headers from response and request.
     *
     * @param rule Network rule.
     *
     * @returns Add headers action, which describes which headers should be added.
     */
    static getRemovingCookieHeadersAction(rule) {
        if (!rule.isOptionEnabled(NetworkRuleOption.Cookie)) {
            return null;
        }
        return {
            responseHeaders: [{
                    operation: HeaderOperation.Remove,
                    header: 'Set-Cookie',
                }],
            requestHeaders: [{
                    operation: HeaderOperation.Remove,
                    header: 'Cookie',
                }],
        };
    }
    /**
     * Returns rule modify headers action with adding CSP headers to response.
     *
     * @param rule Network rule.
     *
     * @returns Add headers action, which describes what headers should be added.
     */
    static getAddingCspHeadersAction(rule) {
        if (!rule.isOptionEnabled(NetworkRuleOption.Csp)) {
            return null;
        }
        const cspHeaderValue = rule.getAdvancedModifierValue();
        if (cspHeaderValue) {
            return {
                operation: HeaderOperation.Append,
                header: CSP_HEADER_NAME,
                value: cspHeaderValue,
            };
        }
        return null;
    }
    /**
     * Returns rule modify headers action with adding Permissions headers to response.
     *
     * @param rule Network rule.
     *
     * @returns Add headers action, which describes what headers should be added.
     */
    static getAddingPermissionsHeadersAction(rule) {
        if (!rule.isOptionEnabled(NetworkRuleOption.Permissions)) {
            return null;
        }
        const permissionsHeaderValue = rule.getAdvancedModifierValue();
        if (permissionsHeaderValue) {
            return {
                operation: HeaderOperation.Append,
                header: PERMISSIONS_POLICY_HEADER_NAME,
                value: permissionsHeaderValue,
            };
        }
        return null;
    }
    /**
     * Rule action.
     *
     * @param rule Network rule.
     *
     * @throws Error {@link ResourcesPathError} when specified an empty
     * path to the web accessible resources.
     *
     * @returns The action of a rule that describes what should be done
     * with the request.
     */
    getAction(rule) {
        if (rule.isAllowlist()) {
            if (rule.isFilteringDisabled() && DeclarativeRuleConverter.isCompatibleWithAllowAllRequests(rule)) {
                return { type: RuleActionType.ALLOW_ALL_REQUESTS };
            }
            return { type: RuleActionType.ALLOW };
        }
        if (rule.isOptionEnabled(NetworkRuleOption.Redirect)
            || rule.isOptionEnabled(NetworkRuleOption.RemoveParam)) {
            return {
                type: RuleActionType.REDIRECT,
                redirect: this.getRedirectAction(rule),
            };
        }
        if (rule.isOptionEnabled(NetworkRuleOption.RemoveHeader)) {
            const modifyHeadersAction = DeclarativeRuleConverter.getModifyHeadersAction(rule);
            if (modifyHeadersAction?.requestHeaders) {
                return {
                    type: RuleActionType.MODIFY_HEADERS,
                    requestHeaders: modifyHeadersAction.requestHeaders,
                };
            }
            if (modifyHeadersAction?.responseHeaders) {
                return {
                    type: RuleActionType.MODIFY_HEADERS,
                    responseHeaders: modifyHeadersAction.responseHeaders,
                };
            }
        }
        if (rule.isOptionEnabled(NetworkRuleOption.Csp)) {
            const headersAction = DeclarativeRuleConverter.getAddingCspHeadersAction(rule);
            if (headersAction) {
                return {
                    type: RuleActionType.MODIFY_HEADERS,
                    responseHeaders: [headersAction],
                };
            }
        }
        if (rule.isOptionEnabled(NetworkRuleOption.Permissions)) {
            const headersAction = DeclarativeRuleConverter.getAddingPermissionsHeadersAction(rule);
            if (headersAction) {
                return {
                    type: RuleActionType.MODIFY_HEADERS,
                    responseHeaders: [headersAction],
                };
            }
        }
        if (rule.isOptionEnabled(NetworkRuleOption.Cookie)) {
            const removeCookieHeaders = DeclarativeRuleConverter.getRemovingCookieHeadersAction(rule);
            if (removeCookieHeaders) {
                const { responseHeaders, requestHeaders } = removeCookieHeaders;
                return {
                    type: RuleActionType.MODIFY_HEADERS,
                    responseHeaders,
                    requestHeaders,
                };
            }
        }
        return { type: RuleActionType.BLOCK };
    }
    /**
     * Rule condition.
     *
     * @param rule Network rule.
     *
     * @returns A rule condition that describes to which request the declarative
     * rule should be applied.
     */
    static getCondition(rule) {
        const condition = {};
        const pattern = rule.getPattern();
        if (pattern) {
            // set regexFilter
            if (rule.isRegexRule()) {
                const regexFilter = DeclarativeRuleConverter.removeSlashes(pattern);
                condition.regexFilter = DeclarativeRuleConverter.prepareASCII(regexFilter);
            }
            else {
                // A pattern beginning with ||* is not allowed. Use * instead.
                const patternWithoutVerticals = pattern.startsWith('||*')
                    ? pattern.substring(2)
                    : pattern;
                condition.urlFilter = DeclarativeRuleConverter.prepareASCII(patternWithoutVerticals);
            }
        }
        // set domainType
        if (rule.isOptionEnabled(NetworkRuleOption.ThirdParty)) {
            condition.domainType = DomainType.ThirdParty;
        }
        else if (rule.isOptionDisabled(NetworkRuleOption.ThirdParty)) {
            condition.domainType = DomainType.FirstParty;
        }
        // set initiatorDomains
        const permittedDomains = rule.getPermittedDomains()?.filter((d) => {
            // Wildcard and regex domains are not supported by declarative converter
            return !d.includes(SimpleRegex.MASK_ANY_CHARACTER) && !SimpleRegex.isRegexPattern(d);
        });
        if (permittedDomains && permittedDomains.length > 0) {
            condition.initiatorDomains = this.toASCII(permittedDomains);
        }
        // set excludedInitiatorDomains
        const excludedDomains = rule.getRestrictedDomains();
        if (excludedDomains && excludedDomains.length > 0) {
            condition.excludedInitiatorDomains = this.toASCII(excludedDomains);
        }
        const permittedToDomains = rule.getPermittedToDomains();
        if (permittedToDomains && permittedToDomains.length > 0) {
            condition.requestDomains = this.toASCII(permittedToDomains);
        }
        // Can be specified $to or $denyallow, but not together.
        const denyAllowDomains = rule.getDenyAllowDomains();
        const restrictedToDomains = rule.getRestrictedToDomains();
        if (denyAllowDomains && denyAllowDomains.length !== 0) {
            condition.excludedRequestDomains = this.toASCII(denyAllowDomains);
        }
        else if (restrictedToDomains && restrictedToDomains.length !== 0) {
            condition.excludedRequestDomains = this.toASCII(restrictedToDomains);
        }
        // set excludedResourceTypes
        const restrictedRequestTypes = rule.getRestrictedRequestTypes();
        const hasExcludedResourceTypes = restrictedRequestTypes !== 0;
        if (hasExcludedResourceTypes) {
            condition.excludedResourceTypes = this.getResourceTypes(restrictedRequestTypes);
            /**
             * By default, we do not block the requests that
             * are loaded in the browser tab ("main_frame").
             */
            if (!condition.excludedResourceTypes.includes(ResourceType.MainFrame)) {
                condition.excludedResourceTypes.push(ResourceType.MainFrame);
            }
        }
        // set resourceTypes
        const permittedRequestTypes = rule.getPermittedRequestTypes();
        if (!hasExcludedResourceTypes && permittedRequestTypes !== 0) {
            condition.resourceTypes = this.getResourceTypes(permittedRequestTypes);
        }
        const permittedMethods = rule.getPermittedMethods();
        if (permittedMethods && permittedMethods.length !== 0) {
            condition.requestMethods = this.mapHttpMethodToDeclarativeHttpMethod(permittedMethods);
        }
        const restrictedMethods = rule.getRestrictedMethods();
        if (restrictedMethods && restrictedMethods.length !== 0) {
            condition.excludedRequestMethods = this.mapHttpMethodToDeclarativeHttpMethod(restrictedMethods);
        }
        // By default, this option is false, so there is no need to specify it everywhere.
        // We do it only if it is true.
        if (rule.isOptionEnabled(NetworkRuleOption.MatchCase)) {
            condition.isUrlFilterCaseSensitive = rule.isOptionEnabled(NetworkRuleOption.MatchCase);
        }
        /**
         * Adds the main_frame resource type to the resourceTypes if the popup modifier is enabled.
         * Popup rules apply only to document requests, so adding main_frame ensures the rules are correctly applied.
         */
        if (rule.isOptionEnabled(NetworkRuleOption.Popup)) {
            condition.resourceTypes = condition.resourceTypes || [];
            if (!condition.resourceTypes.includes(ResourceType.MainFrame)) {
                condition.resourceTypes.push(ResourceType.MainFrame);
            }
        }
        const emptyResourceTypes = !condition.resourceTypes && !condition.excludedResourceTypes;
        if (emptyResourceTypes) {
            /**
             * Here we need to set 'main_frame' to apply to document requests
             * as well (because by default it applies to all requests except
             * document).
             * And if we specify 'main_frame', then we also need to specify all
             * other types, so that it works not only for document requests, but
             * also for all other types of requests.
             */
            const shouldMatchAllResourcesTypes = rule.isOptionEnabled(NetworkRuleOption.RemoveHeader)
                || rule.isOptionEnabled(NetworkRuleOption.Csp)
                || rule.isOptionEnabled(NetworkRuleOption.Cookie)
                || rule.isOptionEnabled(NetworkRuleOption.To)
                || rule.isOptionEnabled(NetworkRuleOption.Method);
            /**
             * $permissions and $removeparam modifiers must be applied only
             * to `document` content-type ('main_frame' and 'sub_frame')
             * if they don't have resource types.
             */
            const shouldMatchOnlyDocument = rule.isOptionEnabled(NetworkRuleOption.RemoveParam)
                || rule.isOptionEnabled(NetworkRuleOption.Permissions);
            if (shouldMatchAllResourcesTypes) {
                condition.resourceTypes = [
                    ResourceType.MainFrame,
                    ResourceType.SubFrame,
                    ResourceType.Stylesheet,
                    ResourceType.Script,
                    ResourceType.Image,
                    ResourceType.Font,
                    ResourceType.Object,
                    ResourceType.XmlHttpRequest,
                    ResourceType.Ping,
                    ResourceType.Media,
                    ResourceType.WebSocket,
                    ResourceType.Other,
                ];
            }
            else if (shouldMatchOnlyDocument) {
                condition.resourceTypes = [ResourceType.MainFrame, ResourceType.SubFrame];
            }
        }
        return condition;
    }
    /**
     * Converts the network rule into an array of declarative rules.
     *
     * Method to use only in class heirs.
     *
     * @protected
     *
     * @param id Rule identifier.
     * @param rule Network rule.
     *
     * @throws An {@link UnsupportedModifierError} if the network rule
     * contains an unsupported modifier
     * OR an {@link EmptyResourcesError} if there is empty resources in the rule
     * OR an {@link UnsupportedRegexpError} if regexp is not supported in
     * the RE2 syntax.
     * OR a {@link ResourcesPathError} when specified an empty
     * path to the web accessible resources.
     *
     * @returns A list of declarative rules.
     */
    async convertRule(id, rule) {
        // If the rule is not convertible - method will throw an error.
        const shouldConvert = NetworkRuleDeclarativeValidator.shouldConvertNetworkRule(rule);
        // The rule does not require conversion.
        if (!shouldConvert) {
            return [];
        }
        const declarativeRule = {
            id,
            action: this.getAction(rule.rule),
            condition: DeclarativeRuleConverter.getCondition(rule.rule),
        };
        const priority = DeclarativeRuleConverter.getPriority(rule.rule);
        if (priority) {
            declarativeRule.priority = priority;
        }
        const conversionErr = await DeclarativeRuleConverter.checkDeclarativeRuleApplicable(rule, declarativeRule);
        if (conversionErr) {
            throw conversionErr;
        }
        return [declarativeRule];
    }
    /**
     * Verifies whether the converted declarative rule passes the regular expression (regexp) validation.
     *
     * Additionally, it checks whether the rule contains resource types.
     *
     * Note: some complex regexps are not allowed,
     * e.g. back references, possessive quantifiers, negative lookaheads.
     *
     * @see {@link https://github.com/google/re2/wiki/Syntax}.
     *
     * @param networkRule The original network rule.
     * @param declarativeRule The converted declarative rule.
     *
     * @returns Different errors:
     * - {@link EmptyResourcesError} if the rule has empty resources,
     * - {@link UnsupportedRegexpError} if the regexp is not supported
     * by RE2 syntax (@see {@link https://github.com/google/re2/wiki/Syntax}),
     * - {@link EmptyDomainsError} if the declarative rule has empty domains
     * while the original rule has non-empty domains.
     */
    static async checkDeclarativeRuleApplicable(networkRule, declarativeRule) {
        const { regexFilter, resourceTypes } = declarativeRule.condition;
        if (resourceTypes?.length === 0) {
            return new EmptyResourcesError('Conversion resourceTypes is empty', networkRule, declarativeRule);
        }
        const permittedDomains = networkRule.rule.getPermittedDomains();
        if (permittedDomains && permittedDomains.length > 0) {
            const { initiatorDomains } = declarativeRule.condition;
            if (!initiatorDomains || initiatorDomains.length === 0) {
                const ruleText = _adguard_agtree_generator__WEBPACK_IMPORTED_MODULE_12__/* .RuleGenerator */ .u.generate(networkRule.node);
                const msg = `Conversion initiatorDomains is empty, but original rule's domains not: "${ruleText}"`;
                return new EmptyDomainsError(msg, networkRule, declarativeRule);
            }
        }
        // More complex regex than allowed as part of the "regexFilter" key.
        if (regexFilter) {
            try {
                await re2Validator.isRegexSupported(regexFilter);
            }
            catch (e) {
                const ruleText = _adguard_agtree_generator__WEBPACK_IMPORTED_MODULE_12__/* .RuleGenerator */ .u.generate(networkRule.node);
                const msg = `Regex is unsupported: "${ruleText}"`;
                return new UnsupportedRegexpError(msg, networkRule, declarativeRule, getErrorMessage(e));
            }
        }
        return null;
    }
    /**
     * Checks the captured conversion error, if it is one of the expected
     * conversion errors - returns it, otherwise adds information about
     * the original rule, packages it into a new error and returns it.
     *
     * @param rule An error was caught while converting this rule.
     * @param index Index of {@link IndexedNetworkRuleWithHash}.
     * @param id Identifier of the desired declarative rule.
     * @param e Captured error.
     *
     * @returns Initial error or new packaged error.
     */
    static catchErrorDuringConversion(rule, index, id, e) {
        if (e instanceof EmptyResourcesError
            || e instanceof UnsupportedModifierError
            || e instanceof UnsupportedRegexpError
            || e instanceof EmptyDomainsError) {
            return e;
        }
        const msg = `Non-categorized error during a conversion rule (index - ${index}, id - ${id})`;
        return e instanceof Error
            ? new Error(msg, { cause: e })
            : new Error(msg);
    }
    /**
     * Converts the provided set of indexed rules into declarative rules,
     * collecting source rule identifiers for declarative rules
     * and catching conversion errors.
     *
     * @param filterId An identifier for the filter.
     * @param rules Indexed rules.
     * @param usedIds Set with already used IDs to exclude duplications in IDs.
     * Since we use hash of the rule text to generate ID, we need to ensure that
     * the ID is unique for the whole ruleset (especially when we convert
     * several filters into one ruleset).
     *
     * @returns Transformed declarative rules with their sources
     * and caught conversion errors.
     */
    async convertRules(filterId, rules, usedIds) {
        const res = {
            declarativeRules: [],
            errors: [],
            sourceMapValues: [],
        };
        await Promise.all(rules.map(async (r) => {
            const { rule, index } = r;
            const id = DeclarativeRuleConverter.generateUniqueId(r, usedIds);
            let converted = [];
            try {
                converted = await this.convertRule(id, rule);
            }
            catch (e) {
                const err = DeclarativeRuleConverter.catchErrorDuringConversion(rule.rule, index, id, e);
                res.errors.push(err);
                return;
            }
            // For each converted declarative rule save it's source.
            converted.forEach((dRule) => {
                res.sourceMapValues.push({
                    declarativeRuleId: dRule.id,
                    sourceRuleIndex: index,
                    filterId,
                });
                res.declarativeRules.push(dRule);
            });
        }));
        return res;
    }
    /**
     * This function groups similar rules among those already converted into
     * declarative rules. If a similar rule is found, it combines the two
     * declarative rules into one.
     *
     * @param converted An instance of {@link ConvertedRules} that includes
     * converted declarative rules, recorded errors, and a hash mapping
     * declarative rule IDs to corresponding source test rule IDs.
     * @param createRuleTemplate A function that stores the template of
     * a declarative rule. This template is used to compare different
     * declarative rules.
     * @param combineRulePair A function that attempts to find a similar
     * declarative rule by comparing rule templates. If a match is found,
     * it merges the two declarative rules into one and returns combined rule.
     *
     * @returns Object with grouped similar declarative rules.
     */
    // eslint-disable-next-line class-methods-use-this
    groupConvertedRules(converted, createRuleTemplate, combineRulePair) {
        const rulesTemplates = new Map();
        const saveRuleTemplate = (rule) => {
            const template = createRuleTemplate(rule);
            rulesTemplates.set(template, rule);
        };
        const result = {
            declarativeRules: [],
            sourceMapValues: [],
            errors: converted.errors,
        };
        const { sourceMapValues, declarativeRules } = converted;
        declarativeRules.forEach((dRule) => {
            // Trying to find a declarative rule for siblings.
            const template = createRuleTemplate(dRule);
            const siblingDeclarativeRule = rulesTemplates.get(template);
            // Finds the source rule identifier.
            const source = sourceMapValues.find((s) => s.declarativeRuleId === dRule.id);
            if (source === undefined) {
                result.errors.push(new Error(`Cannot find source for converted rule "${dRule}"`));
                return;
            }
            // If a similar rule is found, the function combines the two
            // declarative rules into one and returns the resulting combined rule.
            if (siblingDeclarativeRule) {
                const combinedRule = combineRulePair(siblingDeclarativeRule, dRule);
                // Updates template.
                saveRuleTemplate(combinedRule);
                // Updates the declarative rule identified for the merged rule.
                result.sourceMapValues.push({
                    ...source,
                    declarativeRuleId: combinedRule.id,
                });
            }
            else {
                // If not found - saves the template part of the declarative
                // rule to compare it with next values.
                saveRuleTemplate(dRule);
                // Keeps the source unchanged because the current rule
                // has not been merged.
                result.sourceMapValues.push(source);
            }
        });
        result.declarativeRules = Array.from(rulesTemplates.values());
        return result;
    }
    /**
     * Creates unique ID for rule via adding salt to the hash of the rule if
     * found duplicate ID.
     *
     * @param r Indexed network rule with hash.
     * @param usedIds Set with already used IDs to exclude duplications in IDs.
     *
     * @returns Unique ID for the rule.
     */
    static generateUniqueId(r, usedIds) {
        let id = r.getRuleTextHash();
        // While the ID is already used, we add salt to the hash of the rule.
        let salt = 0;
        while (usedIds.has(id)) {
            salt += 1;
            id = r.getRuleTextHash(salt);
        }
        usedIds.add(id);
        return id;
    }
}

/**
 * @typedef {import('../rules-grouper').RulesGroup} RulesGroup
 */
/**
 * Describes how to convert all rules that are not grouped
 * for separate conversion.
 *
 * @see {@link RulesGroup}
 */
class RegularRulesConverter extends DeclarativeRuleConverter {
    /**
     * Converts ungrouped, basic indexed rules into declarative rules.
     *
     * @param filterId Filter id.
     * @param rules List of indexed network rules with hash.
     * @param usedIds Set with already used IDs to exclude duplications in IDs.
     *
     * @returns Converted rules.
     */
    convert(filterId, rules, usedIds) {
        return this.convertRules(filterId, rules, usedIds);
    }
}

/**
 * Describes how to convert $removeparam rules.
 */
class RemoveParamRulesConverter extends DeclarativeRuleConverter {
    /**
     * Converts indexed rules grouped by $removeparam into declarative rules:
     * for each rule looks for similar rules and groups them into a new rule.
     *
     * @param filterId Filter id.
     * @param rules List of indexed network rules with hash.
     * @param usedIds Set with already used IDs to exclude duplications in IDs.
     *
     * @returns Converted rules.
     */
    async convert(filterId, rules, usedIds) {
        const createRuleTemplate = (rule) => {
            // Deep copy without relation to source rule
            // Note: Partial type is used because we need to delete some fields,
            // but we cannot mark them as optional in the parent type.
            const template = JSON.parse(JSON.stringify(rule));
            delete template.id;
            delete template.action?.redirect?.transform?.queryTransform?.removeParams;
            return JSON.stringify(template);
        };
        const combineRulePair = (sourceRule, ruleToMerge) => {
            const resultRule = JSON.parse(JSON.stringify(sourceRule));
            const params = ruleToMerge.action.redirect?.transform?.queryTransform?.removeParams || [];
            resultRule.action.redirect?.transform?.queryTransform?.removeParams?.push(...params);
            return resultRule;
        };
        const converted = await this.convertRules(filterId, rules, usedIds);
        const result = this.groupConvertedRules(converted, createRuleTemplate, combineRulePair);
        return result;
    }
}

/**
 * Describes how to convert $removeheader rules.
 *
 * TODO: Add checks for rules containing the $removeheader and
 * incompatible modifiers: '$domain', '$third-party', '$important', '$app',
 * '$match-case', '$script', '$stylesheet, etc.
 *
 */
class RemoveHeaderRulesConverter extends DeclarativeRuleConverter {
    /**
     * Converts indexed rules grouped by $removeheader into declarative rules:
     * for each rule looks for similar rules and groups them into a new rule.
     *
     * @param filterId Filter id.
     * @param rules List of indexed network rules with hash.
     * @param usedIds Set with already used IDs to exclude duplications in IDs.
     *
     * @returns Converted rules.
     */
    async convert(filterId, rules, usedIds) {
        const createRuleTemplate = (rule) => {
            // Deep copy without relation to source rule
            const template = JSON.parse(JSON.stringify(rule));
            delete template.id;
            delete template.action.requestHeaders;
            delete template.action.responseHeaders;
            return JSON.stringify(template);
        };
        const combineRulePair = (sourceRule, ruleToMerge) => {
            const resultRule = JSON.parse(JSON.stringify(sourceRule));
            const { responseHeaders, requestHeaders } = ruleToMerge.action;
            if (responseHeaders) {
                if (resultRule.action.responseHeaders) {
                    resultRule.action.responseHeaders.push(...responseHeaders);
                }
                else {
                    resultRule.action.responseHeaders = responseHeaders;
                }
            }
            if (requestHeaders) {
                if (resultRule.action.requestHeaders) {
                    resultRule.action.requestHeaders.push(...requestHeaders);
                }
                else {
                    resultRule.action.requestHeaders = requestHeaders;
                }
            }
            return resultRule;
        };
        const converted = await this.convertRules(filterId, rules, usedIds);
        const result = this.groupConvertedRules(converted, createRuleTemplate, combineRulePair);
        return result;
    }
}

/**
 * Describes how to convert $csp rules.
 */
class CspRulesConverter extends DeclarativeRuleConverter {
    /**
     * Converts indexed rules grouped by $csp into declarative rules:
     * for each rule looks for similar rules and groups them into a new rule.
     *
     * @param filterId Filter id.
     * @param rules List of indexed rules.
     * @param usedIds Set with already used IDs to exclude duplications in IDs.
     *
     * @returns Converted rules.
     */
    async convert(filterId, rules, usedIds) {
        const createRuleTemplate = (rule) => {
            // Deep copy without relation to source rule
            const template = JSON.parse(JSON.stringify(rule));
            delete template.id;
            // Converted $csp rules contain only one response headers action.
            delete template.action.responseHeaders[0].value;
            return JSON.stringify(template);
        };
        const combineRulePair = (sourceRule, ruleToMerge) => {
            const resultRule = JSON.parse(JSON.stringify(sourceRule));
            // If the headers are empty in the rule to merge, do not take any action.
            if (!ruleToMerge.action.responseHeaders || ruleToMerge.action.responseHeaders.length === 0) {
                return resultRule;
            }
            // Try to find CSP header in the rule to merge - if not found, do not take any action.
            const cspHeaderToMerge = ruleToMerge.action.responseHeaders
                .find((h) => h.header === CSP_HEADER_NAME);
            if (!cspHeaderToMerge) {
                return resultRule;
            }
            // Combine the CSP header from the rule to merge with a copy of the source rule.
            if (resultRule.action.responseHeaders && resultRule.action.responseHeaders.length > 0) {
                const idx = resultRule.action.responseHeaders
                    .findIndex((h) => h.header === CSP_HEADER_NAME);
                if (idx === -1) {
                    return resultRule;
                }
                const cspHeaderValue = resultRule.action.responseHeaders[idx].value;
                if (cspHeaderValue) {
                    resultRule.action.responseHeaders[idx].value = `${cspHeaderValue}; ${cspHeaderToMerge.value}`;
                }
                else {
                    resultRule.action.responseHeaders[idx].value = cspHeaderToMerge.value;
                }
            }
            else {
                resultRule.action.responseHeaders = [cspHeaderToMerge];
            }
            return resultRule;
        };
        const converted = await this.convertRules(filterId, rules, usedIds);
        const result = this.groupConvertedRules(converted, createRuleTemplate, combineRulePair);
        return result;
    }
}

/**
 * Describes an error when the maximum number of rules is reached and
 * some rules are skipped from scanning.
 */
class MaxScannedRulesError extends Error {
    /**
     * Line index of the filter from which the rules are skipped.
     */
    lineIndex;
    /**
     * Describes an error when the maximum number of rules is reached and some
     * rules are skipped from scanning.
     *
     * @param message Message of error.
     * @param lineIndex Line index of the filter from which the rules
     * are skipped.
     */
    constructor(message, lineIndex) {
        super(message);
        this.name = this.constructor.name;
        this.lineIndex = lineIndex;
        // For proper work of the "instanceof" operator
        Object.setPrototypeOf(this, MaxScannedRulesError.prototype);
    }
}

/**
 * @typedef {import('../../source-map').Source} Source
 */
/**
 * Describes an error when the maximum number of regexp rules is reached.
 */
class TooManyRegexpRulesError extends Error {
    /**
     * List of excluded source (important!) {@link Source} rules ids.
     */
    excludedRulesIds;
    /**
     * Number of maximum rules.
     */
    numberOfMaximumRules;
    /**
     * Number of excluded declarative rules.
     */
    numberOfExcludedDeclarativeRules;
    /**
     * Describes an error when the maximum number of regexp rules is reached.
     *
     * @param message Message of error.
     * @param excludedRulesIds List of excluded source (important!) {@link Source} rules ids.
     * @param numberOfMaximumRules Number of maximum rules.
     * @param numberOfExcludedDeclarativeRules Number of excluded declarative rules.
     */
    constructor(message, excludedRulesIds, numberOfMaximumRules, numberOfExcludedDeclarativeRules) {
        super(message);
        this.name = this.constructor.name;
        this.excludedRulesIds = excludedRulesIds;
        this.numberOfMaximumRules = numberOfMaximumRules;
        this.numberOfExcludedDeclarativeRules = numberOfExcludedDeclarativeRules;
        // For proper work of the "instanceof" operator
        Object.setPrototypeOf(this, TooManyRegexpRulesError.prototype);
    }
}

/**
 * @typedef {import('../../source-map').Source} Source
 */
/**
 * Describes an error when the maximum number of unsafe rules is reached.
 */
class TooManyUnsafeRulesError extends Error {
    /**
     * List of excluded source (important!) {@link Source} rules ids.
     */
    excludedRulesIds;
    /**
     * Number of maximum rules.
     */
    numberOfMaximumRules;
    /**
     * Number of excluded declarative rules.
     */
    numberOfExcludedDeclarativeRules;
    /**
     * Describes an error when the maximum number of unsafe rules is reached.
     *
     * @param message Message of error.
     * @param excludedRulesIds List of excluded source (important!) {@link Source} rules ids.
     * @param numberOfMaximumRules Number of maximum rules.
     * @param numberOfExcludedDeclarativeRules Number of excluded declarative rules.
     */
    constructor(message, excludedRulesIds, numberOfMaximumRules, numberOfExcludedDeclarativeRules) {
        super(message);
        this.name = this.constructor.name;
        this.excludedRulesIds = excludedRulesIds;
        this.numberOfMaximumRules = numberOfMaximumRules;
        this.numberOfExcludedDeclarativeRules = numberOfExcludedDeclarativeRules;
        // For proper work of the "instanceof" operator
        Object.setPrototypeOf(this, TooManyUnsafeRulesError.prototype);
    }
}

/**
 * @typedef {import('../../source-map').Source} Source
 */
/**
 * Describes an error when the maximum number of rules is reached.
 */
class TooManyRulesError extends Error {
    /**
     * List of excluded source (important!) {@link Source} rules ids.
     */
    excludedRulesIds;
    /**
     * Number of maximum rules.
     */
    numberOfMaximumRules;
    /**
     * Number of excluded declarative rules.
     */
    numberOfExcludedDeclarativeRules;
    /**
     * Describes an error when the maximum number of rules is reached.
     *
     * @param message Message of error.
     * @param excludedRulesIds List of excluded source (important!) {@link Source} rules ids.
     * @param numberOfMaximumRules Number of maximum rules.
     * @param numberOfExcludedDeclarativeRules Number of excluded declarative rules.
     */
    constructor(message, excludedRulesIds, numberOfMaximumRules, numberOfExcludedDeclarativeRules) {
        super(message);
        this.name = this.constructor.name;
        this.excludedRulesIds = excludedRulesIds;
        this.numberOfMaximumRules = numberOfMaximumRules;
        this.numberOfExcludedDeclarativeRules = numberOfExcludedDeclarativeRules;
        // For proper work of the "instanceof" operator
        Object.setPrototypeOf(this, TooManyRulesError.prototype);
    }
}

/**
 * Just a dummy for $badfilter-rules, because they don't need to be converted.
 */
class BadFilterRulesConverter extends DeclarativeRuleConverter {
    /**
     * Skips converting bad rules.
     *
     * @param filterId Filter id.
     * @param rules List of indexed rules.
     * @param usedIds Set with already used IDs to exclude duplications in IDs.
     *
     * @returns Empty converted rules.
     */
    // eslint-disable-next-line class-methods-use-this
    convert(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filterId, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rules, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    usedIds) {
        return Promise.resolve({
            sourceMapValues: [],
            declarativeRules: [],
            errors: [],
        });
    }
}

var RulesGroup;
(function (RulesGroup) {
    RulesGroup[RulesGroup["Regular"] = 0] = "Regular";
    RulesGroup[RulesGroup["RemoveParam"] = 1] = "RemoveParam";
    RulesGroup[RulesGroup["RemoveHeader"] = 2] = "RemoveHeader";
    RulesGroup[RulesGroup["Csp"] = 3] = "Csp";
    RulesGroup[RulesGroup["BadFilter"] = 4] = "BadFilter";
})(RulesGroup || (RulesGroup = {}));
/**
 * Contains logic on how to divide the rules into certain groups.
 *
 * @see {@link RulesGroup}
 */
class DeclarativeRulesGrouper {
    /**
     * Returns group of the indexed rule.
     *
     * @param indexedNetworkRuleWithHash Indexed network rule with hash.
     *
     * @returns Group of the indexed rule.
     */
    static getRuleGroup(indexedNetworkRuleWithHash) {
        const { rule } = indexedNetworkRuleWithHash;
        if (rule.rule.isOptionEnabled(NetworkRuleOption.RemoveParam)) {
            return RulesGroup.RemoveParam;
        }
        if (rule.rule.isOptionEnabled(NetworkRuleOption.RemoveHeader)) {
            return RulesGroup.RemoveHeader;
        }
        if (rule.rule.isOptionEnabled(NetworkRuleOption.Csp)) {
            return RulesGroup.Csp;
        }
        if (rule.rule.isOptionEnabled(NetworkRuleOption.Badfilter)) {
            return RulesGroup.BadFilter;
        }
        return RulesGroup.Regular;
    }
    /**
     * Splits the list of indexed rules into an index with groups.
     *
     * @param rules List of indexed rules.
     *
     * @returns Index with grouped, indexed rules.
     */
    static splitRulesByGroups(rules) {
        const rulesToProcess = {
            [RulesGroup.RemoveParam]: [],
            [RulesGroup.RemoveHeader]: [],
            [RulesGroup.BadFilter]: [],
            [RulesGroup.Regular]: [],
            [RulesGroup.Csp]: [],
        };
        // Categorizing rule groups
        rules.forEach((indexedNetworkRuleWithHash) => {
            const group = DeclarativeRulesGrouper.getRuleGroup(indexedNetworkRuleWithHash);
            rulesToProcess[group].push(indexedNetworkRuleWithHash);
        });
        return rulesToProcess;
    }
}

/* eslint-disable jsdoc/require-description-complete-sentence  */
/**
 * @file Describes the conversion process from {@link IndexedNetworkRuleWithHash}
 * to declarative rules {@link DeclarativeRule} via applying $badfilter-rules
 * {@link DeclarativeRulesConverter#applyBadFilter} and checks for specified
 * limitations {@link DeclarativeRulesConverter#checkLimitations}.
 *
 *                                                                           Conversion
 *
 *
 *
 *
 *       Two entry points        │                FilterConverter             │             RulesConverter
 *                               │                                            │
 *                               │       Perform the conversion at the        │      Perform the conversion at the
 *                               │       filter level.                        │      rules level.
 *                               │                                            │
 *  Converting static rules      │       Validate passed number of rules      │
 *  during extension assembly.   │       and path to web accessible resources.│
 * ┌─────────────────────────┐   │      ┌────────────────────────────────┐    │
 * │                         ├─┬─┼─────►│                                │    │
 * │  convertStaticRuleSet() │ │ │      │      checkConverterOptions()   │    │
 * │                         │ │ │  ┌───┤                                │    │
 * └─────────────────────────┘ │ │  │   └────────────────────────────────┘    │
 *                             │ │  │                                         │
 *  On-the-fly conversion      │ │  │    Filter only network rules and create │
 *  for dynamic rules.         │ │  │    indexed rule with hash.              │
 * ┌─────────────────────────┐ │ │  │    In this method, when converting      │
 * │                         │ │ │  │    dynamic rules, the rules canceled by │
 * │ convertDynamicRuleSets()├─┘ │  │    $badfilter rules from static filters │
 * │                         │   │  │    are filtered out - such rules are    │
 * └─────────────────────────┘   │  │    discarded during filter scanning.    │
 *                               │  │   ┌────────────────────────────────┐    │
 *                               │  └──►│                                │    │
 *                               │      │ NetworkRulesScanner.scanRules()│    │
 *                               │  ┌───┤                                │    │
 *                               │  │   └────────────────────────────────┘    │  Filter rules affected by $badfilter
 *                               │  │                                         │  within one filter, then group the rules
 *                               │  │                                         │  based on modifiers, requiring specific
 *                               │  │    Convert our network rule to DNR.     │  conversion processes such as
 *                               │  │   ┌────────────────────────────────┐    │  post-processing for similar rules.
 *                               │  └──►│                                │    │   ┌────────────────────────────────┐
 *                               │      │           convert()            ├────┼───┤                                │
 *                               │      │                                │    │   │        applyBadFilter()        │
 *                               │      └────────────────────────────────┘    │ ┌─┤                                │
 *                               │                                            │ │ └────────────────────────────────┘
 *                               │                                            │ │
 *                               │                                            │ │ Each group of rules within a single
 *                               │                                            │ │ filter has its converter that performs
 *                               │                                            │ │ the conversion, then combines the
 *                               │                                            │ │ results and returns them.
 *                               │                                            │ │
 *                               │                                            │ │ For details, please go to the
 *                               │                                            │ │ abstract-rule-converter.ts schema.
 *                               │                                            │ │ ┌────────────────────────────────┐
 *                               │                                            │ └►│                                │
 *                               │                                            │   │          convertRules()        │
 *                               │                                            │ ┌─┤                                │
 *                               │                                            │ │ └────────────────────────────────┘
 *                               │                                            │ │
 *                               │                                            │ │ The declarative rules are checked to
 *                               │                                            │ │ ensure they meet the specified
 *                               │                                            │ │ constraints, and if necessary,
 *                               │                                            │ │ some rules are removed.
 *                               │                                            │ │ ┌────────────────────────────────┐
 *                               │                                            │ └►│                                │
 *                               │                                            │   │         checkLimitations()     │
 *                               │   ┌────────────────────────────────────────┼───┤                                │
 *                               │   │                                        │   └────────────────────────────────┘
 *                               │   │   Wrap conversion result into RuleSet. │
 *                               │   │  ┌────────────────────────────────┐    │
 *                               │   └─►│                                │    │
 *                               │      │    collectConvertedResult()    │    │
 *                               │  ┌───┤                                │    │
 *                               │  │   └────────────────────────────────┘    │
 *                               │  │                                         │
 *                               │  │    This method is only called during the│
 *                               │  │    conversion of dynamic rules.         │
 *                               │  │    Applies rules with $badfilter        │
 *                               │  │    modifier from dynamic rulesets to    │
 *                               │  │    all rules from static rulesets and   │
 *                               │  │    returns list of ids of declarative   │
 *                               │  │    rules to disable them.               │
 *                               │  │   ┌──────────────────────────────────┐  │
 *                               │  └──►│                                  │  │
 *                               │      │ collectDeclarativeRulesToCancel()│  │
 *                               │      │                                  │  │
 *                               │      └──────────────────────────────────┘  │
 *                               │                                            │
 */
/* eslint-enable jsdoc/require-description-complete-sentence */
/**
 * Describes how to convert {@link IndexedNetworkRuleWithHash|indexed network rules}
 * into list of {@link DeclarativeRule|declarative rules}.
 */
class DeclarativeRulesConverter {
    /**
     * The declarative identifier of a rule must be a natural number.
     *
     * 1 is reserved for the metadata rule.
     */
    static MIN_DECLARATIVE_RULE_ID = 2;
    /**
     * The declarative identifier of a rule must be less than signed 32-bit
     * integer. The maximum value of a signed 32-bit integer is 2^31 - 1.
     * @see {@link https://groups.google.com/a/chromium.org/g/chromium-extensions/c/yVb56u5Vf0s?}
     */
    static MAX_DECLARATIVE_RULE_ID = 2 ** 31 - 1;
    /**
     * Describes for which group of rules which converter should be used.
     */
    static converters = {
        [RulesGroup.Regular]: RegularRulesConverter,
        [RulesGroup.Csp]: CspRulesConverter,
        [RulesGroup.RemoveParam]: RemoveParamRulesConverter,
        [RulesGroup.RemoveHeader]: RemoveHeaderRulesConverter,
        [RulesGroup.BadFilter]: BadFilterRulesConverter,
    };
    /**
     * Converts list of filters ids with indexed rules to declarative rules:
     * applies $badfilter rules, then for each group of rules (inside one
     * filter) runs specified converter.
     *
     * TODO: The $removeparam, $removeheader, $csp converters can also combine
     * rules across multiple filters.
     *
     * @see {@link DeclarativeRulesConverter.converters}.
     *
     * @param filtersWithRules List of filters ids with indexed rules.
     * @param options Options for conversion.
     *
     * @returns A list of declarative rules, a regexp rule counter,
     * and a list of sourcemap values that contain the relationship between the
     * transformed declarative rule and the source rule.
     */
    static async convert(filtersWithRules, options) {
        const filters = this.applyBadFilter(filtersWithRules);
        let converted = {
            sourceMapValues: [],
            declarativeRules: [],
            errors: [],
        };
        // Set to store unique IDs of declarative rules, it will be modified
        // during the conversion process after each converted rule.
        //
        // Note: since we apply post-converting processing via grouping similar
        // rules for some modifiers, we may have some "released" IDs, but we
        // suppose that 2^31-1 is enough for all rules even with such not used
        // IDs, so to keep the code simple we don't delete them from the set
        // after conversion.
        const uniqueIds = new Set();
        for (const [filterId, groupedRules] of filters) {
            const { sourceMapValues, declarativeRules, errors,
            // eslint-disable-next-line no-await-in-loop
             } = await this.convertRules(filterId, groupedRules, uniqueIds, options);
            converted.sourceMapValues = converted.sourceMapValues.concat(sourceMapValues);
            converted.declarativeRules = converted.declarativeRules.concat(declarativeRules);
            converted.errors = converted.errors.concat(errors);
        }
        converted = this.checkLimitations(converted, options?.maxNumberOfRules, options?.maxNumberOfUnsafeRules, options?.maxNumberOfRegexpRules);
        if (!this.checkRulesHaveUniqueIds(converted.declarativeRules)) {
            throw new Error('Declarative rules have non-unique identifiers.');
        }
        if (!this.checkRulesHaveCorrectIds(converted.declarativeRules)) {
            throw new Error('Declarative rules have incorrect identifiers.');
        }
        return converted;
    }
    /**
     * Converts filter's indexed rules into declarative rules.
     *
     * @param filterId Filed id.
     * @param groupsRules Grouped rules.
     * @param usedIds Set with already used IDs to exclude duplications in IDs.
     * @param options Options for conversion.
     *
     * @returns A list of declarative rules, a regexp rule counter,
     * and a list of sourcemap values that contain the relationship between the
     * transformed declarative rule and the source rule.
     */
    static async convertRules(filterId, groupsRules, usedIds, options) {
        const converted = {
            sourceMapValues: [],
            declarativeRules: [],
            errors: [],
        };
        // Map because RulesGroup values are numbers
        const groups = Object.keys(groupsRules).map(Number);
        await Promise.all(groups.map(async (key) => {
            const converter = new DeclarativeRulesConverter.converters[key](options?.resourcesPath);
            const { sourceMapValues, declarativeRules, errors, } = await converter.convert(filterId, groupsRules[key], usedIds);
            converted.sourceMapValues = converted.sourceMapValues.concat(sourceMapValues);
            converted.declarativeRules = converted.declarativeRules.concat(declarativeRules);
            converted.errors = converted.errors.concat(errors);
        }));
        return converted;
    }
    /**
     * Checks that IDs of declarative rules fit into the range of 1 to 2^31-1.
     *
     * This check is needed because we have post-converting grouping rules,
     * where some code could easily change any part of an already converted DNR
     * rule, and we would receive a critical error.
     * That's why we added post-processing checks.
     *
     * @see {@link https://groups.google.com/a/chromium.org/g/chromium-extensions/c/yVb56u5Vf0s?}
     *
     * @param rules List of declarative rules.
     *
     * @returns True if all rules identifiers which fit in allowed range,
     * otherwise false.
     */
    static checkRulesHaveCorrectIds(rules) {
        return rules.every(({ id }) => {
            return id >= this.MIN_DECLARATIVE_RULE_ID && id <= this.MAX_DECLARATIVE_RULE_ID;
        });
    }
    /**
     * Checks that declarative rules have unique identifiers.
     *
     * This check is needed because we have post-converting grouping rules,
     * where some code could easily change any part of an already converted DNR
     * rule, and we would receive a critical error.
     * That's why we added post-processing checks.
     *
     * @param rules List of declarative rules.
     *
     * @returns True if all rules have unique identifiers, otherwise false.
     */
    static checkRulesHaveUniqueIds(rules) {
        const ids = rules.map(({ id }) => id);
        const uniqueIds = new Set(ids);
        return uniqueIds.size === rules.length;
    }
    /**
     * Checks whether the declarative rule is regex.
     *
     * @see {@link https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest#property-RuleCondition-regexFilter}
     *
     * @param rule Declarative rule to check.
     *
     * @returns True if the rule is regex, otherwise false.
     */
    static isRegexRule(rule) {
        return rule.condition.regexFilter !== undefined;
    }
    /**
     * Removes sources and errors associated with a truncated rule.
     *
     * @param ruleId The ID of the truncated rule.
     * @param sourcesIndex The index of sources.
     * @param errorsIndex The index of errors.
     * @param excludedRulesIds The list of excluded rule IDs.
     */
    static removeTruncatedRuleSourcesAndErrors(ruleId, sourcesIndex, errorsIndex, excludedRulesIds) {
        // Removing a source for a truncated rule
        const sources = sourcesIndex.get(ruleId) || [];
        const sourcesRulesIds = sources.map(({ sourceRuleIndex }) => sourceRuleIndex);
        sourcesIndex.set(ruleId, []);
        // Removing an error for a truncated rule
        errorsIndex.set(ruleId, []);
        // Note: be sure, that sourceRulesIds are not too much to overflow stack.
        excludedRulesIds.push(...sourcesRulesIds);
    }
    /**
     * Check that declarative rules matches the specified constraints and
     * cuts rules if needed as from list also from source map.
     *
     * @param converted Converted rules, errors, sourcemap and counters.
     * @param maxNumberOfRules Maximum number of converted rules.
     * @param maxNumberOfUnsafeRules Maximum number of converted unsafe rules.
     * @param maxNumberOfRegexpRules Maximum number of converted regexp rules.
     *
     * @returns Transformed converted rules with modified (if abbreviated)
     * counters, declarative rules list, source map and errors.
     */
    static checkLimitations(converted, maxNumberOfRules, maxNumberOfUnsafeRules, maxNumberOfRegexpRules) {
        const limitations = [];
        // We apply restrictions only to transformed rules, so we need to filter
        // rule conversion errors if we remove the transformed rule associated
        // with those errors
        let { declarativeRules, sourceMapValues, errors, } = converted;
        const convertedRulesErrors = [];
        const otherErrors = [];
        for (let i = 0; i < errors.length; i += 1) {
            const e = errors[i];
            // Checks only errors of converted declarative rules
            if (e instanceof InvalidDeclarativeRuleError) {
                convertedRulesErrors.push(e);
            }
            else {
                otherErrors.push(e);
            }
        }
        // TODO: Lazy creation of index
        // Create index of errors for fast search and filtering
        const convertedRulesErrorsIndex = new Map();
        convertedRulesErrors.forEach((e) => {
            // Checks only errors of converted declarative rules
            const errorsList = convertedRulesErrorsIndex.get(e.declarativeRule.id);
            const newValue = errorsList
                ? errorsList.concat(e)
                : [e];
            convertedRulesErrorsIndex.set(e.declarativeRule.id, newValue);
        });
        // TODO: Lazy creation of index
        // Create index of sources for fast search and filtering
        const sourcesIndex = new Map();
        sourceMapValues.forEach((source) => {
            const sources = sourcesIndex.get(source.declarativeRuleId);
            const newValue = sources
                ? sources.concat(source)
                : [source];
            sourcesIndex.set(source.declarativeRuleId, newValue);
        });
        // Checks and, if necessary, trims the maximum number of rules
        if (maxNumberOfRules && declarativeRules.length > 0) {
            const filteredRules = [];
            const excludedRulesIds = [];
            let unsafeRulesCounter = 0;
            for (let i = 0; i < declarativeRules.length; i += 1) {
                const rule = declarativeRules[i];
                if (maxNumberOfUnsafeRules && !isSafeRule(rule)) {
                    unsafeRulesCounter += 1;
                    if (unsafeRulesCounter > maxNumberOfUnsafeRules) {
                        this.removeTruncatedRuleSourcesAndErrors(rule.id, sourcesIndex, convertedRulesErrorsIndex, excludedRulesIds);
                        continue;
                    }
                }
                if (i < maxNumberOfRules) {
                    filteredRules.push(rule);
                    continue;
                }
                this.removeTruncatedRuleSourcesAndErrors(rule.id, sourcesIndex, convertedRulesErrorsIndex, excludedRulesIds);
            }
            if (maxNumberOfUnsafeRules
                && unsafeRulesCounter > maxNumberOfUnsafeRules) {
                const msg = 'After conversion, too many unsafe rules remain: '
                    + `${unsafeRulesCounter} exceeds `
                    + `the limit provided - ${maxNumberOfUnsafeRules}`;
                const err = new TooManyUnsafeRulesError(msg, excludedRulesIds, maxNumberOfUnsafeRules, unsafeRulesCounter - maxNumberOfUnsafeRules);
                limitations.push(err);
            }
            if (declarativeRules.length > maxNumberOfRules) {
                const msg = 'After conversion, too many declarative rules remain: '
                    + `${declarativeRules.length} exceeds `
                    + `the limit provided - ${maxNumberOfRules}`;
                const err = new TooManyRulesError(msg, excludedRulesIds, maxNumberOfRules, declarativeRules.length - maxNumberOfRules);
                limitations.push(err);
            }
            declarativeRules = filteredRules;
        }
        // Checks and, if necessary, trims the maximum number of regexp rules
        if (maxNumberOfRegexpRules) {
            const filteredRules = [];
            const excludedRulesIds = [];
            let regexpRulesCounter = 0;
            for (let i = 0; i < declarativeRules.length; i += 1) {
                const rule = declarativeRules[i];
                if (this.isRegexRule(rule)) {
                    regexpRulesCounter += 1;
                    if (regexpRulesCounter > maxNumberOfRegexpRules) {
                        this.removeTruncatedRuleSourcesAndErrors(rule.id, sourcesIndex, convertedRulesErrorsIndex, excludedRulesIds);
                        continue;
                    }
                }
                filteredRules.push(rule);
            }
            if (regexpRulesCounter > maxNumberOfRegexpRules) {
                const msg = 'After conversion, too many regexp rules remain: '
                    + `${regexpRulesCounter} exceeds `
                    + `the limit provided - ${maxNumberOfRegexpRules}`;
                const err = new TooManyRegexpRulesError(msg, excludedRulesIds, maxNumberOfRegexpRules, regexpRulesCounter - maxNumberOfRegexpRules);
                limitations.push(err);
            }
            declarativeRules = filteredRules;
        }
        // Make array from index
        sourceMapValues = Array.from(sourcesIndex.values())
            .filter((arr) => arr.length > 0)
            .flat();
        // Make array from index
        errors = Array.from(convertedRulesErrorsIndex.values())
            .filter((arr) => arr.length > 0)
            .flat();
        return {
            sourceMapValues,
            declarativeRules,
            errors: errors.concat(otherErrors),
            limitations,
        };
    }
    /**
     * Filters rules that have been affected by $badfilter rules and
     * groups them by modifiers.
     *
     * @param filtersWithRules List with filters ids and indexed rules.
     *
     * @returns List with filters ids and grouped indexed rules.
     */
    static applyBadFilter(filtersWithRules) {
        let allBadFilterRules = [];
        // Group rules
        const filterIdsWithGroupedRules = filtersWithRules
            .map(({ id, rules }) => {
            const rulesToProcess = DeclarativeRulesGrouper.splitRulesByGroups(rules);
            allBadFilterRules = allBadFilterRules.concat(rulesToProcess[RulesGroup.BadFilter]);
            const tuple = [id, rulesToProcess];
            return tuple;
        });
        // Define filter function
        const filterByBadFilterFn = (ruleToTest) => {
            const networkRuleToTest = ruleToTest.rule;
            for (const { rule } of allBadFilterRules) {
                if (rule.rule.negatesBadfilter(networkRuleToTest.rule)) {
                    return false;
                }
            }
            return true;
        };
        // For each group of filters' rules apply filter function
        return filterIdsWithGroupedRules.map(([filterId, groupedRules]) => {
            const filtered = groupedRules;
            // Map because RulesGroup values are numbers
            const groups = Object.keys(filtered).map(Number);
            groups.forEach((key) => {
                filtered[key] = filtered[key].filter(filterByBadFilterFn);
            });
            // Clean up bad filters rules
            filtered[RulesGroup.BadFilter] = [];
            return [filterId, filtered];
        });
    }
}

/**
 * Contains a dictionary where the key is the hash of the rule and the value is
 * a list of sources for the rule. Storing this dictionary is necessary for fast
 * rule matching, which can be negated by $badfilter.
 */
class RulesHashMap {
    map = new Map();
    /**
     * Creates new {@link RulesHashMap}.
     *
     * @param listOfRulesWithHash List of rules hashes and rules sources:
     * filter id with rule index.
     */
    constructor(listOfRulesWithHash) {
        listOfRulesWithHash.forEach(({ hash, source }) => {
            const existingValue = this.map.get(hash);
            if (existingValue) {
                existingValue.push(source);
            }
            else {
                this.map.set(hash, [source]);
            }
        });
    }
    /** @inheritdoc */
    findRules(hash) {
        return this.map.get(hash) || [];
    }
    /**
     * Deserializes dictionary from raw string.
     *
     * @param rawString The original dictionary that was serialized into a string.
     *
     * @returns Deserialized dictionary.
     */
    static deserializeSources(rawString) {
        const plainArray = JSON.parse(rawString);
        const allPairs = plainArray
            .map(([hash, sources]) => {
            return sources.map(([filterId, sourceRuleIndex]) => {
                return {
                    hash,
                    source: {
                        filterId,
                        sourceRuleIndex,
                    },
                };
            });
        })
            .flat();
        return allPairs;
    }
    /** @inheritdoc */
    serialize() {
        const arr = Array.from(this.map);
        const serializedValues = arr
            .map(([hash, source]) => {
            const sources = source.map((s) => {
                return [s.filterId, s.sourceRuleIndex];
            });
            return [hash, sources];
        });
        return JSON.stringify(serializedValues);
    }
}

/**
 * BufferReader is a class responsible for reading content from serialized rules.
 */
class BufferReader {
    /**
     * Input byte buffer.
     */
    buffer;
    /**
     * Current position of the reader.
     */
    currentIndex = 0;
    /**
     * Constructor of a BufferReader.
     *
     * @param buffer Uint8Array that contains a UTF-8 encoded string.
     */
    constructor(buffer) {
        this.buffer = buffer;
        this.currentIndex = this.buffer.currentOffset;
    }
    /**
     * Reads the next line in the buffer.
     *
     * @returns Text or null on end.
     */
    readNext() {
        // If the next byte is 0, it means that there's nothing to read.
        if (this.buffer.peekUint8() === 0) {
            return null;
        }
        let ruleNode;
        RuleDeserializer.deserialize(this.buffer, ruleNode = {});
        this.currentIndex = this.buffer.currentOffset;
        if (ruleNode.category) {
            return ruleNode;
        }
        return null;
    }
    /**
     * Returns the current position of this reader or -1 if there's nothing to
     * read.
     *
     * @returns - The current position or -1 if there's nothing to read.
     */
    getCurrentPos() {
        return this.currentIndex;
    }
    /** @inheritdoc */
    getDataLength() {
        return this.buffer.capacity;
    }
}

/**
 * Source map.
 *
 * @note Since serialized rule nodes are not store original rule text, we need this source map between the
 * serialized filter list and the raw filter list.
 */
zod__WEBPACK_IMPORTED_MODULE_6__/* .record */ .g1(
/**
 * Rule start index in the converted list's byte buffer.
 */
zod__WEBPACK_IMPORTED_MODULE_6__/* .string */ .Yj(), 
/**
 * Rule start index in the raw converted list.
 */
zod__WEBPACK_IMPORTED_MODULE_6__/* .number */ .ai());

/**
 * Helper function to get the rule source text from the source string by its line start index.
 *
 * @param lineStartIndex Rule start index.
 * @param source Raw filter list source.
 *
 * @returns Rule string or null if the rule couldn't be found.
 */
const getRuleSourceText = (lineStartIndex, source) => {
    // note: checking for LF is enough, because we transform source before storing it, and it's always LF
    let [lineEndIndex] = findNextLineBreakIndex(source, lineStartIndex);
    // If the line end index is not found, we assume that the rule is the last line in the source.
    if (lineEndIndex === -1) {
        lineEndIndex = source.length;
    }
    // If the rule start index is equal to or greater than the rule end index, we return null,
    // and the rule is considered not found.
    if (lineStartIndex >= lineEndIndex) {
        return null;
    }
    const ruleSourceText = source.slice(lineStartIndex, lineEndIndex);
    // WARNING!
    // Potential memory leak mitigation for substring operation due to V8 optimizations:
    // When extracting a substring with rule.slice(), there's a concern in some JS environments
    // that the resulting substring might retain a hidden reference to the entire original 'rule' string.
    // This could prevent the garbage collector (GC) from freeing the memory allocated for filter rules.
    // This hidden reference occurs because the substring might not create a new string but rather
    // a view into the original, keeping it in memory longer than necessary.
    // And we receive a memory leak here because we store parsed tags from first N lines of the filter rules
    // which have references to the original large string with filter rules.
    // To ensure that the original large string can be garbage collected, and only the necessary
    // substring is retained, we explicitly force a copy of the substring via split and join,
    // thereby breaking the direct reference to the original string and allowing the GC to free the memory
    // for filter rules when they are no longer in use.
    return ruleSourceText.split('').join('');
};
/**
 * Helper function to get the rule source index (line start index in the source) from the source map by the rule index.
 *
 * @param ruleIdx Rule index.
 * @param sourceMap Source map.
 *
 * @returns Rule source index or RULE_INDEX_NONE (-1).
 *
 * @note Similar to `Array.prototype.indexOf`, we return -1 if the rule index is not found.
 */
const getRuleSourceIndex = (ruleIdx, sourceMap) => {
    return sourceMap[ruleIdx] ?? RULE_INDEX_NONE;
};

/**
 * FilterScanner returns indexed, only network rules from IFilter's content.
 */
class FilterScanner {
    filter;
    filterId;
    /**
     * Constructor of FilterScanner.
     *
     * @param filter From which filter the rules should be scanned.
     * @param filterId Id of filter.
     */
    constructor(filter, filterId) {
        this.filter = filter;
        this.filterId = filterId;
    }
    /**
     * Creates new filter scanner.
     *
     * @param filter From which filter the rules should be scanned.
     *
     * @returns New FilterScanner.
     */
    static async createNew(filter) {
        const content = await filter.getContent();
        return new FilterScanner(content, filter.getId());
    }
    /**
     * Gets the entire contents of the filter, extracts only the network rules
     * (ignore cosmetic and host rules) and tries to convert each line into an
     * indexed rule with hash.
     *
     * @param filterFn If this function is specified, it will be applied to each
     * rule after it has been parsed and transformed. This function is needed
     * for example to apply $badfilter: to exclude negated rules from the array
     * of rules that will be returned.
     * @param maxNumberOfScannedNetworkRules Maximum number of network rules to
     * scan, all other rules will be ignored and an error {@link MaxScannedRulesError}
     * will be added to the list of result errors.
     *
     * @returns List of indexed rules with hash. If filterFn was specified then
     * out values will be filtered with this function.
     */
    getIndexedRules(filterFn, maxNumberOfScannedNetworkRules) {
        const { filterList } = this.filter;
        const result = {
            errors: [],
            rules: [],
        };
        const buffer = new InputByteBuffer(filterList);
        const reader = new BufferReader(buffer);
        let ruleBufferIndex = reader.getCurrentPos();
        let ruleNode = reader.readNext();
        let curNumberOfScannedNetworkRules = 0;
        while (ruleNode) {
            let indexedNetworkRulesWithHash = [];
            try {
                indexedNetworkRulesWithHash = IndexedNetworkRuleWithHash.createFromNode(this.filterId, ruleBufferIndex, ruleNode);
            }
            catch (e) {
                if (e instanceof Error) {
                    result.errors.push(e);
                }
                else {
                    const lineIndex = getRuleSourceIndex(ruleBufferIndex, this.filter.sourceMap);
                    const rawRule = getRuleSourceText(lineIndex, this.filter.rawFilterList);
                    const originalRawRule = this.filter.conversionMap[lineIndex];
                    // eslint-disable-next-line max-len
                    let errorMessage = `Unknown error during creating indexed rule with hash from raw string: filter id - ${this.filterId}, line index - ${lineIndex}, line - ${rawRule}`;
                    if (originalRawRule) {
                        errorMessage += `, original line - ${originalRawRule}`;
                    }
                    const err = new Error(errorMessage);
                    result.errors.push(err);
                }
                continue;
            }
            finally {
                ruleBufferIndex = reader.getCurrentPos();
                ruleNode = reader.readNext();
            }
            const filteredRules = filterFn
                ? indexedNetworkRulesWithHash.filter(filterFn)
                : indexedNetworkRulesWithHash;
            result.rules.push(...filteredRules);
            curNumberOfScannedNetworkRules += filteredRules.length;
            if (maxNumberOfScannedNetworkRules !== undefined
                && curNumberOfScannedNetworkRules >= maxNumberOfScannedNetworkRules) {
                const lastScannedRule = indexedNetworkRulesWithHash[indexedNetworkRulesWithHash.length - 1];
                const lineIndex = getRuleSourceIndex(lastScannedRule.index, this.filter.sourceMap);
                // This error needed for future improvements, for example
                // to show in the UI which rules were skipped.
                const err = new MaxScannedRulesError(`Maximum number of scanned network rules reached at line index ${lineIndex}.`, lineIndex);
                result.errors.push(err);
                break;
            }
        }
        return result;
    }
}

/**
 * Scanner for network rules from list of filters.
 */
class NetworkRulesScanner {
    /**
     * Asynchronous scans the list of filters for network rules.
     *
     * @param filterList List of {@link IFilter}.
     * @param filterFn If this function is specified, it will be applied to each
     * rule after it has been parsed and transformed. This function is needed
     * for example to apply $badfilter: to exclude negated rules from the array
     * of rules that will be returned.
     * @param maxNumberOfScannedNetworkRules Maximum number of network rules to
     * scan, all other rules will be ignored. It will be applied to each filter
     * separately, not for cumulative scope of rules from all filters, because
     * it looks simpler and more predictable solution to prevent too long scan.
     *
     * @returns List of filters includes the scanned filters and any errors that
     * may occur during the scan.
     */
    static async scanRules(filterList, filterFn, maxNumberOfScannedNetworkRules) {
        const res = {
            errors: [],
            filters: [],
        };
        const promises = filterList.map(async (filter) => {
            const scanner = await FilterScanner.createNew(filter);
            const { errors, rules } = scanner.getIndexedRules(filterFn, maxNumberOfScannedNetworkRules);
            res.errors = res.errors.concat(errors);
            const badFilterRules = rules.filter(({ rule }) => {
                return rule.rule.isOptionEnabled(NetworkRuleOption.Badfilter);
            });
            return {
                id: filter.getId(),
                rules,
                badFilterRules,
            };
        });
        const tasks = await Promise.allSettled(promises);
        tasks.forEach((task, index) => {
            if (task.status === 'rejected') {
                const filterId = filterList[index].getId();
                res.errors.push(new Error(`Cannot scan rules from filter ${filterId}: ${task.reason}`));
                return;
            }
            res.filters.push(task.value);
        });
        return res;
    }
}

/**
 * @typedef {import('./errors/unavailable-sources-errors').UnavailableFilterSourceError} UnavailableFilterSourceError
 */
/**
 * @typedef {import('./declarative-rule').DeclarativeRule} DeclarativeRule
 */
/* eslint-disable jsdoc/require-description-complete-sentence  */
/**
 * @file Describes the conversion from a filter list {@link IFilter}
 * to rule sets {@link IRuleSet} with declarative rules {@link DeclarativeRule}.
 *
 *                                                                           Conversion
 *
 *
 *
 *
 *       Two entry points        │                FilterConverter             │             RulesConverter
 *                               │                                            │
 *                               │       Perform the conversion at the        │      Perform the conversion at the
 *                               │       filter level.                        │      rules level.
 *                               │                                            │
 *  Converting static rules      │       Validate passed number of rules      │
 *  during extension assembly.   │       and path to web accessible resources.│
 * ┌─────────────────────────┐   │      ┌────────────────────────────────┐    │
 * │                         ├─┬─┼─────►│                                │    │
 * │  convertStaticRuleSet() │ │ │      │      checkConverterOptions()   │    │
 * │                         │ │ │  ┌───┤                                │    │
 * └─────────────────────────┘ │ │  │   └────────────────────────────────┘    │
 *                             │ │  │                                         │
 *  On-the-fly conversion      │ │  │    Filter only network rules and create │
 *  for dynamic rules.         │ │  │    indexed rule with hash.              │
 * ┌─────────────────────────┐ │ │  │    In this method, when converting      │
 * │                         │ │ │  │    dynamic rules, the rules canceled by │
 * │ convertDynamicRuleSets()├─┘ │  │    $badfilter rules from static filters │
 * │                         │   │  │    are filtered out - such rules are    │
 * └─────────────────────────┘   │  │    discarded during filter scanning.    │
 *                               │  │   ┌────────────────────────────────┐    │
 *                               │  └──►│                                │    │
 *                               │      │ NetworkRulesScanner.scanRules()│    │
 *                               │  ┌───┤                                │    │
 *                               │  │   └────────────────────────────────┘    │  Filter rules affected by $badfilter
 *                               │  │                                         │  within one filter, then group the rules
 *                               │  │                                         │  based on modifiers, requiring specific
 *                               │  │    Convert our network rule to DNR.     │  conversion processes such as
 *                               │  │   ┌────────────────────────────────┐    │  post-processing for similar rules.
 *                               │  └──►│                                │    │   ┌────────────────────────────────┐
 *                               │      │           convert()            ├────┼───┤                                │
 *                               │      │                                │    │   │        applyBadFilter()        │
 *                               │      └────────────────────────────────┘    │ ┌─┤                                │
 *                               │                                            │ │ └────────────────────────────────┘
 *                               │                                            │ │
 *                               │                                            │ │ Each group of rules within a single
 *                               │                                            │ │ filter has its converter that performs
 *                               │                                            │ │ the conversion, then combines the
 *                               │                                            │ │ results and returns them.
 *                               │                                            │ │
 *                               │                                            │ │ For details, please go to the
 *                               │                                            │ │ abstract-rule-converter.ts schema.
 *                               │                                            │ │ ┌────────────────────────────────┐
 *                               │                                            │ └►│                                │
 *                               │                                            │   │          convertRules()        │
 *                               │                                            │ ┌─┤                                │
 *                               │                                            │ │ └────────────────────────────────┘
 *                               │                                            │ │
 *                               │                                            │ │ The declarative rules are checked to
 *                               │                                            │ │ ensure they meet the specified
 *                               │                                            │ │ constraints, and if necessary,
 *                               │                                            │ │ some rules are removed.
 *                               │                                            │ │ ┌────────────────────────────────┐
 *                               │                                            │ └►│                                │
 *                               │                                            │   │         checkLimitations()     │
 *                               │   ┌────────────────────────────────────────┼───┤                                │
 *                               │   │                                        │   └────────────────────────────────┘
 *                               │   │   Wrap conversion result into RuleSet. │
 *                               │   │  ┌────────────────────────────────┐    │
 *                               │   └─►│                                │    │
 *                               │      │    collectConvertedResult()    │    │
 *                               │  ┌───┤                                │    │
 *                               │  │   └────────────────────────────────┘    │
 *                               │  │                                         │
 *                               │  │    This method is only called during the│
 *                               │  │    conversion of dynamic rules.         │
 *                               │  │    Applies rules with $badfilter        │
 *                               │  │    modifier from dynamic rulesets to    │
 *                               │  │    all rules from static rulesets and   │
 *                               │  │    returns list of ids of declarative   │
 *                               │  │    rules to disable them.               │
 *                               │  │   ┌──────────────────────────────────┐  │
 *                               │  └──►│                                  │  │
 *                               │      │ collectDeclarativeRulesToCancel()│  │
 *                               │      │                                  │  │
 *                               │      └──────────────────────────────────┘  │
 *                               │                                            │
 */
/* eslint-enable jsdoc/require-description-complete-sentence */
/**
 * Converts a list of IFilters to a single rule set or to a list of rule sets.
 */
class DeclarativeFilterConverter {
    /**
     * Same as chrome.declarativeNetRequest.DYNAMIC_RULESET_ID.
     */
    static COMBINED_RULESET_ID = (/* unused pure expression or super */ null && ('_dynamic'));
    /**
     * Number of scanned rules can be limited via converter options. In this
     * case we increase the limit by 10% to scan more rules in case of some
     * network rules will be combined into one declarative rule. It is safe,
     * because we have double check for maxNumberOfRules on the converted DNR
     * rules.
     */
    static SCANNED_NETWORK_RULES_MULTIPLICATOR = (/* unused pure expression or super */ null && (1.1));
    /**
     * Checks that provided converter options are correct.
     *
     * @param options Contains path to web accessible resources,
     * maximum number of converter rules and regexp rules. @see
     * {@link DeclarativeConverterOptions} for details.
     *
     * @throws An {@link ResourcesPathError} if the resources path does not
     * start with a slash or it ends with a slash
     * OR an {@link EmptyOrNegativeNumberOfRulesError} if maximum number of
     * rules is equal or less than 0.
     * OR an {@link NegativeNumberOfRulesError} if maximum number of
     * regexp rules is less than 0.
     */
    static checkConverterOptions(options) {
        const { resourcesPath, maxNumberOfRules, maxNumberOfUnsafeRules, maxNumberOfRegexpRules, } = options;
        if (resourcesPath !== undefined) {
            const firstChar = 0;
            const lastChar = resourcesPath.length > 0
                ? resourcesPath.length - 1
                : 0;
            if (resourcesPath[firstChar] !== '/') {
                const msg = 'Path to web accessible resources should '
                    + `be started with leading slash: ${resourcesPath}`;
                throw new ResourcesPathError(msg);
            }
            if (resourcesPath[lastChar] === '/') {
                const msg = 'Path to web accessible resources should '
                    + `not be ended with slash: ${resourcesPath}`;
                throw new ResourcesPathError(msg);
            }
        }
        if (maxNumberOfRules !== undefined && maxNumberOfRules <= 0) {
            const msg = 'Maximum number of rules cannot be equal or less than 0';
            throw new EmptyOrNegativeNumberOfRulesError(msg);
        }
        if (maxNumberOfUnsafeRules && maxNumberOfUnsafeRules < 0) {
            const msg = 'Maximum number of unsafe rules cannot be less than 0';
            throw new NegativeNumberOfRulesError(msg);
        }
        if (maxNumberOfRegexpRules && maxNumberOfRegexpRules < 0) {
            const msg = 'Maximum number of regexp rules cannot be less than 0';
            throw new NegativeNumberOfRulesError(msg);
        }
    }
    /** @inheritdoc */
    // eslint-disable-next-line class-methods-use-this
    async convertStaticRuleSet(filter, options) {
        if (options) {
            DeclarativeFilterConverter.checkConverterOptions(options);
        }
        if (options?.maxNumberOfUnsafeRules !== undefined) {
            throw new Error('Static rulesets do not require the maximum number of unsafe rules');
        }
        const { errors, filters } = await NetworkRulesScanner.scanRules([filter]);
        const [scannedStaticFilter] = filters;
        const { id, badFilterRules } = scannedStaticFilter;
        const convertedRules = await DeclarativeRulesConverter.convert(filters, options);
        const conversionResult = DeclarativeFilterConverter.collectConvertedResult(`ruleset_${id}`, [filter], filters, convertedRules, badFilterRules);
        return {
            ruleSet: conversionResult.ruleSet,
            errors: errors.concat(conversionResult.errors),
            limitations: conversionResult.limitations,
        };
    }
    /** @inheritdoc */
    // eslint-disable-next-line class-methods-use-this
    async convertDynamicRuleSets(filterList, staticRuleSets, options) {
        if (options) {
            DeclarativeFilterConverter.checkConverterOptions(options);
        }
        const allStaticBadFilterRules = DeclarativeFilterConverter.createBadFilterRulesHashMap(staticRuleSets);
        const skipNegatedRulesFn = (r) => {
            const fastMatchedBadFilterRules = allStaticBadFilterRules.get(r.hash);
            if (!fastMatchedBadFilterRules) {
                return true;
            }
            for (let i = 0; i < fastMatchedBadFilterRules.length; i += 1) {
                const rule = fastMatchedBadFilterRules[i];
                const badFilterRule = rule.rule;
                const ruleToCheck = r.rule;
                if (badFilterRule.rule.negatesBadfilter(ruleToCheck.rule)) {
                    return false;
                }
            }
            return true;
        };
        // Note: if we drop some rules because of applying $badfilter - we
        // cannot show info about it to user.
        const scanned = await NetworkRulesScanner.scanRules(filterList, skipNegatedRulesFn, 
        // We increase the limit by 10% to scan more rules in case of some
        // network rules will be combined into one declarative rule. It is
        // safe, because we have double check for maxNumberOfRules on the
        // converted DNR rules.
        options?.maxNumberOfRules
            ? Math.ceil(options.maxNumberOfRules * DeclarativeFilterConverter.SCANNED_NETWORK_RULES_MULTIPLICATOR)
            : undefined);
        const convertedRules = await DeclarativeRulesConverter.convert(scanned.filters, options);
        const dynamicBadFilterRules = scanned.filters
            .map(({ badFilterRules }) => badFilterRules)
            .flat();
        const conversionResult = DeclarativeFilterConverter.collectConvertedResult(DeclarativeFilterConverter.COMBINED_RULESET_ID, filterList, scanned.filters, convertedRules, dynamicBadFilterRules);
        const { declarativeRulesToCancel, errors } = await DeclarativeFilterConverter.collectDeclarativeRulesToCancel(staticRuleSets, dynamicBadFilterRules);
        conversionResult.errors = conversionResult.errors
            .concat(scanned.errors)
            .concat(errors);
        conversionResult.declarativeRulesToCancel = declarativeRulesToCancel;
        return conversionResult;
    }
    /**
     * Collects {@link ConversionResult} from provided list of raw filters,
     * scanned filters, converted rules and bad filter rules.
     * Creates new {@link RuleSet} and wrap all data for {@link RuleSetContentProvider}.
     *
     * @param ruleSetId Rule set id.
     * @param filterList List of raw filters.
     * @param scannedFilters Already scanned filters.
     * @param convertedRules Converted rules.
     * @param badFilterRules List of rules with $badfilter modifier.
     *
     * @returns Item of {@link ConversionResult}.
     */
    static collectConvertedResult(ruleSetId, filterList, scannedFilters, convertedRules, badFilterRules) {
        const { sourceMapValues, declarativeRules, errors, limitations = [], } = convertedRules;
        const ruleSetContent = {
            loadSourceMap: async () => new SourceMap(sourceMapValues),
            loadFilterList: async () => filterList,
            loadDeclarativeRules: async () => declarativeRules,
        };
        const listOfRulesWithHash = scannedFilters
            .map(({ id, rules }) => {
            return rules.map((r) => ({
                hash: r.hash,
                source: {
                    sourceRuleIndex: r.index,
                    filterId: id,
                },
            }));
        })
            .flat();
        const rulesHashMap = new RulesHashMap(listOfRulesWithHash);
        const unsafeRulesCount = declarativeRules.filter((r) => !isSafeRule(r)).length;
        const regexRulesCount = declarativeRules.filter((r) => DeclarativeRulesConverter.isRegexRule(r)).length;
        const ruleSet = new RuleSet(ruleSetId, declarativeRules.length, unsafeRulesCount, regexRulesCount, ruleSetContent, badFilterRules, rulesHashMap);
        return {
            ruleSet,
            errors,
            limitations,
        };
    }
    /**
     * Creates dictionary where key is hash of indexed rule and value is array
     * of rules with this hash.
     *
     * @param ruleSets A list of IRuleSets for each of which a list of
     * $badfilter rules.
     *
     * @returns Dictionary with all $badfilter rules which are extracted from
     * rulesets.
     */
    static createBadFilterRulesHashMap(ruleSets) {
        const allStaticBadFilterRules = new Map();
        ruleSets.forEach((ruleSet) => {
            ruleSet.getBadFilterRules().forEach((r) => {
                const existingValue = allStaticBadFilterRules.get(r.hash);
                if (existingValue) {
                    existingValue.push(r);
                }
                else {
                    allStaticBadFilterRules.set(r.hash, [r]);
                }
            });
        });
        return allStaticBadFilterRules;
    }
    /**
     * Checks if some rules (fastMatchedRulesByHash) from the staticRuleSet,
     * which have been fast matched by hash, can be negated with the provided
     * badFilterRule via the `$badfilter` option.
     *
     * @param badFilterRule Network rule with hash {@link IndexedNetworkRuleWithHash}
     * and `$badfilter` option.
     * @param staticRuleSet Static rule set which contains fast matched rules.
     * @param fastMatchedRulesByHash Rules that have been fast matched by hash
     * for potential negation.
     *
     * @returns List of declarative rule IDs that have been canceled by
     * the provided badFilterRule.
     */
    static async checkFastMatchedRulesCanBeCancelled(badFilterRule, staticRuleSet, fastMatchedRulesByHash) {
        const fastMatchedDeclarativeRulesIds = [];
        try {
            const promises = fastMatchedRulesByHash.map(async (source) => {
                return staticRuleSet.getDeclarativeRulesIdsBySourceRuleIndex(source);
            });
            const ids = await Promise.all(promises);
            fastMatchedDeclarativeRulesIds.push(...ids.flat());
        }
        catch (e) {
            // eslint-disable-next-line max-len
            throw new Error(`Not found declarative rule id for some source from list: ${JSON.stringify(fastMatchedDeclarativeRulesIds)}: ${getErrorMessage(e)}`);
        }
        const disableRuleIds = [];
        for (let k = 0; k < fastMatchedDeclarativeRulesIds.length; k += 1) {
            const id = fastMatchedDeclarativeRulesIds[k];
            let matchedSourceRules = [];
            try {
                // eslint-disable-next-line no-await-in-loop
                matchedSourceRules = await staticRuleSet.getRulesById(id);
            }
            catch (e) {
                throw new Error(`Not found sources for declarative rule with id "${id}": ${getErrorMessage(e)}`);
            }
            let indexedNetworkRulesWithHash = [];
            try {
                // eslint-disable-next-line no-await-in-loop
                const arrayWithRules = await Promise.all(matchedSourceRules.map((source) => {
                    return RuleSet.getNetworkRuleBySourceRule(source);
                }));
                indexedNetworkRulesWithHash = arrayWithRules.flat();
            }
            catch (e) {
                // eslint-disable-next-line max-len
                throw new Error(`Not found network rules from matched sources "${JSON.stringify(matchedSourceRules)}": ${getErrorMessage(e)}`);
            }
            // NOTE: Here we use .some but not .every to simplify first
            // version of applying $badfilter rules.
            const someRulesMatched = indexedNetworkRulesWithHash
                .flat()
                .some((rule) => badFilterRule.rule.rule.negatesBadfilter(rule));
            if (someRulesMatched) {
                disableRuleIds.push(id);
            }
        }
        return disableRuleIds;
    }
    /**
     * Applies rules with $badfilter modifier from dynamic rulesets to all rules
     * from static rulesets and returns list of ids of declarative rules to
     * disable them.
     *
     * @param staticRuleSets List of converted static rulesets.
     * @param dynamicBadFilterRules List of rules with $badfilter.
     *
     * @returns List of ids of declarative rules to disable them.
     */
    static async collectDeclarativeRulesToCancel(staticRuleSets, dynamicBadFilterRules) {
        const declarativeRulesToCancel = [];
        const errors = [];
        // Check every static ruleset.
        for (let i = 0; i < staticRuleSets.length; i += 1) {
            const staticRuleSet = staticRuleSets[i];
            const disableRuleIds = [];
            // Check every rule with $badfilter from dynamic filters
            // (custom filter and user rules).
            for (let j = 0; j < dynamicBadFilterRules.length; j += 1) {
                const badFilterRule = dynamicBadFilterRules[j];
                const hashMap = staticRuleSet.getRulesHashMap();
                const fastMatchedRulesByHash = hashMap.findRules(badFilterRule.hash);
                if (fastMatchedRulesByHash.length === 0) {
                    continue;
                }
                try {
                    // eslint-disable-next-line no-await-in-loop
                    const ids = await DeclarativeFilterConverter.checkFastMatchedRulesCanBeCancelled(badFilterRule, staticRuleSet, fastMatchedRulesByHash);
                    disableRuleIds.push(...ids);
                }
                catch (e) {
                    errors.push(new Error(`Cannot apply badfilter: ${getErrorMessage(e)}`));
                }
            }
            if (disableRuleIds.length > 0) {
                declarativeRulesToCancel.push({
                    rulesetId: staticRuleSet.getId(),
                    disableRuleIds,
                });
            }
        }
        return {
            errors,
            declarativeRulesToCancel,
        };
    }
}

/**
 * Describes an error when filter source is not available.
 */
class UnavailableFilterSourceError extends Error {
    filterId;
    /**
     * Describes an error when filter source is not available.
     *
     * @param message Message of error.
     * @param filterId Filter id, the source of which is not available.
     * @param cause Basic error, describes why the source is unavailable.
     */
    constructor(message, filterId, cause) {
        super(message, { cause });
        this.name = this.constructor.name;
        this.filterId = filterId;
        // For proper work of the "instanceof" operator
        Object.setPrototypeOf(this, UnavailableFilterSourceError.prototype);
    }
}

/**
 * Saves the original rules and can return all original rules or just one,
 * with lazy content loading.
 */
class Filter {
    /**
     * ID of filter.
     */
    id;
    /**
     * Content of filter (lazy loading).
     */
    content = null;
    /**
     * Promise for content loading.
     */
    contentLoadingPromise = null;
    /**
     * Provider of filter content.
     */
    source;
    /**
     * Filter trusted flag.
     */
    trusted;
    /**
     * Creates new FilterList.
     *
     * @param id Number id of filter.
     * @param source Provider of filter content.
     * @param trusted Filter trusted flag.
     */
    constructor(id, source, trusted) {
        this.id = id;
        this.source = source;
        this.trusted = trusted;
    }
    /** @inheritdoc */
    getId() {
        return this.id;
    }
    /** @inheritdoc */
    async getContent() {
        // If content is already loaded, return it
        if (this.content) {
            return this.content;
        }
        // If content is currently loading, return the existing promise
        if (this.contentLoadingPromise) {
            return this.contentLoadingPromise;
        }
        // Assign the promise immediately to avoid race conditions
        this.contentLoadingPromise = (async () => {
            try {
                const content = await this.source.getContent();
                if (!content || content.rawFilterList.length === 0 || content.filterList.length === 0) {
                    throw new Error('Loaded empty content');
                }
                // Assign content and clear the loading promise
                this.content = content;
                this.contentLoadingPromise = null;
                return content;
            }
            catch (e) {
                // Reset the loading promise so future calls can retry
                this.contentLoadingPromise = null;
                throw new UnavailableFilterSourceError('Filter content is unavailable', this.id, e);
            }
        })();
        return this.contentLoadingPromise;
    }
    /** @inheritdoc */
    async getRuleByIndex(index) {
        const content = await this.getContent();
        const lineIndex = getRuleSourceIndex(index, content.sourceMap);
        const sourceRule = getRuleSourceText(lineIndex, content.rawFilterList) ?? EMPTY_STRING;
        return sourceRule;
    }
    /** @inheritdoc */
    isTrusted() {
        return this.trusted;
    }
    /** @inheritdoc */
    unloadContent() {
        // If content is not loaded and not loading, there is nothing to unload
        if (!this.content && !this.contentLoadingPromise) {
            return;
        }
        // If loading is in progress
        if (this.contentLoadingPromise) {
            this.contentLoadingPromise.finally(() => {
                this.unloadContent();
            });
            return;
        }
        // Unload content
        this.content = null;
        this.contentLoadingPromise = null;
    }
}

/**
 * @file Various type guards.
 */
/**
 * Checks whether the given value is undefined.
 *
 * @param value Value to check.
 *
 * @returns `true` if the value is 'undefined', `false` otherwise.
 */
/**
 * Checks whether the given value is an array.
 *
 * @param value Value to check.
 *
 * @returns `true` if the value is an array, `false` otherwise.
 */
const isArray = (value) => {
    return Array.isArray(value);
};
/**
 * Checks whether the given value is a non-empty array.
 *
 * @param value Value to check.
 *
 * @returns `true` if the value is a non-empty array, `false` otherwise.
 */
const isNonEmptyArray = (value) => {
    return isArray(value) && value.length > 0;
};

/**
 * Helper method to get the rule set ID with the {@link RULESET_NAME_PREFIX} prefix.
 *
 * @param ruleSetId Rule set id. Can be a number or a string.
 *
 * @returns Rule set ID with the {@link RULESET_NAME_PREFIX} prefix.
 */
function getRuleSetId(ruleSetId) {
    let ruleSetIdStr = String(ruleSetId);
    if (!ruleSetIdStr.startsWith(RULESET_NAME_PREFIX)) {
        ruleSetIdStr = `${RULESET_NAME_PREFIX}${ruleSetIdStr}`;
    }
    return ruleSetIdStr;
}

/**
 * Metadata ruleset ID.
 */
const METADATA_RULESET_ID = 0;
/**
 * Checksum map validator.
 */
const checksumMapValidator = zod__WEBPACK_IMPORTED_MODULE_6__/* .record */ .g1(zod__WEBPACK_IMPORTED_MODULE_6__/* .string */ .Yj());
/**
 * Metadata validator.
 */
const metadataValidator = zod__WEBPACK_IMPORTED_MODULE_6__/* .object */ .Ik({
    /**
     * Checksums for all rulesets.
     */
    checksums: checksumMapValidator,
    /**
     * Additional properties.
     * This field stores any extra information not covered by the other fields.
     * The content of this field is not validated, but it must be JSON serializable.
     * Validation should be performed by users.
     */
    additionalProperties: zod__WEBPACK_IMPORTED_MODULE_6__/* .record */ .g1(zod__WEBPACK_IMPORTED_MODULE_6__/* .unknown */ .L5()),
});
/**
 * Metadata rule validator.
 *
 * @note We use `passthrough` method to allow additional fields in the object.
 */
const metadataRuleValidator = zod__WEBPACK_IMPORTED_MODULE_6__/* .object */ .Ik({
    metadata: metadataValidator,
}).passthrough();
/**
 * Represents a specialized metadata ruleset for managing and validating metadata associated
 * with various rulesets.
 *
 * This class handles byte range maps, checksums, and additional properties,
 * providing methods to manipulate and query this metadata.
 */
class MetadataRuleSet {
    metadataRule;
    /**
     * Creates an instance of the MetadataRuleSet class.
     *
     * @param checksums A map of checksums, where each key corresponds to a rule set ID and each value is the checksum
     * for that ruleset. Defaults to an empty object.
     * @param additionalProperties A collection of additional properties, where keys are property names and values are
     * their associated data. These properties are JSON serializable but not validated by the class.
     * Defaults to an empty object.
     *
     * @note
     * This constructor uses references for the provided arguments. If immutability is required, ensure to clone the
     * inputs before passing them.
     *
     * @todo TODO: Consider mark `checksums` and `additionalProperties` as required parameters.
     * For deserialization - add static method which will create an instance
     * with deserialized checksums and additional properties via constructor,
     * and get them stronger types.
     */
    constructor(checksums = {}, additionalProperties = {}) {
        this.metadataRule = createMetadataRule({
            byteRangeMapsCollection: {},
            checksums,
            additionalProperties: additionalProperties ?? {},
        });
    }
    /**
     * Returns rule set id.
     *
     * @returns Rule set id.
     */
    // Note: we prefer `instance.getId()` over `MetadataRuleSet.getId(instance)` for consistency.
    // eslint-disable-next-line class-methods-use-this
    getId() {
        return getRuleSetId(METADATA_RULESET_ID);
    }
    /**
     * Sets checksum for the specified rule set.
     *
     * @param ruleSetId Rule set id.
     * @param checksum Checksum.
     */
    setChecksum(ruleSetId, checksum) {
        this.metadataRule.metadata.checksums[ruleSetId] = checksum;
    }
    /**
     * Returns checksum for the specified rule set.
     *
     * @param ruleSetId Rule set id.
     *
     * @returns Checksum or undefined if not found.
     */
    getChecksum(ruleSetId) {
        return this.metadataRule.metadata.checksums[ruleSetId];
    }
    /**
     * Returns all rule set ids in the metadata.
     *
     * @returns Rule set ids.
     */
    getRuleSetIds() {
        return Object.keys(this.metadataRule.metadata.checksums);
    }
    /**
     * Gets additional property.
     *
     * @param key Property key.
     *
     * @returns Property value or undefined if not found.
     */
    getAdditionalProperty(key) {
        return this.metadataRule.metadata.additionalProperties[key];
    }
    /**
     * Sets additional property.
     *
     * @param key Property key.
     * @param value Property value. Should be JSON serializable.
     */
    setAdditionalProperty(key, value) {
        this.metadataRule.metadata.additionalProperties[key] = value;
    }
    /**
     * Checks whether additional property exists.
     *
     * @param key Property key.
     *
     * @returns Whether the property exists.
     */
    hasAdditionalProperty(key) {
        return key in this.metadataRule.metadata.additionalProperties;
    }
    /**
     * Removes additional property.
     *
     * @param key Property key.
     */
    removeAdditionalProperty(key) {
        delete this.metadataRule.metadata.additionalProperties[key];
    }
    /**
     * Serializes the ruleset to a string.
     *
     * @param pretty Whether to prettify the output.
     *
     * @returns Serialized ruleset.
     */
    serialize(pretty = false) {
        return serializeJson([this.metadataRule], pretty);
    }
    /**
     * Deserializes the ruleset from a string.
     *
     * @param rawJson Serialized ruleset.
     *
     * @returns Deserialized ruleset.
     *
     * @throws Error if the input is invalid.
     */
    static deserialize(rawJson) {
        const parsed = JSON.parse(rawJson);
        if (!isNonEmptyArray(parsed)) {
            throw new Error('Invalid input: expected a non-empty array.');
        }
        const { metadata: { checksums, additionalProperties, }, } = metadataRuleValidator.parse(parsed[0]);
        const ruleSet = new MetadataRuleSet(checksums, additionalProperties);
        return ruleSet;
    }
}




/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [737,859,940,728], () => (__webpack_exec__(68674)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);