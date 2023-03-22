const FieldOptions = () => {
    return( 
        {
            'TIMESTRING': ['time'],
            'DATETIMESTRING': ['date'],
            'FILEUPLOAD': ['upload_file'],
            'FILESENSOR': ['sensor_file'],
            'FILEFIELD': ['file'],
            'MULTIROWS': ['description', 'Description', 'result_kvp'],
        }
    )
};

export default FieldOptions;
