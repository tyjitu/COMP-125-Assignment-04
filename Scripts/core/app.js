(function () {
    // Function scoped Variables
    let stage;
    let assets;
    let slotMachineBackground;
    let spinButton;
    let bet1Button;
    let bet10Button;
    let bet100Button;
    let betMaxButton;
    let resetButton;
    let quitButton;
    let jackPotLabel;
    let creditLabel;
    let winningsLabel;
    let betLabel;
    let leftReel;
    let middleReel;
    let rightReel;
    let betLine;
    // symbol tallies
    let lossNumber = 0;
    let winNumber = 0;
    let playerMoney = 1000;
    let winnings = 0;
    let jackpot = 5000;
    let playerBet = 0;
    let fruits = "";
    let spinResult;
    let grapes = 0;
    let bananas = 0;
    let oranges = 0;
    let cherries = 0;
    let bars = 0;
    let bells = 0;
    let sevens = 0;
    let blanks = 0;
    /* Utility function to reset the player stats */
    function resetAll() {
        playerMoney = 1000;
        creditLabel.text = "1000";
        winnings = 0;
        jackpot = 5000;
        jackPotLabel.text = "5000";
        winningsLabel.text = "0";
        playerBet = 0;
    }
    let manifest = [
        { id: "background", src: "./Assets/images/background.png" },
        { id: "banana", src: "./Assets/images/banana.gif" },
        { id: "bar", src: "./Assets/images/bar.gif" },
        { id: "bell", src: "./Assets/images/bell.gif" },
        { id: "bet_line", src: "./Assets/images/bet_line.gif" },
        { id: "bet1Button", src: "./Assets/images/bet1Button.png" },
        { id: "bet10Button", src: "./Assets/images/bet10Button.png" },
        { id: "bet100Button", src: "./Assets/images/bet100Button.png" },
        { id: "betMaxButton", src: "./Assets/images/betMaxButton.png" },
        { id: "blank", src: "./Assets/images/blank.gif" },
        { id: "cherry", src: "./Assets/images/cherry.gif" },
        { id: "grapes", src: "./Assets/images/grapes.gif" },
        { id: "orange", src: "./Assets/images/orange.gif" },
        { id: "seven", src: "./Assets/images/seven.gif" },
        { id: "spinButton", src: "./Assets/images/spinButton.png" },
        { id: "resetButton", src: "./Assets/images/resetButton.png" },
        { id: "quitButton", src: "./Assets/images/quitButton.png" },
    ];
    // This function triggers first and "Preloads" all the assets
    function Preload() {
        assets = new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on("complete", Start);
        assets.loadManifest(manifest);
    }
    // This function triggers after everything has been preloaded
    // This function is used for config and initialization
    function Start() {
        console.log("App Started...");
        let canvas = document.getElementById("canvas");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS or 16.667 ms
        createjs.Ticker.on("tick", Update);
        stage.enableMouseOver(20);
        Config.Globals.AssetManifest = assets;
        Main();
    }
    // called every frame
    function Update() {
        stage.update();
    }
    /* Utility function to check if a value falls within a range of bounds */
    function checkRange(value, lowerBounds, upperBounds) {
        if (value >= lowerBounds && value <= upperBounds) {
            return value;
        }
        else {
            return !value;
        }
    }
    /* Check to see if the player won the jackpot */
    function checkJackPot() {
        /* compare two random values */
        let jackPotTry = Math.floor(Math.random() * 51 + 1);
        let jackPotWin = Math.floor(Math.random() * 51 + 1);
        if (jackPotTry == jackPotWin) {
            alert("You Won the $" + jackpot + " Jackpot!!");
            //nice to have: update the messageLable
            playerMoney += jackpot;
            jackpot = 5000;
        }
    }
    /* Utility function to reset all fruit tallies */
    function resetFruitTally() {
        grapes = 0;
        bananas = 0;
        oranges = 0;
        cherries = 0;
        bars = 0;
        bells = 0;
        sevens = 0;
        blanks = 0;
    }
    /* Utility function to show a win message and increase player money */
    function showWinMessage() {
        playerMoney = playerMoney + winnings;
        console.log("You Won: $" + winnings);
        console.log("Your Credits: $" + playerMoney);
        winningsLabel.setText(winnings.toString());
        checkJackPot();
        // TODO: Update the creditLabel
        // creditLabel.setText(playerMoney.toString());
        jackPotLabel.setText(jackpot.toString());
        resetFruitTally();
        playerBet = 0;
        winnings = 0;
        creditLabel.setText(playerMoney.toString());
        betLabel.setText(playerBet.toString());
        winningsLabel.setText(winnings.toString());
    }
    /* Utility function to show a loss message and reduce player money */
    function showLossMessage() {
        playerMoney -= playerBet;
        console.log("You Lost1:: $" + playerBet);
        console.log("Your Credits:: $" + playerMoney);
        // TODO: update creditLabel
        // creditLabel.setText(playerMoney.toString());
        resetFruitTally();
        playerBet = 0;
        winnings = 0;
        console.log("You Lost2: Before setting creditLabel");
        creditLabel.setText(playerMoney.toString());
        console.log("You Lost3: After setting creditLabel");
        betLabel.setText(playerBet.toString());
        winningsLabel.setText(winnings.toString());
    }
    /* When this function is called it determines the betLine results.
    e.g. Bar - Orange - Banana */
    function Reels() {
        var betLine = [" ", " ", " "];
        var outCome = [0, 0, 0];
        for (var spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[spin]) {
                case checkRange(outCome[spin], 1, 27): // 41.5% probability
                    betLine[spin] = "blank";
                    blanks++;
                    break;
                case checkRange(outCome[spin], 28, 37): // 15.4% probability
                    betLine[spin] = "grapes";
                    grapes++;
                    break;
                case checkRange(outCome[spin], 38, 46): // 13.8% probability
                    betLine[spin] = "banana";
                    bananas++;
                    break;
                case checkRange(outCome[spin], 47, 54): // 12.3% probability
                    betLine[spin] = "orange";
                    oranges++;
                    break;
                case checkRange(outCome[spin], 55, 59): //  7.7% probability
                    betLine[spin] = "cherry";
                    cherries++;
                    break;
                case checkRange(outCome[spin], 60, 62): //  4.6% probability
                    betLine[spin] = "bar";
                    bars++;
                    break;
                case checkRange(outCome[spin], 63, 64): //  3.1% probability
                    betLine[spin] = "bell";
                    bells++;
                    break;
                case checkRange(outCome[spin], 65, 65): //  1.5% probability
                    betLine[spin] = "seven";
                    sevens++;
                    break;
            }
        }
        return betLine;
    }
    /* This function calculates the player's winnings, if any */
    function determineWinnings() {
        if (blanks == 0) {
            if (grapes == 3) {
                winnings = playerBet * 10;
            }
            else if (bananas == 3) {
                winnings = playerBet * 20;
            }
            else if (oranges == 3) {
                winnings = playerBet * 30;
            }
            else if (cherries == 3) {
                winnings = playerBet * 40;
            }
            else if (bars == 3) {
                winnings = playerBet * 50;
            }
            else if (bells == 3) {
                winnings = playerBet * 75;
            }
            else if (sevens == 3) {
                winnings = playerBet * 100;
            }
            else if (grapes == 2) {
                winnings = playerBet * 2;
            }
            else if (bananas == 2) {
                winnings = playerBet * 2;
            }
            else if (oranges == 2) {
                winnings = playerBet * 3;
            }
            else if (cherries == 2) {
                winnings = playerBet * 4;
            }
            else if (bars == 2) {
                winnings = playerBet * 5;
            }
            else if (bells == 2) {
                winnings = playerBet * 10;
            }
            else if (sevens == 2) {
                winnings = playerBet * 20;
            }
            else if (sevens == 1) {
                winnings = playerBet * 5;
            }
            else {
                winnings = playerBet * 1;
            }
            showWinMessage();
            console.log("YOU WIN, Tam");
        }
        else {
            showLossMessage();
            console.log("YOU LOST4, Tam");
        }
    }
    function buildInterface() {
        // Slot Machine Background
        slotMachineBackground = new Core.GameObject("background", Config.Screen.CENTER_X, Config.Screen.CENTER_Y, true);
        stage.addChild(slotMachineBackground);
        // Buttons
        spinButton = new UIObjects.Button("spinButton", Config.Screen.CENTER_X + 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(spinButton);
        bet1Button = new UIObjects.Button("bet1Button", Config.Screen.CENTER_X - 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet1Button);
        bet10Button = new UIObjects.Button("bet10Button", Config.Screen.CENTER_X - 67, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet10Button);
        bet100Button = new UIObjects.Button("bet100Button", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet100Button);
        betMaxButton = new UIObjects.Button("betMaxButton", Config.Screen.CENTER_X + 67, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(betMaxButton);
        resetButton = new UIObjects.Button("resetButton", Config.Screen.CENTER_X - 250, Config.Screen.CENTER_Y + 20, true);
        stage.addChild(resetButton);
        quitButton = new UIObjects.Button("quitButton", Config.Screen.CENTER_X - 250, Config.Screen.CENTER_Y + 100, true);
        stage.addChild(quitButton);
        // Labels
        jackPotLabel = new UIObjects.Label(jackpot.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 175, true);
        stage.addChild(jackPotLabel);
        creditLabel = new UIObjects.Label(playerMoney.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X - 94, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(creditLabel);
        winningsLabel = new UIObjects.Label("0", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X + 94, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(winningsLabel);
        betLabel = new UIObjects.Label(playerBet.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(betLabel);
        // Reel GameObjects
        leftReel = new Core.GameObject("bell", Config.Screen.CENTER_X - 79, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(leftReel);
        middleReel = new Core.GameObject("banana", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(middleReel);
        rightReel = new Core.GameObject("bar", Config.Screen.CENTER_X + 78, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(rightReel);
        // Bet Line
        betLine = new Core.GameObject("bet_line", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(betLine);
    }
    function interfaceLogic() {
        spinButton.on("click", () => {
            // TODO: reset winningsLabel
            // clear the winningsLabel
            // clear winnings variable
            // check if we can spin the reels based on the availability of player money
            // if playermoney > 0 then check the playerBet <= playerMoney
            // if not then don't let the player spin 
            // reel test
            if (playerMoney == 0) {
                if (confirm("You ran out of Money! \nDo you want to play again?")) {
                    resetAll();
                }
            }
            else if (playerBet > playerMoney) {
                (confirm("You don't have enough Money to place that bet."));
            }
            else if (playerBet <= playerMoney) {
                let reels = Reels();
                // example of how to replace the images in the reels
                leftReel.image = assets.getResult(reels[0]);
                middleReel.image = assets.getResult(reels[1]);
                rightReel.image = assets.getResult(reels[2]);
                determineWinnings();
            }
        });
        bet1Button.on("click", () => {
            playerBet += 1;
            //TODO: update the playerBetLabel
            // betLabel.setText("0");
            betLabel.setText(playerBet.toString());
            console.log("Player Bet is : " + playerBet);
        });
        bet10Button.on("click", () => {
            playerBet += 10;
            //TODO: update the playerBetLabel
            //betLabel.setText("0");
            betLabel.setText(playerBet.toString());
            console.log("Player Bet is : " + playerBet);
        });
        bet100Button.on("click", () => {
            playerBet += 100;
            //TODO: update the playerBetLabel
            //betLabel.setText("0");
            betLabel.setText(playerBet.toString());
            console.log("Player Bet is : " + playerBet);
        });
        betMaxButton.on("click", () => {
            playerBet += playerMoney;
            //TODO: update the playerBetLabel
            //betLabel.setText("0");
            betLabel.setText(playerBet.toString());
            console.log("Player Bet is : " + playerBet);
        });
        quitButton.on("click", () => {
            console.log("quitButton Button Clicked");
            //spinButton.addEventListener("click", spinButton);
            alert("Thank You For Playing the Game!");
        });
        resetButton.on("click", () => {
            console.log("resetButton Button Clicked");
        });
    }
    function resetInterface() {
        jackPotLabel.setText(jackpot.toString());
        winningsLabel.setText("0");
        creditLabel.setText(playerMoney.toString());
        betLabel.setText("0");
        //betLabel.setText(playerBet.toString());
        //example of how to replace the images in the reels
        leftReel.image = assets.getResult("blank");
        middleReel.image = assets.getResult("blank");
        rightReel.image = assets.getResult("blank");
    }
    // app logic goes here
    function Main() {
        buildInterface();
        resetInterface();
        interfaceLogic();
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=app.js.map