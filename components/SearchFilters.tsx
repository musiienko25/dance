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
    <div className="rounded-3xl border border-white/30 bg-white/20 backdrop-blur-xl p-6 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Фільтри пошуку</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-white hover:text-white/90 underline drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
        >
          Очистити
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="dance_style" className="block text-sm font-medium text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            Стиль танцю
          </label>
          <select
            id="dance_style"
            value={filters.dance_style || ''}
            onChange={(e) => handleChange('dance_style', e.target.value || undefined)}
            className="mt-1 block w-full rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm pl-3 py-2 text-sm text-white placeholder-white/80 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
          >
            <option value="" className="bg-gray-800 text-white">Всі стилі</option>
            {danceStyles.map((style) => (
              <option key={style.value} value={style.value} className="bg-gray-800 text-white">
                {style.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            Місто
          </label>
          <input
            id="city"
            type="text"
            value={filters.city || ''}
            onChange={(e) => handleChange('city', e.target.value || undefined)}
            placeholder="Введіть місто"
            className="mt-1 block w-full rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm px-3 py-2 text-sm text-white placeholder-white/80 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
          />
        </div>

        <div>
          <label htmlFor="skill_level" className="block text-sm font-medium text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            Рівень
          </label>
          <select
            id="skill_level"
            value={filters.skill_level || ''}
            onChange={(e) => handleChange('skill_level', e.target.value || undefined)}
            className="mt-1 block w-full rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm pl-3 py-2 text-sm text-white placeholder-white/80 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
          >
            <option value="" className="bg-gray-800 text-white">Всі рівні</option>
            {skillLevels.map((level) => (
              <option key={level.value} value={level.value} className="bg-gray-800 text-white">
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="age_category" className="block text-sm font-medium text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            Вік
          </label>
          <select
            id="age_category"
            value={filters.age_category || ''}
            onChange={(e) => handleChange('age_category', e.target.value || undefined)}
            className="mt-1 block w-full rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm pl-3 py-2 text-sm text-white placeholder-white/80 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
          >
            <option value="" className="bg-gray-800 text-white">Всі вікові категорії</option>
            {ageCategories.map((category) => (
              <option key={category.value} value={category.value} className="bg-gray-800 text-white">
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

