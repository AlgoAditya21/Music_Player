import React,{useState} from 'react';

const Playlists=({playlists,addToPlaylist,removePlaylist})=>{
    const[newPlaylist,setNewplaylist]=useState("");
    const handleCreate=()=>{
        if(newPlaylist.trim()!==""){
            addToPlaylist(newPlaylist.trim());
            setNewplaylist("");
        }
    }
    return (
        <div className="container mt-5">
            <h3>Custom Playlists</h3>
            <div className="input-group mb-3">
                <input value={newPlaylist} onChange={(e)=>setNewplaylist(e.target.value)} type="text" className="form-control" placeholder='Create new playlist'/>
                <button onClick={handleCreate} className="btn btn-success">Create</button>
            </div>
            {Object.keys(playlists).length===0 && <p>No playlists created.</p>}
            {Object.entries(playlists).map(([playlistName,song])=>(
                <div key={playlistName}>
                    <h5>{playlistName}
                    <button onClick={()=>removePlaylist(playlistName)} className="btn btn-sm btn-outline-danger ms-3">Delete</button>
                    </h5>
                    <div className="row">
                        {song.map((ele)=>(
                            <div key={ele.id} className="col-lg-3 col-md-6 py-2">
                                <div className="card">
                                    <img src={ele.album.images[0].url} className='card-img-top' alt={ele.name}/>
                                    <div className="card-body">
                                        <h5 className="card-title">{ele.name}</h5>
                                        <p className='card-text'>Artist: {ele.album.artists[0].name}</p>
                                        <audio src={ele.preview_url} controls style={{width:'100%'}}></audio>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
export default Playlists;