
export interface ITopHeadlinesArticles {
  author: string;
  title: string;
  url: string;
  urlToImage: string;
  description: string;
  content: string;
  publishedAt: string;
  source: ITopHeadlinesSource;
}

export interface ITopHeadlinesSource{
  id: string;
  name: string;
}

export interface IResponseTopHeadlinesNews {
  totalResult: number;
  articles: ITopHeadlinesArticles[];
  status: string;
}