import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { SiteContent } from '../models/content.interface';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private contentSubject = new BehaviorSubject<SiteContent | null>(null);
  public content$ = this.contentSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadContent(): Observable<SiteContent> {
    return this.http.get<SiteContent>('assets/content.json').pipe(
      tap(content => this.contentSubject.next(content))
    );
  }

  getContent(): SiteContent | null {
    return this.contentSubject.value;
  }

  // Utility methods for filtering
  getProjectsByTag(tag: string): any[] {
    const content = this.getContent();
    if (!content) return [];
    
    return content.projects.filter(project => 
      project.tags?.includes(tag) || project.stack.includes(tag)
    );
  }

  getExperienceBySkill(skill: string): any[] {
    const content = this.getContent();
    if (!content) return [];
    
    return content.experience.filter(exp => 
      exp.stack?.includes(skill)
    );
  }

  getFeaturedProjects(): any[] {
    const content = this.getContent();
    if (!content) return [];
    
    return content.projects.filter(project => project.featured);
  }
}
