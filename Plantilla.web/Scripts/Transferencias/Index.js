var template;

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
            pageLength: 300,

            //serverSide: true,
            language: {
                lengthMenu: "Mostrando _MENU_ registros por página",
                zeroRecords: "No se encontraron registros",
                info: "Mostrando página _PAGE_ de _PAGES_",
                infoEmpty: "No se encontraron registros",
                infoFiltered: "(de un total de _MAX_ registros)"
            },
            ajax: {
                url: `${Transferencias_URL}/ObtenerTransferencias`,
                dataSrc: "",
                contentType: 'application/json',
                data: {
                    fechaInicio: $('#rangoFechas').val().split(' - ')[0].split('/').reverse().join('-'),
                    fechaFin: $('#rangoFechas').val().split(' - ')[1].split('/').reverse().join('-'),
                    cuenta: $('#cuentabancaria').val(),
                    tipo: $('#tipo').val(),
                    subtipo: $('#subtipo').val(),
                    documento: $('#docusoftland').val(),
                    proveedor: $('#proveedor').val(),
                    cliente: $('#cliente').val(),
                    debitoXcredito: $('#credeb').val(),
                    cxc_cxp: $('#cargado').val(),
                    cargadoBancos: $('#conciliados').val()
                }
            },
            columns: [
                {
                    "data": null,
                    "defaultContent": ``
                },
                //{ "data": "ID_H2H", },
                { "data": "REFERENCIA", },
                { "data": "CUENTA_BANCO", },
                { "data": "ASOCIADO_H2H", },
                { "data": "DOCUMENTO", },
                { "data": "TIPO", },
                { "data": "SUBTIPO", },
                { "data": "CC_CP", },
                { "data": "ESTADO_CB", },
                { "data": "FECHA_TEF_STR", },
                { "data": "PS_86_REFERENCIA", },
                { "data": "DEBITO_STR", },
                { "data": "CREDITO_STR", },
               /* { "data": "CREDITO_DEBITO", },*/
                { "data": "PROVEEDOR", },
                { "data": "CLIENTE", },
                { "data": "FECHA_MT_STR", },

                //{ "data": null , "defaultContent": `01 | Inventarios`},
                //{ "data": "DOCSOFTLAND" },
                //{ "data": null },
                //{ "data": null },
                //{ "data": "FECHATRANSACCION" },
                //{ "data": "CONCEPTO" },
                //{ "data": "MONTO" },
                //{ "data": null },
                ////{ "data": "ESTADOCC" },
                ////{ "data": "ESTADOCB" },
                //{ "data": "Proveedor", "defaultContent": `Sin proveedor` },
                //{ "data": "CLIENTE" },
                //{ "data": null, "defaultContent": `06/06/2024 10:30`
                //}, 
                ////{ "data": "SUBTIPOSOFTLAND" },
                ////{ "data": "ASIENTO" },
                { "data": null,
                },
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
                                <input class="form-check-input" type="checkbox" value="${row.ID_LINEA}" cc_cp="${row.CC_CP}" documento="${row.DOCUMENTO}" cb="${row.ESTADO_CB}" credito="${row.CREDITO}" debito="${row.DEBITO}" proveedor="${row.PROVEEDOR}" cliente="${row.CLIENTE}" cuenta="${row.CUENTA_BANCO}"  />
                            </div>`;
                    }
                },
                {
                    targets: 3,
                    orderable: false,
                    visible: true,
                    render: function (data, type, row) {
                        if (row.ASOCIADO_H2H == 'N') {
                            return `<i class="las la-times-circle fs-2 text-danger"></i>`
                        } else {
                            return `<i class="las la-check fs-2 text-success"></i>`
                        }



                    }
                },
                {
                    targets: 7,
                    orderable: false,
                    visible: true,
                    render: function (data, type, row) {
                        if (row.CC_CP == 'N/D') {
                            return `<span class="badge badge-secondary badge-lg">NO CARGADO</span>`;
                        } else if (row.CC_CP == 'CXC') {
                            return `<span class="badge badge-light-info badge-lg">CC</span>`;
                        } else if (row.CC_CP == 'CXP') {
                            return `<span class="badge badge-light-primary badge-lg">CP</span>`;
                        } else {
                            return `<span class="badge badge-light-success badge-lg">CB</span>`;
                        }


                    }
                },
                {
                    targets: 8,
                    orderable: false,
                    visible: true,
                    render: function (data, type, row) {
                        if (row.ESTADO_CB == 'NO') {
                            return `<i class="las la-times-circle fs-2 text-danger"></i>`
                        } else {
                            return `<i class="las la-check fs-2 text-success"></i>`
                        }



                    }
                },
                {
                    targets: 11,
                    orderable: false,
                    render: function (data, type, row) {
                        if (row.MONEDA == 'USD') {
                            return '$ ' + `${row.DEBITO_STR}`
                        }
                        else {
                            return '₡ ' + `${row.DEBITO_STR}`
                        }


                    }
                },
                {
                    targets: 12,
                    orderable: false,
                    render: function (data, type, row) {
                        if (row.MONEDA == 'USD') {
                            return '$ ' + `${row.CREDITO_STR}`
                        }
                        else {
                            return '₡ ' + `${row.CREDITO_STR}`
                        }


                    }
                },
                //{
                //    targets: 12,
                //    orderable: false,
                //    render: function (data, type, row) {
                //        if (row.REFERENCIA % 2 == 0) {
                //            return `${parseFloat(row.MONTO).toLocaleString('en-US', {
                //                style: 'currency',
                //                currency: 'USD',
                //            })}`;
                //        } else {
                //            return `-`;
                //        }
                //    }
                //},
                //{
                //    targets: 6,
                //    orderable: false,
                //    visible: true,
                //    render: function (data) {
                //        const ESTADOCC = {
                //            "SI ERP CXC": { 'titulo': 'SI ERP CXC', 'class': ' badge-light-success ' },
                //            "NO ERP CXC": { 'titulo': 'NO ERP CXC', 'class': ' badge-light-warning ' },
                //            "Con cliente": { 'titulo': 'Con cliente', 'class': ' badge-light-primary ' },
                //        };
                //        return `<span class="badge ${ESTADOCC[data].class} badge-lg">${ESTADOCC[data].titulo}</span>`;
                //    }
                //},
                //{
                //    targets: 13,
                //    orderable: false,
                //    render: function (data, type, row) {
                //        const ESTADOCB = {
                //            "SI ERP CB": { 'titulo': 'SI', 'class': ' badge-light-success ' },
                //            "NO ERP CB": { 'titulo': 'NO', 'class': ' badge-light-warning ' },
                //        };
                //        return `<span class="badge ${ESTADOCB[data].class} badge-lg">${ESTADOCB[data].titulo}</span>`;
                //    }
                //}, 

                {
                    targets: 16,
                    orderable: false,
                    render: function (data, type, row) {
                        let btns = ``
                        if (row.CC_CP == "N/D" && TRANSFERENCIAS == 1) {
                            if (row.CREDITO > 0) {
                                btns += `
                            <a href="javascript:;" onclick="asignarCliente('${row.CUENTA_BANCO}','${row.DOCUMENTO}','${row.REFERENCIA}','${row.FECHA_TEF_STR}','${row.PS_86_REFERENCIA}','${row.DEBITO}','${row.CREDITO}','${row.ID_LINEA}','${row.MONEDA}')" class="btn btn-sm btn-clean btn-icon mr-2" title="Editar cliente y concepto" >
	                           <!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/kt-products/docs/metronic/html/releases/2023-01-26-051612/core/html/src/media/icons/duotune/art/art005.svg-->
                               <span class="svg-icon svg-icon-info svg-icon-1">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.3" d="M16.5 9C16.5 13.125 13.125 16.5 9 16.5C4.875 16.5 1.5 13.125 1.5 9C1.5 4.875 4.875 1.5 9 1.5C13.125 1.5 16.5 4.875 16.5 9Z" fill="currentColor"/>
                                    <path d="M9 16.5C10.95 16.5 12.75 15.75 14.025 14.55C13.425 12.675 11.4 11.25 9 11.25C6.6 11.25 4.57499 12.675 3.97499 14.55C5.24999 15.75 7.05 16.5 9 16.5Z" fill="currentColor"/>
                                    <rect x="7" y="6" width="4" height="4" rx="2" fill="currentColor"/>
                                    </svg>
                                    </span>
                                <!--end::Svg Icon-->
	                        </a>`
                            }
                            if (row.DEBITO > 0) {
                                btns += `<a href="javascript:;" onclick="asignarProveedor('${row.CUENTA_BANCO}','${row.DOCUMENTO}','${row.REFERENCIA}','${row.FECHA_TEF_STR}','${row.PS_86_REFERENCIA}','${row.DEBITO}','${row.CREDITO}','${row.ID_LINEA}','${row.MONEDA}')" class="btn btn-sm btn-clean btn-icon mr-2" title="Editar proveedor y concepto" >
	                           <!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/kt-products/docs/metronic/html/releases/2023-01-26-051612/core/html/src/media/icons/duotune/art/art005.svg-->
                                <span class="svg-icon svg-icon-primary svg-icon-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16"> <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/> </svg>
                                </span>
                                <!--end::Svg Icon-->
	                        </a>`
                            }
                        }

                        if (TRANSFERENCIAS == 1 && row.CC_CP == "N/D") {
                            btns += `<a href="javascript:;" onclick="CargarControlBancario('${row.CUENTA_BANCO}','${row.FECHA_TEF_STR}','${row.PS_86_REFERENCIA}','${row.DOCUMENTO}','${row.REFERENCIA}','${row.DEBITO}','${row.CREDITO}','${row.ID_LINEA}','${row.MONEDA}')" class="btn btn-sm btn-clean btn-icon mr-2" title="Cargar a control bancario" >
	                           <!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/kt-products/docs/metronic/html/releases/2023-01-26-051612/core/html/src/media/icons/duotune/art/art005.svg-->
                                <span class="svg-icon svg-icon-success svg-icon-1">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 19.725V18.725C20 18.125 19.6 17.725 19 17.725H5C4.4 17.725 4 18.125 4 18.725V19.725H3C2.4 19.725 2 20.125 2 20.725V21.725H22V20.725C22 20.125 21.6 19.725 21 19.725H20Z" fill="currentColor"/>
                                    <path opacity="0.3" d="M22 6.725V7.725C22 8.325 21.6 8.725 21 8.725H18C18.6 8.725 19 9.125 19 9.725C19 10.325 18.6 10.725 18 10.725V15.725C18.6 15.725 19 16.125 19 16.725V17.725H15V16.725C15 16.125 15.4 15.725 16 15.725V10.725C15.4 10.725 15 10.325 15 9.725C15 9.125 15.4 8.725 16 8.725H13C13.6 8.725 14 9.125 14 9.725C14 10.325 13.6 10.725 13 10.725V15.725C13.6 15.725 14 16.125 14 16.725V17.725H10V16.725C10 16.125 10.4 15.725 11 15.725V10.725C10.4 10.725 10 10.325 10 9.725C10 9.125 10.4 8.725 11 8.725H8C8.6 8.725 9 9.125 9 9.725C9 10.325 8.6 10.725 8 10.725V15.725C8.6 15.725 9 16.125 9 16.725V17.725H5V16.725C5 16.125 5.4 15.725 6 15.725V10.725C5.4 10.725 5 10.325 5 9.725C5 9.125 5.4 8.725 6 8.725H3C2.4 8.725 2 8.325 2 7.725V6.725L11 2.225C11.6 1.925 12.4 1.925 13.1 2.225L22 6.725ZM12 3.725C11.2 3.725 10.5 4.425 10.5 5.225C10.5 6.025 11.2 6.725 12 6.725C12.8 6.725 13.5 6.025 13.5 5.225C13.5 4.425 12.8 3.725 12 3.725Z" fill="currentColor"/>
                                    </svg>
                                </span>
                                <!--end::Svg Icon-->
	                        </a>
                            `}
                        if (row.ESTADO_CB == "NO" && TRANSFERENCIAS == 1) {
                            btns += `<a href="javascript:;" onclick="CargarConciliacion('${row.CUENTA_BANCO}','${row.DOCUMENTO}','${row.REFERENCIA}','${row.FECHA_TEF_STR}','${row.PS_86_REFERENCIA}','${row.DEBITO}','${row.CREDITO}','${row.ID_LINEA}')" class="btn btn-sm btn-clean btn-icon mr-2" title="Cargar conciliación bancaria" >
	                            <!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/kt-products/docs/metronic/html/releases/2023-01-26-051612/core/html/src/media/icons/duotune/art/art005.svg-->
                                <span class="svg-icon svg-icon-dark svg-icon-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">

                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <rect x="0" y="0" width="24" height="24"/>
                                        <path d="M12.4644661,14.5355339 L9.46446609,14.5355339 C8.91218134,14.5355339 8.46446609,14.9832492 8.46446609,15.5355339 C8.46446609,16.0878187 8.91218134,16.5355339 9.46446609,16.5355339 L12.4644661,16.5355339 L12.4644661,17.5355339 C12.4644661,18.6401034 11.5690356,19.5355339 10.4644661,19.5355339 L6.46446609,19.5355339 C5.35989659,19.5355339 4.46446609,18.6401034 4.46446609,17.5355339 L4.46446609,13.5355339 C4.46446609,12.4309644 5.35989659,11.5355339 6.46446609,11.5355339 L10.4644661,11.5355339 C11.5690356,11.5355339 12.4644661,12.4309644 12.4644661,13.5355339 L12.4644661,14.5355339 Z" fill="currentColor" opacity="0.3" transform="translate(8.464466, 15.535534) rotate(-45.000000) translate(-8.464466, -15.535534) "/>
                                        <path d="M11.5355339,9.46446609 L14.5355339,9.46446609 C15.0878187,9.46446609 15.5355339,9.01675084 15.5355339,8.46446609 C15.5355339,7.91218134 15.0878187,7.46446609 14.5355339,7.46446609 L11.5355339,7.46446609 L11.5355339,6.46446609 C11.5355339,5.35989659 12.4309644,4.46446609 13.5355339,4.46446609 L17.5355339,4.46446609 C18.6401034,4.46446609 19.5355339,5.35989659 19.5355339,6.46446609 L19.5355339,10.4644661 C19.5355339,11.5690356 18.6401034,12.4644661 17.5355339,12.4644661 L13.5355339,12.4644661 C12.4309644,12.4644661 11.5355339,11.5690356 11.5355339,10.4644661 L11.5355339,9.46446609 Z" fill="currentColor" transform="translate(15.535534, 8.464466) rotate(-45.000000) translate(-15.535534, -8.464466) "/>
                                    </g>
                                </svg>
                                </span>
                                <!--end::Svg Icon-->
	                        </a>`}
                            
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
            //$(".multi_proveedor").removeClass('d-none')
            $(".multi_proveedor").addClass('d-none')
            //$(".multi_cliente").removeClass('d-none')
            $(".multi_cliente").addClass('d-none')
            //$(".multi_bancos").removeClass('d-none')
            $(".multi_bancos").addClass('d-none')
            ///$(".multi_conciliar").removeClass('d-none')
            $(".multi_conciliar").addClass('d-none')
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
            //$(".multi_proveedor").removeClass('d-none')
            $(".multi_proveedor").addClass('d-none')
            //$(".multi_cliente").removeClass('d-none')
            $(".multi_cliente").addClass('d-none')
            //$(".multi_bancos").removeClass('d-none')
            $(".multi_bancos").addClass('d-none')
            ///$(".multi_conciliar").removeClass('d-none')
            $(".multi_conciliar").addClass('d-none')
        }

    }

    var Filtros = function () {

        $('#kt_datatable_search_query').on('keyup', function () {
            //const val = $(this).val() == '0' ? '' : $(this).val()
            dt.search($(this).val()).draw();
        });

    }

    // Public methods
    return {
        init: function () {
            initDatatable();

            //ListenerCheckboxes();
            Filtros();
        },
        reload: function () {
            dt.ajax.reload()
        },
        reset: function () {
            dt.destroy()
            this.init()
        }
    }
}();

function ObtenerSeleccion() {
    // Recolectar documentos seleccionados
    documentosParaBatch = [];
    $("#miTabla input:checkbox:checked").each(function () {
        documentosParaBatch.push({
            linea: $(this).val(),
            cc_cp: $(this).attr('cc_cp'),
            documento: $(this).attr('documento'),
            cb: $(this).attr('cb'),
            credito: $(this).attr('credito'),
            debito: $(this).attr('debito'),
            proveedor: $(this).attr('proveedor'),
            cliente: $(this).attr('cliente'),
            cuenta: $(this).attr('cuenta')
        });
    });

    //SIRVE PARA QUE LA PRIMERA LINEA DEL CHECKBOX NO LA TOME EN CUENTA EN EL ARRAY
    if (documentosParaBatch.length > 0) {
        for (var i = 0; i < documentosParaBatch.length; i++) {
            if (documentosParaBatch[i].linea == '1') {
                documentosParaBatch = documentosParaBatch.splice(1)
            }
        }
    }

    // Inicializar banderas para determinar qué elementos mostrar
    let showProveedor = true;
    let showCliente = true;
    let showBancos = true;
    let showConciliar = true;

    // Verificar si hay documentos en la lista
    if (documentosParaBatch.length > 0) {
        // Recorre los documentos
        for (let i = 0; i < documentosParaBatch.length; i++) {
            let doc = documentosParaBatch[i];

            // Verificar condiciones para 'multi_proveedor'
            if (TRANSFERENCIAS == '1') {
                if (!(doc.proveedor === 'null' && doc.cc_cp === 'N/D' && doc.debito > 0)) {
                    showProveedor = false;
                }
            }

            // Verificar condiciones para 'multi_cliente'
            if (TRANSFERENCIAS == '1') {
                if (!(doc.cliente === 'null' && doc.cc_cp === 'N/D' && doc.credito > 0)) {
                    showCliente = false;
                }
            }

            // Verificar condiciones para 'multi_bancos'
            if (TRANSFERENCIAS == '1') {
                if (!(doc.proveedor === 'null' && doc.cliente === 'null' && doc.cc_cp === 'N/D')) {
                    showBancos = false;
                }
            }

            // Verificar condiciones para 'multi_conciliar'
            if (TRANSFERENCIAS == '1') {
                if (!(doc.cb === 'NO')) {
                    showConciliar = false;
                }
            }

            // Salir del bucle si todas las banderas se han actualizado a false
            if (!showProveedor && !showCliente && !showBancos && !showConciliar) {
                break;
            }
        }
    } else {
        // Si no hay documentos, no se deben mostrar los botones
        showProveedor = false;
        showCliente = false;
        showBancos = false;
        showConciliar = false;
    }

    // Aplicar la visibilidad basada en las banderas
    toggleVisibility(".multi_proveedor", showProveedor);
    toggleVisibility(".multi_cliente", showCliente);
    toggleVisibility(".multi_bancos", showBancos);
    toggleVisibility(".multi_conciliar", showConciliar);
}

function toggleVisibility(className, shouldShow) {
    $(className).toggleClass('d-none', !shouldShow);
}



function GuardarAsignarConciliacionBatch() {
    var _conciliacion = $("#tipo_conciliacion_batch").val()

    if (_conciliacion.length == 0) {
        toastr.warning(`Debe seleccionar una conciliación`, "Alerta", toastrOptions)
        return
    } 

    const cantidadDocumentos = documentosParaBatch.length;

    Swal.fire({
        title: `Cargar a conciliación bancaria`,
        text: `¿Desea cargar a conciliación bancaria de Softland los ${cantidadDocumentos} documentos seleccionados?`,
        icon: "success",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Cargar",
        cancelButtonText: "Cancelar",
        customClass: {
            confirmButton: "btn fw-bold btn-success",
            cancelButton: "btn fw-bold btn-active-secondary"
        }
    }).then(function (result) {
        if (result.value) {
            ConciliarBatch(_conciliacion)
        } else if (result.dismiss === 'cancel') {

        }
    });
}


async function ConciliarBatch(conciliacion) {
    let fd = new FormData();
    fd.set('lineas', JSON.stringify(documentosParaBatch))

    const bodyO = {
        documentosParaBatch,
        conciliacion
    }

    const url = `${Transferencias_URL}/ConciliarBatch`
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
            toastr.success('Documentos cargados a conciliación bancaria correctamente', 'Éxito', toastrOptions)
            //$(".multi_proveedor").removeClass('d-none')
            $(".multi_proveedor").addClass('d-none')
            //$(".multi_cliente").removeClass('d-none')
            $(".multi_cliente").addClass('d-none')
            //$(".multi_bancos").removeClass('d-none')
            $(".multi_bancos").addClass('d-none')
            ///$(".multi_conciliar").removeClass('d-none')
            $(".multi_conciliar").addClass('d-none')
            $("#modalAsociarConciliacionBancariaBatch").modal("hide")
            KTDatatablesServerSide.reload()
        } else {
            toastr.warning('Ha ocurrido un error al cargar en batch', 'Alerta', toastrOptions)
        }

    } catch (err) {
        console.error(err)
        toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
    }

}


function asignarCliente(cuenta, documento, referencia, fecha, concepto, debito, credito, idLinea, moneda) {
    $("#cliente_cxc").val("").trigger("change")
    $("#concepto_cxc").val(concepto)
    $("#cuentabancaria_cxc").val(cuenta)
    $("#fechadoc_cxc").val(fecha)

    if (debito > 0) {
        $("#monto_cxc").val(debito)
    } else {
        $("#monto_cxc").val(credito)
    }

    if (documento != "null") {
        $("#documento_cxc").val(documento)
    } else {
        $("#documento_cxc").val(referencia)
    }

    $("#tipo_cxc").val("").trigger("change")
    $("#subtipo_cxc").val("").trigger("change")
    $("#idlinea_cxc").val(idLinea)
    $("#moneda_cxc").val(moneda)

    $("#modalAsociarCliente").modal("show")
}
function asignarProveedor(cuenta, documento, referencia, fecha, concepto, debito, credito, idLinea, moneda) {
    $("#proveedor_cxp").val("").trigger("change")
    $("#concepto_cxp").val(concepto)
    $("#cuentabancaria_cxp").val(cuenta)
    $("#fechadoc_cxp").val(fecha)

    if (debito > 0) {
        $("#monto_cxp").val(debito)
    } else {
        $("#monto_cxp").val(credito)
    }

    if (documento != "null") {
        $("#documento_cxp").val(documento)
    } else {
        $("#documento_cxp").val(referencia)
    }

    $("#tipo_cxp").val("").trigger("change")
    $("#subtipo_cxp").val("").trigger("change")
    $("#idlinea_cxp").val(idLinea)
    $("#moneda_cxp").val(moneda)


    $("#proasignar").val(cliente).trigger("change")
    $("#conceptoasignarp").val(concepto)
    $("#modalAsociarProveedor").modal("show")
}

function GuardarAsignarCC() {
    if ($("#tipo_cxc").val().length == 0) {
        toastr.warning(`Debe seleccionar un tipo`, "Alerta", toastrOptions)
        return
    } else if ($("#subtipo_cxc").val().length == 0) {
        toastr.warning(`Debe seleccionar un subtipo`, "Alerta", toastrOptions)
        return
    } else if ($("#cliente_cxc").val().length == 0) {
        toastr.warning(`Debe seleccionar un cliente`, "Alerta", toastrOptions)
        return
    } else if ($("#concepto_cxc").val() == "" || $("#concepto_cxc").val() == " ") {
        toastr.warning(`El concepto no puede quedar vacío`, "Alerta", toastrOptions)
        return
    } else if ($("#cuentabancaria_cxc").val().length <= 21) {
        toastr.warning(`La cuenta bancaria debe contener 22 caracteres`, "Alerta", toastrOptions)
        return
    } else if ($("#fechadoc_cxc").val().length <= 9) {
        toastr.warning(`Debe digitar una fecha valida`, "Alerta", toastrOptions)
        return
    } else if ($("#monto_cxc").val() <= 0) {
        toastr.warning(`Debe digitar una monto válido`, "Alerta", toastrOptions)
        return
    }

    var formData = new FormData();
    var _cuenta = $('#cuentabancaria_cxc').val()
    var _documento = $('#documento_cxc').val()
    var _tipo = $('#tipo_cxc').val()
    var _subtipo = $('#subtipo_cxc').val()
    var _fecha = $('#fechadoc_cxc').val()
    var _concepto = $('#concepto_cxc').val()
    var _monto = $('#monto_cxc').val()
    var _idLinea = $('#idlinea_cxc').val()
    var _moneda = $('#moneda_cxc').val()
    var _cliente = $('#cliente_cxc').val()


    formData.append('cuenta', _cuenta);
    formData.append('documento', _documento);
    formData.append('tipo', _tipo);
    formData.append('subtipo', _subtipo);
    formData.append('fecha', _fecha);
    formData.append('concepto', _concepto);
    formData.append('monto', _monto);
    formData.append('idLinea', _idLinea);
    formData.append('moneda', _moneda);
    formData.append('cliente', _cliente);

    const url = `${Transferencias_URL}/InsertarDocumentoCC`
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            if (data == "1") {
                toastr.success('Documento CC creado correctamente', 'Éxito', toastrOptions)
                KTDatatablesServerSide.reload()
            } else {
                toastr.warning('Ocurrio un error', 'Alerta', toastrOptions)
            }
        })
        .catch(err => {
            console.error(err)
            toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
        })

    $("#modalAsociarCliente").modal("hide")
   // toastr.success(`Cliente asignado con éxito`, "Éxito", toastrOptions)
}

