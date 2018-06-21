var environment = "dev";

$(document).ready(function()
{

  //########################################################################################
  //########################################################################################
  //########################################################################################
  //#####
  //#####        EVENTS - START
  //#####
  //########################################################################################
  //########################################################################################
  //########################################################################################

  //----------------------------------------------------
  //hide the modal div
  window.onclick = function(event) 
  {
    if (event.target == document.getElementById('placeHolderDetails') ) 
    {
        document.getElementById('placeHolderDetails').style.display = "none";
    }

    if (event.target == document.getElementById('modalProjects') ) 
    {
        document.getElementById('modalProjects').style.display = "none";
    }          
  }
  //----------------------------------------------------

  //----------------------------------------------------
  if (environment === "production"){
      window.onbeforeunload = function (e) {
        return 'Are you sure?';
      };
  }
  //----------------------------------------------------


  //########################################################################################
  //########################################################################################
  // PLACEHOLDER EVENTS

  //----------------------------------------------------
  $(document).on("click", "div.resize-drag" , function() 
  {
    var index = $(this).index();


    $("#hidLastClickedContainer").val( index );

    
    $("#containerHeight").val( $(".resize-drag")[ index ].offsetHeight );
    $("#containerWidth").val( $(".resize-drag")[ index ].offsetWidth);
    $("#containerPosX").val( $(this).position().left + 12 );
    $("#containerPosY").val( $(this).position().top + 22 );
  });
  //----------------------------------------------------


  //----------------------------------------------------
  //click details on the container placeholder
  $(document).on("click", "a.placeholderInfo" , function() 
  {

    //selects only inputs with class names starting with the word 'file'
    var files = $(this).parent().children("input[class^='file']");
    var filenames = [];


    for (var i = 0; i < files.length; i++) 
    { 
      filenames[i] = files[i].value; 
    } 

    writeFileList( filenames , true );


    //set up the controls
    $("#optionTypeSelect"   ).val(  $(this).parent().children(".type").val()          );
    $("#inputSlidesDuration").val(  $(this).parent().children(".slideDuration").val() );
    $("#inputFadeTime"      ).val(  $(this).parent().children(".fadeDuration").val()  );
    $("#inputOpacity"       ).val(  $(this).parent().children(".opacity").val()       );
    $("#optionIncludeArrows").val(  $(this).parent().children(".includeArrows").val() );


    if($(this).parent().children(".type").val() == "slideShow")
    {
      $(".slideshow_CtrlDetails" ).show();
    }
    else
    {
      $(".slideshow_CtrlDetails" ).hide();
    }




    //set up controls - hold the info of the last placeholder clicked
    $("#hidOpenDetailsDiv").val( $(this).parent().index() );


    //return to main window
    document.getElementById('placeHolderDetails').style.display = 'block';
  });
  //----------------------------------------------------
  //########################################################################################




  //########################################################################################
  //########################################################################################
  // BUTTONS ON DIVCONTROLS
  //----------------------------------------------------
  //adding a new placeholder
  $("#btnAddPlaceHolder").click( function()
  {
    placeHolder_Add();
  });
  //----------------------------------------------------

  //----------------------------------------------------
  $("#btnWriteToFile").click(function() 
  {

    $.ajax({
          type: "POST",
          url: 'fileWriter.php',
          data: { writeToJson : writeToJson()},
          
          success: function(data, textStatus, jqXHR)
          {
            //alert(data);
          }
        });
  });
  //----------------------------------------------------

  //----------------------------------------------------
  $("#btnStoredInside").click(function()
  {
    alert( writeToJson() );
  });
  //----------------------------------------------------  

  //----------------------------------------------------
  $(document).on("click", "#btnProjects" , function() 
  {
    ajaxGetProjects("");
    document.getElementById('modalProjects').style.display = 'block';
  });
  //----------------------------------------------------  

  //########################################################################################





  //########################################################################################
  //########################################################################################
  // INPUT CONTROLS
  
  //----------------------------------------------------
  $("#panelWidth").change(function()
  {
    $("#screenSimulationDiv").width( $("#panelWidth").val() );
  });
  $("#panelWidth").val( $("#screenSimulationDiv").width() );
  //----------------------------------------------------

  //----------------------------------------------------
  // panel dimensions
  $("#panelHeight").change(function()
  {
    $("#screenSimulationDiv").height( $("#panelHeight").val() );
  });
  $("#panelHeight").val( $("#screenSimulationDiv").height() );
  //----------------------------------------------------

  //----------------------------------------------------
  //panel background color
  $("#panelColor").change(function()
  {
    $("#screenSimulationDiv").css("background-color", $("#panelColor").val() );
  });
  //----------------------------------------------------

  //----------------------------------------------------
  $(document).on("change", "#containerWidth" , function() 
  {  
    var index = $("#hidLastClickedContainer").val();
    $("#screenSimulationDiv").children()[index].style.width= $("#containerWidth").val() + 'px';
  });      
  
  //----------------------------------------------------

  //----------------------------------------------------
  $(document).on("change", "#containerHeight" , function() 
  {  
    var index = $("#hidLastClickedContainer").val();
    $("#screenSimulationDiv").children()[index].style.height= $("#containerHeight").val() + 'px';
  }); 
  //----------------------------------------------------

  //----------------------------------------------------
  $(document).on("change", "#containerPosX" , function() 
  {  
    var index = $("#hidLastClickedContainer").val();

    var newPosX = $("#containerPosX").val();
    var target = $("#screenSimulationDiv").children()[index];

    x = (parseFloat(target.getAttribute('data-x')) || 0),
    y = (parseFloat(target.getAttribute('data-y')) || 0);


    target.style.webkitTransform = target.style.transform = "translateX("+(newPosX)+"px)";
      //"translate(' + x + 'px,' + y + 'px)";

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);          


  }); 
  //----------------------------------------------------  

  //----------------------------------------------------
  $(document).on("change", "#containerPosY" , function() 
  {  
    var index = $("#hidLastClickedContainer").val();
    //$("#screenSimulationDiv").children()[index].style.transform = "translateY("+$("#containerPosY").val()+"px)";


    var newPosY = $("#containerPosY").val();
    var target = $("#screenSimulationDiv").children()[index];

    x = (parseFloat(target.getAttribute('data-x')) || 0),
    y = (parseFloat(target.getAttribute('data-y')) || 0);


    //target.style.width  = newPosX + 'px';
    //target.style.height = y + 'px';

    target.style.webkitTransform = target.style.transform = "translateY("+(newPosY)+"px)";
      //"translate(' + x + 'px,' + y + 'px)";

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);  

  }); 
  //----------------------------------------------------  
  //########################################################################################



  //########################################################################################
  //########################################################################################
  //MODAL CONTROLS 
  //----------------------------------------------------
  $("#btnModalOk").click(function() //writes the settings
  {

    var divContainerIndex = $("#hidOpenDetailsDiv").val();

    var divContainer = $("#screenSimulationDiv").children()[$("#hidOpenDetailsDiv").val()];

    //clear all the settings
    $(divContainer).children("input").remove();


    var str = "";
    str += placeHolder_AddHiddenInputs($("#optionTypeSelect").val(), $("#inputFadeTime").val(), $("#inputSlidesDuration").val(), $("#inputOpacity").val() , $("#optionIncludeArrows").val() );

    var files = $("#modalContentFiles .modalLink");

    //convert the href array to standard array in order to work with placeHolder_AddFiles()
    var arrFiles = {};
    for (var i = 0; i < files.length; i++)
    {
      arrFiles[i] = files[i].href;
    }

    str += placeHolder_AddFiles(arrFiles);


    $(divContainer).append( str ); //insert values in the container


    //return to main window
    document.getElementById('placeHolderDetails').style.display = 'none';
  });
  //----------------------------------------------------

  //----------------------------------------------------
  $("#btnDeleteFiles").click(function() 
  {
    placeHolderAttrib_Clear();

    $("#screenSimulationDiv").children()[$("#hidOpenDetailsDiv").val()].remove();
    document.getElementById('placeHolderDetails').style.display = 'none';
  });
  //----------------------------------------------------

  $("#optionTypeSelect").change(function() 
  {
      //alert ( $("#optionTypeSelect option:selected" ).val() );

      if( $("#optionTypeSelect option:selected" ).val() === "slideShow")
      {
        $(".slideshow_CtrlDetails" ).show();
      }
      else
      {
        $(".slideshow_CtrlDetails" ).hide();
      }

  });




  //########################################################################################



  //########################################################################################
  //########################################################################################
  //########################################################################################
  //#####
  //#####        EVENTS - END
  //#####
  //########################################################################################
  //########################################################################################
  //########################################################################################



  //######################################################################
  //######################################################################
  // draggin and resizing script
  //----------------------------------------------------
  interact('.resize-drag')
  .draggable
  (
    {
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      restrict: 
      {
        restriction: "parent",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },
      // enable autoScroll
      autoScroll: true,

      // call this function on every dragmove event
      onmove: dragMoveListener,

      // call this function on every dragend event
      onend: function (event) 
      {
        var textEl = event.target.querySelector('p');

        textEl && (textEl.textContent =
          'moved '
          + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                       Math.pow(event.pageY - event.y0, 2) | 0))
              .toFixed(2) + 'px');
      }
    }
  )
  .resizable
  (
    {
      // resize from all edges and corners
      edges: { left: true, right: true, bottom: true, top: true },

      // keep the edges inside the parent
      restrictEdges: 
      {
        outer: 'parent',
        endOnly: true,
      },

      // minimum size
      restrictSize: 
      {
        min: { width: 100, height: 50 },
      },

      inertia: true,
    }
  )
  .on('resizemove', function (event) 
  {
    var target = event.target,
    x = (parseFloat(target.getAttribute('data-x')) || 0),
    y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

    event.target.querySelector('p').textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);

  });
  //----------------------------------------------------
        

  //----------------------------------------------------
  function dragMoveListener (event) 
  {
    var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform = 
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }
  //----------------------------------------------------

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener; 
  //######################################################################


}); // end of $(document).ready(function()



