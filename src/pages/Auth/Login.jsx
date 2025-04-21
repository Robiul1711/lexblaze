import { useForm } from "react-hook-form";
import Title48 from "@/components/common/Title48";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Added parentheses to call the hook

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Handle login logic here
  };

  return (
    <div className="mt-[112px] pb-[220px] flex flex-col items-center justify-center section-padding-x px-4">
      {/* Title */}
      <Title48 title2="Iniciar Sesión de Negocios" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[585px] mt-20"
        noValidate
      >
        {/* Email input */}
        <input
          type="email"
          placeholder="Correo Electrónico"
          {...register("email", {
            required: "Correo electrónico es requerido",
          })}
          className="w-full  border-[2px] border-[#000] p-6  rounded-sm outline-none placeholder:text-gray-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm ">{errors.email.message}</p>
        )}

        {/* Password inpput */}
        <div className="py-14">
        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", {
            required: "Contraseña es requerida",
          })}
          className="w-full border-[2px] border-[#000] p-6  rounded-sm outline-none placeholder:text-gray-500"
        />
        {errors.password && (
          <p className="text-red-500 text-sm ">{errors.password.message}</p>
        )}

        </div>

        {/* Login button */}
        <div className="flex flex-col items-center justify-center">
          <button
            type="submit"
            className="bg-[#11D619] hover:bg-green-600 text-white font-semibold py-3 px-11 rounded-[20px] transition duration-300"
          >
            Iniciar Sesión
          </button>
        </div>

        {/* Links */}
        <div className="text-center mt-10 space-y-8">
          <p className="text-black font-bold text-[32px] cursor-pointer">
            Olvidaste Correo Electrónico
          </p>
          <p className="text-black font-bold text-[32px] cursor-pointer">
            Olvidaste Contraseña
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;