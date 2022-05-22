//import {prefecturesList} from "./prefecturesData.js";
const itemsCount = 46;
const latlongExtent = [46, 123, 24, 146]; //[start lat, start long, end lat, end long]

const datalistElem = document.getElementById("prefecturesDatalist");
var currentGuess;
var runOnce = false;
var inputVal;
var japaneseMode;
// nameLang defines the language prefectures are displayed in.
var nameLang;
var numLang;
var hover = 0;

// This checks cache to see if the user has visited the page before. If not, it displays the help screen. 
if (localStorage.getItem("visitedBefore") == null){
    document.getElementById("introScreenContainer").style.display = "flex";
    localStorage.setItem("visitedBefore", true);
}

// This checks if "japaneseMode" exists in the cache, and creates it if not, setting it to false (English mode).
// If true, Japanese mode is set. If false (default), English mode is set.

const prefecturesList = {
    hokkaido: {
        ID: 0,
        nameEn: "Hokkaido",
        nameJP: "北海道",
        latlong: [43.06417,141.34694]
    },
    aomori: {
        ID: 1,
        nameEn: "Aomori",
        nameJP: "青森",
        latlong: [40.82444,140.74],
    },
    iwate: {
        ID: 2,
        nameEn: "Iwate",
        nameJP: "岩手",
        latlong: [39.70361,141.1525],
    },
    miyagi: {
        ID: 3,
        nameEn: "Miyagi",
        nameJP: "宮城",
        latlong: [38.26889,140.87194],
    },
    akita: {
        ID: 4,
        nameEn: "Akita",
        nameJP: "秋田",
        latlong: [39.71861,140.1025],
    },
    yamagata: {
        ID: 5,
        nameEn: "Yamagata",
        nameJP: "山形",
        latlong: [38.24056,140.36333],
    },
    fukushima: {
        ID: 6,
        nameEn: "Fukushima",
        nameJP: "福島",
        latlong: [37.75,140.46778],
    },
    ibaraki: {
        ID: 7,
        nameEn: "Ibaraki",
        nameJP: "茨城",
        latlong: [36.341390,140.44667],
    },
    tochigi: {
        ID: 8,
        nameEn: "Tochigi",
        nameJP: "栃木",
        latlong: [36.56583,139.88361],
    },
    gunma: {
        ID: 9,
        nameEn: "Gunma",
        nameJP: "群馬",
        latlong: [36.39111,139.06083],
    },
    saitama: {
        ID: 10,
        nameEn: "Saitama",
        nameJP: "埼玉",
        latlong: [35.85694,139.64889],
    },
    chiba: {
        ID: 11,
        nameEn: "Chiba",
        nameJP: "千葉",
        latlong: [35.60472,140.12333],
    },
    tokyo: {
        ID: 12,
        nameEn: "Tokyo",
        nameJP: "東京",
        latlong: [35.68944,139.69167],
    },
    kanagawa: {
        ID: 13,
        nameEn: "Kanagawa",
        nameJP: "神奈川",
        latlong: [35.44778,139.6425],
    },
    niigata: {
        ID: 14,
        nameEn: "Niigata",
        nameJP: "新潟",
        latlong: [37.90222,139.02361],
    },
    toyama: {
        ID: 15,
        nameEn: "Toyama",
        nameJP: "富山",
        latlong: [36.69528,137.21139],
    },
    ishikawa: {
        ID: 16,
        nameEn: "Ishikawa",
        nameJP: "石川",
        latlong: [36.59444,136.62556],
    },
    fukui: {
        ID: 17,
        nameEn: "Fukui",
        nameJP: "福井",
        latlong: [36.06528,136.22194],
    },
    yamanashi: {
        ID: 18,
        nameEn: "Yamanashi",
        nameJP: "山梨",
        latlong: [35.66389,138.56833],
    },
    nagano: {
        ID: 19,
        nameEn: "Nagano",
        nameJP: "長野",
        latlong: [36.65139,138.18111],
    },
    gifu: {
        ID: 20,
        nameEn: "Gifu",
        nameJP: "岐阜",
        latlong: [35.39111,136.72222],
    },
    shizuoka: {
        ID: 21,
        nameEn: "Shizuoka",
        nameJP: "静岡",
        latlong: [34.97694,138.38306],
    },
    aichi: {
        ID: 22,
        nameEn: "Aichi",
        nameJP: "愛知",
        latlong: [35.18028,136.90667],
    },
    mie: {
        ID: 23,
        nameEn: "Mie",
        nameJP: "三重",
        latlong: [34.73028,136.50861],
    },
    shiga: {
        ID: 24,
        nameEn: "Shiga",
        nameJP: "滋賀",
        latlong: [35.00444,135.86833],
    },
    kyoto: {
        ID: 25,
        nameEn: "Kyoto",
        nameJP: "京都",
        latlong: [35.02139,135.75556],
    },
    osaka: {
        ID: 26,
        nameEn: "Osaka",
        nameJP: "大阪",
        latlong: [34.68639,135.52],
    },
    hyogo: {
        ID: 27,
        nameEn: "Hyogo",
        nameJP: "兵庫",
        latlong: [34.69139,135.18306],
    },
    nara: {
        ID: 28,
        nameEn: "Nara",
        nameJP: "奈良",
        latlong: [34.68528,135.83278],
    },
    wakayama: {
        ID: 29,
        nameEn: "Wakayama",
        nameJP: "和歌山",
        latlong: [34.22611,135.1675],
    },
    tottori: {
        ID: 30,
        nameEn: "Tottori",
        nameJP: "鳥取",
        latlong: [35.50361,134.23833],
    },
    shimane: {
        ID: 31,
        nameEn: "Shimane",
        nameJP: "島根",
        latlong: [35.47222,133.05056],
    },
    okayama: {
        ID: 32,
        nameEn: "Okayama",
        nameJP: "岡山",
        latlong: [34.66167,133.935],
    },
    hiroshima: {
        ID: 33,
        nameEn: "Hiroshima",
        nameJP: "広島",
        latlong: [34.39639,132.45944],
    },
    yamaguchi: {
        ID: 34,
        nameEn: "Yamaguchi",
        nameJP: "山口",
        latlong: [34.18583,131.47139],
    },
    tokushima: {
        ID: 35,
        nameEn: "Tokushima",
        nameJP: "徳島",
        latlong: [34.06583,134.55944],
    },
    kagawa: {
        ID: 36,
        nameEn: "Kagawa",
        nameJP: "香川",
        latlong: [34.34028,134.04333],
    },
    ehime: {
        ID: 37,
        nameEn: "Ehime",
        nameJP: "愛媛",
        latlong: [33.84167,132.76611],
    },
    kochi: {
        ID: 38,
        nameEn: "Kochi",
        nameJP: "高知",
        latlong: [33.55972,133.53111],
    },
    fukuoka: {
        ID: 39,
        nameEn: "Fukuoka",
        nameJP: "福岡",
        latlong: [33.60639,130.41806],
    },
    saga: {
        ID: 40,
        nameEn: "Saga",
        nameJP: "佐賀",
        latlong: [33.24944,130.29889],
    },
    nagasaki: {
        ID: 41,
        nameEn: "Nagasaki",
        nameJP: "長崎",
        latlong: [32.74472,129.87361],
    },
    kumamoto: {
        ID: 42,
        nameEn: "Kumamoto",
        nameJP: "熊本",
        latlong: [32.78972,130.74167],
    },
    oita: {
        ID: 43,
        nameEn: "Oita",
        nameJP: "大分",
        latlong: [33.23806,131.6125],
    },
    miyazaki: {
        ID: 44,
        nameEn: "Miyazaki",
        nameJP: "宮崎",
        latlong: [31.91111,131.42389],
    },
    kagoshima: {
        ID: 45,
        nameEn: "Kagoshima",
        nameJP: "鹿児島",
        latlong: [31.56028,130.55806],
    },
    okinawa: {
        ID: 46,
        nameEn: "Okinawa",
        nameJP: "沖縄",
        latlong: [26.2125,127.68111],
    },
}

