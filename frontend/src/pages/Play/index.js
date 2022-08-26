import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Play() {
    const [jogo, setJogo] = useState({});
    const [letra, setLetra] = useState('');
    
    //const history = useHistory();

    useEffect(() => {
        api.get('play', {}).then(response => {
            setJogo(response.data); 
        })
    });

    async function handleChutar(e) {
        e.preventDefault();

        const data = {letra};

        try {
            await api.put('play', data, {});
            setLetra('')

            //history.push('/play');
        }
        catch (err) {
            alert('Erro ao chutar. Tente novamente mais tarde.');
        }
    }

    async function handleReiniciar(e) {
        e.preventDefault();

        try {
            await api.post('play', {}, {});

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
                <p>{jogo.vidas}</p>
                
                <strong>Letras chutadas:</strong>
                <p>{jogo.letrasChutadas}</p>
                
                <p>{jogo.palavra}</p>
                
                <strong>Erro:</strong>
                <p>{jogo.erro}</p>

                <form onSubmit={handleChutar} method="get">
                    <input
                        placeholder="Insira uma letra"
                        value={letra}
                        onChange={e => setLetra(e.target.value)} />

                    <button className="button" type="submit" disabled={jogo.vidas <= 0}>Chutar</button>
                </form>

                <form onSubmit={handleReiniciar} method="post">
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