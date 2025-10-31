const apiKey = process.env.API_KEY;

const validateApiKey = (req, res, next) => {
    const requestApiKey = req.header('x-api-key');
    if (!requestApiKey || requestApiKey !== apiKey) {
        return res.status(401).json({ message: 'Unauthorized: Invalid API Key' });
    }
    next();
};

export default validateApiKey;
