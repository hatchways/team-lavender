module.exports = (req, res, next) => {
  try {
    token = req.headers.authenticate;
    fetch(`/api/google/jwtToken?token=${token}`)
      .then((res) => {
        if (res.status === 200) {
          next();
          return res.json({});
        } else throw Error("Token is not authenticated");
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (err) {
    console.log(err);
  }
};
