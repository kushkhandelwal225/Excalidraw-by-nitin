import { HTTP_ENDPOINT } from "@/config";
import axios from "axios";

type Shape = {
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
}


export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    const ctx = canvas.getContext("2d");

    let existingShapes: Shape[] = await getExistingShapes(roomId);

    if (!ctx) return;

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "chat") {
            const shape = JSON.parse(message.message);
            existingShapes.push(shape.shape);
            clearCanvas(existingShapes, canvas);
        }
    };
    clearCanvas(existingShapes, canvas);
    let clicked = false;
    let startX = 0;
    let startY = 0;
    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY

    });

    canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        const shape: Shape = {
            type: "rect",
            x: startX,
            y: startY,
            width,
            height
        }
        existingShapes.push(shape);
        socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            }),
            roomId
        }))

    });
    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            clearCanvas(existingShapes, canvas);
            ctx.strokeRect(startX, startY, width, height);

        }

    })
}

function clearCanvas(existingShapes: Shape[], canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    existingShapes.map((shape) => {
        if (shape.type === "rect") {
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }
    });
}
async function getExistingShapes(roomId: string) {
    const res = await axios.get(`${HTTP_ENDPOINT}/chat/${roomId}`, {
        headers: {
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZWM4Y2IyMi0zOGJhLTRhOGEtYTQ3ZS04OTE1NjhiYTE2NGYiLCJpYXQiOjE3NTA5NjYzMjcsImV4cCI6MTc1MTU3MTEyN30.E8lZJdtXOkzrnH6wNyacBubFE25UARjoNPYirREb4rA"
        }
    });
    const messages = res.data.chats;

    const shapes = messages.map((x: {message: string}) => {
        const messageData = JSON.parse(x.message)
        return messageData.shape;
    })

    return shapes;
}