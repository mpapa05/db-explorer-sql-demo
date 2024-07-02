import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/theme/material.css'; // CSS importálása

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
