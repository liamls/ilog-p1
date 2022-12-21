class IlTuto extends HTMLElement {

  connectedCallback() {
    const inputForm = document.getElementById('start') as HTMLFormElement;
    const pre = document.createElement('pre');
    pre.className = "coder";
    inputForm.appendChild(pre);
    const items = document.getElementsByClassName('coder')
    const display = items[items.length-1]
    const input = this.getAttribute('text');
    var text = "";
    if(input) {
      text = input.toString();
    }
    var code:any=document.createElement("code");
    code.setAttribute(
      'class','language-java'
    );
    code.setAttribute(
      'id','tip-java'
    );
    code.appendChild(document.createTextNode(text));
    display?.appendChild(code);
        
    var script1 = document.createElement('script');
    script1.setAttribute(
      'id','test1'
    );
    script1.innerText="hljs.highlightAll();";
        
    var script2 =document.createElement('script');
    script2.setAttribute(
      'id','test2'
    );
    script2.innerText="tippy('#tip-java', {content: 'This is java Code',});"
    inputForm.appendChild(script1);
    inputForm.appendChild(script2);
  }  
}

customElements.define('il-tuto', IlTuto);