import Create from "../Create";

export default function RunCreate () {
	const content_type = 'runs';
	const fields = [ 'title', 'Description', 'location', 'start_time', 'end_time'];
	const required_set = new Set(['title', 'location']); 

	let required_fields = [];
	fields.map((_, i) => {
		required_fields[i] = required_set.has(fields[i])? true : false;
	});

	return Create(content_type, fields, required_fields);
};
