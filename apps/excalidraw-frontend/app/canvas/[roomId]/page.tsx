"use client" 
import { initDraw } from "@/draw";
import { useEffect, useRef } from "react";

export default function Canvas() { const canvasRef = useRef<HTMLCanvasElement>(null);

useEffect(() => {
    if (canvasRef.current) {
        const canvas = canvasRef.current;
        initDraw(canvas);
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
