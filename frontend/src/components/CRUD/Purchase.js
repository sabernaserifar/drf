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
	['title', settings()], 
	['description', settings({required_view: false})],
	['vendor', settings({help_text: 'E.g. "Company ABC"'})],
	['order_number', settings({required_view: false, help_text: 'E.g. "23HF9081ABC"'})],
	['price', settings({help_text: 'The overall cost of the purchase'})],
	['order_time', settings({required_view: false, field_type: 'timestamp'})],
	['delivery_time', settings({required_view: false, field_type: 'timestamp'})],
	['supp_file', settings({help_text: 'File ID in FileUpload table'})],
	['upload_file', settings({field_type: 'file', help_text: 'Upload any supplementary file'})],
]; 

// CRUD  

export function Create () {
	const exclude = ['supp_file'];
	const include_fields = fields.filter(field => !exclude.includes(field[0]));
	return ParentCreate(new Map(include_fields));
};

export function List () {
	// exclude the following fields
	const exclude = ['supp_file', 'upload_file'];
	const include_fields = fields.filter(field => !exclude.includes(field[0]));	
	return Load(new Map(include_fields), []);
};

export function Detail () {
	const exclude = ['upload_file'];
	let include_fields = fields.filter(field => !exclude.includes(field[0]));

	include_fields.map((_, i)=>{
		include_fields[i][1].changable = false;
	});

	const children = [
		{
			name: 'tags', 
			label: 'Inventory', 
			base_route: 'inventories',
			columns : ['id', 'title', 'quantity', 'unit', 'price'],		
		},
	]; 

	const parents = [];
	return ParentDetail(new Map(include_fields), children, parents);
};

export function Edit () {
	const exclude = [];
	const include_fields = fields.filter(field => !exclude.includes(field[0]));
	fields[8][1].help_text = 'Replaces the current file'
	// To make a field unchangable provide a non-empty string for the fixed_value
	// For example to fix the title: fields[0][1].fixed_value = 'true';   
	return ParentEdit(new Map(include_fields));
};

export function Delete () {
	return ParentDelete();
};