import "./env.js";
import express from "express";
import cors from "cors";
import Joi from "joi";
import { db } from "./database.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const userSchema = Joi.object({
    firstName: Joi.string().min(1).max(50),
    lastName: Joi.string().min(1).max(50),
    address: Joi.string().min(1).max(200),
    email: Joi.string().email().min(1).max(100),
});

app.post("/user", async (req, res) => {
    const validation = userSchema.validate(req.body);
    if (validation.error) {
        res.status(422).json(validation);
        return;
    }
    await db.collection("users").insertOne(req.body);
    res.json({ message: "User signed up successfully" });
});

app.get("/user", async (req, res) => {
    const search = req.query.search;
    const page = parseInt(req.query.page) ?? 1;
    const limit = 10;
    const skipAmount = (page - 1) * limit;
    const users = await db
        .collection("users")
        .find({ firstName: { $regex: search, $options: "i" } })
        .skip(skipAmount)
        .limit(limit)
        .toArray();
    const total = await db
        .collection("users")
        .countDocuments({ firstName: { $regex: search, $options: "i" } });
    const pages = Math.ceil(total / limit);
    res.json({ users, pages });
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
