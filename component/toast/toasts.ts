import { ToastPosition, toast } from "react-toastify";
import { toastErrorConfig, toastSuccessConfig } from "./toastConfig";


export const SuccessToast = (info: string = 'Success', pos: ToastPosition = 'top-center') => {
    toast(info, { ...toastSuccessConfig, position: pos });
}

export const ErrorToast = (info: string = 'Error Occurred', pos: ToastPosition = 'top-center') => {
    toast(info, { ...toastErrorConfig, position: pos });
}