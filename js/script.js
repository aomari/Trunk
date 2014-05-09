$(document).ready(function(){
	fbInit();
	initChannels();
	//window.onbeforeunload = unsubscribe;
	
	window.onbeforeunload = function(event) {
		unsubscribe();
		// do something
		return null;
	};
	
});
