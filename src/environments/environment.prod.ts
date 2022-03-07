interface IEnvironment {
  production: boolean;
  newsBaseURL: string;
}

export const environment: IEnvironment = {
  production: true,
  newsBaseURL: 'https://newsapi.org/v2'
};
