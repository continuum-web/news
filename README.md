
# Mock News API


An API serving Mock news based on, back-end project using Express, Posgress and
a hand full of other technologies to showcase the skills I learned during the 
back-end block on the North Coder's bootcamp.

The hosted version of this project is available on [here on Heroku](https://continuum-news.herokuapp.com/).




## Screenshots

![App Screenshot](https://i.imgur.com/DxaA6oh.png)


## API Reference

### GET /api
returns a JSON object with information on the available endpoints
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| none   | none ||

#### GET all Articles
This Endpoint gets an object with all of the articles hosted on the database 
```http
  GET /api/articles
```

| Parameter/query | Type     | Description                |
| :-------- | :------- | :------------------------- |
| none|none |this enp |
|?Sort_by=|`string`|an optional string that can sort the returned data,
|||| **defaults** to the Created_at Column and is ordered DESC by default
|?topic= | `string`|optional topic query to return articles wth that topic |
|?order_by= |`string`|takes either asc for ascendin or desc for descending| 


#### GET a single article with an ID

```http
  GET /api/articles/:article_id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Number` | **Required**. Id of article to fetch |

#### update the vote count of articles

```http
  PATCH /api/articles/:article_id
```

| Parameter/query | Type     | Description                |
| :-------- | :------- | :------------------------- |
| article_id|`Number`|**required** **id** of the article you want to chenge votes on |
|body|`object`|**required**  a json style object with **username** and **body** keys|


#### GET all topics

```http
  GET /api/topics
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| none   | `string` |  |

#### GET articles comments

```http
  GET /api/articles/:article_id/comments
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| article_id   | `Number` |  **required** needs the article id to get the comments|

#### POST articles comments

```http
  POST /api/articles/:article_id/comments
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| article_id   | `Number` |  **required** needs the **article_id** to get the comments|
|body|`object`|**required**  a JSON object with keys of **username** and **body**|



#### DELETE comments

```http
  DELETE /api/comments/:comment_id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| comment_id   | `Number` |  **required** needs the **comment_id** delete the comment|

## setup
this project requires [postrges](https://www.postgresql.org/) to be installed and working locally
Clone the project.
the project was created using node verion 16.11.1 and postgresql version psql (PostgreSQL) 13.4 (Ubuntu 13.4-0ubuntu0.21.04.1)
and my not run on older versions


To clone the project
```bash
  git clone https://github.com/continuum-web/news.git
```

Go to the project directory

```bash
  cd my-project
```


Install dependencies

```bash
  npm install
```

### setup-dbs
This command will create the databases locally
```bash
  npm run setup-dbs
```


Run this to seed the development database with development data
 ```bash
  npm seed
```

To seed a production database run this 
```bash
npm run seed:prod
```

### testing

To test the code using jest run 
```bash
npm test-app
```

### running the program
You will need to create two .env (**.env.development** and **.env.test**)files with
the environmental variables as follows.  
*note* the password is not required on all operating systems
```
PGDATABASE=databasename
PGPASSWORD=password
```
To run the program you need to run the listner using 
```bash
npm run start
```


## Acknowledgements

 For this project I would like to Acknowledge the work done on the base project by North Coders
and the lectures and tutor help that led me to br able to comelete this API


