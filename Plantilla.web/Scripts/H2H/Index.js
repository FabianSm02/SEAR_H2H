var documentosParaBatch = []

var KTDatatablesServerSide = function () {
    // Shared variables
    var table;
    var dt;
    var filterPayment;

    // Private functions
    var initDatatable = function () {
        dt = $("#miTabla").DataTable({
            searchDelay: 500,
            processing: true,
            stateSave: false,
            scrollX: true,
            //data: requisiciones,
            responsive: false,
            pageLength: 100,

            //serverSide: true,
            language: {
                lengthMenu: "Mostrando _MENU_ registros por página",
                zeroRecords: "No se encontraron registros",
                info: "Mostrando página _PAGE_ de _PAGES_",
                infoEmpty: "No se encontraron registros",
                infoFiltered: "(de un total de _MAX_ registros)"
            },
            ajax: {
                url: `${H2H_URL}/ObtenerPagos`,
                dataSrc: "",
                contentType: 'application/json',
                data: {
                    fechaInicio: $('#rangoFechas').val().split(' - ')[0].split('/').reverse().join('-'),
                    fechaFin: $('#rangoFechas').val().split(' - ')[1].split('/').reverse().join('-'),
                    cuenta: $('#cuenta').val(),
                    transferencia: $('#transferencia').val(),
                    proveedor: $('#proveedor').val()
                }
            },
            columns: [
                { "data": "LINEA",
                    "defaultContent": `` },
                { "data": null,
                    "defaultContent": `<a href="javascript:;"><i class="fa fa-caret-right verSubtabla" style="width: 10px;"></i></a>` },
                { "data": "TRANSFERENCIA", },
                { "data": "U_PS_H2H_NUM_BANCO", },
                { "data": "FECHA_STR", },
                { "data": "PROVEEDOR_COMPLETO", },
                { "data": "DETALLE", },
                { "data": "CUENTA_BANCO_DESC" },
            /*    { "data": "CUENTA" },*/
                { "data": "MONEDA", },
                { "data": "MONTO_STR" },
                { "data": "H2H_ENVIADO" },
                { "data": "U_PS_H2H_EMAIL_ENVIADO" },
                //{ "data": "APROBADOR_GERENCIAL_USUARIO" },
                //{ "data": "APROBADOR_FINANCIERO_USUARIO" },
                //{ "data": "ESTADO" },
                //{ "data": "CREADOR" },
                { "data": null, },
            ],
            columnDefs: [
                //{
                //    targets: [1, 5],
                //    responsivePriority: 1,
                //    visible: false
                //},
                {
                    targets: 0,
                    orderable: false,
                    render: function (data, type, row) {
                        return `
                            <div class="form-check form-check-sm form-check-custom form-check-solid">
                                <input class="form-check-input" type="checkbox" value="${row.TRANSFERENCIA}" />
                            </div>`;
                    }
                },
                
                {
                    targets: 9,
                    orderable: false,
                    visible: true,
                    render: function (data, type, row) {
                        if (row.MONEDA == 'USD') {
                            return '$ ' + `${row.MONTO_STR}`
                        }
                        else {
                            return '₡ ' + `${row.MONTO_STR}`
                        }


                    }
                },
                //{
                //    targets: 9,
                //    orderable: false,
                //    visible: true,
                //    render: function (data, type, row) {
                //        if (row.APROBADOR_FINANCIERO_USUARIO == row.USUARIO_APROBADOR) {
                //            return `<span class="text-success">${row.APROBADOR_FINANCIERO_USUARIO}</span>`
                //        }
                //        else {
                //            return `<span>${row.APROBADOR_FINANCIERO_USUARIO}</span>`
                //        }


                //    }
                //},
                //{
                //    targets: 10,
                //    orderable: false,
                //    visible: true,
                //    render: function (data, type, row) {
                //        return `<span class="badge ${ESTADO[row.ESTADO].class} badge-lg">${ESTADO[row.ESTADO].titulo}</span>`;
                        
                //    }
                //},
                {
                    targets: 10,
                    orderable: false,
                    visible: true,
                    render: function (data, type, row) {
                        if (row.H2H_ENVIADO == 'S') {
                            return `<i class="las la-check fs-2 text-success"></i>`
                        } else {
                            return `<i class="las la-times-circle fs-2 text-danger"></i>`
                        }



                    }
                },
                {
                    targets: 11,
                    orderable: false,
                    visible: true,
                    render: function (data, type, row) {
                        if (row.U_PS_H2H_EMAIL_ENVIADO == 'S') {
                            return `<i class="las la-check fs-2 text-success"></i>`
                        } else {
                            return `<i class="las la-times-circle fs-2 text-danger"></i>`
                        }



                    }
                },
                {
                    targets: 12,
                    orderable: false,
                    render: function (data, type, row) {
                        let btns = ``
                        if (H2H == 1) {
                            btns += `<a href="javascript:;" onclick="EnviarCorreoXDebito('${row.TRANSFERENCIA}','${row.CORREO_PROVEEDOR}')"  class="btn btn-sm btn-clean btn-icon me-2" title="Enviar TEF por correo a todos los proveedores de esta TEF">
                                        <span class="svg-icon svg-icon-primary svg-icon-2x">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.3" d="M21 18H3C2.4 18 2 17.6 2 17V7C2 6.4 2.4 6 3 6H21C21.6 6 22 6.4 22 7V17C22 17.6 21.6 18 21 18Z" fill="currentColor"/>
                                                <path d="M11.4 13.5C11.8 13.8 12.3 13.8 12.6 13.5L21.6 6.30005C21.4 6.10005 21.2 6 20.9 6H2.99998C2.69998 6 2.49999 6.10005 2.29999 6.30005L11.4 13.5Z" fill="currentColor"/>
                                            </svg>
                                        </span>
                                        </a>
                                     `}
                        return btns;


                    }
                },
                {
                    //targets: [2], // el índice de la columna que deseamos ocultar
                    visible: false, // ocultar la columna en vista web
                    responsivePriority: 1 // dar prioridad 1 a la ocultación en vista móvil
                }

            ],
            // Add data-filter attribute
            //createdRow: function (row, data, dataIndex) {
            //    $(row).find('td:eq(4)').attr('data-filter', data.CreditCardType);
            //}
        });
        table = dt.$;

        // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
        dt.on('draw', function () {
            //initToggleToolbar();
            //toggleToolbars();
            //handleDeleteRows();
            //KTMenu.createInstances();
            const container = document.querySelector('#miTabla');
            const checkboxes = container.querySelectorAll('[type="checkbox"]');
            // Toggle delete selected toolbar
            checkboxes.forEach(c => {
                // Checkbox on click event
                c.addEventListener('click', function () {
                    setTimeout(function () {
                        ManejarCantidadCheckboxes();
                    }, 50);
                });
            });
        });
    }

    $('#checkAll').on('click', function () {

        var isChecked = $("#checkAll").prop('checked');
        if (isChecked) {
            setTimeout(function () {
                ObtenerSeleccion();
            }, 50);
            //ObtenerSeleccion()
        } else {
            //$(".multi_correo").removeClass('d-none')
            $(".multi_correo").addClass('d-none')
        }

    });


    // Add a click event handler to the checkboxes in the body (tbody)
    $('#miTabla').on('click', 'input[type="checkbox"]', function () {
        // Check or uncheck the "checkAll" checkbox in the header based on the checkboxes in the body
        var allChecked = dt.column(0).nodes().to$().find('input[type="checkbox"]:checked').length === dt.data().length;
        $('#checkAll').prop('checked', allChecked);

    });

    var ManejarCantidadCheckboxes = () => {
        // Select all delete buttons

        // Select refreshed checkbox DOM elements

        const container = document.querySelector('#miTabla');
        const allCheckboxes = container.querySelectorAll('[type="checkbox"]');

        // Detect checkboxes state & count
        let checkedState = false;
        let count = 0;

        // Count checked boxes
        allCheckboxes.forEach(c => {
            if (c.checked) {
                checkedState = true;
                count++;
            }
        });
        if (checkedState) {

            ObtenerSeleccion()

        } else {
            //$(".multi_correo").removeClass('d-none')
            $(".multi_correo").addClass('d-none')
        }

    }

    var Filtros = function () {


        $('#kt_datatable_search_query').on('keyup', function () {
            dt.search($(this).val()).draw();
        });
        
    }


    var subtabla = function () {
        $('#miTabla tbody').on('click', '.verSubtabla', function () {
            var tr = $(this).closest('tr');
            var row = dt.row(tr);
            if (row.child.isShown()) {
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                //construirsubtabla(subtabladatos);
                let datos = row.data()
                row.child(`
                    <table class="table  table-row-dashed fs-6 gy-4" id="subtabla${datos.TRANSFERENCIA}">
                        <thead>
                            <tr class="text-start text-gray-600 fw-bold fs-7 text-uppercase gs-0">
                                <th class="text-left min-w-175px">PROVEEDOR</th>
                                <th class="text-left min-w-65px">MON PROV</th>
                                <th class="text-left min-w-40px">TIPO</th>
                                <th class="text-left min-w-50px">DOCUMENTO</th>
                                <th class="text-left min-w-75px">FECHA DOC</th>
                                <th class="text-left min-w-75px">ORDEN DE COMPRA</th>
                                <th class="text-left min-w-65px">MON DOC</th>
                                <th class="text-left min-w-75px">SALDO DOC</th>
                                <th class="text-left min-w-75px">MONTO DOC</th>
                                <th class="text-left min-w-75px">A PAGAR</th>
                                <th class="text-left min-w-75px">ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-600 fw-semibold">
                        </tbody>
                    </table>
                `).show();
                $(`#subtabla${datos.TRANSFERENCIA}`).DataTable({
                    language: {
                        lengthMenu: "Mostrando _MENU_ registros por página",
                        zeroRecords: "No se encontraron registros",
                        info: "Mostrando página _PAGE_ de _PAGES_",
                        infoEmpty: "No se encontraron registros",
                        infoFiltered: "(de un total de _MAX_ registros)"
                    },
                    ajax: {
                        url: `${H2H_URL}/ObtenerPagosLineas?transferencia=${datos.TRANSFERENCIA}`,
                        dataSrc: ""
                    },
                    destroy: true,
                    responsive: true,
                    columns: [


                        { "data": "PROVEEDOR_COMPLETO" },
                        { "data": "MONEDA_PROVEEDOR" },
                        { "data": "TIPO" },
                        { "data": "CONCEPTO" },
                        { "data": "FECHA_DOC_STR" },
                        { "data": "ORDEN_COMPRA" },
                        { "data": "MONEDA_PAGO" },
                        { "data": "SALDO_DOC_STR" },
                        { "data": "MONTO_DOC_STR" },
                        { "data": "MONTO_A_PAGAR" },
                        //{ "data": "APROBADOR_GERENCIAL_USUARIO" },
                        //{ "data": "APROBADOR_FINANCIERO_USUARIO" },
                        //{ "data": "ESTADO" },
                        {
                            "data": null,
                        },
                    ],
                    columnDefs: [
                        {
                            targets: 7,
                            orderable: false,
                            render: function (data, type, row) {
                                if (row.MONEDA_PAGO == 'USD') {
                                    return '$ ' + `${row.SALDO_DOC_STR}`
                                }
                                else {
                                    return '₡ ' + `${row.SALDO_DOC_STR}`
                                }


                            }
                        },
                        {
                            targets: 8,
                            orderable: false,
                            render: function (data, type, row) {
                                if (row.MONEDA_PAGO == 'USD') {
                                    return '$ ' + `${row.MONTO_DOC_STR}`
                                }
                                else {
                                    return '₡ ' + `${row.MONTO_DOC_STR}`
                                }


                            }
                        },
                        {
                            targets: 9,
                            orderable: false,
                            render: function (data, type, row) {
                                if (row.MONEDA_PAGO == 'USD') {
                                    return '$ ' + `${row.MONTO_A_PAGAR}`
                                }
                                else {
                                    return '₡ ' + `${row.MONTO_A_PAGAR}`
                                }


                            }
                        },
                        //{
                        //    targets: 3,
                        //    orderable: false,
                        //    render: function (data, type, row) {
                        //        let dateV = row.FECHA_PROYECTADA.split("/")
                        //        let hoy = new Date()
                        //        let vence = new Date(dateV[2], dateV[1] - 1, dateV[0]);
                        //        if (hoy > vence) {
                        //            return `<span class="text-danger">${row.FECHA_PROYECTADA}</span>`
                        //        }
                        //        else {
                        //            return `<span>${row.FECHA_PROYECTADA}</span>`
                        //        }
                        //    }
                        //},
                        //{
                        //    targets: 4,
                        //    orderable: false,
                        //    render: function (data, type, row) {
                        //        return `<span id="mon${row.DOCUMENTO}">${row.MONEDA}<span/>`
                                
                        //    }
                        //},
                        //{
                        //    targets: 10,
                        //    orderable: false,
                        //    render: function (data, type, row) {
                        //        return `<span class="badge ${ESTADO[row.ESTADO].class} badge-lg">${ESTADO[row.ESTADO].titulo}</span>`;
                        //    }
                        //},
                        {
                            targets: 10,
                            orderable: false,
                            render: function (data, type, row) {
                                let btns = ``
                                if (H2H == 1) {
                                    btns += `<a href="javascript:;" onclick="EnviarCorreoXDebitoLineas('${row.PROVEEDOR}','${row.PROVEEDOR_CRYSTAL}','${row.NUMERO_ORIGEN}','${row.CORREO_PROVEEDOR}','${row.PROVEEDOR_COMPLETO}')"  class="btn btn-sm btn-clean btn-icon me-2" title="Enviar TEF por correo">
                                        <span class="svg-icon svg-icon-primary svg-icon-2x">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.3" d="M21 18H3C2.4 18 2 17.6 2 17V7C2 6.4 2.4 6 3 6H21C21.6 6 22 6.4 22 7V17C22 17.6 21.6 18 21 18Z" fill="currentColor"/>
                                                <path d="M11.4 13.5C11.8 13.8 12.3 13.8 12.6 13.5L21.6 6.30005C21.4 6.10005 21.2 6 20.9 6H2.99998C2.69998 6 2.49999 6.10005 2.29999 6.30005L11.4 13.5Z" fill="currentColor"/>
                                            </svg>
                                        </span>
                                        </a>
                                          <a href="${H2H_URL}/ImpirmirReporteXDebito?proveedor=${row.PROVEEDOR_CRYSTAL}&transferencia=${row.NUMERO_ORIGEN}" target="_blank" class="btn btn-sm btn-clean btn-icon me-2" title="Imprimir reporte de pago">
                                      <span class="svg-icon svg-icon-success svg-icon-2x"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                <defs/>
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <polygon points="0 0 24 0 24 24 0 24"/>
                                                    <path d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z" fill="currentColor" fill-rule="nonzero" opacity="0.3"/>
                                                    <rect fill="currentColor" x="6" y="11" width="9" height="2" rx="1"/>
                                                    <rect fill="currentColor" x="6" y="15" width="5" height="2" rx="1"/>
                                                </g>
                                            </svg><!--end::Svg Icon--></span>
                                        </a>`}
                                return btns;
                                
                            }
                        },
                    ],

                });

                //$(`#subtabla${datos.TRANSFERENCIA}_wrapper`).addClass("ms-20")
                //row.child(construirsubtabla(row.data().LINEAS)).show();
                tr.addClass('shown');
            }
        });
    }


    // Public methods
    return {
        init: function () {
            initDatatable();
            subtabla();
            Filtros();
        },
        reload: function () {
            dt.ajax.reload()
        },
        reset: function () {
            dt.destroy()
            initDatatable();
        }
    }
}();


