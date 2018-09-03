//var data = require('../../Data.json');
const editJsonFile = require("edit-json-file");
let file = editJsonFile(`${__dirname}/../../Data.json`);
var methods = require('../../modules/reversie')
const admin = require('firebase-admin');
var db = admin.firestore();
const rulesCtrl = {}

rulesCtrl.getMatrix = async (req,res)=>{
    let matrix = await (file.get("matrix"))
    res.json(matrix);
}

rulesCtrl.playerActual = async (req,res) => {
    let actualPlayer = await (file.get("actualPlayer"))
    if(actualPlayer===1){
        res.json("1");
    }
    else{
        res.json("2");
    }
   
} 

rulesCtrl.tryMove = (req,res)=>{
    let actualPlayer = file.get("actualPlayer");
    let object = methods.validateMove(req.body.matrix,req.body.posX,req.body.posY,actualPlayer,file.get("size")); 
    if(object.validate===true){
        file.set("matrix",object.matrix)
        if(actualPlayer===1){
            file.set("actualPlayer",2)
        }
        else{
            file.set("actualPlayer",1)
        }
        //console.log("despues del move, ahora sigue: "+file.get("actualPlayer"))
        file.save()
    }
    res.json(object.matrix);
}
rulesCtrl.getPlayers = async (req,res)=>{
    let players = await (file.get("players"))
    res.json(players);
}
rulesCtrl.createMatrix= async (req,res)=>{
    let matrix = await methods.crearTablero(req.body.size);
    await file.set("matrix",matrix)
    await file.set("actualPlayer",1)
    await file.set("players",{player1:{name:req.body.player1},player2:{name:req.body.player2}})
    await file.set("size",req.body.size)
    await file.save()

    var docRef = db.collection('tablero').doc();
    var setTablero =  docRef.set({
    matrix: matrix.toString(),
    jugador1: req.body.player1,
    jugador2: req.body.player2,
    tamanno: req.body.size
    });

    


    //res.json(matrix)
    res.json("se creo el tablero, mensaje desde servidor")
}

 

module.exports = rulesCtrl;