import {Grid} from '@mui/material';
import Posts from './post/Posts'
//components

import Banner from "../banner/Banner";
import Categories from "./Categories";

const Home = ()=>{

    return (
        <>
        <Banner/>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4} lg={2.5}>
                <Categories />
            </Grid>
            <Grid item xs={12} sm={8} lg={9.5}>
                <Posts />
            </Grid>
        </Grid>
        </>
    );
}

export default Home;