
$(document)
  .ready(function() { /*Run for previous search parameters on start*/
      update();
    })
  .ajaxComplete(function() { /*Refresh after search parameters change*/
      update();
    })
  ;

//Call all tweaks
function update() { 
  hideIrrelevantFields();
  shortenUser();
  shortenType()
  shortenURLs();
  shortenStatuses();
  updateStatusHighlighting();
  updateDateGrading();
  iconStatus();
  iconPriority();
}

//Hide irrelevant fields from Technical Assets
function hideIrrelevantFields() {
  var elemStatus = document.getElementsByClassName("status-color");
  for (var i = 0; i < elemStatus.length; i++) {
    if (elemStatus[i].textContent == "N/A") {
      elemStatus[i].parentElement.style.display = "none";
    } 
  }
}

//Shorten User
function shortenUser() {
  $("[data-column='assigned_user']").text(function () {
      return $(this).text()
      .replace("Assigned User", "USER")
      ;
  });
  
  $("[data-label='assigned_user']").text(function () {
      var sName = $(this).text();
      var aInit = sName.match(/[A-Z]/g);
  	  return aInit.toString().replace(/,/g,'');
  });
}

//Shorten Type
function shortenType() {
  $("[data-label='type_label']").text(function () {
      return $(this).text()
      .replace("Other Fulfillment Task", "Other")
      .replace("Linked Page Styling", "Lpage Style")
      .replace("Website Change", "Web Change")
      .replace("Advanced Analytics", "Analytics")
      .replace("Website Addition", "Website Add")
      .replace("Fuse Problem Report", "Bug Report")
      .replace("Fuse Enhancement Request", "Enhancement")
      .replace("Product/Process Research", "Research")
      .replace("Website Bug or Error", "Website Bug")
      .replace("Content - Editing", "Content - Edit")
      .replace("Design - General", "Design Gen")
      .replace("Design - Promo", "Design Pro")
      .replace("Design - Website Mockup", "Design - Web Mock")
      .replace("Client Meeting/Phone Call", "Client Meet")
      .replace("Content - Strategy", "Content Strat")
      .replace("____", "____")
      ;
  });
}

//Shorten URLs
function shortenURLs() {
  $("[data-label='website']").text(function () {
      return $(this).text()
      .replace("http://www.", "")
      .replace("http://", "")
      ;
  });
}

//Icon Status
function iconStatus() {
  $("[data-label='status_label']").html(function () {
    if ( $( this ).text() == "Open" ) {
      return "<img src='https://goo.gl/Wj8fyD' width='25' title='Open'>"; //unchecked checkbox
      }
    else if ( $( this ).text() == "Closed" ) {
      return "<img src='https://goo.gl/ZXQqSm' width='25' title='Closed'>"; //checked checkbox
      }
    else if ( $( this ).text() == "Hold" ) { 
      return "<img src='https://goo.gl/N3aPZo' width='25' title='Hold'>"; //orange yield sign
      }
     });
  $("[data-column='status_label']").text(function () { //Shorten column heading
      return $(this).text()
      .replace("Status", "Done")
      ;
  });
}

//Icon Priority
function iconPriority() {
  $("[mobile-label='Priority']").html(function () {
    if ( $( this ).text() == "Low" ) {
      return "<img src='https://goo.gl/mG9mSt' width='25' title='Low'>"; //blue circle
      }
    else if ( $( this ).text() == "Normal" ) {
      return "<img src='https://goo.gl/Lg6e4N' width='25' title='Normal'>"; //peach circle
      }
    else if ( $( this ).text() == "High" ) { 
      return "<img src='https://goo.gl/BLqxc1' width='25' title='High'>"; //fireball
      }
     });
  $("[data-column='priority_label']").text(function () {
      return $(this).text()
      .replace("Priority", "Pri")
      ;
  });
}

//Shorten Status
function shortenStatuses() {
  $("[data-label='status_name']").text(function () {
      return $(this).text()
      .replace("Switched to Competitor", "Switched")
      .replace("Out of Business", "OOB")
      ;
  });
}

//Color code the business status
function updateStatusHighlighting() {
  $("[data-label='status_name']")
    .css("background-color", function (index) {
      if (
             $( this ).text() == "Cancelled" 
          || $( this ).text() == "Switched"
          || $( this ).text() == "Duplicate"
          || $( this ).text() == "OOB"
          || $( this ).text() == "Gratis & BFF"
        ) {
        return "#fcc"; /*red*/
        } 
      else if ($( this ).text() == "Active") {
        return "#cec"; /*green*/
        }
      else { return "#ffa"; } /*yellow*/
      });
  }

//Date grade tickets
function updateDateGrading() {
  $("[data-label='due_date']").css("background-color", function () {
      var monthDayYear = $(this).text().split("/");
      var dateDue = new Date(
        parseInt(monthDayYear[2], 10),
        parseInt(monthDayYear[0], 10) -1,
        parseInt(monthDayYear[1], 10)
        );
      var dateToday = new Date(Date.now())
      if ( //today
          dateDue.getDate() == dateToday.getDate() 
          && dateDue.getMonth() == dateToday.getMonth() 
          && dateDue.getFullYear() == dateToday.getFullYear()
          ) {
        return "#Fca";  /*orange*/
      } else if ( //tomorrow
          dateDue.getDate() == dateToday.getDate() + 1
          && dateDue.getMonth() == dateToday.getMonth() 
          && dateDue.getFullYear() == dateToday.getFullYear()
          ) {
        return "#ffa";  /*yellow*/
      } else if ( dateDue < dateToday ) { //Before today
        return "#fcc"; /*red*/
      } else if (dateDue > dateToday) { //After today
        return "#cec"; /*green*/
      } else { //Exception like no date
        return "#adf"; /*blue*/
      }
  });
}
