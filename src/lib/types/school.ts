import { LocationMunicipality } from "./location";
import { UserProfile, UserType } from "./user";

export type School = {
  id: string;
  created_at: Date;
  ativa: boolean;
  nome: string;
  municipio: LocationMunicipality;
};

export type SchoolUser = {
  id: string;
  usuario: UserProfile;
  tipo: UserType;
  ativo: boolean;
  entrada: Date;
  saida?: Date;
};