function Proveedor() {
    $("#proveedor_cxp_batch").val("").trigger("change")
    $("#tipo_cxp_batch").val("").trigger("change")
    $("#subtipo_cxp_batch").val("").trigger("change")
    $("#modalAsociarProveedorBatch").modal("show")
}

function Cliente() {
    $("#cliente_cxc_batch").val("").trigger("change")
    $("#tipo_cxc_batch").val("").trigger("change")
    $("#subtipo_cxc_batch").val("").trigger("change")
    $("#modalAsociarClienteBatch").modal("show")
}

function Bancos() {
    $("#tipo_control_batch").val("").trigger("change")
    $("#subtipo_control_batch").val("").trigger("change")
    $("#modalAsociarControlBancarioBatch").modal("show")
}

function Conciliar() {
    const cuentasUnicas = new Set(documentosParaBatch.map(doc => doc.cuenta));

    // Si el conjunto tiene más de un elemento, entonces hay cuentas diferentes
    if (cuentasUnicas.size === 1) {
        const cuentaUnica = Array.from(cuentasUnicas)[0]; // Obtener la cuenta única
        // Todas las cuentas son iguales
        $("#cuentas_conciliacion_batch").val(cuentaUnica).trigger("change");
        $('#tipo_conciliacion_batch').attr('disabled', false)
        $("#modalAsociarConciliacionBancariaBatch").modal("show")
    } else {
        toastr.warning('La selección cuenta con 2 o más números de cuenta de banco distintas', 'Alerta', toastrOptions) // Hay al menos una cuenta diferente
        $('#tipo_conciliacion_batch').attr('disabled', true)
    }

    $("#tipo_conciliacion_batch").val("").trigger("change")
}

