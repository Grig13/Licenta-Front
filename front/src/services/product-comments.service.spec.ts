import { TestBed } from '@angular/core/testing';

import { ProductCommentsService } from './product-comments.service';

describe('ProductCommentsService', () => {
  let service: ProductCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
