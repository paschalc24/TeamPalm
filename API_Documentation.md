# Django API Documentation
---

## Analytics API

#### Purpose and Functionality
---
This REST API provides access to various insights based on data pulled from the Campuswire forums. It allows users to retrieve valuable metrics related to traffic and student or staff activity. This documentation outlines the endpoints, request/response examples, and error handling methods specific to this API.

The calculations performed within these requests are extensive and aim to make it simple for the users to easily retrieve necessary statistics. Please refer to the following sections for detailed information on the available endpoints, request and response examples, and error handling.

#### Status Codes
---

| Code | HTTP Status |
| ---- | ----------- |
| 200 | OK |
| 400 | BAD REQUEST |


#### Endpoints
---

#### GET : `/posts/` 
Return all published posts ordered by post number.

##### Parameters
None

##### Response Format
```js
{
    "number": int,
    "comments": list[string],
    "post_slug": string,
    "title": string,
    "body": string,
    "type": string,
    "public": boolean,
    "publishedAt": string,
    "viewsCount": int,
    "uniqueViewsCount": int,
    "read": boolean,
    "modAnsweredAt": string,
    "answersCount": int,
    "likesCount": int,
    "author": string
}
```

##### Error Handling

None Required

---

#### GET : `/authors/` 
Return all registered authors (students and staff).

##### Parameters
None

##### Response Format
```js
{
    "slug": string,
    "posts": list[int],
    "comments": list[string],
    "firstName": string,
    "lastName": string,
    "moderator": boolean,
    "endorsed_comments": list[string],
    "answered_posts": list[int]
}
```

##### Error Handling

None Required

---

#### GET : `/comments/` 
Return all published comments.

##### Parameters
None

##### Response Format
```js
{
    "comment_id": string,
    "endorsed": boolean,
    "is_answer": boolean,
    "body": string,
    "publishedAt": string,
    "author": string,
    "post": number
}
```

##### Error Handling

None Required

---

#### GET : `/posts/<post_id>` 
Return the post with the specified number.

##### Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `<post_id>` | `int` | Post Number |

##### Response Format
```js
{
    "number": int,
    "comments": list[string],
    "post_slug": string,
    "title": string,
    "body": string,
    "type": string,
    "public": boolean,
    "publishedAt": string,
    "viewsCount": int,
    "uniqueViewsCount": int,
    "read": boolean,
    "modAnsweredAt": string,
    "answersCount": int,
    "likesCount": int,
    "author": string
}
```

##### Error Handling

Return the following with a `400` status code if post with specified `<post_id>` does not exist.
```json
{ 
    "err": "Post #<post_id> does not exist."
}
```

---

#### GET : `/postsbyauthor/<author_id>/` 
Return all posts published by the author with the specified `<author_id>`.

##### Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `<author_id>` | `string` | Author Slug |

##### Response Format
```js
{
    "number": int,
    "comments": list[string],
    "post_slug": string,
    "title": string,
    "body": string,
    "type": string,
    "public": boolean,
    "publishedAt": string,
    "viewsCount": int,
    "uniqueViewsCount": int,
    "read": boolean,
    "modAnsweredAt": string,
    "answersCount": int,
    "likesCount": int,
    "author": string
}
```

##### Error Handling

Return the following with a `400` status code if author with specified `<author_id>` does not exist or no posts were published by this author.
```json
{ 
    "err": "No posts were published by this author or author with id <author_id> does not exist."
}
```

---

#### GET : `/postsbytimeframe/<start_time>/<end_time>/` 
Return all posts published between the specified `<start_time>` and `<end_time>`.

##### Parameters

| Parameter | Type | Format | Description |
| --------- | ---- | ------ | ----------- |
| `<start_time>` | `string` | `YYYY-MM-DD` | Start Time as a Date String |
| `<end_time>` | `string` | `YYYY-MM-DD` | End Time as a Date String |

##### Response Format
```js
{
    "number": int,
    "comments": list[string],
    "post_slug": string,
    "title": string,
    "body": string,
    "type": string,
    "public": boolean,
    "publishedAt": string,
    "viewsCount": int,
    "uniqueViewsCount": int,
    "read": boolean,
    "modAnsweredAt": string,
    "answersCount": int,
    "likesCount": int,
    "author": string
}
```

##### Error Handling

Return the following with a `400` status code if `<end_time>` occurs after `<start_time>`, parameters are invalid date strings, or no posts were published in the specified timeframe.
```json
{ 
    "err": "Date string not in specified format: YYYY-MM-DD, <start_time> and <end_time> are not in chronological order, or no posts were made in this time frame."
}
```

---

#### GET : `/unansweredposts/` 
Return all posts with no published answers (by students or staff).

##### Parameters

None

##### Response Format
```js
{
    "number": int,
    "comments": list[string],
    "post_slug": string,
    "title": string,
    "body": string,
    "type": string,
    "public": boolean,
    "publishedAt": string,
    "viewsCount": int,
    "uniqueViewsCount": int,
    "read": boolean,
    "modAnsweredAt": string,
    "answersCount": int,
    "likesCount": int,
    "author": string
}
```

##### Error Handling

Return the following with a `400` status code if there exist no unanswered posts.
```json
{ 
    "err": "There are currently no unanswered posts."
}
```

---

#### GET : `/mostviewedposts/` 
Return at most ten posts with the most views in descending order.

##### Parameters

None

##### Response Format
```js
{
    "number": int,
    "comments": list[string],
    "post_slug": string,
    "title": string,
    "body": string,
    "type": string,
    "public": boolean,
    "publishedAt": string,
    "viewsCount": int,
    "uniqueViewsCount": int,
    "read": boolean,
    "modAnsweredAt": string,
    "answersCount": int,
    "likesCount": int,
    "author": string
}
```

