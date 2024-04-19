import React, { useRef, useEffect, useState } from 'react';
import petSprite from "../../petSprite/PetSprite.png";
// import petSprite from "../../petSprite/petSprite2.jpeg";

type AnimationState = {
    [key: string]: [row:number, col:number, repeat:number];
};


function PetCanvas(props: object) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentAction, setCurrentAction] = useState<string>("Greet");

    const animationState: AnimationState = {
        "Idle": [0, 64, -1],
        "Feed": [1, 64, 2],
        "Excited": [2, 64, 2],
        "Sleep":[3,64,2],
        "Talk": [4, 64, 6],
        "Greet": [5, 45, 3],
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const petImage = new Image();
        if (!canvas || !petImage) return;
        petImage.src = petSprite;
        const context = canvas.getContext('2d');
        if (!context) return;

        const CANVAS_WIDTH = canvas.width = 400;
        const CANVAS_HEIGHT = canvas.height = 400;
        const spriteWidth = 400;
        const spriteHeight = 400;

        const framesPerSecond = 25; // Each frame runs once every 1/60 second
        const frameTime = 1000/framesPerSecond; // Interval between frames in milliseconds
        let animationId: number;
        let fn = 0;

        function animate(timestamp: number) {
            if (!context) return;
            context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            const elapsedTime = timestamp - lastTimestamp;
            
            if (elapsedTime > frameTime){ //Runs every second 
                    lastTimestamp = timestamp;
                    fn = (fn + 1) % animationState[currentAction][1];
                    if (fn === 0) {
                        if (animationState[currentAction][2] === -1) animationState[currentAction][2] = -1;
                        animationState[currentAction][2]--;
                        if (animationState[currentAction][2] === 0) {
                            cancelAnimationFrame(animationId);
                            setCurrentAction("Idle");
                            return;
                        }
                    }
                
            }


            const xIndex = fn;
            const yIndex = animationState[currentAction][0];
            context.drawImage(
                petImage,
                xIndex * spriteWidth,
                yIndex * spriteHeight,
                spriteWidth,
                spriteHeight,
                0,
                0,
                spriteWidth,
                spriteHeight
            );

            animationId = requestAnimationFrame(animate);
        }

        let lastTimestamp = performance.now();
        animate(lastTimestamp);

        return () => cancelAnimationFrame(animationId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentAction]);

    return (
        <>
            <canvas ref={canvasRef} {...props} />
            <h1 style={{ textAlign: "center", color: "white" }}>{currentAction.toUpperCase()}</h1>
            {["Idle", "Feed", "Excited", "Greet", "Talk", "Sleep"].map(name => (
                <button key={name} onClick={() => setCurrentAction(name)}> {name} </button>
            ))}
        </>
    );
}

export default PetCanvas;