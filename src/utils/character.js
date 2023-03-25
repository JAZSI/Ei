const genshindb = require('genshin-db');
const canvas = require('canvas');

async function character(character) {
    const db = genshindb.characters('names', { matchCategories: true });
    if (!db.includes(character)) {
        throw new Error(db);
    }
    const data = genshindb.characters(character);

    const canvasElement = canvas.createCanvas(1000, 600);
    const context = canvasElement.getContext('2d');

    context.fillStyle = '#25294A';
    context.fillRect(0, 0, canvasElement.width, canvasElement.height);

    context.globalAlpha = 0.4;

    const image = await canvas.loadImage(data.images.cover1);
    context.drawImage(image, 0, 0, 990, 607);

    context.globalAlpha = 1;

    const icon = await canvas.loadImage(data.images.icon);
    context.lineJoin = 'round';
    context.lineWidth = 5;
    context.strokeStyle = ' #007FFF';
    context.strokeRect(
        750 - context.lineWidth / 2,
        40 - context.lineWidth / 2,
        200 + context.lineWidth,
        200 + context.lineWidth
    );
    context.drawImage(icon, 750, 40, 200, 200);

    if (data.rarity === '4') {
        context.fillStyle = '#A020F0';
        context.font = 'bold 40px sans-serif';
        context.fillText(' ★★★★', 750, 280);
    } else if (data.rarity === '5') {
        context.fillStyle = '#FFD700';
        context.font = 'bold 40px sans-serif';
        context.fillText('★★★★★', 750, 280);
    }

    context.fillStyle = 'white';

    context.font = 'bold 35px sans-serif';
    context.fillText(data.fullname, 40, 60);

    context.font = '30px sans-serif';
    context.fillText(data.title, 40, 90);

    context.font = '25px sans-serif';
    const text = data.description;
    const lines = [];
    let line = '';
    const words = text.split(' ');
    const maxWidth = 600 - 40;
    const lineHeight = 30;
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const width = context.measureText(line + word).width;
        if (width > maxWidth) {
            lines.push(line);
            line = '';
        }
        line += word + ' ';
    }
    lines.push(line);

    const maxHeight = 250 - 115;
    const availableLines = Math.floor(maxHeight / lineHeight);
    for (let i = 0; i < lines.length && i < availableLines; i++) {
        context.fillText(lines[i], 40, 115 + (i + 1) * lineHeight, maxWidth);
    }

    context.font = 'bold 25px sans-serif';
    context.fillText('Constellation: ' + data.constellation, 40, 270);

    context.font = '25px sans-serif';
    context.fillText('Vision: ' + data.element, 40, 310);
    context.fillText('Weapon: ' + data.weapontype, 300, 310);
    context.fillText('Region: ' + data.region, 40, 350);
    context.fillText('Affiliation: ' + data.affiliation, 300, 350);
    context.fillText('Birthday: ' + data.birthday, 40, 390);

    context.fillText('Voice Actors', 40, 440);
    context.font = '22px sans-serif';
    context.fillText('English: ' + data.cv.english, 50, 470);
    context.fillText('Chinese: ' + data.cv.chinese, 50, 500);
    context.fillText('Japanese: ' + data.cv.japanese, 50, 530);
    context.fillText('Korean: ' + data.cv.korean, 50, 560);

    const buffer = canvasElement.toBuffer();
    const result = {
        image: buffer,
        data: data,
    };
    return result;
}

module.exports = character;
