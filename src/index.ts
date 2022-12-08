const inputForm = document.getElementById('inputForm') as HTMLFormElement;
const inputFile = document.getElementById('inputFile') as HTMLInputElement;
const display = document.getElementById("coder") as HTMLElement;
console.log(Date);
let final_vals : any;
if(inputForm){
  final_vals="";
  inputForm.addEventListener("submit", (e: Event) =>  {
    e.preventDefault();
    let csvReader = new FileReader();
    const input = inputFile.files![0];
    csvReader.onload = function(evt) {
        const text:string = evt.target!.result as string;
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
        script1.setAttribute(
          'id','test2'
        );
        script2.innerText="tippy('#tip-java', {content: 'This is java Code',});"
        inputForm.appendChild(script1);
        inputForm.appendChild(script2);
        
    }  
    
    csvReader.readAsText(input);
});
}
