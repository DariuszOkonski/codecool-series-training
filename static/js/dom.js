import {data_handler} from "./data_handler.js"

export const dom = {
    domElements: {
        divGenres: document.getElementById('show-genres'),
        divRegister: document.getElementById('register'),
        divLogin: document.getElementById('login'),
        buttons: {
            insertGenre: document.getElementById('bt_insert')
        }
    },
    init() {
            if (dom.domElements.divGenres) {
                this.getGenres();
                this.domElements.buttons.insertGenre.addEventListener('click',this.insertGenreClick);

            } else {
                this.createRegiserForm();
                this.createLoginrForm();
            }
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
            td.dataset.id = `${res.id}`  // assign dataset < ======
            tr.appendChild(td)

            td = document.createElement('td')

            const buttonUpdate = document.createElement('button');
            buttonUpdate.innerText = 'update'
            const buttonDelete = document.createElement('button');
            buttonDelete.innerText = 'delete'

            buttonUpdate.addEventListener('click', () => {
                let nameTd = document.querySelector(`[data-id="${res.id}"]`)
                const updateForm = dom.createFormUpdate({id: res.id, name: nameTd.innerText})
                nameTd.replaceWith(updateForm);
            })
            buttonDelete.addEventListener('click', () => {
                let id = res.id;
                dom.deleteGenre({id: id});
            })

            td.appendChild(buttonUpdate)
            td.appendChild(buttonDelete)

            tr.appendChild(td)

            tbody.appendChild(tr);
        })


        thead.appendChild(tr);
        table.appendChild(thead)
        table.appendChild(tbody)
        this.domElements.divGenres.innerHTML = "";
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
                dom.getGenres()
            })
        })
    },
    createFormUpdate(data) {
        const div = document.createElement('div');
        const input = document.createElement('input');

        input.value = data.name;

        const button = document.createElement('button');
        button.innerText = 'submit';
        button.addEventListener('click', () => {
            dom.updateGenre({id: data.id, name: input.value})
        })

        div.appendChild(input);
        div.appendChild(button);
        return div;
    },
    updateGenre(data) {
        data_handler.updateGenre({id: data.id, name: data.name}, (response) => {
            this.getGenres();
        })
    },
    deleteGenre(id) {
        data_handler.deleteGenre(id, () => {
            this.getGenres();
        })
    },
    createRegiserForm() {
         let input = `
            <div class="card" style="width: 50%">
                <p class="form-element">Register:</p>
                <form>            
                    <p class="form-element">
                        <label class="form-element-label" >New Login:</label>
                        <input type="text" data-register="login" required>
                    </p>
                    <p class="form-element">
                        <label class="form-element-label" >New Password:</label>
                        <input type="text" data-register="password" required>
                    </p>
                    <p class="text-center">
                        <button id="btn-submit-register"  type="button">Submit</button>
                    </p>
                </form>
            </div>
        `
        dom.domElements.divRegister.innerHTML = input;
         document.getElementById('btn-submit-register').addEventListener('click', () => {
             ccc

             data_handler.register({login, password}, (response) => {
                 console.log('Successs == ======')
                 console.log(response)
             })
         })

    },
    createLoginrForm() {
         let input = `
            <div class="card" style="width: 50%">
                <p class="form-element">Login:</p>
                <form>            
                    <p class="form-element">
                        <label class="form-element-label" >Login:</label>
                        <input type="text" data-login="login" required>
                    </p>
                    <p class="form-element">
                        <label class="form-element-label" >Password:</label>
                        <input type="text" data-login="password" required>
                    </p>
                    <p class="text-center">
                        <button id="btn-submit-login" type="button">Submit</button>
                    </p>
                </form>
            </div>
        `
        dom.domElements.divLogin.innerHTML = input;
         document.getElementById('btn-submit-login').addEventListener('click', () => {
             let login = document.querySelector('[data-login="login"]').value;
             let password = document.querySelector('[data-login="password"]').value;

             data_handler.login({login, password}, (response) => {
                 console.log('Successs Login == ======')
                 this.getGenres()
             })
         })
    }
}
