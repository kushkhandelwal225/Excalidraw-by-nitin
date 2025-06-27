import { HTTP_ENDPOINT } from "@/config";
import axios from "axios";

export async function getExistingShapes(roomId: string) {
    const res = await axios.get(`${HTTP_ENDPOINT}/chat/${roomId}`, {
        headers: {
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZWM4Y2IyMi0zOGJhLTRhOGEtYTQ3ZS04OTE1NjhiYTE2NGYiLCJpYXQiOjE3NTA5NjYzMjcsImV4cCI6MTc1MTU3MTEyN30.E8lZJdtXOkzrnH6wNyacBubFE25UARjoNPYirREb4rA"
        }
    });
    const messages = res.data.chats;

    const shapes = messages.map((x: { message: string }) => {
        const messageData = JSON.parse(x.message)
        return messageData.shape;
    })

    return shapes;
}