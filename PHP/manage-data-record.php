<?php
   header('Access-Control-Allow-Origin: *');

   // Define database connection parameters
    $hn 		= 'localhost';
    $un 		= 'id1118489_ringochu1997';
    $pwd		= '25693639';
    $db 		= 'id1118489_fistula';
    $cs 		= 'utf8';

   // Set up the PDO parameters
   $dsn 	= "mysql:host=" . $hn . ";port=3306;dbname=" . $db . ";charset=" . $cs;
   $opt 	= array(
                        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
                        PDO::ATTR_EMULATE_PREPARES   => false,
                       );
   // Create a PDO instance (connect to the database)
   $pdo 	= new PDO($dsn, $un, $pwd, $opt);

   $userKeyDate = filter_var($_REQUEST['key']);
   $location = filter_var($_REQUEST['location']);
   $myDate1 = filter_var($_REQUEST['myDate1']);   // end of first insert
   $myDate2 = filter_var($_REQUEST['myDate2']);   // second insert start
   $userKey = filter_var($_REQUEST['userKey']);
   $userName = filter_var($_REQUEST['userName']);
   $yesno1 = filter_var($_REQUEST['yesno1']);
   $yesno2 = filter_var($_REQUEST['yesno2']);
   $yesno3 = filter_var($_REQUEST['yesno3']);
   $yesno4 = filter_var($_REQUEST['yesno4']);
   $yesno5 = filter_var($_REQUEST['yesno5']);

         try {
            $sql = "INSERT INTO DiaryLog (userKeyDate,LOCATION,MYDATE1,MYDATE2,userKey,userName,YESNO1,YESNO2,YESNO3,YESNO4,YESNO5) 
                    VALUES (:userKeyDate ,:location,:myDate1,:myDate2,:userKey,:userName,:yesno1,:yesno2,:yesno3,:yesno4,:yesno5)";
		    
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':userKeyDate', $userKeyDate, PDO::PARAM_STR); //1
	    $stmt->bindParam(':location', $location, PDO::PARAM_STR);       //2
	    $stmt->bindParam(':myDate1', $myDate1, PDO::PARAM_STR);         //3
	    $stmt->bindParam(':myDate2', $myDate2, PDO::PARAM_STR);         //4
	    $stmt->bindParam(':userKey', $userKey, PDO::PARAM_STR);          //5
	    $stmt->bindParam(':userName', $userName, PDO::PARAM_STR);        //6
	    $stmt->bindParam(':yesno1', $yesno1, PDO::PARAM_STR);            //7
	    $stmt->bindParam(':yesno2', $yesno2, PDO::PARAM_STR);            //8
	    $stmt->bindParam(':yesno3', $yesno3, PDO::PARAM_STR);            //9
	    $stmt->bindParam(':yesno4', $yesno4, PDO::PARAM_STR);            //10
	    $stmt->bindParam(':yesno5', $yesno5, PDO::PARAM_STR);            //11
            $stmt->execute();

           echo json_encode(array('message' => 'Congratulations the record ' . $name . ' was added to the database'));
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }
 
?>