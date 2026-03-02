./update_modules.sh
export NEXT_PUBLIC_STORAGE_TYPE=kvrocks
export KVROCKS_URL=redis://127.0.0.1:6666
pnpm run dev