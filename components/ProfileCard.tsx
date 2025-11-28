import { Profile } from '@/types/database'
import Link from 'next/link'

interface ProfileCardProps {
  profile: Profile
}

const skillLevelLabels: Record<string, string> = {
  beginner: 'Початківець',
  intermediate: 'Середній',
  advanced: 'Просунутий',
  pro: 'Професіонал',
}

const danceStyleLabels: Record<string, string> = {
  latin: 'Латина',
  standard: 'Стандарт',
}

const goalLabels: Record<string, string> = {
  competition: 'Змагання',
  training: 'Тренування',
  hobby: 'Хобі',
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const getAgeCategory = (age: number): string => {
    if (age >= 18 && age <= 25) return '18-25'
    if (age >= 26 && age <= 35) return '26-35'
    if (age >= 36 && age <= 45) return '36-45'
    return '46+'
  }

  const isInstagram = (url: string | undefined): boolean => {
    if (!url) return false
    return /instagram\.com/i.test(url)
  }

  return (
    <div className="rounded-3xl border border-white/30 bg-white/20 backdrop-blur-xl p-6 shadow-2xl transition-all hover:shadow-3xl hover:bg-white/25">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-display">
            {profile.nickname || profile.name}
          </h3>
          {profile.nickname && (
            <p className="text-sm text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">{profile.name}</p>
          )}
          <p className="mt-1 text-sm text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            {profile.city} • {getAgeCategory(profile.age)} років
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div>
          <span className="text-sm font-medium text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">Стилі: </span>
          <span className="text-sm text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            {profile.dance_styles.map((style) => danceStyleLabels[style] || style).join(', ')}
          </span>
        </div>
        <div>
          <span className="text-sm font-medium text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">Рівень: </span>
          <span className="text-sm text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            {skillLevelLabels[profile.skill_level] || profile.skill_level}
          </span>
        </div>
        <div>
          <span className="text-sm font-medium text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">Цілі: </span>
          <span className="text-sm text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            {profile.goals.map((goal) => goalLabels[goal] || goal).join(', ')}
          </span>
        </div>
      </div>

      {profile.description && (
        <p className="mt-4 text-sm text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] line-clamp-2">{profile.description}</p>
      )}

      <div className="mt-6 flex gap-2">
        {profile.email && (
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center justify-center rounded-xl border border-white/30 bg-white/30 backdrop-blur-sm px-4 py-2 text-white hover:bg-white/40 transition-all duration-200 shadow-lg"
            title="Написати на email"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </a>
        )}
        {profile.social_media && (
          <a
            href={profile.social_media}
            target="_blank"
            rel="noopener noreferrer"
            className={`${isInstagram(profile.social_media) ? 'flex items-center justify-center' : 'flex-1'} rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm px-4 py-2 text-center text-sm font-semibold text-white hover:bg-white/30 transition-all duration-200 shadow-lg`}
            title={isInstagram(profile.social_media) ? 'Instagram' : 'Соцмережа'}
          >
            {isInstagram(profile.social_media) ? (
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            ) : (
              'Соцмережа'
            )}
          </a>
        )}
      </div>
    </div>
  )
}

