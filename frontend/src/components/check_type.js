const stringConstructor = "test".constructor;
const arrayConstructor = [].constructor;
const objectConstructor = ({}).constructor;

function type_is(object) {
    if (object === null) {
        return "null";
    }
    if (object === undefined) {
        return "undefined";
    }
    if (object.constructor === stringConstructor) {
        return "String";
    }
    if (object.constructor === arrayConstructor) {
        return "Array";
    }
    if (object.constructor === objectConstructor) {
        return "JSON";
    }
    {
        return "don't know";
    }
}

export default type_is;
