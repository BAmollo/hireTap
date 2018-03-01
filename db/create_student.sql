INSERT INTO students
(student_name, student_school, year, major,	email, interests, student_id)
VALUES
($1, $2, $3, $4, $5, $6, $7)
RETURNING *;