//########################################################################################
//########################################################################################
//########################################################################################
//#####
//#####        FUNCTIONS - START
//#####
//########################################################################################
//########################################################################################
//########################################################################################




//----------------------------------------------------
// function addFiles()
// {
//   var objBtnAddFiles =  $("#btnAddFiles");

//   for (var i = 0; i < objBtnAddFiles.files.length ; i++) 
//   {
//     objBtnAddFiles.files[i]
//   }

// }
//----------------------------------------------------


//----------------------------------------------------
function writeFileList( files , clearList )
{
  
  if(clearList === true )
  {
    // cleans the div with the files
    $("#modalContentFiles").children().remove();
  }

  //build the file listing
  var str = "";
  for (var i = 0; i < files.length; i++) 
  {
    
    str = "";

    str += "<a class='modalLink' href='"+files[i]+"' target='_blank'>"+files[i]+"</a>";
    str += "<a href='javascript:void(0);' target='_blank'  onclick=\" $(this).prev().remove(); $(this).next().remove(); $(this).remove();  \"><img src='media/del.png' alt='Delete'></a>";
    str += "</br>";

    $("#modalContentFiles").prepend( str );

  }

}
//----------------------------------------------------




//----------------------------------------------------
function writeToJson()
{
   var output = {}; //create array with {key : values}


    if($("#projectName").val() === "")
    {
      var d = new Date();
      var strDate = d.getFullYear().toString() + ("0" + (d.getMonth() + 1)).slice(-2) + ("0" + (d.getDate())).slice(-2) + "_" + ("0" + (d.getHours())).slice(-2) + ("0" + (d.getMinutes())).slice(-2) + ("0" + (d.getSeconds())).slice(-2) + "_" + d.getMilliseconds();
      $("#projectName").val(strDate);
    }

    output["projectName"] = $("#projectName").val();
    output["parentPanel"] = getParentPanelDetails();

    
    //---------------------
    var panelOutput = {};
    for (var i = 0; i < $("#screenSimulationDiv .resize-drag").length ; i++) 
    {

      panelOutput["panel"+i] = getDraggableContent("#screenSimulationDiv", i);

    }
    if($("#screenSimulationDiv .resize-drag").length > 0)
    {
      output["panels"] = panelOutput;  
    }
    //---------------------
    
      
    return JSON.stringify(output);
}
//----------------------------------------------------




