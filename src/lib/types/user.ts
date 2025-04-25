import { LocationMunicipality } from "./location";

export type UserProfile = {
  id: string;
  nome_completo: string;
  cpf: number;
  phone?: number;
  municipio?: LocationMunicipality;
  avatar_url?: string;
  ativo: boolean;
  entrada: Date;
  saida?: Date;
};

export type UserType = {
  id: number;
  nome: string;
};

export type UserParent = {
    id: string
    responsavel: string
    aluno: string
}