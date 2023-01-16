import '../scripts/highlight.min.js';
import 'https://unpkg.com/tippy.js@6';
class IlTuto extends HTMLElement {
    constructor() {
        super(...arguments);
        this.regexMap = new Map([
            ['html', /<[a-z\\\/]/],
            ['css', /([a-z]{2,}\s?{|px)/],
            ['typescript', /(const|let|var|document.query)/]
        ]);
    }
    connectedCallback() {
        const inputFilePath = this.getAttribute('filePath');
        var pathFileToDisplay = "";
        if (inputFilePath) {
            pathFileToDisplay = inputFilePath.toString();
        }
        this.extractContentFromHTMLFile(pathFileToDisplay, this);
    }
    extractContentFromHTMLFile(filePath, th) {
        let fileContents;
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            fileContents = xhr.responseText.toString();
            th.createHljsContent(fileContents);
        };
        xhr.open('GET', filePath);
        xhr.send();
    }
    createHljsContent(content) {
        var start = document.getElementById('start');
        var scriptTippy = document.createElement('script');
        scriptTippy.innerText = "tippy('#tip-html', {content: 'This is HTML Code' });";
        let code_items_total = new Array();
        var parser = new DOMParser();
        var doc = parser.parseFromString(content, 'text/html');
        const html = doc.body;
        const pre_items = Array.from(html.querySelectorAll('pre'));
        pre_items.forEach(pre_item => {
            const code_items = Array.from(pre_item.querySelectorAll('code'));
            pre_item.className = "coder";
            if (code_items.length < 1) {
                let content = pre_item.textContent;
                pre_item.textContent = '';
                var code_item = doc.createElement('code');
                code_item.textContent = content;
                pre_item.appendChild(code_item);
                code_items_total.push(code_item);
            }
            else {
                code_items.forEach(code_item => {
                    console.log(code_item.textContent);
                    if (code_item.textContent == "	") {
                        code_item.remove();
                    }
                    else {
                        code_items_total.push(code_item);
                    }
                });
            }
            pre_item.appendChild(scriptTippy);
        });
        code_items_total.forEach(code_item => {
            var _a, _b, _c, _d, _e;
            let language = (_e = (_d = (_c = (_b = (_a = code_item.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.parentNode) === null || _c === void 0 ? void 0 : _c.querySelector('header')) === null || _d === void 0 ? void 0 : _d.textContent) === null || _e === void 0 ? void 0 : _e.split('.')[1];
            if (!language) {
                language = 'plaintext';
                for (let entry of this.regexMap.entries()) {
                    if (entry[1].test(code_item.textContent)) {
                        language = entry[0];
                    }
                }
            }
            code_item.setAttribute('class', 'language-' + language);
            code_item.setAttribute('id', 'tip-' + language);
            let content = code_item.textContent;
            code_item.textContent = '';
            code_item.appendChild(doc.createTextNode(content));
        });
        start.appendChild(doc.body);
        var scriptHljs = document.createElement('script');
        scriptHljs.innerText = "hljs.highlightAll();";
        start.appendChild(scriptHljs);
    }
}
customElements.define('il-tuto', IlTuto);
//# sourceMappingURL=il-tuto.js.map