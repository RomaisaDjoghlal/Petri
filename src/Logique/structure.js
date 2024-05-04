export class Place {

    constructor(IdP , nbj){
       this.IdP = IdP ;
       this.nbjetons = nbj;
       this.psup = false; 
    }
    GetPlaceId(){
        return this.Id ;
    }
    SetPlaceId(IdP){
        this.Id = IdP ;
    }
    GetJetons(){
        return this.nbjetons; 
    }
    SetJetons(je){
        this.nbjetons = je ; 
    }
    GetPlacesup(){
        return this.psup ;
    }
    SetPlacesup(supp){
        this.psup = supp  ;
    }
    
    }
    
export class Transition {
    
    constructor(Idt,type,poid){
       this.IdT = Idt ;
       this.Type = type;// le type peut etre 'timed' ou 'imediate'
       this.Poid = poid ;
       this.tsup = false;
       this.listplaces = []; 
    }
    GetTransId(){
        return this.Id ;
    }
    SetTransId(IdP){
        this.Id = IdP ;
    }
    GetType(){
        return this.Type; 
    }
    SetType(je){
        this.Type = je ; 
    }
    GetPoids(){
        return this.Poid; 
    }
    SetPoids(je){
        this.Poid = je ; 
    }
    GetTranssup(){
        return this.tsup ;
    }
    SetTranssup(supp){
        this.tsup = supp;
    }
    
    }
    class marqsomm {
        constructor(id, tab = []) {
            this.id = id;
            this.tab = tab;
        }
    
        // Getter pour récupérer le tableau
        getTab() {
            return this.tab;
        }
    
        // Setter pour définir le tableau
        setTab(newTab) {
            this.tab = newTab;
        }
    
        // méthode pour ajouter un élément au tableau
        addToTab(item) {
            this.tab.push(item);
        }
    
        // méthode pour supprimer un élément du tableau par index
        removeFromTab(index) {
            if (index >= 0 && index < this.tab.length) {
                this.tab.splice(index, 1);
            } else {
                console.error("Index out of range.");
            }
        }
    
        // Getter pour récupérer l'ID
        getId() {
            return this.id;
        }
    
        // Setter pour définir l'ID
        setId(newId) {
            this.id = newId;
        }
    }
   
export class Reseau{
    constructor(poid = 0, type = 0){
       this.NpPlacesexist = 0;
       this.NpTransexist = 0;
       this.NpPlaces = 0 ;
       this.places = [];
       this.NpTrans = 0 ;
       this.Transitions = [];
       this.Pre = [[{poid,type}]];
       this.Post = [[{poid,type}]];
       this.marq=[];
       this.nbmarq=0;
       this.marqarc=[];
       this.nbarcs=0;
    }
    
    AddPlace(newplace) {
        this.places.push(newplace);
        this.NpPlaces++;
        this.NpPlacesexist++;
        let poid = 0 , type = 0 ;
        console.log('nbplace',this.NpPlaces)
        if ((this.NpPlaces)>1){
        // Vérifie si this.Pre contient des lignes avant de déterminer la longueur des colonnes
        const cols = this.Pre.length > 0 ? this.Pre[0].length : 1;

    
        // Création d'une nouvelle ligne remplie de zéros
        const nouvelleLigne = Array(cols).fill({poid , type});
    
        // Ajout de la nouvelle ligne à la fin du tableau existant
        this.Pre.push(nouvelleLigne);
        //meme traitement pour post
        
     const colsp = this.Pre.length > 0 ? this.Post[0].length : 1;
    const nouvelleLignep = Array(colsp).fill({poid , type});
    this.Post.push(nouvelleLignep);
    }      
    }
    creeplace(){
        const place= new Place(this.NpPlaces,0);
        this.AddPlace(place);
     
    }
    
