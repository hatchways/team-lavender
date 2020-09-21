import axios from "axios";

export default {
  // create a event with current user ID
  createMeeting: async function (data) {
    const url = "/meeting";

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

    return response;
  },
};
