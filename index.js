module.exports.addition = (operand1, operand2) => {
    var strOperand1 = operand1.toString();
    var strOperand2 = operand2.toString();
    //
    console.log("operand1 length: " + strOperand1.length);
    console.log("operand1 length: " + strOperand2.length);
    //
    console.log("type of operand 1: " + typeof(strOperand1));
    console.log("type of operand 2: " + typeof(operand2));
    if (typeof operand1 === 'string') {
        console.log("type of operand 1: string");
    }
    if (isNumber(operand1) && isNumber(operand2)) {
        return +operand1 + +operand2;
    } else {
        return console.log("Error: one or more of operands has not type number!");
    }
}

module.exports.subtraction = (operand1, operand2) => {
    return +operand1 - +operand2;
}

module.exports.multiplication = (operand1, operand2) => {
    return +operand1 * +operand2;
}

function isNumber(value) {
    return typeof value === 'number' && isFinite(value);
}
