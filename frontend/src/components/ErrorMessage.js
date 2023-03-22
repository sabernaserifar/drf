import type_is from "./check_type";

export function ProcessErrorMessage(error){
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Response Data:");
        console.log(error.response.data);
        if (type_is(error.response.data) == "Array"){
            return {'message': `${error.message}. Check the Console for more details!`}
        }
        return error.response.data;
        
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the
        // browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        return error.message
    } else {
        // Something happened in setting up the request that triggered an Error
        return error.message;
    }    
};
