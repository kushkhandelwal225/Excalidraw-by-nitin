import { Menu } from "lucide-react";

export default function RoomStatus({ roomId }: { roomId: string }) {
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