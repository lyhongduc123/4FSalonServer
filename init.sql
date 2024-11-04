use `database`;

-- insert into users (email, password, role) values ('admin@mail.com','$2b$10$ZG8j4/1d3wpZPAaOKN9X5eigjiqfOWfICBy5HMscExQb8utmYaRcu', 'admin');
-- insert into users (email, password, role) values ('vnu@mail.com','$2b$10$ZG8j4/1d3wpZPAaOKN9X5eigjiqfOWfICBy5HMscExQb8utmYaRcu', 'manager');
-- insert into users (email, password, role) values ('pc02@mail.com','$2b$10$ZG8j4/1d3wpZPAaOKN9X5eigjiqfOWfICBy5HMscExQb8utmYaRcu', 'manager');
-- insert into users (email, password, role) values ('hust@mail.com','$2b$10$ZG8j4/1d3wpZPAaOKN9X5eigjiqfOWfICBy5HMscExQb8utmYaRcu', 'manager');
-- insert into users (email, password, role) values ('fpt@mail.com','$2b$10$ZG8j4/1d3wpZPAaOKN9X5eigjiqfOWfICBy5HMscExQb8utmYaRcu', 'manager');

-- insert into branches (name, address, phone, email, status, user_id) values ('VNU', 'Số 144 Xuân Thủy, quận Cầu Giấy, Hà Nội','0979434231', 'school@vnu.edu.vn', 1, 2);
-- insert into branches (name, address, phone, email, status, user_id) values ('PC02', '7 P. Thiền Quang, Nguyễn Du, Hai Bà Trưng, Hà Nộ','0936860001', 'pc02@gov.vn', 1, 3);
-- insert into branches (name, address, phone, email, status, user_id) values ('HUST', '1 Đ. Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội','02438696099', 'hust@hanoi.edu.vn', 1, 4);
-- insert into branches (name, address, phone, email, status ,user_id) values ('FPT-U', 'Khu Công Nghệ Cao Hòa Lạc, km 29, Đại lộ, Thăng Long, Hà Nội','02473005588', 'fpt@mail.edu.vn', 1, 5);

-- insert into services (title, description, estimate_time, price) values ('Cắt tóc', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 30,  70000);
-- insert into services (title, description, estimate_time, price) values ('Uốn/duỗi tóc', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 30,  100000);
-- insert into services (title, description, estimate_time, price) values ('Nhuộm tóc', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 40,  80000);
-- insert into services (title, description, estimate_time, price) values ('Combo uốn/duỗi + nhuộm tóc', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 50,  169999);
-- insert into services (title, description, estimate_time, price) values ('Combo cắt, uốn, nhuộm', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 60,  239999);
-- insert into services (title, description, estimate_time, price) values ('Gội tiêu chuẩn', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 15,  40000);
-- insert into services (title, description, estimate_time, price) values ('Gội và xả tóc', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 15,  80000);
-- insert into services (title, description, estimate_time, price) values ('Gội và dưỡng tóc', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 25,  150000);
-- insert into services (title, description, estimate_time, price) values ('Phục hồi tóc', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 25,  150000);

-- insert into employees (name, email, phone, work_position, available_from, available_to, status, branch_id) values ('MeFirstEmployee', 'vanhsech@gmail.com', '0986786321', 'stylist', 'Monday', 'Thursday', 1, 1);
-- insert into employees (name, email, phone, work_position, available_from, available_to, status, branch_id) values ('MeSecondEmployee', 'hoasech@gmail.com', '0986755321', 'stylist', 'Friday', 'Sunday', 1, 1);

-- insert into employees (name, email, phone, work_position, available_from, available_to, status, branch_id) values ('Hàn Lập', 'pntt@gmail.com', '0522718657', 'stylist', 'Monday', 'Sunday', 1, 2);
-- insert into employees (name, email, phone, work_position, available_from, available_to, status, branch_id) values ('Lệ Phi Vũ', 'hanlap@gmail.com', '098663231', 'stylist', 'Monday', 'Sunday', 1, 2); 

-- insert into employees (name, email, phone, work_position, available_from, available_to, status, branch_id) values ('Hứa Thất An', 'dacanhnhan@gmail.com', '0784182238', 'stylist', 'Monday', 'Sunday', 1, 3);

-- insert into employees (name, email, phone, work_position, available_from, available_to, status, branch_id) values ('Tạ Diệm', 'talatade@gmail.com', '021893472', 'stylist', 'Monday', 'Sunday', 1, 4);