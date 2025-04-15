{//Практика Строк:
let userName = 'Ddda';
let userSurname = 'Sssы';
let userName1 = '';
let userSurname1 = '';

if (userName.substring(0, 1) !== userName.substring(0, 1).toUpperCase()) {
    userName1 = userName.substring(0, 1).toUpperCase() + userName.substring(1);
} else {
    userName1 = userName;
}

if (userName.substring(1) !== userName.substring(0, 1).toLowerCase()) {
    userName1 = userName1.substring(0, 1) + userName.substring(1).toLowerCase();
} else {
    userName1 = userName;
}

if (userSurname.substring(0, 1) !== userSurname.substring(0, 1).toUpperCase()) {
    userSurname1 = userSurname.substring(0, 1).toUpperCase() + userSurname.substring(1);
} else {
    userSurname1 = userSurname;
}

if (userSurname.substring(1) !== userSurname.substring(0, 1).toLowerCase()) {
    userSurname1 = userSurname1.substring(0, 1) + userSurname.substring(1).toLowerCase();
} else {
    userSurname1 = userSurname;
}

console.log(userName, userName1);
console.log(userName1 === userName ? 'Имя осталось без изменений' : 'Имя было преобразовано');

console.log(userSurname, userSurname1);
console.log(userSurname === userSurname1 ? 'Фамилия осталась без изменений' : 'Фамилия была преобразована');
}

//Практика массивов:
{//Задача 1:
let array = [];
let county = 42;
let n = -3;
let m = -10;
let k = Math.abs(n - m);
let first = Math.min(n, m);

for (let i = 0; i < county; i++) {
    array[i] = Math.round(Math.random() * k + first);
}

console.log(array);
}

