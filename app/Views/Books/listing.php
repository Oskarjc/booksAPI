<div id="maindiv">

<div id="listing">

<h1> Book Catalog (read-only)</h1>

<p>Hi, welcome to the "read-only" book catalog :-) Click on our amazing books to see their details!</p>

<div class="col-sm">
    <table class="table table-borderless">
        <thead class="thead-dark">

        <tr>
            <th>Title</th>
            <th class='d-none d-sm-table-cell'>Author</th>
            <th class='d-none d-sm-table-cell'>ISBN</th>
            <th>Price</th>
        </tr>





    </table>



</div>

</div>


    <?php if ($viewModel['profile']) {?>
        <p>
            <button onclick="window.location ='?route=create'" type="button" class="btn btn-success">New book</button>

        </p>

    <?php }?>

</div>


<script src="js/listing.js"></script>
<script src="js/update-book.js"></script>
<script src="js/savebook.js"></script>
<script src="js/details.js"></script>

