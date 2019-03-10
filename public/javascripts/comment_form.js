//CT870 Internet Programming Assignment 2: JavaScript Comments

var totalLikes = 0;//'auto-global' variable to store 'like' clicks

function processForm() {

    //Getting values from the forms by ID:
    var name = document.getElementById("name-input").value;
    var comment = document.getElementById("comment-input").value;
    
    //Concatenating values with the current Date():
    var stringOutput =  "\n" + "Handler: " + name +
                        "\n" + "Comment: " + comment +
                        "\n" + Date() + "\n";//i use css 'white-space: pre-wrap;' to ensures '\n' renders

    //1) Create paragraph node:
    var para = document.createElement("p");//create a <p> element
    var t = document.createTextNode(stringOutput);//create a text node with string variable
    para.appendChild(t);//append the text to the <p> element

    //2) Create button node:
    button = document.createElement("button");//create a <button> element
    var tag = document.createTextNode("Like");//create a text node
    button.appendChild(tag);//append the text to the <button> element

    //Using our generated button to carry out function that alerts and adds one to global likes count
    button.onclick = function () {
        totalLikes++;
        alert("The total number of likes is: "+totalLikes);
    }

    //*** Appending the paragraph node and button node to element with ID ***:
    document.getElementById("output-client-side").appendChild(para).appendChild(button);

    //Clearing the input values:
    document.getElementById("name-input").value ="";
    document.getElementById("comment-input").value ="";

}//end function




