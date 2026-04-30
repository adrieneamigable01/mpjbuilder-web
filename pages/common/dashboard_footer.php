   </div>
    <!-- End of Main Content -->
<!-- Footer -->
<footer class="sticky-footer bg-white">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>Powerd By:  <a href="doitcebu.com">www.doitcebu.com</a> <?php echo date("Y")?></span>
          </div>
        </div>
      </footer>
      <!-- End of Footer -->

    </div>
    <!-- End of Content Wrapper -->

  </div>
  <!-- End of Page Wrapper -->

  <!-- Scroll to Top Button-->
  <a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
  </a>

  <!-- Logout Modal-->
  <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
          <a class="btn btn-coffee" href="login.html">Logout</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Bootstrap core JavaScript-->
  <script src="<?php echo '../vendor/jquery/jquery.min.js'?>"></script>
  <script src="https://cdn.jsdelivr.net/npm/smartwizard@6/dist/js/jquery.smartWizard.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js"></script> 
  
  <script src="<?php echo '../assets/js/constant.js'?>"></script>
  <script src="<?php echo '../vendor/bootstrap/js/bootstrap.bundle.min.js'?>"></script>

  <!-- Core plugin JavaScript-->
  <script src="<?php echo '../vendor/jquery-easing/jquery.easing.min.js'?>"></script>

  <!-- Custom scripts for all pages-->
  <script src="<?php echo '../assets/js/sb-admin-2.min.js'?>"></script>
  <script src="<?php echo '../assets/js/jquery-validate.js'?>"></script>
  <script src="<?php echo '../assets/js/sweetalert2@7.26.11.js'?>"></script>
  <script src="<?php echo '../assets/js/js-addon.js'?>"></script>

 
  <script src="<?php echo '../assets/js/api_constant.js'?>"></script>

  <!-- Page level plugins -->
  <script src="<?php echo '../vendor/chart.js/Chart.min.js'?>"></script>

  <!-- Page level custom scripts -->
  <!-- <script src="<?php echo '../assets/js/demo/chart-area-demo.js'?>"></script> -->
  <!-- <script src="<?php echo '../assets/js/demo/chart-pie-demo.js'?>"></script> -->

    <!-- Page level plugins -->
  <script src="<?php echo '../vendor/datatables/jquery.dataTables.min.js'?>"></script>
  <script src="<?php echo '../vendor/datatables/dataTables.bootstrap4.min.js'?>"></script>

  <!-- Page level custom scripts -->
  <script src="<?php echo '../assets/js/demo/datatables-demo.js'?>"></script>
   <!-- Select2 JS -->
   <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>

  <?php   
  
    if(!empty($extra_scripts)){
        foreach ($extra_scripts as $key => $value) {
            echo "<script type='text/javascript' src='".$value."'></script>";
        }
    }
?>

  <script src="<?php echo '../assets/js/dashboard.js'?>"></script>

</body>

</html>
