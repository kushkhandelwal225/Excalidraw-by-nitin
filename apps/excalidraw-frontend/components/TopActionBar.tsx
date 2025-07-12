import axios from "axios";
import { Library, Redo2, Share, Trash2, Undo2, X } from "lucide-react";
import { useState } from "react";

export default function TopActionsBar({ roomId, handleDeletews, handleExportImage }: { roomId: string, handleDeletews: () => void, handleExportImage: () => void }) {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const token = localStorage.getItem("token");

    async function handleDelete() {
        try {
            handleDeletews();

            setShowConfirmation(false);
        } catch (error) {
            console.error("Error clearing room:", error);
            setShowConfirmation(false);
        }
    }

    function handleDeleteClick() {
        setShowConfirmation(true);
    }

    function handleCancel() {
        setShowConfirmation(false);
    }

    return (
        <>
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

                        <button
                            className="p-3 rounded-xl text-gray-800 cursor-pointer hover:bg-gray-50 transition-all duration-200 active:scale-95"
                            title="Clear canvas"
                            onClick={handleDeleteClick}
                        >
                            <Trash2 size={18} strokeWidth={2} />
                        </button>

                        <div className="w-px h-8 bg-gray-200 mx-2" />

                        <button className="p-3 rounded-xl text-gray-800 hover:bg-gray-50 transition-all duration-200 active:scale-95" title="Library">
                            <Library size={18} strokeWidth={2} />
                        </button>

                        <div className="w-px h-8 bg-gray-200 mx-2" />

                        <button className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-200 flex items-center gap-2 font-medium active:scale-95"
                            onClick={handleExportImage}
                        >
                            <Share size={16} strokeWidth={2} />
                            Export
                        </button>
                    </div>
                </div>
            </div>

            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-md w-full mx-4 pointer-events-auto drop-shadow-2xl" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 60px rgba(0, 0, 0, 0.08)' }}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Clear Canvas</h3>
                            <button
                                onClick={handleCancel}
                                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <p className="text-gray-600 mb-6">
                            This will clear the whole canvas. Are you sure?
                        </p>

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white cursor-pointer rounded-lg hover:bg-red-700 transition-all duration-200 font-medium flex items-center gap-2"
                            >
                                <Trash2 size={16} />
                                Clear Canvas
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}