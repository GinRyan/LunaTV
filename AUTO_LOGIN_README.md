# 自动登录功能使用说明

## 功能概述

登录页面支持自动填写用户名和密码并自动登录，登录成功后会自动跳转到首页。

## 配置方法

### 方法一：使用环境变量（推荐用于生产环境）

1. 在项目根目录创建或编辑 `.env.local` 文件：

```bash
# 自动登录用户名（可选，如果 STORAGE_TYPE 不是 localstorage 则需要）
NEXT_PUBLIC_AUTO_LOGIN_USERNAME=your_username

# 自动登录密码（必须）
NEXT_PUBLIC_AUTO_LOGIN_PASSWORD=your_password
```

2. 重启开发服务器或重新构建项目：

```bash
# 开发环境
pnpm dev

# 生产环境
pnpm build
pnpm start
```

### 方法二：使用 localStorage（推荐用于开发环境）

如果你不想在环境变量中硬编码密码，可以在浏览器控制台中执行以下代码，将凭据保存到 localStorage：

```javascript
localStorage.setItem('auto_login_username', 'your_username');
localStorage.setItem('auto_login_password', 'your_password');
```

然后刷新登录页面，系统会自动读取这些凭据并进行登录。

## 注意事项

1. **安全性**：`NEXT_PUBLIC_` 前缀的环境变量会被暴露给客户端，请确保只在可信的环境中使用自动登录功能。

2. **优先级**：环境变量的优先级高于 localStorage 中存储的值。

3. **禁用自动登录**：
   - 删除 `.env.local` 中的相关配置
   - 或清空 localStorage 中的 `auto_login_username` 和 `auto_login_password`

4. **STORAGE_TYPE 配置**：
   - 如果 `STORAGE_TYPE` 不是 `localstorage`，则需要同时配置用户名和密码
   - 如果 `STORAGE_TYPE` 是 `localstorage`，则只需要配置密码

## 故障排除

如果自动登录失败，请检查：

1. 环境变量是否正确配置（确保使用 `NEXT_PUBLIC_` 前缀）
2. 是否重启了开发服务器（环境变量更改后需要重启）
3. 用户名和密码是否正确
4. 浏览器控制台中是否有错误信息
