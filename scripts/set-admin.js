
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qgshsqqimqktssburpze.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnc2hzcXFpbXFrdHNzYnVycHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NDAxODYsImV4cCI6MjA4NTIxNjE4Nn0.kTVNkAPK2usjIyx62z7Mzbcynledax4Ckh0asI6lRZI';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setAdmin() {
    const userId = 'a40137b5-c946-4564-a35b-dcb656335b2d';
    console.log(`--- Setting Admin Status for: ${userId} ---`);

    const { data, error } = await supabase
        .from('profiles')
        .update({ is_admin: true })
        .eq('id', userId)
        .select();

    if (error) {
        console.error('Error setting admin:', error.message);
    } else {
        console.log('Successfully set admin status:', data);
    }
}

setAdmin();
