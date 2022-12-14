class IlTuto extends HTMLElement {

  connectedCallback() {
    this.innerHTML = `<p>Hello, ${this.getAttribute('name')}!</p>`;
  }
    
}

customElements.define('il-tuto', IlTuto);