var productTypeId = null,
activeTable  = null;
$(()=>{
    producttype = {
        init:()=>{
            producttype.ajax.getProductType()
        },
        ajax:{
            getProductType:()=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getProductTypeApi}`,
                        dataType:'json',
                    }).then((response)=>{
                        if ($.fn.DataTable.isDataTable("#product-type-table")) {
                            activeTable.clear();
                            activeTable.destroy();
                            $("#product-type-table tbody").empty();
                        }
                        if(!response._isError){
                            if(response.data.length > 0){
                                $.each(response.data,function(k,v){
                                    $("#product-type-table tbody")
                                        .addClass("small")
                                        .append(
                                            $("<tr>")
                                                .append(
                                                    $("<td>")
                                                        .text(v.productTypeId),
                                                    $("<td>")
                                                        .text(v.productType),
                                                    $("<td>")
                                                        .text(v.dateCreated),
                                                    $("<td>")
                                                        .text(v.lastDateUpdated),
                                                    $("<td>")
                                                        .text(v.description),
                                                    $("<td>")
                                                    .addClass("text-center")
                                                    .append(
                                                        $("<button>")
                                                        .addClass("btn btn-success btn-sm")
                                                        .text("Update")
                                                        .attr({
                                                            'data-toggle':'modal',
                                                            'data-target':'#updateProductType'
                                                        })
                                                        .click(function(){
                                                            productTypeId = v.productTypeId;
                                                            $("#frm-producttype").find("input[name=productType]").val(v.productType);
                                                            $("#frm-producttype").find("textarea[name=description]").val(v.description);
                                                            $("#productTypeModal").modal("show")
                                                        }),
                                                    )
                                                )
                                        )
                                    if (Object.keys(response.data).length - 1 == k) {
                                        resolve(true);
                                    }
                                })
                            }else{
                                resolve(true);
                            }
                        }else{
                            resolve(true);
                        }
                       
                    })
                        
                })
                .then(data=>{
                    if(data){
                        jsAddon.display.removefullPageLoader()
                        activeTable = $('#product-type-table').DataTable({});
                    }
                })
            },
            addProductType:(payload)=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'post',
                        url:addProductTypeApi,
                        dataType:'json',
                        payload:payload,
                    }).then((response)=>{
                        if(!response._isError){
                            producttype.ajax.getProductType()
                            $(".modal").modal("hide")
                        }
                        jsAddon.display.swalMessage(response._isError,response.reason);
                    })
                     
                })
            },
            updateProductType:(payload)=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'post',
                        url:updateProductTypeApi,
                        dataType:'json',
                        payload:payload,
                    }).then((response)=>{
                        if(!response._isError){
                            producttype.ajax.getProductType()
                            $(".modal").modal("hide")
                            productTypeId = null;
                        }
                        jsAddon.display.swalMessage(response._isError,response.reason);
                    })
                     
                })
            }
        }
    }
    producttype.init();
    $("#add-product").click(function(){
        $("#productTypeModal").modal("show")
        $('#frm-producttype')[0].reset()
        productTypeId = null;
    })
    $("#frm-producttype").validate({
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
            prductType:{
                required:true,
            },
        },
        submitHandler: function(form) {

            var payload = {
                'productType':$(form).find('input[name=productType]').val(),
                'description':$(form).find('textarea[name=description]').val(),
            };

            if(productTypeId == null){
                producttype.ajax.addProductType(payload);
            }else{
                payload.productTypeId = productTypeId;
                producttype.ajax.updateProductType(payload);
            }
        }
    })
})