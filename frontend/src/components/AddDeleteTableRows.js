import { useState } from 'react';
import TableRows from "./TableRows";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';




function AddDeleteTableRows(){
    const [rowsData, setRowsData] = useState([]);
 
    const addTableRows = ()=>{
        const rowsInput={
            key:'',
            value:'',
        } 
        setRowsData([...rowsData, rowsInput])  
    }; 

    const deleteTableRows = (index)=>{
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
    }
 
    const handleChange = (index, evnt)=>{
            const { name, value } = evnt.target;
            const rowsInput = [...rowsData];
            rowsInput[index][name] = value;
            setRowsData(rowsInput);
    }

    console.log(rowsData,  setRowsData)
    
    return(
        <TableContainer component={Paper} key={'TEsting'}>
                   <div className="container">
            <div className="row">
                <div className="col-sm-8">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Key</th>
                            <th>Value</th>
                            <th><button className="btn btn-outline-success" onClick={addTableRows} >+</button></th>
                        </tr>
                        </thead>
                    <tbody>
                        <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
                    </tbody> 
                    </table>
                </div>
                <div className="col-sm-4"></div>
            </div>
        </div>



        </TableContainer>
 
    )

}
export default AddDeleteTableRows