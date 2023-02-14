import Load from "../Load";

export default function List () {
	// Specify content_type and the columns you want to show  
	const content_type = 'inventories';
	const columns = ['id', 'title', 'quantity', 'unit', 'timestamp', 'content_type', 'content_object'];
	return Load(content_type, columns);
};

