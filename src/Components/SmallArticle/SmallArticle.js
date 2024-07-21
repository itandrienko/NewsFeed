import React from 'react';
import './SmallArticle.css'

export const SmallArticle = ({title, sources, date}) => {
    return (
        <article className="small-article" key={title}>
            <h2 className="small-article__title">{title}</h2>
            <p className="small-article__caption">
                <span className="small-article__date article-date">{new Date(date).toLocaleDateString('ru-RU', {
                    month: "long",
                    day: "numeric"
                })}</span>
                <span className="small-article__source article-source">
                    {sources}
                </span>
            </p>
        </article>
    )
}