
//activate virtual environment with: 
source venv/bin/activate

//backend
//install dependencies
pip install djangorestframework-simplejwt
pip install coverage
pip install django-cors-headers
pip install django
pip install django-filter
pip install djangorestframework

django-admin startproject core .
python3 manage.py startapp backend
python3 manage.py startapp backend_api

//use this command to run the backend server
python3 manage.py runserver 9000

python3 manage.py createsuperuser
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py createsuperuser
python3 -m venv venv
pip freeze > requirement.txt

//frontend
npx create-react-app frontend
npm install react-router-dom
npm install @material-ui/core
npm install @material-ui/icons
pip install django-cors-headers
npm install react-icons
npm install styled-components

//Unit testing
coverage run --omit='*/venv/*' manage.py test

//use this command to run the frontend
cd frontend
npm start

