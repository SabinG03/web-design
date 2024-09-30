<!--

Assigmnet 4
Sabin Ghet
22499834

Windows - Chrome

-->

<?php
// Check if 'id' parameter is set in the URL
if ( isset($_GET["id"]) ) {
    // Get the value of 'id' parameter from the URL
    $id = $_GET["id"];

    // Database connection parameters
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "customer";

    // Create connection to the database
    $connection = new mysqli($servername, $username, $password, $database);

    // SQL query to delete the user with the specified id
    $sql = "DELETE FROM user WHERE id=$id";

    // Execute the SQL query
    $connection->query($sql);
}

// Redirect the user to the main page after deletion
header("location: /customer/main.php");
// Exit the script
exit; 
?>
