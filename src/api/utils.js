export const checkStatus = (response) => {
    if(response.status < 300){
        return response;
    }else{
        let error = new Error(response.status);
        error.response = response;
        throw error;
    }
};

export const parseJSON = (response) => {
    return response.json();
};