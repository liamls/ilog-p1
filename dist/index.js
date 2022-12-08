"use strict";
const inputForm = document.getElementById('inputForm');
const inputFile = document.getElementById('inputFile');
const display = document.getElementById("coder");
console.log(Date);
let final_vals;
if (inputForm) {
    final_vals = "";
    inputForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let csvReader = new FileReader();
        const input = inputFile.files[0];
        csvReader.onload = function (evt) {
            const text = evt.target.result;
            var code = document.createElement("code");
            code.setAttribute('class', 'language-java');
            code.setAttribute('id', 'tip-java');
            code.appendChild(document.createTextNode(text));
            display === null || display === void 0 ? void 0 : display.appendChild(code);
            var script1 = document.createElement('script');
            script1.setAttribute('id', 'test1');
            script1.innerText = "hljs.highlightAll();";
            var script2 = document.createElement('script');
            script1.setAttribute('id', 'test2');
            script2.innerText = "tippy('#tip-java', {content: 'This is java Code',});";
            inputForm.appendChild(script1);
            inputForm.appendChild(script2);
        };
        csvReader.readAsText(input);
    });
}
//# sourceMappingURL=index.js.map