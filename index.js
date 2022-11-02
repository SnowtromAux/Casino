const reels = [[2, 4, 3, 3, 5, 4, 2, 1, 5, 2, 1, 2, 8, 4, 3, 4, 1, 1, 1, 5, 3, 7],
				[8, 1, 1, 6, 2, 6, 3, 6, 7, 6, 5, 5, 6, 3, 5, 6, 1, 6, 1, 2, 3],
				[6, 3, 4, 3, 3, 1, 8, 5, 4, 3, 6, 2, 6, 1, 6, 2, 5, 6, 2, 7],
				[5, 6, 4, 4, 3, 8, 1, 1, 7, 1, 1, 3, 2, 5, 3, 3, 1, 4, 3, 3, 3, 1, 3, 4, 8, 4, 2, 6, 3, 4, 3, 3, 4, 3, 2, 2, 3, 4],
				[5, 5, 2, 2, 2, 6, 5, 5, 2, 4, 1, 1, 1, 6, 7, 3, 3, 8, 6]];

const line_colors = [
					"yellow", 
					"orange",
					"lightgreen",
					"red",
					"red",
					"darkblue",
					"skyblue",
					"yellow",
					"lightgreen",
					"lightblue",
					"pink",
					"purple",
					"violet",
					"green",
					"blue",
					"pink",
					"purple",
					"yellow",
					"darkorange",
					"gray",
					"skyblue"
					]

const line_count = 20;
let money = 100000, bet_set = 20;
let bet_index = 0;
let coloring;

let col_interval;
const lines = document.getElementsByClassName("line");
const bets = document.getElementsByClassName("bet"); 

const p_money = document.getElementsByClassName("money")[0];
p_money.innerHTML = money + " $";

let line_show = document.getElementsByClassName("winning_line_num")[0];
let win_el = document.getElementsByClassName("winning_element")[0];
let win_bet = document.getElementsByClassName("win_from_line")[0];

let image_matrix = [[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]];
let winning_lines, winning_count;

showImages(image_matrix)



function get_triple(reel){
	let triple = [];
	const index = Math.floor(Math.random() * (reel.length - 1))
	triple.push(reel[index]);
	triple.push(reel[(index+1) % reel.length]);
	triple.push(reel[(index+2) % reel.length]);
	return triple;
}


function spin(){
	money -= bet_set;
	p_money.innerHTML = `${money }$`;
	if(col_interval)clearInterval(col_interval);
	const cur_images = document.getElementsByClassName("gameplay");
	while(cur_images.length > 0)cur_images[0].remove();
	
	let visualize = [];
	let triples = [];

	for(let i = 0;i < reels.length;i++)
		triples.push(get_triple(reels[i]));

	for(let i = 0;i < 3;i++){
		visualize[i] = [];
		for(let j = 0;j < 5;j++){
			visualize[i][j] = triples[j][i];
		}
	}
	total_winnings(visualize, bet_set);
	showImages(visualize);
}

function showImages(final_arr){
	image_matrix = [];
	for(i = 0;i < 3;i++){
		image_matrix[i] = [];
		for(j = 0;j < 5;j++){
			let image = document.createElement("img");
			switch(final_arr[i][j]){
				case 1:
					image.src = "images/cherry.png";
					break;
			
				case 2:
					image.src = "images/orange.png";
					break;

				case 3:
					image.src = "images/lemon.png";
					break;

				case 4:
					image.src = "images/watermelon.png";
					break;

				case 5:
					image.src = "images/plum.png";
					break;

				case 6:
					image.src = "images/grape.png";
					break;

				case 7:
					image.src = "images/7.png";
					break;

				case 8:
					image.src = "images/star.png";
					break;
			}
			image.classList = "gameplay";
			image.style.width = 100 + "%";
			image.style.height = 90 + "%";
			lines[j].append(image);
			image_matrix[i].push(image);
		}
	}
}

function changeBet(bet, index){
	if(index == bet_index)return;
	
	bets[index].style.borderColor = "green";
	bets[bet_index].style.borderColor = "red";
	
	bet_index = index;
	bet_set = bet;
}

let line_code = [
				[1, 1, 1, 1, 1], 
				[0, 0, 0, 0, 0], 
				[2, 2, 2, 2, 2],

				[0, 1, 2, 1, 0],
				[2, 1, 0, 1, 2],

				[0, 0, 1, 2, 2],
				[2, 2, 1, 0, 0],

				[1, 2, 2, 2, 1],
				[1, 0, 0, 0, 1],

				[0, 1, 1, 1, 0],
				[2, 1, 1, 1, 2],

				[1, 2, 1, 0, 1],
				[1, 0, 1, 2, 1],

				[0, 1, 0, 1, 0],
				[2, 1, 2, 1, 2],

				[1, 1, 2, 1, 1],
				[1, 1, 0, 1, 1],

				[0, 2, 0, 2, 0],
				[2, 0, 2, 0, 2],

				[1, 0, 2, 0, 1]
				];

let coefficients = [
					[0.5, 1, 5],
					[0.5, 1, 5],
					[0.5, 1, 5],
					[1, 2, 10],
					[1, 2, 10],
					[1, 4, 20],
					[2, 20, 50],
					[5, 20, 500],
					];

