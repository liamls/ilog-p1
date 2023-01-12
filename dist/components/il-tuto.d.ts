declare class IlTuto extends HTMLElement {
    private regexMap;
    connectedCallback(): void;
    extractContentFromHTMLFile(filePath: string, th: any): void;
    createHljsContent(content: string): void;
}
