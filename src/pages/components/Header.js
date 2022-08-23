import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { loggedData } from '../../redux/actions/user'
import $ from 'jquery'

const Header = (props) => {

    useEffect(()=>{
        $(`.${props.tab}`).addClass('active-n')
    }, [])

    const [user] = useContext(UserContext)
    // console.log(user)
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(loggedData())
    //     console.log(logged.user.username)
    // }, [dispatch])

    return (
        <div className='container col-md-9 mx-auto py-4'>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container mx-auto">
                    <div>
                        <div className='search-box p-2 px-3'>
                            <i className='fa-solid fa-search text-secondary'></i>
                            <input className='search ms-2' type="text" style={{ border: "none", outline: "none", background: "transparent" }} placeholder="Search Games" />
                        </div>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className='d-flex ms-2'>
                            <div className='mx-2'>
                                <Link className='text-secondary discover' style={{ textDecoration: "none" }} to={'/'}>Discover</Link>
                            </div>
                            <div className='mx-2'>
                                <Link className='text-secondary browse' style={{ textDecoration: "none" }} to={''}>Browse</Link>
                            </div>
                            <div className='mx-2'>
                                <Link className='text-secondary news' style={{ textDecoration: "none" }} to={''}>News</Link>
                            </div>
                        </div>

                        <div className='d-flex ms-auto'>
                            <div className='mx-2 my-auto'>
                                <Link className='text-secondary my-games' style={{ textDecoration: "none" }} to={'/my-games'}>My Games</Link>
                            </div>
                            <div className='mx-2 my-auto'>
                                <Link className='text-secondary my-store' style={{ textDecoration: "none" }} to={'/my-store'}>Store</Link>
                            </div>
                            <div className='mx-2'>
                                <Link className='text-secondary' style={{ textDecoration: "none" }} to={''}>
                                    <div className='rounded-circle bg-secondary d-flex align-items-center justify-content-center' style={{height: "4ch", width:"4ch"}}>
                                        <p className='text-center text-light fw-bold my-auto'>{user?.user?.username.charAt(0).toUpperCase()}{user?.user?.username.charAt(1).toUpperCase()}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header