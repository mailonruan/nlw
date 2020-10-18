import React, { useContext } from "react";
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Context } from '../../context';

import './styles.css';

export default function Landing() {
  const { state } = useContext(Context);

  const { goBack } = useHistory();

  return (
    <div id="page-thank-you">
      <div className="content-wrapper">
        <main>
          <h1>{ `Ebaaa! ${state.user?.name || ''}`}</h1>
          <p>Agora você é um padrinho do Orfanato e já está fazendo a diferença, muito obrigado! :)</p>
        </main>

        <button className="go-back" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
          Voltar para detalhes do Orfanato
        </button>
      </div>
    </div>
  );
}