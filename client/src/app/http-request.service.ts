import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { Request } from "./request";
import { CONFIG } from "../config/config";
@Injectable()
export class HttpRequestService {
  setHeader(isOptions: any): any {
    let userInfo = JSON.parse(localStorage.getItem("user"));
    if(userInfo) {
      if(userInfo.data) {
        let getToken = userInfo.data.token;
        console.log(getToken)
        let _headers = new Headers({ "x-token":  getToken});
        let options = new RequestOptions({headers: _headers});
        if(isOptions) {
          return options;
        } else {
          return _headers;
        }
      }
    }
  }
  constructor(private _http: Http, private _router: Router) { }

  get(url: string): Observable<Request> {
    let doRequest = this._http.get(CONFIG.baseUrl() + url, this.setHeader(true)).map(this.parseData).catch(this.handleError);
    return doRequest;
  }
  put(url: string, params: Object): Observable<Request> {
    let doRequest = this._http.put(CONFIG.baseUrl() + url, params, this.setHeader(false)).map(this.parseData).catch(this.handleError);
    return doRequest;
  }
  post(url: string, params: Object): Observable<Request> {
    let doRequest = this._http.post(CONFIG.baseUrl() + url, params, this.setHeader(false)).map(this.parseData).catch(this.handleError);
    return doRequest;
  }
  delete(url: string): Observable<Request> {
    let doRequest = this._http.delete(CONFIG.baseUrl() + url, this.setHeader(false)).map(this.parseData).catch(this.handleError);
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
        if(error.status === 401) {
          location.href = "/";
          localStorage.removeItem("user");
        }
        return Observable.throw(errMsg);
    }

}
