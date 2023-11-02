# SeeWeather - Graphical User Interfaces module project
The aim of this project is to develop a weather mobile app for visually impaired individuals. They are the end-users of our application, and they are described as being blind or having low vision, thus making them dependent on mobile devices to gain access to information regarding the weather. Therefore, they are the primary group of stakeholders in the development of our application which will be designed to meet their needs. Ultimately, understanding their preferences and specific needs is vital in guaranteeing the application is safe, user-friendly, and accessible.  

## Getting Started
1. Download the folder <br>
	a. Make sure you have npm installed
2. Open the terminal in the folder and run "npm install"
3. Once that finishes run "npm run dev" <br>
	a. If you choose to run "npm run build" and "npm start" it will NOT work due to http and https limitations
4. Wait for the program to load <br>
	a. If the webpage doesn't load automatically go to "http://localhost:8080/"
5. Allow for Geolocation from the browser (it will default to London if you don't) <br>
	a. This should allow for you to change location within the browser and give access to different locations <br>
	b. Wait a couple of seconds for the page to load
6. Click the volume button to listen to the current weather status along with some sounds

## Port Errors Troubleshooting (macOS)
If you are getting errors with the the port 8080 already being in use, try these steps: <br>
1. Identify the process using the port <br>
   lsof -i :8080
2. Terminate that process (using the PID you got from running the above command) <br>
   sudo kill -9 12345
3. Enter the sudo password (admin password on your machine) <br>
4. Restart the application

## Changing location
If you want to change you can go into inspect element, click on the 3 dots at the top right
From there hover over "More tools" and click "Sensors" <br>
You can then click the dropdown menu and change to different places

## Main features
* The weather for any location you are currently in (based on Latitude and Longitude)
* Audible weather sounds along with text to speech
