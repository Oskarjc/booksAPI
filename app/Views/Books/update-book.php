<h1><?php echo $viewModel['pageTitle'] ?></h1>

<form novalidate id="updateBookForm">

    <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" name="title" id="title" class="form-control" required value="<?php echo $viewModel['book']['title'] ?>"/>
    </div>

    <div class="form-group">
        <label for="author_id">Author:</label>
        <input type="number" name="author_id" id="author_id" class="form-control" min="1" required value="<?php echo $viewModel['book']['author_id'] ?>"/>
    </div>

    <div class="form-group">
        <label for="isbn">ISBN:</label>
        <input type="text" name="isbn" id="isbn" class="form-control" pattern="^\d{10,13}$" required value="<?php echo $viewModel['book']['isbn'] ?>"/>
    </div>

    <div class="form-group">
        <label for="price">Price:</label>
        <input type="text" name="price" id="price" class="form-control" pattern="^\d{1,5}(\.\d{1,2})?$" required value="<?php echo $viewModel['book']['price'] ?>"/>
    </div>

    <div class="form-group">
        <label for="category_id">Category:</label>
        <input type="number" name="category_id" id="category_id" class="form-control" min="1" required value="<?php echo $viewModel['book']['price'] ?>"/>
    </div>

        <input type="hidden" type="text" name="id" id="id" value="<?php echo $viewModel['book']['id'] ?>"/>

    <div class="form-description">
        <label for="description">Description:</label>
        <textarea id="description" name="description" class="form-control" > "<?php echo $viewModel['book']['description'] ?>" </textarea>
    </div>

    <div>
        <button type="submit" type="button" class="btn btn-success">Opslaan</button>
    </div>

</form>

<script src="js/update-book.js"></script>



