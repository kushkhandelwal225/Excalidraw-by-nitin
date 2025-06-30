import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { middleware } from './middleware';
import { JWT_SECRET } from '@repo/backend-common/config'
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from '@repo/common/types'
import { prismaClient } from '@repo/db/client';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}
app.post("/signup", async (req: Request, res: Response) => {
    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        console.log(parsedData.error);
        res.status(400).json({
            message: "Incorrect inputs"
        });
        return;
    }

    const { username, password, name } = parsedData.data;

    try {
        const existingUser = await prismaClient.user.findFirst({
            where: {
                username: username
            }
        });

        if (existingUser) {
            res.status(409).json({
                message: "User already exists"
            });
            return
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const user = await prismaClient.user.create({
            data: {
                username: username,
                password: hashedPass,
                name: name
            }
        });
        const token = jwt.sign(
            { userId: user.id },
            JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.status(201).json({
            message: "User created successfully",
            userId: user.id,
            token: token
        });
        return;

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return
    }
});
app.post("/signin", async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            message: "Incorrect inputs"
        });
        return;
    }

    const { username, password } = parsedData.data;

    try {
        const user = await prismaClient.user.findFirst({
            where: {
                username: username
            }
        });

        if (!user) {
            res.status(403).json({
                message: "User not found"
            });
            return
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(403).json({
                message: "Incorrect password"
            });
            return;
        }

        const token = jwt.sign(
            { userId: user.id },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({ token });
        return;

    } catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({
            message: "Something went wrong"
        });
        return;
    }
});
app.post("/create-room", middleware, async (req: Request, res: Response) => {
    const { roomName } = req.body;

    try {
        const existing = await prismaClient.room.findFirst({
            where: {
                slug: roomName
            }
        })
        if (existing) {
            res.status(411).json({
                message: "Room with this name already exists"
            })
            return;
        }
        const room = await prismaClient.room.create({
            data: {
                slug: roomName,
                adminId: req.userId ?? ""
            },
        });

        res.status(200).json({
            roomId: room.id,
            admin: req.userId
        });
    } catch (e) {
        console.error("Room creation error:", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get("/chat/:roomId", middleware, async (req: Request, res: Response) => {
    try {
        const roomId = Number(req.params.roomId);

        const chats = await prismaClient.chat.findMany({
            where: {
                roomId
            },
            orderBy: {
                id: "desc"
            }
        })
        res.status(200).json({
            chats
        })
    }
    catch (e) {
        console.log(e);
        res.json({
            messages: []
        })
    }

})

app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug
        }
    });

    res.json({
        room
    })
})


app.post("/clear-room", middleware, async (req, res) => {
    try {
        const roomId = parseInt(req.body.roomId);
        await prismaClient.chat.deleteMany({
            where: {
                roomId
            }
        })
        res.status(200).json({
            message: "chats deleated"
        })
    }
    catch (e) {
        console.error("Error deleting chats:", e); // logs full error in server logs
        res.status(500).json({
            error: "Internal server error while deleting chats."
        });
    }
})



app.listen(3001, () => {
    console.log('Example app listening on port 3001!');
});