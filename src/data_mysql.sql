-- add users
INSERT INTO blog_app.users (id, username, email, password, img) VALUES ('1', 'aa', 'aa@mail.com', 'aa', 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80');
INSERT INTO blog_app.users (id, username, email, password, img) VALUES ('2', 'bb', 'bb@mail.com', 'bb', 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80');

-- insert posts
insert into blog_app.posts (id, title, description, img, uid, cat, date) VALUES (
    '1', 
    'Lorem', 
    'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
    'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80', 
    '1', 
    'art', 
    '2023-02-10'
);

insert into blog_app.posts (id, title, description, img, uid, cat, date) VALUES ('2', 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!', 'https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80', '2', 'food', '2023-02-08');
insert into blog_app.posts (id, title, description, img, uid, cat, date) VALUES ('3', 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!', 'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1059&q=80', '2', 'art', '2023-02-08');
insert into blog_app.posts (id, title, description, img, uid, cat, date) VALUES ('4', 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80', '1', 'food', '2023-02-08');
