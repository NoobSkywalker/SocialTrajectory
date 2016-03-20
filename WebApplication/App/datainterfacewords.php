<?php
require_once('require.php');

$result = pg_query("SELECT * FROM words LIMIT 20");
$realimagepath = "";


if($result)
{
	header ("Content-Type: text/xml");
	echo "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
	echo "<wordresults>\n";
	$tick = 0;
	while ($row = @pg_fetch_array($result,$tick++)  )
	{
		echo '<words>
		<word>'.
		'<![CDATA[' . utf8_encode($row['word']).']]>'.
		'</word>' .
		'<frequency>'.
		'<![CDATA[' . utf8_encode($row['frequency']).']]>'.
		'</frequency>';

		echo " </words>\n";
	}
	echo "</wordresults>";

}
?>