import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./client.types";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON = process.env.EXPO_PUBLIC_SUPABASE_ANONYMOUS_KEY;

/**
 * O client para conectar ao Supabase e habilitar métodos
 * para comunicação.
 */
export const client = createClient<Database>(SUPABASE_URL!, SUPABASE_ANON!, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export enum UserTypes {
  Admin = 1,
  Gerenciador,
  Professor,
  Aluno,
  Responsavel,
}
