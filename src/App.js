import "./App.css";
import { useContext, useEffect, useState } from "react";
import Card from "./components/Card";
import CreatePlaylist from "./components/CreatePlaylist";
import { initializePlaylist } from "./initialize";
import Navbar from "./components/Navbar";
import { MusicContext } from "./Context";

function App() {
  const [keyword,setKeyword]=useState("");
  const [message,setMessage]=useState("");
  const [tracks,setTracks]=useState([]);
  const [token,setToken]=useState(null);

  const musicContext=useContext(MusicContext);
  const isLoading=musicContext.isLoading;
  const setIsLoading=musicContext.setIsLoading;
  const setLikedMusic =musicContext.setLikedMusic;
  const setpinnedMusic =musicContext.setPinnedMusic;
  const resultOffset =musicContext.resultOffset;
  const setResultOffset= musicContext.setResultOffset;

  const fetchMusicData=async()=>{
    setTracks([]);
    window.scrollTo(0,0);
    setIsLoading(true);
    try{
      const response=await fetch(
        `https://v1.nocodeapi.com/adityaraj/spotify/HGviowJtGMjmkcds/search?q=${keyword==="" ? "trending":keyword}&type=track&offset=${resultOffset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(!response.ok){
        throw new Error("Failed to fetch music data");
      }
      const jsonData=await response.json();
      setTracks(jsonData.tracks.items);
    }catch(error){
      setMessage(error.message);
    }finally{
      setIsLoading(false);
    }
  };
  const fetchRandomTracks=async(accessToken)=>{
    const searchTerms=["love","chill","night","happy"];
    const randomTerm=searchTerms[Math.floor(Math.random()*searchTerms.length)];

    setIsLoading(true);
    try{
      const response=await fetch(
        `https://v1.nocodeapi.com/adityaraj/spotify/HGviowJtGMjmkcds/search?q=${randomTerm}&type=track&limit=12`,
        {
          headers:{
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const jsonData=await response.json();
      setTracks(jsonData.tracks.items);
    }catch(err){
      setMessage(err.message);
    }finally{
      setIsLoading(false);
    }
  };

  const handleKeyPress=(event)=>{
    if(event.key==="Enter") {
      setResultOffset(0);
      fetchMusicData();
    }
  };

  useEffect(()=>{
    initializePlaylist();
    const fetchToken=async()=>{
      try{
        const response=await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body:
            "grant_type=client_credentials&client_id=a77073181b7d48eb90003e3bb94ff88a&client_secret=68790982a0554d1a83427e061e371507",
        });
        if(!response.ok){
          throw new Error("Failed to fetch token");
        }
        const jsonData=await response.json();
        setToken(jsonData.access_token);
        fetchRandomTracks(jsonData.access_token);
      }catch(error){
        setMessage(error.message);
      }finally{
        setIsLoading(false);
      }
    };
    fetchToken();
    setLikedMusic(JSON.parse(localStorage.getItem("likedMusic")));
    setpinnedMusic(JSON.parse(localStorage.getItem("pinnedMusic")));
  },[setIsLoading, setLikedMusic, setpinnedMusic]);

  return (
    <>
      <Navbar keyword={keyword} setKeyword={setKeyword} handleKeyPress={handleKeyPress} fetchMusicData={fetchMusicData}/>
      <div className="container">
        <div className={`row ${isLoading ? "" : "d-none"}`}>
          <div className="col-12 py-5 text-center">
            <div className="spinner-border" style={{ width: "3rem", height: "3rem" }}role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>

        <div className="row">
          {tracks.map((element) => {
            return <Card key={element.id} element={element} />;
          })}
        </div>
        <div className="row" hidden={tracks.length===0}>
          <div className="col">
            <button onClick={() => {setResultOffset((previous) => previous - 20);fetchMusicData();}} className="btn btn-outline-success w-100"disabled={resultOffset===0}>
              Previous Next Page: {resultOffset / 20}
            </button>
          </div>
          <div className="col">
            <button onClick={() => {setResultOffset((previous) => previous + 20);fetchMusicData();}}className="btn btn-outline-success w-100">Next Page:{resultOffset/20+2}
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h4 className="text-center text-danger py-2">{message}</h4>
          </div>
        </div>
      </div>
      <div className="modal fade position-absolute" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <CreatePlaylist />
      </div>
            <footer style={{ marginTop: "40px", padding: "16px 0",textAlign:"center",fontSize: "1.15rem",color: "#7c4dff",letterSpacing:"0.08em",fontWeight:600,opacity:0.9}}>
        Made with <span style={{color: "#ff4081", fontSize: "1.3em"}}>♥</span> by <span style={{color: "#40c9ff"}}>AlgoAditya</span>
      </footer>
    </>
  );
}

export default App;
