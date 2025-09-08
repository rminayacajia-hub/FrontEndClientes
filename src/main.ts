import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http'; 
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { routes } from './app/app.routes'; 

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(withFetch())
  ]
})
.catch((err) => console.error(err));