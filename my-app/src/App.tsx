import React from 'react';
import './App.css';
import Buttons from './components/reusable/MenuButton';
import animationVid from './Animation.mp4';
import anime from './anime.gif'


function App() {
  return (
    <>   
            <div style={{margin: "auto"}}>
        
     </div>
      <div className='Stats_container'>
                <img src={anime} className='TemporaryVid'/>

         <Buttons></Buttons>
      </div>
    </>
  );
}

export default App;
