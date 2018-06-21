
<?php // You need to add server side validation and better error handling here


//-----------------------------------------------------

if (isset($_GET['listProjects']))
{
	listProjects();
}
elseif(isset($_GET['readProject']))
{
	readProject();
}
elseif(isset($_POST['writeToJson']))
{	
	writeToJson();
}
else
{
	date_default_timezone_set('America/Toronto');
	file_put_contents("log.txt", "_POST not set - " . date("Y/m/d h:i:sa") );
	exit;
}




//###############################################################################################
//###############################################################################################
//###############################################################################################
//###############################################################################################
//###############################################################################################
//###############################################################################################
//###############################################################################################
//###############################################################################################

//-----------------------------------------------------------------
function insertHTML_beforeCSS()
{
	$varRet = "";

	$varRet .=  "<!DOCTYPE html>                                                      		\n";
	$varRet .=  "<html>                                                               		\n";
	$varRet .=  "<head>                                                               		\n";
	$varRet .=  "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> 	\n";
	$varRet .=  "<style rel=\"stylesheet\" >                                                \n";
	$varRet .=  "\n\n";	

	return $varRet;
}
//-----------------------------------------------------------------


//-----------------------------------------------------------------
function insert_CSS( $jsonObj )
{
	$varRet = "";
	$varRet .=  "/* -------------------------------------- */    				\n";
	$varRet .=  "/* CSS - start   */										  	\n";
	$varRet .=  "/* -------------------------------------- */				\n\n\n";

	$varRet .=  "/* -------------------------------------- */    				\n";
	$varRet .=  "html {               											\n";
	$varRet .=  "  width: 100%;       											\n";
	$varRet .=  "  overflow-x: hidden;											\n";
	$varRet .=  "  overflow-y: hidden;											\n";
	$varRet .=  "                     											\n";
	$varRet .=  "}                    											\n";
	$varRet .=  "body {             											\n";
	$varRet .=  "  padding: 0;         											\n";
	$varRet .=  "  margin: 0;          											\n";
	$varRet .=  "  background-color : ".$jsonObj['parentPanel']['color']." ;	\n";
	$varRet .=  "}                    											\n";
	$varRet .=  "/* -------------------------------------- */    			\n\n\n";


	foreach ($jsonObj['panels'] as $key => $value) 
	{

		$name    	   = $key;
		$posX    	   = $jsonObj['panels'][$key]['dimensions']['x'];
		$posY    	   = $jsonObj['panels'][$key]['dimensions']['y'];
		$width   	   = $jsonObj['panels'][$key]['dimensions']['width'];
		$height  	   = $jsonObj['panels'][$key]['dimensions']['height'];
		$type    	   = $jsonObj['panels'][$key]['type'];
		$opacity 	   = $jsonObj['panels'][$key]['opacity'];
		$includeArrows = $jsonObj['panels'][$key]['includeArrows'];

		$partHeight    = floor($height * 0.4);

		if($type == "slideShow" )
		{
			$varRet .=  "/* -------------------------------------- */		\n";
			$varRet .=  "#".$name." > div {                					\n";
			$varRet .=  "  position: absolute;              				\n";
			$varRet .=  "  transform: translate(".$posX."px, ".$posY."px);  \n";
			$varRet .=  "  width:  ".$width. "px;                   		\n";
			$varRet .=  "  height: ".$height."px;                   		\n";			
			$varRet .=  "}                                  				\n";
			$varRet .=  "                                   				\n";
			$varRet .=  ".".$name."                           				\n";
			$varRet .=  "{                                  				\n";
			$varRet .=  "  width:   ".$width."px;                   		\n";
			$varRet .=  "  height:  ".$height."px;                   		\n";
			$varRet .=  "  opacity: ".$opacity.";              				\n";			
			$varRet .=  "}                                  				\n";


			$varRet .=  "#".$name."_Arrows {								\n";
			$varRet .=  "  position: absolute;              				\n";			
			$varRet .=  "  transform: translate(".$posX."px, ".$posY."px);	\n";
			$varRet .=  "  display: inline-block; 							\n";
			$varRet .=  "  width:   ".$width."px;                   		\n";
			$varRet .=  "  height:  ".$height."px;                   		\n";
			$varRet .=  "}													\n";


			$varRet .=  "/* Next & previous buttons */                                              \n";
			$varRet .=  ".".$name."_prev, .".$name."_next {                                         \n";
			$varRet .=  "  cursor: pointer;                                                         \n";
			$varRet .=  "  position: absolute;                                                      \n";
			$varRet .=  "  top: 0%;                                                                 \n";
			$varRet .=  "  text-align: center;                                                     	\n";
			$varRet .=  "  padding: ".$partHeight."px 0px ".$partHeight."px 0%; 					\n";
			$varRet .=  "  width: 20%;                                                              \n";
			$varRet .=  "  color: white;                                                            \n";
			$varRet .=  "  font-weight: bold;                                                       \n";
			$varRet .=  "  font-size: 1.5em;                                                        \n";
			$varRet .=  "  transition: 0.6s ease;                                                   \n";
			$varRet .=  "  border-radius: 0 3px 3px 0;                                              \n";
			$varRet .=  "  opacity:  1;                                                             \n";
			$varRet .=  "}                                                                          \n";
			$varRet .=  "                                                                           \n";
			$varRet .=  "/* Position the \"next button\" to the right */                            \n";
			$varRet .=  ".".$name."_next {                                                          \n";
			$varRet .=  "  right: 0;                                                                \n";
			$varRet .=  "  border-radius: 3px 0 0 3px;                                              \n";
			$varRet .=  "}                                                                          \n";
			$varRet .=  "                                                                           \n";
			$varRet .=  "                                                                           \n";
			$varRet .=  "/* On hover, add a black background color with a little bit see-through */ \n";
			$varRet .=  ".".$name."_prev:hover, .".$name."_next:hover {                             \n";
			$varRet .=  "  background-color: rgba(0,0,0,0.4);                                       \n";
			$varRet .=  "  opacity: 1;                                                              \n";
			$varRet .=  "}                                                                          \n";



			$varRet .=  "/* -------------------------------------- */	\n\n\n";
		}
		else
		{
			$varRet .=  "/* -------------------------------------- */		\n";
			$varRet .=  ".".$name." {                            			\n";
			$varRet .=  "  position: absolute;                 				\n";
			$varRet .=  "  transform: translate(".$posX."px, ".$posY."px);  \n";
			$varRet .=  "  width:   ".$width."px;                   		\n";
			$varRet .=  "  height:  ".$height."px;                   		\n";
			$varRet .=  "  opacity: ".$opacity.";              				\n";
			$varRet .=  "}                                     				\n";			
			$varRet .=  "/* -------------------------------------- */	\n\n\n";
		}

	}

	$varRet .=  "/* -------------------------------------- */    				\n";
	$varRet .=  "/* CSS - end   */										  		\n";
	$varRet .=  "/* -------------------------------------- */				\n\n\n";

	return $varRet;

}
//-----------------------------------------------------------------


