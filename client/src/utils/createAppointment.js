import axios from "axios";

export default {
    // create a event with current user ID
    createAppointment: async function (data) {
        const url = 'http://localhost:3001/appointments/add'

        let options = {
                method: 'POST',
                url: url,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: data
            }
        let response = await axios(options);
        // const response = await fetch(url, {
        //     method: 'POST',
        //     headers: {
        //     'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        // .then((res) => {
        //     if (res.status === 200) return res.json({});
        //     else throw Error("Can't create an appointment");
        // })
        // .catch((err) => {
        //     console.log(err.message);
        // });

        return response;
    },
};