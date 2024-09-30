<!--

Assigmnet 4
Sabin Ghet
22499834

Windows - Chrome

-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
    <style>


            /*     Additional Styling addons   */

        tbody tr:nth-child(odd) {
            background-color: rgb(242, 242, 242);
        }
        table {
            border: 5px solid rgb(0,0,0); 
        }

        .title{
            position:absolute;
            height:140px;
            width:500px;
            left:43%;
            top:4%;
            font-size:100px;
        }
        .new{
            position:absolute;
            left:30%;
            top:10.5%;
        }
        .newtext{
            position:absolute;
            left:30%;
            top:5%;
        }
        .head{
            background-color:rgb(210,210,210);

        }

    </style>
</head>
<body>
<?php

// Database connection parameters

$servername = "localhost";
$username = "root";
$password = "";
$database = "customer";

$connection = new mysqli($servername, $username, $password, $database);
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}
?>


<h2 class="title">User Table</h2>
<div class="container my-5">
    <p><h2>Live Search</h2></p>
    <div class="input-group mb-4 mt-3">
        <div class="form-outline">
            <input type="text" id="searchInput" class="form-control" placeholder="Type to start live search">
            <div class="container mt-4">
                </div>
            </div>
        </div>
        <p><h2 class=newtext>Add User</h2></p>
        <a class="btn btn-primary new" href="/customer/add.php" role="button">+ User</a>
    <br>
    <table class="table ">
        <thead>
            <tr class="head">
                <th>ID</th>
                <th>Title</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address1</th>
                <th>Address2</th>
                <th>Address3</th>
                <th>Eircode</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody id="userData">
            <?php
            $sql = "SELECT * FROM user";
            $result = $connection->query($sql);

            if (!$result) {
                die("Invalid query: " . $connection->error);
            }
            /* This loop iterates over each row fetched from the database  */
            while($row = $result->fetch_assoc()) {
                echo "
                <tr>
                    <td>$row[id]</td>
                    <td>$row[title]</td>
                    <td>$row[name]</td>
                    <td>$row[surname]</td>
                    <td>$row[email]</td>
                    <td>$row[phone]</td>
                    <td>$row[address1]</td>
                    <td>$row[address2]</td>
                    <td>$row[address3]</td>
                    <td>$row[eircode]</td>
                    <td>
                        <a class='btn btn-primary btn-sm' href='/customer/edit.php?id=$row[id]'>Edit</a>
                        <a class='btn btn-danger btn-sm' href='/customer/delete.php?id=$row[id]'>Delete</a>
                    </td>
                </tr>
                ";
            }
            ?>
        </tbody>
    </table>
</div>

<script>
$(document).ready(function(){
    // This function is executed when the page is fully loaded and ready.
    $('#searchInput').on("keyup", function(){
        // This event listener listens for keyup events on the search input field.
        var searchText = $(this).val();
        // Retrieve the value entered in the search input field.
        // Send an AJAX request to the server when a key is released in the search input field.
        $.ajax({
            method: 'POST', // Using POST method to send data to the server.
            url: 'search.php', // The URL of the server-side script that handles the search.
            data: {search: searchText}, // The data to be sent to the server (the search query).
            success: function(response) {
                // This function is called when the server responds successfully.
                // It updates the content of the 'userData' element with the response from the server.
                $('#userData').html(response);
            }
        });
    });
});

</script>

</body>
</html>
