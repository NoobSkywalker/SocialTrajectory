<?php
require_once('require.php');
$hashtg = $_GET["hashtg"];
$result = pg_query("SELECT * FROM \"clusters\" AS c,\"hashtags\" AS h WHERE c.hashtagid = h.hashtagid AND h.hashtag LIKE '#". $hashtg . "' ORDER BY avgTime ");
$realimagepath = "";





if($result)
{

	$tick = 0;
while($obj = pg_fetch_object($result)) {
$var[] = $obj;
}
echo '{"clusters":'.json_encode($var).'}';


	

}
?>