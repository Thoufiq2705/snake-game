const canvas = document.getElementById('cvs')
const ctx = canvas.getContext('2d')
const gameOver = document.querySelector('.game-over')
const btn = document.querySelector('.play-again')
const currentScore = document.querySelector('.score')
const highScore = document.querySelector('.high-score')
const finalCurrentScore = document.querySelector('.game-over-score .current')
const finalHighScore = document.querySelector('.game-over-score .high')

canvas.style.border = '1px solid white'


// Game dimensions and loops
const width = canvas.width, height = canvas.height
let UNITS = 25

//score variables
let score = 0
let higHScoreNew = localStorage.getItem("highscore") || 0

// Food Functions
let foodX, foodY
const createFood = () => {
    foodX = Math.floor(Math.random() * width / UNITS) * UNITS
    foodY = Math.floor(Math.random() * height / UNITS) * UNITS
}
const displayFood = () => {
    ctx.fillStyle = '#FFC83D'
    ctx.fillRect(foodX,foodY,UNITS,UNITS)
    ctx.strokeRect(foodX,foodY,UNITS,UNITS)
}
//-------------------------------------------------//

// Snake Showing Functions
let xVelocity = 25 , yVelocity = 0
let snakeBody = [
    {x : UNITS * 3 , y : 0} ,
    {x : UNITS * 2 , y : 0} ,
    {x : UNITS , y : 0} ,
    {x : 0 , y : 0}
]

const displaySnake = () => {
    ctx.strokeStyle = "black"
    snakeBody.forEach((snake, index) => {
        ctx.fillStyle = index === 0 ? "#FFFFFF" : "#999999" /** */
        ctx.fillRect(snake.x,snake.y,UNITS,UNITS)
        ctx.strokeRect(snake.x,snake.y,UNITS,UNITS)
    })
}
const moveSnake = () => {
    const snakeHead = { x : snakeBody[0].x + xVelocity , y : snakeBody[0].y + yVelocity}
    snakeBody.unshift(snakeHead)
    // Increasing Snake by food
    if (snakeBody[0].x === foodX && snakeBody[0].y === foodY){
        createFood()
        score += 1
        higHScoreNew = score >= higHScoreNew ? score : higHScoreNew;
        localStorage.setItem('highscore', higHScoreNew);
    } else {
        snakeBody.pop()
    }    
    for (let i = 1; i < snakeBody.length; i++) {
        const element = snakeBody[i];
        if (snakeHead.x == element.x && snakeHead.y == element.y) {
            isTail = true
            console.log('Hi');
            gameEnd()
        }
    }    

    currentScore.innerHTML = `⭐ Score: ${score}`
    highScore.innerHTML = `⭐ High-Score: ${higHScoreNew}`
    finalCurrentScore.innerHTML = `⭐ Score: ${score}`
    finalHighScore.innerHTML = `⭐ High-Score: ${higHScoreNew}`
    
}
//-------------------------------------------------//

//KeyBoard Event Functions
let isActive = false
const keyControl = (e) => {
    if (!isActive) {
        isActive = true
        gameLoop()
    }
    switch (true) {
        case (e.code === "ArrowLeft" && xVelocity !== UNITS):
            xVelocity = -UNITS
            yVelocity = 0
            break;
        case (e.code === "ArrowRight" && xVelocity !== -UNITS):
            xVelocity = UNITS
            yVelocity = 0
            break
        case (e.code === "ArrowUp" && yVelocity !== UNITS):
            xVelocity = 0
            yVelocity = -UNITS
            break
        case (e.code === "ArrowDown" && yVelocity !== -UNITS):
            xVelocity = 0
            yVelocity = UNITS
            break
}
}
//-------------------------------------------------//

// clear functions 
const clearAll = () => {
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,width,height)
}
//-------------------------------------------------//

//gameEnd Conditions and Funtions
let isTail = false
const gameEnd = () => {
    if ((snakeBody[0].x > width || snakeBody[0].y > height) || snakeBody[0].x < 0 || snakeBody[0].y < 0 || (isTail))  {
       clearInterval(gameLoop())
       gameOver.classList.remove('hide')
    }
}

//-------------------------------------------------//

//gamestart Functions
const gameStart = () => {
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,width,height)
    createFood()
    displayFood()
    gameLoop()
}
const gameLoop = () => {
    if (isActive) {
    setTimeout(() => {
        clearAll()
        displayFood()
        displaySnake()
        moveSnake()
        gameEnd()
        gameLoop()
    }, 1000/12);
    }
}




gameStart()
displaySnake()
document.addEventListener('keydown', keyControl)
btn.addEventListener('click', ()=>{location.reload()})