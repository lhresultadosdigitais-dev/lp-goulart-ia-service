// ================================
// CONFIGURAÇÃO DO SUPABASE
// ================================

// 1. SUBSTITUA ESTAS LINHAS NO index.html (linha ~790):

const SUPABASE_URL = 'https://seuprojetoid.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNldXByb2pldG9pZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjk5OTk5OTk5LCJleHAiOjIwMTU1NzU5OTl9.exemplo_da_sua_chave_aqui';

// ================================
// ONDE ENCONTRAR AS CREDENCIAIS:
// ================================

// 1. Acesse seu projeto no Supabase
// 2. Vá em Settings > API
// 3. Copie:
//    - Project URL (cole em url)
//    - anon/public key (cole em anonKey)
//    - service_role key (cole em serviceRoleKey) ⚠️ MUITO SENSÍVEL!

// ================================
// EXEMPLO DE CONFIGURAÇÃO COMPLETA:
// ================================

/*
const SUPABASE_URL = 'https://abcdefghijklmnop.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY5OTk5OTk5OSwiZXhwIjoyMDE1NTc1OTk5fQ.exemplo_completo_da_chave_jwt_token_aqui';
*/

// ================================
// VERIFICAÇÃO:
// ================================

// Depois de configurar, recarregue a página
// O status no rodapé deve mostrar: "Database: Pronto" (verde)
// Se mostrar erro, verifique:
// - URLs corretas
// - Tabelas criadas (execute supabase-setup.sql)
// - Políticas RLS configuradas