function ObtenerSeleccion() {
    documentosParaBatch = []
    $("#miTabla input:checkbox:checked").each(function () {

        documentosParaBatch.push({
            transferencia: $(this).val()
        })
    });

    if (documentosParaBatch.length > 0) {
        for (var i = 0; i < documentosParaBatch.length; i++) {
            if (documentosParaBatch[i].transferencia == '1') {
                documentosParaBatch = documentosParaBatch.splice(1)
            }
        }
    }

    if (documentosParaBatch.length > 0) {
        for (var i = 0; i < documentosParaBatch.length; i++) {
            if (H2H == '1') {
                $(".multi_correo").removeClass('d-none')
            } else {
                $(".multi_correo").addClass('d-none')
                i = documentosParaBatch.length;
            }
        }
    } else {
        $(".multi_correo").addClass('d-none')
    }
}

function Correo() {
    Swal.fire({
        title: `Enviar correo a los proveedores`,
        text: `¿Desea enviar el correo de pago a todos los proveedores de las transferencias seleccionadas?`,
        icon: "success",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar",
        customClass: {
            confirmButton: "btn fw-bold btn-success",
            cancelButton: "btn fw-bold btn-active-secondary"
        }
    }).then(function (result) {
        if (result.value) {
            CorreoBatch()
        } else if (result.dismiss === 'cancel') {

        }
    });
}



