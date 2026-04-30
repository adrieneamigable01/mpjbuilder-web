$(()=>{
    var activeTable = null,
    paymentTable = null,
    ornumber= null,
    accesskey   = session.key;
    payableStatus = 'active';
    window.payables = {
        init:()=>{
            ornumber = jsAddon.display.getQueryParam('id');
            payables.ajax.getCustomerPayables();
        },
        ajax:{
            getCustomerPayables:()=>{
                let payload = {
                    status:$("#payableStatus").val()
                }

                if(custopayablesmers.funx.getStoreId() != null){
                    payload.storeid = payables.funx.getStoreId();
                };
                return new Promise((resolve,reject)=>{
                    if ( $.fn.DataTable.isDataTable('#payables-table') ) {
                        activeTable.clear();
                        activeTable.destroy();
                        $("#payables-table").find("tbody").empty();
                    }
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getCustomerPayablesApi}`,
                        dataType:'json',
                        payload:payload
                    }).then((response)=>{
                        if(!response._isError){
                          

                            if(response.data.length > 0){
                                $.each(response.data,function(k,v){
                                    let data = v;
                                    let balance = parseFloat(data.amount) - parseFloat(data.total_payments)
    
                                    $("#payables-table tbody")
                                    .append(
                                        $("<tr>").append(
                                            $("<td>")
                                        .text(k + 1),
                                        $("<td>")
                                            .text(data.ornumber),
                                        $("<td>")
                                            .text(data.customer),
                                        $("<td>")
                                            .text(data.amount),
                                        $("<td>")
                                            .text(data.total_payments),
                                        $("<td>")
                                            .text(balance),
                                        $("<td>")
                                            .text(data.date_added),
                                        $("<td>")
                                            .text(data.due_date),
                                        $("<td>")
                                            .text(data.status),
                                        $("<td>")
                                            .append(
                                                $("<button>")
                                                .addClass("btn btn-primary btn-sm")
                                                .text("View More")
                                                .click(function(){
                                                    window.location.href = `customer_payables.php?id=${data.ornumber}`
                                                }),
                                            ),
                                        )
                                    )

                                    if (Object.keys(response.data).length - 1 == k) {
                                        resolve(true);
                                    }


                                })
                            }else{
                                resolve(true)
                            }
                        }else{
                            resolve(true)
                        }
                    })
                     
                })
                .then(data=>{
                    if(data){
                        activeTable = $("#payables-table").DataTable({
                            "autoWidth":false, 
                        });
                        jsAddon.display.removefullPageLoader()
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
    payables.init();
    $("#customer-button").click(function(){
        $("#customerFormModal").modal("show")
        ornumber = null;
    })
    $("#payableStatus").click(function(){
        payables.ajax.getCustomerPayables();
    })
    $("#storeFilter").on("change",function(){
        payables.ajax.getCustomerPayables();
    })
})