# InstaJobs

Find your way, find your job right away ! 

# API / back-end Installation
1. **npm install** or **yarn install** (if using yarn)
2. rename **.env.example** to **.env** 
3. insert the correct credential to your mysql host
4. run **npm start** or **yarn start** (if using yarn)
5. **Note** : If you want to use existing user without register first, please **DO NOT** replace the **JWT_SECRET** in the .env

# Webapp/Front-end Installation
1. **npm install** or **yarn install** (if using yarn)
2. rename **.env.example** to **.env**
3. replace the **REACT_APP_API_URL** value with url where the api/backend is running (default is **localhost:3000**)
4. run **npm start** or **yarn start** (if using yarn)

# Login 
you can test this app by register first with the **/register** api or by login with this credential : 
* **email** : usertest@gmail.com
* **password** : InstaTest1