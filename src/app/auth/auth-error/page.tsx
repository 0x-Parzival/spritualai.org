import Link from 'next/link'

export default function AuthErrorPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4 text-center">
            <div className="max-w-md w-full space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tighter text-red-500">Authentication Error</h1>
                    <p className="text-gray-400">
                        Something went wrong during the sign-in process. This could be due to an expired link,
                        a network issue, or an configuration mismatch.
                    </p>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-xl font-mono text-xs text-left text-gray-500 overflow-auto">
                    <p>Possible causes:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Expired authentication code</li>
                        <li>Invalid redirect URI configuration</li>
                        <li>Third-party cookie restrictions</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <Link
                        href="/profile"
                        className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors"
                    >
                        Try Again
                    </Link>
                    <Link
                        href="/"
                        className="text-sm text-gray-500 hover:text-white transition-colors"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
