import React from 'react';
import './MainArticle.css'

export const MainArticle = ({title, image, category, description, sources}) => {
    return (
        <article className="main-article" key={title}>
            <div className="main-article__image-container">
                <img className="article-img main-article__image" src={image} alt="Фотография новости"></img>
            </div>
            <div className="main-article__content">
                <span className="article-category">{category}</span>
                <h2 className="main-article__title">{title}</h2>
                <p className="main-article__text">{description}</p>
                <span className="main-article__source article-source">
                    {sources}
                </span>
            </div>
        </article>
    )
}
