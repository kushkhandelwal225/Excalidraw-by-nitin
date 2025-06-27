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
} | {
    type: "line";
    startX: number;
    startY: number;
    endX: number;
    endY: number;

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
        // @ts-ignore
        const selectedTool = window.selectedTool;
        let shape : Shape | null = null;
        if (selectedTool === "rect") {
            shape = {
                // @ts-ignore
                type: "rect",
                x: startX,
                y: startY,
                width,
                height
            }
        }
        else if (selectedTool === "circle") {
            const centerX = startX + width / 2;
            const centerY = startY + height / 2;
            shape = {
                // @ts-ignore
                type: "circle",
                centerX,
                centerY,
                radius: width / 2
            }
        }
        else if (selectedTool === "line") {
            shape = {
                // @ts-ignore
                type: "line",
                startX,
                startY,
                endX: e.clientX,
                endY: e.clientY
            }
            
        }
        if (!shape) return;
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
            // @ts-ignore
            const selectedTool = window.selectedTool;
            if (selectedTool === "rect") {
                ctx.strokeRect(startX, startY, width, height);
            }
            else if (selectedTool === "circle") {
                const centerX = startX + width / 2;
                const centerY = startY + height / 2;
                ctx.beginPath();
                ctx.arc(centerX, centerY, width / 2, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.closePath();
            }
            else if (selectedTool === "line") {
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(e.clientX, e.clientY);
                ctx.stroke();
            }



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
        else if (shape.type === "circle") {

            
            ctx.beginPath();
            ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
        }
        else if (shape.type === "line") {
            ctx.beginPath();
            ctx.moveTo(shape.startX, shape.startY);
            ctx.lineTo(shape.endX, shape.endY);
            ctx.stroke();
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

    const shapes = messages.map((x: { message: string }) => {
        const messageData = JSON.parse(x.message)
        return messageData.shape;
    })

    return shapes;
}