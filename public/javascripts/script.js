window.onload = function() {
    var converter = new showdown.Converter();
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');

    var convertTextAreaToMarkdown = function() {
        var markdownText = pad.value;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    };

    pad.addEventListener('input', convertTextAreaToMarkdown);

    convertTextAreaToMarkdown();

    $('#toolbar button').click(function(){
      convertTextAreaToMarkdown();  
    })    

    $('#toolbar select').change(function(){
        convertTextAreaToMarkdown();  
    })

};


String.prototype.insertAt = function(index, string) {
    return this.substr(0, index) + string + this.substr(index);
}

function wrapIt(w) {
    pad.value = pad.value.insertAt(pad.selectionEnd, w).insertAt(pad.selectionStart, w);
}


$('#bbbold').click(function() {
    var wrapper = "**";
    wrapIt(wrapper);
    //pad.value = pad.value.insertAt(pad.selectionEnd, wrapper).insertAt(pad.selectionStart, wrapper);

})

$('#headers').change(function() {
    console.log($(this).val());
    var headingType = $(this).val();
    var wrapper = "";
    for (var i = 0; i < headingType; i++) {
        wrapper = wrapper + "#";
    }
    wrapIt(wrapper);
    //pad.value = pad.value.insertAt(pad.selectionEnd, wrapper).insertAt(pad.selectionStart, wrapper);
})


