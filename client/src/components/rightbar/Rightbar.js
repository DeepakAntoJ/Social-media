import "./rightbar.css"
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext,useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Remove from '@mui/icons-material/Remove';
import Add from '@mui/icons-material/Add';


function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(
    currentUser.following.includes(user?.id)
    );

    
    
    useEffect(() => {
        const getFriends = async () => {
        try {
            if (user && user._id) {
            await axios.get("/users/friends/" + user._id)
            .then((friendList) => {
                setFriends(friendList.data);
            })
            .catch((error) => {
                console.log(error);
            }) 
        }   
        } catch (error) {
            console.log(error);
        }
        };
        getFriends();
    }, [user]);

    const handleClick = async () => {
        try {
        if (followed) {
            await axios.put("/users/" + user._id + "/unfollow", {
            userId: currentUser._id,
            })
            .then(() => {
                dispatch({ type: "UNFOLLOW", payload: user._id });
            })
            .catch((error) => {
                    console.log(error); // => the response payload 
                
            })
            
        } else {
            await axios.put("/users/" + user._id + "/follow", {
            userId: currentUser._id,
            })
            .then(() => {
                dispatch({ type: "FOLLOW", payload: user._id });
            })
            .catch((error) => {
                console.log(error);
            })  
        }
        
        } catch (err) {
        }
        setFollowed(!followed);
    };

    const HomeRightbar = () => {
    return (
        <>
            <div className="birthdayContainer">
            <img className="birthdayImg" src="assests/4/gift.jpeg" alt="" />
            <span className="birthdayText">
                <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
            </span>
            </div>
            <img className="rightbarAd" src="assests/3/download.png" alt="" />
            <h4 className="rightbarTitle">Online Friends</h4>
            <ul className="rightbarFriendList">
            {Users.map((u) => (
                <Online key={u.id} user={u} />
            ))}
            </ul>
        </>
    );
    };

    const ProfileRightbar = () => {

    return (
        <>
            {user.username !== currentUser.username && (
            <button className="rightbarFollowButton" 
            onClick={handleClick}
            >
                {followed ? "Unfollow" : "Follow"}
                {followed ? <Remove /> : <Add />}
                
            </button>
            )}
            <h4 className="rightbarTitle">User information</h4>
            <div className="rightbarInfo">
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">City:</span>
                <span className="rightbarInfoValue">{user.city}</span>
            </div>
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">From:</span>
                <span className="rightbarInfoValue">{user.from}</span>
            </div>
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Relationship:</span>
                <span className="rightbarInfoValue">{user.relationship}</span>
            </div>
            </div>
            <h4 className="rightbarTitle">User friends</h4>

            <div className="rightbarFollowings">
                {friends.map((friend , i ) => (

                    <div key={friend.id}>  
                    <Link
                        to={"/profile/" + friend.username}
                        style={{ textDecoration: "none" }}
                        key={friend.id}
                            >
                        <div className="rightbarFollowing" key={friend.id}>
                            <img
                            src={
                                friend.profilePicture
                                ? PF + friend.profilePicture
                                : PF + "1/no-avatar.jpeg"
                            }
                            alt=""
                            className="rightbarFollowingImg"
                            key={friend.id}
                            />
                            <span className="rightbarFollowingName" key={friend.id}>{friend.username}</span>
                        </div>
                </Link>
                </div>
            ))}
            </div>
        </>
    );
    };

    return ( 
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    );
}

export default Rightbar;