//----------------------------------------------------
function getParentPanelDetails()
{
  var ret = {};
 
  ret["color"]  = $("#screenSimulationDiv").css('backgroundColor');
  ret["width"]  = $("#screenSimulationDiv").width();
  ret["height"] = $("#screenSimulationDiv").height();

  return ret;
}
//----------------------------------------------------


//----------------------------------------------------
function getDraggableContent(parentPanelID , index)
{

  var arrDimensions       = {};
  arrDimensions['x']      = $("#screenSimulationDiv .resize-drag:nth-child("+(index+1)+")").position().left + 12;
  arrDimensions['y']      = $("#screenSimulationDiv .resize-drag:nth-child("+(index+1)+")").position().top + 22;
  arrDimensions['width']  = $("#screenSimulationDiv .resize-drag")[index].getBoundingClientRect()["width"];
  arrDimensions['height'] = $("#screenSimulationDiv .resize-drag")[index].getBoundingClientRect()["height"];

  //get div's position
  //var outputArrayLoop  = { "dimensions" : $("#screenSimulationDiv .resize-drag")[index].getBoundingClientRect() }
  var outputArrayLoop  = { "dimensions" : arrDimensions }

  var fileArray = {};

  //inside the draggable div, select only inputs
  var divArray = $( parentPanelID +" .resize-drag:eq("+index+") input" );
  for (var j = 0; j < divArray.length ; j++) 
  {
    
    //check if the current tag being processed is a file, if so put the item in the fileArray,
    //  if not just put the item/tag in the outputArrayLoop
    if (divArray[j].classList.value.substring(0, 4) == "file")
    { 
      fileArray[divArray[j].classList.value] = divArray[j].value.substring( divArray[j].value.lastIndexOf("uploads")+ 8)
    } 
    else
    {
      outputArrayLoop[divArray[j].classList.value] = divArray[j].value;  
    }

  }
  outputArrayLoop["files"] = fileArray;

  //return values
  return outputArrayLoop;

}
//----------------------------------------------------


