exports.pNumRefctor = function(req, res, next) {
  if (req.body.Budget) req.body.Budget = parseInt(req.body.Budget);
  if (req.body["Super Area"])
    req.body["Super Area"] = parseInt(req.body["Super Area"]);
  if (req.body["Carpet Area"])
    req.body["Carpet Area"] = parseInt(req.body["Carpet Area"]);
  if (req.body["Approx Area"])
    req.body["Approx Area"] = parseInt(req.body["Approx Area"]);
  if (req.body["Budget Only Rooms"])
    req.body["Budget Only Rooms"] = parseInt(req.body["Budget Only Rooms"]);
  if (req.body["Budget With All Meals"])
    req.body["Budget With All Meals"] = parseInt(
      req.body["Budget With All Meals"]
    );
  next();
};
