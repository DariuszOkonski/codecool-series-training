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
    _api_post(url, data, callback) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => callback(data))
            .catch(err => console.log('ERR: ', err))
    },
    loadGenres(callback) {
        this._api_get('/get-genres', (response) => {
            callback(response)
        })
    },
    insertGenre(data, callback) {
        this._api_post('/insert-genre', data, (response) => {
            callback(response)
        })
    },
    updateGenre(data, callback) {
        this._api_post('/update-genre', data, (response) => {
            callback(response);
        })
}
}