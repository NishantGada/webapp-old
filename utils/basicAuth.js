export const validateBasicAuth = (req, res) => {
    console.log("Inside validateBasicAuth");
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ message: 'Missing or invalid authorization header' });
    }

    // Decode the Base64 credentials
    const base64Credentials = authHeader.split(' ')[1];
    
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    console.log("username, password: ", username, password);

    return [username, password];
}