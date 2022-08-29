import expressRateLimit from 'express-rate-limit'

export default expressRateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false
})