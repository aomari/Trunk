<!DOCTYPE html>
<html ng-app="FBCR">
	<head>
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<script src="js/jquery.js"></script>
		<script src="js/objects.js"></script>
		<script src="js/ajax.js"></script>
		<script src="js/faceBook_main.js"></script>
		<script src="js/faceBook.js"></script>
		<script src="js/script.js"></script>
		<script src="js/angular.min.js"></script>
		<script src="js/controllers.js"></script>
		
		<script src="js/pubnub.min.js"></script>
		<script src="js/pubnub.js"></script>
		
	</head>
	<body>
		<div id="fb-root">
		
			<!-- Left side: Channels list -->
			<div id='chlsList' ng-controller='ChController'>
				<h1>Rooms</h1>
				<ul ng-repeat='channel in channels'>
					<li ng-click="subscribeRoom($index)">
						<img class='channelLogo' ng-src={{channel.img}}>
						<h4>{{channel.id}}</h4>
						<p>{{channel.owner}}</p>
					</li>
				</ul>
			</div>
			
			<!-- Right side: Chat area -->
			<div id='chat' ng-controller="chatRoom">
				<div id='chat-header'>
					<P>{{room.title}}</P>
				</div>
				
				<div id="chat-view">
					<div id="prev_chat"></div>
				</div>
				
				<div id='chat-send'>
					<textarea id="input" placeholder="Your message here..." spellcheck="true" ng-class="{hidden:isActive}"></textarea>
					<button id='button' ng-click="addMsg(newFeed)" ng-class="{hidden:isActive}">Send</button>
				</div>
			</div>
		</div>
	</body>
</html>