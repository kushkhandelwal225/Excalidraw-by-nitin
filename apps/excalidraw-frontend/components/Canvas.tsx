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
    Trash2,
    Share,
    X
} from "lucide-react";
import { Game } from "@/draw/Game";

export type Tool = "select" | "circle" | "line" | "rect" | "pencil" | "arrow" | "text" | "image"

export type strokeColor = "red" | "black" | "green" | "blue" | "orange"

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
    const [showConfirmation, setShowConfirmation] = useState(false);

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
            setShowConfirmation(false);
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

    const tools = [
        { id: "select", icon: Hand, label: "Select", shortcut: "V" },
        { id: "rect", icon: RectangleHorizontal, label: "Rectangle", shortcut: "R" },
        { id: "circle", icon: Circle, label: "Circle", shortcut: "O" },
        { id: "arrow", icon: MoveRight, label: "Arrow", shortcut: "A" },
        { id: "line", icon: PenLine, label: "Line", shortcut: "L" },
        { id: "pencil", icon: Pencil, label: "Draw", shortcut: "P" },
        { id: "text", icon: Type, label: "Text", shortcut: "T" },
    ];

    return (
        <div className="h-screen w-screen bg-white overflow-hidden relative">
            {/* Floating Toolbar */}
            <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 px-2 py-1.5">
                    <div className="flex items-center gap-1">
                        {/* Main Tools */}
                        <div className="flex items-center gap-0.5 bg-gray-50 rounded-lg px-1 py-0.5">
                            {tools.map((tool) => {
                                const Icon = tool.icon;
                                const isActive = selectedTool === tool.id;

                                return (
                                    <div key={tool.id} className="relative group">
                                        <button
                                            onClick={() => setSelectedTool(tool.id as Tool)}
                                            className={`
                                                w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200
                                                ${isActive
                                                    ? 'bg-white text-black shadow-sm'
                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                                                }
                                                active:scale-95
                                            `}
                                            title={`${tool.label} (${tool.shortcut})`}
                                        >
                                            <Icon size={14} strokeWidth={isActive ? 2.5 : 2} />
                                        </button>

                                        {/* Tooltip */}
                                        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                            <div className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap flex items-center gap-1.5 shadow-lg">
                                                <span>{tool.label}</span>
                                                <kbd className="bg-gray-800 text-xs px-1 py-0.5 rounded font-mono">{tool.shortcut}</kbd>
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-0.5">
                                                    <div className="w-1.5 h-1.5 bg-black rotate-45" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Separator */}
                        <div className="w-px h-4 bg-gray-200 mx-1" />

                        {/* Color Palette */}
                        <div className="flex items-center gap-1.5">
                            {["black", "red", "green", "blue", "orange"].map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color as strokeColor)}
                                    className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                                        selectedColor === color 
                                            ? "border-gray-400 scale-110" 
                                            : "border-gray-200 hover:border-gray-300"
                                    }`}
                                    style={{ backgroundColor: color }}
                                    title={color}
                                />
                            ))}
                        </div>

                        {/* Separator */}
                        <div className="w-px h-4 bg-gray-200 mx-1" />

                        {/* Action Buttons */}
                        <button
                            onClick={() => setShowConfirmation(true)}
                            className="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                            title="Clear canvas"
                        >
                            <Trash2 size={14} strokeWidth={2} />
                        </button>

                        <button 
                            onClick={handleExportImage}
                            className="px-3 py-1.5 bg-black text-white rounded-md hover:bg-gray-800 transition-all duration-200 flex items-center gap-1.5 text-xs font-medium"
                        >
                            <Share size={12} strokeWidth={2} />
                            Export
                        </button>
                    </div>
                </div>
            </div>

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #000000 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                }}
            />

            {/* Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 bg-white"
            />

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black/20 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 max-w-sm w-full mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Clear Canvas</h3>
                            <button
                                onClick={() => setShowConfirmation(false)}
                                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <p className="text-gray-600 mb-6 text-sm">
                            This will permanently clear all content from the canvas. This action cannot be undone.
                        </p>

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowConfirmation(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 text-sm font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeletews}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 text-sm font-medium flex items-center gap-2"
                            >
                                <Trash2 size={14} />
                                Clear Canvas
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}