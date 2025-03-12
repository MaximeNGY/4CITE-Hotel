const bcrypt = require('bcryptjs');

const hashFromMongoDB = "$2b$10$MrJg03RhCUkeP3IbUpYNWeR6pIYPaIjw/D0/k2/hEkuKBX7bgyNm.";
const password = "password123";

async function checkPassword() {
  const isMatch = await bcrypt.compare(password, hashFromMongoDB);
  console.log("🔍 Résultat bcrypt.compare() :", isMatch);
}

checkPassword();
