"use client";
import { useEffect, useRef, useState } from "react";
import { initDraw } from "@/draw";
import IconButton from "./IconButton";
import { 
    Circle, 
    MoveRight, 
    Pencil, 
    PenLine, 
    RectangleHorizontal, 
    Hand,
    Type,
    Image,
    Undo2,
    Redo2,
    Trash2,
    Download,
    Share,
    Menu,
    Zap,
    Library,
    Settings
} from "lucide-react";
import { Game } from "@/draw/Game";

export type Tool = "select" | "circle" | "line" | "rect" | "pencil" | "arrow" | "text" | "image"

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
    const [isMenuOpen, setIsMenuOpen] = useState(false)

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
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #000000 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}
            />
            
            {/* Canvas */}
            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
                className="absolute inset-0 bg-white"
                style={{
                    backgroundColor: "white"
                }}
            />
            
            {/* Main Toolbar */}
            <MainToolbar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
            
            {/* Top Actions Bar */}
            <TopActionsBar />
            
            {/* Zoom Controls */}
            <ZoomControls />
            
            {/* Room Status */}
            <RoomStatus roomId={roomId} />
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
        { id: "image", icon: Image, label: "Image", shortcut: "I" }
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

function TopActionsBar() {
    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 px-3 py-3">
                <div className="flex items-center gap-2">
                    <button className="p-3 rounded-xl text-gray-800 hover:bg-gray-50 transition-all duration-200 active:scale-95" title="Undo">
                        <Undo2 size={18} strokeWidth={2} />
                    </button>
                    <button className="p-3 rounded-xl text-gray-800 hover:bg-gray-50 transition-all duration-200 active:scale-95" title="Redo">
                        <Redo2 size={18} strokeWidth={2} />
                    </button>
                    
                    <div className="w-px h-8 bg-gray-200 mx-2" />
                    
                    <button className="p-3 rounded-xl text-gray-800 hover:bg-gray-50 transition-all duration-200 active:scale-95" title="Clear canvas">
                        <Trash2 size={18} strokeWidth={2} />
                    </button>
                    
                    <div className="w-px h-8 bg-gray-200 mx-2" />
                    
                    <button className="p-3 rounded-xl text-gray-800 hover:bg-gray-50 transition-all duration-200 active:scale-95" title="Library">
                        <Library size={18} strokeWidth={2} />
                    </button>
                    
                    <div className="w-px h-8 bg-gray-200 mx-2" />
                    
                    <button className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-200 flex items-center gap-2 font-medium active:scale-95">
                        <Share size={16} strokeWidth={2} />
                        Share
                    </button>
                </div>
            </div>
        </div>
    );
}

function ZoomControls() {
    return (
        <div className="fixed bottom-6 right-6 z-50">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-2">
                <div className="flex flex-col">
                    <button className="w-12 h-12 rounded-xl text-gray-800 hover:bg-gray-50 transition-all duration-200 font-bold text-lg active:scale-95">
                        +
                    </button>
                    <button className="w-12 h-12 rounded-xl text-gray-800 hover:bg-gray-50 transition-all duration-200 text-sm font-medium active:scale-95">
                        100%
                    </button>
                    <button className="w-12 h-12 rounded-xl text-gray-800 hover:bg-gray-50 transition-all duration-200 font-bold text-lg active:scale-95">
                        −
                    </button>
                </div>
            </div>
        </div>
    );
}

function RoomStatus({ roomId }: { roomId: string }) {
    return (
        <div className="fixed top-6 right-6 z-50">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 px-5 py-3">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-black rounded-full" />
                        <span className="font-semibold text-gray-900">Live</span>
                    </div>
                    <div className="h-6 w-px bg-gray-200" />
                    <span className="text-gray-700 font-mono text-sm tracking-wider">{roomId}</span>
                    <button className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 active:scale-95">
                        <Menu size={16} strokeWidth={2} />
                    </button>
                </div>
            </div>
        </div>
    );
}