import React from 'react';
import NavBar from '../Components/NavBar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const MainLayout = () => {
    return (
        <div>
            <header>
                <nav>
                    <NavBar></NavBar>
                </nav>
            </header>
            <main>
                <Outlet></Outlet>
                <footer>
                    <Footer></Footer>
                </footer>
            </main>
            
        </div>
    );
};

export default MainLayout;