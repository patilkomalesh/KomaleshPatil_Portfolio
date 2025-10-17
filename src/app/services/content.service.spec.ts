import { TestBed } from '@angular/core/testing';
import { ContentService } from './content.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SiteContent } from '../models/content.interface';

describe('ContentService', () => {
  let service: ContentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContentService]
    });
    service = TestBed.inject(ContentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load content from assets', () => {
    const mockContent: Partial<SiteContent> = {
      person: {
        name: 'Test User',
        headline: 'Test Developer',
        location: 'Test City',
        email: 'test@example.com',
        summary: 'Test summary',
        socials: []
      }
    };

    service.loadContent().subscribe(content => {
      expect(content).toEqual(mockContent);
    });

    const req = httpMock.expectOne('assets/content.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockContent);
  });

  it('should filter projects by tag', () => {
    const mockContent: SiteContent = {
      person: {
        name: 'Test',
        headline: 'Test',
        location: 'Test',
        email: 'test@test.com',
        summary: 'Test',
        socials: []
      },
      skills: [],
      experience: [],
      projects: [
        { name: 'Project 1', description: 'Test', stack: ['Angular', 'TypeScript'], tags: ['Frontend'] },
        { name: 'Project 2', description: 'Test', stack: ['Node.js'], tags: ['Backend'] }
      ],
      education: [],
      certifications: []
    };

    // Set the content
    service['contentSubject'].next(mockContent);

    const angularProjects = service.getProjectsByTag('Angular');
    expect(angularProjects).toHaveLength(1);
    expect(angularProjects[0].name).toBe('Project 1');

    const frontendProjects = service.getProjectsByTag('Frontend');
    expect(frontendProjects).toHaveLength(1);
    expect(frontendProjects[0].name).toBe('Project 1');
  });
});
