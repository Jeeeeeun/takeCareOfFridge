--foodAPI 테이블 생성
CREATE TABLE foodAPI (    
api_fno VARCHAR2(4000) primary key , 
api_name VARCHAR2(1000), 
api_company VARCHAR2(1000), 
api_expirationDate VARCHAR2(1000),
api_type VARCHAR2(1000));

select * from foodAPI;

select f_no, count(*) from foodData group by f_no;

select count(*) from foodData;

--RENAME foodData TO foodAPI;

COMMIT;

-- foodAPI ���̺� �÷��� ����
ALTER TABLE foodAPI RENAME COLUMN f_no TO api_fno;
ALTER TABLE foodAPI RENAME COLUMN name TO api_name;
ALTER TABLE foodAPI RENAME COLUMN company TO api_company;
ALTER TABLE foodAPI RENAME COLUMN api_expirationDate TO api_expireDate;
ALTER TABLE foodAPI RENAME COLUMN foodType TO api_type;
ALTER TABLE foodAPI
ADD CONSTRAINT pk_foodAPI PRIMARY KEY (api_fno);

SELECT * FROM FOODAPI;

--user_index ������ ���� �� users ���̺�
CREATE SEQUENCE user_index_seq
    START WITH 1
    INCREMENT BY 1
    NOMAXVALUE
    NOCACHE;

CREATE TABLE Users (
user_index number DEFAULT user_index_seq.NEXTVAL primary key , 
user_name VARCHAR2(1000) not null, 
user_id VARCHAR2(1000) not null UNIQUE, 
user_pw VARCHAR2(1000) not null,
user_email VARCHAR2(1000) UNIQUE);

SELECT * FROM Users;
DELETE FROM Users WHERE user_index=11;
COMMIT;
INSERT INTO Users (user_name, user_id, user_pw, user_email) values ('smith','smith01','21177c02a4f3b2912177a408bfbfbbf9a9bd16b2a0db7f974cc158d12c86d6f9acf8aa70c88bc530fdb725abd34a12b2d2b2bb25843727dfed501b6e52a95709','smith@naver.com');
select * from users;


--frg_index ������ ���� �� FrgList ���̺�
CREATE SEQUENCE frg_index_seq
    START WITH 1
    INCREMENT BY 1
    NOMAXVALUE
    NOCACHE;

CREATE TABLE FrgList (
  user_index number,  --FK
  frg_index number DEFAULT frg_index_seq.NEXTVAL primary key,  
  frg_name VARCHAR2(1000), 
  frg_shape VARCHAR2(100), 
  frg_Astate VARCHAR2(100), 
  frg_Bstate VARCHAR2(100),
  CONSTRAINT fk_List_user_index
    FOREIGN KEY (user_index)
    REFERENCES Users (user_index)
		ON DELETE CASCADE,  -- CASCADE DELETE ����. ȸ��Ż���ϸ� ����� ��ϵ� �����
  CONSTRAINT frg_shape_ck CHECK (frg_shape IN('H','V','S')),              --����,����,������ ���ڷ� ����
  CONSTRAINT frg_Astate_ck CHECK (frg_Astate IN('cool','frozen')),        --����,�õ� 
  CONSTRAINT frg_Bstate_ck CHECK (frg_Bstate IN('cool','frozen',null)),        --����,�õ� 
  CONSTRAINT frg_shape_HV_nn CHECK (
     (frg_shape IN('H','V') AND frg_Astate IS NOT NULL AND frg_Bstate IS NOT NULL)
     OR
     (frg_shape = 'S' AND frg_Astate IS NOT NULL AND frg_Bstate IS NULL))
);

desc FrgList;
select * from FrgList;

SELECT f.frg_index, f.user_index, f.frg_name, f.frg_shape, f.frg_Astate, f.frg_Bstate
    FROM FrgList f
    JOIN Users u ON f.user_index = u.user_index
WHERE f.user_index = (SELECT u.user_index FROM Users u WHERE u.user_id = 'smith01');

