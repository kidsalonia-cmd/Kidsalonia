const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured');

    const { keywords } = await req.json();
    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
      throw new Error('Keywords array is required');
    }

    const keywordList = keywords.slice(0, 100).join('\n');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          {
            role: 'system',
            content: `You are an SEO expert. For each keyword, estimate the monthly search volume (India market) and keyword difficulty (0-100 scale where 0=easiest, 100=hardest). Use your knowledge of search trends, competition, and keyword patterns. Be realistic — local keywords typically have lower volume than broad keywords. Return data via the tool provided.`,
          },
          {
            role: 'user',
            content: `Analyze these keywords for kidsalonia.com (a kids salon in Gurugram, India). Estimate monthly search volume (India) and difficulty score (0-100):\n\n${keywordList}`,
          },
        ],
        tools: [
          {
            type: 'function',
            function: {
              name: 'keyword_analysis',
              description: 'Return search volume and difficulty estimates for keywords',
              parameters: {
                type: 'object',
                properties: {
                  results: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        keyword: { type: 'string' },
                        volume: { type: 'number', description: 'Estimated monthly search volume in India' },
                        difficulty: { type: 'number', description: 'Keyword difficulty score 0-100' },
                      },
                      required: ['keyword', 'volume', 'difficulty'],
                      additionalProperties: false,
                    },
                  },
                },
                required: ['results'],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: 'function', function: { name: 'keyword_analysis' } },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limited, please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits exhausted.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`AI gateway error [${response.status}]: ${errText}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error('No tool call in AI response');

    const parsed = JSON.parse(toolCall.function.arguments);

    // Build a map for easy lookup
    const analysisMap: Record<string, { volume: number; difficulty: number }> = {};
    for (const item of parsed.results) {
      analysisMap[item.keyword.toLowerCase()] = {
        volume: item.volume,
        difficulty: item.difficulty,
      };
    }

    return new Response(
      JSON.stringify({ analysis: analysisMap }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Keyword analysis error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
