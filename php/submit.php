<?php
// enable errorr reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/Exception.php';
require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';

// check if the form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST") {

    // CAPTCHA 
    $secretKey = "6LfNCVosAAAAAHMHf9HvjJ_ClBxIlb5RZe5MdFA9";
    $captcha = $_POST['g-recaptcha-response'] ?? '';

    //if CAPTCHA is missing
    if(!$captcha){
        echo "captcha_missing";
        exit;
    }

    //send requuest to GOOGLE reCAPTCHA API
    $verifyURL = "https://www.google.com/recaptcha/api/siteverify";
    $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $verifyURL);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'secret' => $secretKey,
        'response' => $captcha
    ]));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    //get response from API
    $response = curl_exec($ch);
    curl_close($ch);
    $responseData = json_decode($response);

    // if CAPTCHA varificationn fails
    if(!$responseData->success){
        echo "captcha_failed";
        exit;
    }

    //  FORM DATA 
    $firstname    = trim($_POST['firstname'] ?? '');
    $lastname     = trim($_POST['lastname'] ?? '');
    $email        = trim($_POST['email'] ?? '');
    $phone        = trim($_POST['phone'] ?? '');
    $country      = trim($_POST['country'] ?? '');
    $organization = trim($_POST['organization'] ?? '');
    $product      = trim($_POST['product'] ?? '');
    $industry     = trim($_POST['industry'] ?? '');
    $message      = trim($_POST['question'] ?? '');

    if(empty($firstname) || empty($email)){
        echo "error";
        exit;
    }

    // SEND EMAIL 
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
       $mail->Username = 'nirkawebsitenotification@gmail.com';  
        $mail->Password = 'dbkdmyddwmgtwumd';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

      $mail->setFrom('nirkawebsitenotification@gmail.com', 'Nirka Business Solutions');
      $mail->addAddress('rishikashah012@gmail.com');
        $mail->addReplyTo($email);

        $mail->isHTML(true);
          $mail->Subject = 'Nirka Website Notification';
        $body = "<h3>New Lead from nirka.in</h3>";
        $body .= "<p><strong>Name:</strong> $firstname" . ($lastname ? " $lastname" : "") . "</p>";
        $body .= "<p><strong>Email:</strong> $email</p>";
        if($phone) $body .= "<p><strong>Phone:</strong> $phone</p>";
        if($country) $body .= "<p><strong>Country:</strong> $country</p>";
        if($organization) $body .= "<p><strong>Organization:</strong> $organization</p>";
        if($product) $body .= "<p><strong>Product:</strong> $product</p>";
        if($industry) $body .= "<p><strong>Industry:</strong> $industry</p>";
        if($message) $body .= "<p><strong>Message:</strong><br>$message</p>";

        $mail->Body = $body;
        $mail->send();
        echo "success";

    } catch(Exception $e){
        // error while sendingg email
        echo "error";
    }
}
?>