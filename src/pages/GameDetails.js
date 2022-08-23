import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import KhaltiCheckout from "khalti-checkout-web";
import myKey from '../utils/khalti'
import { UserContext } from '../context/UserContext'
import Footer from './components/Footer'
import GamesComp from './components/GamesComp'


const GameDetails = () => {

    const [game, setGame] = useState()
    const [screenshots, setScreenshots] = useState()
    const [gameData, setGameData] = useState()

    const gameId = useParams().gameId
    const id = useParams().id

    const [user] = useContext(UserContext)

    const navigate = useNavigate()

    const [games, setGames] = useState([])

    useEffect(() => {
        axios.get('/all-games').then((res) => {
            console.log(res.data)
            setGames(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get("/game-data/" + id).then((res) => {
            setGameData(res.data)
        })
    }, [])

    useEffect(() => {
        const options = {
            method: 'GET',
            url: `https://api.rawg.io/api/games/${gameId}?key=1c615881089b4c389b0b370fe9cef4de`,
        };

        axios.request(options).then(function (response) {
            setGame(response.data)
            // setLoading(false)
            console.log(response.data)
        }).catch(function (error) {
            console.error(error);
        });
    }, [])

    useEffect(() => {
        const options = {
            method: 'GET',
            url: `https://api.rawg.io/api/games/${gameId}/screenshots?key=1c615881089b4c389b0b370fe9cef4de`,
        };

        axios.request(options).then(function (response) {
            setScreenshots(response.data.results)
            // setLoading(false)
        }).catch(function (error) {
            console.error(error);
        });
    }, [])

    const removeGame = async () => {
        const res = await axios.delete('/remove-game/' + id)
        if (res.data.success) {
            navigate('/my-store')
        }
    }

    let config = {
        publicKey: myKey.publicTestKey,
        productIdentity: id,
        productName: gameData?.game.name,
        productUrl: "http://localhost:3000/game-details/" + id + "/" + gameId,
        eventHandler: {
            onSuccess(payload) {
                console.log(payload);
                //  booking property 
                axios.post('/purchase', {
                    game: id,
                    user: user?.userId
                }).then(res => {
                    if (res.data.success) {
                        toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT })
                        navigate('/my-games')
                    } else {
                        toast.error(res.data.message, { position: toast.POSITION.TOP_RIGHT })
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            onError(error) {
                console.log(error);
            },
            onClose() {
                console.log("widget is closing");
            },
        },
        paymentPreference: [
            "KHALTI",
            "EBANKING",
            "MOBILE_BANKING",
            "CONNECT_IPS",
            "SCT",
        ],
    };

    return (
        <div>
            <Header />
            <div className='container mx-auto col-md-9 px-4'>
                <div className='row'>
                    <div className='col-md-8'>
                        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" style={{ position: "relative" }}>
                            <div className="carousel-indicators d-flex m-0 justify-content-start">
                                {
                                    screenshots ?
                                        screenshots.map((val, ind) => {
                                            return (
                                                <img key={ind} src={val.image} style={{ height: "8ch", width: "14ch", objectFit: "cover" }} data-bs-target="#carouselExampleIndicators" data-bs-slide-to={ind} className={`${ind === 0 ? "active" : ""} mx-3`} aria-current="true" aria-label={`Slide ${ind}`} />
                                            )
                                        }) :
                                        <>
                                            <p>Loading...</p>
                                        </>
                                }
                            </div>
                            <div className="carousel-inner">
                                {
                                    screenshots ?
                                        screenshots.map((val, ind) => {
                                            return (
                                                <div key={ind} className={`carousel-item ${ind === 0 ? "active" : ""}`}>
                                                    <img key={ind + 1} src={val.image} className="d-block w-100" alt="image" style={{ height: "50ch", objectFit: "cover", borderRadius: "10px" }} />
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
                    {
                        gameData?.retailer?._id === user?.userId ?
                            <>
                                <div className='col-md-4 px-4'>
                                    <div className='border rounded border-secondary pb-4'>
                                        <small className='position-relative px-2 ms-2 fw-bold' style={{ top: "-1.4ch", background: "#e8e8e8", fontSize: "0.8rem" }}>YOUR OFFER</small>
                                        <div className='px-3'>
                                            <p className='text-xs fw-bold m-0'>Price</p>
                                            {
                                                gameData?.discount > 0 ?
                                                    <>
                                                        <small className='rounded bg-primary p-1 text-light' style={{ fontSize: "0.7rem" }}>-{gameData?.discount}%</small>
                                                        <small className='fw-bold mx-3' style={{ color: "#797979", textDecoration: "line-through" }}>Rs. {gameData?.price}</small>
                                                        <small className='fw-bold'>Rs. {(parseInt(gameData?.price) - (gameData.price * (gameData?.discount / 100))).toFixed(0)}</small>
                                                    </> :
                                                    <>
                                                        <small className='fw-bold m-0'>Rs. {gameData?.price}</small>
                                                    </>
                                            }
                                            <div className='mt-3'>
                                                <button onClick={removeGame} type='button' className="btn btn-danger py-2 w-100">
                                                    REMOVE GAME
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </> :
                            <>
                                <div className='col-md-4 px-4'>
                                    <div className='border rounded border-secondary pb-4'>
                                        <small className='position-relative px-2 ms-2 fw-bold' style={{ top: "-1.4ch", background: "#e8e8e8", fontSize: "0.8rem" }}>BEST OFFER FROM</small>
                                        <div className='px-3'>
                                            <div className='d-flex my-2 mb-1'>
                                                <div className='rounded-circle bg-secondary d-flex align-items-center justify-content-center' style={{ height: "4ch", width: "4ch" }}>
                                                    <p className='text-center text-light fw-bold my-auto'>{gameData?.retailer.username.charAt(0).toUpperCase()}{gameData?.retailer.username.charAt(1).toUpperCase()}</p>
                                                </div>
                                                <p className='m-0 my-auto ms-2 text-sm fw-bold'>{gameData?.retailer.username}</p>
                                            </div>
                                            <p className='text-xs fw-bold m-0'>Price</p>
                                            {
                                                gameData?.discount > 0 ?
                                                    <>
                                                        <small className='rounded bg-primary p-1 text-light' style={{ fontSize: "0.7rem" }}>-{gameData?.discount}%</small>
                                                        <small className='fw-bold mx-3' style={{ color: "#797979", textDecoration: "line-through" }}>Rs. {gameData?.price}</small>
                                                        <small className='fw-bold'>Rs. {(parseInt(gameData?.price) - (gameData.price * (gameData?.discount / 100))).toFixed(0)}</small>
                                                    </> :
                                                    <>
                                                        <small className='fw-bold m-0'>Rs. {gameData?.price}</small>
                                                    </>
                                            }
                                            <div>
                                                <div className='my-2 mt-4'>
                                                    {
                                                        gameData?.available ?
                                                            <button onClick={() => new KhaltiCheckout(config).show({ amount: 10000, mobile: 9866701165 })} type='button' className="btn btn-primary py-2 w-100">
                                                                PURCHASE GAME
                                                            </button> :
                                                            <button type='button' className="btn disabled btn-primary py-2 w-100">
                                                                SOLD
                                                            </button>
                                                    }
                                                </div>
                                                <div className='my-2'>
                                                    <button type='button' className="btn btn-secondary py-2 w-100">
                                                        ADD TO CART
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                    }
                </div>

                <div className='mt-3'>
                    <h3 className='fw-bolder'>{gameData?.game.name}</h3>
                </div>

                <div className='row mt-4'>
                    <div className='col-md-4 mb-4'>
                        <div className='d-flex'>
                            <div className='p-2 d-flex justify-content-center align-items-center rounded' style={{ height: "7ch", width: "7ch", background: "#d1d1d1" }}><i className='fa-solid fa-gamepad fs-2'></i></div>
                            <div className='my-auto'>
                                <p className='m-0 mx-2 text-sm'>Platform</p>
                                <p className='m-0 mx-2 text-sm fw-bold'>{gameData?.platform.toUpperCase()}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 mb-4'>
                        <div className='d-flex'>
                            <div className='p-2 d-flex justify-content-center align-items-center rounded' style={{ height: "7ch", width: "7ch", background: "#d1d1d1" }}><i className='fa-solid fa-key fs-2'></i></div>
                            <div className='my-auto'>
                                <p className='m-0 mx-2 text-sm'>Type</p>
                                <p className='m-0 mx-2 text-sm fw-bold'>KEY</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='d-flex'>
                            <div className='p-2 d-flex justify-content-center align-items-center rounded' style={{ height: "7ch", width: "7ch", background: "#d1d1d1" }}><i className='fa-solid fa-earth fs-2'></i></div>
                            <div className='my-auto'>
                                <p className='m-0 mx-2 text-sm'>Version</p>
                                <p className='m-0 mx-2 text-sm fw-bold'>{gameData?.version.toUpperCase()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='py-3 my-5' style={{ borderLeft: "2px solid" }}>
                    <p className='mx-2 m-0 text-sm'>Genres</p>
                    <div className='d-flex'>
                        {
                            game?.genres.map((val, ind) => {
                                return (
                                    <p className='m-0 mx-2 text-sm fw-bold'>{val.name}</p>
                                )
                            })
                        }
                    </div>
                </div>

                <div>
                    <p>{game?.description_raw}</p>
                </div>


                <h6 className='mt-5 fw-bold'>MORE GAMES FOR YOU</h6>
                <div className='d-flex flex-wrap justify-content-between'>
                    {
                        games.length > 0 ?
                            <>
                                {
                                    games.splice(5, 10).map((val, ind) => {
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
            <Footer />
        </div>
    )
}

export default GameDetails