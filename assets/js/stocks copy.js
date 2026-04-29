

$(()=>{
    var dataSet                 = [],
    activeTable                 =   null,
    stockid                  = null,
    stockPriceIndex = 0,
    stockPriceData = {},
    unitValue = {},
    stocks = {
        
        init:()=>{
            $(".loading").hide();
            // stocks.ajax.getProducts();
            stocks.ajax.getProductType()
            stocks.ajax.getStores()
            stocks.ajax.getSuppliers()
            stocks.ajax.getStocks()
            stocks.ajax.getStockUnit();
        },
        ajax:{
            
            getStockUnit:()=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getStockUnitApi}`,
                        dataType:'json',
                    }).then((response)=>{
                        if(!response._isError){
                            unitValue =  response.data
                            $("#unit_0").empty();
                            $("#unit").empty()
                            $.each(response.data,function(k,v){
                                $("#unit").append(
                                    $("<option>")
                                        .attr({
                                            value:v.unit_id,
                                            title:v.unit
                                        })
                                        .text(v.abbreviations)
                                )
                                $("#unit_0").append(
                                    $("<option>")
                                        .attr({
                                            value:v.unit_id,
                                            title:v.unit
                                        })
                                        .text(v.abbreviations)
                                )
                            })
                        }
                    })
                })
            },
            getStockPrices:()=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getStockPricesApi}`,
                        dataType:'json',
                    }).then((response)=>{
                        resolve(response)
                    })
                })
            },
            getStocks:()=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.addfullPageLoader()
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getStocksApi}`,
                        dataType:'json',
                        payload:{
                            storeid:$("#storeFilter").val()
                        },
                    }).then((response)=>{
                        if ($.fn.DataTable.isDataTable("#stocks-table")) {
                            activeTable.clear();
                            activeTable.destroy();
                            $("#stocks-table tbody").empty();
                        }
                        if(Object.keys(response.data).length > 0){
                            $.each(response.data,function(k,v){
                                $("#stocks-table tbody")
                                    .addClass("small")
                                    .append(
                                        $("<tr>")
                                            .append(
                                                $("<td>")
                                                    .text(v.stockid),
                                                $("<td>")
                                                    .text(v.storeName),
                                                $("<td>")
                                                    .text(`${v.product_name} (${v.productType})`),
                                                $("<td>")
                                                    .text(v.purchase_price),
                                                $("<td>")
                                                    .text(v.abbreviations),
                                                $("<td>")
                                                    .text(v.quantity),
                                                $("<td>")
                                                    .text(v.companyName),
                                                $("<td>")
                                                    .text(v.dateCreated),
                                                $("<td>")
                                                    .text(v.expirationDate),
                                                $("<td>")
                                                    .text(v.description),
                                                $("<td>")
                                                .addClass("text-center no-gutters")
                                                .append(
                                                    $("<button>")
                                                    .addClass("btn btn-info btn-sm")
                                                    .text("View Price")
                                                    .click(function(){
                                                        stocks.ajax.getStockPrices({
                                                            stockid:v.stockid
                                                        });
                                                    }),
                                                    $("<button>")
                                                    .addClass("btn btn-success btn-sm ml-1")
                                                    .text("Update")
                                                    .click(function(){
                                                        stockid = v.stockid;
                                                        $('#frm-stocks :input[name=store]').val(v.storeid);
                                                        $('#frm-stocks :input[name=product]').val(v.product_name)
                                                        $('#frm-stocks :input[name=productTypeId]').val(v.productTypeId)
                                                        $('#frm-stocks :input[name=supllier] option').val(v.supplierId)
                                                        $("#frm-stocks input[name=price]").val(v.price);
                                                        $("#frm-stocks input[name=selling_price]").val(v.selling_price);
                                                        $("#frm-stocks input[name=purchase_price]").val(v.purchase_price);
                                                        $("#frm-stocks input[name=discount]").val(v.discount);
                                                        $("#frm-stocks input[name=quantity]").val(v.quantity);
                                                        $("#frm-stocks input[name=label]").val(v.label);
                                                        $("#frm-stocks input[name=barCode]").val(v.barCode);
                                                        $("#frm-stocks input[name=expirationDate]").val(v.expirationDate);
                                                        $("#frm-stocks textarea[name=description]").val(v.description);
                                                        let imageLink  =`${baseUrl}/uploads/product/${v.productId}/${v.image}`
                                                        $('#preview').attr('src', '').hide();
                                                        jsAddon.display.convertImageToBase64(imageLink).then((res)=>{
                                                            $('#preview').attr('src', res).show(); // Show the preview image
                                                        })
                                                        $("#stocksModal").modal("show");
                                                    }),
                                                )
                                            )
                                    )
                            
                                if (Object.keys(response.data).length - 1 == k) {
                                    resolve(true);
                                }
                            })  
                        }else{
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
                    jsAddon.display.addfullPageLoader()
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
            addStocks:(payload)=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.addFormLoading('#frm-stocks')
                    jsAddon.display.ajaxRequest({
                        type:'post',
                        url:`${addStocksApi}`,
                        dataType:'json',
                        payload:payload,
                    }).then((response)=>{
                        if(!response._isError){
                            stocks.ajax.getStocks()
                            $('#frm-stocks')[0].reset()
                            // $('#preview').attr('src', '').hide();
                            $(".modal").modal("hide")
                         }
                         jsAddon.display.swalMessage(response._isError,response.reason);
                         jsAddon.display.removeFormLoading('#frm-stocks');
                    })
                     
                })
            },
            updateStock:(payload)=>{
                jsAddon.display.addFormLoading('#frm-stocks')
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'post',
                        url:`${updateStockApi}`,
                        dataType:'json',
                        payload:payload,
                    }).then((response)=>{
                        if(!response._isError){
                            stockid = null;
                            stocks.ajax.getStocks()
                            $('#frm-stocks')[0].reset()
                            $('#preview').attr('src', '').hide();
                            $(".modal").modal("hide")
                         }
                         jsAddon.display.swalMessage(response._isError,response.reason);
                         jsAddon.display.removeFormLoading('#frm-stocks');
                    })
                     
                })
            }
        }
    }
    stocks.init();
    $("#storeFilter").on("change",function(){
        stocks.ajax.getStocks()
    })
    $(".product-type-menu").change(function(){
        let id = $(this).val();
        stocks.ajax.getProducts({
            productTypeId:id,
        });
    })
    $("#add-stocks").click(function(){
        $('#frm-stocks')[0].reset()
        $('#preview').attr('src', '').hide();
        $("#stocksModal").modal("show");
        productId = null;
    })
    $("#btn-stockprice").click(function(){
        stockPriceIndex++;
        let select = $("<select>")
        .addClass("form-control price_input")
        .attr({
            type:'number',
            id:`unit_${stockPriceIndex}`,
            'data-name':'stock_unit',
            'data-id':stockPriceIndex,
            name:`unit_${stockPriceIndex}`
        })
        .text("Unit");

        $.each(unitValue,function(k,v){
            select.append(
                $("<option>")
                    .attr({
                        value:v.unitid,
                        title:v.unit
                    })
                    .text(v.abbreviations)
            )
        })
        $("#stock-price-container").append(
            $("<div>")
                .addClass("row stock-price-item-container")
                .attr({
                    'data-id':stockPriceIndex
                }).append(
                    $("<div>")
                    .addClass("form-group col")
                    .append(
                        $("<label>")
                            .attr({
                                for:`unit_${stockPriceIndex}`
                            })
                            .text("Unit"),
                        select
                    ),
                    $("<div>")
                    .addClass("form-group col")
                    .append(
                        $("<label>")
                            .attr({
                                for:`selling_price_${stockPriceIndex}`
                            })
                            .text("Quantity"),
                        $("<input>")
                            .addClass("form-control price_input")
                            .attr({
                                type:'number',
                                id:`stock_quantity_${stockPriceIndex}`,
                                'data-name':'stock_quantity',
                                'data-id':stockPriceIndex,
                                name:`stock_quantity_${stockPriceIndex}`,
                                placeholder:"Stock Quantity"
                            })
                            .text("Quantity"),
                    ),
                    $("<div>")
                        .addClass("form-group col")
                        .append(
                            $("<label>")
                                .attr({
                                    for:`selling_price_${stockPriceIndex}`
                                })
                                .text("Selling Price"),
                            $("<input>")
                                .addClass("form-control price_input")
                                .attr({
                                    type:'number',
                                    id:`selling_price_${stockPriceIndex}`,
                                    'data-name':'stock_price',
                                    'data-id':stockPriceIndex,
                                    name:`selling_price_${stockPriceIndex}`,
                                    placeholder:"Selling Price"
                                })
                                .text("Selling Price"),
                        )
                )
        )
      
    })
 
    function generateStockPrices(){
        $('.price_input').each(function(){
            let price_input = $(this)
            let name = price_input.data("name")
            let id = price_input.data("id");
            let val = price_input.val()
            
            if(stockPriceData.hasOwnProperty(id)){
                stockPriceData[id][name] = val
            }else{
                stockPriceData[id] = {
                    [name]:val,
                }
            }
        })
    }
   
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
    $("#frm-stocks").validate({
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
            generateStockPrices();

            var payload = {
                'store':$(form).find(':input[name=store]').val(),
                'productid':$(form).find(':input[name=productid]').val(),
                // 'selling_price':$(form).find(':input[name=selling_price]').val(),
                'supllier':$(form).find(':input[name=supllier]').val(),
                'purchase_price':$(form).find('input[name=purchase_price]').val(),
                'quantity':$(form).find(':input[name=quantity]').val(),
                'unitid':$(form).find(':input[name=unit]').val(),
                'barCode':$(form).find(':input[name=barCode]').val(),
                'expirationDate':$(form).find(':input[name=expirationDate]').val(),
                'description':$(form).find('textarea[name=description]').val(),
                'stockPriceData':JSON.stringify(stockPriceData),
            };

            if(stockid == null){
                stocks.ajax.addStocks(payload);
            }else{
                payload.stockid = stockid;
                stocks.ajax.updateStock(payload);
            }
        }
    })

})