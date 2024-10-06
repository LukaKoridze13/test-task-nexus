import { Router } from "express";
import multer from "multer";
import {
  uploadFile,
  updateFile,
  deleteFile,
} from "../controllers/s3Controller";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Define routes
router.post("/upload", upload.single("file"), uploadFile);
router.put("/update/:key", upload.single("file"), updateFile);
router.delete("/delete/:key", deleteFile);

export default router;
