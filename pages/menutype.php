<?php include_once 'common/dashboard_header.php';?>
<!-- Begin Page Content -->
<div class="container-fluid">

    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Menu Type</h1>
        <button class="btn btn-primary float-right" data-toggle="modal" data-target="#addMenuType"> 
            <i class="fa fa-plus"> Menu Type</i>
        </button>
    </div>

    <div class="row">
        <div class="col-12">
        <div class="table-responsive">
                <table class="table table-bordered text-center" id="menuTypeTable" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Menu Type</th>
                      <th>Date Created</th>
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

<div class="modal fade" id="addMenuType" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Menu</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
            <form class="user" id="frm-add-menu-type">
                <div class="form-group">
                    <input type="text" class="form-control form-control-user" id="menuType" name="menuType" aria-describedby="emailHelp" placeholder="Enter menu type">
                </div>
                <button type="submit" class="btn btn-primary btn-user btn-block">
                    Submit
                </button>
            </form>
        </div>
      </div>
    </div>
</div>

<div class="modal fade" id="updateMenuType" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Update Menu</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
            <form class="user" id="frm-update-menu-type">
                <div class="form-group">
                    <input type="text" class="form-control form-control-user" id="menuType" name="menuType" aria-describedby="emailHelp" placeholder="Enter menu name">
                </div>
                <button type="submit" class="btn btn-primary btn-user btn-block">
                    Submit
                </button>
            </form>
        </div>
      </div>
    </div>
</div>

<!-- /.container-fluid -->
<?php
    $extra_scripts = array('../assets/js/menutype.js');

?>
<?php include_once 'common/dashboard_footer.php';?>