async function CorreoBatch() {
    let fd = new FormData();
    fd.set('lineas', JSON.stringify(documentosParaBatch))

    const bodyO = {
        documentosParaBatch
    }

    const url = `${H2H_URL}/CorreoBatch`
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyO)
        })
        const result = await response.json()
        if (result == 1) {
            toastr.success('Correos enviados correctamente', 'Éxito', toastrOptions)
            //$(".multi_correo").removeClass('d-none')
            $(".multi_correo").addClass('d-none')
            KTDatatablesServerSide.reload()
        } else {
            toastr.warning('Ha ocurrido un error al cargar en batch', 'Alerta', toastrOptions)
        }

    } catch (err) {
        console.error(err)
        toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
    }

}


var ManejarCantidadCheckboxes = () => {
    const container = document.querySelector('#miTabla');
    const allCheckboxes = container.querySelectorAll('[type="checkbox"]');
    lineasParaBatch = []
    let checkedState = false;
    // Count checked boxes
    allCheckboxes.forEach(c => {
        // Obtén el ID de la fila asociada al checkbox
        //let rowId = $(c).val();
        if (c.checked) {
            lineasParaBatch.push({
                tef: $(c).attr("tef"),
                estado: $(c).attr("estado"),
                gerencia: $(c).attr("gerencia"),
                financiero: $(c).attr("financiero"),
                creador: $(c).attr("creador")
            })
            checkedState = true;

        }
    });
    console.log(lineasParaBatch)
    if (checkedState) {
        for (var i = 0; i < lineasParaBatch.length; i++) {
            //if (lineasParaBatch[i].estado == 'N' && usuarioSesion != lineasParaBatch[i].creador && (lineasParaBatch[i].gerencia == usuarioSesion || lineasParaBatch[i].financiero == usuarioSesion)) {
            if (lineasParaBatch[i].estado == 'N' && H2H_PAGOS == '1') {

                $(".multi").removeClass("d-none")
            } else {

                $(".multi").addClass("d-none")
                i = lineasParaBatch.length;
            }
        }
    } else {

        $(".multi").addClass("d-none")
    }
    
}