const dateToday = genDateToday();
const prefectureToday = getPrefecture();

checkJapaneseMode()

function checkCache(){
    currentGuess = 1;
    correctPref = prefectureToday[1];
    if (localStorage.getItem(dateToday) == null){
        for (let i = 1; i < 7; i++){
            localStorage.removeItem(i);
        }
    } else{
        currentGuess = localStorage.getItem(dateToday);
        for (let i = 1; i <= parseInt(currentGuess) - 1; i++){
            setGuesses(i, localStorage.getItem(i));
        }
    }
    return currentGuess;
}

function sendCache(currentGuess, prefectureGuess){
    localStorage.setItem(dateToday, parseInt(currentGuess)+1);
    localStorage.setItem(currentGuess, prefectureGuess);
}

function genDateToday(){
    let dateDay = String(new Date().getDate()).padStart(2, '0');
    let dateMonth = String(new Date().getMonth() + 1).padStart(2, '0');
    let dateYear = String(new Date().getFullYear());
    let dateToday = dateYear+dateMonth+dateDay;
    return dateToday;
}

function pseudoRandom(date, place = 9){
    let firstPart = parseInt(String(date).substring(0,4));
    let secondPart = parseInt(String(date).substring(4,8));
    let sinNum = Math.sin(firstPart/secondPart);
    let numstr = String(sinNum).substring(place,place+2);
    let numval = Math.round(parseInt(numstr) * itemsCount / 100)
    return numval;
}

