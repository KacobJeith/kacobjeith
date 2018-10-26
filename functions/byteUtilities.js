'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var GetByteArrayFromValue = exports.GetByteArrayFromValue = function GetByteArrayFromValue(value) {
  var numBytes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : GetNecessaryBytes(value);

  var byteArray = [];

  for (var i = 0; i < numBytes; i++) {
    var hexVal = value % 256;
    byteArray.unshift(hexVal);
    value = value >> 8;
  }

  return byteArray;
};

var GetNecessaryBytes = exports.GetNecessaryBytes = function GetNecessaryBytes(value) {
  var numBytes = 1;
  value = value >> 8;

  while (value > 0) {
    numBytes += 1;
    value = value >> 8;
  }

  return numBytes;
};

var ByteArrayToBase64String = exports.ByteArrayToBase64String = function ByteArrayToBase64String(arrayBuffer) {
  var base64String = new Buffer(arrayBuffer).toString('base64');
  return base64String;
};