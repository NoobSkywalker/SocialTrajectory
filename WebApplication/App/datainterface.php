<?php
require_once('require.php');
$queryterm = $_GET["searchquery"];
$dataset = $_GET["dataset"];
$a = $_GET["amount"];
$b = $_GET["offset"];
$result = pg_query("SELECT * FROM tweetdata WHERE LOWER(\"tweetContent\") LIKE '%". $queryterm ."%' AND \"datasetid\"=3 ORDER BY \"creationDate\" LIMIT " . $a . " OFFSET ". $b ." ");
$realimagepath = "";





if($result)
{

	$tick = 0;
while($obj = pg_fetch_object($result)) {
$var[] = $obj;
}
echo '{"tweets":'.json_encode($var).'}';


	

}
?>