function getPrefecture(){
    let todayVal = checkPastWeek();
    let prefectureDetails = [];
    for (const prefName in prefecturesList){
        if (prefecturesList[prefName]['ID'] == todayVal){
            prefectureDetails = [prefName, prefecturesList[prefName]['nameEn'], prefecturesList[prefName]['nameJP'], prefecturesList[prefName]['latlong']];
        }
    }
    return prefectureDetails;
}

function getPastWeek(){
    let pastWeek = [];
    let date = dateToday;
    let year = parseInt(String(date).substring(0,4));
    let month = parseInt(String(date).substring(4,6));
    let day = parseInt(String(date).substring(6,8));
    for (let i = 0; i < 7; i++){
        if (day - 1 < 1){
            if (month - 1 < 1){
                year --;
                month = 12;
            } else {
                month --;
            }
            day = checkMonth(day, month, year);
        } else{
            day -= 1;
        }
        month = String(month).padStart(2, '0');
        day = String(day).padStart(2, '0')
        pastWeek.push(String(year)+String(month)+String(day));
    }
    return pastWeek;
}

function checkMonth(day, month, year){
    switch (month){
        case 1: day = 31; break;
        case 2:
            if (year % 4 == 0){
                day = 29;
            } else{
                day = 28;
            }
            break;
        case 3: day = 31; break;
        case 4: day = 30; break;
        case 5: day = 31; break;
        case 6: day = 30; break;
        case 7: day = 31; break;
        case 8: day = 31; break;
        case 9: day = 30; break;
        case 10: day = 31; break;
        case 11: day = 30; break;
        case 12: day = 31; break;
    }
    return day;
}

function genPastWeek(){
    let pastWeek = getPastWeek();
    let weekCountries = [];
    for (let i = 0; i < 7; i++){
        weekCountries.push(pseudoRandom(pastWeek[i]));
    }
    return weekCountries;
}

function checkPastWeek(){
    let weekCountries = genPastWeek();
    let todayVal = parseInt(pseudoRandom(dateToday));
    let match = false;
    let place = 9;
    do {
        match = false;
        for (let i = 0; i < 7; i++){
            if (todayVal == weekCountries[i]){
                console.log(`REPEAT FOUND: ${todayVal} in the past week: ${weekCountries}`)
                match = true;
                place ++;
                todayVal = pseudoRandom(dateToday, place);
                break;
            }
        }
    } while (match);
    return todayVal;
}