function EnviarCorreoXDebito(transferencia, correo) {
    Swal.fire({
        text: `Se le enviará un correo con el PDF de pago a cada proveedor de esta transferencia`,
        icon: "success",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        customClass: {
            confirmButton: "btn fw-bold btn-success",
            cancelButton: "btn fw-bold btn-active-secondary"
        }
    }).then(function (result) {
        if (result.value) {
            if (correo == "SIN_EMAIL_REGISTRADO") {
                toastr.warning('El proveedor no tiene un correo registrado', 'Alerta', toastrOptions)
                return
            }

            let fd = new FormData()
            fd.set('transferencia', transferencia);

            const url = `${H2H_URL}/EnviarCorreoXDebito`
            fetch(url, {
                method: 'POST',
                body: fd
            })
                .then(res => res.json())
                .then(data => {
                    if (data == 1) {
                        KTDatatablesServerSide.reload()
                        toastr.success('Correo enviado correctamente', 'Éxito', toastrOptions)
                    } else {
                        toastr.warning('No se pudo enviar el correo', 'Alerta', toastrOptions)
                    }
                })
                .catch(err => {
                    console.error(err)
                    toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
                })

        } else if (result.dismiss === 'cancel') {

        }
    });
}


function EnviarCorreoXDebitoLineas(proveedor, proveedorCrystal, transferencia, correo, proveedorCompleto) {
    Swal.fire({
        text: `Se le enviará un correo con el PDF de pago al proveedor: ${proveedorCompleto}`,
        icon: "success",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        customClass: {
            confirmButton: "btn fw-bold btn-success",
            cancelButton: "btn fw-bold btn-active-secondary"
        }
    }).then(function (result) {
        if (result.value) {
            if (correo == "SIN_EMAIL_REGISTRADO") {
                toastr.warning('El proveedor no tiene un correo registrado', 'Alerta', toastrOptions)
                return
            }

            let fd = new FormData()
            fd.set('proveedor', proveedor);
            fd.set('proveedorCrystal', proveedorCrystal);
            fd.set('transferencia', transferencia);
            //fd.set('correo', correo);

            const url = `${H2H_URL}/EnviarCorreoXDebitoLineas`
            fetch(url, {
                method: 'POST',
                body: fd
            })
                .then(res => res.json())
                .then(data => {
                    if (data == 1) {
                        KTDatatablesServerSide.reload()
                        toastr.success('Correo enviado correctamente', 'Éxito', toastrOptions)
                    } else {
                        toastr.warning('No se pudo enviar el correo', 'Alerta', toastrOptions)
                    }
                })
                .catch(err => {
                    console.error(err)
                    toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
                })

        } else if (result.dismiss === 'cancel') {

        }
    });
}

