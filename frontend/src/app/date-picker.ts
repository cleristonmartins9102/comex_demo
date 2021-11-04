import { Inject, Injectable, Optional } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material';   
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Moment } from 'moment';
import t, * as tx from 'moment-timezone'; 
import * as moment from 'moment';
moment.locale('pt-BR');

@Injectable()
export class MomentUtcDateAdapter extends MomentDateAdapter {

  constructor(@Optional() @Inject(MAT_DATE_LOCALE) dateLocale: string) {
    super(dateLocale);
  }

  createDate(year: number, month: number, date: number): Moment {
    // Moment.js will create an invalid date if any of the components are out of bounds, but we
    // explicitly check each case so we can throw more descriptive errors.
    if (month < 0 || month > 11) {
      throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
    }

    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }

    
    // let result = moment.parseZone(`${year}-01-${date}T00:00:00-03:00`);
        // let result = moment.parseZone({ year, month, date }).utcOffset('T00:00:00-03:00`');
        let result = t.tz({ year, month, date }, "America/Sao_Paulo");


        // let result = moment.utc({ year, month, date });

    // If the result isn't valid, the date must have been out of bounds for this month.
    if (!result.isValid()) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }
    return result;
  }
}