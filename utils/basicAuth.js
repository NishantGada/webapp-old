export const validateBasicAuth = (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        console.log("Missing or invalid authorization header");
        return res.status(401).json();
    }

    // Decode the Base64 credentials
    const base64Credentials = authHeader.split(' ')[1];

    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    if (!username || !password) {
        console.log("401 status");
        return ["", "", false];
    }

    return [username, password, true];
}