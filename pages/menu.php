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
<!-- Begin Page Content -->
<div class="container-fluid">

    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Cards</h1>
        <button class="btn btn-primary float-right" data-toggle="modal" data-target="#addMenuModal"> 
            <i class="fa fa-plus"> Menu</i>
        </button>
    </div>

    <div class="row">
        <div class="col-2">
            <div class="nav flex-column nav-pills menuTypeContent" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            </div>
        </div>
        <div class="col-10">
            <div class="tab-content menu_type" id="v-pills-tabContent">
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="addMenuModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Menu</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
            <form class="user" id="frm-add-menu">
                <div class="form-group">
                    <input type="text" class="form-control form-control-user" id="menuName" name="menuName" aria-describedby="emailHelp" placeholder="Enter menu name">
                </div>
                <div class="form-group">
                    <input type="number" class="form-control form-control-user" id="price" name="price" placeholder="Price">
                </div>
                <div class="form-group">
                    <input type="file" class="form-control form-control-user" id="menu-image" name="menu-image" placeholder="Price">
                    <div class="text-center">
                        <img id="preview" alt="Image preview">
                    </div>
                </div>
                <button type="submit" class="btn btn-primary btn-user btn-block">
                    Submit
                </button>
            </form>
        </div>
      </div>
    </div>
</div>

<div class="modal fade" id="updateMenuModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Update Menu</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
            <form class="user" id="frm-update-menu">
                <div class="form-group">
                    <input type="text" class="form-control form-control-user" id="menuName" name="menuName" aria-describedby="emailHelp" placeholder="Enter menu name">
                </div>
                <div class="form-group">
                    <select type="text" class="form-control" id="menuTypeId" name="menuTypeId">
                      
                    </select>
                </div>
                <div class="form-group">
                    <input type="number" class="form-control form-control-user" id="price" name="price" placeholder="Price">
                </div>
                <div class="form-group">
                    <input type="file" class="form-control form-control-user" id="update-menu-image" name="update-menu-image" placeholder="Price">
                    <div class="text-center">
                        <img id="update-preview" alt="Image preview">
                    </div>
                </div>
                <button type="submit" class="btn btn-primary btn-user btn-block">
                    Submit
                </button>
            </form>
        </div>
      </div>
    </div>
</div>
<?php
    $extra_scripts = array('../assets/js/menu.js');

?>
<?php include_once 'common/dashboard_footer.php';?>

<!-- /.container-fluid -->
<!-- /.container-fluid -->