    AddTrans(newtrans) {
        this.NpTransexist++;
        this.Transitions.push(newtrans);
        this.NpTrans++;
        let poid = 0 , type = 0 ;
        if((this.NpTrans)>1){
        // Ajouter une seule colonne remplie de zéros à chaque ligne
        const nouvelleColonne = {poid , type};
        this.Pre.forEach(ligne => ligne.push(nouvelleColonne));
       //POST
       const nouvelleColonnep = {poid , type};
        this.Post.forEach(ligne => ligne.push(nouvelleColonnep));
    }
    }
    
    creetrans(){
        const trans= new Transition(this.NpTrans,false,1);
        this.AddTrans(trans);
    }
    creetransTimed(){
        const trans= new Transition(this.NpTrans,true,1);
        this.AddTrans(trans);
    }
    SuppPlace(Idplace){  // on doit entrer Id de cette place a supprimer du list 
        this.places[Idplace].SetPlacesup(true);
        this.places[Idplace].SetJetons(-1);
        this.NpPlacesexist = this.NpPlacesexist - 1 ;
        let poid = 0 , type = 0 ;
        for (let i = 0; i < this.Transitions.length; i++) {

        this.Pre[Idplace][i] = {poid , type};
        this.Post[Idplace][i] = {poid , type};
        }
    }
    SuppTrans(Idtrans){
        this.Transitions[Idtrans].SetTranssup(true);
        this.NpTransexist = this.NpTransexist - 1 ;
        let poid = 0 , type = 0 ;
        for (let i = 0; i < this.places.length; i++) {
        this.Pre[i][Idtrans] = {poid , type};
      }
      for (let j = 0; j < this.places.length; j++) {
        this.Post[j][Idtrans] = {poid , type};
      }
    }
    Sauvgarder(){
        // on fait le sauvgarde des deux listes + autres 
    }
    Addpre(Idplace,Idtrans,poid,type){ // le type temporise ou imediate 
       
        this.Pre[Idplace][Idtrans] = {poid , type }
    }
    Addpost(Idplace,Idtrans,poid,type){ // le type temporise ou imediate 
       
        this.Post[Idplace][Idtrans] = {poid , type }
    }

    DelteReseau(){
        let poid=0;
        let type=0;
        this.NpPlacesexist = 0;
        this.NpTransexist = 0;
        this.NpPlaces = 0 ;
        this.places=[];     
        this.NpTrans = 0 ;
      
       this.Transitions=[];
        this.Pre = [[{poid,type}]];
        this.Post = [[{poid,type}]];
    }

