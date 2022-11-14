   game = {
       human: {
        name:"",
        score: 0,
        turn :true,
        board: init,
        submarinesArr: [
            {
                size: 2,
                amount: 2
            },
            {
                size: 3,
                amount: 3
            },
            {
                size: 4,
                amount: 2
            },
            {
                size: 5,
                amount: 1
            }
        ],

           allSub: [],
           nameClass: getClass,
           play: humanMove,
           countCell: 0,
           newArr: [],
           totalScore: 0,
    },
       computer: {
        name: "Computer",
        score: 0,
        turn : false,
         board: init2,
         submarinesArr:[
             {
                 size: 2,
                 amount: 2
             },
             {
                 size: 3,
                 amount: 3
             },
             {
                 size: 4,
                 amount: 2
             },
             {
                 size: 5,
                 amount: 1
             }
         ],
         allSub: [],
           play: computerMove,
           nameClass: getClass,
           countCell: 0,
           newArr: [],
           totalScore: 0,
       },
       computerHits:[],
  
}
 isWon = false;
var counterCheat = 0;
human = game.human;
computer = game.computer;
function loclS() {

    if (localStorage.game!=null) {
        var r = confirm("Do you want to resume the game?");
        if (r == true) {
            game = JSON.parse(localStorage.game);
            document.querySelector(".game-container").innerHTML = localStorage.boardsHtml;
            cols = localStorage.cols;
            rows = localStorage.rows;
            human = game.human;
            computer = game.computer;
            game.human.play = humanMove;
            game.computer.play = computerMove;
            game.human.nameClass = getClass;
            game.computer.nameClass = getClass;
        } else {
            localStorage.clear();
        }

    } else {
        human.name = prompt("Please enter your name");
    }
}
function status() {
    document.getElementById("resH").innerHTML = 0;
    document.getElementById("resC").innerHTML = 0;
    human.score = 0;
    computer.score = 0;
    correct = false;
    while (!correct) {
        if ((document.getElementById("textH").value >= 10 && document.getElementById("textH").value <= 20) && (document.getElementById("textW").value >= 10 && document.getElementById("textW").value <= 20)) {
            rows = document.getElementById("textH").value;
            cols = document.getElementById("textW").value;
            correct = true;
        }
        else {
            setTimeout(function () {
                alert("Height and Width need to be between 10-20! ");
            }, 100);

            correct = false;
            break;
        }

    }
    document.getElementById("myForm").reset();
    human.newArr = [];
    human.allSub = [];
    document.getElementById("cheat").value = "Cheat";

}
function init() {
    isWon = false;
    status();
    str = "<table>";
    human.nameClass();
    index = 0;
    for (var i = 0; i < rows; i++) {
        str += "<tr>";
        for (var j = 0; j < cols; j++) {

            if (human.newArr[index] == true) 
            tdclass ="blackPlayer";
            else 
            tdclass = "yellow";
            
            classN = tdclass + ' ' + index++;
            str += "<td class='" + classN +"'onclick='game.human.play(this)'>";
            str += "</td>";
        }
        str += "</tr>";
    }
    str += "</table>";
    document.getElementById("ph").innerHTML = str;
    init2();

}
function init2() {
    game.computerHits = [];
    computer.newArr = [];
    computer.allSub = [];
    str = "<table>";
    computer.nameClass();
    index = 0;
    for (var i = 0; i < rows; i++) {
        str += "<tr>";
        for (var j = 0; j < cols; j++) {

            if (computer.newArr[index] == true) 
            tdclass = "black";
            else 
            tdclass = "yellow";
            
            str += "<td class='" + tdclass + " 'id='" + index++ +"'>";
            str += "</td>";
        }
        str += "</tr>";
    }
    str += "</table>";
    document.getElementById("ph1").innerHTML = str;
}

