'use strict';
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
module.exports = (sequelize, DataTypes) => {

  let tbl_enquiry_structure = {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    fatherName: DataTypes.STRING,
    enqDate: DataTypes.DATE,
    courseId: DataTypes.INTEGER,
    remarks: DataTypes.STRING,
    status: DataTypes.ENUM('OPEN', 'CLOSE', 'DELETED')
  };

  if (config.dialect == 'sqlite') {
    tbl_enquiry_structure.enqDate = DataTypes.TEXT;
  } 
  

  const Enquiry = sequelize.define('Enquiry', tbl_enquiry_structure, {});
  Enquiry.associate = function(models) {
    // associations can be defined here
  };
  return Enquiry;
};



