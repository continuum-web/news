## STEP 1

### Main Tasks
 - create a function to join relevant data? ~ not sure if this is needed or are they DB links.
    - article.topic to topic.slug
    - article.author to user.username
    - comment.author to users.username
    - comment.article_id to article.article_id

 - write a util function to format the data
   - PG FORMAT NEEDS AN ARRAY TO WORK
   - should take the data for each table and format it to the correct   array format
   - the data should not mutated and should provide new ref

### TTD
- NEED TO USE TTD
   for the FORMAT function I need to
   - ensure the data come back in the correct format ie. array
   - ensure that the data I pass in is in no way mutated
   - ensure the date stored to the DB is the correct format and data



