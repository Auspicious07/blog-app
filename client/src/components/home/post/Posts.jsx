import {useEffect, useState} from 'react';
import {API} from '../../../service/api';
import { Box, Grid } from '@mui/material';
import {useSearchParams, Link} from 'react-router-dom';
import Post from './Post';

const Posts =()=>{

    const [posts, setPosts]=useState([]);
    const [searchParams]= useSearchParams();

    const category=searchParams.get('category');

    useEffect(()=>{
        const fetchData= async ()=>{
            let response=await API.getAllPosts({category:category || ''});
            if(response.isSuccess){
                setPosts(response.data);
            }
        }
        fetchData();
    },[category])

    // return(
    //     <>
    //         {
    //             posts && posts.length > 0 ? posts.map(post=>(
    //                 <Grid2 item lg={3} xs={4} sm={3}>
    //                     <Link to={`details/${post._id}`} style={{textDecoration:'none', color:'inherit'}}>
    //                         <Post post={post} />
    //                     </Link>
    //                 </Grid2>
    //             )) : <Box style={{color:'#878787', margin:'30px 80px', fontSize:'18px'}}>
    //                 No Data Available to Display
    //                 </Box>
    //         }
    //     </>
    // )
    return (
        <Grid container spacing={2}>
            {posts && posts.length > 0 ? (
                posts.map((post) => (
                    <Grid item lg={6} xs={12} sm={6} key={post._id}>
                        <Link
                            to={`details/${post._id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <Post post={post} />
                        </Link>
                    </Grid>
                ))
            ) : (
                <Box
                    sx={{
                        color: '#878787',
                        margin: '30px 80px',
                        fontSize: '18px',
                        textAlign: 'center',
                        width: '100%',
                    }}
                >
                    No Data Available to Display
                </Box>
            )}
        </Grid>
    );
}

export default Posts;
