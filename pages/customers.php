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

    /* Header Section */
    .page-title-block {
        background: transparent;
        margin-bottom: 2rem;
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
    #customers-table {
        border: none;
        border-collapse: separate;
        border-spacing: 0 5px;
    }

    #customers-table thead th {
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

    #customers-table tbody td {
        vertical-align: middle;
        color: #5a5c69;
        background: #fff;
        border-bottom: 1px solid #f8f9fc;
        padding: 18px 15px;
        transition: all 0.2s;
    }

    #customers-table tbody tr:hover td {
        background-color: #fcfdfe;
        color: #4e73df;
    }

    /* Modal Styling */
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

    /* Input Styling */
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

    #preview, #update-preview {
        display: none;
        width: 50%;
        height: auto;
        margin-top: 10px;
        border-radius: 8px;
    }
</style>

<div class="container-fluid">

    <div class="page-title-block d-flex align-items-center justify-content-between mt-4">
        <div>
            <h1 class="h3 mb-1 text-gray-800" style="font-weight: 800;">Customer Directory</h1>
            <p class="text-muted small mb-0">Manage customer profiles, contact information, and account history.</p>
        </div>
        <button class="btn btn-primary btn-add-custom shadow-sm" data-toggle="modal" data-target="#customerFormModal" id="customer-button"> 
            <i class="fas fa-user-plus mr-2"></i> Add Customer
        </button>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="inventory-wrapper">
                <div class="table-responsive">
                    <table class="table text-center" id="customers-table" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Contact #</th>
                                <th>Date Added</th>
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

<div class="modal fade" id="customerFormModal" tabindex="-1" role="dialog" aria-labelledby="customerModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header d-flex align-items-center">
          <h5 class="modal-title" id="customerModalLabel"><i class="fas fa-id-card text-primary mr-2"></i>Customer Profile</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body p-4">
            <form class="user" id="frm-customer">
                <div class="row">
                    <div class="form-group col-md-4">
                        <label for="firstname">Firstname</label>
                        <input type="text" class="form-control form-control-user" id="firstname" name="firstname" placeholder="First Name">
                    </div>
                    <div class="form-group col-md-4">
                        <label for="middlename">Middlename</label>
                        <input type="text" class="form-control form-control-user" id="middlename" name="middlename" placeholder="Middle Name">
                    </div>
                    <div class="form-group col-md-4">
                        <label for="lastname">Lastname</label>
                        <input type="text" class="form-control form-control-user" id="lastname" name="lastname" placeholder="Last Name">
                    </div>
                </div>
                
                <div class="row mt-2">
                    <div class="form-group col-md-6">
                        <label for="email">Email Address</label>
                        <input type="email" class="form-control form-control-user" id="email" name="email" placeholder="customer@example.com">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="mobile">Mobile Number</label>
                        <input type="text" class="form-control form-control-user" id="mobile" name="mobile" placeholder="09XX XXX XXXX">
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="form-group col-12">
                        <label for="address">Residential / Shipping Address</label>
                        <textarea class="form-control" id="address" name="address" rows="3" placeholder="Enter full address details..."></textarea>
                    </div>
                </div>

                <div class="mt-4 overflow-hidden">
                    <button type="submit" class="btn btn-primary btn-user px-5 float-right">
                        Register Customer
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
</div>

<?php
    $extra_scripts = array('../assets/js/customers.js');
?>
<?php include_once 'common/dashboard_footer.php';?>