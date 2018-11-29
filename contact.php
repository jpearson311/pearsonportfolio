<?php
// Function to check if the request is an AJAX request
function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

// Values from fields in contact form
$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$message = trim(stripslashes($_POST["message"]));

// Values for mail function
$to = "jpearson311@hotmail.com";
$subject = "Website Inquiry";
$mailHeader = "From: $name <$email> . \r\n";

// Validation & mail send 
if($name == ""){
	$response = array("status" => "error", "message" => "Please enter your name");
	echo json_encode($response);
	exit;
}
else if($email == ""){
	$response = array("status" => "error", "message" => "Please enter your email address");
	echo json_encode($response);
	exit;
}
else if($email !== ""){
	$regEx = preg_match('/\S+@\S+\.\S+/', $email);
	if(!$regEx){
		$response = array("status" => "error", "message" => "Please enter a valid email address");
		echo json_encode($response);
		exit;
	}
	else {
		if($message == ""){
			$response = array("status" => "error", "message" => "Please enter a message");
			echo json_encode($response);
			exit;
		}
		else {
			if(mail($to, $subject, $message, $mailHeader)){
				$response = array("status" => "success", "message" => "Message sent!");	
				echo json_encode($response);
				exit;
			}
			else {
				$response = array("status" => "error", "message" => "Error sending email");	
				echo json_encode($response);
				exit;
			}
		}
	}	
}
?>