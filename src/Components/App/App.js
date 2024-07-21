import React from 'react';
import { categoryIds } from "../../util.js";
import { Navigation } from "../Navigation/Navigation.js";
import { Articles } from "../Articles/Articles.js";
import './App.css'

export const App = () => {
    const [category, setCategory] = React.useState('index');
    const [articles, setArticles] = React.useState({items: [], categories: [], sources: []});

    const onNavClick = (e) => {
        e.preventDefault();
        setCategory(e.currentTarget.dataset.href);
    }

    React.useEffect(() => {
        fetch('http://frontend.karpovcourses.net/api/v2/ru/news/' + (categoryIds[category] || ''))
            .then(response => response.json())
            .then((response) => {
                setArticles(response);
            })
    }, [category])

    console.log(category);
    console.log(articles);

    return (
        <>
            <header className="header">
                <div className="container">
                    <Navigation
                        placement="header"
                        onNavClick={onNavClick}
                        currentCategory={category}
                        className={"header__navigation"}
                    />
                </div>
            </header>

            <main className="main">
                <Articles articles={articles}/>
            </main>

            <footer className="footer">
                <div className="container">
                    <Navigation
                        placement="footer"
                        onNavClick={onNavClick}
                        currentCategory={category}
                        className={"footer__navigation"}
                    />
                </div>
            </footer>
        </>
    )
}