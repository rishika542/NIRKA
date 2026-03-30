
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/Exception.php';
require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';

if($_SERVER["REQUEST_METHOD"] == "POST") {

    // --- FORM DATA ---
    $firstname  = trim($_POST['firstname'] ?? '');
    $lastname   = trim($_POST['lastname'] ?? '');
    $email      = trim($_POST['email'] ?? '');
    $phone      = trim($_POST['phone'] ?? '');
    $country    = trim($_POST['country'] ?? '');
    $position   = trim($_POST['position'] ?? '');
    $company    = trim($_POST['company'] ?? '');
    $experience = trim($_POST['experience'] ?? '');
    $message    = trim($_POST['question'] ?? '');

    if(empty($firstname) || empty($email) || empty($position)){
        echo "error";
        exit;
    }

    git config --global user.name "rishika542"
git config --global user.email "rishika.nirka@outlook.com"
    // --- FILE UPLOAD ---
    if(isset($_FILES['resume']) && $_FILES['resume']['error'] == 0){

        $allowedExtensions = ['pdf', 'doc', 'docx'];

        $fileName = $_FILES['resume']['name'];
        $fileTmp  = $_FILES['resume']['tmp_name'];
        $fileSize = $_FILES['resume']['size'];

        $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

        // Check extension
        if(!in_array($fileExt, $allowedExtensions)){
            echo "error";
            exit;
        }

        // Max 5MB
        if($fileSize > 5 * 1024 * 1024){
            echo "error";
            exit;
        }

        // Move to temp folder for PHPMailer
        $uploadDir = __DIR__ . '/uploads/';
        if(!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

        $resumePath = $uploadDir . basename($fileName);

        if(!move_uploaded_file($fileTmp, $resumePath)){
            echo "error";
            exit;
        }

    } else {
        echo "error";
        exit;
    }

    // --- SEND EMAIL ---
    $mail = new PHPMailer(true);

    try {

        $mail->isSMTP();
        $mail->SMTPDebug = 2;
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'nirkawebsitenotification@gmail.com';
        $mail->Password = 'dbkdmyddwmgtwumd';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('nirkawebsitenotification@gmail.com', 'Nirka Career Application');
        $mail->addAddress('rishikashah012@gmail.com');
        $mail->addReplyTo($email);

        $mail->isHTML(true);
        $mail->Subject = 'New Job Application - Nirka';

        $body = "<h3>New Job Application from nirka.in</h3>";
        $body .= "<p><strong>Position Applied For:</strong> $position</p>";
        $body .= "<hr>";
        $body .= "<p><strong>Name:</strong> $firstname " . ($lastname ? $lastname : "") . "</p>";
        $body .= "<p><strong>Email:</strong> $email</p>";
        if($phone) $body .= "<p><strong>Phone:</strong> $phone</p>";
        if($country) $body .= "<p><strong>Country:</strong> $country</p>";
        if($company) $body .= "<p><strong>Current Company:</strong> $company</p>";
        if($experience) $body .= "<p><strong>Experience:</strong> $experience Years</p>";
        if($message) $body .= "<p><strong>Message:</strong><br>$message</p>";

        $mail->Body = $body;

        // --- Attach Resume ---
        $mail->addAttachment($resumePath, $fileName);

        $mail->send();

        // --- Delete temp file after sending ---
        if(file_exists($resumePath)){
            unlink($resumePath);
        }

        echo "success";

    } catch(Exception $e){
    echo "ERROR: " . $mail->ErrorInfo;
}
}
?>