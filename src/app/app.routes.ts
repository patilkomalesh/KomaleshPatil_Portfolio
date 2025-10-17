import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'experience',
    loadComponent: () => import('./pages/experience/experience.component').then(m => m.ExperienceComponent)
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent)
  },
  {
    path: 'skills',
    loadComponent: () => import('./pages/skills/skills.component').then(m => m.SkillsComponent)
  },
  {
    path: 'education',
    loadComponent: () => import('./pages/education/education.component').then(m => m.EducationComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
