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

let fields = [['time', settings()]]; 

//  Add this if you want to filter 
let filter_fields = [
	['date_min', settings()],
	['date_max', settings()],
	['sensor', settings({default_value: [], help_text: 'Provide labes of Sensors (comma separated)'})],
]


export function List () {
	fields.map((value, i) => {
		fields[i][1].changable = true;
	});

	return Load(new Map(fields), new Map(filter_fields));
};

