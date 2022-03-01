// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export interface IEnvironment {
  production: boolean;
  newsApiKey: string;
  newsBaseURL: string;
}

export const environment: IEnvironment = {
  production: false,
  newsApiKey: '0b523ee8e946476cb7b1f4fb913cb30f',
  newsBaseURL: 'https://newsapi.org/v2'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
