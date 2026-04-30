$(()=>{
    var activeTable = null,
    userId= null,
    accesskey   = session.key;
    users = {
        init:()=>{
            users.ajax.getUsers();
        },
        ajax:{
            getUsers:()=>{
                new Promise((resolve,reject)=>{
                    $.ajax({
                        type:'post',
                        url:`${getUsersApi}?accessKey=${accesskey}`,
                        dataType:'json',
                        beforeSend:function(){
                            if ( $.fn.DataTable.isDataTable('#users-table') ) {
                                activeTable.clear();
                                activeTable.destroy();
                                $("#users-table").find("tbody").empty();
                            }

                        },
                        success:function(response){
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
                                                        .text(v.firstName),
                                                    $("<td>")
                                                        .text(v.lastName),
                                                    $("<td>")
                                                        .text(v.userName),
                                                    $("<td>")
                                                        .text(v.user_email != null ? v.user_email : 'N/A'),
                                                    $("<td>")
                                                        .text(v.userType),
                                                    $("<td>")
                                                        .text(v.dateCreated),
                                                    $("<td>")
                                                        .text(v.storeName),
                                                    $("<td>")
                                                        .text('-'),
                                                )
                                        )
                                })
                                resolve(true)
                           }
                        }
                    })
                })
                .then(data=>{
                    if(data){
                        activeTable = $("#users-table").DataTable({
                            // "aoColumns": [
                            //     { "sTitle": "Purpose","sWidth": "20%"},
                                // { "bVisible": false, "aTargets": [ 0 ] }
                            // ],
                            "aoColumnDefs": [
                                { "bVisible": false, "aTargets": [ 0 ] }
                            ] ,
                            "iDisplayLength": 10,
                            "aLengthMenu": [[10,25,50,75,100,-1],[10,25,50,75,100,"All"]],
                            "bAutoWidth": false,
                            "bSort": false,
                            "fnCreatedRow": function( nRow, aData, iDataIndex ) {
                                // let data = aData[0].split(":");
                                // let name = data[1];
                                // let id = data[0];
                                $(nRow).attr("id",`users-${aData[0]}`)
                               
                            
                                $("td",nRow)
                                .last()
                                .empty()
                                .addClass("text-center")
                                .append(
                                    $("<button>")
                                    .addClass("btn btn-success btn-sm")
                                    .text("Transfer")
                                    .attr({
                                        'data-toggle':'modal',
                                        'data-target':'#updateUser'
                                    })
                                    .click(function(){
                                        userId = aData[0];
                                        let storeName = aData[7].toLowerCase();
                                        $("#frm-update-user select[name=store]").find(`option[data-name='${storeName.replace(/\s/g,'')}']`).prop('selected', true);
                                    }),
                                )
    
                            },
                            "fnInitComplete": function(oSettings, json) {
                                jsAddon.display.removefullPageLoader()
                                // menu.ajax.getUser();
                            }
                        });
                        users.ajax.getStores();
                    }
                })
            },
            transferUser:(payload)=>{
                new Promise((resolve,reject)=>{
                    $.ajax({
                        type:'post',
                        url:`${transferUserApi}`,
                        dataType:'json',
                        data:payload,
                        beforeSend:function(){
                            jsAddon.display.addFormLoading('#frm-update-users')
                        },
                        success:function(response){
                            
                            if(!response._isError){
                                users.ajax.getUsers();
                            }
                            jsAddon.display.swalMessage(response._isError,response.reason);
                        }
                    })
                })
            },
            getStores:()=>{
                return new Promise((resolve,reject)=>{
                    $.ajax({
                        type:'get',
                        url:`${getStoresApi}/?accessKey=${accesskey}`,
                        dataType:'json',
                        beforeSend:function(){
                            $("select[name=store]").empty();
                        },
                        success:function(response){
                            $.each(response.data,function(k,v){
                                let storeName = v.storeName.toLowerCase();
                                $("select[name=store]").append(
                                    $("<option>")
                                        .text(v.storeName)
                                        .attr({
                                            value:v.storeid,
                                            'data-name':storeName.replace(/\s/g,'')
                                        })
                                )
                            })  
                            jsAddon.display.removeFormLoading('#frm-update-users');
                        }
                    })
               })
            },
        },
    }
    users.init();
    $("#frm-update-user").validate({
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
            firstName:{
                required:true,
            },
            lastName:{
                required:true,
            },
        },
        submitHandler: function(form) {

            var payload = {
                'userId':userId,
                'store':$(form).find('select[name=store]').val(),
                'accessKey':accesskey
                
            };
            users.ajax.transferUser(payload);
        }
    })
})