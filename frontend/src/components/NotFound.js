import { Link } from "react-router-dom";
import React from "react";

// Material UI 
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function NotFound() {
    return (
        <React.Fragment>
            <Container maxWidth="md" component="main">
                <Typography component="h1" variant="h5">
                    <h1>The page does not exist!</h1>
                    <p>Go back to
                        <Link Link to='/inventories/'> Inventory</Link>
                    </p>
				</Typography>
            </Container>
        </React.Fragment>
    );
};