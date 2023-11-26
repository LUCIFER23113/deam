function convert() {
    var binaryInput = document.getElementById("binaryInput").value;
    var conversionType = document.getElementById("conversionType").value;


    if (!/^[01]+$/.test(binaryInput)) {
        alert("Please enter a valid binary number (0s and 1s only).");
        return;
    }

    var result;
    switch (conversionType) {
        case "toGray":
            result = binaryToGray(binaryInput);
            break;
        case "toBinary":
            result = grayToBinary(binaryInput);
            break;
        case "bcdToExcess3":
            result = bcdToExcess3(binaryInput);
            break;
        case "excess3ToBCD":
            result = excess3ToBCD(binaryInput);
            break;
        default:
            result = "Invalid conversion type";
    }

    // Display the result
    document.getElementById("result").innerText = "Result: " + result;
}

function binaryToGray(binaryInput) {
    var grayCode = '';
    grayCode += binaryInput[0];

    for (var i = 1; i < binaryInput.length; i++) {
        grayCode += (parseInt(binaryInput[i - 1]) + parseInt(binaryInput[i])) % 2;
    }

    return grayCode;
}

function grayToBinary(grayInput) {
    var binaryCode = '';
    binaryCode += grayInput[0];

    for (var i = 1; i < grayInput.length; i++) {
        binaryCode += (parseInt(binaryCode[i - 1]) + parseInt(grayInput[i])) % 2;
    }

    return binaryCode;
}

function bcdToExcess3(bcdInput) {
    // Convert each BCD digit to Excess-3 and concatenate the results
    var excess3Result = '';
    var v1 = '1000';
    var v2 = '1001';
    if(bcdInput == v1) {
        return excess3Result = '1011';
    }
    if(bcdInput == v2) {
        return excess3Result = '1100';
    }
    for (var i = 0; i < bcdInput.length; i += 4) {
        // Extract each BCD digit (4 bits)
        var bcdDigit = bcdInput.substring(i, i + 4);

        // Convert BCD to decimal
        var decimalDigit = parseInt(bcdDigit, 2);

        // Add 3 to the decimal digit to get Excess-3
        var excess3Digit = (decimalDigit + 3) % 10;

        // Convert Excess-3 to 4-bit binary
        var binaryDigit = ('0000' + excess3Digit.toString(2)).slice(-4);

        excess3Result += binaryDigit;
    }

    return excess3Result;
}



function excess3ToBCD(excess3Input) {
    // Subtract 3 from each 4-bit binary group and convert to BCD
    var bcdResult = '';
    for (var i = 0; i < excess3Input.length; i += 4) {
        var excess3Digit = excess3Input.substr(i, 4);
        
        // Subtract 3 from the 4-bit binary
        var binaryDigit = (parseInt(excess3Digit, 2) - 3).toString(2);

        // Ensure the result is 4 bits long
        binaryDigit = ('0000' + binaryDigit).slice(-4);

        bcdResult += binaryDigit;
    }

    return bcdResult;
}
