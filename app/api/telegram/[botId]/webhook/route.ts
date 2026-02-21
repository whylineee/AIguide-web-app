import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'; // Use admin client for webhooks

export async function POST(
    request: Request,
    { params }: { params: Promise<{ botId: string }> }
) {
    try {
        const resolvedParams = await params;
        const update = await request.json();

        // In production, ensure these env variables exist
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

        if (!supabaseUrl || !supabaseServiceKey) {
            console.error("Missing Supabase URL or Service Key");
            return NextResponse.json({ ok: false }, { status: 500 });
        }

        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

        // Verify bot and connected agent
        const { data: botInfo } = await supabaseAdmin
            .from('telegram_bots')
            .select('agent_id, bot_token')
            .eq('id', resolvedParams.botId)
            .single();

        if (!botInfo || !botInfo.agent_id) {
            console.log('Bot or Agent not found for Webhook', resolvedParams.botId);
            return NextResponse.json({ message: 'Bot or Agent not found' }, { status: 404 });
        }

        const chatId = update.message?.chat?.id;
        const text = update.message?.text;

        if (chatId && text) {
            // Logic for querying the AI Agent
            // In a real application, we might:
            // 1. Send an HTTP request to QStash to queue the processing
            // OR 2. Synchronously call the OpenAI API (if within Vercel execution limits)

            const aiResponse = `Mock Agent Reply for: "${text}". Webhook processed by AI Agent Control Panel.`;

            // Send the response back to Telegram
            try {
                await fetch(`https://api.telegram.org/bot${botInfo.bot_token}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: aiResponse
                    })
                });
            } catch (tgError) {
                console.error('Failed sending message to Telegram', tgError);
            }
        }

        // Always acknowledge Telegram webhook so it doesn't retry infinitely
        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Telegram Webhook Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
