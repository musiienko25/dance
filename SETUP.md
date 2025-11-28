# Інструкція з налаштування

## Крок 1: Створення проекту Supabase

1. Перейдіть на [supabase.com](https://supabase.com)
2. Створіть новий проект або увійдіть в існуючий
3. Після створення проекту перейдіть в Settings → API
4. Скопіюйте:
   - **Project URL** (це буде `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon public** key (це буде `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## Крок 2: Налаштування змінних оточення

1. Створіть файл `.env.local` в корені проекту:
```bash
cp .env.local.example .env.local
```

2. Відкрийте `.env.local` та заповніть:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Крок 3: Створення бази даних

1. В Supabase Dashboard перейдіть в **SQL Editor**
2. Натисніть **New Query**
3. Скопіюйте весь вміст з файлу `supabase/migrations/001_initial_schema.sql`
4. Вставте в SQL Editor та натисніть **Run**

Це створить:
- Таблицю `profiles` для зберігання профілів танцюристів
- Індекси для швидкого пошуку
- Row Level Security (RLS) політики
- Тригер для автоматичного оновлення `updated_at`

## Крок 4: Налаштування аутентифікації

### Email аутентифікація

1. В Supabase Dashboard перейдіть в **Authentication** → **Providers**
2. Переконайтеся, що **Email** provider увімкнено
3. (Опціонально) Налаштуйте email templates в **Authentication** → **Email Templates**

### Google OAuth (опціонально)

1. В Supabase Dashboard перейдіть в **Authentication** → **Providers**
2. Знайдіть **Google** в списку провайдерів та натисніть **Enable**
3. Вам потрібно створити OAuth credentials в Google Cloud Console:
   - Перейдіть на [Google Cloud Console](https://console.cloud.google.com/)
   - Створіть новий проект або виберіть існуючий
   - Перейдіть в **APIs & Services** → **Credentials**
   - Натисніть **Create Credentials** → **OAuth client ID**
   - Виберіть **Web application**
   - Додайте **Authorized redirect URIs**: 
     ```
     https://your-project-ref.supabase.co/auth/v1/callback
     ```
     (замініть `your-project-ref` на ваш Supabase project reference)
   - Скопіюйте **Client ID** та **Client Secret**
4. Поверніться в Supabase Dashboard:
   - Вставте **Client ID** та **Client Secret** в поля Google provider
   - Збережіть налаштування
5. Додайте ваш домен в **Authentication** → **URL Configuration** → **Redirect URLs**:
   ```
   http://localhost:3000/auth/callback
   https://yourdomain.com/auth/callback
   ```

## Крок 5: Запуск проекту

```bash
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000)

## Перевірка роботи

1. Перейдіть на `/register` та створіть акаунт
2. Після реєстрації вас перенаправить на створення профілю
3. Заповніть форму профілю
4. Перейдіть на головну сторінку та перевірте пошук

## Troubleshooting

### Помилка "relation profiles does not exist"
- Переконайтеся, що ви виконали SQL міграцію з `supabase/migrations/001_initial_schema.sql`

### Помилка аутентифікації
- Перевірте, що змінні оточення в `.env.local` правильні
- Переконайтеся, що Email provider увімкнено в Supabase

### Помилка RLS (Row Level Security)
- Переконайтеся, що політики створені правильно в міграції
- Перевірте, що користувач авторизований

