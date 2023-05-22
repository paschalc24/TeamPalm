# TeamPalm 🌴

Filigree is a web application designed to provide course staff with valuable insights and analytics about their Campuswire course forum. It aims to enhance the management of student requests, improve response times, and build a better understanding of student engagement within the course.

Key Features:

- Forum Traffic Assessment: Gain a comprehensive overview of forum activity, including traffic rates, the number of unanswered posts, and current response times.

- Participation Reporting: Track staff members' engagement levels by monitoring their forum visits, the number of posts they have answered, and their overall contribution to the forum.

- Student Engagement Reporting: Understand student involvement by analyzing the number of student posts, comments, and identifying the most active participants.

- Trending Topics and Categories: Discover popular posts and corresponding topics within the forum.

- Visualizations: See forum activity patterns through intuitive charts and graphs. Identify peak hours and plan staff availability accordingly.

This application aims to empower course staff with actionable insights, enabling them to effectively manage the forum, prioritize responses, and provide an enhanced learning experience for students.

#### Getting Started
Before proceeding, make sure you have the latest possible versions of the following software installed:

- [Python](https://www.python.org/downloads/)
- [Node.js + npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

#### Installing Dependencies
If you would like to set up a virtual environment before installing dependencies, instructions on how to do so can be found [here](https://docs.python.org/3/library/venv.html). All necessary dependencies can be installed using the following command from the main directory `TeamPalm`:
```
pip install -r requirements.txt & npm i
```

To start the servers run (these commands can be run in separate terminal sessions as well):
```
python backend/manage.py runserver & npm run dev
```

If there are no issues, the server will boot up at [http://127.0.0.1:5173/](http://127.0.0.1:5173/), which should load up the login page for the application.

To end the servers you can kill the process with `Ctrl + C`.
