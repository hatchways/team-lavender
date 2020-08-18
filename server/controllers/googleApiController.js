const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  "871373961261-rjej65g97dc3o6jiuflq6s2gp5v9ptut.apps.googleusercontent.com",
  "XauLtqJv2LbkiRd7nTMhRnQq",
  "http://localhost:3000"
);
const oauth2 = google.oauth2("v2");

module.exports = {
  authenticateUser: function (req, res) {
    oAuth2Client
      .getToken(req.query.code)
      .then(({ tokens }) => {
        oAuth2Client.setCredentials({ token: tokens });
        return oauth2.userinfo.get({ access_token: tokens.access_token });
      })
      .then((userInfo) => {
        oAuth2Client.setCredentials({
          token: oAuth2Client.credentials.token,
          userInfo: userInfo.data,
        });
        res.status(200).json(oAuth2Client.credentials);
      })
      .catch((err) => res.status(422).json(err));
  },
};
