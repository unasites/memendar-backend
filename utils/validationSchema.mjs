export const createUserValidationSchema = {
    username: {
        isLength: {
            options: { min: 3, max: 30 },
            errorMessage: "Username must be between 3 and 30 characters",
        },
        notEmpty: { errorMessage: "Username is required" },
        isString: { errorMessage: "Username must be a string" },
    },

    password: {
        notEmpty: { errorMessage: "Password is required" },
        isLength: {
            options: { min: 6 },
            errorMessage: "Password must be at least 6 characters long",
        },
        isString: { errorMessage: "Password must be a string" },
    },
};

export const createMemesValidationSchema = {
    imageUrl: {
        isURL: { errorMessage: "Image URL must be a valid URL" },
        notEmpty: { errorMessage: "Image URL is required" },
        isString: { errorMessage: "Image URL must be a string" },
    },
    title: {
        isLength: {
            options: { min: 1, max: 100 },
            errorMessage: "Title must be between 1 and 100 characters",
        },
        notEmpty: { errorMessage: "Title is required" },
        isString: { errorMessage: "Title must be a string" },
    },
    roomId: {
        isMongoId: { errorMessage: "Room ID must be a valid MongoDB ObjectId" },
        notEmpty: { errorMessage: "Room ID is required" },
        isString: { errorMessage: "Room ID must be a string" },
    },
    month: {
        optional: true,
        isInt: {
            options: { min: 1, max: 12 },
            errorMessage: "Month must be an integer between 1 and 12",
        },
        notEmpty: { errorMessage: "Month is required" },
    },
    year: {
        optional: true,
        isInt: {
            options: { min: 2000, max: 2100 },
            errorMessage: "Year must be an integer between 2000 and 2100",
        },
        notEmpty: { errorMessage: "Year is required" },
    },
};

export const createRoomValidationSchema = {
    name: {
        isLength: {
            options: { min: 3, max: 50 },
            errorMessage: "Room name must be between 3 and 50 characters",
        },
        notEmpty: { errorMessage: "Room name is required" },
        isString: { errorMessage: "Room name must be a string" },
    },
    ownerId: {
        isMongoId: { errorMessage: "Owner ID must be a valid MongoDB ObjectId" },
        notEmpty: { errorMessage: "Owner ID is required" },
        isString: { errorMessage: "Owner ID must be a string" },
    },
    roomCode: {
        isLength: {
            options: { min: 8, max: 8 },
            errorMessage: "Room code must be exactly 8 characters",
        },
        notEmpty: { errorMessage: "Room code is required" },
        isString: { errorMessage: "Room code must be a string" },
    },
};
