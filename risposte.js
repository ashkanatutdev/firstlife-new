const prodotti = require('./data/prodotti.json');
const aziende = require('./data/aziende.json');

module.exports = {
    risposta
}

function risposta(prod, domanda, attivita){
    let res = "";
    if (domanda === "quali") {
        if (prod.length > 0) {
            if (attivita === "produre") {
                res += "producono, ";
                if (prod.length === 1) {
                    res += `${prod[0].nome}.`
                } else {
                    for (let i = 0; i < prod.length; i++) {
                        if (i !== prod.length - 1) {
                            res += `${prod[i].nome}, `
                        } else {
                            res += `${prod[i].nome}.`
                        }
                    }
                }
            } else if (attivita === "comprare") {
                res += "puoi comprare, ";
                if (prod.length === 1) {
                    res += `${prod[0].nome}.`
                } else {
                    for (let i = 0; i < prod.length; i++) {
                        if (i !== prod.length - 1) {
                            res += `${prod[i].nome}, `
                        } else {
                            res += `${prod[i].nome}.`
                        }
                    }
                }
            }
        } else {
            res += `non cè prodotto.`
        }
    }
    else if (domanda === "dove"){
        if (prod.length>0){
            if (attivita === "produre"){
                let az = [];
                for (let p = 0;p<prod.length;p++){
                    if (prod[p].id_azienda.length>0){
                        az.push(prod[p])
                    }
                }
                //console.log(az)
                if (az.length > 0){
                    res += `producono `
                    for (let m=0;m<az.length;m++){
                        res += `${az[m].nome} in, `
                        for (let r=0;r<az[m].id_azienda.length;r++){
                            for (let n = 0;n<aziende.length;n++){
                                if (az[m].id_azienda[r] === aziende[n].id){
                                    res += `${aziende[n].descrizione}, `
                                }
                            }
                        }
                    }
                }else {
                    res += `non ci sono aziende ancora.`
                }
            } else if (attivita === "comprare"){
                let pv = [];
                for (let p = 0;p<prod.length;p++){
                    if (prod[p].id_punto_vendita.length>0){
                        pv.push(prod[p])
                    }
                }
                //console.log(az)
                if (pv.length > 0){
                    res += `puoi comprare `
                    for (let m=0;m<pv.length;m++){
                        res += `${pv[m].nome} in, `
                        for (let r=0;r<pv[m].id_punto_vendita.length;r++){
                            for (let n = 0;n<aziende.length;n++){
                                if (pv[m].id_punto_vendita[r] === aziende[n].id){
                                    res += `${aziende[n].descrizione}, `
                                }
                            }
                        }
                    }
                }else {
                    res += `non ci sono aziende ancora.`
                }
            } else {
                res += `non ci sono abbastanza informazioni ancora`
            }
        }
    }
    return res;
}

