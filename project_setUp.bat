@echo off
SETLOCAL

call :link todo-service
call :link auth-jwt-service
call :link planing-service

exit /B

:link
mklink /J %~1\src\libs libs
IF %ERRORLEVEL% NEQ 0 ( 
   color 04
   echo "Error setUp Link %~1\src\libs -> libs">&2
)
exit /B 0
