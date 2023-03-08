import multer from "multer";

const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: function (req, file, cb) {
    const extension = file.originalname.slice(
      file.originalname.lastIndexOf(".")
    );
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