function CambiarUsuarioTEF() {
    var formData = new FormData();
    var _tef = $('#tef').val()
    var _aprobadorFinanciero = $('#cambiarUsuarioFinanciero').val()
    var _aprobadorGerencial = $('#cambiarUsuarioGerencial').val()

    formData.append('tef', _tef);
    formData.append('aprobadorFinanciero', _aprobadorFinanciero);
    formData.append('aprobadorGerencial', _aprobadorGerencial);


    let fd = {
        tef: _tef,
        aprobadorFinanciero: _aprobadorFinanciero,
        _aprobadorGerencial: _aprobadorGerencial

    }
    const url = `${RURL}/CambiarUsuarioTEF`
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            if (data == "1") {
                toastr.success("El usuario de la transferencia cambió con éxito", 'Éxito', toastrOptions)
                $('#modalCambiarUsuario').modal('hide')
                KTDataTableH2H.reload()
            } else {
                toastr.warning('Algo salió mal', 'Alerta')//, options)
            }
        })
        .catch(err => {
            console.error(err)
            toastr.error('Error en la petición! recargue e intente de nuevo', 'Error')//, options)
        })

}

function ValidarAprobarTransferencia(trnasferencia) {
    $('#TransferenciaAprobar').val(trnasferencia)
    $('#notasAprobar').val("")
    $('#ModalAprobarDocumento').modal('show')
}

