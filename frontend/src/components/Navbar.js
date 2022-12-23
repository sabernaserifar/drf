import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>EPIC Database</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/purchases">Purchase</Link>

            </div>
        </nav>
    );
};

export default Navbar;

