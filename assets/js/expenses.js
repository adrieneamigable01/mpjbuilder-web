$(()=>{
    var activeTable = null,
    userId= null,
    accesskey   = session.key;
    window.expenses = {
        init:()=>{
            expenses.ajax.getExpenses();
        },
        ajax:{
            getExpenses:()=>{
                let payload = {}

                if(expenses.funx.getStoreId() != null){
                    payload.storeid = expenses.funx.getStoreId();
                };
                return new Promise((resolve,reject)=>{
                    if ( $.fn.DataTable.isDataTable('#expenses-table') ) {
                        activeTable.clear();
                        activeTable.destroy();
                        $("#expenses-table").find("tbody").empty();
                    }
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getExpensesApi}`,
                        dataType:'json',
                        payload:payload
                    }).then((response)=>{
                        if(!response._isError){
                            console.log('response.data',response.data)
                             $.each(response.data,function(k,v){
                                    
                                     $("#expenses-table")
                                     .find("tbody")
                                     .append(
                                         $("<tr>")
                                             .append(
                                                 $("<td>")
                                                     .text(v.expense_id),
                                                $("<td>")
                                                     .text(v.ornumber),
                                                 $("<td>")
                                                     .text(v.expense_amount),
                                                 $("<td>")
                                                     .text(v.expense_date),
                                                 $("<td>")
                                                     .text(v.expense_categories),
                                                 $("<td>")
                                                     .text(v.storeName),
                                                 $("<td>")
                                                     .text(v.name),
                                                 $("<td>")
                                                     .text(v.description)
                                                     
                                             )
                                     )
                             })
                             resolve(true)
                        }
                    })
                     
                })
                .then(data=>{
                    if(data){
                        activeTable = $("#expenses-table").DataTable();
                        jsAddon.display.removefullPageLoader()
                    }
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
    expenses.init();
    $("#storeFilter").on("change",function(){
        expenses.ajax.getExpenses();
    })
})