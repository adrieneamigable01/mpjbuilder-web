<!-- Begin Page Content -->
<?php include_once 'common/dashboard_header.php';?>
<style>
    #preview {
        display: none;
        width: 50%;
        height: auto;
        margin-top: 10px;
    }
    
</style>
<div class="container-fluid">

    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Stocks</h1>
        <div class="row">
            <div class="input-group mb-3 col-12">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Store</span>
                </div>
                <select type="text" class="form-control store-type-menu-filter" id="storeFilter" name="storeFilter" aria-describedby="store"></select>
            </div>
            <div class="col-12">
                <button class="btn btn-primary float-right" data-toggle="modal" id="add-stocks"> 
                    <i class="fa fa-plus"> Stocks</i>
                </button>
            </div>
        </div>


       
    </div>

    <div class="row">
        <div class="col-12">
            <div class="table-responsive">
                <table class="table table-bordered text-center " id="stocks-table" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Store</th>
                            <th>Product</th>
                            <th>Purchase Price</th>
                            <th>Unit</th>
                            <th>Quantity</th>
                            <th>Supplier</th>
                            <th>Date Created</th>
                            <th>Expiration Date</th>
                            <th>Description</th>
                        <th>-</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="stocksModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Stocks</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
            <form class="user" id="frm-stocks">
                <div class="row">
                    <div class="form-group col">
                        <label for="store">Store</label>
                        <select type="text" class="form-control store-type-menu" id="store" name="store" aria-describedby="store"></select>
                    </div>
                    <div class="form-group col">
                        <label for="supllier">Suppliers</label>
                        <select type="text" class="form-control supplier-type-menu" id="supllier" name="supllier" aria-describedby="supllier"></select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col">
                        <label for="store">Propduct Type</label>
                        <select type="text" class="form-control product-type-menu" id="productTypeId" name="productTypeId" aria-describedby="store"></select>
                    </div>
                    <div class="form-group col">
                        <label for="product">Product</label>
                        <select type="text" class="form-control product-menu" id="productid" name="productid" aria-describedby="store"></select>
                    </div>
                    
                    <div class="form-group col">
                        <label for="expirationDate">Expiration Date</label>
                        <input type="date" class="form-control" id="expirationDate" name="expirationDate" aria-describedby="expirationDate" placeholder="Expiration Date">
                    </div>
                    
                </div>
                <div class="row">
                    <div class="form-group col">
                        <label for="price">Purchase Price</label>
                        <input type="number" class="form-control" id="purchase_price" name="purchase_price" aria-describedby="purchase_price" placeholder="Purchase Price">
                    </div>
                    <div class="form-group col">
                        <label for="unit_0">Unit</label>
                        <select class="form-control" id="unit" name="unit" aria-describedby="unit"></select>
                    </div>
                    <div class="form-group col">
                        <label for="quantity">Quantity</label>
                        <input type="number" class="form-control" id="quantity" name="quantity" aria-describedby="quantity" placeholder="Enter quantity">
                    </div>
                    
                    <!-- <div class="form-group col">
                        <label for="discount">Discount</label>
                        <input type="number" class="form-control" id="discount" name="discount" aria-describedby="discount" placeholder="Dicount Price">
                    </div> -->
                </div>
                <div class="row">
                   <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Stock Price</h5>
                                <div id="stock-price-container">
                                    <div class="row stock-price-item-container" data-index="0">
                                        <div class="form-group col">
                                            <label for="unit_0">Unit</label>
                                            <select class="form-control price_input" data-name='stock_unit'  data-id="0" id="unit_0" name="unit_0" aria-describedby="unit0"></select>
                                        </div>
                                        <div class="form-group col">
                                            <label for="quantity">Quantity</label>
                                            <input type="number" class="form-control price_input"  data-name='stock_quantity' data-id="0" id="stock_quantity_0" name="stock_quantity_0" aria-describedby="quantity" placeholder="Enter quantity">
                                        </div>
                                        <div class="form-group col">
                                            <label for="selling_price_0">Selling Price</label>
                                            <input type="number" class="form-control price_input" data-name='stock_price' data-id="0" id="selling_price_0" name="selling_price_0" aria-describedby="selling_price" placeholder="Selling Price">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                   </div>
                   <div class="col-12">
                       <button type="button" id="btn-stockprice" class="btn btn-link float-right"><i class="fa fa-plus"></i> Add</button>
                   </div>
                </div>
                <div class="row">
                    <div class="form-group col">
                        <textarea class="form-control" id="description" name="description" aria-describedby="description" placeholder="Description"  cols="30" rows="5"></textarea>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary btn-user btn-block col-3 float-right">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
      </div>
    </div>
</div>
<!-- /.container-fluid -->
<?php
    $extra_scripts = array('../assets/js/stocks.js');

?>
<?php include_once 'common/dashboard_footer.php';?>