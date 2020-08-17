export default {
  // get google credentials:token, refresh token:
  authenticateUser: function (code) {
    return fetch(`/api/google/authentication?code=${code}`)
      .then((res) => {
        if (res.status === 200) return res.json({});
        else throw Error("Couldn't connect to the server");
      })
      .catch((err) => {
        console.log(err.message);
      });
  },


  //TO DO : get events for a specific day
  // getEvents: function (params) {
  //   //  console.log(params)
  //   return fetch(`/api/google/${params.user}/availability?year=2020&month=08`)
  //     .then((res) => {
  //       console.log("api.js", res);
  //       if (res.status === 200) return res.json({});
  //       else throw Error("Couldn't connect to the server");
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // },
};
