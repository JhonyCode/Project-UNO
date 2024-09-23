//Importamos express
const express = require('express');
//Importamos express para poder usar router para generar las rutas
const router = express.Router();
//Importamos apiController para generar rutas a los endpoints
const apiController = require("../Controller/apiController");

router.post("/games/:id", apiController.postGames);
router.post("/games/:id/join", apiController.postIdJoin);
router.post("/games/:id/draw", apiController.postIdDraw);
router.post("/games/:id/play", apiController.postIdPlay);
router.get("/games/:id", apiController.getId);
router.get("/games/:id/deck", apiController.getIdDeck);
router.get("/games/:id/players", apiController.getIdPlayers)

module.exports = router;