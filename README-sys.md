# chatbot-v1

### 啟動方式

```
#API
npm run api

#WEB
npm run dev
```

#### Linux 安裝 (Ubuntu 22.04)

建立 ssh key

```
$ ssh-keygen
$ cat ~/.ssh/id_rsa.pub 
```

安裝相關套件 

```
sudo apt update
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash #NODE ver: v20.15.0
sudo apt install nginx -y
```

#### vim /etc/nginx/sites-available/default

```
# /etc/nginx/sites-available/default
server {
    listen 80;

    location / {
        root /var/www/DILab-web;
        try_files $uri $uri/ /index.html;
    }
}
```

#### 建立證書

```
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d zong-web.japaneast.cloudapp.azure.com
sudo systemctl reload nginx
```

### 前端布版

```
npm run build:stage
cp -a dist/* www/
sudo cp -a www/* /var/www/112554016_paper/
```

### 後端使用 lab 的 ip

```
location /api {
        proxy_pass http://140.115.126.57:8769/api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
}
```

## 資料表設定

```
# 建立資料表 migrate 文件
npx sequelize-cli migration:generate --name create_users_table

# 資料庫 migrate
npx sequelize-cli db:migrate

# 移除資料庫 migrate
npx sequelize-cli db:migrate:undo:all

# 資料庫建立基本資料
npx sequelize-cli db:seed --seed 20240505072317-import-general-data.js
```

#### 資料庫安裝

```
sudo apt -y update && sudo apt -y upgrade
sudo apt install mysql-server -y

sudo mysql_secure_installation
sudo service mysql restart

# 資料庫裡面設定

sudo mysql

mysql> use mysql;
mysql> UPDATE user SET plugin='mysql_native_password' WHERE User='root';
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '0000';
mysql> FLUSH PRIVILEGES;
mysql> exit;
```