import React from 'react';
import logo from '../../../assets/logo/logo.png'

const Header = () => {
    return (
        <div>
           <div className='container mx-auto' >
                <div className="navbar">
                    {/* nav start */}
                    <div className="flex navbar-start">
                        <img style={{width: '60px'}} src={logo} alt="" />
                        <p className="font-bold normal-case lg:text-2xl md:text-2xl text-sm">Bangladesh Complaint Portal</p>
                    </div>
                    {/* end */}
                    {/* <div className='navbar-end'>
                        login
                    </div> */}
                </div>
            </div> 
        </div>
    );
};

export default Header;