<?php
/*
  21 FLORALS — CONTACT FORM HANDLER

  IMPORTANT:
  1. Replace the recipient below with the real mailbox.
  2. For production, SMTP via PHPMailer is more reliable than mail().
  3. Never put SMTP passwords or API secrets in HTML/JavaScript.
  4. Your hosting provider must support PHP mail() for this simple version.
*/

$recipient = "owner@21florals.com"; // <-- REPLACE WITH YOUR REAL RECIPIENT EMAIL

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit("Method Not Allowed");
}

function clean($value) {
    return trim(strip_tags((string)$value));
}

$name = clean($_POST["name"] ?? "");
$phone = clean($_POST["phone"] ?? "");
$email = filter_var(trim($_POST["email"] ?? ""), FILTER_SANITIZE_EMAIL);
$targetDate = clean($_POST["target_date"] ?? "");
$budget = clean($_POST["budget"] ?? "");
$message = clean($_POST["message"] ?? "");

$subjects = $_POST["subject"] ?? [];
if (!is_array($subjects)) {
    $subjects = [$subjects];
}
$subjects = array_map("clean", $subjects);
$subjects = array_filter($subjects);

if ($name === "" || $phone === "" || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === "") {
    http_response_code(400);
    exit("Please complete the required fields and provide a valid email address.");
}

/*
  Basic header-injection protection.
*/
if (preg_match("/[\r\n]/", $email) || preg_match("/[\r\n]/", $name)) {
    http_response_code(400);
    exit("Invalid form data.");
}

$subjectLine = "21 Florals Website Inquiry";
$subjectText = $subjects ? implode(", ", $subjects) : "Not specified";

$body = "21 FLORALS WEBSITE INQUIRY\n\n";
$body .= "Name: " . $name . "\n";
$body .= "Phone: " . $phone . "\n";
$body .= "Email: " . $email . "\n";
$body .= "Areas of Interest: " . $subjectText . "\n";
$body .= "Target Date: " . ($targetDate ?: "Not specified") . "\n";
$body .= "Budget: " . ($budget ?: "Not specified") . "\n\n";
$body .= "Message:\n" . $message . "\n";

$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=UTF-8";
$headers[] = "From: 21 Florals Website <no-reply@21florals.com>";
$headers[] = "Reply-To: " . $email;

$sent = mail($recipient, $subjectLine, $body, implode("\r\n", $headers));

if ($sent) {
    echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Inquiry Sent | 21 Florals</title><link rel="stylesheet" href="style.css"></head><body>';
    echo '<main class="section"><div class="container"><div class="form-shell" style="text-align:center"><p class="eyebrow">21 · Message Received</p><h1>Thank you.</h1><p>Your inquiry was sent successfully. We will review the details and respond using the email address you provided.</p><a class="primary-btn" href="index.html" style="display:inline-block;text-decoration:none">Return Home</a></div></div></main>';
    echo '</body></html>';
} else {
    http_response_code(500);
    echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Delivery Error | 21 Florals</title><link rel="stylesheet" href="style.css"></head><body>';
    echo '<main class="section"><div class="container"><div class="form-shell" style="text-align:center"><h1>Message not sent.</h1><p>The hosting server could not deliver the email. Verify that PHP mail() is enabled, or switch the handler to SMTP/PHPMailer using your hosting provider credentials.</p><a class="primary-btn" href="contact.html" style="display:inline-block;text-decoration:none">Return to Contact Form</a></div></div></main>';
    echo '</body></html>';
}
?>
