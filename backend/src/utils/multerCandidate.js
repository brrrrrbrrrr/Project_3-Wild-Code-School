const fs = require("fs");

const path = require("path");
const multer = require("multer");

const storageCandidate = multer.diskStorage({
  destination(req, file, cb) {
    // On crée un dossier avec l'id du candidat pour l'upload du resume et de la picture
    const uploadFolder = path.join(__dirname, "..", "..", "public", "uploads");
    const candidateFolder = path.join(uploadFolder, "candidate", req.body.mail);

    if (!fs.existsSync(candidateFolder)) {
      fs.mkdirSync(candidateFolder, { recursive: true });
    }
    if (file.fieldname === "resume") {
      cb(null, candidateFolder);
    } else if (file.fieldname === "picture") {
      cb(null, candidateFolder);
    } else {
      cb(new Error("Invalid file field"));
    }
    req.pathFolder = candidateFolder;
  },
  filename(req, file, cb) {
    // On génère un nom de fichier unique pour chaque fichier uploadé
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = file.originalname.split(".").pop();
    const fileName = `${file.fieldname}-${uniqueSuffix}.${extension}`;

    cb(null, fileName);
  },
});

const UpdateStorageCandidate = multer.diskStorage({
  destination(req, file, cb) {
    // On crée un dossier avec l'id du candidat pour l'upload du resume et de la picture
    const uploadFolder = path.join(__dirname, "..", "..", "public", "uploads");
    const candidateFolder = path.join(
      uploadFolder,
      "candidate",
      req.params.id.toString()
    );

    if (!fs.existsSync(candidateFolder)) {
      fs.mkdirSync(candidateFolder, { recursive: true });
    }
    if (file.fieldname === "resume") {
      cb(null, candidateFolder);
    } else if (file.fieldname === "picture") {
      cb(null, candidateFolder);
    } else {
      cb(new Error("Invalid file field"));
    }
    req.pathFolder = candidateFolder;
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
  storageCandidate,
  UpdateStorageCandidate,
};
