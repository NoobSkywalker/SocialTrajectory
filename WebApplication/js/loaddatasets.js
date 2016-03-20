        /**
* loads the data
@deprecated
*  
*/  

function loadDatasets(){
	// Create a connection to the file.
	var Connect = new XMLHttpRequest();

	// Define which file to open and
	// send the request.
	Connect.open("GET", "datainterface_datasets.php", false);
	Connect.setRequestHeader("Content-Type", "text/xml");
	Connect.send(null);

	// Place the response in an XML document.
	var TheDocument = Connect.responseXML;

	// Place the root node in an element.
	var Datasets = TheDocument.childNodes[0];

	// Retrieve each tweet in turn.
	for (var i = 0; i < Datasets.children.length; i++) {
		var Dataset = Datasets.children[i];
		// Access each of the data values.
		var name = Dataset.getElementsByTagName("name")[0].childNodes[0].nodeValue;
		var ID = Dataset.getElementsByTagName("datasetID")[0].childNodes[0].nodeValue;
		var desc = Dataset.getElementsByTagName("description")[0].childNodes[0].nodeValue;
			var keyw = Dataset.getElementsByTagName("keywords")[0].childNodes[0].nodeValue;

		
		
		var $tabsul = $('#tabsul');
		$tabsul.append('<li><a href="#'+name+ID+'">'+name+'</a></li>');
		
		
		
		var $div =  $('<div/>', {
				id: name+ID
		}).html(desc);

		$button = $('<button/>', {
			id: 'bt' + name + ID,
			class: 'myButtons'
		}).css('float', 'right')
			.text('Choose this dataset')
			.data('datasetid', ID)
			.data('keywords', keyw)
			.appendTo($div);

		$div.insertAfter($tabsul);
		$( ".myButtons" ).before("<br><br>");
	}
}

// in document ready ...
$(document).ready(function() {
	$(this).on('click', '.myButtons', function() {
		setglobalDatasetID($(this).data('datasetid'));	
		var $keywlist = $('#keywordslist');
		$keywlist.append('The most frequent keywords for this dataset are: <br><br><div id="keywordstyle"> '+$(this).data('keywords')+'</div>');
	 $( "#chooseDS" ).dialog('close');
	 $( "#SearchDialog" ).dialog('open');
	
	});
});
