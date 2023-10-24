export interface ITos {
  id: string;
  text_markdown: string;
  text_html: string;
  draft: boolean;
  published_date: Date | null;
  validity_start: Date;
  createdAt: Date;
};

export class Tos implements ITos {
  id: string;
  text_markdown: string;
  text_html: string;
  draft: boolean;
  published_date: Date | null;
  validity_start: Date;
  createdAt: Date;

  constructor(tosObj: ITos) {
    this.id = tosObj.id;
    this.text_markdown = tosObj.text_markdown;
    this.text_html = tosObj.text_html;
    this.draft = tosObj.draft;
    this.published_date = tosObj.published_date ? new Date(tosObj.published_date) : null;
    this.validity_start = new Date(tosObj.validity_start);
    this.createdAt = new Date(tosObj.createdAt);
  }
}