function getClass() {
    for (var i = 0; i < human.submarinesArr.length; i++) {
        let randVh = Math.floor(Math.random() * 2);
        for (var e = 0; e < human.submarinesArr[i].amount; e++) {
                let rand;
                 var check = true;
                while (check) {
                    rand = Math.floor(Math.random() * (cols * rows));
                    if ((cols - (rand % cols)) > human.submarinesArr[i].size && randVh == 0)
                        check = false;
                  
                    else if ((cols * rows) > rand + rows * human.submarinesArr[i].size && randVh == 1)
                        check = false;
                }
                sub = [];
            for (var j = 0; j < human.submarinesArr[i].size; j++) {
                    if (j == 0) {
                        temp = rand;
                        this.newArr[rand] = true;
                    }

                    else if (randVh == 1) {
                        temp = rand + parseInt(cols);
                        this.newArr[rand + parseInt(cols)] = true;
                        rand = temp;
                    }
                    else {
                        this.newArr[++rand] = true;
                        temp = rand;
                        rand = temp;
                    }
                   sub.push(temp);
                }
               this.allSub.push(sub);
        }
    }    
    console.log(this.allSub);
    console.log(this.name);
    
   
}
function humanMove(td) {
    var isDone = false;
    try {
        res = td.className.split(" ");
        if (human.turn)
        {
                if (res[0] == "yellow")
                {
                    tdclass = "gray";
                    human.score += 1;
                    document.getElementById("resH").innerHTML = human.score;
                    isDone = true;
                }
                else if (res[0] == "blackPlayer")
                {
                    tdclass = "red";
                    removeCell(this,res[1]);
                    var audio = new Audio("audio/audio_file.mp3");
                    audio.play();
                    isDone = true;
                  
                }
                else
                 tdclass=td.className;
            }
       
        return td.className= tdclass;
    }
    finally
    {
        if (isDone)
        {
            gameOver(this);
            human.turn = false;
        
            computer.play();
        } else {
            return;
        }
    }
}
function computerMove() {
    isDone = false;
    while (!isDone) {
        td = Math.floor(Math.random() * (cols * rows));
        var isValid = true;
        for (var i = 0; i < game.computerHits.length; i++) {
            if (game.computerHits[i] == td) {
                isValid = false;
            }
        }
        if (isValid)
        {
            game.computerHits.push(td);
            isDone = true;
            for (var i = 0; i < computer.allSub.length; i++) {
                for (var j = 0; j < computer.allSub[i].length; j++) {
                    if (td == computer.allSub[i][j]) {
                        document.getElementById(computer.allSub[i][j]).style.backgroundColor = "red";
                        human.turn = true;
                        removeCell(this, td);
                        gameOver(this);
                        return;
                    }
                }
            }
            document.getElementById(td).style.backgroundImage = " url('img/cross-icon.png')";
            document.getElementById(td).style.backgroundColor = "black";
            computer.score += 1;
            document.getElementById("resC").innerHTML = computer.score;
            human.turn = true;
            localStorage.boardsHtml = document.querySelector(".game-container").innerHTML;
            localStorage.cols = cols;
            localStorage.rows = rows;


            localStorage.game = JSON.stringify(game);
            return;
        }
    }
}
function removeCell(player,cell) {
    for (var i = 0; i < player.allSub.length; i++) {
        for (var j = 0; j < player.allSub[i].length; j++)
        {
            if (player.allSub[i][j] == cell) {
                player.allSub[i].splice(j, 1);
                
            }
        }
    }
}
function cheat() { 
    if (counterCheat%2==0) {
        $(".black ").toggleClass("cheat");
        document.getElementById("cheat").value = "UnCheat";
        counterCheat++;
    }
    else {
        $(".black ").toggleClass("cheat");
        document.getElementById("cheat").value = "Cheat"
        counterCheat++;
    }
}
function gameOver(player)
{
    if (!isWon) {
        player.countCell = 0;
        for (var i = 0; i < player.allSub.length; i++) {
            if (player.allSub[i].length == 0) {
                player.countCell++;
                if (player.countCell == player.allSub.length) {
                    isWon = true;
                    alert("🏆~ "+ player.name + " won the game!! ~🏆");
                    localStorage.clear();
                    player.totalScore += 1;
                    if (player.name=="Computer") {
                        document.getElementById("stats-winsC").innerHTML = player.totalScore;
                    } else {
                        document.getElementById("stats-winsH").innerHTML = player.totalScore;
                    }
                    document.getElementById("start").value = "Play Again";
                }
            }
        }
    }
}
