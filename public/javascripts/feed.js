/* ========== *** Assignment 4 ===> All APIs contained in routes/index.js *** ========= */

$(document).ready(function() {

        //Allow for 280 chars and reduce dynamically:
        var totalCharacters = 280;

        $("#inputPost").keyup(function (event) {
                var inputText = event.target.value;
                $("#charRemaining").html(totalCharacters - inputText.length);
            });


        getComments();// when page ready request all comments

        //Call to the GetComments API using AJAX (sorted by newest first) ===> structure is emulated by Postman client
        function getComments() {
            $.ajax({
                url: '/GetComments/',
                type: 'GET',
                success: function (data) {
                    var posts = "";
                    //dynamically generated html elements:
                    for (var i = 0; i < data.length; i++) {
                        posts   +=  "<div class='row justify-content-md-center pt-4'>"
                                +   "<div class ='panel col-md-6'><div class='row'>"
                                +   "<div class = 'col-md-9'>" + data[i].comment + "</div></div>"
                                +   "<div class='col-md-2'>"
                                +   "<button type ='button' id='upVote' name = '" + data[i]._id + "' class='btn btn-success btn-circle'><span class=\"glyphicon glyphicon-thumbs-up glyphicon-align-left\" aria-hidden=\"true\"></span><span class='badge'>"+data[i].up_votes+"</span></button>"
                                +   "</div>"
                                +   "<div class='col-md-2'>"
                                +   "<button type='button' id='downVote' name = '" + data[i]._id + "' class = 'btn btn-warning btn-circle'><span class=\"glyphicon glyphicon-thumbs-down glyphicon-align-left\" aria-hidden=\"true\"></span><span class='badge'>"+data[i].down_votes+"</span></button>"
                                +   "</div>"
                                +   "<div class = 'col-md-2'>"
                                +   "<button type='button' id='del' name = '" + data[i]._id + "' class='btn btn-danger btn-circle'><span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span></button>"
                                +   "</div>"
                                +   "</div></div></div></div>";
                    }
                    $("#feedPosts").html(posts);
                }
            });

            setTimeout(getComments,20000);//recursively calling get comments function every 20 seconds

        }


    //Call to AddCommentTo API when postBTn clicked (add comment then refresh all comments and clear comments)
        $("#postBtn").click(function (event) {
            $.ajax({
                url: '/AddCommentTo/',
                type: 'POST',
                data: {user_name:"Oisin", comment:$('#inputPost').val()},
                success: function (data) {
                getComments();
                    $("#inputPost").val('');//resetting the comment box
                }
            });
        });

    //Call to DeleteComment API when 'del' button clicked and refresh comments (.on() allows targeting of dynamic html elements)
    $(document).on('click','#del',function(){

        console.log(event.target.name);

        if(event.target.name)
        {
            $.ajax({
                url: '/DeleteComment/' + event.target.name,
                type: 'DELETE',
                success: function(result) {
                    getComments();
                }
            });
        }

    });

    //Call to UpVote PUT API to add one when #upVote button clicked, then refresh comments
    $(document).on('click','#upVote',function(){

        console.log(event.target.name);

        if(event.target.name)
        {
            $.ajax({
                url: '/UpVote/' + event.target.name,
                type: 'PUT',
                success: function(data) {
                    getComments();
                }
            });
        }

    });

    //Call to DownVote PUT API to add one when #downVote button clicked, then refresh comments
    $(document).on('click','#downVote',function(){

        console.log(event.target.name);

        if(event.target.name)
        {
            $.ajax({
                url: '/DownVote/' + event.target.name,
                type: 'PUT',
                success: function(data) {
                    getComments();
                }
            });
        }

    });


});