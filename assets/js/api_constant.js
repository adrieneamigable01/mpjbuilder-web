let isLocal = false;
if(isLocal){
    var origin  = 'http://localhost/mikkostore_api';
    var baseApiUrl = `${origin}`;
    var base_url = 'http://localhost/mikkostore_admin';
    var baseUrl = `${base_url}/mikkostore_admin/pages/`
}else{
    var origin  = 'https://pos-api.doitcebu.com';
    var baseApiUrl = `${origin}`;
    var base_url = window.location.origin;
    var host = window.location.host;
    var pathname = window.location.pathname.split('/')
    var baseUrl = `${base_url}/pages/`
}



// auth api
var loginApi            = `${baseApiUrl}/auth/authenticate`;
var deautnApi            = `${baseApiUrl}/auth/logout`;
var getMenuApi          = `${baseApiUrl}/menu/getMenu`;
var addMenuApi          = `${baseApiUrl}/menu/addMenu`;
var updateMenuApi       = `${baseApiUrl}/menu/updateMenu`;
var getMenuTypeApi      = `${baseApiUrl}/menu/getMenuType`;
var addMenuTypeApi      = `${baseApiUrl}/menu/addMenuType`;
var updateMenuTypeApi   = `${baseApiUrl}/menu/updateMenuType`;
var getSuppliersApi     = `${baseApiUrl}/supplier/getSuppliers`;
var addSuppliersApi     = `${baseApiUrl}/supplier/addSuppliers`;
var updateSuppliersApi  = `${baseApiUrl}/supplier/updateSuppliers`;
var getProductsApi      = `${baseApiUrl}/product/getProducts`;
var getProductTypeApi   = `${baseApiUrl}/product/getProductType`;
var getStoresApi        = `${baseApiUrl}/store/getStores`;
var addProductApi       = `${baseApiUrl}/product/addProduct`;
var updateProductApi    = `${baseApiUrl}/product/updateProduct`;
var getStocksApi        = `${baseApiUrl}/stocks/getStocks`;
var addStocksApi        = `${baseApiUrl}/stocks/addStocks`;
var updateStockApi        = `${baseApiUrl}/stocks/updateStock`;
var getProductListApi   = `${baseApiUrl}/stocks/getProductList`;
var getInventoryApi     = `${baseApiUrl}/inventory/getInventory`;
var getInventoryItemsApi= `${baseApiUrl}/inventory/getInventoryItems`;
var addStoreApi         = `${baseApiUrl}/store/addStore`;
var updateStoreApi      = `${baseApiUrl}/store/updateStore`;
var addProductTypeApi   = `${baseApiUrl}/product/addProductType`;
var updateProductTypeApi= `${baseApiUrl}/product/updateProductType`;
var getUsedStocksApi     = `${baseApiUrl}/stocks/getUsedStocks`;
var addTransactionApi   = `${baseApiUrl}/transaction/addTransaction`;
var getTransactionApi   = `${baseApiUrl}/transaction/getTransaction`;
var addEndTransactionApi   = `${baseApiUrl}/transaction/addEndOfDayTransaction`;
var getEndTransactionApi   = `${baseApiUrl}/transaction/getEndTransaction`;
var getDiscountsApi        = `${baseApiUrl}/discounts/getDiscounts`;
var getUsersApi             =  `${baseApiUrl}/user/getUsers`;
var createUserApi             =  `${baseApiUrl}/user/createUser`;
var updateUserApi             =  `${baseApiUrl}/user/updateUser`;
var getDraftTransactionApi  = `${baseApiUrl}/transaction/getDraftTransaction`;
var createCustomerApi         = `${baseApiUrl}/customer/createCustomer`;
var getCustomerApi         = `${baseApiUrl}/customer/getCustomer`;
var editCustomerApi         = `${baseApiUrl}/customer/updateCustomer`;
var getCustomerPayablesApi         = `${baseApiUrl}/customer/getCustomerPayables`;
var getPaymentsApi         = `${baseApiUrl}/payment/getPayments`;
var createPaymentApi         = `${baseApiUrl}/payment/createPayment`;
var generateVoidPaymentOTPApi         = `${baseApiUrl}/payment/generateVoidPaymentOTP`;
var voidPaymentApi         = `${baseApiUrl}/payment/voidPayment`;
var updatePayablesDueApi   = `${baseApiUrl}/customer/updatePayablesDue`;
var validateDeletePaymentOTPApi = `${baseApiUrl}/payment/validateDeletePaymentOTP`; 
var getStockUnitApi              = `${baseApiUrl}/stocks/getStockUnit`
var checkTokenApi              = `${baseApiUrl}/user/checkToken`
var getTransactionByYearApi              = `${baseApiUrl}/utils/getTransactionByYear`
var getExpensesApi              = `${baseApiUrl}/expense/getExpenses`
var getMaterialsApi                 = `${baseApiUrl}/materials/getMaterials`
var addMaterialApi              = `${baseApiUrl}/materials/addMaterial`
var updateMaterialApi           = `${baseApiUrl}/materials/updateMaterial`
var getMixProductsApi           = `${baseApiUrl}/product/getMixProducts`
var addMixProductApi           = `${baseApiUrl}/product/addMixProduct`
var updateMixProductApi           = `${baseApiUrl}/product/updateMixProduct`