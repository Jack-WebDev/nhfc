"use client";
import { Button, Loader, ResponseMessage } from "@/components";
import url from "@/lib/apiUrl";
import axios from "axios";
import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { useRouter } from "next/navigation";

const Page = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const router = useRouter();


  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${url}/auth/verifyOtp`, { otp });
      setSuccessMessage(res.data.message);
      await new Promise((resolve) =>
        setTimeout(() => {
          router.push(`/resetPassword/${res.data.userId}`)
        }, 2000)
      );
      setLoading(false);
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Network error");
      }
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-2">
      <div className="flex flex-col shadow-md border border-gray-100 p-4 gap-3 items-center rounded-md">
        <h1 className="text-black font-semibold text-lg">Enter OTP</h1>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          containerStyle={"w-max p-4 flex items-center justify-center gap-1 md:gap-4 h-32 "}
          inputStyle={"border-2 rounded-md border-blue-500 text-3xl"}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
        />

        {
            loading? <Loader /> :
            <Button onClick={handleSubmit} variant={"main"}>Submit</Button>
        }

        <ResponseMessage 
          errorMessage={errorMessage} successMessage={successMessage}
        />

      </div>
    </div>
  );
};

export default Page;
