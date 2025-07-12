"use client";
import { useEffect, useRef, useState } from "react";
import {
    Circle,
    MoveRight,
    Pencil,
    PenLine,
    RectangleHorizontal,
    Hand,
    Type,
    Image,
    Trash2
} from "lucide-react";
import { Game } from "@/draw/Game";
import TopActionsBar from "./TopActionBar";
import { label } from "framer-motion/client";

export type Tool = "select" | "circle" | "line" | "rect" | "pencil" | "arrow" | "text" | "image"

export type strokeColor = "red" | "black" | "green"

export function Canvas({
    roomId,
    socket
}: {
    roomId: string
    socket: WebSocket
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game>()
    const [selectedTool, setSelectedTool] = useState<Tool>("select")
    const [selectedColor, setSelectedColor] = useState<strokeColor>("black")

    useEffect(() => {
        game?.setTool(selectedTool);

    }, [selectedTool, game]);
    useEffect(() => {
        game?.setColor(selectedColor)
    }, [selectedColor, game])
    useEffect(() => {
        if (canvasRef.current) {
            const g = new Game(canvasRef.current, roomId, socket);
            setGame(g);
            return () => {
                g.destroy();
            }
        }
    }, [canvasRef]);
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }, []);


    async function handleDeletews() {
        try {
            game?.deleteCanvasShapes();

        } catch (error) {
            console.log(error)
        }
    }
    function handleExportImage() {
        const canvas = canvasRef.current;
        if (!canvas) {
            console.warn("Canvas not ready");
            return;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Create a temporary copy of the canvas
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d")!;
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;

        tempCtx.fillStyle = "white";
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

        tempCtx.drawImage(canvas, 0, 0);

        const dataURL = tempCanvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "canvas.png";
        link.click();
    }




    return (
        <div className="h-screen w-screen bg-white overflow-hidden relative">
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #000000 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <canvas
                ref={canvasRef}

                className="absolute inset-0 bg-white"

            />

            <MainToolbar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />

            <div className="fixed top-6 right-6 flex gap-2">
                {["red", "black", "green"].map((color) => (
                    <button
                        key={color}
                        onClick={() => setSelectedColor(color as strokeColor)}
                        className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? "border-black" : "border-transparent"}`}
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>

            <TopActionsBar roomId={roomId} handleDeletews={handleDeletews} handleExportImage={handleExportImage} />




        </div>
    )
}

function MainToolbar({ selectedTool, setSelectedTool }: {
    selectedTool: Tool,
    setSelectedTool: (tool: Tool) => void
}) {
    const tools = [
        { id: "select", icon: Hand, label: "Select", shortcut: "V" },
        { id: "rect", icon: RectangleHorizontal, label: "Rectangle", shortcut: "R" },
        { id: "circle", icon: Circle, label: "Ellipse", shortcut: "O" },
        { id: "arrow", icon: MoveRight, label: "Arrow", shortcut: "A" },
        { id: "line", icon: PenLine, label: "Line", shortcut: "L" },
        { id: "pencil", icon: Pencil, label: "Draw", shortcut: "P" },
        { id: "text", icon: Type, label: "Text", shortcut: "T" },


    ];

    return (
        <div className="fixed top-6 left-6 z-50">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
                <div className="flex flex-col">
                    {tools.map((tool, index) => {
                        const Icon = tool.icon;
                        const isActive = selectedTool === tool.id;

                        return (
                            <div key={tool.id} className="relative group">
                                <button
                                    onClick={() => setSelectedTool(tool.id as Tool)}
                                    className={`
                                        w-14 h-14 flex items-center justify-center transition-all duration-200
                                        ${isActive
                                            ? 'bg-black text-white'
                                            : 'text-gray-800 hover:bg-gray-50'
                                        }
                                        ${index === 0 ? 'rounded-t-2xl' : ''}
                                        ${index === tools.length - 1 ? 'rounded-b-2xl' : ''}
                                        active:scale-95
                                    `}
                                >
                                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                </button>

                                {/* Selection indicator */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-black rounded-r-full" />
                                )}

                                {/* Tooltip */}
                                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                    <div className="bg-black text-white text-sm px-4 py-2 rounded-xl whitespace-nowrap flex items-center gap-3 shadow-xl">
                                        <span className="font-medium">{tool.label}</span>
                                        <kbd className="bg-gray-800 text-xs px-2 py-1 rounded font-mono">{tool.shortcut}</kbd>
                                        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-1">
                                            <div className="w-2 h-2 bg-black rotate-45" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