function GuardarAsignarCPBatch() {
    var _tipo = $("#tipo_cxp_batch").val()
    var _subtipo = $("#subtipo_cxp_batch").val()
    var _proveedor = $("#proveedor_cxp_batch").val()

    if (_tipo.length == 0) {
        toastr.warning(`Debe seleccionar un tipo`, "Alerta", toastrOptions)
        return
    } else if (_subtipo.length == 0) {
        toastr.warning(`Debe seleccionar un subtipo`, "Alerta", toastrOptions)
        return
    } else if (_proveedor.length == 0) {
        toastr.warning(`Debe seleccionar un proveedor`, "Alerta", toastrOptions)
        return
    }

    const cantidadDocumentos = documentosParaBatch.length;

    Swal.fire({
        title: `Cargar documentos a CP`,
        text: `¿Desea cargar al proveedor ${_proveedor} los ${cantidadDocumentos} documentos seleccionados a Softland?`,
        icon: "success",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Cargar",
        cancelButtonText: "Cancelar",
        customClass: {
            confirmButton: "btn fw-bold btn-success",
            cancelButton: "btn fw-bold btn-active-secondary"
        }
    }).then(function (result) {
        if (result.value) {
            ProveedorBatch(_tipo, _subtipo, _proveedor)
        } else if (result.dismiss === 'cancel') {

        }
    });
}


