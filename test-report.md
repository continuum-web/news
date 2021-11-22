## Test Output

Read through all errors. Note that any failing test could be caused by a problem
uncovered in a previous test on the same endpoint.

### ESSENTIAL GET `/api/articles?topic=paper`

Assertion: expected 404 to equal 200

Hints:

- give a 200 status and an empty array when articles for a topic that does
  exist, but has no articles is requested
- use a separate model to check whether the topic exists

### ESSENTIAL GET `/api/articles?topic=not-a-topic`

Assertion: expected 400 to equal 404

Hints:

- use a 404 status code, when provided a non-existent topic
- use a separate model to check whether the topic exists

### ESSENTIAL GET `/api/articles/1`

Assertion: expected { Object (articles) } to contain key 'article'

Hints:

- send the article to the client in an object, with a key of `article`:
  `{ article: {} }`
- return the single article in an object, not in an array
- ensure there are no discrepancies between the README specification and your
  table column names

### ESSENTIAL GET `/api/articles/2`

Assertion: Cannot read property 'votes' of undefined

Hints:

- default the vote column to `0` in the seed
- article with article_id 2 has no comments, you may need to check your join

### ESSENTIAL GET `/api/articles/1`

Assertion: Cannot read property 'comment_count' of undefined

Hints:

- ensure you have calculated a comment_count for the article

### ESSENTIAL PATCH `/api/articles/1`

Assertion: expected 202 to equal 200

Hints:

- use a 200: OK status code for successful `patch` requests

### ESSENTIAL PATCH `/api/articles/1`

Assertion: expected { Object (article_id, title, ...) } to contain key 'article'

Hints:

- send the updated article with a key of `article`

### ESSENTIAL PATCH `/api/articles/1`

Assertion: Cannot read property 'votes' of undefined

Hints:

- increment the `votes` of the specified article

### ESSENTIAL PATCH `/api/articles/1`

Assertion: Cannot read property 'votes' of undefined

Hints:

- decrement the `votes` of the specified article

### ESSENTIAL PATCH `/api/articles/1`

Assertion: expected 400 to equal 200

Hints:

- ignore a `patch` request with no information in the request body, and send the
  unchanged article to the client

### ESSENTIAL GET `/api/articles/2/comments`

Assertion: expected [ Array(1) ] to deeply equal []

Hints:

- return 200: OK when the article exists
- serve an empty array when the article exists but has no comments

### ESSENTIAL POST `/api/articles/1/comments`

Assertion: expected 201 to equal 400

Hints:

- use a 400: Bad Request status code when `POST` request does not include all
  the required keys

### ESSENTIAL POST `/api/articles/10000/comments`

Assertion: expected 500 to be one of [ 404, 422 ]

Hints:

- use a 404: Not Found _OR_ 422: Unprocessable Entity status code when `POST`
  contains a valid article ID that does not exist

### ESSENTIAL POST `/api/articles/1/comments`

Assertion: expected 500 to be one of [ 404, 422 ]

Hints:

- use a 404: Not Found _OR_ 422: Unprocessable Entity status code when `POST`
  contains a valid username that does not exist

### ESSENTIAL DELETE `/api/comments/1000`

Assertion: expected 204 to equal 404

Hints:

- use a 404: Not Found when `DELETE` contains a valid comment_id that does not
  exist
