import dotenv from "dotenv";
import app from "./app";
import "./db";
dotenv.config();
import "./models/Video";
import "./models/User";
import "./models/Comment";

const PORT = process.env.PORT || 4000;

const handleListening = () => console.log(`Listening on : http://localhost:${PORT}`)

app.listen(PORT,handleListening);