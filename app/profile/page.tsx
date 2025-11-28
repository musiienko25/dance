import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ProfileForm from '@/components/ProfileForm'
import Link from 'next/link'

export default async function ProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!profile) {
    redirect('/profile/create')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link
            href="/"
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            ← Назад до пошуку
          </Link>
        </div>
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">Мій профіль</h1>
          <ProfileForm initialData={profile} />
        </div>
      </div>
    </div>
  )
}

