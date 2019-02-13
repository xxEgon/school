function Scoreboard() {
	
	var scoreNumber;
	var over1;
	var highScoreNumber;
	var gameOver;
    var lifeDiv;
    var oneDiv;
	
    this.init = function () {

        var score = document.createElement("IMG");
        score.setAttribute("id", "score");
        score.setAttribute("src", links.img.scoreboard.score);
        document.getElementById("scoreboard").appendChild(score);

        over1 = document.createElement("IMG");
        over1.setAttribute("id", "over");
        over1.setAttribute("src", links.img.scoreboard.over);
        document.getElementById("scoreboard").appendChild(over1);

        oneDiv = document.createElement("IMG");
        oneDiv.setAttribute("id", "one");
        oneDiv.setAttribute("src", links.img.scoreboard.one);
        document.getElementById("scoreboard").appendChild(oneDiv);
		
		scoreNumber = document.createElement("DIV");
        scoreNumber.setAttribute("id", "scoreNumber");
		scoreNumber.innerHTML = "0"
        document.getElementById("scoreboard").appendChild(scoreNumber);
		
		highScoreNumber = document.createElement("DIV");
        highScoreNumber.setAttribute("id", "highScoreNumber");
		highScoreNumber.innerHTML = "0"
        document.getElementById("scoreboard").appendChild(highScoreNumber);	

		gameOver = document.createElement("DIV");
        gameOver.setAttribute("id", "gameOver");
        document.getElementById("scoreboard").appendChild(gameOver);	

		lifeDiv = document.createElement("DIV");
        lifeDiv.setAttribute("id", "lifeDiv");
        document.getElementById("scoreboard").appendChild(lifeDiv);	

		for(var i=0;i<4;i++) {
			var lifeImg;
			lifeImg = document.createElement("DIV");
			lifeImg.setAttribute("class", "lifeImg");
			document.getElementById("lifeDiv").appendChild(lifeImg);	
		}

    }
	
	this.scoreFlower = function () {
		scoreboard.score+= 50;
		scoreNumber.innerHTML = scoreboard.score;
        objects.allElements--;
		scoreboard.checkWin()
	}
	this.scoreKey = function () {
		scoreboard.score+= 100;
		scoreNumber.innerHTML = scoreboard.score;		
        objects.allElements--;
		scoreboard.checkWin()
	}
	this.checkWin = function () {
        if (objects.allElements == 0)
		{
			console.log("GAME OVER - YOU WIN")
			gameOver.style.display = "block";
			over1.style.display = "block";
			setTimeout(function(){ location.reload(); }, 7000)
		}		
	}	
    this.dead = function () {		
        scoreboard.life--;
		if(scoreboard.life == 0) {
			console.log("GAME OVER - YOU LOST")
			gameOver.style.display = "block";
			over1.style.display = "block";
			setTimeout(function(){ location.reload(); }, 7000)
		}
        else {
			console.log(scoreboard.life + "LEFT.")
            if (lifeDiv.children.length>0){
                lifeDiv.removeChild(lifeDiv.firstChild);
            }
           
		}
	}
	
	this.score = 0;
	
	this.life = 5;
}