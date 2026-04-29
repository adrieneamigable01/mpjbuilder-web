$(()=>{
    var menuId = null,
    menuTypeId = 1,
    accesskey   = session.key;
    menu = {
       
        init:()=>{
            menu.ajax.getMenuType();
        },
        ajax:{

            getMenu:()=>{
                let payload = {
                    menuTypeId:menuTypeId,
                    accessKey:accesskey
                }

                return new Promise((resolve,reject)=>{
                    jsAddon.display.addfullPageLoader()
                    $(`#menu-container-${menuTypeId}`).html("");
                    jsAddon.display.ajaxRequest({
                       type:'post',
                        url:getMenuApi,
                        dataType:'json',
                        payload:payload,
                    }).then((response)=>{
                        if(!response._isError){ 
                            $.each(response.data,function(key,value){
                                $(`#menu-container-${menuTypeId}`).prepend(
                                    $("<div>")
                                        .addClass("col-xl-3 col-md-6 mb-4")
                                        .append(
                                            $("<div>")
                                                .addClass("card border-left-primary shadow h-100 py-2")
                                                .append(
                                                    $("<div>")
                                                        .addClass("card-body")
                                                        .append(
                                                            $("<div>")
                                                                .addClass("row no-gutters align-items-center")
                                                                .append(
                                                                    $("<div>")
                                                                        .addClass("col mr-2")
                                                                        .append(
                                                                            $("<div>")
                                                                                .addClass("text-xs font-weight-bold text-primary text-upper")
                                                                                .text(value.menuName)
                                                                                .append(
                                                                                    $("<div>")
                                                                                        .addClass("dropdown no-arrow float-right")
                                                                                        .append(
                                                                                            $("<a>")
                                                                                                .addClass("dropdown-toggle")
                                                                                                .attr({
                                                                                                    href:'#',
                                                                                                    role:'button',
                                                                                                    id:'dropdownMenuLink',
                                                                                                    'area-haspopup':true,
                                                                                                    'area-expanded':false,
                                                                                                    'data-toggle':'dropdown',
                                                                                                })
                                                                                                .append(
                                                                                                    $("<i>")
                                                                                                        .addClass("fas fa-ellipsis-v fa-sm fa-fw text-gray-400")
                                                                                                ),
                                                                                            $("<div>")
                                                                                                .addClass("dropdown-menu dropdown-menu-right shadow animated--fade-in")
                                                                                                .attr({
                                                                                                    'aria-labelledby':'dropdownMenuLink'
                                                                                                })
                                                                                                .append(
                                                                                                    $("<div>")
                                                                                                        .addClass("dropdown-header")
                                                                                                        .text("Select a menu"),
                                                                                                    $("<a>")
                                                                                                        .addClass("dropdown-item")
                                                                                                        .attr({
                                                                                                            href:'#'
                                                                                                        })
                                                                                                        .text("View"),
                                                                                                    $("<a>")
                                                                                                        .addClass("dropdown-item")
                                                                                                        .attr({
                                                                                                            href:'#',
                                                                                                            'data-toggle':'modal',
                                                                                                            'data-target':'#updateMenuModal',
                                                                                                        })
                                                                                                        .click(function(){
                                                                                                            menuId = value.menuId
                                                                                                            $("#frm-update-menu").find("input[name=menuName]").val(value.menuName);
                                                                                                            $('select[name=menuTypeId] option').filter(function() { 
                                                                                                                return ($(this).val() == value.menuTypeId); //To select
                                                                                                            }).prop('selected', true);
                                                                                                            $("#frm-update-menu").find("input[name=price]").val(value.price);
                                                                                                            let imageLink  =`${baseUrl}/uploads/menu/${value.menuId}/${value.image}`
                                                                                                            jsAddon.display.convertImageToBase64(imageLink).then((res)=>{
                                                                                                                $('#update-preview').attr('src', res).show(); // Show the preview image
                                                                                                            })

                                                                                                          
                                                                                                        })
                                                                                                        .text("Update")
                                                                                                )
                                                                                        )
                                                                                ),
                                                                            $("<div>")
                                                                                .addClass("h5 mb-0 font-weight-bold text-gray-800")
                                                                                .text(`₱ ${value.price}`),
                                                                        ),
                                                                    $("<div>")
                                                                        .addClass("col-auto"),
                                                                )
                                                        )
                                                )
                                        )
                                )
                            })
                        }else{

                        }
                         jsAddon.display.removefullPageLoader()
                    })
                     
                })
            },
            addMenu:(payload) => {
                jsAddon.display.addFormLoading('frm-add-menu')
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxFilesRequest({
                        type:'post',
                        url:addMenuApi,
                        dataType:'json',
                        payload:payload,
                    }).then((response)=>{
                        if(!response._isError){
                            menu.ajax.getMenu();
                            $(".modal").modal("hide")
                        
                        }
                        jsAddon.display.swalMessage(response._isError,response.reason);
                        jsAddon.display.removeFormLoading('frm-add-menu')
                    })
                     
                })
            },
            updateMenu:(payload) => {
                jsAddon.display.addFormLoading('frm-update-menu')
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxFilesRequest({
                        type:'post',
                        url:updateMenuApi,
                        dataType:'json',
                        payload:payload,
                    }).then((response)=>{
                        if(!response._isError){
                            menu.ajax.getMenu();
                            $(".modal").modal("hide")
                        }
                        jsAddon.display.swalMessage(response._isError,response.reason);
                        jsAddon.display.removeFormLoading('frm-update-menu')
                    })
                     
                })
            },
            getMenuType:()=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getMenuTypeApi}/?accessKey=${accesskey}`,
                        dataType:'json',
                    }).then((response)=>{
                        menuTypeId = response.data[0].menuTypeId;
                        $("#frm-update-menu :input[name=menuTypeId]").empty()
                        $.each(response.data,function(k,v){

                            $("#frm-update-menu :input[name=menuTypeId]").append(
                                $("<option>")
                                    .val(v.menuTypeId)
                                    .text(v.menuType)
                            )
                            
                            $(".menuTypeContent")
                            .append(
                                $("<a>")
                                    .addClass(k == 0 ? "nav-link active" : "nav-link")
                                    .attr({
                                        id:`v-pills-${menu.display.removeSpace(v.menuType).toLowerCase()}-tab`,
                                        'data-toggle':'pill',
                                        'href':`#v-pills-${menu.display.removeSpace(v.menuType).toLowerCase()}`,
                                        role:'tab',
                                        'aria-controls':`v-pills-${menu.display.removeSpace(v.menuType).toLowerCase()}`,
                                        'aria-selected':false,
                                    })
                                    .text(v.menuType)
                                    .click(function(){
                                        menuTypeId = v.menuTypeId;
                                        menu.ajax.getMenu();
                                    })
                            )
                            
                            $(".menu_type")
                            .append(
                                $("<div>")
                                    .addClass(k == 0 ? "tab-pane fade show active" : "tab-pane fade")
                                    .attr({
                                        id:`v-pills-${menu.display.removeSpace(v.menuType).toLowerCase()}`,
                                        role:'tabpanel',
                                        'aria-labelledby':`v-pills-${menu.display.removeSpace(v.menuType).toLowerCase()}-tab`,
                                    })
                                    .append(
                                        $("<div>")
                                            .addClass("card shadow mb-4")
                                            .append(
                                                $("<div>")
                                                    .addClass("card-header py-3")
                                                    .append(
                                                        $("<div>")
                                                            .addClass("m-0 font-weight-bold text-primary")
                                                            .text(v.menuType)
                                                    ),
                                                //End card-header py-3
                                                $("<div>")
                                                .addClass("card-body")
                                                .append(
                                                    $("<div>")
                                                        .addClass("row")
                                                        .attr({
                                                            id:`menu-container-${v.menuTypeId}`
                                                        })
                                                )
                                            )
                                    )
                            )


                        })
                        resolve(true)
                    })
                     
                })  
                .then(data=>{
                    if(data){
                        menu.ajax.getMenu();
                    }
                })
               
            }
        },
        display:{
            removeSpace:(str)=>{
                return str.replace(/\s/g, '');
            }
        }
    }
    menu.init();

    // let addMenuPayload = {
    //     'menuName':'Chocolate Cake',
    //     'menuTypeId':'2',
    //     'price':'259',
    // }

    // menu.ajax.addMenu(addMenuPayload);

    $('#menu-image').on('change', function(event) {
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

    $('#update-menu-image').on('change', function(event) {
        // Get the selected file
        const file = event.target.files[0];
        
        if (file) {
            // Create a FileReader object
            const reader = new FileReader();

            // Define the onload event for the FileReader
            reader.onload = function(e) {
                // Set the preview image source to the FileReader result
                $('#update-preview').attr('src', e.target.result).show(); // Show the preview image
            };

            // Read the selected file as a data URL
            reader.readAsDataURL(file);
        } else {
            // Hide the preview if no file is selected
            $('#update-preview').hide();
        }
    });


    $("#frm-add-menu").validate({
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
            menuName:{
                required:true,
            },
            price:{
                required:true,
            },
        },
        submitHandler: function(form) {
            var data = {
                'menuName':$(form).find('input[name=menuName]').val(),
                'menuTypeId':menuTypeId,
                'price':$(form).find('input[name=price]').val(),
                'accessKey':accesskey,
                'menu-image': $('#menu-image')[0].files[0]
                
            };
            payload = jsAddon.display.objectToFormData(data)
            menu.ajax.addMenu(payload);
        }
    })
    $("#frm-update-menu").validate({
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
            menuName:{
                required:true,
            },
            menuTypeId:{
                required:true,
            },
            price:{
                required:true,
            },
        },
        submitHandler: function(form) {
            var data = {
                'menuId':menuId,
                'menuName':$(form).find('input[name=menuName]').val(),
                'menuTypeId':$(form).find('select[name=menuTypeId]').val(),
                'price':$(form).find('input[name=price]').val(),
                'menu-image': $('#update-menu-image')[0].files[0]
            };
            payload = jsAddon.display.objectToFormData(data)
            menu.ajax.updateMenu(payload);
        }
    })
})