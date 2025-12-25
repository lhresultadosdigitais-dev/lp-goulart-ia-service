-- ================================
-- SCRIPT SQL PARA CONFIGURAR SUPABASE
-- ================================

-- 1. CRIAR TABELA DE CONTATOS
CREATE TABLE IF NOT EXISTS public.contacts (
    id BIGSERIAL PRIMARY KEY,
    message TEXT,
    audio_url TEXT,
    has_audio BOOLEAN DEFAULT FALSE,
    audio_size INTEGER,
    user_agent TEXT,
    ip_address INET,
    whatsapp_detected BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. HABILITAR ROW LEVEL SECURITY (RLS)
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- 3. CRIAR POLÍTICAS DE SEGURANÇA

-- Permitir inserção de novos contatos (público)
CREATE POLICY "Permitir inserção de contatos" ON public.contacts
    FOR INSERT WITH CHECK (true);

-- Permitir leitura apenas para usuários autenticados (opcional)
-- Descomente se quiser restringir a leitura
-- CREATE POLICY "Permitir leitura de contatos" ON public.contacts
--     FOR SELECT USING (auth.role() = 'authenticated');

-- Permitir leitura pública (use apenas em desenvolvimento)
CREATE POLICY "Permitir leitura pública de contatos" ON public.contacts
    FOR SELECT USING (true);

-- 4. CRIAR BUCKET DE STORAGE PARA ÁUDIOS
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'contact-audios',
    'contact-audios',
    true,
    5242880, -- 5MB limit
    ARRAY['audio/webm', 'audio/mp4', 'audio/wav', 'audio/mpeg']
) ON CONFLICT (id) DO NOTHING;

-- 5. POLÍTICAS PARA STORAGE

-- Permitir upload de áudios
CREATE POLICY "Permitir upload de áudios" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'contact-audios');

-- Permitir leitura de áudios (público)
CREATE POLICY "Permitir leitura pública de áudios" ON storage.objects
    FOR SELECT USING (bucket_id = 'contact-audios');

-- 6. CRIAR FUNÇÃO PARA CAPTURAR IP (OPCIONAL)
CREATE OR REPLACE FUNCTION public.get_client_ip()
RETURNS INET
LANGUAGE SQL
SECURITY DEFINER
AS $$
    SELECT COALESCE(
        current_setting('request.headers')::json->>'x-forwarded-for',
        current_setting('request.headers')::json->>'x-real-ip',
        inet_client_addr()
    )::inet;
$$;

-- 7. CRIAR TRIGGER PARA CAPTURAR IP AUTOMATICAMENTE (OPCIONAL)
CREATE OR REPLACE FUNCTION public.set_client_ip()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    NEW.ip_address = public.get_client_ip();
    RETURN NEW;
END;
$$;

-- Aplicar trigger na tabela de contatos
CREATE TRIGGER set_client_ip_trigger
    BEFORE INSERT ON public.contacts
    FOR EACH ROW
    EXECUTE FUNCTION public.set_client_ip();

-- ================================
-- QUERIES ÚTEIS PARA ADMINISTRAÇÃO
-- ================================

-- Visualizar todos os contatos
-- SELECT * FROM public.contacts ORDER BY created_at DESC;

-- Contar contatos por dia
-- SELECT 
--     DATE(created_at) as data,
--     COUNT(*) as total_contatos,
--     COUNT(*) FILTER (WHERE has_audio = true) as com_audio,
--     COUNT(*) FILTER (WHERE whatsapp_detected = true) as com_whatsapp
-- FROM public.contacts 
-- GROUP BY DATE(created_at) 
-- ORDER BY data DESC;

-- Verificar tamanho dos áudios
-- SELECT 
--     audio_size,
--     COUNT(*) as quantidade,
--     AVG(audio_size) as tamanho_medio
-- FROM public.contacts 
-- WHERE has_audio = true 
-- GROUP BY audio_size;

-- ================================
-- LIMPEZA (USE COM CUIDADO!)
-- ================================

-- Remover todos os contatos (CUIDADO!)
-- DELETE FROM public.contacts;

-- Remover todos os áudios do storage (CUIDADO!)
-- DELETE FROM storage.objects WHERE bucket_id = 'contact-audios';