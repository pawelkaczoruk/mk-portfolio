<h1 align="center">Portfolio website project</h1>
<h4 align="center">Website coded from template made by Mateusz Kaczoruk in Adobe XD</h4>

## 1. Info
The idea was to create simple, clear and easy to navigate website. I used Vue.js to improve my skills in this framework, and tools it offers (e.g. Vue router) to get smooth transiton between views. By using Firebase as a backend, I created admin panel to add, remove and update most of the website content (e.g. add a post, remove old illustration, change order in which they are displayed or update typo in contact section. See examples below).

I previously started developing this website using Materialize CSS library, but after all I changed my mind, rebuild project and went with Vuetify as a CSS library.

Live verision of website is available [here](https://heuristic-rosalind-3c2a96.netlify.com/)

## 2. Set up project
    git clone https://github.com/pawelkaczoruk/mk-website.git && cd mk-website
    npm install
    npm run serve
    
#### Production build
    npm run build

## 3. Tech stack:
* Vue.js
* Vuetify
* Vue Router
* NPM
* Firebase (Firestore, Storage, Authentication)
* HTML
* JS
* CSS

## 4. Example images from admin panel:
* View of portfolio's "other" section posts. There you can choose to modify, remove  or add a new post.
![Admin panel view](https://i.imgur.com/bRRuR9X.jpg)

* Modal for adding a new post. You have to pick image, set title, description and category (order is set automatically, can be modified in edit modal).
![Admin panel, add new post](https://i.imgur.com/pTAiIbx.jpg)

* Modal for editing a post. There you can modify title, description and order.
![Admin panel, edit post](https://i.imgur.com/lmtPkeg.jpg)


There are also ways to modify "contact" and "about me" sections or even logo image. Modals for them are very similar to the one above.
