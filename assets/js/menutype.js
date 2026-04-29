var dataSet                 = [],
activeTable                 = null
menuTypeId                  = null;

$(()=>{
    var accesskey   = session.key;
    menuType = {
       
        init:()=>{
            $(".loading").hide();
            menuType.ajax.getMenuType()
            .then(data=>{
                if(data){
                    activeTable = $('#menuTypeTable').dataTable({
                        // "aoColumns": [
                        //     { "sTitle": "Purpose","sWidth": "20%"},
                            // { "bVisible": false, "aTargets": [ 0 ] }
                        // ],
                        // "aoColumnDefs": [
                        //     { "bVisible": false, "aTargets": [ 0 ] }
                        // ] ,
                        "iDisplayLength": 10,
                        "aLengthMenu": [[10,25,50,75,100,-1],[10,25,50,75,100,"All"]],
                        "bAutoWidth": false,
                        "bSort": false,
                        "fnCreatedRow": function( nRow, aData, iDataIndex ) {
                            // let data = aData[0].split(":");
                            // let name = data[1];
                            // let id = data[0];
                            $(nRow).attr("id",`${aData[0]}`)
                            $("td",nRow)
                                .last()
                                .empty()
                                .addClass("text-center")
                                .append(
                                    $("<button>")
                                    .addClass("btn btn-success btn-sm")
                                    .text("Update")
                                    .attr({
                                        'data-toggle':'modal',
                                        'data-target':'#updateMenuType'
                                    })
                                    .click(function(){
                                        menuTypeId = aData[0];
                                        $("#frm-update-menu-type").find("input[name=menuType]").val(aData[1]);
                                    }),
                                    // $("<button>")
                                    //     .addClass("btn btn-danger btn-sm ml-2")
                                    //     .text("Deactivate"),
                                )

                        },
                        "fnInitComplete": function(oSettings, json) {
                             jsAddon.display.removefullPageLoader()
                            // menu.ajax.getUser();
                        }
                    });
                }
            })
        },
        ajax:{
            getMenuType:()=>{

                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getMenuTypeApi}/?accessKey=${accesskey}`,
                        dataType:'json',
                    }).then((response)=>{
                        $.each(response.data,function(k,v){
                            $("#menuTypeTable")
                                .find("tbody")
                                .append(
                                    $("<tr>")
                                        .append(
                                            $("<td>")
                                                .text(v.menuTypeId),
                                            $("<td>")
                                                .text(v.menuType),
                                            $("<td>")
                                                .text(v.dateCreated),
                                            $("<td>")
                                                .text('-')
                                        )
                                )
                        })  
                        resolve(true);
                    })
                     
                })
            },
            addMenuType:(payload)=>{

                return new Promise((resolve,reject)=>{
                    jsAddon.display.addFormLoading('frm-add-menu-type')
                    jsAddon.display.ajaxRequest({
                        type:'post',
                        url:addMenuTypeApi,
                        dataType:'json',
                        payload:payload,
                    }).then((response)=>{
                        if(!response._isError){
                            
                            activeTable.fnAddData([
                                response.data.menuTypeId,
                                response.data.menuType,
                                response.data.dateCreated,
                                ''
                            ])
                            activeTable.fnDraw(false);

                            $(".modal").modal("hide")
                        }

                        jsAddon.display.swalMessage(response._isError,response.reason);
                        jsAddon.display.removeFormLoading('frm-add-menu-type');
                    })
                     
                })
            },
            updateMenuType:(payload)=>{
                jsAddon.display.addFormLoading('#frm-update-menu-type')
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'post',
                        url:updateMenuTypeApi,
                        dataType:'json',
                        payload:payload,
                    }).then((response)=>{
                        if(!response._isError){
                            $(`#${menuTypeId}`)
                            .find("td:nth-child(2)").text(response.data.menuType);
                            $(`#${menuTypeId}`)
                            .find("td")
                            .last()
                            .empty()
                            .addClass("text-center")
                            .append(
                                $("<button>")
                                .addClass("btn btn-success btn-sm")
                                .text("Update")
                                .attr({
                                    'data-toggle':'modal',
                                    'data-target':'#updateMenuType'
                                })
                                .click(function(){
                                    menuTypeId = menuTypeId;
                                    $("#frm-update-menu-type").find("input[name=menuType]").val(response.data.menuType);
                                }),
                                // $("<button>")
                                //     .addClass("btn btn-danger btn-sm ml-2")
                                //     .text("Deactivate"),
                            )
                        }
                        jsAddon.display.swalMessage(response._isError,response.reason)
                        jsAddon.display.removeFormLoading('#frm-update-menu-type')
                    })
                     
                })
            }
        }
    }
    menuType.init();

    $("#frm-add-menu-type").validate({
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
            menuType:{
                required:true,
            },
        },
        submitHandler: function(form) {

            var payload = {
                'menuType':$(form).find('input[name=menuType]').val(),
                'accessKey':accesskey
                
            };
            
            menuType.ajax.addMenuType(payload);
        }
    })
    $("#frm-update-menu-type").validate({
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
            menuType:{
                required:true,
            },
        },
        submitHandler: function(form) {

            var payload = {
                'menuType':$(form).find('input[name=menuType]').val(),
                'menuTypeId':menuTypeId,
                'accessKey':accesskey
                
            };
            
            menuType.ajax.updateMenuType(payload);
        }
    })

    // let addMenuPayload = {
    //     'menuName':'Chocolate Cake',
    //     'menuTypeId':'2',
    //     'price':'259',
    // }

    // menu.ajax.addMenu(addMenuPayload);

})