import React from 'react';
import { MainArticle } from "../MainArticle/MainArticle.js";
import { SmallArticle } from "../SmallArticle/SmallArticle.js";
import './Articles.css'

export const Articles = ({articles}) => {
    return (
        <section className="main">
            <section className="articles">
                <div className="container grid">
                    <section className="articles__big-column">
                        {articles.items.slice(0, 3).map((item) => {
                            return (
                                <MainArticle
                                    key={item.title}
                                    title={item.title}
                                    description={item.description}
                                    image={item.image}
                                    category={articles.categories.find(({id}) => item.category_id === id).name}
                                    sources={articles.sources.find(({id}) => item.source_id === id).name}
                                />
                            )
                        })}
                    </section>
                    <section className="articles__small-column">
                        {articles.items.slice(3, 12).map((item) => {
                            return (
                                <SmallArticle
                                    key={item.title}
                                    date={item.date}
                                    title={item.title}
                                    sources={articles.sources.find(({id}) => item.source_id === id).name}
                                />
                            )
                        })}
                    </section>
                </div>
            </section>
        </section>
    )
}