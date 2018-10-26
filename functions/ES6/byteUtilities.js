

export var GetByteArrayFromValue = (value, numBytes = GetNecessaryBytes(value)) => {
  var byteArray = [];

  for (var i = 0; i < numBytes; i++){ 
    var hexVal = value % 256;
    byteArray.unshift(hexVal);
    value = value >> 8;
  }

  return byteArray
}

export var GetNecessaryBytes = (value) => {
  var numBytes = 1;
  value = value >> 8;

  while (value > 0) {
    numBytes += 1;
    value = value >> 8;
  }

  return numBytes
}

export const ByteArrayToBase64String = (arrayBuffer) => {
  let base64String = new Buffer(arrayBuffer).toString('base64');
  return base64String
}
