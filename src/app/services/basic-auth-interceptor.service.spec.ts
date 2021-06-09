import { TestBed } from '@angular/core/testing';

import { HttpInterceptorService } from './basic-auth-interceptor.service';

describe('BasicAuthInterceptorService', () => {
  let service: HttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
