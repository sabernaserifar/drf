import {useParams} from "react-router-dom";
import useFetch from "./useFetch";

const PurchaseDetail = () => {
    const { id } = useParams();
    const { data: purchase, isPending, error } = useFetch("/api/purchases/"+id, true)
    return (
        <div className="blog-details">
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { purchase && (
                <article>
                    <h2>{ purchase.title }</h2>
                    <p>Ordered at { purchase.order_time }</p>
                </article>
            )}
        </div>
    );
};

export default PurchaseDetail;
