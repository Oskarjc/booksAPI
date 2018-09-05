$(document).ready(() => {



    getBooks()
        .done((data, text) => {

            // --- books ---
            let books = JSON.parse(data);

            const table = document.querySelector('.table');

            books.map(function (book) {
                const tableRow = document.createElement('tr');
                tableRow.className = "tableRow";

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

                getDetails();

        })
        .fail((request, status, error) => {
            console.log(request);
        });
});