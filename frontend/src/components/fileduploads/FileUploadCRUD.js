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
	['file_url', settings({changable:false, help_text: 'File location'})], 
	['upload_file', settings({help_text: 'Upload a file'})], 
	['timestamp', settings({changable:false, help_text: 'Upload time'})],
]; 

// CRUD operations 

export function Create () {
	const exclude = ['timestamp', 'file_url'];
	const include_fields = fields.filter(field => !exclude.includes(field[0]));
	return ParentCreate(new Map(include_fields));
};

export function List () {
	// exclude the following fields
	const exclude = ['upload_file'];
	const include_fields = fields.filter(field => !exclude.includes(field[0]));
	return Load(new Map(include_fields));
};

export function Detail () {
	const exclude = ['upload_file'];
	let include_fields = fields.filter(field => !exclude.includes(field[0]));

	const children = []; 
	const parents = [];
	return ParentDetail(new Map(include_fields), children, parents);
};

export function Edit () {

	fields[1][1].help_text = 'Upload a file to replace the above file'

	const exclude = ['timestamp'];
	const include_fields = fields.filter(field => !exclude.includes(field[0]));

	// To make a field unchangable provide a non-empty string for the fixed_value
	// For example to fix the title: fields[0][1].fixed_value = 'true';   
	return ParentEdit(new Map(include_fields));
};

export function Delete () {
	return ParentDelete();
};