
/*Enemy class is able set values for obstacle objects*/
class Enemy {

    constructor(x, y, z) {
        this.x = x; //set x-axis for each obstacle objects.
        this.y = y; //set y-axis for each obstacle objects.
        this.index = z; //index value of obstacle objects.
        this.obstacleMove = 1;
        this.randomXaxis = 0; 

        this.sprite = ['tree.png',
                       'tree.png',
                       'tree.png',
                       'stone1.png',
                       'tree.png',
                       'tree.png',
                       'tree.png',
                       'stone1.png'
        ]; //list of obstacle which used in render method.

    }


    update(dt) {

    this.randomXaxis = Math.floor(Math.random() * (600) + 600); //randomly generating value greater than canvas width.

    if (this.x < this.randomXaxis) { //check value x-axis of each obstacle present in the boundary limit of randomly generated number. 

        this.x += this.obstacleMove * 100 * dt; 

    } else { 

        this.x = -200; 
        this.obstacleMove = Math.floor((Math.random() * 5) + 1); //set each objects to various speed factors(1,2,3,4,5) from the starting point.

    }

}


render() {

    ctx.drawImage(Resources.get(this.sprite[this.index]),this.x,this.y); //draw each and every obstacle to the canvas.

}


};


/**
* @class Player class which contains properties and function of player object. 
*/
class Player {

    constructor() { 

        this.sprite = 'monkey.png'; //initial image of the player

        this.x = 200; //starting location x axis of the player in the board
        this.y = 400; //starting location y axis of the player in the board

        this.previousXaxis = 0; //initial previous locaton x axis set to 0 
        this.previousYaxis = 0; //initial previous location y axis set to 0

        this.axisYstart = -5; //maximum height the player can reach at y-axis.
        this.axisYend = 401; //minimum height of y-axis the player can reach.
        this.axisXstart = -1; //minimum width of x-axis the player can reach.
        this.axisXend = 401; //maximum width the player can reach at x-axis

        this.score = 100; //initial score set to 100.
        this.life = 3; //initial life set to 3.
        this.check = 0; //check = 0 used in update() function to display select character popup. 

        this.enemyGroundone = 76 //y-axis of river 1 called by checkCollisions() method. 
        this.enemyGroundtwo = 157 //y-axis of river 2 called by checkCollisions() method.
        this.enemyGroundthree = 238 //y-axis of river 3 called by checkCollisions() method.

        this.scoreDecrement = 25; 
        this.lifeDecrement = 1; 

        this.hitOne = 68; 
        this.hitTwo = 38; 

        this.coinegoldone = '<img src="coines.png" alt="onecoine" class="coinegold">'; //coines status
        this.coinegoldtwo = '<img src="coines.png" alt="twocoines" class="coinegold">'; 
        this.coinegoldthree = '<img src="coines.png" alt="threecoines" class="coinegold">'; 
        // link for coines : https://www.cleanpng.com/png-sprite-animation-2d-computer-graphics-coin-opengam-645579/download-png.html
        
        this.heart = document.querySelector('.heart').childNodes; //DOM to access life of the player initial 3 hearts.
        this.highScore = document.querySelector('.highscore'); 
        this.coines = document.querySelector('.coines'); 
        this.playerCollection = document.querySelectorAll('.imgselect'); 
        this.alertmessage = document.querySelector('.alertmsg'); //alertmsg "you WON" or "you LOSE" is display in popup at final stage of the game.
        
    }

    update() {

        if (this.check === 0) { //check === 0 for the first time
            modals.style.display = "block"; //then display popup select player of your choice
            this.check += 1; 
        }

    }

    render() {

        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }

    handleInput(key) { 
           
        if (this.y === -5 || this.check === 1 || this.check === 3) { //cannot perform change in x-axis and y-axis.

            console.log("Cannot move");

        } else { 
            (key === 'up') ? this.y -= 81 : (key === 'down') 
                           ? this.y += 81 : (key === 'right') 
                           ? this.x += 100 : (key === 'left') 
                           ? this.x -= 100 : console.log("moved"); 

        }

    }

