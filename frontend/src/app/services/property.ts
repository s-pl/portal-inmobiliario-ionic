import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PropertyDto {
  id?: number;
  title: string;
  description?: string;
  price?: number;
  propertyType?: string;
  transactionType?: string;
  bedrooms?: number;
  city?: string;
  images?: string; // only one URL for simplicity
  contactPhone?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private baseUrl = 'http://localhost:3000/api/properties';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PropertyDto[]> {
    return this.http.get<PropertyDto[]>(this.baseUrl);
  }

  getById(id: number): Observable<PropertyDto> {
    return this.http.get<PropertyDto>(`${this.baseUrl}/${id}`);
  }

  create(payload: PropertyDto): Observable<PropertyDto> {
    return this.http.post<PropertyDto>(this.baseUrl, payload);
  }

  update(id: number, payload: PropertyDto): Observable<PropertyDto> {
    return this.http.put<PropertyDto>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  generateDescription(payload: {
    title: string;
    propertyType: string;
    transactionType: string;
    bedrooms: number;
    city: string;
  }): Observable<{ description: string }> {
    return this.http.post<{ description: string }>(`${this.baseUrl}/generate-description`, payload);
  }
}
