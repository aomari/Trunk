<?php
	if(isset($_POST['method']) and preg_match("/^initChannels$/i", $_POST['method'])) {
		//updateChannel("channel1", 20);
		echo getChannels();
	}
	else if(isset($_POST['method']) and preg_match("/^unsubscribe$/i", $_POST['method'])) {
		updateChannel("channel1", 40);
	}
	
	function getChannels() {
		$sql = "select * FROM channels ORDER BY title";
		try {
			$db = getConnection();
			$stmt = $db->query($sql);
			$shannels = $stmt->fetchAll(PDO::FETCH_OBJ);
			$db = null;
			return json_encode($shannels);
		} catch(PDOException $e) {
			return false;
		}
	}
	function getConnection() {
		$dbhost="127.0.0.1";
		$dbuser="root";
		$dbpass="";
		$dbname="fbcr";
		$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
		$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		return $dbh;
	}
	function updateChannel($id, $count) {
		$sql = "UPDATE channels SET count=:count WHERE id=:id";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("count", $count);
			$stmt->bindParam("id", $id);
			$stmt->execute();
			$db = null;
			return true;
		} catch(PDOException $e) {
			return false;
		}
	}
?>