import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToastSuccess = (text: string) => {
  toast.success(text, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: 'success',
  });
};

const showToastError = (text: string) => {
  toast.error(text, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: 'error',
    closeButton: true,
  });
};

export default {
  showToastSuccess,
  showToastError,
};
