const categoryIds= {
    index: 0,
    fashion: 3,
    tech: 1,
    sport: 2,
    politics: 4
}

const categoryNames = {
    index: 'Главная',
    fashion: 'Мода',
    tech: 'Технологии',
    sport: 'Спорт',
    politics: 'Политика'
}

const Navigation = ({onNavClick, currentCategory, className=''}) => {
    return (
        <nav className={`navigation grid ${className}`}>
            <a className="navigation__logo" href="#">
                <img className="navigation__image" src="images/logo.svg" alt="logo"></img>
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

const MainArticle = ({title, image, category, description, sources}) => {
    return (
        <article className="main-article" key={title}>
            <div className="main-article__image-container">
                <img className="main-article__image" src={image} alt="Фотография новости"></img>
            </div>
            <div className="main-article__content">
                <span
                    className="main-article__category article-category">{category}</span>
                <h2 className="main-article__title">{title}</h2>
                <p className="main-article__text">{description}</p>
                <span className="main-article__source article-source">
                    {sources}
                </span>
            </div>
        </article>
    )
}

const SmallArticle = ({title, sources, date}) => {
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

const App = () => {
    const [category, setCategory] = React.useState('index');
    const [articles, setArticles] = React.useState({items: [], categories: [], sources: []});

    const onNavClick = (e) => {
        e.preventDefault();
        setCategory(e.currentTarget.dataset.href);
    }

    React.useEffect(() => {
        fetch('http://frontend.karpovcourses.net/api/v2/ru/news/' + (categoryIds[category]: ''))
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
                        onNavClick={onNavClick}
                        currentCategory={category}
                        className={"header__navigation"}
                    />
                </div>
            </header>

            <main className="main">
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
            </main>

            <footer className="footer">
                <div className="container">
                    <Navigation
                        onNavClick={onNavClick}
                        currentCategory={category}
                        className={"footer__navigation"}
                    />
                    <div className="footer__info">
                        <a className="footer__link" href="https://github.com/itandrienko" target="_blank">My GitHub</a>
                        <p className="footer__copyright">© 2024</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))