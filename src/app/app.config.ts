import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { Client } from './api/steelService';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    { provide: 'API_BASE_URL', useValue: 'http://localhost:32784' },
    //{ provide: 'API_BASE_URL', useValue: 'http://localhost:5116' },
    {
      provide: Client,
      useFactory: (baseUrl: string) => new Client(baseUrl),
      deps: ['API_BASE_URL']
    }]
};
