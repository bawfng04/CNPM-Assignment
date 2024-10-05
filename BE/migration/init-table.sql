CREATE TYPE userRole AS ENUM ('teacher', 'student');

CREATE TABLE "users" (
	id 	uuid PRIMARY KEY,
	username VARCHAR(45) NOT NULL,
	firstName VARCHAR(45),
	lastName VARCHAR(45),
	email VARCHAR(45) NOT NULL,
	password VARCHAR(60) NOT NULL,
	role userRole,
	faculty VARCHAR(45),
	city	VARCHAR(45),
	country VARCHAR(45)
) 
CREATE TABLE "printers" (
	printerID uuid PRIMARY KEY,
	printerName VARCHAR(60) NOT NULL,
	brandName VARCHAR(60),
)
CREATE TYPE printerStatus AS ENUM('active', 'disable');
ALTER TABLE "printers"
ADD status printerStatus DEFAULT 'active';

CREATE TABLE public.orders (
    orderID uuid PRIMARY KEY,
    studentID uuid 
        CONSTRAINT student_foreign_key
        REFERENCES public.users(id)
        ON DELETE NO ACTION,
    printerID uuid
        CONSTRAINT printer_foreign_key
        REFERENCES public.printers(printerid)
        ON DELETE NO ACTION,
    fileName VARCHAR(60) NOT NULL,
    filePath VARCHAR(200) NOT NULL,
	fileType VARCHAR(20) NOT NULL,
	pageNum INT NOT NULL
);
