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
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        display: flex;
        align-items: center;
        border: 1px solid #eaecf4;
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

    /* Table Customization */
    #stocks-table {
        border: none;
        border-collapse: separate;
        border-spacing: 0 5px;
    }

    #stocks-table thead th {
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

    #stocks-table tbody td {
        vertical-align: middle;
        color: #5a5c69;
        background: #fff;
        border-bottom: 1px solid #f8f9fc;
        padding: 18px 15px;
        transition: all 0.2s;
    }

    #stocks-table tbody tr:hover td {
        background-color: #fcfdfe;
        color: #4e73df;
    }

    /* Form & Modal Design */
    .modal-content {
        border-radius: 16px;
        border: none;
        box-shadow: 0 15px 50px rgba(0,0,0,0.15);
    }

    .modal-header {
        border-bottom: 1px solid #f1f2f9;
        padding: 25px;
        background: #fdfdfe;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
    }

    .modal-title {
        font-weight: 800;
        color: #3a3b45;
        letter-spacing: -0.5px;
    }

    /* Inputs & Selects */
    .form-control, .form-control-user, .store-type-menu, .product-type-menu, .product-menu, .supplier-type-menu {
        border-radius: 10px !important;
        border: 1px solid #d1d3e2 !important;
        padding: 12px 15px !important;
        height: auto !important;
        transition: all 0.2s ease;
        font-size: 0.9rem;
        background: #fdfdfe;
    }

    .form-control:focus {
        border-color: var(--primary-color) !important;
        box-shadow: 0 0 0 0.25rem rgba(78, 115, 223, 0.1) !important;
        background: #fff;
    }

    .form-group label {
        font-weight: 700;
        font-size: 0.72rem;
        color: #858796;
        text-transform: uppercase;
        margin-bottom: 8px;
        display: block;
        letter-spacing: 0.5px;
    }

    /* Buttons */
    .btn-primary {
        background: var(--accent-gradient);
        border: none;
        border-radius: 10px !important;
        padding: 12px 25px !important;
        font-weight: 700;
        box-shadow: 0 4px 15px rgba(78, 115, 223, 0.25);
        transition: all 0.3s;
    }

    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(78, 115, 223, 0.35);
        filter: brightness(1.1);
    }

    .btn-add-custom {
        border-radius: 50px !important;
        font-size: 0.85rem;
    }

    #preview {
        display: none;
        width: 50%;
        height: auto;
        margin-top: 10px;
        border-radius: 8px;
        box-shadow: var(--card-shadow);
    }
</style>

<div class="container-fluid">

    <div class="page-title-block d-md-flex align-items-center justify-content-between mt-4">
        <div>
            <h1 class="h3 mb-1 text-gray-800" style="font-weight: 800;">Materials</h1>
            <p class="text-muted small mb-0">Manage inventory stocks, pricing, and supplier allocations.</p>
        </div>
        
        <div class="d-flex align-items-center mt-3 mt-md-0">
            <div class="filter-card mr-3">
                <span class="mr-3 text-xs font-weight-bold text-uppercase text-gray-600">Store Filter</span>
                <select class="form-control store-type-menu-filter border-0 bg-light py-0" id="storeFilter" style="min-width: 180px; height: 35px !important;"></select>
            </div>
            <button class="btn btn-primary btn-add-custom shadow-sm" data-toggle="modal" data-target="#materialModal" id="add-stocks"> 
                <i class="fas fa-cubes mr-2"></i> New Material
            </button>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="inventory-wrapper">
                <div class="table-responsive">
                    <table class="table text-center" id="stocks-table" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Material #</th>
                                <th>Store</th>
                                <th>Product</th>
                                <th>Purchase Price</th>
                                <th>Selling Price</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                                <th>Supplier</th>
                                <th>Date Created</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="materialModal" tabindex="-1" role="dialog" aria-labelledby="materialModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header d-flex align-items-center">
          <h5 class="modal-title" id="materialModalLabel"><i class="fas fa-boxes text-primary mr-2"></i>Material Inventory Form</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body p-4">
            <form class="user" id="frm-material">
                <div class="row">
                    <div class="form-group col-md-4">
                        <label for="store">Target Store</label>
                        <select class="form-control store-type-menu" id="store" name="store"></select>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="productTypeId">Product Category</label>
                        <select class="form-control product-type-menu" id="productTypeId" name="productTypeId"></select>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="productid">Specific Product</label>
                        <select class="form-control product-menu" id="productid" name="productid"></select>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="form-group col-md-4">
                        <label for="supplier">Supplier</label>
                        <select class="form-control supplier-type-menu" id="supplier" name="supplier"></select>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="unitid">Unit of Measure</label>
                        <select class="form-control" id="unitid" name="unitid"></select>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="quantity">Initial Quantity</label>
                        <input type="number" class="form-control" id="quantity" name="quantity" placeholder="0">
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="form-group col-md-4">
                        <label for="purchase_price">Cost Price</label>
                        <input type="number" class="form-control" id="purchase_price" name="purchase_price" placeholder="0.00">
                    </div>
                    <div class="form-group col-md-4">
                        <label for="selling_price">Retail Price</label>
                        <input type="number" class="form-control" id="selling_price" name="selling_price" placeholder="0.00">
                    </div>
                    <div class="form-group col-md-4">
                        <label for="size">Size (<span class="selected-unit"></span>)</label>
                        <input type="number" class="form-control" id="size" name="size" placeholder="Enter size">
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="form-group col-12">
                        <label for="description">Additional Details</label>
                        <textarea class="form-control" id="description" name="description" placeholder="Write any relevant notes here..." rows="3"></textarea>
                    </div>
                </div>

                <div class="mt-4 overflow-hidden">
                    <button type="submit" class="btn btn-primary btn-user px-5 float-right">
                        Register Material
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
</div>

<?php
    $extra_scripts = array('../assets/js/material.js');
?>
<?php include_once 'common/dashboard_footer.php';?>