function getDirection(lat, long){
    let angle = Math.atan(long/lat) * 180 / Math.PI;
    let directionArrow = ""
    if (angle <= -67.5){
        directionArrow = "⬅";
    } else if (angle > 67.5){
        directionArrow = "➡";
    } else if (angle > -67.5 && angle <= -22.5){
        if (lat >= 0){
            directionArrow = "↖";
        } else{
            directionArrow = "↘";
        }
    } else if (angle > -22.5 && angle <= 22.5){
        if (lat >= 0){
            directionArrow = "⬆";
        } else{
            directionArrow = "⬇";
        }
    } else if (angle > 22.5 && angle <= 67.5){
        if (lat >= 0){
            directionArrow = "↗";
        } else{
            directionArrow = "↙";
        }
    }
    return directionArrow;
}

function normalModeHint(currentGuess){
    if (currentGuess == 3){
        document.getElementById("hintLines").innerHTML = "";
        for (let i = 0; i < correctPref.length; i++){
            if (i == correctPref.length - 1){
                document.getElementById("hintLines").innerHTML += "_";
            } else{
                document.getElementById("hintLines").innerHTML += "_" + "\xa0\xa0\xa0";
            }
        }
        document.getElementById("hintLines").style.display = "block";
    } else if (currentGuess == 4 && prefectureToday[2].length > 4){
        let hintText = document.getElementById("hintLines").innerHTML.slice(1);
        document.getElementById("hintLines").innerHTML = correctPref.slice(0,1) + hintText;
    }
}

function hardModeHint(){
    let correctPref = prefectureToday[3];
    let guessPref = "mie";
    console.log(`Correct: ${prefectureToday[1]}`);
    console.log(`Guess: ${guessPref}`);
    let guessDetails = [];
    for (const prefName in prefecturesList){
        if (prefName == guessPref){
            guessDetails = [prefName, prefecturesList[prefName]['nameEn'], prefecturesList[prefName]['nameJP'], prefecturesList[prefName]['latlong']];
        }
    }
    let lat = correctPref[0] - guessDetails[3][0];
    let long = correctPref[1] - guessDetails[3][1];
    let dis = distance(correctPref[0], correctPref[1], guessDetails[3][0], guessDetails[3][1]);
    dis = String(Math.round(dis)) + "km";
    let direction = getDirection(lat, long);
    return [dis, direction];
}

