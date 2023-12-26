import "./online.css"
function Online({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return ( 
        <div>
            <li className="rightbarFriend">
                <div className="rightbarProfileImgConatiner">
                    <img className="rightbarProfileImg" src={PF+user.profilePicture} alt="" />
                    <span className="rightbarOnline"></span>
                </div>
                <span className="rightbarUsername">{user.username}</span>
            </li>
        </div>
    );
}

export default Online;