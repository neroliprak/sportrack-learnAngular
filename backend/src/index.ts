import express from "express";
import router from "./routes/user.routes";
import { AppDataSource } from "./database/datasource";
import { User } from "./entities/User";
import cors from "cors";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

const PORT = 5001;

// Initialize database connection
AppDataSource.initialize()
  // when connected successfully
  .then(async () => {
    console.log("Database connected!");
    app.use("/api/users", router);

    app.listen(PORT, () =>
      console.log(`Server running on http://127.0.0.1:${PORT}`)
    );
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
