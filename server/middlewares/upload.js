import multer from "multer";
import path from "path";

// Cấu hình nơi lưu video
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Lưu vào thư mục uploads/
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Tạo tên file duy nhất
  },
});

// Chỉ cho phép upload file video
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /mp4|mov|avi|mkv/; // Định dạng video hợp lệ
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    if (extName) {
      return cb(null, true);
    }
    cb("Error: Only video files are allowed!");
  },
});

export default upload;
