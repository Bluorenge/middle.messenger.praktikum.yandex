
function dateFormater(unformatedDate: string | null | undefined) {
    if (!unformatedDate) {
        return null;
    }
    const calcDate = new Date(unformatedDate);
    const day = calcDate.getDate();
    const diff = new Date().getDate() - day;

    if (diff === 1) {
        return 'Вчера';
    }

    const hour = calcDate.getHours();
    const calcHour = hour >= 10 ? hour : `0${hour}`;
    const minutes = calcDate.getMinutes();
    const calcMinutes = minutes >= 10 ? minutes : `0${minutes}`;

    if (diff < 1) {
        return `${calcHour}:${calcMinutes}`;
    }

    const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    const calcMouth = months[calcDate.getMonth()];

    return `${day} ${calcMouth}`;
}

export default dateFormater;
