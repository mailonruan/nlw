import React, { useContext, useEffect } from "react";
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import { Link } from "react-router-dom";
import { FiArrowRight, FiPlus } from "react-icons/fi";

import mapMarkerImg from "../../assets/images/map-marker.svg";
import Map from '../../components/Map';

import Api from '../../api';

import { Context } from '../../context';

import './styles.css';

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
});

interface Data {
  address?: {
    city: string;
    state: string;
  }
};

export default function OrphanagesMap() {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    async function getUser() {
      const token = localStorage.getItem('happyToken');

      if(token && !state.user) {
        const { data } = await Api.get('/users/me');
        if(data) {
          dispatch({
            type: 'login',
            payload: data
          });
        }

      }
    }

    getUser();
  }, [dispatch, state, state.user])
  
  useEffect(() => {
    if(!state.location?.lat && !state.location?.long) {
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
    }
  }, [dispatch, state.location]);

  return (
    <div id="page-map">
      <aside>
        <header>
          <div className="header-login">
            <img src={mapMarkerImg} alt="Happy" />
            {
              state.user ? (
                <span>Oii, {state.user.name}</span>
              ) : (
                <Link to="/login" className="user-login">
                  Fazer login
                </Link>
              )
            }
          </div>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>{ state.location?.city }</strong>
          <span>{ state.location?.state }</span>
        </footer>
      </aside>

      <Map>
        { state.location && <Marker icon={happyMapIcon} position={[state.location?.lat,state.location?.long]}> 
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
            Lar das meninas
            <Link to={`/orphanages/1`}>
              <FiArrowRight size={20} color="#fff" />
            </Link>
          </Popup>
        </Marker>
        }
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
