
<?php
require_once('require.php');
$queryterm = $_GET["hashtg"];

$result = pg_query("select * from hashtagtweets ht, tweetdata t, hashtags h where h.hashtag LIKE '" . $queryterm ."' AND ht.tweetid=t.tweetid AND ht.hashtagid = h.hashtagid");






if($result)
{

	$tick = 0;
while($obj = pg_fetch_object($result)) {
$var[] = $obj;
}
echo '{"tweets":'.json_encode($var).'}';


	

}
?>