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
let fields = [
    ['content_type', {fixed_value: '', required_view: true}],
    ['object_id', {fixed_value: '', required_view: false}],
	['title', {fixed_value: '', required_view: true}], 
    ['description', {fixed_value: '', required_view: false}],
	['quantity', {fixed_value: '', required_view: true}],
	['unit', {fixed_value: '', required_view: true}],
];  


// CRUD operations 

export function Create () {
    const {parent, parentID} = useParams();
	if (parent && parentID){
		fields[0][1].fixed_value = 'run';
        fields[1][1].fixed_value = parentID;

	};   
	return ParentCreate(new Map(fields));
};

export function List () {
	return Load(new Map(fields));
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