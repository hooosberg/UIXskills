
import { Env, corsHeaders, createSupabaseClient } from '../../utils';

export const onRequest: PagesFunction<Env> = async (context) => {
    if (context.request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const supabase = createSupabaseClient(context.env);
        const url = new URL(context.request.url);

        const limit = parseInt(url.searchParams.get('limit') || '10');
        const trending = url.searchParams.get('trending') === 'true';

        let query = supabase
            .from('skills')
            .select('id, title, description, thumbnail_url, view_count, like_count, created_at, tech_base, system_type, user:profiles!skills_user_id_fkey(username, avatar_url)')
            .eq('status', 'approved');

        if (trending) {
            // Simple trending logic: sort by week's views (simulated by view_count here for simplicity)
            // ideally we would have a view_logs table
            query = query.order('view_count', { ascending: false });
        } else {
            query = query.order('created_at', { ascending: false });
        }

        const { data, error } = await query.limit(limit);

        if (error) throw error;

        // Transform for CLI
        const simplified = data.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            install_count: item.view_count, // Use views as proxy for installs
            author: item.user?.username || 'Community',
            github_owner: 'hooosberg', // placeholder, will resolve from source later
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
