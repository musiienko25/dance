import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SearchPage from '@/components/SearchPage'

export const metadata = {
  title: 'Пошук партнерів для танцюристів',
  description: 'Знайдіть ідеального партнера для бальних танців',
}

export default async function Home() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return <SearchPage />
}
