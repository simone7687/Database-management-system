
class RequestsService {

    async fetch(url: string, options: any, token = null, tokenType = "Bearer", signal: any) {
        var myHeaders = new Headers();
        // performs api calls sending the required authentication headers
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'redirect': 'follow',
        }


        if (token) {
            // Setting Authorization header
            // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
            myHeaders.append("Authorization", tokenType + ' ' + token);
        }

        var requestOptions =
        {
            headers: headers,
            ...options
        }

        return fetch(url, requestOptions)
            .then(this._checkStatus)
            .then(response => {
                return response.json()
            })
            .catch((res) => {
                console.error(res);
            });
    }

    _checkStatus(response: any) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.toString())
            throw error
        }
    }
}
export default RequestsService;