//----------------------------------------------------
function searchProjects(str)
{
  if (str.length > 3) 
  {
    ajaxGetProjects(str);
  }
  
}
//----------------------------------------------------


//----------------------------------------------------
function ajaxGetProjects(str)
{
  $.get( "filewriter.php", { listProjects: str } ).done(function( data ) 
    {
        //alert( "Data Loaded: " + data );
        var objJSON = JSON.parse(data);

        $("#modalProjectsList").empty();
        for (var i = 0; i < objJSON.length ; i++) 
        {
          $("#modalProjectsList").append("<p class='p_projects' onclick=\"loadProject('"+objJSON[i]+"');\">"+objJSON[i]+"</p>");
          
        }
  });  

}
//----------------------------------------------------

//----------------------------------------------------
function loadProject(str)
{
  $.get( "filewriter.php", { readProject: str } ).done(function( data ) 
  {
      //alert( "Data Loaded: " + data );
      var objJSON = JSON.parse(data);

      objJSON['parentPanel']['color'] = stringFullColorHex(objJSON['parentPanel']['color']);
      //alert(objJSON['parentPanel']['color']);

      wipeDetails();
      screenSimulationDiv_SetDetails(objJSON);
      placeHolders_Load(objJSON);


    });

  document.getElementById('modalProjects').style.display = "none";
}
//----------------------------------------------------



//----------------------------------------------------
function wipeDetails()
{
  screenSimulationDiv_ChildrenClear();
  screenSimulationDiv_DetailsClear();
  placeHolderAttrib_Clear();
}
//----------------------------------------------------

//----------------------------------------------------
function screenSimulationDiv_ChildrenClear()
{
  $("#screenSimulationDiv").empty();
}
//----------------------------------------------------

//----------------------------------------------------
function screenSimulationDiv_DetailsClear()
{
  $("#projectName").val("");
  $("#panelWidth").val("1333");
  $("#panelHeight").val("240");
  $("#panelColor").val("#ff0000");

  $("#screenSimulationDiv").css("background-color", "rgba(255, 255, 255, 0)" );
  $("#screenSimulationDiv").width("1333");
  $("#screenSimulationDiv").height("240");
}
//----------------------------------------------------


//----------------------------------------------------
function screenSimulationDiv_SetDetails(objJSON)
{
  $("#projectName").val(objJSON['projectName']);
  $("#panelWidth" ).val( objJSON['parentPanel']['width'] );
  $("#panelHeight").val( objJSON['parentPanel']['height']);
  $("#panelColor" ).val( objJSON['parentPanel']['color'] );

  $("#screenSimulationDiv").css("background-color", objJSON['parentPanel']['color'] );
  $("#screenSimulationDiv").width( objJSON['parentPanel']['width'] );
  $("#screenSimulationDiv").height(objJSON['parentPanel']['height']);

}
//----------------------------------------------------


//----------------------------------------------------
function placeHolderAttrib_Clear()
{
  $("#containerWidth").val("");
  $("#hidLastClickedContainer").val("");
  $("#containerHeight").val("");
  $("#containerPosX").val("");
  $("#containerPosY").val("");
}
//----------------------------------------------------

