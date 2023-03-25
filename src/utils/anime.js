const fetch = require('node-fetch');

async function anime(query, allResults) {
    const res = await fetch(
        `https://kitsu.io/api/edge/anime?filter[text]=${query}`
    );
    const json = await res.json();
    if (!json.data.length) return 'Could not find any results.';

    if (allResults) {
        return json.data;
    } else {
        return json.data[0];
    }
}

async function manga(query, allResults) {
    const res = await fetch(
        `https://kitsu.io/api/edge/manga?filter[text]=${query}`
    );
    const json = await res.json();
    if (!json.data.length) return 'Could not find any results.';

    if (allResults) {
        return json.data;
    } else {
        return json.data[0];
    }
}

async function quotes() {
    const res = await fetch('https://animechan.vercel.app/api/random');
    const json = await res.json();
    return json;
}

module.exports = { anime, manga, quotes };
