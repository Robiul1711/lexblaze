import { useForm } from "react-hook-form";
import { useState } from "react";
import Title48 from "@/components/common/Title48";
import { Switch, Upload, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
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
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const password = watch("password");

  const [fileList, setFileList] = useState([]);

  const RegistrationMutation = useMutation({
    mutationFn: async (data) => {
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
    },
  });

  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setValue("image", newFileList);
  };

  const onSubmit = (formData) => {
    console.log("Form Data:", formData);
    const { image, ...restData } = formData;

    // Prepare the complete data object
    const submissionData = {
      ...restData,
      image: fileList.map((file) => file.originFileObj),
      showPhone: formData.showPhone || false,
      showEmail: formData.showEmail || false,
    };

    console.log("All form data:", submissionData);
    RegistrationMutation.mutate(submissionData);
  };
  console.log(user);
  return (
    <div className="max-w-[650px] mx-auto  mt-8 pb-[120px] lg:pb-[150px] px-4">
      <div className="mb-10 lg:mb-8">
        <Title48 title2=" Actualizar Perfil de Negocio" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 "
      >
        {/* Business Name */}
        <div>
          <input
           defaultValue={user?.user?.business_name}
            type="text"
            placeholder="Nombre del Negocio"
            {...register("business_name", )}
            className="w-full border-[2px] border-black p-4 lg:p-6"
          />
   
        </div>

        {/* Business Description */}
        <div>
          <textarea
            defaultValue={user?.user?.business_details}
            placeholder="Descripción del Negocio"
            {...register("business_details",)}
            className="w-full border-[2px] border-black p-4 lg:p-6 h-[136px] md:h-[160px] lg:h-[200px]"
          />
      
        </div>

        {/* Address */}
        <div>
          <input
            defaultValue={user?.user?.business_address}
            type="text"
            placeholder="Dirección del Negocio"
            {...register("business_address", )}
            className="w-full border-[2px] border-black p-4 lg:p-6"
          />
       
        </div>

        {/* Schedule */}
        <div>
          <input
            defaultValue={user?.user?.business_time}
            type="text"
            placeholder="Horario Comercial (ej. Lun - Sab: 1100-0200, Dom: 1200-1700)"
            {...register("business_time",)}
            className="w-full border-[2px] border-black p-4 lg:p-6"
          />
          
        </div>

        {/* Website */}
        <input
          defaultValue={user?.user?.business_website_link}
          type="text"
          placeholder="Website link"
          {...register("business_website_link")}
          className="w-full border-[2px] border-black p-4 lg:p-6"
        />

        {/* Age Limit */}
        <input
          defaultValue={user?.user?.edad}
          type="text"
          placeholder="Límite de Edad"
          {...register("edad")}
          className="w-full border-[2px] border-black p-4 lg:p-6"
        />

        {/* Menu */}
        <input
          defaultValue={user?.user?.business_food_menu}
          type="text"
          placeholder="La Carta (Menú)"
          {...register("business_food_menu")}
          className="w-full border-[2px] border-black p-4 lg:p-6"
        />

        {/* Phone */}
        <input
          defaultValue={user?.user?.phone}
          type="text"
          placeholder="Teléfono"
          {...register("phone")}
          className="w-full border-[2px] border-black p-4 lg:p-6"
        />

        {/* Show Phone */}
        <div className="flex items-center justify-between font-bold lg:text-2xl">
          <label>*Mostrar Teléfono en el perfil</label>
          <Switch

            {...register("showPhone")}
            className="
            [&:not(.ant-switch-checked)]:!bg-gray-400
            [&:not(.ant-switch-checked):hover]:!bg-gray-500
            [&.ant-switch-checked]:!bg-black
            [&.ant-switch-disabled]:!opacity-50"
          />
        </div>

        {/* Email */}
        <div>
          <input
            defaultValue={user?.user?.email}
            disabled
            type="email"
            placeholder="Correo Electrónico"
            {...register("email", {
             
            })}
            className="w-full border-[2px] border-black p-4 lg:p-6"
          />
         
        </div>

        {/* Show Email */}
        <div className="flex items-center justify-between font-bold lg:text-2xl">
          <label>*Mostrar Correo en el perfil</label>
          <Switch
      
            {...register("showEmail")}
            className="
            [&:not(.ant-switch-checked)]:!bg-gray-400
            [&:not(.ant-switch-checked):hover]:!bg-gray-500
            [&.ant-switch-checked]:!bg-black
            [&.ant-switch-disabled]:!opacity-50"
          />
        </div>

        {/* Password */}
        {/* <div>
          <input
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: "Contraseña es requerida" })}
            className="w-full border-[2px] border-black p-4 lg:p-6"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div> */}
        
        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            {...register("password",)}
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

        {/* Confirm Password */}
        {/* <div>
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            {...register("password_confirmation", {
              required: "Confirmación de contraseña es requerida",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
            className="w-full border-[2px] border-black p-4 lg:p-6"
          />
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm">
              {errors.password_confirmation.message}
            </p>
          )}
        </div> */}
                <div className=" relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmar Contraseña"
            {...register("password_confirmation", {
                          validate: (value) =>
                value === password || "Las contraseñas no coinciden",
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
            beforeUpload={() => false} // Handle upload manually
            accept="image/*"
            multiple
            maxCount={5}
          >
            {fileList.length < 5 && <UploadIcons />}
          </Upload>
        </div>

        {/* Terms */}
        <div className="flex flex-col items-center gap-6 font-bold lg:text-2xl">
          <input
            className="size-5 md:size-6 lg:size-7"
            type="checkbox"
            {...register("terms", )}
          />
        
        </div>

        {/* Submit */}
        <div className="flex items-start justify-center gap-5 lg:mt-6">
          <button onClick={() => navigate(-1)} className="bg-[#FF0000] hover:bg-red-600 text-white font-semibold py-3 px-11 rounded-[20px]">Cancle</button>
            <button
            type="submit"
            disabled={RegistrationMutation.isPending}
            className={`bg-[#11D619] hover:bg-green-600 text-white font-semibold py-3 px-11 md:px-xl  rounded-xl lg:rounded-[20px] transition-all duration-200
    ${RegistrationMutation.isPending ? "opacity-60 cursor-not-allowed" : ""}
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
                Updating...
              </span>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
