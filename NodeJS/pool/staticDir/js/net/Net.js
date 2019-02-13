function Net() {
    var client = io();

    this.getClient = function () {
        return client;
    }
    client.on("onconnect", function (data) {
        console.log(data.clientName + " : " + data.userNr + " : " + data.alreadyGame)
        if (data.alreadyGame == true) {
            waitingScreen.thirdPlayer()
        }
        playerNr = data.userNr
        console.log(playerNr)
        if (playerNr == 1) {
            //$("#loginInput").val("a")
            //$("#passwordInput").val("a")
        } else {
            //$("#loginInput").val("b")
            //$("#passwordInput").val("b")
        }
    })

    this.DBreset = function () {
        client.emit("DBreset", {

        })
    }

    this.DBinsert = function (login, passwd) {
        client.emit("DBinsert", {
            login: login,
            password: passwd,
        })
    }

    client.on("alreadyExists", function (data) {
        loginScreen.setInfo(data.response, 3000)
    })

    this.DBselect = function (login, passwd) {
        client.emit("DBselect", {
            playerNr: playerNr,
            login: login,
            password: passwd,
        })
    }

    client.on("loggedin", function (data) {
        if (data.tab == false)
        {
            loginScreen.setInfo(data.response, 3000)
        }
        else {
            loginScreen.setInfo("Login and password correct.", 3000)
            loginScreen.hide();
        }
    })

    client.on("all_logged", function (data) {
        console.log("All logged")
        if (playerNr < 3) {
            
            main = new Main()
            ui = new UI()          
        }
        if (playerNr == 1) {
            player2.nick = data.user2Login 
            player1.nick = data.user1Login 
            mymove = true;
            console.log("MY MOVE")
            main.clearPlayerVelocity()
        }
        if (playerNr == 2) {
            player2.nick = data.user1Login 
            player1.nick = data.user2Login 
            mymove = false;
            console.log("NOT MY MOVE")
        }
        ui.setNameDiv1(player1.nick)
        ui.setNameDiv2(player2.nick)
        ui.setMove()
    })
    client.on("update", function (data) {
        if (playerNr < 3) {
            main.setScene(data)
        }
    })

    client.on("moveEnd", function (data) {
        console.log("MY MOVE")
        mymove = true;
        //main.setCorrectHit(false)
        ui.setMove()
		ui.startTimer2()
    })

    client.on("ballChosen", function (data) {
        
        player2.ball = data.ball
        if (data.ball == "full") {
            player1.ball="half"
        }
        else {
            player1.ball = "full"
        }
        console.log("ENEMY CHOOSED " + data.ball + " AND " + player1.ball + " LEFT FOR ME")
        ui.setBall()
    })

    client.on("end", function (data) {

        if (data.state == "lost") {
            console.log("YOU LOST")
            waitingScreen.endGame(false)
        } else {
            console.log("YOU WON")
            waitingScreen.endGame(true)
        }
        ui.stopTimer1()
        ui.stopTimer2()
        main.setBlockade(true)

    })

    client.on("score", function (data) {

        player2.score = data.score

        ui.setScore()

    })
    client.on("score2", function (data) {

        player1.score = data.score

        ui.setScore()

    })
    client.on("refresh", function (data) {
        location.reload()
    })

    client.on("timer", function () {
        ui.startTimer2()
    })

}