<?php include_once 'common/dashboard_header.php';?>

<style>
    :root {
        --primary-color: #4e73df;
        --secondary-bg: #f8f9fc;
        --card-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.1);
        --border-radius: 12px;
        --accent-gradient: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
    }

    body { background-color: var(--secondary-bg); font-family: 'Inter', system-ui, -apple-system, sans-serif; }

    /* Header & Filter Area */
    .page-title-block {
        background: transparent;
        margin-bottom: 2rem;
    }

    .filter-card {
        background: #fff;
        padding: 10px 20px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        display: flex;
        align-items: center;
        border: 1px solid #eaecf4;
    }

    /* Table Container Styling */
    .inventory-wrapper {
        background: #fff;
        border-radius: var(--border-radius);
        padding: 30px;
        box-shadow: var(--card-shadow);
        border: 1px solid rgba(0,0,0,0.02);
        margin-bottom: 30px;
    }

    /* Modern Table Design */
    #payables-table {
        border: none;
        border-collapse: separate;
        border-spacing: 0 5px;
    }

    #payables-table thead th {
        background: #fff;
        color: #b7b9cc;
        text-transform: uppercase;
        font-size: 0.7rem;
        font-weight: 800;
        letter-spacing: 0.1em;
        padding: 15px;
        border: none;
        border-bottom: 2px solid #f1f2f9;
    }

    #payables-table tbody td {
        vertical-align: middle;
        color: #5a5c69;
        background: #fff;
        border-bottom: 1px solid #f8f9fc;
        padding: 18px 15px;
        transition: all 0.2s;
    }

    #payables-table tbody tr:hover td {
        background-color: #fcfdfe;
        color: #4e73df;
    }

    /* Form Controls */
    .form-control {
        border-radius: 10px !important;
        border: 1px solid #d1d3e2 !important;
        font-size: 0.9rem;
    }

    /* Previews */
    #preview, #update-preview {
        display: none;
        width: 50%;
        height: auto;
        margin-top: 10px;
        border-radius: 8px;
    }
</style>

<div class="container-fluid">

    <div class="page-title-block d-md-flex align-items-center justify-content-between mt-4">
        <div>
            <h1 class="h3 mb-1 text-gray-800" style="font-weight: 800;">Payables</h1>
            <p class="text-muted small mb-0">Monitor accounts receivable, track outstanding balances, and manage payment deadlines.</p>
        </div>
        
        <div class="d-flex align-items-center mt-3 mt-md-0">
            <div class="filter-card">
                <span class="mr-3 text-xs font-weight-bold text-uppercase text-gray-600">Filter Status</span>
                <select class="form-control border-0 bg-light py-0" id="payableStatus" name="payableStatus" style="min-width: 150px; height: 35px !important;">
                     <option value="All">All Transactions</option>
                     <option value="Active">Active</option>
                     <option value="Completed">Completed</option>
                </select>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="inventory-wrapper">
                <div class="table-responsive">
                    <table class="table text-center" id="payables-table" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>OR #</th>
                                <th>Customer</th>
                                <th>Amount</th>
                                <th>Paid</th>
                                <th>Balance</th>
                                <th>Date Starts</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<?php
    $extra_scripts = array('../assets/js/payables.js');
?>
<?php include_once 'common/dashboard_footer.php';?>