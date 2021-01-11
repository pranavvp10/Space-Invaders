let setLoader;
let setLevel;

const preLoader=()=>{
  document.getElementById('content').style.display='none'
  document.getElementById("level").style.display='none'
  setLevel=setTimeout(()=>{
    chooseLevel()
  },6000);
  

}

const chooseLevel=()=>{

  document.getElementById("level").style.display='block'
  document.getElementById('content').style.display='none'
  document.getElementById("loader").style.display='none'

  const easyLevel=()=> startPage(400,20)
  const mediumLevel=()=>startPage(300,30)
  const hardLevel=()=>startPage(200,50)

  document.getElementById('easy').addEventListener('click',easyLevel)
  document.getElementById('medium').addEventListener('click',mediumLevel)
  document.getElementById('hard').addEventListener('click',hardLevel)
}


const startPage=(speed,noOfInvaders)=>{
  document.getElementById("level").style.display='none'
  document.getElementById("loader").style.display='none'
  document.getElementById('content').style.display='block'
  const squares = document.querySelectorAll(".grid div")
    let currentShooterIndex =202
    let width =15
    let direction =1
    let currentInvaderIndex=0
    let invaders=[]
    for(let i =0;i<noOfInvaders;i++) invaders.push(i)
    let invaderId
    let invadersTakenDown = []
    let result =0
    const resultDisplay = document.querySelector('#score')
    const playButton = document.getElementById('play-again')
    const gameStatus=document.getElementById('status')
  
  
  
    playButton.style.visibility="hidden"
  
    //drw shooter
    squares[currentShooterIndex].classList.add('shooter')
  
    //move shooter
    const moveShooter=(e)=>{
        squares[currentShooterIndex].classList.remove('shooter')
        switch (e.keyCode) {
            //move left
            case 37:
                if(currentShooterIndex%width !== 0)currentShooterIndex-=1
                break;
            
            //move right
            case 39:
                if(currentShooterIndex%width<width-1)currentShooterIndex+=1
                break;
        }
        squares[currentShooterIndex].classList.add('shooter')
    }
    document.addEventListener('keydown',moveShooter)
  
  
    //drw invader
    invaders.forEach(invader=>squares[currentInvaderIndex+invader].classList.add('invader'))
  
    //move invaders
    const moveInvaders=()=>{
        const leftEdge=invaders[0]%width==0
        const rightEdge=invaders[invaders.length-1]%width==width-1
  
        if((leftEdge && direction ===-1)|| (rightEdge&&direction===1)){
            direction=width
        }
        else if(direction===width){
            if (leftEdge) {
                direction=1
            }
            else direction=-1
        }
        for (let i = 0; i <= invaders.length - 1; i++) {
            squares[invaders[i]].classList.remove('invader')
          }
          for (let i = 0; i <= invaders.length - 1; i++) {
            invaders[i] += direction
          }
          for (let i = 0; i <= invaders.length - 1; i++) {
          //ADD IF LATER
            if (!invadersTakenDown.includes(i)){
              squares[invaders[i]].classList.add('invader')
            }
          }
    
        if(squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
          gameStatus.textContent = 'Game Over'
          squares[currentShooterIndex].classList.add('boom')
          clearInterval(invaderId)
          squares[currentShooterIndex].classList.add('boom')
          window.document.removeEventListener('keyup',shoot)
          playButton.style.visibility="visible"
        }
    
        for (let i = 0; i <= invaders.length - 1; i++){
          if(invaders[i] > (squares.length - (width -1))){
            gameStatus.textContent = 'Game Over'
            clearInterval(invaderId)
            squares[currentShooterIndex].classList.add('boom')
            window.document.removeEventListener('keyup',shoot)
            playButton.style.visibility="visible"
          }
        }
    
        if(invadersTakenDown.length === invaders.length) {
          // console.log(invadersTakenDown.length)
          // console.log(invaders.length)
          gameStatus.textContent = 'You Win'
          clearInterval(invaderId)
          playButton.style.visibility="visible"
        }
        
    }
    invaderId = setInterval(moveInvaders,  parseInt(speed))
  
  
  
     //shoot at aliens
  function shoot(e) {
    let laserId
    let currentLaserIndex = currentShooterIndex


    //move the laser from the shooter to the alien invader
    function moveLaser() {
      squares[currentLaserIndex].classList.remove('laser')
      currentLaserIndex -= width
      squares[currentLaserIndex].classList.add('laser')
      if(squares[currentLaserIndex].classList.contains('invader')) {
        squares[currentLaserIndex].classList.remove('laser')
        squares[currentLaserIndex].classList.remove('invader')
        squares[currentLaserIndex].classList.add('boom')
  
        setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250)
        clearInterval(laserId)

       
        
        const alienTakenDown = invaders.indexOf(currentLaserIndex)
        invadersTakenDown.push(alienTakenDown)
        result++
        resultDisplay.textContent = result
         
      }
  
      if(currentLaserIndex < width) {
        clearInterval(laserId)
        setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 100)
      }
      
    }
  
    switch(e.keyCode) {
      case 32:
        laserId = setInterval(moveLaser, 100)
        break
    }
  }
  
  
  document.addEventListener('keyup', shoot)
  
  const playagain=()=>{
    location.reload();
  }
  playButton.addEventListener('click',playagain)
}


