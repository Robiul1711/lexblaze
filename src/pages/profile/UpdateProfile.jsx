import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Title48 from "@/components/common/Title48";
import { Switch, Upload, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import toast from "react-hot-toast";
import ImgCrop from "antd-img-crop";
import { UploadIcons } from "@/lib/Icons";
import { useAuth } from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const UpdateProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const password = watch("password");

  const [fileList, setFileList] = useState([]);
  const { data, isLoading, error } = useQuery({
    queryKey: ["profileData"],
    queryFn: async () => {
      const response = await axiosSecure.get("/business_profile_data");
      return response.data;
    },
  });

  // Initialize fileList with existing images when data is loaded
  useEffect(() => {
    if (data?.user?.user_images) {
      const initialFiles = data.user.user_images.map((image) => ({
        uid: image.id.toString(),
        name: image.image.split("/").pop(),
        status: "done",
        url: image.image,
      }));
      setFileList(initialFiles);
    }
  }, [data]);

  const RegistrationMutation = useMutation({
    mutationFn: async (data) => {
      console.log(data);
      const response = await axiosSecure.post(
        "/update/business_profile_data",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        
        }
      );
      return response.data;
    },
    onSuccess: (response) => {
      navigate("/venue-profile-edit");
      toast.success(response?.message);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error ||
        "Something went wrong, try again later!!";
      toast.error(errorMessage);
      console.log("RegistrationMutation error:", error);
      
    },
  });

  const handleImageChange = ({ fileList: newFileList }) => {
    const updatedList = newFileList.map((file) => {
      if (file.originFileObj && !file.url && !file.preview) {
        file.preview = URL.createObjectURL(file.originFileObj);
      }
      return file;
    });
    setFileList(updatedList);
    setValue("image", updatedList);
  };

  const onPreview = async (file) => {
    let src = file.url || file.preview;
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
    console.log(formData);
    const { image, ...restData } = formData;

    // Prepare the complete data object
    const submissionData = {
      ...restData,
      image: fileList
        .filter((file) => file.originFileObj) // Only include newly uploaded files
        .map((file) => file.originFileObj),
      showPhone: formData.showPhone || false,
      showEmail: formData.showEmail || false,
    };

    RegistrationMutation.mutate(submissionData);
  };

  useEffect(() => {
    if (data?.user) {
      setValue("isShowPhone", data.user.isShowPhone === "true" ? "0" : "1");
      setValue("isShowEmail", data.user.isShowEmail === "true" ? "0" : "1");
      // Set other form values
      setValue("business_name", data.user.business_name);
      setValue("business_details", data.user.business_details);
      setValue("business_address", data.user.business_address);
      setValue("business_time", data.user.business_time);
      setValue("business_website_link", data.user.business_website_link);
      setValue("age", data.user.age);
      setValue("business_food_menu", data.user.business_food_menu);
      setValue("phone", data.user.phone);
    }
  }, [data, setValue]);

  return (
    <div className="max-w-[650px] mx-auto  mt-8 pb-[120px] lg:pb-[150px] px-4">
      <div className="mb-10 lg:mb-8">
        <Title48 title2=" Actualizar Perfil de Negocio" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
        {/* Business Name */}
        <div>
          <input
            type="text"
            placeholder="Nombre del Negocio"
            {...register("business_name", {
              required: "Este campo es Obligatorio",
            })}
            className="w-full border-[2px] border-black p-4 lg:p-6"
          />
          {errors.business_name && (
            <p className="text-red-500 text-sm">
              {errors.business_name.message}
            </p>
          )}
        </div>

        {/* Business Description */}
        <div>
          <textarea
            placeholder="Descripción del Negocio"
            {...register("business_details", {
              required: "Este campo es Obligatorio",
            })}
            className="w-full border-[2px] border-black p-4 lg:p-6 h-[136px] md:h-[160px] lg:h-[200px]"
          />
          {errors.business_details && (
            <p className="text-red-500 text-sm">
              {errors.business_details.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <input
            type="text"
            placeholder="Dirección del Negocio"
            {...register("business_address")}
            className="w-full border-[2px] border-black p-4 lg:p-6"
          />
        </div>

        {/* Schedule */}
        <div>
          <input
            type="text"
            placeholder="Horario Comercial (ej. Lun - Sab: 1100-0200, Dom: 1200-1700)"
            {...register("business_time")}
            className="w-full border-[2px] border-black p-4 lg:p-6"
          />
        </div>

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
            defaultValue={user?.user?.email}
            disabled
            type="email"
            placeholder="Correo Electrónico"
            {...register("email", {})}
            className="w-full border-[2px] border-black p-4 lg:p-6"
          />
        </div>

        {/* Show Email */}
        <div className="flex items-center justify-between font-bold lg:text-2xl">
          <label>*Mostrar Correo en el perfil</label>
          <Controller
            name="isShowEmail"
            control={control}
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
            {...register("password")}
            className="w-full border-[2px] border-[#000] p-4 lg:p-6 rounded-sm outline-none placeholder:text-gray-500 pr-12"
          />
          {/* Toggle Button */}
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
        </div>

        <div className=" relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmar Contraseña"
            {...register("password_confirmation", {
              validate: (value) =>
                !password ||
                value === password ||
                "Las contraseñas no coinciden",
            })}
            className="w-full border-[2px] border-black p-4 lg:p-6"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {showConfirmPassword ? (
              <EyeOffIcon size={20} />
            ) : (
              <EyeIcon size={20} />
            )}
          </button>
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

        </div>
        <p className="text-red-600 text-center text-xs">
          Si desea actualizar las imágenes, elimine todas las imágenes y
          actualícelas nuevamente.
        </p>
        {/* Submit */}
        <div className="flex items-start justify-center gap-5 lg:mt-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-[#FF0000] hover:bg-red-600 text-white font-semibold py-3 px-11 rounded-[12px]"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={RegistrationMutation.isPending}
            className={`bg-[#11D619] hover:bg-green-600 text-white font-semibold py-3 px-11 md:px-xl  rounded-xl lg:rounded-[12px] transition-all duration-200
              ${
                RegistrationMutation.isPending
                  ? "opacity-60 cursor-not-allowed"
                  : ""
              }
            `}
          >
            {RegistrationMutation.isPending ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
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
                Actualizando...
              </span>
            ) : (
              "Actualizar"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
