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
	['operation_type', settings({help_text: 'A valid operation label (e.g. RUN or Test)'})], 
	['equipment', settings({help_text: 'A valid equipment label (string)'})], 
	['description', settings({required_view: false})],
	['location', settings()],
	['start_time', settings({field_type: 'timestamp'})],
	['end_time', settings({field_type: 'timestamp'})],
	['supp_kvp', settings({default_value: '{}', field_type: 'JSON', help_text: 'E.g. {"Completed" : true, "Temperature": 100.5}'})],
	['supp_file', settings({help_text: 'File ID in FileUpload table'})],
	['upload_file', settings({field_type: 'file', help_text: 'Upload any supplementary file'})],
]; 

// CRUD operations 

export function Create () {
	const exclude = ['supp_file'];
	const include_fields = fields.filter(field => !exclude.includes(field[0]));
	return ParentCreate(new Map(include_fields));
};

export function List () {
	// exclude the following fields
	const exclude = ['supp_kvp', 'supp_file', 'upload_file'];
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
			name: 'input_operations', 
			label: 'Input', 
			base_route: 'input_operations', 
			columns: ['id', 'operation', 'inventory', 'quantity'] 
		},
		{
			name: 'tags', 
			label: 'Inventory', 
			base_route: 'inventories',
			columns : ['id', 'title', 'quantity', 'unit'],		
		},
		{
			name: 'sensor_operation', 
			label: 'SensorFileUpload', 
			base_route: 'sensors_data',
			columns : ['id', 'fileupload.file_url'],
		}
	]; 

	const parents = [];
	return ParentDetail(new Map(include_fields), children, parents);
};

export function Edit () {
	const exclude = [];
	const include_fields = fields.filter(field => !exclude.includes(field[0]));
	fields[9][1].help_text = 'Replaces the current file'
	// To make a field unchangable provide a non-empty string for the fixed_value
	// For example to fix the title: fields[0][1].fixed_value = 'true';   
	return ParentEdit(new Map(include_fields));
};

export function Delete () {
	return ParentDelete();
};