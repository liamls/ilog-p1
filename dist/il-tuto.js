"use strict";
class IlTuto extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<p>Hello, ${this.getAttribute('name')}!</p>`;
    }
}
customElements.define('il-tuto', IlTuto);
//# sourceMappingURL=il-tuto.js.map