    Calculerproba(){
    
    } 
    CreerGraphmarquage(){
       let marquage = [] ;
       
    }
    AfficherPost(){
        console.log('matrice ');
//Nombre de colonnes (longueur d'une ligne)
const colonnesp = this.Post[0].length; // Supposant que toutes les lignes ont la même longueur
const lignesp = this.Post.length;
// Affichage des dimensions

console.log("Nombre de lignes :", lignesp);
console.log("Nombre de colonnes :", colonnesp);
for (let k = 0; k < this.Post.length; k++) {
    for (let l = 0; l < this.Post[k].length; l++) {
        // Afficher chaque élément du tableau
        console.log("la ligne [ " + k +"] a " + this.Post[k].length + "elements");
        console.log("tableau[" + k + "][" + l + "] =", this.Post[k][l]);
    }
}
    }
    AfficherPre(){
        console.log('matrice pre');
//Nombre de colonnes (longueur d'une ligne)
/*
const colonnesp = this.Pre[0].length; // Supposant que toutes les lignes ont la même longueur
const lignesp = this.Pre.length;
// Affichage des dimensions

console.log("Nombre de lignes :", lignesp);
console.log("Nombre de colonnes :", colonnesp);
for (let k = 0; k < this.Pre.length; k++) {
    for (let l = 0; l < this.Pre[k].length; l++) {
        // Afficher chaque élément du tableau
        console.log("la ligne [ " + k +"] a " + this.Pre[k].length + "elements");
        console.log("tableau[" + k + "][" + l + "] =", this.Pre[k][l]);
    }
}*/ console.log(this.Pre)
    }
    Afficherplaces(){
        console.log('places');
        console.log(this.places);
    }
    Affichertrans(){
        console.log('transitions');
        console.log(this.Transitions);
    }
    getmarqini() {
        const marqini = [];
        this.places.forEach(place => {
            marqini.push(place.nbjetons);
        });
        return marqini;
    }
    canfire(id,marq)
    {
        if (id < 0 || id >= this.Transitions.length) {
            console.error("ID de transition invalide.");
            return false;
        }
        if (this.Transitions[id].tsup) {
            console.error("La transition est déjà supprime .");
            return false;
        }
        let poid=0;
        let type=0;
        let k=true;
        for (let i=0;i<this.NpPlaces;i++)
        {
            poid=this.Pre[i][id].poid; console.log('poid',poid)
            type=this.Pre[i][id].type;
             if (type===false && poid > 0)
             {
               if(poid>marq[i])
               {
                return false;
               }
             }
             if (type===true && poid > 0)
             {

                if(poid<=marq[i] && marq[i]>=0)
                {
                    return false;
                }
             }
            /* */
        }
      let lie = false;
        for(let i = 0 ; i< this.NpPlaces ;i++){
        if(  this.Pre[i][id].poid > 0){  // add this !!!!!!!!!!!!!!!!!!!!!!!!
            console.log('ffffffffffffffff')
            lie = true; 
         }   }
         k=lie;
        return k;

    }
     // Fonction utilitaire pour vérifier l'égalité de deux marquages
     aremarkingsEqual(mark1, mark2) {
        if (mark1.length !== mark2.length) {
            return false;
        }
    
        for (let i = 0; i < mark1.length; i++) {
            if (mark1[i] !== mark2[i]) {
                return false;
            }
        }
    
        return true;
    }
    /*existemarquage(tab, m) {
        for (let i = 0; i < tab.length; i++) {
            let k = tab[i].mar;
            let stop = true; // On initialise stop à true pour chaque élément de tab
    
            // Vérifier si la longueur des deux tableaux est la même
            if (k.length !== m.length) {
                continue; // Passer à l'élément suivant de tab
            }
    
            // Vérifier chaque élément des tableaux k et m
            for (let j = 0; j < k.length; j++) {
                if ((k[j] !== m[j]) && (stop === true)) {
                    stop = false;
                    // Sortir de la boucle dès qu'une différence est détectée
                }
            }
    
            // Si stop est true à la fin de la boucle interne, cela signifie que les deux tableaux sont identiques
            if (stop) {
                return true; // On a trouvé un élément correspondant, donc on retourne true
            }
        }
    
        // Si aucun élément correspondant n'a été trouvé après avoir parcouru tous les éléments de tab, on retourne false
        return false;
    }*/
    getNextState(idt,m)
     {          

        let mf=[];  
        if(idt <0 || idt>=this.NpTrans || this.Transitions[idt].tsup===true )
        {
            console.log("la transition n'existe pas ")
            return -1;
        }
          let je=0;
          let js=0;
          let jf=0;
          for (let i = 0; i < m.length; i++) 
        {   
            if(m[i] === -1){
                jf = -1 ;
            }else{
           je=parseInt(this.Pre[i][idt].poid);
           js=parseInt(this.Post[i][idt].poid);
           console.log('je = ',je)
           console.log('js = ',js)
           jf=m[i]-je+js;
          /* mf.push(jf);*/
           if(jf < 0){
            jf = 0 ;
           }
            }
           mf[i] = jf ;  
        }
        console.log('marquage getnextstate ',mf)

        /*
        console.log(mf);
        */
        return mf;
     }   
     
