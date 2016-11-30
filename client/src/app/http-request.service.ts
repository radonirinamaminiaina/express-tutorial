import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Request } from "./request";
@Injectable()
export class HttpRequestService {

  constructor(private _http: Http) { }

  get(url: string): Observable<Request> {
    let doRequest = this._http.get(url).map(this.parseData).catch(this.handleError);
    return doRequest;
  }
  /**
     * parseData
     * 
     * parse the returned data
     * 
     * @params res {object}, response
     * @return {object} parsed response
     */
    parseData(res:any):void {
        let response = res.json();
        return response;
    }
    
    /**
     * handleError
     * 
     * Handle error if it occurs
     * 
     * @params error {object}, type of error
     * @return {Observable}, throw new error
     */
    handleError(error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.url}: ${error.status} - ${error.statusText}` : 'Server error';
        let parseBody = JSON.parse(error._body)
        
        return Observable.throw(errMsg);
    }

}
