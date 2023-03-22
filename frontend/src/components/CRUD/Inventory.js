import ParentCreate from "../Create";
import ParentDetail from "../Detail";
import ParentEdit from "../Edit";
import ParentDelete from "../Delete";
import Load from "../Load";
import { useParams } from "react-router-dom";

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
	['content_type', settings({help_text: 'Source type name'})], 
	['object_id', settings({help_text: 'Source ID'})], 
	['title', settings()],
	['description', settings({required_view: false})],
	['quantity', settings({help_text: 'Amount of material (e.g. 150.76)'})],
	['unit', settings()],
	['price', settings()]
]; 

//  Add this if you want to filter 
let filter_fields = [
	['id', settings({help_text: 'Match this exact id'})],
	['content_type', settings({help_text: 'Content type includes ...'})],
	['title', settings({help_text: 'Title includes ...'})],
	['quantity', settings({help_text: 'Search within %5 of this value ...'})],
	['unit', settings({help_text: 'Unit includes ...'})],
	['date_min', settings()],
	['date_max', settings()],
]

const model_url_mapping = {
	'operations': 'operation',
	'purchases': 'purchase'
}


// CRUD operations 
export function Create () {
    const {parent, parentID} = useParams();
	// Change this based on the parent name 
	if (parent && parentID){
		fields[0][1].default_value = model_url_mapping[parent];
		fields[0][1].changable = false;
        fields[1][1].default_value = parentID;
		fields[1][1].changable = false;
	};   
	return ParentCreate(new Map(fields));
};

export function List () {
	fields.map((value, i) => {
		fields[i][1].changable = true;
	});

	return Load(new Map(fields), new Map(filter_fields));
};

export function Detail () {
	const children = []; 
	const parents = [];
	return ParentDetail(new Map(fields), children, parents);
};

export function Edit () {
	// To make a field unchangable provide a non-empty string for the fixed_value
	// For example to fix the title: fields[0][1].fixed_value = 'true';  
	const {parentID, parent} = useParams();
	if (parent && parentID){
		fields[0][1].fixed_value = parent;
		fields[1][1].fixed_value = parentID;
	}; 
	return ParentEdit(new Map(fields));
};

export function Delete () {
	return ParentDelete();
};