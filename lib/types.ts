export type ArticleSummary = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
};

export type Article = ArticleSummary & {
  body: string;
};

export type Result<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

    export type ArticleComment = {
  id: string;
  user_id: string;
  author_name: string;
  body: string;
};

export type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export type CommentsSectionProps = {
  articleId: string;
};

export type WeatherForecast = {
  location: string;
  periodName: string;
  temperature: number;
  temperatureUnit: string;
  shortForecast: string;
  detailedForecast: string;
  startTime: string;
  endTime: string;
};

export type WeatherApiResponse =
  | {
      success: true;
      data: WeatherForecast;
    }
  | {
      success: false;
      error: string;
    };

export type WeatherHookState = {
  data: WeatherForecast | null;
  loading: boolean;
  error: string | null;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

