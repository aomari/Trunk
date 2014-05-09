function fbInit() {
	FB.init({
		appId  : '1444087922493003',
		status : true, // check login status
		cookie : true, // enable cookies to allow the server to access the session
		xfbml  : true  // parse XFBML
	});
	FB.getLoginStatus(function(response) {
		if (response.status == 'connected') {
			getCurrentUserInfo(response)
		} else {
			FB.login(function(response) {
				if (response.authResponse){
					getCurrentUserInfo(response);
				} else {
					top.location.href = 'http://facebook.com';
				}
			}, { scope: 'email, birthday, username, gender'});
		}
	});

	function getCurrentUserInfo() {
		FB.api('/me', function(userInfo) {
			user = new User(userInfo);
			initManagement();
		});
	}
}