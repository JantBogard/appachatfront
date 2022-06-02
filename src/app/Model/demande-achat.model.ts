import { LigneDemandeAchat } from './ligne-demande-achat.model';
import { DevisFournisseur } from './devis-fournisseur.model';
import { Utilisateur } from './Utilisateur';
export class DemandeAchat {
    id!: number;
    date!: Date;
    prixestimatif!: number;
    statut!: string;
    active!: boolean;
    reference!: string;
    lignedemandeachats!: LigneDemandeAchat[];
    acheteurMetier!: Utilisateur;
    directeurDachat!: Utilisateur;
    deviFournisseur!: DevisFournisseur;
}
