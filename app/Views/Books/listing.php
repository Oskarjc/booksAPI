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

  <!--        --><?php /*
        foreach ($viewModel['books'] as $id => $book) {

            echo "<tr onclick=\"window.location = '?route=show&id={$book['id']}'\">

        <td><a href=\"?route=show&id={$book['id']}\">{$book['title']}</a></td>
        <td class='d-none d-sm-table-cell' >{$book['author_id']}</td>
        <td class='d-none d-sm-table-cell' >{$book['isbn']}</td>
        <td>&euro;{$book['price']}</td>

        </tr>";

        }
        */?>



    </table>



</div>

</div>
</div>


<?php if ($viewModel['profile']) {?>
    <p>
        <button onclick="window.location ='?route=create'" type="button" class="btn btn-success">New book</button>

    </p>

<?php }?>

<script src="js/listing.js"></script>

