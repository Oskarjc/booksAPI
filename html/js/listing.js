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
        request.open('GET',env.api + '?route=books');
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

            books.map(function(book) {
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

                tableRow.appendChild(titleCol);
                tableRow.appendChild(authorCol);
                tableRow.appendChild(isbnCol);
                tableRow.appendChild(priceCol);

                table.appendChild(tableRow);
            });
        })
        .fail((request, status, error) =>
        {
            console.log(request);
        });

});