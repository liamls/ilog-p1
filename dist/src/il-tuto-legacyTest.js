"use strict";
const hljs2 = require('highlight.js');
class IlTutoLegacyTest extends HTMLElement {
    connectedCallback() {
        const start = document.getElementById('start');
        const pre = document.createElement('pre');
        var code = document.createElement("code");
        code.setAttribute('class', 'language-ts');
        code.appendChild(document.createTextNode('console.log(this.applyStyle(this.alala))'));
        pre.appendChild(code);
        start.appendChild(pre);
        hljs2.highlightAll();
    }
}
customElements.define('il-tuto-legacy-test', IlTutoLegacyTest);
//# sourceMappingURL=il-tuto-legacyTest.js.map