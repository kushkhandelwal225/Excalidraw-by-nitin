"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {

    const [username, setUsername] = useState("");
    const [name, setname] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter()

    const handleSignup = async () => {
        const response = await axios.post("http://localhost:3001/signup", {
            username,
            name,
            password
        });
        const token = response.data.token;
        localStorage.setItem("token", token);
        const room = await axios.post("http://localhost:3001/create-room",
            {
                "roomName": username
            },
            {
                headers : {
                    Authorization : token
                }
            }
        ) 
        const roomId = room.data.roomId;
        router.push(`/canvas/${roomId}`)
    }
    return (
        <div>
            <input type="text" placeholder="username" value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            />
            <input type="text" placeholder="name" value={name}
                onChange={(e) => {
                    setname(e.target.value);
                }}
            />
            <input type="password" placeholder="password" value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <button onClick={handleSignup}>Signup</button>

        </div>
    )
}