<?php            
	// Get access token from PayPal client Id and secrate key
	
	payToAccount($_POST["amount"], $_POST["email"]);

	function payToAccount($amount, $address)
	{
		$sandbox = "sandbox";
		//$sandbox = "";

		define('PAYPAL_CLIENT_ID', 'AaJsbvv8nqjEoCLF7hG6m6ifwS62DslwUlDAoDBHFf7dzG1SWpYMGit-5S_BVYVV_m5H0tjvnbdl6QRj');
		define('PAYPAL_SECRET_KEY', 'ELtE5XYzqKewCwO13qvVNXN1I6YXcPzqCVvNFfTXnPxvQZ9oJOwYjT0Ear578Nd5QNpMy1YzajayFFxc');

		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL, "https://api." . $sandbox . ".paypal.com/v1/oauth2/token");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=client_credentials");
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_USERPWD, PAYPAL_CLIENT_ID . ":" . PAYPAL_SECRET_KEY);
		curl_setopt($ch, CURLOPT_SSLVERSION , 6); //tlsv1.2

		$headers = array();
		$headers[] = "Accept: application/json";
		$headers[] = "Accept-Language: en_US";
		$headers[] = "Content-Type: application/x-www-form-urlencoded";
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

		$results = curl_exec($ch);
		$getresult = json_decode($results);


		// PayPal Payout API for Send Payment from PayPal to PayPal account
		curl_setopt($ch, CURLOPT_URL, "https://api." . $sandbox . ".paypal.com/v1/payments/payouts");

		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

		$array = array('sender_batch_header' => array(
				"sender_batch_id" => time(),
				"email_subject" => "You have a payout!",
				"email_message" => "You have received a payout."
			),
			'items' => array(array(
					"recipient_type" => "EMAIL",
					"amount" => array(
						"value" => $amount,
						"currency" => "USD"
					),
					"note" => "Thanks for the payout!",
					"sender_item_id" => time(),
					"receiver" => $address
				))
		);
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($array));
		curl_setopt($ch, CURLOPT_POST, 1);

		//print_r($getresult->token_type.' '.$getresult->access_token);

		$headers = array();
		$headers[] = "Content-Type: application/json";
		$headers[] = "Authorization: ".$getresult->token_type.' '.$getresult->access_token;
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

		$payoutResult = curl_exec($ch);
		print_r($payoutResult);
		$getPayoutResult = json_decode($payoutResult);
		if (curl_errno($ch)) {
			echo 'Error:' . curl_error($ch);
		}
		curl_close($ch);
	}
?>