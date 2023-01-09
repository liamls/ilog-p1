class IlTuto extends HTMLElement {
  
  private regexMap = new Map<string, RegExp>([
    ['html', /<[a-z\\\/]/],
    ['css', /([a-z]{2,}\s?{|px)/],
    ['typescript', /(const|let|var|document.query)/]
  ]);

  connectedCallback() {
    const inputFilePath = this.getAttribute('filePath');
    var pathFileToDisplay = "";
    if(inputFilePath) {
      pathFileToDisplay = inputFilePath.toString();
    }
    this.extractContentFromHTMLFile(pathFileToDisplay, this)
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
    var script1 = document.createElement('script');
    var script2 =document.createElement('script');
    script2.setAttribute(
      'id','test2'
    );
    script2.innerText="tippy('#tip-html', {content: 'This is HTML Code' });"
    let code_items_total: HTMLElement[] = new Array();
    var parser = new DOMParser();
	  var doc = parser.parseFromString(content, 'text/html');
	  const html = doc.body;
    const pre_items = Array.from(html.querySelectorAll('pre'));
    pre_items.forEach(pre_item => {
      const code_items = Array.from(pre_item.querySelectorAll('code'));
      pre_item.className = "coder";
      if(code_items.length < 1) {
        let content = pre_item.textContent as string;
        pre_item.textContent = '';
        var code_item = doc.createElement('code');
        code_item.textContent = content;
        pre_item.appendChild(code_item);
        code_items_total.push(code_item);
      } else {
        code_items.forEach(code_item => {
          console.log(code_item.textContent);
          if(code_item.textContent == "	") {
            code_item.remove();
          } else {
            code_items_total.push(code_item);
          }
        });
      }
      pre_item.appendChild(script2);
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
    script1.setAttribute(
      'id','test1'
    );
    script1.innerText="hljs.highlightAll();";
    start.appendChild(script1);
  }
}

customElements.define('il-tuto', IlTuto);