export default {
    // create a event with current user ID
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
};