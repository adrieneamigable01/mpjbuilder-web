
var dataSet                 = [],
activeTable                 =   null,
supplierId                  = null;

$(()=>{
    window.transaction = {
        init:()=>{
            $(".loading").hide();
          
            // transaction.ajax.getStores()
            transaction.ajax.getUsers()
            transaction.ajax.getTransaction()
        },
        ajax:{
            getUsers:()=>{
                let payload = {}

                 if(transaction.funx.getStoreId() != null){
                    payload.storeid = transaction.funx.getStoreId();
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
                let userid = $(".user-menu").val();
                payload = {
                    date:date,
                    userid:userid,
                }

             
                if(transaction.funx.getStoreId() != null){
                    payload.storeid = transaction.funx.getStoreId();
                };

                jsAddon.display.addfullPageLoader()

                if ( $.fn.DataTable.isDataTable('#transaction-table') ) {
                    activeTable.clear();
                    activeTable.destroy();

                    $("#transaction-table")
                    .find("tbody")
                    .empty()
                }

               

                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getTransactionApi}`,
                        dataType:'json',
                        payload:payload
                    }).then((response)=>{
                        if(response._isError){
                            jsAddon.display.swalMessage(response._isError,response.reason);
                        }else{
                            transactions = response.data;
                            if(response.data.length > 0){
                                let overall_discount_amount = 0;
                                let overall_cash = 0;
                                let overall_total_price = 0
                                let overall_total_discount = 0;
                                $.each(response.data,function(k,v){
                                    
                                    let  orderItems = $("<table>");
                                    let  discountItems = $("<ul>").addClass("list-group list-group-flush");
                                    if(v.data != ""){
                                        if(v.transaction_category == "Transaction" || v.transaction_category == "Payables"){
                                            orderItems                                        
                                            .addClass("table table-borderd")
                                            .append(
                                                $("<thead>")
                                                .append(
                                                    $("<td>").text("Item"),
                                                    $("<td>").text("Price"),
                                                    $("<td>").text("Quanity"),
                                                    $("<td>").text("Total")
                                                ),
                                                $("<tbody>")
                                            )

                                            $.each(JSON.parse(v.data),function(k,v){
                                                orderItems.find('tbody').append(
                                                    $("<tr>").append(
                                                        $("<td>").text(v.type == "Transaction" ? v.product_name : 'Delivery'),
                                                        $("<td>").text(v.price),
                                                        $("<td>").text(v.quantity),
                                                        $("<td>").text(parseFloat(v.price) * parseFloat(v.quantity)),
                                                    )
                                                )
                                            })
                                        }else if(v.transaction_category == "Payment"){
                                            orderItems                                        
                                            .addClass("table table-borderd")
                                            .append(
                                                $("<thead>")
                                                .append(
                                                    $("<td>").text("OR #"),
                                                ),
                                                $("<tbody>")
                                            )

                                            $.each(JSON.parse(v.data),function(k,v){
                                                orderItems.find('tbody').append(
                                                    $("<tr>").append(
                                                        $("<td>").text(v.ornumber),
                                                    )
                                                )
                                            })
                                        }
                                        else{
                                            orderItems                                        
                                            .addClass("table table-borderd")
                                            .append(
                                                $("<thead>")
                                                .append(
                                                    $("<td>").text("Category"),
                                                    $("<td>").text("Amount"),
                                                    $("<td>").text("Date"),
                                                ),
                                                $("<tbody>")
                                            )

                                            $.each(JSON.parse(v.data),function(key_expense,value_expense){
                                                orderItems.find('tbody').append(
                                                    $("<tr>").append(
                                                        $("<td>").text(value_expense.expense_category),
                                                        $("<td>").text(value_expense.amount),
                                                        $("<td>").text(v.transactionDate),
                                                    )
                                                )
                                            })
                                        }
                                    }
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

                                    let discountedPrice = parseFloat(v.amount) - parseFloat(v.discount_amount??0);

                                    overall_discount_amount +=  v.discount_amount > 0 || v.discount_amount != null ?  parseFloat(v.discount_amount) : 0;
                                    overall_cash += parseFloat( v.cash);
                                    if(v.transaction_type == "Cash-in"){
                                        overall_total_price += parseFloat(discountedPrice);
                                    }else if(v.transaction_type == "Cash-out"){
                                        overall_total_price -= parseFloat(discountedPrice);
                                    }
                                   
                                    // overall_total_discounted_price += v.discount_amount > 0 || v.discount_amount != null ? parseFloat(v.discount_amount) : 0;
                                    $("#transaction-table")
                                    .find("tbody").eq(0)
                                    .append(
                                        $("<tr>")
                                            .append(
                                                $("<td>").text(v.transactionid),
                                                $("<td>").append(
                                                    $("<span>")
                                                        .addClass(`${v.transaction_type == "Cash-in" ? 'badge badge-success' : 'badge badge-danger'}`)
                                                        .text(v.transaction_type)
                                                ),
                                                $("<td>").append(
                                                    v.transaction_category
                                                ),
                                                $("<td>").text(v.transactionDate),
                                                $("<td>").append(
                                                    orderItems
                                                ),
                                                $("<td>").text(`${v.discount}%`),
                                                $("<td>").text(v.discount_amount),
                                                $("<td>").append(
                                                    discountItems
                                                ),
                                                // $("<td>").text(v.cash),
                                                // $("<td>").text( v.discount_amount > 0 || v.discount_amount != null ? v.discount_amount : 0 ),
                                                // $("<td>").text(discountedPrice),
                                                $("<td>").text(v.amount),
                                                $("<td>").text(v.note),
                                                $("<td>").append(
                                                    // $("<button>")
                                                    // .addClass("btn btn-info btn-sm")
                                                    // .text("Print")
                                                    // .click(function(){
                                                    //     Swal.fire({
                                                    //         title: 'Print Receipt',
                                                    //         html: `
                                                    //             <div class="row">
                                                    //                 <div class="col-12 text-left ml-3">
                                                    //                     <input class="form-check-input" type="checkbox" checked="true" id="showAmount">
                                                    //                     <label class="form-check-label" for="defaultCheck1">
                                                    //                         Display Amount
                                                    //                     </label>
                                                    //                 </div>
                                                    //             </div>`,
                                                    //         preConfirm: () => {
                                                    //             const showAmount = $('#showAmount').is(':checked');
                                                                
                                                    //             // if (!ornumber) {
                                                    //             //     Swal.showValidationMessage(`Please enter or number`);
                                                    //             // }
                                                    //             return { showAmount:showAmount };
                                                    //         },
                                                            
                                                    //         showCancelButton: true,
                                                    //         confirmButtonColor: '#3085d6',
                                                    //         cancelButtonColor: '#d33',
                                                    //         confirmButtonText: 'Submit'
                                                    //     }).then((result) => {
                                                        
                                                    //         if (result.value) {
                                                    //             pos.display.printReceipt(v.transactionid,result.value.showAmount);
                                                    //         }
                                                    //     })

                                                        
                                                    // }),
                                                    // $("<button>")
                                                    // .addClass("btn btn-danger btn-sm ml-2")
                                                    // .text("Void")
                                                    // .click(function(){
                                                    //     pos.ajax.generateVoidOTP({
                                                    //         transactionid:v.transactionid,
                                                    //         fullName:jsAddon.display.userdata().fullName,
                                                    //         userid:jsAddon.display.userdata().userid,
                                                    //         storeid:jsAddon.display.userdata().storeid,
                                                    //         email:jsAddon.display.userdata().email,
                                                    //     }).then((data)=>{
                                                    //         if(data){
                                                    //             pos.display.showOTPValidationForm(v);
                                                    //         }
                                                    //     })
                                                    // }),
                                                ),
                                            )
                                    )

                                    if(Object.keys(response.data).length - 1 == k){
                                       

                                        $("#transaction-table")
                                        .find("tfoot").eq(0).find("tr").eq(0).find("th").eq(6).text(overall_discount_amount)
                                        // $("#transaction-table")
                                        // .find("tfoot").eq(0).find("tr").eq(0).find("th").eq(8).text(overall_total_price)
                                        // $("#transaction-table")
                                        // .find("tfoot").eq(0).find("tr").eq(0).find("td").eq(9).text(overall_total_discounted_price)
                                        $("#transaction-table")
                                        .find("tfoot").eq(0).find("tr").eq(0).find("th").eq(8).text(overall_total_price)
                                       
                                        resolve(true)
                                    }
                                })
                            }else{
                                resolve(true)
                            }
                        }
                        jsAddon.display.removefullPageLoader()
                        resolve(true)
                    })
                     
                }).then(data=>{
                    if(data){
                        activeTable = $("#transaction-table").DataTable({
                          
                        });
                    }
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
    transaction.init();
    $("input[name=transaction-date]").change(function(){
        transaction.ajax.getTransaction()
    })
    $(".store-type-menu").change(function(){
        transaction.ajax.getUsers()
        transaction.ajax.getTransaction()
    })
    $(".user-menu").change(function(){
        transaction.ajax.getTransaction()
    })

})