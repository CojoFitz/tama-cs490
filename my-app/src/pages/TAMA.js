import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const PetQuestions = ['Do you like me?', 'Can I have your SSID?', 'Can we play ball?', 'Do you want me to be happy?'];

const Buttons = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/pets")
      .then((response) => {
        setPets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pet information:", error);
      });
  }, []);

  const updatePetStats = async (petId, updatedStats) => {
    try {
      await axios.put(`http://localhost:3001/pets/${petId}`, updatedStats);
    } catch (error) {
      console.error("Error updating pet stats:", error);
    }
  };

  const handleIncreaseStat = (petId, stat) => {
    setPets((prevPets) => {
      const updatedPets = prevPets.map((pet) => {
        if (pet.id === petId) {
          return { ...pet, [stat]: pet[stat] + 2 };
        }
        return pet;
      });
      updatePetStats(petId, { [stat]: updatedPets.find((pet) => pet.id === petId)[stat] });
      return updatedPets;
    });
  };

  const handleResponse = (isGood, petId) => {
    const updatedAffection = isGood ? 20 : -20;
    setPets((prevPets) => {
      const updatedPets = prevPets.map((pet) => {
        if (pet.id === petId) {
          return { ...pet, affection: pet.affection + updatedAffection };
        }
        return pet;
      });
      updatePetStats(petId, { affection: updatedPets.find((pet) => pet.id === petId).affection });
      return updatedPets;
    });
  };

  return (
    <div>
      {pets.map((pet) => (
        <div key={pet.id}>
          <h3>{pet.name}</h3>
          <p>Username: {pet.username}</p>
          <p>Personality: {pet.personality}</p>
          <p>Hunger: {pet.hunger}</p>
          <p>Sleepiness: {pet.sleepiness}</p>
          <p>Fun: {pet.fun}</p>
          <p>Affection: {pet.affection}</p>
          <button onClick={() => handleIncreaseStat(pet.id, "hunger")}>Increase Hunger</button>
          <button onClick={() => handleIncreaseStat(pet.id, "sleepiness")}>Increase Sleepiness</button>
          <button onClick={() => handleIncreaseStat(pet.id, "fun")}>Increase Fun</button>
          <button onClick={() => handleResponse(true, pet.id)}>Yes!</button>
          <button onClick={() => handleResponse(false, pet.id)}>NO!</button>
          <button onClick={() => handleResponse(Math.random() < 0.5, pet.id)}>Idk</button>
        </div>
      ))}
    </div>
  );
};

export default Buttons;
