import { Utilisateur } from './Utilisateur';
export class PeriodeBudgetaire {
  id!: number;
  date!: Date;
  anneebugetaire!: string;
  statut!: string;
  commentaire!: string;
  reference!: string;
  active!: boolean;
  montant!: number;
  directeurAchat!: Utilisateur;
}
