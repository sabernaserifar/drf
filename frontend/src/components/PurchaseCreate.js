import {useState} from "react";

const PurchaseCreate = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    return (
        <div className='create'>
            <h1>Add Purchase</h1>
            <form>
                <label>Purchase Title:</label>
                <input type="text" required value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <label>Description</label>
                <textarea required value={desc} onChange={(e)=>setDesc(e.target.value)}></textarea>
                <button>Add Purchase</button>


            </form>
        </div>
    );
}

export default PurchaseCreate;