import React from "react";
import OTPInput from "otp-input-react";
import { useOtp } from "@/hooks/useOtp";
import { useNavigate } from "react-router-dom";
import Title48 from "@/components/common/Title48";
import toast from "react-hot-toast";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";
import { useEmail } from "@/hooks/useEmail";
import { useAuth } from "@/hooks/useAuth";

const VerifyOtp = () => {
  
  const { email, setResetToken } = useEmail();
  const { otp, setOtp } = useOtp();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosPublic.post("/verify-otp", data);
      return response?.data;
    },
    onSuccess: (response) => {
      toast.success(response?.message);
      setResetToken(response?.reset_token);
      navigate("/reset-password");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error ||
        "Something went wrong, try again later!";
      toast.error(errorMessage);
    },
  });

  const handleVerify = () => {
    if (otp.length < 6) return;
    mutate({ email, otp });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center section-padding-x px-4">
      {/* Title */}
      <Title48 title2="Ingresa tu OTP" />

      {/* OTP Input */}
      <div className="flex justify-center mt-10">
        <OTPInput
          value={otp}
          onChange={setOtp}
          autoFocus
          OTPLength={6}
          otpType="number"
          disabled={isPending}
          secure
          inputStyles={{
            width: "3rem",
            height: "3rem",
            margin: "0 0.5rem",
            fontSize: "1.5rem",
            borderRadius: "0.5rem",
            border: "2px solid #d1d5db",
            textAlign: "center",
            outline: "none",
          }}
          focusStyles={{
            border: "2px solid #3b82f6",
            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)",
          }}
          className="otp-input-container text-center"
        />
      </div>

      {/* Submit Button */}
      <div className="flex flex-col items-center justify-center mt-10">
        <button
          onClick={handleVerify}
          disabled={isPending || otp.length < 6}
          className={`bg-[#11D619] hover:bg-green-600 text-white font-semibold py-3 px-11 rounded-[20px] transition duration-300 flex items-center justify-center gap-2 ${
            isPending || otp.length < 6
              ? "opacity-70 cursor-not-allowed"
              : ""
          }`}
        >
          {isPending ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Enviando...
            </>
          ) : (
            "Enviar"
          )}
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
