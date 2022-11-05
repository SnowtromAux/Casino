let menu = "start";

function start_super_hot(){
	menu = "super_hot";
	document.getElementsByClassName("super_hot_game")[0].style.display = "block";
	document.getElementsByClassName("start_menu")[0].style.display = "none";
}

function stop_super_hot(){
	menu = "start";
	document.getElementsByClassName("super_hot_game")[0].style.display = "none";
	document.getElementsByClassName("start_menu")[0].style.display = "block";	
}