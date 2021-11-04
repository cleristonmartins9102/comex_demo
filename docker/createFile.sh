!#/bin/bash
mkdir -p /var/log/garm
touch /var/log/garm/writeBD.txt
exec "$@"
