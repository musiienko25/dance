'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Profile, ProfileInsert, DanceStyle, SkillLevel, Goal } from '@/types/database'

interface ProfileFormProps {
  initialData?: Profile
}

const danceStyles: { value: DanceStyle; label: string }[] = [
  { value: 'latin', label: 'Латина' },
  { value: 'standard', label: 'Стандарт' },
]

const skillLevels: { value: SkillLevel; label: string }[] = [
  { value: 'beginner', label: 'Початківець' },
  { value: 'intermediate', label: 'Середній' },
  { value: 'advanced', label: 'Просунутий' },
  { value: 'pro', label: 'Професіонал' },
]

const goals: { value: Goal; label: string }[] = [
  { value: 'competition', label: 'Партнер для змагань' },
  { value: 'training', label: 'Партнер для тренувань' },
  { value: 'hobby', label: 'Хобі' },
]

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<ProfileInsert>({
    name: initialData?.name || '',
    nickname: initialData?.nickname || '',
    age: initialData?.age || 18,
    city: initialData?.city || '',
    dance_styles: initialData?.dance_styles || [],
    skill_level: initialData?.skill_level || 'beginner',
    goals: initialData?.goals || [],
    description: initialData?.description || '',
    email: initialData?.email || '',
    social_media: initialData?.social_media || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setError('Користувач не авторизований')
      setLoading(false)
      return
    }

    if (initialData) {
      // Update existing profile
      const { error } = await supabase
        .from('profiles')
        .update(formData)
        .eq('user_id', user.id)

      if (error) {
        setError(error.message)
        setLoading(false)
      } else {
        router.push('/')
        router.refresh()
      }
    } else {
      // Create new profile
      const { error } = await supabase.from('profiles').insert({
        ...formData,
        user_id: user.id,
      })

      if (error) {
        setError(error.message)
        setLoading(false)
      } else {
        router.push('/')
        router.refresh()
      }
    }
  }

  const toggleArrayValue = (
    array: string[],
    value: string,
    setter: (arr: string[]) => void
  ) => {
    if (array.includes(value)) {
      setter(array.filter((item) => item !== value))
    } else {
      setter([...array, value])
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Ім'я <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
          Нікнейм
        </label>
        <input
          type="text"
          id="nickname"
          value={formData.nickname || ''}
          onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
          Вік <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="age"
          required
          min="18"
          max="100"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          Місто <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="city"
          required
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Танцювальні стилі <span className="text-red-500">*</span>
        </label>
        <div className="mt-2 space-y-2">
          {danceStyles.map((style) => (
            <label key={style.value} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.dance_styles.includes(style.value)}
                onChange={() =>
                  toggleArrayValue(
                    formData.dance_styles,
                    style.value,
                    (arr) => setFormData({ ...formData, dance_styles: arr as DanceStyle[] })
                  )
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{style.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="skill_level" className="block text-sm font-medium text-gray-700">
          Рівень <span className="text-red-500">*</span>
        </label>
        <select
          id="skill_level"
          required
          value={formData.skill_level}
          onChange={(e) =>
            setFormData({ ...formData, skill_level: e.target.value as SkillLevel })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        >
          {skillLevels.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Цілі <span className="text-red-500">*</span>
        </label>
        <div className="mt-2 space-y-2">
          {goals.map((goal) => (
            <label key={goal.value} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.goals.includes(goal.value)}
                onChange={() =>
                  toggleArrayValue(
                    formData.goals,
                    goal.value,
                    (arr) => setFormData({ ...formData, goals: arr as Goal[] })
                  )
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{goal.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Опис
        </label>
        <textarea
          id="description"
          rows={4}
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email для контактів
        </label>
        <input
          type="email"
          id="email"
          value={formData.email || ''}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="social_media" className="block text-sm font-medium text-gray-700">
          Соціальна мережа (посилання)
        </label>
        <input
          type="url"
          id="social_media"
          value={formData.social_media || ''}
          onChange={(e) => setFormData({ ...formData, social_media: e.target.value })}
          placeholder="https://..."
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Збереження...' : initialData ? 'Оновити профіль' : 'Створити профіль'}
        </button>
      </div>
    </form>
  )
}

