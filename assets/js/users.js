$(()=>{
    var activeTable = null,
    userId= null,
    accesskey   = session.key;
    window.users = {
        init:()=>{
            users.ajax.getUsers();
        },
        ajax:{
            getUsers:()=>{
                let payload = {}

                if(users.funx.getStoreId() != null){
                    payload.storeid = users.funx.getStoreId();
                };
                return new Promise((resolve,reject)=>{
                    if ( $.fn.DataTable.isDataTable('#users-table') ) {
                        activeTable.clear();
                        activeTable.destroy();
                        $("#users-table").find("tbody").empty();
                    }
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getUsersApi}`,
                        dataType:'json',
                        payload:payload
                    }).then((response)=>{
                        if(!response._isError){
                            console.log('response.data',response.data)
                             $.each(response.data,function(k,v){
                                    
                                     $("#users-table")
                                     .find("tbody")
                                     .append(
                                         $("<tr>")
                                             .append(
                                                 $("<td>")
                                                     .text(v.userId),
                                                 $("<td>")
                                                     .text(v.name),
                                                 $("<td>")
                                                     .text(v.storeName),
                                                 $("<td>")
                                                     .text(v.email != null ? v.email : 'N/A'),
                                                 $("<td>")
                                                     .text(v.mobile != null ? v.mobile : 'N/A'),
                                                 $("<td>")
                                                     .text(v.userType),
                                                 $("<td>")
                                                     .text(v.role),
                                                 $("<td>")
                                                     .append(
                                                         $("<button>")
                                                         .addClass("btn btn-success btn-sm")
                                                         .text("Update")
                                                         .attr({
                                                             'data-toggle':'modal',
                                                             'data-target':'#updateUser'
                                                         })
                                                         .click(function(){
                                                            $("#userModal").modal("show")
                                                             userId = v.userId
                                                             // let storeName = aData[7].toLowerCase();
                                                             $("#frm-users :input[name=firstname]").val(v.firstName);
                                                             $("#frm-users :input[name=middlename]").val(v.middleName);
                                                             $("#frm-users :input[name=lastname]").val(v.lastName);
                                                             $("#frm-users :input[name=email]").val(v.email);
                                                             $("#frm-users :input[name=mobile]").val(v.mobile);
                                                             $("#frm-users :input[name=birthdate]").val(v.birthdate);
                                                             $("#frm-users :input[name=store]").val(v.storeid);
                                                             $("#frm-users :input[name=role]").val(v.role);
                                                         }),
                                                     ),
                                             )
                                     )
                             })
                             resolve(true)
                        }
                    })
                     
                })
                .then(data=>{
                    if(data){
                        activeTable = $("#users-table").DataTable();
                        jsAddon.display.removefullPageLoader()
                    }
                })
            },
            updateUser:(payload)=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.addFormLoading('#frm-users')
                    jsAddon.display.ajaxRequest({
                        type:'post',
                        url:`${updateUserApi}`,
                        dataType:'json',
                        payload:payload,
                    }).then((response)=>{
                        if(!response._isError){
                            $("#userModal").modal("hide");
                            $('#frm-users')[0].reset()
                            users.ajax.getUsers();
                        }
                        jsAddon.display.swalMessage(response._isError,response.reason);
                        jsAddon.display.removeFormLoading('#frm-users');
                    })
                     
                })
            },
            addUser:(payload)=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.addFormLoading('#frm-users')
                    jsAddon.display.ajaxRequest({
                        type:'post',
                        url:createUserApi,
                        dataType:'json',
                        payload:payload,
                    }).then((response)=>{
                        if(!response._isError){
                            $('#frm-users')[0].reset()
                            users.ajax.getUsers();
                            $("#userModal").modal("hide");
                        }
                        jsAddon.display.swalMessage(response._isError,response.reason);
                        jsAddon.display.removeFormLoading('#frm-users');
                    })
                     
                })
            },
           
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
    users.init();
    $("#user-button").click(function(){
        $("#userModal").modal("show")
        userId = null;
        $('#frm-users')[0].reset()
    })
    $("#storeFilter").on("change",function(){
        users.ajax.getUsers();
    })
    $("#frm-users").validate({
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
            firstname:{
                required:true,
            },
            lastname:{
                required:true,
            },
            mobile:{
                required:true,
            },
            birthdate:{
                required:true,
            },
            store:{
                required:true,
            },
            role:{
                required:true,
            },
        },
        submitHandler: function(form) {
            
            var payload = {
                'firstName':$(form).find(':input[name=firstname]').val(),
                'middleName':$(form).find(':input[name=middlename]').val(),
                'lastName':$(form).find(':input[name=lastname]').val(),
                'email':$(form).find(':input[name=email]').val(),
                'mobile':$(form).find(':input[name=mobile]').val(),
                'birthdate':$(form).find(':input[name=birthdate]').val(),
                'role':$(form).find(':input[name=role]').val(),
                'userType':'Staff'
            };

            if(users.funx.getStoreId() != null){
                payload.storeid = users.funx.getStoreId();
            };
            
            if(userId == null){
                users.ajax.addUser(payload);
            }else{
                payload.userId = userId;
                users.ajax.updateUser(payload);
            }
        }
    })
})