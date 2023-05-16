import multer from "multer";

export const upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      let uploadPath = '';

      if (file.fieldname === 'passport') {
        uploadPath = `media/passport`;
      } else if (file.fieldname === 'visas') {
        uploadPath = `media/visa`;
      } else if (file.fieldname === 'cv') {
        uploadPath = `media/cv`;
      }

      cb(null, uploadPath);
    },
    filename: function(req, file, cb) {
      const fileType = file.mimetype.split('/')[1];
      const filename = `${req.user.username}-${file.fieldname}.${fileType}`;

      cb(null, filename);
    }
  }),
  fileFilter: function(req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
}).fields([
  { name: 'cv', maxCount: 1 },
  { name: 'passport', maxCount: 1 },
  { name: 'visas', maxCount: 5 }
]);


