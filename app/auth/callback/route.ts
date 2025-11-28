import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const supabase = await createClient()

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Check if user has a profile, redirect accordingly
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (profile) {
      return redirect('/')
    } else {
      return redirect('/profile/create')
    }
  }

  return redirect('/login')
}

