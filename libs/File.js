
const cloudinary = require('cloudinary').v2 ;


cloudinary.config({ 
    cloud_name: 'difsnkong', 
    api_key: '446138224749888', 
    api_secret: 'YeiKLhwpeZ4FaRWm6LXWMzS7GSs' 
});


const FileAdd =   rutePath  => {
    console.log('rutePath***' , rutePath)
    cloudinary.uploader.upload( rutePath )
    .then(res => {
        console.log('res' , res)
         return res ;

    })
    .catch( (error) =>  {
        console.log(error , 'error' )
    }) 
}

module.exports = { FileAdd }