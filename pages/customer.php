<?php include_once 'common/dashboard_header.php';?>

<style>
    :root {
        --primary-color: #4e73df;
        --secondary-bg: #f8f9fc;
        --card-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.1);
        --border-radius: 12px;
    }

    body { background-color: var(--secondary-bg); font-family: 'Inter', system-ui, -apple-system, sans-serif; }

    /* Profile Section Header */
    .profile-banner {
        background: #fff;
        border-radius: var(--border-radius);
        padding: 30px;
        box-shadow: var(--card-shadow);
        margin-bottom: 25px;
        border: 1px solid rgba(0,0,0,0.02);
        display: flex;
        align-items: center;
    }

    .profile-img-wrapper {
        position: relative;
        margin-right: 25px;
    }

    .profile-banner img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        border: 4px solid #f8f9fc;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }

    .profile-details h3 {
        font-weight: 800;
        color: #3a3b45;
        margin-bottom: 5px;
        letter-spacing: -0.5px;
    }

    /* Info Cards */
    .info-card {
        background: #fff;
        border-radius: var(--border-radius);
        padding: 25px;
        box-shadow: var(--card-shadow);
        border: none;
        height: 100%;
    }

    .section-label {
        font-weight: 800;
        font-size: 0.7rem;
        color: #b7b9cc;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-bottom: 15px;
        display: block;
    }

    /* Table Styling */
    #payables-table {
        border: none;
        border-collapse: separate;
        border-spacing: 0 5px;
    }

    #payables-table thead th {
        background: #fff;
        color: #b7b9cc;
        text-transform: uppercase;
        font-size: 0.65rem;
        font-weight: 800;
        padding: 15px;
        border: none;
        border-bottom: 2px solid #f1f2f9;
    }

    #payables-table tbody td {
        vertical-align: middle;
        background: #fff;
        border-bottom: 1px solid #f8f9fc;
        padding: 15px;
        color: #5a5c69;
    }

    /* Form & Modal */
    .form-control {
        border-radius: 8px !important;
        border: 1px solid #d1d3e2 !important;
        font-size: 0.9rem;
    }

    .modal-content {
        border-radius: 16px;
        border: none;
        box-shadow: 0 15px 50px rgba(0,0,0,0.15);
    }

    .modal-header {
        border-bottom: 1px solid #f1f2f9;
        padding: 20px 25px;
    }
</style>

<div class="container-fluid mt-4">

    <div class="profile-banner">
        <div class="profile-img-wrapper">
            <img src="http://localhost/mikkostore_admin/assets/img/user-default.webp" alt="Profile Picture" id="">
        </div>
        <div class="profile-details">
            <h3 id="customer-name">-</h3>
            <p class="text-muted mb-0"><i class="fas fa-map-marker-alt mr-2 text-primary"></i><span id="customer-address">-</span></p>
        </div>
        <div class="ml-auto">
            <button class="btn btn-light btn-sm shadow-sm" style="border-radius: 8px;" data-toggle="modal" data-target="#customerFormModal">
                <i class="fas fa-user-edit mr-1"></i> Edit Profile
            </button>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-4 mb-4">
            <div class="info-card">
                <span class="section-label">Contact Details</span>
                <div id="customer-info">
                    </div>
            </div>
        </div>

        <div class="col-lg-8 mb-4">
            <div class="info-card">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="section-label">Account Payables</span>
                    <span class="badge badge-primary-soft text-primary p-2 px-3" style="background: rgba(78, 115, 223, 0.1); border-radius: 10px; font-weight: 700;">Active Balance</span>
                </div>
                <div class="table-responsive">
                    <table class="table text-center table-sm" id="payables-table" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Amount</th>
                                <th>Store</th>
                                <th>Date Added</th>
                                <th>Due Date</th>
                                <th>Status</th>
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

<div class="modal fade" id="customerFormModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" style="font-weight: 800;"><i class="fas fa-user-circle text-primary mr-2"></i> Customer Information</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body p-4">
            <form id="frm-customer">
                <div class="row mb-3">
                    <div class="form-group col-md-4">
                        <label class="small font-weight-bold text-muted">FIRSTNAME</label>
                        <input type="text" class="form-control" id="firstname" name="firstname" placeholder="Enter first name">
                    </div>
                    <div class="form-group col-md-4">
                        <label class="small font-weight-bold text-muted">MIDDLENAME</label>
                        <input type="text" class="form-control" id="middlename" name="middlename" placeholder="Enter middle name">
                    </div>
                    <div class="form-group col-md-4">
                        <label class="small font-weight-bold text-muted">LASTNAME</label>
                        <input type="text" class="form-control" id="lastname" name="lastname" placeholder="Enter last name">
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="form-group col-md-6">
                        <label class="small font-weight-bold text-muted">EMAIL ADDRESS</label>
                        <input type="email" class="form-control" id="email" name="email" placeholder="name@example.com">
                    </div>
                    <div class="form-group col-md-6">
                        <label class="small font-weight-bold text-muted">MOBILE NUMBER</label>
                        <input type="text" class="form-control" id="mobile" name="mobile" placeholder="09XX XXX XXXX">
                    </div>
                </div>
                <div class="form-group mb-4">
                    <label class="small font-weight-bold text-muted">RESIDENTIAL ADDRESS</label>
                    <textarea class="form-control" id="address" name="address" rows="3" placeholder="Street, Barangay, City..."></textarea>
                </div>
                <div class="text-right border-top pt-3">
                    <button type="button" class="btn btn-light px-4 mr-2" style="border-radius: 8px;" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary px-5 shadow-sm font-weight-bold" style="border-radius: 8px;">Save Changes</button>
                </div>
            </form>
        </div>
      </div>
    </div>
</div>

<?php
    $extra_scripts = array('../assets/js/customer.js');
?>
<?php include_once 'common/dashboard_footer.php';?>