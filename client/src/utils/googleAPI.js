

export default {
  getEvents: function () {
    return (
    fetch("/api/googleCalendar/mila-mamat/availability?year=2020&month=08")
    .then(res => {
      console.log("api.js",res);
      if (res.status === 200) return res.json({});
      else throw Error("Couldn't connect to the server");
    })
    .catch(err => {
      console.log(err.message);
    })
    )


    
}
}