{//Задачи 2, 3:
let arr = [];
let count = 5;
let temp;
let j;

for (let i = 0; i < count; i++) {
    arr[i] = i + 1;
}

console.log(arr);

for (i = 0; i < count; ++i) {
    j = Math.round(Math.random() * (arr.length - 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

console.log(arr);

let z = 7;
let index = -1
for (i in arr) {
    if (arr[i] === z) {
        index = i;
        break;
    }
}
console.log(index)

console.log(index >= 0 ? `индекс элемента = ${index}` : `элемент не найден`);
}

{//Задача 4:
let arr1 = [2, 2, 17, 21, 45, 12, 54, 31, 53];
let arr2 = [12, 44, 23, 5];

//Способ по заданию:
for (let i = 0; i < arr2.length; ++i) {
    arr1.push(arr2[i]);
}

//Другие возможность JS:
//1:
arr1 = [...arr1,... arr2];
//2:
arr1.splice(arr1.length,0,...arr2);
//3:
arr1 = arr1.concat(arr2);

console.log(arr1);
}

{//Сортировка масива
let arr = [3, 22, 34, 12, 55, 22, 12, 3];

//Способ по заданию:
function arraySorting(array) {
    for (let i = 0; i < array.length; ++i) {
        for (let j = 0; j < array.length - 1; ++j) {
        if (array[j] > array[j + 1]) {
            let temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
            }
        }
    }
}

//То же самое но используя "forEach":
function arraySorting(array) {
    array.forEach(i => {
        for (i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            let temp = array[i];
            array[i] = array[i + 1];
            array[i + 1] = temp;
            }
        }
    });
}

arraySorting(arr);

//Используюя встроенный метод JS:
arr.sort((a, b) => a - b);

console.log(arr);
}

{//Практика функции:
// Массив с почтовыми адресами:
let whiteList = ['my-email@gmail.ru', 'jsfunc@mail.ru', 'annavkmail@vk.ru', 'fullname@skill.ru', 'goodday@day.ru'];
// Массив с почтовыми адресами в чёрном списке:
let blackList = ['jsfunc@mail.ru','goodday@day.ru'];

let result = filter1(whiteList, blackList);
console.log(result);

let result1 = filter2(whiteList, blackList);
console.log(result1);

function filter1(allMails = [], banMails = []) {
    for (let banMail of banMails) {
        if (allMails.includes(banMail)) {
            allMails.splice(allMails.indexOf(banMail), 1);
        }
    }
    return allMails;
}

function filter2(allMails = [], banMails = []) {
    let arrMails = [];
    for (let mail of allMails) {
        if (!banMails.includes(mail)) {
            arrMails.push(mail);
        }
    }
    return arrMails;
}

}

//Практика объекты:
{//Задача 1:
let user1 = {
    name: 'Игорь',
    age: 17
};
let user2 = {
    name: 'Оля',
    age: 21
};

let result = getOlderUser(user1, user2);
console.log(result);
   
function getOlderUser(userA, userB) {
    let olderUser = '';
    if (userA.age > userB.age) {
        olderUser = userA.name;
    } else if (userA.age < userB.age) {
        olderUser = userB.name;
    } else olderUser = 'Возраст пользователей одинаков';
    return olderUser;
}

}

{//Задача 2:
let allUsers=[
    {name: 'Валя', age: 11},
    {name: 'Таня',age: 24},
    {name: 'Рома',age: 21},
    {name: 'Надя', age: 34},
    {name: 'Антон', age: 7}
    ];

let result = getOlderUserArray(allUsers);
console.log(result);
   
function getOlderUserArray(arrayUsers = []) {
    let olderUserAge = arrayUsers[0].age;
    let olderUserName = arrayUsers[0].name;   
    for (let user of arrayUsers) {
        if (olderUserAge < user.age) {
            olderUserAge = user.age;
            olderUserName = user.name;
        }
    }
    return `Старше всех пальзователь: ${olderUserName}`;
}

}

{//Задача 3:
let objects = [
    { name: 'Василий', surname: 'Васильев' },
    { name: 'Иван', surname: 'Иванов' },
    { name: 'Пётр', surname: 'Петров' }
    ];

let result = filter(objects, 'name', 'Иван');;
console.log(result);

function filter(objectMass = [], propertyName = '', argumentValue = '') {
    for (let object of objectMass) {
        if (object[propertyName] == argumentValue) {
            return object;
        }
    }
}

}

// DOM задачи:
{//Задача 1:
document.addEventListener('DOMContentLoaded', function() {
    let nameInput = document.querySelector('.name-input');
    let ageInput = document.querySelector('.age-input');
    let createCardButton = document.querySelector('.create-user-card');
   
    function createStudentCard(name = '', age) {
        let card = document.createElement('div');
        document.body.append(card);
        let h2 = document.createElement('h2');
        h2.textContent = name;
        document.body.children[document.body.children.length-1].append(h2);
        let span = document.createElement('span');
        span.textContent = `Возраст: ${age} лет.`;
        document.body.children[document.body.children.length-1].append(span);
    }

    createCardButton.addEventListener('click', function () {
        createStudentCard(nameInput.value, ageInput.value)
    });
});

}

{//Задача 2:
document.addEventListener('DOMContentLoaded', function() {
    let nameInput = document.querySelector('.name-input');
    let ageInput = document.querySelector('.age-input');
    let createCardButton = document.querySelector('.create-user-card');

    function createStudentCard(student = {}) {
        let card = document.createElement('div');
        document.body.append(card);
        let h2 = document.createElement('h2');
        h2.textContent = student.name;
        document.body.children[document.body.children.length-1].append(h2);
        let span = document.createElement('span');
        span.textContent = 'Возраст: ' + student['age'] + ' лет.';
        document.body.children[document.body.children.length-1].append(span);
    }
    
    createCardButton.addEventListener('click', function () {
        let studentObj={};
        studentObj.name = nameInput.value;
        studentObj.age = ageInput.value;
        createStudentCard(studentObj)
    });
});
  
}
 
{//Задача 3, 4:
document.addEventListener('DOMContentLoaded', function() {
    let showListStudents = document.querySelector('.show-list-students');
    let allStudents=[
        {name: 'Валя', age: 11},
        {name: 'Таня',age: 24},
        {name: 'Рома',age: 21},
        {name: 'Надя', age: 34},
        {name: 'Антон', age: 7}
        ]
    
    function createStudentsList(students = []) {
        let div = document.body.getElementsByTagName('div')[0];
        let ul = document.createElement('ul');
        div.append(ul);
        for(let student of students) {
        let card = document.createElement('li');
        div.children[div.children.length-1].append(card);
        let h2 = document.createElement('h2');
        h2.textContent = student.name;
        card.append(h2);
        let span = document.createElement('span');
        span.textContent = 'Возраст: ' + student.age + ' лет.';
        card.append(span);
        }
    }
  
    showListStudents.addEventListener('click', function() {
        createStudentsList(allStudents);
        showListStudents.disabled = true;
    });
});

}

{//цепочка вызовов
console.log(parseEmloyeesData(`
    Тиунов Тимофей   Сергеевич,  системный архитектор
    Иванов  Иван Иванович , front-end   разрабочик  
    `));
    
function parseEmloyeesData(dataString) {
  return dataString
    .split('\n')
    .filter(line => line.trim().length > 0)
    .map(line => {
      const [fullName, work] = line
        .split(',')
        .map(str => str.trim())
        .filter(text => text.length > 0)
        const [surName, name, middleName] = fullName
          .split(' ')
          .filter(text => text.length >0)
        const occupation = work
            .split(' ')
            .map(text => text.trim())
            .filter(text => text.length >0)
            .join(' ')
        return {
          surName, name, middleName, occupation
        };
    })
}
}