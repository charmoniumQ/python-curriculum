#!/bin/sh

basepath=python
grunt all
rsync -avz ${basepath}/ samgrayson.me:${basepath}/
sleep 1s
ssh samgrayson.me sudo mv ${basepath}/ /srv/samgrayson.me/${basepath}
ssh samgrayson.me sudo chown -R www-data:www-data /srv/samgrayson.me/${basepath}
