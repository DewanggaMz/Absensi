import express from "express";
import cors from "cors";
const port = 3200;

import db from "./database.config.js";
db.sync().then(() => console.log("database ready!"));

import usersEnpoint from "./routers/users.js";
import absensiEnpoint from "./routers/absensi.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", usersEnpoint);
app.use("/absensi", absensiEnpoint);

app.listen(port, () => console.log(`server is running in port ${port}`));
