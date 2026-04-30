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

    .filter-group-card {
        background: #fff;
        padding: 8px 15px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        display: flex;
        align-items: center;
        border: 1px solid #eaecf4;
        margin-left: 10px;
    }

    /* Main Container Styles */
    .inventory-wrapper {
        background: #fff;
        border-radius: var(--border-radius);
        padding: 30px;
        box-shadow: var(--card-shadow);
        border: 1px solid rgba(0,0,0,0.02);
        margin-bottom: 30px;
    }

    /* Modern Table Design */
    #transaction-table {
        border: none;
        border-collapse: separate;
        border-spacing: 0 5px;
    }

    #transaction-table thead th {
        background: #fff;
        color: #b7b9cc;
        text-transform: uppercase;
        font-size: 0.65rem;
        font-weight: 800;
        letter-spacing: 0.05em;
        padding: 15px 10px;
        border: none;
        border-bottom: 2px solid #f1f2f9;
        vertical-align: middle;
    }

    #transaction-table tbody td {
        vertical-align: middle;
        color: #5a5c69;
        background: #fff;
        border-bottom: 1px solid #f8f9fc;
        padding: 12px 10px;
        font-size: 0.85rem;
    }

    #transaction-table tfoot th {
        background: #f8f9fc;
        border: none;
        padding: 15px;
        color: #4e73df;
        font-weight: 800;
    }

    /* Form Elements */
    .form-control {
        border-radius: 8px !important;
        border: 1px solid #d1d3e2 !important;
        height: auto !important;
        padding: 5px 10px !important;
        font-size: 0.85rem;
    }

    .filter-label {
        font-weight: 700;
        font-size: 0.65rem;
        color: #b7b9cc;
        text-transform: uppercase;
        margin-right: 10px;
        white-space: nowrap;
    }

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
            <h1 class="h3 mb-1 text-gray-800" style="font-weight: 800;">Transaction Ledger</h1>
            <p class="text-muted small mb-0">Review detailed historical logs of sales, returns, and inventory adjustments.</p>
        </div>
        
        <div class="d-flex align-items-center mt-3 mt-md-0">
            <div class="filter-group-card">
                <span class="filter-label">User</span>
                <select class="form-control user-menu border-0 bg-light py-0" id="user" name="user" style="min-width: 140px;"></select>
            </div>

            <div class="filter-group-card">
                <span class="filter-label">Date</span>
                <input type="date" name="transaction-date" class="form-control border-0 bg-light py-0" value="<?php echo date("Y-m-d")?>">
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="inventory-wrapper">
                <div class="table-responsive">
                    <table class="table text-center table-sm" id="transaction-table" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Order #</th>
                                <th>Type</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Item Details</th>
                                <th>Disc %</th>
                                <th>Disc Amt</th>
                                <th>Disc Items</th>
                                <th>Total Amount</th>
                                <th>Note</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="8" style="text-align:right">Total Summary:</th>
                                <th id="total-amount-sum" style="text-align:center">0.00</th>
                                <th colspan="2"></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<?php
    $extra_scripts = array('../assets/js/transaction.js');
?>
<?php include_once 'common/dashboard_footer.php';?>