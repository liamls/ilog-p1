const hljs = require('highlight.js');

class IlTuto extends HTMLElement {
  
  private regexMap = new Map<string, RegExp>([
    ['html', /<[a-z\\\/]/],
    ['css', /([a-z]{2,}\s?{|px)/],
    ['typescript', /(const|let|var|document.query)/]
  ]);

  connectedCallback() {
    var head = document.getElementsByTagName('head')[0];
    var styleSheet1 = document.createElement('link');
    styleSheet1.setAttribute(
      'rel','stylesheet'
    );
    styleSheet1.setAttribute(
      'href','./styles/atom-one-dark.css'
    );
    var styleSheet2 = document.createElement('link');
    styleSheet2.setAttribute(
      'rel','stylesheet'
    );
    styleSheet2.setAttribute(
      'href','./styles/main.css'
    );
    head.appendChild(styleSheet1);
    head.appendChild(styleSheet2);
    const inputFilePath = this.getAttribute('filePath');
    var pathFileToDisplay = "";
    if(inputFilePath) {
      pathFileToDisplay = inputFilePath.toString();
    }
    this.extractContentFromHTMLFile(pathFileToDisplay, this);
  }
  
  extractContentFromHTMLFile(filePath: string, th: any) {
    let fileContents;
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      fileContents = xhr.responseText.toString();
      th.createHljsContent(fileContents);
      };
    xhr.open('GET', filePath);
    xhr.send();
  }

  createHljsContent(content: string): void {
    var start = document.getElementById('start') as HTMLElement;
    var scriptTippy =document.createElement('script');
    scriptTippy.innerText="tippy('#tip-ts', {content: 'This is HTML Code' });"
    let code_items_total: HTMLElement[] = new Array();
    var parser = new DOMParser();
	  var doc = parser.parseFromString(content, 'text/html');
	  const html = doc.body;
    const code_items = Array.from(html.querySelectorAll('code'));
    code_items.forEach(code_item => {
      if(code_item.parentNode?.nodeName != "CODE" && code_item.parentNode?.nodeName != "PRE"){
        const pre = doc.createElement("pre");
        code_item.insertAdjacentElement('beforebegin', pre);
        pre.appendChild(code_item);
      } else if(code_item.parentNode?.nodeName == "CODE") {
        if(code_item.parentNode?.parentNode?.nodeName != "CODE" && code_item.parentNode?.parentNode?.nodeName != "PRE"){
          const pre = doc.createElement("pre");
          code_item.parentElement?.insertAdjacentElement('beforebegin', pre);
          pre.appendChild(code_item.parentElement as HTMLElement);
        } else if (code_item.parentNode?.parentNode?.nodeName == "CODE") {
          if(code_item.parentNode?.parentNode?.parentNode?.nodeName != "CODE" && code_item.parentNode?.parentNode?.parentNode?.nodeName != "PRE"){
            const pre = doc.createElement("pre");
            code_item.parentElement?.parentElement?.insertAdjacentElement('beforebegin', pre);
            pre.appendChild(code_item.parentElement?.parentElement as HTMLElement);
          } else if(code_item.parentNode?.parentNode?.parentNode?.nodeName == "CODE") {
            if(code_item.parentNode?.parentNode?.parentNode?.parentNode?.nodeName != "CODE" && code_item.parentNode?.parentNode?.parentNode?.parentNode?.nodeName != "PRE"){
              const pre = doc.createElement("pre");
              code_item.parentElement?.parentElement?.parentElement?.insertAdjacentElement('beforebegin', pre);
              pre.appendChild(code_item.parentElement?.parentElement?.parentElement as HTMLElement);
            }
          }
        }
      }
    });
    const pre_items = Array.from(html.querySelectorAll('pre'));
    pre_items.forEach(pre_item => {
      const code_items_in_pre = Array.from(pre_item.querySelectorAll('code'));
      pre_item.className = "coder";
      if(code_items_in_pre.length < 1) {
        let content = pre_item.textContent as string;
        pre_item.textContent = '';
        var code_item = doc.createElement('code');
        code_item.textContent = content;
        pre_item.appendChild(code_item);
        code_items_total.push(code_item);
      } else {
        code_items_in_pre.forEach(code_item => {
          if(code_item.textContent == "	") {
            code_item.remove();
          } else {
            code_items_total.push(code_item);
          }
        });
      }
      pre_item.appendChild(scriptTippy);
    });
    code_items_total.forEach(code_item => {
      let language = code_item.parentNode?.parentNode?.parentNode?.querySelector('header')?.textContent?.split('.')[1];
      if(!language) {
        language = 'plaintext';
        for(let entry of this.regexMap.entries()) {
          if(entry[1].test(code_item.textContent as string)) {
            language = entry[0];
          }
        }
      }
      code_item.setAttribute(
        'class','language-'+language
      );
      code_item.setAttribute(
        'id','tip-'+language
      );
      let content = code_item.textContent as string;
      code_item.textContent = '';
      code_item.appendChild(doc.createTextNode(content));
    });
    start.appendChild(doc.body);
    hljs.highlightAll();
  }
}

customElements.define('il-tuto', IlTuto);