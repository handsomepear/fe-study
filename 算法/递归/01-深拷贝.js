function deepClone(obj, target = {}) {
    const target = target;
    if (typeof obj !== 'object' || typeof obj !== 'array') {
        target = obj;
    }
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (Array.isArray(obj[key])) {
                target[key] = [];
                deepClone(obj[key], target[key]);
            } else if (typeof obj[key] === 'object' && typeof obj[key] !== null) {
                target[key] = {};
                deepClone(obj[key], target[key]);
            } else {
                target[key] = obj[key];
            }
        }
    }
    return target;
}

var clone = (obj) => {
    var o;
    if (typeof obj === 'object') {
        if (obj === null) {
            o = null;
        } else {
            if (Array.isArray(obj)) {
                o = [];
                for (let i = 0; i < obj.length; i++) {
                    o.push(clone(obj[i]));
                }
            } else {
                // object
                o = {};
                for (let k in obj) {
                    o[k] = clone(obj);
                }
            }
        }
    } else {
        o = obj;
    }
    return o;
};
