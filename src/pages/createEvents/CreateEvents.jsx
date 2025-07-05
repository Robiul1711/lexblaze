import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import Title48 from "@/components/common/Title48";
import { InputCalenderIcons, UploadIcons } from "@/lib/Icons";
import { Select, Tag, TimePicker, Upload, Modal } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import InstuctionModal from "@/components/common/InstuctionModal";
import InstructionModal2 from "@/components/common/InstructionModal2";
import DatePicker from "react-multi-date-picker";
import { CircleX, Eye } from "lucide-react";
import useCategoryList from "@/hooks/useCategoryList";

dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD";

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
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    trigger,
  } = useForm();
  
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [flyerFileList, setFlyerFileList] = useState([]);
  const [thumbFileList, setThumbFileList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const category = useCategoryList();

  const validateDates = (dates) => {
    if (!dates || dates.length === 0) return false;
    return dates.every(date => {
      try {
        const jsDate = new Date(date.year, date.month.number - 1, date.day);
        return !isNaN(jsDate.getTime());
      } catch {
        return false;
      }
    });
  };

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
     queryClient.invalidateQueries(["profileEventsData"]);
      toast.success(data.message || "¡Evento creado exitosamente!");
      navigate(`/event-user-view/${data?.event?.id}`);
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
        "Failed to create event. Please try again."
      );
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (data) => {
    let hasError = false;

    if (flyerFileList.length === 0) {
      setImageError("Se requiere una imagen para el evento.");
      hasError = true;
    } else {
      setImageError("");
    }

    if (!data.category_id || data.category_id.length === 0) {
      toast.error("Por favor seleccione al menos una categoría");
      hasError = true;
    }

    if (!validateDates(data.event_date)) {
      toast.error("Please provide valid event dates");
      hasError = true;
    }

    const valid = await trigger([
      "event_date", 
      "event_start_time",
      "event_title",
      "business_address",
      "price_limite"
    ]);
    
    if (!valid || hasError) {
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);

const formattedDates = data.event_date.map(date => {
  return dayjs(new Date(
    date.year,
    date.month.number - 1,
    date.day
  )).format("YYYY-MM-DD");
});

    const updatedData = {
      ...data,
      event_date: formattedDates,
      event_start_time: startTime ? dayjs(startTime).format("HH:mm") : '',
      event_end_time: endTime ? dayjs(endTime).format("HH:mm") : '',
      flyer: flyerFileList[0]?.originFileObj,
      event_thumb_image: thumbFileList[0]?.originFileObj || '',
    };

    createEventMutation.mutate(updatedData);
 

  };
  const handleStartTimeChange = (time) => {
    setStartTime(time);
    setValue("event_start_time", time ? time.toISOString() : '');
    trigger("event_start_time");
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
    setValue("event_end_time", time ? time.toISOString() : '');
  };

  const handleFlyerImageChange = ({ fileList: newFileList }) => {
    setFlyerFileList(newFileList);
    if (newFileList.length > 0) {
      setImageError("");
    }
  };

  const handleThumbImageChange = ({ fileList: newFileList }) => {
    setThumbFileList(newFileList);
  };

  const handleRemoveFlyerImage = () => {
    setFlyerFileList([]);
    setImageError("Se requiere una imagen para el evento.");
  };

  const handleRemoveThumbImage = () => {
    setThumbFileList([]);
  };

  const handleCategoryChange = (selectedOptions) => {
    setValue("category_id", selectedOptions);
    trigger("category_id");
  };

  const handleCancel = () => {
    const confirmed = window.confirm("¿Estás seguro que deseas cancelar?");
    if (confirmed) {
      navigate(-1);
    }
  };

  return (
    <div className="max-w-[590px] mx-auto mt-5 pb-[120px] lg:pb-[150px] px-4">
      <div className="mb-6 lg:mb-5 text-center">
        <Title48 title2="Crear un Evento" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Flyer Upload */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <Upload
            listType="picture-card"
            fileList={flyerFileList}
            onChange={handleFlyerImageChange}
            beforeUpload={() => false}
            accept="image/*"
            multiple={false}
            maxCount={1}
            disabled={isSubmitting}
            onRemove={handleRemoveFlyerImage}
            onPreview={handlePreview}
          >
            {flyerFileList.length < 1 && <UploadIcons />}
          </Upload>
          {imageError && <p className="text-red-500">{imageError}</p>}
          <p className="bg-[#000e8e] text-white sm:px-5 px-3 py-2 rounded-md text-lg font-bold mt-4">
            Carga Imagen de Fondo (Obligatorio)
          </p>
        </div>

        {/* Date Picker */}
        <div className="mt-4">
          <h1 className="text-2xl md:text-[32px] font-bold">Elija Fecha</h1>
          <InstuctionModal />
          <Controller
            name="event_date"
            control={control}
            rules={{ 
              required: "La fecha es obligatoria.",
              validate: validateDates
            }}
            render={({ field }) => (
              <div className="relative mt-4">
                <DatePicker
                  placeholder="Fecha de Inicio"
                  containerClassName="w-full"
                  inputClass="p-6 pr-20 w-full border-2 border-black rounded-md"
                  multiple
                  value={field.value}
                  onChange={field.onChange}
                />
                <div className="absolute top-1/2 right-10 transform -translate-y-1/2 pointer-events-none">
                  <InputCalenderIcons />
                </div>
                {field.value && field.value.length > 0 && (
                  <button
                    type="button"
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 focus:outline-none"
                    onClick={() => field.onChange([])}
                  >
                    <CircleX />
                  </button>
                )}
              </div>
            )}
          />
          {errors.event_date && (
            <p className="text-red-500">{errors.event_date.message}</p>
          )}
        </div>

        {/* Start Time */}
        <div className="relative">
          <Controller
            name="event_start_time"
            control={control}
            rules={{ required: "La hora de inicio es obligatoria." }}
            render={() => (
              <TimePicker
                value={startTime}
                placeholder="Hora de Inicio"
                onChange={handleStartTimeChange}
                format="HH:mm"
                size="large"
                className="p-6 pr-2 w-full border-2 border-black rounded-md"
                disabled={isSubmitting}
                showNow={false}
              />
            )}
          />
          <div className="absolute top-1/2 right-8 transform -translate-y-1/2 flex gap-2 items-center">
            <p className="px-3 py-2 bg-[#DDDDE3] text-[#029AFF] rounded-xl">
              {startTime ? dayjs(startTime).format("HH:mm") : "00:00"}
            </p>
          </div>
          {errors.event_start_time && (
            <p className="text-red-500">{errors.event_start_time.message}</p>
          )}
        </div>

        {/* End Time */}
        <div className="relative">
          <TimePicker
            value={endTime}
            placeholder="Hora Fin"
            onChange={handleEndTimeChange}
            format="HH:mm"
            size="large"
            className="p-6 pr-2 w-full border-2 border-black rounded-md"
            disabled={isSubmitting}
            showNow={false}
          />
          <div className="absolute top-1/2 right-8 transform -translate-y-1/2 flex gap-2 items-center">
            <p className="px-3 py-2 bg-[#DDDDE3] text-[#029AFF] rounded-xl">
              {endTime ? dayjs(endTime).format("HH:mm") : "00:00"}
            </p>
          </div>
        </div>

        {/* Event Details Section */}
        <section>
          <h1 className="text-2xl lg:text-[32px] font-bold">
            Detalles del Evento
          </h1>
          <div className="space-y-4 mt-4">
            <div>
              <input
                type="text"
                placeholder="Nombre del Establecimiento"
                {...register("business_name")}
                className="w-full border-2 border-black p-4 lg:p-6 rounded-md"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Nombre del Evento"
                {...register("event_title", {
                  required: "El título del evento es obligatorio",
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
                  required: "La dirección es obligatoria",
                })}
                className="w-full border-2 border-black p-4 lg:p-6 rounded-md"
                disabled={isSubmitting}
              />
              {errors.business_address && (
                <p className="text-red-500">{errors.business_address.message}</p>
              )}
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
                {...register("price_limite", {
                  required: "Se requiere precio",
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
                type="text"
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
          <Controller
            name="category_id"
            control={control}
            rules={{ required: "Please select at least one category" }}
            render={({ field }) => (
              <Select
                mode="multiple"
                placeholder="Categoría del Evento"
                tagRender={tagRender}
                options={category?.data?.map((item) => ({
                  label: item?.category_name,
                  value: String(item.id),
                }))}
                size="large"
                className="w-full custom-select"
                onChange={(value) => {
                  field.onChange(value);
                  handleCategoryChange(value);
                }}
                value={field.value}
                disabled={isSubmitting}
              />
            )}
          />
          {errors.category_id && (
            <p className="text-red-500">{errors.category_id.message}</p>
          )}
          <InstructionModal2 />
        </section>

        {/* Thumbnail Image Upload */}
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
              fileList={thumbFileList}
              onChange={handleThumbImageChange}
              beforeUpload={() => false}
              accept="image/*"
              multiple={false}
              maxCount={1}
              disabled={isSubmitting}
              onRemove={handleRemoveThumbImage}
              onPreview={handlePreview}
            >
              {thumbFileList.length < 1 && <UploadIcons />}
            </Upload>
            <p
              type="button"
              className="bg-[#000e8e] text-white sm:px-5 px-3 py-1 rounded-md text-lg font-bold mt-4"
              onClick={() =>
                document.querySelector(".ant-upload-select").click()
              }
            >
              Carga Imagenes (Opcional)
            </p>
          </div>
        </section>

        {/* Submit Button */}
        <div className="flex justify-center gap-10 mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-[#11D619] hover:bg-green-600 text-white font-semibold py-1 xlg:py-2.5 text-lg sm:text-2xl px-12 sm:px-8 rounded-[12px] transition duration-300 flex items-center justify-center gap-2 ${
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
      <div
        onClick={handleCancel}
        className="bg-red-500 mx-auto mt-5 sm:mt-5 text-center cursor-pointer max-w-[150px] text-lg duration-300 hover:bg-red-600 text-white sm:px-6 px-10 py-1 sm:py-2 rounded-[12px] lg:text-2xl font-bold"
      >
        Cancelar
      </div>

      {/* Image Preview Modal */}
      <Modal
        visible={previewVisible}
        title="Image Preview"
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default CreateEvents;