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
	['name', settings({help_text: 'E.g. Company ABC'})], 
	['email', settings()], 
	['phone', settings()],
	['address', settings({required_view: false})],
	['supp_kvp', settings({default_value: '{}', field_type: 'JSON', help_text: 'E.g. {"Active" : true, "Size": 100}'})],
]; 

// CRUD  

export function Create () {
	const exclude = [];
	const include_fields = fields.filter(field => !exclude.includes(field[0]));
	return ParentCreate(new Map(include_fields));
};

export function List () {
	// exclude the following fields
	const exclude = ['supp_kvp'];
	const include_fields = fields.filter(field => !exclude.includes(field[0]));	
	return Load(new Map(include_fields), []);
};

export function Detail () {
	const exclude = [];
	let include_fields = fields.filter(field => !exclude.includes(field[0]));

	include_fields.map((_, i)=>{
		include_fields[i][1].changable = false;
	});

	const children = []; 

	const parents = [];
	return ParentDetail(new Map(include_fields), children, parents);
};

export function Edit () {
	const exclude = [];
	const include_fields = fields.filter(field => !exclude.includes(field[0]));
	// To make a field unchangable provide a non-empty string for the fixed_value
	// For example to fix the title: fields[0][1].fixed_value = 'true';   
	return ParentEdit(new Map(include_fields));
};

export function Delete () {
	return ParentDelete();
};