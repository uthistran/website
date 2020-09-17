class Helper{
    actionCall(url, successResponse, failureResponse){
        fetch(url)
        .then(res => res.json())
        .then(
            (data) => {
                successResponse(data);
            },
            (error) => {
                failureResponse(error);
            }
        )
    }
}

export default new Helper();