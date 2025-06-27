"use client";
import { useEffect, useRef, useState } from "react";
import { initDraw } from "@/draw";
import IconButton from "./IconButton";
import { Circle, MoveRight, Pencil, PenLine, RectangleHorizontal } from "lucide-react";
import { Game } from "@/draw/Game";

export type Tool = "circle" | "line" | "rect" | "pencil" | "arrow"

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
    const tools = [
        { id: "line", icon: PenLine, label: "Line" },
        { id: "rect", icon: RectangleHorizontal, label: "Rectangle" },
        { id: "circle", icon: Circle, label: "Circle" },
        { id: "pencil", icon: Pencil, label: "Draw" },
        { id: "arrow", icon: MoveRight, label: "Arrow" }
    ];

    return (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-1.5 flex items-center gap-0.5">
                {tools.map((tool) => {
                    const Icon = tool.icon;
                    const isActive = selectedTool === tool.id;
                    
                    return (
                        <button
                            key={tool.id}
                            onClick={() => setselectedTool(tool.id as Tool)}
                            className={`
                                relative group p-2.5 rounded-xl transition-all duration-200 ease-out
                                ${isActive 
                                    ? 'bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-200/50' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }
                                hover:scale-105 active:scale-95
                            `}
                            title={tool.label}
                        >
                            <Icon size={20} strokeWidth={1.5} />
                            {isActive && (
                                <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    )
}