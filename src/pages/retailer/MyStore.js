import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../redux/actions/Store';
import Header from '../components/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const MyStore = () => {

  const [loading, setLoading] = useState(true)
  const [games, setGames] = useState([])

  useEffect(() => {
    axios.get('/my-store').then((res) => {
      console.log(res.data)
      setGames(res.data)
      setLoading(false)
    })
  }, [])


  return (
    <div>
      <Header tab='my-store' />
      <div className='container mx-auto col-md-9 px-4'>
        <div>
          <p className='fs-2'>My Store</p>
          <div className='my-2'>
            <Link to={"/add-game"} className='btn shadow ms-auto rounded-circle d-flex align-items-center jsutify-content-center bg-primary' style={{ height: "4ch", width: "4ch" }}>
              <p className='m-0 my-auto fw-bold text-center mx-auto fs-6 text-light'><i className='fa-solid fa-plus'></i></p>
            </Link>
          </div>
        </div>
        <div>
          <div className='d-flex flex-wrap justify-content-start'>
            {
              !loading ?
                <>
                  {
                    games.length > 0 ?
                      <>
                        {
                          games.map((val, ind) => {
                            return (
                              <Link to={`/game-details/${val._id}/${val.game.id}`} style={{ textDecoration: "none", color: "#3f3f3f" }}>
                                <div className='my-3' style={{ marginRight: "2ch" }}>
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
                        <div className='mx-auto d-flex align-items-center' style={{ height: "50ch" }}>
                          <p className=''>You have not added any games yet.</p>
                        </div>
                      </>
                  }
                </> :
                <>
                  <div className='mx-auto d-flex align-items-center' style={{ height: "50ch" }}>
                    <div className="spinner-border text-secondary" style={{ height: "5ch", width: "5ch", fontSize: "1.5rem" }} role="status">
                      <span className="visually-hidden">Loading...</span>
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

export default MyStore