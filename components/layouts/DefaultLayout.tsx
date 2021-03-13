import React, {useEffect, useState} from 'react';
import {Navbar} from 'react-bootstrap';
import Link from "next/link";
import httpClient from "../../src/utils/httpClient";
import moment from 'moment';

interface IDefaultLayout {
    categories: any[];
}

export const DefaultLayoutContext = React.createContext<IDefaultLayout>(
    {
        categories: []
    });

const DefaultLayout: React.FC = ({children}: { children: React.ReactChildren }) => {
    const [categories, setCategories] = useState([]);
    ;
    const getCategories = () => {
        httpClient.get('/category')
            .then(res => {
                console.log(res);
                setCategories(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        getCategories();
    }, [])
    return <div>
        <header className="container-fluid">
            <div className=" d-flex justify-content-between align-items-center">
                <div className="d-none d-sm-block">{moment().locale('bn').format('LLLL')}</div>
                <div>
                    <Link href='/'>
                        <a className="navbar-brand">
                            <img style={{height: 80}} src="/static/img/logo.png"/>
                        </a>
                    </Link>
                </div>
                <div>
                    <a className="btn btn-primary" href="#" data-toggle="modal" data-target="#loginModal">Login</a>
                </div>
            </div>
        </header>
        <Navbar expand="lg" style={{background: 'white'}}>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <ul className="navbar-nav" >
                    {
                        categories.map(category => (<li key={category.id} className="nav-item active">
                            <Link href={`/news/${category.name}`}>
                                <a className="nav-link">{category.name}</a>
                            </Link>
                        </li>))
                    }
                </ul>
            </Navbar.Collapse>
        </Navbar>
        <DefaultLayoutContext.Provider value={{categories}}>  {children}</DefaultLayoutContext.Provider>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <footer>
                        <img src="/static/img/logo.png"/>
                        <ul>
                            <li><a href="#">বিজয় নিউজ</a></li>
                            <li><a href="#">গোপনীয়তা নীতি</a></li>
                            <li><a href="#">নীতিমালা</a></li>
                            <li><a href="#">যোগাযোগ</a></li>
                        </ul>
                        <hr/>
                        <p>স্বত্ব © ২০২১ বিজয় নিউজ</p>
                    </footer>
                </div>
            </div>
        </div>


    </div>
}

export default DefaultLayout;