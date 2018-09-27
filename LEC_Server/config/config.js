var config={
    port:8100,
    
    //database credentials
    
    mongo:{
        hostname: 'localhost',
        port: '27017',
        db: 'liveExamCenter'
    },
    'secret': '78eir04759fjdsjdjt'
};
config.mongo.url= 'mongodb://'+config.mongo.hostname+':'+config.mongo.port+'/'+config.mongo.db;

module.exports=config;