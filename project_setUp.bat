@echo off
SETLOCAL

call :link todo-service
call :link auth-jwt-service

exit /B

:link
mklink /J %~1\src\libs libs
IF %ERRORLEVEL% NEQ 0 ( 
   color 40
   echo "Error setUp Link %~1\src\libs -> libs">&2
)
exit /B 0