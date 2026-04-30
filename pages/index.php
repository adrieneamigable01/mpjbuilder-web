<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Login</title>

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <link href="<?php echo '../vendor/fontawesome-free/css/all.min.css'?>" rel="stylesheet" type="text/css">

    <style>
        :root {
            --primary-color: #4f46e5; /* Modern Indigo */
            --bg-color: #f9fafb;
            --text-main: #111827;
            --text-muted: #6b7280;
            --input-border: #d1d5db;
            --card-bg: #ffffff;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-color);
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            color: var(--text-main);
        }

        .login-container {
            width: 100%;
            max-width: 400px;
            padding: 20px;
        }

        .login-card {
            background: var(--card-bg);
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .brand-header {
            text-align: center;
            margin-bottom: 32px;
        }

        .brand-header h1 {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0;
            color: var(--text-main);
        }

        .brand-header p {
            color: var(--text-muted);
            font-size: 0.875rem;
            margin-top: 8px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            margin-bottom: 6px;
        }

        .form-control {
            width: 100%;
            padding: 12px 16px;
            font-size: 1rem;
            border-radius: 8px;
            border: 1px solid var(--input-border);
            box-sizing: border-box;
            transition: border-color 0.2s, ring 0.2s;
        }

        .form-control:focus {
            outline: none;
            border-color: var(--primary-color);
            ring: 2px var(--primary-color);
        }

        .btn-submit {
            width: 100%;
            padding: 12px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s;
            margin-top: 10px;
        }

        .btn-submit:hover {
            background-color: #4338ca;
        }

        .footer-links {
            margin-top: 24px;
            text-align: center;
            font-size: 0.875rem;
        }

        .footer-links a {
            color: var(--primary-color);
            text-decoration: none;
            font-weight: 500;
        }

        .footer-links a:hover {
            text-decoration: underline;
        }

        .divider {
            margin: 24px 0;
            border-top: 1px solid #e5e7eb;
        }

        /* Loading Overlay Style */
        .loading {
            position: fixed;
            z-index: 999;
            height: 2em; width: 2em;
            overflow: show;
            margin: auto;
            top: 0; left: 0; bottom: 0; right: 0;
            display: none; /* Controlled by JS */
        }
    </style>
</head>

<body>
    <div class="loading">Loading&#8230;</div>

    <div class="login-container">
        <div class="login-card">
            <div class="brand-header">
                <h1>Welcome Back</h1>
                <p>Please enter your details to sign in.</p>
            </div>

            <form id="frm_login">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="username" name="username" placeholder="" required>
                </div>
                
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" name="password" placeholder="" required>
                </div>

                <button type="submit" class="btn-submit">
                    Sign In
                </button>
            </form>

            <div class="divider"></div>

            <div class="footer-links">
                <a href="forgot-password.html">Forgot password?</a>
                <div style="margin-top: 8px;">
                    <span style="color: var(--text-muted);">Don't have an account?</span> 
                    <a href="register.html">Sign up</a>
                </div>
            </div>
        </div>
    </div>

    <script src="<?php echo '../vendor/jquery/jquery.min.js'?>"></script>
    <script src="<?php echo '../vendor/bootstrap/js/bootstrap.bundle.min.js'?>"></script>
    <script src="<?php echo '../assets/js/jquery-validate.js'?>"></script>
    <script src="<?php echo '../assets/js/sweetalert2@7.26.11.js'?>"></script>
    <script src="<?php echo '../assets/js/js-addon.js'?>"></script>
    <script src="<?php echo '../assets/js/api_constant.js'?>"></script>
    <script src="<?php echo '../assets/js/auth.js'?>"></script>
</body>
</html>