CREATE TABLE IF NOT EXISTS `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sales` int(11) NOT NULL,
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `price` decimal(8,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 ;

INSERT INTO `books` (`id`, `sales`, `author`, `title`, `price`) VALUES
(1, 450, 'Jon Duckett', 'HTML and CSS: Design and Build Websites', 16.79),
(3, -800, 'Steve Krug', 'Don''t Make Me Think', 40.95),
(4, 800, 'Douglas Crockford', 'JavaScript: The Good Parts', 15.59),
(5, 1250, 'John Resig', 'Secrets of the JavaScript Ninja', 23.99);