# game-domini
SPA приложение на тестовое задание, билд доступен здесь - https://game-domini.herokuapp.com/

## Используемый стек
### Бекенд
- Языки: TypeScript, GraphQL
- Веб-сервер: Express, GraphHTTP, GraphQL-Codegen
- База данных: MongoDB, Mongoose

### Фронтенд
- Языки: Typescript, CSS, GraphQL
- Фреймворк: ReactJS, React-Hooks

## Решение задач
### Краткое описание
Бизнес логика клиентского приложения работает посредством XHR запросов по пути `/graphql` по протоколу HTTP с JSON-содержимым запросов на языке `GraphQL`. На клиенте запросы формируются через хуки, сгенерированные на основе схем запросов `GraphQL`. На веб-сервере запрос обрабатывается через промежуточный обработчик `GraphQLHTTP`, достигая `Resolvers` в `/src/graphql/resolvers/index.ts`. Резолверы обрабатывают запрос, связываясь с БД через `mongoose`, некоторые комплексные запросы расположены в `/src/db/queries.ts`.

### Выборка игроков
Выбор игрока осуществляется на левой панели клиентского приложения, в списке. Также возможен выбор игроков через ID, вписанный в поле ввода "ID игрока".

### Просмотр ресурсов и подарков игрока с сервера
При выборе игрока появляется центральная панель, на которой расположен список общих ресурсов игрока (суммы подарков и собственных ресурсов) и отправленных ему подарков.

### Просмотр последних выписанных подарков
В правой части страницы расположена панель последних выписанных подарков в течение минуты.

### Отправка подарка игроку
На левой панели, под списком игроков находится форма отправки подарка игроку. В выпадающем списке "получатель" выбирается существующий игрок, в списке "Ресурс" выбирается отправляемый ресурс и в поле "Количество" нужный объем ресурса подарка. За отправителя считается выбранный пользователь.

### Заполнение БД
Серверные скрипты расположены по пути `/src/db/queries.ts`. За заполнение базы данных отвечает функция `fillDb`. База данных заполняется случайным набором значений с помощью функций указанных в задании.

### Создание игроков
Функция `createPlayers` позволяет создать игроков по переданному массиву с указанными параметрами игрока. Допустимые параметры:
- `username` (обязательно) - Имя игрока
- `properties` - JS-объект с ключами-свойствами игрока и значениями произвольного типа, в приложении используются числа. Допустимые свойства - `LUCK`, `AGILITY`, `STRENGTH`, `STEALTH`

### Добавление/вычитание ресурсов у игроков по ID
Данный функционал выполняет функция `buff`. Принимает следующие обязательные аргументы:
- `playerId` - ID игрока, к которому применяется модификация
- `resourceType` - Тип ресурса, который следует изменить
- `amount` - Количество ресурса, подлежащее изменению. Может быть как и отрицательным, так и положительным, в зависимости от задачи. Значение ресурса не может опуститься ниже нуля.

### Изменение свойств игроков по выборке свойства
Реализовано функцией `buffByProperty`. Принимает следующие обязательные аргументы:
- `property` - Свойство, по которому производится выборка.
- `treshold` - Порог, необходимый у значения свойства игрока. Если игрок обладает данным свойством и его величина превышает его, эффект применяется. В ином случае, игрок игнорируется.
- `resourceType` - Тип ресурса, подлежащего изменению
- `amount` - Количество ресурса для изменения
P.S. В задаче не указан функционал "порогового значения", но с ним функция явно интереснее :)

### Осуществление подарка игроку/игрокам
Выполняет функция `sendGift`, принимающая следующие обязательные аргументы:
- `targetIds` - Массив ID игроков, которым производится дарение.
- `authorId` - ID игрока, от лица которого производится дарение.
- `resourceType` - Тип ресурса, который дарят
- `amount` - Количество передаваемого ресурса.
Ограничения:
- Нельзя подарить ресурс самому себе.
- Невозможно подарить нулевое или отрицательное количество ресурса.
- Нельзя подарить ресурс несуществующим игрокам, равно как и от соответствующего лица.
- В сутки можно дарить максимум 10 подарков. Отсчёт идёт от последнего подаренного подарка.
- Нельзя сразу подарить ресурсов больше, чем позволяет максимум пользователя. Например, если до лимита осталось 3 подарка, а производится попытка дарения 4 и более, выведется ошибка.
- Нельзя подарить ресурсов больше, чем собственных имеется у игрока. При этом, уже подаренные ресурсы не считаются за собственные. Например, если у игрока 10 золота и ему подарили ещё 20 единиц, он не сможет подарить 30 единиц кому-либо, его максимум всё ещё является десять единиц. В клиентском интерфейсе пользователь видит общее количество и список подарков.
- В один момент может производиться максимум одна операция дарения, данный процесс обеспечивается очередью.


## Проверка запросов
Зайдя по адресу `/graphql` откроется интерфейс инструмента `GraphiQL`, позволяющего отправлять `GrapqhQL`. Это может пригодиться для тестирования запросов и ответов.
