function savebook() {

    event.preventDefault();

    const formselect = document.getElementById('updateBookForm');
    const inputTitle = document.getElementById('title');
    const inputFields = updateBookForm.querySelectorAll('.form-control');

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
}