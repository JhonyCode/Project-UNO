//Importamos express
const express = require('express');
//Importamos express para poder usar router para generar las rutas
const router = express.Router();
//Importamos apiController para generar rutas a los endpoints
const apiController = require("../Controller/apiController");

router.post("/games/:id", apiController.games);
router.post("/games/:id/join", apiController.idJoin);
router.post("/games/:id/draw", apiController.idDraw);
router.post("/games/:id/play", apiController.idPlay);
router.get("/games/:id", apiController.id);
router.get("/games/deck", apiController.deck);
router.get("games/players", apiController.players)

module.exports = router;

