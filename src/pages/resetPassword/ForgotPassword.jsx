import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Title48 from "@/components/common/Title48";
import toast from "react-hot-toast";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useEmail } from "@/hooks/useEmail";

const ForgotPassword = () => {
    const {email,setEmail} = useEmail();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const ForgotMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosPublic.post("/forgot-password", data);
      return response?.data;
    },
    onSuccess: (response) => {
      toast.success(
        response?.message || " You will receive a OTP to reset your password."
      );
      navigate("/VerifyOtp");
    },
    onError: (error) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong, try again later!!";
      toast.error(errorMessage);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });
  const onSubmit = (data) => {
    setEmail(data?.email)
    setIsSubmitting(true); // Set loading to true
    ForgotMutation.mutate(data);
  };

  return (
    <div className="  flex flex-col items-center h-screen justify-center section-padding-x px-4">
      {/* Title */}
      <Title48 title2="¿Olvidó su contraseña?" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[585px] mt-12 "
        noValidate
      >
        {/* Email input */}
        <input
          type="email"
          placeholder="Correo Electrónico"
          {...register("email", {
            required: "Correo electrónico es Obligatorio",
          })}
          className="w-full border-[2px] border-[#000] p-4 lg:p-6 rounded-sm outline-none placeholder:text-gray-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Submit button */}
        <div className="flex flex-col items-center justify-center mt-10">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-[#11D619] hover:bg-green-600 text-white font-semibold py-3 px-11 rounded-[20px] transition duration-300 flex items-center justify-center gap-2 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
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
                Enviar...
              </>
            ) : (
              "Enviar"
            )}
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default ForgotPassword;
