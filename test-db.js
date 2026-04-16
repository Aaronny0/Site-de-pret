const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  const { data, error } = await supabaseAdmin.from('loan_applications').select('*').limit(1).order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching:', error);
  } else {
    console.log(JSON.stringify(data, null, 2));
  }
}
main();
