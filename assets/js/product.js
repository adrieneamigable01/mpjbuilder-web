var productid = null,
activeTable  = null;
productData = null;
$(()=>{
    product = {
        init:()=>{
            product.ajax.getProduct()
            product.ajax.getproductType()
        },
        ajax:{
            getProduct:()=>{
                return new Promise((resolve,reject)=>{

                    let tbody = $("<tbody>");
              

                    if ($.fn.DataTable.isDataTable("#product-table")) {
                        activeTable.clear();
                        activeTable.destroy();
                        $("#product-table tbody").remove();
                    }
                    
                    $("#product-table")
                    .append(
                        $("<tbody>")
                        .attr({
                            id:'product-loading'
                        })
                        .append(
                            $("<tr>").append(
                                $("<td colspan='7'>").append(
                                    $("<i>").addClass("fa fa-spinner fa-spin")
                                )
                            )
                        )
                    );

                    
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getProductsApi}`,
                        dataType:'json',
                    }).then((response)=>{
                        
                        if(!response._isError){
                            if(Object.keys(response.data).length > 0){
                                productData = response.data;
                                tbody.empty()
                                $.each(response.data,function(k,v){
                                   
                                    tbody.addClass("small")
                                        .append(
                                            $("<tr>")
                                                .append(
                                                    $("<td>")
                                                        .text(v.productid),
                                                    $("<td>")
                                                        .text(v.product_name),
                                                    $("<td>")
                                                        .text(v.productCode),
                                                    $("<td>")
                                                        .text(v.productType),
                                                    $("<td>")
                                                        .text(v.length == null ? "N/A" : `${v.length} x ${v.width} x ${v.thickness} `),
                                                    $("<td>")
                                                        .text(v.restock_quantity),
                                                    $("<td>")
                                                        .text(v.image),
                                                    $("<td>")
                                                    .addClass("text-center")
                                                    .append(
                                                        $("<button>")
                                                        .addClass("btn btn-success btn-sm")
                                                        .text("Update")
                                                        .click(function(){
                                                            productid = v.productid;
                                                            $("#frm-add-product :input[name=product_name]").val(v.product_name);
                                                            $("#frm-add-product :input[name=productTypeId]").val(v.productTypeId);
                                                            $("#frm-add-product :input[name=restock_quantity]").val(v.restock_quantity);
                                                            $("#frm-add-product :input[name=productCode]").val(v.productCode);
                                                            $("#frm-add-product :input[name=length]").val(v.length);
                                                            $("#frm-add-product :input[name=width]").val(v.width);
                                                            $("#frm-add-product :input[name=thickness]").val(v.thickness);
                                                            $("#productModal").modal("show")
                                                        }),
                                                    )
                                                )
                                        )
                                    if (Object.keys(response.data).length - 1 == k) {
                                        $("#product-loading").remove();
                                        $("#product-table")
                                        .append(tbody);
                                        resolve(true);
                                    }
                                })
                            }else{
                                $("#product-loading").remove();
                                resolve(true);
                            }
                        }
                       
                    })
                        
                })
                .then(data=>{
                    if(data){
                        jsAddon.display.removefullPageLoader()
                        activeTable = $('#product-table').DataTable({});
                    }
                })
            },
            getproductType:()=>{
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
                            })
                        }
                    })
                     
                })
            },
            addproduct:(payload)=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxFilesRequest({
                        type:'post',
                        url:addProductApi,
                        dataType:'json',
                        payload:payload,
                    }).then((response)=>{
                        if(!response._isError){
                            product.ajax.getProduct()
                            $(".modal").modal("hide")
                        }
                        jsAddon.display.swalMessage(response._isError,response.reason);
                    })
                     
                })
            },
            updateproduct:(payload)=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxFilesRequest({
                        type:'post',
                        url:updateProductApi,
                        dataType:'json',
                        payload:payload,
                    }).then((response)=>{
                        if(!response._isError){
                            product.ajax.getProduct()
                            $(".modal").modal("hide")
                            productId = null;
                        }
                        jsAddon.display.swalMessage(response._isError,response.reason);
                    })
                     
                })
            }
        },
        display:{
            displayCompositionProduct:()=>{
                $("#productid").empty();
                $("#productid").append(
                    $("<option>")
                        .attr({
                            value:''
                        })
                        .css({
                            display:'none'
                        })
                        .text("Select a product")
                )
                if(productData.length > 0){
                    $.each(productData,function(k,v){
                        $("#productid").append(
                            $("<option>")
                                .attr({
                                    value:v.productid
                                })
                                .text(v.product_name)
                        )
                        if (Object.keys(productData).length - 1 == k) {
                            $("#productid").select2()
                        }
                    })
                    
                }
            }
        }
    }
    product.init();
    $('#productModal').on('shown.bs.modal', function() {
        product.display.displayCompositionProduct()
        $(document).off('focusin.modal');
    });

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
    $("#add-product").click(function(){
        $("#productModal").modal("show")
        $('#frm-add-product')[0].reset()
        productid = null;
    })
    $("#frm-add-product").validate({
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
            product_name:{
                required:true,
            },
        },
        submitHandler: function(form) {

            let mix_components_ids = $(form).find(':input[name=productid]').val();
            var data = {
                'product_name':$(form).find(':input[name=product_name]').val(),
                'productTypeId':$(form).find(':input[name=productTypeId]').val(),
                'restock_quantity':$(form).find(':input[name=restock_quantity]').val(),
                'productCode':$(form).find(':input[name=productCode]').val(),
                'length': $(form).find(':input[name=length]').val(),
                'width': $(form).find(':input[name=width]').val(),
                'thickness': $(form).find(':input[name=thickness]').val(),
                'product-image': $('#product-image')[0].files[0],
                'mix_components_ids': JSON.stringify(mix_components_ids)
            };

            

            if(productid == null){
                payload = jsAddon.display.objectToFormData(data)
                product.ajax.addproduct(payload);
            }else{
                data.productid = productid;
                payload = jsAddon.display.objectToFormData(data)
                product.ajax.updateproduct(payload);
            }
        }
    })
})