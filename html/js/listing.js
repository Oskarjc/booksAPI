$(document).ready(() => {

    const getBooksXml = () => {
        const request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    let response = JSON.parse(request.response);
                    console.log(response);
                } else {
                    console.log(request);
                }
            }
        };
        request.open('GET', env.api + '?route=books');
        request.send();
    };

    const getBooksFetch = () => {
        fetch(env.api + '?route=books', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                //'X-XSRF-TOKEN': getCookieValue('XSRF-TOKEN')
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log(data);
                });
            }
            else {
                console.log(response);
            }
        });
    };
    /*
         getBooksJquery()
                .done((data, text) => {
                    let response = JSON.parse(data);

                    const table = $('.table');

                    $.each(response, function (key, value) {

                        let td = '<td>'
                            + value.title
                            + '</td>'

                            + '<td class=\'d-none d-sm-table-cell\'>'
                            + value.author_id
                            + '</td>'

                            + '<td class=\'d-none d-sm-table-cell\'>'
                            + value.isbn
                            + '</td>'

                            + '<td>&euro;'
                            + value.price
                            + '</td>';

                        let tr = $('<tr onclick= "window.location = \'?route=show&id=' + value.id + '\'">');

                        tr.append(td);
                        table.append(tr);

                    });
                    } )

                .fail((request, status, error) =>
                {
                    console.log(request);
                });*/


    getBooks()
        .done((data, text) => {


            // --- books ---
            let books = JSON.parse(data);

            // Table erbij halen
            // For loop over alle books heen
            //  - Table row maken
            //  - onclick event op de table row (als laatste doen)
            //  - Per kolom:
            //         - een table data (TD) maken
            //         - vullen met een waarde
            //        - class zetten
            //      - append aan table row
            //    - append aan table

            const table = document.querySelector('.table');

            books.map(function (book) {
                const tableRow = document.createElement('tr');
                tableRow.className = "tableRow";

                /*  tableRow.onclick = () => {
                      window.location = '?route=show&id=' + book.id;
                  };*/

                const titleCol = document.createElement('td');
                titleCol.textContent = book.title;
                titleCol.setAttribute('class', 'titleCol');

                const authorCol = document.createElement('td');
                authorCol.textContent = book.author;
                authorCol.setAttribute('class', ' authorCol d-none d-sm-table-cell');

                const isbnCol = document.createElement('td');
                isbnCol.textContent = book.isbn;
                isbnCol.setAttribute('class', 'isbnCol d-none d-sm-table-cell');

                const priceCol = document.createElement('td');
                priceCol.textContent = book.price;
                priceCol.setAttribute('class', 'priceCol');

                const votediv = document.createElement('div');
                votediv.setAttribute('class', 'votediv');
                votediv.style.display = "none";
                votediv.textContent = book.votes;

                const iddiv = document.createElement('div');
                iddiv.setAttribute('class', 'iddiv');
                iddiv.style.display = "none";
                iddiv.textContent = book.id;

                const categoryCol = document.createElement('div');
                categoryCol.setAttribute('class', 'categoryCol');
                categoryCol.style.display = "none";
                categoryCol.textContent = book.category;

                const category_iddiv = document.createElement('div');
                category_iddiv.setAttribute('class', 'category_iddiv');
                category_iddiv.style.display = "none";
                category_iddiv.textContent = book.category_id;

                const author_iddiv = document.createElement('div');
                author_iddiv.setAttribute('class', 'author_iddiv');
                author_iddiv.style.display = "none";
                author_iddiv.textContent = book.author_id;


                const descriptiondiv = document.createElement('div');
                descriptiondiv.setAttribute('class', 'descriptionCol');
                descriptiondiv.style.display = "none";
                descriptiondiv.textContent = book.description;

                tableRow.appendChild(titleCol);
                tableRow.appendChild(authorCol);
                tableRow.appendChild(isbnCol);
                tableRow.appendChild(priceCol);
                tableRow.appendChild(votediv);
                tableRow.appendChild(iddiv);
                tableRow.appendChild(descriptiondiv);
                tableRow.appendChild(categoryCol);
                tableRow.appendChild(author_iddiv);
                tableRow.appendChild(category_iddiv);

                table.appendChild(tableRow);
            });


            const tableRow = document.getElementsByClassName('tableRow');


            // --- Detailpagina ---

            for (let i = 0; i < tableRow.length; i++) {

                tableRow[i].addEventListener('click', (event) => {

                    event.preventDefault();

                    const maindiv = document.getElementById('listing');

                    // --- header ---

                    const header = document.createElement('h1');
                    header.textContent = tableRow[i].querySelector('.titleCol').innerHTML;


                    // --- votes ---

                    const votediv = document.createElement('div');
                    votediv.setAttribute('class', 'votes');

                    const votecount = document.createElement('div');
                    votecount.setAttribute('class', 'vote-count');

                    const datainput = tableRow[i].querySelector('.iddiv').innerHTML;
                    votecount.setAttribute('data-id', datainput);
                    votecount.textContent = tableRow[i].querySelector('.votediv').innerHTML;

                    const idContainer = document.createElement('p');
                    idContainer.style.display = 'none';
                    idContainer.textContent = datainput;
                    idContainer.setAttribute('id', 'randomId');

                    const link1 = document.createElement('a');
                    link1.setAttribute('class', 'up-vote');
                    link1.setAttribute('href', '#');

                    const image1 = document.createElement('i');
                    image1.setAttribute('class', 'fas fa-thumbs-up');

                    link1.appendChild(image1);

                    const link2 = document.createElement('a');
                    link2.setAttribute('class', 'down-vote');
                    link2.setAttribute('href', '#');

                    const image2 = document.createElement('i');
                    image2.setAttribute('class', 'fas fa-thumbs-down');

                    link2.appendChild(image2);

                    votediv.appendChild(votecount);

                    votediv.appendChild(link1);
                    votediv.appendChild(link2);

                    // --- bookinfo ---

                    const pagediv = document.createElement('div');
                    pagediv.setAttribute('class', 'row');

                    const bookdiv = document.createElement('div');
                    bookdiv.setAttribute('class', 'col-md-6');

                    // --- author ---

                    const authordiv = document.createElement('div');

                    const authorheader = document.createElement('b');
                    authorheader.append('Author:');

                    const authorvalue = document.createElement('p');
                    authorvalue.append(tableRow[i].querySelector('.authorCol').innerHTML);
                    authorvalue.setAttribute('id','authorValueContainer');


                    authordiv.appendChild(authorheader);
                    authordiv.appendChild(authorvalue);


                    // --- category ---

                    const categorydiv = document.createElement('div');

                    const categoryheader = document.createElement('b');
                    categoryheader.append('Category:');

                    const categoryvalue = document.createElement('p');
                    categoryvalue.setAttribute('id','categoryValueContainer');
                    categoryvalue.append(tableRow[i].querySelector('.categoryCol').innerHTML);


                    categorydiv.appendChild(categoryheader);
                    categorydiv.appendChild(categoryvalue);


                    // --- isbn ---

                    const isbndiv = document.createElement('div');

                    const isbnheader = document.createElement('b');
                    isbnheader.append('ISBN:');

                    const isbnvalue = document.createElement('p');
                    isbnvalue.append(tableRow[i].querySelector('.isbnCol').innerHTML);

                    isbndiv.appendChild(isbnheader);
                    isbndiv.appendChild(isbnvalue);


                    // --- price ---

                    const pricediv = document.createElement('div');

                    const priceheader = document.createElement('b');
                    priceheader.append('Price:');

                    const pricevalue = document.createElement('p');
                    pricevalue.append(tableRow[i].querySelector('.priceCol').innerHTML);

                    pricediv.appendChild(priceheader);
                    pricediv.appendChild(pricevalue);

                    // --- description ---
                    const descriptiondiv = document.createElement('div');

                    const descriptionheader = document.createElement('b');
                    descriptionheader.append('Description:');

                    const descriptionvalue = document.createElement('p');
                    descriptionvalue.append(tableRow[i].querySelector('.descriptionCol').innerHTML);

                    descriptiondiv.appendChild(descriptionheader);
                    descriptiondiv.appendChild(descriptionvalue);


                    // --- image ---

                    const imagediv = document.createElement('div');
                    imagediv.setAttribute('class', 'col-md-6');

                    const image = document.createElement('img');
                    image.setAttribute('class', 'mb-4');
                    image.setAttribute('width', '100%');
                    image.setAttribute('alt', 'no image found');


                    const imageinput = 'images/' + tableRow[i].querySelector('.iddiv').innerHTML + '.jpg';
                    image.setAttribute('src', imageinput);

                    imagediv.appendChild(image);

                    // --- buttondiv ---

                    const buttondiv = document.createElement('div');
                    buttondiv.setAttribute('class', 'buttondiv');
                    buttondiv.setAttribute('overflow', 'hidden');
                    buttondiv.setAttribute('white-space', 'nowrap');

                    // --- delete ---

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.setAttribute('class', 'btn btn-danger');
                    deleteButton.style = 'float:right'

                    // --- editbutton ---

                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.setAttribute('class', 'btn btn-success');

                    buttondiv.appendChild(editButton);
                    buttondiv.appendChild(deleteButton);

                    bookdiv.append(authordiv);
                    bookdiv.append(isbndiv);
                    bookdiv.append(pricediv);
                    bookdiv.append(categorydiv);
                    bookdiv.append(descriptiondiv);
                    bookdiv.append(buttondiv);


                    pagediv.append(bookdiv);
                    pagediv.append(imagediv);
                    pagediv.append(idContainer);


                    while (maindiv.hasChildNodes()) {
                        maindiv.removeChild(maindiv.firstChild);
                    }


                    maindiv.appendChild(header);
                    maindiv.appendChild(votediv);
                    maindiv.appendChild(pagediv);

                    deleteButton.addEventListener('click', (event) => {

                        const id = {

                            id: document.getElementById("randomId").innerHTML
                        };

                        deleteBook(id)
                            .done((data, text) => {

                                appendSuccesMessage('Book successfully deleted!', '.message-container');
                                window.location = "?route=index";
                            })
                            .fail((request, status, error) => {

                                console.log(request)
                            });

                    });


                    localStorage.setItem("categoryValue", document.getElementById('categoryValueContainer').innerHTML);
                    localStorage.setItem("authorValue", document.getElementById('authorValueContainer').innerHTML);

                    // --- Editpagina ---


                    editButton.addEventListener('click', (event) => {


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

                        const descriptionInput = document.createElement('textarea');
                        descriptionInput.setAttribute('name', 'description');
                        descriptionInput.setAttribute('id', 'description');
                        descriptionInput.setAttribute('class', 'form-control');
                        descriptionInput.textContent = descriptionvalue.innerHTML;

                        descriptionDiv.appendChild(descriptionLabel);
                        descriptionDiv.appendChild(descriptionInput);

                        form.appendChild(descriptionDiv);

                        // --- idcontainer ---

                        const tempId = idContainer.innerHTML;

                        const idHiddenInput = document.createElement('input');
                        idHiddenInput.style.display = 'none';
                        idHiddenInput.setAttribute('name', 'id');
                        idHiddenInput.setAttribute('id', 'id');
                        idHiddenInput.setAttribute('value', tempId);

                        form.appendChild(idHiddenInput);

                        // --- button ---

                        const buttonDiv = document.createElement('div');

                        const submitButton = document.createElement('button');
                        submitButton.textContent = 'Opslaan';
                        submitButton.setAttribute('class', 'btn btn-success');

                        buttonDiv.appendChild(submitButton);

                        form.appendChild(buttonDiv);

                        // --- script ---

                        const scriptTag = document.createElement('script');
                        scriptTag.setAttribute('src', 'js/update-book.js');


                        while (maindiv.hasChildNodes()) {
                            maindiv.removeChild(maindiv.firstChild);
                        }

                        maindiv.append(editHeader);
                        maindiv.append(form);
//                        maindiv.append(scriptTag);


                        const formselect = document.getElementById('updateBookForm');
                        const inputTitle = document.getElementById('title');
                        const inputFields = form.querySelectorAll('.form-control');

                        formselect.addEventListener('submit', (event) => {
                            event.preventDefault();

                            for (let i = 0; i < inputFields.length; i++) {

                                if (!inputFields[i].checkValidity()) {
                                    addErrorMessageForElement(inputFields[i]);
                                } else {
                                    clearErrorMessageForElement(inputFields[i])
                                }

                            }

                            if (formselect.checkValidity()) {

                                const book = {
                                    title: formselect.title.value,
                                    author_id: formselect.author.value,
                                    category_id: formselect.category.value,
                                    isbn: formselect.isbn.value,
                                    price: formselect.price.value,
                                    description: formselect.description.value,
                                    id: formselect.id.value

                                };

                                updateBook(book)
                                    .done((data, text) => {
                                        formselect.reset();

                                        appendSuccesMessage('Book successfully updated!', '.message-container');
                                        window.location = "?route=index";
                                    })
                                    .fail((request, status, error) => {

                                        console.log(request)
                                    });
                            }
                        });

                        //"Location: ?route=show&id=" + book.id;

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


                    });


                })

            }
            ;


        })
        .fail((request, status, error) => {
            console.log(request);
        });


});