function ValidarAprobarTransferenciaBatch() {
    $('#notasAprobarMultiple').val("")
    $('#ModalAprobarDocumentoBatch').modal('show')
}


async function AprobarTefBatch() {
    let fd = new FormData();
    fd.set('lineas', JSON.stringify(lineasParaBatch))
    fd.set('notas', $('#notasAprobarMultiple').val())

    const bodyO = {
        lineasParaBatch,
        notas: $('#notasAprobarMultiple').val()
    }

    const url = `${RURL}/AprobarBatch`
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyO)
        })
        const result = await response.json()
        if (result == 1) {
            toastr.success('Transferencias aprobadas correctamente', 'Éxito', toastrOptions)
            $('#ModalAprobarDocumentoBatch').modal('hide')
            KTDataTableH2H.reload()
        } else if (result == 2) {
            toastr.warning(`Ya existe una TEF aprobada con el mismo número de consecutivo`, 'Alerta', toastrOptions)
        } else {
            toastr.warning('No se pudo guardar la línea', 'Alerta', toastrOptions)
        }

    } catch (err) {
        console.error(err)
        toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
    }

}

async function RechazarTefBatch() {
    let fd = new FormData();
    fd.set('lineas', JSON.stringify(lineasParaBatch))
    fd.set('notas', $('#notasRechazos').val())

    const bodyO = {
        lineasParaBatch,
        notas: $('#notasRechazos').val()
    }

    const url = `${RURL}/RechazarBatch`
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyO)
        })
        const result = await response.json()
        if (result == 1) {
            toastr.success('Transferencias rechazadas correctamente', 'Éxito', toastrOptions)
            $('#ModalRechazarDocumentoBatch').modal('hide')
            KTDataTableH2H.reload()
        } else {
            toastr.warning('No se pudo rechazar las transferencias', 'Alerta', toastrOptions)
        }

    } catch (err) {
        console.error(err)
        toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
    }

}