function distance(lat1, lon1, lat2, lon2) {
    var p = Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

function calcImgPos(lat, long){
    let yPos = Math.round(100 * (lat - latlongExtent[0]) / (latlongExtent[2] - latlongExtent[0]));
    let xPos = Math.round(100 * (long - latlongExtent[1]) / (latlongExtent[3] - latlongExtent[1]));
    let yPosAdjusted = Math.round(yPos - ((((latlongExtent[2] - latlongExtent[0]) / 2) - yPos) / 10 ));
    let xPosAdjusted = Math.round(xPos - ((((latlongExtent[3] - latlongExtent[1]) / 2) - xPos) / 10 ));
    return [xPos, yPos];
}

function setTransformOrigin(){
    let correctPref = prefectureToday[3];
    let origin = calcImgPos(correctPref[0], correctPref[1]);
    document.getElementById("prefectureImage").style.transformOrigin = `${origin[0]}% ${origin[1]}%`;
    //return `${origin[0]}% ${origin[1]}%`;
}

function toggleHover(){
    if (hover == 0){
        document.getElementById("prefectureImage").style.transform = "scale(2.2)";
        hover = 1;
    } else if (hover == 1){
        document.getElementById("prefectureImage").style.transform = "scale(3.8)";
        hover = 2;
    } else {
        document.getElementById("prefectureImage").style.transform = "scale(1)";
        hover = 0;
    }
}

function genOptions(){
    for (const prefName in prefecturesList){
        let optionElem = document.createElement("option");
        let prefOption = prefecturesList[prefName][nameLang];
        optionElem.setAttribute("value", prefOption);
        datalistElem.appendChild(optionElem);
    }
}

function checkGuess(inputVal){
    inputVal = inputVal.toLowerCase();
    inputVal = inputVal.charAt(0).toUpperCase() + inputVal.slice(1);
    currentGuess = checkCache();
    setGuesses(currentGuess, inputVal);
    sendCache(currentGuess, inputVal);
}

function setGuesses(currentGuess=1, inputVal){
    // JAPANESE MODE SET GUESSES
    if (localStorage.getItem("japaneseMode") == "true"){
        correctPref = prefectureToday[2];
        let prefectureSuffix;
        if (inputVal == "東京"){
            prefectureSuffix = "都";
        } else if (inputVal == "北海道") {
            prefectureSuffix = "";
        } else if (inputVal == "京都" || inputVal == "大阪"){
            prefectureSuffix = "府";
        } else {
            prefectureSuffix = "県";;
        } 
        if (inputVal == correctPref){
            document.getElementById(`guessContainer${currentGuess}`).style.display = "block";
            document.getElementById(`guess${currentGuess}`).innerHTML = inputVal + prefectureSuffix;
            document.getElementById("answerReveal").style.color = "#33e36a";
            document.getElementById("answerReveal").innerHTML = `${correctPref}${prefectureSuffix}`;
            document.getElementById("prefectureGuess").setAttribute("disabled", "");
            document.getElementById("remaining-text").style.display = "none";
            document.getElementById("winning-text").style.display = "block";
            document.getElementById("winning-text").innerHTML = "地理上手！";
            document.getElementById("hintLines").style.display = "none"
            document.getElementById("googleAnchor").style.display = "block";
            document.getElementById("googleAnchor").setAttribute("href", `https://www.google.com/search?q=${prefectureToday[1]} Prefecture`);
        } else if (currentGuess < 6){
            document.getElementById(`guessContainer${currentGuess}`).style.display = "block";
            document.getElementById(`guess${currentGuess}`).innerHTML = inputVal + prefectureSuffix;
            document.getElementById("remaining-text").innerHTML = `当たりが${6 - currentGuess}回残っている`;
            normalModeHint(currentGuess);
        } else {
            document.getElementById(`guessContainer${currentGuess}`).style.display = "block";
            document.getElementById(`guess${currentGuess}`).innerHTML = inputVal + prefectureSuffix;
            document.getElementById("answerReveal").style.color = "white";
            document.getElementById("answerReveal").innerHTML = `${correctPref}${prefectureSuffix}`;
            document.getElementById("prefectureGuess").setAttribute("disabled", "");
            document.getElementById("lose-text").style.display = "block";
            document.getElementById("lose-text").innerHTML = "残念！";
            document.getElementById("remaining-text").style.display = "none";
            document.getElementById("hintLines").style.display = "none"
        }
    // ENGLISH MODE SET GUESSES
    } else {
        correctPref = prefectureToday[1];
        if (inputVal == correctPref){
            document.getElementById(`guessContainer${currentGuess}`).style.display = "block";
            document.getElementById(`guess${currentGuess}`).innerHTML = inputVal;
            document.getElementById("answerReveal").style.color = "#33e36a";
            document.getElementById("answerReveal").innerHTML = `${correctPref} Prefecture`;
            document.getElementById("prefectureGuess").setAttribute("disabled", "");
            document.getElementById("remaining-text").style.display = "none";
            document.getElementById("winning-text").style.display = "block";
            document.getElementById("winning-text").innerHTML = "Good job!";
            document.getElementById("hintLines").style.display = "none"
            document.getElementById("googleAnchor").style.display = "block";
            document.getElementById("googleAnchor").setAttribute("href", `https://www.google.com/search?q=${prefectureToday[1]} Prefecture`);
        } else if (currentGuess < 6){
            document.getElementById(`guessContainer${currentGuess}`).style.display = "block";
            document.getElementById(`guess${currentGuess}`).innerHTML = inputVal;
            if (6 - currentGuess == 1){
                document.getElementById("remaining-text").innerHTML = "You have 1 guess left";
            } else{
                document.getElementById("remaining-text").innerHTML = `You have ${6 - currentGuess} guesses left.`
            }
            normalModeHint(currentGuess);
        } else {
            document.getElementById(`guessContainer${currentGuess}`).style.display = "block";
            document.getElementById(`guess${currentGuess}`).innerHTML = inputVal;
            document.getElementById("answerReveal").style.color = "white";
            document.getElementById("answerReveal").innerHTML = `${correctPref} Prefecture`;
            document.getElementById("prefectureGuess").setAttribute("disabled", "");
            document.getElementById("lose-text").style.display = "block";
            document.getElementById("lose-text").innerHTML = "Too bad!";
            document.getElementById("remaining-text").style.display = "none";
            document.getElementById("hintLines").style.display = "none"
            document.getElementById("googleAnchor").style.display = "block";
            document.getElementById("googleAnchor").setAttribute("href", `https://www.google.com/search?q=${prefectureToday[1]} Prefecture`);
        }
    }
}

function validInput(inputVal){
    let valid = false;
    for (const prefName in prefecturesList){
        if (inputVal.toUpperCase() == prefName.toUpperCase() || inputVal == prefecturesList[prefName]["nameJP"]){
            valid = true;
        }
    }
    return valid;
}

function enterGuessFunction(){
    var inputVal = document.getElementById("prefectureGuess").value;
    if (validInput(inputVal)){
        checkGuess(inputVal);
        document.getElementById("prefectureGuess").value = "";
    } 
}

var input = document.getElementById("prefectureGuessForm");

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("submitButton").click();
  }
});

