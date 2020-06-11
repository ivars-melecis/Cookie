<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

# Cookies

Simple class to make CRUD operations easier for cookies. Once class is initiated, its constructor calls function to fetch `document.cookie` and formats each cookie by name and value.

For example:

Default cookie string:

`"demo-cookie=new content; with-props=my cookiewith props; wp-settings-1=libraryContent%3Dbrowse%26editor%3Dtinymce%26mfold%3Do; wp-settings-time-1=1591872952"`

Formatted version with **Cookie class**

```js
[
 {name: "demo-cookie", content: "new content"}
 {name: "with-props", content: "my cookiewith props"}
 {name: "wp-settings-1", content: "libraryContent%3Dbrowse%26editor%3Dtinymce%26mfold%3Do"}
 {name: "wp-settings-time-1", content: "1591872952"}
]
```

## 1. <a name='Methods'></a>Methods

There are 4 methods within this class. **fetch**, **add**, **get**, **delete**. Update method was not created as we are able to modify any cookie by using **add** method, provided, you use the same cookie name.

### 1.1. <a name='Fetch'></a>Fetch

Initialisation:

```js
const cookie = new Cookie();
cookie.fetch(); // returns array with formatted cookies.
```

Method is used in class constructor to populate data. This could also be called if you update cookie. This means that you would need to re-fetch cookies in class

```js
const cookie = new Cookie();
cookie.formatted = cookie.fetch();
```

Above is useful only if you perform actions without page re-load and want to keep class data in sync.

### 1.2. <a name='Add'></a>Add

Initialisation:

```js
const cookie = new Cookie();
cookie.add('my-cookie', 'my-content', 20, 'SameSite=Strict;'); // Returns class itself
```

OR

```js
// Save cookie for 365 days.
const cookie = new Cookie();
cookie.add('my-cookie-1', 'my-content=1'); // Returns class itself
```

Method used to add cookie with optional time in days of expiration and any extra properties such as **sameSite**. Only mandatory arguments are first two - cookie name and its content. method will return class instance if one of above is missing.

Default arguments

Argument 3 - 365 ( expiration in days )
Argument 4 - empty string ( no extra flags )

This method is also to be used to modify cookie. Simply use the same cookie name. **Re-fetching cookies is not required after adding. This is done internally.**

### 1.3. <a name='Get'></a>Get

Initialisation:

```js
const cookie = new Cookie();
cookie.get('my-cookie'); // Returns object of cookie
```

Example of return value:

```js
{
  name: "my-cookie",
  content: "my cookie content"
}
```

Use `cookie.get('my-cookie').content` if only content is needed.

Method will return `null` if cookie does not exist.

### 1.4. <a name='Delete'></a>Delete

Initialisation:

```js
const cookie = new Cookie();
cookie.delete('my-cookie'); // Returns deleted cookie
```

Method for deleting cookies. This returns deleted item. Deletion is achieved by modifying expiration date to: `Thu, 01 Jan 1970 00:00:00 GMT`
