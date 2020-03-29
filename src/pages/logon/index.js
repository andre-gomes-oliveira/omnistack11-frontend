import React, {useState} from 'react';

import './styles.css'
import heroesimage from '../../assets/heroes.png';
import logoimage from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { FiLogIn } from 'react-icons/fi'

export default function Logon() {
    const [id, setid] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
          const response = await api.post('sessions', { id }); 
          localStorage.setItem('ngoId', id);
          localStorage.setItem('ngoname', response.data.name);

          console.log(response.data.name);
          history.push("/profile");
        } catch (err) {
            alert('Falha no login, tente novamente.')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
            <img src={logoimage} alt="Be The Hero"/>
            <form onSubmit={handleLogin}>
                <h1> Faça seu logon</h1>
                <input type="text" placeholder="Sua Id"
                value={id}
                onChange={e => setid(e.target.value)}/>
                <button className='button' type="submit">Entrar</button>
                <Link className='back-link' to="/register">
                    <FiLogIn size={16} color="#E02041"/>
                    Não tenho cadastro</Link>
            </form>
            </section>
            <img src={heroesimage} alt="Heroes"/>
        </div>
        
    );
}