<?php

if ($_POST && $_POST["form"] === 'contactForm') {


    // Use PHP To Detect An Ajax Request
    if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {

        // Exit script for the JSON data
        $output = json_encode(
            array(
                'type' => 'error',
                'text' => 'Request must come from Ajax'
            ));

        die($output);
    }

    // Checking if the $_POST vars well provided, Exit if there is one missing
    if (!isset($_POST["contactSpamChecking"]) || !isset($_POST["contactName"]) || !isset($_POST["contactEmail"]) || !isset($_POST["contactMessage"])) {

        $output = json_encode(
            array(
                'type' => 'error',
                'text' => 'Some input fields are empty!'
            ));

        die($output);
    }

    // Anti-spam field, if the field is not empty, submission will be not proceeded. Let the spammers think that they got their message sent with a Thanks ;-)
    if (!empty($_POST["contactSpamChecking"])) {

        $output = json_encode(
            array(
                'type' => 'message',
                'text' => 'Message sent, Thank you.'
            ));

        die($output);
    }

    // PHP validation for the fields required
    if (empty($_POST["contactName"])) {
        $output = json_encode(
            array(
                'type' => 'error',
                'text' => 'Your name is required.'
            ));
        die($output);
    }

    if (!filter_var($_POST["contactEmail"], FILTER_VALIDATE_EMAIL)) {

        $output = json_encode(
            array(
                'type' => 'error',
                'text' => 'Email is not valid.'
            ));

        die($output);
    }

    // To avoid too small message, you can change the value of the minimum characters required. Here it's <20
    if (strlen($_POST["contactMessage"]) < 20) {

        $output = json_encode(
            array(
                'type' => 'error',
                'text' => 'Message need to be more than 20 Characters'
            ));

        die($output);
    }

    // Write your email here
    $to_Email = 'example@gmail.com';

    // Proceed with PHP email
    $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type:text/html;charset=UTF-8' . "\r\n";
    $headers .= 'From: My website' . "\r\n";
    $headers .= 'Reply-To: ' . $_POST["contactEmail"] . "\r\n";
    $headers .= 'X-Mailer: PHP/' . phpversion();

    // Body of the Email received in your Mailbox
    $emailContent = 'Hey! You have received a new message from the visitor <strong>' .
        $_POST["contactName"] . '</strong><br/><br/>' . "\r\n" .
        'His message: <br/> <em>' . htmlentities($_POST["contactMessage"]) . '</em><br/><br/>' . "\r\n" .
        '<strong> You can contact ' . htmlentities($_POST["contactName"]) .
        ' back at email : ' . htmlentities($_POST["contactEmail"]) .
        '</strong>' . "\r\n";

    $mailSending = @mail($to_Email, $emailContent, $headers);

    if (!$mailSending) {

        //If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
        $output = json_encode(
            array(
                'type' => 'error',
                'text' => ' Sorry, No connection at the moment.'
            ));

        die($output);

    } else {

        //If all works send a success message
        $output = json_encode(
            array(
                'type' => 'message',
                'text' => 'Thanks ' . htmlentities($_POST["contactName"]) . ', Your message has been sent, we will get back to you asap !'
            ));

        die($output);
    }
}
