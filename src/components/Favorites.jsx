import React from 'react';

const Favorites = ({ favorites, removeFavorites }) => {
    return(
        <div className="container mt-4">
            <h3>Liked Songs</h3>
            <div className="row">
                {favorites.length===0 && <p>No liked songs yet.</p>}
                {favorites.map((ele)=>(
                    <div key={ele.id} className='col-lg-3 col-md-6 py-2'>
                        <div className="card">
                            <img src={ele.album.images[0].url} className='card-img-top' alt={ele.name}/>
                            <div className="card-body">
                                <h5 className='card-title'>{ele.name}</h5>
                                <p className='card-text'>Artist: {ele.album.artists[0].name}</p>
                                <p className="card-text">Release date: {ele.album.release_date}</p>
                                <audio src={ele.preview_url} controls style={{ width: "100%" }}></audio>
                                <button className="btn btn-danger mt-2" onClick={() => removeFavorites(ele.id)}>Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Favorites;