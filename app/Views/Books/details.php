
<h1> <?php echo $viewModel['pageTitle'] ?></h1>

<div class="votes">
    <div class="vote-count"
         data-id="<?php echo $viewModel['book']['id'] ?>"><?php echo $viewModel['book']['votes'] ?> </div>
    <a class='up-vote' href="#"><i class="fas fa-thumbs-up"></i></a>
    <a class='down-vote' href="#"><i class="fas fa-thumbs-down"></i></a>


</div>


<div class="row">
    <div class="col-md-6">
        <p><b>Author</b><br />
            <?php echo $viewModel['book']['author_id']; ?></p>

        <p><b>ISBN</b><br />
            <?php echo $viewModel['book']['isbn']; ?></p>

        <p><b>Price</b><br />
            &euro; <?php echo $viewModel['book']['price']; ?></p>

        <p><b>Description</b><br />
            <?php echo $viewModel['book']['description']; ?></p>
    </div>
    <div class="col-md-6">

        <?php if ($viewModel['imagePath']) {?>

        <img class="mb-4" src="<?php echo $viewModel['imagePath'];?>" width="100%" />

<?php        } ?>

        <?php if ($viewModel['profile']) { ?>

            <form action="?route=upload-image&id=<?php echo $viewModel['book']['id'] ?>" enctype="multipart/form-data" method="post">
                <p><b>Select image file to upload</b></p>
                <p><input type="file" name="imageFile" id="imageFile" accept="image/*"/></p>
                 /*--> naam is nodig ter identificatie, id is voor benadering javascript/html accept geeft aan wat voor bestand; */
                <p><input class="btn btn-success" type="submit" value="Upload" name="submit" /></p>
            </form>



        <?php } ?>



    </div>
    <?php if ($viewModel['profile']) {?>
<div class="col">

        <button onClick="window.location = 'index.php' ">Home</button>
        <button onClick="window.location = '?route=edit&id=<?php echo $viewModel['book']['id']; ?>'">Edit book</button>

    <?php } ?>
</div>

</div>
</div>

