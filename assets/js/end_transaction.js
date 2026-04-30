
var dataSet                 = [],
activeTable                 =   null,
transactionTable                 =   null,
supplierId                  = null;

$(()=>{
    window.eod_transaction = {
        init:()=>{
            $(".loading").hide();
            eod_transaction.ajax.getStores()
            eod_transaction.ajax.getUsers()
            setTimeout(() => {
                eod_transaction.ajax.getTransaction()
            }, 800);
        },
        ajax:{
            getUsers:()=>{
                let payload = {}

                if(eod_transaction.funx.getStoreId() != null){
                    payload.storeid = eod_transaction.funx.getStoreId();
                };

                
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getUsersApi}`,
                        dataType:'json',
                        payload:payload,
                    }).then((response)=>{
                        if(!response._isError){

                            if(response.data.length > 0){
                                $(".user-menu")
                                .empty()
                                .append(
                                    $("<option>")
                                        .attr({
                                            value:'All',
                                            selected:'seleted'
                                        })
                                        .text("All")
                                )
                                $.each(response.data,function(k,v){
                                    $(".user-menu")
                                    .append(
                                        $("<option>")
                                            .text(v.name)
                                            .attr({
                                                value:v.userId
                                            })
                                    )
                                })
                            }else{
                                $(".user-menu")
                                .empty()
                                .append(
                                    $("<option>")
                                        .attr({
                                            value:0
                                        })
                                        .text("No user")
                                )
                            }
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
                        if(!response._isError){
                            $(".store-type-menu")
                            .empty()
                            .append(
                                $("<option>")
                                    .attr({
                                        value:'All',
                                         selected:'seleted'
                                    })
                                    .text("All")
                            )
                            $.each(response.data,function(k,v){
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
            getTransaction:()=>{
                let date = $("input[name=transaction-date]").val();
                let storeid = $(".store-type-menu").val();
                let userid = $(".user-menu").val();
                payload = {
                    date:date,
                    userid:userid,
                }

                 if(eod_transaction.funx.getStoreId() != null){
                    payload.storeid = eod_transaction.funx.getStoreId();
                };


                jsAddon.display.addfullPageLoader()

             

                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getEndTransactionApi}`,
                        dataType:'json',
                        payload:payload
                    }).then((response)=>{
                        if(response._isError){
                            jsAddon.display.swalMessage(response._isError,response.reason);
                            resolve(true)
                        }else{

                            if ( $.fn.DataTable.isDataTable('#end-transaction-table') ) {
                                activeTable.clear();
                                activeTable.destroy();
                                $("#end-transaction-table tbody").empty();
                               
                            }

                            if(response.data.length > 0){
                               $.each(response.data,function(key,value){
                                    let transaction = value.transactions;
                                    const transactionParseData = JSON.parse(transaction);
                                    $("#end-transaction-table tbody").append(
                                        $("<tr>").append(
                                            $("<td>").text(value.end_transaction_id),
                                            $("<td>").text(value.name),
                                            $("<td>").text(value.storeName),
                                            $("<td>").text(value.end_transaction_date),
                                            $("<td>").text(value.cash),
                                            $("<td>").text(transactionParseData.length),
                                            $("<td>").append(
                                                $("<button>")
                                                    .addClass("btn btn-info btn-sm")
                                                    .text("View Transactions")
                                                    .click(function(){
                                                        $("#transaction-history").modal("show");
                                                       
                                                        if ( $.fn.DataTable.isDataTable('#transaction-history-table') ) {
                                                            transactionTable.clear();
                                                            transactionTable.destroy();
                                                            $("#transaction-history-table tbody").empty();
                                                           
                                                        }

                                                        new Promise((res,rej)=>{
                                                            $.each(transactionParseData,function(k,v){
                                                                let  orderItems = $("<tbody>");
                                                                let  discountItems = $("<ul>").addClass("list-group list-group-flush");
                                                                
                                                                const transactionData = JSON.parse(v.data);
                                                                $.each(transactionData,function(k,v){
                                                                    orderItems.append(
                                                                        $("<tr>").append(
                                                                            $("<td>").text(v.product_name),
                                                                            $("<td>").text(v.price),
                                                                            $("<td>").text(v.quantity),
                                                                            $("<td>").text(parseFloat(v.price) * parseFloat(v.quantity)),
                                                                        )
                                                                        // $("<li>")
                                                                        // .addClass("list-group-item d-flex justify-content-between align-items-center list-group-item-action").text(`${v.product_name}`)
                                                                        // .append(
                                                                        //     $("<span>")
                                                                        //         .addClass('badge badge-primary badge-pill')
                                                                        //         .text(`${v.price}`)
                                                                        // )
                                                                    )
                                                                })
                                                                $.each(JSON.parse(v.discount_items),function(k,v){
                                                                    discountItems.append(
                                                                        $("<li>").addClass("list-group-item d-flex justify-content-between align-items-center list-group-item-action").text(`${v.discount}`)
                                                                        .append(
                                                                            $("<span>")
                                                                            .addClass('badge badge-primary badge-pill')
                                                                            .text(`${v.percentage}%`)
                                                                        )
                                                                    )
                                                                })
                                
                                
                                                                $("#transaction-history-table")
                                                                .find("tbody")
                                                                .eq(0)
                                                                .append(
                                                                    $("<tr>")
                                                                        .append(
                                                                            $("<td>").text(v.transactionid),
                                                                            $("<td>").text(v.transactionDate),
                                                                            $("<td>").append(
                                                                                $("<table>")
                                                                                    .addClass("table table-borderd")
                                                                                    .append(
                                                                                        $("<thead>")
                                                                                        .append(
                                                                                            $("<td>").text("Item"),
                                                                                            $("<td>").text("Price"),
                                                                                            $("<td>").text("Quanity"),
                                                                                            $("<td>").text("Total")
                                                                                        ),
                                                                                        orderItems
                                                                                    )
                                                                            ),
                                                                            $("<td>").text(`${v.discount}%`),
                                                                            $("<td>").text(v.discount_amount),
                                                                            $("<td>").append(
                                                                                discountItems
                                                                            ),
                                                                            $("<td>").text(v.cash),
                                                                            $("<td>").text( v.discount_amount > 0 ? v.total_price : 0 ),
                                                                            $("<td>").text(parseFloat(v.total_price) + parseFloat(v.discount_amount)),
                                                                            $("<td>").text(v.note),
                                                                            $("<td>").text('-'),
                                                                        )
                                                                )

                                                                if (Object.keys(transactionParseData).length - 1 == k) {
                                                                    res(true);
                                                                }
                                                            })
                                                        }).then(()=>{
                                                            transactionTable = $("#transaction-history-table").DataTable({
                                                                // "aoColumns": [
                                                                //     { "sTitle": "Purpose","sWidth": "20%"},
                                                                    // { "bVisible": false, "aTargets": [ 0 ] }
                                                                // ],
                                                                "aoColumnDefs": [
                                                                    // { "bVisible": false, "aTargets": [ 6 ] }
                                                                ] ,
                                                                "iDisplayLength": 10,
                                                                "aLengthMenu": [[10,25,50,75,100,-1],[10,25,50,75,100,"All"]],
                                                                "bAutoWidth": false,
                                                                "bSort": false,
                                                                "fnCreatedRow": function( nRow, aData, iDataIndex ) {
                                                                    // let data = aData[0].split(":");
                                                                    // let name = data[1];
                                                                    // let id = data[0];
                                                                    $(nRow).attr("id",`transaction-${aData[1]}`)
                                                                
                                    
                                                                    $("td",nRow)
                                                                    .last()
                                                                    .empty()
                                                                    .addClass("text-center")
                                                                    .append(
                                                                        // $("<button>")
                                                                        // .addClass("btn btn-success btn-sm")
                                                                        // .text("Update")
                                                                        // .click(function(){
                                                                        //     transaction_id = aData[0];
                                                                        // }),
                                                                    )
                                    
                                                                },
                                                                "footerCallback": function ( row, data, start, end, display ) {
                                                                    var api = this.api(), data;
                                                         
                                                                    // Remove the formatting to get integer data for summation
                                                                    var intVal = function ( i ) {
                                                                        return typeof i === 'string' ?
                                                                            i.replace(/[\$,]/g, '')*1 :
                                                                            typeof i === 'number' ?
                                                                                i : 0;
                                                                    };
                                    
                                    
                                    
                                                                    discount_amount = api
                                                                        .column( 4 )
                                                                        .data()
                                                                        .reduce( function (a, b) {
                                                                            return intVal(a) + intVal(b);
                                                                        }, 0 );
                                                         
                                                                    // Update footer
                                                                    $( api.column( 4 ).footer() ).html(
                                                                        `Total: (₱) ${discount_amount}`
                                                                        // '(₱)'+pageTotal +' ( $(₱) '+ total +' total)'
                                                                        // '(₱)'+pageTotal +' ( $(₱) '+ total +' total)'
                                                                    );
                                    
                                    
                                    
                                    
                                                                    total_cash = api
                                                                        .column( 6 )
                                                                        .data()
                                                                        .reduce( function (a, b) {
                                                                            return intVal(a) + intVal(b);
                                                                        }, 0 );
                                                         
                                                                    // Update footer
                                                                    $( api.column( 6 ).footer() ).html(
                                                                        `Total: (₱) ${total_cash}`
                                                                        // '(₱)'+pageTotal +' ( $(₱) '+ total +' total)'
                                                                        // '(₱)'+pageTotal +' ( $(₱) '+ total +' total)'
                                                                    );
                                    
                                    
                                    
                                                                    total_discount = api
                                                                            .column( 7 )
                                                                            .data()
                                                                            .reduce( function (a, b) {
                                                                                return intVal(a) + intVal(b);
                                                                            }, 0 );
                                                            
                                                                        // Update footer
                                                                        $( api.column( 7 ).footer() ).html(
                                                                            `Total: (₱) ${total_discount}`
                                                                            // '(₱)'+pageTotal +' ( $(₱) '+ total +' total)'
                                                                            // '(₱)'+pageTotal +' ( $(₱) '+ total +' total)'
                                                                        );
                                                         
                                                                    // Total over all pages
                                                                    total = api
                                                                        .column( 8 )
                                                                        .data()
                                                                        .reduce( function (a, b) {
                                                                            return intVal(a) + intVal(b);
                                                                        }, 0 );
                                                         
                                                                    // Update footer
                                                                    $( api.column( 8 ).footer() ).html(
                                                                        `Total: (₱) ${total}`
                                                                        // '(₱)'+pageTotal +' ( $(₱) '+ total +' total)'
                                                                        // '(₱)'+pageTotal +' ( $(₱) '+ total +' total)'
                                                                    );
                                    
                                                                   
                                                                },
                                                                "fnInitComplete": function(oSettings, json) {
                                                                    jsAddon.display.removefullPageLoader()
                                                                    // menu.ajax.getUser();
                                                                }
                                                            });
                                                        })
                                                       

                                                        
                                                    })
                                            ),
                                        )
                                    )

                                    if (Object.keys(response.data).length - 1 == key) {
                                        resolve(true);
                                    }
                                    
                               })
                            }else{
                                resolve(true)
                            }
                        }
                       
                        
                    })
                     
                }).then(data=>{
                    activeTable = $("#end-transaction-table").DataTable({});
                    jsAddon.display.removefullPageLoader()
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
    eod_transaction.init();
    $("input[name=transaction-date]").change(function(){
        eod_transaction.ajax.getTransaction()
    })

    $(".store-type-menu").change(function(){
        eod_transaction.ajax.getUsers()
       setTimeout(() => {
        eod_transaction.ajax.getTransaction()
       }, 800);
    })
    $(".user-menu").change(function(){
        eod_transaction.ajax.getTransaction()
    })

})