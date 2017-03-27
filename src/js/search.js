window.apiKey = "079f7b6e297fd241a98c827fe249bc70";
$(function(){ // OnInit

    function zoom(){
        var id = $(this).attr("id")
        var secret = $(this).attr("secret")
        var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key='+window.apiKey+
            '&photo_id='+id+
            '&secret='+secret+
            '&format=json&nojsoncallback=1';

        $.getJSON(url).done(function(d){
            console.log(d)
        })
    }

    function search(searchTerm, items){

        var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+window.apiKey+
            '&text='+searchTerm+
            '&per_page='+items+
            '&format=json&nojsoncallback=1';

        $.getJSON(url).done(function(data){ // Request for the photos urls
            if(data.stat == "ok"){ // If our request success add all the photos
                $(".content").empty();
                for(p of data.photos.photo){
                    src = 'http://c1.staticflickr.com/'+p.farm+'/'+p.server+'/'+p.id+'_'+p.secret+'_h.jpg';
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