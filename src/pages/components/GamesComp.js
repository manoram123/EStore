import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const GamesComp = () => {

    const [games, setGames] = useState([])

    useEffect(() => {
        axios.get('/all-games').then((res) => {
            console.log(res.data)
            setGames(res.data)
        })
    }, [])

    return (
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
    )
}

export default GamesComp