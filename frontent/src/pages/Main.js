import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import api from '../services/api';
import { Link } from 'react-router-dom';
import './Main.css';

import logo from '../images/logo.png';
import like from '../images/like.svg';
import dislike from '../images/dislike.svg';
import matchImage from '../images/itsamatch.png';

function Main({ match }){
  const [users, setUsers] = useState([]);
  const [matchedDev, setMatchedDev] = useState(null);

  useEffect(() => {
    async function loadUsers(){
      const response = await api.get('/devs',{
        headers: { user : match.params.id }
      })
      setUsers(response.data);
    }
    loadUsers();          

  },[match.params.id]);

  useEffect(() => {
    const socket = io('http://localhost:3333',{
      query: {user : match.params.id }
    });
    socket.on('match', dev =>{
      setMatchedDev(dev);
    });
  }, [match.params.id]);

  async function handleLike(targetDevId){
    await api.post(`/devs/likes/${targetDevId}`, null, {
      headers:{ user:match.params.id }
    });
    setUsers(users.filter(user => user._id !== targetDevId));
  }

  async function handleDislike(targetDevId){
    //arguments of post method: route, body, headers 
    await api.post(`/devs/dislikes/${targetDevId}`, null, {
      headers:{ user:match.params.id }
    });
    setUsers(users.filter(user => user._id !== targetDevId));
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="DevsCorner" width="300px" height="40px" />
      </Link>
        {users.length > 0 ? (
          <ul>
            {users.map(user => (
              <li key={user._id}>
                <img src={user.avatarUrl} alt={user.name}/>
                <footer>
                  <strong>{user.name}</strong>
                 <p>{user.bio}</p>
                </footer>
                <div className="buttons">
                  <button type="button" onClick={() => handleLike(user._id)}>
                    <img src={like} alt="like"/>
                  </button>
                  <button type="button" onClick={() => handleDislike(user._id)}>
                    <img src={dislike} alt="dislike"/>
                  </button>
                </div>
              </li>
            ))
            }
          </ul>
          ) : (
          <div className="empty" >Acabou :(</div>
          )
        }
        {
          matchedDev && (
            <div className="match-container">
              <img src={matchImage} alt="It's a match"/>
              <img className="avatar" src={matchedDev.avatarUrl} alt="Avatar do Dev"/>
              <strong>{matchedDev.name}</strong>
              <p>{matchedDev.bio}</p>
              <button onClick={() => setMatchedDev(null)}>FECHAR</button>
            </div>
          )
        }
    </div>
  );
}

export default Main;