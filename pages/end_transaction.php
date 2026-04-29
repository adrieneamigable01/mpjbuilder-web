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

    .filter-label {
        font-weight: 700;
        font-size: 0.65rem;
        color: #b7b9cc;
        text-transform: uppercase;
        margin-right: 10px;
        white-space: nowrap;
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
    .table {
        border: none;
        border-collapse: separate;
        border-spacing: 0 5px;
    }

    .table thead th {
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

    .table tbody td {
        vertical-align: middle;
        color: #5a5c69;
        background: #fff;
        border-bottom: 1px solid #f8f9fc;
        padding: 15px;
    }

    /* Modal Styling */
    .modal-content {
        border-radius: 16px;
        border: none;
        box-shadow: 0 15px 50px rgba(0,0,0,0.15);
    }

    .modal-header {
        background: #fdfdfe;
        border-bottom: 1px solid #f1f2f9;
        padding: 20px 25px;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
    }

    .modal-title {
        font-weight: 800;
        color: #3a3b45;
        letter-spacing: -0.5px;
    }

    /* Form Elements */
    .form-control {
        border-radius: 8px !important;
        border: 1px solid #d1d3e2 !important;
        height: auto !important;
        padding: 5px 10px !important;
        font-size: 0.85rem;
    }
</style>

<div class="container-fluid">

    <div class="page-title-block d-md-flex align-items-center justify-content-between mt-4">
        <div>
            <h1 class="h3 mb-1 text-gray-800" style="font-weight: 800;">End of Day Transactions</h1>
            <p class="text-muted small mb-0">Summarized daily closings, cash returns, and total transaction volumes per user.</p>
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
                    <table class="table text-center table-sm" id="end-transaction-table" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th width="10%">ID #</th>
                                <th width="20%">User</th>
                                <th width="20%">Store</th>
                                <th width="10%">Date</th>
                                <th width="15%">Cash Return</th>
                                <th width="15%">Total Transaction</th>
                                <th width="10%">Action</th>
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

<div class="modal fade" id="transaction-history" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"><i class="fas fa-history text-primary mr-2"></i> Transaction Details History</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body p-4">
                <div class="table-responsive">
                    <table class="table table-sm nowrap text-center" id="transaction-history-table" width="100%">
                        <thead>
                            <tr>
                                <th>Order #</th>
                                <th>Date</th>
                                <th>Item</th>
                                <th>Disc %</th>
                                <th>Disc Amt</th>
                                <th>Disc Items</th>
                                <th>Cash</th>
                                <th>Disc Price</th>
                                <th>Price</th>
                                <th>Note</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            </tbody>
                        <tfoot class="bg-light">
                            <tr>
                                <th colspan="11" style="height: 40px;"></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light font-weight-bold" data-dismiss="modal">Close Report</button>
            </div>
        </div>
    </div>
</div>

<?php
    $extra_scripts = array('../assets/js/end_transaction.js');
?>
<?php include_once 'common/dashboard_footer.php';?>