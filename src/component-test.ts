class MyComponent {
    private filePath: string

    constructor(filePath: string) {
        this.filePath = filePath;
    }
    
    connectedCallback() {
        console.log("on passe bien dans notre composant et le file path est "+this.filePath)
    }
      
}
export default MyComponent;