
import React from 'react';
import logoImage from './assets/logo2.png'; // Update the path based on your folder structure

const HeaderComponent = () => {
    return (
        <div className='background-image'>
            <header>
                <nav className="background-image">
                    <div className="container hi" id='hi'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={logoImage} alt="Logo" style={{ marginRight: '30px' , borderRadius: '50%'}} />
                            <a className="navbar-brand">
                                <br></br>
                                <h2 className='text-center' style={{ color: 'white' }}>
                                    Welcome To AcciSupport 
                                </h2>
                                <h6 className='text-center' style={{ color: 'yellow' }}>Where Stranger Become Friend</h6>
                                <br />
                            </a>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default HeaderComponent;
