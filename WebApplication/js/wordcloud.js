
         /**
* generates a boxed wordcloud including sentiment and credibility
*  
*/  

var fill = d3.scale.category20();
var layout;
var wordmap = {};
var test = {};

var fontSize = d3.scale.log().range([13, 40]);
var radiusscale = d3.scale.log().range([120, 0]);;
var background;
var viscloud;
var svgcloud;
var stopWords = /^(i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall|a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z|a|a|lo|en|ik|ta|hq|es|si|de|dr|di|dont|yo|xd|le|uu|xq|fa|zu|ca|til|ir|ji|ut|'s|able|about|above|according|accordingly|across|actually|after|afterwards|again|against|ain't|all|allow|allows|almost|alone|along|already|also|although|always|am|among|amongst|an|and|another|any|anybody|anyhow|anyone|anything|anyway|anyways|anywhere|apart|appear|appreciate|appropriate|are|aren't|around|as|aside|ask|asking|associated|at|available|away|awfully|b|be|became|because|become|becomes|becoming|been|before|beforehand|behind|being|believe|below|beside|besides|best|better|between|beyond|both|brief|but|by|c|c'mon|c's|came|can|can't|cannot|cant|cause|causes|certain|certainly|changes|clearly|co|com|come|comes|concerning|consequently|consider|considering|contain|containing|contains|corresponding|could|couldn't|course|currently|d|definitely|described|despite|did|didn't|different|do|does|doesn't|doing|don't|done|down|downwards|during|e|each|edu|eg|eight|either|else|elsewhere|enough|entirely|especially|et|etc|even|ever|every|everybody|everyone|everything|everywhere|ex|exactly|example|except|f|far|few|fifth|first|five|followed|following|follows|for|former|formerly|forth|four|from|further|furthermore|g|get|gets|getting|given|gives|go|goes|going|gone|got|gotten|greetings|h|had|hadn't|happens|hardly|has|hasn't|have|haven't|having|he|he's|hello|help|hence|her|here|here's|hereafter|hereby|herein|hereupon|hers|herself|hi|him|himself|his|hither|hopefully|how|howbeit|however|i|i'd|i'll|i'm|i've|ie|if|ignored|immediate|in|inasmuch|inc|indeed|indicate|indicated|indicates|inner|insofar|instead|into|inward|is|isn't|it|it'd|it'll|it's|its|itself|j|just|k|keep|keeps|kept|know|knows|known|l|last|lately|later|latter|latterly|least|less|lest|let|let's|like|liked|likely|little|look|looking|looks|ltd|m|mainly|many|may|maybe|me|mean|meanwhile|merely|might|more|moreover|most|mostly|much|must|my|myself|n|name|namely|nd|near|nearly|necessary|need|needs|neither|never|nevertheless|new|next|nine|no|nobody|non|none|noone|nor|normally|not|nothing|novel|now|nowhere|o|obviously|of|off|often|oh|ok|okay|old|on|once|one|ones|only|onto|or|other|others|otherwise|ought|our|ours|ourselves|out|outside|over|overall|own|p|particular|particularly|per|perhaps|placed|please|plus|possible|presumably|probably|provides|q|que|quite|qv|r|rather|rd|re|really|reasonably|regarding|regardless|regards|relatively|respectively|right|s|said|same|saw|say|saying|says|second|secondly|see|seeing|seem|seemed|seeming|seems|seen|self|selves|sensible|sent|serious|seriously|seven|several|shall|she||shouldshouldn't|since|six|so|some|somebody|somehow|someone|something|sometime|sometimes|somewhat|somewhere|soon|sorry|specified|specify|specifying|still|sub|such|sup|sure|t|t's|take|taken|tell|tends|th|than|thank|thanks|thanx|that|that's|thats|the|their|theirs|them|themselves|then|thence|there|there's|thereafter|thereby|therefore|therein|theres|thereupon|these|they|they'd|they'll|they're|they've|think|third|this|thorough|thoroughly|those|though|three|through|throughout|thru|thus|to|together|too|took|toward|towards|tried|tries|truly|try|trying|twice|two|u|un|under|unfortunately|unless|unlikely|until|unto|up|upon|us|use|used|useful|uses|using|usually|uucp|v|value|various|very|via|viz|vs|w|want|wants|was|wasn't|way|we|we'd|we'll|we're|we've|welcome|well|went|were|weren't|what|what'swhateverwhen|whence|whenever|where|where's|whereafter|whereas|whereby|wherein|whereupon|wherever|whether|which|while|whither|who|who's|whoever|whole|whom|whose|why|will|willing|wish|with|within|without|won't|p|lk|@|ya|ko|fr|jq|el|tv|ha|ne|w|mau|va|tpi|bc|ki|00|ra|ii|yi|se|tj|ci|wonder|would|wouldn't|x|y|yes|yet|you|you'd|you'll|you're|you've|your|yours|yourself|yourselves|z|zero)$/,
	punctuation = /[!"&()*+#,-\.\/:;<=>?\[\\\]^`\{|\}~]+/g,
	wordSeparators = /[\s\u3031-\u3035\u309b\u309c\u30a0\u30fc\uff70]+/g,
	discard = /^(@|https?:)/,
	htmlTags = /(<[^>]*?>|<script.*?<\/script>|<style.*?<\/style>|<head.*?><\/head>)/g,
	matchTwitter = /^https?:\/\/([^\.]*\.)?twitter\.com/;


wordColor = d3.scale.linear().domain([-10,0, 10]).range(["red","yellow", "green"]);

function drawwordcloud() {
		var words = window.allwords;
		svgcloud = d3.select("#keyword-drift").append("svg").attr("width", 900).attr("height", 600);
		viscloud = svgcloud.append("g").attr("transform", "translate(450,180)");
		background = svgcloud.append("g");
		var fill = d3.scale.category20();
		words.map(function(d) {
			word_list = d.split("!54");
			currentsent= word_list[1].split("!55")[0];
			currentcred= parseFloat(word_list[1].split("!55")[1]);
			currentDate= word_list[1].split("!56")[1];
			
			word_list= word_list[0].split(wordSeparators);
			
			for (i in word_list) {
				w = word_list[i];
				w = w.toLowerCase();
				w = w.replace(punctuation, "");
				var tempword = new word(w);
				if (stopWords.test(w.toLowerCase())) {
					continue;
				}
				if (w.length<3) {
					continue;
				}
				if (discard.test(w.toLowerCase())) {
					continue;
				}
				if (!wordmap.hasOwnProperty(w)) {
					wordmap[w] = tempword;
				}
				wordmap[w].increaseamount();
				
				if(currentsent==-1)
				{
					wordmap[w].addneg();
				}
				if(currentsent==1)
				{
					wordmap[w].addpos();
				}
				wordmap[w].addcred(currentcred);
				wordmap[w].appearences.push(currentDate);
				
				
			}
		});
		layout = d3.layout.cloud().size([930, 300]).words(d3.entries(wordmap).map(function(d) {
			return {
				text: d.key,
				size: d.value.amount,
				color: d.value.avgsent,
				radius: d.value.getavgcred(),
				appearance: d.value.appearences
			};
		}))
		.padding(1)
		.rotate(function(d) { 
		if ( window.switchwcangle) 
		{
		return radiusscale(d.radius )
		} else {} return 0; })
		.font("Impact").fontSize(function(d) {
			return fontSize(+d.size);
		}).on("end", draw).start()		 ;
	}

function draw(words) {
		var text = viscloud.selectAll("text").data(words);
		text.enter().append("text")
				.style("font-size", function(d) {
			return d.size + "px";
		}).style("font-family", "Impact").style("fill", function(d, i) {
			if(d.color<-10)
			{
				
				return 'red';
			}
			if(d.color>10)
			{
				return 'green';
			}
			return wordColor(d.color);
		}).attr("text-anchor", "middle").attr("transform", function(d) {
			return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
		})
		 .on('mouseover', function(d, i){ 
		 d3.select(this).style({"fill": 'black'});
		d3.selectAll("."+d.text).classed("active",true);
		highlightmarker(d.text);
		  })
     	 .on('mouseout', function(d, i){ d3.select(this).style("fill",  function(d, i) {
			d3.selectAll("."+d.text).classed("active",false);
			removehighlights();
			if(d.color<-10)
			{
				
				return 'red';
			}
			if(d.color>10)
			{
				return 'green';
			}
			return wordColor(d.color);
		})})
		/*.call(d3.helper.tooltip()
                .attr({class: function(d, i) { return "tooltip"; }})
                .style({color: '#000',background:'white',border:"1px solid #000"})
                .text(function(d){ 
				var textoutput="";
				
				for (s in d.appearance)
				{
					textoutput+=d.appearance[s]+"<br/>";
				}
				
				return ' '+textoutput; })
            )*/
		.text(function(d) {
			return d.text;
		});
		
		text.exit().remove();
	  var exitGroup = background.append("g")
      .attr("transform", viscloud.attr("transform"));
  var exitGroupNode = exitGroup.node();
  text.exit().each(function() {
    exitGroupNode.appendChild(this);
  });
  exitGroup.transition()
      .duration(10)
      .style("opacity", 1e-6)
      .remove();
	  viscloud.transition()
      .delay(10)
      .duration(10)
		
	};

function updatecloud() {
	svgcloud.remove();
	viscloud.remove();
	background.remove();
			svgcloud = d3.select("#keyword-drift").append("svg").attr("width", 900).attr("height", 600);
		viscloud = svgcloud.append("g").attr("transform", "translate(450,180)");
		background = svgcloud.append("g");
		var fill = d3.scale.category20();
	
	 var words = window.currentwords;
	 wordmap = null;
		wordmap = {};
		layout.stop();
		words.map(function(d) {
			word_list = d.split("!54");
			currentsent= word_list[1].split("!55")[0];
			currentcred= parseFloat(word_list[1].split("!55")[1]);
			currentDate= word_list[1].split("!56")[1];
			
			word_list= word_list[0].split(wordSeparators);
			
			for (i in word_list) {
				w = word_list[i];
				w = w.toLowerCase();
				w = w.replace(punctuation, "");
				var tempword = new word(w);
				if (stopWords.test(w.toLowerCase())) {
					continue;
				}
				if (w.length<3) {
					continue;
				}
				if (discard.test(w.toLowerCase())) {
					continue;
				}
				if (!wordmap.hasOwnProperty(w)) {
					wordmap[w] = tempword;
				}
				wordmap[w].increaseamount();
				
				if(currentsent==-1)
				{
					wordmap[w].addneg();
				}
				if(currentsent==1)
				{
					wordmap[w].addpos();
				}
				wordmap[w].addcred(currentcred);
				wordmap[w].appearences.push(currentDate);
				
				
			}
		});
		layout.stop().words(d3.entries(wordmap).map(function(d) {
			return {
				text: d.key,
				size: d.value.amount,
				color: d.value.avgsent,
				radius: d.value.getavgcred(),
		appearance: d.value.appearences
			};
		}))
		.padding(1)
		.rotate(function(d) { 
		if ( window.switchwcangle) 
		{
		return radiusscale(d.radius )
		} else {} return 0; })
		.font("Impact").fontSize(function(d) {
			return fontSize(+d.size);
		}).on("end", draw).start()		 ;
	
		
		
	}