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
    #suppliers-table {
        border: none;
        border-collapse: separate;
        border-spacing: 0 5px;
    }

    #suppliers-table thead th {
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

    #suppliers-table tbody td {
        vertical-align: middle;
        color: #5a5c69;
        background: #fff;
        border-bottom: 1px solid #f8f9fc;
        padding: 18px 15px;
        transition: all 0.2s;
    }

    #suppliers-table tbody tr:hover td {
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

    /* Inputs */
    .form-control, .form-control-user {
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

    /* Table Action Buttons */
    .btn-table-action {
        border-radius: 8px;
        width: 35px;
        height: 35px;
        padding: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: 0.2s;
    }

    #preview, #update-preview {
        display: none;
        width: 100px;
        height: auto;
        margin-top: 10px;
        border-radius: 8px;
        box-shadow: var(--card-shadow);
    }
</style>

<div class="container-fluid">

    <div class="page-title-block d-flex align-items-center justify-content-between mt-4">
        <div>
            <h1 class="h3 mb-1 text-gray-800" style="font-weight: 800;">Suppliers</h1>
            <p class="text-muted small mb-0">Directory of active business providers and vendors.</p>
        </div>
        <button class="btn btn-primary btn-add-custom shadow-sm" data-toggle="modal" data-target="#addSuppliers"> 
            <i class="fas fa-plus-circle mr-2"></i> Add New Supplier
        </button>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="inventory-wrapper">
                <div class="table-responsive">
                    <table class="table text-center" id="suppliers-table" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Company Name</th>
                                <th>Address</th>
                                <th>Contact Info</th>
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

<div class="modal fade" id="addSuppliers" tabindex="-1" role="dialog" aria-labelledby="addLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header d-flex align-items-center">
          <h5 class="modal-title" id="addLabel"><i class="fas fa-building text-primary mr-2"></i>New Supplier Profile</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body p-4">
            <form class="user" id="frm-add-suppliers">
                <div class="form-group">
                    <label>Company Name</label>
                    <input type="text" class="form-control form-control-user" id="companyName" name="companyName" placeholder="e.g. Acme Corp">
                </div>
                <div class="form-group">
                    <label>Address</label>
                    <input type="text" class="form-control form-control-user" id="companyAddress" name="companyAddress" placeholder="Full business address">
                </div>
                <div class="form-group">
                    <label>Contact Info</label>
                    <input type="text" class="form-control form-control-user" id="companyContact" name="companyContact" placeholder="Email or Phone">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-control" id="description" name="description" placeholder="Add relevant notes about this supplier..." cols="30" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-primary btn-block mt-4 py-3">
                    Confirm & Save Supplier
                </button>
            </form>
        </div>
      </div>
    </div>
</div>

<div class="modal fade" id="updateSuppliers" tabindex="-1" role="dialog" aria-labelledby="updateLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header d-flex align-items-center">
          <h5 class="modal-title" id="updateLabel"><i class="fas fa-edit text-primary mr-2"></i>Edit Supplier Info</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body p-4">
            <form class="user" id="frm-update-suppliers">
                <div class="form-group">
                    <label>Company Name</label>
                    <input type="text" class="form-control form-control-user" id="companyName" name="companyName">
                </div>
                <div class="form-group">
                    <label>Address</label>
                    <input type="text" class="form-control form-control-user" id="companyAddress" name="companyAddress">
                </div>
                <div class="form-group">
                    <label>Contact Info</label>
                    <input type="text" class="form-control form-control-user" id="companyContact" name="companyContact">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-control" id="description" name="description" cols="30" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-primary btn-block mt-4 py-3">
                    Apply Changes
                </button>
            </form>
        </div>
      </div>
    </div>
</div>

<?php
    // External JS logic is called here
    $extra_scripts = array('../assets/js/suppliers.js');
?>
<?php include_once 'common/dashboard_footer.php';?>