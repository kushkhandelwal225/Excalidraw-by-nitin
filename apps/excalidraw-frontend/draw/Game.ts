import { Tool } from "@/components/Canvas";
import { getExistingShapes } from "./http";
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


export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[] = [];
    private roomId: string;
    private socket: WebSocket;
    private clicked: boolean;
    private startX: number;
    private startY: number;
    private selectedTool: Tool = "rect";


    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.existingShapes = [];
        this.roomId = roomId;
        this.socket = socket;
        this.clicked = false;
        this.startX = 0;
        this.startY = 0;
        this.init();
        this.initHandlers();
        this.initMouseHandlers();
    }
    destroy(){
        this.canvas.removeEventListener("mousedown", this.mouseDownhandler);
        this.canvas.removeEventListener("mouseup", this.mouseUphandler);
        this.canvas.removeEventListener("mousemove", this.mouseMovehandler);
    }

    setTool(tool: "rect" | "circle" | "line") {
        this.selectedTool = tool;
    }

    async init() {
        this.existingShapes = await getExistingShapes(this.roomId);
        this.clearCanvas();
    }
    initHandlers() {

        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "chat") {
                const shape = JSON.parse(message.message);
                this.existingShapes.push(shape.shape);
                this.clearCanvas();
            }
        };
    }
    clearCanvas() {


        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.existingShapes.map((shape) => {
            if (shape.type === "rect") {
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            }
            else if (shape.type === "circle") {


                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, 2 * Math.PI);
                this.ctx.stroke();
                this.ctx.closePath();
            }
            else if (shape.type === "line") {
                this.ctx.beginPath();
                this.ctx.moveTo(shape.startX, shape.startY);
                this.ctx.lineTo(shape.endX, shape.endY);
                this.ctx.stroke();
            }
        });
    }

    mouseDownhandler = (e) => {
        this.clicked = true;
        this.startX = e.clientX;
        this.startY = e.clientY
    }

    mouseUphandler = (e) => {
        this.clicked = false;
        const width = e.clientX - this.startX;
        const height = e.clientY - this.startY;
        const selectedTool = this.selectedTool;
        console.log(selectedTool);
        let shape: Shape | null = null;
        if (selectedTool === "rect") {
            shape = {
                // @ts-ignore
                type: "rect",
                x: this.startX,
                y: this.startY,
                width,
                height
            }
        }
        else if (selectedTool === "circle") {
            const centerX = this.startX + width / 2;
            const centerY = this.startY + height / 2;
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
                startX: this.startX,
                startY: this.startY,
                endX: e.clientX,
                endY: e.clientY
            }

        }
        if (!shape) return;
        this.existingShapes.push(shape);

        this.socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            }),
            roomId: this.roomId
        }))
    }
    mouseMovehandler = (e) =>{
        if (this.clicked) {
            const width = e.clientX - this.startX;
            const height = e.clientY - this.startY;
            this.clearCanvas();
            // @ts-ignore
            const selectedTool = this.selectedTool;
            if (selectedTool === "rect") {
                this.ctx.strokeRect(this.startX, this.startY, width, height);
            }
            else if (selectedTool === "circle") {
                const centerX = this.startX + width / 2;
                const centerY = this.startY + height / 2;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, Math.abs(width / 2), 0, 2 * Math.PI);
                this.ctx.stroke();
                this.ctx.closePath();
            }
            else if (selectedTool === "line") {
                this.ctx.beginPath();
                this.ctx.moveTo(this.startX, this.startY);
                this.ctx.lineTo(e.clientX, e.clientY);
                this.ctx.stroke();
            }



        }
    }
    initMouseHandlers() {
        
        this.canvas.addEventListener("mousedown", this.mouseDownhandler);

        this.canvas.addEventListener("mouseup", this.mouseUphandler);
        this.canvas.addEventListener("mousemove", this.mouseMovehandler)
    }
}