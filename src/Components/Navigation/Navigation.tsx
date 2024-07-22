import React, { FC } from 'react';
import { categoryNames } from '../../util';
import './Navigation.css';
import logo from '../../images/logo.svg';

interface Props {
    onNavClick: (event: React.MouseEvent<HTMLElement>) => void;
    currentCategory: string;
    className?: string;
    placement: 'header' | 'footer';
}

export const Navigation: FC<Props> = ({ onNavClick, currentCategory, className = '', placement = 'header' }) => {
    return (
        <nav className={`grid navigation navigation--${placement} ${className}`}>
            <a className="navigation__logo" data-href="index" href="#">
                <img className="navigation__logo-image" src={logo} alt="Логотип" />
            </a>
            <ul className="navigation__list">
                {['index', 'fashion', 'technologies', 'sport', 'courses'].map((item) => {
                    return (
                        <li className="navigation__item" key={item}>
                            <a
                                onClick={onNavClick}
                                className={`navigation__link ${currentCategory === item ? 'navigation__link--active' : '' }`}
                                data-href={item}
                                href="#"
                            >
                                {/* @ts-ignore */}
                                {categoryNames[item]}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
