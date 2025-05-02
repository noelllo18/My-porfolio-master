
document.querySelector('.js-btn-rock')
.addEventListener('click', () =>{
    playGame('rock');
});

document.querySelector('.js-btn-paper')
.addEventListener('click', () =>{
    playGame('paper');
});

document.querySelector('.js-btn-scissor')
.addEventListener('click', () =>{
    playGame('scissors');
});

document.body.addEventListener('keydown', (event) =>{
    if(event.key === 'q'){
        playGame('rock');
    }
})

document.body.addEventListener('keydown', (event) =>{
    if(event.key === 'w'){
        playGame('scissors');
    }
})

document.body.addEventListener('keydown', (event) =>{
    if(event.key === 'e'){
        playGame('paper');
    }
})

let score = JSON.parse(localStorage.getItem('score')) ||
{
    wins: 0,
    losses: 0,
    ties: 0
};
 updateScoreElement();

 let isAutoplay = false;
 let intervalId;

 function autoPlay(){
    if(!isAutoplay){
       intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        },1000)
        isAutoplay = true;
    }else{
        clearInterval(intervalId)
        isAutoplay = false;
    }
    
}

const autobotPlay = document.querySelector('.js-auto');
autobotPlay.addEventListener('click', ()=>{
    if(autobotPlay.innerText === 'Autoplay'){
        autobotPlay.innerHTML = 'Stop';
    }
    else{
        autobotPlay.innerHTML = 'Autoplay';
    }
});

function playGame(playerMove){
    const computerMove = pickComputerMove();
    
    let result = '';

    if (playerMove === 'paper'){
    if(computerMove === 'rock'){
      result = 'You win';
    }
    else if (computerMove === 'scissors'){
        result = 'You lose';

    }
    else if (computerMove === 'paper'){
        result = 'tie';
    }
}
    else if(playerMove === 'scissors'){
    if(computerMove === 'rock'){
      result = 'You lose';
    }
    else if (computerMove === 'scissors'){
        result = 'tie';

    }
    else if (computerMove === 'paper'){
        result = 'You win';
    }
} else if(playerMove === 'rock'){
    if(computerMove === 'rock'){
      result = 'tie';
    }
    else if (computerMove === 'scissors'){
        result = 'You win';

    }
    else if (computerMove === 'paper'){
        result = 'You lose';
    }
}

    if(result === 'You win') {
        score.wins += 1;


    }
    else if(result === 'You lose'){
        score.losses += 1;

    }
    else if(result === 'tie'){
        score.ties += 1;
    }
    
    localStorage.getItem('score', JSON.stringify(score));

    updateScoreElement()
     
    
document.querySelector('.js-move')
.innerHTML = `You 
<img src="images/${playerMove}-emoji.png" class="move-icon">  
 <img src="images/${computerMove}-emoji.png" class="move-icon">Computer`;
   
document.querySelector('.js-result')
.innerHTML = `${result}`;


}

function updateScoreElement(){
document.querySelector('.js-score')
.innerHTML = `Wins: ${score.wins}, lose: ${score.losses}, tie: ${score.ties}`;

}




function pickComputerMove(){
   
    const random = Math.random();
    let computerMove = '';




if(random >= 0 && random < 1/3){
    computerMove = 'rock';

}
else if(random >= 1 / 3  && random < 2/3){
    computerMove = 'paper';

}
else if(random >= 2 / 3  && random < 1){
    computerMove = 'scissors';


}
return computerMove;
}

