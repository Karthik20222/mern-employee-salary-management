-- Overtime feature schema additions

DROP TABLE IF EXISTS `overtime_entries`;

CREATE TABLE `overtime_entries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `overtime_date` date NOT NULL,
  `overtime_hours` int(11) NOT NULL,
  `reason` text NOT NULL,
  `status` enum('pending','approved') NOT NULL DEFAULT 'pending',
  `approved_at` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `overtime_employee_date_unique` (`employee_id`, `overtime_date`),
  KEY `overtime_employee_id` (`employee_id`),
  CONSTRAINT `overtime_entries_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