function ValidarRechazarTransferenciaBatch() {
    $('#notasRechazos').val("")
    $('#ModalRechazarDocumentoBatch').modal('show')
}


function ValidarRechazarTransferencia(trnasferencia) {
    $('#TransferenciaRechazar').val(trnasferencia)
    $('#notasRechazo').val("")
    $('#notasAprobarMultiple').val("")
    $('#ModalRechazarDocumento').modal('show')
}


function ValidarAprobarPago(proveedor, documento) {
    document.querySelector('#FormAprobarDocumento').reset()
    $('#ProveedorAprobar').val(proveedor)
    $('#DocumentoAprobar').val(documento)
    $('#notasAprobarMultiple').val("")
    $('#ModalAprobarDocumento').modal('show')
}

function ValidarRechazarPago(proveedor, documento) {
    document.querySelector('#FormRechazarDocumento').reset()
    $('#ProveedorRechazar').val(proveedor)
    $('#DocumentoRechazar').val(documento)
    $('#notasRechazo').val("")
    $('#ModalRechazarDocumento').modal('show')
}



function ManejarFiltrosBotones() {
    $('#transferencia').on('change', () => {
        KTDatatablesServerSide.reset()
        documentosParaBatch = []
        ObtenerSeleccion()
    })

    $('#cuenta').on('change', () => {
        KTDatatablesServerSide.reset()
        documentosParaBatch = []
        ObtenerSeleccion()
    })

    $('#rangoFechas').on('change', () => {
        KTDatatablesServerSide.reset()
        documentosParaBatch = []
        ObtenerSeleccion()
    })

    $('#proveedor').on('change', () => {
        KTDatatablesServerSide.reset()
        documentosParaBatch = []
        ObtenerSeleccion()
    })
}

$(document).ready(function () {
    ManejarFiltrosBotones()
    $("#rangoFechas").daterangepicker({
        locale: {
            format: 'DD/MM/YYYY',
            applyLabel: 'Aplicar',
            cancelLabel: 'Cancelar',
            fromLabel: 'Desde',
            toLabel: 'Hasta',
            customRangeLabel: 'Rango personalizado',
            daysOfWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            firstDay: 1
        }
    });
    //initDropzone()
    KTDatatablesServerSide.init()

});