function GuardarAsignarCCBatch() {
    var _tipo = $("#tipo_cxc_batch").val()
    var _subtipo = $("#subtipo_cxc_batch").val()
    var _cliente = $("#cliente_cxc_batch").val()

    if (_tipo.length == 0) {
        toastr.warning(`Debe seleccionar un tipo`, "Alerta", toastrOptions)
        return
    } else if (_subtipo.length == 0) {
        toastr.warning(`Debe seleccionar un subtipo`, "Alerta", toastrOptions)
        return
    } else if (_cliente.length == 0) {
        toastr.warning(`Debe seleccionar un cliente`, "Alerta", toastrOptions)
        return
    }

    const cantidadDocumentos = documentosParaBatch.length;

    Swal.fire({
        title: `Cargar documentos a CC`,
        text: `¿Desea cargar al cliente ${_cliente} los ${cantidadDocumentos} documentos seleccionados a Softland?`,
        icon: "success",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Cargar",
        cancelButtonText: "Cancelar",
        customClass: {
            confirmButton: "btn fw-bold btn-success",
            cancelButton: "btn fw-bold btn-active-secondary"
        }
    }).then(function (result) {
        if (result.value) {
            ClienteBatch(_tipo, _subtipo, _cliente)
        } else if (result.dismiss === 'cancel') {

        }
    });
}

