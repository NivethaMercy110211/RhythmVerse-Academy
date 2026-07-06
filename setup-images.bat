@echo off
title RhythmVerse Academy - Image Setup
echo ============================================================
echo   Setting up AI generated images for RhythmVerse Academy
echo ============================================================
echo.

set "src=C:\Users\NIVETHA\.gemini\antigravity-ide\brain\f0015918-4b31-4cae-b93a-276176f1d2c2"
set "base=d:\RhythmVerse Academy\RhythmVerse Academy\assets\images"

echo Creating directories...
if not exist "%base%\banners" mkdir "%base%\banners"
if not exist "%base%\dance-styles" mkdir "%base%\dance-styles"
if not exist "%base%\faculty" mkdir "%base%\faculty"
if not exist "%base%\auth" mkdir "%base%\auth"

echo.
echo Copying Banners...
copy /Y "%src%\banner_home1_1783056672315.png" "%base%\banners\banner-home1.png" >nul
copy /Y "%src%\banner_home2_1783056683147.png" "%base%\banners\banner-home2.png" >nul
copy /Y "%src%\banner_about_1783056693525.png" "%base%\banners\banner-about.png" >nul
copy /Y "%src%\banner_dance_styles_1783056712348.png" "%base%\banners\banner-dance-styles.png" >nul
copy /Y "%src%\banner_faculty_1783056722481.png" "%base%\banners\banner-faculty.png" >nul
copy /Y "%src%\banner_events_1783056732638.png" "%base%\banners\banner-events.png" >nul
copy /Y "%src%\banner_contact_1783056755860.png" "%base%\banners\banner-contact.png" >nul

echo.
echo Copying Dance Styles...
copy /Y "%src%\dance_classical_1783056807280.png" "%base%\dance-styles\classical.png" >nul
copy /Y "%src%\dance_hiphop_1783056818172.png" "%base%\dance-styles\hiphop.png" >nul
copy /Y "%src%\dance_western_1783056836871.png" "%base%\dance-styles\western.png" >nul
copy /Y "%src%\dance_salsa_1783056847123.png" "%base%\dance-styles\salsa.png" >nul
copy /Y "%src%\dance_contemporary_1783056857040.png" "%base%\dance-styles\contemporary.png" >nul
copy /Y "%src%\dance_freestyle_1783056876037.png" "%base%\dance-styles\freestyle.png" >nul

echo.
echo Copying Faculty...
copy /Y "%src%\faculty_1_1783056887015.png" "%base%\faculty\faculty-1.png" >nul

echo.
echo Copying Auth Backgrounds...
copy /Y "%src%\auth_login_bg_1783056766714.png" "%base%\auth\login-bg.png" >nul
copy /Y "%src%\auth_signup_bg_1783056776031.png" "%base%\auth\signup-bg.png" >nul
copy /Y "%src%\auth_forgot_bg_1783056796222.png" "%base%\auth\forgot-bg.png" >nul

echo.
echo ============================================================
echo   All images copied successfully!
echo   RhythmVerse Academy website is ready.
echo ============================================================
echo.
pause
