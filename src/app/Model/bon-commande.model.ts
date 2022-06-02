export class BonCommande {
	id!: number;
	date!: Date;
	montant!: number;
	statut!: string;
	active!: boolean;
	reference!: string;
	demandeAchat!: DemandeAchat;
}
