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
    #stores-table {
        border: none;
        border-collapse: separate;
        border-spacing: 0 5px;
    }

    #stores-table thead th {
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

    #stores-table tbody td {
        vertical-align: middle;
        color: #5a5c69;
        background: #fff;
        border-bottom: 1px solid #f8f9fc;
        padding: 18px 15px;
        transition: all 0.2s;
    }

    #stores-table tbody tr:hover td {
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

    .btn-submit-modern {
        border-radius: 10px !important;
        padding: 12px 30px !important;
    }

    .btn-add-custom {
        border-radius: 50px !important;
        font-size: 0.85rem;
    }

    #preview, #update-preview {
        display: none;
        width: 120px;
        height: auto;
        margin-top: 10px;
        border-radius: 8px;
        border: 1px solid #eaecf4;
        box-shadow: var(--card-shadow);
    }
</style>

<div class="container-fluid">

    <div class="page-title-block d-flex align-items-center justify-content-between mt-4">
        <div>
            <h1 class="h3 mb-1 text-gray-800" style="font-weight: 800;">Stores</h1>
            <p class="text-muted small mb-0">Manage and monitor branch locations and distribution centers.</p>
        </div>
        <button class="btn btn-primary btn-add-custom shadow-sm" data-toggle="modal" data-target="#addStores"> 
            <i class="fas fa-plus-circle mr-2"></i> Add Store
        </button>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="inventory-wrapper">
                <div class="table-responsive">
                    <table class="table text-center" id="stores-table" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Store</th>
                                <th>Contact</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Description</th>
                                <th>Actions</th>
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

<div class="modal fade" id="addStores" tabindex="-1" role="dialog" aria-labelledby="addStoreLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header d-flex align-items-center">
          <h5 class="modal-title" id="addStoreLabel"><i class="fas fa-store text-primary mr-2"></i>Register New Store</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body p-4">
            <form class="user" id="frm-add-store">
                <div class="form-group">
                    <label for="store">Store Name</label>
                    <input type="text" class="form-control form-control-user" id="store" name="store" placeholder="e.g. Main Branch">
                </div>
                <div class="form-group">
                    <label for="address">Address</label>
                    <input type="text" class="form-control form-control-user" id="address" name="address" placeholder="Store physical location">
                </div>
                <div class="form-group">
                    <label for="contact">Contact Number</label>
                    <input type="text" class="form-control form-control-user" id="contact" name="contact" placeholder="Phone/Mobile number">
                </div>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" class="form-control form-control-user" id="email" name="email" placeholder="store@example.com">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-control" id="description" name="description" placeholder="Additional store details..." cols="30" rows="3"></textarea>
                </div>
                <div class="mt-4 overflow-hidden">
                    <button type="submit" class="btn btn-primary btn-user btn-submit-modern float-right">
                        Create Store
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
</div>

<div class="modal fade" id="updateStores" tabindex="-1" role="dialog" aria-labelledby="updateStoreLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header d-flex align-items-center">
          <h5 class="modal-title" id="updateStoreLabel"><i class="fas fa-edit text-primary mr-2"></i>Update Store Details</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body p-4">
            <form class="user" id="frm-update-store">
                <div class="form-group">
                    <label for="store">Store Name</label>
                    <input type="text" class="form-control form-control-user" id="store" name="store">
                </div>
                <div class="form-group">
                    <label for="address">Address</label>
                    <input type="text" class="form-control form-control-user" id="address" name="address">
                </div>
                <div class="form-group">
                    <label for="contact">Contact Number</label>
                    <input type="text" class="form-control form-control-user" id="contact" name="contact">
                </div>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" class="form-control form-control-user" id="email" name="email">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-control" id="description" name="description" cols="30" rows="3"></textarea>
                </div>
                <div class="mt-4 overflow-hidden">
                    <button type="submit" class="btn btn-primary btn-user btn-submit-modern float-right">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
</div>

<?php
    $extra_scripts = array('../assets/js/stores.js');
?>
<?php include_once 'common/dashboard_footer.php';?>