function GuardarAsignarControlBatch() {

    var _tipo = $("#tipo_control_batch").val()
    var _subtipo = $("#subtipo_control_batch").val()

    if (_tipo.length == 0) {
        toastr.warning(`Debe seleccionar un tipo`, "Alerta", toastrOptions)
        return
    } else if (_subtipo.length == 0) {
        toastr.warning(`Debe seleccionar un subtipo`, "Alerta", toastrOptions)
        return
    }

    const cantidadDocumentos = documentosParaBatch.length;

    Swal.fire({
        title: `Cargar documentos a CB`,
        text: `¿Desea cargar a control bancario de Softland los ${cantidadDocumentos} documentos seleccionados?`,
        icon: "success",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Cargar",
        cancelButtonText: "Cancelar",
        customClass: {
            confirmButton: "btn fw-bold btn-success",
            cancelButton: "btn fw-bold btn-active-secondary"
        }
    }).then(function (result) {
        if (result.value) {
            BancoBatch(_tipo, _subtipo)
        } else if (result.dismiss === 'cancel') {

        }
    });
}

async function ProveedorBatch(tipo, subtipo, proveedor) {
    // Construir el cuerpo del request
    const bodyO = {
        documentosParaBatch,
        tipo,
        subtipo,
        proveedor
    };

    // Construir la URL para la solicitud
    const url = `${Transferencias_URL}/ProveedorBatch`;

    try {
        // Hacer la solicitud POST
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyO)
        });

        // Obtener y procesar la respuesta
        const result = await response.json();
        if (result === 1) {
            toastr.success('Documentos cargados a CP correctamente', 'Éxito', toastrOptions)
            //$(".multi_proveedor").removeClass('d-none')
            $(".multi_proveedor").addClass('d-none')
            //$(".multi_cliente").removeClass('d-none')
            $(".multi_cliente").addClass('d-none')
            //$(".multi_bancos").removeClass('d-none')
            $(".multi_bancos").addClass('d-none')
            ///$(".multi_conciliar").removeClass('d-none')
            $(".multi_conciliar").addClass('d-none')
            $("#modalAsociarProveedorBatch").modal("hide")
            KTDatatablesServerSide.reload();
        } else {
            toastr.warning('Ha ocurrido un error al cargar en batch', 'Alerta', toastrOptions)
        }

    } catch (err) {
        console.error(err);
        toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions);
    }
}

async function ClienteBatch(tipo, subtipo, cliente) {
    // Construir el cuerpo del request
    const bodyO = {
        documentosParaBatch,
        tipo,
        subtipo,
        cliente
    };

    // Construir la URL para la solicitud
    const url = `${Transferencias_URL}/ClienteBatch`;

    try {
        // Hacer la solicitud POST
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyO)
        });

        // Obtener y procesar la respuesta
        const result = await response.json();
        if (result === 1) {
            toastr.success('Documentos cargados a CC correctamente', 'Éxito', toastrOptions)
            //$(".multi_proveedor").removeClass('d-none')
            $(".multi_proveedor").addClass('d-none')
            //$(".multi_cliente").removeClass('d-none')
            $(".multi_cliente").addClass('d-none')
            //$(".multi_bancos").removeClass('d-none')
            $(".multi_bancos").addClass('d-none')
            ///$(".multi_conciliar").removeClass('d-none')
            $(".multi_conciliar").addClass('d-none')
            $("#modalAsociarClienteBatch").modal("hide")
            KTDatatablesServerSide.reload();
        } else {
            toastr.warning('Ha ocurrido un error al cargar en batch', 'Alerta', toastrOptions)
        }

    } catch (err) {
        console.error(err);
        toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions);
    }
}


async function BancoBatch(tipo, subtipo) {

    // Construir el cuerpo del request
    const bodyO = {
        documentosParaBatch,
        tipo,
        subtipo
    };

    // Construir la URL para la solicitud
    const url = `${Transferencias_URL}/BancoBatch`;

    try {
        // Hacer la solicitud POST
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyO)
        });

        // Obtener y procesar la respuesta
        const result = await response.json();
        if (result === 1) {
            toastr.success('Documentos cargados a CB correctamente', 'Éxito', toastrOptions)
            //$(".multi_proveedor").removeClass('d-none')
            $(".multi_proveedor").addClass('d-none')
            //$(".multi_cliente").removeClass('d-none')
            $(".multi_cliente").addClass('d-none')
            //$(".multi_bancos").removeClass('d-none')
            $(".multi_bancos").addClass('d-none')
            ///$(".multi_conciliar").removeClass('d-none')
            $(".multi_conciliar").addClass('d-none')
            $("#modalAsociarControlBancarioBatch").modal("hide")
            KTDatatablesServerSide.reload();
        } else {
            toastr.warning('Ha ocurrido un error al cargar en batch', 'Alerta', toastrOptions)
        }

    } catch (err) {
        console.error(err);
        toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions);
    }
}




