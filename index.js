import express from "express";
import morgan from "morgan";
import { dbConnect } from "./middleware/db.js"
import uRouter from "./routes/userRoutes.js"
import aRouter from "./routes/adminRoutes.js"
import eRouter from "./routes/employerRoutes.js"
import sRouter from "./routes/seekerRoutes.js"
import { getCurrentUser, requireAccountType } from "./middleware/auth.js"

const app = express();


app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect()
  .then(() => {
    app.listen(3333, () => console.log('App running on Port 3333'));
  });


app.use("/api/users", uRouter)
app.use("/api/admin", getCurrentUser, requireAccountType("admin"), aRouter)
app.use("/api/employers", getCurrentUser, requireAccountType("employer"), eRouter)
app.use("/api/seekers", getCurrentUser, requireAccountType("seeker"), sRouter)
// app.use("/api/core", )
