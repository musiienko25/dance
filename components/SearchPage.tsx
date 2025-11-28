'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Profile, ProfileFilters, AgeCategory } from '@/types/database'
import ProfileCard from './ProfileCard'
import SearchFilters from './SearchFilters'
import SignOutButton from './SignOutButton'
import Link from 'next/link'

export default function SearchPage() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<ProfileFilters>({})
  const supabase = createClient()

  useEffect(() => {
    loadProfiles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const loadProfiles = async () => {
    setLoading(true)
    let query = supabase.from('profiles').select('*')

    if (filters.dance_style) {
      query = query.contains('dance_styles', [filters.dance_style])
    }

    if (filters.city) {
      query = query.ilike('city', `%${filters.city}%`)
    }

    if (filters.skill_level) {
      query = query.eq('skill_level', filters.skill_level)
    }

    if (filters.age_category) {
      const [min, max] = filters.age_category.split('-').map(Number)
      if (max) {
        query = query.gte('age', min).lte('age', max)
      } else {
        // 46+
        query = query.gte('age', 46)
      }
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Error loading profiles:', error)
    } else {
      setProfiles(data || [])
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Dance Partners</h1>
            <div className="flex gap-4">
              <Link
                href="/profile"
                className="text-sm text-gray-700 hover:text-gray-900"
              >
                Мій профіль
              </Link>
              <SignOutButton />
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <SearchFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Завантаження...</p>
              </div>
            ) : profiles.length === 0 ? (
              <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
                <p className="text-gray-600">Профілів не знайдено</p>
                <p className="mt-2 text-sm text-gray-500">
                  Спробуйте змінити фільтри пошуку
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Знайдено профілів: {profiles.length}
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {profiles.map((profile) => (
                    <ProfileCard key={profile.id} profile={profile} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

