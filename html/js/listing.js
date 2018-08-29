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
                authorCol.textContent = book.author_id;
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

                table.appendChild(tableRow);
            });


            const tableRow = document.getElementsByClassName('tableRow');


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

                    authordiv.appendChild(authorheader);
                    authordiv.appendChild(authorvalue);

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

                    


                    while (maindiv.hasChildNodes()) {
                        maindiv.removeChild(maindiv.firstChild);
                    }

                    const test = document.createElement('p');
                    test.textContent = 'test';

                    maindiv.appendChild(header);
                    maindiv.appendChild(votediv);
                    maindiv.append(authordiv);
                    maindiv.append(isbndiv);
                    maindiv.append(pricediv);
                    maindiv.append(descriptiondiv);


                })

            }
            ;


        })
        .fail((request, status, error) => {
            console.log(request);
        });


});