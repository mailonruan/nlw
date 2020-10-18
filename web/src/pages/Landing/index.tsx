import React, { useEffect, useContext } from "react";
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Api from '../../api';

import { Context } from '../../context';

import logoImg from '../../assets/images/logo.svg';

import './styles.css';

interface Data {
  address?: {
    city: string;
    state: string;
  }
}

export default function Landing() {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords;
      const { data }= await Api.get<Data>(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);

      const payload = {
        long: longitude,
        lat: latitude,
        city: data.address?.city,
        state: data.address?.state
      }
      
      dispatch({type: 'setLocation', payload})
    })
  }, [dispatch]);

  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="Happy" />
 
        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className="location">
          <strong>{ state.location?.city }</strong>
          <span>{ state.location?.state }</span>
        </div>

        <Link to="/app" className="enter-app">
          <FaArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  );
}