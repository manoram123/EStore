import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import './addgame.css';
import $ from 'jquery'
import { toast } from 'react-toastify'
import Header from '../components/Header';
import Footer from '../components/Footer';

const Addgame = () => {

    const [game_title, setGameTitle] = useState("")
    const [game, setGame] = useState("")
    const [games, setGames] = useState()
    const [loading, setLoading] = useState(false)
    const [platform, setPlatform] = useState("Steam")
    const [version, setVersion] = useState("Global")
    const [price, setPrice] = useState("")
    const [cd_key, setKey] = useState("")
    const [discount, setDiscount] = useState(0)

    const navigate = useNavigate()

    const searchGame = (game) => {
        $('.games-div').css('display', "block")
        setLoading(true)
        setGameTitle(game)
        const options = {
            method: 'GET',
            url: `https://api.rawg.io/api/games?key=1c615881089b4c389b0b370fe9cef4de&search=${game_title}`,
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            setGames(response.data.results)
            setLoading(false)
        }).catch(function (error) {
            console.error(error);
        });
    }

    const selectGame = (game) => {
        setGame(game)
        console.log(game)
        $('.games-div').css('display', "none")
        setGameTitle(game.name)
    }

    const handleSubmit = async () => {
        const res = await axios.post('/add-game', { game, game_title, platform, version, price, cd_key, discount })
        console.log(platform)
        if (res.data.success) {
            navigate('/my-store')
        } else {
            toast.error(res.data.message, { position: toast.POSITION.TOP_RIGHT })
        }
    }

    return (
        <div className='' style={{ height: '100vh' }}>
            <Header />
            <div className="form rounded col-md-4 p-5 mx-auto my-5">
                <h6 className='mt-4 fw-bold'>Add Your Game in EStore.</h6>
                <form action="">
                    <div className='form-group my-3' style={{ position: "relative" }}>
                        <input onChange={(e) => searchGame(e.target.value)} className='form-control py-3 px-3' type="text" placeholder='Game Title' value={game_title} />
                        <div className='games-div'>
                            {
                                !loading ?
                                    <>
                                        {
                                            games ?
                                                <>
                                                    <div className='games-list px-2 py-2'>
                                                        {
                                                            games.map((game, ind) => {
                                                                return (
                                                                    <div key={ind} className='d-flex my-2 game px-3 py-2 rounded' onClick={selectGame.bind(this, game)}>
                                                                        <div>
                                                                            <img className='img img-fluid rounded' style={{ height: "6ch", width: "5ch", objectFit: "cover" }} src={game.background_image} alt="game_poster" />
                                                                        </div>
                                                                        <div className='my-auto mx-2'>
                                                                            <p>{game.name}</p>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </> :
                                                <><small className='d-block mt-1 mx-1'><i className='fa-solid fa-info-circle me-1 text-secondary'></i>Select a game</small></>
                                        }
                                    </> :
                                    <>
                                        <div className='games-list w-100 d-flex align-items-center justify-content-center'>
                                            <div className="spinner-border text-secondary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                    <div className='row'>
                        <div className='form-group col-md-6'>
                            <select className='form-select py-3 px-3' onChange={(e) => setPlatform(e.target.value)}>
                                <option disabled>Platform</option>
                                <option defaultValue="Steam">Steam</option>
                                <option defaultValue="Epic Games">Epic Games</option>
                                <option defaultValue="Origin">Origin</option>
                                <option defaultValue="Ubisoft">Ubisoft</option>
                            </select>
                            <small id={`err`} className='text-danger mx-2'></small>
                        </div>
                        <div className='form-group col-md-6'>
                            <select className='form-select py-3 px-3' onChange={(e) => setVersion(e.target.value)}>
                                <option disabled>Version</option>
                                <option defaultValue="Steam">Global</option>
                                <option defaultValue="Steam">EU</option>
                            </select>
                            <small id={`err`} className='text-danger mx-2'></small>
                        </div>
                    </div>
                    <div className='form-group'>
                        <input onChange={(e) => setPrice(e.target.value)} className='form-control py-3 px-3' type="text" placeholder='Price Rs.' />
                        <small id={`err`} className='text-danger mx-2'></small>
                    </div>
                    <div className='form-group'>
                        <input onChange={(e) => setDiscount(e.target.value)} className='form-control py-3 px-3' type="text" placeholder='Discount' />
                        <small id={`err`} className='text-danger mx-2'></small>
                    </div>
                    <div className='form-group'>
                        <input onChange={(e) => setKey(e.target.value)} className='form-control py-3 px-3' type="text" placeholder='Product Code: XXXXX-XXXXX-XXXXX-XXXXX' />
                        <small id={`err`} className='text-danger mx-2'></small>
                        <p className='text-xs m-0'>The product code confidential and do not share. Your game product code will be delivered to your customer after the payment has been completed.</p>
                    </div>
                    <div className='my-4'>
                        <button type='button' onClick={handleSubmit} className='btn btn-primary py-3 w-100'>Done</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Addgame