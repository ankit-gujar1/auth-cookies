import jwt from "jsonwebtoken";

export const generateTokenAndSetCookies = (id, res) => {
    const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: "15d" })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "None", // CSRF attacks cross-site request forgery attacks
        secure: true,
    })
}