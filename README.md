# Gulp-Publishing (퍼블리싱을 위한 Gulp 세팅)

## 1. Gulp-cli  & Gulp 설치

```
npm install --global gulp-cli
npm init
npm install --save-dev gulp
```

## 2. package.json 파일 생성

```
{
  "name": "gulp-publishing",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yonghap/Gulp-Publishing.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/yonghap/Gulp-Publishing/issues"
  },
  "homepage": "https://github.com/yonghap/Gulp-Publishing#readme",
  "devDependencies": {
    "browser-sync": "^2.27.7",
    "del": "^6.0.0",
    "express": "^4.17.2",
    "gulp": "^4.0.2",
    "gulp-concat": "^2.6.1",
    "gulp-ejs": "^5.1.0",
    "gulp-imagemin": "^7.1.0",
    "gulp-nodemon": "^2.5.0",
    "gulp-rename": "^2.0.0",
    "gulp-sass": "^5.1.0",
    "gulp-sourcemaps": "^3.0.0",
    "gulp-uglify": "^3.0.2",
    "gulp-watch": "^5.0.1",
    "sass": "^1.49.0",
    "vinyl-buffer": "^1.0.1"
  }
}
```

## 3. 모듈 설치

```
npm install
```

## 4.gulfile.js 세팅

```js
function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask
```

## 5.Test

```
gulp
```