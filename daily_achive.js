var db = firebase.firestore();
var today = new Date();
var todaysMenus = [];
var itemsCount;

var saveButton = document.getElementById("checkArea-button");

console.log(today)

db.collection("goal").get().then((querySnapshot)=>{
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
        console.log(`${doc.data().startDate.toDate()}`);
        if(isBetweenDay(doc.data().startDate.toDate(),doc.data().endDate.toDate(),today)){
            todaysMenus.push(doc.data());
        };
    });
    todaysMenus.forEach((menu,i) => {
        const checkArea = document.getElementById("checkbox_area");

        const div = document.createElement("div");
        const checkBox = document.createElement("input");
        const checkBox_label = document.createElement("label");

        var idName = "checkbox" + i;

        checkBox.setAttribute("type","checkbox");
        checkBox.setAttribute("id",idName);
        checkBox_label.setAttribute("for",idName);
        checkBox_label.innerText = menu.trainingName + 
                "   " + getnumberTimes(menu.numberTimes, menu.valueType);

        checkArea.append(div);
        div.appendChild(checkBox);
        div.appendChild(checkBox_label);
    });
    itemsCount = todaysMenus.length;
    console.log(todaysMenus);
}).catch(error=>{console.log(error)});

function getnumberTimes(numberTimes,valueType){
    if(valueType == 0){
        return numberTimes + "回/Day"
    }
    else{
        return numberTimes + "秒";
    }
}

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

saveButton.onclick= ()=>{
    
}