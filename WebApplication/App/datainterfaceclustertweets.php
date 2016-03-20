<?php
require_once('require.php');
$cid = $_GET["cid"];
$result = pg_query("SELECT * FROM \"tweetdata\" AS t,\"clustertweets\" AS ct WHERE ct.clusterid= " . $cid . " AND t.tweetid = ct.tweetid ORDER BY t.creationDate");
$realimagepath = "";





if($result)
{

	$tick = 0;
while($obj = pg_fetch_object($result)) {
$var[] = $obj;
}
echo '{"clustertweets":'.json_encode($var).'}';

}
?>