class IlTuto extends HTMLElement {

  connectedCallback() {
    const start = document.getElementById('start') as HTMLFormElement;
    const pre = document.createElement('pre');
    pre.className = "coder";
    start.appendChild(pre);
    const items = document.getElementsByClassName('coder')
    const inputCode = this.getAttribute('code');
    var codeToDisplay = "";
    if(inputCode) {
      codeToDisplay = inputCode.toString();
    }
    const inputLanguage = this.getAttribute('language');
    var languageToColor = "";
    if(inputLanguage) {
      languageToColor = inputLanguage.toString();
    }
    var code:any=document.createElement("code");
    code.setAttribute(
      'class','language-'+languageToColor
    );
    code.setAttribute(
      'id','tip-'+languageToColor
    );
    code.appendChild(document.createTextNode(codeToDisplay));
    pre.appendChild(code);
        
    var script2 =document.createElement('script');
    script2.setAttribute(
      'id','test2'
    );
    var language = languageToColor;
    script2.innerText="tippy('#tip-"+languageToColor+"', {content: 'This is "+language+" Code' });"
    pre.appendChild(script2);
  }  
}

customElements.define('il-tuto', IlTuto);