delete from FrgList where frg_index = 48;

commit;

-- ���� ������ ����
INSERT INTO FrgList (
                        user_index
                        ,frg_name
                        ,frg_shape
                        ,frg_Astate
                        ,frg_Bstate  )
            VALUES (
                        (SELECT user_index FROM Users WHERE user_id = 'smith01')
                         ,'LG'
                         ,'S'
                         ,'frozen'
                         ,null
                         );




--in_index ������ ���� �� inner ���̺�
CREATE SEQUENCE in_index_seq
    START WITH 1
    INCREMENT BY 1
    NOMAXVALUE
    NOCACHE;
    
CREATE TABLE Inner (
    user_index number, --FK
    frg_index number,  --FK
    in_index number DEFAULT in_index_seq.NEXTVAL primary key, 
    in_name VARCHAR2(1000) not null, 
    in_count number not null,
    in_expireDate_custom date not null, 
    in_expireDate_auto VARCHAR2(1000),
    in_company VARCHAR2(1000), 
    in_type VARCHAR2(1000) not null,
    in_state VARCHAR2(100) not null,
    CONSTRAINT fk_Inner_user_index
        FOREIGN KEY (user_index)
        REFERENCES Users (user_index)
        ON DELETE CASCADE, -- CASCADE DELETE ����
    CONSTRAINT fk_Inner_frg_index
        FOREIGN KEY (frg_index)
        REFERENCES FrgList (frg_index)
        ON DELETE CASCADE, -- CASCADE DELETE ����
    CONSTRAINT in_state_ck CHECK (in_state IN('cool','frozen'))
);

-- Inner View (D-DAY ������ ����)
CREATE VIEW Inner_View AS
SELECT
    user_index,
    frg_index,
    in_index,
    in_name,
    in_expireDate_custom,
    floor(SYSDATE - in_expireDate_custom) AS "D_DAY",
	in_state -- ���� ����(����, �õ�) ���������� �ʿ���
FROM Inner;

SELECT * FROM inner_view;
DROP VIEW inner_view;

-- ���� ������ ����
INSERT INTO Inner (
	user_index,
	frg_index,
	in_name,
	in_count,
	in_expireDate_custom,
	in_type,
	in_state
)
VALUES (
    (SELECT user_index FROM Users WHERE user_id = 'smith01'),
    (SELECT frg_index FROM FrgList WHERE frg_name = 'fridge1'),
    '�߰�����',
    10,
    '2023-06-30',
    '���̾�Ʈ��ǰ',
    'frozen'
);
INSERT INTO inner (
	user_index,
	frg_index,
	in_name,
	in_count,
	in_expireDate_auto,
	in_expireDate_custom,
	in_company,
	in_type,
	in_state
)
SELECT
  (SELECT user_index FROM Users WHERE user_id = 'smith01'),  -- �ܷ�Ű�� user_index �Է�
  (SELECT frg_index FROM FrgList WHERE frg_name ='fridge2'),   -- �ܷ�Ű�� frg_index �Է�
  api_name,
  2, -- in_count�� �ش��ϴ� ��
  api_expireDate,
  '2023-06-20', -- in_expireDate_custom�� �ش��ϴ� ��
  api_company,
  api_type,
  'frozen' -- in_state�� �ش��ϴ� ��
FROM foodAPI
WHERE api_fno = 200606144542; -- ������ ���� �ĺ��ϱ� ���� ���� (api_fno�� �ش��ϴ� ��)

COMMIT;
DELETE FROM inner WHERE user_index=15;

SELECT * FROM inner;


-- ��ǰ ���� �ϳ� �� ��ȸ ����
SELECT i.in_name, 
       i.in_state, 
       i.in_company, 
       i.in_expireDate_auto, 
       i.in_expireDate_custom, 
       iv."D_DAY", 
       i.in_count, 
       i.in_type
