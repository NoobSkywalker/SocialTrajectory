<?php
$username = "postgres";
$password = "postgres";
$hostname = "localhost"; 
$db ="michaelhundt";

$dbhandle = pg_connect("host=$hostname dbname=$db user=$username password=$password")
or die("Unable to connect to MySQL");


?>