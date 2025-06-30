
export default function ZoomControls() {
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