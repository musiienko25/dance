'use client'

import { ProfileFilters, DanceStyle, SkillLevel, AgeCategory } from '@/types/database'

interface SearchFiltersProps {
  filters: ProfileFilters
  onFiltersChange: (filters: ProfileFilters) => void
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

const ageCategories: { value: AgeCategory; label: string }[] = [
  { value: '18-25', label: '18-25' },
  { value: '26-35', label: '26-35' },
  { value: '36-45', label: '36-45' },
  { value: '46+', label: '46+' },
]

export default function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  const handleChange = (key: keyof ProfileFilters, value: string | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white/95 backdrop-blur-sm p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Фільтри пошуку</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Очистити
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="dance_style" className="block text-sm font-medium text-gray-700">
            Стиль танцю
          </label>
          <select
            id="dance_style"
            value={filters.dance_style || ''}
            onChange={(e) => handleChange('dance_style', e.target.value || undefined)}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          >
            <option value="">Всі стилі</option>
            {danceStyles.map((style) => (
              <option key={style.value} value={style.value}>
                {style.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            Місто
          </label>
          <input
            id="city"
            type="text"
            value={filters.city || ''}
            onChange={(e) => handleChange('city', e.target.value || undefined)}
            placeholder="Введіть місто"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="skill_level" className="block text-sm font-medium text-gray-700">
            Рівень
          </label>
          <select
            id="skill_level"
            value={filters.skill_level || ''}
            onChange={(e) => handleChange('skill_level', e.target.value || undefined)}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          >
            <option value="">Всі рівні</option>
            {skillLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="age_category" className="block text-sm font-medium text-gray-700">
            Вік
          </label>
          <select
            id="age_category"
            value={filters.age_category || ''}
            onChange={(e) => handleChange('age_category', e.target.value || undefined)}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          >
            <option value="">Всі вікові категорії</option>
            {ageCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

