import {data_handler} from "./data_handler.js"

export const dom = {
    domElements: {
        divGenres: document.getElementById('show-genres'),
        buttons: {
            insertGenre: document.getElementById('bt_insert')
        }
    },
    init() {
        this.getGenres();
        this.domElements.buttons.insertGenre.addEventListener('click',this.insertGenreClick);


        },
    getGenres() {
        const genres = data_handler.loadGenres((response) => {
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
    },
    insertGenreClick() {
        let input = `
            <div class="card" style="width: 50%">
                <p>Insert a new genre:</p>
                <form>            
                    <p class="form-element">
                        <label class="form-element-label" for="form-example-season">New genre:</label>
                        <input type="text" name="name" id="form-example-season" placeholder="insert genre" required>
                    </p>
                    <p class="text-center">
                        <button id="btn-submit-genre" type="button">Submit</button>
                    </p>
                </form>
            </div>
        `
        dom.domElements.divGenres.innerHTML = input;

        document.getElementById('btn-submit-genre').addEventListener('click', () => {
            const inputGenre = document.getElementById('form-example-season').value;
            data_handler.insertGenre({name: inputGenre}, (response) => {
                dom.domElements.divGenres.innerHTML = "";
                dom.getGenres()
            })
        })
    }
}
