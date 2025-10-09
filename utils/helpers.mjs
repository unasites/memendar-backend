import bcrypt from "bcrypt";

export const hashPassword = password => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);

    return bcrypt.hashSync(password, salt);
};

export const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};

export const generateUniqueCode = (length = 8) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let code = "";

    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return code;
};
