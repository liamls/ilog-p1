declare class IlTutoFile extends HTMLElement {
    connectedCallback(): void;
    extractContentFromHTMLFile(filePath: string, languageToColor: string, th: any): void;
    createHljsContent(content: string, languageToColor: string): void;
}
