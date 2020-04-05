import { take, retry, catchError } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  private api = environment.api;


  /**
  * @remarks Service responsible for listing data from back-end;
  * @date 04/01/2020;
  * @param collection - The collection where date will come from;
  * @author Deivid Mafra.
  */
  getService(collection: string): Observable<any> {
    return this.http.get<any>(this.api + collection);
  }

  /**
  * @remarks Service responsible for creating data in the back-end;
  * @date 04/01/2020;
  * @param collection - The collection where date will be inserted from;
  * @param data - The date to be inserted in the collection;
  * @author Deivid Mafra.
  */
  postService(collection: string, data: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.api + collection, JSON.stringify(data), httpOptions);
  }

  /**
  * @remarks Service responsible for updating data in the back-end;
  * @date 04/01/2020;
  * @param collection - The collection where date will be updated;
  * @param data - The date to be updated in the collection;
  * @param id - The id of the date;
  * @author Deivid Mafra.
  */
  putService(collection: string, id: any, data: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.put(this.api + collection + '/' + id, JSON.stringify(data), httpOptions);
  }

  /**
   * @remarks Service responsible for deleting data in the back-end;
   * @date 04/01/2020;
   * @param collection - The collection where date will be deleted;
   * @param id - The id of the date;
   * @author Deivid Mafra.
   */
  deleteService(collection: string, id: any): Observable<any> {
    return this.http.delete(this.api + collection + '/' + id)
  }
}