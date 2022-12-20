
function dateFormater(unformatedDate: string | null | undefined, isMessage = false) {
    if (!unformatedDate) {
        return null;
    }
    const calcDate = new Date(unformatedDate);

    if (isNaN(+calcDate)) {
        return unformatedDate;
    }

    const day = calcDate.getDate();
    const diff = new Date().getDate() - day;

    const isYesterday = diff === 1;
    const isToday = diff < 1;

    if (isYesterday && !isMessage) {
        return 'Вчера';
    } else if (isToday && !isMessage) {
        return 'Сегодня';
    }

    const hour = calcDate.getHours();
    const calcHour = hour >= 10 ? hour : `0${hour}`;
    const minutes = calcDate.getMinutes();
    const calcMinutes = minutes >= 10 ? minutes : `0${minutes}`;

    if (isToday || isMessage) {
        return `${calcHour}:${calcMinutes}`;
    }

    const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    const calcMouth = months[calcDate.getMonth()];

    return `${day} ${calcMouth}`;
}

export default dateFormater;
