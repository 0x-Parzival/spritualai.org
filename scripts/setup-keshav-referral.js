
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qgshsqqimqktssburpze.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnc2hzcXFpbXFrdHNzYnVycHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NDAxODYsImV4cCI6MjA4NTIxNjE4Nn0.kTVNkAPK2usjIyx62z7Mzbcynledax4Ckh0asI6lRZI';

const supabase = createClient(supabaseUrl, supabaseKey);

async function addReferral() {
    console.log('--- Creating/Updating Referral Code: KESHAV ---');

    // Check if it exists
    const { data: existing } = await supabase
        .from('referrals')
        .select('*')
        .eq('code', 'KESHAV')
        .single();

    if (existing) {
        console.log('Code KESHAV already exists. Updating its discount to 33%.');
        const { error: updateError } = await supabase
            .from('referrals')
            .update({ discount_percentage: 33, is_active: true })
            .eq('code', 'KESHAV');

        if (updateError) console.error('Update failed:', updateError.message);
        else console.log('Successfully updated KESHAV to 33% discount.');
    } else {
        const { data, error } = await supabase.from('referrals').insert({
            code: 'KESHAV',
            discount_percentage: 33,
            is_active: true,
            usage_count: 0,
            total_revenue_generated: 0
        }).select();

        if (error) console.error('Error creating referral:', error.message);
        else console.log('Successfully created referral code KESHAV.');
    }
}

addReferral();
