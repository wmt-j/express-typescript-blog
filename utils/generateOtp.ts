export default function (): String {
    let otp = ""
    for (let i = 0; i < 6; i++) {
        otp += <string><any>Math.floor(Math.random() * 10)
    }
    return otp
}