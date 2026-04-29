var activeTable = null
storeid = null;
$(()=>{
    window.stores = {
        init:()=>{
            stores.ajax.getStores()
        },
        ajax:{
            getStores:()=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.addfullPageLoader()
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getStoresApi}`,
                        dataType:'json',
                    }).then((response)=>{
                        if ($.fn.DataTable.isDataTable("#stores-table")) {
                            activeTable.clear();
                            activeTable.destroy();
                            $("#stores-table tbody").empty();
                        }
                        let storeid;
                        if(stores.funx.getStoreId() != null){
                            storeid = stores.funx.getStoreId();
                        };
                        if(Object.keys(response.data).length > 0){
                            $.each(response.data,function(k,v){
                                $("#stores-table")
                                .find("tbody")
                                .append(
                                    $("<tr>")
                                        .append(
                                            $("<td>")
                                                .text(v.storeid),
                                            v.storeid == storeid ? $("<td>").append(
                                                $("<span>")
                                                    .addClass("badge badge-primary")
                                                    .text("Selected"),
                                                ` ${v.storeName}`,
                                            ) : $("<td>").append(
                                                v.storeName,
                                            ),
                                            $("<td>")
                                                .text(v.contact),
                                            $("<td>")
                                                .text(v.address),
                                            $("<td>")
                                                .text(v.email),
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
                                                    'data-target':'#updateStores'
                                                })
                                                .click(function(){
                                                    storeid = v.storeid;
                                                    $("#frm-update-store").find("input[name=store]").val(v.storeName);
                                                    $("#frm-update-store").find("input[name=contact]").val(v.contact);
                                                    $("#frm-update-store").find("input[name=address]").val(v.address);
                                                    $("#frm-update-store").find("input[name=email]").val(v.email);
                                                    $("#frm-update-store").find("textarea[name=description]").val(v.description);
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
                      
                    })
                     
                }).then(()=>{
                    jsAddon.display.removefullPageLoader()
                    activeTable = $('#stores-table').DataTable({});
               })
            },
            addStore:(payload)=>{
                jsAddon.display.addFormLoading('frm-add-store')
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'post',
                        url:addStoreApi,
                        dataType:'json',
                        payload:payload,
                    }).then((response)=>{
                        if(!response.isError){
                            stores.ajax.getStores()
                            $(".modal").modal("hide")
                        }
                        jsAddon.display.swalMessage(response._isError,response.reason);
                        jsAddon.display.removeFormLoading('frm-add-store');
                    })
                     
                })
            },
            updateStore:(payload)=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.addFormLoading('frm-update-store')
                    jsAddon.display.ajaxRequest({
                        type:'post',
                        url:updateStoreApi,
                        dataType:'json',
                        payload:payload,
                    }).then((response)=>{
                        if(!response.isError){
                            stores.ajax.getStores()
                            $(".modal").modal("hide")
                        }
                        jsAddon.display.swalMessage(response._isError,response.reason);
                        jsAddon.display.removeFormLoading('frm-update-store')
                    })
                     
                })
            }
        },
        funx:{
            getStoreId:()=>{
                if(localStorage.getItem("activeStore") != null){
                    activeStore  = JSON.parse(localStorage.getItem("activeStore"));
                    return activeStore.storeid;
                }
                return null
            }
        }
    }

    stores.init();
    $("#frm-add-store").validate({
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
        },
        submitHandler: function(form) {

            var payload = {
                'storeName':$(form).find('input[name=store]').val(),
                'contact':$(form).find('input[name=contact]').val(),
                'address':$(form).find('input[name=address]').val(),
                'email':$(form).find('input[name=email]').val(),
                'description':$(form).find('textarea[name=description]').val(),
                
            };
            
            stores.ajax.addStore(payload);
        }
    })
    $("#frm-update-store").validate({
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
        },
        submitHandler: function(form) {

            var payload = {
                'storeName':$(form).find('input[name=store]').val(),
                'contact':$(form).find('input[name=contact]').val(),
                'address':$(form).find('input[name=address]').val(),
                'email':$(form).find('input[name=email]').val(),
                'description':$(form).find('textarea[name=description]').val(),
                'storeid':storeid,
                
            };
            
            stores.ajax.updateStore(payload);
        }
    })
    
})