"use client"
import { Canvas } from "@/components/Canvas";
import { useEffect, useState } from "react";
import { WS_ENDPOINT } from "@/config";


export function RoomCanvas({ roomId } : { roomId : string }) {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token")
        const ws = new WebSocket(`${WS_ENDPOINT}?token=${token}`);
       ws.onopen = () => {
            setSocket(ws);
            const data = JSON.stringify({
                type: "join_room",
                roomId
            });
            console.log(data);
            ws.send(data)
        }
       
    }, []);
    
     if (!socket) return <div>connecting to server</div>;

    return (
        <div>
            <Canvas roomId = {roomId} socket={socket} />
        </div>
        
    );
}