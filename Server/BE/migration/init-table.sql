CREATE TYPE userRole AS ENUM ('admin', 'user');

CREATE TABLE "users" (
	id 	uuid PRIMARY KEY,
	username VARCHAR(45) NOT NULL,
	firstName VARCHAR(45),
	lastName VARCHAR(45),
	email VARCHAR(45) NOT NULL,
	phone VARCHAR(255),
	avatar VARCHAR(255),
	password VARCHAR(60) NOT NULL,
	role userRole,
	faculty VARCHAR(45),
	city	VARCHAR(45),
	country VARCHAR(45)
);

CREATE TABLE "customers" (
	cusId uuid PRIMARY KEY
		CONSTRAINT cusID_foreign_key
		REFERENCES users
		ON DELETE CASCADE,
	accountBalance DOUBLE PRECISION,
	freePageA4	DOUBLE PRECISION DEFAULT 0
);

CREATE TYPE campusType AS ENUM ('DiAn', 'LTK');
CREATE TYPE printerStatus AS ENUM('active', 'disable');

CREATE TABLE "printers" (
	printerID uuid PRIMARY KEY,
	printerName VARCHAR(60) NOT NULL,
	brandName VARCHAR(60),
	description TEXT,
	model VARCHAR(255),
	campus campusType,
	building VARCHAR(60),
	room VARCHAR(255),
	status printerStatus 
);

CREATE TYPE printStatus AS ENUM ('pending', 'accepted', 'done', 'canceled');
CREATE TYPE typeSide AS ENUM ('single', 'double');

CREATE TABLE public.orders (
    orderID uuid PRIMARY KEY,
    cusID uuid 
        CONSTRAINT student_foreign_key
        REFERENCES public.users(id)
        ON DELETE NO ACTION,
    printerID uuid
        CONSTRAINT printer_foreign_key
        REFERENCES public.printers(printerid)
        ON DELETE NO ACTION,
    fileName VARCHAR(600) NOT NULL,
    filePath VARCHAR(200) NOT NULL,
	fileType VARCHAR(200) NOT NULL,
	numCopy INT,
	pageNum INT,
	pageSize VARCHAR(60),
	pageSide typeSide DEFAULT 'single',
	startPTime TIMESTAMP DEFAULT NOW(),
	endPTime TIMESTAMP,
	"status" printStatus DEFAULT 'pending'
);
