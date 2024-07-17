let data = null;

const mainNewsTemplate = document.getElementById("mainArticleTemplate");
const smallNewsTemplate = document.getElementById("smallArticleTemplate");

const escapeString = (string) => {
    const symbols = {
        "&": "&amp",
        "<": "&lt",
        ">": "&gt",
    }

    return string.replace(/[&<>]/g, (tag) => {
        return symbols[tag] || tag;
    });
}

const createMainNewsItem = (item) => {
    const categoryData = data.categories.find((categoryItem) => categoryItem.id === item.category_id);
    const sourceData = data.sources.find((sourceItem) => sourceItem.id === item.source_id);

    return `
        <article class="main-article">
            <div class="main-article__image-container">
                <img class="main-article__image" src="${encodeURI(item.image)}" alt="Фотография новости">
            </div>
            <div class="main-article__content">
                <span class="main-article__category article-category">${escapeString(categoryData.name)}</span>
                <h2 class="main-article__title">${escapeString(item.title)}</h2>
                <p class="main-article__text">${escapeString(item.description)}</p>
                <span class="main-article__source article-source">${escapeString(sourceData.name)}</span>
            </div>
        </article>
    `;
}

const createSmallNewsItem = (item) => {
    const sourceData = data.sources.find((sourceItem) => sourceItem.id === item.source_id);
    const dateData = new Date(item.date).toLocaleDateString('ru-RU', {month: "long", day: "numeric"});

    return `
        <article class="small-article">
            <h2 class="small-article__title">${escapeString(item.title)}</h2>
            <p class="small-article__caption">
                <span class="small-article__date article-date">${dateData}</span>
                <span class="small-article__source article-source">${escapeString(sourceData.name)}</span>
            </p>
        </article>
    `;
}

const renderNews = (categoryId) => {
    fetch('http://frontend.karpovcourses.net/api/v2/ru/news/' + (categoryId ? categoryId : ''))
        .then(response => response.json())
        .then((responseData) => {
            data = responseData;


            const mainNews = data.items.slice(0, 3);
            const smallNews = data.items.slice(3, 12);

            const mainNewsContainer = document.querySelector(".articles__big-column");
            const smallNewsContainer = document.querySelector(".articles__small-column");

            mainNews.forEach((item) => {
                const template = document.createElement("template");
                template.innerHTML = createMainNewsItem(item);
                mainNewsContainer.appendChild(template.content);
            });

            smallNews.forEach((item) => {
                const template = document.createElement("template");
                template.innerHTML = createSmallNewsItem(item);
                smallNewsContainer.appendChild(template.content);
            })
        })
}