const toastrOptions = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

const Login = (fd, btn) => {
    const url = `${RURL}Index`
    // Show loading indication
    btn.attr('data-kt-indicator', 'on');
    btn.attr('disabled', true);

    // Disable button to avoid multiple click 
    //btn.disabled = true;
    //btn.addClass('spinner spinner-right pr-12 spinner-sm spinner-white').attr('disabled', true);
    fetch(url, {
        method: 'POST',
        body: fd
    })
        .then(res => res.json())
        .then(data => {
            if (data === 1) {
                toastr.success('Acceso exitoso', 'Bienvenido', toastrOptions)
                btn.removeAttr('data-kt-indicator');
                btn.attr('disabled', false);
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            } else if (data === 2) {
                toastr.warning('Usuario o contraseña invalido', 'Alerta', toastrOptions)
                btn.removeAttr('data-kt-indicator');
                btn.attr('disabled', false);
            } else if (data === 3) {
                toastr.warning('El usuario no tiene permisos en esta compañía', 'Alerta', toastrOptions)
                btn.removeAttr('data-kt-indicator');
                btn.attr('disabled', false);
            } else if (data === 4) {
                toastr.warning('El usuario no está activo en el sistema', 'Alerta', toastrOptions)
                btn.removeAttr('data-kt-indicator');
                btn.attr('disabled', false);
            } else if (data === 5) {
                toastr.error('No tiene una licencia del sistema válida', 'Error', toastrOptions)
                btn.removeAttr('data-kt-indicator');
                btn.attr('disabled', false);
            } else if (data === 6) {
                toastr.warning('Error al leer la licencia', 'Alerta', toastrOptions)
                btn.removeAttr('data-kt-indicator');
                btn.attr('disabled', false);
            } else if (data === 7) {
                toastr.error('La licencia del sistema ha caducado, contacte con Produsoft', 'Error', toastrOptions)
                btn.removeAttr('data-kt-indicator');
                btn.attr('disabled', false);
            } else if (data === 8) {
                toastr.warning('El usuario cuenta con un rol sin permisos', 'Alerta', toastrOptions)
                btn.removeAttr('data-kt-indicator');
                btn.attr('disabled', false);
            }
        }).catch(err => {
            toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
            btn.removeAttr('data-kt-indicator');
            btn.attr('disabled', false);
            console.error(err)
        })
}

function mostrarToast(tipo, texto) {

    const toast = bootstrap.Toast.getOrCreateInstance($("#kt_docs_toast_toggle"));
    $("#toasttype").text(tipo)
    $("#toasttext").text(texto)
    toast.show();
}
const HandleFormSubmits = () => {
    $('#kt_sign_in_submit').click((e) => {
        e.preventDefault()
        const btn = $('#kt_sign_in_submit')
        const form = document.querySelector('#login-form')
        let fd = new FormData(form)
        if (fd.get('usuario') == '') {

            //mostrarToast('Alerta', 'Debe ingresar su usuario')
            toastr.warning('Debe ingresar su usuario', 'Alerta', toastrOptions)
        } else if (fd.get('contrasena') == '') {

            //mostrarToast('Alerta', 'Debe ingresar su contraseña')
            toastr.warning('Debe ingresar su contraseña', 'Alerta', toastrOptions)
        } else if (fd.get('cia') == '') {
            //mostrarToast('Alerta', 'Debe seleccionar una compañía')
            toastr.warning('Debe seleccionar una compañía', 'Alerta', toastrOptions)
        } else {
            Login(fd, btn)
        }
    })
}

function registrar() {

    $('#login-signin').addClass("d-none")
    $('#register-confirm').addClass("d-none")
    $('#login-signup').removeClass("d-none")
    $('#login-signup').addClass("d-flex")
    $('#tipoide').select2({
        placeholder: "Seleccione un tipo",
    })
};

function forgot() {

    $('#login-signin').addClass("d-none")
    $('#login-signup').addClass("d-none")
    $('#register-confirm').removeClass("d-none")
    $('#register-confirm').addClass("d-flex")
};

function reg() {
    toastr.success(`Usuario registrado con éxito`, "Éxito", toastrOptions)
    setTimeout(() => { window.location.reload(); }, 3000)
};
function send() {
    toastr.success(`Se ha enviado el correo con éxito`, "Éxito", toastrOptions)
    setTimeout(() => { window.location.reload(); }, 3000)
};

var vercontra = false
$('#basic-addon2').click((e) => {
    e.preventDefault()
    if (!vercontra) {
        vercontra = true;
        $("#icono").removeClass("la-eye-slash")
        $("#icono").addClass("la-eye")
        $("#password").attr("type", "text")
    } else {
        vercontra = false;

        $("#icono").removeClass("la-eye")
        $("#icono").addClass("la-eye-slash")
        $("#password").attr("type", "password")
    }
})
$(document).ready(() => {
    $('#CIA').select2({
        placeholder: "Seleccione una compañía",
    })
    HandleFormSubmits()
})