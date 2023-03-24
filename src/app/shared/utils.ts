export const recursiveDeepCopy: any = (o: any) => {
    let newO: any, i: any;

    if (typeof o !== 'object') {
        return o;
    }
    if (!o) {
        return o;
    }

    if ('[object Array]' === Object.prototype.toString.apply(o)) {
        newO = [];
        for (i = 0; i < o.length; i += 1) {
            newO[i] = recursiveDeepCopy(o[i]);
        }
        return newO;
    }

    newO = {};
    for (i in o) {
        if (o.hasOwnProperty(i) && !i.startsWith('__')) {
            newO[i] = recursiveDeepCopy(o[i]);
        }
    }
    return newO;
};