import axios from "axios";
import { Library, Redo2, Share, Trash2, Undo2 } from "lucide-react";

export default function TopActionsBar({ roomId, setcoin, coin }: { roomId: string, setcoin: React.Dispatch<React.SetStateAction<boolean>>, coin : boolean}) {

    const token = localStorage.getItem("token")

    async function handleDelete() {
        await axios.post("http://localhost:3001/clear-room", {
            roomId
        },
            {
                headers: {
                    Authorization: token
                }
            }

        )
        setcoin(c => !c)
    }

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

                    <button className="p-3 rounded-xl text-gray-800 hover:bg-gray-50 transition-all duration-200 active:scale-95" title="Clear canvas"
                        onClick={handleDelete}
                    >
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