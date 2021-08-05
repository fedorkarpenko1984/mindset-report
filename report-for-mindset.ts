/* ******** ТИПЫ ДАННЫХ В JAVASCRIPT */

//Примитивы.
const boolean = true || false // булевый или логический тип. бинарная логика правда/ложь

const number = 123 || 123.45 // числовой без разделения на целочисленный и с плавающей точкой

const string = 'строка' // строчный тип

// Символьный
let symbol = Symbol('symbol') // спецефический тип данных, по факту уникальный идентификатор
                                        // Symbol('symbol') === Symbol('symbol') дает false, т.е. не равны
// Нул
let Null = null
Null = {
    key: 'value'
}
/*
null - либо в качестве заглушки для несуществующего объекта(DOM в частности или сторонние API),
 либо как 'стартовое состояние' для данных, структура
которых неопределена, либо присваевается объекту, дабы отправить его к сборщику мусора
 */

// Неопределенный тип
const Undefined = undefined

// Объекты
const object = {
    key1: 'value1',
    key2: {
        key: 'value'
    }
}
// объект в js - структура данных типа ключ - значение.ключ - всегда строка, а значение может быть любой сложности,
// т.е. иметь структуру и быть объектом или массивом из объектов и т.д.

// В спецификации типом не считается, но упомянуть следует
const array = [1,2,3] // массивы, по сути объекты класса Array



// Что добавил Typescript к существующим в JS типам

const bool: boolean = true || false
const num: number = 123 || 123.45
const str: string = 'строка'
// строгая типизация для примитивов


//для null, undefined и Symbol ичего не изменилось, т.к. это формально типы данных, но не совсем.
// typeof null = 'object'

// Объекты будут рассмотренны далее в одном блоке с интерфейсами




/* ******************* PURE TYPESCRIPT ******************** */

// any
let anyType: any = 1
anyType = true
anyType = {}
// Чисто динамический тип. Моветон


// UnionType
let union: number | string = 1
union = '1' // Вариативность объедененного типа. Нет столько вольности, как в any


// Строковые литералы
let TripleLogic: 'yes' | 'mayBe' | 'no'
let musketeers: 'dartagnan' | 'atos' | 'portos' | 'aramis'


// Типизированый массив.
const numArr: Array<number> = [1,2,3]
const strArr: string[] = ['qwe', 'rty']


// Кортеж
const tuple: [string, number, boolean] = ['Карпенко', 37, true]
// Для представления простого набора данных. В примере фамилия, возраст, и семейное положение
// Массивы и кортежи можно задать так же Readonly. В обычном JS элемент массива можно менять, даже если он создан
//через const


//Enum или перечисления
enum MyCats {barsik, murzik}
console.log(MyCats[0])// barsik

enum Days { Sat=1, Sun, Mon, Tue, Wed, Thu, Fri };
const sun: string = Days[2];




/* ************* OBJECTS, INTERFACES, CLASSES ********** */


// Описание объекта со статической типизацией без применения интерфейсов(варианты)

// Литерал объекта, но так не делают, как правило, хотя код валидный
const Object1: {prop: string} = {
    prop: 'string'
}

// Используя функцию assertion. Редко. Если нельзя использовать интерфейс.
const Object2 = {
    key: 'value' as string,
    ke1: 123 as number
}



/* *********** INTERFACES ************** */

// Объявим интерфейс, описывающий пользователя. Синтаксически интерфейс очень похож на обычный JS объект
interface User {
    email: string
    password: string
    name?: string
    age?: number
}


// Теперь используем абстракцию User для конкретики
const someUser: User = {
    email: 'email1',
    password: '123456',
    name: 'Vasya'
} // Правильно, name и age - необязательные? поля


const alex: User = {
    password: '12345678',
    gender: 'male'
} // Нет поля gender в интерфейсе, а имэйла наоборот не хватает. Будет ошибка


let person = {} as User // Или так. Пока пустой, но структура задана. Используем функцию typescript assertion


// Расширение интерфейсов, как некая альтернатива наследованию классов в JS

// Коты
enum CatColor {white, black, ginger}
interface Cat {
    name: string,
    color: CatColor
}

