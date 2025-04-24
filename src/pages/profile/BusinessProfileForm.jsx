import { useForm } from "react-hook-form";
import { useState } from "react";
import Title48 from "@/components/common/Title48";
import { Switch } from "antd";
import { UploadIcons } from "@/lib/Icons";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import EventCategoryDropdown from "@/components/common/EventCategoryDropdown";

const BusinessProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = (data) => {
    console.log("Submitted data:", data);
  };
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <div className="max-w-[590px] mx-auto lg:mt-[112px] mt-10 pb-[120px] lg:pb-[220px]  px-4">
      <div className="mb-10 lg:mb-16">
        <Title48 title2="Crear Perfil de Negocio" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 lg:space-y-10">
        <input
          type="text"
          placeholder="Nombre del Negocio"
          {...register("nombre", { required: true })}
          className="w-full border-[2px] border-black p-4 lg:p-6 "
        />

        <textarea
          placeholder="Descripción del Negocio"
          {...register("descripcion", { required: true })}
          className="w-full border-[2px] border-black p-4 lg:p-6 h-[136px] md:h-[160px] lg:h-[200px]"
        />

        <input
          type="text"
          placeholder="Dirección del Negocio"
          {...register("direccion", { required: true })}
          className="w-full border-[2px] border-black p-4 lg:p-6 "
        />

        <input
          type="text"
          placeholder="Horario Comercial (ej. Lun - Sab: 1100-0200, Dom: 1200-1700)"
          {...register("horario", { required: true })}
          className="w-full border-[2px] border-black p-4 lg:p-6 "
        />

        <input
          type="text"
          placeholder="Website link"
          {...register("website")}
          className="w-full border-[2px] border-black p-4 lg:p-6 "
        />

        <input
          type="text"
          placeholder="Límite de Edad"
          {...register("edad")}
          className="w-full border-[2px] border-black p-4 lg:p-6 "
        />

        <input
          type="text"
          placeholder="La Carta (Menú)"
          {...register("menu")}
          className="w-full border-[2px] border-black p-4 lg:p-6 "
        />

        <input
          type="text"
          placeholder="Teléfono"
          {...register("telefono")}
          className="w-full border-[2px] border-black p-4 lg:p-6 "
        />
        <div className="flex items-center justify-between  font-bold lg:text-2xl">
          <label>*Mostrar Teléfono en el perfil</label>
          <Switch
            className="
    /* OFF state (unchecked) */
    [&:not(.ant-switch-checked)]:!bg-gray-400
    
    /* Hover state for OFF */
    [&:not(.ant-switch-checked):hover]:!bg-gray-500
    
    /* ON state (checked) - BLACK */
    [&.ant-switch-checked]:!bg-black
    
    /* Disabled state */
    [&.ant-switch-disabled]:!opacity-50
  "
            onChange={onChange}
          />
        </div>
<div className="relative group">
        <input
          type="email"
          placeholder="Correo Electrónico"
          {...register("email", { required: true })}
          className="w-full border-[2px] border-black p-4 lg:p-6 "
        />
<div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50">
<EventCategoryDropdown />

</div>
</div>
        <div className="flex items-center justify-between font-bold lg:text-2xl">
          <label>*Mostrar Correo en el perfil</label>
          <Switch
            className="
    [&:not(.ant-switch-checked)]:!bg-gray-400
    [&:not(.ant-switch-checked):hover]:!bg-gray-500
    [&.ant-switch-checked]:!bg-black
      [&.ant-switch-disabled]:!opacity-50
  "
            onChange={onChange}
          />
        </div>

        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", { required: true })}
          className="w-full border-[2px] border-black p-4 lg:p-6 "
        />

        <div className="flex flex-col items-center gap-2 mt-6">
          <label
            htmlFor="file-upload"
            className="cursor-pointer border-[2px] border-[#3DB9F8] rounded-full p-3 "
          >
            <UploadIcons />
          </label>
          <input
            id="file-upload"
            type="file"
            {...register("image")}
            className="hidden"
          />
          <button className="bg-[#000e8e] text-white px-6 py-2   rounded-md lg:text-2xl font-bold mt-4">
            Carga Imagenes
          </button>
        </div>

        <div className="flex flex-col items-center gap-6 font-bold lg:text-2xl">
          <input
            className="size-5 md:size-6 lg:size-7"
            type="checkbox"
            {...register("terms", { required: true })}
          />
          <span>Términos y Condiciones</span>
        </div>
        <div className="flex flex-col items-center gap-2 lg:mt-6">
          <Link
            to="/create-event"
            type="submit"
            className="bg-[#11D619]  hover:bg-green-600 text-white font-semibold py-3 px-14 md:px-xl lg:text-3xl rounded-xl lg:rounded-[20px] lg:mt-4"
          >
            Crear Cuenta
          </Link>
        </div>
      </form>
    </div>
  );
};

export default BusinessProfileForm;
