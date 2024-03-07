let crypto = require("crypto");

function generatePassword(password) {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  console.log("Salt:", salt, "Hash:", hash);
}

const pw = "1234";
generatePassword(pw);
