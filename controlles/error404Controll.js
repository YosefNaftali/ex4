
const Error404 = (req, res)=> {
    res.render('402', { status: 404, url: req.url });
    //res.status(404);
    //res.statusTxt= "error";
    // res.render();
}

module.exports={
    Error404
}