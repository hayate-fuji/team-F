var db = firebase.firestore();
db.collection("st").get().then((querySnapshot)=>{
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
});