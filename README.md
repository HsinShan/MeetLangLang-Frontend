# Frontend services of project MeetLangLang

## Members

### `Group3` of course "Software Development Methods, Spring 2021"

- R09725017@ntu.edu.tw 謝欣珊
- R09725030@ntu.edu.tw 吳雨澤
- R09725042@ntu.edu.tw 張古宜
- R09725064@ntu.edu.tw 游芮瑜
- R09922168@ntu.edu.tw 何泰良
- D09725002@ntu.edu.tw 林耕葆

# :zap: Setup

## System requirements

- Docker
- Docker-Compose

### Installation of Docker & Docker-Compose

- [Windows 10](https://docs.microsoft.com/zh-tw/windows/wsl/tutorials/wsl-containers)
- [Mac](https://docs.docker.com/docker-for-mac/install/)
- Linux (Recommanded):
```
安裝docker
$ curl -fsSL https://get.docker.com -o get-docker.sh
$ sudo sh get-docker.sh
$ sudo usermod -aG docker $USER
$ sudo reboot

安裝docker-compose
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.25.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
$ sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

## Start services

```
$ docker-compose up -d
$ docker-compose logs -f mll-frontend
```

It will take a long time in first launch. \
You can browse after seeing `You can now view mll-frontend in the browser.` on the console. \
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

Note. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Install NPM libraries

You may need to install 3rd libraries when the function developing.

```
$ docker-compose exec mll-frontend npm install --save <Lib>
```

Example:

$ docker-compose exec mll-frontend npm install --save axios

## Stop services

```
$ docker-compose down -v
```

# :zap: Contribution

## Commit messages

This project has a rule of commit messages (following [Semantic Commit Messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)):

An example:

```
feat(app): add route to navbar items
```

Defined types:

```
feat: (new feature for the user, not a new feature for build script)
fix: (bug fix for the user, not a fix to a build script)
docs: (changes to the documentation)
style: (formatting, missing semi colons, etc; no production code change)
refactor: (refactoring production code, eg. renaming a variable)
test: (adding missing tests, refactoring tests; no production code change)
chore: (updating grunt tasks etc; no production code change)
```

Defined scope:

```
app: (related to app)
env: (this commit is crossed multiple scopes)
```

## Development Guide
### :star2: About this project
- JS framework: **React** (Reference: [React 官方文件](https://zh-hant.reactjs.org/docs/getting-started.html))
- UI framwork: **Ant Design** (Reference: [Ant Design 官方文件](https://ant.design/))
- Stylesheet language: **Sass** (Reference: [Sass 官方文件](https://sass-lang.com/documentation))
- other JS libraries:
    - **Lodash**:  Provides useful utility functions for common programming tasks. (Reference: [Lodash 官方文件](https://lodash.com/)
      

### :star2: RWD settings
- style:　`src/assets/style/_base.scss`
- js: `src/hooks/useDeviceDetect.js`
- breakpoint setting:
    - `<= 640 px`: mobile
    - `641 ~ 920 px`: labtop
    - `> 920 px`: desktop


### :star2: Folder structure
For example
```
app 
└─── src
│   └───assets
|   |   └─── style (there is one folder for one page)
|   |   |     └───login
|   |   |     |     | index.scss
|   |   |     └───search
|   |   |     |     | index.scss
|   |   |     | ...
|   |   └─── images(if need to put any images)    
│   └───components(put components of each page)
|   |      └───shared (put components that will be used in mutiple pages)
|   |      |     | ...
|   |      └───search
|   |      |     | card.js(just for example)
|   |      └───login
│   |      │   ...
│   └───hooks(put useful functions)
│   |      │   ...
│   └───pages(only for page components)
│   |      │   ...
│   └───routes(for route settings)
│   |      │   ...
```
:point_right: **Other Reference**: [React hooks](https://zh-hant.reactjs.org/docs/hooks-intro.html)