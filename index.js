import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnect } from "./middleware/db.js";
import uRouter from "./routes/userRoutes.js";
import cRouter from "./routes/coreRoutes.js";
import aRouter from "./routes/adminRoutes.js";
import eRouter from "./routes/employerRoutes.js";
import sRouter from "./routes/seekerRoutes.js";
import { getCurrentUser, requireAccountType } from "./middleware/auth.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect().then(() => {
  app.listen(port, "0.0.0.0", () => console.log("App running on Port 3333"));
});

app.use("/api/users", uRouter);
app.use("/api/core", cRouter);
app.use("/api/admin", getCurrentUser, requireAccountType("admin"), aRouter);
app.use("/api/employers", getCurrentUser, requireAccountType("employer"), eRouter);
app.use("/api/seekers", getCurrentUser, requireAccountType("seeker"), sRouter);
