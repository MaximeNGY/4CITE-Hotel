const bcrypt = require('bcryptjs');

const password = "password123";

async function testBcrypt() {
  // Hash du mot de passe
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("🔐 Mot de passe hashé :", hashedPassword);

  // Comparaison avec le bon mot de passe
  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log("✅ Correspondance correcte :", isMatch);

  // Comparaison avec un mot de passe faux
  const isMatchFalse = await bcrypt.compare("wrongpassword", hashedPassword);
  console.log("❌ Correspondance incorrecte :", isMatchFalse);
}

testBcrypt();
