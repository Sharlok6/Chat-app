import React from "react";
import './InfoBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark,faUser } from '@fortawesome/free-solid-svg-icons';

const InfoBar=({ room })=>(
        <div className="infoBar">
            <div className="leftInnerContainer">
                <FontAwesomeIcon className="onlineIcon" icon={faUser} />
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
            <FontAwesomeIcon className="closeIcon" icon={faCircleXmark} />
            </div>
        </div>
)

export default InfoBar;