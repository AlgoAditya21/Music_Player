import "./App.css"
import {useEffect, useState} from "react"
import Favorites from "./components/Favorites";
import Playlists from "./components/Playlists";



function App() {
  const [keywoard,setkeywoard]=useState("")
  const [isLoading,setIsLoading]=useState(false)
  const [tracks,setTracks]=useState([])
  const getTracks=async()=>{
    setIsLoading(true)
    let data=await fetch(`https://v1.nocodeapi.com/adityaraj/spotify/HGviowJtGMjmkcds/search?q=${keywoard===""?"trending":keywoard}&type=track`)
    let convertedData=await data.json()
    setTracks(convertedData.tracks.items)
    setIsLoading(false)
  }

  // Favorites state to local mai daala hai maine
  const[favorites,setFavorites]=useState(()=>{
    return JSON.parse(localStorage.getItem("favorites")) || [];
  })
  useEffect(()=>{
    localStorage.setItem("favorites",JSON.stringify(favorites));
  },[favorites]);
  const addToFavorites=(track)=>{
    if(!favorites.some((song)=>song.id===track.id)){
      setFavorites([...favorites,track])
    }
  }
  const removeFavorites=(id)=>{
    setFavorites(favorites.filter((song)=>song.id!==id));
  }

  //playlist
  const[playlists,setPlaylists]=useState(()=>{
    return JSON.parse(localStorage.getItem("playlists")) || {};
  });
  useEffect(()=>{
    localStorage.setItem("playlists",JSON.stringify(playlists));
  },[playlists]);
  const addToPlaylist=(name)=>{
    if(!playlists[name]){
      setPlaylists({ ...playlists,[name]:[]});
    }
  };
  const addSongToPlaylist=(name,track)=>{
    if (!playlists[name]?.some((song)=>song.id===track.id)){
      setPlaylists({
        ...playlists,
        [name]:[...(playlists[name] || []),track],
      });
    }
  };
  const removePlaylist=(name)=>{
    const updated={...playlists};
    delete updated[name];
    setPlaylists(updated);
  };



  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container-fluid">
      <a className="navbar-brand" href="#">Parth-ify</a>
      <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
          <input value={keywoard} onChange={(event)=>{setkeywoard(event.target.value)}} className="form-control me-2 w-75" type="search"placeholder="Search" aria-label="Search"/>
        <button onClick={getTracks} className="btn btn-outline-success">Search</button>
    </div>
  </div>
      </nav>
      <div className="container">
        <div className={`row ${isLoading ? "":"d-none"}`}>
          <div className="col-12 py-5 text-center">
          <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
          <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div className={`row ${keywoard==="" ? "" :"d-none"}`}>
          <div className="col-12 py-5 text-center">
          <h1>parth-ify</h1>
          </div>
        </div>
        <div className="row">
          {
            tracks.map((ele)=>{
              return <div key={ele.id} className="col-lg-3 col-md-6 py-2">
                <div className="card">
                    <img src={ele.album.images[0].url} className="card-img-top" alt="..."/>
                  <div className="card-body">
                      <h5 className="card-title">{ele.name}</h5>
                      <p className="card-text">Artist:{ele.album.artists[0].name}</p>
                      <p className="cars-text">Release date: {ele.album.release_date}</p>
                      <audio src={ele.preview_url} controls style={{width:'100%'}}></audio>

                      {/* like and add playlist button */}
                      <button onClick={()=>addToFavorites(ele)} className="btn btn-outline-danger btn-sm mt-2 me-2">❤️ LIKE</button>
                      <button onClick={()=>{const name=prompt("Enter playlist name:");if (name)addSongToPlaylist(name,ele);}} className="btn btn-outline-primary btn-sm mt-2">➕ Add to Playlist</button>
                      </div>
                  </div>
              </div>
            })
          }
        </div>
       </div>

       <Favorites favorites={favorites} removeFavorites={removeFavorites}/>
       <Playlists playlists={playlists} addSongToPlaylist={addToPlaylist} removePlaylist={removePlaylist}/>
    </>
  )
}
export default App
