# Cookie

# API 

## SET 

```javascript
cookie.set('test','k',{
    expires: 0,
    path: '/',
    domain:'',
    secure: false,
    space: '' // save in space cookie ,not influence other cookie
})
```

## GET

```javascript
cookie.get('test')
cookie.get('test',space)
```

## CLEAR

```javscript
cookie.clear(space);//clear space cookie
cookie.clear();//clear all cookie
````