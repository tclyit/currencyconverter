/*
 * Angular 2 decorators and services
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { ExchangeRateApi, IRate } from '../shared/shared';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'converter',
  styleUrls: ['./converter.component.scss'],
  templateUrl: './converter.component.html'
})
export class CurrencyConverter implements OnInit {

  private rate: IRate;
  private rateForm: FormGroup;

  // Create mock data for currency symbol
  // which this can grap from DB if needed
  private symbols: string[] = ['CAD', 'USD', 'EUR'];
  
  constructor(
    private exchangeRateApi: ExchangeRateApi,
    private formBuilder: FormBuilder) {
      this.validateRateForm();
    }

  /*
  * Require form to have a validation in this case at least
  * from rate input box and will put more if required by business rules
  */
  validateRateForm() {
    this.rateForm = this.formBuilder.group({
      'fromValue': this.formBuilder.control(null, Validators.compose([Validators.required, this.invalidNumber])),
      'toValue': '',
      'fromName': '',
      'toName': ''
    });
  }

  /*
  * Validate against invalid number
  * which allow only number and 2 decimal places
  * @param {FormControl} control - input control in the form which represents currency to convert
  */
  invalidNumber(control: FormControl) {
    const pattern: RegExp = /^[0-9]+(|\.[0-9]{1,2})?$/; 
    if(control.value && !pattern.test(control.value)) {
      return { 'invalidNumber' : true };
    }
    return null;
  }

  ngOnInit() {
    // initialize model
    this.rate = {
      'fromValue': null,
      'toValue': null,
      'fromName': 'CAD',
      'toName': 'USD'
    };
  }

  /*
  * Handle user input currency value into the from rate value
  * also when user select any currency name from dropdown list
  */
  exchangeRage(isValidForm: boolean) {
    let d: IRate = <IRate>this.rateForm.value;
    // some rules required here 
    // will put more while needed
    if(!isValidForm || d.fromValue === null || d.fromName === '' || d.toName === '') return false;
    if(d.fromName === d.toName) {
      this.rate.toValue = d.fromValue;
      return false;
    }

    // the exchange rate can be updated at any time
    // then this service need to call all the time user performs
    this.exchangeRateApi.getExchangeRate(d.fromName, d.toName).subscribe(data => {
      this.calculateRate(d.fromValue, d.toName, data);
    });
  }

  /*
  * Handle simple calculation rate value and update 'rate' model
  * Note: the return value will round up with toFixed method and will need
  * to modify up on rules
  * @param {number} fromValue - value number to convert to
  * @param {string} toName - the base currency name which need to convert to 
  * @param {string} toName - the base currency name which need to convert to 
  */
  calculateRate(fromValue: number, toName: string, resultRate: any) {
    let d: any = resultRate.rates;
    // in absolute case this rate value 'd[toName]' 
    // must force to parse to float if not promised by rest api result
    let n: number = fromValue * d[toName];
    this.rate.toValue = Number(n.toFixed(2));
  }
}