//-----------------------------------------------------------------
function insertHTML_beforeScript()
{
	$varRet = "";

	$varRet .=  "\n\n";	
	$varRet .=  "</style>                                                                		\n";
	$varRet .=  "<script type=\"text/javascript\" src=\"../../js/jquery-1.12.4.js\"></script>  	\n";
	$varRet .=  "<script type=\"text/javascript\" src=\"../../js/jquery-ui.js\"></script>      	\n";
	$varRet .=  "<script type=\"text/javascript\">                                       	\n\n\n";
	$varRet .=  "var intervals    = [];															\n";
	$varRet .=  "var fadeDuration = [];															\n";
	$varRet .=  "var slideTimmer  = [];															\n";	
	$varRet .=  "\n\n";	
	  
	return $varRet;

}
//-----------------------------------------------------------------


//-----------------------------------------------------------------
function insert_script( $jsonObj )
{
	$varRet  =  "";
	$varRet .=  "// --------------------------------------											   \n";
	$varRet .=  "// SCRIPT - start   																   \n";
	$varRet .=  "// --------------------------------------										   \n\n\n";
	$varRet .=  "$(document).ready(function(){													   \n\n\n";
	$varRet .=  "    var fontSize = (parseFloat(getComputedStyle($(\"body\")[0]).fontSize) * 1.5) + 7; \n";






	foreach ($jsonObj['panels'] as $key => $value) 
	{

		$name    		= $key;
		$type    		= $jsonObj['panels'][$key]['type'];
		$fadeDuration 	= $jsonObj['panels'][$key]['fadeDuration'];
		$slideDuration 	= $jsonObj['panels'][$key]['slideDuration'];
		$height         = $jsonObj['panels'][$key]['dimensions']['height'];


		if($type == "slideShow" )
		{


			$varRet .=  "    var ".$name."_padding =  (".$height." - fontSize) / 2; \n";
			$varRet .=  "    $(\".".$name."_prev, .".$name."_next\").css( \"padding\", ".$name."_padding+\"px 0px \"+".$name."_padding+\"px 0px\" );\n";

			$varRet .=  "    //--------------------------------------			\n";
			$varRet .=  "    // slideshow . ". $name ."					  	  	\n";
			$varRet .=  "    $(\"#".$name." > div:gt(0)\").hide();				\n";
			$varRet .=  "    fadeDuration[\"#".$name."\"] = ".$fadeDuration. "; \n";
			$varRet .=  "    slideTimmer[\"#".$name."\"]  = ".$slideDuration."; \n";
			$varRet .=  "    startSlideShow(\"#".$name."\");      				\n";			
			$varRet .=  "    //--------------------------------------	\n\n\n";			
		}

	}


  	$varRet .=  "});\n\n\n"; //end of '$(document).ready(function(){''

	$varRet .= "//-----------------------------------------------------------                                                         \n";
	$varRet .= "function startSlideShow(strSlideID)                                                                                   \n";
	$varRet .= "{                                                                                                                     \n";
	$varRet .= "  intervals[strSlideID] = setInterval(function()                                                                      \n";
	$varRet .= "  {                                                                                                                   \n";
	$varRet .= "    nextSlide(strSlideID, true)                                                                                       \n";
	$varRet .= "  }, slideTimmer[strSlideID]);                                                                                        \n";
	$varRet .= "}                                                                                                                     \n";
	$varRet .= "//-----------------------------------------------------------                                                         \n";
	$varRet .= "                                                                                                                      \n";
	$varRet .= "                                                                                                                      \n";
	$varRet .= "//-----------------------------------------------------------                                                         \n";
	$varRet .= "function prevSlide(strSlideID , p_timmer = false)                                                                     \n";
	$varRet .= "{                                                                                                                     \n";
	$varRet .= "  //----------------------------------                                                                                \n";
	$varRet .= "  //default manipulation PREV SLIDE                                                                                   \n";
	$varRet .= "  if ( $( strSlideID + ' > div:visible')[0] === $(strSlideID + ' > div:first')[0] )                                   \n";
	$varRet .= "  {                                                                                                                   \n";
	$varRet .= "    $(strSlideID + ' > div:last').fadeIn(fadeDuration[strSlideID]);                                                   \n";
	$varRet .= "    $(strSlideID + ' > div:first').fadeOut(fadeDuration[strSlideID]);                                                 \n";
	$varRet .= "  }                                                                                                                   \n";
	$varRet .= "  else                                                                                                                \n";
	$varRet .= "  {                                                                                                                   \n";
	$varRet .= "    $(strSlideID + ' > div:visible').fadeOut(fadeDuration[strSlideID]).prev().fadeIn(fadeDuration[strSlideID]).end(); \n";
	$varRet .= "  }                                                                                                                   \n";
	$varRet .= "  //----------------------------------                                                                                \n";
	$varRet .= "                                                                                                                      \n";
	$varRet .= "                                                                                                                      \n";
	$varRet .= "  if ( p_timmer === false )                                                                                           \n";
	$varRet .= "  {                                                                                                                   \n";
	$varRet .= "    clearInterval(intervals[strSlideID]);                                                                             \n";
	$varRet .= "    startSlideShow(strSlideID);                                                                                       \n";
	$varRet .= "  }                                                                                                                   \n";
	$varRet .= "}                                                                                                                     \n";
	$varRet .= "//-----------------------------------------------------------                                                         \n";
	$varRet .= "                                                                                                                      \n";
	$varRet .= "                                                                                                                      \n";
	$varRet .= "//-----------------------------------------------------------                                                         \n";
	$varRet .= "function nextSlide(strSlideID , p_timmer = false)                                                                     \n";
	$varRet .= "{                                                                                                                     \n";
	$varRet .= "  //----------------------------------                                                                                \n";
	$varRet .= "  //default manipulation NEXT SLIDE                                                                                   \n";
	$varRet .= "  if ( $(strSlideID + ' > div:visible')[0] === $(strSlideID + ' > div:last')[0] )                                     \n";
	$varRet .= "  {                                                                                                                   \n";
	$varRet .= "    $(strSlideID + ' > div:first').fadeIn(fadeDuration[strSlideID]);                                                  \n";
	$varRet .= "    $(strSlideID + ' > div:last').fadeOut(fadeDuration[strSlideID]);                                                  \n";
	$varRet .= "  }                                                                                                                   \n";
	$varRet .= "  else                                                                                                                \n";
	$varRet .= "  {                                                                                                                   \n";
	$varRet .= "    $(strSlideID + ' > div:visible').fadeOut(fadeDuration[strSlideID]).next().fadeIn(fadeDuration[strSlideID]).end(); \n";
	$varRet .= "  }                                                                                                                   \n";
	$varRet .= "  //----------------------------------                                                                                \n";
	$varRet .= "                                                                                                                      \n";
	$varRet .= "                                                                                                                      \n";
	$varRet .= "  if ( p_timmer === false )                                                                                           \n";
	$varRet .= "  {                                                                                                                   \n";
	$varRet .= "    clearInterval(intervals[strSlideID]);                                                                             \n";
	$varRet .= "    startSlideShow(strSlideID);                                                                                       \n";
	$varRet .= "  }                                                                                                                   \n";
	$varRet .= "                                                                                                                      \n";
	$varRet .= "}                                                                                                                     \n";
	$varRet .= "//-----------------------------------------------------------                                                     \n\n\n";


	$varRet .=  "// --------------------------------------		\n";
	$varRet .=  "// SCRIPT - end   								\n";
	$varRet .=  "// --------------------------------------	\n\n\n";

	return $varRet;

}
//-----------------------------------------------------------------