function GuardarAsignarCP() {
    if ($("#tipo_cxp").val().length == 0) {
        toastr.warning(`Debe seleccionar un tipo`, "Alerta", toastrOptions)
        return
    } else if ($("#subtipo_cxp").val().length == 0) {
        toastr.warning(`Debe seleccionar un subtipo`, "Alerta", toastrOptions)
        return
    } else if ($("#proveedor_cxp").val().length == 0) {
        toastr.warning(`Debe seleccionar un proveedor`, "Alerta", toastrOptions)
        return
    } else if ($("#concepto_cxp").val() == "" || $("#concepto_cxp").val() == " ") {
        toastr.warning(`El concepto no puede quedar vacío`, "Alerta", toastrOptions)
        return
    } else if ($("#cuentabancaria_cxp").val().length <= 21) {
        toastr.warning(`La cuenta bancaria debe contener 22 caracteres`, "Alerta", toastrOptions)
        return
    } else if ($("#fechadoc_cxp").val().length <= 9) {
        toastr.warning(`Debe digitar una fecha valida`, "Alerta", toastrOptions)
        return
    } else if ($("#monto_cxp").val() <= 0) {
        toastr.warning(`Debe digitar una monto válido`, "Alerta", toastrOptions)
        return
    }

    var formData = new FormData();
    var _cuenta = $('#cuentabancaria_cxp').val()
    var _documento = $('#documento_cxp').val()
    var _tipo = $('#tipo_cxp').val()
    var _subtipo = $('#subtipo_cxp').val()
    var _fecha = $('#fechadoc_cxp').val()
    var _concepto = $('#concepto_cxp').val()
    var _monto = $('#monto_cxp').val()
    var _idLinea = $('#idlinea_cxp').val()
    var _moneda = $('#moneda_cxp').val()
    var _proveedor = $('#proveedor_cxp').val()


    formData.append('cuenta', _cuenta);
    formData.append('documento', _documento);
    formData.append('tipo', _tipo);
    formData.append('subtipo', _subtipo);
    formData.append('fecha', _fecha);
    formData.append('concepto', _concepto);
    formData.append('monto', _monto);
    formData.append('idLinea', _idLinea);
    formData.append('moneda', _moneda);
    formData.append('proveedor', _proveedor);

    const url = `${Transferencias_URL}/InsertarDocumentoCP`
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            if (data == "1") {
                toastr.success('Documento CP creado correctamente', 'Éxito', toastrOptions)
                KTDatatablesServerSide.reload()
            } else {
                toastr.warning('Ocurrio un error', 'Alerta', toastrOptions)
            }
        })
        .catch(err => {
            console.error(err)
            toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
        })

    $("#modalAsociarProveedor").modal("hide")
}

function CambiarSubtipo(referencia) {
    $("#referenciasubtipo").val(referencia)
    $("#modalSubtipo").modal("show")
}
function GuardarSubtipo() {
    $("#modalSubtipo").modal("hide")
    toastr.success(`Subtipo cambiado con éxito`, "Éxito", toastrOptions)
}
function CambiarTipo(referencia) {
    $("#referenciatipo").val(referencia)
    $("#modalTipo").modal("show")
}
function GuardarTipo() {
    $("#modalTipo").modal("hide")
    toastr.success(`Tipo cambiado con éxito`, "Éxito", toastrOptions)
}


function CargarControlBancario(cuenta, fecha, concepto, documento, referencia, debito, credito, idLinea, moneda) {
    $("#cuentabancaria_control").val(cuenta)
    $("#fechadoc_control").val(fecha);
    $("#concepto_control").val(concepto);

    if (debito > 0) {
        $("#monto_control").val(debito)
    } else {
        $("#monto_control").val(credito)
    }

    if (documento != "null") {
        $("#documento_control").val(documento)
    } else {
        $("#documento_control").val(referencia)
    }

    $("#tipo_control").val("").trigger("change")
    $("#subtipo_control").val("").trigger("change")
    $("#idlinea_control").val(idLinea)
    $("#moneda_control").val(moneda)


    var monto = 0

    if (debito > 0) {
        monto = debito
        tipo = "CP"
    } else {
        monto = credito
        tipo = "CC"
    }
    $("#cc_cp_control").val(tipo)

    $("#modalAsociarControlBancario").modal("show")
}


function GuardarAsignarControl() {
    if ($("#documento_control").val() == "null") {
        toastr.warning(`Documento inválido`, "Alerta", toastrOptions)
        return
    } else if ($("#tipo_control").val().length == 0) {
        toastr.warning(`Debe seleccionar un tipo`, "Alerta", toastrOptions)
        return
    } else if ($("#subtipo_control").val().length == 0) {
        toastr.warning(`Debe seleccionar un subtipo`, "Alerta", toastrOptions)
        return
    } else if ($("#concepto_control").val() == "" || $("#concepto_control").val() == " ") {
        toastr.warning(`El concepto no puede quedar vacío`, "Alerta", toastrOptions)
        return
    } else if ($("#cuentabancaria_control").val().length <= 21) {
        toastr.warning(`La cuenta bancaria debe contener 22 caracteres`, "Alerta", toastrOptions)
        return
    } else if ($("#fechadoc_control").val().length <= 9) {
        toastr.warning(`Debe digitar una fecha valida`, "Alerta", toastrOptions)
        return
    } else if ($("#monto_control").val() <= 0) {
        toastr.warning(`Debe digitar una monto válido`, "Alerta", toastrOptions)
        return
    }

    var formData = new FormData();
    var _cuenta = $('#cuentabancaria_control').val()
    var _documento = $('#documento_control').val()
    var _tipo = $('#tipo_control').val()
    var _subtipo = $('#subtipo_control').val()
    var _fecha = $('#fechadoc_control').val()
    var _concepto = $('#concepto_control').val()
    var _monto = $('#monto_control').val()
    var _idLinea = $('#idlinea_control').val()
    var _moneda = $('#moneda_control').val()


    formData.append('cuenta', _cuenta);
    formData.append('documento', _documento);
    formData.append('tipo', _tipo);
    formData.append('subtipo', _subtipo);
    formData.append('fecha', _fecha);
    formData.append('concepto', _concepto);
    formData.append('monto', _monto);
    formData.append('idLinea', _idLinea);
    formData.append('moneda', _moneda);

    const url = `${Transferencias_URL}/InsertarMovBancos`
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            if (data == "1") {
                toastr.success(`Documento cargado a control bancario de Softland con éxito`, "Éxito", toastrOptions)
                KTDatatablesServerSide.reload()
            } else {
                toastr.warning('Ocurrio un error', 'Alerta', toastrOptions)
            }
        })
        .catch(err => {
            console.error(err)
            toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
        })

    $("#modalAsociarControlBancario").modal("hide")
}

