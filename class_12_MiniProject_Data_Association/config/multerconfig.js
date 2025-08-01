const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

// disk-storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/upload')
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12,function(err,data){
        const fn = data.toString("hex") + path.extname(file.originalname);;
        cb(null, fn);
    }) 
  }
})


// upload variable
const upload = multer({ storage: storage })


// export upload variable
module.exports = upload;