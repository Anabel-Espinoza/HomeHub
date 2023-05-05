module.exports = {
    format_date: (date) => {
        return date.toLocaleDateString()
    },
    //  from stackoverflow.com
    format_db_date: (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
            // console.log (d);

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
}