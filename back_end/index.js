import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import Connnetdb from "./config/dbconnect.js";
import userRoutes from "./routes/AuthRoutes.js";
import attendenceRoutes from './routes/AttendenceRotes.js'
import laberExpenseRoutes from './routes/LaberExpenseseRoute.js'
import laberSideRoutes from './routes/LaberSideRoute.js'
// config dotenv
dotenv.config();

// create the server



const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: [
      "https://laber-management-app.onrender.com",
      "https://laber-management-app.vercel.app",
      'https://laber-management-app-1.onrender.com'
    ],
    credentials: true,
  })
);
// api end point
app.use("/api/auth", userRoutes);
// attenedence
app.use("/api/attendence", attendenceRoutes);
app.use("/api/expenses", laberExpenseRoutes);

// laber side routes
app.use("/api/laber", laberSideRoutes);

// api end point
app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(process.env.PORT || 3000, () => {
    Connnetdb();
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});