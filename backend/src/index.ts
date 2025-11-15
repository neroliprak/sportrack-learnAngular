import express from "express";
import router from "./routes/user.routes";
import { AppDataSource } from "./database/datasource";
import { User } from "./entities/User";

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
const PORT = 5001;

// Initialize database connection
AppDataSource.initialize()
  // when connected successfully
  .then(async () => {
    console.log("Database connected!");

    const userRepo = AppDataSource.getRepository(User);

    // Create and save a new user
    const newUser = userRepo.create({
      firstname: "Alice",
      lastname: "Doe",
      email: "alice@example.com",
      password: "1234",
    });

    // await userRepo.save(newUser);
    console.log(newUser);

    app.use("/users", router);

    app.listen(PORT, () =>
      console.log(`Server running on http://127.0.0.1:${PORT}`)
    );
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
