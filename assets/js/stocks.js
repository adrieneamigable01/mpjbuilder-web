

$(()=>{
    var dataSet                 = [],
    activeTable                 =   null,
    stockid                  = null,
    productTypeId           = null,
    stockPriceIndex,
    mixComponents;
    window.stocks = {
        
        init:()=>{
            stocks.ajax.getProductType()
            stocks.ajax.getSuppliers()
            stocks.ajax.getStocks()
            stocks.ajax.getStockUnit()
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
                            $("#unitid").empty()
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
            getConvertionStockUnit:()=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getStockUnitApi}`,
                        dataType:'json',
                    }).then((response)=>{
                        if(!response._isError){
                            let convertion_length = $(".conversion_unit").length - 1;
                    
                            $(".conversion_unit").eq(convertion_length).empty();
                            $.each(response.data,function(k,v){
                                $(".conversion_unit").eq(convertion_length).append(
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
            getConvertionStockProduct:(payload)=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getProductsApi}`,
                        dataType:'json',
                        payload:payload
                    }).then((response)=>{
                        if(!response._isError){
                            let convertion_length = $(".conversion_product").length - 1;
                            alert(mixComponents)
                            var allowedIds = mixComponents.map(Number);
                            var filteredData = response.data.filter(v => 
                                allowedIds.includes(parseInt(v.productid))
                            );
                            $(".conversion_product").eq(convertion_length).empty();
                            $.each(filteredData,function(k,v){
                                $(".conversion_product").eq(convertion_length).append(
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
            getStocks:()=>{
    
                let tbody = $("<tbody>");
              

                if ($.fn.DataTable.isDataTable("#stocks-table")) {
                    activeTable.clear();
                    activeTable.destroy();
                    $("#stocks-table tbody").remove();
                    
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
                    let payload = {};
                    if(stocks.funx.getStoreId() != null){
                        payload = {
                            storeid: stocks.funx.getStoreId(),
                        }
                    }
                    jsAddon.display.addfullPageLoader()
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getStocksApi}`,
                        dataType:'json',
                        payload:{
                            storeid:activeStore.storeid
                        },
                        // payload:{
                        //     storeid:$("#storeFilter").val()
                        // },
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
                                                .text(`${v.product_name} (${v.productType})`),
                                            $("<td>")
                                                .text(v.productCode),
                                            $("<td>")
                                                .text(v.purchase_price),
                                            $("<td>")
                                                .text(v.selling_price),
                                            $("<td>")
                                                .text(v.quantity),
                                            $("<td>")
                                                .text(`${v.unit} (${v.abbreviations})`),
                                            $("<td>")
                                                .text(v.companyName),
                                            $("<td>")
                                                .text(v.manufacturedDate),
                                            $("<td>")
                                                .text(v.expirationDate),
                                            $("<td>")
                                            .addClass("text-center")
                                            .append(
                                                $("<button>")
                                                .addClass("btn btn-info btn-sm ms-1") // Outline style for a modern look
                                                .html('<i class="fas fa-eye"></i> View')
                                                .click(function() {
                                                    // Construct image path & check for existence
                                                    // --- IMAGE LOGIC ---
                                                    // 1. Check if image property exists and isn't a "null" string or empty
                                                  
                                                    const isImageValid = v.image && v.image !== "" && v.image !== "null";
                                                     
                                                    // 2. Set the primary link or the default placeholder
                                                    // Using 'placehold.co' as it's very reliable for missing images
                                                    const defaultImage = "https://placehold.co/400x500/e0e0e0/666666?text=No+Image+Available";
                                                    const imageLink = isImageValid 
                                                        ? `${baseApiUrl}/uploads/product/${v.productid}/${v.image}` 
                                                        : defaultImage;;

                                                    Swal.fire({
                                                        title: `<span style="color: #2c3e50; font-weight: 700;">Product Specification</span>`,
                                                        width: '850px',
                                                        padding: '1.5em',
                                                        background: '#f8f9fa',
                                                        html: `
                                                            <div style="display: flex; flex-direction: row; gap: 25px; text-align: left; align-items: stretch;">
                                                                <div style="flex: 1; display: flex; align-items: center; justify-content: center; background: #fff; border-radius: 12px; border: 1px solid #e0e0e0; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                                                                    <img src="${imageLink}" 
                                                                        onerror="this.src='https://via.placeholder.com/350x450?text=Image+Not+Found'"
                                                                        style="width: 100%; height: auto; object-fit: cover;">
                                                                </div>
                                                                
                                                                <div style="flex: 1.5; background: #fff; padding: 20px; border-radius: 12px; border: 1px solid #e0e0e0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                                                                    <h4 style="margin-top: 0; color: #007bff; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
                                                                        ${v.product_name} 
                                                                        <small style="color: #6c757d; font-size: 0.6em;">(${v.productType})</small>
                                                                    </h4>
                                                                    
                                                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px;">
                                                                        <div>
                                                                            <label style="display: block; font-size: 0.75rem; color: #95a5a6; text-transform: uppercase; font-weight: bold;">Stock ID</label>
                                                                            <span style="color: #2c3e50;">#${v.stockid}</span>
                                                                        </div>
                                                                        <div>
                                                                            <label style="display: block; font-size: 0.75rem; color: #95a5a6; text-transform: uppercase; font-weight: bold;">Product Code</label>
                                                                            <span style="color: #2c3e50;">${v.productCode}</span>
                                                                        </div>
                                                                        <div>
                                                                            <label style="display: block; font-size: 0.75rem; color: #95a5a6; text-transform: uppercase; font-weight: bold;">Quantity</label>
                                                                            <span style="padding: 2px 8px; background: #e8f4fd; color: #007bff; border-radius: 4px; font-weight: bold;">
                                                                                ${v.quantity} ${v.abbreviations || v.unit}
                                                                            </span>
                                                                        </div>
                                                                        <div>
                                                                            <label style="display: block; font-size: 0.75rem; color: #95a5a6; text-transform: uppercase; font-weight: bold;">Store</label>
                                                                            <span style="color: #2c3e50;">${v.storeName}</span>
                                                                        </div>
                                                                    </div>

                                                                    <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;">

                                                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                                                                        <div>
                                                                            <label style="display: block; font-size: 0.75rem; color: #95a5a6; text-transform: uppercase; font-weight: bold;">Selling Price</label>
                                                                            <span style="font-size: 1.1rem; font-weight: bold; color: #27ae60;">$${v.selling_price}</span>
                                                                        </div>
                                                                        <div>
                                                                            <label style="display: block; font-size: 0.75rem; color: #95a5a6; text-transform: uppercase; font-weight: bold;">Discount Price</label>
                                                                            <span style="color: #e74c3c;">${v.discounted_price ? '$' + v.discounted_price : 'None'}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div style="margin-top: 15px;">
                                                                        <label style="display: block; font-size: 0.75rem; color: #95a5a6; text-transform: uppercase; font-weight: bold;">Supplier</label>
                                                                        <span style="color: #2c3e50;">${v.companyName}</span>
                                                                    </div>

                                                                    <div style="margin-top: 15px; padding: 10px; background: #fdfdfd; border-radius: 8px; border: 1px dashed #ddd;">
                                                                        <p style="margin: 0; font-size: 0.85rem; color: #7f8c8d;">
                                                                            <strong>Description:</strong> ${v.description || 'No additional details provided for this stock item.'}
                                                                        </p>
                                                                    </div>
                                                                    
                                                                    <div style="margin-top: 15px; display: flex; justify-content: space-between; font-size: 0.8rem; color: #95a5a6;">
                                                                        <span><strong>MFG:</strong> ${v.manufacturedDate}</span>
                                                                        <span><strong>EXP:</strong> ${v.expirationDate??'N/A'}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        `,
                                                        showConfirmButton: true,
                                                        confirmButtonText: 'Got it',
                                                        confirmButtonColor: '#007bff',
                                                        customClass: {
                                                            popup: 'animated fadeInDown faster'
                                                        }
                                                    });
                                                }),
                                                $("<button>")
                                                .addClass("btn btn-success btn-sm ml-2")
                                                .html('<i class="fas fa-pen"></i> Update')
                                                .click(function(){
                                                    stockid = v.stockid;
                                                    $('#frm-stocks :input[name=store]').val(v.storeid);
                                                    $('#frm-stocks :input[name=product]').val(v.product_name)
                                                    $('#frm-stocks :input[name=productTypeId]').val(v.productTypeId)
                                                    $('#frm-stocks :input[name=supplier]').val(v.supplierId)
                                                    $("#frm-stocks input[name=price]").val(v.price);
                                                    $("#frm-stocks input[name=selling_price]").val(v.selling_price);
                                                    $("#frm-stocks input[name=purchase_price]").val(v.purchase_price);
                                                    $("#frm-stocks input[name=discount]").val(v.discount);
                                                    $("#frm-stocks input[name=quantity]").val(v.quantity);
                                                    $("#frm-stocks :input[name=unitid]").val(v.unitid);
                                                    $("#frm-stocks input[name=barCode]").val(v.barCode);
                                                    $("#frm-stocks input[name=manufacturedDate]").val(v.manufacturedDate);
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
                                    $("#stock-loading").remove();
                                    $("#stocks-table")
                                    .append(tbody);
                                    resolve(true);
                                }
                            })  
                        }else{
                            $("#stock-loading").remove();
                            $("#stocks-table")
                            .append(tbody);
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
                                            value:v.productid,
                                            'data-components':v.mix_components_ids
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
    stocks.init();
    $("#storeFilter").on("change",function(){
        stocks.ajax.getStocks()
    })
    $(".product-type-menu").change(function(){
        let id = $(this).val();
        productTypeId = id;
        stocks.ajax.getProducts({
            productTypeId:id,
        });
    })
    $("#add-stocks").click(function(){
        $('#frm-stocks')[0].reset()
        $('#preview').attr('src', '').hide();
        $("#stocksModal").modal("show");
        stockid = null;
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
            let conversion_unit = $(".conversion_unit");
            let convertionItem = []; 
            if(conversion_unit.length > 0){
               for (let index = 0; index < conversion_unit.length; index++) {
                    convertionItem.push({
                        'unitid': $(".conversion_unit").eq(index).val() ,
                        'conversion': $(".conversion_quantity").eq(index).val(),
                        'conversion_product': $(".conversion_product").eq(index).val(),
                        'conversion_price': $(".conversion_price").eq(index).val(),
                    })
               }
            }
           
            if(stocks.funx.getStoreId() == null){
                alert("No store is selected");return;
            }
            var payload = {
                'store':stocks.funx.getStoreId(),
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
                'manufacturedDate':$(form).find(':input[name=manufacturedDate]').val(),
                'convertion_item':JSON.stringify(convertionItem),
            };

            if(stockid == null){
                stocks.ajax.addStocks(payload);
            }else{
                payload.stockid = stockid;
                stocks.ajax.updateStock(payload);
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
    $("select[name=productid]").change(function(e){
        let components = $(this).find("option:selected").data("components");
        if(components != ""){
            $(".conversion-section").css({
                display:'block'
            })
            mixComponents = components;
        }else{
             $(".conversion-section").css({
                display:'none'
            })
            mixComponents = "";
        }
    })
})