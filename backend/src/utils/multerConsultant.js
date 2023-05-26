const fs = require("fs");

const path = require("path");
const multer = require("multer");

const storageConsultant = multer.diskStorage({
  destination(req, file, cb) {
    // On crée un dossier avec l'id du candidat pour l'upload du resume et de la picture
    const uploadFolder = path.join(__dirname, "..", "..", "public", "uploads");
    const consultantFolder = path.join(
      uploadFolder,
      "consultant",
      req.body.mail
    );

    if (!fs.existsSync(consultantFolder)) {
      fs.mkdirSync(consultantFolder, { recursive: true });
    }
    if (file.fieldname === "picture") {
      cb(null, consultantFolder);
    } else {
      cb(new Error("Invalid file field"));
    }
    req.pathFolder = consultantFolder;
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
  storageConsultant,
};
