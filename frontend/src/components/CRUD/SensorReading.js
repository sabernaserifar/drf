import ParentCreate from "../Create";
import ParentDetail from "../Detail";
import ParentEdit from "../Edit";
import ParentDelete from "../Delete";
import Load from "../Load";

// Specify the fields that you want to show 
// Note: same order will be used  
// fixed_value: the value will be fixed at the given one 
// required: if true it will be indicated that it is a required field
const settings = ({default_value='', changable=true, field_type='String', required_view=true, help_text=''} = {}) => {
	return {
		default_value: default_value, 
		changable: changable, 
		field_type: field_type, 
		required_view: required_view, 
		help_text: help_text,
	};
};

let fields = [
	['sensor_file', settings({help_text: 'Uplaod the sensor timeseries .CSV file'})], 
];  


// CRUD operations 

export function Create () {
	return ParentCreate(new Map(fields));
};

export function List () {
	
	return Load(new Map(fields), []);
};

export function Detail () {
	const children = [
		{name: 'input_operations', label: 'Input', base_route: 'input_operations'},
		{name: 'tags', label: 'Inventory', base_route: 'inventories'},
		{name: 'timeseries', label: 'Sensor Data', base_route: 'sensors_data'}
	]; 
	const parents = [];
	return ParentDetail(new Map(fields), children, parents);
};

export function Edit () {
	// To make a field unchangable provide a non-empty string for the fixed_value
	// For example to fix the title: fields[0][1].fixed_value = 'true';   
	return ParentEdit(new Map(fields));
};

export function Delete () {
	return ParentDelete();
};