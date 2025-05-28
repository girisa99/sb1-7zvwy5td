import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const LINKEDIN_API_URL = 'https://api.linkedin.com/v2';
const LINKEDIN_ACCESS_TOKEN = Deno.env.get('LINKEDIN_ACCESS_TOKEN');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');

const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);

async function shareToLinkedIn(content: any) {
  try {
    const response = await fetch(`${LINKEDIN_API_URL}/ugcPosts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author: `urn:li:person:${Deno.env.get('LINKEDIN_USER_ID')}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: `${content.title}\n\n${content.summary}\n\nRead more: ${content.url}`
            },
            shareMediaCategory: 'ARTICLE',
            media: [{
              status: 'READY',
              description: {
                text: content.summary
              },
              originalUrl: content.url,
              title: {
                text: content.title
              }
            }]
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to share to LinkedIn');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('LinkedIn API Error:', error);
    throw error;
  }
}

async function syncComments(postId: string, contentId: string) {
  try {
    const response = await fetch(
      `${LINKEDIN_API_URL}/socialActions/${postId}/comments`,
      {
        headers: {
          'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch LinkedIn comments');
    }

    const comments = await response.json();

    // Store comments in database
    for (const comment of comments.elements) {
      await supabase.from('rag_comments').upsert({
        content_id: contentId,
        comment: comment.message.text,
        source: 'linkedin',
        source_comment_id: comment.id,
        created_at: comment.created.time
      });
    }

    return comments;
  } catch (error) {
    console.error('Error syncing comments:', error);
    throw error;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { content_id, action } = await req.json();

    // Get content details
    const { data: content, error: contentError } = await supabase
      .from('rag_content')
      .select('*')
      .eq('id', content_id)
      .single();

    if (contentError) throw contentError;

    let result;
    switch (action) {
      case 'share':
        result = await shareToLinkedIn(content);
        
        // Store share details
        await supabase.from('social_shares').insert({
          content_id: content_id,
          platform: 'linkedin',
          share_id: result.id
        });

        // Update content with LinkedIn post ID
        await supabase
          .from('rag_content')
          .update({ linkedin_post_id: result.id })
          .eq('id', content_id);

        break;

      case 'sync_comments':
        if (!content.linkedin_post_id) {
          throw new Error('No LinkedIn post ID found');
        }
        result = await syncComments(content.linkedin_post_id, content_id);
        break;

      default:
        throw new Error('Invalid action');
    }

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { 
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        error: {
          message: error.message,
          code: 'INTERNAL_ERROR'
        }
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
});