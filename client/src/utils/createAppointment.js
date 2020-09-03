import axios from "axios";

export default {
  // create a event with current user ID
  createAppointment: async function (data) {
    const url = "http://localhost:3001/appointments/add";

    let options = {
      method: "POST",
      url: url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: data,
    };
    let response = await axios(options);
    // add a call to goggle calendar insert event

    return response;
  },
};
