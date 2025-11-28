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

  return (
    <div className="rounded-3xl border border-white/30 bg-white/20 backdrop-blur-xl p-6 shadow-2xl transition-all hover:shadow-3xl hover:bg-white/25">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
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
            className="flex-1 rounded-xl border border-white/30 bg-white/30 backdrop-blur-sm px-4 py-2 text-center text-sm font-semibold text-white hover:bg-white/40 transition-all duration-200 shadow-lg"
          >
            Написати
          </a>
        )}
        {profile.social_media && (
          <a
            href={profile.social_media}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm px-4 py-2 text-center text-sm font-semibold text-white hover:bg-white/30 transition-all duration-200 shadow-lg"
          >
            Соцмережа
          </a>
        )}
      </div>
    </div>
  )
}

