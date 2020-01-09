-- https://www.mysqltutorial.org/mysql-create-table/

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS task_lists (
    task_list_id INT AUTO_INCREMENT PRIMARY KEY,
    task_list_title VARCHAR(255) NOT NULL,
    task_list_user INT NOT NULL, 
    FOREIGN KEY (task_list_user) 
        REFERENCES users(user_id)
        ON UPDATE RESTRICT 
        ON DELETE CASCADE
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    task_title VARCHAR(255) NOT NULL,
    task_target_date DATE,    
    task_completed BOOLEAN NOT NULL DEFAULT FALSE,    
    task_description TEXT,    
    task_list INT NOT NULL,
    FOREIGN KEY (task_list) 
        REFERENCES task_lists(task_list_id) 
        ON UPDATE RESTRICT 
        ON DELETE CASCADE
) ENGINE=INNODB;