
var dataSet                 = [],
activeTable                 =   null,
transactionTable            =   null,
supplierId                  = null;

$(()=>{
    window.draft_transaction = {
        init:()=>{
            $(".loading").hide();
            draft_transaction.ajax.getUsers()
            setTimeout(() => {
                draft_transaction.ajax.getTransaction()
            }, 800);
        },
        ajax:{
            getUsers:()=>{
                let payload = {}

                if(draft_transaction.funx.getStoreId() != null){
                    payload.storeid = draft_transaction.funx.getStoreId();
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

                 if(draft_transaction.funx.getStoreId() != null){
                    payload.storeid = draft_transaction.funx.getStoreId();
                };

                jsAddon.display.addfullPageLoader()

             

                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getDraftTransactionApi}`,
                        dataType:'json',
                        payload:payload
                    }).then((response)=>{
                        if(response._isError){
                            jsAddon.display.swalMessage(response._isError,response.reason);
                            resolve(true)
                        }else{

                            if ( $.fn.DataTable.isDataTable('#draft-transaction-table') ) {
                                activeTable.clear();
                                activeTable.destroy();
                                $("#draft-transaction-table tbody").empty();
                               
                            }

                            if(response.data.length > 0){
                                
                               $.each(response.data,function(key,value){
                                    let  orderItems = $("<tbody>");
                                    let  discountItems = $("<ul>").addClass("list-group list-group-flush");
                                    let total = 0;
                                    $.each(JSON.parse(value.data),function(ki,vi){
                                    
                                        total += parseFloat(vi.price) * parseFloat(vi.quantity)
                                        orderItems.append(
                                            $("<tr>").append(
                                                $("<td>").text(vi.product_name),
                                                $("<td>").text(vi.price),
                                                $("<td>").text(vi.quantity),
                                                $("<td>").text(parseFloat(vi.price) * parseFloat(vi.quantity)),
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
                                    $.each(JSON.parse(value.discount_items),function(kd,vd){
                                        discountItems.append(
                                            $("<li>").addClass("list-group-item d-flex justify-content-between align-items-center list-group-item-action").text(`${vd.discount}`)
                                            .append(
                                                $("<span>")
                                                .addClass('badge badge-primary badge-pill')
                                                .text(`${vd.percentage}%`)
                                            )
                                        )
                                    })



                                    $("#draft-transaction-table tbody").append(
                                        $("<tr>").append(
                                            $("<td>").text(value.draftransactionid ),
                                            $("<td>").text(value.draftransactionDate),
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
                                            $("<td>").text(total),
                                            $("<td>").text(value.cash),
                                            $("<td>").append(
                                                discountItems
                                            ),
                                            $("<td>").text(value.name),
                                            $("<td>").text(value.note),
                                            $("<td>").text(value.status),
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
                    activeTable = $("#draft-transaction-table").DataTable({});
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
    draft_transaction.init();
    $("input[name=transaction-date]").change(function(){
        draft_transaction.ajax.getTransaction()
    })

    $(".store-type-menu").change(function(){
        draft_transaction.ajax.getUsers()
       setTimeout(() => {
        draft_transaction.ajax.getTransaction()
       }, 800);
    })
    $(".user-menu").change(function(){
        draft_transaction.ajax.getTransaction()
    })

})