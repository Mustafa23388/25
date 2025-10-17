<?php 
include('includes/db.php'); 

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Fetch form data
    $name = $_POST['name'];
    $father_name = $_POST['father_name'];
    $marital_status = $_POST['marital_status'];
    $year_of_passing = $_POST['year_of_passing'];
    $profession = $_POST['profession'];
    $contact_number = $_POST['contact_number'];
    $email = $_POST['email'];

    // Generate a unique receipt ID
    $receipt_id = 'RCPT' . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);

    // Insert data into the database
    $insert = mysqli_query($conn, "INSERT INTO students (name, father_name, marital_status, year_of_passing_matric, profession, contact_number, email, receipt_id) 
    VALUES ('$name', '$father_name', '$marital_status', '$year_of_passing', '$profession', '$contact_number', '$email', '$receipt_id')");

    if ($insert) {
        // On success, send the receipt ID back to show the modal
        $msg = "Registration successful! Your Receipt ID: $receipt_id";
        $success = true;
    } else {
        // Error message
        $msg = "Error in registration. Please try again!";
        $success = false;
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Registration - 25th Silver Jubilee Anniversary</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="container">
        <div class="card p-4">
            <div class="card-header">
                <h4>25th Silver Jubilee Anniversary</h4>
            </div>

            <form method="POST">
                <div class="mb-3">
                    <input type="text" class="form-control" name="name" placeholder="Full Name" required>
                </div>
                <div class="mb-3">
                    <input type="text" class="form-control" name="father_name" placeholder="Father's Name" required>
                </div>
                <div class="mb-3">
                    <select class="form-control" name="marital_status" required>
                        <option value="" disabled selected>Marital Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                    </select>
                </div>
                <div class="mb-3">
                    <input type="number" class="form-control" name="year_of_passing" placeholder="Year of Passing Matric" required>
                </div>
                <div class="mb-3">
                    <input type="text" class="form-control" name="profession" placeholder="Profession" required>
                </div>
                <div class="mb-3">
                    <input type="text" class="form-control" name="contact_number" placeholder="Contact Number" required>
                </div>
                <div class="mb-3">
                    <input type="email" class="form-control" name="email" placeholder="Email Address" required>
                </div>

                <button type="submit" class="btn btn-primary">Register</button>
            </form>

            <!-- Modal for Ticket Instructions -->
            <?php if (isset($success) && $success) { ?>
                <div class="modal fade" id="ticketModal" tabindex="-1" aria-labelledby="ticketModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="ticketModalLabel">How to Buy Ticket</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p><strong>Step 1:</strong> You are successfully registered! Now, you need to make the payment.</p>
                                <p><strong>JazzCash Payment:</strong> Pay to <strong>JazzCash Number: 0300-1234567</strong> and mention your <strong>Receipt ID: <?php echo $receipt_id; ?></strong> in the payment notes.</p>
                                <p><strong>Step 3:</strong> After payment, take a screenshot of the transaction and send it to the school via <strong><a href="https://wa.me/03001234567" target="_blank">WhatsApp</a></strong> along with your receipt ID.</p>
                                <p><strong>Step 4:</strong> After verification, you will receive a *QR code* and your event ticket.</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            <?php } ?>

            <div class="footer-text">
                <p>&copy; 2025 School Name - All Rights Reserved</p>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS (optional) -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
    <?php if (isset($success) && $success) { ?>
        <script>window.showSuccessModal = true;</script>
    <?php } ?>
    <script src="script.js"></script>

</body>

</html>