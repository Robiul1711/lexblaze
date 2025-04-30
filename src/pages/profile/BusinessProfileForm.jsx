import { useForm } from "react-hook-form";
import { useState } from "react";
import Title48 from "@/components/common/Title48";
import { Switch } from "antd";
import { UploadIcons } from "@/lib/Icons";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import EventCategoryDropdown from "@/components/common/EventCategoryDropdown";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import toast from "react-hot-toast";

const BusinessProfileForm = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch("password");

  const RegistrationMutation=useMutation({
    mutationFn: async (data) => {
      const response = await axiosPublic.post("/register", data);
      console.log(response);
      return response.data;
      
    },
    onSuccess:(response)=>{
      toast.success(response?.message);
      console.log(response);
      navigate("/venue-profile-edit");
    },
    onError:(error)=>{
      console.log(error);
      const errorMessage =
        error.response?.data?.error ||
        "Something went wrong, try again later!!";
      toast.error(errorMessage);
  
    }
  })

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
    RegistrationMutation.mutate(data);
  };

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <div className="max-w-[590px] mx-auto lg:mt-[112px] mt-10 pb-[120px] lg:pb-[220px]  px-4">
      <div className="mb-10 lg:mb-16">
        <Title48 title2="Crear Perfil de Negocio" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 lg:space-y-10" noValidate>
        {/* Nombre del Negocio */}
        <div>
          <input
            type="text"
            placeholder="Nombre del Negocio"
            {...register("business_name", { required: "Este campo es requerido" })}
            className="w-full border-[2px] border-black p-4 lg:p-6 "
          />
          {errors.business_name && <p className="text-red-500 text-sm">{errors.business_name.message}</p>}
        </div>

        {/* Descripción */}
        <div>
          <textarea
            placeholder="Descripción del Negocio"
            {...register("business_details", { required: "Este campo es requerido" })}
            className="w-full border-[2px] border-black p-4 lg:p-6 h-[136px] md:h-[160px] lg:h-[200px]"
          />
          {errors.business_details && <p className="text-red-500 text-sm">{errors.business_details.message}</p>}
        </div>

        {/* Dirección */}
        <div>
          <input
            type="text"
            placeholder="Dirección del Negocio"
            {...register("business_address", { required: "Este campo es requerido" })}
            className="w-full border-[2px] border-black p-4 lg:p-6 "
          />
          {errors.business_address && <p className="text-red-500 text-sm">{errors.business_address.message}</p>}
        </div>

        {/* Horario */}
        <div>
          <input
            type="text"
            placeholder="Horario Comercial (ej. Lun - Sab: 1100-0200, Dom: 1200-1700)"
            {...register("business_time", { required: "Este campo es requerido" })}
            className="w-full border-[2px] border-black p-4 lg:p-6 "
          />
          {errors.business_time && <p className="text-red-500 text-sm">{errors.business_time.message}</p>}
        </div>

        {/* Website */}
        <input
          type="text"
          placeholder="Website link"
          {...register("business_website_link")}
          className="w-full border-[2px] border-black p-4 lg:p-6 "
        />

        {/* Edad */}
        <input
          type="text"
          placeholder="Límite de Edad"
          {...register("edad")}
          className="w-full border-[2px] border-black p-4 lg:p-6 "
        />

        {/* Menu */}
        <input
          type="text"
          placeholder="La Carta (Menú)"
          {...register("business_food_menu")}
          className="w-full border-[2px] border-black p-4 lg:p-6 "
        />

        {/* Teléfono */}
        <input
          type="text"
          placeholder="Teléfono"
          {...register("phone")}
          className="w-full border-[2px] border-black p-4 lg:p-6 "
        />

        {/* Mostrar Teléfono */}
        <div className="flex items-center justify-between font-bold lg:text-2xl">
          <label>*Mostrar Teléfono en el perfil</label>
          <Switch onChange={onChange} className="
            [&:not(.ant-switch-checked)]:!bg-gray-400
            [&:not(.ant-switch-checked):hover]:!bg-gray-500
            [&.ant-switch-checked]:!bg-black
            [&.ant-switch-disabled]:!opacity-50" />
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Correo Electrónico"
            {...register("email", { required: "Correo electrónico es requerido" })}
            className="w-full border-[2px] border-black p-4 lg:p-6 "
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Mostrar Email */}
        <div className="flex items-center justify-between font-bold lg:text-2xl">
          <label>*Mostrar Correo en el perfil</label>
          <Switch onChange={onChange} className="
            [&:not(.ant-switch-checked)]:!bg-gray-400
            [&:not(.ant-switch-checked):hover]:!bg-gray-500
            [&.ant-switch-checked]:!bg-black
            [&.ant-switch-disabled]:!opacity-50" />
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: "Contraseña es requerida" })}
            className="w-full border-[2px] border-black p-4 lg:p-6 "
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        {/* confirm password  */}
        <div>
  <input
    type="password"
    placeholder="Confirmar Contraseña"
    {...register("password_confirmation", {
      required: "Confirmación de contraseña es requerida",
      validate: (value) =>
        value === password || "Las contraseñas no coinciden",
    })}
    className="w-full border-[2px] border-black p-4 lg:p-6 "
  />
  {errors.password_confirmation && (
    <p className="text-red-500 text-sm">{errors.password_confirmation.message}</p>
  )}
</div>

        {/* Image Upload */}
        <div className="flex flex-col items-center gap-2 mt-6">
          <label htmlFor="file-upload" className="cursor-pointer border-[2px] border-[#3DB9F8] rounded-full p-3 ">
            <UploadIcons />
          </label>
          <input
            id="file-upload"
            type="file"
            {...register("image")}
            className="hidden"
          />
          <button type="button" className="bg-[#000e8e] text-white px-6 py-2 rounded-md lg:text-2xl font-bold mt-4">
            Carga Imagenes
          </button>
        </div>

        {/* Términos */}
        <div className="flex flex-col items-center gap-6 font-bold lg:text-2xl">
          <input
            className="size-5 md:size-6 lg:size-7"
            type="checkbox"
            {...register("terms", { required: "Debes aceptar los términos" })}
          />
          <span>Términos y Condiciones</span>
          {errors.terms && <p className="text-red-500 text-sm">{errors.terms.message}</p>}
        </div>

        {/* Submit */}
        <div className="flex flex-col items-center gap-2 lg:mt-6">
          <button
            type="submit"
            className="bg-[#11D619] hover:bg-green-600 text-white font-semibold py-3 px-14 md:px-xl lg:text-3xl rounded-xl lg:rounded-[20px] lg:mt-4"
          >
            Crear Cuenta
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessProfileForm;
