import React, { FunctionComponent } from 'react'

const Header: FunctionComponent = () => {
  return (
        <nav className="navbar navbar-secondary fixed-top bg-secondary flex-md-nowrap p-0">
            <a className="navbar-brand col-sm-3 col-md-1 col-lg-1 mr-0" href="#">
                Company name
            </a>
            <input
                className="form-control form-control-dark w-100"
                type="text"
                placeholder="Search"
                aria-label="Search"
            />
            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap">
                    <a className="nav-link" href="#">
                        Sign out
                    </a>
                </li>
            </ul>
        </nav>
  )
}
export default Header
