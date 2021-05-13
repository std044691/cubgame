//Δήλωση μεταβλητών
let m; //Μεταβλητή για το πόσοι θα είναι οι κύβοι στο τραπέζι
let k;  //Μεταβλητή για το πόσο θα είναι το Κ

const pick_1 = 1; //Οι βασικές μεταβλητές πάρε 1 και 2
const pick_2 = 2;

let numberofnodes = 0; //Κρατάω τον αριθμό τον κόμβων που αναπτύχθηκαν
let level = 0; //Μεταβλητή που κρατάει το επίπεδο του δέντρου.
let numberoflanes = 0; //Ο αρηθμός των μονοπατιών που δημιουργούνε από την κοριφή μέχρι τα φύλα   
let winningpath = new Array(); //Πιθανή νικητήρια διαδρομή
let winningpaths = new Array(); //Αποθηκεύει όλες τις διαδρομές 
let total = m; //Το σύνολο όλων των κύβων
let winningpathsranked = new Map(); //Εδώ μπένουν οι διαδρομές προς τα φύλλα τερματικά που απομένουν μετά την επιλογή των χρηστών
let pcmove; //Η κίνηση του υπολογιστή
let lessoddmove; //Η καλύτερη κίνιση του υπολογιστή.. ίσως είναι υπερβολή αλλά τώρα σε αυτή την έκδοση είναι σημαντική
let lessoddsum; //Το άθροισμα όλων των μονοπατιών. Χρησιμοποιώ μια συνάρτηση αξιολόγησης για να μπορέσω να υπολογίσω το συντομότερο μεν μονοπάτι αλλά και το μικρότερο σε αξία


//Ανάπτυξη δέντρου επιλογών και αποθήκευση σε πίνακα winningpaths.
//Παίρνει σαν όρισμα το n που είναι ο αριθμός του κόμβου που βρίσκεται και τον γονέα του. Το κάνει για να ζωγραφίσει και το ul, li στην σελίδα
function createGameTree(n, ulparent) {

    //Τερματικός κανόνας της αναδρομής. Αν είναι αρνητικό σημαίνει ότι ξεφύγαμε..
    if (n < 0) {
        return;

    } else {

        //Δημουργία του html δέντρου
        //Ορίζουμε πρώτα το ul και το li
        let li = document.createElement("li");
        let ul = document.createElement("ul");
        let turnis = ""; //Κρατάει το ποιος παίζει. (min η max) Απλά το δείχνει
        let color = ""; //Το χρώμα για το τελευταίο φύλλο

        //Βάζουμε απλά τον κωδικό να είναι το level. 
        li.id = n;

        //Το λεκτικό που ορίζει το ποιος παίζει.. Ο min η ο max
        if (level % 2) {
            turnis = "min";
        } else {
            turnis = "max";
        }

        //Αν το επιπεδο είναι μηδενικο
        if (n == 0) {
            color = "red"; //Χρωματίζει το φύλλο με κόκκινο
            numberoflanes++ // Και αυξάνει τον αριθμό των διαδρομών
        }

        //Τοποθέτηση των κόμβων στο δέντρο
        li.append(n + "(" + winningpath + ") -" + turnis);
        //Χρωματίζουμε τον κομβο 
        li.style.color = color;
        //Τοποθέτηση του νέου κόμβου και προετιμασία για τον επόμενο
        li.append(ul);

        //Αν δεν υπάρχει γονέας απλά παίρνουμε το Placeholder
        if (ulparent == null) {
            ulparent = document.getElementById("test");
        }

        //Και τοποθετούμε το li μέσα στον placeholder. Αλλιώς δουλέυει το ul στην γραμμή 57 που έχουμε βάλει.
        ulparent.append(li);

        //Αυξάνουμε τον μετρητή του επιπέδου και τον μετριτή των κόμβων
        level++;
        numberofnodes++;

        //Τοποθετούμε τον κόμβο στους υποψίφιους νικιτές
        winningpath.push(n);

        //Αρχίζει η αναδρομή εδώ. Μια για n-1 για n-2 και μετά για n-k. Το δέντρο είναι τρίφυλλο σε κάθε κόμβο
        //Το δέντρο όμως δεν θέλουμε να το αναπτύξουμε πλήρως. Αν φτάσουμε στο k θα πρέπει να μηδενίζει. Για αυτό τον λόγο 
        //έχουν τοποθετηθεί έλεγχοι. 
        if (n > k) {
            createGameTree(n - pick_1, ul);
            createGameTree(n - pick_2, ul);
            createGameTree(n - k, ul);

        } else {

            //Τρέχουμε μια την διαδρομή για να εμφανισουμε το 0
            createGameTree(n - k, ul);

            //Αν δεν είναι το n είναι διάφορο από το Κ δηλαδή είναι πχ 3 τότε 
            if (n != k) {
                //Αν είναι το n διάφορο από το 2 τότε αφαιρούμε το 1
                if (n != pick_2) {
                    createGameTree(n - pick_1, ul);
                }

                //Αν είναι το n διάφορο από το 1 τότε αφαιρούμε το 2
                if (n != pick_1) {
                    createGameTree(n - pick_2, ul);
                }
            }
        }
        //Αφαιρούμε από το level επειδή αναιβέβουμε ένα επίπεδο πάνω.
        level--;

        //Αν φτάσοθμε στο 0 αποθηκεύουμε την διαδρομή σε έναν πίνακα
        if (winningpath[winningpath.length - 1] == 0) {
            let newwinningpath = Object.assign([], winningpath);
            winningpaths.push(newwinningpath);
        }

        //Αφαίρούμε τον κόμβο απο την διαδρομή για να τοποθετήσουμε τον επόμενο. Ουσιαστικά επειδή αλλάζουμε διαδρομή
        winningpath.pop();
    }
}

