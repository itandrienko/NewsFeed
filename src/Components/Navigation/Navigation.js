import React from 'react';
import { categoryNames } from "../../util.js";
import './Navigation.css'
import logo from '../../images/logo.svg';

export const Navigation = ({onNavClick, currentCategory, className='', placement = 'header'}) => {
    return (
        <nav className={`navigation grid navigation--${placement} ${className}`}>
            <a className="navigation__logo" href="#">
                <img className="navigation__image" src={logo} alt="logo"></img>
            </a>
            <ul className="navigation__list">
                {['index', 'fashion', 'tech', 'politics', 'sport'].map((item) => {
                    return (
                        <li className="navigation__item" key={item}>
                            <a onClick={onNavClick}
                               className={`navigation__link ${currentCategory === item ? 'navigation__link--active' : ''}`}
                               data-href={item}
                               href="#"
                            >
                                {categoryNames[item]}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}