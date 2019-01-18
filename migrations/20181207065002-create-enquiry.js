'use strict';
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

module.exports = {
  up: (queryInterface, Sequelize) => {
    let tbl_enquiry_structure = {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          firstName: {
            type: Sequelize.STRING
          },
          lastName: {
            type: Sequelize.STRING
          },
          fatherName: {
            type: Sequelize.STRING
          },
          enqDate: {
            type: Sequelize.DATE
          },
          courseId: {
            type: Sequelize.INTEGER
          },
          remarks: {
            type: Sequelize.STRING
          },
          status: {
            type: Sequelize.ENUM('OPEN', 'CLOSE', 'DELETED')
          },
          createdAt: {
            allowNull: false,
              type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
              type: Sequelize.DATE
          }
        }
    if (config.dialect == 'sqlite') {
      tbl_enquiry_structure.enqDate = Sequelize.TEXT;
      tbl_enquiry_structure.createdAt= {allowNull:false,type:Sequelize.TEXT};
      tbl_enquiry_structure.updatedAt = {allowNull:false,type:Sequelize.TEXT};
    } 

    return queryInterface.createTable('Enquiries', tbl_enquiry_structure );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Enquiries');
  }
};

//type: Sequelize.TEXT datatype for date in sqlite3  //SQLite does not have a storage class set aside for storing dates and/or times.
 //......SQLite are capable of storing dates and times as TEXT, REAL, or INTEGER values