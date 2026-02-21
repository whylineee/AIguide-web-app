-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: agents
CREATE TABLE public.agents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('llm', 'telegram', 'automation')),
    model TEXT,
    temperature NUMERIC DEFAULT 0.7,
    system_prompt TEXT,
    config JSONB DEFAULT '{}'::JSONB,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL
);

-- Table: workflows
CREATE TABLE public.workflows (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    definition JSONB NOT NULL DEFAULT '{}'::JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL
);

-- Table: executions
CREATE TABLE public.executions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    workflow_id UUID REFERENCES public.workflows(id) ON DELETE CASCADE,
    agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('pending', 'running', 'success', 'failed')),
    logs JSONB DEFAULT '[]'::JSONB,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()),
    finished_at TIMESTAMP WITH TIME ZONE
);

-- Table: telegram_bots
CREATE TABLE public.telegram_bots (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    bot_token TEXT NOT NULL,
    agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL
);

-- Row Level Security
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telegram_bots ENABLE ROW LEVEL SECURITY;

-- Policies for agents
CREATE POLICY "Users can view own agents" ON public.agents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own agents" ON public.agents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own agents" ON public.agents FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own agents" ON public.agents FOR DELETE USING (auth.uid() = user_id);

-- Policies for workflows
CREATE POLICY "Users can view own workflows" ON public.workflows FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own workflows" ON public.workflows FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own workflows" ON public.workflows FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own workflows" ON public.workflows FOR DELETE USING (auth.uid() = user_id);

-- Policies for executions
CREATE POLICY "Users can view own executions" ON public.executions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own executions" ON public.executions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own executions" ON public.executions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own executions" ON public.executions FOR DELETE USING (auth.uid() = user_id);

-- Policies for telegram_bots
CREATE POLICY "Users can view own telegram bots" ON public.telegram_bots FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own telegram bots" ON public.telegram_bots FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own telegram bots" ON public.telegram_bots FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own telegram bots" ON public.telegram_bots FOR DELETE USING (auth.uid() = user_id);
