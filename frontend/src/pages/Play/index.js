import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Play() {
    const [forca, setForca] = useState({});
    const [letra, setLetra] = useState('');
    
    //const history = useHistory();

    useEffect(() => {
        api.get('play', {}).then(response => {
            setForca(response.data); 
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

    return (
        <div className="play-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Jogo da Forca" />
                    <h1>Jogo da Forca!</h1>
                    <p>Chute uma letra por vez e tente acertar a palavra antes de perder todas as vidas</p>
                </section>

                <strong>Vidas:</strong>
                <p>{forca.vidas}</p>
                
                <strong>Letras chutadas:</strong>
                <p>{forca.letrasChutadas}</p>
                
                <p>{forca.palavra}</p>
                
                <strong>Mensagem:</strong>
                <p>{forca.mensagem}</p>

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