function CargarConciliacion(cuenta, documento, referencia, fecha, concepto, debito, credito, idLinea) {
    $("#cuentabancaria_conciliacion").val(cuenta)
    $("#cuentas_conciliacion").val(cuenta).trigger("change")
    $("#concepto_conciliacion").val(concepto);
    $("#fechadoc_conciliacion").val(fecha);

    if (debito > 0) {
        $("#monto_conciliacion").val(debito)
        $("#tipodoc_conciliacion").val("T/D")
    } else {
        $("#monto_conciliacion").val(credito)
        $("#tipodoc_conciliacion").val("T/C")
    }

    if (documento != "null") {
        $("#documento_conciliacion").val(documento)
    } else {
        $("#documento_conciliacion").val(referencia)
    }

    $("#idlinea_conciliacion").val(idLinea)

    var monto = 0

    if (debito > 0) {
        monto = debito
    } else {
        monto = credito
    }

    $("#modalAsociarConciliacionBancaria").modal("show")
}

function seleccionarConciliacion(cuenta, fecha) {
    var formData = new FormData();
    formData.append('cuenta', cuenta);
    formData.append('fecha', fecha);

    const url = `${Transferencias_URL}/ObtenerConciliacion`;
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            // Verifica si 'data' es un array y tiene al menos un elemento
            if (Array.isArray(data) && data.length > 0) {
                // Si hay elementos, usa el primer valor
                $("#tipo_conciliacion").val(data[0].CONCILIACION).trigger("change");
            } else {
                // Si no hay elementos o 'data' no es un array, establece el valor en 'N'
                toastr.info('Conciliación no encontrada', 'Info', toastrOptions)
                $("#tipo_conciliacion").val('N').trigger("change");
            }
        })
        .catch(err => {
            console.error(err);
            toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions);
        });
}

function GuardarAsignarConciliacion() {
    if ($("#documento_conciliacion").val() == "null") {
        toastr.warning(`Documento inválido`, "Alerta", toastrOptions)
        return
    } else if ($("#tipo_conciliacion").val() == null) {
        toastr.warning(`Debe seleccionar una conciliación`, "Alerta", toastrOptions)
        return
    } else if ($("#concepto_conciliacion").val() == "" || $("#concepto_conciliacion").val() == " ") {
        toastr.warning(`El concepto no puede quedar vacío`, "Alerta", toastrOptions)
        return
    } else if ($("#cuentabancaria_conciliacion").val().length <= 21) {
        toastr.warning(`La cuenta bancaria debe contener 22 caracteres`, "Alerta", toastrOptions)
        return
    } else if ($("#fechadoc_conciliacion").val().length <= 9) {
        toastr.warning(`Debe digitar una fecha valida`, "Alerta", toastrOptions)
        return
    } else if ($("#monto_conciliacion").val() <= 0) {
        toastr.warning(`Debe digitar una monto válido`, "Alerta", toastrOptions)
        return
    }

    var formData = new FormData();
    var _cuenta = $('#cuentabancaria_conciliacion').val()
    var _conciliacion = $('#tipo_conciliacion').val()
    var _documento = $('#documento_conciliacion').val()
    var _tipo = $('#tipodoc_conciliacion').val()
    var _fecha = $('#fechadoc_conciliacion').val()
    var _concepto = $('#concepto_conciliacion').val()
    var _monto = $('#monto_conciliacion').val()
    var _idLinea = $('#idlinea_conciliacion').val()


    formData.append('cuenta', _cuenta);
    formData.append('conciliacion', _conciliacion);
    formData.append('documento', _documento);
    formData.append('fecha', _fecha);
    formData.append('concepto', _concepto);
    formData.append('monto', _monto);
    formData.append('tipo', _tipo);
    formData.append('idLinea', _idLinea);

    const url = `${Transferencias_URL}/InsertarDocumentoCB`
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            if (data == "1") {
                toastr.success(`Documento creado en conciliación bancaria de Softland con éxito`, "Éxito", toastrOptions)
                KTDatatablesServerSide.reload()
            } else {
                toastr.warning('Ocurrio un error', 'Alerta', toastrOptions)
            }
        })
        .catch(err => {
            console.error(err)
            toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
        })

    $("#modalAsociarConciliacionBancaria").modal("hide")
}

function cambiarsubtipo(tipo) {
    let options = ``
    if (tipo.includes("CXC")) {
         options = `<option value="SUBTIPOCXC1">SUBTIPOCXC1</option>
                        <option value="SUBTIPOCXC2">SUBTIPOCXC2</option>`
    } else if (tipo.includes("CXP")) {
         options = `<option value="SUBTIPOCXC1">SUBTIPOCXP3</option>
                        <option value="SUBTIPOCXC2">SUBTIPOCXP4</option>`
    }


    $("#subtipo").empty().append(options).trigger("change")
}


function ManejarFiltrosBotones() {
    $('#rangoFechas').on('change', () => {
        KTDatatablesServerSide.reset()
        documentosParaBatch = []
        ObtenerSeleccion()
    })

    $('#cuentabancaria').on('change', () => {
        KTDatatablesServerSide.reset()
        documentosParaBatch = []
        ObtenerSeleccion()
    })

    $('#tipo').on('change', () => {
        KTDatatablesServerSide.reset()
        documentosParaBatch = []
        ObtenerSeleccion()
    })

    $('#subtipo').on('change', () => {
        KTDatatablesServerSide.reset()
        documentosParaBatch = []
        ObtenerSeleccion()
    })

    $('#docusoftland').on('change', () => {
        KTDatatablesServerSide.reset()
        documentosParaBatch = []
        ObtenerSeleccion()
    })

    $('#proveedor').on('change', () => {
        KTDatatablesServerSide.reset()
        documentosParaBatch = []
        ObtenerSeleccion()
    })

    $('#cliente').on('change', () => {
        KTDatatablesServerSide.reset()
        documentosParaBatch = []
        ObtenerSeleccion()
    })

    $('#credeb').on('change', () => {
        KTDatatablesServerSide.reset()
        documentosParaBatch = []
        ObtenerSeleccion()
    })

    $('#cargado').on('change', () => {
        KTDatatablesServerSide.reset()
        documentosParaBatch = []
        ObtenerSeleccion()
    })

    $('#conciliados').on('change', () => {
        KTDatatablesServerSide.reset()
        documentosParaBatch = []
        ObtenerSeleccion()
    })
}

