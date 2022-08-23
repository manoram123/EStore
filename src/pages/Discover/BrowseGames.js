import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const BrowseGames = () => {

    const [games, setGames] = useState([])

    useEffect(() => {
        axios.get('/all-games').then((res) => {
            console.log(res.data)
            setGames(res.data)
        })
    }, [])

    return (
        <div>
            <Header tab="discover" />
            <div className='container col-md-9 px-4 mx-auto'>
                <div>
                    <div className='' style={{ backgroundImage: `url('')` }}></div>
                    <div id="carouselExampleIndicators" className="carousel slide game-banner" data-bs-ride="carousel" style={{ position: "relative" }}>
                        {/* <div className="carousel-indicators d-flex m-0 justify-content-center" style={{ background: "none" }}>
                            {
                                games?.map((val, ind) => {
                                    return (
                                        <div style={{ height: '1ch', width: '1ch' }} data-bs-target="#carouselExampleIndicators" data-bs-slide-to={ind} className={`bg-secondary rounded-circle ${ind === 0 ? "active" : ""} mx-3`}>
                                        </div>
                                    )
                                })
                            }
                        </div> */}
                        <div className="carousel-inner">
                            {
                                games ?
                                    games?.map((val, ind) => {
                                        return (
                                            <div key={ind} className={`carousel-item ${ind === 0 ? "active" : ""} position-relative`}>
                                                <div style={{ height: "50ch", backgroundImage: `url(${val.game.background_image})`, backgroundSize: 'cover' }}>
                                                    <div className='backdrop'></div>
                                                    <div className='' style={{ position: "absolute", bottom: "1ch", left: '4ch' }}>
                                                        <h5 className='fs-2 fw-bold w-50' style={{ color: `#fff` }}>{val.game.name.toUpperCase()}</h5>
                                                        <div className='my-4 d-flex' style={{width: "30ch"}}>
                                                            <button type='button' className='btn btn-light me-2 py-3 w-50 fw-bold'>BUY NOW</button>
                                                            {/* <button className='btn btn-primary text-dark fw-bold py-3'><i className='fa-solid fa-plus me-2'></i>ADD TO CART</button> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) :
                                    <>
                                        <div className="d-block w-100 carousel-item" alt="image" style={{ height: "50ch" }}>
                                            <p>Loading...</p>
                                        </div>
                                    </>
                            }
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                <div>
                    <div className='d-flex flex-wrap justify-content-between'>
                        {
                            games.length > 0 ?
                                <>
                                    {
                                        games.splice(0, 5).map((val, ind) => {
                                            return (
                                                <Link to={`/game-details/${val._id}/${val.game.id}`} style={{ textDecoration: "none", color: "#3f3f3f" }}>
                                                    <div className='my-3'>
                                                        <div>
                                                            <img src={val.game.background_image} className='rounded poster' style={{ height: '25ch', width: "19ch", objectFit: "cover" }} alt="" />
                                                        </div>
                                                        <div className='' style={{ width: "100%" }}>
                                                            <p style={{ fontSize: '0.9rem', width: "18ch" }} className='fw-bold my-1'>{val.game.name}</p>
                                                            {
                                                                val.discount > 0 ?
                                                                    <>
                                                                        <small className='rounded bg-primary p-1 text-light' style={{ fontSize: "0.7rem" }}>-{val.discount}%</small>
                                                                        <small className='fw-bold mx-3' style={{ color: "#797979", textDecoration: "line-through" }}>Rs. {val.price}</small>
                                                                        <small className='fw-bold'>Rs. {(parseInt(val.price) - (val.price * (val.discount / 100))).toFixed(0)}</small>
                                                                    </> :
                                                                    <>
                                                                        <small className='fw-bold'>Rs. {val.price}</small>
                                                                    </>
                                                            }
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                        })
                                    }
                                </> :
                                <>
                                    <div className='mx-auto d-flex' style={{ height: "50ch" }}>
                                        <div className="spinner-border text-secondary" style={{ height: "5ch", width: "5ch", fontSize: "1.5rem" }} role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </>
                        }
                    </div>
                </div>

                <div className='d-flex flex-wrap justify-content-between my-5'>
                    <div className='col-md-6 pe-3' style={{ position: "relative" }}>
                        <div>
                            <img style={{ height: "30ch", borderRadius: "10px" }} src="https://cdn2.unrealengine.com/egs-fall-guys-doom-breaker-1920x1080-645d17d65bc9.jpg?h=1080&resize=1&w=1920" alt="" />
                            <div className=''>
                                <p className='m-0 fw-bold'>Fall Guys</p>
                                <p className='m-0 text-sm'>Fall Guys is a free, cross-platform, massively multiplayer, party royale game where you and your fellow contestants compete through escalating rounds of absurd obstacle course chaos until one lucky victor remains!</p>
                            </div>
                        </div>
                        <div className='mt-2' style={{ position: 'relative', bottom: "0" }}>
                            <p className='fw-bold text-secondary text-xs'>FREE TO PLAY</p>
                        </div>
                    </div>
                    <div className='col-md-6 ps-3' style={{ position: "relative" }}>
                        <div>
                            <img style={{ height: "30ch", borderRadius: "10px" }} src="https://cdn1.epicgames.com/offer/0bef9383794a4d779ba0628084b14cba/LANDSCAPE_2560x1440_2560x1440-a8a050190fae18c0deb92c4048c5b1df_2560x1440-a8a050190fae18c0deb92c4048c5b1df" alt="" />
                            <div className=''>
                                <p className='m-0 fw-bold'>Rumbleverse</p>
                                <p className='m-0 text-sm'>Customize your fighter by mixing and matching hundreds of unique items, and stand out from the crowd. Get launched from a cannon, drop into the streets, and prepare to throw down! Where you land is up to you, but beware -- there's chaos around every corner and on top of the tallest skyscraper!</p>
                            </div>
                        </div>
                        <div className='mt-2' style={{ position: 'relative', bottom: "0" }}>
                            <p className='fw-bold text-secondary text-xs'>FREE TO PLAY</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='d-flex flex-wrap justify-content-between'>
                        {
                            games.length > 0 ?
                                <>
                                    {
                                        games.splice(0, 5).map((val, ind) => {
                                            return (
                                                <Link to={`/game-details/${val._id}/${val.game.id}`} style={{ textDecoration: "none", color: "#3f3f3f" }}>
                                                    <div className='my-3'>
                                                        <div>
                                                            <img src={val.game.background_image} className='rounded poster' style={{ height: '25ch', width: "19ch", objectFit: "cover" }} alt="" />
                                                        </div>
                                                        <div className='' style={{ width: "100%" }}>
                                                            <p style={{ fontSize: '0.9rem', width: "18ch" }} className='fw-bold my-1'>{val.game.name}</p>
                                                            {
                                                                val.discount > 0 ?
                                                                    <>
                                                                        <small className='rounded bg-primary p-1 text-light' style={{ fontSize: "0.7rem" }}>-{val.discount}%</small>
                                                                        <small className='fw-bold mx-3' style={{ color: "#797979", textDecoration: "line-through" }}>Rs. {val.price}</small>
                                                                        <small className='fw-bold'>Rs. {(parseInt(val.price) - (val.price * (val.discount / 100))).toFixed(0)}</small>
                                                                    </> :
                                                                    <>
                                                                        <small className='fw-bold'>Rs. {val.price}</small>
                                                                    </>
                                                            }
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                        })
                                    }
                                </> :
                                <>
                                    <div className='mx-auto d-flex' style={{ height: "50ch" }}>
                                        <div className="spinner-border text-secondary" style={{ height: "5ch", width: "5ch", fontSize: "1.5rem" }} role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </>
                        }
                    </div>
                </div>

                <div className='row my-5'>
                    <div className='col-md-4' style={{ borderRight: "2px solid #ababab" }}>
                        <div className='d-flex'>
                            <h6 className='fw-bold my-auto'>POPULAR</h6>
                            <button className='btn rounded ms-auto btn-sm' style={{ border: "2px solid #000" }}>View More</button>
                        </div>
                        <div>
                            <div className=''>
                                {
                                    games.length > 0 ?
                                        <>
                                            {
                                                games.splice(0, 5).map((val, ind) => {
                                                    return (
                                                        <Link to={`/game-details/${val._id}/${val.game.id}`} style={{ textDecoration: "none", color: "#3f3f3f" }}>
                                                            <div className='my-3 d-flex'>
                                                                <div>
                                                                    <img src={val.game.background_image} className='rounded poster' style={{ height: '8ch', width: "7ch", objectFit: "cover" }} alt="" />
                                                                </div>
                                                                <div className='my-auto mx-2' style={{ width: "100%" }}>
                                                                    <p style={{ fontSize: '0.9rem', width: "18ch" }} className='fw-bold my-1'>{val.game.name}</p>
                                                                    {
                                                                        val.discount > 0 ?
                                                                            <>
                                                                                <small className='fw-bold'>Rs. {(parseInt(val.price) - (val.price * (val.discount / 100))).toFixed(0)}</small>
                                                                            </> :
                                                                            <>
                                                                                <small className='fw-bold'>Rs. {val.price}</small>
                                                                            </>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </> :
                                        <></>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4' style={{ borderRight: "2px solid #ababab" }}>
                        <div className='d-flex'>
                            <h6 className='fw-bold my-auto'>TRENDING</h6>
                            <button className='btn rounded ms-auto btn-sm' style={{ border: "2px solid #000" }}>View More</button>
                        </div>
                        <div>
                            <div className=''>
                                {
                                    games.length > 0 ?
                                        <>
                                            {
                                                games.splice(0, 5).map((val, ind) => {
                                                    return (
                                                        <Link to={`/game-details/${val._id}/${val.game.id}`} style={{ textDecoration: "none", color: "#3f3f3f" }}>
                                                            <div className='my-3 d-flex'>
                                                                <div>
                                                                    <img src={val.game.background_image} className='rounded poster' style={{ height: '8ch', width: "7ch", objectFit: "cover" }} alt="" />
                                                                </div>
                                                                <div className='my-auto mx-2' style={{ width: "100%" }}>
                                                                    <p style={{ fontSize: '0.9rem', width: "18ch" }} className='fw-bold my-1'>{val.game.name}</p>
                                                                    {
                                                                        val.discount > 0 ?
                                                                            <>
                                                                                <small className='fw-bold'>Rs. {(parseInt(val.price) - (val.price * (val.discount / 100))).toFixed(0)}</small>
                                                                            </> :
                                                                            <>
                                                                                <small className='fw-bold'>Rs. {val.price}</small>
                                                                            </>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </> :
                                        <></>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4' style={{ borderRight: "2px solid #ababab" }}>
                        <div className='d-flex'>
                            <h6 className='fw-bold my-auto'>HOT</h6>
                            <button className='btn rounded ms-auto btn-sm' style={{ border: "2px solid #000" }}>View More</button>
                        </div>
                        <div>
                            <div className=''>
                                {
                                    games.length > 0 ?
                                        <>
                                            {
                                                games.splice(0, 5).map((val, ind) => {
                                                    return (
                                                        <Link to={`/game-details/${val._id}/${val.game.id}`} style={{ textDecoration: "none", color: "#3f3f3f" }}>
                                                            <div className='my-3 d-flex'>
                                                                <div>
                                                                    <img src={val.game.background_image} className='rounded poster' style={{ height: '8ch', width: "7ch", objectFit: "cover" }} alt="" />
                                                                </div>
                                                                <div className='my-auto mx-2' style={{ width: "100%" }}>
                                                                    <p style={{ fontSize: '0.9rem', width: "18ch" }} className='fw-bold my-1'>{val.game.name}</p>
                                                                    {
                                                                        val.discount > 0 ?
                                                                            <>
                                                                                <small className='fw-bold'>Rs. {(parseInt(val.price) - (val.price * (val.discount / 100))).toFixed(0)}</small>
                                                                            </> :
                                                                            <>
                                                                                <small className='fw-bold'>Rs. {val.price}</small>
                                                                            </>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </> :
                                        <></>
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default BrowseGames