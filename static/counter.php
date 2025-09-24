<?php
$file = "counter.txt";

// if file missing, create it
if (!file_exists($file)) {
    file_put_contents($file, "0");
}

// read and increment
$count = (int)file_get_contents($file);
$count++;
file_put_contents($file, $count);

// baseline estimate
$baseline = 3500; // adjust this
echo $baseline + $count;
?>