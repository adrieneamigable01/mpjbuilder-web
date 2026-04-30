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

    /* Modern Table Design */
    #stocks-table {
        border: none;
        border-collapse: separate;
        border-spacing: 0 5px;
    }

    #stocks-table thead th {
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

    #stocks-table tbody td {
        vertical-align: middle;
        color: #5a5c69;
        background: #fff;
        border-bottom: 1px solid #f8f9fc;
        padding: 12px 10px;
        font-size: 0.85rem;
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

    /* Form Design */
    .form-group label {
        font-weight: 700;
        font-size: 0.75rem;
        color: #b7b9cc;
        text-transform: uppercase;
        margin-bottom: 8px;
    }

    .form-control {
        border-radius: 8px !important;
        border: 1px solid #d1d3e2 !important;
        padding: 10px 15px !important;
        font-size: 0.9rem;
        transition: all 0.2s;
    }

    .form-control:focus {
        border-color: var(--primary-color) !important;
        box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.1);
    }

    .conversion-section {
        background: #f8f9fc;
        border: 1px dashed #d1d3e2;
        border-radius: 10px;
        padding: 20px;
        margin: 15px 0;
    }

    #preview {
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
            <h1 class="h3 mb-1 text-gray-800" style="font-weight: 800;">Inventory Stocks</h1>
            <p class="text-muted small mb-0">Manage product quantities, pricing, and expiration tracking across all stores.</p>
        </div>
        
        <button class="btn btn-primary shadow-sm px-4" style="border-radius: 8px; font-weight: 700;" data-toggle="modal" id="add-stocks"> 
            <i class="fa fa-plus-circle mr-2"></i> Add New Stocks
        </button>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="inventory-wrapper">
                <div class="table-responsive">
                    <table class="table text-center" id="stocks-table" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Code</th>
                                <th>Purchase</th>
                                <th>Selling</th>
                                <th>Qty</th>
                                <th>Unit</th>
                                <th>Supplier</th>
                                <th>Manufactured</th>
                                <th>Expiry</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="stocksModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"><i class="fas fa-boxes text-primary mr-2"></i> Stock Intake Form</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body p-4">
            <form id="frm-stocks">
                <div class="row">
                    <div class="form-group col-md-4">
                        <label>Product Type</label>
                        <select class="form-control product-type-menu" id="productTypeId" name="productTypeId"></select>
                    </div>
                    <div class="form-group col-md-4">
                        <label>Product Name</label>
                        <select class="form-control product-menu" id="productid" name="productid"></select>
                    </div>
                    <div class="form-group col-md-4">
                        <label>Supplier</label>
                        <select class="form-control supplier-type-menu" id="supplier" name="supplier"></select>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-md-6">
                        <label>Base Unit</label>
                        <select class="form-control" id="unitid" name="unitid"></select>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Quantity</label>
                        <input type="number" class="form-control" id="quantity" name="quantity" placeholder="0">
                    </div>
                </div>
                
                <div class="row">

                    <div class="form-group col-md-6">
                        <label>Manufactured Date</label>
                        <input type="date" class="form-control" id="manufacturedDate" name="manufacturedDate">
                    </div>

                    <div class="form-group col-md-6">
                        <label>Expiration Date</label>
                        <input type="date" class="form-control" id="expirationDate" name="expirationDate">
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-md-6">
                        <label>Purchase Price (Cost)</label>
                        <input type="number" class="form-control" id="purchase_price" name="purchase_price" placeholder="0.00">
                        <small class="text-muted">Unit cost from supplier</small>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Selling Price (SRP)</label>
                        <input type="number" class="form-control" id="selling_price" name="selling_price" placeholder="0.00">
                        <small class="text-muted">Market price for customers</small>
                    </div>
                </div>

                <div class="conversion-section" style="display:none">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h6 class="m-0 font-weight-bold text-gray-800"><i class="fas fa-exchange-alt mr-2"></i>Unit Conversion</h6>
                        <button type="button" class="btn btn-outline-success btn-sm" id="add-convertion" style="border-radius: 20px;">
                            <i class="fas fa-plus mr-1"></i> Add Conversion
                        </button>
                    </div>
                    <div id="conversion_container">
                    </div>
                </div>

                <div class="form-group">
                    <label>Internal Notes / Description</label>
                    <textarea class="form-control" id="description" name="description" rows="3" placeholder="Add any specific details about this stock batch..."></textarea>
                </div>

                <div class="mt-4 pt-3 border-top text-right">
                    <button type="button" class="btn btn-light px-4 mr-2" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary px-5 shadow-sm font-weight-bold">Complete Entry</button>
                </div>
            </form>
        </div>
      </div>
    </div>
</div>

<?php
    $extra_scripts = array('../assets/js/stocks.js');
?>
<?php include_once 'common/dashboard_footer.php';?>