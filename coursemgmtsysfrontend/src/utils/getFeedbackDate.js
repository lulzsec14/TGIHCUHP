import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const getFeedbackDate = (date) => {
    console.log(date);
    let dateObj = new Date();

    /* const resDate = formatDistanceToNow(new Date(dateObj.getFullYear(date),dateObj.getMonth(date),dateObj.getDay(date)) ,{
        addSuffix:true,
        includeSeconds:true
    }) */
    return new Date(dateObj.getFullYear(date),dateObj.getMonth(date),dateObj.getDay(date)).toDateString();
    //console.log(resDate);
    //console.log(dateObj.getMonth(date) ,dateObj.getDay(date) , dateObj.getFullYear(date));
    //return resDate;
}