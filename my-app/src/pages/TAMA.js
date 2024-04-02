import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { AuthContext } from "../helpers/AuthContext";
import anime from '../anime.gif'

const StatContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    flex-direction: column;
`

const TextBox = styled.div`
    align-items: center;
    margin: 40px;
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


function TAMA() {
  const [pet, setPet] = useState(null);
  const { authState } = useContext(AuthContext);
  const username = authState.username;
  const [dialogue, setDialogue] = useState([]);
  const PetQuestions = ['Do you like me?', 'Can I have your SSID?', 'Can we play ball?', 'Do you want me to be happy?']
  const [ques, setCurQues] = useState('Do you like me?')

  useEffect(() => {
    axios.get(`http://localhost:3001/pets/byName/${username}`)
      .then((response) => {
        const petData = response.data[0];
        setPet(petData);
        if (petData) {
          axios.get(`http://localhost:3001/dialogues/${petData.id}`)
            .then((response) => {
              const fetchedDialogues = response.data;
              console.log("Dialogues fetched successfully:", fetchedDialogues);
              setDialogue(fetchedDialogues);
            })
            .catch((error) => {
              console.error("Error fetching dialogue:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching pet information:", error);
      });

  }, []);

  const updateStat = (stat, value) => {
    axios.put(`http://localhost:3001/pets/updateStats/${pet.id}`, { stat, value })
      .then(response => {
        console.log(`Pet ${stat} increased`);
        setPet({ ...pet, [stat]: value });
      })
      .catch(error => {
        console.error(`Error increasing pet ${stat}:`, error);
      });
  };

  const feed = () => {
    updateStat("hunger", pet.hunger + 1);
  };

  const increaseEnergy = () => {
    updateStat("sleepiness", pet.sleepiness + 1);
  };

  const play = () => {
    updateStat("fun", pet.fun + 1);
  };

  const increaseAffection = (value) => {
    switch(value) {
      case 1:
        updateStat("affection", pet.affection + 2);
      case 2:
        updateStat("affection", pet.affection - 5);
      case 3:
        updateStat("affection", pet.affection + 3);
        return "Playful";
      case 4:
        updateStat("affection", pet.affection + 1 );
      case 5:
        updateStat("affection", pet.affection + 2);
        return "Calm";
      default:
        return "";
    }
  };

  const getPersonalityName = (value) => {
    switch(value) {
      case 1:
        return "Normal";
      case 2:
        return "Cranky";
      case 3:
        return "Playful";
      case 4:
        return "Lazy";
      case 5:
        return "Calm";
      default:
        return "";
    }
  };
  

  return ( 
    <div style={{ margin: "auto" }}>
      <div className='Stats_container'>
          <img src={anime} className='TemporaryVid'/>
      </div>
      <div className='Stats_container'>
        {pet && (
          <div>
            <h2>{pet.name} says: {dialogue[Math.floor(Math.random() * dialogue.length)]}</h2>
            <p>Personality: {getPersonalityName(pet.personality)}</p>
            <ButtonContainer>
              <StatContainer>
                <StyledButton disabled={pet.hunger >= 100} onClick={() => feed()}>
                  Increase Hunger
                </StyledButton>
                <progress value={(pet.hunger / 100) * 100} max={100}></progress>
                <p>{pet.hunger} / 100</p>
                {pet.hunger >= 100 && <p>I can't eat any more!</p>}
              </StatContainer>
              <StatContainer>
                <StyledButton disabled={pet.sleepiness >= 100} onClick={() => increaseEnergy()}>
                  Increase Energy
                </StyledButton>
                <progress value={(pet.sleepiness / 100) * 100} max={100}></progress>
                <p>{pet.sleepiness} / 100</p>
                {pet.sleepiness >= 100 && <p>I'm well rested.</p>}
              </StatContainer>
              <StatContainer>
                <StyledButton disabled={pet.fun >= 100} onClick={() => play()}>
                  Increase Fun
                </StyledButton>
                <progress value={(pet.fun / 100) * 100} max={100}></progress>
                <p>{pet.fun} / 100</p>
                {pet.fun >= 100 && <p>I'm plenty entertained.</p>}
              </StatContainer>
              <StatContainer>
                <StyledButton disabled={pet.affection >= 100} onClick={() => increaseAffection(pet.personality)}>
                  Hug
                </StyledButton>
                <progress value={(pet.affection / 100) * 100} max={100}></progress>
                <p>{pet.affection} / 100</p>
                {pet.affection >= 100 && <p>I already love you!</p>}
              </StatContainer>
            </ButtonContainer>

          </div>
        )}
      </div>
    </div>

  );
}

export default TAMA;