function code_of_line(table, line_num){
	let s = 0;
	for(let i = 0;i < 5;i++){
		s = s*10 + table[line_code[line_num][i]][i];
	}
	return s;
}

function potentialWinningSymbol(n){
	s = Math.floor(n / 100);
	d1 = Math.floor(s / 100);
	d2 = Math.floor((s / 10)) % 10;
	d3 = s % 10;
	d4 = Math.floor((n / 10)) % 10;
	d5 = n % 10;

	if(s % 111 == 0){
		return s % 10;
	}

	if(d1 != 7){
		if(d2 == 7 || d2 == d1){
			if(d3 == 7 || d3 == d1){
				return d1;
			}
			return 0;
		}
		return 0;
	}else{
		if(d2 == 7){
			return d3;
		}else{
			if(d2 == d3){
				return d3;
			}
		}
		return 0;
	}
}

function profitFromCode(n){
	let win_symbol = potentialWinningSymbol(n);
	let bonuses = 0;

	let d4 = Math.floor((n / 10)) % 10;
	let d5 = n % 10;

	if(win_symbol % 8 == 0)return 0;

	if(win_symbol != 7){
		if(d4 != 7){
			if(d4 == win_symbol){
				bonuses++;
				if(d5 == 7 || d5 == win_symbol){
					bonuses++;
				}
			}
		}else{
			bonuses++;
			if(d5 == 7 || d5 == win_symbol){
				bonuses++;
			}
		}
	}else{
		bonuses++;
		if(d4 != 7){
			win_symbol = d4;
			if(d5 == 7 || d5 == win_symbol){
				bonuses++;
			}
		}else{
			bonuses++;
			if(d5 != 7){	
				win_symbol = d5;
			}
		}
		if(win_symbol == 8)return 0;
	}

	return [coefficients[win_symbol - 1][bonuses], bonuses + 3, win_symbol];
}

function scatter_count(arr){
	let scat_count = 0;
	for(i = 0;i < 3;i++){
		for(j = 0;j < 5;j++){
			if(arr[i][j] == 8)scat_count++;
		}
	}
	return scat_count;
}

function win_from_scatter(arr){
	const s = scatter_count(arr);
	if(s < 3)return 0;
	return coefficients[7][s-3];
}

function win_from_lines(arr){
	let winning = 0;
	winning_lines = [];
	winning_symbols = [];
	for(let i = 0;i < line_code.length;i++){
		if(profitFromCode(code_of_line(arr, i))[0])
		winning += profitFromCode(code_of_line(arr, i))[0];
		if(profitFromCode(code_of_line(arr, i))[0] > 0){
			winning_lines.push(i+1);
			winning_symbols.push(profitFromCode(code_of_line(arr, i))[1])
		}

	}
	return winning;
}

function total_winnings(arr, cur_bet){
	const win_total = win_from_lines(arr) + win_from_scatter(arr);
	color_lines(arr, cur_bet);
	money += bet_set * win_total;
	p_money.innerHTML = `${money }$`;
	return win_total;
}

let myel;
function color_lines(arr, cur_bet){
	let win_line = 0;
	if(winning_lines.length > 0){
		col_interval = setInterval(() => {
			if(myel)myel.remove();
			for(let i = 0;i < 3;i++){
				for(let j = 0;j < 5;j++){
					const el = image_matrix[i][j];
					el.style.marginLeft = "0px";
					el.style.border = "0px solid white";
				}
			}
			for(j = 0;j < 5;j++){
				const el = image_matrix[line_code[winning_lines[win_line]-1][j]][j];
				el.style.marginLeft = "-10px";

				if(j < winning_symbols[win_line])
					el.style.border = `10px groove ${line_colors[winning_lines[win_line]]}`;
				else
					el.style.border = `10px dashed ${line_colors[winning_lines[win_line]]}`;
				
			}
			line_show.innerHTML = `Line ${winning_lines[win_line]}`;
			line_show.style.color = line_colors[winning_lines[win_line]]
			myel = document.createElement("img");
			
			ws = profitFromCode(code_of_line(arr, winning_lines[win_line]-1))[2];
			switch(ws){
				case 1:
					myel.src = "images/cherry.png";
					break;
			
				case 2:
					myel.src = "images/orange.png";
					break;

				case 3:
					myel.src = "images/lemon.png";
					break;

				case 4:
					myel.src = "images/watermelon.png";
					break;

				case 5:
					myel.src = "images/plum.png";
					break;

				case 6:
					myel.src = "images/grape.png";
					break;

				case 7:
					myel.src = "images/7.png";
					break;

				case 8:
					myel.src = "images/star.png";
					break;
			}
			
			win_el.appendChild(myel)
			myel.style.width = "100%";
			myel.style.height = "90%";
			myel.style.marginTop = "3px";
			myel.style.marginLeft = "3px";


			let xd = profitFromCode(code_of_line(arr, winning_lines[win_line]-1))[0];

			win_bet.innerHTML = `Win: ${xd * cur_bet} $`;
			
			win_line = (win_line + 1) % winning_lines.length;
		}, 1000);
	}
}
