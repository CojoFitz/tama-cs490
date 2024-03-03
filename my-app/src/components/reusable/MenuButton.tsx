import React, { useEffect, useState } from 'react';
import styled from 'styled-components';



interface Stats {
  [key: string]: number;
}

const initialStats: Stats = {
  hunger: 0,
  sleep: 0,
  enjoyment: 0,
};

const StatContainer = styled.div`
    display: flex;
    align-items: center;

    gap: 20px;
    flex-direction: column;

`

const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: row;
`

const StyledButton = styled.button`
    width: 100px; 
    height: 100px;
    border-width: 1px;
    border-radius: 42%;
    border:1 none;
    &:hover {
    background-color: #04AA6D; /* Green */
    color: white;
  }

`;

const Buttons = () => {
  const [stats, setStats] = useState<Stats>(initialStats);
  useEffect(()=>{})

  const handleIncreaseStat = (stat: string) => {
    setStats((prevStats) => ({
      ...prevStats,
      [stat]: prevStats[stat] + 1,
    }));
  };

  return (
    <ButtonContainer>
      {Object.keys(stats).map((stat) => (
        <StatContainer key={stat}>
          <StyledButton onClick={() => handleIncreaseStat(stat)}>Increase {stat}</StyledButton>
          <progress value={stats[stat]} max={100}></progress>
        </StatContainer>
      ))}
    </ButtonContainer>
  );
};

export default Buttons;
