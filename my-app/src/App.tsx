import './App.css';
import PetCanvas from './components/reusable/PetCanvas';


function App() {
  return (
    <>    
      <div className='App'>
        <div style={{padding: "10px", backgroundColor: "green",position: "relative", margin: "0 auto", width: "fit-content", top:"100px"}}>
        <PetCanvas ></PetCanvas>
      </div>
      </div>
    </>
  );
}

export default App;
