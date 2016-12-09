import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { CONFIG } from './setting';

export interface IRate {
    fromValue: number;
    toValue: number;
    fromName: string;
    toName: string;
}

@Injectable()
export class ExchangeRateApi {
    // exchange rate rest service from http://fixer.io/
    private baseUrl: string = CONFIG.baseUrl;

    constructor(private http: Http){}

    /**
    * Rest service handles request rate change specifically by currency name
    * In this case data will return only what argument provided:
    * @param {string} baseRateName - the base parameter for the currency quote 
    * @param {string} toRateName - the string parameter name for which currency needs to convert to
    * @return {object} response - the response data from rest api called which object contains rates properties 
    */
    getExchangeRate(baseRateName: string, toRateName: string) {
        return this.http.get(`${this.baseUrl}?base=${baseRateName}&symbols=${toRateName}`)
                    .map((response: Response) => response.json())
                    .catch(this.catchBadResponse);
    }

    /**
    * To avoid calling REST service each time user convert currency
    * then this REST api can handle it by grapping all rating currency value
    */
    getAllExchangeRate() {
        return this.http.get(`${this.baseUrl}`)
                    .map((response: Response) => response.json())
                    .catch(this.catchBadResponse);
    }

    /**
     * Error catching handle for Observable
     * This can be create as a directive for Injectable
     */
    catchBadResponse: (errorResponse: any) => Observable<any> = (errorResponse: any) => {
        let res = <Response>errorResponse;
        let err = res.json();
        let emsg = err ?
        (err.error ? err.error : JSON.stringify(err)) :
        (res.statusText || 'unknown error');
        //return Observable.throw(emsg); // TODO: We really should NOT swallow error here.
        return Observable.of();
    }
}