FROM Inner i
JOIN Inner_View iv
ON i.in_index = iv.in_index
WHERE iv.user_index = (
    SELECT u.user_index
    FROM Users u
    WHERE u.user_id = 'smith01'
)
AND iv.in_index = 21
AND iv.frg_index = 45;





-- ��ȣ�� ���̺� ����
CREATE TABLE traffic (
    user_index NUMBER PRIMARY KEY,
    dangerous NUMBER DEFAULT 0 NOT NULL,
    warning NUMBER DEFAULT 0 NOT NULL,
    CONSTRAINT fk_traffic_user_index
        FOREIGN KEY (user_index)
        REFERENCES Users (user_index)
        ON DELETE CASCADE
);

DROP TABLE traffic;

-- Ʈ���� ����
CREATE OR REPLACE TRIGGER create_traffic_row
AFTER INSERT ON Users
FOR EACH ROW
BEGIN
    INSERT INTO traffic (user_index, dangerous, warning)
    VALUES (:new.user_index, 0, 0);
END;
/

DROP TRIGGER create_traffic_row;
COMMIT;

DESC traffic;
SELECT * FROM traffic;

-- ��ȣ�� �������� ����� �������� ������ ����
UPDATE traffic
SET dangerous = 0 -- ���� �� 0�� �ʰ� �� ������, 0�� �̸� �� �����
WHERE user_index = (
    SELECT user_index
    FROM users
    WHERE user_id = 'smith01'
);

-- ��ȣ�� ������� �ʷϻ� �������� ������ ����
UPDATE traffic
SET warning = -10 -- ���� �� 10�� �ʰ� �� ������, 10�� �̸� �� �����
WHERE user_index = (
    SELECT user_index
    FROM users
    WHERE user_id = 'smith01'
);

-- ���� ������ Ȯ��
-- ��ȣ�� �������� ��ǰ�� ���� ����
-- ������� ���� �� ����
SELECT COUNT(*) AS red
FROM Inner_View i
WHERE i."D-DAY" > (
  SELECT t.dangerous
  FROM traffic t
  WHERE t.user_index = (
    SELECT user_index
    FROM users
    WHERE user_id = 'smith01'
  )
);

-- ��ȣ�� ������� ��ǰ�� ���� ����
-- ������� ���ñ����� ����� 10�� �̸��� �� ����

SELECT COUNT(*) AS yellow
FROM Inner_View i
WHERE i."D-DAY" <= (
  SELECT t.dangerous
  FROM traffic t
  WHERE t.user_index = (
    SELECT user_index
    FROM users
    WHERE user_id = 'smith01'
  )
)
AND i."D-DAY" > (
  SELECT t.warning
  FROM traffic t
  WHERE t.user_index = (
    SELECT user_index
    FROM users
    WHERE user_id = 'smith01'
  )
);

SELECT COUNT(*) AS green
FROM Inner_View i
WHERE i."D-DAY" <= (
  SELECT t.warning
  FROM traffic t
  WHERE t.user_index = (
    SELECT user_index
    FROM users
    WHERE user_id = 'smith01'
  )
);


-- ��ȣ�� �ʷϻ��� ��ǰ�� ���� ����
-- ������� 10�� �̻� ���� �� ����
SELECT COUNT(*) FROM Inner_View i
JOIN traffic t ON i.user_index = t.user_index
JOIN users u ON u.user_index = t.user_index
WHERE i."D-DAY" <= t.warning
  AND u.user_id = 'smith01';


-- Ŀ�´�Ƽ �Խ��� ���̺�
CREATE SEQUENCE board_index_seq
    START WITH 1
    INCREMENT BY 1
    NOMAXVALUE
    NOCACHE;
