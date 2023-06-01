
import React from 'react';
import { useEffect } from "react";
import Navigation from './header/Navigation';
const Layout = ({ title = 'Title', className, children }) => {
    useEffect(() => {
        document.title = title;
    }, [title])
    return (
        <div>
            <div className="mb-3">
                <Navigation />
                <div style={{ backgroundColor: 'lightgreen', paddingTop: '.2%', paddingBottom: '.05%' }}>
                    <h4 style={{ textAlign: 'center' }}>FREELANCEBANGLA</h4>
                    <p style={{ textAlign: 'center' }}>Your countries webpage to earn money by your skills.</p>
                </div>
            </div >
            <div className={className}>
                <div>
                    {children}
                </div>
            </div>
        </div >
    )
}

export default Layout;