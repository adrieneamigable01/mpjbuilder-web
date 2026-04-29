<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>POS ADMIN</title>
  <link rel="icon" href="<?php echo '../assets/img/pos-logo.png' ?>" type="image/png">
  <!-- Custom fonts for this template-->
  <link href="<?php echo '../vendor/fontawesome-free/css/all.min.css' ?>" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

  <!-- Custom styles for this template-->
  <link href="<?php echo '../assets/css/sb-admin-2.min.css' ?>" rel="stylesheet">
  <link href="<?php echo '../assets/css/dashboard.css'?>" rel="stylesheet">
  <link href="<?php echo '../assets/css/loader.css'?>" rel="stylesheet">
  <link href="<?php echo '../vendor/datatables/dataTables.bootstrap4.min.css'?>" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/smartwizard@6/dist/css/smart_wizard.css">
   <!-- Select2 CSS -->
   <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css" rel="stylesheet" />
   <style>
      .select2-container {
          width: 100% !important; /* Ensure full width */
      }
      .select2-container--default .select2-selection--single {
          height: calc(2.25rem + 2px); /* Match Bootstrap input height */
          border: 1px solid #ced4da; /* Match Bootstrap border color */
          border-radius: .25rem; /* Match Bootstrap border radius */
      }

      .select2-container--default .select2-selection--single .select2-selection__rendered {
          line-height: 2.25rem; /* Center the text vertically */
      }

      .select2-container--default .select2-selection--single .select2-selection__arrow {
          height: 100%; /* Ensure arrow is full height */
      }
   </style>
</head>

<body id="page-top">
<div class="loading">Loading&#8230;</div>
  <!-- Page Wrapper -->
  <div id="wrapper">
  <?php include_once 'sidebar/dashboard_sidebar.php';?>
  <?php include_once 'common/dashboard_topbar.php';?>