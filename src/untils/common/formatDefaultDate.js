export const formatDateDefault = (created) => {
    const date = created.split(" ");
    const result = date[date.length - 1].split("/").reverse().join("-");
    return result;
};

export const formatDate = (timeObj) => {
    const day = timeObj.getDay() === 0 ? "Chủ nhật" : `Thứ ${timeObj.getDay() + 1}`;
    const month = timeObj.getMonth() + 1 <= 9 ? `0${timeObj.getMonth() + 1}` : timeObj.getMonth();
    const date = `${timeObj.getDate()}/${month}/${timeObj.getFullYear()}`;
    const time = `${timeObj.getHours()}:${timeObj.getMinutes()}`;
    return `${day}, ${time} ${date}`;
};