CREATE TABLE board (
    user_index number, --FK
    board_index NUMBER DEFAULT board_index_seq.NEXTVAL primary key,
    prefix_index NUMBER,  -- FK
    board_title VARCHAR2(4000) NOT NULL,
    board_content CLOB NOT NULL, -- VARCHAR2���� ��뷮�� ���� �����͸� �����ϱ� ���� ����
    board_regDate DATE not null,
    board_upDate DATE,
    board_viewCount NUMBER DEFAULT 0,
    board_commentCount NUMBER DEFAULT 0,
    board_like NUMBER DEFAULT 0,
    board_dislike NUMBER DEFAULT 0,
    CONSTRAINT fk_Board_user_index
    FOREIGN KEY (user_index)
    REFERENCES users (user_index)
    ON DELETE CASCADE, -- user ������ �� �Խñ۵鵵 �ڵ� ����
    CONSTRAINT fk_Board_prefix_index
    FOREIGN KEY (prefix_index)
    REFERENCES prefix (prefix_index)
    ON DELETE SET NULL -- ���Ӹ��� �����Ǹ� �ش� �Խñ��� ���Ӹ��� NULL�� ����
);


DESC board;
DROP TABLE board;
DROP SEQUENCE board_index_seq;
SELECT * FROM board;


-- ���Ӹ� ���̺�
CREATE SEQUENCE pref_index_seq
    START WITH 1
    INCREMENT BY 1
    NOMAXVALUE
    NOCACHE;
CREATE TABLE prefix (
    prefix_index NUMBER DEFAULT pref_index_seq.NEXTVAL PRIMARY KEY,
    prefix_name VARCHAR2(50)
);

INSERT INTO prefix (prefix_name) VALUES ('��ǰ ��õ');
COMMIT;
SELECT * FROM prefix;
UPDATE prefix SET prefix_name='��� ���� ��' WHERE prefix_index=2;
DELETE FROM prefix WHERE prefix_name = '��� ���� ��';

DROP TABLE prefix;
DROP SEQUENCE pref_index_seq;




-- ���õ����� �־��
INSERT INTO Users (user_name, user_id, user_pw, user_email) values ('smith','smith01','123','smith@naver.com');

INSERT INTO board (
    user_index,
    prefix_index,
    board_title,
    board_content,
    board_regdate
)
VALUES (
    (SELECT user_index FROM users WHERE user_id = 'smith01'),
    (SELECT prefix_index FROM prefix WHERE prefix_name = '��� ���� ��'),
    '�ۡ� ��ǰ ��õ��!',
    '�ۡ� ��ǰ �̳� ������!',
    sysdate
);

SELECT * FROM board WHERE user_index='2';
DELETE FROM board where user_index='1';
COMMIT;

-- board ���̺��� user_index�� ���������, ������� ������ user_id�� ���̰� �ϰ� �Ͱ�,
-- board ���̺��� prefix_index�� ���������, ������� ������ prefix_name�� ���̰� �ϰ� ���� ����
-- view��� ���纻�� �������.
CREATE VIEW board_view AS
SELECT u.user_id, b.board_index, p.prefix_name, b.board_title, b.board_content,
       b.board_regDate, b.board_upDate, b.board_viewCount, b.board_commentCount, b.board_like, b.board_dislike
FROM board b
JOIN users u ON b.user_index = u.user_index
JOIN prefix p ON b.prefix_index = p.prefix_index;

DROP VIEW board_view;

-- �Խñ� ���Ӹ� ����
UPDATE board
SET prefix_index = 2 -- ����ڷκ��� ���޹��� prefix_index ��
WHERE board_index = 1; -- ������ �Խñ��� board_index ��

-- �Խñ� ���� ����
UPDATE board
SET board_title = '�ۡ� �����ϴ� ���',
    board_upDate = sysdate
WHERE user_index = (SELECT user_index FROM users WHERE user_id = 'smith01');


-- �Խñ� ���� ����
UPDATE board
SET board_content = '�ۡ� ��� �����ϴ��� �˷��帲',
    board_upDate = sysdate
WHERE user_index = (SELECT user_index FROM users WHERE user_id = 'smith01');

-- �Խñ� ���ƿ� or �Ⱦ��
UPDATE board
SET board_like = GREATEST(board_like + 1, 0)
WHERE board_index = 1;

