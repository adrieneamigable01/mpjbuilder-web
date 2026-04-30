
var dataSet                 = [],
activeTable                 =   null,
supplierId                  = null;

$(()=>{
    suppliers = {
       
        init:()=>{
            $(".loading").hide();
            suppliers.ajax.getSuppliers()
        },
        ajax:{
            getSuppliers:()=>{
                jsAddon.display.addfullPageLoader()
                if ($.fn.DataTable.isDataTable("#suppliers-table")) {
                    activeTable.clear();
                    activeTable.destroy();
                    $("#suppliers-table tbody").empty();
                }
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getSuppliersApi}`,
                        dataType:'json',
                    }).then((response)=>{
                        if(Object.keys(response.data).length > 0){
                            $.each(response.data,function(k,v){
                                $("#suppliers-table")
                                    .find("tbody")
                                    .append(
                                        $("<tr>")
                                            .append(
                                                $("<td>")
                                                    .text(v.supplierId),
                                                $("<td>")
                                                    .text(v.companyName),
                                                $("<td>")
                                                    .text(v.supplierAddress),
                                                $("<td>")
                                                    .text(v.supplierContact),
                                                $("<td>")
                                                    .text(v.dateCreated),
                                                $("<td>")
                                                    .text(v.description),
                                                $("<td>")
                                                    .append(
                                                        $("<button>")
                                                        .addClass("btn btn-success btn-sm")
                                                        .text("Update")
                                                        .attr({
                                                            'data-toggle':'modal',
                                                            'data-target':'#updateSuppliers'
                                                        })
                                                        .click(function(){
                                                            supplierId = v.supplierId;
                                                            $("#frm-update-suppliers").find("input[name=companyName]").val(v.companyName);
                                                            $("#frm-update-suppliers").find("input[name=companyAddress]").val(v.supplierAddress);
                                                            $("#frm-update-suppliers").find("input[name=companyContact]").val(v.supplierContact);
                                                            $("#frm-update-suppliers").find("textarea[name=description]").val(v.description);
                                                        }),
                                                        // $("<button>")
                                                        //     .addClass("btn btn-danger btn-sm ml-1")
                                                        //     .text("Deactivate")
                                                        //     .click(function(){
                                                        //         supplierId = aData[0];
                                                        //         let parentTr = $(this).parents('tr');
                    
                                                        //         Swal.fire({
                                                        //             title: 'Are you sure?',
                                                        //             text: "You won't be able to revert this!",
                                                        //             icon: 'warning',
                                                        //             showCancelButton: true,
                                                        //             confirmButtonColor: '#3085d6',
                                                        //             cancelButtonColor: '#d33',
                                                        //             confirmButtonText: 'Yes, delete it!'
                                                        //         }).then((result) => {
                                                        //             if (result.value) {
                                                        //                 payload = {
                                                        //                     supplierId:supplierId,
                                                        //                     accessKey:accesskey,
                                                        //                 }
                                                        //                 suppliers.ajax.deactivateSupplier(payload)
                                                        //                 .then(function(response){
                                                        //                     if(!response._isError){
                                                        //                         activeTable
                                                        //                         .row( parentTr )
                                                        //                         .remove()
                                                        //                         .draw();
                                                        //                     }
                                                        //                     jsAddon.display.swalMessage(response._isError,response.reason);
                                                        //                     jsAddon.display.removefullPageLoader();
                                                        //                 })
                                                        //             }
                                                        //         })
                                                        //     })
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
                    activeTable = $('#suppliers-table').DataTable({});
                    jsAddon.display.removefullPageLoader()
                })
            },
            addSuppliers:(payload)=>{
                jsAddon.display.addFormLoading('frm-add-suppliers')
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'post',
                        url:addSuppliersApi,
                        dataType:'json',
                        payload:payload,
                    }).then((response)=>{
                        if(!response._isError){
                            suppliers.ajax.getSuppliers()
                            $(".modal").modal("hide")
                        }

                        jsAddon.display.swalMessage(response._isError,response.reason);
                        jsAddon.display.removeFormLoading('frm-add-suppliers');
                    })
                     
                })
            },
            updateSuppliers:(payload)=>{
                jsAddon.display.addFormLoading('frm-update-suppliers')
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'post',
                        url:updateSuppliersApi,
                        dataType:'json',
                        payload:payload,
                    }).then((response)=>{
                        if(!response._isError){
                            suppliers.ajax.getSuppliers()
                            $(".modal").modal("hide")
                        }
                        jsAddon.display.swalMessage(response._isError,response.reason);
                        jsAddon.display.removeFormLoading('frm-update-suppliers');
                    })
                     
                })
            },
            deactivateSupplier:(payload)=>{
                return new Promise((resolve,reject)=>{
                    $.ajax({
                        type:'post',
                        url:deactivateSupplerApi,
                        dataType:'json',
                        data:payload,
                        beforeSend:function(){
                            jsAddon.display.addfullPageLoader();
                        },
                        success:function(response){
                            resolve(response)
                        }
                    })
                })
            }
        }
    }
    suppliers.init();

    $("#frm-add-suppliers").validate({
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
            companyName:{
                required:true,
            },
        },
        submitHandler: function(form) {

            var payload = {
                'companyName':$(form).find('input[name=companyName]').val(),
                'supplierAddress':$(form).find('input[name=companyAddress]').val(),
                'supplierContact':$(form).find('input[name=companyContact]').val(),
                'description':$(form).find('textarea[name=description]').val(),
            };
            
            suppliers.ajax.addSuppliers(payload);
        }
    })
    $("#frm-update-suppliers").validate({
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
            companyName:{
                required:true,
            },
        },
        submitHandler: function(form) {

            var payload = {
                'supplierId':supplierId,
                'companyName':$(form).find('input[name=companyName]').val(),
                'supplierAddress':$(form).find('input[name=companyAddress]').val(),
                'supplierContact':$(form).find('input[name=companyContact]').val(),
                'description':$(form).find('textarea[name=description]').val(),
                
            };
            
            suppliers.ajax.updateSuppliers(payload);
        }
    })

    // let addMenuPayload = {
    //     'menuName':'Chocolate Cake',
    //     'menuTypeId':'2',
    //     'price':'259',
    // }

    // menu.ajax.addMenu(addMenuPayload);

})