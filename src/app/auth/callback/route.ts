import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/profile'

    console.log('--- Auth Callback Started ---');
    console.log('Origin:', origin);
    console.log('Code present:', !!code);

    if (code) {
        const supabase = await createClient()
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
            console.error('Auth Error during code exchange:', error.message);
            console.error('Error details:', error);
            return NextResponse.redirect(`${origin}/auth/auth-error?error=${encodeURIComponent(error.message)}`)
        }

        console.log('Auth Success! Session established for user:', data.user?.id);

        const forwardedHost = request.headers.get('x-forwarded-host')
        const isLocalEnv = process.env.NODE_ENV === 'development'

        if (isLocalEnv) {
            return NextResponse.redirect(`${origin}${next}`)
        } else if (forwardedHost) {
            return NextResponse.redirect(`https://${forwardedHost}${next}`)
        } else {
            return NextResponse.redirect(`${origin}${next}`)
        }
    }

    console.warn('Auth Callback: No code provided in URL');
    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-error?error=no_code`)
}
