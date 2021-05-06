export const data_handler = {
    _api_get(url, callback) {
        fetch(url, {
            'Content-type': 'application/json',
            'method': 'GET'
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                callback(data)
            })
    },

    loadGenres(callback) {
        this._api_get('/get-genres', (response) => {
            callback(response)
        })
    }
}