import "./feed.css"
import Share from "../share/Share";
import Post from "../post/Post";
import {useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const instance = axios.create();
function Feed({username}) {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);
    

    useEffect(() => {
        const fetchPosts = async () => {
            username ? await instance.get("/posts/profile/"+username)
            .then((res) => {
                setPosts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }));  
            })
            .catch((error) => {
                if( error.response ){
                    console.log(error.response.data); // => the response payload 
                }
            })
            : await instance.get("posts/timeline/"+ user._id)
            .then((res) => {
                setPosts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }));
            })
            .catch((error) => {
                if( error.response ){
                    console.log(error.response.data); // => the response payload 
                }
            });
        };
        fetchPosts();
    },[username , user._id]);
    //console.log(Posts);
    return ( 
        <div className="feed">
            <div className="feedWrapper">
            { (!username || username === user.username) && <Share></Share>}
                {posts.map((p)=>(
                    <Post  key={p._id} post= {p}/>
                ))}
            </div>
        </div>
    );
}

export default Feed;
