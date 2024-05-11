@echo off
rem
rem This batch file will be started automatically by the Task Scheduler.
rem 
rem The path to this file from the Task Scheduler point of view is:
rem \\wsl.localhost\Ubuntu\home\ctrep\carte\server\start_carte_server.bat
rem
wsl -e bash -c "cd ~/carte/server && node server"