    checkCollisions() {
        if ((this.axisYstart < this.y && this.y < this.axisYend) && (this.axisXstart < this.x && this.x < this.axisXend)) {
          
            this.previousXaxis = this.x; //storing current location x-axis to previous location x-axis variable.
            this.previousYaxis = this.y; //storing current location y-axis to previous location y-axis variable.

        } else if (this.y > -5) { 
            this.x = this.previousXaxis; 
            this.y = this.previousYaxis; 

        } else {

            setTimeout(this.scoreBoard.bind(this), 1000); //player scoreBoard() method called.

        }

        if (this.y === this.enemyGroundthree) { //check player position at river 3
        
            if (((obstacleEight.x >= this.x - this.hitOne) && (obstacleEight.x <= this.x + this.hitOne)) ||
                ((obstacleSeven.x >= this.x - this.hitTwo) && (obstacleSeven.x <= this.x + this.hitTwo)) ||
                ((obstacleSix.x >= this.x - this.hitTwo) && (obstacleSix.x <= this.x + this.hitTwo))) {

                this.startingPosition(); //reset player to initial position
                this.scoreBoard(); //calculate score

            }

        } else if (this.y === this.enemyGroundtwo) { //check player position at river 2

            if (((obstacleFour.x >= this.x - this.hitOne) && (obstacleFour.x <= this.x + this.hitOne)) ||
                ((obstacleFive.x >= this.x - this.hitOne) && (obstacleFive.x <= this.x + this.hitOne))) {

                this.startingPosition(); //reset player to initial position
                this.scoreBoard(); //calculate score

            }
          
        } else if (this.y === this.enemyGroundone) { //check player position at river 1 

            if (((obstacleOne.x >= this.x - this.hitOne) && (obstacleOne.x <= this.x + this.hitOne)) ||
                ((obstacleTwo.x >= this.x - this.hitOne) && (obstacleTwo.x <= this.x + this.hitOne)) ||
                ((obstacleThree.x >= this.x - this.hitOne) && (obstacleThree.x <= this.x + this.hitOne))) {

                this.startingPosition(); //reset player to initial position
                this.scoreBoard(); //calculate score

            }

        }

    }


    //reset player to starting position of the game.
    startingPosition() {

        this.x = 200;
        this.y = 400;

    }

    scoreBoard() { 

        (this.life === 0 || this.y === this.axisYstart) ? this.finalDisplay() : this.scoreCalculation();  
    }

    scoreCalculation() {
        //initial value of score is 100.
        this.score -= this.scoreDecrement; //for each hit -25 score decremented  
        this.life -= this.lifeDecrement; //each collision life decremented by 1.
        //after 2 life decrease 1 heart
        (this.life === 2) ? this.heart[3].classList.remove("life") : (this.life === 1) ? //after 1 life decrease 2 heart
                            this.heart[5].classList.remove("life") : (this.life === 0) ? //decrease 3 heart
                            this.heart[7].classList.remove("life") : console.log("game is running"); 

    }

    finalDisplay() {
           
        modal.style.display = "block"; 
        this.highScore.innerHTML = this.score; //insert score in popup

        if (this.score === 100) { 
            this.coines.innerHTML = this.coinegoldone + this.coinegoldtwo + this.coinegoldthree;                  
        } else if (this.score === 75) { 
            this.coines.innerHTML = this.coinegoldone + this.coinegoldtwo;                  
        } else if (this.score === 50) { 
            this.coines.innerHTML = this.coinegoldone;                  
        } else {
            this.coines.innerText = 'Sorry, No Coines'; //no coines
        }   
 
        this.check += 1; 
        (this.score < 50) ? this.alertmessage.innerText = 'Sorry..you lose' : this.alertmessage.innerText = 'You Win !!!';

    }

};



//object creation part
//(width,height,indexvalue) of each 8 obstacle objects.
let obstacleOne = new Enemy(0,95,0); 
let obstacleTwo = new Enemy(200,80,1); 
let obstacleThree = new Enemy(400,90,2); 
let obstacleFour = new Enemy(100,170,3); 
let obstacleFive = new Enemy(300,165,4); 
let obstacleSix = new Enemy(500,170,5); 
let obstacleSeven = new Enemy(50,250,6); 
let obstacleEight = new Enemy(50,190,7); 

//creating allEnemies array to insert 8 objects in that array used in render prototype.
let allEnemies = [obstacleOne, obstacleTwo, obstacleThree, obstacleFour, obstacleFive, obstacleSix, obstacleSeven, obstacleEight];

var player = new Player();

//Event Listeners
player.playerCollection.forEach(function (players) { 
    players.addEventListener('click', function () { 
        player.sprite = players.getAttribute('src'); 
        modals.style.display = "none"; 
        player.check += 1; 
    });
});

document.addEventListener('keyup', function (e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});


//reload function is used to reload the entire game.
function reLoad() {
    location.reload();
}