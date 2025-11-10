import React from 'react';
import NavBar from '../Components/NavBar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <header>
                <nav>
                    <NavBar></NavBar>
                </nav>
            </header>
            <main className='grow'>
                <Outlet></Outlet>
            </main>
                <footer>
                    <Footer></Footer>
                </footer>
        </div>
    );
};

export default MainLayout;