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

// Create a new MySQLi connection
$connection = new mysqli($servername, $username, $password, $database);

// Initialize variables for form fields and messages
$title = "";
$name = "";
$email = "";
$phone = "";
$address1 = "";
$address2 = "";
$address3 = "";
$eircode = "";

$errorMessage = "";
$successMessage = "";

// Check if the form is submitted via POST method
if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
    // Retrieve form data
    $title = $_POST["title"];
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $address1 = $_POST["address1"];
    $address2 = $_POST["address2"];
    $address3 = $_POST["address3"];
    $eircode = $_POST["eircode"];

    // Validate form data
    do {
        if (empty($title) || empty($name) || empty($email) || empty($phone) || empty($address1) || empty($address2) || empty($address3) || empty($eircode)) {
            $errorMessage = "All the fields are required";
            break;
        }

        // Construct SQL query to insert user data into the database
        $sql =  "INSERT INTO user (title, name, email, phone, address1, address2, address3, eircode) " .
                "VALUES ('$title','$name', '$email', '$phone', '$address1', '$address2', '$address3', '$eircode')";
        // Execute the SQL query
        $result = $connection->query($sql);

        // Check if the query was successful
        if (!$result) {
            $errorMessage = "Invalid query: " . $connection->error;
            break;
        }

        // Reset form fields after successful insertion
        $title = "";
        $name = "";
        $email = "";
        $phone = "";
        $address1 = "";
        $address2 = "";
        $address3 = "";
        $eircode = "";

        // Set success message
        $successMessage = "User added correctly";

        // Redirect to main page after successful insertion
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
        if ( !empty($errorMessage) ) {
            echo "
            <div class='alert alert-warning alert-dismissible fade show' role='alert'>
                <strong>$errorMessage</strong>
                <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
            </div>
            ";
        }
        ?>


        <form method="post">
            <!-- Form fields for user input -->
            <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Title</label>
                <div class="col-sm-6">
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
            <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Name</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" name="name" value="<?php echo $name; ?>">
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
            if ( !empty($successMessage) ) {
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
                    <a class="btn btn-outline-primary" href="/customer/index.php" role="button">Cancel</a>
                </div>
            </div>
        </form>
    </div>
</body>
</html>
