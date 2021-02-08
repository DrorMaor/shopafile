<html lang="en">
<head>
    <title>Shopafile</title>
</head>
<body style="background:#E1E1E1">    
    <div class="container text-center">
        <br/>
        <h2><strong>Shopafile</strong></h2>
        <br/>
        <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-3 col-md-offset-4 col-lg-3">         
                <!-- PRICE ITEM -->
                <form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" name="frmPayPal1">
                    <div class="panel price panel-red">
                        <input type="number" name="amount" value="1.5">
                        <input type="hidden" name="business" value="binyomineadler@gmail.com">
                        <input type="hidden" name="cmd" value="_xclick">
                        <input type="hidden" name="item_name" value="It Solution Stuff">
                        <input type="hidden" name="item_number" value="2">
                        <input type="hidden" name="no_shipping" value="1">
                        <input type="hidden" name="currency_code" value="USD">
                        <input type="hidden" name="cancel_return" value="cancel.php">
                        <input type="hidden" name="return" value="success.php">  
                            
                        <div class="panel-footer">
                            <button class="btn btn-lg btn-block btn-danger" href="#">BUY NOW!</button>
                        </div>
                    </div>
                </form>
                <!-- /PRICE ITEM -->
            </div>
        </div>
    </div>
</body>
</html>