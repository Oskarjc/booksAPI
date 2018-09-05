
function updateBookJs() {

    const id = {
        id: document.getElementById("randomId").innerHTML
    };

    event.preventDefault();

// --- header ---

    const editHeader = document.createElement('h1');
    editHeader.textContent = 'Edit book';

// --- form ---

    const form = document.createElement('form');
    form.noValidate = true;
    form.setAttribute('id', 'updateBookForm');

// --- title ---

    const titleDiv = document.createElement('div');
    titleDiv.setAttribute('class', 'form-group');

    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'title');
    titleLabel.textContent = 'Title:';

    const header = document.getElementById('header');
    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('name', 'title');
    titleInput.setAttribute('id', 'title');
    titleInput.setAttribute('class', 'form-control');
    titleInput.setAttribute('value', header.innerHTML);
    titleInput.required = true;

    titleDiv.appendChild(titleLabel);
    titleDiv.appendChild(titleInput);

    form.appendChild(titleDiv);

// --- author ---

    const authorDiv = document.createElement('div');
    authorDiv.setAttribute('class', 'form-group');

    const authorLabel = document.createElement('label');
    authorLabel.setAttribute('for', 'author');
    authorLabel.textContent = 'Author: ';


    getAuthors()
        .done((data, text) => {

            let authors = JSON.parse(data);

            const authorSelectField = document.createElement('select');
            authorSelectField.setAttribute('id', 'author');
            authorSelectField.setAttribute('name', 'author');


            for (i = 0; i < authors.length; i++) {
                let authorSelect = document.createElement('option');
                authorSelect.textContent = authors[i].name;
                authorSelect.setAttribute('value', authors[i].id)
                authorSelect.setAttribute('name', 'author');
                if (authorSelect.innerHTML === localStorage.getItem('authorValue')) {
                    authorSelect.setAttribute('selected', true);
                }
                authorSelectField.appendChild(authorSelect);
            }
            authorDiv.appendChild(authorLabel);
            authorDiv.appendChild(authorSelectField);


        })
        .fail((request, status, error) => {
            console.log(request);
        });

    form.appendChild(authorDiv);


// --- isbn ---

    const isbnDiv = document.createElement('div');
    isbnDiv.setAttribute('class', 'form-group');

    const isbnLabel = document.createElement('label');
    isbnLabel.setAttribute('for', 'isbn');
    isbnLabel.textContent = 'ISBN:';

    const isbnvalue = document.getElementById('isbnvalue');
    const isbnInput = document.createElement('input');
    isbnInput.setAttribute('type', 'text');
    isbnInput.setAttribute('name', 'isbn');
    isbnInput.setAttribute('id', 'isbn');
    isbnInput.setAttribute('class', 'form-control');
    isbnInput.setAttribute('value', isbnvalue.innerHTML);
    isbnInput.setAttribute('pattern', "^\\d{10,13}$");
    isbnInput.required = true;

    isbnDiv.appendChild(isbnLabel);
    isbnDiv.appendChild(isbnInput);

    form.appendChild(isbnDiv);

// --- price ---

    const priceDiv = document.createElement('div');
    priceDiv.setAttribute('class', 'form-group');

    const priceLabel = document.createElement('label');
    priceLabel.setAttribute('for', 'price');
    priceLabel.textContent = 'Price:';

    const pricevalue = document.getElementById('pricevalue');
    const priceInput = document.createElement('input');
    priceInput.setAttribute('type', 'text');
    priceInput.setAttribute('name', 'price');
    priceInput.setAttribute('id', 'price');
    priceInput.setAttribute('class', 'form-control');
    priceInput.setAttribute('value', pricevalue.innerHTML);
    priceInput.setAttribute('pattern', "^\\d{1,5}(\\.\\d{1,2})?$");

    priceInput.required = true;

    priceDiv.appendChild(priceLabel);
    priceDiv.appendChild(priceInput);

    form.appendChild(priceDiv);


// --- category ---

    const categoryDiv = document.createElement('div');
    categoryDiv.setAttribute('class', 'form-group');

    const categoryLabel = document.createElement('label');
    categoryLabel.setAttribute('for', 'category');
    categoryLabel.textContent = 'Category: ';


    getCategories()
        .done((data, text) => {

            let categories = JSON.parse(data);

            const categorySelectField = document.createElement('select');
            categorySelectField.setAttribute('id', 'category');
            categorySelectField.setAttribute('name', 'category');


            for (i = 0; i < categories.length; i++) {
                let categorySelect = document.createElement('option');
                categorySelect.textContent = categories[i].name;
                categorySelect.setAttribute('value', categories[i].id)
                categorySelect.setAttribute('name', 'category');
                if (categorySelect.innerHTML === localStorage.getItem('categoryValue')) {
                    categorySelect.setAttribute('selected', true);
                }

                categorySelectField.appendChild(categorySelect);
            }
            categoryDiv.appendChild(categoryLabel);
            categoryDiv.appendChild(categorySelectField);


        })
        .fail((request, status, error) => {
            console.log(request);
        });

    form.appendChild(categoryDiv);


// --- description ---

    const descriptionDiv = document.createElement('div');
    descriptionDiv.setAttribute('class', 'form-group');

    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'description');
    descriptionLabel.textContent = 'Description:';

    const descriptionvalue = document.getElementById('descriptionvalue');
    const descriptionInput = document.createElement('textarea');
    descriptionInput.setAttribute('name', 'description');
    descriptionInput.setAttribute('id', 'description');
    descriptionInput.setAttribute('class', 'form-control');
    descriptionInput.textContent = descriptionvalue.innerHTML;

    descriptionDiv.appendChild(descriptionLabel);
    descriptionDiv.appendChild(descriptionInput);

    form.appendChild(descriptionDiv);

// --- idcontainer ---

    const idContainer = document.getElementById('randomId');
    const idHiddenInput = document.createElement('input');
    idHiddenInput.style.display = 'none';
    idHiddenInput.setAttribute('name', 'id');
    idHiddenInput.setAttribute('id', 'id');
    idHiddenInput.setAttribute('value', idContainer.innerHTML);

    form.appendChild(idHiddenInput);

// --- button ---

    const buttonDiv = document.createElement('div');

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Opslaan';
    submitButton.setAttribute('class', 'btn btn-success');

    buttonDiv.appendChild(submitButton);

    form.appendChild(buttonDiv);


    while (maindiv.hasChildNodes()) {
        maindiv.removeChild(maindiv.firstChild);
    }

    maindiv.append(editHeader);
    maindiv.append(form);

    const formselect = document.getElementById('updateBookForm');
    const inputTitle = document.getElementById('title');
    const inputFields = form.querySelectorAll('.form-control');


    formselect.addEventListener('submit', (event) => {

        savebook();

    });


    inputTitle.addEventListener('blur', (event) => {
        if (event.target.value.length < 6 && event.target.value.length > 0) {
            event.target.setCustomValidity('Lekker is 6 karakters')

        } else {
            event.target.setCustomValidity('');
        }

    });

    for (let i = 0; i < inputFields.length; i++) {
        inputFields[i].addEventListener('blur', fieldValidation);

    }
}