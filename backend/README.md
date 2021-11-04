# gestao_portuaria_back


## Importante inserir a variavel sql_mode conforme abaixo `caso contrário não sera possivel executar query organizadas por grupo`
/etc/mysql/conf.d/mysql.cnf 

[mysqld]
sql_mode = "STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION"



