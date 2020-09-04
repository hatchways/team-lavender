export default {
  // get google credentials:token, refresh token:
  authenticateUser: function (code) {
    return fetch(`/api/google/authentication?code=${code}`)
      .then((res) => {
        console.log(res)
        if (res.status === 200) return res.json({});
        else throw Error("Couldn't authenticate user with Google");
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
  isTokenAuthenticated: function (token) {
    return fetch(`/api/google/jwtToken?token=${token}`)
      .then((res) => {
        if (res.status === 200) return res.json({});
        else throw Error("Token is not authenticated");
      })
      .catch((err) => {
        console.log(err.message);
      });
  },

  //get events from google calendar
  getAvailability: function (params) {
    const qs = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');

    return fetch(
      `/api/google/availability?${qs}`
    )
      .then((res) => {
        if (res.status === 200 || res.status === 404) return res.json({});
        else throw Error("Couldn't get user's availability");
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
};
