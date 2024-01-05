import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cloneDeep, forIn, isObject } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService {
  protected toHttpParams(obj: object, options: object = {}): HttpParams {
    let params = new HttpParams();
    for (const [key, val] of Object.entries(obj)) {
      if (Array.isArray(val)) {
        val.forEach(criteria => {
          params = params.append(key, criteria.toString());
        });
      } else if (val !== null && val !== undefined && val !== '') {
        params = params.append(key, val.toString());
      }
    }
    return params;
  }

  protected toHttpBody(obj: object, options: object = {}): object {
    const _obj = cloneDeep(obj);
    omitDeep(_obj);
    return _obj;
  }
}

function omitDeep(obj) {
  forIn(obj, (value, key) => {
    if (isObject(value)) {
      omitDeep(value);
    } else if ([null, undefined].includes(value)) {
      delete obj[key];
    }
  });
}
