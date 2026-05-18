@echo off
@color 0a
set USERNAME=admin
set PASSWORD=123456
set NEXT_PUBLIC_STORAGE_TYPE=redis
set KVROCKS_URL=redis://127.0.0.1:6666
set REDIS_URL=redis://127.0.0.1:6379
set PORT=3001
echo. 
echo. 
echo. 
echo. 
echo. 
echo. 
echo Username: %USERNAME%
echo Password: %PASSWORD%
echo Use database: %NEXT_PUBLIC_STORAGE_TYPE%
echo Database Url: %REDIS_URL%
echo Server Port: %PORT%
echo. 
echo. 
echo. 
echo. 


pnpm run dev --turbopack