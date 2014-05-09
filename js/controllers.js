var chatApp = angular.module('FBCR', []);

chatApp.service('roomHeaderService', function() {
	var room_name = "Select a room to start...";
	var channel_name;
	
	this.addTitle = function(name) {
		room_name = name;
	};
	this.getTitle = function(){
		return room_name;
	};
	
	this.addChannelId = function(name) {
		channel_name = name;
	};
	this.getChannelId = function(){
		return channel_name;
	};
});

function ChController($scope, roomHeaderService) {
    $scope.channels = channels_obj;
	
	$scope.subscribeRoom = function(index) {
		roomHeaderService.addTitle($scope.channels[index].title);
		roomHeaderService.addChannelId($scope.channels[index].id);
		
		angular.element(document.getElementById('chat')).scope().getRoomName();
		subscripe($scope.channels[index].id);
	};
	
	$scope.setCount = function(channel, count) {
		for(i = 0; i < $scope.channels.length; i++) {
			if($scope.channels[i].id == channel) {
				console.log(channel + " -> a: " + $scope.channels[i].count);
				$scope.channels[i].count = count;
				console.log(channel + " -> b: " + $scope.channels[i].count);
				break;
			}
		}
	};
}

function chatRoom($scope, roomHeaderService) {
	$scope.room = {title: "Select a room to start..."};
	$scope.isActive = true;
	$scope.getRoomName = function (){
		var channel = {	title: roomHeaderService.getTitle(), 
						channelId: roomHeaderService.getChannelId()};
		$scope.room = channel;
		$scope.isActive = false;
	};
}