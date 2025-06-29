"use client"
import { AuthPage } from "@/components/AuthPage";
import axios from "axios";
import { useState } from "react";

export default function Signin(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignin = async () =>{
        const response = await axios.post("http://localhost:3001/signin", {
            username,
            password
            
        })
        const token = response.data.token;
        localStorage.setItem("token", token)
    }
    return (
        <div>
            <input type="text" placeholder="username" value={username}
                onChange={(e) =>{
                    setUsername(e.target.value);
                }}
            />
            
            <input type="password" placeholder="password" value={password}
            onChange={(e) =>{
                    setPassword(e.target.value);
                }}
            />
            <button onClick={handleSignin}>signin</button>

        </div>
    )
}