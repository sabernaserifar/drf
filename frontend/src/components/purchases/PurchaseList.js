import Load from "../Load";

export default function List () {
	// Specify content_type and the columns you want to show  
	const content_type = 'purchases';
	const columns = ['id', 'title', 'order_time', 'delivery_time'];
	return Load(content_type, columns);
};