async function ObtenerConciliacionXBanco(cuenta) {
    try {
        const url = `${Transferencias_URL}/ObtenerConciliacionXBanco?cuenta=${cuenta}`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (e) {
        console.error(e)
        return []
    }
}

async function ObtenerSubtiposCC_XTipoFiltro(tipo) {
    try {
        const url = `${Transferencias_URL}/ObtenerSubtiposCC_XTipoFiltro?tipo=${tipo}`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (e) {
        console.error(e)
        return []
    }
}

async function ObtenerSubtiposCP_XTipoFiltro(tipo) {
    try {
        const url = `${Transferencias_URL}/ObtenerSubtiposCP_XTipoFiltro?tipo=${tipo}`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (e) {
        console.error(e)
        return []
    }
}

async function ObtenerSubtiposControlBancario_XTipoFiltro(tipo) {
    try {
        const url = `${Transferencias_URL}/ObtenerSubtiposControlBancario_XTipoFiltro?tipo=${tipo}`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (e) {
        console.error(e)
        return []
    }
}

$(document).ready(function () {

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('#tipo_cxc').on('change', async function (e) {
        const subtipos = await ObtenerSubtiposCC_XTipoFiltro(e.target.value)
        let html = '<option></option>'


        for (const item of subtipos) {
            html += `<option value="${item.SUBTIPO}">${item.SUBTIPO} || ${item.DESCRIPCION}</option>`
        }

        $('#subtipo_cxc').html(html)
        $('#subtipo_cxc').select2({
            placeholder: "Seleccione un subtipo"
        })

        $.ajax({
            url: `${Transferencias_URL}/ObtenerSubtiposCC_XTipoFiltro`,
            data: {
                tipo: $('#tipo_cxc').val()
            },
            async: false,
            type: "POST",
            dataType: "json",
            success: function (data) {
                $('#subtipo_cxc').val(data[0].SUBTIPO).trigger("change")
            }
        });
    })

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('#tipo_cxc_batch').on('change', async function (e) {
        const subtipos = await ObtenerSubtiposCC_XTipoFiltro(e.target.value)
        let html = '<option></option>'


        for (const item of subtipos) {
            html += `<option value="${item.SUBTIPO}">${item.SUBTIPO} || ${item.DESCRIPCION}</option>`
        }

        $('#subtipo_cxc_batch').html(html)
        $('#subtipo_cxc_batch').select2({
            placeholder: "Seleccione un subtipo"
        })

        $.ajax({
            url: `${Transferencias_URL}/ObtenerSubtiposCC_XTipoFiltro`,
            data: {
                tipo: $('#tipo_cxc_batch').val()
            },
            async: false,
            type: "POST",
            dataType: "json",
            success: function (data) {
                $('#subtipo_cxc_batch').val(data[0].SUBTIPO).trigger("change")
            }
        });
    })

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

     $('#tipo_cxp').on('change', async function (e) {
        const subtipos = await ObtenerSubtiposCP_XTipoFiltro(e.target.value)
        let html = '<option></option>'


        for (const item of subtipos) {
            html += `<option value="${item.SUBTIPO}">${item.SUBTIPO} || ${item.DESCRIPCION}</option>`
        }

        $('#subtipo_cxp').html(html)
        $('#subtipo_cxp').select2({
            placeholder: "Seleccione un subtipo"
        })

        $.ajax({
            url: `${Transferencias_URL}/ObtenerSubtiposCP_XTipoFiltro`,
            data: {
                tipo: $('#tipo_cxp').val()
            },
            async: false,
            type: "POST",
            dataType: "json",
            success: function (data) {
                $('#subtipo_cxp').val(data[0].SUBTIPO).trigger("change")
            }
        });
    })

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('#tipo_cxp_batch').on('change', async function (e) {
        const subtipos = await ObtenerSubtiposCP_XTipoFiltro(e.target.value)
        let html = '<option></option>'


        for (const item of subtipos) {
            html += `<option value="${item.SUBTIPO}">${item.SUBTIPO} || ${item.DESCRIPCION}</option>`
        }

        $('#subtipo_cxp_batch').html(html)
        $('#subtipo_cxp_batch').select2({
            placeholder: "Seleccione un subtipo"
        })

        $.ajax({
            url: `${Transferencias_URL}/ObtenerSubtiposCP_XTipoFiltro`,
            data: {
                tipo: $('#tipo_cxp_batch').val()
            },
            async: false,
            type: "POST",
            dataType: "json",
            success: function (data) {
                $('#subtipo_cxp_batch').val(data[0].SUBTIPO).trigger("change")
            }
        });
    })

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('#tipo_control').on('change', async function (e) {
        const subtipos = await ObtenerSubtiposControlBancario_XTipoFiltro(e.target.value)
        let html = '<option></option>'


        for (const item of subtipos) {
            html += `<option value="${item.SUBTIPO}">${item.SUBTIPO} || ${item.DESCRIPCION}</option>`
        }

        $('#subtipo_control').html(html)
        $('#subtipo_control').select2({
            placeholder: "Seleccione un subtipo"
        })

        $.ajax({
            url: `${Transferencias_URL}/ObtenerSubtiposControlBancario_XTipoFiltro`,
            data: {
                tipo: $('#tipo_control').val()
            },
            async: false,
            type: "POST",
            dataType: "json",
            success: function (data) {
                $('#subtipo_control').val(data[0].SUBTIPO).trigger("change")
            }
        });
    })

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    $('#tipo_control_batch').on('change', async function (e) {
        const subtipos = await ObtenerSubtiposControlBancario_XTipoFiltro(e.target.value)
        let html = '<option></option>'


        for (const item of subtipos) {
            html += `<option value="${item.SUBTIPO}">${item.SUBTIPO} || ${item.DESCRIPCION}</option>`
        }

        $('#subtipo_control_batch').html(html)
        $('#subtipo_control_batch').select2({
            placeholder: "Seleccione un subtipo"
        })

        $.ajax({
            url: `${Transferencias_URL}/ObtenerSubtiposControlBancario_XTipoFiltro`,
            data: {
                tipo: $('#tipo_control_batch').val()
            },
            async: false,
            type: "POST",
            dataType: "json",
            success: function (data) {
                $('#subtipo_control_batch').val(data[0].SUBTIPO).trigger("change")
            }
        });
    })

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('#cuentas_conciliacion').on('change', async function (e) {
        const conciliacion = await ObtenerConciliacionXBanco(e.target.value)
        let html = '<option></option>'


        for (const item of conciliacion) {
            html += `<option value="${item.CONCILIACION}">${item.COMPLETO}</option>`
        }

        $('#tipo_conciliacion').html(html)
        $('#tipo_conciliacion').select2({
            placeholder: "Seleccione una conciliacion"
        })

        $.ajax({
            url: `${Transferencias_URL}/ObtenerConciliacionXBanco`,
            data: {
                cuenta: $('#cuentas_conciliacion').val()
            },
            async: false,
            type: "POST",
            dataType: "json",
            success: function (data) {
                $('#tipo_conciliacion').val(data[0].CONCILIACION).trigger("change")
            }
        });

        seleccionarConciliacion($('#cuentabancaria_conciliacion').val(), $('#fechadoc_conciliacion').val())
    })

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('#cuentas_conciliacion_batch').on('change', async function (e) {
        const conciliacion = await ObtenerConciliacionXBanco(e.target.value)
        let html = '<option></option>'


        for (const item of conciliacion) {
            html += `<option value="${item.CONCILIACION}">${item.COMPLETO}</option>`
        }

        $('#tipo_conciliacion_batch').html(html)
        $('#tipo_conciliacion_batch').select2({
            placeholder: "Seleccione una conciliacion"
        })

        $.ajax({
            url: `${Transferencias_URL}/ObtenerConciliacionXBanco`,
            data: {
                cuenta: $('#cuentas_conciliacion_batch').val()
            },
            async: false,
            type: "POST",
            dataType: "json",
            success: function (data) {
                $('#tipo_conciliacion_batch').val(data[0].CONCILIACION).trigger("change")
            }
        });

    })

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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