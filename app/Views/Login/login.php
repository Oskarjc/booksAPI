<h1> <?php echo $viewModel['pageTitle'] ?></h1>

<?php /*if($viewModel['errors']) { */?><!--

<div class="alert alert-danger alert-dismissible fade show" role="alert">
<?php /*echo $viewModel['errors']*/?>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

--><?php /*} */?>



<p>Oh Hello, may I have your password???</p>

<form action="?route=login" method="post">
    <div class="row">
        <div class="col-xs-12 col-md-4">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" name="username" id="username" class="form-control"/>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" class="form-control"/>
            </div>
        </div>
    </div>

    <br clear="all"/>

    <button type="submit" class="btn btn-success"><i class="fa fa-check"></i> Login</button>

</form>