//-----------------------------------------------------------------
function insertHTML_beforeHTMLBody()
{

	$varRet = "";

	$varRet .=  "\n\n";	
	$varRet .=  "</script>	\n";
	$varRet .=  "</head>	\n";
	$varRet .=  "<body >	\n";
	$varRet .=  "\n\n";	

	return $varRet;

}
//-----------------------------------------------------------------


//-----------------------------------------------------------------
function insert_HTMLBody( $jsonObj )
{


	$varRet = "";
	$varRet .=  "<!-- ------------------------------------------ --> 	\n";
	$varRet .=  "<!-- HTML - start -->									\n";
	$varRet .=  "<!-- ------------------------------------------ -->\n\n\n";

	foreach ($jsonObj['panels'] as $key => $value) 
	{

		$name	= $key;
		$type	= $jsonObj['panels'][$key]['type'];


		

		if($type == "staticImage")
		{
			$varRet .=  "<!-- ------------------------------------------ --> 	\n";
			$varRet .=  "<!-- static image --> 									\n";
			foreach ($jsonObj['panels'][$key]['files'] as $keyFile => $valueFile) 
			{
				$valueFile = moveFile($valueFile , $jsonObj); //user defined function

				$varRet .=  "<img class=\"".$name."\"  src=\"".$valueFile."\">	\n";

				
			}			
			$varRet .=  "<!-- ------------------------------------------ -->\n\n\n";
		}
		elseif ($type == "video")
		{

			$varRet .=  "<!-- ------------------------------------------ -->		\n";
			$varRet .=  "<!-- video -->												\n";
			foreach ($jsonObj['panels'][$key]['files'] as $keyFile => $valueFile) 
			{
				$valueFile = moveFile($valueFile , $jsonObj); //user defined function

				$varRet .=  "<video  class=\"".$name."\" autoplay loop>				\n";
				$varRet .=  "  <source src=\"".$valueFile."\" type=\"video/mp4\">	\n";
				$varRet .=  "</video>												\n";
			}
			$varRet .=  "<!-- ------------------------------------------ -->	\n\n\n";				

		}
		elseif ($type == "slideShow")
		{

			$varRet .=  "<!-- ------------------------------------------ -->								\n";
			$varRet .=  "<!-- slideshow -->																	\n";
			$varRet .=  "<div id=\"".$name."\">																\n";
			foreach ($jsonObj['panels'][$key]['files'] as $keyFile => $valueFile) 
			{
				$valueFile = moveFile($valueFile , $jsonObj); //user defined function

				$varRet .=  "  <div>																		\n";
				$varRet .=  "      <img class=\"".$name."\" style=\"width:100%\" src=\"".$valueFile."\">	\n";
				$varRet .=  "  </div>																		\n";
			}
			$varRet .=  "</div>																				\n";
			if ( $jsonObj['panels'][$key]['includeArrows'] == "true" )
			{
				$varRet .= "<div id=\"".$name."_Arrows\">                                                 	\n";
				$varRet .= "    <a class=\"".$name."_prev\" onclick=\"prevSlide('#".$name."')\">&#10094;</a> \n";
				$varRet .= "    <a class=\"".$name."_next\" onclick=\"nextSlide('#".$name."')\">&#10095;</a> \n"; 
				$varRet .= "</div>                                                                      	\n";
			}
			$varRet .=  "<!-- ------------------------------------------ -->							\n\n\n";
		}
		else
		{
			$varRet .=  "<!-- ------------------------------------------ --> 	\n";
			$varRet .=  "<!-- ELEMENT TYPE NOT SUPPORTED -->					\n";
			$varRet .=  "<!-- ------------------------------------------ -->\n\n\n";
		}

	}


	$varRet .=  "<!-- ------------------------------------------ --> 	\n";
	$varRet .=  "<!-- HTML - end -->									\n";
	$varRet .=  "<!-- ------------------------------------------ -->\n\n\n";

	return $varRet;

}
//-----------------------------------------------------------------



