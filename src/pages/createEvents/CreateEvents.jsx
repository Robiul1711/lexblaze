import { useForm } from "react-hook-form";
import { useState } from "react";
import Title48 from "@/components/common/Title48";
import { InputCalenderIcons, UploadIcons } from "@/lib/Icons";
import { Select, Tag, TimePicker, DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Link } from "react-router-dom";

dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD";

const options = [
  { value: "Música en vivo" },
  { value: "Comedia" },
  { value: "Deportivos" },
  { value: "Arte & Cultura" },
  { value: "Comida y Bebida" },
  { value: "Variedad y Otro" },
  { value: "Cine y Televisión" },
  { value: "Talleres y Clases" },
];

const tagRender = (props) => {
  const { label, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color="black"
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginInlineEnd: 4 }}
    >
      {label}
    </Tag>
  );
};

const CreateEvents = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted data:", {
      ...data,
      horaInicio: value ? dayjs(value).format("HH:mm") : "",
      horaFin: endvalue ? dayjs(endvalue).format("HH:mm") : "",
    });
  };

  const [value, setValue] = useState(null);
  const [endvalue, setEndValue] = useState(null);

  const onChange = (time) => setValue(time);
  const onChangeEnd = (time) => setEndValue(time);

  return (
    <div className="max-w-[590px] mx-auto  mt-10 pb-[120px] lg:pb-[220px] px-4">
      <div className="mb-6 lg:mb-16 text-center">
        <Title48 title2="Crear un Evento" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 lg:space-y-10">
        <div className="flex flex-col items-center md:gap-2 md:mt-6">
          <label htmlFor="main-image" className="cursor-pointer border-[2px] border-[#3DB9F8] rounded-full p-3">
            <UploadIcons />
          </label>
          <input id="main-image" type="file" {...register("mainImage") } className="hidden" />
          <button className="bg-[#000e8e] text-white px-12 py-1 sm:py-2 rounded-md text-lg lg:text-2xl font-bold mt-4">
            Carga Imagen de Fondo
          </button>
        </div>

        <div>
          <h1 className="text-2xl md:text-[32px] font-bold">Elija Fecha</h1>
          <button className="text-lg bg-[#000e8e] px-3 sm:py-2 rounded-xl mt-4 text-white font-bold">
            Más Información
          </button>
        </div>

        <div className="relative">
          <DatePicker
            defaultValue={dayjs("2019-09-03", dateFormat)}
            minDate={dayjs("2019-08-01", dateFormat)}
            maxDate={dayjs("2020-10-31", dateFormat)}
            size="large"
            suffixIcon={null}
            className="w-full py-6 border-black border-[2px] rounded-md focus:outline-none focus:ring-0 focus:border-black"
          />
          <div className="absolute top-1/2 right-8 transform -translate-y-1/2 pointer-events-none">
            <InputCalenderIcons />
          </div>
        </div>

        <div className="relative">
          <TimePicker
            value={value}
            placeholder="Hora de Inicio"
            onChange={onChange}
            format="HH:mm"
            size="large"
            className="p-6 w-full border-[2px] text-2xl border-black rounded-md focus:outline-none focus:ring-0 focus:border-black"
          />
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex gap-2 items-center">
            <p className="px-3 py-2 bg-[#DDDDE3] text-[#029AFF] rounded-xl">
              {value ? dayjs(value).format('HH:mm') : '00:00'}
            </p>
          </div>
        </div>

        <div className="relative">
          <TimePicker
            value={endvalue}
            placeholder="Hora Fin"
            onChange={onChangeEnd}
            format="HH:mm"
            size="large"
            className="p-6 w-full border-[2px] border-black rounded-md focus:outline-none focus:ring-0 focus:border-black"
          />
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex gap-2 items-center">
            <p className="px-3 py-2 bg-[#DDDDE3] text-[#029AFF] rounded-xl">
              {endvalue ? dayjs(endvalue).format('HH:mm') : '00:00'}
            </p>
          </div>
        </div>

        <h1 className="text-2xl lg:text-[32px] font-bold">Detalles del Evento</h1>

        <input type="text" placeholder="Compañía/Promotor" {...register("promotor", { required: true })} className="w-full border-[2px] border-black p-4 lg:p-6" />

        <input type="text" placeholder="Nombre del Evento" {...register("nombreEvento", { required: true })} className="w-full border-[2px] border-black p-4 lg:p-6" />

        <input type="text" placeholder="Ubicación" {...register("ubicacion")} className="w-full border-[2px] border-black p-4 lg:p-6" />

        <textarea placeholder="Descripción del Evento" {...register("descripcion", { required: true })} className="w-full border-[2px] border-black p-4 lg:p-6 h-[136px] md:h-[160px] lg:h-[200px]" />

        <input type="text" placeholder="Precio para Entrar o Gratis" {...register("precio")} className="w-full border-[2px] border-black p-4 lg:p-6" />

        <input type="text" placeholder="Límite de Edad" {...register("edad")} className="w-full border-[2px] border-black p-4 lg:p-6" />

        <input type="text" placeholder="Link de Entradas" {...register("linkEntradas")} className="w-full border-[2px] border-black p-4 lg:p-6 rounded-md" />

        <Select
          placeholder="Categoría del Evento"
          mode="multiple"
          tagRender={tagRender}
          options={options}
          size="large"
          className="w-full  custom-select"
        />

        <div>
          <button className="bg-[#000e8e] text-white sm:px-6 px-3 py-1 sm:py-2 rounded-md text-sm lg:text-2xl font-bold">
            Más información sobre Categoría
          </button>
        </div>

        <div>
          <h1 className="text-2xl lg:text-[32px] font-bold">Carga Otra Imagen</h1>
          <p className="lg:text-xl font-bold">(opcional) Volante, Anuncio, Cartel, etc.</p>
        </div>

        <div className="flex flex-col items-center gap-2 mt-6">
          <label htmlFor="extra-image" className="cursor-pointer border-[2px] border-[#3DB9F8] rounded-full p-3">
            <UploadIcons />
          </label>
          <input id="extra-image" type="file" {...register("imagenExtra")} className="hidden" />
          <button className="bg-[#000e8e] text-white sm:px-20 px-3 py-1 sm:py-2 rounded-md text-lg lg:text-2xl font-bold mt-4">
            Carga Imagenes
          </button>
        </div>

        <div className="flex flex-col items-center sm:gap-2 sm:mt-6">
          <Link to="/venue-profile-edit" type="submit" className="bg-[#11D619] hover:bg-green-600 text-white font-semibold py-1 sm:py-2 md:py-3 px-16 md:px-24 text-2xl md:text-3xl rounded-xl lg:rounded-[20px] mt-4">
            Publicar
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateEvents;