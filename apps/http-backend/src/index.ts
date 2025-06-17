import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { middleware } from './middleware';
import {JWT_SECRET} from '@repo/backend-common/config'
import {CreateUserSchema, SigninSchema} from '@repo/common/types'

const app = express();
app.use(express.json())


app.post("/signup", async (req : Request, res : Response) => {
    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        console.log(parsedData.error);
        return res.status(400).json({
            message: "Incorrect inputs"
        });
    }

    const { username, password, name } = parsedData.data;

    try {
        const existingUser = await prismaClient.user.findFirst({
            where: {
                username: username
            }
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const user = await prismaClient.user.create({
            data: {
                username: username,
                password: hashedPass,
                name: name
            }
        });

        return res.status(201).json({
            userId: user.id
        });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

app.post("/signin", async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

    const correctPassword = await bcrypt.compare(parsedData.data.password, parsedData.data.password);
    if (!correctPassword) {
        res.status(403).json({
            message: "Incorrect password"
        })
        return;
    }
    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    })

    if (!user) {
        res.status(403).json({
            message: "User not found"
        })
        return;
    }

    const token = jwt.sign({
        userId: user?.id
    }, JWT_SECRET);

    res.json({
        token
    })
})
app.post("create-room", middleware , (req, res) => {
    const { roomId } = req.body;
    
})

app.listen(3001, () => {
    console.log('Example app listening on port 3000!');
});