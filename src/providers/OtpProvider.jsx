import { OtpContext } from "@/context";
import { useState } from "react";

const OtpProvider = ({children}) => {
    const [otp, setOtp] = useState("");
    // const [resetToken, setResetToken] = useState("")
    return(
        <OtpContext.Provider value={{otp, setOtp}}>
            {children}
        </OtpContext.Provider>
    )
}

export default OtpProvider;