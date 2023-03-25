const fetch = require('node-fetch');

/**
 * @param {object} options - Options to pass to the booru
 * @param {string[]} options.tags - Tags to search for
 * @param {number} options.limit - Limit of posts to return
 *
 * @example
 * gelbooru({
 *     tags: ['1girl'],
 *     limit: 2,
 * }).then(data => {
 *     console.log(data);
 * })
 */
async function gelbooru({ tags, limit }) {
    if (!Array.isArray(tags)) {
        throw new Error('tags must be an array');
    }
    if (typeof limit !== 'number') {
        throw new Error('limit must be a number');
    }
    if (limit < 1 || limit > 100) {
        throw new Error('limit must be a number between 1 and 100');
    }
    const tagString = tags.join('+');
    const url =
        'https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&';
    const response = await fetch(`${url}?tags=${tagString}&limit=${limit}`);
    if (!response.ok) {
        throw new Error(`Failed to retrieve posts: ${response.statusText}`);
    }
    const data = await response.json();
    return data.post;
}

/**
 * @param {object} options - Options to pass to the booru
 * @param {string[]} options.tags - Tags to search for
 * @param {number} options.limit - Limit of posts to return
 *
 * @example
 * konachan({
 *     tags: ['1girl'],
 *     limit: 2,
 * }).then(data => {
 *     console.log(data);
 * })
 */
async function konachan({ tags, limit }) {
    if (!Array.isArray(tags)) {
        throw new Error('tags must be an array');
    }
    if (typeof limit !== 'number') {
        throw new Error('limit must be a number');
    }
    if (limit < 1 || limit > 100) {
        throw new Error('limit must be a number between 1 and 100');
    }
    const tagString = tags.join('+');
    const url = 'https://konachan.com/post.json?';
    const response = await fetch(`${url}tags=${tagString}&limit=${limit}`);
    if (!response.ok) {
        throw new Error(`Failed to retrieve posts: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

/**
 * @param {object} options - Options to pass to the booru
 * @param {string[]} options.tags - Tags to search for
 * @param {number} options.limit - Limit of posts to return
 *
 * @example
 * rule34({
 *     tags: ['1girl'],
 *     limit: 2,
 * }).then(data => {
 *     console.log(data);
 * })
 */
async function rule34({ tags, limit }) {
    if (!Array.isArray(tags)) {
        throw new Error('tags must be an array');
    }
    if (typeof limit !== 'number') {
        throw new Error('limit must be a number');
    }
    if (limit < 1 || limit > 100) {
        throw new Error('limit must be a number between 1 and 100');
    }
    const tagString = tags.join('+');
    const url = 'https://rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&';
    const response = await fetch(`${url}tags=${tagString}&limit=${limit}`);
    if (!response.ok) {
        throw new Error(`Failed to retrieve posts: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

/**
 * @param {object} options - Options to pass to the booru
 * @param {string[]} options.tags - Tags to search for
 * @param {number} options.limit - Limit of posts to return
 *
 * @example
 * safebooru({
 *     tags: ['1girl'],
 *     limit: 2,
 * }).then(data => {
 *     console.log(data);
 * })
 */
async function safebooru({ tags, limit }) {
    if (!Array.isArray(tags)) {
        throw new Error('tags must be an array');
    }
    if (typeof limit !== 'number') {
        throw new Error('limit must be a number');
    }
    if (limit < 1 || limit > 100) {
        throw new Error('limit must be a number between 1 and 100');
    }
    const tagString = tags.join('+');
    const url =
        'https://safebooru.org/index.php?page=dapi&s=post&q=index&json=1&';
    const response = await fetch(`${url}tags=${tagString}&limit=${limit}`);
    if (!response.ok) {
        throw new Error(`Failed to retrieve posts: ${response.statusText}`);
    }
    const data = await response.json();
    data.forEach((post) => {
        post.file_url = `https://safebooru.org/images/${post.directory}/${post.image}`;
    });
    return data;
}

/**
 * @param {object} options - Options to pass to the booru
 * @param {string[]} options.tags - Tags to search for
 * @param {number} options.limit - Limit of posts to return
 *
 * @example
 * yandere({
 *     tags: ['1girl'],
 *     limit: 2,
 * }).then(data => {
 *     console.log(data);
 * })
 */
async function yandere({ tags, limit }) {
    if (!Array.isArray(tags)) {
        throw new Error('tags must be an array');
    }
    if (typeof limit !== 'number') {
        throw new Error('limit must be a number');
    }
    if (limit < 1 || limit > 100) {
        throw new Error('limit must be a number between 1 and 100');
    }
    const tagString = tags.join('+');
    const url = 'https://yande.re/post.json?';
    const response = await fetch(`${url}tags=${tagString}&limit=${limit}`);
    if (!response.ok) {
        throw new Error(`Failed to retrieve posts: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

module.exports = {
    gelbooru,
    konachan,
    rule34,
    safebooru,
    yandere,
};
