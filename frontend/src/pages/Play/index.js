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
            atualizaVidas(forca.vidas);
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

    function atualizaVidas(vidas) {
        if (vidas < 6)
        {
            var parteDaPessoa = document.getElementById(vidas);
            parteDaPessoa.style.display = "block";
        }
        else
        {
            for (var i = vidas - 1; i >= 0; i--) {
                var parte = document.getElementById(i);
                parte.style.display = "none";
            }
        }
    }

    return (
        <div className="play-container">
            <div className="content">
                <section>
                    <h1>Jogo da Forca!</h1>
                    <p>Chute uma letra por vez e tente acertar a palavra antes de perder todas as vidas</p>
                </section>
                
                <div className="main-ui">
                    <div className="hanger-area">
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
                    <div className="guesses-area">
                        <div className="used-area">
                            <label className="description">Letras Erradas:</label>
                            <br />
                            {forca.letrasErradas?.map(letraErrada => (    
                                <label className="guess">{letraErrada}</label>
                            ))}
                        </div>
                        <div className="word-area">
                            {forca.palavra?.map(letraDaPalavra => (
                                <label>{letraDaPalavra}</label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="message-area">{forca.mensagem}</div>
                
                <div className="commands">
                    <form onSubmit={processarChutar} method="post">
                        <input
                            placeholder="Insira uma letra"
                            value={letra}
                            onChange={e => setLetra(e.target.value)}
                            disabled={forca.jogoAcabou} />

                        <button type="submit" disabled={forca.jogoAcabou}>Chutar</button>
                    </form>

                    <form onSubmit={processarReiniciar} method="get">
                        <button type="submit">Reiniciar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}


