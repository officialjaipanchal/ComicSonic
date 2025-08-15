@echo off
setlocal enabledelayedexpansion

echo 🚀 Starting MigrateMate Cancellation Flow...

REM Check if Supabase is already running
netstat -an | find "54321" >nul 2>&1
if %errorlevel% equ 0 (
    echo ⚠️  Supabase API is already running on port 54321
) else (
    echo 📦 Starting Supabase...
    start /B supabase start >nul 2>&1
    
    REM Wait for Supabase to be ready
    echo ⏳ Waiting for Supabase API to be ready...
    :wait_supabase
    timeout /t 2 /nobreak >nul
    curl -s http://127.0.0.1:54321 >nul 2>&1
    if !errorlevel! neq 0 (
        echo   Still waiting for Supabase...
        goto wait_supabase
    )
    echo ✅ Supabase API is ready!
)

REM Check if Next.js is already running
netstat -an | find "3000" >nul 2>&1
if %errorlevel% equ 0 (
    echo ⚠️  Next.js is already running on port 3000
) else (
    echo ⚡ Starting Next.js application...
    start /B npm run dev >nul 2>&1
    
    REM Wait for Next.js to be ready
    echo ⏳ Waiting for Next.js to be ready...
    :wait_nextjs
    timeout /t 2 /nobreak >nul
    curl -s http://localhost:3000 >nul 2>&1
    if !errorlevel! neq 0 (
        echo   Still waiting for Next.js...
        goto wait_nextjs
    )
    echo ✅ Next.js is ready!
)

echo.
echo 🎉 All services are running!
echo 📱 Application: http://localhost:3000
echo 📊 Supabase Studio: http://127.0.0.1:54323
echo 🔌 API: http://127.0.0.1:54321
echo.
echo 💡 Press Ctrl+C to stop all services
echo.

REM Keep the window open
pause
