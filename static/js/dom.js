import {data_handler} from "./data_handler.js"

export const dom = {
    domElements: {
        divGenres: document.getElementById('show-genres'),
    },
    init() {
        this.getGenres();
    },
    getGenres() {
        const genres = data_handler.loadGenres((response) => {
            console.log("SUCCES")
            console.log(response);

            this.buildShowGenres(response)
        })
    },
    buildShowGenres(response) {
        const table = document.createElement('table')
        table.id = 'table'
        table.style.width = '50%';

        const thead = document.createElement('thead')
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
        `;

        const tbody = document.createElement('tbody')
        response.forEach(res => {
            const tr = document.createElement('tr')
            let td = document.createElement('td')
            td.innerText = `${res.id}`
            tr.appendChild(td)

            td = document.createElement('td')
            td.innerText = `${res.name}`
            tr.appendChild(td)

            td = document.createElement('td')
            td.innerHTML = `
                <button type="button" value='${res.id}' id="bt_login">update genre</button>
                <button type="button" value='${res.id}' id="bt_login">delete genre</button>
            `
            tr.appendChild(td)



            tbody.appendChild(tr);
        })


        thead.appendChild(tr);
        table.appendChild(thead)
        table.appendChild(tbody)
        this.domElements.divGenres.appendChild(table)
    }
}