//Η συνάρτηση αυτή δημιουργεί τα διαθέσιμα μονοπάτια που υπάρχουν μετά την εκτέλεση κάποιας επιλογής στον γύρο. Παίρνει ως παράμετρο τον γύρο
function createAvailablePaths(round) {
    //Εδώ ήθελα να βάλω το + άπειρο για να μπορέσω να ελέγχξω αν έχω βρει την ελλάχιστη τιμή στην συνάρτηση αξιολόγησης. Τυπικά αυτό που κάνω είναι να αθροίζω όλα τα μονοπάτια
    //Και κοιτάζω να βρω αυτό με το μικρότερο άθροισμα. το όνομα lessoddmove σημαίνει η λιγότερα περίεργη κίνηση από τον υπολογιστή. 
    lessoddsum = 1000;
    lessoddmove = 0;

    //Από πριν έχουμε δημιουργίσει όλα τα μονοπάτια του δέντρου. Εδώ τώρα τα διαβάζουμε για να βρούμε ποια θα είναι η καλύτερη κίνηση για τον υπολογιστή
    for (let i = 0; i < winningpaths.length; i++) {
        //Μια μεταβλητή για να μετρήσουμε το άθροισμα της διαδρομής από την κορυφή μέχρι την ρίζα
        let sum = 0;
        //Το άθροισμα διαπερνόντας όλους τους κόμβους του δέντρου
        for (let j = 0; j < winningpaths[i].length; j++) {
            sum += winningpaths[i][j];
        }
        //Τοποθετούμε την διαδρομή και την σειρά με την οποία τα επισκεπτόμαστε (i) καθώς και το άθροισμα 
        winningpathsranked.set(i, [winningpaths[i], sum]);

        //Εδώ ορίζουμε την συνάρτηση αξιολόγισης. Τυπικά θέλουμε ο υπολογιστής να διαλέξει ένα μονό μονοπάτι
        
        if (winningpaths[i].length % 2 == 1) {
            //Και θέλουμε να έχει και το μικρότερο άθροισμα η διαδρομή
            //Αν λοιπόν το άθροισμα είναι μικρότερο από το προηγούμενο άθροισμα το αποθηκεύουμε ως καλύτερη διαδρομή για τον υπολογιστή
            //if (sum < lessoddsum) {
                lessoddsum = sum;
                lessoddmove = i;
            //}
        }
        sum = 0;
    }
    //Ορίζουμε την ελάχιστη κίνηση για τον υπολογιστή να είναι το 1
    
    if (round != null) {
        //Και μετά αφαιρούμε τους κόμβους για να βρούμε την διαφορά ώστε να παίξει ο υπολογιστής την κίνηση
        pcmove = winningpaths[lessoddmove][round - 1] - winningpaths[lessoddmove][round];
    }else{
        pcmove = 1;
    }
    return pcmove;
}

