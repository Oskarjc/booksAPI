$(document).ready(() => {


    getBook()
    .done((data, text) => {

        let book= JSON.parse(data);

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

        const table = document.querySelector('div.row');

        book.map(function(book) {
            const tableRow = document.createElement('tr');

            tableRow.onclick = () => {
                window.location = '?route=show&id=' + book.id;
            };

            const titleCol = document.createElement('td');
            titleCol.textContent = book.title;

            const authorCol = document.createElement('td');
            authorCol.textContent = book.author_id;
            authorCol.setAttribute('class','d-none d-sm-table-cell');

            const isbnCol = document.createElement('td');
            isbnCol.textContent = book.isbn;
            isbnCol.setAttribute('class','d-none d-sm-table-cell');

            const priceCol = document.createElement('td');
            priceCol.textContent = book.price;


            const descriptionCol = document.createElement('td');
            priceCol.textContent = book.description;

            tableRow.appendChild(titleCol);
            tableRow.appendChild(authorCol);
            tableRow.appendChild(isbnCol);
            tableRow.appendChild(priceCol);
            tableRow.appendChild(descriptionCol);

            table.appendChild(tableRow);
        });
    })
    .fail((request, status, error) =>
    {
        console.log(request);
    });

});