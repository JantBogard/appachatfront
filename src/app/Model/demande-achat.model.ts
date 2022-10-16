import {LigneDemandeAchat} from './ligne-demande-achat.model';
import {DevisFournisseur} from './devis-fournisseur.model';
import {Utilisateur} from './Utilisateur';

export class DemandeAchat {
  id!: number;
  numeroda!: string;
  referencesessionbudgetaire!: string;
  date!: Date;
  prixestimatif!: number;
  statut!: string;
  commentaire!: string;
  active!: boolean;
  reference!: string;
  lignedemandeachats!: LigneDemandeAchat[];
  acheteurMetier!: Utilisateur;
  matriculeAcheteurmetier!: string;
  directeurDachat!: Utilisateur;
  matriculeDirecteurAchat!: string;
  deviFournisseur!: DevisFournisseur;
}
