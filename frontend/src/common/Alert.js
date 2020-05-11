import Swal from 'sweetalert2';

const Alert = {
    // Warning alert
    warningAlert(title, time) {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: title,
            showConfirmButton: false,
            timer: time
        })
    },
    // Error Alert
    errorAlert(title, text) {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text
        })
    },
    // Success Alert
    succesAlert(title, time) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: title,
            showConfirmButton: false,
            timer: time
        })
    },
    confirmAlert(title, text, confirmButtonText, showCancelButton, confirmed, confirmedText) {
        Swal.fire({
            title: title != "" ? (title) : ("Are you sure?"),
            text: text != "" ? (text) : ("You won't be able to revert this!"),
            icon: 'warning',
            showCancelButton: showCancelButton != "" ? (showCancelButton) : ("Are you sure?"),
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmButtonText != "" ? (confirmButtonText) : ("You won't be able to revert this!")
        }).then((result) => {
            if (result.value) {
            }
        })
    }
}

export default Alert