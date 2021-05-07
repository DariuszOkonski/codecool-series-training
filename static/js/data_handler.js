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
    _api_get_return(url) {
        return fetch(url, {
            'Content-type': 'application/json',
            'method': 'GET'
        })
            .then(response => {
                return response.json()
            })
            .then(data => data)
    },
    async _api_get_async_await(url) {
        const response = await fetch(url)
        const data = await response.json()

        return data

    },

    loadGenres(callback) {
        this._api_get('/get-genres', (response) => {
            callback(response)
        })
    },

    getGenres() {
        return this._api_get_async_await('/get-genres')
    }
}