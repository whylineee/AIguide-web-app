import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const resolvedParams = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { input } = await request.json();

    // Отримуємо конфігурацію агента
    const { data: agent, error } = await supabase
        .from('agents')
        .select('*')
        .eq('id', resolvedParams.id)
        .eq('user_id', user.id)
        .single();

    if (error || !agent) {
        return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    try {
        // Створюємо запис про виконання
        const { data: execution } = await supabase
            .from('executions')
            .insert({
                user_id: user.id,
                agent_id: agent.id,
                status: 'running',
                started_at: new Date().toISOString()
            })
            .select()
            .single();

        // Виклик LLM
        const completion = await openai.chat.completions.create({
            model: agent.model || 'gpt-3.5-turbo',
            temperature: agent.temperature || 0.7,
            messages: [
                { role: 'system', content: agent.system_prompt || 'You are a helpful assistant.' },
                { role: 'user', content: input }
            ],
        });

        const resultText = completion.choices[0].message.content;

        // Оновлюємо статус виконання
        if (execution) {
            await supabase
                .from('executions')
                .update({
                    status: 'success',
                    finished_at: new Date().toISOString(),
                    logs: [{ type: 'info', message: 'Agent executed successfully', result: resultText }]
                })
                .eq('id', execution.id);
        }

        return NextResponse.json({ result: resultText });
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
