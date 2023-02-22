import moment from 'moment-timezone';
import * as Constants from "./DefaultParams";
import ParentShortDetail from "./ShortDetail";


export function convert_tz(time_object, timezone) {
    return moment.tz(time_object.format('YYYY-MM-DDTHH:mm'), timezone).format();
};

export function sanitizer(word) {
    var i, frags = word.split('_');
    for (i=0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
};

export function multiRowsField(label) {
  var is_required = false
  for (var i = 0; i < Constants.MULTIROWS.length; i++) {
    if (label.includes(Constants.MULTIROWS[i])){
      is_required = true;
      break;
    }
  };
  return is_required;
};

