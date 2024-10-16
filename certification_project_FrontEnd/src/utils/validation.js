
export const validateRequired = (value) => {
    return value.trim() !== ""; 
};


export const validateGmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email); 
};


export const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const isValidLength = password.length >= 8; 

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength; 
};
export const validateUsername = (username) => {
   
    const hasValidLength = username.length >= 3; 
    const hasInvalidChars = /[^a-zA-Z0-9]/.test(username); 

    return hasValidLength && !hasInvalidChars; 
};