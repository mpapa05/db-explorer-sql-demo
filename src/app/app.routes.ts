import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BrowserComponent } from './components/browser/browser.component';
import { ComparerComponent } from './components/comparer/comparer.component';
import { SearchTextComponent } from './components/search-text/search-text.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'browser', component: BrowserComponent },
    { path: 'comparer', component: ComparerComponent },
    { path: 'search', component: SearchTextComponent },
    { path: '**', component: HomeComponent },
];
