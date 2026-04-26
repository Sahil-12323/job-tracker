export interface OcrProvider {
  extractTextFromImage(uri: string): Promise<string>;
}

export class StubOcrProvider implements OcrProvider {
  async extractTextFromImage(_uri: string): Promise<string> {
    return 'Thank you for applying to Google for the Software Development Engineer role.';
  }
}
