const TodoDB = require("../Model/TodoModel");

//--------------------GET ALL DATA-----------------------------------

exports.getAllData = async (req, res) => {
  try {
    const AllData = await TodoDB.find();
    res.status(200).send({
      data: AllData,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      msg: "Somthing Went to wrong",
      result: error,
    });
    
  }
};

//------------------------CREATE DATA INTO DB -----------------------

exports.create = async (req, res) => {
  try {
    const cdata = req.body;

    if (!cdata.hasOwnProperty("listName") || !cdata.hasOwnProperty("readed")) {
      res.json({
        status: false,
      });
      return;
    }

    TodoDB.create({
      listName: cdata.listName,
      readed: cdata.readed,
    })
      .then((result) =>
        res.status(200).send({
          status: true,
          msg: `The Data Has Been Added successfully `,
          result,
        })
      )
      .catch((err) =>
        res.status(400).send({
          status: false,
          msg: err,
        })
      );
  } catch (error) {
    res.status(400).send({
      status: false,
      msg: "Somthing Went to wrong",
      result: error,
    });
  }
};

//--------------------UPDATE DATA-----------------------------------

exports.update = async (req, res) => {
  try {
    let uid = req.params.id;
    let updatedata = req.body;

    let obj = {};

    updatedata.hasOwnProperty("listName")
      ? (obj.listName = updatedata.listName)
      : "";
    updatedata.hasOwnProperty("readed") ? (obj.readed = updatedata.readed) : "";

    if (Object.keys(obj).length == 0) {
      res.status(400).send({
        status: false,
        msg: "The has been Failed to update",
        result:
          "The given Object dose not have a 'listName'and 'readed' property",
      });
      return;
    }

    TodoDB.findByIdAndUpdate(uid, obj, (err, doc) => {
      if (err) {
        res.status(400).send({
          status: false,
          msg: "The has been Failed to update",
          result: err,
        });
      } else {
        res.status(200).send({
          status: true,
          msg: "The Data has been Updated Successfully",
          result: doc,
        });
      }
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      msg: "Somthing Went to wrong",
      result: error,
    });
  }
};

//--------------------DELETE DATA-----------------------------------

exports.deleteData = async (req, res) => {
  try {
    let uid = req.params.id;
    TodoDB.findByIdAndDelete(uid, (err, doc) => {
      if (err) {
        res.status(400).send({
          status: false,
          msg: "Somthing went to wrong",
          result: err,
        });
      } else {
        res.status(200).send({
          status: true,
          msg: "The Data has been Deleted Successfully",
          result: doc,
        });
      }
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      msg: "Somthing Went to wrong",
      result: error,
    });
  }
};
