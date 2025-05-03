import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Title48 from "@/components/common/Title48";
import toast from "react-hot-toast";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
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
  });
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    LogInMutation.mutate(data);
    
  };

  return (
    <div className="lg:mt-[112px] mt-10 pb-[120px] lg:pb-[220px] flex flex-col items-center justify-center section-padding-x px-4">
      {/* Title */}
      <Title48 title2="Iniciar Sesión de Negocios" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[585px] mt-12 lg:mt-20"
        noValidate
      >
        {/* Email input */}
        <input
          type="email"
          placeholder="Correo Electrónico"
          {...register("email", {
            required: "Correo electrónico es requerido",
          })}
          className="w-full border-[2px] border-[#000] p-4 lg:p-6 rounded-sm outline-none placeholder:text-gray-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Password input */}
        <div className="py-9 lg:py-14">
          <input
            type="password"
            placeholder="Contraseña"
            {...register("password", {
              required: "Contraseña es requerida",
            })}
            className="w-full border-[2px] border-[#000] p-4 lg:p-6 rounded-sm outline-none placeholder:text-gray-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Submit button */}
        <div className="flex flex-col items-center justify-center">
          <button
            type="submit"
            className="bg-[#11D619] hover:bg-green-600 text-white font-semibold py-3 px-11 rounded-[20px] transition duration-300"
          >
            Iniciar Sesión
          </button>
        </div>

        {/* Links */}
        <div className="text-center mt-6 lg:mt-10 space-y-5 lg:space-y-8">
          <p className="text-black font-bold text-2xl lg:text-[32px] cursor-pointer">
            Olvidaste Contraseña
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
