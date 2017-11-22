import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HnapiService {
  constructor(private _http: HttpClient) {}

  getList(type) {
    return this._http.get(`https://localhost:3000/${type}`).toPromise();
  }

  getItem(id) {
    return this._http
      .get(`https://localhost:3000/item/${id}`)
      .toPromise();
  }
}
