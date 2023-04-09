let menu = "start";

function makeName(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
class Profile{
	constructor(loggedIn, username, picture, money){
		this.loggedIn = loggedIn;
		this.username = username;
		this.picture = picture;
		this.money = money;
	}
}


let player = new Profile(false, makeName(6), "./Images/unlogged_user.png", 100000)
document.getElementsByClassName("username")[0].innerHTML = "" + player.username;

//Game 1
function start_super_hot(){
	menu = "super_hot";
	document.getElementsByClassName("super_hot_game")[0].style.display = "block";
	document.getElementsByClassName("start_menu")[0].style.display = "none";
	document.getElementsByClassName("super_hot_game")[0]
			.getElementsByClassName("money")[0]
			.innerHTML = "" + player.money;	
}

function stop_super_hot(){
	menu = "start";
	document.getElementsByClassName("super_hot_game")[0].style.display = "none";
	document.getElementsByClassName("start_menu")[0].style.display = "block";
}



//Game 2
function start_aviator(){
	menu = "aviator";
	document.getElementsByClassName("aviator_game")[0].style.display = "block";
	document.getElementsByClassName("start_menu")[0].style.display = "none";
	document.getElementsByClassName("aviator_game")[0]
        .getElementsByClassName("money")[0]
        .innerHTML = "" + player.money;
}

//Game 3
function start_monopoly(){
	menu = "monopoly";
	document.getElementsByClassName("monopoly")[0].style.display = "block";
	document.getElementById("myCanvas").style.display = "block";
	document.getElementsByClassName("start_menu")[0].style.display = "none";
	monopoly_game();
}