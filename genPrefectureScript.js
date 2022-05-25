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
var currentStreak;
var textInput = document.getElementById('prefectureGuess');

// This checks cache to see if the user has visited the page before. If not, it displays the help screen. 
if (localStorage.getItem("visitedBefore") == null){
    document.getElementById("introScreenContainer").style.display = "flex";
    localStorage.setItem("visitedBefore", true);
}

const prefecturesList = {
    hokkaido: {
        ID: 0,
        nameEN: "Hokkaido",
        nameJP: "北海道",
        nameKana: "ほっかいどう",
        latlong: [43.06417,141.34694]
    },
    aomori: {
        ID: 1,
        nameEN: "Aomori",
        nameJP: "青森",
        nameKana: "あおもり",
        latlong: [40.82444,140.74],
    },
    iwate: {
        ID: 2,
        nameEN: "Iwate",
        nameJP: "岩手",
        nameKana: "いわて",
        latlong: [39.70361,141.1525],
    },
    miyagi: {
        ID: 3,
        nameEN: "Miyagi",
        nameJP: "宮城",
        nameKana: "みやぎ",
        latlong: [38.26889,140.87194],
    },
    akita: {
        ID: 4,
        nameEN: "Akita",
        nameJP: "秋田",
        nameKana: "あきた",
        latlong: [39.71861,140.1025],
    },
    yamagata: {
        ID: 5,
        nameEN: "Yamagata",
        nameJP: "山形",
        nameKana: "やまがた",
        latlong: [38.24056,140.36333],
    },
    fukushima: {
        ID: 6,
        nameEN: "Fukushima",
        nameJP: "福島",
        nameKana: "ふくしま",
        latlong: [37.75,140.46778],
    },
    ibaraki: {
        ID: 7,
        nameEN: "Ibaraki",
        nameJP: "茨城",
        nameKana: "いばらき",
        latlong: [36.341390,140.44667],
    },
    tochigi: {
        ID: 8,
        nameEN: "Tochigi",
        nameJP: "栃木",
        nameKana: "とちぎ",
        latlong: [36.56583,139.88361],
    },
    gunma: {
        ID: 9,
        nameEN: "Gunma",
        nameJP: "群馬",
        nameKana: "ぐんま",
        latlong: [36.39111,139.06083],
    },
    saitama: {
        ID: 10,
        nameEN: "Saitama",
        nameJP: "埼玉",
        nameKana: "さいたま",
        latlong: [35.85694,139.64889],
    },
    chiba: {
        ID: 11,
        nameEN: "Chiba",
        nameJP: "千葉",
        nameKana: "ちば",
        latlong: [35.60472,140.12333],
    },
    tokyo: {
        ID: 12,
        nameEN: "Tokyo",
        nameJP: "東京",
        nameKana: "とうきょう",
        latlong: [35.68944,139.69167],
    },
    kanagawa: {
        ID: 13,
        nameEN: "Kanagawa",
        nameJP: "神奈川",
        nameKana: "かながわ",
        latlong: [35.44778,139.6425],
    },
    niigata: {
        ID: 14,
        nameEN: "Niigata",
        nameJP: "新潟",
        nameKana: "にいがた",
        latlong: [37.90222,139.02361],
    },
    toyama: {
        ID: 15,
        nameEN: "Toyama",
        nameJP: "富山",
        nameKana: "とやま",
        latlong: [36.69528,137.21139],
    },
    ishikawa: {
        ID: 16,
        nameEN: "Ishikawa",
        nameJP: "石川",
        nameKana: "いしかわ",
        latlong: [36.59444,136.62556],
    },
    fukui: {
        ID: 17,
        nameEN: "Fukui",
        nameJP: "福井",
        nameKana: "ふくい",
        latlong: [36.06528,136.22194],
    },
    yamanashi: {
        ID: 18,
        nameEN: "Yamanashi",
        nameJP: "山梨",
        nameKana: "やまなし",
        latlong: [35.66389,138.56833],
    },
    nagano: {
        ID: 19,
        nameEN: "Nagano",
        nameJP: "長野",
        nameKana: "ながの",
        latlong: [36.65139,138.18111],
    },
    gifu: {
        ID: 20,
        nameEN: "Gifu",
        nameJP: "岐阜",
        nameKana: "ぎふ",
        latlong: [35.39111,136.72222],
    },
    shizuoka: {
        ID: 21,
        nameEN: "Shizuoka",
        nameJP: "静岡",
        nameKana: "しずおか",
        latlong: [34.97694,138.38306],
    },
    aichi: {
        ID: 22,
        nameEN: "Aichi",
        nameJP: "愛知",
        nameKana: "あいち",
        latlong: [35.18028,136.90667],
    },
    mie: {
        ID: 23,
        nameEN: "Mie",
        nameJP: "三重",
        nameKana: "みえ",
        latlong: [34.73028,136.50861],
    },
    shiga: {
        ID: 24,
        nameEN: "Shiga",
        nameJP: "滋賀",
        nameKana: "しが",
        latlong: [35.00444,135.86833],
    },
    kyoto: {
        ID: 25,
        nameEN: "Kyoto",
        nameJP: "京都",
        nameKana: "きょうと",
        latlong: [35.02139,135.75556],
    },
    osaka: {
        ID: 26,
        nameEN: "Osaka",
        nameJP: "大阪",
        nameKana: "おおさか",
        latlong: [34.68639,135.52],
    },
    hyogo: {
        ID: 27,
        nameEN: "Hyogo",
        nameJP: "兵庫",
        nameKana: "ひょうご",
        latlong: [34.69139,135.18306],
    },
    nara: {
        ID: 28,
        nameEN: "Nara",
        nameJP: "奈良",
        nameKana: "なら",
        latlong: [34.68528,135.83278],
    },
    wakayama: {
        ID: 29,
        nameEN: "Wakayama",
        nameJP: "和歌山",
        nameKana: "わかやま",
        latlong: [34.22611,135.1675],
    },
    tottori: {
        ID: 30,
        nameEN: "Tottori",
        nameJP: "鳥取",
        nameKana: "とっとり",
        latlong: [35.50361,134.23833],
    },
    shimane: {
        ID: 31,
        nameEN: "Shimane",
        nameJP: "島根",
        nameKana: "しまね",
        latlong: [35.47222,133.05056],
    },
    okayama: {
        ID: 32,
        nameEN: "Okayama",
        nameJP: "岡山",
        nameKana: "おかやま",
        latlong: [34.66167,133.935],
    },
    hiroshima: {
        ID: 33,
        nameEN: "Hiroshima",
        nameJP: "広島",
        nameKana: "ひろしま",
        latlong: [34.39639,132.45944],
    },
    yamaguchi: {
        ID: 34,
        nameEN: "Yamaguchi",
        nameJP: "山口",
		nameKana: "やまぐち",
        latlong: [34.18583,131.47139],
    },
    tokushima: {
        ID: 35,
        nameEN: "Tokushima",
        nameJP: "徳島",
		nameKana: "とくしま",
        latlong: [34.06583,134.55944],
    },
    kagawa: {
        ID: 36,
        nameEN: "Kagawa",
        nameJP: "香川",
		nameKana: "かがわ",
        latlong: [34.34028,134.04333],
    },
    ehime: {
        ID: 37,
        nameEN: "Ehime",
        nameJP: "愛媛",
		nameKana: "えひめ",
        latlong: [33.84167,132.76611],
    },
    kochi: {
        ID: 38,
        nameEN: "Kochi",
        nameJP: "高知",
		nameKana: "こうち",
        latlong: [33.55972,133.53111],
    },
    fukuoka: {
        ID: 39,
        nameEN: "Fukuoka",
        nameJP: "福岡",
		nameKana: "ふくおか",
        latlong: [33.60639,130.41806],
    },
    saga: {
        ID: 40,
        nameEN: "Saga",
        nameJP: "佐賀",
		nameKana: "さが",
        latlong: [33.24944,130.29889],
    },
    nagasaki: {
        ID: 41,
        nameEN: "Nagasaki",
        nameJP: "長崎",
		nameKana: "ながさき",
        latlong: [32.74472,129.87361],
    },
    kumamoto: {
        ID: 42,
        nameEN: "Kumamoto",
        nameJP: "熊本",
		nameKana: "くまもと",
        latlong: [32.78972,130.74167],
    },
    oita: {
        ID: 43,
        nameEN: "Oita",
        nameJP: "大分",
		nameKana: "おおいた",
        latlong: [33.23806,131.6125],
    },
    miyazaki: {
        ID: 44,
        nameEN: "Miyazaki",
        nameJP: "宮崎",
		nameKana: "みやざき",
        latlong: [31.91111,131.42389],
    },
    kagoshima: {
        ID: 45,
        nameEN: "Kagoshima",
        nameJP: "鹿児島",
		nameKana: "かごしま",
        latlong: [31.56028,130.55806],
    },
    okinawa: {
        ID: 46,
        nameEN: "Okinawa",
        nameJP: "沖縄",
		nameKana: "おきなわ",
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
            localStorage.setItem("DoneToday", "false");
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
            prefectureDetails = [prefName, prefecturesList[prefName]['nameEN'], prefecturesList[prefName]['nameJP'], prefecturesList[prefName]['nameKana'], prefecturesList[prefName]['latlong']];
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

function findStreak(){
    let date = dateToday;
    let dateToCheck;
    let year = parseInt(String(date).substring(0,4));
    let month = parseInt(String(date).substring(4,6));
    let day = parseInt(String(date).substring(6,8));
    let daysCount = 1;
    while (true){
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
        month = String(month).padStart(2, '0')
        day = String(day).padStart(2, '0')
        dateToCheck = String(year)+String(month)+String(day);
        console.log(dateToCheck);
        if (localStorage.getItem(parseInt(dateToCheck)) != null){
            daysCount++;
        } else {
            break;
        }
    }
    if (localStorage.getItem("DoneToday") == "false"){
        document.getElementById("streakIcon").setAttribute("src", "fire_gray.png");
        return daysCount - 1;
    } else {
        document.getElementById("streakIcon").setAttribute("src", "fire.png");
        return daysCount;
    }
}

function updateStreak(){
    currentStreak = findStreak();
    document.getElementById("streakNumber").innerHTML = currentStreak;
    if (currentStreak == 1){
        document.getElementById("streakContainer").setAttribute("title", `Your current streak is 1 day!`)
    } else {
        document.getElementById("streakContainer").setAttribute("title", `Your current streak is ${currentStreak} days!`)
    }
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
    let correctPref = prefectureToday[4];
    let guessPref = "mie";
    console.log(`Correct: ${prefectureToday[1]}`);
    console.log(`Guess: ${guessPref}`);
    let guessDetails = [];
    for (const prefName in prefecturesList){
        if (prefName == guessPref){
            guessDetails = [prefName, prefecturesList[prefName]['nameEN'], prefecturesList[prefName]['nameJP'], prefecturesList[prefName]['latlong']];
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
    let correctPref = prefectureToday[4];
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
    if (localStorage.getItem("japaneseMode") == "1") {
        if (wanakana.isHiragana(inputVal)){
            for (const prefName in prefecturesList){
                if (prefecturesList[prefName]["nameKana"] == inputVal){
                    inputVal = prefecturesList[prefName]["nameJP"];
                }
            }
        }
    }
    inputVal = inputVal.toLowerCase();
    inputVal = inputVal.charAt(0).toUpperCase() + inputVal.slice(1);
    currentGuess = checkCache();
    setGuesses(currentGuess, inputVal);
    sendCache(currentGuess, inputVal);
}

function setGuesses(currentGuess=1, inputVal){
    // JAPANESE MODE SET GUESSES
    if (localStorage.getItem("japaneseMode") == "1"){
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
            document.getElementById("winning-text").innerHTML = "<ruby><rb>地<rt>ち</rt></rb><rb>理<rt>り</rt></rb><rb>上<rt>じょう</rt></rb><rb>手<rt>ず</rt></rb></ruby>！";
            document.getElementById("hintLines").style.display = "none"
            document.getElementById("googleAnchor").style.display = "block";
            document.getElementById("googleAnchor").setAttribute("href", `https://www.google.com/search?q=${prefectureToday[1]} Prefecture`);
            localStorage.setItem("DoneToday", "true");
            updateStreak();
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
            localStorage.setItem("DoneToday", "true");
            updateStreak();
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
            localStorage.setItem("DoneToday", "true");
            updateStreak();
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
            localStorage.setItem("DoneToday", "true");
            updateStreak();
        }
    }
}

function validInput(inputVal){
    let valid = false;
    for (const prefName in prefecturesList){
        if (inputVal.toUpperCase() == prefName.toUpperCase() || inputVal == prefecturesList[prefName]["nameJP"] || inputVal == prefecturesList[prefName]["nameKana"]){
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
    if (localStorage.getItem("japaneseMode") == "1"){
        currentGuess = localStorage.getItem(dateToday);
        for (let i = 1; i <= parseInt(currentGuess) - 1; i++){
            for (prefName in prefecturesList){
                if (prefecturesList[prefName]["nameEN"] == localStorage.getItem(i)){
                    localStorage.setItem(i, prefecturesList[prefName]["nameJP"]);
                }
            }
        }
    } else {
        currentGuess = localStorage.getItem(dateToday);
        for (let i = 1; i <= parseInt(currentGuess) - 1; i++){
            for (prefName in prefecturesList){
                if (prefecturesList[prefName]["nameJP"] == localStorage.getItem(i)){
                    localStorage.setItem(i, prefecturesList[prefName]["nameEN"]);
                }
            }
        }
    }
}

// japaneseMode = 0: English, japaneseMode = 1: Japanese (no kana), japaneseMode = 2: Japanese (kana)

function checkJapaneseMode(){
    wanakana.bind(textInput, { IMEMode: true });
    if (localStorage.getItem("japaneseMode") == null){
        localStorage.setItem("japaneseMode", "0");
    }
    if (localStorage.getItem("japaneseMode") == "1"){
        nameLang = "nameJP";
        numLang = 2;
        document.getElementById("japaneseModeButton").style.color = "#FFF";
        document.getElementById("prefectureGuess").setAttribute("placeholder", "都道府県");
        document.getElementById("descriptionText").innerHTML = `<span id="yellowSpan">黄色</span>の都道府県はどちらか当ててごらん`
    } else {
        nameLang = "nameEN";
        numLang = 1;
        document.getElementById("japaneseModeButton").style.color = "#666";
        document.getElementById("prefectureGuess").setAttribute("placeholder", "Prefecture");
        document.getElementById("descriptionText").innerHTML = `Guess the prefecture highlighted in <span id="yellowSpan">yellow</span>`;
        wanakana.unbind(textInput);
    }
    genOptions();
    convertCache();
    checkCache();
}

function switchJapaneseMode(){
    if (localStorage.getItem("japaneseMode") == "1"){
        localStorage.setItem("japaneseMode", "0");
        wanakana.unbind(textInput);
    } else {
        localStorage.setItem("japaneseMode", "1");
    }
    while (datalistElem.firstChild) {
        datalistElem.removeChild(datalistElem.firstChild);
    }
    checkJapaneseMode();
}

let prefImg = `./Japan Maps/japanmap_${prefectureToday[0]}.png`;
document.getElementById("prefectureImage").setAttribute("src", prefImg);
setTransformOrigin();
updateStreak();
//genOptions();
//checkCache();

//<a href="https://www.flaticon.com/free-icons/question" title="question icons">Question icons created by Freepik - Flaticon</a>