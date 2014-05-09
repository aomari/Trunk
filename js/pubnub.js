var pubnub;
var tmpChannel;
function initManagement() {
	pubnub = PUBNUB.init({
						publish_key: 'pub-c-0ca971be-114a-4a88-b6fb-3ce83269aa58',
						subscribe_key: 'sub-c-93de1d1c-a245-11e3-afcb-02ee2ddab7fe',
						uuid : user.getEmail()});
	
	pubnub.subscribe({
		channel  : mngChannel,
		callback : mngReceived
	});
	
	function mngReceived(data) {
		console.log(data);
	}
	
	channels_obj.forEach(function(obj) {
		tmpChannel = obj['id'];
		console.log("start " + tmpChannel);
		pubnub.here_now({
			channel  : tmpChannel,
			callback : getSubscribers
		});
	});
}

function getSubscribers(uuids) {
		console.log(uuids['occupancy']);
		console.log(uuids);
		angular.element(document.getElementById('chlsList')).scope().setCount(tmpChannel, uuids['occupancy']);
}

function subscripe(channel) {
	if(activeRoom == null) {
		pubnubBind();
	}
	if(channel != activeRoom) {
		if(activeRoom != null) {
			unsubscribe();
		}
		pubnub.subscribe({
			channel  : channel,
			presence : presence,
			callback : received_msg
		});
		activeRoom = channel;
	}
}

function unsubscribe() {
	if(activeRoom) {
		pubnub.here_now({
			channel  : activeRoom,
			callback : here_now
		});
		pubnub.unsubscribe({
			channel : activeRoom,
			x		: (document.getElementById("prev_chat").innerHTML = '')
		});	
	}
}

function here_now(uuids) {
	var msg = "User " + uuids['uuids'] + " leaved, occupancy: " + (uuids['occupancy'] - 1);
	pubnub.publish({
		channel : mngChannel,
		message : msg
	});
}

function presence(what) {
	/*console.log(what['action']);
	console.log(what['timestamp']);
	console.log(what['uuid']);
	console.log(what['occupancy']);*/
}

function received_msg(data) {
	html = "<div><img src='" + data["pic"] + "'> " + data['msg'] + "</div>";
	document.getElementById("prev_chat").innerHTML += html;
}

function pubnubBind() {
	pubnub.bind('click', button, function() {
		var msg = input.value;
		msg = msg.replace(/(^\s+|\s+$)/g,'');
		if(msg != "" && msg.length > 0) {
			pubnub.publish({
				channel : activeRoom,
				message : {"pic": user.getPicURL(), "msg": msg},
				x : (input.value='')
			});
		}
	});
	
	pubnub.bind('keyup', input, function(e) {
		var msg = input.value;
		msg = msg.replace(/(^\s+|\s+$)/g,'');
		if(msg != "" && msg.length > 0) {
			(e.keyCode || e.charCode) === 13 && pubnub.publish({
				channel : activeRoom,
				message : {"pic": user.getPicURL(), "msg": input.value},
				x : (input.value='')
			});
		}
	});
}