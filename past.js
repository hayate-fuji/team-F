var db = firebase.firestore();
var calender = [];
var today = new Date();
console.log(today)
for(let i = 0; i<30; i++){
    calender.push({date:new Date(today), count:0})
    today.setDate(today.getDate() - 1);
}

console.log(calender)
db.collection("goal").get().then((querySnapshot)=>{
    querySnapshot.forEach((doc) => {
        console.log(`${doc.data().startDate.toDate()}`);
        calender.forEach((v)=> {
            if(isBetweenDay(doc.data().startDate.toDate(), doc.data().endDate.toDate(), v.date)){
                v.count ++;
            }
        })
        
    });
    console.log(calender);
});

function isBetweenDay(startdate, enddate, date){
    const start_year = startdate.getYear();
    const start_month = startdate.getMonth();
    const start_day = startdate.getDate();

    const end_year = enddate.getYear();
    const end_month = enddate.getMonth();
    const end_day = enddate.getDate();

    const date_year = date.getYear();
    const date_month = date.getMonth();
    const date_day = date.getDate();
    if(start_year<=date_year && date_year <= end_year){
        if(start_month<=date_month && date_month <= end_month){
            if(start_day<=date_day && date_day <= end_day){
                return true;
            }
            
        }
    }
    return false;
}