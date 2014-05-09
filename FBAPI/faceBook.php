<?php
// Remember to copy files from the SDK's src/ directory to a
// directory in your application on the server, such as php-sdk/
require_once('facebook-php-sdk-master/src/facebook.php');

if(isset($_POST['method']) and preg_match("/^initInfo$/i", $_POST['method'])) {
	$config = array(
		'appId'  => '1444087922493003',
		'secret' => 'bb18837f3c18771f61003f64ffd80915',
		'allowSignedRequest' => false // optional but should be set to false for non-canvas apps
	);

	$facebook = new Facebook($config);
	$uid = $facebook->getUser();

	// Login or logout url will be needed depending on current user state.
	if (!$uid) {
		$statusUrl = $facebook->getLoginStatusUrl();
		$loginUrl = $facebook->getLoginUrl(array('scope' => 'email, user_about_me, user_birthday, user_location'));
		
		$str = '<a href=' . $loginUrl . 
		', "fb_popup", "width=600, height=300, toolbar=0, menubar=0, location=0, status=0, scrollbars=0, resizable=0, left=0, top=0");'.
		'return false;">Login with Facebook</a>';
		
		$arr = array('login' => false, 'url' => $str);
		echo json_encode($arr);
	}else{
		$user = $facebook->api('/me');
		$accessToken = $facebook->getAccessToken();
		
		$arr = array('login' => true, 'email' => $user['email'], 'dob' => $user['birthday'], "gender" => $user['gender'], 'name' => $user['username']);
		echo json_encode($arr);
	}
	die();
}
?>