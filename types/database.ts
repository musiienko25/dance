export type DanceStyle = 'latin' | 'standard'
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'pro'
export type Goal = 'competition' | 'training' | 'hobby'
export type AgeCategory = '18-25' | '26-35' | '36-45' | '46+'

export interface Profile {
  id: string
  user_id: string
  name: string
  nickname?: string
  age: number
  city: string
  dance_styles: DanceStyle[]
  skill_level: SkillLevel
  goals: Goal[]
  description?: string
  email?: string
  social_media?: string
  created_at: string
  updated_at: string
}

export interface ProfileInsert {
  name: string
  nickname?: string
  age: number
  city: string
  dance_styles: DanceStyle[]
  skill_level: SkillLevel
  goals: Goal[]
  description?: string
  email?: string
  social_media?: string
}

export interface ProfileFilters {
  dance_style?: DanceStyle
  city?: string
  skill_level?: SkillLevel
  age_category?: AgeCategory
}

