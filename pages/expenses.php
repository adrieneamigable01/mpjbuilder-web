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

    /* Header & Action Area */
    .page-title-block {
        background: transparent;
        margin-bottom: 2rem;
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

    /* Table Customization - Modern List View */
    #expenses-table {
        border: none;
        border-collapse: separate;
        border-spacing: 0 5px;
    }

    #expenses-table thead th {
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

    #expenses-table tbody td {
        vertical-align: middle;
        color: #5a5c69;
        background: #fff;
        border-bottom: 1px solid #f8f9fc;
        padding: 18px 15px;
        transition: all 0.2s;
    }

    #expenses-table tbody tr:hover td {
        background-color: #fcfdfe;
        color: #4e73df;
    }

    /* Preview styles maintained for functionality */
    #preview, #update-preview {
        display: none;
        width: 50%;
        height: auto;
        margin-top: 10px;
        border-radius: 8px;
        box-shadow: var(--card-shadow);
    }

    /* Custom scrollbar for responsiveness */
    .table-responsive::-webkit-scrollbar {
        height: 6px;
    }
    .table-responsive::-webkit-scrollbar-thumb {
        background: #e3e6f0;
        border-radius: 10px;
    }
</style>

<div class="container-fluid">

    <div class="page-title-block d-flex align-items-center justify-content-between mt-4">
        <div>
            <h1 class="h3 mb-1 text-gray-800" style="font-weight: 800;">Expenses</h1>
            <p class="text-muted small mb-0">Track and manage company expenditures and official receipts.</p>
        </div>
        </div>

    <div class="row">
        <div class="col-12">
            <div class="inventory-wrapper">
                <div class="table-responsive">
                    <table class="table text-center" id="expenses-table" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>OR #</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Store</th>
                                <th>Added By</th>
                                <th>Description</th>
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
    $extra_scripts = array('../assets/js/expenses.js');
?>
<?php include_once 'common/dashboard_footer.php';?>