// Расширяем интерфейс котов описанием хвоста
enum CatTail {long, medium,short, bobTail}
interface CatAndHisTail extends Cat{
    tail: CatTail
}
// В интерфейсах можно делать поля readonly!



/* ***** Создание классов на основе интефейсов ********* */

// Интерфейс для описания фермерского животного
interface FarmAnimal {
    name: string
    weight: number
    readonly horns : boolean
}

// Класс Cow на основе интерфейса FarmAnimal

class Cow implements FarmAnimal {
    name: string
    weight: number
    readonly horns: boolean = true

    constructor(name: string, weight: number) {
        this.name = name
        this.weight = weight
    }

    // Метод определит по весу, теленок ли эта особь
    itIsCalf(): boolean {
        if (this.weight < 120) {
            return true
        } else return false
    }
}

/*
Никакой магии. Если упрощенно, то к структуре данных, описаной в интерфейсе, дописываем методы класса.
Класс должен реализовать все обязательные поля интерфейса
 */



/* ***************** FUNCTIONS ********************** */


/* ********** Функции в JS и TS. Типы void и never ******* */


// JavaScript - примеры
// Ничего не возвращает, выводит приветствие. Можно не подавать аргумент вообще
function hi(name) {
    console.log('Hi,' + name)
}


// Вторая степень числа
function square(x) {
    return x * x
}




// Typescript - типизация и на входе и на выходе
// Специальный тип для функции, которая не возвращает
function HI(name: string): void {
    console.log('Hi,' + name)
}

// Строгая валидация при пользовательском вводе, иначе все пропало
function  SQUARE(x: number): number {
    return x * x
}

// Специальный тип never - для исключений.

// Если по каким-то причинам пользовательский ввод валидируется как-то так или вообще никак. Например.
function format(value: string | number): string | never {
    switch (typeof value) {
        case 'string':
            return value.trim()
        case 'number':
            return String(value)
        default:
            throw new Error('С приплыздом, товарищи!')
    }
}

// Или отдельная функция-ошибка, но пример очень надуманный
function error(errorCode): never {
    enum Errors {Все_пропало=223, Бегите_глупцы=346, Это_начало_конца=512}
    throw new Error(Errors[errorCode])
}


// В оф. документации также указан бесконечный цикл,
function infinityLoop(): never {
    while (true) {
        console.log('42 is answer')
    }
} // но это что-то фантастическое




/* ************ GENERICS ************* */

// Сперва на простом примере

//Тождественная функция возвращает полученое значение без изменений. Обычный JS
function returnArgJS(arg) {
    return arg
}


// Теперь с  типизацией. Под строки
function returnArg(arg: string): string {
    return arg
}


// Универсальный код с дженериками. T - переменная, в которой мы указываем тип аргумента
function returnArgGen<T>(arg: T): T {
    return arg
}

// Использование
returnArgGen<boolean>(true) // та же картина с любыми данными, будь то примитивы или структуры



//Приближенный к реальности пример. Функция сортирует массив объектов по выбранному
// признаку(имя, возраст, пол и т.д)

function sort<D, T>(someData: Array<D>,value: T, propName: string): Array<D> {
    return someData.filter(someNoteInData => {
        return someNoteInData[propName] === value
    })
}

//Упрощенный интерфейс для описания студента
type gender = 'male' | 'female'
interface Student {
    firstName: string
    lastName: string
    gender: gender
    age: number
}

let stundentList: Student[] = [] // Массив в базе с какими-то студентами.

sort<Student, number>(stundentList, 20, 'age') // Итогом будут 20тилетние студенты


// Интерфейс для описания вэб-сайта

type frontend = 'Native' | 'React' | 'Angular' | 'Vue' | 'Svelte' | 'Other'
interface WebSite {
    frontend: frontend
    CMS?: string
    backend?: string
    hosting: string
    HostPriceByMonthUSD: number
}

let SomeWebsites: WebSite[] = [] // Какие-то вебсайты

let sitesOnReact: WebSite[] = sort<WebSite, frontend>(SomeWebsites, 'React', 'frontend') //
//Отборка сайтов на реакте

let finalResult: WebSite[] = sort<WebSite, string>(sitesOnReact, 'C#', 'backend') //И с бэком на C#

