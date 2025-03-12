const bcrypt = require('bcrypt');

test('Le mot de passe doit être hashé correctement', async () => {
    const password = "password123";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const isMatch = await bcrypt.compare(password, hashedPassword);
    expect(isMatch).toBe(true);
});
