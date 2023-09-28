import { isANumber } from '.';

const splitPhoneNum = (number: string) => {
    const phoneNumArr = number.split('').filter(char => isANumber.test(char));
    let areaCode = '', prefix = '', lineNumber = '';

    for(let i = 0; i < phoneNumArr.length; i++) {
        if(i < 3 && phoneNumArr[i]) 
            areaCode += phoneNumArr[i];
        else if(i < 6 && phoneNumArr[i])
            prefix += phoneNumArr[i];
        else if(phoneNumArr[i])    
            lineNumber += phoneNumArr[i];
    }

    return { areaCode, prefix, lineNumber }
}

export const formatPhoneNum = (inputVal: string, prevState: string) => {
    // Split string into area code, prefix and line number
    const { areaCode, prefix, lineNumber } = splitPhoneNum(inputVal);

    // Format parts based on current number length
    const enteredThirdNum = inputVal.length > prevState.length && areaCode.length === 3;
    if(lineNumber.length) {
        return `(${areaCode}) ${prefix}-${lineNumber}`;
    } else if(enteredThirdNum || prefix.length) {
        return `(${areaCode}) ${prefix}`;
    } else {
        return areaCode;
    }
}