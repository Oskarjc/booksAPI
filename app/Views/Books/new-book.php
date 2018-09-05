<h1><?php echo $viewModel['pageTitle'] ?></h1>

</h1>


<form novalidate id="createBookForm">

    <div class="row">
        <div class="col-xs-12 col-md-6">


            <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" class="form-control" required />
            </div>

            <div class="form-group">
                <label for="author_id">Author:</label>
                <input type="number" name="author_id" id="author_id" class="form-control" min="1" required/>
            </div>

            <div class="form-group">
                <label for="isbn">ISBN:</label>
                <input type="text" name="isbn" id="isbn" class="form-control" pattern="^\d{10,13}$" required/>
            </div>

            <div class="form-group">
                <label for="price">Price:</label>
                <input type="text" name="price" id="price" class="form-control" pattern="^\d{1,5}(\.\d{1,2})?$" required/>
            </div>

            <div class="form-group">
                <label for="category_id">Category:</label>
                <input type="number" name="category_id" id="category_id" class="form-control" min="1" required/>
            </div>


        </div>


        <div class="col-xs-12 col-md-6">

            <div class="form-group description-wrapper">
                <label for="description">Description:</label>
                <textarea id="description" name="description" class="form-control" optional></textarea>
            </div>

        </div>


    </div>

    <div class="col row justify-content-between">
        <div>
            <button onclick="window.location = 'index.php'" type="button" class="btn btn-info">Back</button>
        </div>


        <div>
            <button type="submit" type="button" class="btn btn-success">Opslaan</button>
        </div>

    </div>


</form>

<div class="message-container">
    <hr/>
</div>

<script src="js/new-book.js"></script>



<form novalidate id="createBookForm">

    <div class="row">
        <div class="col-xs-12 col-md-6">


            <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" class="form-control" required />
            </div>

            <div class="form-group">
                <label for="author_id">Author:</label>
                <input type="number" name="author_id" id="author_id" class="form-control" min="1" required/>
            </div>

            <div class="form-group">
                <label for="isbn">ISBN:</label>
                <input type="text" name="isbn" id="isbn" class="form-control" pattern="^\d{10,13}$" required/>
            </div>

            <div class="form-group">
                <label for="price">Price:</label>
                <input type="text" name="price" id="price" class="form-control" pattern="^\d{1,5}(\.\d{1,2})?$" required/>
            </div>

            <div class="form-group">
                <label for="category_id">Category:</label>
                <input type="number" name="category_id" id="category_id" class="form-control" min="1" required/>
            </div>


        </div>


        <div class="col-xs-12 col-md-6">

            <div class="form-group description-wrapper">
                <label for="description">Description:</label>
                <textarea id="description" name="description" class="form-control" optional></textarea>
            </div>

        </div>


    </div>

    <div class="col row justify-content-between">
        <div>
            <button onclick="window.location = 'index.php'" type="button" class="btn btn-info">Back</button>
    </div>


<div>
    <button type="submit" type="button" class="btn btn-success">Opslaan</button>
</div>

</div>


</form>

<div class="message-container">
<hr/>
</div>

<script src="js/new-book.js"></script>


