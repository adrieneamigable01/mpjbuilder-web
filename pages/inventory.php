<?php include_once 'common/dashboard_header.php';?>

<style>
    :root {
        --primary-color: #4e73df;
        --secondary-bg: #f8f9fc;
        --card-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.1);
        --border-radius: 12px;
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
    #inventory-table {
        border: none;
        border-collapse: separate;
        border-spacing: 0 5px;
    }

    #inventory-table thead th {
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

    #inventory-table tbody td {
        vertical-align: middle;
        color: #5a5c69;
        background: #fff;
        border-bottom: 1px solid #f8f9fc;
        padding: 18px 15px;
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
    }

    .form-control:focus {
        border-color: var(--primary-color) !important;
        box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.1);
    }

    /* Badge Placeholder for status */
    .status-badge {
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
    }
</style>

<div class="container-fluid">

    <div class="page-title-block d-md-flex align-items-center justify-content-between mt-4">
        <div>
            <h1 class="h3 mb-1 text-gray-800" style="font-weight: 800;">Real-Time Inventory</h1>
            <p class="text-muted small mb-0">Monitor stock levels, remaining quantities, and replenishment status across all stores.</p>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="inventory-wrapper">
                <div class="table-responsive">
                    <table class="table text-center table-sm nowrap" id="inventory-table" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Store</th>
                                <th>Product</th>
                                <th>Unit</th>
                                <th>Quantity</th>
                                <th>Used</th>
                                <th>Remaining</th>
                                <th>Restock Lvl</th>
                                <th>Status</th>
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

<div class="modal fade" id="addProduct" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"><i class="fas fa-boxes text-primary mr-2"></i> Stock Entry</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body p-4">
            <form id="frm-add-product">
                <div class="row mb-3">
                    <div class="form-group col-md-4">
                        <label>Store Location</label>
                        <select class="form-control store-type-menu" id="store" name="store"></select>
                    </div>
                    <div class="form-group col-md-4">
                        <label>Product Name</label>
                        <select class="form-control product-type-menu" id="product" name="product"></select>
                    </div>
                    <div class="form-group col-md-4">
                        <label>Supplier</label>
                        <select class="form-control supplier-type-menu" id="supllier" name="supllier"></select>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="form-group col-md-4">
                        <label>Price</label>
                        <input type="number" class="form-control" id="price" name="price" placeholder="0.00">
                    </div>
                    <div class="form-group col-md-4">
                        <label>Discount</label>
                        <input type="number" class="form-control" id="discount" name="discount" placeholder="0.00">
                    </div>
                    <div class="form-group col-md-4">
                        <label>Initial Quantity</label>
                        <input type="number" class="form-control" id="quantity" name="quantity" placeholder="0">
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="form-group col-md-4">
                        <label>Unit Label</label>
                        <input type="text" class="form-control" id="label" name="label" placeholder="e.g. Sacks, Pcs">
                    </div>
                    <div class="form-group col-md-4">
                        <label>Barcode / SKU</label>
                        <input type="text" class="form-control" id="barCode" name="barCode" placeholder="Enter SKU">
                    </div>
                    <div class="form-group col-md-4">
                        <label>Expiration Date</label>
                        <input type="date" class="form-control" id="expirationDate" name="expirationDate">
                    </div>
                </div>

                <div class="form-group">
                    <label>Additional Remarks</label>
                    <textarea class="form-control" id="description" name="description" rows="3" placeholder="Notes regarding this batch..."></textarea>
                </div>

                <div class="mt-4 pt-3 border-top text-right">
                    <button type="button" class="btn btn-light px-4 mr-2" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary px-5 shadow-sm font-weight-bold">Register Stock</button>
                </div>
            </form>
        </div>
      </div>
    </div>
</div>

<div class="modal fade" id="updateProduct" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h5 class="modal-title text-gray-800"><i class="fas fa-edit text-warning mr-2"></i> Update Stock Record</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body p-4">
            <form id="frm-update-product">
                <div class="row mb-3">
                    <div class="form-group col-md-4">
                        <label>Store</label>
                        <select class="form-control store-type-menu" id="store" name="store"></select>
                    </div>
                    <div class="form-group col-md-4">
                        <label>Product</label>
                        <select class="form-control product-type-menu" id="product" name="product"></select>
                    </div>
                    <div class="form-group col-md-4">
                        <label>Supplier</label>
                        <select class="form-control supplier-type-menu" id="supllier" name="supllier"></select>
                    </div>
                </div>
                <div class="mt-4 pt-3 border-top text-right">
                    <button type="button" class="btn btn-light px-4 mr-2" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-warning px-5 shadow-sm font-weight-bold text-white">Save Changes</button>
                </div>
            </form>
        </div>
      </div>
    </div>
</div>

<?php
    $extra_scripts = array('../assets/js/inventory.js');
?>
<?php include_once 'common/dashboard_footer.php';?>