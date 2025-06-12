import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Title48 from "@/components/common/Title48";
import toast from "react-hot-toast";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Import the Lucide icons

const ResetPassword = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const ResetPasswordMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosPublic.post("/reset-password", data);
      return response?.data;
    },
    onSuccess: (response) => {
      toast.success(response?.message);
      setUser(response);
      navigate("/log-in");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Algo salió mal. Intenta nuevamente.";
      toast.error(errorMessage);
    },
    onSettled: () => setIsSubmitting(false),
  });

  const onSubmit = (data) => {
    setIsSubmitting(true);
    ResetPasswordMutation.mutate(data);
  };

  return (
    <div className="lg:mt-[112px] mt-10 pb-[120px] lg:pb-[220px] flex flex-col items-center justify-center section-padding-x px-4">
      {/* Title */}
      <Title48 title2="Restablecer Contraseña" />

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[480px] mt-12 lg:mt-20 space-y-8"
        noValidate
      >
        {/* Password Field */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Nueva Contraseña"
            {...register("password", {
              required: "Contraseña es Obligatorio",
            })}
            className="w-full border-2 border-gray-300 p-4 rounded-md outline-none placeholder:text-gray-500"
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-500" />
            ) : (
              <Eye className="h-5 w-5 text-gray-500" />
            )}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmar Contraseña"
            {...register("password_confirmation", {
              required: "Confirmación de contraseña es Obligatorio",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
            className="w-full border-2 border-gray-300 p-4 rounded-md outline-none placeholder:text-gray-500"
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-gray-500" />
            ) : (
              <Eye className="h-5 w-5 text-gray-500" />
            )}
          </button>
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-[#11D619] hover:bg-green-600 text-white font-semibold py-3 px-10 rounded-[20px] transition duration-300 flex items-center justify-center gap-2 ${
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Restableciendo...
              </>
            ) : (
              "Restablecer"
            )}
          </button>
        </div>

        {/* Navigation Link */}
        <div className="text-center mt-8">
          <Link
            to="/forgot-password"
            className="text-black font-bold text-xl hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
