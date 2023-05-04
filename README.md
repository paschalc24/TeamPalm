# TeamPalm
🌴
#### Starting development server
First make sure you have Django installed:
```
pip install -r requirements.txt
```

To start the server run:
```
python backend\manage.py runserver
```
If there are no issues, the server will start at http://127.0.0.1:8000/

You can customize the server's port or IP through commandline arguments:
```
python backend\manage.py runserver 8080
python backend\manage.py runserver 0.0.0.0:8080
```

To end the server you can kill the process with Ctrl + C.