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
    #product-type-table {
        border: none;
        border-collapse: separate;
        border-spacing: 0 5px;
    }

    #product-type-table thead th {
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

    #product-type-table tbody td {
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
        transition: all 0.2s ease;
    }

    .form-control:focus {
        border-color: var(--primary-color) !important;
        box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.1);
    }
</style>

<div class="container-fluid">

    <div class="page-title-block d-md-flex align-items-center justify-content-between mt-4">
        <div>
            <h1 class="h3 mb-1 text-gray-800" style="font-weight: 800;">Product Categories</h1>
            <p class="text-muted small mb-0">Classify your inventory items into logical types for better reporting and filtering.</p>
        </div>
        
        <button class="btn btn-primary shadow-sm px-4" style="border-radius: 8px; font-weight: 700;" data-toggle="modal" id="add-product"> 
            <i class="fa fa-plus-circle mr-2"></i> New Product Type
        </button>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="inventory-wrapper">
                <div class="table-responsive">
                    <table class="table text-center table-sm nowrap" id="product-type-table" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th width="5%">#</th>
                                <th width="25%">Product Type</th>
                                <th width="15%">Date Created</th>
                                <th width="15%">Last Updated</th>
                                <th width="30%">Description</th>
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

<div class="modal fade" id="productTypeModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"><i class="fas fa-layer-group text-primary mr-2"></i> Category Details</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body p-4">
            <form id="frm-producttype">
                <div class="form-group mb-4">
                    <label for="productType">Type Name</label>
                    <input type="text" class="form-control" id="productType" name="productType" placeholder="e.g., Construction Materials, Hardware">
                </div>
                
                <div class="form-group mb-4">
                    <label for="description">Internal Description</label>
                    <textarea class="form-control" id="description" name="description" placeholder="Briefly describe what this category includes..." rows="4"></textarea>
                </div>

                <div class="mt-4 pt-3 border-top text-right">
                    <button type="button" class="btn btn-light px-4 mr-2" data-dismiss="modal" style="border-radius: 8px; font-weight: 600;">Cancel</button>
                    <button type="submit" class="btn btn-primary px-5 shadow-sm font-weight-bold" style="border-radius: 8px;">Save Category</button>
                </div>
            </form>
        </div>
      </div>
    </div>
</div>

<?php
    $extra_scripts = array('../assets/js/producttype.js');
?>
<?php include_once 'common/dashboard_footer.php';?>