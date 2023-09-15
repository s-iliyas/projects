const url = require('url');

const { google } = require('googleapis');

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs")

const { AgentGoogleCredentials, Agent } = require("../../models/agent/agent")

const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client("917537609153-lpfjkd2e0ca4otak7focgqs1mbv7g2ut.apps.googleusercontent.com");

const oauth2Client = new google.auth.OAuth2(
    "917537609153-lpfjkd2e0ca4otak7focgqs1mbv7g2ut.apps.googleusercontent.com",
    "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",
    "http://localhost:8000/agent/login/redirect"
);

const secret = process.env.SECRET_KEY

const jwt_expire_time = process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME

const scopes = ["email"];

const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true
});

const googleLogin = (req, res) => {
    res.status(200).json({
        "link": authorizationUrl
    })
}

const googleRedirect = async (req, res) => {
    let q = url.parse(req.url, true).query;
    if (q.error) {
        res.status(400).json({ error_message: q.error });
    } else { // Get access and refresh tokens (if access_type is offline)
        const state_code = q.code
        if (state_code) {
            let { tokens } = await oauth2Client.getToken(state_code)
            if (tokens) {
                google_id_token = tokens.id_token
                if (google_id_token) {
                    const ticket = await client.verifyIdToken({
                        idToken: tokens.id_token,
                        audience: "917537609153-lpfjkd2e0ca4otak7focgqs1mbv7g2ut.apps.googleusercontent.com",
                    });
                    const payload = ticket.getPayload();
                    const agent_email = payload.email;
                    const agent_cred_object = await AgentGoogleCredentials.findOne({ where: { email: agent_email } }).then((result) => { return result })
                    if (agent_cred_object) {
                        agent_cred_object.access_token = tokens.access_token;
                        agent_cred_object.refresh_token = tokens.refresh_token
                        agent_cred_object.id_token = tokens.id_token
                        agent_cred_object.expiry_date = tokens.expiry_date
                        agent_cred_object.save();
                    } else {
                        const cred = await AgentGoogleCredentials.create({
                            access_token: tokens.access_token,
                            refresh_token: tokens.refresh_token,
                            id_token: tokens.id_token,
                            token_type: tokens.token_type,
                            scope: tokens.scope,
                            expiry_date: tokens.expiry_date,
                            email: agent_email
                        });
                    }
                    const agent = await Agent.findOne({ where: { email: agent_email } }).then((result) => { return result; })
                    if (agent) {
                        const jwt_token = await jwt.sign({ user_id: agent.id, token_type: "access" }, secret, { expiresIn: jwt_expire_time.concat("ms") });
                        agent.password = bcrypt.hash(tokens.access_token, 10);
                        agent.access_token = jwt_token;
                        // agent.save();
                        res.status(200).json({ token: { access: jwt_token } });
                    } else {
                        res.status(400).json({ error_message: "Invalid Agent" });
                    }
                } else {
                    res.status(400).json({ error_message: "No ID token created." });
                }
            } else {
                res.status(400).json({ error_message: "Code Invalid" });
            }
        } else {
            res.status(400).json({ error_message: "No code." });
        }
    }
}

module.exports = { googleLogin, googleRedirect }







































































































































































































































// async function main() {
//     const server = http.createServer(async function (req, res) {
//         // Example on redirecting user to Google's OAuth 2.0 server.
//         if (req.url == '/') {
//             res.writeHead(301, { "Location": authorizationUrl });
//         }

//         // Receive the callback from Google's OAuth 2.0 server.
//         if (req.url.startsWith('/oauth2callback')) {
//             // Handle the OAuth 2.0 server response
//             let q = url.parse(req.url, true).query;

//             if (q.error) { // An error response e.g. error=access_denied
//                 console.log('Error:' + q.error);
//             } else { // Get access and refresh tokens (if access_type is offline)
//                 let { tokens } = await oauth2Client.getToken(q.code);
//                 oauth2Client.setCredentials(tokens);

//                 /** Save credential to the global variable in case access token was refreshed.
//                   * ACTION ITEM: In a production app, you likely want to save the refresh token
//                   *              in a secure persistent database instead. */
//                 userCredential = tokens;

//                 // Example of using Google Drive API to list filenames in user's Drive.
//                 const drive = google.drive('v3');
//                 drive.files.list({
//                     auth: oauth2Client,
//                     pageSize: 10,
//                     fields: 'nextPageToken, files(id, name)',
//                 }, (err1, res1) => {
//                     if (err1) return console.log('The API returned an error: ' + err1);
//                     const files = res1.data.files;
//                     if (files.length) {
//                         console.log('Files:');
//                         files.map((file) => {
//                             console.log(`${file.name} (${file.id})`);
//                         });
//                     } else {
//                         console.log('No files found.');
//                     }
//                 });
//             }
//         }

//         // Example on revoking a token
//         if (req.url == '/revoke') {
//             // Build the string for the POST request
//             let postData = "token=" + userCredential.access_token;

//             // Options for POST request to Google's OAuth 2.0 server to revoke a token
//             let postOptions = {
//                 host: 'oauth2.googleapis.com',
//                 port: '443',
//                 path: '/revoke',
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                     'Content-Length': Buffer.byteLength(postData)
//                 }
//             };

//             // Set up the request
//             const postReq = https.request(postOptions, function (res) {
//                 res.setEncoding('utf8');
//                 res.on('data', d => {
//                     console.log('Response: ' + d);
//                 });
//             });

//             postReq.on('error', error => {
//                 console.log(error)
//             });

//             // Post the request with data
//             postReq.write(postData);
//             postReq.end();
//         }
//         res.end();
//     }).listen(80);
// }
// main().catch(console.error);


