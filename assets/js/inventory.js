var openRows = new Array();

$(()=>{
    window.inventory = {
        init:()=>{
            inventory.ajax.getInvetory()
            // .then(data=>{
            //     if(data){
            //         activeTable = $('#inventory-table').DataTable({
            //             // "aoColumns": [
            //             //     { "sTitle": "Purpose","sWidth": "20%"},
            //                 // { "bVisible": false, "aTargets": [ 0 ] }
            //             // ],
            //             "aoColumnDefs": [
            //                 { "bVisible": false, "aTargets": [ 6 ] }
            //             ] ,
            //             "iDisplayLength": 10,
            //             "aLengthMenu": [[10,25,50,75,100,-1],[10,25,50,75,100,"All"]],
            //             "bAutoWidth": false,
            //             "bSort": false,
            //             "fnCreatedRow": function( nRow, aData, iDataIndex ) {
            //                 // let data = aData[0].split(":");
            //                 // let name = data[1];
            //                 // let id = data[0];
            //                 $(nRow).attr("id",`${aData[0]}`)
                            

            //             },
            //             "fnInitComplete": function(oSettings, json) {
            //                 jsAddon.display.removefullPageLoader()
            //                 // menu.ajax.getUser();
            //             }
            //         });
            //     }
            // })
        },
        ajax:{
            getInvetory:()=>{
                
                let payload = {};

                if(inventory.display.getStoreId() != null){
                    payload.storeid = inventory.display.getStoreId();
                };
                
               return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getInventoryApi}`,
                        dataType:'json',
                        payload:payload,
                    }).then((response)=>{
                        if ($.fn.DataTable.isDataTable("#inventory-table")) {
                            activeTable.clear();
                            activeTable.destroy();
                            $("#inventory-table tbody").empty();
                        }
                        
                        if(Object.keys(response.data).length > 0){
                            $.each(response.data,function(k,v){
                                let isNeedToReStock = parseFloat(v.total) <= parseFloat(v.restock_quantity)
                                $("#inventory-table tbody")
                                    .append(
                                        $("<tr>")
                                            .append(
                                                $("<td>")
                                                    .text(v.storeName),
                                                $("<td>")
                                                    .text(`${ v.product_name} ( ${v.productType} )`),
                                                $("<td>")
                                                    .text(`${v.unit} (${v.abbreviations})`),
                                                $("<td>")
                                                    .text(v.quantity),
                                                $("<td>")
                                                    .text(`(${v.used_quantity})`),
                                                $("<td>")
                                                    .text(v.total)
                                                    .addClass(isNeedToReStock ? 'text-warning' : 'text-success'),
                                                $("<td>")
                                                .text(`(${v.restock_quantity})`),
                                                $("<td>")
                                                    .append(
                                                        $("<span>")
                                                            .addClass(isNeedToReStock ? "badge badge-warning" : "badge badge-success")
                                                            .text(isNeedToReStock ? ("Need to be restocked") : "Stock level is sufficient")
                                                    ),
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
                    
                })
                .then(()=>{
                    activeTable = $('#inventory-table').DataTable({})
                    jsAddon.display.removefullPageLoader()
               })
            },
            getInventoryItems:(payload)=>{
                return new Promise((resolve,reject)=>{
                    $.ajax({
                        type:'post',
                        url:getInventoryItemsApi,
                        dataType:'json',
                        data:payload,
                        success:function(response){
                            resolve(response)
                            console.log('inventoryItems',response)
                        }
                    })
                })
            }
        },
        display:{
            dtFormat:(data,tr)=>{
                let payload = {
                    'productId':data[6],
                    
                }
                inventory.ajax.getInventoryItems(payload)
                .then(response=>{
                    let total = 0;
                    $.each(response.data,function(k,v){
                        
                        (v.type == 1) ? total += parseInt(v.total) : total -= parseInt(v.total)
                        
                        $("#invetory-item-table")
                            .addClass("small")
                            .find("tbody")
                            .append(
                                $("<tr>")
                                    .append(
                                        $("<td>")
                                            .text(v.storeName),
                                        $("<td>")
                                            .text(v.productType),
                                        $("<td>")
                                            .text(v.dateCreated),
                                        $("<td>")
                                            .text(v.type == 1 ? 'Supply in' : `Supply Out`),
                                        $("<td>")
                                            .text(v.type == 1 ? v.total : `(${v.total})`)
                                            .addClass(v.type == 1 ? 'text-success' : 'text-danger'),
                                    )
                            )
                    }) 

                    $("#invetory-item-table")
                        .find("tfoot")
                        .append(
                            $("<td>")
                                .attr({
                                    "colspan":4
                                })
                                .text(`Total:${total}`)
                                .addClass(total >= 0 ? "text-right font-weight-bolder text-success" : "text-right font-weight-bolder text-danger")
                        )

                    jsAddon.display.removefullPageLoader()
                  
                })
                
            },
            closeOpenedRows(selectedRow) {
                $.each(openRows, function (index, openRow) {
                    // not the selected row!
                    if ($.data(selectedRow) !== $.data(openRow)) {
                        var rowToCollapse = activeTable.row(openRow);
                        rowToCollapse.child.hide();
                        openRow.removeClass('shown');
                        // replace icon to expand
                        $(openRow).find('td.details-control').css({
                            'background': `url(${baseUrl}/assets/img/details_open.png) no-repeat center center`,
                            'cursor': 'pointer',
                        });
                        // remove from list
                        var index = $.inArray(selectedRow, openRows);
                        openRows.splice(index, 1);
                    }
                });
            },
            getStoreId:()=>{
                if(localStorage.getItem("activeStore") != null){
                    activeStore  = JSON.parse(localStorage.getItem("activeStore"));
                    return activeStore.storeid;
                }
                return null
            }
        }
    }
    inventory.init();
    $('#inventory-table tbody').on('click', 'td.details-control', function () {

        var tr = $(this).closest('tr');
        var row = activeTable.row( tr ); 
       
        if ( row.child.isShown() ) {
            // This row is already open - close it
            $('div.slider', row.child()).slideUp( function () {
                row.child.hide();
                tr.removeClass('shown');
            });
        }
        else {
            inventory.display.closeOpenedRows(tr);
            // Open this row;
            let tableHtml =  '<div class="slider">'+
                '<table class="table table-bordered text-center" cellpadding="5" id="invetory-item-table" cellspacing="0" border="0" style="padding-left:50px;">'+
                        '<thead>'+
                        '<tr>'+
                            '<th>Store</th>'+
                            '<th>Product</th>'+
                            '<th>Date</th>'+
                            '<th>Type</th>'+
                            '<th>Quantity</th>'+
                        '</tr>'+
                    '</thead>'+
                    '<tbody>'+
                            
                    '</tbody>'+
                    '<tfoot>'+
                            
                    '</tfoot>'+
                '</table>'+
            '</div>';
            row.child( tableHtml  ).show();
            inventory.display.dtFormat(row.data(),tr)
            tr.addClass('shown');
            $('div.slider', row.child()).slideDown();
            openRows.push(tr);
        }
    });
})