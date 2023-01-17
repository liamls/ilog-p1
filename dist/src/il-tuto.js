"use strict";
const hljs = require('highlight.js');
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
        var head = document.getElementsByTagName('head')[0];
        var styleSheet1 = document.createElement('link');
        styleSheet1.setAttribute('rel', 'stylesheet');
        styleSheet1.setAttribute('href', './styles/atom-one-dark.css');
        var styleSheet2 = document.createElement('link');
        styleSheet2.setAttribute('rel', 'stylesheet');
        styleSheet2.setAttribute('href', './styles/main.css');
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
        var scriptTippy = document.createElement('script');
        scriptTippy.innerText = "tippy('#tip-ts', {content: 'This is HTML Code' });";
        let code_items_total = new Array();
        var parser = new DOMParser();
        var doc = parser.parseFromString(content, 'text/html');
        const html = doc.body;
        const code_items = Array.from(html.querySelectorAll('code'));
        code_items.forEach(code_item => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10;
            if (((_a = code_item.parentNode) === null || _a === void 0 ? void 0 : _a.nodeName) != "CODE" && ((_b = code_item.parentNode) === null || _b === void 0 ? void 0 : _b.nodeName) != "PRE") {
                const pre = doc.createElement("pre");
                code_item.insertAdjacentElement('beforebegin', pre);
                pre.appendChild(code_item);
            }
            else if (((_c = code_item.parentNode) === null || _c === void 0 ? void 0 : _c.nodeName) == "CODE") {
                if (((_e = (_d = code_item.parentNode) === null || _d === void 0 ? void 0 : _d.parentNode) === null || _e === void 0 ? void 0 : _e.nodeName) != "CODE" && ((_g = (_f = code_item.parentNode) === null || _f === void 0 ? void 0 : _f.parentNode) === null || _g === void 0 ? void 0 : _g.nodeName) != "PRE") {
                    const pre = doc.createElement("pre");
                    (_h = code_item.parentElement) === null || _h === void 0 ? void 0 : _h.insertAdjacentElement('beforebegin', pre);
                    pre.appendChild(code_item.parentElement);
                }
                else if (((_k = (_j = code_item.parentNode) === null || _j === void 0 ? void 0 : _j.parentNode) === null || _k === void 0 ? void 0 : _k.nodeName) == "CODE") {
                    if (((_o = (_m = (_l = code_item.parentNode) === null || _l === void 0 ? void 0 : _l.parentNode) === null || _m === void 0 ? void 0 : _m.parentNode) === null || _o === void 0 ? void 0 : _o.nodeName) != "CODE" && ((_r = (_q = (_p = code_item.parentNode) === null || _p === void 0 ? void 0 : _p.parentNode) === null || _q === void 0 ? void 0 : _q.parentNode) === null || _r === void 0 ? void 0 : _r.nodeName) != "PRE") {
                        const pre = doc.createElement("pre");
                        (_t = (_s = code_item.parentElement) === null || _s === void 0 ? void 0 : _s.parentElement) === null || _t === void 0 ? void 0 : _t.insertAdjacentElement('beforebegin', pre);
                        pre.appendChild((_u = code_item.parentElement) === null || _u === void 0 ? void 0 : _u.parentElement);
                    }
                    else if (((_x = (_w = (_v = code_item.parentNode) === null || _v === void 0 ? void 0 : _v.parentNode) === null || _w === void 0 ? void 0 : _w.parentNode) === null || _x === void 0 ? void 0 : _x.nodeName) == "CODE") {
                        if (((_1 = (_0 = (_z = (_y = code_item.parentNode) === null || _y === void 0 ? void 0 : _y.parentNode) === null || _z === void 0 ? void 0 : _z.parentNode) === null || _0 === void 0 ? void 0 : _0.parentNode) === null || _1 === void 0 ? void 0 : _1.nodeName) != "CODE" && ((_5 = (_4 = (_3 = (_2 = code_item.parentNode) === null || _2 === void 0 ? void 0 : _2.parentNode) === null || _3 === void 0 ? void 0 : _3.parentNode) === null || _4 === void 0 ? void 0 : _4.parentNode) === null || _5 === void 0 ? void 0 : _5.nodeName) != "PRE") {
                            const pre = doc.createElement("pre");
                            (_8 = (_7 = (_6 = code_item.parentElement) === null || _6 === void 0 ? void 0 : _6.parentElement) === null || _7 === void 0 ? void 0 : _7.parentElement) === null || _8 === void 0 ? void 0 : _8.insertAdjacentElement('beforebegin', pre);
                            pre.appendChild((_10 = (_9 = code_item.parentElement) === null || _9 === void 0 ? void 0 : _9.parentElement) === null || _10 === void 0 ? void 0 : _10.parentElement);
                        }
                    }
                }
            }
        });
        const pre_items = Array.from(html.querySelectorAll('pre'));
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
        hljs.highlightAll();
    }
}
customElements.define('il-tuto', IlTuto);
//# sourceMappingURL=il-tuto.js.map