# ./update_modules.sh
export USERNAME=admin
export PASSWORD=123456
export NEXT_PUBLIC_STORAGE_TYPE=redis
export KVROCKS_URL=redis://127.0.0.1:6666
export REDIS_URL=redis://127.0.0.1:6379
pnpm run dev