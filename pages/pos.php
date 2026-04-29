<?php include 'common/header.php' ?> 
<?php include 'common/topbar.php' ?> 
<!-- Begin Page Content -->
<div class="container-fluid">
   <!-- Page Heading -->
   <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800 col-12">
            Order 
            <button class="btn btn-outline-info float-right" data-toggle="modal" data-target="#transaction-history" id="v-transaction"><i class="fa fa-list"></i> Transactions List</button>
      </h1>
   </div>
   <div class="row">
        <div class="col-7">
            <div class="card">
                <div class="card-header bg-default">
                    <ul class="nav nav-pills mb-3 mebu-tabs" id="pills-tab" role="tablist">
                
                    </ul>
                </div>
                <div class="card-body">
                    <div class="tab-content" id="pills-tabContent" style="overflow:scroll;height:100vh;">
                        <div class="row main bd-grid" id="menu-container">

                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-5">
            <div class="card">
                <div class="card-header bg-default" id="transaction-header">
                   Transaction
                </div>
                <div class="card-body" style="height:400px;overflow:auto"> 
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th class="text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody id="selected-menu-list"></tbody>
                    </table>
                </div>
                <div class="card-footer text-muted">
                    <div class="row">
                        <div class="col-6">
                            <div class="text-left">
                                Subtotal: <span id="subtotal">0.00</span>
                            </div>
                            <div class="text-left">
                                Discount %:  (<span class="text-danger" id="discount">0.00</span>)
                            </div>
                            <div class="text-left">
                                Discount amount:  (<span class="text-danger" id="discount-amount">0.00</span>)
                            </div>
                            <div class="text-left">
                                Total Due <span id="total">:0.00</span>
                            </div>
                            <div class="text-left">
                                Change <span id="change">:0.00</span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                <span class="input-group-text">Cash</span>
                                </div>
                                <input class="form-control" type="number" name="cash" id="cash" placeholder="0.00">
                                <label id="system-pos-message" class="text-danger" style="display:none"></label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="form-group text-right mt-3">
                                <button class="btn btn-sm btn-outline-danger" id="cancel">
                                    <i class="fa fa-times"></i>    
                                    Cancel
                                </button>
                                <button class="btn btn-sm btn-outline-warning" data-toggle="modal" data-target="#addDiscount">
                                    <i class="fa fa-plus"></i>    
                                    Discount
                                </button>
                                <button class="btn btn-sm btn-outline-info" id="add-note">
                                    <i class="fa fa-book"></i>
                                    Notes
                                </button>
                                <button class="btn btn-sm btn-outline-primary" id="submit-transaction">
                                    <i class="fa fa-print"></i> Save Transaction
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
</div>
<div class="modal fade" id="addDiscount" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Discount</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="discounts-items" id="discounts-items">
                    <!-- <div class="custom-control custom-switch col-12">
                        <input type="checkbox" class="custom-control-input" id="senior">
                        <label class="custom-control-label" for="senior">Senior Citizen</label>
                    </div>
                    <div class="custom-control custom-switch col-12">
                        <input type="checkbox" class="custom-control-input" id="pwd">
                        <label class="custom-control-label" for="pwd">PWD</label>
                    </div>
                    <div class="custom-control custom-switch col-12">
                        <input type="checkbox" class="custom-control-input" id="others">
                        <label class="custom-control-label" for="others">Others</label>
                    </div> -->
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-primary btn-user btn-block  col-4 float-right" data-dismiss="modal" aria-label="Close">
                        OK
                    </button>
                </div>
            </div>
            <!-- <div class="form-group">
                <input type="number" class="form-control form-control-user" id="discount-amount" aria-describedby="emailHelp" placeholder="Enter discount">
            </div> -->
        </div>
      </div>
    </div>
</div>

<!-- The Modal -->
<div class="modal fade" id="transaction-history">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Transaction History</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
            <div class="row">
                <div class="col-12">
                    <div class="table-responsive">
                        <div class="row">
                            <div class="col-12">
                                <div class="input-group col-5 float-right p-0">
                                    <input type="date" class="form-control" aria-label="From Date Trasaction" name="from-date-transaction" value="<?php echo date('Y-m-d') ?>" max="<?php echo date('Y-m-d') ?>">
                                    <div class="input-group-append">
                                        <span class="input-group-text">to</span>
                                    </div>
                                    <input type="date" class="form-control" aria-label="To Date Trasaction" name="to-date-transaction"  value="<?php echo date('Y-m-d') ?>" max="<?php echo date('Y-m-d') ?>">
                                </div>
                            </div>
                            <div class="col-12 mt-3">
                                <table class="table table-bordered text-center table-sm nowrap" id="transaction-table" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Order #</th>
                                            <th>Date</th>
                                            <th>Item</th>
                                            <th>Discount %</th>
                                            <th>Discount Amount</th>
                                            <th>Discount Items</th>
                                            <th>Cash</th>
                                            <th>Discounted Price</th>
                                            <th>Price</th>
                                            <th>Note</th>
                                            <th>-</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th style="text-align:right"></th>
                                            <th style="text-align:right"></th>
                                            <th style="text-align:right"></th>
                                            <th style="text-align:right"></th>
                                            <th style="text-align:right"></th>
                                            <th style="text-align:right"></th>
                                            <th style="text-align:right"></th>
                                            <th style="text-align:right"></th>
                                            <th style="text-align:right"></th>
                                            <th style="text-align:right"></th>
                                            <th style="text-align:right"></th>
                                            
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>

<!-- /.container-fluid -->
<?php include 'common/footer.php' ?> 
