const baseGetTag = require('lodash/_baseGetTag');
const isObject = require('lodash/isObject');

function isClass(value) {
  if (!isObject(value)) {
    return false;
  }
  const tag = baseGetTag(value);
  return tag
}


console.log(isClass(class Test{}));
console.log(isClass(() => {}));
console.log(isClass(async function () {}));