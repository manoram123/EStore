import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import $ from 'jquery'
import Footer from '../components/Footer'


const MyGames = () => {

    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState(true)

    useEffect(() => {
        axios.get('/my-games').then((res) => {
            console.log(res.data)
            setGames(res.data)
            setLoading(false)
        })
    }, [])

    const showKey = (key, id) => {
        if (show) {
            $(`#key${id}`).html(key)
            setShow(false)
        } else {
            $(`#key${id}`).html("XXXXX-XXXXX-XXXXX-XXXXX")
            setShow(true)
        }
    }

    return (
        <div>
            <Header tab="my-games" />
            <div className='container mx-auto col-md-9 px-4'>
                <div>
                    <p className='fs-2'>My Games</p>
                    <div className='my-2'>
                    </div>
                </div>
                <div>
                    <div className=''>
                        {
                            !loading ?
                                <>
                                    {
                                        games.length > 0 ?
                                            <>
                                                {
                                                    games.map((val, ind) => {
                                                        return (
                                                            <div className='my-3 d-flex' style={{ marginRight: "2ch" }}>
                                                                <div>
                                                                    <img src={val.game.game.background_image} className='rounded poster' style={{ height: '25ch', width: "19ch", objectFit: "cover" }} alt="" />
                                                                </div>
                                                                <div className='mx-3 ' style={{ width: "100%" }}>
                                                                    <p style={{ fontSize: '0.9rem', width: "18ch" }} className='fw-bold my-1 fs-2'>{val.game.game.name}</p>
                                                                    <p className='m-0 text-sm'><span className='fw-bold'>PURCHASED: </span><span className="">{new Date(val.date).toDateString()}</span></p>
                                                                    <p className='m-0 text-sm'><span className='fw-bold'>PLATFORM: </span><span className="">{val.game.platform}</span></p>
                                                                    <div className='mt-3'>
                                                                        <p className='text-sm m-0'>PRODUCT CODE</p>
                                                                        <div className='d-flex'>
                                                                            <p id={`key${val._id}`} className='my-auto text-sm p-1 px-2' style={{ border: "1px solid #afafaf", width: "28ch" }}>XXXXX-XXXXX-XXXXX-XXXXX</p>
                                                                            <button id={`keybtn${val._id}`} onClick={() => showKey(val.game.cd_key, val._id)} className='btn btn-sm ms-2'><i className={`fa-solid fa-${show ? 'eye-slash' : 'eye'}`}></i></button>
                                                                        </div>
                                                                        <p className='text-xs mt-2' style={{ width: "35ch" }}>This is your CODE for reedeming in original platform. Do not share or leak this CODE otherwise your purchased product might be stolen.</p>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </> :
                                            <>
                                                <div className='mx-auto d-flex align-items-center mx-auto d-flex align-items-center justify-content-center' style={{ height: "50ch" }}>
                                                    <p className='text-center'>You have not purchased any games yet.</p>
                                                </div>
                                            </>
                                    }
                                </> :
                                <>
                                    <div className='d-flex justify-content-center'>
                                        <div className='mx-auto d-flex align-items-center' style={{ height: "50ch" }}>
                                            <div className="spinner-border text-secondary" style={{ height: "5ch", width: "5ch", fontSize: "1.5rem" }} role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MyGames