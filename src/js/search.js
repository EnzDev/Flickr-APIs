window.apiKey = "079f7b6e297fd241a98c827fe249bc70";
$(function(){ // OnInit

	$("form")[0].onsubmit = function(ev){ 
		ev.preventDefault();
		$("form button").click()
	}

	$( ".zoom" ).dialog({
		autoOpen: false,
		resizable: false,
		modal: true,
		draggable: false,
		
	});
	        
	$(function() {
		$( ".zoom" ).dialog();
		$(".ui-dialog-title").hide();
		$(".ui-dialog-titlebar").removeClass('ui-widget-header');
	});

    function zoom(){
        var id = $(this).attr("id")
        var secret = $(this).attr("secret")
		var src = $(this).attr("src")
        var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key='+window.apiKey+
            '&photo_id='+id+
            '&secret='+secret+
            '&format=json&nojsoncallback=1';

        $.getJSON(url).done(function(d){
			console.log(d)
			$(".zoom img").attr("src", src)
			$( ".zoom" ).dialog( "open" );
        })
    }

    function search(searchTerm, items){

        var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+window.apiKey+
            '&tags=' + searchTerm+
            '&per_page=' + items +
            '&format=json&nojsoncallback=1&safesearch=safe';

        $.getJSON(url).done(function(data){ // Request for the photos urls
            if(data.stat == "ok"){ // If our request success add all the photos
                $(".content").empty();
                for(p of data.photos.photo){
                    src = 'http://farm'+p.farm+'.staticflickr.com/'+p.server+'/'+p.id+'_'+p.secret+'_b.jpg';
                    imgStr = '<img src="'+src+'" alt="'+p.title+' secret="'+p.secret+' id="'+p.id+'">'
                    $(".content").append(imgStr)
                    $("#"+p.id).click(zoom)
                }
            }
        })
    }

    $(".search button").click(function(){
        search(
            $(".search input").val(), 
            $(".slider input").val()
            )
    })
})
