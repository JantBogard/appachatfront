import { LigneBonCommande } from './ligne-bon-commande.model';
export class BonCommande {
	id!: number;
	date!: Date;
	montant!: number;
	statut!: string;
	active!: boolean;
	reference!: string;
  lignebc!: LigneBonCommande[];
}
