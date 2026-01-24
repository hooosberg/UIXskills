
import { Env, corsHeaders, createSupabaseClient } from '../../utils';

export const onRequest: PagesFunction<Env> = async (context) => {
    if (context.request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const supabase = createSupabaseClient(context.env);
        const url = new URL(context.request.url);
        const name = url.searchParams.get('name'); // e.g. "button" or "shadcn/button"

        if (!name) {
            return new Response('Missing name param', { status: 400 });
        }

        // Attempt to match exact title or fuzzy match
        // Simple logic: return main repo for everything for now, can be enhanced
        // In real scenario, `code_repo_url` from DB should be used

        const { data, error } = await supabase
            .from('skills')
            .select('title, code_content')
            .ilike('title', `%${name}%`)
            .limit(1)
            .single();

        if (!data) {
            return new Response(JSON.stringify({ error: 'Not found' }), {
                status: 404,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        // For now, mapping everything to the main repo as it is a monorepo
        // Client will download from hooosberg/UIXskills/uixskills/...
        return new Response(JSON.stringify({
            github_owner: 'hooosberg',
            github_repo: 'UIXskills',
            is_official: true,
            path: `uixskills/` // Hint for future CLI improvements
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
};
