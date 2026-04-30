$(()=>{
    isLogout = false;
    now = new Date();
    var myLineChart = null;
    var selectedStore;
    var stores;
    var activeTable = null;
    dashboard = {
        init:()=>{
            jsAddon.display.addfullPageLoader()
            let token = localStorage.getItem("token")
            if(token == null){
                localStorage.removeItem('session');
                localStorage.removeItem('token');
                window.location.href = base;
            }
            dashboard.ajax.checkToken().then((data)=>{
                if(data){
                    dashboard.ajax.getStores().then(()=>{
                        dashboard.ajax.getSuppliers();
                        dashboard.ajax.getInventory();
                        dashboard.ajax.getCustomer();
                        dashboard.ajax.getTransaction();
                        dashboard.ajax.getCustomerPayables()
                        dashboard.ajax.getTransactionByYear()
                        dashboard.display.displayDashboardData();
                        jsAddon.display.removefullPageLoader();
                    })
                    
                }  
            })
          
        },
        ajax:{
            checkToken:()=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${checkTokenApi}`,
                        dataType:'json',
                    }).then((response)=>{
                        resolve(!response._isError)
                    })
                     
                })
            },
            getCustomerPayables:()=>{
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getCustomerPayablesApi}`,
                        dataType:'json',
                    }).then((response)=>{
                        if(!response._isError){
                            $("#total-payables").text(response.data.length)
                        }
                    })
                     
                })
            },
            getTransaction:()=>{
                payload = {
                    date:jsAddon.display.getDate(now),
                }
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getTransactionApi}`,
                        dataType:'json',
                        payload:payload
                    }).then((response)=>{
                        $("#total-transactions").text(response.data.length)
                    })
                     
                })
            },
            getCustomer:()=>{

                return new Promise((resolve,reject)=>{

                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getCustomerApi}`,
                        dataType:'json',
                    }).then((response)=>{
                        if(!response._isError){
                            let count = response.data.length
                            $("#total-customers").text(count) 
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
                        let count = response.data.length
                        $("#total-suppliers").text(count) 
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
                        let count = 0;
                        let colorNumber = 0;
                        let colorAray = [
                            'bg-primary',
                            'bg-success',
                            'bg-warning',
                            'bg-danger',
                            'bg-info',
                        ];
                        if(response.data.length > 0){
                            if(localStorage.getItem("activeStore") != null){
                                let storedStore = JSON.parse(localStorage.getItem('activeStore'));
                                selectedStore = response.data.find(item => item.storeid == storedStore.storeid);
                            }else{
                                selectedStore = response.data[0];
                                localStorage.setItem('activeStore', JSON.stringify(selectedStore));
                            }
                            
                            stores = response.data;
                            $.each(response.data,function(k,v){
                                count++;
                                let randomNumber = Math.floor(Math.random() * 100) + 1;
                                $("#store_list")
                                    .append(
                                        $("<h4>")
                                            .addClass("small font-weight-bold")
                                            .text(v.storeName)
                                            .append(
                                                $("<span>")
                                                    .addClass("float-right")
                                                    .text(`${randomNumber}%`)
                                            ),
                                        $("<div>")
                                            .addClass("progress mb-4")
                                            .append(
                                                $("<div>")
                                                    .addClass(`progress-bar ${colorAray[colorNumber]}`)
                                                    .attr({
                                                        role:'progressbar',
                                                        'aria-valuenow':20,
                                                        'aria-valuemin':0,
                                                        'aria-valuemax':100,
                                                    })
                                                    .css({
                                                        'width': `${randomNumber}%`
                                                    })
                                            )
                                    )
                                colorNumber++;
                                if(colorNumber >= 5){
                                    colorNumber = 0;
                                }
                            })  
                            $("#total-stores").text(count)
                            resolve(true)
                        }
                    })
                     
                })
            },
            getInventory:()=>{
                let payload = {};
                 if(dashboard.display.getStoreId() != null){
                    payload.storeid = dashboard.display.getStoreId();
                };
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getInventoryApi}`,
                        dataType:'json',
                        payload:payload,
                    }).then((response)=>{
                        let count = 0;

                        if ( $.fn.DataTable.isDataTable('#dash-inventory-table') ) {
                            activeTable.clear();
                            activeTable.destroy();
                            $("#dash-inventory-table tbody").empty();
                            
                        }

                        if(response.data.length > 0){
                            $.each(response.data,function(k,v){
                                let isNeedToReStock = parseFloat(v.total) <= parseFloat(v.restock_quantity)
                                $("#dash-inventory-table tbody")
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
                                                    .text(`(${v.used_quantity})`)
                                                    .addClass("text-danger"),
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
                        } else{
                            resolve(true);
                        }

                        $("#total-stores").text(count)
                    })
                     
                }).then(()=>{
                    activeTable = $("#dash-inventory-table").DataTable({
                        "autoWidth":false, 
                    });
                     jsAddon.display.removefullPageLoader()
                })
            },
            getTransactionByYear:()=>{
                let year_selection = $("#area-chart-date-dropdown").val();
    
                payload = {
                    year:year_selection
                };
                return new Promise((resolve,reject)=>{
                    jsAddon.display.ajaxRequest({
                        type:'get',
                        url:`${getTransactionByYearApi}`,
                        dataType:'json',
                        payload:payload
                    }).then((response)=>{
                        if(!response._isError){
                            dashboard.display.getAreaChart(response.areaChartData)
                        }
                    })
                     
                })
            },
            deAuth:()=>{
                Swal.fire({
                    title: 'Ready to Leave?',
                    text: "Select (Logout) below if you are ready to end your current session.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Logout'
                }).then((result) => {
                    return new Promise((resolve,reject)=>{
                        jsAddon.display.addfullPageLoader();
                        jsAddon.display.ajaxRequest({
                            type:'post',
                            url:deautnApi,
                            dataType:'json',
                        }).then((response)=>{
                            if(!response._isError){
                                localStorage.clear();
                                setTimeout(() => {
                                    window.location.href = baseUrl;
                                }, 2000);
                            }
                        })
                         
                    })
                })
            }
        },
        display:{
            displayDashboardData:()=>{
                $("#dashboard_fullname").text(fullName);
                $("#dashboard_store").text(selectedStore.storeName);
            },
            number_format:(number, decimals, dec_point, thousands_sep) => {
                // *     example: number_format(1234.56, 2, ',', ' ');
                // *     return: '1 234,56'
                number = (number + '').replace(',', '').replace(' ', '');
                var n = !isFinite(+number) ? 0 : +number,
                    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                    s = '',
                    toFixedFix = function(n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + Math.round(n * k) / k;
                    };
                // Fix for IE parseFloat(0.55).toFixed(0) = 0;
                s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
                if (s[0].length > 3) {
                    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
                }
                if ((s[1] || '').length < prec) {
                    s[1] = s[1] || '';
                    s[1] += new Array(prec - s[1].length + 1).join('0');
                }
                return s.join(dec);
            },
            getAreaChart:(data)=>{
                if(myLineChart != null){
                    myLineChart.data.datasets[0].data = data; // New data

                    // Optionally update other properties if needed
                    myLineChart.options.scales.yAxes[0].ticks.beginAtZero = true;
                    
                    // Call update to re-render the chart
                    myLineChart.update();
                }else{
                    var ctx = document.getElementById("myAreaChart");
                    myLineChart =  new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        datasets: [{
                        label: "Earnings",
                        lineTension: 0.3,
                        backgroundColor: "rgba(78, 115, 223, 0.05)",
                        borderColor: "rgba(78, 115, 223, 1)",
                        pointRadius: 3,
                        pointBackgroundColor: "rgba(78, 115, 223, 1)",
                        pointBorderColor: "rgba(78, 115, 223, 1)",
                        pointHoverRadius: 3,
                        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                        pointHitRadius: 10,
                        pointBorderWidth: 1,
                        data: data,
                        }],
                    },
                    options: {
                        maintainAspectRatio: false,
                        layout: {
                        padding: {
                            left: 10,
                            right: 25,
                            top: 25,
                            bottom: 0
                        }
                        },
                        scales: {
                        xAxes: [{
                            time: {
                            unit: 'date'
                            },
                            gridLines: {
                            display: false,
                            drawBorder: false
                            },
                            ticks: {
                            maxTicksLimit: 7
                            }
                        }],
                        yAxes: [{
                            ticks: {
                            maxTicksLimit: 5,
                            padding: 10,
                            // Include a dollar sign in the ticks
                            callback: function(value, index, values) {
                                return '₱' + dashboard.display.number_format(value);
                            }
                            },
                            gridLines: {
                            color: "rgb(234, 236, 244)",
                            zeroLineColor: "rgb(234, 236, 244)",
                            drawBorder: false,
                            borderDash: [2],
                            zeroLineBorderDash: [2]
                            }
                        }],
                        },
                        legend: {
                        display: false
                        },
                        tooltips: {
                        backgroundColor: "rgb(255,255,255)",
                        bodyFontColor: "#858796",
                        titleMarginBottom: 10,
                        titleFontColor: '#6e707e',
                        titleFontSize: 14,
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: false,
                        intersect: false,
                        mode: 'index',
                        caretPadding: 10,
                        callbacks: {
                            label: function(tooltipItem, chart) {
                            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                            return datasetLabel + ': ₱' + dashboard.display.number_format(tooltipItem.yLabel);
                            }
                        }
                        }
                    }
                    });
                }
                
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

    dashboard.init();

    $("#area-chart-date-dropdown").change(function(){
        dashboard.ajax.getTransactionByYear()
    })

    window.addEventListener('beforeunload',(event) =>{
        if(!isLogout){
            jsAddon.display.setSessionData('session',session);
        }
    });

    $(".logout").click(function(){
        isLogout = true;
        dashboard.ajax.deAuth();
    })
    $(document).ready(function() {
    
        // Your raw data from the database (JSON array)
       

        $('#changeStoreBtn').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // 1. Convert your JSON array into a Swal2-friendly format: { "1": "Mercado Store", ... }
            let storeData = stores;
            let storeOptions = {};
            $.each(storeData, function(index, store) {
                // Only include active stores
                if(store.isActive === "1") {
                    storeOptions[store.storeid] = store.storeName;
                }
            });

            // 2. Launch SweetAlert2
            Swal.fire({
                title: 'Switch Location',
                text: 'Choose which branch to manage:',
                input: 'select',
                inputOptions: storeOptions, // Use the mapped object here
                inputPlaceholder: 'Select a store',
                showCancelButton: true,
                confirmButtonColor: '#4e73df',
                confirmButtonText: 'Change Store',
                inputValidator: (value) => {
                    if (!value) {
                        return 'Please select a store to continue';
                    }
                    if(value == selectedStore.storeid){
                         return 'You already on the selected store';
                    }
                }
            }).then((result) => {
                if (result) {
                    const selectedID = result.value;
                    const selectedName = storeOptions[selectedID];

                    // 3. Update the UI
                    $('#dashboard_store').fadeOut(200, function() {
                        $(this).text(selectedName).fadeIn(200);
                    });
                    selectedStore = storeData.find(item => item.storeid == selectedID);
                    dashboard.display.displayDashboardData();
                    // 4. Update Backend/Session
                    // Since you are in development, you can send an AJAX request here:
                    /*
                    $.ajax({
                        url: 'api/set_active_store.php',
                        method: 'POST',
                        data: { storeid: selectedID },
                        success: function(res) {
                            console.log("Session updated to: " + selectedName);
                        }
                    });
                    */
                   
                    localStorage.setItem('activeStore', JSON.stringify(selectedStore));

                     dashboard.ajax.getInventory();
                    //Stocks
                    window.stocks?.ajax?.getSuppliers();
                    window.stocks?.ajax?.getStocks();
                    //Transactions
                    window.transaction?.ajax?.getUsers();
                    window.transaction?.ajax?.getTransaction();
                    //Draft Transactions
                    window.draft_transaction?.ajax?.getUsers();
                    window.draft_transaction?.ajax?.getTransaction();
                    //End of Day Transactions
                    window.eod_transaction?.ajax?.getUsers();
                    window.eod_transaction?.ajax?.getTransaction();
                    //Customers
                    window.customers?.ajax?.getCustomers();
                    //Customers Payables
                    window.payables?.ajax?.getCustomerPayables();
                    //Users
                    window.users?.ajax?.getUsers();
                    //Expenses
                    window.expenses?.ajax?.getExpenses();
                    //Stores
                    window.stores?.ajax?.getStores();

                   

                    window.inventory?.ajax?.getInvetory()
                    Swal.fire({
                        icon: 'success',
                        title: 'Location Updated',
                        text: `Switched to ${selectedName}`,
                        timer: 1500,
                        showConfirmButton: false
                    });
                   
                }
            });
        });


        const storageKey = "active_pos_menu";

        // 1. Handle Click Events
        $('.nav-link, .collapse-item').on('click', function() {
            const linkHref = $(this).attr('href');
            
            // Only save if it's a real page link, not a '#' toggle
            if (linkHref && linkHref !== "#") {
                localStorage.setItem(storageKey, linkHref);
            }
        });

        // 2. Restore State on Page Load
        function restoreMenuState() {
            const savedHref = localStorage.getItem(storageKey);
            
            // If nothing is saved, try to match based on the current URL
            const currentHref = window.location.pathname.split('/').pop();
            const pathToMatch = savedHref ? savedHref : currentHref;

            if (pathToMatch) {
                // Find the link that matches the path
                const $activeLink = $(`#accordionSidebar [href*="${pathToMatch}"]`);

                if ($activeLink.length) {
                    // Remove existing active classes
                    $('.nav-item').removeClass('active');
                    $('.collapse-item').removeClass('active');

                    if ($activeLink.hasClass('collapse-item')) {
                        // It's a sub-menu item
                        $activeLink.addClass('active');
                        const $parentCollapse = $activeLink.closest('.collapse');
                        
                        // Open the dropdown and highlight the main category
                        $parentCollapse.addClass('show');
                        $parentCollapse.closest('.nav-item').addClass('active');
                        
                        // Update the 'aria-expanded' for the toggle arrow icon
                        $(`[data-target="#${$parentCollapse.attr('id')}"]`).removeClass('collapsed').attr('aria-expanded', 'true');
                    } else {
                        // It's a top-level item (like Dashboard)
                        $activeLink.closest('.nav-item').addClass('active');
                    }
                }
            }
        }

        restoreMenuState();
    });

})