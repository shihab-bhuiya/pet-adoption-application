import { NextResponse } from 'next/server'
import { auth } from './lib/auth' // Double check if this path matches your project structure (e.g., '@/lib/auth')
import { headers } from 'next/headers'
 
// ✅ Function name must be exactly "middleware"
export async function proxy(request) {
    
    const session = await auth.api.getSession({
        headers: await headers() 
    })

    // ✅ FIX: If there is NO active session, redirect the user to the login page
    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Allow the request to continue if they are logged in
    return NextResponse.next();
}
 
export const config = {
  // ✅ Cleaned up matchers to safely protect all your dashboards and individual pet profile actions
  matcher: [
    '/pets/:path*',               // Protects specific sub-paths under pets if desired
    '/dashboard',                 // Protects the main dashboard page
    '/dashboard/:path*'           // Protects all nested dashboard pages (add-pet, my-listings, etc.)
  ],
}