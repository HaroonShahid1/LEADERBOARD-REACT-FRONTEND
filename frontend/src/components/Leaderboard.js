import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Leaderboard.css';

import goldMedal from './images/gold.png';
import silverMedal from './images/silver.png';
import bronzeMedal from './images/bronze.png';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/leaderboard');
        setLeaders(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaders();
  }, []);

  const getMedalImage = (index) => {
    switch (index) {
      case 0:
        return goldMedal;
      case 1:
        return silverMedal;
      case 2:
        return bronzeMedal;
      default:
        return null;
    }
  };

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Medal</th>
            <th>Team</th>
            <th>Games Played</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((team, index) => (
            <tr key={team._id}>
              <td>{index + 1}</td>
              <td>
                {index < 3 && (
                  <img src={getMedalImage(index)} alt={`${getMedalImage(index)} Medal`} className="medal" />
                )}
              </td>
              <td>
                <img src={team.avatar} alt={`${team.name} Avatar`} className="avatar" />
                <span className="team-name">{team.name}</span>
              </td>
              <td>{team.gamesPlayed}</td>
              <td>{team.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
