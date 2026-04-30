

$(()=>{
    var dataSet                 = [],
    activeTable                 =   null,
    materialid                  = null,
    productTypeId           = null,
    stockPriceIndex,
    stocks = {
        
        init:()=>{
            stocks.ajax.getProductType()
            stocks.ajax.getStores()
            stocks.ajax.getSuppliers()
            stocks.ajax.getMaterials()
            stocks.ajax.getUnit()
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
                            $("#unitid").empty()
                            $(".selected-unit").text(response.data[0].abbreviations);
                            $.each(response.data,function(k,v){
                                $("#unitid").append(
                                    $("<option>")
                                        .attr({
                                            value:v.unitid,
                                            title:v.unit
                                        })
                                        .text(v.abbreviations)
                                )
                            })
                        }
                    })
                })
            },
            getMaterials:()=>{
    
                let tbody = $("<tbody>");
              

                if ($.fn.DataTable.isDataTable("#stocks-table")) {
                    activeTable.clear();
                    activeTable.destroy();
                    $("#stocks-table tbody").remove()
                    $("#stock-loading").remove();
                    
                }
                
                $("#stocks-table")
                .append(
                    $("<tbody>")
                    .attr({
                        id:'stock-loading'
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
                        url:`${getMaterialsApi}`,
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
                                                .text(v.materialid),
                                            $("<td>")
                                                .text(v.storeName),
                                            $("<td>")
                                                .text(`${v.product_name} (${v.productType})`),
                                            $("<td>")
                                                .text(v.purchase_price),
                                            $("<td>")
                                                .text(v.selling_price),
                                            $("<td>")
                                                .text(v.quantity * v.size),
                                            $("<td>")
                                                .text(`${v.unit} (${v.abbreviations})`),
                                            $("<td>")
                                                .text(v.companyName),
                                            $("<td>")
                                                .text(v.dateCreated),
                                            $("<td>")
                                                .text(v.description),
                                            $("<td>")
                                            .addClass("text-center")
                                            .append(
                                                $("<button>")
                                                .addClass("btn btn-success btn-sm")
                                                .text("Update")
                                                .click(function(){
                                                    materialid = v.materialid;
                                                    
                                                    $('#frm-material :input[name=store]').val(v.storeid).trigger('change')
                                                    $('#frm-material :input[name=product]').val(v.product_name)
                                                    $('#frm-material :input[name=productTypeId]').val(v.productTypeId).trigger('change')
                                                    $('#frm-material :input[name=supllier] option').val(v.supplierId).trigger('change')
                                                    $("#frm-material input[name=price]").val(v.price);
                                                    $("#frm-material input[name=selling_price]").val(v.selling_price);
                                                    $("#frm-material input[name=purchase_price]").val(v.purchase_price);
                                                    $("#frm-material input[name=quantity]").val(v.quantity);
                                                    $("#frm-material input[name=size]").val(v.size);
                                                    $("#frm-material input[name=unitid]").val(v.unitid).trigger('change')
                                                    $("#frm-material textarea[name=description]").val(v.description);
                                                    let imageLink  =`${baseUrl}/uploads/product/${v.productId}/${v.image}`
                                                    $('#preview').attr('src', '').hide();
                                                    jsAddon.display.convertImageToBase64(imageLink).then((res)=>{
                                                        $('#preview').attr('src', res).show(); // Show the preview image
                                                    })
                                                    $("#materialModal").modal("show");
                                                }),
                                            )
                                        )
                                )
                            
                                if (Object.keys(response.data).length - 1 == k) {
                                    $("#stock-loading").remove();
                                        
                                    $("#stocks-table")
                                    .append(tbody);

                                    resolve(true);
                                }
                            })  
                        }else{
                            $("#stocks-table tbody").remove()
                            $("#stock-loading").remove();
                            resolve(true)
                        }
                    })
                }).then(()=>{
                    jsAddon.display.removefullPageLoader()
                    activeTable = $('#stocks-table').DataTable({});
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
                            if(Object.keys(response.data).length > 0){
                                stocks.ajax.getProducts({
                                    productTypeId:response.data[0].productTypeId,
                                });
                                $.each(response.data,function(k,v){
                                    $(".product-type-menu")
                                    .append(
                                        $("<option>")
                                            .text(v.productType)
                                            .attr({
                                                value:v.productTypeId
                                            })
                                    )
                                })
                            }
                        }
                    })
                     
                })
            },
            getProducts:(payload)=>{
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
                                            value:v.productid
                                        })
                                )
                            })
                        }
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
            addMaterial:(payload)=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.addFormLoading('#frm-material')
                    jsAddon.display.ajaxRequest({
                        type:'post',
                        url:`${addMaterialApi}`,
                        dataType:'json',
                        payload:payload,
                    }).then((response)=>{
                        if(!response._isError){
                            stocks.ajax.getMaterials()
                            $('#frm-material')[0].reset()
                            // $('#preview').attr('src', '').hide();
                            $(".modal").modal("hide")
                         }
                         jsAddon.display.swalMessage(response._isError,response.reason);
                         jsAddon.display.removeFormLoading('#frm-material');
                    })
                     
                })
            },
            updateMaterial:(payload)=>{
                jsAddon.display.addFormLoading('#frm-material')
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'post',
                        url:`${updateMaterialApi}`,
                        dataType:'json',
                        payload:payload,
                    }).then((response)=>{
                        if(!response._isError){
                            materialid = null;
                            stocks.ajax.getMaterials()
                            $('#frm-material')[0].reset()
                            $('#preview').attr('src', '').hide();
                            $(".modal").modal("hide")
                         }
                         jsAddon.display.swalMessage(response._isError,response.reason);
                         jsAddon.display.removeFormLoading('#frm-material');
                    })
                     
                })
            }
        }
    }
    stocks.init();
    $("#storeFilter").on("change",function(){
        stocks.ajax.getMaterials()
    })
    $(".product-type-menu").change(function(){
        let id = $(this).val();
        productTypeId = id;
        stocks.ajax.getProducts({
            productTypeId:id,
        });
    })
    $("#add-stocks").click(function(){
        $('#frm-material')[0].reset()
        $('#preview').attr('src', '').hide();
        $("#materialModal").modal("show");
        materialid = null;
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
    $("#frm-material").validate({
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
            store:{
                required:true,
            },
            product:{
                required:true,
            },
            supllier:{
                required:true,
            },
            price:{
                required:true,
                min:0.1,
            },
            quantity:{
                required:true,
                min:0.1,
            },
            // barCode:{
            //     required:true,
            //     min:0.1,
            // },
            // expirationDate:{
            //     required:true,
            // },
            label:{
                required:true,
            },
        },
        submitHandler: function(form) {
            
            var payload = {
                'store':$(form).find(':input[name=store]').val(),
                'productid':$(form).find(':input[name=productid]').val(),
                'selling_price':$(form).find(':input[name=selling_price]').val(),
                'supplier':$(form).find(':input[name=supplier]').val(),
                'purchase_price':$(form).find(':input[name=purchase_price]').val(),
                'quantity':$(form).find(':input[name=quantity]').val(),
                'unitid':$(form).find(':input[name=unitid]').val(),
                'barCode':$(form).find(':input[name=barCode]').val(),
                'expirationDate':$(form).find(':input[name=expirationDate]').val(),
                'description':$(form).find('textarea[name=description]').val(),
                'length':$(form).find(':input[name=length]').val(),
                'width':$(form).find(':input[name=width]').val(),
                'thickness':$(form).find(':input[name=thickness]').val(),
                'size':$(form).find(':input[name=size]').val(),
            };

            if(materialid == null){
                stocks.ajax.addMaterial(payload);
            }else{
                payload.materialid = materialid;
                stocks.ajax.updateMaterial(payload);
            }
        }
    })
    $(document).on('click','#add-convertion',function(){
        
        const rowDiv = $("<div>").addClass("row");;
        let convertion_length = $(".conversion_unit").length;
        const conversionUnitGroup = $("<div>").addClass("form-group col").append(
            $("<label>").attr("for", "conversion_unit").text("Conversion Unit"),
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
        
        const conversionPriceGroup = $("<div>").addClass("form-group col").append(
            $("<label>").attr("for", "conversion_price").text("Selling Price"),
            $("<input>")
                .attr({
                    type: "text",
                    class: "form-control conversion_price",
                    id: `conversion_price_${convertion_length}`,
                    name: `conversion_price_${convertion_length}`,
                    "aria-describedby": `conversion_price_${convertion_length}`,
                    placeholder: "Selling Price"
                })
        );

        rowDiv.append(conversionProductGroup, conversionUnitGroup, conversionQuantityGroup, conversionPriceGroup);
        $("#conversion_container").append(rowDiv)

        stocks.ajax.getConvertionStockUnit();
        stocks.ajax.getConvertionStockProduct({
            productTypeId:productTypeId
        });
    })
    $("#unitid").change(function(){
        $(".selected-unit").text($(this).find("option:selected").text());
    });
})