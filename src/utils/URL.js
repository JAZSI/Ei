function isValidHttpUrl(string) {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
}

function isDiscordWebhookUrl(url) {
    const pattern = /https:\/\/discord\.com\/api\/webhooks\/\d+\/\w+/;
    return pattern.test(url);
}

module.exports = { isValidHttpUrl, isDiscordWebhookUrl };