//-----------------------------------------------------------------
function insertHTML_footerHTML()
{

	$varRet = "";
	$varRet .=  "\n\n";
	$varRet .=  "</body>\n";
	$varRet .=  "</html>"; 

	return $varRet;
}
//-----------------------------------------------------------------


//-----------------------------------------------------------------
function writeToJson()
{
	$string = $_POST["writeToJson"];


	//$string = file_get_contents("json.txt");
	$jsonObj = json_decode($string, true);


	//creates project folder
	if ( !file_exists("./projects/" . $jsonObj['projectName'] ) )
	{
		mkdir("./projects/" . $jsonObj['projectName'] , 0700);
	}






	$var_HTML_DOC	= "";
	$var_HTML_DOC .= insertHTML_beforeCSS();

	//-----------------------------
	$var_HTML_DOC .= insert_CSS($jsonObj); //##################################
	//-----------------------------

	$var_HTML_DOC .= insertHTML_beforeScript();

	//-----------------------------
	$var_HTML_DOC .= insert_script($jsonObj); //###############################
	//-----------------------------

	$var_HTML_DOC .= insertHTML_beforeHTMLBody();

	//-----------------------------
	$var_HTML_DOC .= insert_HTMLBody($jsonObj); //#############################
	//-----------------------------

	$var_HTML_DOC .= insertHTML_footerHTML();

	//we need to change the files names within the json object now
	// this change should not be done at an earlier phase because dealing with the original file names makes
	// our life easier
	$jsonObj = updateFilesNames($jsonObj);
	$string = json_encode($jsonObj);

	//write json file
	file_put_contents("./projects/" . $jsonObj['projectName'] . "/json.txt", $string );

	//writes html file 
	file_put_contents("./projects/" . $jsonObj['projectName'] . "/output.html", $var_HTML_DOC);

}
//-----------------------------------------------------------------


