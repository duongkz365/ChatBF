
const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const PORT = 8080;
const APP_ID = "6696c4ce70d44f1ca1730089a4f474da";
const APP_CERTIFICATE = "6f89bfdd4bb04f42be1e06eb3f18701a";

const app = express();

const nocache = (req, resp, next) => {
    resp.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    resp.header('Expires', '-1');
    resp.header('Pragma', 'no-cache');
    next();
}

const generateAccessToken = (req, resp) => {
    // Set response header
    resp.header('Access-Control-Allow-Origin', '*');

    // Get channel name
    const channelName = req.query.channelName;
    if (!channelName) {
        return resp.status(400).json({ 'error': 'channelName is required' });
    }

    // Get uid
    let uid = req.query.uid;
    if (!uid || uid === "") {
        uid = 0;
    }

    // Get role
    let role = RtcRole.SUBSCRIBER;
    if (req.query.role === 'publisher') {
        role = RtcRole.PUBLISHER;
    }

    // Get the expire time
    let expireTime = req.query.expireTime;
    if (!expireTime || expireTime === "") {
        expireTime = 3600;
    } else {
        expireTime = parseInt(expireTime, 10);
    }

    // Calculate privilege expire time
    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeTime = currentTime + expireTime;

    // Build the token
    const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeTime);

    // Return the token
    return resp.json({ 'token': token });
}

app.get('/access_token', nocache, generateAccessToken);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
