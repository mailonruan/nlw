import React, { useContext, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import mapMarkerImg from "../../assets/images/map-marker.svg";

import PrimaryButton from "../../components/PrimaryButton";

import Api from '../../api';

import { Context } from '../../context';

import './styles.css';


export default function OrphanagesMap() {
  const { state, dispatch } = useContext(Context);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const history = useHistory();

  useEffect(() => {
    async function getLocalStore() {
      const token = localStorage.getItem('happyToken');

      if(token) {
        const { data } = await Api.get('/users/me');
        if(data) {
          dispatch({
            type: 'login',
            payload: data
          });
          
          history.push('/app');
        }
      }
    }
    
    getLocalStore();
  }, [dispatch, history])
  
  useEffect(() => {
   if(state.user?.token) {
    history.push('/app');
   }
  }, [history, state.user]);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    async function loginApi() {
      const email = emailRef?.current?.value;
      const password = passwordRef?.current?.value;
      const { data: user } = await Api.post('/auth/login', {
        email,
        password
      });
      
      dispatch({type: 'login', payload: user });
    } 

    loginApi();
    
  }

  return (
    <div id="page-login">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />
          <h1>happy</h1>
        </header>

        <footer>
          <strong>{ state.location?.city }</strong>
          <span>{ state.location?.state }</span>
        </footer>
      </aside>

      <main>
        <Link to="/app">
          <FiArrowLeft size={20} />
        </Link>

        <form className="login-form" onSubmit={handleSubmitForm}>
          <fieldset>
            <legend>Fazer login</legend>
          </fieldset>

          <div className="input-block">
            <label htmlFor="email">E-mail</label>
            <input id="email" ref={emailRef} />
          </div>

          <div className="input-block">
            <label htmlFor="password">Senha</label>
            <input id="password" type="password" ref={passwordRef}  />
          </div>

          <div className="footer">
            <div className="input-block-check">
              <input id="remember" type="checkbox" />
              <span className="checkmark"></span>
              <label htmlFor="remember">Lembrar-me</label>
            </div>

            <Link to="/forgot">
              Esqueci minha senha
            </Link>
          </div>

          <PrimaryButton type="submit">Entrar</PrimaryButton>
        </form>
      </main>

    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
