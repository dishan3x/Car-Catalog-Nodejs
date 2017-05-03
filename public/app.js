function loadIndex(){
	
	
	$.get('/cars',function(cars,status){
	
		if(status == "success"){
		
			console.log("got to cars");
			$('#content').empty();
			var link = "";
			var url = "";
	 
			$('#content').append("<div id='gallery-title' class='page-header'><h1>Lovely Cars</h1></div>");
			$('#content').append("<button id='uploadBtnShow' class='btn btn-info'> Upload Button</button>");
			var htmlForm = "<div id='uploadForm' style='display:none' ><form id = 'image-upload-form' action='' method='POST' enctype='multipart/form-data'><h2>Upload Image</h2><label for='image'>Image File:<input type='file' name='image'/></label><label>Name       :<input type='text' name='carName' id='carName'/></label><label>Year &nbsp;&nbsp;:<input type='text' name='year' id='year'/></label><label><textarea type='text'  name='description' id='description' rows='5' columns='20' Placeholder='Enter a Description'></textarea></label><button id='upload' value='Upload Image'>Upload</button></form></div>"
			$('#content').append(htmlForm);
	
			cars.forEach(function(car){
				url = '/cars/'+car.id;
				loadCar(url); 
			});
		}
	});
	
}
// loading the index
loadIndex();


function loadCar(url){
	var html="";
	var i = "";
    $.get(url, function(car, status){
		
        if(status == "success"){
		
		var splitName = [];
		var fileName = car.name;
		splitName = car.name.split(".");
		html =`<div class="carCat" id="${splitName[0]}" class="catologItem" data-id="${car.id}" singleFileName="${splitName[0]}" ><img src="public/images/${fileName}" class="picture" alt="${fileName}"><h1>${splitName[0]}</h1></div></br></br>`;
			
		$('#content').append(html);
			
			// return `<form id="${jsonContent.filename}" action="pictureInformation.html"  ><h1>${jsonContent.filenam}</h1><a href="${jsonContent.filename}"><img src="images/${jsonContent.filename}"  style="height: 200px;width: 50%;background-color: powderblue;" class="picture" alt="${jsonContent.filename}"></a>
			
        }
    });
}

//*********************************************************************************************************
// After the page is loaded
//*********************************************************************************************************
//*********************************************************************************************************		
$( document ).ready(function() {
    
	$('#uploadForm').hide();
	console.log("arrive to document.ready");
	
    $('#content').on('click','.carCat',function(evt) {
		console.log('arrive');
        var id = $(this).data("id");
		var url = "/cars/" + id;
		console.log(url);
		console.log(id);
		var html="";
		$.get(url, function(car, status){
			
			if(status == "success"){
			
			var splitName = [];
			var fileName = car.name;
			splitName = car.name.split(".");
			$('#content').empty();

			html +='<div id="header">'
			html +='    <h1 id="gallery-title">'+splitName[0]+'</h1>';
			html +='</div>'
			html +=' <div class="container"> <image class="imageview" src="public/images/'+car.name+'"/>'; 
			html +=' </br></br><label class="info">Name :</label><input value="'+car.brand+'" disabled></br>';
			html +='  <label class="info">Year&nbsp;&nbsp; :</label><input value="'+car.year+'" disabled></br>';
			html +=' <label> <textarea class="descriptionarea" disabled rows="6" columns="60">'+car.description+'</textarea></br></div>';
			html +='<Button id="backbtn" >Back</button>' 
			
			$('#content').append(html);	
			// return `<form id="${jsonContent.filename}" action="pictureInformation.html"  ><h1>${jsonContent.filenam}</h1><a href="${jsonContent.filename}"><img src="images/${jsonContent.filename}"  style="height: 200px;width: 50%;background-color: powderblue;" class="picture" alt="${jsonContent.filename}"></a>
		
			}
		});
    });
	
	//show the form
	$('#content').on('click','#uploadBtnShow',function(evt) {
		$('#uploadForm').toggle();
	});
	
	
	$('#content').on('click','#backbtn',function(evt) {
		loadIndex();
	});
	
	
}); // end of document.ready

//**********************************************************************************************************************
		
function  click(e){
	
	e.preventDefault();
	  var id = (this).data()


	   $.get(url, function(car, status){
			
			if(status == "success"){
			
			var splitName = [];
			var fileName = car.name;
			splitName = car.name.split(".");
				
			$('#content').empty();
			
			html +='<div id="header">'
			html +='    <h1 id="gallery-title">'+car.name+'</h1>';
			html +='</div>'
			html +='    <form id="gallery-title-edit" method="GET" action="">';
			html +='      <input type="text" name="title">';
			html +='      <input type="submit" value="Change Gallery Title">';
			html +='   </form>';
			html +='	 <image class="imageview" src="images/'+car.name+'"/>'; 
			html +=' </br></br><label class="info">Name :</label><input value="'+car.name+'" disabled></br><label>';
			html +='  <label class="info">Year&nbsp;&nbsp; :</label><input value="'+car.year+'" disabled></br><label>';
			html +='  <textarea class="descriptionarea" disabled rows="6" columns="60">'+car.description+'</textarea></br>';
			html +='<a id="backbtn" href="gallery">Back</a>' 
			
			$('#content').append(html);		
			}
		});
	
	}

	
	// Saving the the uploaded information to the database. Picture will be stored in the remote file public/images
 $( "#upload" ).click(function() {	
		
		var data = new FormData(jQuery('#image-upload-form')[0]);
			
		 $.ajax({
			url: '/cars',
			data: data,
			cache: false,
			contentType: 'multipart/form-data',
			processData: false,
			method: 'POST',
			success: function(data){
				alert(data);
			}
		});
 });	


