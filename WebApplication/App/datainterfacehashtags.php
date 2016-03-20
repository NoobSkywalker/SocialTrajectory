<?php
require_once('require.php');

$result = pg_query("SELECT * FROM hashtags LIMIT 96");
$realimagepath = "";


if($result)
{
	header ("Content-Type: text/xml");
	echo "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
	echo "<hashtagresults>\n";
	$tick = 0;
	while ($row = @pg_fetch_array($result,$tick++)  )
	{
		echo '<hashtags>
		<hashtag>'.
		'<![CDATA[' . utf8_encode($row['hashtag']).']]>'.
		'</hashtag>' .
		'<frequency>'.
		'<![CDATA[' . utf8_encode($row['frequency']).']]>'.
		'</frequency>'.
            '<hashtagid>'.
        '<![CDATA[' . utf8_encode($row['hashtagid']).']]>'.
		'</hashtagid>';

		echo " </hashtags>\n";
	}
	echo "</hashtagresults>";

}
?>