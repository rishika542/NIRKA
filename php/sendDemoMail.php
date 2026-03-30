
<?php
// enable error rreporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

//import PHPMaiiler classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

//only allow post requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo "fail";
    exit;
}

// GET FORM DATA 
$firstname     = trim($_POST['firstname'] ?? '');
$lastname      = trim($_POST['lastname'] ?? '');
$email         = trim($_POST['email'] ?? '');
$phone         = trim($_POST['phone'] ?? '');
$organization  = trim($_POST['organization'] ?? '');
$question      = trim($_POST['question'] ?? '');

//  BASIC VALIDATION 
if (empty($firstname) || empty($email) || empty($phone)) {
    echo "fail";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "fail";
    exit;
}

$mail = new PHPMailer(true);

try {
    //  SMTP SETTINGS 
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'nirkawebsitenotification@gmail.com';
    $mail->Password   = 'dbkdmyddwmgtwumd';
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

        
    //  EMAIL SETTINGS 
    $mail->setFrom('nirkawebsitenotification@gmail.com', 'Nirka Website');
    $mail->addAddress('rishikashah012@gmail.com');
    $mail->addReplyTo($email, $firstname);

    $mail->isHTML(true);
    $mail->Subject = 'New Demo Request - Nirka Website';

    $mail->Body = "
        <h2>New Demo Request Received</h2>
        <hr>
        <p><strong>Name:</strong> {$firstname} {$lastname}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Phone:</strong> {$phone}</p>
        <p><strong>Company:</strong> {$organization}</p>
        <p><strong>Message:</strong><br>{$question}</p>
    ";

    $mail->AltBody = "
        New Demo Request

        Name: {$firstname} {$lastname}
        Email: {$email}
        Phone: {$phone}
        Company: {$organization}
        Message: {$question}
    ";

    $mail->send();
    echo "success";
    exit;

} catch (Exception $e) {
    echo "fail";
    exit;
}
?>
