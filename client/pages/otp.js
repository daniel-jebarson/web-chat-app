import { Button, HStack, PinInput, PinInputField } from "@chakra-ui/react";
// import otpGenerator from "otp-generator";
import React, { useState } from "react";
const OTP = () => {
  const [otp, setOtp] = useState("0000");

  const generateOTP = () => {
    var digits =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * digits.length)];
    }
    return OTP;
  };

  const changeOtp = () => {
    let temp = generateOTP();
    setOtp(temp);
    console.log(temp);
  };

  return (
    <HStack>
      <Button
        onClick={() => {
          changeOtp();
        }}
      >
        Send OTP
      </Button>
      <PinInput type="alphanumeric">
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  );
};

export default OTP;
