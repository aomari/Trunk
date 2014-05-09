function initChannels() {
	$.ajax({
		type: "POST",
		url: "Ajax/channels.php",
		data: {'method': 'initChannels'},
		dataType: "json",
		async: false,
		success: function(channels){
			channels.forEach(function(obj) {
				channels_obj.push(obj);
			});
		},
		failure: function(errMsg) {
			alert(errMsg);
		},
		error: function (e) {console.log(e);}
	});
}

function unSubscribed() {
	$.ajax({
		type: "POST",
		url: "Ajax/channels.php",
		data: {'method': 'unsubscribe'},
		dataType: "json",
		async: false,
		success: function(){
			console.log("Ajax good");
		},
		failure: function(errMsg) {
			alert(errMsg);
		},
		error: function (e) {console.log(e);}
	});
}