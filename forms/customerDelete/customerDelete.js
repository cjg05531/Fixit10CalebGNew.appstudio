

customerDelete.onshow=function(){
  txtCustomers1_contents.style.height = "100px"
   query = "SELECT * FROM customer"
    // Below change from my netID to yours (twice: user and database)    
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=cjg05531&pass=" + pw + "&database=cjg05531&query=" + query)

      if (req.status == 200) { //transit worked.
            results = JSON.parse(req.responseText)
            // names now in results array - load names into the dropdown
            drpDelete.clear()
            allCustomers = results
            for (i = 0; i <= results.length - 1; i++)
                drpDelete.addItem(results[i][1])
            
    } else {        
        NSB.MsgBox(`Error: ${req.status}`)
    }  
}


drpDelete.onclick=function(s){
  if (typeof(s) == "object")   
      return                    
    else {
      
      let customerDel = s
      /*
      let found = false
    for (i = 0; i <= results.length - 1; i++) {
      if (customerDel == results[i]) {
        found = true;
        break;
      }
    }
    if (found == false)
     txtCustomers1.value = `That customer is not in the database.${customerDel} \n ${results}`
    else if (found == true)  */
      query = "DELETE FROM customer WHERE name = " + '"' + customerDel + '"'
      
      // replace my netID with yours
      req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=cjg05531&pass=" + pw + "&database=cjg05531&query=" + query)

      if (req.status == 200) //transit worked.
            if (req.responseText == 500)    
                lblMessage.value = `You have successfully deleted the customer named ${customerDel}`
            else
                lblMessage.value = `There was a problem deleting ${customerDel} from the database.`
      else
        // transit error
        lblMessage.value = `Error: ${req.status}`
      
      query = `SELECT name from customer`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=cjg05531&pass=" + pw + "&database=cjg05531&query=" + query)

    if (req.status == 200) { //transit worked.
      //
      customerAfterDelete = JSON.parse(req.responseText)
    } else {
      // transit error
      console.log(`Error: ${req.status}`);
    }
    
    let customersLeft = ""
    for (i = 0; i <= customerAfterDelete.length - 1; i++)
      customersLeft = customersLeft + customerAfterDelete[i] + "\n"

    txtCustomers1.value = customersLeft
        
        
      }
      }


btnNext2.onclick=function(){
  ChangeForm(customerAdd)
}
