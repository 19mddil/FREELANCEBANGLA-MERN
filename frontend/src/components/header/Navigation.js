import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, NavbarToggler, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import { signout, isAuthenticated, userInfo } from '../../utils/auth';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
        }
    }
    navToggler = () => {
        this.setState({
            isNavOpen: !this.state.isNavOpen,
        })
    }
    render() {
        return (
            <Navbar dark color='success' expand="sm">
                <NavbarBrand href='/' style={{ border: '2px solid green', padding: '5px', color: 'white', textEmphasis: 'black' }} >  FBL  </NavbarBrand>
                <NavbarToggler onClick={this.navToggler} />
                <Collapse isOpen={this.state.isNavOpen} navbar>
                    <Nav className='mr-auto' navbar>
                        <NavItem>
                            <Link to='/' className='nav-link'> Home</Link>
                        </NavItem>
                        {
                            !isAuthenticated()
                            &&
                            (<>
                                <NavItem>
                                    <Link to='/login' className='nav-link'> Login</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to='/register' className='nav-link'> Register</Link>
                                </NavItem>
                            </>)
                        }
                        {
                            isAuthenticated()
                            &&
                            (<>
                                <NavItem>
                                    <Link to='/logout' className='nav-link' onClick={() => { signout() }} >Logout</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to='/user/dashboard' className='nav-link'>{userInfo().role} Dashboard</Link>
                                </NavItem>
                            </>)
                        }

                    </Nav>
                </Collapse>
            </Navbar >
        )
    }
}

export default Navigation;

