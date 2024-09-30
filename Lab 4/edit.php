<!--

Assigmnet 4
Sabin Ghet
22499834

Windows - Chrome

-->

<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$database = "customer";

// Create connection
$connection = new mysqli($servername, $username, $password, $database);

// Initialize variables for form fields and messages
$id = "";
$title = "";
$name = "";
$surname = "";
$email = "";
$phone = "";
$address1 = "";
$address2 = "";
$address3 = "";
$eircode = "";

$errorMessage = "";
$successMessage = "";

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Check if the id parameter is set in the GET request
    if (!isset($_GET["id"])) {
        // Redirect to main page if id parameter is not set
        header("location: /customer/main.php");
        exit;
    }

    // Retrieve id parameter from GET request
    $id = $_GET["id"];

    // Construct SQL query to select user data based on id
    $sql = "SELECT * FROM user WHERE id=$id";
    // Execute SQL query
    $result = $connection->query($sql);
    // Fetch the row as an associative array
    $row = $result->fetch_assoc();

    // Check if user with the provided id exists
    if (!$row) {
        // Redirect to main page if user does not exist
        header("location: /customer/main.php");
        exit;
    }

    // Assign fetched data to variables
    $title = $row["title"];
    $name = $row["name"];
    $surname = $row["surname"];
    $email = $row["email"];
    $phone = $row["phone"];
    $address1 = $row["address1"];
    $address2 = $row["address2"];
    $address3 = $row["address3"];
    $eircode = $row["eircode"];
} else {
    // If request method is POST

    // Retrieve id from POST data
    $id = $_POST["id"];

    // Retrieve form data from POST
    $title = $_POST["title"];
    $name = $_POST["name"];
    $surname = $_POST["surname"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $address1 = $_POST["address1"];
    $address2 = $_POST["address2"];
    $address3 = $_POST["address3"];
    $eircode = $_POST["eircode"];

    // Validate form data
    do {
        if (empty($id) || empty($title) || empty($name) || empty($surname) || empty($email) || empty($phone) || empty($address1) || empty($address2) || empty($address3) || empty($eircode)) {
            $errorMessage = "All the fields are required";
            break;
        }

        // Construct SQL query to update user data
        $sql = "UPDATE user " .
            "SET title = '$title', name = '$name', surname = '$surname', email = '$email', phone = '$phone', address1 = '$address1', address2 = '$address2', address3 = '$address3', eircode = '$eircode' " .
            "WHERE id = $id";

        // Execute SQL query
        $result = $connection->query($sql);

        // Check if the query was successful
        if (!$result) {
            $errorMessage = "Invalid query: " . $connection->error;
            break;
        }

        // Set success message
        $successMessage = "Users updated correctly";

        // Redirect to main page after successful update
        header("location: /customer/main.php");
        exit;
    } while (false);
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Shop</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"></script>
</head>

<body>
    <div class="container my-5">
        <h2>New User</h2>

        <?php
        // Display error message if any
        if (!empty($errorMessage)) {
            echo "
            <div class='alert alert-warning alert-dismissible fade show' role='alert'>
                <strong>$errorMessage</strong>
                <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
            </div>
            ";
        }
        ?>


        <form method="post">
            <!-- Hidden input field to store user id -->
            <input type="hidden" name="id" value="<?php echo $id; ?>">
            <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Title</label>
                <div class="col-sm-6">
                    <!-- Radio buttons for title selection -->
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="title" value="Mr" <?php echo ($title === 'Mr') ? 'checked' : ''; ?>>
                        <label class="form-check-label">Mr</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="title" value="Ms" <?php echo ($title === 'Ms') ? 'checked' : ''; ?>>
                        <label class="form-check-label">Ms</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="title" value="Mrs" <?php echo ($title === 'Mrs') ? 'checked' : ''; ?>>
                        <label class="form-check-label">Mrs</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="title" value="Miss" <?php echo ($title === 'Miss') ? 'checked' : ''; ?>>
                        <label class="form-check-label">Miss</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="title" value="Dr" <?php echo ($title === 'Dr') ? 'checked' : ''; ?>>
                        <label class="form-check-label">Dr</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="title" value="Prof" <?php echo ($title === 'Prof') ? 'checked' : ''; ?>>
                        <label class="form-check-label">Prof</label>
                    </div>
                </div>
            </div>
            <!-- Input fields for user data -->
            <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Name</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" name="name" value="<?php echo $name; ?>">
                </div>
            </div>
            <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Surname</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" name="surname" value="<?php echo $surname; ?>">
                </div>
            </div>
            <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Email</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" name="email" value="<?php echo $email; ?>">
                </div>
            </div>
            <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Phone</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" name="phone" value="<?php echo $phone; ?>">
                </div>
            </div>
            <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Address1</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" name="address1" value="<?php echo $address1; ?>">
                </div>
            </div>
            <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Address2</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" name="address2" value="<?php echo $address2; ?>">
                </div>
            </div>
            <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Address3</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" name="address3" value="<?php echo $address3; ?>">
                </div>
            </div>
            <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Eircode</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" name="eircode" value="<?php echo $eircode; ?>">
                </div>
            </div>

            <?php
            // Display success message if any
            if (!empty($successMessage)) {
                echo "
                <div class='row mb-3'>
                    <div class='offset-sm-3 col-sm-6'>
                        <div class='alert alert-success alert-dismissible fade show' role='alert'>
                            <strong>$successMessage</strong>
                            <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
                        </div>
                    </div>
                </div>
                ";
            }
            ?>

            <!-- Submit and Cancel buttons -->
            <div class="row mb-3">
                <div class="offset-sm-3 col-sm-3 d-grid">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
                <div class="col-sm-3 d-grid">
                    <a class="btn btn-outline-primary" href="/customer/main.php" role="button">Cancel</a>
                </div>
            </div>
        </form>
    </div>
</body>

</html>
