// table: `localizacao_estado`
export type LocationState = {
  id: number;
  sigla: string;
  nome: string;
};

// table: `localizacao_municipio`
export type LocationMunicipality = {
  id: string;
  estado: LocationState;
  slug: string;
  nome: string;
};
