
export default {
  // Login methods
  getEvents: function () {
    return (
    fetch("/api/googleCalendar/hi/availability?name=hello&color=blue")
    .then(res => {
      // console.log(res);
      if (res.status === 200) return res.json({});
      else throw Error("Couldn't connect to the server");
    })
    .catch(err => {
      console.log(err.message);
    })
    )
}
}

