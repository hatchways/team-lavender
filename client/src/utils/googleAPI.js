export default {
  // get google credentials:token, refresh token:
  authenticateUser: function (code) {
    return fetch(`/api/google/authentication?code=${code}`)
      .then((res) => {
        if (res.status === 200) return res.json({});
        else throw Error("Couldn't authenticate user with Google");
      })
      .catch((err) => {
        console.log(err.message);
      });
  },

  //get events from google calendar
  getAvailability: function (params) {
    return fetch(
      `/api/google/${params.meetingLength}/availability?${params.availability}`
    )
      .then((res) => {
        if (res.status === 200) return res.json({});
        else throw Error("Couldn't get user's availability");
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
};
