import Swal from "sweetalert2";
import "../App.css";

// Regex for Email Address.
export const emailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Regex for Name.
export const noSpeacialCharRegx = /^[A-Za-z.]+$/i;

// Regex for Password.
export const passwordRegx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/;

export const toast = (msg, type) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end", // 'top-end', 'top-start', 'bottom-end', 'bottom-start', 'top', 'bottom', 'center'
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    customClass: {
      container: 'custom-toast-container'
    }
  });
  Toast.fire({
    icon: type,
    title: msg,
  });
};

export const confirmToast = (msg) => {
  const Toast = Swal.fire({
    title: "Are you sure?",
    text: msg,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes!"
  }).then((result) => {
    if (result.isConfirmed) {
      return true;
    } else {
      return false;
    }
  });
  return Toast;
};