import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Title48 from "@/components/common/Title48";
import { InputCalenderIcons, UploadIcons } from "@/lib/Icons";
import { Select, Tag, TimePicker, Upload, Modal } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import InstructionModal2 from "@/components/common/InstructionModal2";
import InstuctionModal from "@/components/common/InstuctionModal";
import DatePicker from "react-multi-date-picker";

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

const UpdateEvent = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { data } = useQuery({
    queryKey: ["updateProfileEventsData", id],
    queryFn: async () => {
      const response = await axiosSecure.get(`event/edit/${id}`);
      return response.data;
    },
  });
console.log("data", data);
  useEffect(() => {
    if (data?.events) {
      // Set form values from fetched data
      const event = data.events;
      setValue("business_name", event.business_name);
      setValue("event_title", event.event_title);
      setValue("business_address", event.business_address);
      setValue("event_details", event.event_details);
      setValue("price_limite", event.price_limite);
      setValue("age_limite", event.age_limite);
      setValue("business_website_link", event.business_website_link);
      
      // Set dates
      if (event.event_date) {
        setValue("event_date", event.event_date.map(date => dayjs(date).toDate()));
      }
      
      // Set times
      if (event.event_start_time) {
        const start = dayjs(event.event_start_time, "HH:mm");
        setStartTime(start);
        setValue("event_start_time", start);
      }
      if (event.event_end_time) {
        const end = dayjs(event.event_end_time, "HH:mm");
        setEndTime(end);
        setValue("event_end_time", end);
      }
      
      // Set categories
      if (event.categories) {
        const defaultCategories = event.categories.map(cat => cat.id.toString());
        setSelectedCategories(defaultCategories);
        setValue("category_id", defaultCategories);
      }
      
      // Set existing images
      if (event.event_thumb_image) {
        setFileList([{
          uid: '-1',
          name: 'existing-image.jpg',
          status: 'done',
          url: event.event_thumb_image,
        }]);
      }
      if (event.flyer) {
        setFileList2([{
          uid: '-2',
          name: 'existing-flyer.jpg',
          status: 'done',
          url: event.flyer,
        }]);
      }
    }
  }, [data, setValue]);

  const createEventMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axiosSecure.post(`/event/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      navigate("/venue-profile-edit");
      toast.success(data.message || "Event updated successfully!");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to update event. Please try again."
      );
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handleImageChangeflayer = ({ fileList: newFileList }) => {
    setFileList2(newFileList);
  };

  const handleThumbImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) setImageError("");
  };

  const handleRemoveImage = (type) => {
    if (type === 'flyer') {
      setFileList2([]);
    } else {
      setFileList([]);
      setImageError("");
    }
  };

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
      event_date: data?.event_date?.map((date) => 
        `${date.year}-${String(date.month.number).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`
      ),
      event_start_time: dayjs(startTime).format("HH:mm"),
      event_end_time: dayjs(endTime).format("HH:mm"),
      event_thumb_image: fileList[0]?.originFileObj || (fileList[0]?.url ? null : undefined),
      flyer: fileList2[0]?.originFileObj || (fileList2[0]?.url ? null : undefined),
    };

    createEventMutation.mutate(updatedData);
    console.log("Form Data:", updatedData);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
    setValue("event_start_time", time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
    setValue("event_end_time", time);
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
    setValue("category_id", selectedOptions);
  };

  return (
    <div className="max-w-[590px] mx-auto mt-5 pb-[80px] lg:pb-[150px] px-4">
      <div className="mb-6 lg:mb-5 text-center">
        <Title48 title2="Actualizar Evento" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 lg:space-y-5">
        {/* Date Section */}
        <section>
          <h1 className="text-2xl md:text-[32px] font-bold">Elija Fecha</h1>
          <InstuctionModal />
          
          {/* Flyer Upload */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <Upload
              listType="picture-card"
              fileList={fileList2}
              onChange={handleImageChangeflayer}
              beforeUpload={() => false}
              accept="image/*"
              multiple={false}
              maxCount={1}
              disabled={isSubmitting}
              onRemove={() => handleRemoveImage('flyer')}
           
            >
              {fileList2.length < 1 && <UploadIcons />}
            </Upload>
            <p className="bg-[#000e8e] text-white sm:px-5 px-3 py-1 rounded-md text-lg  font-bold mt-4">
              Carga Imagen de Fondo
            </p>
          </div>

          <div className="relative mt-4">
            <Controller
              name="event_date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  placeholder="Fecha de Inicio"
                  containerClassName="w-full"
                  inputClass="p-6 pr-20 w-full border-2 border-black rounded-md"
                  multiple
                  value={field.value}
                  onChange={field.onChange}
                  format={dateFormat}
                />
              )}
            />
            <div className="absolute top-1/2 right-8 transform -translate-y-1/2 pointer-events-none">
              <InputCalenderIcons />
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
              className="p-6 pr-2 w-full border-2 border-black rounded-md"
       
              showNow={false} 
            />
            <div className="absolute top-1/2 right-8 transform -translate-y-1/2 flex gap-2 items-center">
              <p className="px-3 py-2 bg-[#DDDDE3] text-[#029AFF] rounded-xl">
                {startTime ? dayjs(startTime).format("HH:mm") : "00:00"}
              </p>
            </div>
          </div>

          <div className="relative">
            <TimePicker
              value={endTime}
              placeholder="Hora Fin"
              onChange={handleEndTimeChange}
              format="HH:mm"
              size="large"
              className="p-6 pr-2 w-full border-2 border-black rounded-md"
              
              showNow={false} 
            />
            <div className="absolute top-1/2 right-8 transform -translate-y-1/2 flex gap-2 items-center">
              <p className="px-3 py-2 bg-[#DDDDE3] text-[#029AFF] rounded-xl">
                {endTime ? dayjs(endTime).format("HH:mm") : "00:00"}
              </p>
            </div>
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
                {...register("business_name")}
                className="w-full border-2 border-black p-4 lg:p-6 rounded-md"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Nombre del Evento"
                {...register("event_title")}
                className="w-full border-2 border-black p-4 lg:p-6 rounded-md"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Ubicación"
                {...register("business_address")}
                className="w-full border-2 border-black p-4 lg:p-6 rounded-md"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <textarea
                placeholder="Descripción del Evento"
                {...register("event_details")}
                className="w-full border-2 border-black p-4 lg:p-6 h-[136px] md:h-[160px] lg:h-[200px] rounded-md"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Precio para Entrar o Gratis"
                {...register("price_limite")}
                className="w-full border-2 border-black p-4 lg:p-6 rounded-md"
                disabled={isSubmitting}
              />
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
            value={selectedCategories}
            mode="multiple"
            placeholder="Categoría del Evento"
            tagRender={tagRender}
            options={categoryOptions}
            size="large"
            className="w-full custom-select"
            onChange={handleCategoryChange}
            disabled={isSubmitting}
          />
          <InstructionModal2 />
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
              onChange={handleThumbImageChange}
              beforeUpload={() => false}
              accept="image/*"
              multiple={false}
              maxCount={1}
              disabled={isSubmitting}
              onRemove={() => handleRemoveImage('thumb')}
            >
              {fileList.length < 1 && <UploadIcons />}
            </Upload>

            {imageError && <p className="text-red-500">{imageError}</p>}
            
            <p
              type="button"
              className="bg-[#000e8e] text-white sm:px-5 px-3 py-1 rounded-md text-lg  font-bold mt-4"
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
        <div className="flex justify-center gap-10 mt-8">
          <button 
            onClick={() => navigate(-1)} 
            className="bg-red-500 duration-300 hover:bg-red-600 text-white sm:px-6 px-3 py-2 rounded-[20px] text-sm lg:text-2xl font-bold"
          >
            Cancel
          </button>
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

export default UpdateEvent;