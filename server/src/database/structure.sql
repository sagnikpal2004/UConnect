CREATE TABLE users(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `email` varchar(255) DEFAULT NULL,
    `username` varchar(255) NOT NULL,
    `classlist` nvarchar(max),
    `points` int,
    `created_on` DATE,
    `updated_on` DATE,
    PRIMARY KEY(`id`)
) WITH (MEMORY_OPTIMIZED=ON)

CREATE TABLE classes(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `class_code` varchar(255),
    `class_name` varchar(255),
    `users` 
)

-- have a table that links classes and students?
-- CREATE TABLE students(
--     `class_id` int(11),
--     `student_id` int(11),
--     FOREIGN KEY (class_id) REFERENCES classes,
--     FOREIGN KEY (student_id) REFERENCES users,
--     PRIMARY KEY (class_id, student_id)
-- )
-- then classes(users) is basically (SELECT student_id FROM students WHERE class_id = classes.id)

-- other tables will be on firebase?