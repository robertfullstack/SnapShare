import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/logincadastro.css';
import IconSoloSnapShare from '../icons/icon-solo-SnapShare.svg';

const LoginRegistro = ({ setUser, user }) => {
    const [containerLogar, setContainerLogar] = useState(true);
    const navigate = useNavigate();

    const criarConta = (e) => {
        e.preventDefault();

        let email = document.getElementById("email-cadastro").value;
        let password = document.getElementById("password-cadastro").value;
        let userName = document.getElementById("userName-cadastro").value;

        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                toast.success("Conta criada com Sucesso!");
                authUser.user.updateProfile({
                    displayName: userName
                }).then(() => {
                    setUser(userName);
                    navigate('/home');
                });
            }).catch((error) => toast.error('Erro ao criar uma conta: ' + error.message));
    }

    const logar = (e) => {
        e.preventDefault();

        let email = document.getElementById("email-login").value;
        let password = document.getElementById("password-login").value;

        auth.signInWithEmailAndPassword(email, password)
            .then((authUser) => {
                setUser(authUser.user.displayName);
                toast.success('Logado com Sucesso!');
                navigate('/home');
            }).catch((error) => toast.error('Erro ao logar: ' + error.message));
    }

    return (
        <div className="App">
            <div className="main">
                {containerLogar ?
                    <div className="main-container-login">
                        <h1 style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={IconSoloSnapShare} width={80} style={{ margin: '0 10px' }} />
                            SnapShare
                            <img style={{ margin: '0 10px' }} src={IconSoloSnapShare} width={80} />
                        </h1>
                        <input type="email" placeholder="User@gmail.com" id="email-login" />
                        <input type="password" id="password-login" placeholder="Senha" />
                        <button onClick={logar}>Iniciar Sessão</button>
                        <p>Não tem uma Conta? <span onClick={() => setContainerLogar(!containerLogar)}>Registrar-se</span></p>
                    </div>
                    :
                    <div className="main-container-registro">
                        <h1 style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={IconSoloSnapShare} width={80} style={{ margin: '0 10px' }} />
                            SnapShare
                            <img src={IconSoloSnapShare} width={80} style={{ margin: '0 10px' }} />
                        </h1>
                        <input type="email" placeholder="User@gmail.com" id="email-cadastro" />
                        <input type="password" id="password-cadastro" placeholder="Senha" />
                        <input type="text" id="userName-cadastro" placeholder="Nome de usuário" />
                        <button onClick={criarConta}>Registrar-se</button>
                        <p>Já tem uma Conta? <span onClick={() => setContainerLogar(!containerLogar)}>Logar-se</span></p>
                    </div>
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default LoginRegistro;
