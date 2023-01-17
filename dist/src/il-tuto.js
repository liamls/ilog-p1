"use strict";
const hljs = require('highlight.js');
const tippy = require('tippy.js').default;
class IlTuto extends HTMLElement {
    constructor() {
        super(...arguments);
        this.regexMap = new Map([
            ['html', /<[a-z\\\/]/],
            ['css', /([a-z]{2,}\s?{|px)/],
            ['typescript', /(const|let|var|document.query)/],
            ['java', /(public|void|new|Object|if|add)/]
        ]);
    }
    connectedCallback() {
        var head = document.getElementsByTagName('head')[0];
        var styleSheet1 = document.createElement('link');
        styleSheet1.setAttribute('rel', 'stylesheet');
        styleSheet1.setAttribute('href', '/node_modules/iltuto/dist/styles/atom-one-dark.css');
        var styleSheet2 = document.createElement('link');
        styleSheet2.setAttribute('rel', 'stylesheet');
        styleSheet2.setAttribute('href', '/node_modules/iltuto/dist/styles/main.css');
        head.appendChild(styleSheet1);
        head.appendChild(styleSheet2);
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
        let code_items_total = new Array();
        var parser = new DOMParser();
        var doc = parser.parseFromString(content, 'text/html');
        const html = doc.body;
        const code_items = Array.from(html.querySelectorAll('code'));
        const pre_items = Array.from(html.querySelectorAll('pre'));
        const div_items = Array.from(html.querySelectorAll('div'));
        pre_items.forEach(pre_item => {
            const code_items_in_pre = Array.from(pre_item.querySelectorAll('code'));
            pre_item.className = "coder";
            if (code_items_in_pre.length < 1) {
                let content = pre_item.textContent;
                pre_item.textContent = '';
                var code_item = doc.createElement('code');
                code_item.textContent = content;
                pre_item.appendChild(code_item);
                code_items_total.push(code_item);
            }
            else {
                code_items_in_pre.forEach(code_item => {
                    if (code_item.textContent == "	") {
                        code_item.remove();
                    }
                    else {
                        code_items_total.push(code_item);
                    }
                });
            }
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
            let content = code_item.textContent;
            code_item.textContent = '';
            code_item.appendChild(doc.createTextNode(content));
        });
        div_items.forEach(div_item => {
            if (div_item.hasAttribute("tooltip")) {
                tippy(div_item, {
                    content: div_item.getAttribute("tooltip")
                });
            }
        });
        start.appendChild(doc.body);
        hljs.highlightAll();
    }
}
customElements.define('il-tuto', IlTuto);
//# sourceMappingURL=il-tuto.js.map