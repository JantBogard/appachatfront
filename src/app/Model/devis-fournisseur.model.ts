import { DemandeAchat } from './demande-achat.model';
export class DevisFournisseur {
  id!: number;
  date!: Date;
  statut!: string;
  active!: boolean;
  imagedevis!: string;
  reference!: string;
  referencedoc!: string;
  demandeachat!: DemandeAchat;
}
