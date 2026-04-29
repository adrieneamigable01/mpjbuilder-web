<style>
    /* Soften the main background */
    body { background-color: #f0f2f5; }

    /* Modern Card Styling */
    .card {
        border: none !important;
        border-radius: 12px !important;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.08) !important;
    }

    /* Update the "View" links to look like buttons */
    .card-body a.float-right {
        background: #f8f9fa;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.75rem;
        text-decoration: none;
        color: #4e73df;
        border: 1px solid #e3e6f0;
    }

    .card-body a.float-right:hover {
        background: #4e73df;
        color: #fff;
    }

    /* Table Improvements */
    #dash-inventory-table {
        border: none;
    }
    #dash-inventory-table thead th {
        background-color: #f8f9fc;
        border-bottom: 2px solid #e3e6f0;
        color: #4e73df;
        text-transform: uppercase;
        font-size: 0.7rem;
        letter-spacing: 0.5px;
    }
    #dash-inventory-table tbody tr:hover {
        background-color: rgba(78, 115, 223, 0.03);
    }

    /* Chart Header Styling */
    .card-header {
        background-color: #fff !important;
        border-bottom: 1px solid #f1f1f1 !important;
        border-radius: 12px 12px 0 0 !important;
    }

    /* Style for the Select Dropdown in Chart */
    #area-chart-date-dropdown {
        border-radius: 8px;
        border: 1px solid #d1d3e2;
        font-size: 0.85rem;
    }
    
    .input-group-text {
        background-color: #f8f9fc;
        border-radius: 8px 0 0 8px;
        border-right: none;
        font-size: 0.8rem;
    }
</style>


<?php include_once 'common/dashboard_header.php';?>

<div class="container-fluid">

    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <div>
            <h1 class="h3 mb-0 text-gray-800 font-weight-bold">Analytics Overview</h1>
            <p class="text-muted small mb-0">Welcome back! Here is what's happening today.</p>
        </div>
        <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm rounded-pill px-3">
            <i class="fas fa-download fa-sm text-white-50 mr-1"></i> Generate Report
        </a>
    </div>

    <div class="row">

        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Total Suppliers</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="total-suppliers">Loading...</div>
                        </div>
                        <div class="col-auto">
                            <div class="p-3 bg-gray-100 rounded-circle">
                                <i class="fas fa-handshake fa-lg text-primary"></i>
                            </div>
                        </div>
                        <div class="col-12 border-top mt-3 pt-2">
                            <a href="suppliers.php" class="float-right font-weight-bold">View List</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Total Customers</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="total-customers">0</div>
                        </div>
                        <div class="col-auto">
                            <div class="p-3 bg-gray-100 rounded-circle">
                                <i class="fas fa-users fa-lg text-success"></i>
                            </div>
                        </div>
                        <div class="col-12 border-top mt-3 pt-2">
                            <a href="customers.php" class="float-right font-weight-bold">View List</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Daily Transactions</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">0</div>
                        </div>
                        <div class="col-auto">
                            <div class="p-3 bg-gray-100 rounded-circle">
                                <i class="fas fa-print fa-lg text-info"></i>
                            </div>
                        </div>
                        <div class="col-12 border-top mt-3 pt-2">
                            <a href="transactions.php" class="float-right font-weight-bold">View All</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-warning shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Total Payables</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="total-payables">0</div>
                        </div>
                        <div class="col-auto">
                            <div class="p-3 bg-gray-100 rounded-circle">
                                <i class="fas fa-money-bill-wave fa-lg text-warning"></i>
                            </div>
                        </div>
                        <div class="col-12 border-top mt-3 pt-2">
                            <a href="payables.php" class="float-right font-weight-bold">Details</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-8 mb-4">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary"><i class="fas fa-box-open mr-2"></i>Inventory Status</h6>
                    <span class="badge badge-pill badge-light text-primary">Live Updates</span>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover text-center" id="dash-inventory-table" width="100%">
                            <thead>
                                <tr>
                                    <th>Store</th>
                                    <th>Product</th>
                                    <th>Unit</th>
                                    <th>Quantity</th>
                                    <th>Used</th>
                                    <th>Remaining</th>
                                    <th>Restock</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary"><i class="fas fa-chart-line mr-2"></i>Earnings Overview</h6>
                    <div class="input-group col-4 col-md-3">
                        <select class="form-control form-control-sm" id="area-chart-date-dropdown">
                            <?php
                                $year = date("Y");
                                for ($i = $year; $i >= 2020; $i--) { 
                                    echo "<option value='$i'>".$i."</option>";
                                }
                            ?>
                        </select>
                    </div>
                </div>
                <div class="card-body">
                    <div class="chart-area" style="height: 320px;">
                        <canvas id="myAreaChart"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4 mb-4">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">System News</h6>
                </div>
                <div class="card-body text-center">
                    <img class="img-fluid px-3 px-sm-4 mb-4" style="width: 12rem;" src="img/undraw_posting_photo.svg" alt="Illustration">
                    <h5 class="text-gray-800 font-weight-bold">v1.0 Release</h5>
                    <p class="small text-muted">This is an initial release. Please report any bugs to the administrator.</p>
                    <button class="btn btn-sm btn-outline-primary btn-block rounded-pill">Read Documentation</button>
                </div>
            </div>
        </div>
    </div>

</div>

<?php include_once 'common/dashboard_footer.php';?>