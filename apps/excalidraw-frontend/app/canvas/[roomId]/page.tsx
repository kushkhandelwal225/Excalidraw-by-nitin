"use client" 
import { useEffect, useRef } from "react";

export default function Canvas() { const canvasRef = useRef<HTMLCanvasElement>(null);

useEffect(() => {
    if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            console.log("good")
        }

        if (!ctx) return;
        let clicked = false;
        let startX = 0;
        let startY = 0;
        canvas.addEventListener("mousedown", (e) => {
            clicked = true;
            startX = e.clientX;
            startY = e.clientY
            console.log(clicked);
            console.log("mousedown", e.clientX, e.clientY);
        });

        canvas.addEventListener("mouseup", (e) => {
            clicked = false;
            console.log(clicked);
            console.log("mouseup", e.clientX, e.clientY);
        });
        canvas.addEventListener("mousemove", (e) => {
            if (clicked) {
                const width =  e.clientX - startX;
                const height  = e.clientY - startY;
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.strokeRect(startX, startY, width, height);
                console.log(e.clientX);
                console.log(e.clientY)
            }

        })
    }
}, [canvasRef]);

return (
    <div className="h-screen w-screen">
        <canvas
            ref={canvasRef}
            width={1000}
            height={1000}
            style={{
                width: "1000px",
                height: "1000px",
                border: "1px solid black",
                backgroundColor: "white"
            }}
        />

    </div>
);
}
// "use client"
// import { useEffect, useRef } from "react";

// export default function Canvas() {
//     const canvasRef = useRef<HTMLCanvasElement>(null);

//     useEffect(() => {
//         if (canvasRef.current) {
//             const canvas = canvasRef.current;
//             const ctx = canvas.getContext("2d");

//             if (!ctx) return;

//             canvas.addEventListener("mousedown", (e) => {
//                 console.log("mousedown", e.clientX, e.clientY);
//             });

//             canvas.addEventListener("mouseup", (e) => {
//                 console.log("mouseup", e.clientX, e.clientY);
//             });
//             canvas.addEventListener("mousemove", (e) => {
//                 console.log(e.clientX);
//                 console.log(e.clientY)
//             })
//         }
//     }, [canvasRef]);



//     return (
//         <div className="h-screen w-screen">
//             <canvas
//                 ref={canvasRef}
//                 width={500}
//                 height={500}
//                 style={{
//                     width: "500px",
//                     height: "500px",
//                     border: "1px solid black",
//                     backgroundColor: "white",
//                     pointerEvents: "auto"
//                 }}
//             />

//         </div>
//     );
// }
