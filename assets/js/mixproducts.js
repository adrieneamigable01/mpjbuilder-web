


$(()=>{
    var dataSet                 = [],
    activeTable                 =   null,
    mixproductid                   = null,
    productTypeId           = null,
    mixproductPriceIndex,
    mixproducts = {
        
        init:()=>{
            mixproducts.ajax.getProducts()
            mixproducts.ajax.getProductType()
            // mixproducts.ajax.getStores()
            // mixproducts.ajax.getSuppliers()
            mixproducts.ajax.getMixProducts()
            mixproducts.ajax.getUnit()
        },
        ajax:{
            getUnit:()=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getStockUnitApi}`,
                        dataType:'json',
                    }).then((response)=>{
                        if(!response._isError){
                            $("#unit").empty()
                            $.each(response.data,function(k,v){
                                $("#unit").append(
                                    $("<option>")
                                        .attr({
                                            value:v.unitid,
                                            title:v.unit
                                        })
                                        .text(v.abbreviations)
                                )
                                if (Object.keys(response.data).length - 1 == k) {
                                    resolve(true)
                                }
                            })
                        }
                    })
                }).then(()=>{
                    $("#unit").select2({

                    })
                })
            },
            getMixProducts:()=>{
    
                let tbody = $("<tbody>");
              

                if ($.fn.DataTable.isDataTable("#mixproducts-table")) {
                    activeTable.clear();
                    activeTable.destroy();
                    $("#mixproduct-loading").remove();
                    $("#mixproducts-table tbody").remove()
                    
                }
                
                $("#mixproducts-table")
                .append(
                    $("<tbody>")
                    .attr({
                        id:'mixproduct-loading'
                    })
                    .append(
                        $("<tr>").append(
                            $("<td colspan='15'>").append(
                                $("<i>").addClass("fa fa-spinner fa-spin")
                            )
                        )
                    )
                );

                return new Promise((resolve,reject)=>{
                    jsAddon.display.addfullPageLoader()
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getMixProductsApi}`,
                        dataType:'json',
                        payload:{
                            storeid:$("#storeFilter").val()
                        },
                    }).then((response)=>{
                        
                        
                        if(Object.keys(response.data).length > 0){
                            $.each(response.data,function(k,v){
                                tbody
                                .addClass("small")
                                .append(
                                    $("<tr>")
                                        .append(
                                            $("<td>")
                                                .text(k + 1),
                                            $("<td>")
                                                .text(v.mixproductid),
                                            $("<td>")
                                            .text(`${v.product_name} (${v.productType})`),
                                            $("<td>")
                                                .text(v.quantity),
                                            $("<td>")
                                                .text(v.selling_price),
                                            $("<td>")
                                                .append(function(){
                                                    var d = JSON.parse(v.mix_components);
                                                    var html = $("<div>").addClass("text-left").css({"font-size":'10px'})
                                                    $.each(d,function(k,v){
                                                        $.each(v,function(kk,kv){
                                                            let str = kk; // your initial string
                                                            str = str.replace(/_/g, ' '); // convert to uppercase and replace underscores
                                                            let capitalizedStr = str.replace(/\b\w/g, char => char.toUpperCase());
                                                            html.append(
                                                                $("<b>").text(`${capitalizedStr} :`),
                                                                $("<span>").text(`${kv}`),
                                                                $('<br>')
                                                            )
    
                                                        })
                                                       
                                                        html.append(
                                                            $('<br>')
                                                        )
                                                       
                                                    });
                                                    return html;
                                                }),
                                        
                                            $("<td>")
                                                .text(`${v.unit} (${v.abbreviations})`),
                                            $("<td>")
                                                .text(v.dateCreated),
                                            $("<td>")
                                                .text(v.details),
                                            $("<td>")
                                            .addClass("text-center")
                                            .append(
                                                $("<button>")
                                                .addClass("btn btn-success btn-sm")
                                                .text("Update")
                                                .click(function(){
                                                    mixproductid  = v.mixproductid;
                                                    $("#frm-mixproduct :input[name=product-to-convert]").val(v.productid).trigger('change')
                                                    $("#frm-mixproduct :input[name=productTypeId]").val(v.productTypeId).trigger('change')
                                                    $("#frm-mixproduct :input[name=unit]").val(v.unitid).trigger('change')
                                                    $("#frm-mixproduct :input[name=quantity]").val(v.quantity)
                                                    $("#frm-mixproduct :input[name=sellingPrice]").val(v.selling_price)
                                                    $("#frm-mixproduct :input[name=details]").val(v.details)

                                                    
                                                    $("#mixproduct_container").empty();

                                                    let mix_components = JSON.parse(v.mix_components);

                                                    for (let index = 0; index < mix_components.length; index++) {
                                                        const element = mix_components[index];

                                                        const rowDiv = $("<div>").addClass("row");;
                                                        let convertion_length = index;
                                                        const conversionUnitGroup = $("<div>").addClass("form-group col").append(
                                                            $("<label>").attr("for", "conversion_unit").text("Unit"),
                                                            $("<select>")
                                                                .addClass("form-control conversion_unit")
                                                                .attr({
                                                                    id: `conversion_unit_${convertion_length}`,
                                                                    name: `conversion_unit_${convertion_length}`,
                                                                    "aria-describedby": "conversion_unit"
                                                                })
                                                        );
                                                        
                                                        const conversionQuantityGroup = $("<div>").addClass("form-group col").append(
                                                            $("<label>").attr("for", "conversion_quantity").text("Conversion Quantity"),
                                                            $("<input>")
                                                                .attr({
                                                                    type: "text",
                                                                    class: "form-control conversion_quantity",
                                                                    id: `conversion_quantity_${convertion_length}`,
                                                                    name: `conversion_quantity_${convertion_length}`,
                                                                    "aria-describedby": `conversion_quantity_${convertion_length}`,
                                                                    placeholder: "Conversion Quantity"
                                                                })
                                                        );
                                                
                                                        const conversionProductGroup = $("<div>").addClass("form-group col").append(
                                                            $("<label>").attr("for", "conversion_product").text("Conversion Product"),
                                                            $("<select>")
                                                                .addClass("form-control conversion_product")
                                                                .attr({
                                                                    id: `conversion_product_${convertion_length}`,
                                                                    name: `conversion_product_${convertion_length}`,
                                                                    "aria-describedby": `conversion_product_${convertion_length}`,
                                                                })
                                                        );
                                                        rowDiv.append(conversionProductGroup, conversionUnitGroup, conversionQuantityGroup);
                                                        $("#mixproduct_container").append(rowDiv)
                                                
                                                        mixproducts.ajax.getConvertionMixPoductUnit(convertion_length).then(()=>{
                                                            $(`#conversion_unit_${convertion_length}`).val(element.unit);
                                                        });
                                                        mixproducts.ajax.getConvertionMixProduct({},convertion_length).then(()=>{
                                                            $(`#conversion_product_${convertion_length}`).val(element.productid);
                                                        });
                                                        $(`#conversion_quantity_${convertion_length}`).val(element.quantity);
                                                        
                                                    }

                                                    
                                                    $("#mixMaterialModal").modal("show");
                                                }),
                                            )
                                        )
                                )
                            
                                if (Object.keys(response.data).length - 1 == k) {
                                    $("#mixproduct-loading").remove();
                                    $("#mixproducts-table tbody").remove()
                                    $("#mixproducts-table")
                                    .append(tbody);
                                    resolve(true);
                                }
                            })  
                        }else{
                            $("#mixproduct-loading").remove();
                            $("#mixproducts-table tbody").remove()
                            $("#mixproducts-table")
                            .append(tbody);
                            resolve(true)
                        }
                    })
                }).then(()=>{
                    jsAddon.display.removefullPageLoader()
                    activeTable = $('#mixproducts-table').DataTable({});
               })
            },
            getProductType:()=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getProductTypeApi}`,
                        dataType:'json',
                    }).then((response)=>{
                        if(!response._isError){
                           
                            $.each(response.data,function(k,v){
                                $(".product-type-menu")
                                .append(
                                    $("<option>")
                                        .text(v.productType)
                                        .attr({
                                            value:v.productTypeId
                                        })
                                )
                                if (Object.keys(response.data).length - 1 == k) {
                                    mixproducts.ajax.getProductsToConvert({
                                        // productTypeId:response.data[0].productTypeId,
                                    });
                                    resolve(true)
                                }
                            })
                        }
                    })
                     
                }).then(()=>{
                    $(".product-type-menu").select2({})
                })
            },
            getProducts:(payload = {})=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getProductsApi}`,
                        dataType:'json',
                        payload:payload
                    }).then((response)=>{
                        if(!response._isError){
                            $(".product-menu").empty()
                            $.each(response.data,function(k,v){
                                $(".product-menu")
                                .append(
                                    $("<option>")
                                        .text(v.product_name)
                                        .attr({
                                            value:v.productid,
                                            'data-value':JSON.stringify(v)
                                        })
                                )
                                if (Object.keys(response.data).length - 1 == k) {
                                    resolve(true)
                                }
                            })
                        }
                    })
                     
                }).then(()=>{
                    $(".product-menu").select2({
                        placeholder: "Select Product",
                        allowClear: true
                    })
                })
            },
            getProductsToConvert:(payload = {})=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getProductsApi}`,
                        dataType:'json',
                        payload:payload
                    }).then((response)=>{
                        if(!response._isError){
                            $(".product-to-convert").empty()
                            $.each(response.data,function(k,v){
                                $(".product-to-convert")
                                .append(
                                    $("<option>")
                                        .text(v.product_name)
                                        .attr({
                                            value:v.productid
                                        })
                                )
                                if (Object.keys(response.data).length - 1 == k) {
                                    resolve(true)
                                }
                            })
                        }
                    })
                     
                }).then(()=>{
                    $(".product-to-convert").select2({
                        placeholder: "Select Product",
                        allowClear: true
                    })
                })
            },
            getStores:()=>{
               
                            
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getStoresApi}`,
                        dataType:'json',
                    }).then((response)=>{
                        $(".store-type-menu-filter")
                        .empty()
                        .append(
                            $("<option>")
                                .attr({
                                    value:'All',
                                    selected:'seleted'
                                })
                                .text("All")
                        )

                        if(!response._isError){
                            $.each(response.data,function(k,v){

                                $(".store-type-menu-filter")
                                .append(
                                    $("<option>")
                                        .text(v.storeName)
                                        .attr({
                                            value:v.storeid
                                        })
                                )


                                $(".store-type-menu")
                                .append(
                                    $("<option>")
                                        .text(v.storeName)
                                        .attr({
                                            value:v.storeid
                                        })
                                )
                            })
                        }
                    })
                })
            },
            getSuppliers:()=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getSuppliersApi}`,
                        dataType:'json',
                    }).then((response)=>{
                        if(!response._isError){
                            $.each(response.data,function(k,v){
                                $(".supplier-type-menu")
                                .append(
                                    $("<option>")
                                        .text(v.companyName)
                                        .attr({
                                            value:v.supplierId
                                        })
                                )
                             })  
                             resolve(true);
                        }
                    })
                })
            },
            addMixProduct:(payload)=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.addFormLoading('#frm-mixproduct')
                    jsAddon.display.ajaxRequest({
                        type:'post',
                        url:`${addMixProductApi}`,
                        dataType:'json',
                        payload:payload,
                    }).then((response)=>{
                        if(!response._isError){
                            mixproducts.ajax.getMixProducts()
                            $('#frm-mixproduct')[0].reset()
                            // $('#preview').attr('src', '').hide();
                            $(".modal").modal("hide")
                         }
                         jsAddon.display.swalMessage(response._isError,response.reason);
                         jsAddon.display.removeFormLoading('#frm-mixproduct');
                    })
                     
                })
            },
            updateMixProduct:(payload)=>{
                jsAddon.display.addFormLoading('#frm-mixproduct')
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'post',
                        url:`${updateMixProductApi}`,
                        dataType:'json',
                        payload:payload,
                    }).then((response)=>{
                        if(!response._isError){
                            mixproductid  = null;
                            mixproducts.ajax.getMixProducts()
                            $('#frm-mixproduct')[0].reset()
                            $(".modal").modal("hide")
                         }
                         jsAddon.display.swalMessage(response._isError,response.reason);
                         jsAddon.display.removeFormLoading('#frm-mixproduct');
                    })
                     
                })
            },
            getConvertionMixPoductUnit:(index = null)=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getStockUnitApi}`,
                        dataType:'json',
                    }).then((response)=>{
                        if(!response._isError){
                            let convertion_length = index == null ? $(".conversion_unit").length - 1 : index;
                    
                            $(".conversion_unit").eq(convertion_length).empty();
                            $.each(response.data,function(k,v){
                                $(".conversion_unit").eq(convertion_length).append(
                                    $("<option>")
                                        .attr({
                                            value:v.unitid,
                                            title:v.unit
                                        })
                                        .text(v.abbreviations)
                                )
                                if (Object.keys(response.data).length - 1 == k) {
                                    resolve(true)
                                }
                            })
                        }
                    })
                })
            },
            getConvertionMixProduct:(payload,index= null)=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getProductsApi}`,
                        dataType:'json',
                        payload:payload
                    }).then((response)=>{
                        if(!response._isError){
                            let convertion_length = index == null ? $(".conversion_product").length - 1 : index;
                    
                            $(".conversion_product").eq(convertion_length).empty();
                            $.each(response.data,function(k,v){
                                $(".conversion_product").eq(convertion_length).append(
                                    $("<option>")
                                        .text(v.product_name)
                                        .attr({
                                            value:v.productid,
                                            'data-value':JSON.stringify(v)
                                        })
                                )
                                if (Object.keys(response.data).length - 1 == k) {
                                    resolve(true)
                                }
                            })
                        }
                    })
                     
                })
            },
            
        }
    }
    mixproducts.init();
    $("#storeFilter").on("change",function(){
        mixproducts.ajax.getMaterials()
    })
    $(".product-type-menu").change(function(){
        let id = $(this).val();
        productTypeId = id;
        mixproducts.ajax.getProductsToConvert({
            productTypeId:id,
        });
    })
    $("#add-mixproducts").click(function(){
        $('#frm-mixproduct')[0].reset()
        $('#preview').attr('src', '').hide();
        $("#mixMaterialModal").modal("show");
        mixproductid  = null;
        $("#mixproduct_container").empty();

    })
    $('#product-image').on('change', function(event) {
        // Get the selected file
        const file = event.target.files[0];
        
        if (file) {
            // Create a FileReader object
            const reader = new FileReader();

            // Define the onload event for the FileReader
            reader.onload = function(e) {
                // Set the preview image source to the FileReader result
                $('#preview').attr('src', e.target.result).show(); // Show the preview image
            };

            // Read the selected file as a data URL
            reader.readAsDataURL(file);
        } else {
            // Hide the preview if no file is selected
            $('#preview').hide();
        }
    });
    $("#frm-mixproduct").validate({
        errorElement: 'span',
		errorClass: 'text-danger',
	    highlight: function (element, errorClass, validClass) {
	      $(element).closest('.form-group').addClass("has-warning");
	      $(element).closest('.form-group').find("input").addClass('is-invalid');
	      $(element).closest('.form-group').find("select").addClass('is-invalid');
	    },
	    unhighlight: function (element, errorClass, validClass) {
	      $(element).closest('.form-group').removeClass("has-warning");
	      $(element).closest('.form-group').find("input").removeClass('is-invalid');
	      $(element).closest('.form-group').find("select").removeClass('is-invalid');
	    },
        rules:{
            productid:{
                required:true,
            },
            'product-to-convert':{
                required:true,
            },
            unit:{
                required:true,
            },
            quantity:{
                required:true,
            },
            sellingPrice:{
                required:true,
            },
            details:{
                required:true,
            },
        },
        submitHandler: function(form) {
            mix_components = [];
            let conversion_unit = $(".conversion_unit");
            if(conversion_unit.length > 0){
               for (let index = 0; index < conversion_unit.length; index++) {
                    let selected_product = $(".conversion_product").eq(index).find("option:selected").data("value");
                    mix_components.push(
                        {
                            "productid": $(".conversion_product").eq(index).val(),
                            "product_name":selected_product.product_name,
                            "product_type":selected_product.product_type,
                            "quantity": $(".conversion_quantity").eq(index).val(),
                            "unit":$(".conversion_unit").eq(index).val() ,
                            "unit_name":$(".conversion_unit").eq(index).find("option:selected").text()
                        }
                    )
               }
            }


            var payload = {
                'mix_components':JSON.stringify(mix_components),
                'product-to-convert':$(form).find(':input[name=product-to-convert]').val(),
                'unit':$(form).find(':input[name=unit]').val(),
                'quantity':$(form).find(':input[name=quantity]').val(),
                'sellingPrice':$(form).find(':input[name=sellingPrice]').val(),
                'details':$(form).find(':input[name=details]').val(),
            };

            if(mixproductid  == null){
                mixproducts.ajax.addMixProduct(payload);
            }else{
                payload.mixproductid  = mixproductid ;
                mixproducts.ajax.updateMixProduct(payload);
            }
        }
    })
    $(document).on('click','#add-mixproduct',function(){
        
        const rowDiv = $("<div>").addClass("row");;
        let convertion_length = $(".conversion_unit").length;
        const conversionUnitGroup = $("<div>").addClass("form-group col").append(
            $("<label>").attr("for", "conversion_unit").text("Unit"),
            $("<select>")
                .addClass("form-control conversion_unit")
                .attr({
                    id: `conversion_unit_${convertion_length}`,
                    name: `conversion_unit_${convertion_length}`,
                    "aria-describedby": "conversion_unit"
                })
        );
        
        const conversionQuantityGroup = $("<div>").addClass("form-group col").append(
            $("<label>").attr("for", "conversion_quantity").text("Conversion Quantity"),
            $("<input>")
                .attr({
                    type: "text",
                    class: "form-control conversion_quantity",
                    id: `conversion_quantity_${convertion_length}`,
                    name: `conversion_quantity_${convertion_length}`,
                    "aria-describedby": `conversion_quantity_${convertion_length}`,
                    placeholder: "Conversion Quantity"
                })
        );

        const conversionProductGroup = $("<div>").addClass("form-group col").append(
            $("<label>").attr("for", "conversion_product").text("Conversion Product"),
            $("<select>")
                .addClass("form-control conversion_product")
                .attr({
                    id: `conversion_product_${convertion_length}`,
                    name: `conversion_product_${convertion_length}`,
                    "aria-describedby": `conversion_product_${convertion_length}`,
                })
        );
        rowDiv.append(conversionProductGroup, conversionUnitGroup, conversionQuantityGroup);
        $("#mixproduct_container").append(rowDiv)

        mixproducts.ajax.getConvertionMixPoductUnit();
        mixproducts.ajax.getConvertionMixProduct({
            productTypeId:productTypeId
        });
    })
    $("#unitid").change(function(){
        $(".selected-unit").text($(this).find("option:selected").text());
    });
})