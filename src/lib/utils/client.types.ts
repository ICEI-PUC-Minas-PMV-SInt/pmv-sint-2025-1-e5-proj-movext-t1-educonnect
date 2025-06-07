export type Database = {
  public: {
    Tables: {
      calendario: {
        Row: {
          categoria: string;
          data: string;
          horario_ate: string | null;
          horario_de: string | null;
          id: string;
          lido: boolean;
          nome: string;
          usuario: string;
        };
        Insert: {
          categoria: string;
          data: string;
          horario_ate?: string | null;
          horario_de?: string | null;
          id?: string;
          lido?: boolean;
          nome: string;
          usuario: string;
        };
        Update: {
          categoria?: string;
          data?: string;
          horario_ate?: string | null;
          horario_de?: string | null;
          id?: string;
          lido?: boolean;
          nome?: string;
          usuario?: string;
        };
        Relationships: [
          {
            foreignKeyName: "calendario_usuario_fkey";
            columns: ["usuario"];
            isOneToOne: false;
            referencedRelation: "escola_usuarios";
            referencedColumns: ["id"];
          }
        ];
      };
      escola: {
        Row: {
          ativa: boolean;
          created_at: string;
          id: string;
          municipio: string;
          nome: string;
        };
        Insert: {
          ativa: boolean;
          created_at?: string;
          id?: string;
          municipio: string;
          nome: string;
        };
        Update: {
          ativa?: boolean;
          created_at?: string;
          id?: string;
          municipio?: string;
          nome?: string;
        };
        Relationships: [
          {
            foreignKeyName: "escola_municipio_fkey";
            columns: ["municipio"];
            isOneToOne: false;
            referencedRelation: "localizacao_municipio";
            referencedColumns: ["id"];
          }
        ];
      };
      escola_usuarios: {
        Row: {
          ativo: boolean;
          entrada: string;
          escola: string | null;
          id: string;
          saida: string | null;
          tipo: number;
          usuario: string;
        };
        Insert: {
          ativo?: boolean;
          entrada?: string;
          escola?: string | null;
          id?: string;
          saida?: string | null;
          tipo: number;
          usuario: string;
        };
        Update: {
          ativo?: boolean;
          entrada?: string;
          escola?: string | null;
          id?: string;
          saida?: string | null;
          tipo?: number;
          usuario?: string;
        };
        Relationships: [
          {
            foreignKeyName: "escola_usuarios_escola_fkey";
            columns: ["escola"];
            isOneToOne: false;
            referencedRelation: "escola";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "escola_usuarios_tipo_fkey";
            columns: ["tipo"];
            isOneToOne: false;
            referencedRelation: "usuario_tipo";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "escola_usuarios_usuario_fkey";
            columns: ["usuario"];
            isOneToOne: false;
            referencedRelation: "usuario_perfil";
            referencedColumns: ["id"];
          }
        ];
      };
      localizacao_estado: {
        Row: {
          id: number;
          nome: string;
          sigla: string;
        };
        Insert: {
          id?: number;
          nome: string;
          sigla: string;
        };
        Update: {
          id?: number;
          nome?: string;
          sigla?: string;
        };
        Relationships: [];
      };
      localizacao_municipio: {
        Row: {
          estado: number;
          id: string;
          nome: string;
          slug: string;
        };
        Insert: {
          estado: number;
          id?: string;
          nome: string;
          slug: string;
        };
        Update: {
          estado?: number;
          id?: string;
          nome?: string;
          slug?: string;
        };
        Relationships: [
          {
            foreignKeyName: "localizacao_municipio_estado_fkey";
            columns: ["estado"];
            isOneToOne: false;
            referencedRelation: "localizacao_estado";
            referencedColumns: ["id"];
          }
        ];
      };
      materia: {
        Row: {
          escola: string;
          id: string;
          nome: string;
          professor: string | null;
        };
        Insert: {
          escola: string;
          id?: string;
          nome: string;
          professor?: string | null;
        };
        Update: {
          escola?: string;
          id?: string;
          nome?: string;
          professor?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "materia_escola_fkey";
            columns: ["escola"];
            isOneToOne: false;
            referencedRelation: "escola";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "materia_professor_fkey";
            columns: ["professor"];
            isOneToOne: false;
            referencedRelation: "escola_usuarios";
            referencedColumns: ["id"];
          }
        ];
      };
      materia_alunos: {
        Row: {
          aluno: string;
          id: number;
          materia: string;
        };
        Insert: {
          aluno: string;
          id?: number;
          materia: string;
        };
        Update: {
          aluno?: string;
          id?: number;
          materia?: string;
        };
        Relationships: [
          {
            foreignKeyName: "materia_alunos_aluno_fkey";
            columns: ["aluno"];
            isOneToOne: false;
            referencedRelation: "usuario_perfil";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "materia_alunos_materia_fkey";
            columns: ["materia"];
            isOneToOne: false;
            referencedRelation: "materia";
            referencedColumns: ["id"];
          }
        ];
      };
      materia_conteudo: {
        Row: {
          data: string;
          id: string;
          json: JSON | null;
          markdown: string | null;
          materia: string;
        };
        Insert: {
          data?: string;
          id?: string;
          json?: JSON | null;
          markdown?: string | null;
          materia: string;
        };
        Update: {
          data?: string;
          id?: string;
          json?: JSON | null;
          markdown?: string | null;
          materia?: string;
        };
        Relationships: [
          {
            foreignKeyName: "materia_conteudo_materia_fkey";
            columns: ["materia"];
            isOneToOne: false;
            referencedRelation: "materia";
            referencedColumns: ["id"];
          }
        ];
      };
      usuario_perfil: {
        Row: {
          ativo: boolean;
          avatar_url: string | null;
          cpf: string;
          entrada: string;
          id: string;
          municipio: string | null;
          primeiro_nome: string;
          saida: string | null;
          sobrenome: string;
          telefone: string | null;
        };
        Insert: {
          ativo?: boolean;
          avatar_url?: string | null;
          cpf: string;
          entrada?: string;
          id?: string;
          municipio?: string | null;
          primeiro_nome: string;
          saida?: string | null;
          sobrenome: string;
          telefone?: string | null;
        };
        Update: {
          ativo?: boolean;
          avatar_url?: string | null;
          cpf?: string;
          entrada?: string;
          id?: string;
          municipio?: string | null;
          primeiro_nome?: string;
          saida?: string | null;
          sobrenome?: string;
          telefone?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "usuario_perfil_municipio_fkey";
            columns: ["municipio"];
            isOneToOne: false;
            referencedRelation: "localizacao_municipio";
            referencedColumns: ["id"];
          }
        ];
      };
      usuario_responsavel: {
        Row: {
          aluno: string;
          id: string;
          responsavel: string;
        };
        Insert: {
          aluno: string;
          id?: string;
          responsavel: string;
        };
        Update: {
          aluno?: string;
          id?: string;
          responsavel?: string;
        };
        Relationships: [
          {
            foreignKeyName: "usuario_responsavel_alunos_fkey";
            columns: ["aluno"];
            isOneToOne: false;
            referencedRelation: "usuario_perfil";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "usuario_responsavel_responsavel_fkey";
            columns: ["responsavel"];
            isOneToOne: false;
            referencedRelation: "usuario_perfil";
            referencedColumns: ["id"];
          }
        ];
      };
      usuario_tipo: {
        Row: {
          id: number;
          nome: string;
        };
        Insert: {
          id?: number;
          nome: string;
        };
        Update: {
          id?: number;
          nome?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
