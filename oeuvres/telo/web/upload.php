<?php
// upload.php
// upload PHP script
// receives AJAX POST request, extracts image from posted URI and files it, echoes files URL
// adapted from formulation by Sabine Rosenberg
// set upload directory in same root folder
$upload_dir = "upload/";
// receive URI from ajax POST using key
$img = $_POST['canvasImage'];
// format received URI (replace leader and spaces)
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
// decode URI
$data = base64_decode($img);
// create file for data and save data to file
// $file = $upload_dir.mktime().".png";
$file = $upload_dir.date("ymd-His-").time().".png";
$success = file_put_contents($file, $data);
// return file URL
echo($file);
?>
