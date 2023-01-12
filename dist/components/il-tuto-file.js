class IlTutoFile extends HTMLElement {
    connectedCallback() {
        const inputFilePath = this.getAttribute('filePath');
        var pathFileToDisplay = "";
        if (inputFilePath) {
            pathFileToDisplay = inputFilePath.toString();
        }
        var languageToColor = "";
        const inputLanguage = this.getAttribute('language');
        if (inputLanguage) {
            languageToColor = inputLanguage.toString();
        }
        this.extractContentFromHTMLFile(pathFileToDisplay, languageToColor, this);
    }
    extractContentFromHTMLFile(filePath, languageToColor, th) {
        let fileContents;
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            fileContents = xhr.responseText.toString();
            th.createHljsContent(fileContents, languageToColor);
        };
        xhr.open('GET', filePath);
        xhr.send();
    }
    createHljsContent(content, languageToColor) {
        const start = document.getElementById('start');
        const pre = document.createElement('pre');
        pre.className = "coder";
        start.appendChild(pre);
        var code = document.createElement("code");
        code.setAttribute('class', 'language-' + languageToColor);
        code.setAttribute('id', 'tip-' + languageToColor);
        code.appendChild(document.createTextNode(content));
        pre.appendChild(code);
        var script1 = document.createElement('script');
        script1.setAttribute('id', 'test1');
        script1.innerText = "hljs.highlightAll();";
        var script2 = document.createElement('script');
        script2.setAttribute('id', 'test2');
        script2.innerText = "tippy('#tip-" + languageToColor + "', {content: 'This is " + languageToColor + " Code' });";
        pre.appendChild(script1);
        pre.appendChild(script2);
    }
}
customElements.define('il-tuto-file', IlTutoFile);
