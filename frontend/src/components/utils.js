import moment from 'moment-timezone';
import FieldOptions from "./FieldOptions";

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

const check_field = (label, key) => {
  const options = FieldOptions();
  // console.log(Object.keys(options))
  if (!(Object.keys(options).includes(key))){
    console.log(label, key)
    return false 
  }
  var exists = false
  for (var i = 0; i < options[key].length; i++) {
    if (label.includes(options[key][i])){
      exists = true;
      break;
    }
  };
  return exists 
};


export function is_time_field(label){
  return check_field(label, 'TIMESTRING');
};

export function is_date_field(label){
  return check_field(label, 'DATETIMESTRING');
};

export function multiRowsField(label) {
  return check_field(label, 'MULTIROWS');
};

export function is_file_upload(label) {
  return check_field(label, 'FILEUPLOAD');
};

export function is_file_field(label) {
  return check_field(label, 'FILEFIELD');
};

export function is_file_sensor(label) {
  return check_field(label, 'FILESENSOR');
};





