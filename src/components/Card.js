import React,{use, useContext,useEffect} from 'react';
import {MusicContext} from '../Context';

function Card({ele}){
    const musicContext=useContext(MusicContext);
    const likedMusic=musicContext.likedMusic;
    const setLikedMusic=musicContext.setLikedMusic;
    const pinnedMusic=musicContext.pinnedMusic;
    const setpinnedMusic=musicContext.setPinnedMusic;

    const handlePin=()=>{
        let pinnedMusic=localStorage.getItem("pinnedMusic");
        pinnedMusic=JSON.parse(pinnedMusic);
        let updatedPinnedMusic=[];
        if(pinnedMusic.some((item)=>item.id===element.id)){
            updatedPinnedMusic =pinnedMusic.filter((item)=>item.id!==element.id);
            setpinnedMusic(updatedPinnedMusic);
            localStorage.setItem("pinnedMusic",JSON.stringify(updatedPinnedMusic));
        }
        else{
            if(pinnedMusic.length>=4){
            }
            updatedPinnedMusic=pinnedMusic;
            updatedPinnedMusic.push(element);
            setpinnedMusic(updatedPinnedMusic);
            localStorage.setItem("pinnedMusic",JSON.stringify(updatedPinnedMusic));
        }
    }
    const handleLike=()=>{
        let likedMusic=localStorage.getItem("likedMusic");
        likedMusic=JSON.parse(likedMusic);
        let updatedLikedMusic=[];
        if(likedMusic.some((item)=>item.id===ele.id)){
            updatedLikedMusic=likedMusic((item)=>item.id!=ele.id);
            setLikedMusic(updatedLikedMusic);
            localStorage.setItem("likedMusic",JSON.stringify(updatedLikedMusic));
        }
        else{
            updatedLikedMusic=likedMusic;
            updatedLikedMusic.push(ele);
            setLikedMusic(updatedLikedMusic);
            localStorage.setItem("likedMusic",JSON.stringify(updatedLikedMusic));
        }
    }
    useEffect(()=>{
        const localLikedMusic=JSON.parse(localStorage.getItem("likedMusic"));
        setLikedMusic(localLikedMusic);
    },[setLikedMusic]);

    return(
        <div key={element.id} className="col-lg-3 col-md-6 py-2">
            <div className="card">
                <div className='ratio ratio-1x1 bg-secondary bg-opacity-25'>
                    <img src={ele.album.images[0].url} className="card-img-top" alt="..."/>
                </div>
                <div className='card-body'>
                    <h5 className='card-title d-flex justify-content-between'>{ele.name}
                    <div className="add-options d-flex align-items-start">
                        {pinnedMusic.some((item)=>item.id===ele.id)?(<button onclick={handlePin} className="btn btn-outline-dark mx-1"><i className="bi bi-pin-angle-fill"></i></button>):(<button onclick={handlePin} className="btn btn-outline-dark mx-1"><i className="bi bi-pin-angle"></i></button>)}
                        {likedMusic.some((item)=>item.id===ele.id)?(<button onClick={handleLike} className="btn btn-outline-dark"><i className="bi bi-heart-fill text-danger"></i></button>):(<button onClick={handleLike} className="btn btn-outline-dark"><i className="bi bi-heart"></i></button>)}
                    </div>
                    </h5>
                    <p className='card-text'>Artist:{ele.album.artist[0].name}</p>
                    <p className="card-text">Release date: {element.album.release_date}</p>
                    <audio src={element.preview_url} controls className="w-100"></audio>
                </div>
            </div>
        </div>
    )

}
export default Card;