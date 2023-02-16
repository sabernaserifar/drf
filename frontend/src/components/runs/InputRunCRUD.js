import { useParams } from "react-router-dom";
import ParentCreate from "../Create";
import ParentDetail from "../Detail";
import ParentEdit from "../Edit";

import Load from "../Load";

export function Create () {
	const content_type = 'input_runs';
	const { parentID } = useParams();

	// Note: the same order will be used to show forms 
	const fields = [
		['run', {fixed_value: parentID, required_view: true}],
		['inventory', {fixed_value: '', required_view: true}],
		['amount', {fixed_value: '', required_view: true}],
	]

	const fields_map = new Map(fields);

	return ParentCreate(content_type, fields_map);

};


export function List () {
	const content_type = 'input_runs';
	const columns = ['id', 'run', 'inventory', 'amount'];
	return Load(content_type, columns);
};


export function Detail () {
	const content_type = 'runs';
	const fields = [ 'title', 'description', 'location', 'updated', 'start_time', 'end_time'];
	const input_inventory = ['input_run'];
	const output_inventory = ['tags'];
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