import React, { useRef, useEffect, useState } from 'react';
import petSprite from "../../petSprite/petSprite2.jpeg";

type AnimationState = {
    [key: string]: number[][];
};
function PetCanvas(props: object) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const petImage = new Image();
 

    const [currentAction, setCurrentAction] = useState<string>("greet");

    petImage.src = petSprite;

    const animationState: AnimationState = {
        "greet" :[[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4]],
        "idle" :[[2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7]],
        "eat" : [[8, 6], [8, 7], [8, 8], [8, 9], [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9], [10, 0], [10, 1], [10, 2], [10, 3], [10, 4], [10, 5], [10, 6]],
        "run" :[[10, 6], [10, 7], [10, 8], [10, 9], [11, 0], [11, 1], [11, 2], [11, 3], [11, 4], [11, 5], [11, 6], [11, 7], [11, 8], [11, 9], [12, 0], [12, 1], [12, 2], [12, 3], [12, 4], [12, 5], [12, 6], [12, 7], [12, 8], [12, 9], [13, 0], [13, 1], [13, 2], [13, 3], [13, 4], [13, 5], [13, 6], [13, 7], [13, 8], [13, 9], [14, 0], [14, 1], [14, 2], [14, 3], [14, 4], [14, 5], [14, 6], [14, 7], [14, 8], [14, 9], [15, 0], [15, 1], [15, 2], [15, 3], [15, 4], [15, 5], [15, 6], [15, 7], [15, 8], [15, 9]]
    }
      
   useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Check if canvas is null
    const context = canvas.getContext('2d');
    if (!context) return; // Check if context is null 
    const CANVAS_WIDTH = canvas.width = 400;
    const CANVAS_HEIGHT = canvas.height = 400;
    const spriteWidth = 400;
    const spriteHeight = 400;
    let gameframe = 0;
    const stagger = 3;
    let animationId: number;
    let fn = 0
    let xIndex = animationState[currentAction][fn][1];
    let yIndex = animationState[currentAction][fn][0];
    
    // Function to animate the sprite
    function animate() {
        if (!context) return;
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); 

        context.drawImage(petImage, ((animationState[currentAction][fn][1]) * spriteWidth), (( animationState[currentAction][fn][0]) * spriteWidth), spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
        if (gameframe % stagger === 0) {
            fn = (fn+1)% (animationState[currentAction].length) 
       }

        gameframe++;
        animationId = requestAnimationFrame(animate);
    }

    // Start the animation when the component mounts
    animate();

    // Cleanup function to stop the animation when the component unmounts or when `currentAction` changes
    return () => cancelAnimationFrame(animationId);
}, [currentAction]); // Re-run the effect when `currentAction` changes

    return (
        <>
            <canvas ref={canvasRef} {...props} />
            <h1 style={{textAlign:"center", color: "white"}}>{currentAction.toUpperCase()}</h1>
           {["greet", "idle", "eat", "run"].map(name => (
            <button key={name} onClick={() => setCurrentAction(name)}> {name} </button>
        ))}
        </>
    );
}

export default PetCanvas;
