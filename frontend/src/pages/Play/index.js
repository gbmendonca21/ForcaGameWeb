import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Play() {
    const [forca, setForca] = useState({});
    const [letra, setLetra] = useState('');
    
    //const history = useHistory();

    useEffect(() => {
        api.get('play', {}).then(response => {
            setForca(response.data);
            atualizaVidas()
        })
    });

    async function processarChutar(e) {
        e.preventDefault();

        const data = {letra};

        try {
            await api.post('play', data, {});
            setLetra('')

            //history.push('/play');
        }
        catch (err) {
            alert('Erro ao chutar. Tente novamente mais tarde.');
        }
    }

    async function processarReiniciar(e) {
        e.preventDefault();

        try {
            await api.get('reset', {}, {});

            //history.push('/play');
        }
        catch (err) {
            alert('Erro ao reiniciar. Tente novamente mais tarde.');
        }
    }

    function atualizaVidas() {
        const idParte = forca.vidas;
        var parteDaPessoa = document.getElementById(idParte);
        parteDaPessoa.style.display = "block";
    }

    return (
        <div className="play-container">
            <div className="content">
                <section>
                    <h1>Jogo da Forca!</h1>
                    <p>Chute uma letra por vez e tente acertar a palavra antes de perder todas as vidas</p>
                </section>
                
                <div className="div1">
                    <div className="div3">
                        <div className="base"></div>
                        <div className="pole"></div>
                        <div className="pole-extension"></div>
                        <div className="hanger"></div>
                        <div id="5" className="person-head"></div>
                        <div id="4" className="person-body"></div>
                        <div id="3" className="right-arm"></div>
                        <div id="2" className="left-arm"></div>
                        <div id="1" className="right-leg"></div>
                        <div id="0" className="left-leg"></div>
                    </div>
                    <div className="div4">
                        <div className="div5">
                            <label className="description">Letras chutadas:</label>
                            <br />
                            {forca.letrasChutadas.map(letraChutada => (
                                <label className="guess">{letraChutada}</label>
                            ))}
                        </div>
                        <div className="div6">
                            {forca.palavra.map(letraDaPalavra => (
                                <label>{letraDaPalavra}</label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="div2">{forca.mensagem}</div>
                
                <form onSubmit={processarChutar} method="post">
                    <input
                        placeholder="Insira uma letra"
                        value={letra}
                        onChange={e => setLetra(e.target.value)}
                        disabled={forca.jogoAcabou} />

                    <button className="button" type="submit" disabled={forca.jogoAcabou}>Chutar</button>
                </form>

                <form onSubmit={processarReiniciar} method="get">
                    <button className="button" type="submit">Reiniciar</button>
                </form>
            </div>
        </div>
    );
}


// <ul>
// {incidents.map(incident => (
//     <li key={incident.id}>
//         <strong>CASO:</strong>
//         <p>{incident.title}</p>
// 
//         <strong>DESCRIÇÃO</strong>
//         <p>{incident.description}</p>
//     </li>
// ))}
// 
// </ul>