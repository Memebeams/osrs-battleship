import { InjectionToken } from '@angular/core';
import { Environment } from './environment.model';

export const Config = new InjectionToken<Environment>('Config');
