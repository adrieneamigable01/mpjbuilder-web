<div id="content-wrapper" class="d-flex flex-column">

  <style>
    /* Modern Header Enhancements */
    .user-nav-container {
      display: flex;
      align-items: center;
      padding: 0.5rem 1rem;
    }

    /* Store Name Badge */
    .store-badge {
      background-color: #f8f9fc;
      border: 1px solid #d1d3e2;
      padding: 4px 12px;
      border-radius: 50px;
      color: #4e73df;
      font-size: 0.7rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05rem;
      display: flex;
      align-items: center;
      transition: all 0.2s ease-in-out;
    }

    .nav-link:hover .store-badge {
      background-color: #4e73df;
      color: #fff;
      border-color: #4e73df;
    }

    /* User Text Layout */
    .user-info-group {
      text-align: right;
      line-height: 1.2;
    }

    #dashboard_fullname {
      display: block;
      font-weight: 700;
      color: #3a3b45;
    }

    .user-status-text {
      font-size: 0.65rem;
      color: #1cc88a; /* Success Green */
      font-weight: 600;
    }

    .img-profile-custom {
      height: 35px;
      width: 35px;
      object-fit: cover;
      border: 2px solid #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  </style>

  <div id="content">

    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

      <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
        <i class="fa fa-bars"></i>
      </button>

      <ul class="navbar-nav ml-auto">

        <li class="nav-item dropdown no-arrow d-sm-none">
          <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-search fa-fw"></i>
          </a>
          <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
            <form class="form-inline mr-auto w-100 navbar-search">
              <div class="input-group">
                <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search">
                <div class="input-group-append">
                  <button class="btn btn-primary" type="button">
                    <i class="fas fa-search fa-sm"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>

        <li class="nav-item dropdown no-arrow">
          <a class="nav-link dropdown-toggle user-nav-container" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            
            <div class="store-badge d-none d-sm-flex mr-3" id="changeStoreBtn" style="cursor: pointer;">
                <i class="fas fa-store-alt mr-2"></i>
                <span id="dashboard_store">Main Warehouse</span>
            </div>

            <div class="topbar-divider d-none d-sm-block mr-3"></div>

            <div class="user-info-group mr-2 d-none d-lg-block">
              <span class="small" id="dashboard_fullname">User Fullname</span>
              <span class="user-status-text"><i class="fas fa-circle fa-xs mr-1"></i> Online</span>
            </div>

            <img class="img-profile-custom rounded-circle" src="../assets/img/user-default.webp">
          </a>

          <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in border-0" aria-labelledby="userDropdown">
            <a class="dropdown-item py-2" href="#">
              <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Profile
            </a>
            <a class="dropdown-item py-2" href="#">
              <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
              Activity Log
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item logout py-2 text-danger" href="#">
              <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2"></i>
              Logout
            </a>
          </div>
        </li>

      </ul>

    </nav>