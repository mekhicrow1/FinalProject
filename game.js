const spanPlayer=document.querySelector(".player");
const grid=document.querySelector(".grid");
const timer=document.querySelector(".timer");

const characters=[
	'okcpng',
	'okcpng2'
];

let firstCard="";
let secondCard="";


const startTimer=()=>{
	this.loop=setInterval(()=>{
		currentTime=+timer.innerHTML;
		timer.innerHTML=currentTime+1;
	}, 
	1000);
};

startTimer();


function speakAddress(address) {
	if ('speechSynthesis' in window) {
		var speech = new SpeechSynthesisUtterance(address);
		speech.lang = 'en-US'; // Set the language to English
		window.speechSynthesis.speak(speech);
		} else {
		console.log("Speech synthesis not supported in this browser.");
    }
}

speakAddress("I failed HCI course since I always attended by Teams");

const creatElement=(tag,className)=>{
	const element=document.createElement(tag);
	element.className=className;
	return element;
};

const creatCard=(characters)=>{
	const card=creatElement('div','card');
	const front=creatElement('div','face front');
	const back=creatElement('div','face back');
	front.style.backgroundImage=`url('../images/${characters}.png')`;
	card.appendChild(front);
	card.appendChild(back);
	card.addEventListener('click',revealCard);
	card.setAttribute('data-character',characters);//Note 13
	return card;
};

const revealCard=(event)=>{
	//console.log("I am clicked!");
	const target=event.target;

	
	if (target.parentNode.className.includes('reveal-card')){
		return;
	}
	
	if (firstCard===''){
		target.parentNode.classList.add('reveal-card');
		firstCard=target.parentNode;
	}else if (secondCard===''){
		target.parentNode.classList.add('reveal-card');
		secondCard=target.parentNode;
		
		setTimeout(()=>checkCards(),2000);
		
	}
	
};

const loadGame=()=>{
	const repeatedCards=[...characters,...characters];//Note 14
	const shuffledArray=repeatedCards.sort(()=>Math.random()-0.5);//Note 15
	shuffledArray.forEach((characters)=>{//Note 16
		const card=creatCard(characters);
		grid.appendChild(card);
	});
};

loadGame();

let matchCount=0;

const checkCards=()=>{
	const firstCharacter=firstCard.getAttribute('data-character');
    const secondCharacter=secondCard.getAttribute('data-character');
	
	if (firstCharacter===secondCharacter){
		firstCard.firstChild.classList.add('disabled-card');
		secondCard.firstChild.classList.add('disabled-card');
		matchCount=matchCount+2;
		
		firstCard="";
		secondCard="";
	}else{
		setTimeout( ()=>{
				firstCard.classList.remove('reveal-card');
				firstCard="";
		
				secondCard.classList.remove('reveal-card');
				secondCard="";	
			}, 1000 
		);

	}
	
};