function showIntroCard(){
    document.getElementById("introScreenContainer").style.display = "flex";
}

function hideIntroCard(){
    document.getElementById("introScreenContainer").style.display = "none";
}

function convertCache(){
    console.log("convertCache called");
    if (localStorage.getItem("japaneseMode") == "true"){
        currentGuess = localStorage.getItem(dateToday);
        for (let i = 1; i <= parseInt(currentGuess) - 1; i++){
            for (prefName in prefecturesList){
                if (prefecturesList[prefName]["nameEn"] == localStorage.getItem(i)){
                    localStorage.setItem(i, prefecturesList[prefName]["nameJP"]);
                }
            }
        }
    } else {
        currentGuess = localStorage.getItem(dateToday);
        for (let i = 1; i <= parseInt(currentGuess) - 1; i++){
            for (prefName in prefecturesList){
                if (prefecturesList[prefName]["nameJP"] == localStorage.getItem(i)){
                    localStorage.setItem(i, prefecturesList[prefName]["nameEn"]);
                }
            }
        }
    }
}

function checkJapaneseMode(){
    if (localStorage.getItem("japaneseMode") == null){
        localStorage.setItem("japaneseMode", "false");
    }
    if (localStorage.getItem("japaneseMode") == "true"){
        nameLang = "nameJP";
        numLang = 2;
        document.getElementById("japaneseModeButton").style.color = "#FFF";
        document.getElementById("prefectureGuess").setAttribute("placeholder", "都道府県");
        document.getElementById("descriptionText").innerHTML = `<span id="yellowSpan">黄色</span>の都道府県はどちらか当ててごらん`
    } else {
        nameLang = "nameEn";
        numLang = 1;
        document.getElementById("japaneseModeButton").style.color = "#666";
        document.getElementById("prefectureGuess").setAttribute("placeholder", "Prefecture");
        document.getElementById("descriptionText").innerHTML = `Guess the prefecture highlighted in <span id="yellowSpan">yellow</span>`
    }
    genOptions();
    convertCache();
    checkCache();
}

function switchJapaneseMode(){
    if (localStorage.getItem("japaneseMode") == "true"){
        localStorage.setItem("japaneseMode", "false");
    } else {
        localStorage.setItem("japaneseMode", "true");
    }
    while (datalistElem.firstChild) {
        datalistElem.removeChild(datalistElem.firstChild);
    }
    checkJapaneseMode();
}

let prefImg = `./Japan Maps/japanmap_${prefectureToday[0]}.png`;
document.getElementById("prefectureImage").setAttribute("src", prefImg);
setTransformOrigin();
//genOptions();
//checkCache();

//<a href="https://www.flaticon.com/free-icons/question" title="question icons">Question icons created by Freepik - Flaticon</a>
