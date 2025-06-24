"use client"
import { useEffect, useRef } from "react";

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d")

            if (!ctx) return;

            ctx.strokeRect(25, 25, 400, 200);

        }
    }, [canvasRef])
    return (
        <div className=" h-screen w-screen">
            <canvas ref={canvasRef} width={1000} height={1000} >

            </canvas>
        </div>

    )
}