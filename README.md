[![LinkedIn][linkedin-shield]][linkedin-url]
[![MyWebsite][my-website-shield]][my-website-url]

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [License](#license)
* [Contact](#contact)

<!-- ABOUT THE PROJECT -->
## About The Project

My first backend API with NodeJS and MongoDB.

### Built With

* [NodeJS](https://nodejs.org/en/)
* [Express](http://expressjs.com/)
* [Bcrypt and JWT](https://jwt.io/)
* [MongoDB](https://www.mongodb.com/)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites 

* NodeJS [NodeJS](https://nodejs.org/en/).
```sh
npm install npm@latest -g
```

* MongoDB [MongoDB](https://www.mongodb.com/) version v4.4.0

### Installation

1. Clone the repo
```sh
git clone https://github.com/ToniTJK/noteWeb-frontend.git
```
2. Install NPM packages
```sh
npm install
```

3. Enter ENV varibles in .env `services/global.ts`
```JS
DB_URL_ON=mongodb+srv:<MONGOOSE URL>
JWT_SECRET=<YOUR PWD>
```

4. Run the application (http://localhost:3789/api/login)
```sh
npm start
```

<!-- CONTACT -->
## Contact

Email: [tonitorres.dev@gmail.com](tonitorres.dev@gmail.com)

My website: [https://tonitorrescuenca.com](https://tonitorrescuenca.com)

Project Link: [https://github.com/ToniTJK/noteWeb-backend](https://github.com/ToniTJK/noteWeb-backend)

Project Link: [https://github.com/ToniTJK/noteWeb-frontend](https://github.com/ToniTJK/noteWeb-frontend)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/ToniTJK/repo.svg?style=flat-square
[contributors-url]: https://github.com/ToniTJK/repo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ToniTJK/repo.svg?style=flat-square
[forks-url]: https://github.com/ToniTJK/repo/network/members
[stars-shield]: https://img.shields.io/github/stars/ToniTJK/repo.svg?style=flat-square
[stars-url]: https://github.com/ToniTJK/repo/stargazers
[issues-shield]: https://img.shields.io/github/issues/ToniTJK/repo.svg?style=flat-square
[issues-url]: https://github.com/ToniTJK/repo/issues
[license-shield]: https://img.shields.io/github/license/ToniTJK/repo.svg?style=flat-square
[license-url]: https://github.com/ToniTJK/repo/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/tonitorresprogramador/
[my-website-shield]: https://img.shields.io/badge/my-website-green
[my-website-url]: https://tonitorrescuenca.com/#/inicio
[product-screenshot]: images/screenshot.png