##### Error Handling

Return the following with a `400` status code if there exist no posts.
```json
{ 
    "err": "There are currently no posts."
}
```

---

#### GET : `/mostuniqueviewedposts/` 
Return at most ten posts with the most unique views in descending order.

##### Parameters

None

##### Response Format
```js
{
    "number": int,
    "comments": list[string],
    "post_slug": string,
    "title": string,
    "body": string,
    "type": string,
    "public": boolean,
    "publishedAt": string,
    "viewsCount": int,
    "uniqueViewsCount": int,
    "read": boolean,
    "modAnsweredAt": string,
    "answersCount": int,
    "likesCount": int,
    "author": string
}
```

##### Error Handling

Return the following with a `400` status code if there exist no posts.
```json
{ 
    "err": "There are currently no posts."
}
```

---

#### GET : `/mostlikedposts/` 
Return at most ten posts with the most likes in descending order.

##### Parameters

None

##### Response Format
```js
{
    "number": int,
    "comments": list[string],
    "post_slug": string,
    "title": string,
    "body": string,
    "type": string,
    "public": boolean,
    "publishedAt": string,
    "viewsCount": int,
    "uniqueViewsCount": int,
    "read": boolean,
    "modAnsweredAt": string,
    "answersCount": int,
    "likesCount": int,
    "author": string
}
```

##### Error Handling

Return the following with a `400` status code if there exist no posts.
```json
{ 
    "err": "There are currently no posts."
}
```

---

#### GET : `/mostansweredposts/` 
Return at most ten posts with the most answers (by students or staff) in descending order.

##### Parameters

None

##### Response Format
```js
{
    "number": int,
    "comments": list[string],
    "post_slug": string,
    "title": string,
    "body": string,
    "type": string,
    "public": boolean,
    "publishedAt": string,
    "viewsCount": int,
    "uniqueViewsCount": int,
    "read": boolean,
    "modAnsweredAt": string,
    "answersCount": int,
    "likesCount": int,
    "author": string
}
```

##### Error Handling

Return the following with a `400` status code if there exist no posts.
```json
{ 
    "err": "There are currently no posts."
}
```

---

#### GET : `/forumtraffic/` 
Return the number of posts made at each hour, day, and week.

##### Parameters

None

##### Response Format
```js
{
    "per_hour": {
        "0": list[string],
        "1": list[int]
    },
    "per_day": {
        "0": list[string],
        "1": list[int]
    },
    "per_week": {
        "0": list[string],
        "1": list[int]
    }
}
```

##### Error Handling

None Required

---

#### GET : `/responsetime/` 
Return statistics for each post useful for calculating response times.

##### Parameters

None

##### Response Format
```js
{
    "number": int,
    "publishedAt": string,
    "modAnsweredAt": string
}
```

##### Error Handling

Return the following with a `400` status code if there exist no posts.
```json
{ 
    "err": "There are currently no posts."
}
```

---

#### GET : `/posts/<student_or_mod>/` 
Return posts filtered by whether they were posted by a student or a staff member.

##### Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `student_or_mod` | `string` | `student` or `moderator` |

##### Response Format
```js
{
    "number": int,
    "comments": list[string],
    "post_slug": string,
    "title": string,
    "body": string,
    "type": string,
    "public": boolean,
    "publishedAt": string,
    "viewsCount": int,
    "uniqueViewsCount": int,
    "read": boolean,
    "modAnsweredAt": string,
    "answersCount": int,
    "likesCount": int,
    "author": string
}
```

##### Error Handling

Return the following with a `400` status code if there exist no posts based on the filter.
```json
{ 
    "err": "No Matching Posts Found."
}
```

---

#### GET : `/viewsbytimeframe/<start_time>/<end_time>/` 
Return the number of views registered between the specified `<start_time>` and `<end_time>`.

##### Parameters

| Parameter | Type | Format | Description |
| --------- | ---- | ------ | ----------- |
| `<start_time>` | `string` | `YYYY-MM-DD` | Start Time as a Date String |
| `<end_time>` | `string` | `YYYY-MM-DD` | End Time as a Date String |

##### Response Format
```js
{
    "views": int,
    "unique_views": int
}
```

##### Error Handling

Return the following with a `400` status code if `<end_time>` occurs after `<start_time>`, parameters are invalid date strings, or no views were registered in the specified timeframe.
```json
{ 
    "err": "Date string not in specified format: YYYY-MM-DD, <start_time> and <end_time> are not in chronological order, or no views were registered in this time frame."
}
```

---

#### GET : `/unansweredbymod/` 
Return all posts with no published answers by staff.

##### Parameters

None

##### Response Format
```js
{
    "number": int,
    "comments": list[string],
    "post_slug": string,
    "title": string,
    "body": string,
    "type": string,
    "public": boolean,
    "publishedAt": string,
    "viewsCount": int,
    "uniqueViewsCount": int,
    "read": boolean,
    "answersCount": int,
    "likesCount": int,
    "author": string
}
```

##### Error Handling

Return the following with a `400` status code if there exist no posts unanswered by staff.
```json
{ 
    "err": "There are currently no posts unanswered by staff."
}
```

---

#### GET : `/viewstraffic/` 
Return the number of views registered at each hour, day, and week.

##### Parameters

None

##### Response Format
```js
{
    "per_hour": {
        "0": list[string],
        "1": list[int]
    },
    "per_day": {
        "0": list[string],
        "1": list[int]
    },
    "per_week": {
        "0": list[string],
        "1": list[int]
    }
}
```

##### Error Handling

None Required

---

## User Account API

