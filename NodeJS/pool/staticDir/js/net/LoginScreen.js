function LoginScreen() {
    console.log("New LoginScreen")

    var loginScreen = $("<DIV>");
    loginScreen.attr("id", "loginScreen");
    loginScreen.attr("class", "fullScreen");
    loginScreen.css("display", "block");
    $("body").append(loginScreen)

    var textDiv = $("<DIV>");
    textDiv.attr("id", "textDivLogin");
    textDiv.attr("class", "textDiv");
    textDiv.html("Pool Game 3D");
    loginScreen.append(textDiv)

    var loginDiv = $("<DIV>");
    loginDiv.attr("id", "loginDiv");
    loginDiv.attr("class", "loginDiv")
    loginScreen.append(loginDiv)

    var loginInput = $("<INPUT>");
    loginInput.attr("id", "loginInput");
    loginInput.attr("type", "text");
    loginInput.attr("class", "input")
    loginInput.attr("placeholder", "Login")
    loginDiv.append(loginInput)

    var passwordInput = $("<INPUT>");
    passwordInput.attr("id", "passwordInput");
    passwordInput.attr("type", "password");
    passwordInput.attr("class", "input")
    passwordInput.attr("placeholder", "Password")
    loginDiv.append(passwordInput)

    var loginButton = $("<BUTTON>");
    loginButton.attr("id", "loginButton");
    loginButton.attr("class", "button")
    loginButton.html("LOG IN");
    loginDiv.append(loginButton)

    var registerButton = $("<BUTTON>");
    registerButton.attr("id", "registerButton");
    registerButton.attr("class", "button")
    registerButton.html("REGISTER");
    loginDiv.append(registerButton)

    var infoDiv = $("<DIV>");
    infoDiv.attr("id", "infoDiv")
    loginScreen.append(infoDiv)

    var resetButton = $("<BUTTON>");
    resetButton.attr("id", "resetButton");
    resetButton.attr("class", "button")
    resetButton.html("RESET");
    $("body").append(resetButton)

    this.show = function () {
        loginScreen.css("display", "block");
    }

    this.hide = function () {
        loginScreen.css("display", "none");
    }

    var tab = ["<script>", " "];

    function verifyInput(val) {
        if (val == "")
            return false;
        else
            for (var i = 0; i < tab.length; i++) {
                if (val.indexOf(tab[i]) != -1)
                    return false;
            }
        return true;
    }

    function verifyInputWithInfo(login, passwd) {
        if (verifyInput(login) == false) {
            setInfo("Login contains restricted sign.", 3000)
            return false;
        }
        else
            if (verifyInput(passwd) == false) {
                setInfo("Password contains restricted sign.", 3000)
                return false;
            }
            else {
                return true;
            }
    }

    this.setInfo = function (text, time) {
        setInfo(text, time);
    }

    function setInfo(text, time) {
        infoDiv.html(text)
        if (time == 0)
            return;
        else {
            setTimeout(function () {
                infoDiv.html("")
            }, time)
        }
    }
    resetButton.on("click", function () {
        console.log("RESET")
        net.DBreset();
        location.reload()
    })

    loginButton.on("click", function () {
        console.log("Log in")
        var login = loginInput.val();
        var passwd = passwordInput.val()
        if (verifyInputWithInfo(login, passwd)) {
            console.log("Both correct")
            net.DBselect(login, passwd)
        }
        
    })

    registerButton.on("click", function () {
        console.log("Register")
        var login = loginInput.val();
        var passwd = passwordInput.val()
        if (verifyInputWithInfo(login, passwd)) {
            console.log("Both correct")
            net.DBinsert(login, passwd)
        }
        
    })

}