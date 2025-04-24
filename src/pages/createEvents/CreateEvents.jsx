import { useForm } from "react-hook-form";
import { useState } from "react";
import Title48 from "@/components/common/Title48";
import { InputCalenderIcons, UploadIcons } from "@/lib/Icons";
import { Dropdown } from "antd";
import { Calendar } from "@/components/ui/calendar";

const CreateEvents = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [date, setDate] = useState();
  // const [isAmStart, setIsAmStart] = useState(true);
  // const [isAmEnd, setIsAmEnd] = useState(true);

  // const toggleStart = () => setIsAmStart(!isAmStart);
  // const toggleEnd = () => setIsAmEnd(!isAmEnd);

  const onSubmit = (data) => {
    console.log("Submitted data:", {
      ...data,
      // timeStartPeriod: isAmStart ? "AM" : "PM",
      // timeEndPeriod: isAmEnd ? "AM" : "PM",
    });
  };

  return (
    <div className="max-w-[590px] mx-auto lg:mt-[112px] mt-10 pb-[120px] lg:pb-[220px] px-4">
      <div className="mb-6 lg:mb-16 text-center">
        <Title48 title2="Crear un Evento" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 lg:space-y-10">
        {/* Upload Imagen Principal */}
        <div className="flex flex-col items-center md:gap-2 md:mt-6">
          <label
            htmlFor="main-image"
            className="cursor-pointer border-[2px] border-[#3DB9F8] rounded-full p-3"
          >
            <UploadIcons />
          </label>
          <input
            id="main-image"
            type="file"
            {...register("mainImage")}
            className="hidden"
          />
          <button className="bg-[#000e8e] text-white px-12 py-1 sm:py-2 rounded-md text-lg lg:text-2xl font-bold mt-4">
          Carga Imagen de Fondo
          </button>
        </div>

        {/* Fecha */}
        <div>
          <h1 className="text-2xl md:text-[32px] font-bold">Elija Fecha</h1>
          <button className="text-lg bg-[#000e8e] px-3 sm:py-2 rounded-xl mt-4 text-white font-bold">
            Más Información
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Selección de Fecha(s)"
            {...register("fecha", { required: true })}
            className="w-full border-[2px] border-black p-4 lg:p-6"
          />
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          
        <Dropdown
          arrow
          dropdownRender={() => (
            <Calendar
              mode="single" // or "range" | "multiple"
              selected={date}
              onSelect={setDate}
              className="rounded-md border bg-white"
            />
          )}
          trigger={["click"]}
        >
          <div className="flex items-center gap-1 cursor-pointer">
          <InputCalenderIcons />
          </div>
        </Dropdown>
            
          </div>
        </div>

        {/* Hora Inicio */}
        <div className="relative">
          <input
            type="text"
            placeholder="Hora de Inicio"
            {...register("horaInicio", { required: true })}
            className="w-full border-[2px] border-black p-4 lg:p-6"
          />
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex gap-2 items-center">
            <p className="px-3 py-2 bg-[#DDDDE3] text-[#029AFF] rounded-xl">24:00</p>
            {/* <button
              type="button"
              onClick={toggleStart}
              className="relative w-[90px] h-10 rounded-xl bg-[#DDDDE3]"
            >
              <div
                className={`absolute top-1 h-8 w-9 rounded-lg bg-white shadow-md transform transition-transform duration-300 ${
                  isAmStart ? "translate-x-0 left-1.5" : "translate-x-10 left-2"
                }`}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black">
                AM
              </span>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black">
                PM
              </span>
            </button> */}
          </div>
        </div>

        {/* Hora Fin */}
        <div className="relative">
          <input
            type="text"
            placeholder="Hora Fin"
            {...register("horaFin", { required: true })}
            className="w-full border-[2px] border-black p-4 lg:p-6"
          />
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex gap-2 items-center">
            <p className="px-3 py-2 bg-[#DDDDE3] text-[#029AFF] rounded-xl">24:00</p>
       
          </div>
        </div>

        {/* Detalles */}
        <h1 className="text-2xl lg:text-[32px] font-bold">Detalles del Evento</h1>

        <input
          type="text"
          placeholder="Compañía/Promotor"
          {...register("promotor", { required: true })}
          className="w-full border-[2px] border-black p-4 lg:p-6"
        />

        <input
          type="text"
          placeholder="Nombre del Evento"
          {...register("nombreEvento", { required: true })}
          className="w-full border-[2px] border-black p-4 lg:p-6"
        />

        <input
          type="text"
          placeholder="Ubicación"
          {...register("ubicacion")}
          className="w-full border-[2px] border-black p-4 lg:p-6"
        />

        <textarea
          placeholder="Descripción del Evento"
          {...register("descripcion", { required: true })}
          className="w-full border-[2px] border-black p-4 lg:p-6 h-[136px] md:h-[160px] lg:h-[200px]"
        />

        <input
          type="text"
          placeholder="Precio para Entrar o Gratis"
          {...register("precio")}
          className="w-full border-[2px] border-black p-4 lg:p-6"
        />

        <input
          type="text"
          placeholder="Límite de Edad"
          {...register("edad")}
          className="w-full border-[2px] border-black p-4 lg:p-6"
        />

        <input
          type="text"
          placeholder="Link de Entradas"
          {...register("linkEntradas")}
          className="w-full border-[2px] border-black p-4 lg:p-6"
        />

        <input
          type="text"
          placeholder="Categoría del Evento"
          {...register("categoria", { required: true })}
          className="w-full border-[2px] border-black p-4 lg:p-6"
        />

        <div>
          <button className="bg-[#000e8e] text-white sm:px-6 px-3 py-1 sm:py-2 rounded-md text-sm lg:text-2xl font-bold">
            Más información sobre Categoría
          </button>
        </div>

        {/* Carga Imagen Adicional */}
        <div>
          <h1 className="text-2xl lg:text-[32px] font-bold">Carga Otra Imagen </h1>
          <p className="lg:text-xl font-bold">(opcional) Volante, Anuncio, Cartel, etc.</p>
        </div>
        <div className="flex flex-col items-center gap-2 mt-6">
          <label
            htmlFor="extra-image"
            className="cursor-pointer border-[2px] border-[#3DB9F8] rounded-full p-3"
          >
            <UploadIcons />
          </label>
          <input
            id="extra-image"
            type="file"
            {...register("imagenExtra")}
            className="hidden"
          />
          <button className="bg-[#000e8e] text-white sm:px-20 px-3 py-1 sm:py-2 rounded-md text-lg lg:text-2xl font-bold mt-4">
            Carga Imagenes
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col items-center sm:gap-2 sm:mt-6">
          <button
            type="submit"
            className="bg-[#11D619] hover:bg-green-600 text-white font-semibold py-1 sm:py-2 md:py-3 px-16 md:px-24 text-2xl md:text-3xl rounded-xl lg:rounded-[20px] mt-4"
          >
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvents;
