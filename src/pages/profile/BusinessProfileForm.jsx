import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import Title48 from "@/components/common/Title48";
import { Switch, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import toast from "react-hot-toast";
// import ImgCrop from "antd-img-crop";
import { UploadIcons } from "@/lib/Icons";
import { useAuth } from "@/hooks/useAuth";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const BusinessProfileForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm();

  const password = watch("password");
  const [fileList, setFileList] = useState([]);

  const RegistrationMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosPublic.post("/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response?.message);
      setUser(response);
      navigate("/venue-profile-edit");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error || "Something went wrong, try again later!!";
      toast.error(errorMessage);
    },
  });

  const handleImageChange = ({ fileList: newFileList }) => {
    const updatedList = newFileList.map((file) => {
      if (!file.url && !file.preview) {
        file.preview = URL.createObjectURL(file.originFileObj);
      }
      return file;
    });
    setFileList(updatedList);
    setValue("image", updatedList);
    if (updatedList.length > 0) clearErrors("image");
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onSubmit = (formData) => {
    if (fileList.length === 0) {
      setError("image", {
        type: "manual",
        message: "Sube las imágenes una por una",
      });
      return;
    }

    const submissionData = {
      ...formData,
      image: fileList.map((file) => file.originFileObj),
      showPhone: formData.showPhone || false,
      showEmail: formData.showEmail || false,
    };

    RegistrationMutation.mutate(submissionData);
  };

  return (
    <div className="max-w-[590px] mx-auto mt-5 lg:mt-10 pb-[70px] sm:pb-[100px] lg:pb-[150px] px-4">
      <div className="mb-4">
        <Title48 title2="Crear Perfil de Negocio" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Business Name */}
        <div>
          <input
            type="text"
            placeholder="Nombre del Establecimiento"
            {...register("business_name", {
              required: "Este campo es Obligatorio",
            })}
            className="w-full border-[2px] border-black p-4 lg:p-6"
          />
          {errors.business_name && (
            <p className="text-red-500 text-sm">{errors.business_name.message}</p>
          )}
        </div>

        {/* Business Description */}
        <div>
          <textarea
            placeholder="Descripción del Negocio"
            {...register("business_details", {
              required: "Este campo es Obligatorio",
            })}
            className="w-full border-[2px] border-black p-4 lg:p-6 h-[160px] lg:h-[200px]"
          />
          {errors.business_details && (
            <p className="text-red-500 text-sm">{errors.business_details.message}</p>
          )}
        </div>

        {/* Address */}
        <input
          type="text"
          placeholder="Dirección del Negocio"
          {...register("business_address")}
          className="w-full border-[2px] border-black p-4 lg:p-6"
        />

        {/* Schedule */}
        <input
          type="text"
          placeholder="Horario Comercial (ej. Lun - Sab: 1100-0200, Dom: 1200-1700)"
          {...register("business_time")}
          className="w-full border-[2px] border-black p-4 lg:p-6"
        />

        {/* Website */}
        <input
          type="text"
          placeholder="Website link"
          {...register("business_website_link")}
          className="w-full border-[2px] border-black p-4 lg:p-6"
        />

        {/* Age Limit */}
        <input
          type="text"
          placeholder="Límite de Edad"
          {...register("age")}
          className="w-full border-[2px] border-black p-4 lg:p-6"
        />

        {/* Menu */}
        <input
          type="text"
          placeholder="La Carta (Menú)"
          {...register("business_food_menu")}
          className="w-full border-[2px] border-black p-4 lg:p-6"
        />

        {/* Phone */}
        <input
          type="text"
          placeholder="Teléfono"
          {...register("phone")}
          className="w-full border-[2px] border-black p-4 lg:p-6"
        />

        {/* Show Phone */}
        <div className="flex items-center justify-between font-bold lg:text-2xl">
          <label>*Mostrar Teléfono en el perfil</label>
          <Controller
            name="isShowPhone"
            control={control}
            defaultValue="0"
            render={({ field: { value, onChange } }) => (
              <Switch
                checked={value === "0"}
                onChange={(checked) => onChange(checked ? "0" : "1")}
              />
            )}
          />
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Correo Electrónico"
            {...register("email", {
              required: "Correo electrónico es Obligatorio",
            })}
            className="w-full border-[2px] border-black p-4 lg:p-6"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Show Email */}
        <div className="flex items-center justify-between font-bold lg:text-2xl">
          <label>*Mostrar Correo en el perfil</label>
          <Controller
            name="isShowEmail"
            control={control}
            defaultValue="0"
            render={({ field: { value, onChange } }) => (
              <Switch
                checked={value === "0"}
                onChange={(checked) => onChange(checked ? "0" : "1")}
              />
            )}
          />
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            {...register("password", {
              required: "Contraseña es Obligatorio",
            })}
            className="w-full border-[2px] border-black p-4 lg:p-6 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmar Contraseña"
            {...register("password_confirmation", {
              required: "Confirmación de contraseña es Obligatorio",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
            className="w-full border-[2px] border-black p-4 lg:p-6 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div className="flex flex-col items-center gap-2 mt-6">
         <Upload
  listType="picture-card"
  fileList={fileList}
  onChange={handleImageChange}
  onPreview={onPreview}
  beforeUpload={() => false}
  accept="image/*"
  multiple
  maxCount={5}
  itemRender={(originNode, file, fileList) => {
    const index = fileList.indexOf(file);
    return (
      <div className="relative group">
        {originNode}
        <div className="absolute top-1 left-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center z-10">
          {index + 1}
        </div>
      </div>
    );
  }}
>
  {fileList.length < 5 && <UploadIcons />}
</Upload>

          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Submit */}
        <div className="flex flex-col items-center gap-2 lg:mt-6">
          <button
            type="submit"
            disabled={RegistrationMutation.isPending}
            className={`bg-[#11D619] hover:bg-green-600 text-white font-semibold py-3 px-14 lg:text-3xl rounded-xl lg:rounded-[12px] transition-all duration-200 ${
              RegistrationMutation.isPending ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {RegistrationMutation.isPending ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Creando...
              </span>
            ) : (
              "Crear Cuenta"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessProfileForm;
