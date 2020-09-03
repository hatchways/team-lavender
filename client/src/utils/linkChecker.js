import axios from "axios";

export default {
    // create a event with current user ID
    checkLink: async function (data) {
        const url = 'http://localhost:3001/meeting/meetingcheck'
        
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

        return response
    },
    getHostAvailableDay: async function (data) {
        const url = 'http://localhost:3001/meeting/getHostAvailableDay'
        
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

        return response
    }
};