//Η συνάρτηση αυτή αρχίζει το παιχνίδι
function startGame() {
    //Ξεκινάμε με τον πρώτο γύρο
    let round = 1;
    //Ορίζουμε αν το παιχνίδι έχει τελειώσει
    let gameisdone = false;
    //Θέτουμε ως πρώτη κίνηση το ανώτερο που υπάρχει ως m
    let move = m;
    //Ο πίνακας που ορίζει τα μονοπάτια που απομένουν
    let remaining = new Array();

    let counter = 0;
    while (!gameisdone) {
        remaining = [];

        let givennumber = 0;
        //Παίζει ο Μαχ πρώτος που είναι ο Άνθρωπος. Ουσιαστικά τυπώνει το σύνολο ελέγχει αν ο γύρος είναι μονος ή 
        //ζυγός και εκτελεί τον παρακάτω κώδικα για να πάρει το νούμερο από τον άνθρωπο
        console.log("Σύνολο " + total);
        log("Σύνολο " + total);
        if (round % 2 == 1) {
            givennumber = human();
            //givennumber = computer(round);
            //givennumber = 4;
            console.log("έπεξες " + givennumber);
            log("έπεξες " + givennumber);

        } else {
            //Μετά παίζει ο υπολογιστής μέσα από την συνάρτηση computer που παρουσιάζουμε στην συνέχεια
            givennumber = computer(round);
            console.log("Παίζει ο υπολογιστής.." + givennumber);
            log("Παίζει ο υπολογιστής.." + givennumber);
        }
        //Ελέγχουμε τι παίχτηκε, δηλαδή αν παίχτηκε κάποιο από τα στάνταρ
        if (givennumber == pick_1 || givennumber == pick_2 || givennumber == k) {
            //Αφαιρούμε τα παιξήματα από το σύνολο 
            total -= givennumber;
            //τότε αφαιρούμε από την μεταβλτή της κίνησης
            move = move - givennumber;
            //Και μαζεύουμε μόνο τα μονοπάτια που έχουν την πιθανότητα να επιλεχθούν απο εδώ και κάτω
            for (let i = 0; i < winningpathsranked.size; i++) {
                if (winningpathsranked.get(i)[0][round] == move) {
                    //Και τα βάζουμε σε έναν πίνακα remaining 
                    remaining.push(winningpathsranked.get(i));
                }
            }

            //Καθαρίζουμε τον πίνακα με όλα τα μονοπάτια και τον ξαναγεμίζουμε με τα καινούργια
            winningpathsranked.clear();
            for (let i = 0; i < remaining.length; i++) {
                winningpathsranked.set(i, Object.assign([], remaining[i]));
            }
            //Παίζουμε τον επόμενο γύρο
            console.log("Επόμενος γύρος");
            log("Επόμενος γύρος");
            round++;
            counter++;

            if (winningpathsranked.size == 1) {
                if (round % 2 == 0) {
                    console.log("Κέρδισε ο υπολογιστής!!");
                    log("Κέρδισε ο υπολογιστής!!");

                } else {
                    console.log("Κέρδισες");
                    log("Κέρδισες");
                }
                gameisdone = true;
            }

        } else {
            //Αν το νούμερο δεν είναι στην εμβέλεια που θέλουμε τότε το δηλώνουμε
            console.log("Λάθος νούμερο..το νούμερο πρέπει να είναι " + pick_1 + " ή " + pick_2 + " ή " + m);
            log("Λάθος νούμερο..το νούμερο πρέπει να είναι " + pick_1 + " ή " + pick_2 + " ή " + m);
        }



    }
}

//Συνάρτηση για την εκτέλεση της λειτουργίας του υπολογιστή
function computer(round) {
    winningpaths = [];
    //Για να παίξει ο υπολογιστής απλά τσεκάρει τι διαθέσιμα δρομολόγια υπάρχουν 
    for (let i = 0; i < winningpathsranked.size; i++) {

        
            winningpaths.push(winningpathsranked.get(i)[0]);
            //log("Available path " + winningpathsranked.get(i)[0]);
                        
    }
    
    //Και τα στέλνει στην συνάρτηση για να δημιουργηθούν τα κατάληλα μέσω της συνάρτησης αξιολόγησης
    return createAvailablePaths(round);
}

function human(){

    
    return prompt("Παίξε ένα νούμερο " + pick_1 + " η " + pick_2 + " ή " + k);
}

function log(msg){    
    document.getElementById("log").append(msg);
    document.getElementById("log").append("\n");
}

//Αρχικοποίηση του παιχνιδιού
function initgame(){
    if(localStorage.getItem('m')!=null && localStorage.getItem('k') !=null){
        
        document.getElementById("m").value = localStorage.getItem('m');
        document.getElementById("k").value = localStorage.getItem('k');
        m = document.getElementById("m").value;
        k = document.getElementById("k").value;
        total = m;
    }else{

        document.getElementById("m").value = 10;
        document.getElementById("k").value = 4;
        m = 10;
        k = 4;
        total = m;
    }
    
    //Φτιάχνουμε το δέντρο minimax του παιχνιδιού των κύβων
    createGameTree(m, null);
    //Δημιουργούμε τα μονοπάτια του δέντρου
    createAvailablePaths(null);
    //Ξεκινάμε το παιχνίδι
    startGame();


}

function reload(){
    localStorage.setItem('m',document.getElementById("m").value);
    localStorage.setItem('k',document.getElementById("k").value);
    window.location.reload();    
}

initgame();