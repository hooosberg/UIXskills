import { Env, corsHeaders, createSupabaseClient } from '../utils';

const responseHeaders = {
  ...corsHeaders,
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
};

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: responseHeaders });
  }

  if (!['GET', 'HEAD'].includes(context.request.method)) {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        ...responseHeaders,
        Allow: 'GET, HEAD, OPTIONS',
      },
    });
  }

  try {
    const supabase = createSupabaseClient(context.env);
    const { data, error } = await supabase
      .from('skills')
      .select('id')
      .limit(1);

    if (error) {
      throw error;
    }

    const payload = {
      ok: true,
      project: 'uixskills',
      checkedAt: new Date().toISOString(),
      rowsSeen: data?.length ?? 0,
    };

    return new Response(
      context.request.method === 'HEAD' ? null : JSON.stringify(payload),
      { headers: responseHeaders }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    return new Response(JSON.stringify({
      ok: false,
      checkedAt: new Date().toISOString(),
      error: message,
    }), {
      status: 500,
      headers: responseHeaders,
    });
  }
};
