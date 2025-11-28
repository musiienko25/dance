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
    <div className="rounded-lg border border-gray-200 bg-white/95 backdrop-blur-sm p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">
            {profile.nickname || profile.name}
          </h3>
          {profile.nickname && (
            <p className="text-sm text-gray-500">{profile.name}</p>
          )}
          <p className="mt-1 text-sm text-gray-600">
            {profile.city} • {getAgeCategory(profile.age)} років
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div>
          <span className="text-sm font-medium text-gray-700">Стилі: </span>
          <span className="text-sm text-gray-600">
            {profile.dance_styles.map((style) => danceStyleLabels[style] || style).join(', ')}
          </span>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-700">Рівень: </span>
          <span className="text-sm text-gray-600">
            {skillLevelLabels[profile.skill_level] || profile.skill_level}
          </span>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-700">Цілі: </span>
          <span className="text-sm text-gray-600">
            {profile.goals.map((goal) => goalLabels[goal] || goal).join(', ')}
          </span>
        </div>
      </div>

      {profile.description && (
        <p className="mt-4 text-sm text-gray-600 line-clamp-2">{profile.description}</p>
      )}

      <div className="mt-6 flex gap-2">
        {profile.email && (
          <a
            href={`mailto:${profile.email}`}
            className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Написати
          </a>
        )}
        {profile.social_media && (
          <a
            href={profile.social_media}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Соцмережа
          </a>
        )}
      </div>
    </div>
  )
}

