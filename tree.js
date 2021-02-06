// const img = document.getElementById("charaImg");

const firstIDs = [1,5,8,10,12,14,16,18];

const monsters = [
    
    {id:1,name:"hogehoge",image:"/image/0_lion.png", next:true, nextLevel:20},
    {id:2,name:"hogehoge",image:"/image/1_lion.png", next:true, nextLevel:50},
    {id:3,name:"hogehoge",image:"/image/2_milmkoreo.png", next:true, nextLevel:100},
    {id:4,name:"hogehoge",image:"/image/3_bushinrion.png", next:false},

    {id:5,name:"hogehoge",image:"/image/0_undeadblack.png", next:true},
    {id:6,name:"hogehoge",image:"/image/1_fantazmablack.png", next:true},
    {id:7,name:"hogehoge",image:"/image/2_siryoublack.png", next:false},

    {id:8,name:"hogehoge",image:"/image/0_neko.png", next:true},
    {id:9,name:"hogehoge",image:"/image/1_sinkaneko.png", next:false},
    
    {id:10,name:"hogehoge",image:"/image/0_kasyudeyan.png", next:true},
    {id:11,name:"hogehoge",image:"/image/1_egurigoriramieru.png", next:false},
    
    {id:12,name:"hogehoge",image:"/image/0_amabie.png", next:true},
    {id:13,name:"hogehoge",image:"/image/1_amahiko.png", next:false},
    
    {id:14,name:"hogehoge",image:"/image/0_nubero.png", next:true},
    {id:15,name:"hogehoge",image:"/image/1_nuberus.png", next:false},
    
    {id:16,name:"hogehoge",image:"/image/0_keruberos.png", next:true},
    {id:17,name:"hogehoge",image:"/image/1_busou.png", next:false},
    
    {id:18,name:"hogehoge",image:"/image/0_bani.png", next:true},
    {id:19,name:"hogehoge",image:"/image/1_bani.png", next:true},
    {id:20,name:"hogehoge",image:"/image/2_bani.png", next:false},
];

(async () => { var db = firebase.firestore();
const doc = await db.collection("monster").doc("1").get();

    console.log(doc.data());
    const monster = monsters.find(m => {
        return m.id == doc.data().id
    });
    // console.log(monster);

    if (monster != undefined) { 
        document.getElementById("monster").setAttribute("src", monster.image) 
    }
    var point = 55;
    document.getElementById("point").innerText = point;
    if (monster == undefined) {
        db.collection("monster").doc("1").set({
            id:firstIDs [Math.floor (Math.random()*firstIDs.length)]
        })
    } else if (monster.next && monster.nextLevel <= point){
        db.collection("monster").doc("1").set({id:monster.id + 1})
    }

    if (point >= 100) {
        const result = confirm("おめでとうございます！！");
        if (result) {db.collection("monster").doc("1").set({id:0})}
    }

})();



