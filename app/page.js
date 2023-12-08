"use client"; 
import "./style.css";
import 'bootstrap/dist/css/bootstrap.css';
import { useCallback, useState } from "react";
import { getVideoData, getChannelData } from "../components/api";
import { Popup } from "../components/Popup";

export default function Home() {
  const [url, setUrl] = useState("");
  const [disable, setDisable] = useState(false);
  const [open, setOpen] = useState(false);
  const [money, setMoney] = useState(0);


  const getVideoId = async (url) => { 
    url = (url.split('/')).at(-1).split('?')
    if ("watch" == url[0]) {
      url = ((url.at(-1)).split("=")).at(-1)
    }
    else {
      url = url.at(0)
    }
    return url;
  }

  const getChannelID = async (videoId) => {
    const { data } = await getVideoData(videoId, 'snippet'); 
    if ( data && data.items && data.items.length > 0 ) {
        const items = data.items[0];
        return items.snippet['channelId'];
    }
    return null;
  }

  const getSubscriber = async (channelId) => { 
    const { data } = await getChannelData(channelId); 
    if ( data && data.items && data.items.length > 0 ) {
        const items = data.items[0];
        return items.statistics['subscriberCount'];
    } 
    return null;
  } 

  
  const getVideoInfo = async (videoId) => { 
    const { data } = await getVideoData(videoId, 'statistics'); 
    if ( data && data.items && data.items.length > 0 ) {
        const items = data.items[0]; 
        return items.statistics;
    } 
    // console.log(data);
    return null;
  } 

  const getEarning = (obj, subsCount) => {
    if (!subsCount || !obj.viewCount || !obj.likeCount || !obj.commentCount) {
      return null;
    }
    const money = Math.min(subsCount, obj.viewCount) + 5 * obj.likeCount + 10 * obj.commentCount;
    return money;
  }

  const handleSubmit = async () => {
    if (url === null || url.length === 0) {
      return
    }
    setDisable(true);
    const videoId = await getVideoId(url); 
    const channelId = await getChannelID(videoId);

    const subsCount = await getSubscriber(channelId);
    const videoInfo = await getVideoInfo(videoId);
    
    const money = getEarning(videoInfo, subsCount);
    setMoney(money);
    setOpen(true);
    setDisable(false);
  }

  const handleClose = () => { 
    setOpen(false);
    setUrl("")
  }

  return (
    <div id="mainBody" style={{background: "#000", height: "100vh", color: "#fff", position: "relative"}}> 
    {
      disable && (<div className="spinner"></div>)
    }
      
      <nav id="navbar">
        <div className="nav-wrapper">
          <div className="logo"> 
            <p className="logoName">anchors</p>
          </div>
        </div>
      </nav>
      <div className="center">
        <div id="headOne">
          <h2>Discover your earing</h2>
          <h2>potential</h2>
        </div>
        <div id="headTwo">
          <p>Turn your Youtube expertise into a lucrative income </p>
          <p>through resource sharing</p>
        </div>
        <div className="form" >
          <input type="url" className="" placeholder="&#f16a search" value={url} onChange={(e) => setUrl(e.target.value)} />
          <input type="submit" className="" value={"Submit"} onClick={handleSubmit} disabled={disable ? true : false} />
        </div>
      </div>
      {
        open && (
          <div className={"popupAlert"}>
            <Popup money={money} handleClose={handleClose} />
            <div id="cancel" onClick={handleClose}>Cancel</div>
          </div> 
        )
      }
      
    </div>

  );
}
