import { DemandeAchat } from './demande-achat.model';
import { LigneBonCommande } from './ligne-bon-commande.model';
export class BonCommande {
  id!: number;
  date!: Date;
  montant!: number;
  statut!: string;
  active!: boolean;
  reference!: string;
  demandeachat!: DemandeAchat;
}
