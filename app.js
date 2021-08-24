'use strict';

const port = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const {
    dialogflow
} = require('actions-on-google');

const app = dialogflow();
const risposte = require('./risposte');
const prodotti = require('./data/prodotti.json');
const aziende = require('./data/aziende.json');

app.intent('categorie', conv => {
    let params = conv.parameters;
    let categoria = params.categorie.toUpperCase();
    let domanda = params.domanda;
    let attivita = params.attivita;
    let prod = [];
    console.log(params)
    for (let i = 0; i < prodotti.length; i++) {
        if (categoria === prodotti[i].categoria_prodotto) {
            prod.push({
                nome: prodotti[i].nome_prodotto,
                id: prodotti[i].id_prodotto,
                id_azienda: prodotti[i].aziende_produzione,
                id_punto_vendita: prodotti[i].aziende_vendita,
                id_somministrazione: prodotti[i].aziende_somministrazione
            })
        }
    }
    let RES = risposte.risposta(prod, domanda, attivita);
    console.log(RES);
    conv.ask(RES);
});

app.intent('prodotti', conv => {
    let params = conv.parameters;
    let prodotto = params.prodotti;
    let domanda = params.domanda;
    let attivita = params.attivita;
    let prod = [];
    console.log(params)
    for (let i = 0; i < prodotti.length; i++) {
        if (prodotto === prodotti[i].nome_prodotto) {
            prod.push({
                nome: prodotti[i].nome_prodotto,
                cat: prodotti[i].categoria_prodotto,
                id: prodotti[i].id_prodotto,
                id_azienda: prodotti[i].aziende_produzione,
                id_punto_vendita: prodotti[i].aziende_vendita,
                id_somministrazione: prodotti[i].aziende_somministrazione
            })
        }
    }
    let RES = risposte.risposta(prod, domanda, attivita);
    console.log(RES);
    conv.ask(RES);
});

app.intent('informazioni', conv => {
    let params = conv.parameters;
    let prodotto = params.prodotti;
    conv.ask(`queste sono piu informazioni su, ${prodotto} ...`)
});

//Eseguire l'app
const expressApp = express().use(bodyParser.json());
expressApp.post('/fulfillment', app);
expressApp.listen(port, function () {
    console.log('FirstLife is runnign on ...' + port);
});