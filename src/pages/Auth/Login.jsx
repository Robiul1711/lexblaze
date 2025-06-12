import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Title48 from "@/components/common/Title48";
import toast from "react-hot-toast";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // or use any icon you like

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const LogInMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosPublic.post("/login", data);
      return response?.data;
    },
    onSuccess: (response) => {
      toast.success(response?.message || "Login successful");
      setUser(response);
      navigate("/venue-profile-edit");
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
    setIsSubmitting(true); // Set loading to true
    LogInMutation.mutate(data);
  };

  return (
    <div className=" mt-10 pb-[120px] lg:pb-[220px] flex flex-col items-center justify-center section-padding-x px-4">
      {/* Title */}
      <Title48 title2="Iniciar Sesión de Negocios" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[585px] mt-10 "
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

        {/* Password input */}
        <div className="py-9 lg:py-10 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            {...register("password", {
              required: "Contraseña es Obligatorio",
            })}
            className="w-full border-[2px] border-[#000] p-4 lg:p-6 rounded-sm outline-none placeholder:text-gray-500 pr-12"
          />
          {/* Toggle Button */}
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Submit button */}
        <div className="flex flex-col items-center justify-center">
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
                Iniciando...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </div>

        {/* Links */}
        <div className="text-center mt-6 lg:mt-10 space-y-5 lg:space-y-8">
          <Link
            to="/forgot-password"
            className="text-black font-bold text-2xl lg:text-[32px] cursor-pointer"
          >
            Olvidaste Contraseña
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
