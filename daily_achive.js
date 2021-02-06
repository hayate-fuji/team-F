var db = firebase.firestore();
var today = new Date();
var todaysMenus = [];
var itemsCount;

var dayArea = document.getElementById("today");
var saveButton = document.getElementById("checkArea-button");

let evPoint = 0;
var lastinputPoint = 0;
var today_to_String = "";
var get_documentDate_String = "";

var termDay;

console.log(today);

var docRef = db.collection("evolutionPoints").doc("evolutionDocument");
docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        evPoint = doc.data().evPoint;
        get_documentDate_String = doc.data().lastwriteDate;
        lastinputPoint = Number(doc.data().lastinputPoint);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        evPoint = 0;
        lastinputPoint = 0;
    }
}).catch(function(error) {
    evPoint = 0;
    lastinputPoint = 0;
    console.log("Error getting document:", error);
});

db.collection("goal").get().then((querySnapshot)=>{
    today_to_String = today.getFullYear() + "-" + (1 + today.getMonth()) + "-" + today.getDate();
    
    dayArea.innerHTML = today.getFullYear() + "/" + (1 + today.getMonth()) + "/" + today.getDay();;

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

        checkBox.setAttribute("name","checkBoxes");
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
                termDay = 1 + (enddate - startdate) / 86400000;
                return true;
            }
            
        }
    }
    return false;
}

saveButton.onclick = ()=>{
    var checkCount = 0;
    const checkboxArray = document.getElementsByName("checkBoxes");

    var to_collect_evPoint = 0;

    for (let i = 0; i < checkboxArray.length; i++){
		if(checkboxArray[i].checked){ //(color1[i].checked === true)と同じ
			checkCount++;
            to_collect_evPoint += (100 / (termDay * checkboxArray.length));
		}
	}
    console.log(today,itemsCount,checkCount);
    db.collection("daily_achive").doc(today_to_String).set({
        date: today,
        toAchive: itemsCount,
        achivementNum: checkCount
    });
    
    if(today_to_String == get_documentDate_String){
        evPoint -= lastinputPoint;
    }
    else{
    }
    
    evPoint += to_collect_evPoint;

    db.collection("evolutionPoints").doc("evolutionDocument").set({
        evPoint: evPoint,
        lastwriteDate: today_to_String,
        lastinputPoint: to_collect_evPoint
    });


    console.log("evPoints",evPoint,to_collect_evPoint,lastinputPoint);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            evPoint = doc.data().evPoint;
            get_documentDate_String = doc.data().lastwriteDate;
            lastinputPoint = Number(doc.data().lastinputPoint);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            evPoint = 0;
            lastinputPoint = 0;
        }
    }).catch(function(error) {
        evPoint = 0;
        lastinputPoint = 0;
        console.log("Error getting document:", error);
    });
    function readEvPoint(){
        
    }
}