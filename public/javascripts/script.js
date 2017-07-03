window.onload = function() {
    var converter = new showdown.Converter();
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');

    var convertTextAreaToMarkdown = function() {
        var markdownText = pad.value;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;

        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    };

    pad.addEventListener('input', convertTextAreaToMarkdown);

    convertTextAreaToMarkdown();

    $('#toolbar button').click(function() {
        convertTextAreaToMarkdown();
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    })

    $('#toolbar select').change(function() {
        convertTextAreaToMarkdown();
    })

};


String.prototype.insertAt = function(index, string) {
    return this.substr(0, index) + string + this.substr(index);
}

function wrapIt(w) {
    pad.value = pad.value.insertAt(pad.selectionEnd, w).insertAt(pad.selectionStart, w);
}

function prefixIt(w) {
    pad.value = pad.value.insertAt(pad.selectionStart, w);
}

function wrapAround(l, r) {
    pad.value = pad.value.insertAt(pad.selectionEnd, r).insertAt(pad.selectionStart, l);
}


$('#v-bold').click(function() {
    let wrapper = "**";
    wrapIt(wrapper);
})

$('#v-italics').click(function() {
    let wrapper = "*";
    wrapIt(wrapper);
})

$('#v-strikeThrough').click(function() {
    let wrapper = "~~";
    wrapIt(wrapper);
})

$('#v-code').click(function() {
    let wrapper = "`";
    wrapIt(wrapper);
})

$('#v-image').click(function() {
    let imageUrl = prompt('Image Url');
    //![alt text](url "Logo Title Text 1")
    wrapAround(`![`, `](${imageUrl})`);
})

$('#v-link').click(function() {
    let linkUrl = prompt('Link Url');
    wrapAround(`[`, `](${linkUrl})`);
})

$('#v-coder').click(function() {
    let codeType = prompt('Code Type');
    wrapAround('```'+codeType+'\n', '\n```');
})

$('#v-unorderedList').click(function(){
        
    var q = pad.value.substr(pad.selectionStart).match(/\n/g)||[]

    var textArea = pad.value;
    var selectPart = textArea.substring(pad.selectionStart, pad.selectionEnd);

    var tempSelectPart = '- '+selectPart;
    var finalSelectPart = tempSelectPart.replace(/\n/g, '\n- ');

    pad.value = pad.value.replace(selectPart, finalSelectPart);
    

})

$('#headers').change(function() {
    console.log($(this).val());
    const headingType = $(this).val();
    let wrapper = "";
    for (var i = 0; i < headingType; i++) {
        wrapper = wrapper + "#";
    }
    prefixIt(wrapper);
})
