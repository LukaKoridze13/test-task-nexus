import express from "express";
import "dotenv/config";
import s3Routes from "./routes/s3Routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Use the S3 router
app.use("/api/s3", s3Routes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
