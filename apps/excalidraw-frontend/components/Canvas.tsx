"use client";
import { useEffect, useRef, useState } from "react";
import { initDraw } from "@/draw";
import IconButton from "./IconButton";
import { Circle, PenLine, RectangleHorizontal } from "lucide-react";
import { Game } from "@/draw/Game";

export type Tool = "circle" | "line" | "rect"

export function Canvas({
    roomId,
    socket
}: {
    roomId: string
    socket: WebSocket
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game>()

    const [selectedTool, setselectedTool] = useState<Tool>("rect")
    useEffect(() => {
        game?.setTool(selectedTool);
        
    }, [selectedTool, game]);

    useEffect(() => {
        if (canvasRef.current) {
            const g = new Game(canvasRef.current, roomId, socket);
            setGame(g);
            return () => {
            g.destroy();
        }
        }
        
    }, [canvasRef]);
    return (
        <div style={{
            height: "100vh",
            overflow: "hidden"
        }}>


            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
                style={{
                    border: "1px solid black",
                    backgroundColor: "white"
                }}
            />
            <TopBar selectedTool={selectedTool} setselectedTool={setselectedTool}/>
        </div>
    )
}
function TopBar({selectedTool, setselectedTool} : {
    selectedTool : Tool, 
    setselectedTool : (s : Tool ) => void
}) {
    return (
        <div className="fixed top-10 left-30 z-10 flex gap-5">
            <IconButton activated={selectedTool === "line"} children={<PenLine/>} onClick={() => {setselectedTool("line")}}/>
            <IconButton activated={selectedTool === "rect"} children={<RectangleHorizontal/>} onClick={() => {setselectedTool("rect")}}/>
            <IconButton activated={selectedTool === "circle"} children={<Circle/>} onClick={() => {setselectedTool("circle")}}/>
        </div>
    )
}
