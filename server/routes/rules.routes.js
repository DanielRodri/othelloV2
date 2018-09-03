const express = require('express');
const router = express.Router();
const rulesCtrl = require('../controllers/rules.controller')

router.get('/getMatrix',rulesCtrl.getMatrix)//pide
router.get('/playerActual',rulesCtrl.playerActual)//pide
router.get('/getPlayers',rulesCtrl.getPlayers)//pide
router.put('/rules/:posX/:posY',rulesCtrl.tryMove)//actualiza
router.post('/createMatrix',rulesCtrl.createMatrix)//crea matriz
//router.post//crea datos
//router.delete//elimina datos

module.exports = router;