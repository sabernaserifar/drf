import ParentCreate from "../Create";
import ParentDetail from "../Detail";
import ParentEdit from "../Edit";

import Load from "../Load";

export function Create () {
	const content_type = 'runs';

	// Note: the same order will be used to show forms 
	const fields = [
		['title', {fixed_value: '', required_view: true}],
		['description', {fixed_value: '', required_view: false}],
		['location', {fixed_value: '', required_view: true}],
		['start_time', {fixed_value: '', required_view: false}],
		['end_time', {fixed_value: '', required_view: false}],
	]

	const fields_map = new Map(fields);

	return ParentCreate(content_type, fields_map);
};


export function List () {
	const content_type = 'runs';
	const columns = ['id', 'title', 'location', 'start_time', 'end_time'];
	return Load(content_type, columns);
};


export function Detail () {
	const content_type = 'runs';
	const fields = [ 'title', 'description', 'location', 'updated', 'start_time', 'end_time'];
	const input_inventory = 'input_runs';
	const output_inventory = 'tags';
	const required_set = new Set(['title', 'location']); 

	let required_fields = [];
	fields.map((_, i) => {
		required_fields[i] = required_set.has(fields[i])? true : false;
	});

	return ParentDetail(content_type, fields, required_fields, input_inventory, output_inventory);
};


export function Edit () {
	const content_type = 'runs';
	const fields = [ 'title', 'description', 'location', 'start_time', 'end_time'];
	const required_set = new Set(['title', 'location']); 

	let required_fields = [];
	fields.map((_, i) => {
		required_fields[i] = required_set.has(fields[i])? true : false;
	});

	return ParentEdit(content_type, fields, required_fields);
};