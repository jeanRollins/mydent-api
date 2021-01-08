const express =  require('express')  ;
const app     =  express() ;
const routes  =  require('./routes') ;
const cors    =  require('cors') ;

app.use(cors()) ;
app.use( express.urlencoded({ extended: false }) ) ;


app.use( express.json() ) ;
app.use( routes ) ;

app.listen( process.env.PORT || 5000, () =>  console.log('Server on port 3000!') )