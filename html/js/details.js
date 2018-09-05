function getDetails() {

    const tableRow = document.getElementsByClassName('tableRow');

    for (let i = 0; i < tableRow.length; i++) {

        tableRow[i].addEventListener('click', (event) => {

            event.preventDefault();

            const maindiv = document.getElementById('listing');

            // --- header ---

            const header = document.createElement('h1');
            header.setAttribute('id', 'header');
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
            authorvalue.setAttribute('id', 'authorValueContainer');


            authordiv.appendChild(authorheader);
            authordiv.appendChild(authorvalue);


            // --- category ---

            const categorydiv = document.createElement('div');

            const categoryheader = document.createElement('b');
            categoryheader.append('Category:');

            const categoryvalue = document.createElement('p');
            categoryvalue.setAttribute('id', 'categoryValueContainer');
            categoryvalue.append(tableRow[i].querySelector('.categoryCol').innerHTML);


            categorydiv.appendChild(categoryheader);
            categorydiv.appendChild(categoryvalue);


            // --- isbn ---

            const isbndiv = document.createElement('div');

            const isbnheader = document.createElement('b');
            isbnheader.append('ISBN:');

            const isbnvalue = document.createElement('p');
            isbnvalue.setAttribute('id', 'isbnvalue');
            isbnvalue.append(tableRow[i].querySelector('.isbnCol').innerHTML);

            isbndiv.appendChild(isbnheader);
            isbndiv.appendChild(isbnvalue);


            // --- price ---

            const pricediv = document.createElement('div');

            const priceheader = document.createElement('b');
            priceheader.append('Price:');

            const pricevalue = document.createElement('p');
            pricevalue.setAttribute('id', 'pricevalue');
            pricevalue.append(tableRow[i].querySelector('.priceCol').innerHTML);

            pricediv.appendChild(priceheader);
            pricediv.appendChild(pricevalue);

            // --- description ---
            const descriptiondiv = document.createElement('div');

            const descriptionheader = document.createElement('b');
            descriptionheader.append('Description:');

            const descriptionvalue = document.createElement('p');
            descriptionvalue.setAttribute('id', 'descriptionvalue');
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

            $(document).ready(function () {
                voteElement = $(".votes");
                if (voteElement) {
                    bookId = $(voteElement).find(".vote-count").data("id");
                    if (bookId > 0) {
                        setInterval("getVotes(" + bookId + ")", 10000);
                        $(voteElement).find(".up-vote").click(function () {
                            upVote(bookId);
                        });
                        $(voteElement).find(".down-vote").click(function () {
                            downVote(bookId);
                        });
                    }
                }
            });

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

                updateBookJs();


            });
        })
    }
}