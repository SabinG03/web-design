<?php 

/* 
    Assigmnet 4
    Sabin Ghet
    22499834

    Windows - Chrome
    
*/

// Ensure $connection is available from main.php
if (!isset($connection)) {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "customer";

    // Create connection
    $connection = new mysqli($servername, $username, $password, $database);

    // Check connection
    if ($connection->connect_error) {
        die("Connection failed: " . $connection->connect_error);
    }
}

$search = $_POST['search']; //data key sent from the AJAX request

$sql = "SELECT * FROM user WHERE 
        name LIKE '%$search%' OR 
        surname LIKE '%$search%' OR 
        email LIKE '%$search%' OR 
        phone LIKE '%$search%' OR 
        address1 LIKE '%$search%' OR 
        address2 LIKE '%$search%' OR 
        address3 LIKE '%$search%' OR 
        eircode LIKE '%$search%' OR 
        title LIKE '%$search%'";  
$query = mysqli_query($connection, $sql);
$data='';
while($row = mysqli_fetch_assoc($query))
{
    $data .=  "<tr>
                <td>".$row['id']."</td>
                <td>".$row['title']."</td>
                <td>".$row['name']."</td>
                <td>".$row['surname']."</td>
                <td>".$row['email']."</td>
                <td>".$row['phone']."</td>
                <td>".$row['address1']."</td>
                <td>".$row['address2']."</td>
                <td>".$row['address3']."</td>
                <td>".$row['eircode']."</td>
                <td>
                    <a class='btn btn-primary btn-sm' href='/customer/edit.php?id=".$row['id']."'>Edit</a>
                    <a class='btn btn-danger btn-sm' href='/customer/delete.php?id=".$row['id']."'>Delete</a>
                </td>
              </tr>";
}
echo $data;
?>
