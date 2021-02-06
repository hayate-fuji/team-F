const monsters = [
    {id:1,name:"hogehoge",image:"/image/0_lion.png"},
    {id:2,name:"hogehoge",image:"/image/1_lion.png"},
    {id:3,name:"hogehoge",image:"/image/2_milmkoreo.png"},
    {id:4,name:"hogehoge",image:"/image/3_bushinrion.png"},
    {id:5,name:"hogehoge",image:"/image/0_undeadblack.png"},
    {id:6,name:"hogehoge",image:"/image/1_fantazmablack.png"},
    {id:7,name:"hogehoge",image:"/image/2_siryoublack.png"},
    {id:8,name:"hogehoge",image:"/image/0_neko.png"},
    {id:9,name:"hogehoge",image:"/image/1_sinkaneko.png"},
    {id:10,name:"hogehoge",image:"/image/0_kasyudeyan.png"},
    {id:11,name:"hogehoge",image:"/image/1_egurigoriramieru.png"},
    {id:12,name:"hogehoge",image:"/image/0_amabie.png"},
    {id:13,name:"hogehoge",image:"/image/1_amahiko.png"},
    {id:14,name:"hogehoge",image:"/image/0_nubero.png"},
    {id:15,name:"hogehoge",image:"/image/1_nuberus.png"},
    {id:16,name:"hogehoge",image:"/image/0_keruberos.png"},
    {id:17,name:"hogehoge",image:"/image/1_busou.png"},
    {id:18,name:"hogehoge",image:"/image/0_bani.png"},
    {id:19,name:"hogehoge",image:"/image/1_bani.png"},
    {id:20,name:"hogehoge",image:"/image/2_bani.png"},
];

// firestoreからモンスターの所持状況を取得

const monsterListUl = document.getElementById('monsterList');
monsters.forEach(monster => {
    const div = document.createElement("div");
    div.setAttribute('class','monster')
    const li = document.createElement("li");
    const img = document.createElement("img");
    // ここでモンスターを所持していたらモンスターの画像を入れる
    if(true){
      img.setAttribute('src',monster.image);
    }else{
      img.setAttribute('src','/image/hatena.png');
    }
    li.append(img);
    div.append(li);
    monsterListUl.append(div);
});