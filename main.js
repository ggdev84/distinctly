window.onload = ()=>{

    // On récupère ici les élements.
    var topbutton = document.getElementById("topbutton");
    var menu = document.getElementById("menu");
    var menumobile = document.getElementById("menumobile");
    var boutonvalider = document.getElementById("boutonvalider");
    var response = document.getElementById("response");
    var competences = document.getElementById("competences");
    var competencesdisplay = document.getElementById("competencesdisplay");
    var competences_list = [];


    // Fonction qui permet de savoir si le site utilisé est un mobile
    var mobilecheck=()=> {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };

    var mobile = mobilecheck();

    // Listener qui permet de gérer le click du bouton du menu mobile qui permet d'afficher et de faire disparaître le menu.
    menumobile.addEventListener("click",()=>{
        menumobile.classList.toggle("change");
        var statut = window.getComputedStyle(menu,null).getPropertyValue("display");
        if(statut == "none"){
            menu.style.display = "block";
        }
        else if(statut == "block"){
            menu.style.display = "none";
        }
    });

    // Listener qui permet de gérer le bouton qui permet d'aller tout en haut.
    topbutton.addEventListener("click",()=>{
        document.body.scrollTop = 0; // Pour Safari
        document.documentElement.scrollTop = 0; // Pour Chrome, Firefox, IE and Opera
    });

    // Listener sur le site qui permet de faire apparaître ou disparaître le bouton "Aller en haut" selon le défilement de l'utilisateur.
    window.addEventListener("scroll",()=>{
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            topbutton.style.display = "block";

        } else {
            topbutton.style.display = "none";
        }
    });

    // Listener qui permet de récupérer les données de l'utilisateur.
    boutonvalider.addEventListener("click",()=>{

        // On récupère les données.
        var nom = document.getElementById("nom").value;
        var prenom = document.getElementById("prenom").value;
        var email = document.getElementById("email").value;
        var ville = document.getElementById("ville").value;
        var password = document.getElementById("password").value;
        var newsletter = document.getElementById("newsletter").checked;
        var vide = 0;


        /* Si les champs ne sont pas vides, envoyer les valeurs. Contrairement aux projets React, 
        j'ai implementé cette fonctionnalité côté client, mais en production une implémentation côté serveur est conseillé. 
        */
        var liste = [nom,prenom,email,ville,password,competences_list,newsletter];
        for(i of liste){
            if(i == " " || i=="" || i.length == 0 || i == false){
                vide = 1;
            }
        }
        if(vide == 1){
            response.innerText = "Veuillez remplir tous les champs et accepter de recevoir des informations de notre part.";
            response.style.display ="block";
        }
        else{
            let url = {
                "nom" : nom,
                "prenom" : prenom,
                "email" : email,
                "password": password,
                "ville" : ville,
                "competences" : competences_list

            }
            url = JSON.stringify(url);

            // Requête AJAX qui permet d'envoyer les données de l'utilisateur au serveur, afin qu'il soit tenu au courant des news.
            // Contrairement aux projets React, j'ai utilisé un XMLHttpRequest et non pas la fonction fetch, pour montrer que je sais également l'utiliser.
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = ()=>{
                if(this.readyState == 4 && this.status == 200){
                    response.innerText = this.responseText;
                    response.style.display = "block";
                }
            };
            xhr.open("POST","/inscription/"+url,true);
            xhr.send();
        }
    
    });

    // Listener qui permet d'ajouter une compétence.
    competences.addEventListener("keypress",(e)=>{
        if(e.keyCode == 13){
            let value = this.value.toUpperCase();
            competences_list.push(value);
            competencesdisplay.innerHTML = competencesdisplay.innerHTML +  value + "<br/>";
            this.value = "";
        }

    });

}