const hljs2 = require('highlight.js');

class IlTutoLegacyTest extends HTMLElement {

  connectedCallback() {
    const start = document.getElementById('start') as HTMLFormElement;
    const pre = document.createElement('pre');
    var code:any=document.createElement("code");
    code.setAttribute(
      'class','language-ts'
    );
    code.appendChild(document.createTextNode('console.log(this.applyStyle(this.alala))'));
    pre.appendChild(code);
    start.appendChild(pre);
    hljs2.highlightAll();
  }  
}

customElements.define('il-tuto-legacy-test', IlTutoLegacyTest);