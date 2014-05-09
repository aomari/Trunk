/*var user = new User({	'id': '123',
						'name': "amjad",
						'mail': "amjadmail",
						'dob': '1/2/3',
						'gender': "male"});
*/
var User = function(userInfo){
	this.id		= userInfo.id;
	this.name	= userInfo.name;
	this.mail	= userInfo.email;
	this.dob	= userInfo.birthday;
	this.gender	= userInfo.gender;
	this.pic	= null;
};

User.prototype.getId = function(){
  return this.id;
};

User.prototype.getName = function(){
  return this.name;
};

User.prototype.getEmail = function(){
  return this.mail;
};

User.prototype.getBirthDay = function(){
  return this.dob;
};

User.prototype.getGender = function(){
  return this.gender;
};

User.prototype.getPicURL = function(){
  return 'https://graph.facebook.com/' + this.id + '/picture';
};

var user;

/****************************************************************************/

var channels_obj = new Array();

/****************************************************************************/

var activeRoom = null;

/****************************************************************************/

var mngChannel = "management";