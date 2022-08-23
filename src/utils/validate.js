export const validate = (fields) => {
    if (fields?.email === "") {
        return { field: "email", message: "This is required." }
    }
    if (fields?.password === "") {
        return { field: "password", message: "This is required." }
    }
    if (fields?.password.length < 6) {
        return { field: "password", message: "Password must contain at least 6 characters" }
    }
    if (fields.password.length > 16) {
        return { field: "password", message: "Password must not be longer than 16 characters" }
    }
}