import { Controller, useForm } from "react-hook-form";
import { useState, useRef, useCallback, useEffect } from "react";
import Title48 from "@/components/common/Title48";
import { InputCalenderIcons, UploadIcons } from "@/lib/Icons";
import { Select, Tag, TimePicker, Upload, Modal } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import InstuctionModal from "@/components/common/InstuctionModal";
import InstructionModal2 from "@/components/common/InstructionModal2";
import DatePicker from "react-multi-date-picker";
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { canvasPreview } from './canvasPreview';
import { CircleX } from "lucide-react";

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

function centerAspectCrop(
  mediaWidth,
  mediaHeight,
  aspect,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

const CreateEvents = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    trigger,
  } = useForm();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState("");
  const [cropModalVisible, setCropModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageType, setCurrentImageType] = useState(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [aspect, setAspect] = useState(16 / 9);

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
    let hasError = false;

    // Only check for flyer image (fileList2) as required
    if (fileList2.length === 0) {
      setImageError("Se requiere una imagen para el evento.");
      hasError = true;
    } else {
      setImageError("");
    }

    if (!data.category_id || data.category_id.length === 0) {
      toast.error("Please select at least one category");
      hasError = true;
    }

    const valid = await trigger(["event_date", "event_start_time"]);
    if (!valid || hasError) {
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);

    const updatedData = {
      ...data,
      event_date: data?.event_date?.map(
        (date) =>
          `${date.year}-${String(date.month.number).padStart(2, "0")}-${String(
            date.day
          ).padStart(2, "0")}`
      ),
      event_start_time: dayjs(startTime).format("HH:mm"),
      event_end_time: dayjs(endTime).format("HH:mm"),
      event_thumb_image: fileList.length > 0 ? fileList[0]?.originFileObj : null,
      flyer: fileList2[0]?.originFileObj, // This is required
    };

    createEventMutation.mutate(updatedData);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
    setValue("event_start_time", time);
    trigger("event_start_time");
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
    setValue("event_end_time", time);
  };

  const handleImageChange = ({ fileList: newFileList }, type) => {
    if (newFileList.length > 0 && newFileList.length > (type === 'flyer' ? fileList2.length : fileList.length)) {
      const file = newFileList[newFileList.length - 1];
      if (file.originFileObj) {
        const reader = new FileReader();
        reader.onload = () => {
          setCurrentImage(reader.result);
          setCurrentImageType(type);
          setCropModalVisible(true);
        };
        reader.readAsDataURL(file.originFileObj);
      }
    } else {
      // Handle image removal
      if (type === 'flyer') {
        setFileList2(newFileList);
      } else {
        setFileList(newFileList);
      }
    }
  };

  const handleImageChangeflayer = ({ fileList: newFileList }) => {
    handleImageChange({ fileList: newFileList }, 'flyer');
  };

  const handleThumbImageChange = ({ fileList: newFileList }) => {
    handleImageChange({ fileList: newFileList }, 'thumb');
  };

  const handleRemoveImage = (type) => {
    if (type === 'flyer') {
      setFileList2([]);
      setImageError("Se requiere una imagen para el evento.");
    } else {
      setFileList([]);
    }
  };

  const handleCategoryChange = (selectedOptions) => {
    setValue("category_id", selectedOptions);
    trigger("category_id");
  };

  const handleCancel = () => {
    const confirmed = window.confirm("Are you sure you want to cancel?");
    if (confirmed) {
      navigate(-1);
    }
  };

  const onImageLoad = (e) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  const handleCropComplete = useCallback(async () => {
    try {
      if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
        const canvas = document.createElement('canvas');
        await canvasPreview(
          imgRef.current,
          canvas,
          completedCrop,
          1,
          0,
          true
        );

        return new Promise((resolve) => {
          canvas.toBlob((blob) => {
            if (!blob) {
              throw new Error('Failed to create blob');
            }
            const fileUrl = URL.createObjectURL(blob);
            const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
            resolve({ blob, fileUrl, file });
          }, 'image/jpeg', 1);
        });
      }
    } catch (error) {
      console.error('Error cropping image:', error);
      toast.error('Error cropping image. Please try again.');
    }
  }, [completedCrop]);

  const handleCropConfirm = async () => {
    try {
      const { file } = await handleCropComplete();
      
      const croppedFile = {
        uid: '-1',
        name: 'cropped-image.jpg',
        status: 'done',
        url: URL.createObjectURL(file),
        originFileObj: file,
      };

      if (currentImageType === 'flyer') {
        setFileList2([croppedFile]);
        setImageError("");
      } else {
        setFileList([croppedFile]);
      }
      setCropModalVisible(false);
    } catch (error) {
      console.error('Error confirming crop:', error);
      toast.error('Failed to crop image. Please try again.');
    }
  };

  useEffect(() => {
    if (cropModalVisible && imgRef.current && completedCrop) {
      const canvas = document.createElement('canvas');
      canvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        completedCrop,
        1,
        0,
        true
      );
    }
  }, [cropModalVisible, completedCrop]);

  return (
    <div className="max-w-[590px] mx-auto mt-5 pb-[120px] lg:pb-[150px] px-4">
      <div className="mb-6 lg:mb-5 text-center">
        <Title48 title2="Crear un Evento" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 lg:space-y-5"
      >
        {/* Flyer Upload - REQUIRED */}
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
          {imageError && <p className="text-red-500">{imageError}</p>}
          <p className="bg-[#000e8e] text-white sm:px-5 px-3 py-2 rounded-md text-lg font-bold mt-4">
            Carga Imagen de Fondo (Requerido)
          </p>
        </div>

        {/* Date */}
        <div className="mt-4">
          <h1 className="text-2xl md:text-[32px] font-bold">Elija Fecha</h1>
          <InstuctionModal />
          <Controller
            name="event_date"
            control={control}
            rules={{ required: "La fecha es obligatoria." }}
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
                placeholder="Compañía/Promotor"
                {...register("business_name", {
                  required: "Company name is required",
                })}
                className="w-full border-2 border-black p-4 lg:p-6 rounded-md"
                disabled={isSubmitting}
              />
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
          <Controller
            name="category_id"
            control={control}
            rules={{ required: "Please select at least one category" }}
            render={({ field }) => (
              <Select
                mode="multiple"
                placeholder="Categoría del Evento"
                tagRender={tagRender}
                options={categoryOptions}
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

        {/* Thumbnail Image Upload - OPTIONAL */}
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
            className={`bg-[#11D619] hover:bg-green-600 text-white font-semibold py-1 xlg:py-3 text-2xl px-11 rounded-[12px] transition duration-300 flex items-center justify-center gap-2 ${
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
        className="bg-red-500 mx-auto mt-5 sm:mt-8 text-center cursor-pointer w-[120px] duration-300 hover:bg-red-600 text-white sm:px-6 px-3 py-2 rounded-[12px] text-sm lg:text-2xl font-bold"
      >
        Cancle
      </div>

      {/* Image Crop Modal */}
      <Modal
        title="Crop Image"
        open={cropModalVisible}
        onOk={handleCropConfirm}
        onCancel={() => setCropModalVisible(false)}
        okText="Crop"
        cancelText="Cancel"
        width={800}
      >
        <div className="flex flex-col items-center">
          {currentImage && (
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
            >
              <img
                ref={imgRef}
                src={currentImage}
                onLoad={onImageLoad}
                alt="Crop preview"
                style={{ maxWidth: '100%', maxHeight: '400px' }}
              />
            </ReactCrop>
          )}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Preview</h3>
            <canvas
              ref={previewCanvasRef}
              style={{
                border: '1px solid black',
                objectFit: 'contain',
                width: '100%',
                maxHeight: '200px',
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateEvents;