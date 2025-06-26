"use client"
import { Canvas } from "@/components/Canvas";
import { useEffect, useState } from "react";
import { WS_ENDPOINT } from "@/config";


export function RoomCanvas({ roomId } : { roomId : string }) {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WS_ENDPOINT}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZWM4Y2IyMi0zOGJhLTRhOGEtYTQ3ZS04OTE1NjhiYTE2NGYiLCJpYXQiOjE3NTA5NjYzMjcsImV4cCI6MTc1MTU3MTEyN30.E8lZJdtXOkzrnH6wNyacBubFE25UARjoNPYirREb4rA`);
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