const fetch = require('node-fetch');

class WaifuPics {
    constructor(type) {
        this._type = type;
        this.sfwCategories = [
            'waifu',
            'neko',
            'shinobu',
            'megumin',
            'bully',
            'cuddle',
            'cry',
            'hug',
            'awoo',
            'kiss',
            'lick',
            'pat',
            'smug',
            'bonk',
            'yeet',
            'blush',
            'smile',
            'wave',
            'highfive',
            'handhold',
            'nom',
            'bite',
            'glomp',
            'slap',
            'kill',
            'kick',
            'happy',
            'wink',
            'poke',
            'dance',
            'cringe',
        ];
        this.nsfwCategories = ['waifu', 'neko', 'trap', 'blowjob'];
    }

    async getImage(category) {
        if (
            !this.sfwCategories.includes(category) &&
            !this.nsfwCategories.includes(category)
        ) {
            return new Error(
                `Error: '${category}' is not a supported category.`
            );
        }
        if (this.type !== 'sfw' && this.type !== 'nsfw') {
            return new Error(`Error: '${this.type}' is not a supported type.`);
        }
        try {
            const response = await fetch(
                `https://api.waifu.pics/${this.type}/${category}`
            );
            const json = await response.json();
            return json.url;
        } catch (error) {
            return error;
        }
    }
    get type() {
        return this._type;
    }

    get categories() {
        if (this._type === 'sfw') {
            return this.sfwCategories;
        }
        if (this._type === 'nsfw') {
            return this.nsfwCategories;
        }
        return new Error(`Error: '${this._type}' is not a supported type.`);
    }
}

const sfwWaifuPics = new WaifuPics('sfw');
const nsfwWaifuPics = new WaifuPics('nsfw');

for (const category of sfwWaifuPics.sfwCategories) {
    sfwWaifuPics[category] = async function () {
        const imageUrl = await this.getImage(category);
        return imageUrl;
    };
}

for (const category of nsfwWaifuPics.nsfwCategories) {
    nsfwWaifuPics[category] = async function () {
        const imageUrl = await this.getImage(category);
        return imageUrl;
    };
}

module.exports = { sfw: sfwWaifuPics, nsfw: nsfwWaifuPics, WaifuPics };
