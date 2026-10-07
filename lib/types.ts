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