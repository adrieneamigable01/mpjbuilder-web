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

    /* Main Container Styles */
    .inventory-wrapper {
        background: #fff;
        border-radius: var(--border-radius);
        padding: 30px;
        box-shadow: var(--card-shadow);
        border: 1px solid rgba(0,0,0,0.02);
        margin-bottom: 30px;
    }

    /* Table Design */
    #mixproducts-table {
        border: none;
        border-collapse: separate;
        border-spacing: 0 5px;
    }

    #mixproducts-table thead th {
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

    #mixproducts-table tbody td {
        vertical-align: middle;
        color: #5a5c69;
        background: #fff;
        border-bottom: 1px solid #f8f9fc;
        padding: 18px 15px;
    }

    /* Modal & Form Styling */
    .modal-content { border-radius: 16px; border: none; box-shadow: 0 15px 50px rgba(0,0,0,0.15); }
    .modal-header { border-bottom: 1px solid #f1f2f9; padding: 25px; }
    
    .section-divider {
        position: relative;
        margin: 30px 0 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #f1f2f9;
        color: #4e73df;
        font-weight: 800;
        text-transform: uppercase;
        font-size: 0.85rem;
        letter-spacing: 1px;
    }

    .form-control, .store-type-menu-filter, .product-type-menu, .product-to-convert {
        border-radius: 10px !important;
        border: 1px solid #d1d3e2 !important;
        padding: 10px 15px !important;
        height: auto !important;
        font-size: 0.9rem;
    }

    .form-group label {
        font-weight: 700;
        font-size: 0.72rem;
        color: #858796;
        text-transform: uppercase;
        margin-bottom: 8px;
    }

    /* Buttons */
    .btn-primary {
        background: var(--accent-gradient);
        border: none;
        border-radius: 10px !important;
        padding: 12px 25px !important;
        font-weight: 700;
        box-shadow: 0 4px 15px rgba(78, 115, 223, 0.2);
    }

    .btn-add-custom { border-radius: 50px !important; font-size: 0.85rem; }

    #preview { display: none; width: 50%; border-radius: 8px; margin-top: 10px; }
</style>

<div class="container-fluid">

    <div class="page-title-block d-md-flex align-items-center justify-content-between mt-4">
        <div>
            <h1 class="h3 mb-1 text-gray-800" style="font-weight: 800;">Mix Product Management</h1>
            <p class="text-muted small mb-0">Combine multiple materials to create new stock items and tracked products.</p>
        </div>
        
        <div class="d-flex align-items-center mt-3 mt-md-0">
            <div class="filter-card mr-3">
                <span class="mr-3 text-xs font-weight-bold text-uppercase text-gray-600">Store</span>
                <select class="form-control store-type-menu-filter border-0 bg-light py-0" id="storeFilter" style="min-width: 150px; height: 30px !important;"></select>
            </div>
            <button class="btn btn-primary btn-add-custom shadow-sm" data-toggle="modal" data-target="#mixMaterialModal" id="add-mixproducts"> 
                <i class="fas fa-blender mr-2"></i> Mix Material
            </button>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="inventory-wrapper">
                <div class="table-responsive">
                    <table class="table text-center" id="mixproducts-table" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Mix Product #</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Selling Price</th>
                                <th>Mix Components</th>
                                <th>Unit to Convert</th>
                                <th>Date Created</th>
                                <th>Description</th>
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

<div class="modal fade" id="mixMaterialModal" tabindex="-1" role="dialog" aria-labelledby="mixModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header d-flex align-items-center">
          <h5 class="modal-title" id="mixModalLabel"><i class="fas fa-vial text-primary mr-2"></i>Product Mixing Configuration</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body p-4">
            <form class="user" id="frm-mixproduct">
                <div class="section-divider d-flex justify-content-between align-items-center">
                    <span>1. Component Mix List</span>
                    <button type="button" class="btn btn-success btn-sm" id="add-mixproduct" style="border-radius: 5px;">
                        <i class="fas fa-plus-circle mr-1"></i> Add Component
                    </button>
                </div>
                
                <div id="mixproduct_container" class="mb-4">
                    </div>

                <div class="section-divider">2. Conversion Result</div>
                
                <div class="row">
                    <div class="form-group col-md-6">
                        <label for="productTypeId">Result Product Type</label>
                        <select class="form-control product-type-menu" id="productTypeId" name="productTypeId">
                            <option value="">Select Category</option>
                        </select>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="product-to-convert">Target Product</label>
                        <select class="form-control product-to-convert" id="product-to-convert" name="product-to-convert">
                            <option value="">Select Resulting Product</option>
                        </select>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="form-group col-md-4">
                        <label for="unit">Output Unit</label>
                        <select class="form-control" id="unit" name="unit"></select>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="quantity">Resulting Qty</label>
                        <input type="number" class="form-control" id="quantity" name="quantity" placeholder="0" required>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="sellingPrice">Final Selling Price</label>
                        <input type="number" class="form-control" id="sellingPrice" name="sellingPrice" placeholder="0.00" step="0.01" required>
                    </div>
                </div>

                <div class="form-group mt-2">
                    <label for="details">Production Notes</label>
                    <textarea class="form-control" id="details" name="details" rows="3" placeholder="Enter mixing instructions or details..."></textarea>
                </div>

                <div class="mt-4 overflow-hidden">
                    <button type="submit" class="btn btn-primary btn-user px-5 float-right">
                        Finalize & Process Mix
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
</div>

<?php
    $extra_scripts = array('../assets/js/mixproducts.js');
?>
<?php include_once 'common/dashboard_footer.php';?>