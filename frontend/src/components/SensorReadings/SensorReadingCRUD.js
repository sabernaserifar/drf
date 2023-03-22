import ParentCreate from "../Create";
import ParentDetail from "../Detail";
import ParentEdit from "../Edit";
import ParentDelete from "../Delete";
import Load from "../Load";

// Specify the fields that you want to show 
// Note: same order will be used  
// fixed_value: the value will be fixed at the given one 
// required: if true it will be indicated that it is a required field


let fields = [
	['file', {fixed_value: '', required_view: true}], 
];  


// CRUD operations 

export function Create () {
	return ParentCreate(new Map(fields));
};

export function List () {
	

	return Load(new Map(fields));
};

export function Detail () {
	const children = [
		{name: 'input_operations', label: 'Input', base_route: 'input_operations'},
		{name: 'tags', label: 'Inventory', base_route: 'inventories'},
		{name: 'timeseries', label: 'Sensor Data', base_route: 'sensor_readings'}
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