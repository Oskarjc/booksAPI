const getBook = () => {
    return $.get(env.api + '?route=book');
};


const getBooks = () => {
    return $.get(env.api + '?route=books');

};

const deleteBook = (id) => {
    return $.post(env.api + '?route=delete', JSON.stringify(id))
};

const createBook = (book) => {
    return $.post(env.api + '?route=create', JSON.stringify(book));
};

const updateBook = (book) => {
    return $.post(env.api + '?route=update', JSON.stringify(book));
};

const  appendSuccesMessage = (message, elementSelector) => {


    const successAlert = $(`    <div class="alert alert-success alert-dismissible fade show" role="alert">
                                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                                </button>
                                                ${message}
                                                </div>`)

    $(elementSelector).append(successAlert);

};

const fieldValidation = (event) => {
    const inputField = event.target;
    if (!inputField.checkValidity()) {
        addErrorMessageForElement(inputField);
    } else {
        clearErrorMessageForElement(inputField)
    }
};

const addErrorMessageForElement = (element) => {
    clearErrorMessageForElement(element);

    const parent = element.parentNode;

    const errorMessage = getErrorMessageForElement(element);

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = errorMessage;

    parent.appendChild(errorDiv);
};

const clearErrorMessageForElement = (element) => {
    const parent = element.parentNode;

    const errorDiv = parent.querySelector('div.error-message');
    if (errorDiv) {
        parent.removeChild(errorDiv);
    }
};

const getErrorMessageForElement = (element) => {
    if (element.validity.customError) {
        return element.validationMessage;
    } else if (element.validity.valueMissing) {
        return 'Dit veld is verplicht';
    } else {
        return 'Dit veld is onjuist gevuld';
    }
};


function upVote(id) {
    $.ajax({
        url: "http://localhost/booksoop/api/?route=votes&id=" + id,
        type: "POST"
    }).done(function( data ) {
        if (data) {
            response = $.parseJSON(data);
            votes = response.votes;
            $(".vote-count").html(votes);
                        }
    });
}

function downVote(id) {
    $.ajax({
        url: "http://localhost/booksoop/api/?route=votes&id=" + id,
        type: "DELETE"
    }).done(function( data ) {
        if (data) {
            response = $.parseJSON(data);
            votes = response.votes;
            $(".vote-count").html(votes);
        }
    });
}

function getVotes(id) {
    $.ajax({
        url: "http://localhost/booksoop/api/?route=votes&id=" + id,
        type: "GET"
    }).done(function( data ) {
        if (data) {
            response = $.parseJSON(data);
            votes = response.votes;
            $(".vote-count").html(votes);
        }
    });
}

$( document ).ready(function() {
    voteElement = $(".votes");
    if (voteElement){
        bookId = $(voteElement).find(".vote-count").data("id");
        if (bookId>0) {
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