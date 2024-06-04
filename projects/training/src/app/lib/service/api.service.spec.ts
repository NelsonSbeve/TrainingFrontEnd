import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a POST request to create a new item', () => {
    const dummyItem = { name: 'Test Skill', lvl: 1 };

    service.createItem(dummyItem).subscribe(response => {
      expect(response).toEqual(dummyItem);
    });

    const req = httpMock.expectOne('http://localhost:5041/api/Skills');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyItem);

    req.flush(dummyItem);
  });
});
