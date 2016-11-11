// operation of addition for using
exports.addition = function addition(operand1, operand2) {
    if (isNegative(operand1) && isNegative(operand2)) {
        // add two negative numbers
        return invertSign(add(invertSign(operand1),invertSign(operand2)));
    } else if (isNegative(operand1)) {
        // sub operand2 - operand1
        return sub(operand2, operand1);
    } else if (isNegative(operand2)) {
        // sub operand1 - operand2
        return sub(operand1, operand2);
    } else {
        // add two positive numbers
        return add(operand1, operand2);
    }
}

// operation of subtraction for using
exports.subtraction = function subtraction(operand1, operand2) {
    var resultOfComparing = compare(operand1, operand2)
    // TODO
    return sub(operand1, operand2);
}

// operation of multiplication for using
exports.multiplication = function multiplication(operand1, operand2) {
    return +operand1 * +operand2;
    // TODO
}

// comparing numbers return 1, 0, -1
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

// isNegative
function isNegative(operand) {
    if (operand.charAt(0) === '-') {
        return true;
    } 
    return false;
}

// + to - or - to +
function invertSign(operand) {
    if (isNegative(operand)) {
        // - to +
        return operand.substr(1);
    } else {
        // + to -
        return "-" + operand;
    }
}

// positive operand1 + positive operand2
function add(operand1, operand2) {
    var len1 = operand1.length;
    var len2 = operand2.length;
    var result = "";
    var digit = 0;
    for (var i = len1 - 1, j = len2 - 1; i >= 0 || j >= 0; i--, j--) {
        var sumOfDigits = +operand1.charAt(i) + +operand2.charAt(j) + digit;
        digit = sumOfDigits % 10;
        result = digit + result;
        digit = Math.floor(sumOfDigits / 10);
    }
    if (digit) {
        result = digit + result;
    }
    return result;
}

// operand1 - operand2
function sub(operand1, operand2) {
    var len1 = operand1.length;
    var len2 = operand2.length;
    var result = "";
    var digit = 10;
    // TODO
    for (var i = len1 - 1, j = len2 - 1; i >= 0 && j >= 0; i--, j--) {
        var diffOfDigits = +operand1.charAt(i) - +operand2.charAt(j) + 10 + digit;
        digit = diffOfDigits % 10;
        result = digit + result;
        digit = Math.floor(diffOfDigits / 10) - 1;
    }
    for (i; i >= 0; i--) {
        result = operand1.charAt(i) + result;
    }
    for (j; j >= 0; j--) {
        result = operand2.charAt(j) + result;
    }
    return result;
}