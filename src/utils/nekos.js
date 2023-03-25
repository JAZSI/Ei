// https://nekos.life/api/v2/endpoints
const fetch = require('node-fetch');

const endpoints = [
    'smug',
    'woof',
    'gasm',
    '8ball',
    'goose',
    'cuddle',
    'avatar',
    'slap',
    'v3',
    'pat',
    'gecg',
    'feed',
    'fox_girl',
    'lizard',
    'neko',
    'hug',
    'meow',
    'kiss',
    'wallpaper',
    'tickle',
    'spank',
    'waifu',
    'lewd',
    'ngif',
];

/**
 * Makes a request to the nekos.life API and returns the URL of an image from the specified endpoint.
 * @param {string} endpoint - The endpoint to use, which determines the type of image returned. Must be one of the following: smug, woof, gasm, 8ball, goose, cuddle, avatar, slap, v3, pat, gecg, feed, fox_girl, lizard, neko, hug, meow, kiss, wallpaper, tickle, spank, waifu, lewd, ngif.
 * @returns {string} The URL of the image.
 * @throws {Error} If the endpoint is not recognized.
 */
async function nekos(endpoint) {
    if (!endpoints.includes(endpoint)) {
        throw new Error(
            `Invalid endpoint: "${endpoint}". Available endpoints: ${endpoints.join(
                ', '
            )}`
        );
    }

    try {
        const response = await fetch(
            `https://nekos.life/api/v2/img/${endpoint}`
        );
        const data = await response.json();
        return data.url;
    } catch (error) {
        console.error(error);
    }
}

async function cat() {
    const response = await fetch('https://nekos.life/api/v2/cat');
    const data = await response.json();
    return data.cat;
}

module.exports = { nekos, cat, endpoints };
