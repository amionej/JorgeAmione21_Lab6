function APIcall(pageTokenParam){
    let searchterm =  $("#searchterm").val();
    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/search",
        method: "GET",
        data: $.extend({
            key: 'AIzaSyC62R4a5ZDqeuwAuom_6Z46fYH8vcmiyNE',
            q: searchterm,
            part: 'snippet'
        }, {
            maxResults: 10,
            pageToken: pageTokenParam,
        }), //info sent to the API
        dataType: "json", //Returned type of the response
        contentType: "application/json",
        success: function(responseJSON){
            console.log(responseJSON);
            $('.buttons').show();
            if (!responseJSON.prevPageToken) {
                $("#prev").hide();
            } else {
                $("#prev").show();
            }
            if (!responseJSON.nextPageToken) {
                $("#next").hide();
            } else {
                $("#next").show();
            }
            $("#next").val(responseJSON.nextPageToken);
            $("#prev").val(responseJSON.prevPageToken);

            let resp = responseJSON.items;
                resp.map((item) => {
                    let thumbnail = item.snippet.thumbnails.default.url;
                    let title = item.snippet.title;
                    let videoLINK = "https://www.youtube.com/watch?v=" + item.id.videoId;
                    $("#resplist").append(
                        `<li class = "listitem">
                            <a target="_blank" href=${videoLINK}><img src=${thumbnail} width="120px" height="90px" alt=${title === undefined ? 'no name' : title} ></a>
                            <span class = "videospan""><a target="_blank" href=${videoLINK} class ="videourl">${title === undefined ? 'no name' : title}</a></span>
                        </li>
                    `);
                })
        },
        error: function(err){
            console.log("error");
        },
    });
}


$(document).ready(function() {
    $("#search").on("click", function(e) {
        e.preventDefault();
        $("#resplist").html('');
        let pageTokenParam = "";
        APIcall(pageTokenParam);
    });
    $("#prev").on("click", function(e) {
        $("#resplist").html('');
        e.preventDefault();
        APIcall($("#prev").val());
    });
    $("#next").on("click", function(e) {
        $("#resplist").html('');
        e.preventDefault();
        APIcall($("#next").val());
    });
});