//----------------------------------------------------
function placeHolder_Add( type = "staticImage", fadeDuration = "500", slideDuration = "3000", opacity = "1", includeArrows = false, files = {}, x = "0" , y = "0", width = "130px" , height = "110px" )
{
    placeHolderAttrib_Clear();
    

    var str = "";
    str += "<div class='resize-drag' >";
    str += "  <p style = '  padding:0; margin:0; ' >Resize from any edge or corner</p>";
    str += placeHolder_AddHiddenInputs(type , fadeDuration , slideDuration , opacity, includeArrows );
    str += placeHolder_AddFiles(files);
    str += "  <a href='javascript:void(0);'  class='placeholderInfo' >Details</a>";
    str += "</div>";

    $("#screenSimulationDiv").append( str );

    var placeHolderAdded = $("#screenSimulationDiv").children()[$("#screenSimulationDiv").children().length -1];


    //actual working code
    placeHolderAdded.style.position = "absolute";
    //placeHolderAdded.style.transform = "translate(-21px,-31px)";

    placeHolderAdded.style.transform = "translate("+(x-21)+"px,"+(y-31)+"px)";

    placeHolderAdded.style.width = width;
    placeHolderAdded.style.height = height;


}
//----------------------------------------------------

//----------------------------------------------------
function placeHolder_AddHiddenInputs(type = "staticImage" , fadeDuration = "500" , slideDuration = "3000" , opacity = "1", includeArrows = false )
{
  var str = "";
  str += "  <input type='hidden' class='type' value='"+type+"'>";
  str += "  <input type='hidden' class='fadeDuration' value='"+fadeDuration+"'>";
  str += "  <input type='hidden' class='slideDuration' value='"+slideDuration+"'>";
  str += "  <input type='hidden' class='opacity' value='"+opacity+"'>";
  str += "  <input type='hidden' class='includeArrows' value='"+includeArrows+"'>";


  return str;
}
//----------------------------------------------------


//----------------------------------------------------
function placeHolder_AddFiles(files = {})
{
  var str = "";
  for (var i = 0; files[i] !== undefined ; i++) 
  {
    str += "<input type='hidden' class='file"+i+"' value='"+files[i]+"'>"; //full path
  }

  return str;
}
//----------------------------------------------------


//----------------------------------------------------
function placeHolders_Load(objJSON)
{

  var type          = "";
  var fadeDuration  = "";
  var slideDuration = "";
  var opacity       = "";
  var includeArrows = false;
  var files         = {};
  var posX          = "";
  var posY          = "";
  var width         = "";
  var height        = "";


  for (var i = 0; objJSON['panels']['panel'+i] !== undefined ; i++) 
  {

    type          = objJSON['panels']['panel'+i]['type'];
    fadeDuration  = objJSON['panels']['panel'+i]['fadeDuration'];
    slideDuration = objJSON['panels']['panel'+i]['slideDuration'];
    opacity       = objJSON['panels']['panel'+i]['opacity'];
    includeArrows = objJSON['panels']['panel'+i]['includeArrows'];
    files         = [];
    posX          = objJSON['panels']['panel'+i]['dimensions']['x'];
    posY          = objJSON['panels']['panel'+i]['dimensions']['y'];
    width         = objJSON['panels']['panel'+i]['dimensions']['width'] + "px";
    height        = objJSON['panels']['panel'+i]['dimensions']['height']+ "px";

    for (var j = 0; objJSON['panels']['panel'+i]['files']['file'+j] !== undefined; j++) 
    {
      files[j] = "./uploads/" + objJSON['panels']['panel'+i]['files']['file'+j];
    }

    placeHolder_Add(type, fadeDuration, slideDuration, opacity, includeArrows, files, posX, posY, width, height );
  }

}
//----------------------------------------------------



//----------------------------------------------------
// color functions
function rgbToHex(rgb) 
{ 
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
}

function fullColorHex(r,g,b) 
{   
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return red+green+blue;
}

function stringFullColorHex(str)
{
  str = str.substr(str.indexOf("(") + 1 );
  str = str.substr(0, str.indexOf(")"))
  var colorTemp = str.split(",");

  return "#"+ fullColorHex(colorTemp[0],colorTemp[1],colorTemp[2]);

}
//----------------------------------------------------


