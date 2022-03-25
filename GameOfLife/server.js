var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);

var matrix = [];

var side = 20;

function setup() {
   matrix = generateMatrix(30);
   creatObjects();
   
   frameRate(5);
   createCanvas(matrix[0].length * side, matrix.length * side);
   background('#acacac');
}

function generateMatrix(size) {
   var newMatrix = [];
   for (var y = 0; y < size; y++) {
       newMatrix[y] = [];
       for (var x = 0; x < size; x++) {
           var randomId = random(100);
           if (randomId < 30) {
               newMatrix[y][x] = 1;
           } else if (randomId < 40) {
               newMatrix[y][x] = 2;
           } else if (randomId < 50) {
               newMatrix[y][x] = 3;
           } else if (randomId < 60) {
               newMatrix[y][x] = 4;
           } else if (randomId < 70) {
               newMatrix[y][x] = 5;
           } else {
               newMatrix[y][x] = 0;
           }
       }
   }
   return newMatrix;
}

//այստեղ քո պատրաստի թվերով լցված զանգվածը ուղարկում ես կլիենտին:
//սոքեթի emit մեթոդը թույլ է տալիս առաջին արգումենտով ստեղծել իվենթի անունը, 
//2-րդ արգումենտով ուղղարկել տվյալը, այն ինչ ուզում ես ուղարկել

io.sockets.emit('send matrix', matrix);
    
// հիմա գնա կլիենտի ֆայլ

//.........................................լոադինգ

//եթե գնացիր ու ամենինչ գրեցիր, արի էստեղ, դեռ անելիք ունենք

//էստեղ բեր քո գազանիկների դատարկ զանգվածները
    var grassArr = [];
    var grassEaterArr = [];

    //քանի որ քո կլասս-երը արդեն մոդուլներ են և ոչ մի կապ չունեն html ֆայլիդ հետ՝
    //այլ աշխատում են սերվերի վրա:
    //Դու պետք է նրանց իմպորտ անես: Ինձ մոտ նրանք երկուսն են, քեզ մոտ ավելի շատ
     Grass = require("./Grass")
     GrassEater = require("./GrassEater")

    //Այժմ լցնենք մատրիցը օբյեկտներով
    //սարքի մի հատ ֆունկցիա օրինակ createObject անունով
    //և էստեղ բեր քո սկրիպտ ֆայլի օբյեկտներով լցնող հատվածը
    function createObject(matrix) {
      for (var y = 0; y < matrix.length; y++) {
         for (var x = 0; x < matrix[y].length; x++) {
             if (matrix[y][x] == 1) {
                 var newGrass = new Grass(x, y, 1);
                 grassArr.push(newGrass);
             } else if (matrix[y][x] == 2) {
                 var newGrassEater = new GrassEater(x, y, 2);
                 grassEaterArr.push(newGrassEater);
             } else if (matrix[y][x] == 3) {
                 var newPredator = new Predator(x, y, 3);
                 predatorArr.push(newPredator);
             } else if (matrix[y][x] == 4) {
                 var newBomb = new Bomb(x, y, 4);
                 bombArr.push(newBomb);
             }
             else if (matrix[y][x] == 5) {
                 var newHuman = new Human(x, y, 5);
                 humanArr.push(newHuman);
             }
         }
      }
        // և կրկին ուղարկի կլիենտիդ: 
        //չմոռանաս , որ emit-ը տվյալ ուղարկողն է, իսկ on-ը ստացողը և կատարողը
        //այս դեպքում 2-րդ արգումենտը տվյալն է
        io.sockets.emit('send matrix', matrix)

    }


    //հիմա անցնենք նրանց վայրենի գործունեությանը
    //որևէ անունով կոչիր ֆունկցիադ և մեջը դիր մեթոդների հատվածը:

    function game() {
        for (var i in grassArr) {
            grassArr[i].mul()
        }
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
        //այո, դու ճիշտ ես տեսնում, կրկին և կրկին
        io.sockets.emit("send matrix", matrix);
    }

    //մեր խաղի շարժը լինելու է 1 վարկյանը մեկ
    setInterval(game, 1000)
    


      // մինչև այժմ մենք ինքներս էինք դնում իվենթների անուննները, 
      //օրինակ send matrix կամ ըըը... էլ չկա :D
      // էստեղ connection պատրասի իվենթի անուն է, որը աշխատում է այն ժամանակ, 
      //երբ որևէ մեկը աշխատացնում է սերվերը՝ մտնում է սերվեր
      //և մենք դեռ չէինք կանչել createObject ֆունկցիան
      // էստեղ կկանչենք )))
io.on('connection', function (socket) {
    createObject(matrix)
})

//դե ինչ այսօր այսքանը:

//ինձ համար շատ կարևոր է , որ հենց դու շատ լավ հասկանաս էս 
//ամենը ու լինես լավագույնը քո ընտրած ոլորտում:



//Գիտեմ, որ լիիիիիքը սխալ կա մեջը: Դուք ճիշտը գրեք :PPPPP