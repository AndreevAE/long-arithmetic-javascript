/**
 * operation of addition for using
 *
 * @param {any} operand1
 * @param {any} operand2
 * @returns
 */
exports.addition = function addition(operand1, operand2) {

    var result;

    if (isNegative(operand1) && isNegative(operand2)) {
        // add two negative numbers
        result = invertSign(add(invertSign(operand1), invertSign(operand2)));
    } else if (isNegative(operand1)) {
        // sub operand2 - operand1
        result = wrapSub(operand2, operand1);
    } else if (isNegative(operand2)) {
        // sub operand1 - operand2
        result = wrapSub(operand1, operand2);
    } else {
        // add two positive numbers
        result = add(operand1, operand2);
    }

    // TODO maybe replace to trim
    return checkZero(result);

};

/**
 * operation of subtraction for using
 *
 * @param {any} operand1
 * @param {any} operand2
 * @returns
 */
exports.subtraction = function subtraction(operand1, operand2) {

    var result;

    if (isNegative(operand1) && isNegative(operand2)) {
        // sub two negative numbers === module(operand2) - operand1
        result =  wrapSub(invertSign(operand2), operand1);
    } else if (isNegative(operand1)) {
        // sub negative and positive === - (operand1 + operand2)
        result =  invertSign(add(invertSign(operand1), operand2));
    } else if (isNegative(operand2)) {
        // sub positive and negative === operand1 + operand2
        result = add(operand1, invertSign(operand2));
    } else {
        // sub two positive numbers === operand1 - operand2
        result = wrapSub(operand1, operand2);
    }

    // TODO maybe replace to trim
    return checkZero(result);

};

/**
 * operation of multiplication for using
 *
 * @param {any} operand1
 * @param {any} operand2
 * @returns
 */
exports.multiplication = function multiplication(operand1, operand2) {

    var result;

    if (isNegative(operand1) && isNegative(operand2)) {
        // negative operand1 * negative operand2 = positive result
        result = mult(invertSign(operand1), invertSign(operand2));
    } else if (isNegative(operand1)) {
        // negative operand1 * positive operand2 = negative result
        result = invertSign(mult(invertSign(operand1), operand2));
    } else if (isNegative(operand2)) {
        // positive operand1 * negative operand2 = negative result
        result = invertSign(mult(operand1, invertSign(operand2)));
    } else {
        // positive operand1 * positive operand2 = positive result
        result = mult(operand1, operand2);
    }

    // TODO maybe replace to trim
    return checkZero(result);

};

/**
 * comparing numbers return 1, 0, -1
 *
 * @param {any} operand1
 * @param {any} operand2
 * @returns
 */
function compare(operand1, operand2) {

    var len1 = operand1.length;
    var len2 = operand2.length;

    if (len1 > len2) {
        return 1;
    } else if (len2 > len1) {
        return -1;
    } else {
        for (var i = 0; i < len1; i++) {
            if (+operand1.charAt(i) > +operand2.charAt(i)) {
                return 1;
            } else if (+operand1.charAt(i) < +operand2.charAt(i)) {
                return -1;
            }
        }
        return 0;
    }

}

/**
 * isNegative
 *
 * @param {any} operand
 * @returns
 */
function isNegative(operand) {

    if (operand.charAt(0) === "-") {
        return true;
    }

    return false;

}

/**
 * + to - or - to +
 *
 * @param {any} operand
 * @returns
 */
function invertSign(operand) {

    if (isNegative(operand)) {
        // - to +
        return operand.substr(1);
    } else {
        // + to -
        return "-" + operand;
    }

}

/**
 * module of operand == |operand|
 *
 * @param {any} operand
 * @returns
 */
function moduleOf(operand) {

    if (isNegative(operand)) {
        return invertSign(operand);
    } else {
        return operand;
    }
}

/**
 * check sign of zero, return "0" if operand is "-0"
 *
 * @param {any} operand
 * @returns
 */
function checkZero(operand) {

    if (operand == "-0") {
        return "0";
    } else {
        return operand;
    }

}


/**
 * remove zeroes before number
 *
 * @param {any} operand
 * @returns
 */
function trim(operand) {
    // TODO maybe merge with checkZero
    var len = operand.length;

    for (var i = 0; i < len - 2; i++) {
        if (operand.charAt(i) !== "0") {
            break;
        }
    }

    var result = operand.slice(i);
    return result;
}

/**
 * positive operand1 + positive operand2
 *
 * @param {any} operand1
 * @param {any} operand2
 * @returns
 */
function add(operand1, operand2) {

    var len1 = operand1.length;
    var len2 = operand2.length;
    var result = "";
    var carry = 0;

    for (var i = len1 - 1, j = len2 - 1; i >= 0 || j >= 0; i-- , j--) {
        var sumOfDigits = +operand1.charAt(i) + +operand2.charAt(j) + carry;
        carry = sumOfDigits % 10;
        result = carry + result;
        carry = Math.floor(sumOfDigits / 10);
    }

    if (carry) {
        result = carry + result;
    }

    return result;
}

/**
 * positive operand1 - positive operand2
 *
 * @param {any} operand1
 * @param {any} operand2
 * @returns
 */
function sub(operand1, operand2) {

    var len1 = operand1.length;
    var len2 = operand2.length;
    var result = "";
    var digit = 0;

    for (var i = len1 - 1, j = len2 - 1; i >= 0 && j >= 0; i-- , j--) {
        var diffOfDigits = +operand1.charAt(i) - +operand2.charAt(j) + 10 + digit;
        digit = diffOfDigits % 10;
        result = digit + result;
        digit = Math.floor(diffOfDigits / 10) - 1;
    }

    for (i; i >= 0; i--) {
        result = +operand1.charAt(i) + digit + result;
        digit = 0;
    }

    return result;
}

/**
 * for subtract smallest from biggest ever
 *
 * @param {any} operand1
 * @param {any} operand2
 * @returns
 */
function wrapSub(operand1, operand2) {

    var moduleOfOperand1 = moduleOf(operand1);
    var moduleOfOperand2 = moduleOf(operand2);
    var comparingOperands = compare(moduleOfOperand1, moduleOfOperand2);
    switch (comparingOperands) {
    case -1:
        return invertSign(sub(moduleOfOperand2, moduleOfOperand1));
    case 0:
        return sub(moduleOfOperand1, moduleOfOperand2);
    case 1:
        return sub(moduleOfOperand1, moduleOfOperand2);
    default:
    }

}

/**
 * positive operand1 * positive operand2
 *
 * @param {any} operand1
 * @param {any} operand2
 */
function mult(operand1, operand2) {

    // TODO
    var result = (+operand1 * +operand2) + "";
    return result;

}

/**
 * positive operand1 * positive digit operand2
 *
 * @param {any} operand1
 * @param {any} operand2
 */
function multOneDigit(operand1, operand2) {

    // TODO
    var result;
    result = (+operand1 * +operand2) + "";
    return result;

}

/**
 * shift operand to left with adding zero
 *
 * @param {any} operand
 */
function shiftToLeft(operand) {
    // TODO
}
