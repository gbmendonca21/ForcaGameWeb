const express = require('express');
const routes = express.Router();
const GameController = require('./controllers/GameController');

routes.get("/play", GameController.index);
routes.post("/play", GameController.update);

routes.get("/reset", GameController.reset);

// routes.post(caminho, método);

// Precisamos de um método POST que envia uma letra chutada pelo usuário.
// Devemos retornar algum erro quando for uma letra repetida?
// O que fazer com caracteres especiais? Teremos outras validações?
// Forma de reiniciar ou desistir?
// Vamos representar as vidas como uma pessoinha?


module.exports = routes;

