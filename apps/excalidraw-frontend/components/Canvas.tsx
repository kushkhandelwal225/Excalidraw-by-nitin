"use client";
import { useEffect, useRef, useState } from "react";
import { initDraw } from "@/draw";
import IconButton from "./IconButton";
import { Circle, MoveRight, Pencil, PenLine, RectangleHorizontal, Palette, Download, Trash2, Undo2 } from "lucide-react";
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
        <div className="h-screen w-screen bg-white overflow-hidden relative">
            {/* Subtle texture overlay */}
            <div 
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #64748b 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                }}
            />
            
            {/* Main canvas area - full screen */}
            <div className="absolute inset-2">
                <canvas
                    ref={canvasRef}
                    width={window.innerWidth - 16}
                    height={window.innerHeight - 16}
                    className="w-full h-full"
                    style={{
                        backgroundColor: "white"
                    }}
                />
            </div>

            {/* Enhanced toolbar */}
            <TopBar selectedTool={selectedTool} setselectedTool={setselectedTool}/>
            
            {/* Room status indicator */}
            <div className="fixed top-6 right-6 z-40">
                <div className="bg-white rounded-xl px-4 py-2.5 shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span className="text-sm font-medium text-gray-800">Connected</span>
                        </div>
                        <div className="h-4 w-px bg-gray-300" />
                        <span className="text-sm text-gray-600 font-mono">{roomId}</span>
                    </div>
                </div>
            </div>
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
        { id: "pencil", icon: Pencil, label: "Freehand" },
        { id: "arrow", icon: MoveRight, label: "Arrow" }
    ];

    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
            {/* Compact toolbar */}
            <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-gray-200/70 px-3 py-2">
                <div className="flex items-center gap-1">
                    {tools.map((tool, index) => {
                        const Icon = tool.icon;
                        const isActive = selectedTool === tool.id;
                        
                        return (
                            <div key={tool.id} className="relative group">
                                <button
                                    onClick={() => setselectedTool(tool.id as Tool)}
                                    className={`
                                        relative w-9 h-9 rounded-lg transition-all duration-200 ease-out
                                        flex items-center justify-center
                                        ${isActive 
                                            ? 'bg-gray-900 text-white shadow-sm' 
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        }
                                        active:scale-95
                                    `}
                                >
                                    <Icon 
                                        size={16} 
                                        strokeWidth={isActive ? 2.5 : 2} 
                                        className="transition-all duration-200"
                                    />
                                </button>
                                
                                {/* Compact tooltip */}
                                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                    <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                        {tool.label}
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-0.5">
                                            <div className="w-1.5 h-1.5 bg-gray-900 rotate-45" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    
                    {/* Separator */}
                    <div className="w-px h-6 bg-gray-300 mx-2" />
                    
                    {/* Compact action buttons */}
                    <button
                        className="w-9 h-9 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 flex items-center justify-center group active:scale-95"
                        title="Undo"
                    >
                        <Undo2 size={16} strokeWidth={2} />
                    </button>
                    
                    <button
                        className="w-9 h-9 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 flex items-center justify-center group active:scale-95"
                        title="Clear"
                    >
                        <Trash2 size={16} strokeWidth={2} />
                    </button>
                    
                    <button
                        className="w-9 h-9 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 flex items-center justify-center group active:scale-95"
                        title="Export"
                    >
                        <Download size={16} strokeWidth={2} />
                    </button>
                </div>
            </div>
        </div>
    )
}