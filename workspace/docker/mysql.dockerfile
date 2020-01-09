FROM mysql:5.7

# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup
COPY ./sql_data/ /docker-entrypoint-initdb.d/