UPDATE board
SET board_dislike = GREATEST(board_dislike + 1, 0)
WHERE board_index = 1;

-- �Խñ� ���ƿ� or �Ⱦ�� ���
UPDATE board
SET board_like = GREATEST(board_like - 1, 0)
WHERE board_index = 1;

UPDATE board
SET board_dislike = GREATEST(board_dislike - 1, 0)
WHERE board_index = 1;

-- �Խñ� ��ȸ�� ī��Ʈ
-- <> : ���� ���� ��
UPDATE board
SET board_viewCount = board_viewCount + 1
WHERE board_index = 1
AND user_index <> 1;

SELECT * FROM board_view WHERE user_id='smith01';
SELECT * FROM board_view WHERE board_prefix='[��ǰ ��õ]';
SELECT * FROM board_view WHERE board_title like '%�ۡ�%';
SELECT * FROM board_view WHERE board_content like '%�ۡ�%';
SELECT *
FROM board_view
WHERE board_regDate BETWEEN TO_DATE('2023-06-01', 'YYYY-MM-DD') AND TO_DATE('2023-06-19', 'YYYY-MM-DD') + INTERVAL '1' DAY;

UPDATE board_view SET board_prefix='[��� ���� ��]', board_update = sysdate WHERE user_id='smith01';
UPDATE board_view SET board_title='�ۡ� �����ϴ� ���', board_update = sysdate WHERE user_id='smith01';
UPDATE board_view SET board_content='�ۡ� ��� �����ϴ��� �˷��帲', board_update = sysdate WHERE user_id='smith01';

select * from board_view;

commit;

-- ��� ���̺�
CREATE SEQUENCE comment_index_seq
    START WITH 1
    INCREMENT BY 1
    NOMAXVALUE
    NOCACHE;
CREATE TABLE comments (
    board_index NUMBER, -- FK
    user_index NUMBER, -- FK
    comment_index NUMBER DEFAULT comment_index_seq.NEXTVAL PRIMARY KEY,
    comment_content CLOB NOT NULL,
    comment_regDate DATE NOT NULL,
    CONSTRAINT fk_comments_user_index
    FOREIGN KEY (user_index)
    REFERENCES Users (user_index)
    ON DELETE CASCADE,
    CONSTRAINT fk_comments_board_index
    FOREIGN KEY (board_index)
    REFERENCES Board (board_index)
    ON DELETE CASCADE
);

DROP SEQUENCE comment_index_seq;
DROP TABLE comments;
SELECT * FROM comments;

DESC comments;

-- ����� ����� board ���̺��� ��� ���� ���۵ǰ�(trigger, ��ۿ��� �˸��� ���⼭ ���� ����)
--CREATE OR REPLACE TRIGGER comment_trigger
--AFTER INSERT ON comments
--FOR EACH ROW
--BEGIN
--    UPDATE board
--    SET board_commentCount = board_commentCount + 1
--    WHERE board_index = :new.board_index;
--END;

DROP TRIGGER comment_trigger;

delete from comments where comment_index=1;

-- ��� �߰��Ǹ� ��ۼ� �ڵ� up!
BEGIN
  INSERT INTO comments (
    board_index,
    user_index,
    comment_content,
    comment_regDate
  ) VALUES (
    (SELECT board_index FROM board WHERE board_title = '�ۡ� ��ǰ ��õ��!'),
    (SELECT user_index FROM users WHERE user_id = 'smith01'),
    '��� ����!',
    sysdate
  );

  UPDATE board
  SET board_commentCount = (
    SELECT COUNT(*)
    FROM comments
    WHERE board_index = (SELECT board_index FROM board WHERE board_title = '�ۡ� ��ǰ ��õ��!')
  );

  COMMIT;
END;


DELETE FROM board WHERE board_index = 5;

SELECT * FROM comments WHERE board_index = 6;
SELECT * FROM board;
UPDATE comments SET comment_content='��� ���� �ٲ�' WHERE comment_index = 1;
DELETE FROM comments WHERE comment_index = 1;