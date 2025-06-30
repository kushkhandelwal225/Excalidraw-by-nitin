import { HTTP_ENDPOINT } from "@/config";
import axios from "axios";

export async function getExistingShapes(roomId: string) {
    const token = localStorage.getItem("token")
    const res = await axios.get(`${HTTP_ENDPOINT}/chat/${roomId}`, {
        headers: {
            Authorization: token
        }
    });
    const messages = res.data.chats;

    const shapes = messages.map((x: { message: string }) => {
        const messageData = JSON.parse(x.message)
        return messageData.shape;
    })

    return shapes;
}