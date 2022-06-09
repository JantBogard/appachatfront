import { Article } from './article.model';
export class LigneBonCommande {
  id!: number;
  pu!: number;
  pt!: number;
  quantite!: number;
  date!: Date;
  referencedemandeachat!: string;
  article!: Article;
}
