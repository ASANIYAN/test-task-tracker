import { AiFillExclamationCircle } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';

export const toastSuccessConfig = {
  icon: <BsFillCheckCircleFill size={30} className='text-green-400' />,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  hideProgressBar: true,
  autoClose: 2000,
};

export const toastErrorConfig = {
  icon:<AiFillExclamationCircle size={30} className='text-red-700'/>,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  hideProgressBar: true,
  autoClose: 2000,
};