 /*   
ConstrGraphmarq(m,idm,tab) {
    let i;
    let m1;
    let j;
    let j1;
    let tr;
    let fr;
    let lv;
    let l;
    let mar;
    let kse;
    let tabi=[];
    let tabt=[];
    for(i=0;i<this.NpTransexist;i++)
    {
        if (this.canfire(i, m)) 
        {
            tabi[i]=1;
            tabt[i]=0;
       }
       else{tabi[i]=-1;tabt[i]=-1;}
       
    }
    mar=m;
    fr=tabi;
    tr=tabt;
    lv=idm;
    if(!this.existemarquage(tab,m) && tab.length<30)
    {   
    kse= {fr,tr,mar,lv};
    tab.push(kse);
    }
    let stop=false;
    j=0;
    let k=0;
    while (stop===false && j<tab.length)
    {
      while (stop===false && k< tab[j].fr.length)
      {
        if (tab[j].fr[k]===1 && tab[j].tr[k]===0)
        {
          stop=true;
          tab[j].tr[k]=1;
          m=tab[j].mar;
           j1=k;
           l=tab[j].lv;
          break;
        }
        else {k++;}
      }
      j++;
      k=0;
    }
    if(stop===true)
    {  
    l++;  
    m1 = this.getNextState(j1 , m);
    console.log(this.existemarquage(tab,m1));
    console.log(m1);
    this.ConstrGraphmarq(m1,l,tab);
    }  
}
*/
existemarquage(tab, m) {
    for (let i = 0; i < tab.length; i++) {
        let k = tab[i].mar;
        let stop = true; // On initialise stop à true pour chaque élément de tab

        // Vérifier si la longueur des deux tableaux est la même
        if (k.length !== m.length) {
            continue; // Passer à l'élément suivant de tab
        }

        // Vérifier chaque élément des tableaux k et m
        for (let j = 0; j < k.length; j++) {
            if (k[j] !== m[j]) {
                stop = false;
                break; // Sortir de la boucle dès qu'une différence est détectée
            }
        }

        // Si stop est true à la fin de la boucle interne, cela signifie que les deux tableaux sont identiques
        if (stop) {
            return i; // On a trouvé un élément correspondant, donc on retourne true
        }
    }
// Si aucun élément correspondant n'a été trouvé après avoir parcouru tous les éléments de tab, on retourne false
    return -1;

}

/*
ConstrGraphmarq(m,idm,tab,arc) {
    let i;
    let m1;
    let j;
    let j1;
    let tr;
    let fr;
    let lv;
    let l;
    let ji;
    let jf;
    let mar;
    let kse;
    let kse1;
    let tabi=[];
    let tabt=[];
    for(i=0;i<this.NpTransexist;i++)
    {
        if (this.canfire(i, m)) 
        {
            tabi[i]=1;
            tabt[i]=0;
       }
       else{tabi[i]=-1;tabt[i]=-1;}
       
    }
    mar=m;
    fr=tabi;
    tr=tabt;
    lv=idm;
    if(this.existemarquage(tab,m)===-1 && tab.length<30)
    {   
    kse= {fr,tr,mar,lv};
    tab.push(kse);
    }
    let stop=false;
    j=0;
    let k=0;
    while (stop===false && j<tab.length)
    {
       
      while (stop===false && k< tab[j].fr.length)
      {
        if (tab[j].fr[k]===1 && tab[j].tr[k]===0)
        {
          stop=true;
          tab[j].tr[k]=1;
          m=tab[j].mar;
           j1=k;
           l=tab[j].lv;
           ji=j;
          break;
        }
        else {k++;}
      }
      j++;
      k=0;
    }
    if(stop===true)
    {  
    l++;
    m1 = this.getNextState(j1 , m);
  if (this.existemarquage(tab,m1)===-1)
  {
    jf=tab.length;
  
  }
  else
  {
  jf=this.existemarquage(tab,m1);
  }
  kse1={ji,jf,j1}
  arc.push(kse1);

    console.log(m1);
    this.ConstrGraphmarq(m1,l,tab,arc);
    }  
}*/
ConstrGraphmarq(m,idm,tab,arc) {
    let i;
    let m1;
    let j;
    let j1;
    let tr;
    let fr;
    let lv;
    let l;
    let ji;
    let jf;
    let mar;
    let kse;
    let kse1;
    let tabi=[];
    let tabt=[];
    let extime=0;
    let eximm=0;
    let poidt=0;
    let temt=0;
    let w;
    let propa;
    let tempo;
    for(i=0;i<this.NpTrans;i++)
    {
        if (this.canfire(i, m)) 
        {
            tabi[i]=1;
            tabt[i]=0;
            j=this.Transitions[i].Type;
            if (this.Transitions[i].Type===true)
            {
                extime=1;
                temt=temt+this.Transitions[i].Poid;
            }
            else
            {
                eximm=1;
                poidt=poidt+this.Transitions[i].Poid;
            }
            
       }
       else{tabi[i]=-1;tabt[i]=-1;}
       
    }
    if(eximm===1 && extime===1)
    {
        tempo=false;
        for(i=0;i<tabi.length;i++)
        {
            if(this.Transitions[i].Type===true)
            {
                tabi[i]=-1;
                tabt[i]=-1;
            }
        }
    }
    if ((eximm===1 && extime===1) || (eximm===1 && extime===0))
    {
        w=poidt;
        tempo=false;
    }
    else if(eximm===0 && extime===1)
    {
        w=temt;
        tempo=true;
    }
    else
    {
        w=-1;
        tempo=true;
    }
    mar=m;
    fr=tabi;
    tr=tabt;
    lv=idm;
    if(this.existemarquage(tab,m)===-1 && tab.length<30)
    {   
    kse= {fr,tr,mar,lv,w,tempo};
    tab.push(kse);
    }
    let stop=false;
    j=0;
    let k=0;
    while (stop===false && j<tab.length)
    {
       
      while (stop===false && k< tab[j].fr.length)
      {
        if (tab[j].fr[k]===1 && tab[j].tr[k]===0)
        {
          stop=true;
          tab[j].tr[k]=1;
          m=tab[j].mar;
           j1=k;
           l=tab[j].lv;
           ji=j;
          break;
        }
        else {k++;}
      }
      j++;
      k=0;
    }
    if(stop===true)
    {  
    l++;
    m1 = this.getNextState(j1 , m);
  if (this.existemarquage(tab,m1)===-1)
  {
    jf=tab.length;
  
  }
  else
  {
  jf=this.existemarquage(tab,m1);
  }
  propa=this.Transitions[j1].Poid/tab[ji].w;
  kse1={ji,jf,j1,propa}
  arc.push(kse1);

    console.log(m1);
    this.ConstrGraphmarq(m1,l,tab,arc);
    }  
}

ConstrGraphmarqre(tab,arc,tab1,arc1)
{
    let i;
    let t=[];
    let t1=[];
    let kse;
    let j1;
    let ji;
    let jf;
    let propa;
    let j;
    let r;
     for(i=0;i<tab.length;i++)
    {
       if(tab[i].tempo===true)
       {
        tab1.push(tab[i]);
       }
       else
       {
         tab1.push(-1);
       }
    }
    for(i=0;i<tab.length;i++)
    {
        t=[];
        t1=[];
        if(tab[i].tempo===false)
        {
            this.trouva(i,arc,tab,t);
            this.trouvb(i,arc,tab,t1);
            for(j=0;j<t1.length;j++)
            {
                for(r=0;r<t.length;r++)
                {
                   ji=t1[j].k;
                   jf=t[r].k
                   j1=t1[j].j1;
                   propa=t1[j].propa*t[r].propa;
                   kse={ji,jf,j1,propa};
                   arc1.push(kse);
                }

            }
        }
    }
    for(i=0;i<arc.length;i++)
    {
        if(tab[arc[i].ji].tempo===true && tab[arc[i].jf].tempo===true)
        {
            arc1.push(arc[i]);
        }
    }
}
trouvb(i,arc,tab,tib)
{
    let i1;
    let k;
    let propa;
    let kse;
    let j1;
    for(i1=0;i1<arc.length;i1++)
    {
        k=arc[i1].ji;
        if(arc[i1].jf===i)
        {
            if( tab[k].tempo===true)
            {
                j1=arc[i1].j1;
                propa=arc[i1].propa;
                kse={k,propa,j1};
                if (!tib.includes(kse)) {
                    tib.push(kse);
                  }
            }
            else 
            {
                this.trouvb(k,arc,tab,tib);
            }
        }

    }

}
trouva(i,arc,tab,tub)
{
    let i1;
    let k;
    let propa;
    let kse;
    for(i1=0;i1<arc.length;i1++)
    {
        k=arc[i1].jf;
        if(arc[i1].ji===i)
        {
            if(tab[k].tempo===true)
            {
                
                propa=arc[i1].propa;
                kse={k,propa};
                if (!tub.includes(kse)) {
                tub.push(kse);
                }
            }
            else
            {
                this.trouva(k,arc,tab,tub);
            }
        }
    }

}

simulation(tab,arc,marquageinit,tabtrans){
    console.log('arcsim ',arc)
    console.log('tabsim',tab)
    const tabniveau = () =>{
        let l = marquageinit ;
        let trans = -1 , proba = 0 , marsuiv = []
        let tabniv = [] ;
        console.log('l == ' ,l)
        let k = 0 , m= 0 , n=0 ;
        tabniv.push([{trans,proba,marsuiv}]);
       while( k < arc.length ) {
       if(arc[k].jf < tab.length){
        console.log('k = ',k)
        console.log('arc[k].ji',arc[k].ji) ; console.log('tab[arc[k].ji].mar',tab[arc[k].ji].mar)
            if (tab[arc[k].ji].mar.every((element, index) => element === l[index])){
               //tabniv.push([]);
               //if()
               tabniv[m][n] = {trans : arc[k].j1 , proba:arc[k].propa,marsuiv: tab[arc[k].jf].mar} ;  
               console.log('tabniv[',m,'][',n,']',tabniv[m][n])  
               k++; n++    
            }else{
                m ++ ; n= 0 ;
               if(m < tab.length){ 
               l= tab[m].mar ; 
               tabniv.push([]);
               console.log('tab[',m,'] =',l)
             }else{ k = arc.length}             
            }}else{k = arc.length}
        }
        return tabniv ;
      } 
      console.log('Transitions in calcproba ',this.Transitions)
    let trans = this.Transitions ;
    function choisirTransAvecProbabilite(elementsProbabilites){
       let sommepoid = 0 ;
       console.log('Trans ',trans)

        for (let k = 0 ; k < elementsProbabilites.length; k++) {
            console.log('elementsProbabilites[k].trans',elementsProbabilites[k].trans)
            if (elementsProbabilites[k].trans !== -1){
           sommepoid = sommepoid + trans[elementsProbabilites[k].trans].Poid ;}
        }
        console.log('sommepoid',sommepoid);
        let rand = Math.floor(Math.random() * (sommepoid - 0 ) + 0);
        //rand = rand % sommepoid ;
        console.log('rand',rand);
        let rendemtab = [] ; let i = 0;
        for (let k = 0; k < elementsProbabilites.length; k++) {
            if (elementsProbabilites[k].trans !== -1){
            for(let j= 0 ; j< trans[elementsProbabilites[k].trans].Poid ; j++ ){
                rendemtab[i] = elementsProbabilites[k].trans ;
                i++ ;
            }
          }   
         }
         console.log('rendmtab',rendemtab)
        let idtransfracnchit = elementsProbabilites.findIndex(element => element.trans === rendemtab[rand]);
        console.log('idtransfracnchit',idtransfracnchit)
         return idtransfracnchit ;
        //return rand ;
       /* while ( i < sommepoid) {
            for(let j= 0 ; j< this.Transitions[elementsProbabilites[k].trans].poid ; j++ ){
                rendemtab[i] = elementsProbabilites[j].trans ;
                i++ ;
            }
           
        }*/
        /*   
        let rand = Math.random() * (100 - 0) + 0;
        console.log('rand',rand);
        let cumulativeProbability = 0;
        console.log('elementsProbabilites',elementsProbabilites)
        for (let i = 0; i < elementsProbabilites.length; i++) {
            cumulativeProbability += elementsProbabilites[i].proba;  // je dois faire un .proba
            rand = rand / 100 ;
            if (rand <= cumulativeProbability) {
                return i; // Retourner l'indice de l'élément choisi
            }
        } // Dans le cas improbable où rien n'a été choisi, retourner null
        return i;*/
    }
      let tabniv = tabniveau();
      console.log('tabniv',tabniv)
        let i = 0 , indice = -1 , j = 0 ,transfranchit = 0;
        let tabstep = [] ; 
        console.log('nivlong ',tabniv.length)
      while( i < tabniv.length){
        if( tabniv[i].length !== 0 && tabniv[0][0].trans !== -1){
        indice =  choisirTransAvecProbabilite(tabniv[i]);
        console.log('indice',indice);
        transfranchit = tabniv[i][indice].trans ; // je peut l'afficher après dans la séquence des transition franchit 
        tabtrans[j] =   transfranchit 
        console.log('transfranchit',transfranchit)
        tabstep[j] = tabniv[i][indice].marsuiv
        console.log('hi ',tab.findIndex(element => element.mar === tabstep[j]))
        if(tab.findIndex(element => element.mar === tabstep[j] ) !== -1){
            i = tab.findIndex(element => element.mar === tabstep[j]) ;
            //if(i === 0){ i = 1}
            console.log('i = ',i)
        }
        //if(tabstep[j] === tabniv[i] ){i=tabniv.length}
      // 
        //else{  }
    }else { i=tabniv.length }
         console.log('tabstep[',j,']',tabstep[j]); console.log('i after  = ',i)
        j++ ; 
        if( j === 30){ i= tabniv.length}  ///// C'est içi qu'on doit changer le nombre d'hteration dans la simulation 
    }
      console.log('tabstep',tabstep)
      return tabstep ;
} 

quasiVivante(Idtrans, arc) {
    let    quasi = false; 
       for (let i = 0; i < arc.length; i++) {
           const transition = arc[i].j1;
               console.log(transition) ; 
              
           if ( transition === Idtrans) {
              quasi = true; 
           }
       }
       
       return quasi ;
   }
 Reseauquasivivant(liste_trans,arc)
{
   
   let Qvivant = true ;
  for(let i=0;i<liste_trans.length;i++)
  {
 
    if(this.quasiVivante(liste_trans[i].IdT,arc)==false)
    {
       
       Qvivant = false ; 
       break ;
    } 
    
  }
 
  return Qvivant ; 
}
TransitionVivante(Idtrans, arc){
   let   vivante  = true; 
   for (let i = 0; i < arc.length; i++) {
       const transition = arc[i].j1;
       // Vérifier si transition est null avant d'accéder à sa propriété IdT
       if (transition.IdT !== Idtrans) {
          vivante = false; 
          break;
       }
   }
   
   return vivante ;

}
 Reseauivivant(liste_trans,arc)
{

   let reseauvivant = true ;
  for(let i=0;i<liste_trans.length;i++)
  { 
    if(this.TransitionVivante(liste_trans[i].IdT,arc)==false)
    {
        reseauvivant = false ; 
       break ;
    }  
  }
 
  
  return reseauvivant ; 
} 
  compareTableaux(tab1, tab2) {
   if (tab1.length !== tab2.length) {
       return false;
   }

   for (let i = 0; i < tab1.length; i++) {
       if (tab1[i] !== tab2[i]) {
           return false;
       }
   }

   return true;
}
Renitiable(arc,marquage_initiale){
   let R=false ;
   for(let i=1;i<arc.length;i++)
   {
       
     if( (arc[i].jf)  == 0 ) 
     {
       R= true ; 
       break ; 
     }
   }
   
return R ;
}
}






