import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001


//cors config

app.use(cors({
    origin: "http://localhost:5173",
    })
);
//middleware
app.use(express.json()); //this middleware will parse JSON bodies: req.body


app.use(rateLimiter);



app.use("/api/notes", notesRoutes);


//connect DB before listening
connectDB().then( () => {
    app.listen(PORT, () => {
        console.log("Sever started on PORT:", PORT);
    });
});


