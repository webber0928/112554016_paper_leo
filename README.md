# chatbot-v1

This will automatically open http://localhost:9528

#### Linux 安裝 (Ubuntu 22.04)

安裝相關套件 

```
sudo apt update
sudo apt install nginx -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
nvm install 12.22.12
sudo apt install mysql-server
sudo mysql_secure_installation


# /etc/mysql/mysql.conf.d/mysqld.cnf
[mysqld]
user            = mysql
bind-address            = 0.0.0.0
key_buffer_size         = 16M

myisam-recover-options  = BACKUP

log_error = /var/log/mysql/error.log
slow_query_log         = 1
slow_query_log_file    = /var/log/mysql/mysql-slow.log
long_query_time = 2
max_binlog_size   = 100M
```

#### vim /etc/nginx/sites-available/default

```
# /etc/nginx/sites-available/default
server {
    listen 80;

    location / {
        root /var/www/112554016-paper;
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
npm run build
cp -a dist/* www/
sudo cp -a www/* /var/www/112554016-paper/
```

### PM2
```
pm2 start npm --name "my-app" -- run api --log-date-format "YYYY-MM-DD HH:mm:ss"
pm2 start api.js --name "leo-app" --log-date-format "YYYY-MM-DD HH:mm:ss" --watch api --watch-delay 5000
pm2 start api.js --name "wb-app" --log-date-format "YYYY-MM-DD HH:mm:ss" --watch api --watch-delay 5000
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

Refer to [Documentation](https://panjiachen.github.io/vue-element-admin-site/guide/essentials/deploy.html) for more information

## 瀏覽器支援

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## 資料庫設定

### 建立資料表 migrate 文件
`npx sequelize-cli migration:generate --name create_users_table`

### 資料庫 migrate
`npx sequelize-cli db:migrate`

## 資料庫建立基本資料
`npx sequelize-cli db:seed --seed 20240505072317-import-general-data.js`

## 修改於

[PanJiaChen](https://github.com/PanJiaChen/vue-admin-template/)
[Document](https://panjiachen.github.io/vue-element-admin-site/zh/)