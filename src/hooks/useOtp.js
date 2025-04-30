import { OtpContext } from "@/context";
import { useContext } from "react";

export const useOtp = () => {
    return useContext(OtpContext);
}