var db = firebase.firestore();
// db.collection("st").get().then((querySnapshot)=>{
//     querySnapshot.forEach((doc) => {
//         console.log(`${doc.id} => ${doc.data()}`);
//     });
// });

// db.collection("users").add({
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
// })
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//     console.error("Error adding document: ", error);
// });
var saveButton = document.getElementById("save-button");
saveButton.onclick = ()=>{
    console.log(traningList)
    traningList.forEach((training)=>{
        db.collection("goal").add({
            trainingName: training.trainingName,
            numberTimes: training.numberTimes
        })
    })
}