import React, { useRef, useEffect, useState } from 'react';
import petSprite from "../../petSprite/TestSprite.png";
// import petSprite from "../../petSprite/petSprite2.jpeg";

type AnimationState = {
    [key: string]: [row:number, col:number, repeat:number];
};


function PetCanvas(props: object) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentAction, setCurrentAction] = useState<string>("Idle");

    const animationState: AnimationState = {
        "Idle": [0, 10, -1],
        "Walk": [1, 10, 2],
        "Run": [2, 10, 2],
        "Push": [3, 10, 6],
        "Jump": [4, 10, 3],
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const petImage = new Image();
        if (!canvas || !petImage) return;
        petImage.src = petSprite;
        const context = canvas.getContext('2d');
        if (!context) return;

        const CANVAS_WIDTH = canvas.width = 128;
        const CANVAS_HEIGHT = canvas.height = 128;
        const spriteWidth = 128;
        const spriteHeight = 128;

        const framesPerSecond = 60; // Each frame runs once every 1/60 second
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
            {["Idle", "Walk", "Run", "Push", "Jump"].map(name => (
                <button key={name} onClick={() => setCurrentAction(name)}> {name} </button>
            ))}
        </>
    );
}

export default PetCanvas;
