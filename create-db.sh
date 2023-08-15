psql -U postgres -c "DROP DATABASE IF EXISTS blackhole WITH (FORCE);";
psql -U postgres -c "CREATE DATABASE blackhole ENCODING 'UTF-8';";
