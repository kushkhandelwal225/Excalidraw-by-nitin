"use client";
import { useEffect, useRef } from "react";
import { initDraw } from "@/draw";

export function Canvas({
    roomId,
    socket
} : {
    roomId : string
    socket : WebSocket
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            initDraw(canvas, roomId, socket);
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
            {/* <div className="absolute top-0 right-0">
                <button className="bg-black text-white p-2 ">Rect</button>
                <button className="bg-black text-white p-2 ">Circle </button>
            </div> */}

        </div>
    )
}