const firstIDs = [1,5,8,10,12,14,16,18];

// [ライオン10〜40　ゴライオン40〜60 ミルムコレオ60〜90 武神ライオン90〜100]
//[アンデッド10〜40 ファンタズマ40〜80 死霊術師80〜100]
//[デザートホッパーライダー10〜50　スペインオオヤマネコミミ50〜100]
//[ヌベロ10〜50　ヌベルス50〜100]
//[アマビエ10〜50 アマヒコ50〜100]
//[カシュデヤン10〜70　エグリゴリ・ラミエル70〜100]
//[ケルベロス10〜60 武装ケルベロス60〜100]
//[ボーバルバニー10〜30　死神バニー30〜80　魔女クロウサー80〜100]

const monsters = [
    
    {id:1,family:1,image:"/image/0_lion.png", next:true, nextLevel:40},
    {id:2,family:1,image:"/image/1_lion.png", next:true, nextLevel:60},
    {id:3,family:1,image:"/image/2_milmkoreo.png", next:true, nextLevel:90},
    {id:4,family:1,image:"/image/3_bushinrion.png", next:false},

    {id:5,family:2,image:"/image/0_undeadblack.png", next:true, nextLevel:40},
    {id:6,family:2,image:"/image/1_fantazmablack.png", next:true, nextLevel:80},
    {id:7,family:2,image:"/image/2_siryoublack.png", next:false},

    {id:8,family:3,image:"/image/0_neko.png", next:true, nextLevel:50},
    {id:9,family:3,image:"/image/1_sinkaneko.png", next:false},
    
    {id:10,family:4,image:"/image/0_kasyudeyan.png", next:true, nextLevel:50},
    {id:11,family:4,image:"/image/1_egurigoriramieru.png", next:false},
    
    {id:12,family:5,image:"/image/0_amabie.png", next:true, nextLevel:50},
    {id:13,family:5,image:"/image/1_amahiko.png", next:false},
    
    {id:14,family:6,image:"/image/0_nubero.png", next:true, nextLevel:70},
    {id:15,family:6,image:"/image/1_nuberus.png", next:false},
    
    {id:16,family:7,image:"/image/0_keruberos.png", next:true, nextLevel:60},
    {id:17,family:7,image:"/image/1_busou.png", next:false},
    
    {id:18,family:8,image:"/image/0_bani.png", next:true, nextLevel:30},
    {id:19,family:8,image:"/image/1_bani.png", next:true, nextLevel:80},
    {id:20,family:8,image:"/image/2_bani.png", next:false},
];

(async () => { var db = firebase.firestore();
const doc = await db.collection("monster").doc("1").get();

    const monsterImg = document.getElementById("monster");
    const monster = findMonster(doc.data().id);
    console.log(doc.data().id)

    if (monster != undefined) { 
        monsterImg.setAttribute("src", monster.image) 
    }
    const pointDoc = await db.collection("evolutionPoints").doc("evolutionDocument").get();
    const point  = pointDoc.data().evPoint;
    document.getElementById("point").innerText = point;

    // 10を超えたらランダムで進化
    if (monster == undefined && point > 10) {
        const id = firstIDs [Math.floor (Math.random()*firstIDs.length)];
        db.collection("monster").doc("1").set({
            id:id,
            family:id
        })
        monsterImg.setAttribute("img",findMonster(id));
    } else if (monster.next && monster.nextLevel <= point){
        // firestoreのデータ更新
        console.log(monster)
        if(doc.data().id != monster.id + 1){
          db.collection("monster").doc("1").set({id:monster.id + 1})
          // モンスター画像の更新
          monsterImg.setAttribute("img",findMonster(monster.id + 1));
        //   window.location.reload();
        }
    }

    if (point >= 100) {
        const result = confirm("おめでとうございます！！");
        console.log(result);
        if (result) {
            console.log('卵')
            // 卵に戻す
            await db.collection("monster").doc("1").set({id:0})
            await db.collection("evolutionPoints").doc("evolutionDocument").set({evPoint:0});
        }
    }

})();


function findMonster(id) {
    return monsters.find(m => {
        return m.id == id
    });
}
