import { useForm } from "react-hook-form";
import { useState } from "react";
import Title48 from "@/components/common/Title48";
import { InputCalenderIcons, UploadIcons } from "@/lib/Icons";
import { Select, Tag, TimePicker, DatePicker, Upload, message } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "@/hooks/useAxiosPublic";

dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD";

const categoryOptions = [
  { value: "1", label: "Música en vivo" },
  { value: "2", label: "Comedia" },
  { value: "3", label: "Deportivos" },
  { value: "4", label: "Arte & Cultura" },
  { value: "5", label: "Comida y Bebida" },
  { value: "6", label: "Variedad y Otro" },
  { value: "7", label: "Cine y Televisión" },
  { value: "8", label: "Talleres y Clases" },
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
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState("");

  const createEventMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axiosSecure.post("/event/store", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Event created successfully!");
      navigate("/venue-profile-edit");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to create event. Please try again."
      );
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = async (data) => {
    if (fileList.length === 0) {
      setImageError("Se requiere una imagen para el evento.");
      setIsSubmitting(false);
      return;
    } else {
      setImageError("");
    }

    setIsSubmitting(true);

    const updatedData = {
      ...data,
      event_start_date: dayjs(startDate).format(dateFormat),
      event_end_date: dayjs(endDate).format(dateFormat),
      event_start_time: dayjs(startTime).format("HH:mm"),
      event_end_time: dayjs(endTime).format("HH:mm"),
      event_thumb_image: fileList[0]?.originFileObj,
      flyer: fileList2.length > 0 ? fileList2[0]?.originFileObj : null, // Add this check
    };

    createEventMutation.mutate(updatedData);
    console.log("Form Data:", updatedData);
  };
  const handleStartDateChange = (date) => {
    setStartDate(date);
    setValue("event_start_date", date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setValue("event_end_date", date);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
    setValue("event_start_time", time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
    setValue("event_end_time", time);
  };

  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) setImageError("");
  };
  const handleImageChangeflayer = ({ fileList: newFileList }) => {
    setFileList2(newFileList);
    if (newFileList.length > 0) setImageError("");
  };

  const handleCategoryChange = (selectedOptions) => {
    setValue("category_id", selectedOptions);
  };

  return (
    <div className="max-w-[590px] mx-auto mt-10 pb-[120px] lg:pb-[220px] px-4">
      <div className="mb-6 lg:mb-16 text-center">
        <Title48 title2="Crear un Evento" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 lg:space-y-10"
      >
        {/* Date Section */}
        <section>
          <div className="flex flex-col items-center gap-2 mb-10">
            <Upload
              listType="picture-card"
              fileList={fileList2}
              onChange={handleImageChangeflayer}
              beforeUpload={() => false}
              accept="image/*"
              multiple={false}
              maxCount={1}
              disabled={isSubmitting}
            >
              {fileList2.length < 1 && <UploadIcons />}
            </Upload>

            <p
              type="button"
              className="bg-[#000e8e] text-white sm:px-10 px-3 py-2 rounded-md text-lg lg:text-2xl font-bold mt-4"
              onClick={() =>
                document.querySelector(".ant-upload-select").click()
              }
              disabled={isSubmitting}
            >
              Carga Imagen de Fondo
            </p>
          </div>
          <h1 className="text-2xl md:text-[32px] font-bold">Elija Fecha</h1>
          <button
            type="button"
            className="text-lg bg-[#000e8e] px-3 sm:py-2 rounded-xl mt-4 text-white font-bold"
          >
            Más Información
          </button>

          <div className="space-y-4 mt-4">
            <div className="relative">
              <DatePicker
                value={startDate}
                onChange={handleStartDateChange}
                minDate={dayjs()}
                size="large"
                suffixIcon={null}
                placeholder="Fecha de Inicio"
                className="w-full py-6 border-black border-2 rounded-md"
                disabled={isSubmitting}
              />
              <div className="absolute top-1/2 right-8 transform -translate-y-1/2 pointer-events-none">
                <InputCalenderIcons />
              </div>
              {errors.event_start_date && (
                <p className="text-red-500">Start date is required</p>
              )}
            </div>

            <div className="relative">
              <DatePicker
                value={endDate}
                onChange={handleEndDateChange}
                minDate={startDate || dayjs()}
                size="large"
                suffixIcon={null}
                placeholder="Fecha Final"
                className="w-full py-6 border-black border-2 rounded-md"
                disabled={isSubmitting}
              />
              <div className="absolute top-1/2 right-8 transform -translate-y-1/2 pointer-events-none">
                <InputCalenderIcons />
              </div>
              {errors.event_end_date && (
                <p className="text-red-500">End date is required</p>
              )}
            </div>
          </div>
        </section>

        {/* Time Section */}
        <section className="space-y-4">
          <div className="relative">
            <TimePicker
              value={startTime}
              placeholder="Hora de Inicio"
              onChange={handleStartTimeChange}
              format="HH:mm"
              size="large"
              className="p-6 w-full border-2 border-black rounded-md"
              disabled={isSubmitting}
            />
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex gap-2 items-center">
              <p className="px-3 py-2 bg-[#DDDDE3] text-[#029AFF] rounded-xl">
                {startTime ? dayjs(startTime).format("HH:mm") : "00:00"}
              </p>
            </div>
            {errors.event_start_time && (
              <p className="text-red-500">Start time is required</p>
            )}
          </div>

          <div className="relative">
            <TimePicker
              value={endTime}
              placeholder="Hora Fin"
              onChange={handleEndTimeChange}
              format="HH:mm"
              size="large"
              className="p-6 w-full border-2 border-black rounded-md"
              disabled={isSubmitting}
            />
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex gap-2 items-center">
              <p className="px-3 py-2 bg-[#DDDDE3] text-[#029AFF] rounded-xl">
                {endTime ? dayjs(endTime).format("HH:mm") : "00:00"}
              </p>
            </div>
            {errors.event_end_time && (
              <p className="text-red-500">End time is required</p>
            )}
          </div>
        </section>

        {/* Event Details Section */}
        <section>
          <h1 className="text-2xl lg:text-[32px] font-bold">
            Detalles del Evento
          </h1>

          <div className="space-y-4 mt-4">
            <div>
              <input
                type="text"
                placeholder="Compañía/Promotor"
                {...register("business_name", {
                  required: "Company name is required",
                })}
                className="w-full border-2 border-black p-4 lg:p-6 rounded-md"
                disabled={isSubmitting}
              />
              {errors.business_name && (
                <p className="text-red-500">{errors.business_name.message}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Nombre del Evento"
                {...register("event_title", {
                  required: "Event title is required",
                })}
                className="w-full border-2 border-black p-4 lg:p-6 rounded-md"
                disabled={isSubmitting}
              />
              {errors.event_title && (
                <p className="text-red-500">{errors.event_title.message}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Ubicación"
                {...register("business_address", {
                  required: "Address is required",
                })}
                className="w-full border-2 border-black p-4 lg:p-6 rounded-md"
                disabled={isSubmitting}
              />
              {errors.business_address && (
                <p className="text-red-500">
                  {errors.business_address.message}
                </p>
              )}
            </div>

            <div>
              <textarea
                placeholder="Descripción del Evento"
                {...register("event_details", {
                  required: "Description is required",
                })}
                className="w-full border-2 border-black p-4 lg:p-6 h-[136px] md:h-[160px] lg:h-[200px] rounded-md"
                disabled={isSubmitting}
              />
              {errors.event_details && (
                <p className="text-red-500">{errors.event_details.message}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Precio para Entrar o Gratis"
                {...register("price_limite", {
                  required: "Price is required",
                })}
                className="w-full border-2 border-black p-4 lg:p-6 rounded-md"
                disabled={isSubmitting}
              />
              {errors.price_limite && (
                <p className="text-red-500">{errors.price_limite.message}</p>
              )}
            </div>

            <div>
              <input
                type="number"
                placeholder="Límite de Edad"
                {...register("age_limite")}
                className="w-full border-2 border-black p-4 lg:p-6 rounded-md"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <input
                type="url"
                placeholder="Link de Entradas"
                {...register("business_website_link")}
                className="w-full border-2 border-black p-4 lg:p-6 rounded-md"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </section>

        {/* Category Section */}
        <section>
          <Select
            mode="multiple"
            placeholder="Categoría del Evento"
            tagRender={tagRender}
            options={categoryOptions}
            size="large"
            className="w-full custom-select"
            onChange={handleCategoryChange}
            disabled={isSubmitting}
          />
          {errors.category_id && (
            <p className="text-red-500">Please select at least one category</p>
          )}

          <button
            type="button"
            className="bg-[#000e8e] text-white sm:px-6 px-3 py-2 rounded-md text-sm lg:text-2xl font-bold mt-4"
            disabled={isSubmitting}
          >
            Más información sobre Categoría
          </button>
        </section>

        {/* Image Upload Section */}
        <section>
          <h1 className="text-2xl lg:text-[32px] font-bold">
            Carga Otra Imagen
          </h1>
          <p className="lg:text-xl font-bold">
            (opcional) Volante, Anuncio, Cartel, etc.
          </p>

          <div className="flex flex-col items-center gap-2 mt-6">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleImageChange}
              beforeUpload={() => false}
              accept="image/*"
              multiple={false}
              maxCount={1}
              disabled={isSubmitting}
            >
              {fileList.length < 1 && <UploadIcons />}
            </Upload>

            {imageError && <p className="text-red-500">{imageError}</p>}

            <p
              type="button"
              className="bg-[#000e8e] text-white sm:px-10 px-3 py-2 rounded-md text-lg lg:text-2xl font-bold mt-4"
              onClick={() =>
                document.querySelector(".ant-upload-select").click()
              }
              disabled={isSubmitting}
            >
              Carga Imagenes
            </p>
          </div>
        </section>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
            <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-[#11D619] hover:bg-green-600 text-white font-semibold py-3 text-2xl px-11 rounded-[20px] transition duration-300 flex items-center justify-center gap-2 ${
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
               Publicando...
              </>
            ) : (
              "Publicar"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvents;
