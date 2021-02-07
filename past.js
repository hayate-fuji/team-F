(async ()=>{var db = firebase.firestore();
var calender = [];
var today = new Date();
//console.log(today)


//一か月カレンダーづくり
for(let i = 0; i<30; i++){
    calender.push({date:new Date(today), count:-1, rate:-1})
    today.setDate(today.getDate() - 1);
}
//console.log > foreach
//console.log(calender)

console.log(calender)
db.collection("goal").get().then((querySnapshot)=>{
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.data().startDate.toDate()}`);
        calender.forEach((v)=> {
            //console.log(calender)
            if(isBetweenDay(doc.data().startDate.toDate(), doc.data().endDate.toDate(), v.date)){
                v.count = 0;
            }
        });
        
    });
});
console.log(calender);

//v.count 0は少なくとも練習すべき日なので，データベースから入力履歴を探す．達成割合を求めて格納
// db.collection("dairyachive").get().then((querySnapshot)=>{
//     querySnapshot.forEach((doc) => {
//         //割合を入れる
//         calender.forEach((v)=> {
//         })
//     });
// });
db.collection("dairyachive").get().then((querySnapshot)=>{
    calender.forEach((v)=>{
        //v.count-1のまま．．
        console.log(v.count)
        if(v.count==0){
            v.rate = 0;
        }
    });

})
console.log(calender);

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

//過去の設定トレーニング表示
var trainingData = [];
db.collection("goal").orderBy("startDate", "desc").get().then((querySnapshot)=>{
    querySnapshot.forEach((doc)=> {
        trainingData.push({
            startDate: new Date(doc.data().startDate.toDate()), 
            endDate: new Date(doc.data().endDate.toDate()), 
            trainingName: doc.data().trainingName,
            numberTimes: doc.data().numberTimes,
            valueType: doc.data().valueType})
    });
    //console.log(trainStartDays)

});



})()


//色決め
function judgeColor(num){
    if(num<0.0){
        return "#000000"
    }
    if(num<0.2){
        return "#00FF00"
    }
    if(num<0.4){
        return "#00BB00"
    }
    if(num<0.6){
        return "#008800"
    }
    if(num<0.8){
        return "#004400"
    }
    if(num==1.0){
        return "#001100"
    }

}

// var displayButton = document.getElementById("displaybutton");
// //クリックイベント
// displayButton.onclick = ()=>{
//     /*ここで得たselected_rangeで過去のデータ表示範囲を決定*/
//     var r_element = document.getElementById("range");
//     var selected_range = r_element.value;
//     console.log(selected_range);

// }