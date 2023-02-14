import Load from "../Load";

export default function List () {
	const content_type = 'runs';
	const columns = ['id', 'title', 'location', 'start_time', 'end_time'];
	return Load(content_type, columns);
};