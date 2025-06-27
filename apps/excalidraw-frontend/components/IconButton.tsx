export default function IconButton({ children, onClick, activated }:
    {
        children: React.ReactNode,
        onClick: () => void,
        activated : boolean
    }) {
    return (
        <button
            className={`bg-gray-200 rounded-full p-2 hover:bg-gray-300 ${activated ? "bg-gray-500" : ""}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}