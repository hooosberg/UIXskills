
import { Env, corsHeaders, createSupabaseClient } from '../../utils';

export const onRequest: PagesFunction<Env> = async (context) => {
    if (context.request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const supabase = createSupabaseClient(context.env);
        const url = new URL(context.request.url);

        const q = url.searchParams.get('q') || '';
        const limit = parseInt(url.searchParams.get('limit') || '10');

        if (!q) {
            return new Response(JSON.stringify([]), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        const { data, error } = await supabase
            .from('skills')
            .select('id, title, description, thumbnail_url, view_count, tech_base, user:profiles!skills_user_id_fkey(username)')
            .eq('status', 'approved')
            .or(`title.ilike.%${q}%,description.ilike.%${q}%,tags.cs.{${q}}`)
            .limit(limit);

        if (error) throw error;

        const simplified = data.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            install_count: item.view_count,
            author: item.user?.username || 'Community',
            github_owner: 'hooosberg',
            github_repo: 'UIXskills'
        }));

        return new Response(JSON.stringify(simplified), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
};
