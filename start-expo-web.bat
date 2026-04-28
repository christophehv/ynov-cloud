@echo off
cd /d "%~dp0"
set BROWSER=none
set EXPO_NO_TELEMETRY=1
npm.cmd run web:offline -- --port 8081 > expo-web.out.log 2> expo-web.err.log
