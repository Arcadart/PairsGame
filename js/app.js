//Variables
let uncoverCards = 0;
let cardA = 0;
let cardB = 0;
let timer = 30;
let score = 0;
let resultA=0;
let resultB=0;
let moves=0;
let numbersArray = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
let startTimer= false;
let timeID = null;
let win = false;

function initializeVariables(){
	//Variables
	uncoverCards = 0;
	cardA = 0;
	cardB = 0;
	timer = 30;
	score = 0;
	resultA = 0;
	resultB = 0;
	moves = 0;
	numbersArray = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
	document.getElementById("moves").innerHTML = "Moves: "+moves;
	document.getElementById("score").innerHTML = "Score: "+score;
	document.getElementById("time").innerHTML = "Time: "+ timer;
	startTimer= false;
	timeID = null;
	win = false;
}

initializeVariables();

randomizeArray();

//Close modal
function closeModal(){
	document.querySelector(".modal").classList.remove("show");
	document.querySelector(".modal").style.display = "none";
}

function showModal(win){
	if(win==true){
		let title = document.getElementById("modal-title");
		title.innerHTML = "You Win!";
		let p = document.getElementById("modal-p");
		p.innerHTML = "You have find all the pairs!";
	}else{
		let title = document.getElementById("modal-title");
		title.innerHTML = "You Loose!";
		let p = document.getElementById("modal-p");
		p.innerHTML = "Try again!";
	}
	document.querySelector(".modal").classList.add("show");
	document.querySelector(".modal").style.display = "block";
	
}

//Randomize Array
function randomizeArray(){
	numbersArray = numbersArray.sort(()=>{return Math.random() -0.5});
	console.log(numbersArray);
}

//Uncover cards
function uncover(id){
	if(startTimer == false){
		startTimerF();
		startTimer = true;
	}
	uncoverCards++;

	if(uncoverCards == 1){
		cardA = document.getElementById(id);
		resultA = numbersArray[id]
		cardA.innerHTML = resultA;
		console.log(cardA.innerHTML);

		cardA.disabled = true;

	}else if(uncoverCards == 2){
		cardB = document.getElementById(id);
		resultB = numbersArray[id]
		cardB.innerHTML = resultB;
 
		cardB.disabled = true;
		uncoverCards++;
		moves++;
		document.getElementById("moves").innerHTML = "Moves: "+moves;


		if(resultA == resultB){
			score++;
			uncoverCards = 0;
			document.getElementById("score").innerHTML = "Score: "+score;
			if(score == 8){
				win=true;
				showModal(win);
			}
		}else{
			cardA.classList.add("btn-danger");
			cardB.classList.add("btn-danger");
			setTimeout(()=>{
				cardA.innerHTML = ' ';
				cardB.innerHTML = ' ';
				cardA.disabled = false;
				cardB.disabled = false;
				uncoverCards = 0;
				cardA.classList.remove("btn-danger");
				cardB.classList.remove("btn-danger");
			},600);
		}
	}
}

function startTimerF(){
		timeID = setInterval(()=>{
			timer--;
			document.getElementById("time").innerHTML = "Time: "+ timer;
			if(timer == 0){
				clearInterval(timeID);
				if(score<8){
					win=false;
					showModal(win);	
				}
			}
			if(win==true){
				clearInterval(timeID);
			}
		},1000);
}


function restartGame(){
	randomizeArray();
	initializeVariables();
	for(let i=0; i<16; i++){
		document.getElementById(i).innerHTML = ' ';
		document.getElementById(i).disabled = false;
	}
	closeModal();
}
