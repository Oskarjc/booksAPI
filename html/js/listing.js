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
                tableRow.className = "tableRow";

              /*  tableRow.onclick = () => {
                    window.location = '?route=show&id=' + book.id;
                };*/

                const titleCol = document.createElement('td');
                titleCol.textContent = book.title;
                titleCol.setAttribute('class', 'titleCol');

                const authorCol = document.createElement('td');
                authorCol.textContent = book.author_id;
                authorCol.setAttribute('class',' authorCol d-none d-sm-table-cell');

                const isbnCol = document.createElement('td');
                isbnCol.textContent = book.isbn;
                isbnCol.setAttribute('class','isbnCol d-none d-sm-table-cell');

                const priceCol = document.createElement('td');
                priceCol.textContent = book.price;
                priceCol.setAttribute('class', 'priceCol');

                const votediv = document.createElement('div');
                votediv.setAttribute('class', 'votediv');
                votediv.style.visibility = "hidden";
                votediv.textContent = book.votes;

                const iddiv = document.createElement('div');
                iddiv.setAttribute('class', 'iddiv');
                iddiv.style.visibility = "hidden";
                iddiv.textContent = book.id;

                tableRow.appendChild(titleCol);
                tableRow.appendChild(authorCol);
                tableRow.appendChild(isbnCol);
                tableRow.appendChild(priceCol);
                tableRow.appendChild(votediv);
                tableRow.appendChild(iddiv);

                table.appendChild(tableRow);
            });


            const tableRow = document.getElementsByClassName('tableRow');


            for (let i = 0; i < tableRow.length; i++) {

                tableRow[i].addEventListener('click', (event) => {

                    event.preventDefault();

                    const maindiv = document.getElementById('listing');

                    const header = document.createElement('h1');
                    header.textContent = tableRow[i].querySelector('.titleCol').innerHTML;

                    const votediv = document.createElement('div');
                    votediv.setAttribute('class', 'votes');

                    const votecount = document.createElement('div');
                    votecount.setAttribute('class', 'vote-count');
                    const datainput = tableRow[i].querySelector('.iddiv').innerHTML;
                    votecount.setAttribute('data-id', datainput);
                    votecount.textContent = tableRow[i].querySelector('.votediv').innerHTML;

                    const link1 = document.createElement('a');
                    link1.setAttribute('class','up-vote');
                    link1.setAttribute('href', '#');

                    const image1 = document.createElement('i');
                    image1.setAttribute('class', 'fas fa-thumbs-up');

                    link1.appendChild(image1);

                    const link2 = document.createElement('a');
                    link2.setAttribute('class','down-vote');
                    link2.setAttribute('href', '#');

                    const image2 = document.createElement('i');
                    image2.setAttribute('class', 'fas fa-thumbs-down');

                    link2.appendChild(image2);

                    votediv.appendChild(votecount);

                    votediv.appendChild(link1);
                    votediv.appendChild(link2);


                    while (maindiv.hasChildNodes()) {
                        maindiv.removeChild(maindiv.firstChild);
                    }

                    const test = document.createElement('p');
                    test.textContent = 'test';

                    maindiv.appendChild(header);
                    maindiv.appendChild(votediv);


                })

            };



        })
        .fail((request, status, error) =>
        {
            console.log(request);
        });



});