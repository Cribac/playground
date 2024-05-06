<?php
$pdo = new PDO('mysql:dbname=php-test;host=mysql', 'mysql-user', 'mysql-pass', [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

$query = $pdo->query('SHOW VARIABLES like "version"');

$row = $query->fetch();

echo 'MySQL version:' . $row['Value'];
