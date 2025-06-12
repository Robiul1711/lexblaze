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
import { CircleX } from "lucide-react";
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

const UpdateEvent = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, handleSubmit, setValue, control } = useForm();

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // category api
  const category = useCategoryList();

  const { data } = useQuery({
    queryKey: ["updateProfileEventsData", id],
    queryFn: async () => {
      const response = await axiosSecure.get(`event/edit/${id}`);
      return response.data;
    },
  });
  console.log(data);
  useEffect(() => {
    if (data?.events) {
      const event = data.events;
      setValue("business_name", event.business_name);
      setValue("event_title", event.event_title);
      setValue("business_address", event.business_address);
      setValue("event_details", event.event_details);
      setValue("price_limite", event.price_limite);
      setValue("age_limite", event.age_limite);
      setValue("business_website_link", event.business_website_link);

      // Set dates
      if (event.event_dates && event.event_dates.length > 0) {
        const dates = event.event_dates.map(
          (dateObj) => new Date(dateObj.date)
        );
        setValue("event_date", dates);
      }

      // Set times
      if (event.event_start_time) {
        const start = dayjs(event.event_start_time, "HH:mm");
        setStartTime(start);
      }
      if (event.event_end_time) {
        const end = dayjs(event.event_end_time, "HH:mm");
        setEndTime(end);
      }
 // Set categories
    if (event.categories) {
      const ids = event.categories.map((cat) => cat.id);
      setValue("category_id", ids);
    }
      // Set existing images
      if (event.event_thumb_image) {
        setFileList([
          {
            uid: "-1",
            name: "existing-image.jpg",
            status: "done",
            url: event.event_thumb_image,
          },
        ]);
      }
      if (event.flyer) {
        setFileList2([
          {
            uid: "-2",
            name: "existing-flyer.jpg",
            status: "done",
            url: event.flyer,
          },
        ]);
      }
    }
  }, [data, setValue]);

  const createEventMutation = useMutation({
    mutationFn: async (formData) => {
      const formDataToSend = new FormData();

      // Append all fields to formData
      Object.keys(formData).forEach((key) => {
        if (key === "event_date") {
          formData[key].forEach((date) => {
            formDataToSend.append(
              "event_date[]",
              dayjs(date).format("YYYY-MM-DD")
            );
          });
        } else if (key === "category_id") {
          formData[key].forEach((catId) => {
            formDataToSend.append("category_id[]", catId);
          });
        } else if (key !== "event_thumb_image" && key !== "flyer") {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append files if they exist
      if (fileList[0]?.originFileObj) {
        formDataToSend.append("event_thumb_image", fileList[0].originFileObj);
      }
      if (fileList2[0]?.originFileObj) {
        formDataToSend.append("flyer", fileList2[0].originFileObj);
      }

      const response = await axiosSecure.post(
        `/event/update/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
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
  };

  const handleRemoveImage = (type) => {
    if (type === "flyer") {
      setFileList2([]);
    } else {
      setFileList([]);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const updatedData = {
      ...data,
      event_start_time: startTime ? dayjs(startTime).format("HH:mm") : null,
      event_end_time: endTime ? dayjs(endTime).format("HH:mm") : null,
    };

    createEventMutation.mutate(updatedData);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };
  const [selectedCategories, setSelectedCategories] = useState([]);

useEffect(() => {
  if (data?.events?.categories) {
    const ids = data.events.categories.map((cat) => cat.id);
    setSelectedCategories(ids);
  }
}, [data?.events?.categories]);

  return (
    <div className="max-w-[590px] mx-auto mt-5 pb-[80px] lg:pb-[150px] px-4">
      <div className="mb-6 lg:mb-5 text-center">
        <Title48 title2="Actualizar Evento" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 lg:space-y-5"
      >
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
              onRemove={() => handleRemoveImage("flyer")}
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
                <>
                  <DatePicker
                    placeholder="Elija Fecha"
                    containerClassName="w-full"
                    inputClass="p-6 pr-20 w-full border-2 border-black rounded-md"
                    multiple
                    value={field.value || []}
                    onChange={(dates) => {
                      field.onChange(dates);
                    }}
                    format={dateFormat}
                  />

                  {/* Calendar Icon */}
                  <div className="absolute top-1/2 right-10 transform -translate-y-1/2 pointer-events-none">
                    <InputCalenderIcons />
                  </div>

                  {/* Reset/Clear Button */}
                  {field.value && field.value.length > 0 && (
                    <button
                      type="button"
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 focus:outline-none"
                      onClick={() => field.onChange([])}
                    >
                      <CircleX />
                    </button>
                  )}
                </>
              )}
            />
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
              value={
                dayjs(endTime).isValid()
                  ? dayjs(endTime)
                  : dayjs("00:00", "HH:mm")
              }
              placeholder="Hora Fin"
              onChange={handleEndTimeChange}
              format="HH:mm"
              size="large"
              className="p-6 pr-2 w-full border-2 border-black rounded-md"
              showNow={false}
            />
            <div className="absolute top-1/2 right-8 transform -translate-y-1/2 flex gap-2 items-center">
              <p className="px-3 py-2 bg-[#DDDDE3] text-[#029AFF] rounded-xl">
                {dayjs(endTime).isValid()
                  ? dayjs(endTime).format("HH:mm")
                  : "00:00"}
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
{/* // Replace your current Select component with this: */}
<Controller
  name="category_id"
  control={control}
  render={({ field }) => (
    <Select
      {...field}
      mode="multiple"
      placeholder="Categoría del Evento"
      tagRender={tagRender}
      options={category?.data?.map((category) => ({
        label: category?.category_name,
        value: category.id,
      }))}
      size="large"
      className="w-full custom-select"
      disabled={isSubmitting}
    />
  )}
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
              onRemove={() => handleRemoveImage("thumb")}
            >
              {fileList.length < 1 && <UploadIcons />}
            </Upload>

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
            className="bg-red-500 duration-300 hover:bg-red-600 text-white sm:px-6 px-3 py-2 rounded-[12px] text-sm lg:text-2xl font-bold"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-[#11D619] hover:bg-green-600 text-white font-semibold py-3 text-sm lg:text-2xl  px-11 rounded-[12px] transition duration-300 flex items-center justify-center gap-2 ${
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
