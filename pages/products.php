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
    #product-table {
        border: none;
        border-collapse: separate;
        border-spacing: 0 5px;
    }

    #product-table thead th {
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

    #product-table tbody td {
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

    #preview {
        display: none;
        width: 150px;
        height: 150px;
        object-fit: cover;
        margin-top: 15px;
        border-radius: 12px;
        border: 3px solid #fff;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .image-upload-wrapper {
        background: #f8f9fc;
        padding: 20px;
        border-radius: 12px;
        border: 2px dashed #d1d3e2;
        text-align: center;
        margin-top: 15px;
    }
</style>

<div class="container-fluid">

    <div class="page-title-block d-md-flex align-items-center justify-content-between mt-4">
        <div>
            <h1 class="h3 mb-1 text-gray-800" style="font-weight: 800;">Product Catalog</h1>
            <p class="text-muted small mb-0">Manage master product list, restock thresholds, and specifications.</p>
        </div>
        
        <button class="btn btn-primary shadow-sm px-4" style="border-radius: 8px; font-weight: 700;" id="add-product"> 
            <i class="fa fa-plus-circle mr-2"></i> Add Product
        </button>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="inventory-wrapper">
                <div class="table-responsive">
                    <table class="table text-center table-sm nowrap" id="product-table" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Code</th>
                                <th>Type</th>
                                <th>LxWxT</th>
                                <th>Restock Lvl</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"><i class="fas fa-tag text-primary mr-2"></i> Product Details</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body p-4">
            <form id="frm-add-product">
                <div class="row">
                    <div class="form-group col-md-6">
                        <label>Product Name</label>
                        <input type="text" class="form-control" id="product_name" name="product_name" placeholder="e.g. Deluxe Plywood">
                    </div>
                    <div class="form-group col-md-6">
                        <label>Product Code</label>
                        <input type="text" class="form-control" id="productCode" name="productCode" placeholder="SKU-001">
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-md-6">
                        <label>Product Type</label>
                        <select class="form-control product-type-menu" id="productTypeId" name="productTypeId"></select>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Restock Level (Critical Threshold)</label>
                        <input type="text" class="form-control" id="restock_quantity" name="restock_quantity" placeholder="10">
                    </div>
                </div>

                <div class="row bg-light p-3 rounded mb-3 mx-0">
                    <div class="col-12 px-0"><h6 class="font-weight-bold small text-muted mb-3">DIMENSIONS (CM)</h6></div>
                    <div class="form-group col-md-4">
                        <label>Length</label>
                        <input type="number" class="form-control" id="length" name="length" placeholder="0">
                    </div>
                    <div class="form-group col-md-4">
                        <label>Width</label>
                        <input type="number" class="form-control" id="width" name="width" placeholder="0">
                    </div>
                    <div class="form-group col-md-4">
                        <label>Thickness</label>
                        <input type="number" class="form-control" id="thickness" name="thickness" placeholder="0">
                    </div>
                </div>

                <!-- <div class="form-group">
                    <label>Mix Components (Composite Product)</label>
                    <select class="form-control" id="productid" name="productid" multiple="multiple" style="height: auto; min-height: 45px;"></select>
                </div> -->

                <div class="image-upload-wrapper">
                    <label class="d-block mb-2">Product Image</label>
                    <input type="file" class="form-control-file d-inline-block" id="product-image" name="product-image">
                    <div class="text-center">
                        <img id="preview" alt="Image preview">
                    </div>
                </div>

                <div class="mt-4 pt-3 border-top text-right">
                    <button type="button" class="btn btn-light px-4 mr-2" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary px-5 shadow-sm font-weight-bold">Save Product</button>
                </div>
            </form>
        </div>
      </div>
    </div>
</div>

<?php
    $extra_scripts = array('../assets/js/product.js');
?>
<?php include_once 'common/dashboard_footer.php';?>