//-----------------------------------------------------------------
function moveFile($filename , $jsonObj) //user defined function
{
	//$filename =  substr($filename , (strrpos($filename, "uploads")+8) );
	copy("./uploads/" . $filename , "./projects/" . $jsonObj['projectName'] . "/" . $jsonObj['projectName'] . "_" . $filename );
	return $jsonObj['projectName'] . "_" . $filename;
}
//-----------------------------------------------------------------


//-----------------------------------------------------------------
function updateFilesNames($jsonObj)
{
	foreach ($jsonObj['panels'] as $key => $value) 
	{
		foreach ($jsonObj['panels'][$key]['files'] as $keyFile => $valueFile) 
		{
			$jsonObj['panels'][$key]['files'][$keyFile] = $jsonObj['projectName'] . "_" . $valueFile;
		}
	}

	return $jsonObj;
}

//-----------------------------------------------------------------


//-----------------------------------------------------------------
function listProjects()
{
	if($_GET['listProjects'] === "")
	{
		$projects = scandir("./projects/",1);

		//removes elements ".." and "." from the array
		array_pop($projects);
		array_pop($projects);

	}
	elseif ( strlen ($_GET['listProjects']) >= 3 )
	{
		$projects = array_filter(glob("./projects/" . $_GET['listProjects'].'*'), 'is_dir');

		foreach ($projects as $key => $value) {
			$projects[$key] = substr($value, 11);
		}

		//print_r( $projects);

	}
	else
	{
		exit;
	}

	echo json_encode($projects);
	//print_r($projects);
	exit;
}
//-----------------------------------------------------------------


//-----------------------------------------------------------------
function readProject()
{
	$files = scandir("./projects/" . $_GET['readProject'] . "/",1);
	array_pop($files);
	array_pop($files);

	foreach ($files as $key => $value) {
		if($value === "output.html" || $value === "json.txt" )
		{
			unset($files[$key]);
		}
		
		copy("./projects/" . $_GET['readProject']. "/" . $value, "./uploads/". $value);
	}




	//print_r($files);
	//echo "</br></br></br></br></br></br>";
	
	//make sure the file exists
	if ( !file_exists("./projects/" . $_GET['readProject'] . "/json.txt" ) )
	{
		exit;
	}

	$string = file_get_contents("./projects/" . $_GET['readProject'] . "/json.txt");




	echo $string;


	exit;
}
//-----------------------------------------------------------------

?>
