const fs = require("fs");

const path = require("path");
const multer = require("multer");

const storageOffer = multer.diskStorage({
  destination(req, file, cb) {
    // On crée un dossier avec l'id du candidat pour l'upload du resume et de la picture
    const uploadFolder = path.join(__dirname, "..", "..", "public", "uploads");

    const offerFolder = path.join(
      uploadFolder,
      "offer",
      req.body.recruiterId.toString()
    );

    if (!fs.existsSync(offerFolder)) {
      fs.mkdirSync(offerFolder, { recursive: true });
    }
    if (file.fieldname === "teamPicture") {
      cb(null, offerFolder);
    } else {
      cb(new Error("Invalid file field"));
    }
    req.pathFolder = offerFolder;
  },
  filename(req, file, cb) {
    // On génère un nom de fichier unique pour chaque fichier uploadé
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = file.originalname.split(".").pop();
    const fileName = `${file.fieldname}-${uniqueSuffix}.${extension}`;

    cb(null, fileName);
  },
});

module.exports = {
  storageOffer,
};
