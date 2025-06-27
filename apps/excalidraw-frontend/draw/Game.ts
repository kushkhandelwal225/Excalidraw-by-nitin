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

} | {
    type: "pencil";
    points: { x: number; y: number }[];
} | {
    type: "arrow";
    startX: number;
    startY: number;
    endX: number;
    endY: number;

}


export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[] = [];
    private pencilPath: { x: number; y: number }[] = [];
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
    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownhandler);
        this.canvas.removeEventListener("mouseup", this.mouseUphandler);
        this.canvas.removeEventListener("mousemove", this.mouseMovehandler);
    }

    setTool(tool: "rect" | "circle" | "line" | "pencil" | "arrow") {
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
        this.ctx.lineWidth = 2;

        this.existingShapes.forEach((shape, index) => {
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
                this.ctx.closePath();
            }
            else if (shape.type === "pencil") {
                if (shape.points.length < 2) return;

                this.ctx.beginPath();
                this.ctx.moveTo(shape.points[0].x, shape.points[0].y);

                for (let i = 1; i < shape.points.length; i++) {
                    this.ctx.lineTo(shape.points[i].x, shape.points[i].y);
                }

                this.ctx.stroke();
            }
            else if (shape.type === "arrow") {
                this.ctx.beginPath();
                this.ctx.moveTo(shape.startX, shape.startY);
                this.ctx.lineTo(shape.endX, shape.endY);
                this.ctx.stroke();

                this.drawArrowhead(this.ctx, shape.startX, shape.startY, shape.endX, shape.endY);
            }
        });
    }
    drawArrowhead(ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) {
        const headLength = 15;
        const angle = Math.atan2(toY - fromY, toX - fromX);

        ctx.beginPath();
        ctx.moveTo(toX, toY);
        ctx.lineTo(
            toX - headLength * Math.cos(angle - Math.PI / 6),
            toY - headLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.moveTo(toX, toY);
        ctx.lineTo(
            toX - headLength * Math.cos(angle + Math.PI / 6),
            toY - headLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.stroke();
    }

    mouseDownhandler = (e) => {
        this.clicked = true;
        const rect = this.canvas.getBoundingClientRect();
        this.startX = e.clientX - rect.left;
        this.startY = e.clientY - rect.top;
        if (this.selectedTool === "pencil") {
            this.pencilPath = [{ x: this.startX, y: this.startY }];
        }
    }

    mouseUphandler = (e) => {
        if (!this.clicked) return;
        this.clicked = false;

        const rect = this.canvas.getBoundingClientRect();
        const endX = e.clientX - rect.left;
        const endY = e.clientY - rect.top;

        const width = endX - this.startX;
        const height = endY - this.startY;
        const selectedTool = this.selectedTool;

        let shape: Shape | null = null;

        if (selectedTool === "rect") {
            shape = {
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
                type: "circle",
                centerX,
                centerY,
                radius: Math.sqrt(width * width + height * height) / 2
            }
        }
        else if (selectedTool === "line") {
            shape = {
                type: "line",
                startX: this.startX,
                startY: this.startY,
                endX: endX,
                endY: endY
            }
        }
        else if (selectedTool === "pencil") {
            if (this.pencilPath.length > 1) {
                shape = {
                    type: "pencil",
                    points: [...this.pencilPath] 
                };
                this.existingShapes.push(shape);
                this.socket.send(JSON.stringify({
                    type: "chat",
                    message: JSON.stringify({ shape }),
                    roomId: this.roomId
                }));
            }
            this.pencilPath = [];
            return;
        }
        else if (selectedTool === "arrow") {
            shape = {
                type: "arrow",
                startX: this.startX,
                startY: this.startY,
                endX: endX,
                endY: endY
            }
        }

        if (!shape) return;
        this.existingShapes.push(shape);
        this.socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({ shape }),
            roomId: this.roomId
        }));
    }

    mouseMovehandler = (e) => {
        if (!this.clicked) return;

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.clearCanvas();

        if (this.selectedTool === "rect") {
            const width = x - this.startX;
            const height = y - this.startY;
            this.ctx.strokeRect(this.startX, this.startY, width, height);
        }
        else if (this.selectedTool === "circle") {
            const width = x - this.startX;
            const height = y - this.startY;
            const centerX = this.startX + width / 2;
            const centerY = this.startY + height / 2;
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, Math.sqrt(width * width + height * height) / 2, 0, 2 * Math.PI);
            this.ctx.stroke();
            this.ctx.closePath();
        }
        else if (this.selectedTool === "line") {
            this.ctx.beginPath();
            this.ctx.moveTo(this.startX, this.startY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }
        else if (this.selectedTool === "pencil") {
            this.pencilPath.push({ x, y });

            if (this.pencilPath.length < 2) return;

            this.ctx.beginPath();
            this.ctx.moveTo(this.pencilPath[0].x, this.pencilPath[0].y);

            for (let i = 1; i < this.pencilPath.length; i++) {
                this.ctx.lineTo(this.pencilPath[i].x, this.pencilPath[i].y);
            }

            this.ctx.stroke();
            return;
        }
        else if (this.selectedTool === "arrow") {
            // Draw the line
            this.ctx.beginPath();
            this.ctx.moveTo(this.startX, this.startY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
            this.drawArrowhead(this.ctx, this.startX, this.startY, x, y);
        }

        this.existingShapes.forEach(shape => {
            if (shape.type === "pencil") {
                if (shape.points.length < 2) return;

                this.ctx.beginPath();
                this.ctx.moveTo(shape.points[0].x, shape.points[0].y);

                for (let i = 1; i < shape.points.length; i++) {
                    this.ctx.lineTo(shape.points[i].x, shape.points[i].y);
                }

                this.ctx.stroke();
            }
        });
    }
    initMouseHandlers() {

        this.canvas.addEventListener("mousedown", this.mouseDownhandler);

        this.canvas.addEventListener("mouseup", this.mouseUphandler);
        this.canvas.addEventListener("mousemove", this.mouseMovehandler)
    }
}