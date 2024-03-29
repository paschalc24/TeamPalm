# TeamPalm: Filigree - Campuswire Analytics

### Design Goals
---

Filigree is a web application designed to provide course staff with valuable insights and analytics about their Campuswire course forum. It aims to enhance the management of student requests, improve response times, and build a better understanding of student engagement within the course.

### Key Features:
---

- **Forum Traffic Assessment**: Gain a comprehensive overview of forum activity, including traffic rates, the number of unanswered posts, and current response times.

- **Participation Reporting**: Track staff members' engagement levels by monitoring their forum visits, the number of posts they have answered, and their overall contribution to the forum.

- **Student Engagement Reporting**: Understand student involvement by analyzing the number of student posts, comments, and identifying the most active participants.

- **Trending Topics**: Discover popular posts and corresponding topics within the forum.

- **Visualizations**: See forum activity patterns through intuitive charts and graphs. Identify peak hours and plan staff availability accordingly.

This application aims to empower course staff with actionable insights, enabling them to effectively manage the forum, prioritize responses, and provide an enhanced learning experience for students.

### Getting Started
---

#### Prerequisites
Before proceeding, make sure you have the latest possible versions of the following software installed:

- [Python](https://www.python.org/downloads/)
- [Node.js + npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

#### Clone the Repository
Run the following command to clone this repository on your local machine. Then, `cd` into the `TeamPalm` folder.
```shell
git clone https://github.com/paschalc24/TeamPalm.git
```

#### Setting Up Your Environment
If you would like to set up a virtual environment before installing dependencies, instructions on how to do so can be found [here](https://docs.python.org/3/library/venv.html). In order to install all necessary dependencies and setup the environment, run the following command from the main directory `TeamPalm`:
```shell
python setup.py
```

#### Running the Application

To start the servers run (these commands can be run in separate terminal sessions as well):
```
python backend/manage.py runserver & npm run dev
```

If there are no issues, the server will boot up at [http://127.0.0.1:5173/](http://127.0.0.1:5173/), which should load up the login page for the application. Utilize the following credentials to login to a test account:

```
Username: teampalm@umass.edu
Password: teampalm
```

#### Terminating the Servers

To shut the servers down, you can kill the processes using `Ctrl + C`.

### Testing
---
Several automated tests that have already been written can be run using the following command:

```shell
python backend/manage.py test
```
