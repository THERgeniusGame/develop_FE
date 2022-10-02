import React, { useEffect } from "react";
import Loadingimg from "../shared/image/Loading.png";
import MainBackground from "../shared/image/MainIMG/MainBackground.png";

const NotFound = () => {
    
    useEffect(() => {
        window.location.replace("/login")
      }, [])
      
    return (
        <div style={{ paddingLeft: "270px", paddingRight: "270px" }}>
            <div style={{ width: "1440px", height: "1024px", display: "flex", backgroundImage: 'url(' + MainBackground + ')', backgroundPosition: "center", backgroundSize: "cover" }}>
              <div style={{ width: "250px", height: "350px", backgroundImage: 'url(' + Loadingimg + ')', backgroundPosition: "center", backgroundSize: "cover", margin: "auto", display: "flex", justifyContent: "center", alignItems: "center" }} />
            </div>
          </div>
    )
}

export default NotFound;