"use client"
import axios from "axios";
import { useState } from "react";

export default function Signup(){

    const [username, setUsername] = useState("");
    const [name, setname] = useState("");
    const [password, setPassword] = useState("");

    const handleSignin = async () =>{
        await axios.post("http://localhost:3001/signup", {
            username,
            name,
            password
        })
    }
    return (
        <div>
            <input type="text" placeholder="username" value={username}
                onChange={(e) =>{
                    setUsername(e.target.value);
                }}
            />
            <input type="text" placeholder="name" value={name}
            onChange={(e) =>{
                    setname(e.target.value);
                }}
            />
            <input type="password" placeholder="password" value={password}
            onChange={(e) =>{
                    setPassword(e.target.value);
                }}
            />
            <button onClick={handleSignin}>Signup</button>

        </div>
    )
}