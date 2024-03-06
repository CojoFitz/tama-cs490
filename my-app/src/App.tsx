import React from 'react';
import './App.css';
import Buttons from './components/reusable/MenuButton';
import animationVid from './Animation.mp4';



function App() {
  return (
    <>   
      <div className='Stats_container'>
         <Buttons></Buttons>
        <div className='TemporaryVid'>
        
           <video src={animationVid} className='TemporaryVid' preload='auto' controls autoPlay loop />
        </div>

      </div>
    </>
  );
}

export default App;
