<style>
    /* 1. Sidebar Container - Soft Light Gray */
    #accordionSidebar {
        background-color: #f8f9fc !important; /* Very light background */
        background-image: none !important;
        border-right: 1px solid #e3e6f0;
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }

    /* 2. Brand Section */
    .sidebar-brand {
        background-color: #ffffff;
        border-bottom: 1px solid #e3e6f0;
        margin-bottom: 0.5rem;
    }
    .sidebar-brand-text {
        color: #4e73df !important; /* Blue brand text */
        font-weight: 800 !important;
        letter-spacing: 0.5px;
    }

    /* 3. Navigation Links */
    .sidebar .nav-item .nav-link {
        color: #5a5c69 !important; /* Dark gray text for readability */
        margin: 2px 10px;
        padding: 0.75rem 1rem !important;
        border-radius: 6px;
        transition: all 0.2s;
    }

    .sidebar .nav-item .nav-link i {
        color: #b7b9cc; /* Muted icons */
        margin-right: 0.75rem;
    }

    /* 4. The "Active" State - Simple Blue Background */
    .sidebar .nav-item.active .nav-link {
        background-color: #4e73df !important;
        color: #ffffff !important;
        font-weight: 600;
    }

    .sidebar .nav-item.active .nav-link i {
        color: #ffffff !important;
    }

    /* 5. Hover State */
    .sidebar .nav-item .nav-link:hover:not(.active) {
        background-color: #eaecf4 !important;
        color: #2e59d9 !important;
    }

    /* 6. Dropdown / Collapse Menus */
    .collapse-inner {
        background-color: #ffffff !important;
        border: 1px solid #e3e6f0 !important;
        margin: 5px 10px !important;
        box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.1) !important;
    }

    .collapse-item {
        color: #6e707e !important;
        font-size: 0.85rem !important;
        padding: 0.5rem 1rem !important;
    }

    .collapse-item:hover {
        background-color: #f8f9fc !important;
        color: #4e73df !important;
        text-decoration: none;
    }

    .collapse-item.active {
        color: #4e73df !important;
        font-weight: 700;
        background-color: #f0f2f9 !important;
    }

    /* 7. Divider */
    .sidebar-divider {
        border-top: 1px solid #e3e6f0 !important;
        margin: 0.5rem 1rem !important;
    }
</style>

<ul class="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar">

    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="dashboard.php">
        <div class="sidebar-brand-text"> Admin<span style="color:#3b82f6">POS</span> </div> 
    </a>

    <li class="nav-item " id="menu-dashboard">
        <a class="nav-link" href="../pages/dashboard.php">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
        </a>
    </li>

    <hr class="sidebar-divider">

    <li class="nav-item" id="menu-suppliers">
        <a class="nav-link" href="../pages/suppliers.php">
            <i class="fas fa-fw fa-users-cog"></i>
            <span>Suppliers</span>
        </a>
    </li>

    <li class="nav-item" id="menu-store">
        <a class="nav-link" href="../pages/stores.php">
            <i class="fas fa-fw fa-store"></i>
            <span>Store</span>
        </a>
    </li>

    <li class="nav-item" id="menu-expense">
        <a class="nav-link" href="../pages/expenses.php">
            <i class="fa fa-book"></i>
            <span>Expenses</span>
        </a>
    </li>

    <li class="nav-item" id="menu-expense">
        <a class="nav-link" href="../pages/users.php">
            <i class="fa fa-users"></i>
            <span>Users</span>
        </a>
    </li>

    <li class="nav-item" id="menu-conversion">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#materialsUtilities">
            <i class="fas fa-fw fa-sync-alt"></i>
            <span>Conversion</span>
        </a>
        <div id="materialsUtilities" class="collapse" data-parent="#accordionSidebar">
            <div class="collapse-inner">
                <h6 class="collapse-header">Stock Actions:</h6>
                <a class="collapse-item" href="../pages/materials.php">Materials To Stock</a>
                <a class="collapse-item" href="../pages/mixproducts.php">Mix Products</a>
            </div>
        </div>
    </li>

    <li class="nav-item" id="menu-customber">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#customerMenu">
            <i class="fas fa-fw fa-user-friends"></i>
            <span>Customers</span>
        </a>
        <div id="customerMenu" class="collapse" data-parent="#accordionSidebar">
            <div class="collapse-inner">
                <a class="collapse-item" href="../pages/customers.php">Client List</a>
                <a class="collapse-item" href="../pages/payables.php">Payables</a>
            </div>
        </div>
    </li>

    <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#transactionUtilities">
            <i class="fas fa-fw fa-exchange-alt"></i>
            <span>Transactions</span>
        </a>
        <div id="transactionUtilities" class="collapse" data-parent="#accordionSidebar">
            <div class="collapse-inner">
                <a class="collapse-item" href="../pages/transaction.php">New Transaction</a>
                <a class="collapse-item" href="../pages/draft_transaction.php">Drafts</a>
                <a class="collapse-item" href="../pages/end_transaction.php">End of Day</a>
            </div>
        </div>
    </li>

    <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#productUtilities">
            <i class="fas fa-fw fa-boxes"></i>
            <span>Inventory</span>
        </a>
        <div id="productUtilities" class="collapse" data-parent="#accordionSidebar">
            <div class="collapse-inner">
                <a class="collapse-item" href="../pages/stocks.php">Current Stock</a>
                <a class="collapse-item" href="../pages/products.php">Products</a>
                <a class="collapse-item" href="../pages/producttype.php">Products type</a>
                <a class="collapse-item" href="../pages/used_stocks.php">Used Stocks List</a>
                <a class="collapse-item" href="../pages/inventory.php">Inventory</a>
            </div>
        </div>
    </li>

    <div class="text-center d-none d-md-inline mt-4">
        <button class="rounded-circle border-0" id="sidebarToggle" style="background: rgba(255,255,255,0.1)"></button>
    </div>

</ul>