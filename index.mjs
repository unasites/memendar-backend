import express from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import routes from "./routes/index.mjs";

const app = express();

const PORT = 3000;

const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

mongoose
    .connect("mongodb://localhost:27017/memendar")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(error => {
        console.error("MongoDB connection error:", error);
    });
app.use(express.json());

app.use(cors(corsOptions));

app.use(
    session({
        secret: "porcaccio",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: "lax",
        },
        store: MongoStore.create({ client: mongoose.connection.getClient() }),
    })
);

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
