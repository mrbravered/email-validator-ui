# README Spec#

Email Validator API

An intermediate rESTful API coded using Node.JS. The API should accept an email address as the payload and return the following 
information in JSON formatted text:

email address: xxx@xxx.xxx
Status: {unknown|valid|invalid|} 

If the Email address is not found in the internal DB it will then forward the request to BriteVerify for validation and store results in the local DB for future use

reference:
BriteVerify API

http://docs.briteverify.com/real-time-api/


# DOCUMENTATION

Installation Instructions:

1. git clone
2. npm install
3. npm start

## Authentication
Authentication is solved using Bearer token in Authorization header, like "Authorization: Bearer TOKEN_VALUE". Every user has dedicated API key. User Authentication is used for GET /api/post route.

All other routes are admin actions and are protected by token defined in config.js 

## Routes
### Posts

##### GET /api/post

```
/**
 * @method GET /api/post
 * @description Get email if it is in DB. If not, fetch data from briteverify, store it in DB and return
 *
 * @param {String} emailAddress email address
 * @param {Number} [expanded=0] Should we check briteverify. 1 -> yes, 0 -> no
 *
 * @return {Object} post object, e.g. ({  "emailAddress": "some@email.com",  "status": "valid",  "date": "2016-04-05T22:52:34.345Z"})
 */
```

##### POST /api/post

``` 
/**
 * @method POST /api/post
 * @description Insert post data 
 *
 * @param {String} emailAddress email address
 * @param {String} status status
 *
 * @return {Object} created post object, e.g. ({  "emailAddress": "some@email.com",  "status": "valid",  "date": "2016-04-05T22:52:34.345Z"})
*/
```

##### POST /api/posts

``` 
/**
 * @method POST /api/posts
 * @description Bulk update post data
 *
 * @param {Array} posts Array of Post Objects
 * @param {Object} posts[0] Post Object
 * @param {String} posts[0].emailAddress email address
 * @param {String} posts[0].status status
 *
 * @return {Object} with message property
 */ 
```
 
##### PUT /api/post

``` 
/**
 * @method PUT /api/post
 * @description update post data 
 *
 * @param {String} emailAddress email address for searching
 * @param {String} status status
 *
 * @return {Object} updated post object, e.g. ({  "emailAddress": "some@email.com",  "status": "valid",  "date": "2016-04-05T22:52:34.345Z"})
 */
```

##### DELETE /api/post

``` 
/**
 * @method DELETE /api/post
 * @description delete post data 
 *
 * @param {String} emailAddress email address for searching
 *
 * @return {Object} deleted post object, e.g. ({  "emailAddress": "some@email.com",  "status": "valid",  "date": "2016-04-05T22:52:34.345Z"})
 */
```

### Users

Users have property email (for identification), APIKey (automaticly generated) and requestLimit. request limit is number of request that user is limited to (per 30 days). requestLimit is set to -1 is INFINITE

##### POST /api/user

``` 
/**
 * @method POST /api/user
 * @description Create user
 *
 * @param {String} email email address
 * @param {Number} [requestLimit=0] number of request limits. -1 for infinite
 * @param {Number} [expandFeature=0] if expandFeature = 1 user is allowed to check briteverify, if expandFeature = 0 it's not
 *
 * @return {Object} created user object, e.g. ({  "email": "some@email.com",  "APIKey": "dadkjadj21312j",  "requestLimit": 100})
 */
```

##### DELETE /api/user

``` 
/**
 * @method DELETE /api/user
 * @description delete user
 *
 * @param {String} email email address
 *
 * @return {Object} created user object, e.g. ({  "email": "some@email.com",  "APIKey": "dadkjadj21312j",  "requestLimit": 100})
 */
```

##### PUT /api/user

``` 
/**
 * @method PUT /api/user
 * @description update user rateLimit of APIKey
 *
 * @param {String} email email address
 * @param {Number} [requestLimit] number of request limits. -1 for infinite
 * @param {String} [APIKey] API key
 * @param {Number} [expandFeature] if expandFeature = 1 user is allowed to check briteverify, if expandFeature = 0 it's not
 *
 * @return {Object} created user object, e.g. ({  "email": "some@email.com",  "APIKey": "dadkjadj21312j",  "requestLimit": 100})
 */
```
