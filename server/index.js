const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {dbConnect} = require("./config/dbConnect");
const authRouter = require("./route/Auth");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 4000;

app.listen( port, () => console.log(`Server Running on port ${port}`));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));

app.use("/api/v1/auth/", authRouter);

dbConnect();

