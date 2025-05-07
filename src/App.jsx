import "./App.css"
import {useState} from "react"
function App() {
  const [tracks,setTracks]=useState([])
  const getTracks=async()=>{
    let data=await fetch("https://v1.nocodeapi.com/adityaraj/spotify/HGviowJtGMjmkcds/search?q=daku&type=track")
    let convertedData=await data.json()
    console.log(convertedData.tracks.items)
    setTracks(convertedData.tracks.items)
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      Parthify
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <input
          className="form-control me-2 w-75"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
    </div>
  </div>
      </nav>
      <button onClick={getTracks} className="btn btn-primary">get Data</button>

      <div className="container">
        <div className="row">
          <div className="col">
          
          </div>
          {
            tracks.map((ele)=>{
              return <div key={ele.id} className="col">
                {/* <img className="border-2 w-100" src={ele.album.images[0].url} alt="" />
                <p>{ele.id}</p> */}

                <div className="card" style={{ width: "18rem" }}>
                    <img src={ele.album.images[0].url} className="card-img-top" alt="..." />
                  <div className="card-body">
                      <h5 className="card-title">{ele.name}</h5>
                      <p className="card-text">Artist:{ele.album.artists[0].name}</p>
                      <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>

              </div>
            })
          }
        </div>
      </div>

    </>
  )
}

export default App
