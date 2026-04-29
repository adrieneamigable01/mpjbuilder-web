<!-- Begin Page Content -->
<?php include_once 'common/dashboard_header.php';?>
<style>
    #preview {
        display: none;
        width: 50%;
        height: auto;
        margin-top: 10px;
    }
    #update-preview {
        display: none;
        width: 50%;
        height: auto;
        margin-top: 10px;
    }
</style>
<div class="container-fluid">
    <!-- Profile Header -->
   

    <div class="row">
        <div class="col-4">
            <div class="card">
                <div class="card-header">
                    Customer Details
                </div>
                <div class="card-body">
                    <div class="profile-header text-left" id="payable-details">
                        <!-- <p class="text-muted" id="customer-address">-</p> -->
                    </div>
                </div>
            </div>

            <div class="card mt-2">
                <div class="card-header">
                    Store Added Payables Details
                </div>
                <div class="card-body">
                    <div class="profile-header text-left" id="store-details">
                        <!-- <p class="text-muted" id="customer-address">-</p> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="col-8">
            <div class="card">
                <div class="card-header">
                    Payable Details
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered text-center" id="payables-table" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Amount</th>
                                    <th>Paid</th>
                                    <th>Balance</th>
                                    <th>Date Added</th>
                                    <th>Due Date</th>
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


    <!-- Skills Section -->
    <div class="card mt-2">
        <div class="card-header">
            Payment
            <div class="float-right" id="add-payment-container">
                
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered text-center" id="payment-table" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>Date Added</th>
                            <th>Transacted By</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="customerFormModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Customer</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
            <form class="user" id="frm-customer">
                <div class="row">
                    <div class="form-group col">
                        <label for="firstname">Firstname</label>
                        <input type="text" class="form-control form-control-user" id="firstname" name="firstname" aria-describedby="firstname" placeholder="Firstname">
                    </div>
                    <div class="form-group col">
                        <label for="middlename">Middlename</label>
                        <input type="text" class="form-control form-control-user" id="middlename" name="middlename" aria-describedby="middlename" placeholder="Middlename">
                    </div>
                    <div class="form-group col">
                        <label for="lastname">Lastname</label>
                        <input type="text" class="form-control form-control-user" id="lastname" name="lastname" aria-describedby="lastname" placeholder="Lastname">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col">
                        <label for="email">Email</label>
                        <input type="email" class="form-control form-control-user" id="email" name="email" aria-describedby="email" placeholder="Email">
                    </div>
                    <div class="form-group col">
                        <label for="mobile">Mobile</label>
                        <input type="text" class="form-control form-control-user" id="mobile" name="mobile" aria-describedby="mobile" placeholder="Mobile #">
                    </div>
                    <div class="form-group col-12">
                        <label for="address">Address</label>
                        <textarea type="text" class="form-control form-control-user" id="address" name="address" aria-describedby="address"></textarea>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary btn-user btn-block col-3 float-right">
                    Submit
                </button>
            </form>
        </div>
      </div>
    </div>
</div>
<!-- /.container-fluid -->
<?php
    $extra_scripts = array('../assets/js/customer_payables.js');

?>
<?php include_once 'common/dashboard_footer.php';?>